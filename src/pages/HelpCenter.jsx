import React, { useState } from "react";
import { useLanguage } from "@/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, Book, Mail, ArrowLeft, Settings, Wrench, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

const translations = {
  en: {
    title: "Help Center",
    subtitle: "Find answers to your questions and get support",
    searchPlaceholder: "Search for help...",
    categories: "Help Categories",
    popularArticles: "Popular Articles",
    articlesIn: "Articles in",
    stillNeedHelp: "Still need help?",
    contactUs: "Contact Us",
    back: "Back",
    gettingStarted: { title: "Getting Started", desc: "Learn the basics of using One 2 One Love" },
    accountSettings: { title: "Account Settings", desc: "Manage your account preferences and settings" },
    features: { title: "Features Guide", desc: "Explore all the features and how to use them" },
    troubleshooting: { title: "Troubleshooting", desc: "Solve common issues and technical problems" },
    articles: {
      gettingStarted: [
        { title: "How to create your account", desc: "Step-by-step guide to signing up and getting started" },
        { title: "Complete your profile", desc: "Add your information and personalize your experience" },
        { title: "Invite your partner", desc: "Connect with your partner to start using the app together" },
        { title: "Your first love note", desc: "Learn how to send your first romantic message" }
      ],
      accountSettings: [
        { title: "Update your profile information", desc: "Change your name, email, and other details" },
        { title: "Notification preferences", desc: "Manage how and when you receive notifications" },
        { title: "Privacy settings", desc: "Control your privacy and data sharing options" },
        { title: "Change your password", desc: "Keep your account secure by updating your password" }
      ],
      features: [
        { title: "Using the AI Relationship Coach", desc: "Get personalized relationship advice from our AI coach" },
        { title: "Setting up relationship milestones", desc: "Track important dates and anniversaries" },
        { title: "Creating shared memories", desc: "Build your digital memory lane together" },
        { title: "Scheduling love notes", desc: "Set up automatic messages for special occasions" },
        { title: "Exploring date ideas", desc: "Discover creative activities to do together" },
        { title: "Using relationship quizzes", desc: "Learn more about each other with fun quizzes" }
      ],
      troubleshooting: [
        { title: "Can't log in to my account", desc: "Reset your password or recover your account" },
        { title: "Love notes not being delivered", desc: "Check delivery settings and troubleshoot issues" },
        { title: "App not loading properly", desc: "Clear cache and fix common loading problems" },
        { title: "Payment or subscription issues", desc: "Resolve billing and subscription problems" }
      ]
    }
  },
  es: {
    title: "Centro de Ayuda",
    subtitle: "Encuentra respuestas a tus preguntas y obtén soporte",
    searchPlaceholder: "Buscar ayuda...",
    categories: "Categorías de Ayuda",
    popularArticles: "Artículos Populares",
    articlesIn: "Artículos en",
    stillNeedHelp: "¿Aún necesitas ayuda?",
    contactUs: "Contáctanos",
    back: "Volver",
    gettingStarted: { title: "Primeros Pasos", desc: "Aprende lo básico de usar One 2 One Love" },
    accountSettings: { title: "Configuración de Cuenta", desc: "Gestiona tus preferencias y configuración" },
    features: { title: "Guía de Funciones", desc: "Explora todas las funciones y cómo usarlas" },
    troubleshooting: { title: "Solución de Problemas", desc: "Resuelve problemas comunes y técnicos" }
  },
  fr: {
    title: "Centre d'Aide",
    subtitle: "Trouvez des réponses à vos questions et obtenez de l'aide",
    searchPlaceholder: "Rechercher de l'aide...",
    categories: "Catégories d'Aide",
    popularArticles: "Articles Populaires",
    articlesIn: "Articles dans",
    stillNeedHelp: "Besoin d'aide supplémentaire?",
    contactUs: "Nous Contacter",
    back: "Retour",
    gettingStarted: { title: "Premiers Pas", desc: "Apprenez les bases de One 2 One Love" },
    accountSettings: { title: "Paramètres du Compte", desc: "Gérez vos préférences et paramètres" },
    features: { title: "Guide des Fonctionnalités", desc: "Explorez toutes les fonctionnalités" },
    troubleshooting: { title: "Dépannage", desc: "Résolvez les problèmes courants" }
  },
  it: {
    title: "Centro Assistenza",
    subtitle: "Trova risposte alle tue domande e ottieni supporto",
    searchPlaceholder: "Cerca aiuto...",
    categories: "Categorie di Aiuto",
    popularArticles: "Articoli Popolari",
    articlesIn: "Articoli in",
    stillNeedHelp: "Hai ancora bisogno di aiuto?",
    contactUs: "Contattaci",
    back: "Indietro",
    gettingStarted: { title: "Iniziare", desc: "Impara le basi di One 2 One Love" },
    accountSettings: { title: "Impostazioni Account", desc: "Gestisci le tue preferenze" },
    features: { title: "Guida alle Funzionalità", desc: "Esplora tutte le funzionalità" },
    troubleshooting: { title: "Risoluzione Problemi", desc: "Risolvi problemi comuni" }
  },
  de: {
    title: "Hilfezentrum",
    subtitle: "Finden Sie Antworten auf Ihre Fragen und erhalten Sie Unterstützung",
    searchPlaceholder: "Nach Hilfe suchen...",
    categories: "Hilfe-Kategorien",
    popularArticles: "Beliebte Artikel",
    articlesIn: "Artikel in",
    stillNeedHelp: "Benötigen Sie weitere Hilfe?",
    contactUs: "Kontaktieren Sie Uns",
    back: "Zurück",
    gettingStarted: { title: "Erste Schritte", desc: "Lernen Sie die Grundlagen von One 2 One Love" },
    accountSettings: { title: "Kontoeinstellungen", desc: "Verwalten Sie Ihre Einstellungen" },
    features: { title: "Funktionshandbuch", desc: "Entdecken Sie alle Funktionen" },
    troubleshooting: { title: "Fehlerbehebung", desc: "Lösen Sie häufige Probleme" }
  }
};

