# Fix Sign-Up Issue - RLS Policy Missing

## The Problem

Sign-up is failing with error: **"new row violates row-level security policy for table 'users'"**

This means:
- ✅ User account created in Supabase Auth
- ❌ User profile cannot be inserted into the `users` table due to missing RLS policy

## The Solution

Add a Row Level Security (RLS) policy that allows users to insert their own profile during signup.

## Steps to Fix

### 1. Go to Supabase Dashboard

1. Open https://app.supabase.com
2. Select your project
3. Go to **SQL Editor** (in the left sidebar)

### 2. Run This SQL Command

Copy and paste this into the SQL Editor:

```sql
-- Add RLS policy to allow user profile creation during signup
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT 
  WITH CHECK (auth.uid() = id);
```

### 3. Click "Run" or Press `Ctrl+Enter`

You should see: **"Success. No rows returned"**

### 4. Test Sign-Up Again

1. Go back to your app: http://localhost:5174/signup
2. Fill out the form
3. Click **Create Account**
4. Should work now! ✅

## What This Does

This SQL command creates a policy that says:
- **"When a user is authenticated and trying to INSERT a row into the users table, allow it IF the user's ID matches the row's ID"**

This allows users to create their own profile during signup, while still preventing them from creating profiles for other users.

## Verify It Worked

After running the SQL, you can verify the policy exists:

```sql
SELECT * FROM pg_policies WHERE tablename = 'users';
```

You should see policies including:
- ✅ "Users can view own profile" (SELECT)
- ✅ "Users can update own profile" (UPDATE)
- ✅ "Users can insert own profile" (INSERT) ← **This is the new one!**

## Alternative: Disable Email Confirmation (Optional)

If you also want to disable email confirmation for faster testing:

1. Go to **Authentication** → **Settings** in Supabase
2. Scroll to **Email Auth**
3. **Uncheck** "Enable email confirmations"
4. Click **Save**

This way users can sign in immediately without confirming their email.

## Still Having Issues?

If signup still fails after running the SQL:
1. Check the browser console for new error messages
2. Verify the SQL was executed successfully (no errors)
3. Try signing up with a **different email address**
4. Check Supabase Dashboard → **Authentication** → **Users** to see if the user was created

