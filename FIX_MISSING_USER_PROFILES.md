# Fix Missing User Profiles

If you created a user account and can sign in, but don't see the profile in the `users` table, this guide will help you fix it.

## Problem

- User account exists in `auth.users` (that's why you can sign in)
- User profile is missing in `public.users` table
- This happens when profile creation fails silently

## Solution

### Option 1: Run the Fix Script (Recommended)

1. Go to your Supabase SQL Editor
2. Copy and run `supabase-fix-missing-profiles.sql`
3. This will create profiles for all auth users who don't have profiles

### Option 2: Manually Create Profile

If you know the user's email, you can manually create their profile:

```sql
-- Replace 'user@example.com' with the actual email
INSERT INTO public.users (
  id,
  email,
  name,
  user_type,
  created_at,
  updated_at
)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'name', email) as name,
  COALESCE(raw_user_meta_data->>'user_type', 'regular') as user_type,
  created_at,
  NOW()
FROM auth.users
WHERE email = 'user@example.com'
ON CONFLICT (id) DO NOTHING;
```

## Verify the Fix

After running the script, check:

```sql
-- See all users with their profiles
SELECT 
  au.id,
  au.email,
  pu.name,
  pu.user_type,
  pu.created_at
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
ORDER BY au.created_at DESC;
```

## Prevent Future Issues

The code has been updated to show errors if profile creation fails. If you see an error during signup, it will now be displayed to the user.

## Common Causes

1. **RLS Policy Issue**: The RLS policy might be blocking the insert
2. **Missing Columns**: The table might be missing required columns
3. **Silent Failure**: Error was caught but not shown (now fixed)

## Check RLS Policies

Make sure the insert policy exists:

```sql
-- Check if insert policy exists
SELECT * FROM pg_policies 
WHERE tablename = 'users' 
AND policyname = 'Users can insert own profile';
```

If it doesn't exist, run:

```sql
CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);
```

