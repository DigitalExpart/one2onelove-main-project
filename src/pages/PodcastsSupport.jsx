
import React, { useState } from "react";
import { Mic, ArrowLeft, Heart, Users, MessageCircle, TrendingUp, PlayCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/Layout";

const translations = {
  en: {
    title: "Relationship Podcasts",
    subtitle: "Listen to relationship podcasts and expert advice for couples",
    back: "Back to Support",
    category: "Category",
    categories: { all: "All Podcasts", communication: "Communication", intimacy: "Intimacy & Connection", conflict: "Conflict Resolution", dating: "Dating & Singles", marriage: "Marriage", growth: "Personal Growth" },
    featuredPodcasts: "Featured Podcasts",
    episodes: "episodes",
    avgDuration: "Avg",
    listenNow: "Listen Now",
    ctaTitle: "Start Your Relationship Journey Today",
    ctaSubtitle: "Subscribe to these podcasts and get expert relationship advice delivered to your ears weekly",
    exploreAll: "Explore All Podcasts"
  },
  es: {
    title: "Podcasts de Relaciones",
    subtitle: "Escucha podcasts de relaciones y consejos de expertos para parejas",
    back: "Volver al Apoyo",
    category: "Categoría",
    categories: { all: "Todos los Podcasts", communication: "Comunicación", intimacy: "Intimidad y Conexión", conflict: "Resolución de Conflictos", dating: "Citas y Solteros", marriage: "Matrimonio", growth: "Crecimiento Personal" },
    featuredPodcasts: "Podcasts Destacados",
    episodes: "episodios",
    avgDuration: "Promedio",
    listenNow: "Escuchar Ahora",
    ctaTitle: "Comienza Tu Viaje de Relación Hoy",
    ctaSubtitle: "Suscríbete a estos podcasts y recibe consejos expertos de relaciones directamente en tus oídos semanalmente",
    exploreAll: "Explorar Todos los Podcasts"
  },
  fr: {
    title: "Podcasts sur les Relations",
    subtitle: "Écoutez des podcasts sur les relations et des conseils d'experts pour les couples",
    back: "Retour au Soutien",
    category: "Catégorie",
    categories: { all: "Tous les Podcasts", communication: "Communication", intimacy: "Intimité et Connexion", conflict: "Résolution de Conflits", dating: "Rencontres et Célibataires", marriage: "Mariage", growth: "Croissance Personnelle" },
    featuredPodcasts: "Podcasts en Vedette",
    episodes: "épisodes",
    avgDuration: "Moy",
    listenNow: "Écouter Maintenant",
    ctaTitle: "Commencez Votre Parcours Relationnel Aujourd'hui",
    ctaSubtitle: "Abonnez-vous à ces podcasts et recevez des conseils d'experts en relations directement dans vos oreilles chaque semaine",
    exploreAll: "Explorer Tous les Podcasts"
  },
  it: {
    title: "Podcast sulle Relazioni",
    subtitle: "Ascolta podcast sulle relazioni e consigli di esperti per coppie",
    back: "Torna al Supporto",
    category: "Categoria",
    categories: { all: "Tutti i Podcast", communication: "Comunicazione", intimacy: "Intimità e Connessione", conflict: "Risoluzione dei Conflitti", dating: "Appuntamenti e Single", marriage: "Matrimonio", growth: "Crescita Personale" },
    featuredPodcasts: "Podcast in Evidenza",
    episodes: "episodi",
    avgDuration: "Media",
    listenNow: "Ascolta Ora",
    ctaTitle: "Inizia Il Tuo Viaggio Relazionale Oggi",
    ctaSubtitle: "Iscriviti a questi podcast e ricevi consigli esperti sulle relazioni direttamente nelle tue orecchie ogni settimana",
    exploreAll: "Esplora Tutti i Podcast"
  },
  de: {
    title: "Beziehungspodcasts",
    subtitle: "Hören Sie Beziehungspodcasts und Expertenrat für Paare",
    back: "Zurück zur Unterstützung",
    category: "Kategorie",
    categories: { all: "Alle Podcasts", communication: "Kommunikation", intimacy: "Intimität & Verbindung", conflict: "Konfliktlösung", dating: "Dating & Singles", marriage: "Ehe", growth: "Persönliches Wachstum" },
    featuredPodcasts: "Hervorgehobene Podcasts",
    episodes: "Episoden",
    avgDuration: "Durchschn.",
    listenNow: "Jetzt Anhören",
    ctaTitle: "Beginnen Sie Ihre Beziehungsreise Heute",
    ctaSubtitle: "Abonnieren Sie diese Podcasts und erhalten Sie wöchentlich Expertenrat für Beziehungen in Ihre Ohren geliefert",
    exploreAll: "Alle Podcasts Erkunden"
  },
  nl: {
    title: "Relatie Podcasts",
    subtitle: "Luister naar relatiepodcasts en expert advies voor koppels",
    back: "Terug naar Ondersteuning",
    category: "Categorie",
    categories: { all: "Alle Podcasts", communication: "Communicatie", intimacy: "Intimiteit & Verbinding", conflict: "Conflictoplossing", dating: "Daten & Singles", marriage: "Huwelijk", growth: "Persoonlijke Groei" },
    featuredPodcasts: "Uitgelichte Podcasts",
    episodes: "afleveringen",
    avgDuration: "Gem",
    listenNow: "Nu Beluisteren",
    ctaTitle: "Begin Je Relatiereis Vandaag",
    ctaSubtitle: "Abonneer je op deze podcasts en ontvang wekelijks expert relatieadvies in je oren",
    exploreAll: "Alle Podcasts Verkennen"
  },
  pt: {
    title: "Podcasts de Relacionamento",
    subtitle: "Ouça podcasts sobre relacionamentos e conselhos de especialistas para casais",
    back: "Voltar ao Suporte",
    category: "Categoria",
    categories: { all: "Todos os Podcasts", communication: "Comunicação", intimacy: "Intimidade e Conexão", conflict: "Resolução de Conflitos", dating: "Namoro e Solteiros", marriage: "Casamento", growth: "Crescimento Pessoal" },
    featuredPodcasts: "Podcasts em Destaque",
    episodes: "episódios",
    avgDuration: "Média",
    listenNow: "Ouvir Agora",
    ctaTitle: "Comece Sua Jornada de Relacionamento Hoje",
    ctaSubtitle: "Inscreva-se nesses podcasts e receba conselhos especializados em relacionamentos semanalmente em seus ouvidos",
    exploreAll: "Explorar Todos os Podcasts"
  }
};

export default function PodcastsSupport() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.en;
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: t.categories.all, icon: Mic, color: 'from-pink-500 to-rose-600' },
    { id: 'communication', name: t.categories.communication, icon: MessageCircle, color: 'from-blue-500 to-cyan-600' },
    { id: 'intimacy', name: t.categories.intimacy, icon: Heart, color: 'from-red-500 to-pink-600' },
    { id: 'conflict', name: t.categories.conflict, icon: Users, color: 'from-purple-500 to-pink-600' },
    { id: 'dating', name: t.categories.dating, icon: Heart, color: 'from-orange-500 to-red-600' },
    { id: 'marriage', name: t.categories.marriage, icon: Heart, color: 'from-green-500 to-emerald-600' },
    { id: 'growth', name: t.categories.growth, icon: TrendingUp, color: 'from-yellow-500 to-orange-600' }
  ];

  const podcasts = [
    {
      id: 1,
      title: "The Relationship School Podcast",
      host: "Dr. Jayson and Ellen Gaddis",
      category: 'communication',
      episodes: 250,
      duration: "45 min",
      color: "from-blue-500 to-cyan-600",
      description: "Deep conversations about conscious relationships, communication skills, and personal growth for couples.",
      rating: 4.9
    },
    {
      id: 2,
      title: "Where Should We Begin?",
      host: "Esther Perel",
      category: 'intimacy',
      episodes: 180,
      duration: "50 min",
      color: "from-red-500 to-pink-600",
      description: "Real couples therapy sessions exploring intimacy, desire, and the complexities of modern relationships.",
      rating: 4.8
    },
    {
      id: 3,
      title: "The Love, Happiness & Success Podcast",
      host: "Dr. Lisa Marie Bobby",
      category: 'growth',
      episodes: 320,
      duration: "35 min",
      color: "from-yellow-500 to-orange-600",
      description: "Practical advice on creating healthy relationships while maintaining personal growth and happiness.",
      rating: 4.7
    },
    {
      id: 4,
      title: "Marriage Therapy Radio",
      host: "Zach Brittle",
      category: 'marriage',
      episodes: 200,
      duration: "30 min",
      color: "from-green-500 to-emerald-600",
      description: "Evidence-based strategies for building strong marriages based on the Gottman Method.",
      rating: 4.8
    },
    {
      id: 5,
      title: "The Art of Charm",
      host: "Jordan Harbinger",
      category: 'dating',
      episodes: 500,
      duration: "60 min",
      color: "from-orange-500 to-red-600",
      description: "Social dynamics, dating advice, and communication skills for singles and couples alike.",
      rating: 4.6
    },
    {
      id: 6,
      title: "Foreplay Radio",
      host: "George & Laurie Sapp",
      category: 'intimacy',
      episodes: 400,
      duration: "40 min",
      color: "from-pink-500 to-rose-600",
      description: "Honest conversations about sex, intimacy, and keeping the passion alive in long-term relationships.",
      rating: 4.7
    }
  ];

  const filteredPodcasts = selectedCategory === 'all'
    ? podcasts
    : podcasts.filter(podcast => podcast.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link
              to={createPageUrl("CoupleSupport")}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
            >
              <ArrowLeft size={20} className="mr-2" />
              {t.back}
            </Link>
            <div className="flex items-center">
              <Mic className="text-purple-500 mr-3" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {t.title}
                </h1>
                <p className="text-sm text-gray-600">
                  {t.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories */}
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">{t.category}</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Podcasts Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {t.featuredPodcasts}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPodcasts.map((podcast, index) => (
              <motion.div
                key={podcast.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200">
                  <CardHeader>
                    <div className={`w-20 h-20 bg-gradient-to-br ${podcast.color} rounded-full flex items-center justify-center mb-4 shadow-lg mx-auto`}>
                      <Mic className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 text-center line-clamp-2">
                      {podcast.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 text-center">By {podcast.host}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <PlayCircle className="w-4 h-4" />
                        <span>{podcast.episodes} {t.episodes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{t.avgDuration} {podcast.duration}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4 text-center">
                      {podcast.description}
                    </p>

                    <div className="flex items-center justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, idx) => (
                        <Heart
                          key={idx}
                          className={`w-4 h-4 ${
                            idx < Math.floor(podcast.rating)
                              ? 'text-pink-500 fill-pink-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">({podcast.rating})</span>
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${podcast.color} hover:opacity-90`}>
                      <PlayCircle className="w-4 h-4 mr-2" />
                      {t.listenNow}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <Mic className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            {t.ctaTitle}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t.ctaSubtitle}
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6">
            {t.exploreAll}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
