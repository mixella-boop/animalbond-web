'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const CATEGORIES = [
  { value: '', label: 'Alege categoria...' },
  { value: 'vet', label: '🏥 Cabinet veterinar' },
  { value: 'food', label: '🥩 Magazine hrană animale' },
  { value: 'accessories', label: '🎾 Magazine accesorii' },
  { value: 'insurance', label: '🛡️ Asigurări animale' },
  { value: 'other', label: '🤝 Altele' },
]

type FormData = {
  company_name: string
  category: string
  city: string
  address: string
  phone: string
  email: string
  website: string
  description: string
  gdpr_consent: boolean
  // honeypot — câmp invizibil; dacă e completat, e bot
  _hp_name: string
}

const INITIAL: FormData = {
  company_name: '',
  category: '',
  city: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  description: '',
  gdpr_consent: false,
  _hp_name: '',
}

export default function PartnerApplyPage() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  const validate = (): string | null => {
    if (!form.company_name.trim()) return 'Numele companiei este obligatoriu.'
    if (!form.category) return 'Categoria este obligatorie.'
    if (!form.city.trim()) return 'Orașul este obligatoriu.'
    if (!form.phone.trim()) return 'Telefonul este obligatoriu.'
    if (!form.email.trim() || !form.email.includes('@')) return 'Email-ul este invalid.'
    if (!form.gdpr_consent) return 'Trebuie să accepți termenii GDPR.'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot: dacă câmpul ascuns e completat, e bot — silențios ignorăm
    if (form._hp_name) {
      setSuccess(true)
      return
    }

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')

    try {
      const { error: dbError } = await supabase.from('partner_applications').insert([
        {
          company_name: form.company_name.trim(),
          category: form.category,
          city: form.city.trim(),
          address: form.address.trim() || null,
          phone: form.phone.trim(),
          email: form.email.trim().toLowerCase(),
          website: form.website.trim() || null,
          description: form.description.trim() || null,
          gdpr_consent: form.gdpr_consent,
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      ])

      if (dbError) {
        console.error('Eroare Supabase:', dbError)
        setError('A apărut o eroare. Te rugăm să încerci din nou sau să ne contactezi direct.')
      } else {
        setSuccess(true)
        setForm(INITIAL)
      }
    } catch (err) {
      console.error(err)
      setError('Eroare de rețea. Verifică conexiunea și încearcă din nou.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-text-main mb-4">
          Cererea ta a fost trimisă!
        </h1>
        <p className="text-text-muted text-lg mb-4 leading-relaxed">
          Mulțumim pentru interes! Echipa AnimalBond va analiza cererea ta și te va
          contacta în maxim 2-3 zile lucrătoare.
        </p>
        <p className="text-text-muted mb-8">
          Până atunci, poți explora animalele disponibile sau să descarci aplicația.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
          >
            Înapoi la pagina principală
          </a>
          <button
            onClick={() => setSuccess(false)}
            className="border-2 border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
          >
            Trimite o altă cerere
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">🤝</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-main mb-3">
          Devino partener AnimalBond
        </h1>
        <p className="text-text-muted text-lg leading-relaxed max-w-lg mx-auto">
          Înscrie cabinetul tău veterinar sau magazinul de animale și ajunge
          la mii de proprietari din zona ta. Echipa noastră te va contacta cu detalii.
        </p>
      </div>

      {/* Beneficii rapide */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {[
          { icon: '📱', text: 'Vizibilitate în app' },
          { icon: '🌐', text: 'Prezentare pe site' },
          { icon: '📩', text: 'Răspuns în 2-3 zile' },
        ].map((b) => (
          <div key={b.icon} className="bg-pink-50 rounded-xl p-3 text-center border border-primary/10">
            <div className="text-2xl mb-1">{b.icon}</div>
            <div className="text-xs font-semibold text-text-main">{b.text}</div>
          </div>
        ))}
      </div>

      {/* Formular */}
      <form onSubmit={handleSubmit} className="bg-white rounded-card shadow-card border border-border-light p-6 sm:p-8 space-y-5">
        {/* Honeypot — invizibil pentru useri, completat automat de boti */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }} tabIndex={-1}>
          <label htmlFor="_hp_name">Nu completa acest câmp</label>
          <input
            id="_hp_name"
            type="text"
            name="_hp_name"
            value={form._hp_name}
            onChange={(e) => update('_hp_name', e.target.value)}
            autoComplete="off"
            tabIndex={-1}
          />
        </div>

        <h2 className="font-bold text-text-main text-xl border-b border-border-light pb-3">
          Detalii companie
        </h2>

        {/* Nume companie */}
        <div>
          <label className="block text-sm font-semibold text-text-main mb-1.5">
            Nume companie <span className="text-primary">*</span>
          </label>
          <input
            type="text"
            value={form.company_name}
            onChange={(e) => update('company_name', e.target.value)}
            placeholder="Ex: Cabinet Veterinar Dr. Popescu"
            className="w-full border border-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Categorie */}
        <div>
          <label className="block text-sm font-semibold text-text-main mb-1.5">
            Categorie <span className="text-primary">*</span>
          </label>
          <select
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            className="w-full border border-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value} disabled={c.value === ''}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Oras + Adresa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5">
              Oraș <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => update('city', e.target.value)}
              placeholder="Ex: Cluj-Napoca"
              className="w-full border border-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5">
              Adresă
            </label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => update('address', e.target.value)}
              placeholder="Str. Exemplu, nr. 1"
              className="w-full border border-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <h2 className="font-bold text-text-main text-xl border-b border-border-light pb-3 !mt-8">
          Date de contact
        </h2>

        {/* Telefon + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5">
              Telefon <span className="text-primary">*</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="07xx xxx xxx"
              className="w-full border border-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-main mb-1.5">
              Email <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="contact@exemplu.ro"
              className="w-full border border-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-semibold text-text-main mb-1.5">
            Website{' '}
            <span className="text-text-muted font-normal text-xs">(opțional)</span>
          </label>
          <input
            type="url"
            value={form.website}
            onChange={(e) => update('website', e.target.value)}
            placeholder="https://exemplu.ro"
            className="w-full border border-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Descriere */}
        <div>
          <label className="block text-sm font-semibold text-text-main mb-1.5">
            Descriere{' '}
            <span className="text-text-muted font-normal text-xs">(opțional)</span>
          </label>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            rows={4}
            placeholder="Descrie pe scurt serviciile oferite, specializarea, etc."
            className="w-full border border-border-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
          />
        </div>

        {/* GDPR */}
        <div className="bg-gray-50 rounded-xl p-4 border border-border-light">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.gdpr_consent}
              onChange={(e) => update('gdpr_consent', e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-primary shrink-0"
            />
            <span className="text-sm text-text-muted leading-relaxed">
              Sunt de acord cu prelucrarea datelor mele cu caracter personal de către AnimalBond
              în scopul procesării cererii de parteneriat, conform{' '}
              <a href="/confidentialitate" className="text-primary hover:underline">
                Politicii de confidențialitate
              </a>
              . <span className="text-primary">*</span>
            </span>
          </label>
        </div>

        {/* Eroare */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
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
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Se trimite...
            </>
          ) : (
            'Trimite cererea de parteneriat 🐾'
          )}
        </button>

        <p className="text-xs text-text-muted text-center">
          Vei primi un răspuns în maxim 2-3 zile lucrătoare pe email-ul furnizat.
        </p>
      </form>
    </div>
  )
}
