# 🚀 Deploy From Scratch - Complete Guide

## ✅ Your Current Setup Status

### Files Present ✅
- ✅ `vercel.json` - Configured correctly
- ✅ `package.json` - All dependencies listed
- ✅ `vite.config.js` - Vite configuration correct
- ✅ `.gitignore` - `.env` is properly ignored
- ✅ `src/` directory with all source files
- ✅ All Supabase SQL migration files

### Configuration Review

**vercel.json** - ✅ Correct
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**package.json** - ✅ Correct
- Build command: `vite build` ✅
- Dev command: `vite dev` ✅
- All dependencies present ✅

---

## 🎯 Complete Deployment Checklist

### Phase 1: Local Environment ✅ (Prerequisites)

- [ ] **1.1** Node.js installed (v18 or higher)
- [ ] **1.2** npm installed
- [ ] **1.3** Git installed and configured
- [ ] **1.4** `.env` file exists in project root with:
  ```bash
  VITE_SUPABASE_URL=https://hphhmjcutesqsdnubnnw.supabase.co
  VITE_SUPABASE_ANON_KEY=your-actual-anon-key
  ```
- [ ] **1.5** Run `npm install` successfully
- [ ] **1.6** Run `npm run dev` and verify app works on localhost:5173

---

### Phase 2: Supabase Setup ✅ (Backend)

- [ ] **2.1** Supabase project created (already done: `hphhmjcutesqsdnubnnw`)
- [ ] **2.2** Run all required SQL schemas (in this order):
  1. `supabase-complete-schema.sql` (base tables)
  2. `supabase-base44-replacement-tables.sql` (required!)
  3. `supabase-add-message-status-columns.sql` (chat status)
  4. `supabase-fix-message-read-rls.sql` (chat permissions)
  5. `supabase-fix-unread-count-trigger.sql` (badge counts)
  6. `supabase-storage-profile-pictures.sql` (profile pictures)
  7. `supabase-relationship-goals-schema.sql` (goals)
  8. `supabase-milestones-schema.sql` (milestones)
  9. Other feature schemas as needed

- [ ] **2.3** Verify tables exist in Supabase:
  - Go to Database → Tables
  - Should see: `users`, `conversations`, `messages`, `relationship_goals`, etc.

- [ ] **2.4** Configure Authentication:
  - Go to Authentication → Settings
  - **Enable Email Provider** ✅
  - **Disable Email Confirmations** (or set `emailRedirectTo`)
  - Add these URLs to **Redirect URLs**:
    - `http://localhost:5173/**`
    - `https://one2-one-love.vercel.app/**`
    - `https://*.vercel.app/**` (for preview deployments)

- [ ] **2.5** Configure Storage:
  - Go to Storage → Create new bucket: `profile-pictures`
  - Make it public
  - Set allowed file types: `image/*`

- [ ] **2.6** Get API credentials:
  - Go to Settings → API
  - Copy **Project URL** (e.g., `https://hphhmjcutesqsdnubnnw.supabase.co`)
  - Copy **anon public** key (under "Project API keys")

---

### Phase 3: GitHub Setup 🔧 (Version Control)

- [ ] **3.1** Initialize git (if not done):
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  ```

- [ ] **3.2** Create GitHub repository (or use existing):
  - Go to https://github.com/new
  - Repository name: `one-2-one-love` (or your preferred name)
  - Set to **Private** (recommended)
  - Do NOT initialize with README (you already have one)

- [ ] **3.3** Link local repo to GitHub:
  ```bash
  git remote add origin https://github.com/YOUR_USERNAME/one-2-one-love.git
  git branch -M main
  git push -u origin main
  ```

- [ ] **3.4** Verify files are on GitHub:
  - Go to your GitHub repository
  - Should see all files EXCEPT `.env` ✅

---

### Phase 4: Vercel Deployment 🚀 (Frontend Hosting)

- [ ] **4.1** Create Vercel account (if needed):
  - Go to https://vercel.com/signup
  - Sign up with GitHub (recommended)

- [ ] **4.2** Import project:
  - Click **"Add New..."** → **"Project"**
  - Select **"Import Git Repository"**
  - Find your GitHub repo: `one-2-one-love`
  - Click **"Import"**

- [ ] **4.3** Configure project settings:
  - **Framework Preset**: Vite ✅ (auto-detected)
  - **Build Command**: `npm run build` ✅ (auto-filled)
  - **Output Directory**: `dist` ✅ (auto-filled)
  - **Install Command**: `npm install` ✅ (auto-filled)

- [ ] **4.4** Add Environment Variables (CRITICAL!):
  
  Click **"Environment Variables"** section:
  
  **Variable 1:**
  - Name: `VITE_SUPABASE_URL`
  - Value: `https://hphhmjcutesqsdnubnnw.supabase.co` (your actual URL)
  - Environments: ✅ Production, ✅ Preview, ✅ Development
  
  **Variable 2:**
  - Name: `VITE_SUPABASE_ANON_KEY`
  - Value: `eyJhbGci...` (your actual anon key - the long one)
  - Environments: ✅ Production, ✅ Preview, ✅ Development

- [ ] **4.5** Click **"Deploy"**
  - Wait 2-3 minutes for build to complete
  - Watch the build logs for errors

- [ ] **4.6** Verify deployment success:
  - Status should show ✅ **"Ready"**
  - You'll get a URL like: `https://one2-one-love.vercel.app`

