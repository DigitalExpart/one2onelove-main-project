import React from "react";
import { Users, Map } from "lucide-react";

export default function StatsSection({ totalSignups, countries }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-pink-100 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-12 h-12 text-pink-500" />
          </div>
          <div className="text-5xl font-bold text-gray-900 mb-2 text-center">
            {totalSignups.toLocaleString()}
          </div>
          <div className="text-xl text-gray-600 text-center">Waitlisted Users</div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-100 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-center mb-4">
            <Map className="w-12 h-12 text-purple-500" />
          </div>
          <div className="text-5xl font-bold text-gray-900 mb-2 text-center">
            {countries}
          </div>
          <div className="text-xl text-gray-600 text-center">Countries Worldwide</div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Launching Worldwide in December 2025
        </h2>
        <p className="text-xl text-gray-600">Available in 6 Languages:</p>
      </div>
    </div>
  );
}