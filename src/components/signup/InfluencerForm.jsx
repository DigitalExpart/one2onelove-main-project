import React, { useState } from "react";
import { ArrowLeft, Mail, Lock, User, TrendingUp, Instagram, Youtube, Twitter, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from "@/Layout";

const translations = {
  en: {
    title: "Apply as an Influencer",
    subtitle: "Partner with us to inspire and support couples worldwide",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    email: "Email Address",
    emailPlaceholder: "Enter your email",
    password: "Password",
    passwordPlaceholder: "Create a secure password",
    instagram: "Instagram Handle",
    instagramPlaceholder: "@yourusername",
    youtube: "YouTube Channel",
    youtubePlaceholder: "Channel name or URL",
    tiktok: "TikTok Handle",
    tiktokPlaceholder: "@yourusername",
    otherPlatforms: "Other Platforms",
    otherPlatformsPlaceholder: "Twitter, Facebook, etc.",
    totalFollowers: "Total Followers/Subscribers",
    followersPlaceholder: "Approximate total across all platforms",
    engagementRate: "Average Engagement Rate (%)",
    engagementPlaceholder: "e.g., 3.5",
    niche: "Content Niche",
    nichePlaceholder: "e.g., Relationships, Lifestyle, Wellness",
    bio: "About You",
    bioPlaceholder: "Tell us about your content and audience (min 100 characters)",
    whyPartner: "Why Partner With Us?",
    whyPartnerPlaceholder: "What interests you about working with One 2 One Love?",
    agreeToTerms: "I agree to the Influencer Partnership Terms",
    submitApplication: "Submit Application",
    submitting: "Submitting...",
    back: "Back"
  },
  es: {
    title: "Aplicar como Influencer",
    subtitle: "Asóciate con nosotros para inspirar y apoyar a parejas en todo el mundo",
    fullName: "Nombre Completo",
    fullNamePlaceholder: "Ingresa tu nombre completo",
    email: "Correo Electrónico",
    emailPlaceholder: "Ingresa tu correo",
    password: "Contraseña",
    passwordPlaceholder: "Crea una contraseña segura",
    instagram: "Usuario de Instagram",
    instagramPlaceholder: "@tuusuario",
    youtube: "Canal de YouTube",
    youtubePlaceholder: "Nombre del canal o URL",
    tiktok: "Usuario de TikTok",
    tiktokPlaceholder: "@tuusuario",
    otherPlatforms: "Otras Plataformas",
    otherPlatformsPlaceholder: "Twitter, Facebook, etc.",
    totalFollowers: "Total de Seguidores/Suscriptores",
    followersPlaceholder: "Total aproximado en todas las plataformas",
    engagementRate: "Tasa de Participación Promedio (%)",
    engagementPlaceholder: "ej., 3.5",
    niche: "Nicho de Contenido",
    nichePlaceholder: "ej., Relaciones, Estilo de vida, Bienestar",
    bio: "Sobre Ti",
    bioPlaceholder: "Cuéntanos sobre tu contenido y audiencia (mín 100 caracteres)",
    whyPartner: "¿Por Qué Asociarte Con Nosotros?",
    whyPartnerPlaceholder: "¿Qué te interesa de trabajar con One 2 One Love?",
    agreeToTerms: "Acepto los Términos de Asociación para Influencers",
    submitApplication: "Enviar Solicitud",
    submitting: "Enviando...",
    back: "Volver"
  },
  fr: {
    title: "Postuler en tant qu'Influenceur",
    subtitle: "Associez-vous à nous pour inspirer et soutenir les couples du monde entier",
    fullName: "Nom Complet",
    fullNamePlaceholder: "Entrez votre nom complet",
    email: "Adresse E-mail",
    emailPlaceholder: "Entrez votre e-mail",
    password: "Mot de Passe",
    passwordPlaceholder: "Créez un mot de passe sécurisé",
    instagram: "Pseudo Instagram",
    instagramPlaceholder: "@votrenom",
    youtube: "Chaîne YouTube",
    youtubePlaceholder: "Nom de la chaîne ou URL",
    tiktok: "Pseudo TikTok",
    tiktokPlaceholder: "@votrenom",
    otherPlatforms: "Autres Plateformes",
    otherPlatformsPlaceholder: "Twitter, Facebook, etc.",
    totalFollowers: "Total Abonnés/Followers",
    followersPlaceholder: "Total approximatif sur toutes les plateformes",
    engagementRate: "Taux d'Engagement Moyen (%)",
    engagementPlaceholder: "p.ex., 3.5",
    niche: "Niche de Contenu",
    nichePlaceholder: "p.ex., Relations, Lifestyle, Bien-être",
    bio: "À Propos de Vous",
    bioPlaceholder: "Parlez-nous de votre contenu et audience (min 100 caractères)",
    whyPartner: "Pourquoi Devenir Partenaire?",
    whyPartnerPlaceholder: "Qu'est-ce qui vous intéresse dans le travail avec One 2 One Love?",
    agreeToTerms: "J'accepte les Conditions de Partenariat Influenceur",
    submitApplication: "Soumettre la Candidature",
    submitting: "Envoi en cours...",
    back: "Retour"
  },
  it: {
    title: "Candidati come Influencer",
    subtitle: "Collabora con noi per ispirare e sostenere coppie in tutto il mondo",
    fullName: "Nome Completo",
    fullNamePlaceholder: "Inserisci il tuo nome completo",
    email: "Indirizzo Email",
    emailPlaceholder: "Inserisci la tua email",
    password: "Password",
    passwordPlaceholder: "Crea una password sicura",
    instagram: "Nome Utente Instagram",
    instagramPlaceholder: "@tuonome",
    youtube: "Canale YouTube",
    youtubePlaceholder: "Nome del canale o URL",
    tiktok: "Nome Utente TikTok",
    tiktokPlaceholder: "@tuonome",
    otherPlatforms: "Altre Piattaforme",
    otherPlatformsPlaceholder: "Twitter, Facebook, ecc.",
    totalFollowers: "Totale Follower/Iscritti",
    followersPlaceholder: "Totale approssimativo su tutte le piattaforme",
    engagementRate: "Tasso di Coinvolgimento Medio (%)",
    engagementPlaceholder: "es., 3.5",
    niche: "Nicchia di Contenuto",
    nichePlaceholder: "es., Relazioni, Lifestyle, Benessere",
    bio: "Su di Te",
    bioPlaceholder: "Raccontaci del tuo contenuto e pubblico (min 100 caratteri)",
    whyPartner: "Perché Collaborare con Noi?",
    whyPartnerPlaceholder: "Cosa ti interessa di lavorare con One 2 One Love?",
    agreeToTerms: "Accetto i Termini di Partnership per Influencer",
    submitApplication: "Invia Candidatura",
    submitting: "Invio in corso...",
    back: "Indietro"
  },
  de: {
    title: "Als Influencer Bewerben",
    subtitle: "Werden Sie unser Partner, um Paare weltweit zu inspirieren und zu unterstützen",
    fullName: "Vollständiger Name",
    fullNamePlaceholder: "Geben Sie Ihren vollständigen Namen ein",
    email: "E-Mail-Adresse",
    emailPlaceholder: "Geben Sie Ihre E-Mail ein",
    password: "Passwort",
    passwordPlaceholder: "Erstellen Sie ein sicheres Passwort",
    instagram: "Instagram-Handle",
    instagramPlaceholder: "@ihrname",
    youtube: "YouTube-Kanal",
    youtubePlaceholder: "Kanalname oder URL",
    tiktok: "TikTok-Handle",
    tiktokPlaceholder: "@ihrname",
    otherPlatforms: "Andere Plattformen",
    otherPlatformsPlaceholder: "Twitter, Facebook, usw.",
    totalFollowers: "Gesamtanzahl Follower/Abonnenten",
    followersPlaceholder: "Ungefähre Gesamtzahl über alle Plattformen",
    engagementRate: "Durchschnittliche Engagement-Rate (%)",
    engagementPlaceholder: "z.B., 3.5",
    niche: "Content-Nische",
    nichePlaceholder: "z.B., Beziehungen, Lifestyle, Wellness",
    bio: "Über Sie",
    bioPlaceholder: "Erzählen Sie uns über Ihren Content und Ihre Zielgruppe (mind. 100 Zeichen)",
    whyPartner: "Warum mit Uns Partnern?",
    whyPartnerPlaceholder: "Was interessiert Sie an der Zusammenarbeit mit One 2 One Love?",
    agreeToTerms: "Ich stimme den Influencer-Partnership-Bedingungen zu",
    submitApplication: "Bewerbung Einreichen",
    submitting: "Wird Gesendet...",
    back: "Zurück"
  },
  nl: {
    title: "Solliciteren als Influencer",
    subtitle: "Ga een partnerschap aan om koppels wereldwijd te inspireren en ondersteunen",
    fullName: "Volledige Naam",
    fullNamePlaceholder: "Voer je volledige naam in",
    email: "E-mailadres",
    emailPlaceholder: "Voer je e-mail in",
    password: "Wachtwoord",
    passwordPlaceholder: "Maak een veilig wachtwoord",
    instagram: "Instagram Gebruikersnaam",
    instagramPlaceholder: "@jouwgebruikersnaam",
    youtube: "YouTube Kanaal",
    youtubePlaceholder: "Kanaalnaam of URL",
    tiktok: "TikTok Gebruikersnaam",
    tiktokPlaceholder: "@jouwgebruikersnaam",
    otherPlatforms: "Andere Platforms",
    otherPlatformsPlaceholder: "Twitter, Facebook, etc.",
    totalFollowers: "Totaal Volgers/Abonnees",
    followersPlaceholder: "Geschat totaal op alle platforms",
    engagementRate: "Gemiddeld Betrokkenheidspercentage (%)",
    engagementPlaceholder: "bijv., 3.5",
    niche: "Content Niche",
    nichePlaceholder: "bijv., Relaties, Lifestyle, Wellness",
    bio: "Over Jou",
    bioPlaceholder: "Vertel ons over je content en publiek (min 100 karakters)",
    whyPartner: "Waarom Met Ons Samenwerken?",
    whyPartnerPlaceholder: "Wat interesseert je aan werken met One 2 One Love?",
    agreeToTerms: "Ik ga akkoord met de Influencer Partnership Voorwaarden",
    submitApplication: "Sollicitatie Indienen",
    submitting: "Indienen...",
    back: "Terug"
  },
  pt: {
    title: "Candidatar-se como Influenciador",
    subtitle: "Faça parceria conosco para inspirar e apoiar casais em todo o mundo",
    fullName: "Nome Completo",
    fullNamePlaceholder: "Digite seu nome completo",
    email: "Endereço de E-mail",
    emailPlaceholder: "Digite seu e-mail",
    password: "Senha",
    passwordPlaceholder: "Crie uma senha segura",
    instagram: "Usuário do Instagram",
    instagramPlaceholder: "@seunome",
    youtube: "Canal do YouTube",
    youtubePlaceholder: "Nome do canal ou URL",
    tiktok: "Usuário do TikTok",
    tiktokPlaceholder: "@seunome",
    otherPlatforms: "Outras Plataformas",
    otherPlatformsPlaceholder: "Twitter, Facebook, etc.",
    totalFollowers: "Total de Seguidores/Inscritos",
    followersPlaceholder: "Total aproximado em todas as plataformas",
    engagementRate: "Taxa Média de Engajamento (%)",
    engagementPlaceholder: "ex., 3.5",
    niche: "Nicho de Conteúdo",
    nichePlaceholder: "ex., Relacionamentos, Estilo de Vida, Bem-estar",
    bio: "Sobre Você",
    bioPlaceholder: "Conte-nos sobre seu conteúdo e público (mín 100 caracteres)",
    whyPartner: "Por Que Fazer Parceria?",
    whyPartnerPlaceholder: "O que te interessa em trabalhar com One 2 One Love?",
    agreeToTerms: "Concordo com os Termos de Parceria para Influenciadores",
    submitApplication: "Enviar Candidatura",
    submitting: "Enviando...",
    back: "Voltar"
  }
};

export default function InfluencerForm({ onBack }) {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.en;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    instagram: "",
    youtube: "",
    tiktok: "",
    otherPlatforms: "",
    totalFollowers: "",
    engagementRate: "",
    niche: "",
    bio: "",
    whyPartner: "",
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the partnership terms");
      return;
    }

    if (formData.bio.length < 100) {
      toast.error("Bio must be at least 100 characters");
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Application submitted! Our partnerships team will review and contact you soon.");
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
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.instagram}
              </label>
              <div className="relative">
                <Instagram size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                  placeholder={t.instagramPlaceholder}
                  className="pl-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.youtube}
              </label>
              <div className="relative">
                <Youtube size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  value={formData.youtube}
                  onChange={(e) => setFormData({...formData, youtube: e.target.value})}
                  placeholder={t.youtubePlaceholder}
                  className="pl-12"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.tiktok}
              </label>
              <Input
                type="text"
                value={formData.tiktok}
                onChange={(e) => setFormData({...formData, tiktok: e.target.value})}
                placeholder={t.tiktokPlaceholder}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.otherPlatforms}
              </label>
              <Input
                type="text"
                value={formData.otherPlatforms}
                onChange={(e) => setFormData({...formData, otherPlatforms: e.target.value})}
                placeholder={t.otherPlatformsPlaceholder}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.totalFollowers} *
              </label>
              <Input
                type="number"
                min="0"
                value={formData.totalFollowers}
                onChange={(e) => setFormData({...formData, totalFollowers: e.target.value})}
                placeholder={t.followersPlaceholder}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.engagementRate}
              </label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.engagementRate}
                onChange={(e) => setFormData({...formData, engagementRate: e.target.value})}
                placeholder={t.engagementPlaceholder}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.niche} *
            </label>
            <Input
              type="text"
              value={formData.niche}
              onChange={(e) => setFormData({...formData, niche: e.target.value})}
              placeholder={t.nichePlaceholder}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.bio} *
            </label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder={t.bioPlaceholder}
              className="min-h-32"
              required
              minLength={100}
            />
            <p className="text-sm text-gray-500 mt-1">{formData.bio.length}/100 characters minimum</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.whyPartner}
            </label>
            <Textarea
              value={formData.whyPartner}
              onChange={(e) => setFormData({...formData, whyPartner: e.target.value})}
              placeholder={t.whyPartnerPlaceholder}
              className="min-h-24"
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
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold text-lg py-6"
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