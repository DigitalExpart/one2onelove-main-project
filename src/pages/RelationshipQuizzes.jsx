
import React, { useState } from "react";
import { Heart, MessageCircle, AlertCircle, Users, Sparkles, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/Layout";

const translations = {
  en: {
    quizzes: {
      title: "Relationship Quizzes",
      subtitle: "Discover insights about yourself and your relationships through expert-designed assessments",
      questions: "questions",
      startQuiz: "Start Quiz",
      comingSoon: "Coming soon!",
      mostPopular: "Most Popular",
      ctaTitle: "Understand Yourself Better",
      ctaSubtitle: "These quizzes are designed by relationship experts to help you gain valuable insights into your patterns, preferences, and potential growth areas",
      browseAll: "Browse All Quizzes",
      getSupport: "Get Expert Support",
      backToSupport: "Back to Support"
    },
    quizList: {
      loveLanguage: { title: "Love Language Quiz", description: "Discover how you prefer to give and receive love", duration: "5 min" },
      communicationStyle: { title: "Communication Style Quiz", description: "Learn your communication patterns and how to improve them", duration: "6 min" },
      conflictResolution: { title: "Conflict Resolution Style", description: "Understand how you handle disagreements and conflicts", duration: "5 min" },
      attachmentStyle: { title: "Attachment Style Quiz", description: "Identify your attachment patterns in relationships", duration: "7 min" },
      datingReadiness: { title: "Dating Readiness Assessment", description: "Find out if you're ready to start dating again", duration: "4 min" },
      relationshipHealth: { title: "Relationship Health Check", description: "Evaluate the overall health of your relationship", duration: "10 min" }
    }
  },
  es: {
    quizzes: {
      title: "Cuestionarios de Relaciones",
      subtitle: "Descubre información sobre ti mismo y tus relaciones a través de evaluaciones diseñadas por expertos",
      questions: "preguntas",
      startQuiz: "Comenzar Cuestionario",
      comingSoon: "¡Próximamente!",
      mostPopular: "Más Popular",
      ctaTitle: "Conócete Mejor",
      ctaSubtitle: "Estos cuestionarios están diseñados por expertos en relaciones para ayudarte a obtener información valiosa sobre tus patrones, preferencias y áreas potenciales de crecimiento",
      browseAll: "Explorar Todos los Cuestionarios",
      getSupport: "Obtener Apoyo Experto",
      backToSupport: "Volver al Soporte"
    },
    quizList: {
      loveLanguage: { title: "Quiz de Lenguaje del Amor", description: "Descubre cómo prefieres dar y recibir amor", duration: "5 min" },
      communicationStyle: { title: "Quiz de Estilo de Comunicación", description: "Aprende tus patrones de comunicación y cómo mejorarlos", duration: "6 min" },
      conflictResolution: { title: "Estilo de Resolución de Conflictos", description: "Comprende cómo manejas los desacuerdos y conflictos", duration: "5 min" },
      attachmentStyle: { title: "Quiz de Estilo de Apego", description: "Identifica tus patrones de apego en las relaciones", duration: "7 min" },
      datingReadiness: { title: "Evaluación de Preparación para Citas", description: "Descubre si estás listo para comenzar a salir de nuevo", duration: "4 min" },
      relationshipHealth: { title: "Chequeo de Salud de la Relación", description: "Evalúa la salud general de tu relación", duration: "10 min" }
    }
  },
  fr: {
    quizzes: {
      title: "Quiz sur les Relations",
      subtitle: "Découvrez des informations sur vous-même et vos relations grâce à des évaluations conçues par des experts",
      questions: "questions",
      startQuiz: "Commencer le Quiz",
      comingSoon: "Bientôt disponible!",
      mostPopular: "Le Plus Populaire",
      ctaTitle: "Mieux Se Comprendre",
      ctaSubtitle: "Ces quiz sont conçus par des experts en relations pour vous aider à obtenir des informations précieuses sur vos schémas, préférences et domaines de croissance potentiels",
      browseAll: "Parcourir Tous les Quiz",
      getSupport: "Obtenir un Soutien Expert",
      backToSupport: "Retour au Support"
    },
    quizList: {
      loveLanguage: { title: "Quiz sur les Langages d'Amour", description: "Découvrez comment vous préférez donner et recevoir de l'amour", duration: "5 min" },
      communicationStyle: { title: "Quiz sur le Style de Communication", description: "Apprenez vos schémas de communication et comment les améliorer", duration: "6 min" },
      conflictResolution: { title: "Style de Résolution de Conflits", description: "Comprenez comment vous gérez les désaccords et les conflits", duration: "5 min" },
      attachmentStyle: { title: "Quiz sur le Style d'Attachement", description: "Identifiez vos schémas d'attachement dans les relations", duration: "7 min" },
      datingReadiness: { title: "Évaluation de Préparation aux Rencontres", description: "Découvrez si vous êtes prêt à recommencer à sortir", duration: "4 min" },
      relationshipHealth: { title: "Bilan de Santé de la Relation", description: "Évaluez la santé globale de votre relation", duration: "10 min" }
    }
  },
  it: {
    quizzes: {
      title: "Quiz sulle Relazioni",
      subtitle: "Scopri informazioni su te stesso e le tue relazioni attraverso valutazioni progettate da esperti",
      questions: "domande",
      startQuiz: "Inizia Quiz",
      comingSoon: "Prossimamente!",
      mostPopular: "Più Popolare",
      ctaTitle: "Comprenditi Meglio",
      ctaSubtitle: "Questi quiz sono progettati da esperti di relazioni per aiutarti a ottenere informazioni preziose sui tuoi schemi, preferenze e aree potenziali di crescita",
      browseAll: "Sfoglia Tutti i Quiz",
      getSupport: "Ottieni Supporto Esperto",
      backToSupport: "Torna al Supporto"
    },
    quizList: {
      loveLanguage: { title: "Quiz sul Linguaggio dell'Amore", description: "Scopri come preferisci dare e ricevere amore", duration: "5 min" },
      communicationStyle: { title: "Quiz sullo Stile di Comunicazione", description: "Impara i tuoi schemi di comunicazione e come migliorarli", duration: "6 min" },
      conflictResolution: { title: "Stile di Risoluzione dei Conflitti", description: "Comprendi come gestisci i disaccordi e i conflitti", duration: "5 min" },
      attachmentStyle: { title: "Quiz sullo Stile di Attaccamento", description: "Identifica i tuoi schemi di attaccamento nelle relazioni", duration: "7 min" },
      datingReadiness: { title: "Valutazione della Prontezza agli Appuntamenti", description: "Scopri se sei pronto per ricominciare ad uscire", duration: "4 min" },
      relationshipHealth: { title: "Controllo della Salute della Relazione", description: "Valuta la salute complessiva della tua relazione", duration: "10 min" }
    }
  },
  de: {
    quizzes: {
      title: "Beziehungsquiz",
      subtitle: "Entdecken Sie Einblicke über sich selbst und Ihre Beziehungen durch von Experten entwickelte Bewertungen",
      questions: "Fragen",
      startQuiz: "Quiz Starten",
      comingSoon: "Demnächst verfügbar!",
      mostPopular: "Am Beliebtesten",
      ctaTitle: "Sich Selbst Besser Verstehen",
      ctaSubtitle: "Diese Quiz wurden von Beziehungsexperten entwickelt, um Ihnen wertvolle Einblicke in Ihre Muster, Vorlieben und potenzielle Wachstumsbereiche zu geben",
      browseAll: "Alle Quiz Durchsuchen",
      getSupport: "Expertenhilfe Erhalten",
      backToSupport: "Zurück zum Support"
    },
    quizList: {
      loveLanguage: { title: "Liebessprachen-Quiz", description: "Entdecken Sie, wie Sie Liebe am liebsten geben und empfangen", duration: "5 Min" },
      communicationStyle: { title: "Kommunikationsstil-Quiz", description: "Lernen Sie Ihre Kommunikationsmuster und wie Sie sie verbessern können", duration: "6 Min" },
      conflictResolution: { title: "Konfliktlösungsstil", description: "Verstehen Sie, wie Sie mit Meinungsverschiedenheiten und Konflikten umgehen", duration: "5 Min" },
      attachmentStyle: { title: "Bindungsstil-Quiz", description: "Identifizieren Sie Ihre Bindungsmuster in Beziehungen", duration: "7 Min" },
      datingReadiness: { title: "Dating-Bereitschaftsbewertung", description: "Finden Sie heraus, ob Sie bereit sind, wieder mit dem Dating zu beginnen", duration: "4 Min" },
      relationshipHealth: { title: "Beziehungsgesundheitscheck", description: "Bewerten Sie die allgemeine Gesundheit Ihrer Beziehung", duration: "10 Min" }
    }
  },
  nl: {
    quizzes: {
      title: "Relatie Quizzen",
      subtitle: "Ontdek inzichten over jezelf en je relaties door middel van door experts ontworpen beoordelingen",
      questions: "vragen",
      startQuiz: "Start Quiz",
      comingSoon: "Binnenkort beschikbaar!",
      mostPopular: "Meest Populair",
      ctaTitle: "Jezelf Beter Begrijpen",
      ctaSubtitle: "Deze quizzen zijn ontworpen door relatiedeskundigen om je te helpen waardevolle inzichten te krijgen in je patronen, voorkeuren en potentiële groeigebieden",
      browseAll: "Blader door Alle Quizzen",
      getSupport: "Krijg Expert Ondersteuning",
      backToSupport: "Terug naar ondersteuning"
    },
    quizList: {
      loveLanguage: { title: "Liefdetalen Quiz", description: "Ontdek hoe je het liefst liefde geeft en ontvangt", duration: "5 min" },
      communicationStyle: { title: "Communicatiestijl Quiz", description: "Leer je communicatiepatronen en hoe je ze kunt verbeteren", duration: "6 min" },
      conflictResolution: { title: "Conflictoplossingstijl", description: "Begrijp hoe je omgaat met meningsverschillen en conflicten", duration: "5 min" },
      attachmentStyle: { title: "Hechtingsstijl Quiz", description: "Identificeer je hechtingspatronen in relaties", duration: "7 min" },
      datingReadiness: { title: "Dating Gereedheidsbeoordering", description: "Ontdek of je klaar bent om opnieuw te beginnen met daten", duration: "4 min" },
      relationshipHealth: { title: "Relatiegezondheidscontrole", description: "Evalueer de algehele gezondheid van je relatie", duration: "10 min" }
    }
  },
  pt: {
    quizzes: {
      title: "Questionários de Relacionamento",
      subtitle: "Descubra insights sobre você mesmo e seus relacionamentos através de avaliações projetadas por especialistas",
      questions: "questões",
      startQuiz: "Iniciar Quiz",
      comingSoon: "Em breve!",
      mostPopular: "Mais Popular",
      ctaTitle: "Entenda-se Melhor",
      ctaSubtitle: "Esses questionários são projetados por especialistas em relacionamentos para ajudá-lo a obter insights valiosos sobre seus padrões, preferências e áreas potenciais de crescimento",
      browseAll: "Navegar por Todos os Questionários",
      getSupport: "Obter Suporte Especializado",
      backToSupport: "Voltar ao Suporte"
    },
    quizList: {
      loveLanguage: { title: "Quiz das Linguagens do Amor", description: "Descubra como você prefere dar e receber amor", duration: "5 min" },
      communicationStyle: { title: "Quiz de Estilo de Comunicação", description: "Aprenda seus padrões de comunicação e como melhorá-los", duration: "6 min" },
      conflictResolution: { title: "Estilo de Resolução de Conflitos", description: "Entenda como você lida com desacordos e conflitos", duration: "5 min" },
      attachmentStyle: { title: "Quiz de Estilo de Apego", description: "Identifique seus padrões de apego em relacionamentos", duration: "7 min" },
      datingReadiness: { title: "Avaliação de Prontidão para Namoro", description: "Descubra se você está pronto para começar a namorar novamente", duration: "4 min" },
      relationshipHealth: { title: "Verificação de Saúde do Relacionamento", description: "Avalie a saúde geral do seu relacionamento", duration: "10 min" }
    }
  }
};

export default function RelationshipQuizzes() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.en;

  const quizzes = [
    {
      id: 'love-language',
      title: t.quizList.loveLanguage.title,
      icon: Heart,
      color: 'from-pink-500 to-rose-600',
      description: t.quizList.loveLanguage.description,
      questions: 15,
      duration: t.quizList.loveLanguage.duration,
      link: 'LoveLanguageQuiz',
      badge: t.quizzes.mostPopular
    },
    {
      id: 'communication-style',
      title: t.quizList.communicationStyle.title,
      icon: MessageCircle,
      color: 'from-blue-500 to-cyan-600',
      description: t.quizList.communicationStyle.description,
      questions: 12,
      duration: t.quizList.communicationStyle.duration,
      internal: true
    },
    {
      id: 'conflict-resolution',
      title: t.quizList.conflictResolution.title,
      icon: AlertCircle,
      color: 'from-orange-500 to-red-600',
      description: t.quizList.conflictResolution.description,
      questions: 10,
      duration: t.quizList.conflictResolution.duration,
      internal: true
    },
    {
      id: 'attachment-style',
      title: t.quizList.attachmentStyle.title,
      icon: Users,
      color: 'from-purple-500 to-pink-600',
      description: t.quizList.attachmentStyle.description,
      questions: 15,
      duration: t.quizList.attachmentStyle.duration,
      internal: true
    },
    {
      id: 'dating-readiness',
      title: t.quizList.datingReadiness.title,
      icon: Sparkles,
      color: 'from-green-500 to-emerald-600',
      description: t.quizList.datingReadiness.description,
      questions: 8,
      duration: t.quizList.datingReadiness.duration,
      internal: true
    },
    {
      id: 'relationship-health',
      title: t.quizList.relationshipHealth.title,
      icon: Heart,
      color: 'from-red-500 to-pink-600',
      description: t.quizList.relationshipHealth.description,
      questions: 20,
      duration: t.quizList.relationshipHealth.duration,
      internal: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link
            to={createPageUrl("CoupleSupport")}
            className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
          >
            <ArrowLeft size={20} className="mr-2" />
            {t.quizzes.backToSupport}
          </Link>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-6 shadow-xl">
            <Heart className="w-10 h-10 text-white fill-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t.quizzes.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.quizzes.subtitle}
          </p>
        </motion.div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map((quiz, index) => {
            const Icon = quiz.icon;
            return (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-pink-200 relative">
                  {quiz.badge && (
                    <div className="absolute -top-3 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {quiz.badge}
                    </div>
                  )}
                  <CardHeader>
                    <div className={`w-16 h-16 bg-gradient-to-br ${quiz.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {quiz.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {quiz.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{quiz.duration}</span>
                      </div>
                      <span>{quiz.questions} {t.quizzes.questions}</span>
                    </div>

                    {quiz.link ? (
                      <Link to={createPageUrl(quiz.link)}>
                        <Button className={`w-full bg-gradient-to-r ${quiz.color} hover:opacity-90 text-lg py-6`}>
                          {t.quizzes.startQuiz}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        className={`w-full bg-gradient-to-r ${quiz.color} hover:opacity-90 text-lg py-6`}
                        onClick={() => {
                          alert(t.quizzes.comingSoon);
                        }}
                      >
                        {t.quizzes.startQuiz}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    )}
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
          className="mt-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <Heart className="w-16 h-16 mx-auto mb-6 fill-current" />
          <h2 className="text-4xl font-bold mb-4">
            {t.quizzes.ctaTitle}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {t.quizzes.ctaSubtitle}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100 text-lg px-8 py-6">
              {t.quizzes.browseAll}
            </Button>
            <Link to={createPageUrl("CoupleSupport")}>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6">
                {t.quizzes.getSupport}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
