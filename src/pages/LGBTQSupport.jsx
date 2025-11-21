import React, { useState } from "react";
import { useLanguage } from "@/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Heart, Search, BookOpen, Users, MessageCircle, Shield, 
  Sparkles, Calendar, Target, Award, Video, FileText, Phone
} from "lucide-react";
import { motion } from "framer-motion";

const translations = {
  en: {
    title: "LGBTQ+ Relationship Support",
    subtitle: "Specialized resources and support for LGBTQ+ couples",
    search: "Search resources...",
    categories: {
      all: "All Resources",
      comingOut: "Coming Out",
      familyAcceptance: "Family Acceptance",
      legalRights: "Legal Rights & Marriage",
      parenthood: "LGBTQ+ Parenthood",
      intimacy: "Intimacy & Connection",
      mentalHealth: "Mental Health",
      community: "Community Building",
      discrimination: "Facing Discrimination",
      transitions: "Transitions & Identity",
      spirituality: "Faith & Spirituality"
    },
    featured: "Featured Resources",
    tools: "Interactive Tools",
    emergency: "Crisis Support",
    emergencyText: "If you're in crisis, please reach out:",
    hotlines: {
      trevor: "The Trevor Project: 1-866-488-7386",
      trans: "Trans Lifeline: 1-877-565-8860",
      glbt: "GLBT National Hotline: 1-888-843-4564"
    },
    viewAll: "View All Resources",
    comingSoon: "Coming Soon"
  },
  es: {
    title: "Apoyo para Relaciones LGBTQ+",
    subtitle: "Recursos especializados y apoyo para parejas LGBTQ+",
    search: "Buscar recursos...",
    categories: {
      all: "Todos los Recursos",
      comingOut: "Salir del Armario",
      familyAcceptance: "Aceptación Familiar",
      legalRights: "Derechos Legales y Matrimonio",
      parenthood: "Paternidad LGBTQ+",
      intimacy: "Intimidad y Conexión",
      mentalHealth: "Salud Mental",
      community: "Construcción Comunitaria",
      discrimination: "Enfrentar la Discriminación",
      transitions: "Transiciones e Identidad",
      spirituality: "Fe y Espiritualidad"
    },
    featured: "Recursos Destacados",
    tools: "Herramientas Interactivas",
    emergency: "Apoyo en Crisis",
    emergencyText: "Si estás en crisis, por favor contacta:",
    viewAll: "Ver Todos los Recursos",
    comingSoon: "Próximamente"
  },
  fr: {
    title: "Soutien aux Relations LGBTQ+",
    subtitle: "Ressources spécialisées et soutien pour les couples LGBTQ+",
    search: "Rechercher des ressources...",
    categories: {
      all: "Toutes les Ressources",
      comingOut: "Coming Out",
      familyAcceptance: "Acceptation Familiale",
      legalRights: "Droits Légaux et Mariage",
      parenthood: "Parentalité LGBTQ+",
      intimacy: "Intimité et Connexion",
      mentalHealth: "Santé Mentale",
      community: "Construction Communautaire",
      discrimination: "Face à la Discrimination",
      transitions: "Transitions et Identité",
      spirituality: "Foi et Spiritualité"
    },
    featured: "Ressources en Vedette",
    tools: "Outils Interactifs",
    emergency: "Soutien en Crise",
    emergencyText: "Si vous êtes en crise, veuillez contacter:",
    viewAll: "Voir Toutes les Ressources",
    comingSoon: "Bientôt Disponible"
  },
  it: {
    title: "Supporto per Relazioni LGBTQ+",
    subtitle: "Risorse specializzate e supporto per coppie LGBTQ+",
    search: "Cerca risorse...",
    categories: {
      all: "Tutte le Risorse",
      comingOut: "Coming Out",
      familyAcceptance: "Accettazione Familiare",
      legalRights: "Diritti Legali e Matrimonio",
      parenthood: "Genitorialità LGBTQ+",
      intimacy: "Intimità e Connessione",
      mentalHealth: "Salute Mentale",
      community: "Costruzione della Comunità",
      discrimination: "Affrontare la Discriminazione",
      transitions: "Transizioni e Identità",
      spirituality: "Fede e Spiritualità"
    },
    featured: "Risorse in Evidenza",
    tools: "Strumenti Interattivi",
    emergency: "Supporto in Crisi",
    emergencyText: "Se sei in crisi, contatta:",
    viewAll: "Visualizza Tutte le Risorse",
    comingSoon: "Prossimamente"
  },
  de: {
    title: "LGBTQ+ Beziehungsunterstützung",
    subtitle: "Spezialisierte Ressourcen und Unterstützung für LGBTQ+ Paare",
    search: "Ressourcen suchen...",
    categories: {
      all: "Alle Ressourcen",
      comingOut: "Coming Out",
      familyAcceptance: "Familienakzeptanz",
      legalRights: "Rechte und Ehe",
      parenthood: "LGBTQ+ Elternschaft",
      intimacy: "Intimität und Verbindung",
      mentalHealth: "Psychische Gesundheit",
      community: "Gemeinschaftsaufbau",
      discrimination: "Diskriminierung Begegnen",
      transitions: "Übergänge und Identität",
      spirituality: "Glaube und Spiritualität"
    },
    featured: "Empfohlene Ressourcen",
    tools: "Interaktive Tools",
    emergency: "Krisenunterstützung",
    emergencyText: "In einer Krise kontaktieren Sie bitte:",
    viewAll: "Alle Ressourcen Anzeigen",
    comingSoon: "Demnächst"
  }
};

