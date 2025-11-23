-- ============================================================================
-- FIX SIGNUP: Add RLS Policy to Allow User Profile Creation
-- ============================================================================
-- This fixes the "new row violates row-level security policy" error
-- Run this in your Supabase SQL Editor
-- ============================================================================

-- Drop the existing INSERT policy if it exists
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

-- Create a new INSERT policy that allows authenticated users to create their own profile
CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Verify the policies
SELECT * FROM pg_policies WHERE tablename = 'users';

-- ============================================================================
-- DONE! After running this, try signing up again.
-- ============================================================================

