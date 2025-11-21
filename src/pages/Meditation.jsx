
import React, { useState } from "react";
import { Flame, Heart, Play, Pause, RotateCcw, Clock, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/Layout";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const translations = {
  en: {
    title: "Guided Meditation for Couples",
    subtitle: "Strengthen your bond and reduce stress through mindfulness exercises designed for partners",
    meditationTitle: "Meditation",
    duration: "Duration",
    minutes: "min",
    start: "Start Meditation",
    pause: "Pause",
    resume: "Resume",
    restart: "Restart",
    backToSupport: "Back to Support",
    meditations: {
      breathingTogether: {
        title: "Breathing Together",
        description: "Synchronize your breath and create harmony through this simple yet powerful breathing exercise",
        duration: 10
      },
      gratitude: {
        title: "Gratitude Practice",
        description: "Reflect on what you appreciate about each other and deepen your connection through gratitude",
        duration: 15
      },
      lovingKindness: {
        title: "Loving-Kindness Meditation",
        description: "Cultivate compassion and love for yourself and your partner through this heartwarming practice",
        duration: 12
      },
      stressRelief: {
        title: "Couples Stress Relief",
        description: "Release tension together and support each other in finding calm and peace",
        duration: 20
      },
      deepConnection: {
        title: "Deep Connection",
        description: "Create a profound emotional bond through guided visualization and shared presence",
        duration: 25
      },
      morningIntention: {
        title: "Morning Intention Setting",
        description: "Start your day together by setting positive intentions for your relationship",
        duration: 8
      }
    }
  },
  es: {
    title: "Meditación Guiada para Parejas",
    subtitle: "Fortalece tu vínculo y reduce el estrés a través de ejercicios de mindfulness diseñados para parejas",
    meditationTitle: "Meditación",
    duration: "Duración",
    minutes: "min",
    start: "Iniciar Meditación",
    pause: "Pausar",
    resume: "Reanudar",
    restart: "Reiniciar",
    backToSupport: "Volver al Soporte",
    meditations: {
      breathingTogether: {
        title: "Respirando Juntos",
        description: "Sincroniza tu respiración y crea armonía a través de este ejercicio de respiración simple pero poderoso",
        duration: 10
      },
      gratitude: {
        title: "Práctica de Gratitud",
        description: "Reflexiona sobre lo que aprecias el uno del otro y profundiza tu conexión a través de la gratitud",
        duration: 15
      },
      lovingKindness: {
        title: "Meditación de Bondad Amorosa",
        description: "Cultiva compasión y amor por ti mismo y tu pareja a través de esta práctica reconfortante",
        duration: 12
      },
      stressRelief: {
        title: "Alivio del Estrés en Pareja",
        description: "Libera la tensión juntos y apóyense mutuamente para encontrar calma y paz",
        duration: 20
      },
      deepConnection: {
        title: "Conexión Profunda",
        description: "Crea un vínculo emocional profundo a través de visualización guiada y presencia compartida",
        duration: 25
      },
      morningIntention: {
        title: "Intención Matutina",
        description: "Comiencen su día juntos estableciendo intenciones positivas para su relación",
        duration: 8
      }
    }
  },
  fr: {
    title: "Méditation Guidée pour Couples",
    subtitle: "Renforcez votre lien et réduisez le stress grâce à des exercices de pleine conscience conçus pour les partenaires",
    meditationTitle: "Méditation",
    duration: "Durée",
    minutes: "min",
    start: "Commencer la Méditation",
    pause: "Pause",
    resume: "Reprendre",
    restart: "Recommencer",
    backToSupport: "Retour au Support",
    meditations: {
      breathingTogether: {
        title: "Respirer Ensemble",
        description: "Synchronisez votre respiration et créez l'harmonie grâce à cet exercice de respiration simple mais puissant",
        duration: 10
      },
      gratitude: {
        title: "Pratique de la Gratitude",
        description: "Réfléchissez à ce que vous appréciez l'un chez l'autre et approfondissez votre connexion par la gratitude",
        duration: 15
      },
      lovingKindness: {
        title: "Méditation de Bienveillance",
        description: "Cultivez la compassion et l'amour pour vous-même et votre partenaire grâce à cette pratique réconfortante",
        duration: 12
      },
      stressRelief: {
        title: "Soulagement du Stress en Couple",
        description: "Libérez les tensions ensemble et soutenez-vous mutuellement pour trouver calme et paix",
        duration: 20
      },
      deepConnection: {
        title: "Connexion Profonde",
        description: "Créez un lien émotionnel profond grâce à la visualisation guidée et à la présence partagée",
        duration: 25
      },
      morningIntention: {
        title: "Intention du Matin",
        description: "Commencez votre journée ensemble en définissant des intentions positives pour votre relation",
        duration: 8
      }
    }
  },
  it: {
    title: "Meditazione Guidata per Coppie",
    subtitle: "Rafforza il tuo legame e riduci lo stress attraverso esercizi di mindfulness progettati per i partner",
    meditationTitle: "Meditazione",
    duration: "Durata",
    minutes: "min",
    start: "Inizia Meditazione",
    pause: "Pausa",
    resume: "Riprendi",
    restart: "Ricomincia",
    backToSupport: "Torna al Supporto",
    meditations: {
      breathingTogether: {
        title: "Respirare Insieme",
        description: "Sincronizza il tuo respiro e crea armonia attraverso questo semplice ma potente esercizio di respirazione",
        duration: 10
      },
      gratitude: {
        title: "Pratica della Gratitudine",
        description: "Rifletti su ciò che apprezzi l'uno dell'altro e approfondisci la tua connessione attraverso la gratitudine",
        duration: 15
      },
      lovingKindness: {
        title: "Meditazione della Gentilezza Amorevole",
        description: "Coltiva compassione e amore per te stesso e il tuo partner attraverso questa pratica confortante",
        duration: 12
      },
      stressRelief: {
        title: "Sollievo dallo Stress di Coppia",
        description: "Rilascia la tensione insieme e sostenetevi a vicenda nel trovare calma e pace",
        duration: 20
      },
      deepConnection: {
        title: "Connessione Profonda",
        description: "Crea un profondo legame emotivo attraverso la visualizzazione guidata e la presenza condivisa",
        duration: 25
      },
      morningIntention: {
        title: "Intenzione del Mattino",
        description: "Inizia la giornata insieme stabilendo intenzioni positive per la vostra relazione",
        duration: 8
      }
    }
  },
  de: {
    title: "Geführte Meditation für Paare",
    subtitle: "Stärken Sie Ihre Bindung und reduzieren Sie Stress durch Achtsamkeitsübungen für Partner",
    meditationTitle: "Meditation",
    duration: "Dauer",
    minutes: "Min",
    start: "Meditation Starten",
    pause: "Pause",
    resume: "Fortsetzen",
    restart: "Neustart",
    backToSupport: "Zurück zum Support",
    meditations: {
      breathingTogether: {
        title: "Gemeinsam Atmen",
        description: "Synchronisieren Sie Ihren Atem und schaffen Sie Harmonie durch diese einfache, aber kraftvolle Atemübung",
        duration: 10
      },
      gratitude: {
        title: "Dankbarkeitspraxis",
        description: "Reflektieren Sie, was Sie aneinander schätzen und vertiefen Sie Ihre Verbindung durch Dankbarkeit",
        duration: 15
      },
      lovingKindness: {
        title: "Liebende-Güte-Meditation",
        description: "Kultivieren Sie Mitgefühl und Liebe für sich selbst und Ihren Partner durch diese herzerwärmende Praxis",
        duration: 12
      },
      stressRelief: {
        title: "Stressabbau für Paare",
        description: "Lösen Sie gemeinsam Spannungen und unterstützen Sie einander beim Finden von Ruhe und Frieden",
        duration: 20
      },
      deepConnection: {
        title: "Tiefe Verbindung",
        description: "Schaffen Sie eine tiefe emotionale Bindung durch geführte Visualisierung und gemeinsame Präsenz",
        duration: 25
      },
      morningIntention: {
        title: "Morgenintention",
        description: "Beginnen Sie Ihren Tag gemeinsam, indem Sie positive Absichten für Ihre Beziehung setzen",
        duration: 8
      }
    }
  }
};

