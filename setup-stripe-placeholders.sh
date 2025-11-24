#!/bin/bash

# ============================================
# Stripe Placeholder Setup Script
# ============================================
# This script sets up placeholder Stripe configuration
# You can add real keys later when ready
# ============================================

echo "🎯 Setting up Stripe with PLACEHOLDER values..."
echo ""
echo "Note: These are placeholders. Payment processing won't work until you add real keys."
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found!"
    echo "Install it: npm install -g supabase"
    exit 1
fi

echo "✅ Supabase CLI found"
echo ""

# Set placeholder secrets
echo "📝 Setting placeholder secrets..."
echo ""

echo "Setting STRIPE_SECRET_KEY..."
npx supabase secrets set STRIPE_SECRET_KEY=sk_test_PLACEHOLDER_SECRET_KEY_REPLACE_LATER

echo "Setting STRIPE_WEBHOOK_SECRET..."
npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_PLACEHOLDER_WEBHOOK_SECRET_REPLACE_LATER

echo "Setting STRIPE_PRICE_PREMIERE..."
npx supabase secrets set STRIPE_PRICE_PREMIERE=price_PLACEHOLDER_PREMIERE_REPLACE_LATER

echo "Setting STRIPE_PRICE_EXCLUSIVE..."
npx supabase secrets set STRIPE_PRICE_EXCLUSIVE=price_PLACEHOLDER_EXCLUSIVE_REPLACE_LATER

echo ""
echo "✅ Placeholder secrets set successfully!"
echo ""
echo "⏭️  Next steps:"
echo "1. Deploy Edge Functions (optional):"
echo "   npx supabase functions deploy create-checkout-session"
echo "   npx supabase functions deploy stripe-webhook"
echo ""
echo "2. When ready to add real Stripe keys, see:"
echo "   - STRIPE_PLACEHOLDER_CONFIG.md"
echo "   - STRIPE_DEPLOYMENT_GUIDE.md"
echo ""
echo "🎉 You're all set to develop!"