const resources = [
  {
    id: 1,
    title: "Coming Out in a Relationship",
    category: "comingOut",
    description: "Navigate coming out while in a relationship, including timing, communication, and supporting your partner.",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    type: "article"
  },
  {
    id: 2,
    title: "Legal Rights & Marriage Equality",
    category: "legalRights",
    description: "Understand your legal rights, marriage equality laws, and protecting your relationship legally.",
    icon: Shield,
    color: "from-blue-500 to-cyan-500",
    type: "guide"
  },
  {
    id: 3,
    title: "Building Family Acceptance",
    category: "familyAcceptance",
    description: "Strategies for fostering family understanding and acceptance of your LGBTQ+ relationship.",
    icon: Users,
    color: "from-purple-500 to-pink-500",
    type: "article"
  },
  {
    id: 4,
    title: "LGBTQ+ Parenthood Journey",
    category: "parenthood",
    description: "Resources for LGBTQ+ couples considering adoption, surrogacy, or fostering children.",
    icon: Heart,
    color: "from-amber-500 to-orange-500",
    type: "guide"
  },
  {
    id: 5,
    title: "Intimacy & Connection for LGBTQ+ Couples",
    category: "intimacy",
    description: "Strengthen your bond with LGBTQ+-affirming intimacy advice and relationship guidance.",
    icon: Sparkles,
    color: "from-red-500 to-pink-500",
    type: "article"
  },
  {
    id: 6,
    title: "Mental Health & Wellbeing",
    category: "mentalHealth",
    description: "Address mental health challenges unique to LGBTQ+ relationships and find support.",
    icon: Heart,
    color: "from-green-500 to-emerald-500",
    type: "resource"
  },
  {
    id: 7,
    title: "Finding LGBTQ+ Affirming Therapists",
    category: "mentalHealth",
    description: "Connect with therapists who specialize in LGBTQ+ relationship counseling.",
    icon: MessageCircle,
    color: "from-indigo-500 to-purple-500",
    type: "directory"
  },
  {
    id: 8,
    title: "Facing Discrimination Together",
    category: "discrimination",
    description: "Resources for dealing with discrimination and building resilience as a couple.",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    type: "guide"
  },
  {
    id: 9,
    title: "Transitions & Identity in Relationships",
    category: "transitions",
    description: "Supporting your partner through gender transition and identity exploration.",
    icon: Sparkles,
    color: "from-cyan-500 to-blue-500",
    type: "article"
  },
  {
    id: 10,
    title: "LGBTQ+ Faith & Spirituality",
    category: "spirituality",
    description: "Reconciling faith, spirituality, and LGBTQ+ identity in your relationship.",
    icon: Heart,
    color: "from-purple-500 to-indigo-500",
    type: "resource"
  },
  {
    id: 11,
    title: "Building LGBTQ+ Community",
    category: "community",
    description: "Connect with other LGBTQ+ couples and build supportive community networks.",
    icon: Users,
    color: "from-pink-500 to-purple-500",
    type: "community"
  },
  {
    id: 12,
    title: "Bisexual & Pansexual Relationships",
    category: "intimacy",
    description: "Navigate unique aspects of bisexual and pansexual relationships with understanding.",
    icon: Heart,
    color: "from-purple-500 to-pink-500",
    type: "article"
  }
];

