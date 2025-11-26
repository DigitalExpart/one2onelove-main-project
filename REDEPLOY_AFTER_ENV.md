# 🔄 Redeploy After Setting Environment Variables

## Why Redeploy?

Environment variables are **baked into the build** at build-time (not runtime).

When you add environment variables, the old deployment still has the **placeholder values** from the previous build.

---

## ✅ How to Redeploy on Vercel

### Option 1: Redeploy from Vercel Dashboard (Fastest)

1. Go to https://vercel.com/dashboard
2. Click on your project: **one2-one-love**
3. Click **"Deployments"** tab
4. Find the most recent deployment (top of the list)
5. Click the **"..."** (three dots menu) on the right
6. Click **"Redeploy"**
7. In the popup, click **"Redeploy"** again to confirm
8. ⏱️ Wait 2-3 minutes for the build to complete

### Option 2: Trigger New Deployment via Git Push

1. Make a small change to any file (e.g., add a comment)
2. Commit and push:
   ```bash
   git add .
   git commit -m "Trigger redeploy"
   git push origin main
   ```
3. Vercel will automatically detect the push and redeploy
4. ⏱️ Wait 2-3 minutes

---

## 🎯 After Redeployment

1. **Wait for "Ready" status** in Vercel Deployments
2. **Hard refresh your browser** (Ctrl+Shift+R or Cmd+Shift+R)
3. Go to: https://one2-one-love.vercel.app/profile
4. Should now work! ✅

---

## 🔍 How to Verify It Worked

### Check 1: Build Logs
1. Go to Vercel → Deployments → Click latest deployment
2. Click **"Building"** or **"Build Logs"**
3. Look for: `✓ Environment variables loaded`
4. Should NOT see: `❌ Supabase Configuration Missing!`

### Check 2: Browser Console
1. Go to your Vercel app
2. Press F12 → Console tab
3. Should have **NO errors** like:
   - ❌ `net::ERR_NAME_NOT_RESOLVED` 
   - ❌ `Failed to load resource: net::ERR_NAME_NOT_RESOLVED`
4. If you still see these → Environment variables didn't load → Check Vercel settings

### Check 3: Profile Page
1. Go to: https://one2-one-love.vercel.app/profile
2. Should show:
   - ✅ Your name
   - ✅ Profile picture
   - ✅ Subscription: "Basic"
   - ✅ Profile completion: 64%
3. NOT blank white screen ✅

---

## ⚠️ Common Mistakes

### Mistake 1: Not Redeploying
- **Problem**: Added environment variables but didn't redeploy
- **Symptom**: Page still blank, same errors
- **Fix**: Redeploy (see Option 1 or 2 above)

### Mistake 2: Not Waiting for Deployment
- **Problem**: Checking app before deployment finishes
- **Symptom**: Still seeing old version
- **Fix**: Wait for "Ready" status, then hard refresh browser

### Mistake 3: Not Selecting All Environments
- **Problem**: Only selected "Production" environment
- **Symptom**: Preview deployments don't work
- **Fix**: Go back to Environment Variables → Edit → Select all 3 environments → Redeploy

### Mistake 4: Browser Cache
- **Problem**: Browser showing old cached version
- **Symptom**: Seeing old errors even after successful deploy
- **Fix**: Hard refresh (Ctrl+Shift+R) or clear cache

---

## 📋 Quick Redeploy Checklist

- [ ] Environment variables added to Vercel ✅
- [ ] Selected all 3 environments (Production, Preview, Development) ✅
- [ ] Clicked "Redeploy" in Vercel Deployments
- [ ] Waited for "Ready" status (2-3 minutes)
- [ ] Hard refreshed browser (Ctrl+Shift+R)
- [ ] Profile page now loads ✅
- [ ] No console errors ✅

---

## 🆘 Still Not Working After Redeploy?

If you redeployed and it's still blank:

1. **Check environment variable values are correct**:
   - Go to Vercel → Settings → Environment Variables
   - Click "Show" on `VITE_SUPABASE_URL`
   - Should be: `https://hphhmjcutesqsdnubnnw.supabase.co`
   - If wrong → Edit → Save → Redeploy again

2. **Check build logs for errors**:
   - Vercel → Deployments → Latest → Build Logs
   - Look for red errors
   - Common issue: Import errors, syntax errors

3. **Test locally first**:
   ```bash
   npm run build
   npm run preview
   ```
   - If it works locally but not on Vercel → Environment variable issue
   - If it doesn't work locally → Code issue

4. **Compare local .env vs Vercel settings**:
   - Local `.env` file values
   - Should EXACTLY match Vercel Environment Variables
   - Case-sensitive!

---

## ✅ Expected Result

After redeployment with environment variables:

- ✅ All pages load without errors
- ✅ Profile page displays correctly
- ✅ Sign in/Sign up works
- ✅ Chat works
- ✅ Real-time updates work
- ✅ No `ERR_NAME_NOT_RESOLVED` errors
- ✅ Console is clean (no red errors)

---

## 🎉 You're Done When...

You can check off all these:

- [ ] Vercel shows "Ready" status
- [ ] Profile page loads (not blank)
- [ ] No console errors
- [ ] Can sign in successfully
- [ ] User data displays
- [ ] All features work

---

## 💡 Pro Tip

**Always redeploy after changing environment variables!**

Environment variables are not "hot-reloaded" - they're compiled into the build. Any change to env vars = redeploy needed.

