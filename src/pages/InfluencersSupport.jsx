
import React from "react";
import { Megaphone, ArrowLeft, Heart, Users, MessageCircle, TrendingUp, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/Layout";

const translations = {
  en: {
    title: "Relationship Influencers & Experts",
    subtitle: "Follow expert content creators for daily relationship inspiration and advice",
    back: "Back to Support",
    followers: "followers",
    followOn: "Follow on",
    featured: "Featured",
    ctaTitle: "Get Daily Relationship Inspiration",
    ctaSubtitle: "Follow these experts to stay inspired and informed about building strong, healthy relationships",
    backToHome: "Back to Home"
  },
  es: {
    title: "Influencers y Expertos en Relaciones",
    subtitle: "Sigue a creadores de contenido expertos para inspiración diaria y consejos de relaciones",
    back: "Volver al Apoyo",
    followers: "seguidores",
    followOn: "Seguir en",
    featured: "Destacado",
    ctaTitle: "Obtén Inspiración Diaria de Relaciones",
    ctaSubtitle: "Sigue a estos expertos para mantenerte inspirado e informado sobre la construcción de relaciones fuertes y saludables",
    backToHome: "Volver al Inicio"
  },
  fr: {
    title: "Influenceurs et Experts en Relations",
    subtitle: "Suivez des créateurs de contenu experts pour l'inspiration quotidienne et des conseils relationnels",
    back: "Retour au Soutien",
    followers: "abonnés",
    followOn: "Suivre sur",
    featured: "En vedette",
    ctaTitle: "Obtenez l'Inspiration Relationnelle Quotidienne",
    ctaSubtitle: "Suivez ces experts pour rester inspiré et informé sur la construction de relations fortes et saines",
    backToHome: "Retour à l'Accueil"
  },
  it: {
    title: "Influencer ed Esperti di Relazioni",
    subtitle: "Segui creatori di contenuti esperti per ispirazione quotidiana e consigli sulle relazioni",
    back: "Torna al Supporto",
    followers: "follower",
    followOn: "Segui su",
    featured: "In evidenza",
    ctaTitle: "Ottieni Ispirazione Quotidiana sulle Relazioni",
    ctaSubtitle: "Segui questi esperti per rimanere ispirato e informato sulla costruzione di relazioni forti e sane",
    backToHome: "Torna alla Home"
  },
  de: {
    title: "Beziehungsinfluencer & Experten",
    subtitle: "Folgen Sie Experten-Content-Erstellern für tägliche Beziehungsinspiration und -ratschläge",
    back: "Zurück zur Unterstützung",
    followers: "Follower",
    followOn: "Folgen auf",
    featured: "Hervorgehoben",
    ctaTitle: "Erhalten Sie Tägliche Beziehungsinspiration",
    ctaSubtitle: "Folgen Sie diesen Experten, um inspiriert und informiert über den Aufbau starker, gesunder Beziehungen zu bleiben",
    backToHome: "Zurück zur Startseite"
  },
  nl: {
    title: "Relatie Influencers & Experts",
    subtitle: "Volg expert content creators voor dagelijkse relatie-inspiratie en advies",
    back: "Terug naar Ondersteuning",
    followers: "volgers",
    followOn: "Volgen op",
    featured: "Uitgelicht",
    ctaTitle: "Ontvang Dagelijkse Relatie-Inspiratie",
    ctaSubtitle: "Volg deze experts om geïnspireerd en geïnformeerd te blijven over het opbouwen van sterke, gezonde relaties",
    backToHome: "Terug naar Home"
  },
  pt: {
    title: "Influenciadores e Especialistas em Relacionamentos",
    subtitle: "Siga criadores de conteúdo especializados para inspiração diária e conselhos sobre relacionamentos",
    back: "Voltar ao Suporte",
    followers: "seguidores",
    followOn: "Seguir no",
    featured: "Em destaque",
    ctaTitle: "Obtenha Inspiração Diária para Relacionamentos",
    ctaSubtitle: "Siga esses especialistas para se manter inspirado e informado sobre a construção de relacionamentos fortes e saudáveis",
    backToHome: "Voltar para Home"
  }
};

export default function InfluencersSupport() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.en;

  const influencers = [
    {
      id: 1,
      name: "Sarah & Mike Johnson",
      handle: "@couplegoals",
      followers: "2.5M",
      platform: "Instagram",
      color: "from-pink-500 to-rose-600",
      description: "Sharing real marriage moments, honest conversations, and tips for building lasting love.",
      tags: ['communication', 'marriage', 'honesty'],
      featured: true
    },
    {
      id: 2,
      name: "Dr. Emily Chen",
      handle: "@relationshipdoc",
      followers: "1.8M",
      platform: "TikTok",
      color: "from-cyan-500 to-blue-600",
      description: "Relationship therapist breaking down complex relationship dynamics into simple, actionable advice.",
      tags: ['therapy', 'psychology', 'advice'],
      featured: true
    },
    {
      id: 3,
      name: "The Love Lab",
      handle: "@thelovelab",
      followers: "950K",
      platform: "YouTube",
      color: "from-red-500 to-pink-600",
      description: "Science-backed relationship tips and research-based advice for modern couples.",
      tags: ['science', 'research', 'modern love'],
      featured: false
    },
    {
      id: 4,
      name: "Marcus & Tasha Williams",
      handle: "@realrelationships",
      followers: "1.2M",
      platform: "Instagram",
      color: "from-purple-500 to-pink-600",
      description: "Authentic couple sharing the ups and downs of marriage with humor and honesty.",
      tags: ['authentic', 'marriage', 'humor'],
      featured: true
    },
    {
      id: 5,
      name: "Love Coach Rachel",
      handle: "@lovecoachrachel",
      followers: "750K",
      platform: "Twitter",
      color: "from-blue-500 to-cyan-600",
      description: "Daily relationship wisdom, dating advice, and self-love reminders for singles and couples.",
      tags: ['coaching', 'dating', 'self-love'],
      featured: false
    },
    {
      id: 6,
      name: "David & Ana Martinez",
      handle: "@couplesjourney",
      followers: "850K",
      platform: "YouTube",
      color: "from-orange-500 to-red-600",
      description: "Multicultural couple sharing insights on cross-cultural relationships and global love stories.",
      tags: ['multicultural', 'global', 'diversity'],
      featured: false
    }
  ];

  const getPlatformIcon = (platform) => {
    switch(platform) {
      case 'Instagram': return Instagram;
      case 'Twitter': return Twitter;
      case 'YouTube': return Youtube;
      case 'TikTok': return MessageCircle;
      default: return Heart;
    }
  };

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
              <Megaphone className="text-purple-500 mr-3" size={32} />
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
        {/* Influencers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {influencers.map((influencer, index) => {
            const PlatformIcon = getPlatformIcon(influencer.platform);
            return (
              <motion.div
                key={influencer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 relative overflow-hidden">
                  {influencer.featured && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                      {t.featured}
                    </div>
                  )}
                  <CardHeader>
                    <div className={`w-20 h-20 bg-gradient-to-br ${influencer.color} rounded-full flex items-center justify-center mb-4 shadow-lg mx-auto`}>
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 text-center">
                      {influencer.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600 text-center">{influencer.handle}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <PlatformIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-semibold text-gray-700">
                        {influencer.followers} {t.followers}
                      </span>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4 text-center">
                      {influencer.description}
                    </p>

                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {influencer.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Button className={`w-full bg-gradient-to-r ${influencer.color} hover:opacity-90`}>
                      <PlatformIcon className="w-4 h-4 mr-2" />
                      {t.followOn} {influencer.platform}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <TrendingUp className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">
            {t.ctaTitle}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t.ctaSubtitle}
          </p>
          <Link to={createPageUrl("Home")}>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6">
              {t.backToHome}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
