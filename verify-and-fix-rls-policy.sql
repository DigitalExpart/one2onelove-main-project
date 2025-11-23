-- ============================================================================
-- VERIFY AND FIX RLS POLICIES FOR SIGNUP
-- ============================================================================
-- Run this entire script in Supabase SQL Editor
-- ============================================================================

-- Step 1: Check what policies currently exist
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd as command,
    qual as using_expression,
    with_check
FROM pg_policies 
WHERE tablename = 'users';

-- Step 2: Drop ALL existing policies on users table
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.users;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;

-- Step 3: Recreate policies with correct permissions
-- Allow users to INSERT their own profile
CREATE POLICY "Users can insert own profile" 
ON public.users
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);

-- Allow users to SELECT their own profile
CREATE POLICY "Users can view own profile" 
ON public.users
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- Allow users to UPDATE their own profile
CREATE POLICY "Users can update own profile" 
ON public.users
FOR UPDATE 
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Step 4: Verify the policies were created
SELECT 
    policyname,
    cmd as command,
    roles,
    qual as using_expression,
    with_check
FROM pg_policies 
WHERE tablename = 'users'
ORDER BY cmd;

-- ============================================================================
-- You should see 3 policies:
-- 1. Users can insert own profile (INSERT)
-- 2. Users can view own profile (SELECT)
-- 3. Users can update own profile (UPDATE)
-- ============================================================================

