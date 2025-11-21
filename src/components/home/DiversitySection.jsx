import React from "react";
import { Globe, Heart, Shield } from "lucide-react";

export default function DiversitySection() {
  return (
    <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            🌍 ALL-INCLUSIVE RELATIONSHIP PLATFORM 🌍
          </h2>
          
          <p className="text-base text-white/90 max-w-4xl mx-auto">
            Every race, religion, orientation, and relationship style is welcome here. 
            Love is love, and we celebrate ALL forms of connection.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 text-center hover:bg-white/15 transition-all duration-300 shadow-lg">
            <Globe className="w-8 h-8 text-white mx-auto mb-1.5" />
            <h3 className="text-base font-bold text-white mb-1">For Everyone</h3>
            <p className="text-white/90 text-xs">
              LGBTQ+, interfaith, interracial, monogamous, polyamorous - all relationships are honored and supported.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 text-center hover:bg-white/15 transition-all duration-300 shadow-lg">
            <Heart className="w-8 h-8 text-white mx-auto mb-1.5 fill-white" />
            <h3 className="text-base font-bold text-white mb-1">Diverse Content</h3>
            <p className="text-white/90 text-xs">
              Articles, podcasts, and resources that reflect the beautiful diversity of modern relationships.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 text-center hover:bg-white/15 transition-all duration-300 shadow-lg">
            <Shield className="w-8 h-8 text-white mx-auto mb-1.5" />
            <h3 className="text-base font-bold text-white mb-1">Safe Space</h3>
            <p className="text-white/90 text-xs">
              A judgment-free zone where your love story is respected, celebrated, and empowered.
            </p>
          </div>
        </div>

        <div className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-3 border-2 border-yellow-400/50">
          <h3 className="text-lg md:text-xl font-bold text-white mb-0.5">
            ⚠️ THIS IS NOT A DATING SITE!! ⚠️
          </h3>
          <p className="text-white/90 text-sm">
            One 2 One Love is for couples to strengthen their existing relationships
          </p>
        </div>
      </div>
    </div>
  );
}