import React, { useState } from "react";
import { useLanguage } from "@/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Heart, Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

const translations = {
  en: {
    title: "Relationship Blog",
    subtitle: "Tips, stories, and insights for stronger relationships",
    back: "Back",
    readMore: "Read More",
    recentPosts: "Recent Posts",
    categories: { all: "All", communication: "Communication", intimacy: "Intimacy", activities: "Activities", advice: "Advice" }
  },
  es: {
    title: "Blog de Relaciones",
    subtitle: "Consejos, historias e ideas para relaciones más fuertes",
    back: "Volver",
    readMore: "Leer Más",
    recentPosts: "Publicaciones Recientes",
    categories: { all: "Todos", communication: "Comunicación", intimacy: "Intimidad", activities: "Actividades", advice: "Consejos" }
  },
  fr: {
    title: "Blog sur les Relations",
    subtitle: "Conseils, histoires et idées pour des relations plus fortes",
    back: "Retour",
    readMore: "Lire Plus",
    recentPosts: "Publications Récentes",
    categories: { all: "Tous", communication: "Communication", intimacy: "Intimité", activities: "Activités", advice: "Conseils" }
  },
  it: {
    title: "Blog sulle Relazioni",
    subtitle: "Consigli, storie e intuizioni per relazioni più forti",
    back: "Indietro",
    readMore: "Leggi di Più",
    recentPosts: "Post Recenti",
    categories: { all: "Tutti", communication: "Comunicazione", intimacy: "Intimità", activities: "Attività", advice: "Consigli" }
  },
  de: {
    title: "Beziehungs-Blog",
    subtitle: "Tipps, Geschichten und Einblicke für stärkere Beziehungen",
    back: "Zurück",
    readMore: "Weiterlesen",
    recentPosts: "Neueste Beiträge",
    categories: { all: "Alle", communication: "Kommunikation", intimacy: "Intimität", activities: "Aktivitäten", advice: "Ratschläge" }
  }
};

export default function Blog() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.en;
  const [selectedCategory, setSelectedCategory] = useState("all");

  const posts = [
    { id: 1, title: "10 Ways to Improve Communication in Your Relationship", category: "communication", date: "Nov 10, 2025", author: "Dr. Sarah Johnson", excerpt: "Learn effective communication strategies that can transform your relationship...", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400" },
    { id: 2, title: "The Power of Daily Love Notes", category: "intimacy", date: "Nov 8, 2025", author: "Emily Chen", excerpt: "Discover how small daily gestures can strengthen your emotional connection...", image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400" },
    { id: 3, title: "Creative Date Ideas for Busy Couples", category: "activities", date: "Nov 5, 2025", author: "Michael Brown", excerpt: "Even with hectic schedules, you can keep the romance alive with these creative ideas...", image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400" },
    { id: 4, title: "Understanding Love Languages", category: "advice", date: "Nov 2, 2025", author: "Dr. Lisa Martinez", excerpt: "Learn about the five love languages and how they can improve your relationship...", image: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=400" }
  ];

  const filteredPosts = selectedCategory === "all" ? posts : posts.filter(p => p.category === selectedCategory);

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
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {Object.entries(t.categories).map(([key, label]) => (
            <button key={key} onClick={() => setSelectedCategory(key)} className={`px-4 py-2 rounded-full font-medium transition-all ${selectedCategory === key ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-50 shadow'}`}>
              {label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div key={post.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
              <Card className="h-full hover:shadow-2xl transition-all overflow-hidden border-2 border-transparent hover:border-pink-200">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <button className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold">
                    {t.readMore}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}