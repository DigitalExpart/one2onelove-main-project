# ✅ Stripe Setup Checklist - Step by Step

Follow this guide to set up Stripe for One 2 One Love. Check off each step as you complete it!

---

## 🎯 Step 1: Database Setup (5 minutes)

### ✅ Run SQL Migration

1. Open your browser and go to **Supabase Dashboard**
2. Click on your project: **One 2 One Love**
3. In the left sidebar, click **SQL Editor**
4. Click **New Query**
5. Open the file `supabase-add-payment-fields.sql` from your project
6. Copy ALL the content from that file
7. Paste it into the Supabase SQL Editor
8. Click **Run** (or press Ctrl/Cmd + Enter)

**Expected Result:** You should see "Success. No rows returned"

### Verify It Worked

Run this query to verify:
```sql
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'users' 
  AND column_name LIKE '%stripe%';
```

You should see:
- `stripe_customer_id`
- `stripe_subscription_id`

✅ **Database Setup Complete!**

---

## 💳 Step 2: Create Stripe Account (3 minutes)

### Option A: New User
1. Go to https://stripe.com
2. Click **Sign up**
3. Enter your email and create a password
4. Verify your email
5. Complete the account setup

### Option B: Existing User
1. Go to https://dashboard.stripe.com
2. Log in with your credentials

**Important:** You'll be in **Test Mode** by default - that's perfect for now!

✅ **Stripe Account Ready!**

---

## 🔑 Step 3: Get Your API Keys (2 minutes)

1. In Stripe Dashboard, click **Developers** (top right)
2. Click **API keys** in the left menu
3. You'll see two keys:

### Publishable Key (Safe to expose)
- Look for: **Publishable key** 
- It starts with: `pk_test_...`
- Click **Reveal test key**
- **Copy this key** - we'll use it in Step 6

### Secret Key (Keep private!)
- Look for: **Secret key**
- It starts with: `sk_test_...`
- Click **Reveal test key**
- **Copy this key** - we'll use it in Step 7

⚠️ **IMPORTANT:** Never commit the secret key to Git!

✅ **API Keys Obtained!**

---

## 📦 Step 4: Create Products in Stripe (7 minutes)

### Create Product 1: Premiere Plan

1. In Stripe Dashboard, click **Products** (top menu or left sidebar)
2. Click **Add product** button
3. Fill in:
   - **Name:** `Premiere Plan - One 2 One Love`
   - **Description:** `Most Popular - For couples ready to grow together`
   - **Image:** (Optional) Upload a logo
4. Under **Pricing:**
   - Click **Add pricing**
   - **Price:** `19.99`
   - **Currency:** `USD`
   - **Billing period:** `Monthly` (select "Recurring")
5. Click **Save product**
6. **IMPORTANT:** Copy the **Price ID** (it starts with `price_...`)
   - You'll find it under the pricing section
   - Example: `price_1ABCdefGHIjklMNO`
   - **Save this** - we'll need it in Step 7!

### Create Product 2: Exclusive Plan

1. Click **Add product** again
2. Fill in:
   - **Name:** `Exclusive Plan - One 2 One Love`
   - **Description:** `Ultimate Experience - The complete relationship toolkit`
   - **Image:** (Optional) Upload a logo
3. Under **Pricing:**
   - Click **Add pricing**
   - **Price:** `39.99`
   - **Currency:** `USD`
   - **Billing period:** `Monthly` (select "Recurring")
4. Click **Save product**
5. **IMPORTANT:** Copy the **Price ID** (starts with `price_...`)
   - **Save this** - we'll need it in Step 7!

✅ **Products Created!**

**Summary - Save These:**
- Premiere Price ID: `price_________________`
- Exclusive Price ID: `price_________________`

---

## 🔧 Step 5: Find Your Supabase Project Reference (2 minutes)

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your **One 2 One Love** project
3. Click **Settings** (gear icon in left sidebar)
4. Click **General**
5. Find **Reference ID** (or **Project Ref**)
   - It's a string like: `abcdefghijklmnop`
   - **Copy this** - we'll use it in Step 7

