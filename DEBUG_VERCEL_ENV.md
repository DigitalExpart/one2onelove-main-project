# 🔍 Debug Vercel Environment Variables

## Current Issue
Environment variables set in Vercel but app still not loading them properly.

## Steps to Verify Environment Variables

### Step 1: Check Variable Names (Case-Sensitive!)

Go to Vercel → Settings → Environment Variables

**MUST BE EXACTLY:**
```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

**NOT:**
- `VITE_SUPABASE_URL` ✅
- `Vite_Supabase_Url` ❌ (wrong case)
- `SUPABASE_URL` ❌ (missing VITE_ prefix)
- `REACT_APP_SUPABASE_URL` ❌ (wrong prefix - that's for Create React App)

---

### Step 2: Check Environments Are Selected

For BOTH variables, ensure you checked:
- ✅ Production
- ✅ Preview  
- ✅ Development

If you only selected "Production", preview deployments won't work.

---

### Step 3: Check Values Are Correct

Click "Show" next to each variable:

**VITE_SUPABASE_URL** should be:
```
https://hphhmjcutesqsdnubnnw.supabase.co
```
- NO trailing slash
- Must start with `https://`
- Must end with `.supabase.co`

**VITE_SUPABASE_ANON_KEY** should be:
```
eyJhbGci...  (very long string, ~300+ characters)
```
- Starts with `eyJ`
- No spaces
- No quotes around it

---

### Step 4: Force Clear Build Cache

Sometimes Vercel uses cached builds. Force a fresh build:

1. Go to Vercel → Settings → General
2. Scroll to "Build & Development Settings"
3. Find "Build Cache"
4. Click **"Clear Build Cache"**
5. Go to Deployments → Redeploy (uncheck "Use existing Build Cache")

---

### Step 5: Check Build Logs

After redeployment:

1. Go to Deployments → Click latest deployment
2. Click "Building" or "Build Logs"
3. Search for "VITE" in the logs
4. You should see something like:
   ```
   ✓ Environment variables loaded
   VITE_SUPABASE_URL=https://...
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
5. If you see `undefined` or empty → Variables not loading

---

### Step 6: Test in Production URL

After successful deployment:

1. Go to: `https://one2-one-love.vercel.app`
2. Open DevTools (F12)
3. Go to Console tab
4. Type this and press Enter:
   ```javascript
   console.log(import.meta.env.VITE_SUPABASE_URL)
   ```
5. Should show: `https://hphhmjcutesqsdnubnnw.supabase.co`
6. If it shows `undefined` → Environment variables not in build

---

## Common Mistakes

### Mistake 1: Wrong Variable Name
```
❌ SUPABASE_URL (missing VITE_ prefix)
✅ VITE_SUPABASE_URL
```

### Mistake 2: Added Quotes
```
❌ "https://hphhmjcutesqsdnubnnw.supabase.co"
✅ https://hphhmjcutesqsdnubnnw.supabase.co
```

### Mistake 3: Not All Environments Selected
```
❌ Only "Production" selected
✅ Production, Preview, Development all selected
```

### Mistake 4: Didn't Redeploy After Adding
```
❌ Added variables but didn't redeploy
✅ Added variables → Redeployed → Waited for "Ready"
```

---

## Alternative: Add via Vercel CLI

If dashboard isn't working, try CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Add environment variables
vercel env add VITE_SUPABASE_URL production
# Paste value when prompted: https://hphhmjcutesqsdnubnnw.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# Paste your anon key when prompted

# Redeploy
vercel --prod
```

---

## Nuclear Option: Delete & Re-add

If nothing works:

1. **Delete both environment variables**:
   - Vercel → Settings → Environment Variables
   - Click trash icon next to each variable
   - Confirm deletion

2. **Wait 30 seconds**

3. **Re-add them** (copy-paste carefully):
   
   **Variable 1:**
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://hphhmjcutesqsdnubnnw.supabase.co`
   - Environments: ALL 3 checked

   **Variable 2:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: (your long anon key)
   - Environments: ALL 3 checked

4. **Clear build cache**:
   - Settings → General → Clear Build Cache

5. **Redeploy**:
   - Deployments → "..." → Redeploy
   - **Uncheck** "Use existing Build Cache"
   - Wait for "Ready" status

6. **Hard refresh browser**:
   - Ctrl+Shift+R (Windows)
   - Cmd+Shift+R (Mac)

---

## Screenshot Verification

Take screenshots and verify:

### Screenshot 1: Environment Variables Page
Should show:
```
VITE_SUPABASE_URL          https://hphhmjcu...     All Environments     7m ago
VITE_SUPABASE_ANON_KEY     eyJhbGci...             All Environments     7m ago
```

### Screenshot 2: Build Logs
Should show:
```
✓ Building...
✓ Compiled successfully
✓ Environment variables loaded
```

### Screenshot 3: Deployment Status
Should show:
```
✅ Ready
```

---

## Still Not Working?

If you've tried everything:

1. **Share the build logs** (Deployments → Latest → Copy build logs)
2. **Share screenshot of Environment Variables page**
3. **Verify your local .env file works** (localhost should work)
4. **Try deploying to a new Vercel project** (to rule out project-specific issues)

The issue is 99% likely to be:
- Variable name typo
- Missing VITE_ prefix
- Not all environments selected
- Didn't redeploy after adding
- Build cache issue

