import React, { useState } from "react";
import { ArrowLeft, Mail, Lock, User, Mic, Link as LinkIcon, FileText, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useLanguage } from "@/Layout";

const translations = {
  en: {
    title: "Apply as Content Creator",
    subtitle: "Share your expertise through podcasts, articles, or relationship coaching",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    email: "Email Address",
    emailPlaceholder: "Enter your email",
    password: "Password",
    passwordPlaceholder: "Create a secure password",
    contentType: "Content Type",
    contentTypes: { podcast: "Podcast Host", writer: "Article Writer", coach: "Relationship Coach", multiple: "Multiple Formats" },
    portfolioUrl: "Portfolio/Website URL",
    portfolioPlaceholder: "https://yourwebsite.com",
    bio: "Professional Bio",
    bioPlaceholder: "Tell us about your experience and content (min 100 characters)",
    sampleWork: "Sample Work or Links",
    sampleWorkPlaceholder: "Links to your podcasts, articles, or coaching materials",
    topicExpertise: "Topic Expertise",
    topicPlaceholder: "e.g., Communication, Intimacy, Conflict Resolution",
    agreeToTerms: "I agree to the Content Creator Terms and Guidelines",
    submitApplication: "Submit Application",
    submitting: "Submitting...",
    back: "Back"
  },
  es: {
    title: "Aplicar como Creador de Contenido",
    subtitle: "Comparte tu experiencia a través de podcasts, artículos o coaching de relaciones",
    fullName: "Nombre Completo",
    fullNamePlaceholder: "Ingresa tu nombre completo",
    email: "Correo Electrónico",
    emailPlaceholder: "Ingresa tu correo",
    password: "Contraseña",
    passwordPlaceholder: "Crea una contraseña segura",
    contentType: "Tipo de Contenido",
    contentTypes: { podcast: "Presentador de Podcast", writer: "Escritor de Artículos", coach: "Coach de Relaciones", multiple: "Múltiples Formatos" },
    portfolioUrl: "URL de Portafolio/Sitio Web",
    portfolioPlaceholder: "https://tusitio.com",
    bio: "Biografía Profesional",
    bioPlaceholder: "Cuéntanos sobre tu experiencia y contenido (mín 100 caracteres)",
    sampleWork: "Trabajo de Muestra o Enlaces",
    sampleWorkPlaceholder: "Enlaces a tus podcasts, artículos o materiales de coaching",
    topicExpertise: "Experiencia en Temas",
    topicPlaceholder: "ej., Comunicación, Intimidad, Resolución de Conflictos",
    agreeToTerms: "Acepto los Términos y Directrices para Creadores de Contenido",
    submitApplication: "Enviar Solicitud",
    submitting: "Enviando...",
    back: "Volver"
  },
  fr: {
    title: "Postuler en tant que Créateur de Contenu",
    subtitle: "Partagez votre expertise via podcasts, articles ou coaching relationnel",
    fullName: "Nom Complet",
    fullNamePlaceholder: "Entrez votre nom complet",
    email: "Adresse E-mail",
    emailPlaceholder: "Entrez votre e-mail",
    password: "Mot de Passe",
    passwordPlaceholder: "Créez un mot de passe sécurisé",
    contentType: "Type de Contenu",
    contentTypes: { podcast: "Animateur de Podcast", writer: "Rédacteur d'Articles", coach: "Coach Relationnel", multiple: "Formats Multiples" },
    portfolioUrl: "URL du Portfolio/Site Web",
    portfolioPlaceholder: "https://votresite.com",
    bio: "Biographie Professionnelle",
    bioPlaceholder: "Parlez-nous de votre expérience et contenu (min 100 caractères)",
    sampleWork: "Travaux d'Exemple ou Liens",
    sampleWorkPlaceholder: "Liens vers vos podcasts, articles ou matériaux de coaching",
    topicExpertise: "Expertise Thématique",
    topicPlaceholder: "p.ex., Communication, Intimité, Résolution de Conflits",
    agreeToTerms: "J'accepte les Conditions et Directives pour Créateurs de Contenu",
    submitApplication: "Soumettre la Candidature",
    submitting: "Envoi en cours...",
    back: "Retour"
  },
  it: {
    title: "Candidati come Creatore di Contenuti",
    subtitle: "Condividi la tua esperienza tramite podcast, articoli o coaching relazionale",
    fullName: "Nome Completo",
    fullNamePlaceholder: "Inserisci il tuo nome completo",
    email: "Indirizzo Email",
    emailPlaceholder: "Inserisci la tua email",
    password: "Password",
    passwordPlaceholder: "Crea una password sicura",
    contentType: "Tipo di Contenuto",
    contentTypes: { podcast: "Conduttore di Podcast", writer: "Scrittore di Articoli", coach: "Coach Relazionale", multiple: "Formati Multipli" },
    portfolioUrl: "URL Portfolio/Sito Web",
    portfolioPlaceholder: "https://tuosito.com",
    bio: "Biografia Professionale",
    bioPlaceholder: "Raccontaci della tua esperienza e contenuto (min 100 caratteri)",
    sampleWork: "Lavori Campione o Link",
    sampleWorkPlaceholder: "Link ai tuoi podcast, articoli o materiali di coaching",
    topicExpertise: "Competenza Tematica",
    topicPlaceholder: "es., Comunicazione, Intimità, Risoluzione Conflitti",
    agreeToTerms: "Accetto i Termini e le Linee Guida per Creatori di Contenuti",
    submitApplication: "Invia Candidatura",
    submitting: "Invio in corso...",
    back: "Indietro"
  },
  de: {
    title: "Als Content-Ersteller Bewerben",
    subtitle: "Teilen Sie Ihr Fachwissen durch Podcasts, Artikel oder Beziehungscoaching",
    fullName: "Vollständiger Name",
    fullNamePlaceholder: "Geben Sie Ihren vollständigen Namen ein",
    email: "E-Mail-Adresse",
    emailPlaceholder: "Geben Sie Ihre E-Mail ein",
    password: "Passwort",
    passwordPlaceholder: "Erstellen Sie ein sicheres Passwort",
    contentType: "Content-Typ",
    contentTypes: { podcast: "Podcast-Moderator", writer: "Artikel-Autor", coach: "Beziehungs-Coach", multiple: "Mehrere Formate" },
    portfolioUrl: "Portfolio/Website-URL",
    portfolioPlaceholder: "https://ihrewebsite.com",
    bio: "Berufliche Biografie",
    bioPlaceholder: "Erzählen Sie uns von Ihrer Erfahrung und Inhalten (mind. 100 Zeichen)",
    sampleWork: "Beispielarbeiten oder Links",
    sampleWorkPlaceholder: "Links zu Ihren Podcasts, Artikeln oder Coaching-Materialien",
    topicExpertise: "Themen-Expertise",
    topicPlaceholder: "z.B., Kommunikation, Intimität, Konfliktlösung",
    agreeToTerms: "Ich stimme den Bedingungen und Richtlinien für Content-Ersteller zu",
    submitApplication: "Bewerbung Einreichen",
    submitting: "Wird Gesendet...",
    back: "Zurück"
  },
  nl: {
    title: "Solliciteren als Content Maker",
    subtitle: "Deel je expertise via podcasts, artikelen of relatie-coaching",
    fullName: "Volledige Naam",
    fullNamePlaceholder: "Voer je volledige naam in",
    email: "E-mailadres",
    emailPlaceholder: "Voer je e-mail in",
    password: "Wachtwoord",
    passwordPlaceholder: "Maak een veilig wachtwoord",
    contentType: "Content Type",
    contentTypes: { podcast: "Podcast-host", writer: "Artikelschrijver", coach: "Relatie-coach", multiple: "Meerdere Formaten" },
    portfolioUrl: "Portfolio/Website URL",
    portfolioPlaceholder: "https://jouwebsite.com",
    bio: "Professionele Bio",
    bioPlaceholder: "Vertel ons over je ervaring en content (min 100 karakters)",
    sampleWork: "Voorbeeldwerk of Links",
    sampleWorkPlaceholder: "Links naar je podcasts, artikelen of coaching-materialen",
    topicExpertise: "Onderwerp Expertise",
    topicPlaceholder: "bijv., Communicatie, Intimiteit, Conflictoplossing",
    agreeToTerms: "Ik ga akkoord met de Voorwaarden en Richtlijnen voor Content Makers",
    submitApplication: "Sollicitatie Indienen",
    submitting: "Indienen...",
    back: "Terug"
  },
  pt: {
    title: "Candidatar-se como Criador de Conteúdo",
    subtitle: "Compartilhe sua experiência através de podcasts, artigos ou coaching de relacionamento",
    fullName: "Nome Completo",
    fullNamePlaceholder: "Digite seu nome completo",
    email: "Endereço de E-mail",
    emailPlaceholder: "Digite seu e-mail",
    password: "Senha",
    passwordPlaceholder: "Crie uma senha segura",
    contentType: "Tipo de Conteúdo",
    contentTypes: { podcast: "Apresentador de Podcast", writer: "Escritor de Artigos", coach: "Coach de Relacionamento", multiple: "Múltiplos Formatos" },
    portfolioUrl: "URL do Portfólio/Site",
    portfolioPlaceholder: "https://seusite.com",
    bio: "Biografia Profissional",
    bioPlaceholder: "Conte-nos sobre sua experiência e conteúdo (mín 100 caracteres)",
    sampleWork: "Trabalho de Amostra ou Links",
    sampleWorkPlaceholder: "Links para seus podcasts, artigos ou materiais de coaching",
    topicExpertise: "Expertise em Tópicos",
    topicPlaceholder: "ex., Comunicação, Intimidade, Resolução de Conflitos",
    agreeToTerms: "Concordo com os Termos e Diretrizes para Criadores de Conteúdo",
    submitApplication: "Enviar Candidatura",
    submitting: "Enviando...",
    back: "Voltar"
  }
};