✅ **Project Ref Obtained!**

---

## 📝 Step 6: Add Frontend Environment Variable (2 minutes)

1. Open your project in your code editor
2. Find or create a file called `.env` in the root directory
3. Add this line (replace with YOUR publishable key):

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

4. **Save the file**

**Example:**
```env
VITE_SUPABASE_URL=https://abcdefg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51ABCdef123456789...
```

✅ **Frontend Environment Variable Set!**

---

## ⚙️ Step 7: Deploy Edge Functions & Set Secrets (10 minutes)

### Link Your Supabase Project

Open your terminal in the project directory and run:

```bash
npx supabase link --project-ref your-project-ref-here
```

Replace `your-project-ref-here` with the Reference ID from Step 5.

**Example:**
```bash
npx supabase link --project-ref abcdefghijklmnop
```

It may ask for your database password - enter it.

### Set Backend Secrets

Run these commands one by one:

#### 1. Set Stripe Secret Key
```bash
npx supabase secrets set STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

#### 2. Set Premiere Price ID
```bash
npx supabase secrets set STRIPE_PRICE_PREMIERE=price_your_premiere_id_here
```

#### 3. Set Exclusive Price ID
```bash
npx supabase secrets set STRIPE_PRICE_EXCLUSIVE=price_your_exclusive_id_here
```

**Example (with fake values):**
```bash
npx supabase secrets set STRIPE_SECRET_KEY=sk_test_51ABCdef123456789...
npx supabase secrets set STRIPE_PRICE_PREMIERE=price_1MNOPQRstuvwxyz
npx supabase secrets set STRIPE_PRICE_EXCLUSIVE=price_1XYZabcDEFghijk
```

### Deploy Edge Functions

#### Deploy Checkout Function
```bash
npx supabase functions deploy create-checkout-session
```

Wait for it to complete. You should see: ✅ Deployed successfully

#### Deploy Webhook Function
```bash
npx supabase functions deploy stripe-webhook
```

Wait for it to complete. You should see: ✅ Deployed successfully

### Verify Deployment

```bash
npx supabase functions list
```

You should see both functions listed:
- `create-checkout-session`
- `stripe-webhook`

✅ **Edge Functions Deployed!**

---

## 🔗 Step 8: Configure Stripe Webhook (5 minutes)

### Get Your Webhook URL

Your webhook URL is:
```
https://YOUR-PROJECT-REF.supabase.co/functions/v1/stripe-webhook
```

Replace `YOUR-PROJECT-REF` with your actual project reference from Step 5.

**Example:**
```
https://abcdefghijklmnop.supabase.co/functions/v1/stripe-webhook
```

### Create Webhook in Stripe

1. Go to **Stripe Dashboard** → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. In **Endpoint URL**, paste your webhook URL (from above)
4. Click **Select events**
5. Search and select these 6 events:
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.payment_succeeded`
   - ✅ `invoice.payment_failed`
6. Click **Add events**
7. Click **Add endpoint**

### Get Webhook Signing Secret

1. You'll see your new webhook endpoint listed
2. Click on it to view details
3. In the **Signing secret** section, click **Reveal**
4. Copy the secret (starts with `whsec_...`)

### Set Webhook Secret

In your terminal, run:
```bash
npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
```

### Redeploy Webhook Function

```bash
npx supabase functions deploy stripe-webhook
```

✅ **Webhook Configured!**

---

## 🧪 Step 9: Test the Integration (5 minutes)

### Start Your Dev Server

```bash
npm run dev
```

### Test Free Plan (Basis)

1. Open browser to: http://localhost:5173
2. If not logged in, create a test account
3. Go to: http://localhost:5173/Subscription
4. Click **Choose Basis** button
5. Should see success message
6. Refresh page - should show "Basis" as current plan

### Test Paid Plan (Premiere or Exclusive)

