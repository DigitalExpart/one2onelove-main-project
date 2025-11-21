import React from "react";
import { Button } from "@/components/ui/button";

const languages = [
  { name: "English", flag: "🇺🇸", countries: "USA • UK • Canada", code: "English" },
  { name: "Français", flag: "🇫🇷", countries: "France • Canada", code: "Français" },
  { name: "Español", flag: "🇪🇸", countries: "Spain • Mexico", code: "Español" },
  { name: "Italiano", flag: "🇮🇹", countries: "Italy", code: "Italiano" },
  { name: "German", flag: "🇩🇪", countries: "Germany", code: "German" },
  { name: "Nederlands", flag: "🇳🇱", countries: "Netherlands", code: "Nederlands" }
];

export default function LanguageSection({ onLanguageSelect, selectedLanguage }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onLanguageSelect(lang.code)}
            className={`group relative bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
              selectedLanguage === lang.code 
                ? 'border-pink-500 ring-4 ring-pink-200' 
                : 'border-gray-200 hover:border-pink-300'
            }`}
          >
            <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
              {lang.flag}
            </div>
            <div className="text-sm text-gray-500 mb-2">{lang.countries}</div>
            <div className="text-2xl font-bold text-gray-900 mb-3">{lang.name}</div>
            <div className={`inline-flex items-center text-sm font-semibold ${
              selectedLanguage === lang.code ? 'text-pink-600' : 'text-gray-400 group-hover:text-pink-500'
            }`}>
              {selectedLanguage === lang.code ? 'SELECTED ✓' : 'CLICK'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}