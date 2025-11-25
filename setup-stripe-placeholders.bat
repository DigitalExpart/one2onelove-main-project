@echo off
REM ============================================
REM Stripe Placeholder Setup Script (Windows)
REM ============================================
REM This script sets up placeholder Stripe configuration
REM You can add real keys later when ready
REM ============================================

echo.
echo ============================================
echo   Stripe Placeholder Setup
echo ============================================
echo.
echo Setting up Stripe with PLACEHOLDER values...
echo.
echo Note: These are placeholders. Payment processing 
echo won't work until you add real keys.
echo.

REM Set placeholder secrets
echo Setting placeholder secrets...
echo.

echo [1/4] Setting STRIPE_SECRET_KEY...
call npx supabase secrets set STRIPE_SECRET_KEY=sk_test_PLACEHOLDER_SECRET_KEY_REPLACE_LATER

echo [2/4] Setting STRIPE_WEBHOOK_SECRET...
call npx supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_PLACEHOLDER_WEBHOOK_SECRET_REPLACE_LATER

echo [3/4] Setting STRIPE_PRICE_PREMIERE...
call npx supabase secrets set STRIPE_PRICE_PREMIERE=price_PLACEHOLDER_PREMIERE_REPLACE_LATER

echo [4/4] Setting STRIPE_PRICE_EXCLUSIVE...
call npx supabase secrets set STRIPE_PRICE_EXCLUSIVE=price_PLACEHOLDER_EXCLUSIVE_REPLACE_LATER

echo.
echo ============================================
echo   SUCCESS!
echo ============================================
echo.
echo Placeholder secrets set successfully!
echo.
echo Next steps:
echo.
echo 1. Deploy Edge Functions (optional):
echo    npx supabase functions deploy create-checkout-session
echo    npx supabase functions deploy stripe-webhook
echo.
echo 2. When ready to add real Stripe keys, see:
echo    - STRIPE_PLACEHOLDER_CONFIG.md
echo    - STRIPE_DEPLOYMENT_GUIDE.md
echo.
echo You're all set to develop!
echo.
pause