export default function HelpCenter() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.en;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 'gettingStarted', icon: Book, title: t.gettingStarted.title, desc: t.gettingStarted.desc, color: "from-blue-500 to-cyan-500" },
    { id: 'accountSettings', icon: Settings, title: t.accountSettings.title, desc: t.accountSettings.desc, color: "from-purple-500 to-pink-500" },
    { id: 'features', icon: Sparkles, title: t.features.title, desc: t.features.desc, color: "from-green-500 to-emerald-500" },
    { id: 'troubleshooting', icon: Wrench, title: t.troubleshooting.title, desc: t.troubleshooting.desc, color: "from-orange-500 to-red-500" }
  ];

  const articles = t.articles || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to={createPageUrl("Home")} className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
            <ArrowLeft size={20} className="mr-2" />
            {t.back}
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-xl">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input placeholder={t.searchPlaceholder} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-12 h-14 text-lg shadow-lg" />
          </div>
        </div>

        {!selectedCategory ? (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t.categories}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
                    <Card 
                      onClick={() => setSelectedCategory(category)}
                      className="h-full hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-200"
                    >
                      <CardContent className="p-6">
                        <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{category.title}</h3>
                        <p className="text-sm text-gray-600">{category.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mb-16">
            <button 
              onClick={() => setSelectedCategory(null)}
              className="mb-6 inline-flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            >
              <ArrowLeft size={20} className="mr-2" />
              {t.back}
            </button>
            
            <div className="mb-8">
              <div className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-br ${selectedCategory.color} rounded-2xl shadow-xl`}>
                <selectedCategory.icon className="w-8 h-8 text-white" />
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedCategory.title}</h2>
                  <p className="text-white/90 text-sm">{selectedCategory.desc}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              {articles[selectedCategory.id]?.map((article, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <Card className="hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-200 h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{article.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <Mail className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">{t.stillNeedHelp}</h2>
          <p className="text-xl mb-8 opacity-90">We're here to help you!</p>
          <Link to={createPageUrl("ContactUs")}>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg inline-flex items-center gap-2">
              <Mail className="w-5 h-5" />
              {t.contactUs}
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}