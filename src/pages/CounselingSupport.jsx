import React, { useState } from "react";
import { ArrowLeft, Users, Heart, Star, MapPin, Globe, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { useLanguage } from "@/Layout";

const translations = {
  en: {
    backToSupport: "Back to Support",
    title: "Couples Support",
    subtitle: "Connect with licensed professionals specializing in couples therapy and relationship counseling",
    licensedProfessionals: "Licensed Professionals",
    relationshipFocused: "Relationship-Focused",
    provenResults: "Proven Results",
    whyChooseTitle: "Why Choose Relationship Support?",
    licensedProfsCard: { title: "Licensed Professionals", description: "All therapists are licensed and verified professionals" },
    relationshipFocusedCard: { title: "Relationship Focused", description: "Specialized training in couples therapy and relationship counseling" },
    provenResultsCard: { title: "Proven Results", description: "Evidence-based approaches with successful outcomes" },
    searchPlaceholder: "Search by name or specialty",
    allSpecialties: "All Specialties",
    specialties: { couplesTherapy: "Couples Therapy", familyCounseling: "Family Counseling", traumaRecovery: "Trauma Recovery", communication: "Communication", preMarital: "Pre-Marital" },
    allFormats: "All Formats",
    formats: { inPerson: "In-Person", remote: "Remote", hybrid: "Hybrid" },
    sessions: "sessions",
    signUpToBook: "Sign Up to Book",
    viewProfile: "View Profile",
    ctaTitle: "Ready to Strengthen Your Relationship?",
    ctaSubtitle: "Take the first step toward a stronger, more connected relationship with professional guidance",
    scheduleFreeConsultation: "Schedule Free Consultation"
  },
  es: {
    backToSupport: "Volver al Apoyo",
    title: "Apoyo para Parejas",
    subtitle: "Conéctate con profesionales licenciados especializados en terapia de pareja y asesoramiento de relaciones",
    licensedProfessionals: "Profesionales Licenciados",
    relationshipFocused: "Enfocado en Relaciones",
    provenResults: "Resultados Comprobados",
    whyChooseTitle: "¿Por Qué Elegir Apoyo para Relaciones?",
    licensedProfsCard: { title: "Profesionales Licenciados", description: "Todos los terapeutas están licenciados y son profesionales verificados" },
    relationshipFocusedCard: { title: "Enfocado en Relaciones", description: "Capacitación especializada en terapia de pareja y asesoramiento de relaciones" },
    provenResultsCard: { title: "Resultados Comprobados", description: "Enfoques basados en evidencia con resultados exitosos" },
    searchPlaceholder: "Buscar por nombre o especialidad",
    allSpecialties: "Todas las Especialidades",
    specialties: { couplesTherapy: "Terapia de Pareja", familyCounseling: "Asesoramiento Familiar", traumaRecovery: "Recuperación de Trauma", communication: "Comunicación", preMarital: "Prematrimonial" },
    allFormats: "Todos los Formatos",
    formats: { inPerson: "En Persona", remote: "Remoto", hybrid: "Híbrido" },
    sessions: "sesiones",
    signUpToBook: "Registrarse para Reservar",
    viewProfile: "Ver Perfil",
    ctaTitle: "¿Listo para Fortalecer Tu Relación?",
    ctaSubtitle: "Da el primer paso hacia una relación más fuerte y conectada con orientación profesional",
    scheduleFreeConsultation: "Programar Consulta Gratuita"
  },
  fr: {
    backToSupport: "Retour au Soutien",
    title: "Soutien aux Couples",
    subtitle: "Connectez-vous avec des professionnels agréés spécialisés en thérapie de couple et conseil relationnel",
    licensedProfessionals: "Professionnels Agréés",
    relationshipFocused: "Axé sur les Relations",
    provenResults: "Résultats Prouvés",
    whyChooseTitle: "Pourquoi Choisir le Soutien Relationnel?",
    licensedProfsCard: { title: "Professionnels Agréés", description: "Tous les thérapeutes sont des professionnels agréés et vérifiés" },
    relationshipFocusedCard: { title: "Axé sur les Relations", description: "Formation spécialisée en thérapie de couple et conseil relationnel" },
    provenResultsCard: { title: "Résultats Prouvés", description: "Approches fondées sur des preuves avec des résultats positifs" },
    searchPlaceholder: "Rechercher par nom ou spécialité",
    allSpecialties: "Toutes les Spécialités",
    specialties: { couplesTherapy: "Thérapie de Couple", familyCounseling: "Conseil Familial", traumaRecovery: "Récupération de Trauma", communication: "Communication", preMarital: "Pré-Marital" },
    allFormats: "Tous les Formats",
    formats: { inPerson: "En Personne", remote: "À Distance", hybrid: "Hybride" },
    sessions: "séances",
    signUpToBook: "S'inscrire pour Réserver",
    viewProfile: "Voir le Profil",
    ctaTitle: "Prêt à Renforcer Votre Relation?",
    ctaSubtitle: "Faites le premier pas vers une relation plus forte et connectée avec des conseils professionnels",
    scheduleFreeConsultation: "Planifier une Consultation Gratuite"
  },
  it: {
    backToSupport: "Torna al Supporto",
    title: "Supporto per Coppie",
    subtitle: "Connettiti con professionisti autorizzati specializzati in terapia di coppia e consulenza relazionale",
    licensedProfessionals: "Professionisti Autorizzati",
    relationshipFocused: "Focalizzato sulle Relazioni",
    provenResults: "Risultati Comprovati",
    whyChooseTitle: "Perché Scegliere il Supporto Relazionale?",
    licensedProfsCard: { title: "Professionisti Autorizzati", description: "Tutti i terapeuti sono professionisti autorizzati e verificati" },
    relationshipFocusedCard: { title: "Focalizzato sulle Relazioni", description: "Formazione specializzata in terapia di coppia e consulenza relazionale" },
    provenResultsCard: { title: "Risultati Comprovati", description: "Approcci basati sull'evidenza con risultati positivi" },
    searchPlaceholder: "Cerca per nome o specialità",
    allSpecialties: "Tutte le Specialità",
    specialties: { couplesTherapy: "Terapia di Coppia", familyCounseling: "Consulenza Familiare", traumaRecovery: "Recupero da Trauma", communication: "Comunicazione", preMarital: "Pre-Matrimoniale" },
    allFormats: "Tutti i Formati",
    formats: { inPerson: "Di Persona", remote: "Remoto", hybrid: "Ibrido" },
    sessions: "sessioni",
    signUpToBook: "Registrati per Prenotare",
    viewProfile: "Visualizza Profilo",
    ctaTitle: "Pronto a Rafforzare la Tua Relazione?",
    ctaSubtitle: "Fai il primo passo verso una relazione più forte e connessa con una guida professionale",
    scheduleFreeConsultation: "Programma Consulenza Gratuita"
  },
  de: {
    backToSupport: "Zurück zur Unterstützung",
    title: "Paar-Unterstützung",
    subtitle: "Verbinden Sie sich mit lizenzierten Fachleuten, die auf Paartherapie und Beziehungsberatung spezialisiert sind",
    licensedProfessionals: "Lizenzierte Fachleute",
    relationshipFocused: "Beziehungsorientiert",
    provenResults: "Bewährte Ergebnisse",
    whyChooseTitle: "Warum Beziehungsunterstützung Wählen?",
    licensedProfsCard: { title: "Lizenzierte Fachleute", description: "Alle Therapeuten sind lizenzierte und verifizierte Fachleute" },
    relationshipFocusedCard: { title: "Beziehungsorientiert", description: "Spezialisierte Ausbildung in Paartherapie und Beziehungsberatung" },
    provenResultsCard: { title: "Bewährte Ergebnisse", description: "Evidenzbasierte Ansätze mit erfolgreichen Ergebnissen" },
    searchPlaceholder: "Suche nach Name oder Spezialität",
    allSpecialties: "Alle Spezialitäten",
    specialties: { couplesTherapy: "Paartherapie", familyCounseling: "Familienberatung", traumaRecovery: "Trauma-Erholung", communication: "Kommunikation", preMarital: "Vor der Ehe" },
    allFormats: "Alle Formate",
    formats: { inPerson: "Persönlich", remote: "Remote", hybrid: "Hybrid" },
    sessions: "Sitzungen",
    signUpToBook: "Anmelden zum Buchen",
    viewProfile: "Profil Anzeigen",
    ctaTitle: "Bereit, Ihre Beziehung zu Stärken?",
    ctaSubtitle: "Machen Sie den ersten Schritt zu einer stärkeren, verbundeneren Beziehung mit professioneller Anleitung",
    scheduleFreeConsultation: "Kostenlose Beratung Planen"
  },
  nl: {
    backToSupport: "Terug naar Ondersteuning",
    title: "Koppel Ondersteuning",
    subtitle: "Maak verbinding met erkende professionals gespecialiseerd in relatietherapie en begeleiding",
    licensedProfessionals: "Erkende Professionals",
    relationshipFocused: "Relatiegericht",
    provenResults: "Bewezen Resultaten",
    whyChooseTitle: "Waarom Relatie Ondersteuning Kiezen?",
    licensedProfsCard: { title: "Erkende Professionals", description: "Alle therapeuten zijn erkende en geverifieerde professionals" },
    relationshipFocusedCard: { title: "Relatiegericht", description: "Gespecialiseerde training in relatietherapie en begeleiding" },
    provenResultsCard: { title: "Bewezen Resultaten", description: "Bewezen benaderingen met succesvolle resultaten" },
    searchPlaceholder: "Zoek op naam of specialiteit",
    allSpecialties: "Alle Specialiteiten",
    specialties: { couplesTherapy: "Relatietherapie", familyCounseling: "Gezinsbegeleiding", traumaRecovery: "Trauma Herstel", communication: "Communicatie", preMarital: "Pre-Huwelijks" },
    allFormats: "Alle Formaten",
    formats: { inPerson: "Persoonlijk", remote: "Op Afstand", hybrid: "Hybride" },
    sessions: "sessies",
    signUpToBook: "Aanmelden om te Boeken",
    viewProfile: "Bekijk Profiel",
    ctaTitle: "Klaar om Je Relatie te Versterken?",
    ctaSubtitle: "Zet de eerste stap naar een sterkere, meer verbonden relatie met professionele begeleiding",
    scheduleFreeConsultation: "Plan Gratis Consultatie"
  },
  pt: {
    backToSupport: "Voltar ao Apoio",
    title: "Apoio para Casais",
    subtitle: "Conecte-se com profissionais licenciados especializados em terapia de casal e aconselhamento de relacionamento",
    licensedProfessionals: "Profissionais Licenciados",
    relationshipFocused: "Focado em Relacionamentos",
    provenResults: "Resultados Comprovados",
    whyChooseTitle: "Por Que Escolher Apoio ao Relacionamento?",
    licensedProfsCard: { title: "Profissionais Licenciados", description: "Todos os terapeutas são profissionais licenciados e verificados" },
    relationshipFocusedCard: { title: "Focado em Relacionamentos", description: "Treinamento especializado em terapia de casal e aconselhamento de relacionamento" },
    provenResultsCard: { title: "Resultados Comprovados", description: "Abordagens baseadas em evidências com resultados bem-sucedidos" },
    searchPlaceholder: "Pesquisar por nome ou especialidade",
    allSpecialties: "Todas as Especialidades",
    specialties: { couplesTherapy: "Terapia de Casal", familyCounseling: "Aconselhamento Familiar", traumaRecovery: "Recuperação de Trauma", communication: "Comunicação", preMarital: "Pré-Matrimonial" },
    allFormats: "Todos os Formatos",
    formats: { inPerson: "Presencial", remote: "Remoto", hybrid: "Híbrido" },
    sessions: "sessões",
    signUpToBook: "Inscreva-se para Reservar",
    viewProfile: "Ver Perfil",
    ctaTitle: "Pronto para Fortalecer Seu Relacionamento?",
    ctaSubtitle: "Dê o primeiro passo em direção a um relacionamento mais forte e conectado com orientação profissional",
    scheduleFreeConsultation: "Agendar Consulta Gratuita"
  }
};

export default function CounselingSupport() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.en;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");

  const counselors = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      title: "Marriage & Family Therapist",
      specialty: "Couples Therapy",
      rating: 4.9,
      sessions: 500,
      location: "San Francisco, CA",
      languages: ["English", "Spanish"],
      price: "US$175/session",
      description: "Specializes in evidence-based approaches to help couples navigate relationship challenges and rebuild connection.",
      expertise: ["Couples Therapy", "Family Counseling", "Intimacy"]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      title: "Clinical Psychologist",
      specialty: "Relationship-Focused",
      rating: 5.0,
      sessions: 850,
      location: "New York, NY",
      languages: ["English", "Mandarin"],
      price: "US$150/session",
      description: "Helping couples work through fundamental life family differences, integrating EFT and relationship counseling.",
      expertise: ["Attachment Theory", "Trauma Recovery", "Communication"]
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "Licensed Therapist",
      specialty: "Gottman Method",
      rating: 4.8,
      sessions: 320,
      location: "San Diego, CA (Remote)",
      languages: ["English", "Spanish"],
      price: "US$125/session",
      description: "Compassionate approach to helping relationships and emotional heal after years of loneliness.",
      expertise: ["Gottman Method", "Conflict Resolution", "Trust Building"]
    },
    {
      id: 4,
      name: "Dr. James Thompson",
      title: "Marriage Counselor",
      specialty: "Pre-Marital Counseling",
      rating: 4.9,
      sessions: 600,
      location: "Austin, TX",
      languages: ["English"],
      price: "US$115/session",
      description: "Focuses on helping couples develop healthy communication patterns and strong foundations.",
      expertise: ["Pre-Marital", "Communication", "Family Therapy"]
    },
    {
      id: 5,
      name: "Dr. Lisa Yang",
      title: "Clinical Social Worker",
      specialty: "Trauma-Informed Care",
      rating: 5.0,
      sessions: 420,
      location: "Los Angeles, CA",
      languages: ["English", "Korean"],
      price: "US$160/session",
      description: "Integrative approach combining EFT-based and trauma-focused therapeutic techniques with couples therapy.",
      expertise: ["Trauma Recovery", "Emotionally Focused Therapy", "LGBTQ+"]
    },
    {
      id: 6,
      name: "Dr. Robert Williams",
      title: "Licensed Psychologist",
      specialty: "Imago Relationship",
      rating: 4.7,
      sessions: 380,
      location: "Miami, FL (Remote)",
      languages: ["English", "French"],
      price: "US$135/session",
      description: "Extensive experience helping couples navigate complex relationship dynamics and deepen emotional connection.",
      expertise: ["Imago Therapy", "Intimacy", "Life Transitions"]
    }
  ];

  const filteredCounselors = counselors.filter(counselor => {
    const matchesSearch = searchQuery === "" || 
      counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      counselor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "all" || counselor.expertise.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Link to={createPageUrl("CoupleSupport")} className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t.backToSupport}
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-white/90 mb-6">
            {t.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
              {t.licensedProfessionals}
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
              {t.relationshipFocused}
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
              {t.provenResults}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Why Choose Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {t.whyChooseTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{t.licensedProfsCard.title}</h3>
                <p className="text-sm text-gray-600">{t.licensedProfsCard.description}</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{t.relationshipFocusedCard.title}</h3>
                <p className="text-sm text-gray-600">{t.relationshipFocusedCard.description}</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Star className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{t.provenResultsCard.title}</h3>
                <p className="text-sm text-gray-600">{t.provenResultsCard.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Input
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12"
          />
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder={t.allSpecialties} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allSpecialties}</SelectItem>
              <SelectItem value="Couples Therapy">{t.specialties.couplesTherapy}</SelectItem>
              <SelectItem value="Family Counseling">{t.specialties.familyCounseling}</SelectItem>
              <SelectItem value="Trauma Recovery">{t.specialties.traumaRecovery}</SelectItem>
              <SelectItem value="Communication">{t.specialties.communication}</SelectItem>
              <SelectItem value="Pre-Marital">{t.specialties.preMarital}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedFormat} onValueChange={setSelectedFormat}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder={t.allFormats} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allFormats}</SelectItem>
              <SelectItem value="in-person">{t.formats.inPerson}</SelectItem>
              <SelectItem value="remote">{t.formats.remote}</SelectItem>
              <SelectItem value="hybrid">{t.formats.hybrid}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Counselors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCounselors.map((counselor, index) => (
            <motion.div
              key={counselor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {counselor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{counselor.name}</h3>
                      <p className="text-sm text-gray-600">{counselor.title}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold">{counselor.rating}</span>
                        <span className="text-xs text-gray-500">({counselor.sessions}+ {t.sessions})</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-4">{counselor.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {counselor.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4" />
                      {counselor.languages.join(', ')}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      <DollarSign className="w-4 h-4" />
                      {counselor.price}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {counselor.expertise.map((exp, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        {exp}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      {t.signUpToBook}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      {t.viewProfile}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
          <Heart className="w-12 h-12 mx-auto mb-4 fill-current" />
          <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-lg mb-6 opacity-90">
            {t.ctaSubtitle}
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            {t.scheduleFreeConsultation}
          </Button>
        </div>
      </div>
    </div>
  );
}