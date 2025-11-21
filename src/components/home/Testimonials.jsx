import React from "react";
import { Heart } from "lucide-react";

const testimonials = [
  {
    quote: "One 2 One Love has completely transformed how we communicate. We send sweet messages to each other throughout the day and it keeps our love fresh!",
    initials: "S&M",
    names: "Sarah & Mike",
    duration: "Together 3 years"
  },
  {
    quote: "The beautiful templates make it so easy to express my feelings. My partner loves getting surprise notes from me!",
    initials: "J&A",
    names: "Jessica & Alex",
    duration: "Married 2 years"
  },
  {
    quote: "This app has brought so much joy to our relationship. The personalized notes make every day feel special.",
    initials: "D&L",
    names: "David & Lisa",
    duration: "Together 5 years"
  }
];

export default function Testimonials() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            What Couples Are Saying
          </h2>
          <p className="text-xl text-gray-600">
            Real stories from real couples using One 2 One Love
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-xl border-2 border-pink-100 hover:border-pink-300 transition-all duration-300 hover:scale-105"
            >
              <div className="flex justify-center mb-6">
                <Heart className="w-12 h-12 text-pink-500 fill-pink-500" />
              </div>
              
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg">
                  {testimonial.initials}
                </div>
                <h4 className="font-bold text-gray-900">
                  {testimonial.names}
                </h4>
                <p className="text-sm text-gray-500">
                  {testimonial.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}