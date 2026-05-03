'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { COUNTRIES } from '@/lib/countries'
import { useLanguage } from '@/context/LanguageContext'
import { COUNTRY_TO_LANG } from '@/lib/i18n'

type DonationCase = {
  id: string
  title: string
  description: string | null
  goal_amount: number | null
  raised_amount: number | null
  currency: string
  urgent: boolean
  status: string
  type: string
  image_url: string | null
  contact_email: string | null
  contact_phone: string | null
  created_at: string
  country: string | null
  profiles: { username: string; full_name: string | null } | null
}

function ComingSoonModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage()
  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="text-5xl mb-4">🚀</div>
        <h3 className="text-xl font-bold text-text-main mb-2">{t('coming_soon')}</h3>
        <p className="text-text-muted text-sm leading-relaxed mb-6">{t('coming_soon_desc')}</p>
        <button onClick={onClose} className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary-dark transition-colors">OK</button>
      </div>
    </div>
  )
}

export default function CampaniiPage() {
  const { t, setLang } = useLanguage()
  const [cases, setCases] = useState<DonationCase[]>([])
  const [loading, setLoading] = useState(true)
  const [country, setCountry] = useState('')
  const [selected, setSelected] = useState<DonationCase | null>(null)
  const [showComingSoon, setShowComingSoon] = useState(false)

  // Country search
  const [countrySearch, setCountrySearch] = useState('')
  const [countryOpen, setCountryOpen] = useState(false)
  const countryRef = useRef<HTMLDivElement>(null)
  const filteredCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) || c.code.toLowerCase().includes(countrySearch.toLowerCase())
  )
  const selectedCountryObj = COUNTRIES.find(c => c.code === country)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) setCountryOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectCountry = (code: string) => {
    setCountry(code)
    setCountrySearch('')
    setCountryOpen(false)
    if (code && COUNTRY_TO_LANG[code]) setLang(COUNTRY_TO_LANG[code])
  }

  const fetchCases = useCallback(async (countryFilter: string) => {
    let query = supabase
      .from('donation_cases')
      .select('*, profiles!donation_cases_created_by_fkey (username, full_name)')
      .in('status', ['active', 'goal_reached'])
      .order('urgent', { ascending: false })
      .order('created_at', { ascending: false })

    if (countryFilter) query = query.eq('country', countryFilter)

    const { data, error } = await query
    if (error) { console.error(error); return }
    setCases((data as DonationCase[]) || [])
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchCases(country).finally(() => setLoading(false))
  }, [country, fetchCases])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {showComingSoon && <ComingSoonModal onClose={() => setShowComingSoon(false)} />}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">💝</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-main mb-3">
          {t('nav_campanii')}
        </h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto mb-6">
          {t('campanii_subtitle')}
        </p>
        <button
          onClick={() => setShowComingSoon(true)}
          className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg"
        >
          {t('campanii_donate_btn')}
        </button>
      </div>

      {/* Banner info */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
        <span className="text-2xl shrink-0">💡</span>
        <p className="text-orange-800 text-sm leading-relaxed">
          <strong>{t('campanii_how_title')}</strong> {t('campanii_how_desc')}
        </p>
      </div>

      {/* Filtru țară cu căutare */}
      <div className="bg-white rounded-card shadow-card border border-border-light p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <label className="text-xs font-semibold text-text-muted uppercase tracking-wide shrink-0">
          🌍 {t('filter_country')}:
        </label>
        <div className="relative w-full sm:w-56" ref={countryRef}>
          {country && !countryOpen ? (
            <div className="flex items-center gap-2 w-full border-2 border-orange-400 rounded-lg px-3 py-2 bg-orange-50 cursor-pointer" onClick={() => setCountryOpen(true)}>
              <span>{selectedCountryObj?.flag}</span>
              <span className="text-sm font-semibold text-orange-700 flex-1">{selectedCountryObj?.name}</span>
              <button onClick={e => { e.stopPropagation(); handleSelectCountry('') }} className="text-orange-500 font-bold text-lg">×</button>
            </div>
          ) : (
            <div className="flex items-center gap-2 border-2 border-border-light rounded-lg px-3 py-2 bg-white focus-within:border-orange-400 transition-colors">
              <span className="text-text-muted">🔍</span>
              <input
                type="text"
                value={countrySearch}
                onChange={e => { setCountrySearch(e.target.value); setCountryOpen(true) }}
                onFocus={() => setCountryOpen(true)}
                placeholder={t('filter_all_countries')}
                className="flex-1 text-sm bg-transparent outline-none text-text-main placeholder:text-text-muted"
              />
            </div>
          )}
          {countryOpen && (
            <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-border-light rounded-xl shadow-lg max-h-56 overflow-y-auto">
              <button onClick={() => handleSelectCountry('')} className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${!country ? 'font-semibold text-orange-500' : 'text-text-muted'}`}>
                🌍 {t('filter_all_countries')}
              </button>
              {filteredCountries.map(c => (
                <button key={c.code} onClick={() => handleSelectCountry(c.code)}
                  className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-orange-50 ${country === c.code ? 'bg-orange-50 font-semibold text-orange-600' : 'text-text-main'}`}>
                  <span>{c.flag}</span><span>{c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid campanii */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-card shadow-card border border-orange-100 overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-16 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : cases.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">💝</div>
          <h2 className="text-xl font-semibold text-text-main mb-2">{t('campanii_empty_title')}</h2>
          <p className="text-text-muted">{country ? t('campanii_empty_country') : t('campanii_empty_sub')}</p>
          {country && <button onClick={() => setCountry('')} className="mt-4 text-primary font-semibold hover:underline text-sm">{t('campanii_show_all')}</button>}
        </div>
      ) : (
        <>
          <p className="text-text-muted text-sm mb-6">
            {cases.length} {cases.length === 1 ? t('campanii_active_one') : t('campanii_active_many')}
            {country && ` ${t('medical_in_country')} ${selectedCountryObj?.flag} ${selectedCountryObj?.name}`}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((item) => {
              const org = item.profiles?.full_name || item.profiles?.username || t('campanii_org_type')
              return (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className="bg-white rounded-card shadow-card border border-orange-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all text-left w-full group cursor-pointer"
                  style={{ borderTop: '5px solid #F97316' }}
                >
                  <div className="relative aspect-[4/3] bg-orange-50">
                    {item.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image_url} alt={item.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">
                        {item.type === 'organization' ? '🏛️' : '🐾'}
                      </div>
                    )}
                    {item.urgent && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                        🚨 {t('campanii_urgent')}
                      </div>
                    )}
                    {item.status === 'goal_reached' && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">✅ {t('campanii_goal_reached')}</div>
                    )}
                    {item.country && (
                      <div className="absolute bottom-2 right-2 bg-white/90 text-xs font-bold px-2 py-1 rounded-full">
                        {COUNTRIES.find(c => c.code === item.country)?.flag || item.country}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-text-muted mb-1">🏥 {org}</p>
                    <h3 className="font-bold text-text-main text-lg mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                    {item.description && (
                      <p className="text-text-muted text-sm leading-relaxed line-clamp-2 mb-3">{item.description}</p>
                    )}
                    {item.goal_amount ? (
                      <div className="bg-orange-50 rounded-xl p-3 mb-3">
                        <p className="text-xs text-orange-600 font-semibold">{t('campanii_goal_label')}</p>
                        <p className="text-xl font-bold text-orange-500">{item.goal_amount} {item.currency}</p>
                      </div>
                    ) : null}
                    <span className="block text-center bg-orange-500 group-hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors">
                      {t('campanii_card_btn')}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </>
      )}

      {/* Modal detaliu campanie */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {selected.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={selected.image_url} alt={selected.title} className="w-full aspect-video object-cover rounded-t-3xl sm:rounded-t-2xl" />
            ) : (
              <div className="w-full h-40 bg-orange-50 flex items-center justify-center text-6xl rounded-t-3xl sm:rounded-t-2xl">
                {selected.type === 'organization' ? '🏛️' : '🐾'}
              </div>
            )}
            <div className="p-6">
              <div className="flex gap-2 flex-wrap mb-3">
                {selected.urgent && <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">🚨 {t('campanii_urgent')}</span>}
                {selected.status === 'goal_reached' && <span className="bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full">✅ {t('campanii_goal_reached')}</span>}
                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">
                  {selected.type === 'organization' ? `🏛️ ${t('campanii_org_type')}` : '🐾 Animal'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-text-main mb-1">{selected.title}</h2>
              <p className="text-text-muted text-sm mb-4">🏥 {selected.profiles?.full_name || selected.profiles?.username || t('campanii_org_type')}</p>
              {selected.goal_amount ? (
                <div className="bg-orange-50 rounded-2xl p-4 mb-4">
                  <p className="text-xs text-orange-600 font-semibold mb-1">{t('campanii_goal_title')}</p>
                  <p className="text-3xl font-bold text-orange-500">{selected.goal_amount} {selected.currency}</p>
                </div>
              ) : null}
              {selected.description && <p className="text-text-main text-sm leading-relaxed mb-4">{selected.description}</p>}
              {(selected.contact_email || selected.contact_phone) && (
                <div className="bg-blue-50 rounded-xl p-4 mb-4">
                  <p className="text-xs font-bold text-blue-700 mb-2">{t('campanii_contact_label')}</p>
                  {selected.contact_email && (
                    <a href={`mailto:${selected.contact_email}`} className="text-sm text-blue-700 hover:underline mb-1 block">📧 {selected.contact_email}</a>
                  )}
                  {selected.contact_phone && (
                    <a href={`tel:${selected.contact_phone}`} className="text-sm text-blue-700 hover:underline block">📞 {selected.contact_phone}</a>
                  )}
                </div>
              )}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { setSelected(null); setShowComingSoon(true) }}
                  className="block text-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-bold transition-colors"
                >
                  {t('campanii_donate_btn')}
                </button>
                <button onClick={() => setSelected(null)} className="text-text-muted text-sm hover:text-primary transition-colors py-2">
                  {t('campanii_close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA download */}
      <div className="mt-16 bg-gradient-to-br from-orange-400 to-primary rounded-2xl p-8 text-center text-white">
        <div className="text-4xl mb-3">📱</div>
        <h2 className="text-2xl font-bold mb-3">{t('campanii_download_title')}</h2>
        <p className="text-white/80 mb-6 max-w-md mx-auto">
          {t('campanii_download_sub')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => setShowComingSoon(true)} className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
          </button>
          <button onClick={() => setShowComingSoon(true)} className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.38.21.82.24 1.23.09l12.5-7.21-2.73-2.72-11 10.84zm16.26-9.38L16.76 12l2.68-2.38-11.44-6.6c-.48-.28-1.04-.27-1.5-.04L17.44 14.38zM2.08 1.76C2.03 1.97 2 2.2 2 2.45v19.1c0 .26.03.49.09.7l11.2-11.02-11.21-9.47zm12.01 11.5L12 12l-9.14 8.98L14.09 13.26z" />
            </svg>
            Google Play
          </button>
        </div>
      </div>
    </div>
  )
}
