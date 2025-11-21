import React from "react";
import { useLanguage } from "@/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";

const translations = {
  en: {
    title: "Privacy Policy",
    subtitle: "Your privacy is important to us",
    back: "Back",
    lastUpdated: "Last Updated: November 15, 2025",
    sections: [
      { title: "1. Information We Collect", content: "We collect information you provide directly to us, including your name, email address, and relationship information. We also collect information about how you use our services." },
      { title: "2. How We Use Your Information", content: "We use your information to provide, maintain, and improve our services, to communicate with you, and to personalize your experience on our platform." },
      { title: "3. Information Sharing", content: "We do not sell your personal information. We may share your information with service providers who help us operate our platform, or when required by law." },
      { title: "4. Data Security", content: "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction." },
      { title: "5. Your Rights", content: "You have the right to access, update, or delete your personal information. You can also opt out of certain communications and data collection." },
      { title: "6. Cookies", content: "We use cookies and similar technologies to improve your experience, analyze usage, and personalize content. You can control cookies through your browser settings." },
      { title: "7. Children's Privacy", content: "Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13." },
      { title: "8. Changes to This Policy", content: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page." }
    ]
  },
  es: {
    title: "Política de Privacidad",
    subtitle: "Tu privacidad es importante para nosotros",
    back: "Volver",
    lastUpdated: "Última Actualización: 15 de Noviembre de 2025",
    sections: [
      { title: "1. Información que Recopilamos", content: "Recopilamos información que nos proporcionas directamente, incluido tu nombre, dirección de correo electrónico e información de relación." },
      { title: "2. Cómo Usamos tu Información", content: "Usamos tu información para proporcionar, mantener y mejorar nuestros servicios, comunicarnos contigo y personalizar tu experiencia." },
      { title: "3. Compartir Información", content: "No vendemos tu información personal. Podemos compartir tu información con proveedores de servicios o cuando lo exija la ley." },
      { title: "4. Seguridad de Datos", content: "Implementamos medidas de seguridad apropiadas para proteger tu información personal." },
      { title: "5. Tus Derechos", content: "Tienes derecho a acceder, actualizar o eliminar tu información personal." },
      { title: "6. Cookies", content: "Usamos cookies y tecnologías similares para mejorar tu experiencia." },
      { title: "7. Privacidad de Niños", content: "Nuestros servicios no están destinados a niños menores de 13 años." },
      { title: "8. Cambios a Esta Política", content: "Podemos actualizar esta política de privacidad de vez en cuando." }
    ]
  },
  fr: {
    title: "Politique de Confidentialité",
    subtitle: "Votre vie privée est importante pour nous",
    back: "Retour",
    lastUpdated: "Dernière Mise à Jour: 15 Novembre 2025",
    sections: [
      { title: "1. Informations que Nous Collectons", content: "Nous collectons les informations que vous nous fournissez directement, y compris votre nom, adresse e-mail et informations de relation." },
      { title: "2. Comment Nous Utilisons Vos Informations", content: "Nous utilisons vos informations pour fournir, maintenir et améliorer nos services." },
      { title: "3. Partage d'Informations", content: "Nous ne vendons pas vos informations personnelles." },
      { title: "4. Sécurité des Données", content: "Nous mettons en œuvre des mesures de sécurité appropriées." },
      { title: "5. Vos Droits", content: "Vous avez le droit d'accéder, de mettre à jour ou de supprimer vos informations personnelles." },
      { title: "6. Cookies", content: "Nous utilisons des cookies et des technologies similaires." },
      { title: "7. Confidentialité des Enfants", content: "Nos services ne sont pas destinés aux enfants de moins de 13 ans." },
      { title: "8. Modifications de Cette Politique", content: "Nous pouvons mettre à jour cette politique de confidentialité." }
    ]
  },
  it: {
    title: "Informativa sulla Privacy",
    subtitle: "La tua privacy è importante per noi",
    back: "Indietro",
    lastUpdated: "Ultimo Aggiornamento: 15 Novembre 2025",
    sections: [
      { title: "1. Informazioni che Raccogliamo", content: "Raccogliamo le informazioni che ci fornisci direttamente, inclusi nome, email e informazioni sulla relazione." },
      { title: "2. Come Utilizziamo le Tue Informazioni", content: "Utilizziamo le tue informazioni per fornire, mantenere e migliorare i nostri servizi." },
      { title: "3. Condivisione delle Informazioni", content: "Non vendiamo le tue informazioni personali." },
      { title: "4. Sicurezza dei Dati", content: "Implementiamo misure di sicurezza appropriate." },
      { title: "5. I Tuoi Diritti", content: "Hai il diritto di accedere, aggiornare o eliminare le tue informazioni personali." },
      { title: "6. Cookie", content: "Utilizziamo cookie e tecnologie simili." },
      { title: "7. Privacy dei Bambini", content: "I nostri servizi non sono destinati a bambini di età inferiore a 13 anni." },
      { title: "8. Modifiche a Questa Politica", content: "Potremmo aggiornare questa informativa sulla privacy." }
    ]
  },
  de: {
    title: "Datenschutzrichtlinie",
    subtitle: "Ihre Privatsphäre ist uns wichtig",
    back: "Zurück",
    lastUpdated: "Letzte Aktualisierung: 15. November 2025",
    sections: [
      { title: "1. Informationen, die Wir Sammeln", content: "Wir sammeln Informationen, die Sie uns direkt zur Verfügung stellen, einschließlich Name, E-Mail und Beziehungsinformationen." },
      { title: "2. Wie Wir Ihre Informationen Verwenden", content: "Wir verwenden Ihre Informationen, um unsere Dienste bereitzustellen, zu warten und zu verbessern." },
      { title: "3. Weitergabe von Informationen", content: "Wir verkaufen Ihre persönlichen Informationen nicht." },
      { title: "4. Datensicherheit", content: "Wir implementieren angemessene Sicherheitsmaßnahmen." },
      { title: "5. Ihre Rechte", content: "Sie haben das Recht, auf Ihre persönlichen Informationen zuzugreifen, diese zu aktualisieren oder zu löschen." },
      { title: "6. Cookies", content: "Wir verwenden Cookies und ähnliche Technologien." },
      { title: "7. Datenschutz für Kinder", content: "Unsere Dienste richten sich nicht an Kinder unter 13 Jahren." },
      { title: "8. Änderungen an Dieser Richtlinie", content: "Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren." }
    ]
  }
};

export default function PrivacyPolicy() {
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
            <Shield className="w-10 h-10 text-white" />
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