export default function ContentCreatorForm({ onBack }) {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.en;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    contentType: "",
    portfolioUrl: "",
    bio: "",
    sampleWork: "",
    topicExpertise: "",
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and guidelines");
      return;
    }

    if (formData.bio.length < 100) {
      toast.error("Bio must be at least 100 characters");
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Application submitted! We'll review and contact you within 48 hours.");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-2xl">
      <CardHeader>
        <button
          onClick={onBack}
          className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          {t.back}
        </button>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-3xl">{t.title}</CardTitle>
        </div>
        <p className="text-gray-600">{t.subtitle}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.fullName} *
            </label>
            <div className="relative">
              <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder={t.fullNamePlaceholder}
                className="pl-12"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.email} *
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder={t.emailPlaceholder}
                className="pl-12"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.password} *
            </label>
            <div className="relative">
              <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder={t.passwordPlaceholder}
                className="pl-12 pr-12"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.contentType} *
            </label>
            <Select value={formData.contentType} onValueChange={(value) => setFormData({...formData, contentType: value})} required>
              <SelectTrigger>
                <SelectValue placeholder={t.contentType} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="podcast">{t.contentTypes.podcast}</SelectItem>
                <SelectItem value="writer">{t.contentTypes.writer}</SelectItem>
                <SelectItem value="coach">{t.contentTypes.coach}</SelectItem>
                <SelectItem value="multiple">{t.contentTypes.multiple}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.portfolioUrl}
            </label>
            <div className="relative">
              <LinkIcon size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({...formData, portfolioUrl: e.target.value})}
                placeholder={t.portfolioPlaceholder}
                className="pl-12"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.bio} *
            </label>
            <div className="relative">
              <FileText size={20} className="absolute left-4 top-4 text-gray-400" />
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder={t.bioPlaceholder}
                className="pl-12 min-h-32"
                required
                minLength={100}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">{formData.bio.length}/100 characters minimum</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.sampleWork}
            </label>
            <Textarea
              value={formData.sampleWork}
              onChange={(e) => setFormData({...formData, sampleWork: e.target.value})}
              placeholder={t.sampleWorkPlaceholder}
              className="min-h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.topicExpertise} *
            </label>
            <Input
              type="text"
              value={formData.topicExpertise}
              onChange={(e) => setFormData({...formData, topicExpertise: e.target.value})}
              placeholder={t.topicPlaceholder}
              required
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreeToTerms}
              onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
              className="mt-1"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              {t.agreeToTerms}
            </label>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold text-lg py-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {t.submitting}
              </>
            ) : (
              t.submitApplication
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}