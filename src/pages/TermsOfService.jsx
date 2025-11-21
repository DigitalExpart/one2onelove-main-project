import React from "react";
import { useLanguage } from "@/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

const translations = {
  en: {
    title: "Terms of Service",
    subtitle: "Please read these terms carefully",
    back: "Back",
    lastUpdated: "Last Updated: November 15, 2025",
    sections: [
      { title: "1. Acceptance of Terms", content: "By accessing and using One 2 One Love, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our services." },
      { title: "2. Use of Service", content: "You agree to use our service only for lawful purposes and in accordance with these Terms. You must not use our service in any way that violates applicable laws or regulations." },
      { title: "3. User Accounts", content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must notify us immediately of any unauthorized use." },
      { title: "4. Content", content: "You retain ownership of any content you submit to our service. By submitting content, you grant us a license to use, modify, and display that content in connection with our services." },
      { title: "5. Prohibited Activities", content: "You may not use our service to harass, abuse, or harm others; transmit malware or viruses; or engage in any illegal activities." },
      { title: "6. Termination", content: "We reserve the right to suspend or terminate your account at any time for violations of these Terms or for any other reason at our sole discretion." },
      { title: "7. Disclaimers", content: "Our service is provided 'as is' without warranties of any kind. We do not guarantee that the service will be uninterrupted, secure, or error-free." },
      { title: "8. Limitation of Liability", content: "We shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our service." },
      { title: "9. Changes to Terms", content: "We may modify these Terms at any time. Continued use of our service after changes constitutes acceptance of the modified Terms." },
      { title: "10. Contact", content: "If you have questions about these Terms, please contact us at legal@one2onelove.com." }
    ]
  },
  es: {
    title: "Términos de Servicio",
    subtitle: "Por favor lee estos términos cuidadosamente",
    back: "Volver",
    lastUpdated: "Última Actualización: 15 de Noviembre de 2025",
    sections: [
      { title: "1. Aceptación de Términos", content: "Al acceder y usar One 2 One Love, aceptas estar sujeto a estos Términos de Servicio." },
      { title: "2. Uso del Servicio", content: "Aceptas usar nuestro servicio solo para fines legales y de acuerdo con estos Términos." },
      { title: "3. Cuentas de Usuario", content: "Eres responsable de mantener la confidencialidad de tus credenciales de cuenta." },
      { title: "4. Contenido", content: "Conservas la propiedad de cualquier contenido que envíes a nuestro servicio." },
      { title: "5. Actividades Prohibidas", content: "No puedes usar nuestro servicio para acosar, abusar o dañar a otros." },
      { title: "6. Terminación", content: "Nos reservamos el derecho de suspender o terminar tu cuenta en cualquier momento." },
      { title: "7. Descargos de Responsabilidad", content: "Nuestro servicio se proporciona 'tal cual' sin garantías de ningún tipo." },
      { title: "8. Limitación de Responsabilidad", content: "No seremos responsables por daños indirectos, incidentales o consecuentes." },
      { title: "9. Cambios a los Términos", content: "Podemos modificar estos Términos en cualquier momento." },
      { title: "10. Contacto", content: "Si tienes preguntas sobre estos Términos, contáctanos en legal@one2onelove.com." }
    ]
  },
  fr: {
    title: "Conditions d'Utilisation",
    subtitle: "Veuillez lire attentivement ces conditions",
    back: "Retour",
    lastUpdated: "Dernière Mise à Jour: 15 Novembre 2025",
    sections: [
      { title: "1. Acceptation des Conditions", content: "En accédant et en utilisant One 2 One Love, vous acceptez d'être lié par ces Conditions d'Utilisation." },
      { title: "2. Utilisation du Service", content: "Vous acceptez d'utiliser notre service uniquement à des fins légales." },
      { title: "3. Comptes Utilisateurs", content: "Vous êtes responsable de la confidentialité de vos identifiants de compte." },
      { title: "4. Contenu", content: "Vous conservez la propriété de tout contenu que vous soumettez." },
      { title: "5. Activités Interdites", content: "Vous ne pouvez pas utiliser notre service pour harceler ou nuire à autrui." },
      { title: "6. Résiliation", content: "Nous nous réservons le droit de suspendre ou de résilier votre compte." },
      { title: "7. Avertissements", content: "Notre service est fourni 'tel quel' sans garanties." },
      { title: "8. Limitation de Responsabilité", content: "Nous ne serons pas responsables des dommages indirects." },
      { title: "9. Modifications des Conditions", content: "Nous pouvons modifier ces Conditions à tout moment." },
      { title: "10. Contact", content: "Pour des questions, contactez-nous à legal@one2onelove.com." }
    ]
  },
  it: {
    title: "Termini di Servizio",
    subtitle: "Si prega di leggere attentamente questi termini",
    back: "Indietro",
    lastUpdated: "Ultimo Aggiornamento: 15 Novembre 2025",
    sections: [
      { title: "1. Accettazione dei Termini", content: "Accedendo e utilizzando One 2 One Love, accetti di essere vincolato da questi Termini di Servizio." },
      { title: "2. Uso del Servizio", content: "Accetti di utilizzare il nostro servizio solo per scopi legali." },
      { title: "3. Account Utente", content: "Sei responsabile del mantenimento della riservatezza delle tue credenziali." },
      { title: "4. Contenuto", content: "Mantieni la proprietà di qualsiasi contenuto che invii." },
      { title: "5. Attività Proibite", content: "Non puoi utilizzare il nostro servizio per molestare o danneggiare altri." },
      { title: "6. Risoluzione", content: "Ci riserviamo il diritto di sospendere o terminare il tuo account." },
      { title: "7. Esclusioni di Responsabilità", content: "Il nostro servizio è fornito 'così com'è' senza garanzie." },
      { title: "8. Limitazione di Responsabilità", content: "Non saremo responsabili per danni indiretti." },
      { title: "9. Modifiche ai Termini", content: "Potremmo modificare questi Termini in qualsiasi momento." },
      { title: "10. Contatto", content: "Per domande, contattaci a legal@one2onelove.com." }
    ]
  },
  de: {
    title: "Nutzungsbedingungen",
    subtitle: "Bitte lesen Sie diese Bedingungen sorgfältig",
    back: "Zurück",
    lastUpdated: "Letzte Aktualisierung: 15. November 2025",
    sections: [
      { title: "1. Annahme der Bedingungen", content: "Durch den Zugriff auf und die Nutzung von One 2 One Love akzeptieren Sie diese Nutzungsbedingungen." },
      { title: "2. Nutzung des Dienstes", content: "Sie verpflichten sich, unseren Dienst nur für rechtmäßige Zwecke zu nutzen." },
      { title: "3. Benutzerkonten", content: "Sie sind für die Vertraulichkeit Ihrer Kontodaten verantwortlich." },
      { title: "4. Inhalt", content: "Sie behalten das Eigentum an allen Inhalten, die Sie einreichen." },
      { title: "5. Verbotene Aktivitäten", content: "Sie dürfen unseren Dienst nicht nutzen, um andere zu belästigen oder zu schädigen." },
      { title: "6. Kündigung", content: "Wir behalten uns das Recht vor, Ihr Konto zu suspendieren oder zu kündigen." },
      { title: "7. Haftungsausschlüsse", content: "Unser Dienst wird 'wie besehen' ohne Garantien bereitgestellt." },
      { title: "8. Haftungsbeschränkung", content: "Wir haften nicht für indirekte Schäden." },
      { title: "9. Änderungen der Bedingungen", content: "Wir können diese Bedingungen jederzeit ändern." },
      { title: "10. Kontakt", content: "Bei Fragen kontaktieren Sie uns unter legal@one2onelove.com." }
    ]
  }
};

export default function TermsOfService() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to={createPageUrl("Home")} className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
            <ArrowLeft size={20} className="mr-2" />
            {t.back}
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-xl">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
          <p className="text-sm text-gray-500 mt-4">{t.lastUpdated}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="shadow-2xl">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                {t.sections.map((section, index) => (
                  <div key={index} className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}