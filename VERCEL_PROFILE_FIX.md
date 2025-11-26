# 🚨 FIX: Profile Page Not Loading on Vercel

## The Problem

- ✅ **Localhost**: Profile page works perfectly
- ❌ **Vercel**: Profile page shows blank screen
- **Errors**: `Failed to load api.tokenmint.global/v1` (ERR_NAME_NOT_RESOLVED)

---

## Root Cause

Your Vercel environment variables are **missing** or **incorrect**. The app needs Supabase credentials to load user profiles.

---

## ✅ SOLUTION: Configure Vercel Environment Variables

### Step 1: Get Your Supabase Credentials

1. Go to https://app.supabase.com
2. Select your project
3. Click **"Settings"** (gear icon in left sidebar)
4. Click **"API"** in the settings menu
5. Copy these values:
   - **Project URL** (e.g., `https://hphhmjcutesqsdnubnnw.supabase.co`)
   - **anon public** key (the long key under "Project API keys")

---

### Step 2: Add Environment Variables to Vercel

1. Go to https://vercel.com/dashboard
2. Click on your project: **one2-one-love**
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in the left menu
5. Add these 2 variables:

#### Variable 1:
- **Key**: `VITE_SUPABASE_URL`
- **Value**: Your Supabase Project URL (from Step 1)
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

#### Variable 2:
- **Key**: `VITE_SUPABASE_ANON_KEY`
- **Value**: Your Supabase anon public key (from Step 1)
- **Environments**: ✅ Production, ✅ Preview, ✅ Development

6. Click **"Save"** for each variable

---

### Step 3: Redeploy Your Project

**Option A: Automatic Redeploy (Recommended)**
1. In Vercel, go to your project
2. Click the **"Deployments"** tab
3. Click the **"..."** menu on the latest deployment
4. Click **"Redeploy"**
5. Wait 2-3 minutes for deployment to complete

**Option B: Trigger New Deployment from GitHub**
1. Make any small change to your code (e.g., add a comment)
2. Commit and push to GitHub
3. Vercel will automatically redeploy

---

## 🎯 Verify It Works

1. Wait for Vercel deployment to complete (you'll see "Ready" status)
2. Go to: https://one2-one-love.vercel.app/profile
3. You should now see the profile page! ✅

---

## 🔍 Still Not Working? Debug Steps

### Check 1: Verify Environment Variables Are Set

1. In Vercel → Settings → Environment Variables
2. You should see:
   ```
   VITE_SUPABASE_URL = https://hphhmjcutesqsdnubnnw.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGci... (long key)
   ```
3. If missing or wrong → Update and redeploy

### Check 2: Check Vercel Build Logs

1. Go to Vercel → Deployments
2. Click on the latest deployment
3. Click **"Build Logs"**
4. Look for errors like:
   - `❌ Supabase Configuration Missing!`
   - `Error: Cannot read properties of undefined`
5. If you see these → Environment variables didn't load → Redeploy

### Check 3: Check Browser Console

1. Open your Vercel app: https://one2-one-love.vercel.app/profile
2. Open DevTools (F12)
3. Go to **Console** tab
4. Look for errors:
   - ✅ If no errors → Working!
   - ❌ If `ERR_NAME_NOT_RESOLVED` → Environment variables missing → Redeploy
   - ❌ If `Invalid login credentials` → User doesn't exist in Supabase Auth → Follow `IMMEDIATE_LOGIN_FIX.md`

### Check 4: Compare Localhost vs Vercel

**Localhost `.env` file:**
```bash
VITE_SUPABASE_URL=https://hphhmjcutesqsdnubnnw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

**Vercel Environment Variables** (must match exactly):
```
VITE_SUPABASE_URL = https://hphhmjcutesqsdnubnnw.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGci...
```

If they don't match → Update Vercel → Redeploy

---

## 📋 Quick Checklist

- [ ] Copied Supabase URL and anon key from Supabase Dashboard
- [ ] Added `VITE_SUPABASE_URL` to Vercel Environment Variables
- [ ] Added `VITE_SUPABASE_ANON_KEY` to Vercel Environment Variables
- [ ] Selected **all 3 environments** (Production, Preview, Development)
- [ ] Clicked "Save" for both variables
- [ ] Redeployed the project (waited for "Ready" status)
- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Profile page now loads ✅

---

## 🎥 Visual Guide

### Where to Find Supabase Credentials:
```
Supabase Dashboard
└── Your Project
    └── Settings (⚙️)
        └── API
            ├── Project URL: https://xxx.supabase.co
            └── Project API keys
                └── anon public: eyJhbGci...
```

### Where to Add Vercel Environment Variables:
```
Vercel Dashboard
└── Your Project (one2-one-love)
    └── Settings
        └── Environment Variables
            └── Add New
                ├── Key: VITE_SUPABASE_URL
                ├── Value: https://xxx.supabase.co
                └── Environments: ✅ All
```

---

## 🆘 Emergency: Create .env File

If you lost your `.env` file, create a new one in your project root:

**File: `.env`** (in project root directory)
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://hphhmjcutesqsdnubnnw.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace `your-anon-key-here` with the actual key from Supabase Dashboard → Settings → API.

---

## ✅ Expected Result

After following these steps:
- ✅ Profile page loads on Vercel
- ✅ No console errors
- ✅ User data displays correctly
- ✅ Subscription info shows "Basic" plan
- ✅ Profile completion shows 64%

---

## 🚀 Pro Tips

1. **Always set environment variables for all 3 environments** (Production, Preview, Development)
2. **Never commit `.env` to GitHub** (it's already in `.gitignore`)
3. **After changing environment variables, always redeploy** (they don't update automatically)
4. **Use the same values on Vercel as in your local `.env` file**
5. **Check Vercel build logs** if something doesn't work after deploy

---

## Need More Help?

If profile still doesn't load after this:
1. Share the Vercel build logs (Deployments → Latest → Build Logs)
2. Share browser console errors (F12 → Console)
3. Confirm environment variables are visible in Vercel Settings