---

### Phase 5: Post-Deployment Testing ✅ (Verification)

- [ ] **5.1** Test Homepage:
  - Go to: `https://one2-one-love.vercel.app`
  - Should load without errors ✅

- [ ] **5.2** Test Sign Up:
  - Go to: `https://one2-one-love.vercel.app/signup`
  - Try creating a new account
  - Should work and redirect to profile ✅

- [ ] **5.3** Test Sign In:
  - Go to: `https://one2-one-love.vercel.app/signin`
  - Sign in with the account you just created
  - Should work ✅

- [ ] **5.4** Test Profile Page:
  - Go to: `https://one2-one-love.vercel.app/profile`
  - Should display your profile (not blank!) ✅
  - Should show subscription: "Basic" ✅

- [ ] **5.5** Test Chat:
  - Go to: `https://one2-one-love.vercel.app/chat`
  - Should load without errors ✅

- [ ] **5.6** Check Browser Console:
  - Press F12 → Console tab
  - Should have NO red errors ✅
  - If you see `ERR_NAME_NOT_RESOLVED` → Environment variables not set correctly

---

## 🔍 Common Issues & Fixes

### Issue 1: "Build Failed" on Vercel

**Symptoms:**
- Build logs show errors
- Deployment fails

**Fix:**
1. Check build logs for specific error
2. Most common: Missing dependencies
   - Run `npm install` locally
   - Commit and push `package-lock.json`
3. If "Module not found":
   - Check import paths (case-sensitive!)
   - Ensure all files are committed to git

---

### Issue 2: Profile Page Blank on Vercel (but works on localhost)

**Symptoms:**
- Localhost works fine
- Vercel shows blank page
- Console error: `ERR_NAME_NOT_RESOLVED`

**Fix:**
1. Environment variables missing
2. Go to Vercel → Settings → Environment Variables
3. Add both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. Select **all 3 environments** (Production, Preview, Development)
5. Redeploy: Deployments → "..." → "Redeploy"

---

### Issue 3: "Invalid Login Credentials"

**Symptoms:**
- Can't sign in
- Error: "Invalid login credentials"
- User exists in Supabase

**Fix:**
1. User may not exist in `auth.users` (only in `public.users`)
2. Go to Supabase → Authentication → Users
3. Check if user exists
4. If not, click "Add User" → Enter email and password → ✅ "Auto Confirm User"
5. Try signing in again

See `IMMEDIATE_LOGIN_FIX.md` for details.

---

### Issue 4: Sign Up Not Working

**Symptoms:**
- Sign up form submits but nothing happens
- No error message

**Fix:**
1. Email confirmation might be blocking
2. Go to Supabase → Authentication → Settings → Email Auth
3. **Disable email confirmations** OR
4. Add proper redirect URL: `https://one2-one-love.vercel.app/**`

See `VERCEL_SIGNUP_FIX.md` for details.

---

### Issue 5: Images Not Loading

**Symptoms:**
- Profile pictures don't display
- 404 errors for images

**Fix:**
1. Supabase Storage not configured
2. Go to Supabase → Storage
3. Create bucket: `profile-pictures`
4. Make it **public**
5. Run SQL: `supabase-storage-profile-pictures.sql`

---

## 📋 Quick Command Reference

### Local Development
```bash
# Install dependencies
npm install

# Run dev server (localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Git Commands
```bash
# Add all changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push to GitHub
git push origin main

# Check status
git status

# View commit history
git log --oneline
```

### Vercel CLI (Optional)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs
```

---

## 🎯 Deployment URLs

After successful deployment, you'll have these URLs:

- **Production**: `https://one2-one-love.vercel.app`
- **Preview** (for each git push): `https://one2-one-love-git-[branch].vercel.app`
- **Localhost**: `http://localhost:5173`

---

## ✅ Final Verification Checklist

Before considering deployment complete:

- [ ] Homepage loads on Vercel ✅
- [ ] Sign up works ✅
- [ ] Sign in works ✅
- [ ] Profile page loads (not blank) ✅
- [ ] Chat loads ✅
- [ ] No console errors ✅
- [ ] All images load ✅
- [ ] Database queries work ✅
- [ ] Real-time updates work ✅
- [ ] Mobile responsive ✅

---

## 🆘 Need Help?

If you're stuck:

1. **Check build logs**: Vercel → Deployments → Click deployment → View logs
2. **Check browser console**: F12 → Console tab
3. **Check Supabase logs**: Supabase → Logs & Analytics
4. **Verify environment variables**: Vercel → Settings → Environment Variables
5. **Test locally first**: `npm run build && npm run preview`

---

## 📚 Related Documentation

- `VERCEL_PROFILE_FIX.md` - Fix blank profile page
- `IMMEDIATE_LOGIN_FIX.md` - Fix login issues
- `VERCEL_SIGNUP_FIX.md` - Fix signup issues
- `SETUP_ENVIRONMENT.md` - Environment setup details
- `BASE44_REMOVAL_SQL_SETUP.md` - Database schema setup

---

## 🎉 Success!

Once all checklist items are complete, your app is fully deployed and ready for users!

**Your live app**: https://one2-one-love.vercel.app

Remember:
- Any git push to `main` → Automatic deployment to production
- Any git push to other branches → Preview deployment
- Environment variables can be changed in Vercel Settings (requires redeploy)

