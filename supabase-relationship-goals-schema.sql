-- ============================================================================
-- RELATIONSHIP GOALS - COMPLETE DATABASE SCHEMA
-- ============================================================================
-- This creates tables for relationship goals and their action steps
-- Run this in your Supabase SQL Editor
-- ============================================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. RELATIONSHIP GOALS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.relationship_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  
  -- Goal Details
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'communication',
    'quality_time',
    'intimacy',
    'personal_growth',
    'financial',
    'family',
    'health',
    'adventure',
    'home',
    'career'
  )),
  
  -- Tracking
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'cancelled')),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  target_date DATE NOT NULL,
  completed_date TIMESTAMP WITH TIME ZONE,
  
  -- Partner Involvement
  partner_email TEXT,
  shared_with_partner BOOLEAN DEFAULT FALSE,
  
  -- Reminders
  reminder_enabled BOOLEAN DEFAULT FALSE,
  reminder_phone TEXT,
  reminder_frequency TEXT CHECK (reminder_frequency IN ('daily', 'weekly', 'biweekly')),
  last_reminder_sent TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Indexes for performance
  CONSTRAINT valid_progress CHECK (progress >= 0 AND progress <= 100)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_relationship_goals_user_id ON public.relationship_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_relationship_goals_status ON public.relationship_goals(status);
CREATE INDEX IF NOT EXISTS idx_relationship_goals_created_at ON public.relationship_goals(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_relationship_goals_target_date ON public.relationship_goals(target_date);

-- ============================================================================
-- 2. GOAL ACTION STEPS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.goal_action_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  goal_id UUID NOT NULL REFERENCES public.relationship_goals(id) ON DELETE CASCADE,
  
  -- Step Details
  step_text TEXT NOT NULL,
  step_order INTEGER NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure unique ordering within a goal
  UNIQUE(goal_id, step_order)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_goal_action_steps_goal_id ON public.goal_action_steps(goal_id);
CREATE INDEX IF NOT EXISTS idx_goal_action_steps_order ON public.goal_action_steps(goal_id, step_order);

-- ============================================================================
-- 3. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on relationship_goals
ALTER TABLE public.relationship_goals ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own goals" ON public.relationship_goals;
DROP POLICY IF EXISTS "Users can insert own goals" ON public.relationship_goals;
DROP POLICY IF EXISTS "Users can update own goals" ON public.relationship_goals;
DROP POLICY IF EXISTS "Users can delete own goals" ON public.relationship_goals;

-- RLS Policies for relationship_goals
CREATE POLICY "Users can view own goals" ON public.relationship_goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals" ON public.relationship_goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals" ON public.relationship_goals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals" ON public.relationship_goals
  FOR DELETE USING (auth.uid() = user_id);

-- Enable RLS on goal_action_steps
ALTER TABLE public.goal_action_steps ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own goal steps" ON public.goal_action_steps;
DROP POLICY IF EXISTS "Users can insert own goal steps" ON public.goal_action_steps;
DROP POLICY IF EXISTS "Users can update own goal steps" ON public.goal_action_steps;
DROP POLICY IF EXISTS "Users can delete own goal steps" ON public.goal_action_steps;

-- RLS Policies for goal_action_steps (through relationship_goals)
CREATE POLICY "Users can view own goal steps" ON public.goal_action_steps
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.relationship_goals
      WHERE relationship_goals.id = goal_action_steps.goal_id
      AND relationship_goals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own goal steps" ON public.goal_action_steps
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.relationship_goals
      WHERE relationship_goals.id = goal_action_steps.goal_id
      AND relationship_goals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own goal steps" ON public.goal_action_steps
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.relationship_goals
      WHERE relationship_goals.id = goal_action_steps.goal_id
      AND relationship_goals.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own goal steps" ON public.goal_action_steps
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.relationship_goals
      WHERE relationship_goals.id = goal_action_steps.goal_id
      AND relationship_goals.user_id = auth.uid()
    )
  );

-- ============================================================================
-- 4. HELPER FUNCTIONS
-- ============================================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_relationship_goals_updated_at ON public.relationship_goals;
DROP TRIGGER IF EXISTS update_goal_action_steps_updated_at ON public.goal_action_steps;

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_relationship_goals_updated_at
  BEFORE UPDATE ON public.relationship_goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_goal_action_steps_updated_at
  BEFORE UPDATE ON public.goal_action_steps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-update completed_date when status changes to completed
CREATE OR REPLACE FUNCTION update_goal_completed_date()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    NEW.completed_date = NOW();
  ELSIF NEW.status != 'completed' THEN
    NEW.completed_date = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS set_goal_completed_date ON public.relationship_goals;

-- Create trigger for completed_date
CREATE TRIGGER set_goal_completed_date
  BEFORE UPDATE ON public.relationship_goals
  FOR EACH ROW
  EXECUTE FUNCTION update_goal_completed_date();

-- ============================================================================
-- 5. HELPER VIEW (Optional - for easier querying)
-- ============================================================================

-- Create a view that joins goals with their action steps
CREATE OR REPLACE VIEW public.goals_with_steps AS
SELECT 
  g.*,
  COALESCE(
    json_agg(
      json_build_object(
        'id', s.id,
        'step_text', s.step_text,
        'step_order', s.step_order,
        'is_completed', s.is_completed,
        'completed_at', s.completed_at
      ) ORDER BY s.step_order
    ) FILTER (WHERE s.id IS NOT NULL),
    '[]'::json
  ) AS action_steps
FROM public.relationship_goals g
LEFT JOIN public.goal_action_steps s ON g.id = s.goal_id
GROUP BY g.id;

-- ============================================================================
-- SETUP COMPLETE!
-- ============================================================================
-- Next steps:
-- 1. Run this entire SQL script in your Supabase SQL Editor
-- 2. Verify tables were created by checking the Table Editor
-- 3. Use the goalsService.js file to interact with these tables
-- ============================================================================

