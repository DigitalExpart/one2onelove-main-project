-- ============================================
-- ADD PAYMENT TRACKING TO USERS TABLE
-- ============================================
-- This script adds Stripe payment tracking fields
-- Run this in Supabase SQL Editor

-- Add payment and Stripe fields to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS payment_method TEXT,
ADD COLUMN IF NOT EXISTS subscription_current_period_start TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS subscription_current_period_end TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS trial_end_date TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS cancel_at_period_end BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS canceled_at TIMESTAMPTZ;

-- Create payment_history table
CREATE TABLE IF NOT EXISTS public.payment_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_payment_intent_id TEXT,
  stripe_invoice_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL, -- succeeded, failed, pending
  subscription_plan TEXT NOT NULL,
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for payment history queries
CREATE INDEX IF NOT EXISTS idx_payment_history_user_id ON public.payment_history(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_history_status ON public.payment_history(status);
CREATE INDEX IF NOT EXISTS idx_payment_history_created_at ON public.payment_history(created_at DESC);

-- Create subscription_changes table for tracking plan changes
CREATE TABLE IF NOT EXISTS public.subscription_changes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  from_plan TEXT,
  to_plan TEXT NOT NULL,
  change_type TEXT NOT NULL, -- upgrade, downgrade, cancel, reactivate
  effective_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for subscription changes
CREATE INDEX IF NOT EXISTS idx_subscription_changes_user_id ON public.subscription_changes(user_id);
CREATE INDEX IF NOT EXISTS idx_subscription_changes_created_at ON public.subscription_changes(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on payment_history
ALTER TABLE public.payment_history ENABLE ROW LEVEL SECURITY;

-- Users can view their own payment history
CREATE POLICY "Users can view own payment history"
  ON public.payment_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Only system can insert payment records (via service role)
CREATE POLICY "Service role can insert payment history"
  ON public.payment_history
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Enable RLS on subscription_changes
ALTER TABLE public.subscription_changes ENABLE ROW LEVEL SECURITY;

-- Users can view their own subscription changes
CREATE POLICY "Users can view own subscription changes"
  ON public.subscription_changes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Only system can insert subscription changes
CREATE POLICY "Service role can insert subscription changes"
  ON public.subscription_changes
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to update subscription status
CREATE OR REPLACE FUNCTION public.update_user_subscription(
  p_user_id UUID,
  p_subscription_plan TEXT,
  p_subscription_status TEXT,
  p_stripe_subscription_id TEXT DEFAULT NULL,
  p_current_period_start TIMESTAMPTZ DEFAULT NULL,
  p_current_period_end TIMESTAMPTZ DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.users
  SET 
    subscription_plan = p_subscription_plan,
    subscription_status = p_subscription_status,
    stripe_subscription_id = COALESCE(p_stripe_subscription_id, stripe_subscription_id),
    subscription_current_period_start = p_current_period_start,
    subscription_current_period_end = p_current_period_end,
    updated_at = NOW()
  WHERE id = p_user_id;
END;
$$;

-- Function to record subscription change
CREATE OR REPLACE FUNCTION public.record_subscription_change(
  p_user_id UUID,
  p_from_plan TEXT,
  p_to_plan TEXT,
  p_change_type TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.subscription_changes (user_id, from_plan, to_plan, change_type)
  VALUES (p_user_id, p_from_plan, p_to_plan, p_change_type);
END;
$$;

-- Function to check if subscription is active
CREATE OR REPLACE FUNCTION public.is_subscription_active(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_status TEXT;
  v_period_end TIMESTAMPTZ;
BEGIN
  SELECT subscription_status, subscription_current_period_end
  INTO v_status, v_period_end
  FROM public.users
  WHERE id = p_user_id;
  
  RETURN v_status = 'active' AND (v_period_end IS NULL OR v_period_end > NOW());
END;
$$;

-- Function to get user's subscription details
CREATE OR REPLACE FUNCTION public.get_subscription_details(p_user_id UUID)
RETURNS TABLE (
  subscription_plan TEXT,
  subscription_status TEXT,
  subscription_price DECIMAL,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN,
  days_remaining INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.subscription_plan,
    u.subscription_status,
    u.subscription_price,
    u.subscription_current_period_start,
    u.subscription_current_period_end,
    u.cancel_at_period_end,
    CASE 
      WHEN u.subscription_current_period_end IS NOT NULL 
      THEN EXTRACT(DAY FROM u.subscription_current_period_end - NOW())::INTEGER
      ELSE NULL
    END as days_remaining
  FROM public.users u
  WHERE u.id = p_user_id;
END;
$$;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON COLUMN public.users.stripe_customer_id IS 'Stripe customer ID for payment processing';
COMMENT ON COLUMN public.users.stripe_subscription_id IS 'Stripe subscription ID';
COMMENT ON COLUMN public.users.payment_method IS 'Last 4 digits of payment method';
COMMENT ON COLUMN public.users.subscription_current_period_start IS 'Current billing period start date';
COMMENT ON COLUMN public.users.subscription_current_period_end IS 'Current billing period end date';
COMMENT ON COLUMN public.users.cancel_at_period_end IS 'Whether subscription will cancel at period end';

COMMENT ON TABLE public.payment_history IS 'Tracks all payment transactions';
COMMENT ON TABLE public.subscription_changes IS 'Tracks subscription plan changes';

-- ============================================
-- VERIFICATION
-- ============================================

-- Verify the columns were added
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'users'
  AND column_name IN (
    'stripe_customer_id',
    'stripe_subscription_id',
    'payment_method',
    'subscription_current_period_start',
    'subscription_current_period_end',
    'trial_end_date',
    'cancel_at_period_end',
    'canceled_at'
  )
ORDER BY ordinal_position;

-- Verify tables were created
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('payment_history', 'subscription_changes');

-- ============================================
-- COMPLETED!
-- ============================================
-- Payment tracking fields and tables are ready!
-- Next: Set up Stripe Edge Functions