1. Go to: http://localhost:5173/Subscription
2. Click **Choose Premiere** (or Exclusive)
3. You'll be redirected to Stripe Checkout
4. Use this **test card**:
   - **Card Number:** `4242 4242 4242 4242`
   - **Expiry:** `12/25` (any future date)
   - **CVC:** `123` (any 3 digits)
   - **ZIP:** `12345` (any 5 digits)
5. Click **Pay**
6. You should be redirected to: `/payment-success`
7. Should see success message with your plan

### Verify in Database

1. Go to **Supabase Dashboard** → **Table Editor** → **users**
2. Find your test user
3. Check these columns:
   - `subscription_plan` should be "Premiere" or "Exclusive"
   - `subscription_status` should be "active"
   - `stripe_customer_id` should have a value (starts with `cus_`)
   - `stripe_subscription_id` should have a value (starts with `sub_`)

### Verify in Stripe

1. Go to **Stripe Dashboard** → **Payments**
2. You should see your test payment listed
3. Click **Customers** → You should see your test customer

✅ **Integration Working!**

---

## 🎉 Step 10: You're Done!

### Test Feature Gating

Try accessing a premium feature with different subscription plans to verify access control works!

### What's Next?

#### For Production:
1. **Activate Stripe account** (provide business info)
2. Switch to **live mode** in Stripe
3. Create **live products** (same as test)
4. Get **live API keys** (pk_live_ and sk_live_)
5. Update **environment variables** with live keys
6. Create **live webhook** endpoint
7. Test with a **real payment**

📖 See `STRIPE_DEPLOYMENT_GUIDE.md` for production deployment details.

---

## 🐛 Troubleshooting

### Issue: "Cannot find module @stripe/stripe-js"
**Solution:** 
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### Issue: Edge Function deployment fails
**Solution:** 
- Ensure you're linked: `npx supabase link --project-ref your-ref`
- Check you have the Supabase CLI installed: `npm install -g supabase`
- Verify your database password is correct

### Issue: Webhook not receiving events
**Solution:**
- Verify webhook URL is correct
- Check webhook is in test mode (not live mode)
- Verify webhook secret is set correctly
- Check Edge Function logs: `npx supabase functions logs stripe-webhook`

### Issue: Payment succeeds but subscription not updated
**Solution:**
- Check Stripe webhook logs in Dashboard → Webhooks → Click your endpoint → Events
- Verify webhook events are being sent
- Check Edge Function logs for errors
- Ensure webhook secret matches

### Issue: Checkout session not created
**Solution:**
- Check browser console for errors
- Verify VITE_STRIPE_PUBLISHABLE_KEY in .env
- Ensure user is logged in
- Check Edge Function logs: `npx supabase functions logs create-checkout-session`

---

## 📞 Need Help?

- **Stripe Docs:** https://stripe.com/docs
- **Test Cards:** https://stripe.com/docs/testing
- **Supabase Docs:** https://supabase.com/docs/guides/functions

---

## ✅ Final Checklist

Mark these off as you complete them:

- [ ] Database migration run
- [ ] Stripe account created/logged in
- [ ] API keys obtained (publishable + secret)
- [ ] Premiere product created in Stripe
- [ ] Exclusive product created in Stripe
- [ ] Price IDs copied
- [ ] Supabase project reference obtained
- [ ] Frontend .env updated with publishable key
- [ ] Supabase project linked via CLI
- [ ] Backend secrets set (secret key + price IDs)
- [ ] create-checkout-session deployed
- [ ] stripe-webhook deployed
- [ ] Webhook endpoint created in Stripe
- [ ] Webhook secret set in Supabase
- [ ] stripe-webhook redeployed
- [ ] Free plan tested
- [ ] Paid plan tested with test card
- [ ] Payment verified in database
- [ ] Payment verified in Stripe dashboard

---

**🎊 Congratulations! Your payment system is live! 💕**

Now users can subscribe to premium plans and unlock exclusive features to strengthen their relationships!

