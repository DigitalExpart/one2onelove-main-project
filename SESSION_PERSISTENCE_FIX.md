# 🔐 Session Persistence Fix Guide

This guide will fix all session-related issues including:
- ❌ Need to clear cache to sign in
- ❌ Logged out on refresh
- ❌ Logged out after inactivity

## ✅ Changes Made to Code

### 1. **Updated Supabase Client Configuration** (`src/lib/supabase.js`)

**Improvements:**
- Changed storage key to `sb-one2one-love-session` (more specific)
- Enhanced session persistence settings
- Improved token refresh configuration
- Better error handling

### 2. **Updated AuthContext** (`src/contexts/AuthContext.jsx`)

**Improvements:**
- Better session restoration on app load
- Handle `INITIAL_SESSION` event for localStorage restoration
- Prevent unnecessary re-renders on token refresh
- Better cleanup on unmount
- Improved presence integration

## 🔧 Supabase Dashboard Configuration

### Step 1: Configure JWT Expiry (Session Duration)

1. **Go to Supabase Dashboard** → Your Project
2. **Navigate to:** `Authentication` → `Settings`
3. **Find:** `JWT Expiry` setting
4. **Set to:** `604800` (7 days in seconds)
   - This means users stay logged in for 7 days
   - You can adjust this:
     - 1 day = `86400`
     - 7 days = `604800` (recommended)
     - 30 days = `2592000`
5. **Click:** `Save`

### Step 2: Enable Refresh Token Rotation

1. **In the same settings page**
2. **Find:** `Refresh Token Rotation`
3. **Toggle:** `Enabled` ✅
4. **Set Reuse Interval:** `10` seconds
5. **Click:** `Save`

### Step 3: Configure Email Confirmation (Optional)

1. **Go to:** `Authentication` → `Settings` → `Auth Providers`
2. **Find:** Email provider settings
3. **For Testing:**
   - Disable `Confirm email` ❌
   - This allows instant login without email verification
4. **For Production:**
   - Enable `Confirm email` ✅
   - Users must verify email before signing in
5. **Click:** `Save`

### Step 4: Run SQL Configuration

1. **Go to:** `SQL Editor` in Supabase Dashboard
2. **Create New Query**
3. **Copy and paste** the contents of `supabase-session-config.sql`
4. **Click:** `Run`
5. **Verify:** Check output for any errors

## 🧹 Client-Side Cleanup (IMPORTANT!)

### For Users to Fix Their Browsers:

**Option 1: Clear Specific Storage (Recommended)**
1. Open your app in browser
2. Press `F12` to open Developer Tools
3. Go to `Application` tab (Chrome) or `Storage` tab (Firefox)
4. Under `Local Storage`, find your app's domain
5. Look for keys starting with `sb-`
6. Delete ALL `sb-` keys
7. Close Developer Tools
8. Refresh the page (`F5`)
9. Sign in again

**Option 2: Clear All Browser Cache (Nuclear Option)**
1. Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
2. Select:
   - ✅ Cookies and site data
   - ✅ Cached images and files
   - ✅ Site settings
3. Time range: `All time`
4. Click `Clear data`
5. **Close ALL browser tabs**
6. **Restart browser**
7. Open app and sign in

## 🧪 Testing the Fix

### Test 1: Basic Persistence
1. Sign in to your app
2. Refresh the page (`F5`)
3. ✅ **Expected:** Still signed in
4. ❌ **If failed:** Check console for errors

### Test 2: Tab Close
1. Sign in to your app
2. Close the browser tab
3. Open a new tab and go to your app
4. ✅ **Expected:** Still signed in
5. ❌ **If failed:** Check JWT expiry in Supabase settings

### Test 3: Browser Restart
1. Sign in to your app
2. Close entire browser (all windows)
3. Restart browser
4. Go to your app
5. ✅ **Expected:** Still signed in
6. ❌ **If failed:** Storage might not be persisting

### Test 4: Inactivity
1. Sign in to your app
2. Leave browser open but don't interact for 30 minutes
3. Return and try to use the app
4. ✅ **Expected:** Still signed in (auto token refresh)
5. ❌ **If failed:** Check Refresh Token Rotation setting

## 🐛 Debugging

### Check Session in Browser Console

Open browser console (`F12`) and run:

```javascript
// Check if session exists in localStorage
console.log('Session Key:', localStorage.getItem('sb-one2one-love-session'));

// Check Supabase session
supabase.auth.getSession().then(({ data, error }) => {
  console.log('Session:', data.session);
  console.log('User:', data.session?.user?.email);
  console.log('Expires:', new Date(data.session?.expires_at * 1000));
});

// Check if auto-refresh is working
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth Event:', event);
  if (event === 'TOKEN_REFRESHED') {
    console.log('✅ Token auto-refreshed successfully!');
  }
});
```

### Check Session in Supabase Dashboard

1. Go to: `Authentication` → `Users`
2. Click on a user
3. Scroll to `Sessions` section
4. Verify:
   - Session exists
   - `expires_at` is in the future
   - `revoked` is `false`

### Common Issues & Solutions

#### Issue: "Invalid JWT" error
**Solution:** 
- JWT has expired
- Clear localStorage and sign in again
- Increase JWT expiry in Supabase settings

#### Issue: "Refresh token not found"
**Solution:**
- Session was manually deleted
- Clear localStorage and sign in again
- Verify Refresh Token Rotation is enabled

#### Issue: Still logged out after all fixes
**Solution:**
1. Check browser console for errors
2. Verify all Supabase settings are correct
3. Try incognito/private browsing mode
4. Check if browser is blocking localStorage
5. Verify `.env` file has correct Supabase credentials

## 📊 Session Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    User Signs In                         │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│  Supabase Creates Session (JWT + Refresh Token)         │
│  - Access Token (JWT): Valid for [JWT Expiry] seconds   │
│  - Refresh Token: Valid for longer period               │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│  Session Saved to localStorage                          │
│  Key: 'sb-one2one-love-session'                         │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              User Uses App / Page Refresh               │
└─────────────────────────────────────────────────────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
    ┌──────────────────┐  ┌──────────────────────┐
    │ JWT Still Valid  │  │  JWT Expired         │
    └──────────────────┘  └──────────────────────┘
                │                     │
                │                     ▼
                │         ┌──────────────────────┐
                │         │ Auto Token Refresh   │
                │         │ (Uses Refresh Token) │
                │         └──────────────────────┘
                │                     │
                │                     ▼
                │         ┌──────────────────────┐
                │         │  New JWT Generated   │
                │         │ Session Updated in   │
                │         │    localStorage      │
                │         └──────────────────────┘
                │                     │
                └──────────┬──────────┘
                           │
                           ▼
            ┌──────────────────────────┐
            │   User Remains Logged In │
            └──────────────────────────┘
```

## ✅ Success Criteria

After applying all fixes, you should be able to:
- ✅ Sign in once and stay signed in
- ✅ Refresh the page without losing session
- ✅ Close and reopen browser without losing session
- ✅ Be inactive for extended periods without being logged out
- ✅ Never need to clear browser cache to sign in

## 🚀 Next Steps

1. **Commit and push** the code changes
2. **Configure Supabase** dashboard settings (JWT expiry, token rotation)
3. **Run SQL script** in Supabase SQL Editor
4. **Clear browser storage** (one-time cleanup)
5. **Test thoroughly** using the test cases above
6. **Monitor logs** in browser console for any auth events

## 📞 Support

If issues persist after following this guide:
1. Check browser console for specific errors
2. Verify all Supabase settings match this guide
3. Test in incognito mode to rule out extensions
4. Check Supabase project status (dashboard home page)

