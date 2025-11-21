import React, { useState } from "react";
import { ArrowLeft, Mail, Lock, User, Stethoscope, Award, FileText, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useLanguage } from "@/Layout";

const translations = {
  en: {
    title: "Apply as a Therapist",
    subtitle: "Join our network of licensed professionals helping couples worldwide",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    email: "Email Address",
    emailPlaceholder: "Enter your professional email",
    password: "Password",
    passwordPlaceholder: "Create a secure password",
    licenseNumber: "License Number",
    licenseNumberPlaceholder: "Your professional license number",
    specialty: "Primary Specialty",
    specialties: { couples: "Couples Therapy", marriage: "Marriage Counseling", family: "Family Therapy", trauma: "Trauma-Informed Care", premarital: "Pre-Marital Counseling" },
    yearsExperience: "Years of Experience",
    bio: "Professional Bio",
    bioPlaceholder: "Tell us about your experience and approach (min 100 characters)",
    certification: "Certifications",
    certificationPlaceholder: "List your certifications (comma separated)",
    agreeToTerms: "I agree to the Professional Terms of Service and Code of Ethics",
    submitApplication: "Submit Application",
    submitting: "Submitting...",
    back: "Back"
  },
  es: {
    title: "Aplicar como Terapeuta",
    subtitle: "Únete a nuestra red de profesionales licenciados ayudando a parejas en todo el mundo",
    fullName: "Nombre Completo",
    fullNamePlaceholder: "Ingresa tu nombre completo",
    email: "Correo Electrónico",
    emailPlaceholder: "Ingresa tu correo profesional",
    password: "Contraseña",
    passwordPlaceholder: "Crea una contraseña segura",
    licenseNumber: "Número de Licencia",
    licenseNumberPlaceholder: "Tu número de licencia profesional",
    specialty: "Especialidad Principal",
    specialties: { couples: "Terapia de Pareja", marriage: "Asesoramiento Matrimonial", family: "Terapia Familiar", trauma: "Atención Informada en Trauma", premarital: "Asesoramiento Prematrimonial" },
    yearsExperience: "Años de Experiencia",
    bio: "Biografía Profesional",
    bioPlaceholder: "Cuéntanos sobre tu experiencia y enfoque (mín 100 caracteres)",
    certification: "Certificaciones",
    certificationPlaceholder: "Lista tus certificaciones (separadas por comas)",
    agreeToTerms: "Acepto los Términos Profesionales de Servicio y Código de Ética",
    submitApplication: "Enviar Solicitud",
    submitting: "Enviando...",
    back: "Volver"
  },
  fr: {
    title: "Postuler en tant que Thérapeute",
    subtitle: "Rejoignez notre réseau de professionnels agréés aidant les couples du monde entier",
    fullName: "Nom Complet",
    fullNamePlaceholder: "Entrez votre nom complet",
    email: "Adresse E-mail",
    emailPlaceholder: "Entrez votre e-mail professionnel",
    password: "Mot de Passe",
    passwordPlaceholder: "Créez un mot de passe sécurisé",
    licenseNumber: "Numéro de Licence",
    licenseNumberPlaceholder: "Votre numéro de licence professionnelle",
    specialty: "Spécialité Principale",
    specialties: { couples: "Thérapie de Couple", marriage: "Conseil Matrimonial", family: "Thérapie Familiale", trauma: "Soins Informés sur les Traumatismes", premarital: "Conseil Pré-Marital" },
    yearsExperience: "Années d'Expérience",
    bio: "Biographie Professionnelle",
    bioPlaceholder: "Parlez-nous de votre expérience et approche (min 100 caractères)",
    certification: "Certifications",
    certificationPlaceholder: "Listez vos certifications (séparées par des virgules)",
    agreeToTerms: "J'accepte les Conditions Professionnelles de Service et le Code d'Éthique",
    submitApplication: "Soumettre la Candidature",
    submitting: "Envoi en cours...",
    back: "Retour"
  },
  it: {
    title: "Candidati come Terapeuta",
    subtitle: "Unisciti alla nostra rete di professionisti autorizzati che aiutano coppie in tutto il mondo",
    fullName: "Nome Completo",
    fullNamePlaceholder: "Inserisci il tuo nome completo",
    email: "Indirizzo Email",
    emailPlaceholder: "Inserisci la tua email professionale",
    password: "Password",
    passwordPlaceholder: "Crea una password sicura",
    licenseNumber: "Numero di Licenza",
    licenseNumberPlaceholder: "Il tuo numero di licenza professionale",
    specialty: "Specialità Principale",
    specialties: { couples: "Terapia di Coppia", marriage: "Consulenza Matrimoniale", family: "Terapia Familiare", trauma: "Cura Informata sul Trauma", premarital: "Consulenza Pre-Matrimoniale" },
    yearsExperience: "Anni di Esperienza",
    bio: "Biografia Professionale",
    bioPlaceholder: "Raccontaci della tua esperienza e approccio (min 100 caratteri)",
    certification: "Certificazioni",
    certificationPlaceholder: "Elenca le tue certificazioni (separate da virgole)",
    agreeToTerms: "Accetto i Termini Professionali di Servizio e il Codice Etico",
    submitApplication: "Invia Candidatura",
    submitting: "Invio in corso...",
    back: "Indietro"
  },
  de: {
    title: "Als Therapeut Bewerben",
    subtitle: "Treten Sie unserem Netzwerk lizenzierter Fachleute bei, die Paaren weltweit helfen",
    fullName: "Vollständiger Name",
    fullNamePlaceholder: "Geben Sie Ihren vollständigen Namen ein",
    email: "E-Mail-Adresse",
    emailPlaceholder: "Geben Sie Ihre berufliche E-Mail ein",
    password: "Passwort",
    passwordPlaceholder: "Erstellen Sie ein sicheres Passwort",
    licenseNumber: "Lizenznummer",
    licenseNumberPlaceholder: "Ihre professionelle Lizenznummer",
    specialty: "Hauptspezialität",
    specialties: { couples: "Paartherapie", marriage: "Eheberatung", family: "Familientherapie", trauma: "Traumainformierte Pflege", premarital: "Voreheliche Beratung" },
    yearsExperience: "Jahre Erfahrung",
    bio: "Berufliche Biografie",
    bioPlaceholder: "Erzählen Sie uns von Ihrer Erfahrung und Herangehensweise (mind. 100 Zeichen)",
    certification: "Zertifizierungen",
    certificationPlaceholder: "Listen Sie Ihre Zertifizierungen auf (kommagetrennt)",
    agreeToTerms: "Ich stimme den Professionellen Nutzungsbedingungen und dem Ethikkodex zu",
    submitApplication: "Bewerbung Einreichen",
    submitting: "Wird Gesendet...",
    back: "Zurück"
  },
  nl: {
    title: "Solliciteren als Therapeut",
    subtitle: "Sluit je aan bij ons netwerk van erkende professionals die koppels wereldwijd helpen",
    fullName: "Volledige Naam",
    fullNamePlaceholder: "Voer je volledige naam in",
    email: "E-mailadres",
    emailPlaceholder: "Voer je professionele e-mail in",
    password: "Wachtwoord",
    passwordPlaceholder: "Maak een veilig wachtwoord",
    licenseNumber: "Licentienummer",
    licenseNumberPlaceholder: "Je professionele licentienummer",
    specialty: "Primaire Specialiteit",
    specialties: { couples: "Relatietherapie", marriage: "Huwelijksbegeleiding", family: "Gezinstherapie", trauma: "Trauma-geïnformeerde Zorg", premarital: "Pre-Huwelijksbegeleiding" },
    yearsExperience: "Jaren Ervaring",
    bio: "Professionele Bio",
    bioPlaceholder: "Vertel ons over je ervaring en benadering (min 100 karakters)",
    certification: "Certificeringen",
    certificationPlaceholder: "Lijst je certificeringen (gescheiden door komma's)",
    agreeToTerms: "Ik ga akkoord met de Professionele Servicevoorwaarden en Ethische Code",
    submitApplication: "Sollicitatie Indienen",
    submitting: "Indienen...",
    back: "Terug"
  },
  pt: {
    title: "Candidatar-se como Terapeuta",
    subtitle: "Junte-se à nossa rede de profissionais licenciados ajudando casais em todo o mundo",
    fullName: "Nome Completo",
    fullNamePlaceholder: "Digite seu nome completo",
    email: "Endereço de E-mail",
    emailPlaceholder: "Digite seu e-mail profissional",
    password: "Senha",
    passwordPlaceholder: "Crie uma senha segura",
    licenseNumber: "Número da Licença",
    licenseNumberPlaceholder: "Seu número de licença profissional",
    specialty: "Especialidade Principal",
    specialties: { couples: "Terapia de Casal", marriage: "Aconselhamento Matrimonial", family: "Terapia Familiar", trauma: "Cuidado Informado sobre Trauma", premarital: "Aconselhamento Pré-Matrimonial" },
    yearsExperience: "Anos de Experiência",
    bio: "Biografia Profissional",
    bioPlaceholder: "Conte-nos sobre sua experiência e abordagem (mín 100 caracteres)",
    certification: "Certificações",
    certificationPlaceholder: "Liste suas certificações (separadas por vírgulas)",
    agreeToTerms: "Concordo com os Termos Profissionais de Serviço e Código de Ética",
    submitApplication: "Enviar Candidatura",
    submitting: "Enviando...",
    back: "Voltar"
  }
};

