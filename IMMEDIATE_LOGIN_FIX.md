# 🚨 IMMEDIATE FIX: Invalid Login Credentials

## The Error You're Seeing

```
Supabase auth error: AuthApiError: Invalid login credentials
POST https://hphhmjcutesqsdnubnnw.supabase.co/auth/v1/token?grant_type=password
400 (Bad Request)
```

This means Supabase Auth cannot find the user or the password is wrong.

---

## ✅ SOLUTION: Create User in Supabase Auth

### Step 1: Go to Supabase Dashboard

1. Go to: https://app.supabase.com
2. Select your project: **hwy99signs's Project**
3. Click **"Authentication"** in the left sidebar
4. Click **"Users"** tab

### Step 2: Check if User Exists

1. In the search box, type: `reynoldanoin@gmail.com`
2. **If user appears**: The password is wrong → Go to Step 3A
3. **If user does NOT appear**: User doesn't exist → Go to Step 3B

---

### Step 3A: Reset Password (If User Exists)

1. Find the user in the list
2. Click the **"..."** menu (three dots) next to the user
3. Click **"Reset Password"**
4. Enter a new password: `123Love123` (or any password you want)
5. Click **"Reset Password"**
6. Try signing in again with the new password

---

### Step 3B: Create New User (If User Doesn't Exist)

1. Click the **"Add User"** button (top right, green button)
2. Fill in the form:
   - **Email**: `reynoldanoin@gmail.com`
   - **Password**: `123Love123` (or any password)
   - **Auto Confirm User**: ✅ **CHECK THIS BOX** (very important!)
3. Click **"Create User"**
4. User is now created and can sign in immediately

---

## 🔗 Link User to Existing Profile (If Needed)

If the user was created in `auth.users` but has a different ID than in `public.users`:

1. Go to **SQL Editor** in Supabase
2. Run this query:

```sql
-- Get the auth user ID
SELECT id, email FROM auth.users WHERE email = 'reynoldanoin@gmail.com';

-- Update public.users to match auth.users ID (replace 'AUTH_USER_ID' with the ID from above)
UPDATE public.users
SET id = 'AUTH_USER_ID_HERE'
WHERE email = 'reynoldanoin@gmail.com';

-- Or if profile doesn't exist, create it:
INSERT INTO public.users (id, email, name, user_type, created_at, updated_at)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1)) as name,
  'regular',
  created_at,
  NOW()
FROM auth.users
WHERE email = 'reynoldanoin@gmail.com'
AND NOT EXISTS (SELECT 1 FROM public.users WHERE id = auth.users.id);
```

---

## ✅ Verify It Works

1. Go back to your app: https://one2-one-love.vercel.app/signin
2. Enter:
   - **Email**: `reynoldanoin@gmail.com`
   - **Password**: The password you set in Supabase
3. Click **"Sign In"**
4. Should work now! ✅

---

## 🔍 Still Not Working?

### Check These:

1. **Email matches exactly** (case doesn't matter, but spelling does)
   - ✅ `reynoldanoin@gmail.com`
   - ❌ `reynoldantoine@gmail.com` (different email!)

2. **Password is correct** (passwords are case-sensitive)
   - Try resetting password again

3. **User is confirmed** (if email confirmation is enabled)
   - In Authentication → Users, check if there's a green checkmark
   - Or disable email confirmation in Settings

4. **Vercel environment variables are correct**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
   - Redeploy if you changed them

---

## 📋 Quick Checklist

- [ ] User exists in **Authentication → Users** (not just `public.users`)
- [ ] Email is exactly: `reynoldanoin@gmail.com` (no typos)
- [ ] Password matches what you set in Supabase
- [ ] "Auto Confirm User" was checked when creating user
- [ ] Hard refresh browser (Ctrl+Shift+R) after changes
- [ ] Vercel environment variables are set correctly

---

## 🆘 Last Resort: SQL Query to Check Everything

Run this in **Supabase SQL Editor** to see the full picture:

```sql
-- Check auth.users
SELECT 
  'AUTH' as source,
  id,
  email,
  email_confirmed_at IS NOT NULL as confirmed,
  encrypted_password IS NOT NULL as has_password,
  created_at
FROM auth.users
WHERE email = 'reynoldanoin@gmail.com'

UNION ALL

-- Check public.users
SELECT 
  'PROFILE' as source,
  id,
  email,
  NULL as confirmed,
  NULL as has_password,
  created_at
FROM public.users
WHERE email = 'reynoldanoin@gmail.com';
```

This will show you:
- If user exists in auth
- If user exists in profile
- If email is confirmed
- If password is set


