# 🔧 Stripe Placeholder Configuration

This guide shows you how to set up placeholder configuration so you can develop now and add real Stripe keys later.

---

## ✅ Step 1: Database Setup - COMPLETE! ✓

Great job! I can see you've already run the SQL and created:
- ✅ `payment_history` table
- ✅ `subscription_changes` table
- ✅ All payment tracking fields added to `users` table

---

## 📝 Step 2: Frontend Environment Variables (Placeholder)

### Create or Update Your `.env` File

In your project root directory, create or update the `.env` file with these lines:

```env
# Your existing Supabase config (keep these as is)
VITE_SUPABASE_URL=https://[your-project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=[your-supabase-key]

# Stripe Placeholder (add this line)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_PLACEHOLDER_WILL_ADD_LATER
```

**Note:** The app will work with this placeholder, but payment processing won't work until you add a real key.

### When Ready to Add Real Key:

1. Go to https://dashboard.stripe.com
2. Sign in (or create free account)
3. Click **Developers** → **API keys**
4. Copy **Publishable key** (starts with `pk_test_...`)
5. Replace `pk_test_PLACEHOLDER_WILL_ADD_LATER` with your real key
6. Restart dev server: `npm run dev`

---

## ⚙️ Step 3: Backend Secrets (Placeholder)

### These Are Optional for Now

You can deploy the Edge Functions with placeholder secrets. They won't process real payments, but the code will be deployed and ready.

### Set Placeholder Secrets:

Run these commands in your terminal:

```bash
# Link your Supabase project (if not done)
npx supabase link --project-ref your-project-ref-here

# Set placeholder secrets
npx supabase secrets set STRIPE_SECRET_KEY=sk_test_PLACEHOLDER_SECRET_KEY
npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_PLACEHOLDER_WEBHOOK_SECRET
npx supabase secrets set STRIPE_PRICE_PREMIERE=price_PLACEHOLDER_PREMIERE
npx supabase secrets set STRIPE_PRICE_EXCLUSIVE=price_PLACEHOLDER_EXCLUSIVE
```

### Deploy Edge Functions (Optional Now):

```bash
npx supabase functions deploy create-checkout-session
npx supabase functions deploy stripe-webhook
```

**Note:** Edge Functions will be deployed but won't process real payments with placeholder values.

### When Ready to Add Real Secrets:

1. **Get Stripe Secret Key:**
   - Dashboard → Developers → API keys → Copy "Secret key"
   - Run: `npx supabase secrets set STRIPE_SECRET_KEY=sk_test_your_real_key`

2. **Create Products & Get Price IDs:**
   - Dashboard → Products → Add products
   - Copy Price IDs for Premiere and Exclusive plans
   - Run: `npx supabase secrets set STRIPE_PRICE_PREMIERE=price_real_id`
   - Run: `npx supabase secrets set STRIPE_PRICE_EXCLUSIVE=price_real_id`

3. **Set Up Webhook:**
   - Dashboard → Developers → Webhooks → Add endpoint
   - URL: `https://[your-ref].supabase.co/functions/v1/stripe-webhook`
   - Copy webhook secret
   - Run: `npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_real_secret`

4. **Redeploy Functions:**
   ```bash
   npx supabase functions deploy create-checkout-session
   npx supabase functions deploy stripe-webhook
   ```

---

## 🎮 Step 4: Test the App with Placeholders

### What Works Now:

✅ **UI/UX:**
- Subscription page displays correctly
- Plan cards show pricing
- Payment flow UI works
- Free plan (Basis) works fully

✅ **Free Plan:**
- Users can select Basis plan
- No payment required
- Features work based on plan

❌ **What Doesn't Work Yet:**
- Actual Stripe checkout (needs real keys)
- Payment processing
- Paid plan subscriptions

### Start Dev Server:

```bash
npm run dev
```

### Test What's Working:

1. Go to: http://localhost:5173/Subscription
2. View the subscription plans
3. Click "Choose Basis" - This works fully!
4. Try "Choose Premiere" - Will show error (expected without real keys)

---

## 📋 Development Workflow

### Current State (With Placeholders):

```
✅ Database structure ready
✅ UI components working
✅ Free plan fully functional
✅ Payment UI displays
⏳ Payment processing (pending real keys)
⏳ Webhook integration (pending real keys)
```

### Develop Features Now:

You can develop and test everything except actual payments:

1. **Feature Gating:**
   ```jsx
   import FeatureGate from '@/components/subscription/FeatureGate';
   
   function MyPremiumFeature() {
     return (
       <FeatureGate feature="ai_coach_limited" requiredPlan="Premiere">
         <PremiumContent />
       </FeatureGate>
     );
   }
   ```

2. **Check User Plan:**
   ```jsx
   import { useFeatureAccess } from '@/hooks/useFeatureAccess';
   
   function MyComponent() {
     const { hasAccess, plan } = useFeatureAccess('premium_feature');
     return <div>Your plan: {plan}</div>;
   }
   ```

3. **Manually Test Plans:**
   - Go to Supabase → Table Editor → `users`
   - Change `subscription_plan` to: 'Basis', 'Premiere', or 'Exclusive'
   - Change `subscription_status` to: 'active'
   - Test feature access with different plans

---

## ⏭️ When You're Ready for Real Stripe Integration

### Quick Checklist:

1. **Create Stripe Account** (5 min)
   - Go to https://stripe.com
   - Sign up (it's free)

2. **Get API Keys** (2 min)
   - Dashboard → Developers → API keys
   - Copy publishable and secret keys

3. **Create Products** (7 min)
   - Dashboard → Products
   - Create "Premiere Plan" ($19.99/month)
   - Create "Exclusive Plan" ($39.99/month)
   - Copy Price IDs

4. **Update Configuration** (5 min)
   - Update `.env` with real publishable key
   - Update Supabase secrets with real keys
   - Redeploy Edge Functions

5. **Test with Test Card** (3 min)
   - Use card: `4242 4242 4242 4242`
   - Complete a test payment
   - Verify it works!

📖 **Full Guide:** See `STRIPE_DEPLOYMENT_GUIDE.md`

---

## 🎯 Summary

### What You've Done:
✅ Database structure created  
✅ Payment tables ready  
✅ Placeholder configuration set up  
✅ Can develop features now  

### What's Next (When Ready):
⏳ Create Stripe account  
⏳ Get real API keys  
⏳ Create products  
⏳ Update configuration  
⏳ Test real payments  

---

## 💡 Pro Tips

1. **Develop First, Integrate Later:**
   - Build all your premium features
   - Test with manual database changes
   - Add real payments when features are ready

2. **Use Git Branches:**
   - Current branch: Development with placeholders
   - New branch: Add real Stripe keys (don't commit!)
   - Keep sensitive keys out of Git

3. **Test Free Plan:**
   - Fully functional now
   - Great for testing user flow
   - No Stripe needed

4. **Feature Gating:**
   - Implement now using the hooks
   - Works with any subscription_plan value
   - Test by manually changing user plan in database

---

## 🚀 You're All Set!

Your app is ready for development with placeholder Stripe configuration.  
When you're ready to process real payments, just follow the checklist above!

**Happy coding! 💕**

