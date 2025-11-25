-- ============================================================================
-- BUDDY/FRIEND SYSTEM SCHEMA
-- ============================================================================
-- Run this in your Supabase SQL Editor to create the buddy system tables
-- ============================================================================

-- Create buddy_requests table
CREATE TABLE IF NOT EXISTS public.buddy_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Prevent duplicate requests
  CONSTRAINT unique_buddy_request UNIQUE (from_user_id, to_user_id),
  -- Prevent self-requests
  CONSTRAINT no_self_requests CHECK (from_user_id != to_user_id)
);

-- Enable Row Level Security
ALTER TABLE public.buddy_requests ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own buddy requests" ON public.buddy_requests;
DROP POLICY IF EXISTS "Users can create buddy requests" ON public.buddy_requests;
DROP POLICY IF EXISTS "Users can update received requests" ON public.buddy_requests;
DROP POLICY IF EXISTS "Users can delete own sent requests" ON public.buddy_requests;

-- RLS Policies for buddy_requests
-- Users can view requests they sent or received
CREATE POLICY "Users can view own buddy requests"
  ON public.buddy_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

-- Users can create buddy requests (send requests to others)
CREATE POLICY "Users can create buddy requests"
  ON public.buddy_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = from_user_id);

-- Users can update requests they received (accept/reject)
CREATE POLICY "Users can update received requests"
  ON public.buddy_requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = to_user_id)
  WITH CHECK (auth.uid() = to_user_id);

-- Users can delete requests they sent (cancel pending requests)
CREATE POLICY "Users can delete own sent requests"
  ON public.buddy_requests
  FOR DELETE
  TO authenticated
  USING (auth.uid() = from_user_id AND status = 'pending');

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS buddy_requests_from_user_id_idx ON public.buddy_requests(from_user_id);
CREATE INDEX IF NOT EXISTS buddy_requests_to_user_id_idx ON public.buddy_requests(to_user_id);
CREATE INDEX IF NOT EXISTS buddy_requests_status_idx ON public.buddy_requests(status);
CREATE INDEX IF NOT EXISTS buddy_requests_created_at_idx ON public.buddy_requests(created_at);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_buddy_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at on row update
DROP TRIGGER IF EXISTS update_buddy_requests_updated_at_trigger ON public.buddy_requests;
CREATE TRIGGER update_buddy_requests_updated_at_trigger
  BEFORE UPDATE ON public.buddy_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_buddy_requests_updated_at();

-- ============================================================================
-- DONE! Buddy system tables are ready to use.
-- ============================================================================

-- Verify the table was created
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'buddy_requests'
ORDER BY ordinal_position;

-- Verify policies
SELECT policyname, cmd, roles 
FROM pg_policies 
WHERE tablename = 'buddy_requests';

