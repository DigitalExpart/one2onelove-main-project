-- Fix Missing User Profiles
-- This script creates user profiles for existing auth users who don't have profiles in the users table
-- Run this if you have users in auth.users but not in public.users

-- Insert missing user profiles from auth.users
INSERT INTO public.users (
  id,
  email,
  name,
  user_type,
  created_at,
  updated_at
)
SELECT 
  au.id,
  au.email,
  COALESCE(
    au.raw_user_meta_data->>'name',
    au.email
  ) as name,
  COALESCE(
    au.raw_user_meta_data->>'user_type',
    'regular'
  ) as user_type,
  au.created_at,
  NOW() as updated_at
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL  -- Only users without profiles
ON CONFLICT (id) DO NOTHING;  -- Skip if profile already exists

-- Verify the fix
SELECT 
  'Total auth users' as metric,
  COUNT(*) as count
FROM auth.users
UNION ALL
SELECT 
  'Total user profiles' as metric,
  COUNT(*) as count
FROM public.users
UNION ALL
SELECT 
  'Missing profiles' as metric,
  COUNT(*) as count
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL;

