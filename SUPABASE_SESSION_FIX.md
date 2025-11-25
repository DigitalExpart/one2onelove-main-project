# Fix Session Persistence Issues

## Problem
- Getting logged out on browser refresh
- Need to clear cache to sign in
- Getting logged out after being inactive

## Solution

### 1. Update Supabase Dashboard Settings

Go to your **Supabase Dashboard** and follow these steps:

#### A. Increase JWT Expiry Time

1. Go to **Authentication** → **Settings** (or **Project Settings** → **Auth**)
2. Find **JWT Expiry** settings
3. Change the following values:
   - **JWT expiry limit**: Change from `3600` (1 hour) to `604800` (7 days)
   - **Refresh token rotation**: Keep **ENABLED**
   - **Reuse interval**: Keep default (usually 10 seconds)
4. Click **Save**

#### B. Configure Session Settings

1. In the same **Auth Settings** page:
   - **Enable auto-refresh tokens**: ✅ Enabled
   - **Session timeout**: Set to `604800` seconds (7 days) or higher
   - **Inactivity timeout**: Set to `0` to disable (or set to a high value like `86400` for 24 hours)
2. Click **Save**

#### C. Update Email Settings (if email confirmation is required)

1. Go to **Authentication** → **Email Templates**
2. Find **Email Confirmation** section
3. Check if **Confirm email** is required
4. If you want users to stay logged in without email confirmation:
   - Go to **Authentication** → **Providers**
   - Find **Email** provider
   - **Disable** "Confirm email" (or keep enabled for production)
   - Click **Save**

### 2. Clear Browser Storage (One Time Only)

After updating Supabase settings, users need to clear their browser storage **one time**:

1. Open **Developer Tools** (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Find **Local Storage** → Your domain
4. Delete the old session key if it exists
5. Close Developer Tools
6. Refresh the page
7. Sign in again

### 3. What Changed in the Code

The code has been updated with:

✅ **Consistent storage key**: `sb-one2one-love-auth-token`
- This ensures sessions persist across refreshes
- DO NOT change this key or users will be logged out

✅ **Automatic token refresh**: 
- Tokens refresh 60 seconds before expiry
- No user action required

✅ **Session recovery**:
- Checks session every 5 minutes
- Restores session when tab becomes visible again
- Handles page visibility changes

✅ **Better error handling**:
- Gracefully handles expired sessions
- Automatic retry on session errors

### 4. How to Test

1. **Sign in** to your app
2. **Close the browser** completely
3. **Open the browser** again and go to your app
4. ✅ You should **still be signed in**

5. **Leave the tab open** for 30 minutes
6. **Come back** and interact with the app
7. ✅ You should **still be signed in**

8. **Refresh the page** (F5 or Ctrl+R)
9. ✅ You should **still be signed in**

### 5. Troubleshooting

#### Still getting logged out?

1. **Check Supabase Dashboard**:
   - Go to **Authentication** → **Users**
   - Verify your user account exists
   - Check if email is confirmed (if required)

2. **Check Browser Console** (F12):
   - Look for `🚀 AuthContext: Initializing...`
   - Look for `✅ Session found for: [your-email]`
   - If you see `❌ Error getting session`, there's a configuration issue

3. **Check localStorage**:
   - Open Developer Tools (F12)
   - Go to **Application** → **Local Storage**
   - Look for key: `sb-one2one-love-auth-token`
   - It should contain a long JSON string with your session data
   - If it's missing or empty, the session isn't being saved

4. **Test with Incognito/Private Window**:
   - Open an incognito window
   - Sign in
   - Close the incognito window
   - Open a new incognito window and go to your app
   - If you're logged out here, it's expected (incognito clears on close)
   - Test in a regular window instead

#### Need to clear cache to sign in?

This means there's a corrupted session in localStorage:

1. Open Developer Tools (F12)
2. Go to **Console** tab
3. Run: `localStorage.clear()`
4. Refresh the page
5. Try signing in again

## Summary

✅ **Code changes made**: Session persistence improved
✅ **Supabase settings**: Increase JWT expiry to 7 days (604800 seconds)
✅ **Storage key**: Now consistent across sessions
✅ **Auto-refresh**: Tokens refresh automatically
✅ **Visibility handling**: Session restored when tab becomes active

**After making these changes, users should stay logged in for 7 days!**

