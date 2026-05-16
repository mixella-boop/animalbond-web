'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const EDGE_FN_URL  = `${SUPABASE_URL}/functions/v1/send-contact-email`
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

type Lang = 'ro' | 'en' | 'de' | 'fr' | 'it' | 'es' | 'hu'

const T: Record<Lang, {
  title: string; subtitle: string
  nameLabel: string; namePh: string
  emailLabel: string; emailPh: string
  msgLabel: string; msgPh: string
  send: string; sending: string
  successTitle: string; successDesc: string
  errorGeneric: string; errorFields: string
  langName: string
}> = {
  ro: {
    title: 'Contactează-ne', subtitle: 'Ai o întrebare, sugestie sau problemă? Scrie-ne și îți răspundem cât mai curând.',
    nameLabel: 'Numele tău', namePh: 'Ex: Ana Popescu',
    emailLabel: 'Email', emailPh: 'adresa@ta.com',
    msgLabel: 'Mesaj', msgPh: 'Descrie pe scurt cu ce te putem ajuta...',
    send: 'Trimite mesajul 🐾', sending: 'Se trimite...',
    successTitle: 'Mesaj trimis! ✅', successDesc: 'Mulțumim! Îți vom răspunde pe email cât mai curând posibil.',
    errorGeneric: 'A apărut o eroare. Încearcă din nou.', errorFields: 'Completează toate câmpurile obligatorii.',
    langName: 'Română',
  },
  en: {
    title: 'Contact Us', subtitle: 'Have a question, suggestion or issue? Write to us and we\'ll reply as soon as possible.',
    nameLabel: 'Your name', namePh: 'E.g. John Smith',
    emailLabel: 'Email', emailPh: 'your@email.com',
    msgLabel: 'Message', msgPh: 'Briefly describe how we can help you...',
    send: 'Send message 🐾', sending: 'Sending...',
    successTitle: 'Message sent! ✅', successDesc: 'Thank you! We\'ll reply to your email as soon as possible.',
    errorGeneric: 'An error occurred. Please try again.', errorFields: 'Please fill in all required fields.',
    langName: 'English',
  },
  de: {
    title: 'Kontakt', subtitle: 'Haben Sie eine Frage, einen Vorschlag oder ein Problem? Schreiben Sie uns.',
    nameLabel: 'Ihr Name', namePh: 'z.B. Max Mustermann',
    emailLabel: 'E-Mail', emailPh: 'ihre@email.de',
    msgLabel: 'Nachricht', msgPh: 'Beschreiben Sie kurz, womit wir helfen können...',
    send: 'Nachricht senden 🐾', sending: 'Wird gesendet...',
    successTitle: 'Nachricht gesendet! ✅', successDesc: 'Vielen Dank! Wir antworten Ihnen so schnell wie möglich.',
    errorGeneric: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.', errorFields: 'Bitte füllen Sie alle Pflichtfelder aus.',
    langName: 'Deutsch',
  },
  fr: {
    title: 'Contactez-nous', subtitle: 'Vous avez une question, une suggestion ou un problème ? Écrivez-nous.',
    nameLabel: 'Votre nom', namePh: 'Ex: Marie Dupont',
    emailLabel: 'Email', emailPh: 'votre@email.fr',
    msgLabel: 'Message', msgPh: 'Décrivez brièvement comment nous pouvons vous aider...',
    send: 'Envoyer le message 🐾', sending: 'Envoi en cours...',
    successTitle: 'Message envoyé ! ✅', successDesc: 'Merci ! Nous vous répondrons par email dès que possible.',
    errorGeneric: 'Une erreur s\'est produite. Réessayez.', errorFields: 'Veuillez remplir tous les champs obligatoires.',
    langName: 'Français',
  },
  it: {
    title: 'Contattaci', subtitle: 'Hai una domanda, un suggerimento o un problema? Scrivici e ti risponderemo presto.',
    nameLabel: 'Il tuo nome', namePh: 'Es: Mario Rossi',
    emailLabel: 'Email', emailPh: 'tua@email.it',
    msgLabel: 'Messaggio', msgPh: 'Descrivi brevemente come possiamo aiutarti...',
    send: 'Invia messaggio 🐾', sending: 'Invio in corso...',
    successTitle: 'Messaggio inviato! ✅', successDesc: 'Grazie! Ti risponderemo via email il prima possibile.',
    errorGeneric: 'Si è verificato un errore. Riprova.', errorFields: 'Compila tutti i campi obbligatori.',
    langName: 'Italiano',
  },
  es: {
    title: 'Contáctanos', subtitle: '¿Tienes una pregunta, sugerencia o problema? Escríbenos y te responderemos pronto.',
    nameLabel: 'Tu nombre', namePh: 'Ej: María García',
    emailLabel: 'Email', emailPh: 'tu@email.es',
    msgLabel: 'Mensaje', msgPh: 'Describe brevemente cómo podemos ayudarte...',
    send: 'Enviar mensaje 🐾', sending: 'Enviando...',
    successTitle: '¡Mensaje enviado! ✅', successDesc: '¡Gracias! Te responderemos por email lo antes posible.',
    errorGeneric: 'Se produjo un error. Inténtalo de nuevo.', errorFields: 'Por favor completa todos los campos obligatorios.',
    langName: 'Español',
  },
  hu: {
    title: 'Kapcsolat', subtitle: 'Kérdésed, javaslatod vagy problémád van? Írj nekünk, és mielőbb válaszolunk.',
    nameLabel: 'Neved', namePh: 'Pl: Kovács Anna',
    emailLabel: 'Email', emailPh: 'email@cimed.hu',
    msgLabel: 'Üzenet', msgPh: 'Röviden írd le, miben segíthetünk...',
    send: 'Üzenet küldése 🐾', sending: 'Küldés...',
    successTitle: 'Üzenet elküldve! ✅', successDesc: 'Köszönjük! Emailben válaszolunk amint lehetséges.',
    errorGeneric: 'Hiba történt. Kérjük, próbáld újra.', errorFields: 'Kérjük, töltsd ki az összes kötelező mezőt.',
    langName: 'Magyar',
  },
}