const interactiveTools = [
  {
    title: "LGBTQ+ Relationship Quiz",
    description: "Discover your relationship strengths and areas for growth",
    icon: Award,
    link: "RelationshipQuizzes",
    color: "from-pink-500 to-purple-600"
  },
  {
    title: "Coming Out Conversation Guide",
    description: "Interactive guide for having coming out conversations",
    icon: MessageCircle,
    link: "LGBTQSupport",
    color: "from-blue-500 to-cyan-600",
    comingSoon: true
  },
  {
    title: "LGBTQ+ Date Ideas",
    description: "Affirming and safe date ideas for LGBTQ+ couples",
    icon: Calendar,
    link: "DateIdeas",
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "Find LGBTQ+ Affirming Therapists",
    description: "Directory of LGBTQ+ affirming relationship therapists",
    icon: Users,
    link: "CoupleSupport",
    color: "from-green-500 to-emerald-600"
  }
];

export default function LGBTQSupport() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.en;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <style>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
          25% { transform: translateX(2px) translateY(-3px) rotate(1deg); }
          50% { transform: translateX(0) translateY(-5px) rotate(0deg); }
          75% { transform: translateX(-2px) translateY(-3px) rotate(-1deg); }
        }
        
        .pride-flag {
          animation: wave 3s ease-in-out infinite;
          transform-origin: left center;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full mb-6 shadow-xl">
            <Heart className="w-10 h-10 text-white fill-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Emergency Support Banner with Flag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Phone className="w-8 h-8 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{t.emergency}</h3>
                  <p className="mb-3 opacity-90">{t.emergencyText}</p>
                  <div className="space-y-1 text-sm font-medium">
                    <p>📞 {t.hotlines.trevor}</p>
                    <p>📞 {t.hotlines.trans}</p>
                    <p>📞 {t.hotlines.glbt}</p>
                  </div>
                </div>
                
                {/* Animated Pride Flag */}
                <div className="hidden md:block flex-shrink-0">
                  <div className="pride-flag w-48 h-32 rounded-lg shadow-2xl overflow-hidden">
                    <div className="h-full flex flex-col">
                      <div className="flex-1 bg-red-600"></div>
                      <div className="flex-1 bg-orange-500"></div>
                      <div className="flex-1 bg-yellow-400"></div>
                      <div className="flex-1 bg-green-500"></div>
                      <div className="flex-1 bg-blue-600"></div>
                      <div className="flex-1 bg-purple-700"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interactive Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.tools}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interactiveTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link to={createPageUrl(tool.link)}>
                    <Card className="h-full hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-200 relative overflow-hidden">
                      {tool.comingSoon && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                          {t.comingSoon}
                        </div>
                      )}
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {tool.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {tool.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Search and Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(t.categories).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === key
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.featured}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-200">
                    <CardHeader>
                      <div className={`w-14 h-14 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold text-gray-900">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-purple-600 uppercase">
                          {resource.type}
                        </span>
                        <Button variant="outline" size="sm">
                          {t.viewAll}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}