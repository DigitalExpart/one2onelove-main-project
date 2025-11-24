# 🚀 Quick Fix: Session Logout Issues

## ✅ What I Fixed in Code:

1. **Changed storage key back** to `sb-one2one-love-auth-token` (consistent key = sessions persist)
2. **Added session recovery** - checks session every 5 minutes
3. **Added visibility handler** - restores session when you come back to tab
4. **Improved auth flow** - better handling of token refresh

## 🎯 What YOU Need to Do:

### Step 1: Update Supabase Dashboard (5 minutes)

1. **Go to Supabase Dashboard**: https://app.supabase.com
2. **Select your project**
3. **Click**: `Authentication` → `Settings`
4. **Find "JWT Expiry"** and change to: `604800` (this is 7 days)
5. **Enable "Refresh Token Rotation"**: ✅ ON
6. **Click Save** 💾

**Screenshot of where to find this:**
```
Supabase Dashboard
 └─ Authentication
     └─ Settings
         └─ JWT Expiry: [Change from 3600 to 604800]
         └─ Refresh Token Rotation: [Toggle ON ✅]
         └─ [Save] button
```

### Step 2: Clear Browser Storage (One Time)

**Option A: Quick Clear (Recommended)**
1. Press `F12` on your app page
2. Go to `Application` tab (Chrome) or `Storage` tab (Firefox)
3. Click `Local Storage` → Your website
4. Right-click → `Clear`
5. Close Developer Tools
6. Refresh page with `Ctrl + Shift + R`

**Option B: Full Clear (if Option A doesn't work)**
1. Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
2. Check these boxes:
   - ✅ Cookies and site data
   - ✅ Cached images and files
3. Time range: `All time`
4. Click `Clear data`
5. Close browser completely
6. Reopen browser

### Step 3: Test It!

1. **Sign in** to your app
2. **Refresh the page** → Should stay logged in ✅
3. **Close browser** → Reopen → Should stay logged in ✅
4. **Wait 30 minutes** → Should stay logged in ✅

## 🎉 After This:

✅ No more clearing cache to sign in  
✅ No more logout on refresh  
✅ No more logout after inactivity  
✅ Sessions last **7 days**  

## 🐛 Still Having Issues?

### Check Console for Errors:
1. Press `F12`
2. Go to `Console` tab
3. Look for errors in red
4. Send me a screenshot

### Verify Session is Saved:
1. Press `F12`
2. Go to `Application` tab
3. Look for `sb-one2one-love-auth-token` under Local Storage
4. It should have a long value (your session)
5. If it's empty or missing, the session isn't being saved

## 📝 Files Updated:

- ✅ `src/lib/supabase.js` - Session configuration
- ✅ `src/contexts/AuthContext.jsx` - Auth flow improvements
- ✅ `SUPABASE_SESSION_FIX.md` - Detailed guide (if you need it)
- ✅ `supabase-session-config.sql` - Optional SQL checks

## 🔥 Important Notes:

⚠️ **DO NOT change the storage key** in `supabase.js` or it will log everyone out!  
⚠️ **Users must clear their browser storage ONE TIME** after this update  
✅ **After clearing once, sessions will persist forever** (7 days)  

---

**That's it! 3 steps and you're done!** 🎊

