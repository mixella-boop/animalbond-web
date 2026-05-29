'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const EDGE_FN_URL  = `${SUPABASE_URL}/functions/v1/send-contact-email`
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export default function ContactPage() {
  const { lang, t } = useLanguage()
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')
  const [hp, setHp]           = useState('')  // honeypot
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (hp) { setSuccess(true); return }  // bot silențios
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(t('contact_err_fields')); return
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
      if (!res.ok || data.error) { setError(data.error || t('contact_err_generic')); return }
      setSuccess(true)
    } catch {
      setError(t('contact_err_generic'))
    } finally {
      setLoading(false)
    }
  }

  if (success) return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-6">🐾</div>
      <h1 className="text-3xl font-bold text-text-main mb-4">{t('contact_success_title')}</h1>
      <p className="text-text-muted text-lg leading-relaxed mb-8">{t('contact_success_desc')}</p>
      <button
        onClick={() => { setSuccess(false); setName(''); setEmail(''); setMessage('') }}
        className="border-2 border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
      >
        {t('contact_send_another')}
      </button>
    </div>
  )

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">💬</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-main mb-3">{t('contact_title')}</h1>
        <p className="text-text-muted text-base leading-relaxed">{t('contact_subtitle')}</p>
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
            {t('contact_name_label')} <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={t('contact_name_ph')}
            maxLength={100}
            className="w-full border border-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-text-main mb-1.5">
            {t('contact_email_label')} <span className="text-primary">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder={t('contact_email_ph')}
            maxLength={200}
            className="w-full border border-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Mesaj */}
        <div>
          <label className="block text-sm font-semibold text-text-main mb-1.5">
            {t('contact_msg_label')} <span className="text-primary">*</span>
          </label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder={t('contact_msg_ph')}
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
              {t('contact_sending')}
            </>
          ) : t('contact_send')}
        </button>
      </form>
    </div>
  )
}
