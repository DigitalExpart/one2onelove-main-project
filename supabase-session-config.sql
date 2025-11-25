-- ============================================
-- SUPABASE SESSION CONFIGURATION
-- ============================================
-- This script helps configure session and auth settings
-- Run these in Supabase SQL Editor

-- NOTE: Some of these settings must be configured in Supabase Dashboard
-- Go to: Authentication > Settings

-- ============================================
-- RECOMMENDED DASHBOARD SETTINGS
-- ============================================
-- 1. Go to: Authentication > Settings > Auth Providers
--    - Email: Enabled
--    - Confirm email: Optional (disable for testing, enable for production)
--    - Secure email change: Enabled
--
-- 2. Go to: Authentication > Settings > Auth Settings
--    - JWT Expiry: 604800 (7 days in seconds)
--    - Refresh Token Rotation: Enabled
--    - Reuse Interval: 10 (seconds)
--    - Minimum Password Length: 6
--
-- 3. Go to: Authentication > Settings > Email Templates
--    - Customize if needed

-- ============================================
-- DATABASE SETTINGS (Run in SQL Editor)
-- ============================================

-- Verify auth schema settings
SELECT current_setting('app.settings.jwt_exp', true) as jwt_expiry_seconds;

-- Check existing sessions
SELECT 
  COUNT(*) as total_sessions,
  COUNT(DISTINCT user_id) as unique_users
FROM auth.sessions
WHERE NOT revoked 
  AND expires_at > NOW();

-- Clean up any revoked or expired sessions (optional - Supabase does this automatically)
-- DELETE FROM auth.sessions WHERE revoked = true OR expires_at < NOW();

-- ============================================
-- VERIFY RLS IS NOT BLOCKING SESSION ACCESS
-- ============================================

-- Check users table RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public' 
  AND tablename = 'users'
ORDER BY policyname;

-- Ensure authenticated users can access their session data
-- This should already exist, but verify:
DO $$
BEGIN
  -- Check if the policy exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'users' 
      AND policyname = 'Users can view all profiles'
  ) THEN
    -- Create if it doesn't exist
    EXECUTE 'CREATE POLICY "Users can view all profiles" ON public.users FOR SELECT TO authenticated USING (true)';
    RAISE NOTICE 'Created policy: Users can view all profiles';
  ELSE
    RAISE NOTICE 'Policy already exists: Users can view all profiles';
  END IF;
END $$;

-- ============================================
-- VERIFY AUTH HOOKS (if any custom hooks exist)
-- ============================================

-- List any auth hooks that might be interfering
SELECT 
  id,
  hook_name,
  created_at
FROM auth.hooks
ORDER BY created_at DESC;

-- If you have custom auth hooks that are causing issues, you can disable them:
-- UPDATE auth.hooks SET enabled = false WHERE hook_name = 'your_hook_name';

-- ============================================
-- SESSION DEBUGGING QUERY
-- ============================================

-- Run this to check your current session info after logging in
SELECT 
  id,
  user_id,
  created_at,
  updated_at,
  expires_at,
  NOT revoked as is_active,
  EXTRACT(EPOCH FROM (expires_at - NOW())) / 3600 as hours_until_expiry
FROM auth.sessions
WHERE user_id = auth.uid()
  AND NOT revoked
ORDER BY created_at DESC
LIMIT 5;

-- ============================================
-- COMPLETED!
-- ============================================
-- After running this:
-- 1. Clear your browser cache completely (Ctrl+Shift+Delete)
-- 2. Close ALL browser tabs
-- 3. Reopen your app and sign in
-- 4. Session should now persist across refreshes and browser restarts

