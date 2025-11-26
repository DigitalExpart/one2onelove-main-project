# 🔧 Fix "Invalid Login Credentials" Error

## The Problem

Your user exists in the `public.users` table (profile data), but **NOT in Supabase's `auth.users` table** (authentication credentials).

**You need BOTH to sign in!**

---

## ✅ Solution: Create User in Supabase Auth

### Step 1: Go to Supabase Authentication

1. Open **Supabase Dashboard**: https://app.supabase.com
2. Select your project
3. Go to **Authentication** → **Users**

### Step 2: Add the User

1. Click **"Add User"** button (top right)
2. Fill in the form:
   - **Email**: `reynoldantoine@gmail.com` (use the EXACT email you want to sign in with)
   - **Password**: Enter a password (user can change it later)
   - **Auto Confirm User**: ✅ **CHECK THIS BOX** (allows sign in without email confirmation)
3. Click **"Create User"**

### Step 3: Link to Existing Profile (If Needed)

If the user already exists in `public.users` with a different email or ID:

1. Go to **SQL Editor** in Supabase
2. Run this query (replace with actual values):

```sql
-- Update the public.users record to match the auth.users ID
UPDATE public.users
SET id = (SELECT id FROM auth.users WHERE email = 'reynoldantoine@gmail.com')
WHERE email = 'reynoldanoin@gmail.com'  -- Old email in database
AND NOT EXISTS (
  SELECT 1 FROM public.users 
  WHERE id = (SELECT id FROM auth.users WHERE email = 'reynoldantoine@gmail.com')
);
```

Or create a new profile if it doesn't exist:

```sql
-- Create profile for auth user if it doesn't exist
INSERT INTO public.users (id, email, name, user_type, created_at, updated_at)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1)) as name,
  'regular',
  created_at,
  NOW()
FROM auth.users
WHERE email = 'reynoldantoine@gmail.com'
AND NOT EXISTS (SELECT 1 FROM public.users WHERE id = auth.users.id);
```

---

## 🔍 Alternative: Check What's Wrong

### Check if User Exists in Auth

Run this in **Supabase SQL Editor**:

```sql
-- Check auth.users
SELECT id, email, email_confirmed_at, created_at
FROM auth.users
WHERE email = 'reynoldantoine@gmail.com';

-- Check public.users  
SELECT id, email, name, user_type
FROM public.users
WHERE email LIKE '%reynold%';
```

### Common Issues:

1. **User doesn't exist in auth.users** → Create via Dashboard (see above)
2. **Email typo** → Use exact email from database or update database
3. **Password wrong** → Reset password in Authentication → Users
4. **Email not confirmed** → Disable email confirmation OR manually confirm

---

## 🚀 Quick Fix Steps

1. ✅ Go to **Supabase Dashboard** → **Authentication** → **Users**
2. ✅ Click **"Add User"**
3. ✅ Enter email: `reynoldantoine@gmail.com`
4. ✅ Enter password: `123Love123` (or any password)
5. ✅ **Check "Auto Confirm User"**
6. ✅ Click **"Create User"**
7. ✅ Try signing in again

---

## 📝 After Creating User

The user can now:
- Sign in with the email and password you set
- Use "Forgot Password" to reset password
- Access the app normally

The profile in `public.users` will be automatically linked if the email matches, or you can run the SQL above to link them.