const colorGradients = [
  'from-emerald-500 to-teal-500',
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-orange-500 to-amber-500',
  'from-rose-500 to-pink-500',
  'from-indigo-500 to-purple-500'
];

export default function Meditation() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.en;
  
  const [activeMeditation, setActiveMeditation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const meditations = Object.keys(t.meditations).map((key, index) => ({
    id: key,
    ...t.meditations[key],
    gradient: colorGradients[index % colorGradients.length]
  }));

  const handleStart = (meditation) => {
    setActiveMeditation(meditation);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleResume = () => {
    setIsPlaying(true);
  };

  const handleRestart = () => {
    setIsPlaying(true);
  };

  const handleStop = () => {
    setActiveMeditation(null);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link
            to={createPageUrl("CoupleSupport")}
            className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
          >
            <ArrowLeft size={20} className="mr-2" />
            {t.backToSupport}
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mb-6 shadow-xl">
            <Flame className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-dancing">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {!activeMeditation ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meditations.map((meditation, index) => (
              <motion.div
                key={meditation.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all border-2 border-transparent hover:border-emerald-200">
                  <CardHeader>
                    <div className={`w-16 h-16 bg-gradient-to-br ${meditation.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                      <Flame className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {meditation.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {meditation.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{meditation.duration} {t.minutes}</span>
                    </div>
                    <Button
                      onClick={() => handleStart(meditation)}
                      className={`w-full bg-gradient-to-r ${meditation.gradient} hover:opacity-90 text-white`}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {t.start}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="shadow-2xl border-2 border-emerald-200">
              <CardHeader className={`bg-gradient-to-r ${activeMeditation.gradient} text-white rounded-t-xl`}>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold mb-2">
                      {activeMeditation.title}
                    </CardTitle>
                    <p className="text-white/90">{activeMeditation.description}</p>
                  </div>
                  <Flame className="w-16 h-16" />
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mb-6">
                    <Heart className="w-16 h-16 text-emerald-600 animate-pulse" />
                  </div>
                  <p className="text-lg text-gray-600 mb-2">
                    {t.duration}: {activeMeditation.duration} {t.minutes}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isPlaying ? 'Meditating...' : 'Paused'}
                  </p>
                </div>

                <div className="flex gap-3 justify-center">
                  {isPlaying ? (
                    <Button
                      onClick={handlePause}
                      size="lg"
                      variant="outline"
                      className="px-8"
                    >
                      <Pause className="w-5 h-5 mr-2" />
                      {t.pause}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleResume}
                      size="lg"
                      className={`bg-gradient-to-r ${activeMeditation.gradient} hover:opacity-90 text-white px-8`}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      {t.resume}
                    </Button>
                  )}
                  <Button
                    onClick={handleRestart}
                    size="lg"
                    variant="outline"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    {t.restart}
                  </Button>
                  <Button
                    onClick={handleStop}
                    size="lg"
                    variant="ghost"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