export default function TherapistForm({ onBack }) {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.en;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    licenseNumber: "",
    specialty: "",
    yearsExperience: "",
    bio: "",
    certifications: "",
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the professional terms");
      return;
    }

    if (formData.bio.length < 100) {
      toast.error("Professional bio must be at least 100 characters");
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
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
            <Stethoscope className="w-6 h-6 text-white" />
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
              {t.licenseNumber} *
            </label>
            <div className="relative">
              <Award size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                placeholder={t.licenseNumberPlaceholder}
                className="pl-12"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.specialty} *
            </label>
            <Select value={formData.specialty} onValueChange={(value) => setFormData({...formData, specialty: value})} required>
              <SelectTrigger>
                <SelectValue placeholder={t.specialty} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="couples">{t.specialties.couples}</SelectItem>
                <SelectItem value="marriage">{t.specialties.marriage}</SelectItem>
                <SelectItem value="family">{t.specialties.family}</SelectItem>
                <SelectItem value="trauma">{t.specialties.trauma}</SelectItem>
                <SelectItem value="premarital">{t.specialties.premarital}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.yearsExperience} *
            </label>
            <Input
              type="number"
              min="0"
              value={formData.yearsExperience}
              onChange={(e) => setFormData({...formData, yearsExperience: e.target.value})}
              placeholder="0"
              required
            />
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
              {t.certification}
            </label>
            <Input
              type="text"
              value={formData.certifications}
              onChange={(e) => setFormData({...formData, certifications: e.target.value})}
              placeholder={t.certificationPlaceholder}
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
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold text-lg py-6"
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