const LANGS: Lang[] = ['ro', 'en', 'de', 'fr', 'it', 'es', 'hu']

export default function ContactPage() {
  const { lang, setLang } = useLanguage()
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')
  const [hp, setHp]           = useState('')  // honeypot
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState('')

  const t = T[lang as Lang] ?? T['ro']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (hp) { setSuccess(true); return }  // bot silențios
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(t.errorFields); return
    }
    setLoading(true); setError('')
    try {
      const res = await fetch(EDGE_FN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ name, email, message, lang, _hp: hp }),
      })
      const data = await res.json()
      if (!res.ok || data.error) { setError(data.error || t.errorGeneric); return }
      setSuccess(true)
    } catch {
      setError(t.errorGeneric)
    } finally {
      setLoading(false)
    }
  }

  if (success) return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">🐾</div>
      <h1 className="text-3xl font-bold text-text-main mb-4">{t.successTitle}</h1>
      <p className="text-text-muted text-lg leading-relaxed mb-8">{t.successDesc}</p>
      <button
        onClick={() => { setSuccess(false); setName(''); setEmail(''); setMessage('') }}
        className="border-2 border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
      >
        {lang === 'ro' ? 'Trimite alt mesaj' : lang === 'en' ? 'Send another message' : lang === 'de' ? 'Weitere Nachricht senden' : lang === 'fr' ? 'Envoyer un autre message' : lang === 'it' ? 'Invia un altro messaggio' : lang === 'es' ? 'Enviar otro mensaje' : 'Újabb üzenet küldése'}
      </button>
    </div>
  )

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">💬</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-main mb-3">{t.title}</h1>
        <p className="text-text-muted text-base leading-relaxed">{t.subtitle}</p>
      </div>

      {/* Formular */}
      <form onSubmit={handleSubmit} className="bg-white rounded-card shadow-card border border-border-light p-6 sm:p-8 space-y-5">
        {/* Honeypot invizibil */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} tabIndex={-1}>
          <input type="text" name="_hp" value={hp} onChange={e => setHp(e.target.value)} autoComplete="off" tabIndex={-1} />
        </div>

        {/* Nume */}
        <div>
          <label className="block text-sm font-semibold text-text-main mb-1.5">
            {t.nameLabel} <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={t.namePh}
            maxLength={100}
            className="w-full border border-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-text-main mb-1.5">
            {t.emailLabel} <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={t.emailPh}
            maxLength={200}
            className="w-full border border-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Mesaj */}
        <div>
          <label className="block text-sm font-semibold text-text-main mb-1.5">
            {t.msgLabel} <span className="text-primary">*</span>
          </label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder={t.msgPh}
            rows={5}
            maxLength={3000}
            className="w-full border border-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
          />
          <p className="text-xs text-text-muted mt-1 text-right">{message.length}/3000</p>
        </div>

        {/* Eroare */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm flex items-center gap-2">
            <span>⚠️</span><span>{error}</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-base hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              {t.sending}
            </>
          ) : t.send}
        </button>
      </form>
    </div>
  )
}
