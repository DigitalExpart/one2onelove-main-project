import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { CheckCircle, Loader2, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, refreshUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      if (!sessionId) {
        toast.error('No payment session found');
        navigate(createPageUrl('Subscription'));
        return;
      }

      try {
        // Wait a bit for webhook to process
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Refresh user data to get updated subscription
        const updatedUser = await refreshUserProfile();
        
        if (updatedUser) {
          setSubscriptionInfo({
            plan: updatedUser.subscription_plan,
            status: updatedUser.subscription_status,
          });
        }

        setIsLoading(false);
        toast.success('Payment successful! Your subscription is now active.');
      } catch (error) {
        console.error('Error processing payment success:', error);
        setIsLoading(false);
        toast.error('Payment successful, but there was an error updating your account. Please refresh the page.');
      }
    };

    handlePaymentSuccess();
  }, [sessionId, navigate, refreshUserProfile]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Loader2 className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h2>
              <p className="text-gray-600">Please wait while we confirm your subscription...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="shadow-2xl border-2 border-purple-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-4 shadow-xl">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-white/90 text-lg">Welcome to {subscriptionInfo?.plan || 'Premium'}! 🎉</p>
          </div>

          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Subscription Details */}
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">Your Subscription</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Plan</p>
                    <p className="text-lg font-bold text-gray-900">{subscriptionInfo?.plan || 'Premium'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="text-lg font-bold text-green-600 capitalize">{subscriptionInfo?.status || 'Active'}</p>
                  </div>
                </div>
              </div>

              {/* What's Next */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  What's Next?
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Your premium features are now unlocked!</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Check your email for a confirmation receipt</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Explore all the amazing features available to you</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={() => navigate(createPageUrl('Profile'))}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg py-6"
                >
                  View My Profile
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  onClick={() => navigate(createPageUrl('Home'))}
                  variant="outline"
                  className="flex-1 text-lg py-6"
                >
                  Go to Dashboard
                </Button>
              </div>

              {/* Help Text */}
              <p className="text-center text-sm text-gray-500 pt-4">
                Need help? Contact us at{' '}
                <a href="mailto:support@one2onelove.com" className="text-purple-600 hover:text-purple-700 font-semibold">
                  support@one2onelove.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Confetti effect (optional) */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            🎊 Thank you for subscribing! We're excited to help strengthen your relationship! 💕
          </p>
        </div>
      </motion.div>
    </div>
  );
}
