import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, Save, Send } from "lucide-react";

export default function LoveNoteDemo() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-pink-200">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Love Note Preview */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-300 rounded-full opacity-20 blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-300 rounded-full opacity-20 blur-2xl" />
            
            <div className="relative bg-white rounded-2xl shadow-xl p-8 border-2 border-pink-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                  One 2 One Love
                </h3>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 mb-6">
                <p className="text-lg text-gray-800 leading-relaxed mb-4">
                  Good morning sunshine! ☀️ I hope your day is as beautiful as you are. 💕
                </p>
                <p className="text-right text-gray-600 font-medium">- Sarah</p>
              </div>
              
              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                  <Send className="w-4 h-4 mr-2" />
                  Reply with Love Note
                </Button>
                <Button variant="outline" className="border-pink-300 hover:bg-pink-50">
                  <Save className="w-4 h-4 mr-2" />
                  Save to Favorites
                </Button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed italic">
              "This is how your love note magically appears on their phone if they are also subscribed to 'One 2 One Love'."
            </p>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Send Love Notes
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Express your feelings with beautifully crafted digital love notes. Choose from our curated collection of heartfelt messages or create your own personalized notes to surprise your partner.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Pre-written romantic messages in multiple languages</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Custom note creator with beautiful templates</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Schedule notes for special occasions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}