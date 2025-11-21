import React from "react";
import { useLanguage } from "@/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart, ArrowLeft, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

const translations = {
  en: {
    title: "Love Stories & Reviews",
    subtitle: "See what couples are saying about One 2 One Love",
    back: "Back",
    averageRating: "Average Rating",
    totalReviews: "Total Reviews"
  },
  es: {
    title: "Historias de Amor y Reseñas",
    subtitle: "Mira lo que las parejas dicen sobre One 2 One Love",
    back: "Volver",
    averageRating: "Calificación Promedio",
    totalReviews: "Total de Reseñas"
  },
  fr: {
    title: "Histoires d'Amour et Avis",
    subtitle: "Découvrez ce que les couples disent de One 2 One Love",
    back: "Retour",
    averageRating: "Note Moyenne",
    totalReviews: "Total des Avis"
  },
  it: {
    title: "Storie d'Amore e Recensioni",
    subtitle: "Scopri cosa dicono le coppie su One 2 One Love",
    back: "Indietro",
    averageRating: "Valutazione Media",
    totalReviews: "Totale Recensioni"
  },
  de: {
    title: "Liebesgeschichten & Bewertungen",
    subtitle: "Sehen Sie, was Paare über One 2 One Love sagen",
    back: "Zurück",
    averageRating: "Durchschnittliche Bewertung",
    totalReviews: "Gesamtbewertungen"
  }
};

export default function Reviews() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.en;

  const reviews = [
    { name: "Sarah & James", rating: 5, text: "This app has completely transformed how we communicate! The love notes feature is our favorite - we send each other messages every day now.", date: "Nov 12, 2025", location: "New York, USA" },
    { name: "Maria & Carlos", rating: 5, text: "Absolutely love the relationship milestones tracker. We never forget important dates anymore and it's helped us celebrate our journey together.", date: "Nov 10, 2025", location: "Madrid, Spain" },
    { name: "Emma & Lisa", rating: 5, text: "As an LGBTQ+ couple, we really appreciate the inclusive content and support. The AI coach has given us amazing relationship advice!", date: "Nov 8, 2025", location: "London, UK" },
    { name: "Sophie & Pierre", rating: 5, text: "The date ideas section is brilliant! We've tried so many new activities together and it's brought us closer than ever.", date: "Nov 5, 2025", location: "Paris, France" },
    { name: "Anna & Michael", rating: 5, text: "The memory lane feature is beautiful. We love looking back at our photos and reliving our favorite moments together.", date: "Nov 3, 2025", location: "Berlin, Germany" },
    { name: "Priya & Raj", rating: 5, text: "This app is perfect for busy couples! The scheduled love notes mean we can stay connected even when work gets hectic.", date: "Nov 1, 2025", location: "Mumbai, India" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to={createPageUrl("Home")} className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all">
            <ArrowLeft size={20} className="mr-2" />
            {t.back}
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-6 shadow-xl">
            <Heart className="w-10 h-10 text-white fill-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-4xl mx-auto mb-12">
          <Card className="shadow-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 fill-yellow-300 text-yellow-300" />
                ))}
              </div>
              <div className="text-6xl font-bold mb-2">4.9</div>
              <div className="text-xl opacity-90 mb-1">{t.averageRating}</div>
              <div className="opacity-75">{reviews.length}+ {t.totalReviews}</div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + index * 0.1 }}>
              <Card className="h-full hover:shadow-2xl transition-all border-2 border-transparent hover:border-pink-200">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-pink-300 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">{review.text}</p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{review.name}</div>
                    <div className="text-sm text-gray-500">{review.location}</div>
                    <div className="text-xs text-gray-400 mt-1">{review.date}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}