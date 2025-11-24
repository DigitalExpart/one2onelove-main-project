# 🚀 Stripe Payment System - Complete Deployment Guide

This guide walks you through deploying the complete Stripe payment integration for One 2 One Love.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Stripe Dashboard Setup](#stripe-dashboard-setup)
4. [Environment Variables](#environment-variables)
5. [Edge Functions Deployment](#edge-functions-deployment)
6. [Stripe Webhook Configuration](#stripe-webhook-configuration)
7. [Testing the Integration](#testing-the-integration)
8. [Going Live (Production)](#going-live-production)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Prerequisites

Before starting, ensure you have:

- ✅ Stripe account (https://stripe.com)
- ✅ Supabase project set up
- ✅ Supabase CLI installed (`npm install -g supabase`)
- ✅ Node.js and npm installed
- ✅ Project cloned and dependencies installed

---

## 🗄️ Step 1: Database Setup

### Run the SQL Migration

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Open the file `supabase-add-payment-fields.sql`
3. Copy and paste the entire SQL script
4. Click **Run** to execute

This will:
- Add payment tracking fields to the `users` table
- Create `payment_history` and `subscription_changes` tables
- Set up RLS policies
- Create helper functions

**Verification:**

Run this query to verify:

```sql
SELECT column_name FROM information_schema.columns
WHERE table_name = 'users' AND column_name LIKE '%stripe%';
```

You should see: `stripe_customer_id`, `stripe_subscription_id`

---

## 💳 Step 2: Stripe Dashboard Setup

### Create Products and Prices

1. Go to **Stripe Dashboard** → **Products**
2. Click **Add product**

#### Create Premiere Plan:

- **Name**: Premiere Plan - One 2 One Love
- **Description**: Most Popular - For couples ready to grow together
- **Pricing**: $19.99 / month (recurring)
- **Click** Save

**Copy the Price ID** (starts with `price_...`) - You'll need this later!

#### Create Exclusive Plan:

- **Name**: Exclusive Plan - One 2 One Love
- **Description**: Ultimate Experience - The complete relationship toolkit
- **Pricing**: $39.99 / month (recurring)
- **Click** Save

**Copy the Price ID** (starts with `price_...`) - You'll need this later!

---

## 🔑 Step 3: Environment Variables

### Frontend Environment Variables (.env)

Create a `.env` file in your project root with:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Stripe (Frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

**Where to find Stripe keys:**
- Go to **Stripe Dashboard** → **Developers** → **API keys**
- Copy the **Publishable key** (starts with `pk_test_`)

### Backend Environment Variables (Supabase Edge Functions)

Set these using Supabase CLI:

```bash
# Stripe Secret Key
npx supabase secrets set STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Stripe Webhook Secret (we'll get this in Step 6)
npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe Price IDs
npx supabase secrets set STRIPE_PRICE_PREMIERE=price_your_premiere_id
npx supabase secrets set STRIPE_PRICE_EXCLUSIVE=price_your_exclusive_id
```

**Where to find Stripe Secret Key:**
- Go to **Stripe Dashboard** → **Developers** → **API keys**
- Copy the **Secret key** (starts with `sk_test_`)
- ⚠️ **NEVER commit this to Git!**

---

## ⚙️ Step 4: Edge Functions Deployment

### Initialize Supabase (if not done)

```bash
npx supabase init
```

### Link to Your Supabase Project

```bash
npx supabase link --project-ref your-project-ref
```

**Find your project ref:**
- Go to **Supabase Dashboard** → **Settings** → **General**
- Copy the **Project Reference ID**

### Deploy Edge Functions

```bash
# Deploy create-checkout-session function
npx supabase functions deploy create-checkout-session

# Deploy stripe-webhook function
npx supabase functions deploy stripe-webhook
```

**Verify Deployment:**

```bash
npx supabase functions list
```

You should see both functions listed.

---

## 🔗 Step 5: Stripe Webhook Configuration

### Get Your Webhook URL

Your webhook URL will be:
```
https://your-project-ref.supabase.co/functions/v1/stripe-webhook
```

Replace `your-project-ref` with your actual Supabase project reference ID.

### Create Webhook in Stripe

1. Go to **Stripe Dashboard** → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your webhook URL (from above)
4. Click **Select events**
5. Select these events:
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.payment_succeeded`
   - ✅ `invoice.payment_failed`
6. Click **Add endpoint**

### Get Webhook Signing Secret

After creating the endpoint:
1. Click on the endpoint you just created
2. Click **Reveal** under **Signing secret**
3. Copy the secret (starts with `whsec_`)

### Set Webhook Secret

```bash
npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
```

### Redeploy Webhook Function

```bash
npx supabase functions deploy stripe-webhook
```

---

## 🧪 Step 6: Testing the Integration

### Install Dependencies

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

### Start Development Server

```bash
npm run dev
```

### Test Free Plan (Basis)

1. Sign up or log in
2. Go to `/Subscription` page
3. Click **Choose Basis**
4. Should instantly activate free plan

### Test Paid Plans

Use Stripe test cards:

| Card Number | Description |
|-------------|-------------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 0002` | Card declined |
| `4000 0025 0000 3155` | Requires authentication |

**Test flow:**

1. Go to `/Subscription`
2. Click **Choose Premiere** or **Choose Exclusive**
3. Fill in test card: `4242 4242 4242 4242`
4. Expiry: Any future date (e.g., `12/25`)
5. CVC: Any 3 digits (e.g., `123`)
6. ZIP: Any 5 digits (e.g., `12345`)
7. Click **Pay**
8. Should redirect to `/payment-success`
9. Check your profile - subscription should be updated

### Verify in Database

```sql
SELECT 
  email,
  subscription_plan,
  subscription_status,
  subscription_price,
  stripe_customer_id
FROM public.users
WHERE email = 'your-test-email@example.com';
```

### Check Payment History

```sql
SELECT * FROM public.payment_history
ORDER BY created_at DESC
LIMIT 10;
```

---

## 🎉 Step 7: Going Live (Production)

### 1. Activate Your Stripe Account

- Complete business verification in Stripe Dashboard
- Provide required business information

### 2. Get Live API Keys

- Go to **Stripe Dashboard** → **Developers** → **API keys**
- Toggle to **Production** mode
- Copy **live** keys (start with `pk_live_` and `sk_live_`)

### 3. Update Environment Variables

**Frontend (.env for production):**

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
```

**Backend (Supabase Edge Functions):**

```bash
npx supabase secrets set STRIPE_SECRET_KEY=sk_live_your_live_secret_key --project-ref your-prod-project
```

### 4. Create Live Products in Stripe

Repeat Step 2 but in **Production mode** to create live products and prices.

### 5. Set Live Price IDs

```bash
npx supabase secrets set STRIPE_PRICE_PREMIERE=price_live_premiere_id
npx supabase secrets set STRIPE_PRICE_EXCLUSIVE=price_live_exclusive_id
```

### 6. Create Live Webhook

- Create a new webhook endpoint in **Production mode**
- Use your production webhook URL
- Copy the **live** webhook secret
- Set it:

```bash
npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_live_your_secret
```

### 7. Deploy to Production

```bash
# Deploy edge functions to production
npx supabase functions deploy create-checkout-session --project-ref your-prod-project
npx supabase functions deploy stripe-webhook --project-ref your-prod-project
```

### 8. Test with Real Payment

⚠️ **Use a real credit card** (will be charged) to test the full flow.

---

## 🔧 Step 8: Feature Access Control

### Use in Your Components

```jsx
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import FeatureGate from '@/components/subscription/FeatureGate';

function AICoachPage() {
  return (
    <FeatureGate feature="ai_coach_limited" requiredPlan="Premiere">
      <AICoachComponent />
    </FeatureGate>
  );
}
```

### Check Feature Access Programmatically

```jsx
import { useFeatureAccess } from '@/hooks/useFeatureAccess';

function MyComponent() {
  const { hasAccess, plan } = useFeatureAccess('unlimited_ai_coach');
  
  if (!hasAccess) {
    return <UpgradePrompt />;
  }
  
  return <PremiumFeature />;
}
```

---

## 🐛 Step 9: Troubleshooting

### Issue: Payment succeeds but subscription not updated

**Solution:**
- Check Edge Function logs in Supabase Dashboard
- Verify webhook is receiving events in Stripe Dashboard
- Ensure webhook secret is correctly set

### Issue: Checkout session not created

**Solution:**
- Check browser console for errors
- Verify Stripe publishable key is correct
- Check Edge Function logs for errors
- Ensure user is authenticated

### Issue: Webhook signature verification failed

**Solution:**
- Verify webhook secret matches in Stripe and Supabase
- Redeploy webhook function after setting secret
- Check Stripe Dashboard webhook logs for details

### Check Edge Function Logs

```bash
npx supabase functions logs create-checkout-session
npx supabase functions logs stripe-webhook
```

### Test Webhook Locally

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local Edge Function
stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook
```

---

## 📞 Support Resources

- **Stripe Documentation**: https://stripe.com/docs
- **Supabase Edge Functions**: https://supabase.com/docs/guides/functions
- **Test Cards**: https://stripe.com/docs/testing
- **Webhook Events**: https://stripe.com/docs/webhooks

---

## ✅ Deployment Checklist

- [ ] Database migration completed
- [ ] Stripe products created (Premiere, Exclusive)
- [ ] Stripe API keys obtained (test & live)
- [ ] Frontend environment variables set
- [ ] Backend secrets set in Supabase
- [ ] Edge functions deployed
- [ ] Webhook endpoint created in Stripe
- [ ] Webhook secret configured
- [ ] Free plan tested
- [ ] Paid plan tested with test card
- [ ] Payment success page working
- [ ] Subscription displayed in profile
- [ ] Payment history visible
- [ ] Feature gates tested
- [ ] Production keys ready (for live)
- [ ] Live webhook configured (for live)

---

## 🎊 Congratulations!

Your Stripe payment integration is complete! Users can now subscribe to premium plans and unlock exclusive features. 💕

**Next Steps:**
- Monitor payments in Stripe Dashboard
- Set up email notifications for failed payments
- Configure customer portal for subscription management
- Implement cancellation flow
- Add promo codes and discounts

