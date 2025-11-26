# 🔐 Supabase Login "Invalid Credentials" Troubleshooting

## Why "Invalid Login Credentials" Even When User Exists in Database?

### Important Distinction:
- **`public.users` table** = User profile data (name, email, etc.)
- **`auth.users` table** = Authentication credentials (password, email confirmation)

**The user MUST exist in BOTH tables to sign in!**

---

## Step 1: Check if User Exists in Auth

1. Go to **Supabase Dashboard** → **Authentication** → **Users**
2. Search for the email address you're trying to sign in with
3. **If the user is NOT there**, that's the problem!

### Solution: User Missing from Auth

If user exists in `public.users` but NOT in `auth.users`:

**Option A: Reset Password (Recommended)**
1. Go to **Authentication** → **Users** → Click **"Add User"** or **"Invite User"**
2. Enter the email address
3. Set a temporary password
4. User will receive an email to reset password
5. Or manually set password in the user's auth record

**Option B: Create User via Sign Up**
1. Use the **Sign Up** page in your app
2. Use the same email that exists in `public.users`
3. This will create the auth record

**Option C: Manual SQL (Advanced)**
```sql
-- Check if user exists in auth
SELECT id, email, encrypted_password, email_confirmed_at
FROM auth.users
WHERE email = 'reynoldantoine@gmail.com';

-- If not exists, you need to create via Supabase Auth API or Dashboard
```

---

## Step 2: Check Email Confirmation

1. In **Authentication** → **Users**, find your user
2. Check if **"Email Confirmed"** has a green checkmark
3. If NOT confirmed:
   - **Option 1**: Click **"Send Confirmation Email"**
   - **Option 2**: Manually confirm in Supabase Dashboard
   - **Option 3**: Disable email confirmation (see below)

### Disable Email Confirmation (For Testing)

1. Go to **Authentication** → **Settings**
2. Under **"Email Auth"**, find **"Confirm email"**
3. **Toggle OFF** "Enable email confirmations"
4. Save changes

**Note**: This allows users to sign in without confirming email.

---

## Step 3: Check Password

### Common Issues:
1. **Password doesn't match** - User might have changed it
2. **Password was never set** - User was created manually without password
3. **Case sensitivity** - Passwords are case-sensitive

### Solution: Reset Password

1. Go to **Authentication** → **Users**
2. Find the user
3. Click **"..."** menu → **"Reset Password"**
4. Or use the **"Forgot Password"** link on your sign-in page

---

## Step 4: Check Email Typo

**IMPORTANT**: The email must match EXACTLY (case-insensitive but spelling must match)

- ❌ Form: `reynoldantoine@gmail.com`
- ✅ Database: `reynoldanoin@gmail.com`
- **These are DIFFERENT emails!**

### Solution:
1. Use the **exact email** from the database
2. Or update the database email to match what you're using
3. Or create a new account with the correct email

---

## Step 5: Verify Supabase Configuration

Check that your Vercel deployment has the correct environment variables:

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Verify these are set:
   - `VITE_SUPABASE_URL` = Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = Your Supabase anon key
3. Make sure they're set for **Production** environment
4. **Redeploy** after adding/changing variables

---

## Step 6: Check Console for Detailed Error

1. Open browser **Developer Tools** (F12)
2. Go to **Console** tab
3. Try to sign in
4. Look for these messages:
   - `🔵 Attempting login for: [email]` - Login started
   - `❌ Supabase auth error: [error details]` - Shows exact error
   - `Invalid login credentials` - Password/email mismatch

---

## Quick Fix Checklist

- [ ] User exists in **Authentication** → **Users** (not just `public.users`)
- [ ] Email matches EXACTLY (check for typos)
- [ ] Password is correct (try resetting it)
- [ ] Email is confirmed OR email confirmation is disabled
- [ ] Vercel environment variables are set correctly
- [ ] Hard refresh browser (Ctrl+Shift+R) after Vercel deploy

---

## Manual User Creation in Supabase Auth

If you need to manually create a user in Supabase Auth:

1. Go to **Authentication** → **Users** → **"Add User"**
2. Enter:
   - **Email**: `reynoldantoine@gmail.com` (or correct email)
   - **Password**: Set a temporary password
   - **Auto Confirm User**: ✅ (check this to skip email confirmation)
3. Click **"Create User"**
4. User can now sign in with this email and password
5. User can change password via "Forgot Password" if needed

---

## SQL Queries to Check User Status

Run these in **Supabase SQL Editor**:

```sql
-- Check if user exists in auth.users
SELECT 
  id,
  email,
  encrypted_password IS NOT NULL as has_password,
  email_confirmed_at IS NOT NULL as email_confirmed,
  created_at
FROM auth.users
WHERE email = 'reynoldantoine@gmail.com';

-- Check if user exists in public.users
SELECT 
  id,
  email,
  name,
  user_type,
  created_at
FROM public.users
WHERE email = 'reynoldantoine@gmail.com';

-- Check both tables together
SELECT 
  au.id as auth_id,
  au.email as auth_email,
  au.email_confirmed_at,
  pu.id as profile_id,
  pu.name,
  pu.user_type
FROM auth.users au
FULL OUTER JOIN public.users pu ON au.id = pu.id
WHERE au.email = 'reynoldantoine@gmail.com' 
   OR pu.email = 'reynoldantoine@gmail.com';
```

---

## Still Not Working?

1. **Check Supabase Project Status**: Make sure project is not paused
2. **Check Network Tab**: Look for failed API requests to Supabase
3. **Try Incognito Mode**: Rule out browser cache issues
4. **Check Supabase Logs**: Go to **Logs** → **Auth Logs** to see detailed errors
5. **Contact Support**: Share the exact error message from console

