import React, { useState } from "react";
import { useLanguage } from "@/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, MapPin, Phone, ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { toast } from "sonner";

const translations = {
  en: {
    title: "Contact Us",
    subtitle: "We'd love to hear from you. Send us a message!",
    back: "Back",
    name: "Your Name",
    email: "Your Email",
    subject: "Subject",
    message: "Message",
    sendMessage: "Send Message",
    getInTouch: "Get in Touch",
    emailUs: "Email Us",
    callUs: "Call Us",
    visitUs: "Visit Us",
    successMessage: "Message sent! We'll get back to you soon. 💌"
  },
  es: {
    title: "Contáctanos",
    subtitle: "Nos encantaría saber de ti. ¡Envíanos un mensaje!",
    back: "Volver",
    name: "Tu Nombre",
    email: "Tu Email",
    subject: "Asunto",
    message: "Mensaje",
    sendMessage: "Enviar Mensaje",
    getInTouch: "Ponte en Contacto",
    emailUs: "Envíanos un Email",
    callUs: "Llámanos",
    visitUs: "Visítanos",
    successMessage: "¡Mensaje enviado! Te responderemos pronto. 💌"
  },
  fr: {
    title: "Nous Contacter",
    subtitle: "Nous aimerions vous entendre. Envoyez-nous un message!",
    back: "Retour",
    name: "Votre Nom",
    email: "Votre Email",
    subject: "Sujet",
    message: "Message",
    sendMessage: "Envoyer le Message",
    getInTouch: "Contactez-Nous",
    emailUs: "Envoyez-nous un Email",
    callUs: "Appelez-Nous",
    visitUs: "Visitez-Nous",
    successMessage: "Message envoyé! Nous vous répondrons bientôt. 💌"
  },
  it: {
    title: "Contattaci",
    subtitle: "Ci piacerebbe sentirti. Inviaci un messaggio!",
    back: "Indietro",
    name: "Il Tuo Nome",
    email: "La Tua Email",
    subject: "Oggetto",
    message: "Messaggio",
    sendMessage: "Invia Messaggio",
    getInTouch: "Mettiti in Contatto",
    emailUs: "Inviaci un'Email",
    callUs: "Chiamaci",
    visitUs: "Visitaci",
    successMessage: "Messaggio inviato! Ti risponderemo presto. 💌"
  },
  de: {
    title: "Kontaktieren Sie Uns",
    subtitle: "Wir würden gerne von Ihnen hören. Senden Sie uns eine Nachricht!",
    back: "Zurück",
    name: "Ihr Name",
    email: "Ihre E-Mail",
    subject: "Betreff",
    message: "Nachricht",
    sendMessage: "Nachricht Senden",
    getInTouch: "Kontaktieren Sie Uns",
    emailUs: "Senden Sie uns eine E-Mail",
    callUs: "Rufen Sie uns an",
    visitUs: "Besuchen Sie uns",
    successMessage: "Nachricht gesendet! Wir melden uns bald. 💌"
  }
};

export default function ContactUs() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.en;
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(t.successMessage);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to={createPageUrl("Home")} className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all">
            <ArrowLeft size={20} className="mr-2" />
            {t.back}
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mb-6 shadow-xl">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">{t.getInTouch}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.name}</label>
                    <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.email}</label>
                    <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.subject}</label>
                    <Input value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} required className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.message}</label>
                    <Textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required className="h-32" />
                  </div>
                  <Button type="submit" className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg">
                    <Send className="w-5 h-5 mr-2" />
                    {t.sendMessage}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            <Card className="shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t.emailUs}</h3>
                    <p className="text-gray-600 text-sm">support@one2onelove.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t.callUs}</h3>
                    <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t.visitUs}</h3>
                    <p className="text-gray-600 text-sm">123 Love Street<br />Heart City, HC 12345</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}