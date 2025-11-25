import React from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export default function EmailVerificationDialog({ isOpen, onClose, email }) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          <AlertDialogTitle className="text-2xl text-center">
            Check Your Email! 📧
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center space-y-4 pt-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <p className="font-semibold text-green-900 mb-1">
                    Account Created Successfully!
                  </p>
                  <p className="text-sm text-green-700">
                    We've sent a verification email to:
                  </p>
                  <p className="text-sm font-mono font-semibold text-green-900 mt-1 break-all">
                    {email}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <p className="font-semibold text-blue-900 mb-2">
                Next Steps:
              </p>
              <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                <li>Open your email inbox</li>
                <li>Find the email from <strong>One 2 One Love</strong></li>
                <li>Click the verification link</li>
                <li>Return here and sign in!</li>
              </ol>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800">
                <strong>💡 Can't find the email?</strong> Check your spam or junk folder. 
                The email might take a few minutes to arrive.
              </p>
            </div>

            <Button 
              onClick={onClose}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold"
            >
              Got it, go to Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

