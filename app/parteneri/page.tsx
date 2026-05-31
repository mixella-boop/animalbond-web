'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Partner } from '@/lib/supabase'
import { useLanguage } from '@/context/LanguageContext'
import { useCountry } from '@/context/CountryContext'
import { COUNTRIES } from '@/lib/countries'
import { getCitiesForCountry } from '@/lib/citiesByCountry'

function distKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const categoryColor: Record<string, string> = {
  vet: 'bg-blue-100 text-blue-700',
  food: 'bg-orange-100 text-orange-700',
  accessories: 'bg-green-100 text-green-700',
  insurance: 'bg-purple-100 text-purple-700',
  other: 'bg-gray-100 text-gray-700',
}

export default function ParteneriPage() {
  const { t } = useLanguage()
  const { country, setCountry: setGlobalCountry } = useCountry()
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null)
  const [cityName, setCityName] = useState('')
  const cities = getCitiesForCountry(country || 'RO')
  useEffect(() => { setCityName('') }, [country])

  // Country search dropdown
  const [countrySearch, setCountrySearch] = useState('')
  const [countryOpen, setCountryOpen] = useState(false)
  const countryRef = useRef<HTMLDivElement>(null)
  const countryInputRef = useRef<HTMLInputElement>(null)
  const filteredCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    c.code.toLowerCase().includes(countrySearch.toLowerCase())
  )
  const selectedCountryObj = COUNTRIES.find(c => c.code === country)

  useEffect(() => {
    if (countryOpen) setTimeout(() => countryInputRef.current?.focus(), 50)
  }, [countryOpen])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) setCountryOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectCountry = (code: string) => {
    setGlobalCountry(code)
    setCountrySearch('')
    setCountryOpen(false)
  }

  const CATEGORY_OPTIONS = [
    { value: '', label: t('partners_cat_all') },
    { value: 'vet', label: t('partners_cat_vet') },
    { value: 'food', label: t('partners_cat_food') },
    { value: 'accessories', label: t('partners_cat_accessories') },
    { value: 'insurance', label: t('partners_cat_insurance') },
    { value: 'other', label: t('partners_cat_other') },
  ]

  const categoryLabel: Record<string, string> = {
    vet: t('partners_label_vet'),
    food: t('partners_label_food'),
    accessories: t('partners_label_accessories'),
    insurance: t('partners_label_insurance'),
    other: t('partners_label_other'),
  }

  useEffect(() => {
    async function fetchPartners() {
      setLoading(true)

      let query = supabase
        .from('partners')
        .select('id, name, category, city, country, description, logo_url, url, phone, email, is_active, lat, lng')
        .eq('is_active', true)
        .order('name', { ascending: true })

      if (category) query = query.eq('category', category)
      if (country) query = query.or(`country.eq.${country},country.is.null`)

      const { data, error } = await query

      if (error) {
        console.error('Eroare parteneri:', error)
        setPartners([])
      } else {
        setPartners((data as unknown as Partner[]) || [])
      }
      setLoading(false)
    }

    fetchPartners()
  }, [category, country])

  const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
  const cityObj = cityName ? cities.find((c) => c.name === cityName) : null
  const displayed = !cityObj ? partners : partners.filter((p) => {
    // ORAȘUL (coloana city) PRIMEAZĂ față de GPS
    const pc = (p as any).city as string | null
    const pcn = pc ? norm(pc) : ''
    if (pcn && pcn === norm(cityObj.name)) return true              // oraș = ales → arată
    if (pcn && pcn !== 'altele' && pcn !== 'other') return false    // oraș = alt oraș → ascunde (text primează)
    // fără oraș (sau "Altele") → folosim GPS
    const la = (p as any).lat, ln = (p as any).lng
    if (la != null && ln != null && distKm(cityObj.lat, cityObj.lng, la, ln) <= 40) return true
    if (la != null && ln != null) return false
    return true
  })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-main mb-3">
          {t('partners_title')}
        </h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto">
          {t('partners_subtitle')}
        </p>
      </div>

      {/* Filtre */}
      <div className="bg-white rounded-card shadow-card border border-border-light p-4 mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Categorie */}
        <div className="flex flex-wrap gap-2 flex-1">
          {CATEGORY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setCategory(opt.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                category === opt.value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-text-main border-border-light hover:border-primary hover:text-primary'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Țară */}
        <div className="sm:w-52 shrink-0" ref={countryRef}>
          <div className="relative">
            {country && !countryOpen ? (
              <div
                className="flex items-center gap-2 w-full border-2 border-primary rounded-lg px-3 py-2 bg-primary/5 cursor-pointer"
                onClick={() => { setCountrySearch(''); setCountryOpen(true) }}
              >
                <span className="text-base">{selectedCountryObj?.flag}</span>
                <span className="text-sm font-semibold text-primary flex-1">{selectedCountryObj?.name}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleSelectCountry('') }}
                  className="text-primary hover:text-primary-dark font-bold text-lg leading-none"
                >×</button>
              </div>
            ) : (
              <div className="relative flex items-center border-2 border-border-light rounded-lg bg-white focus-within:border-primary transition-colors">
                <span className="pl-3 text-text-muted shrink-0">🔍</span>
                <input
                  ref={countryInputRef}
                  type="text"
                  value={countrySearch}
                  onChange={(e) => { setCountrySearch(e.target.value); setCountryOpen(true) }}
                  onFocus={() => setCountryOpen(true)}
                  placeholder={t('filter_search_country')}
                  className="flex-1 min-w-0 px-2 py-2 text-sm bg-transparent outline-none text-text-main placeholder:text-text-muted pr-7"
                />
                {countrySearch && (
                  <button
                    onClick={() => setCountrySearch('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 text-base leading-none"
                  >×</button>
                )}
              </div>
            )}

            {countryOpen && (
              <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-border-light rounded-xl shadow-lg max-h-56 overflow-y-auto">
                <button
                  onClick={() => handleSelectCountry('')}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${!country ? 'font-semibold text-primary' : 'text-text-muted'}`}
                >
                  🌍 {t('filter_all_countries')}
                </button>
                {filteredCountries.length === 0 ? (
                  <p className="px-3 py-2 text-sm text-text-muted">{t('partner_no_country')}</p>
                ) : filteredCountries.map(c => (
                  <button
                    key={c.code}
                    onClick={() => handleSelectCountry(c.code)}
                    className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-primary/5 transition-colors ${country === c.code ? 'bg-primary/10 font-semibold text-primary' : 'text-text-main'}`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Oraș */}
        <div className="w-full sm:w-56">
          <select
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className="w-full border-2 border-border-light rounded-lg px-3 py-2 text-sm bg-white text-text-main outline-none focus:border-primary transition-colors cursor-pointer"
          >
            <option value="">{t('filter_all_cities')}</option>
            {cities.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista parteneri */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-card shadow-card border border-border-light p-5 animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-xl mb-4" />
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      ) : displayed.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-text-muted text-lg">
            {category || country ? t('partners_empty_cat') : t('partners_empty')}
          </p>
          {(category || country) && (
            <button
              onClick={() => { setCategory(''); setGlobalCountry('') }}
              className="mt-4 text-primary font-semibold hover:underline"
            >
              {t('partners_show_all')}
            </button>
          )}
        </div>
      ) : (
        <>
          <p className="text-text-muted text-sm mb-4 text-center">
            {displayed.length} {category ? t('partners_count_cat') : t('partners_count_active')}
            {selectedCountryObj && ` · ${selectedCountryObj.flag} ${selectedCountryObj.name}`}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((partner) => (
              <button
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="bg-white rounded-card shadow-card border border-border-light p-5 hover:shadow-card-hover hover:-translate-y-1 transition-all flex flex-col text-left w-full cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-pink-50 border border-border-light shrink-0 flex items-center justify-center">
                    {partner.logo_url ? (
                      <Image src={partner.logo_url} alt={partner.name} fill className="object-contain p-1" />
                    ) : (
                      <span className="text-2xl">🤝</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-bold text-text-main text-base leading-tight truncate">{partner.name}</h2>
                    <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${categoryColor[partner.category] || 'bg-gray-100 text-gray-700'}`}>
                      {categoryLabel[partner.category] || partner.category}
                    </span>
                    {partner.city && <p className="text-text-muted text-xs mt-1">📍 {partner.city}</p>}
                  </div>
                </div>

                {partner.description && (
                  <p className="text-text-muted text-sm leading-relaxed flex-1 mb-3 line-clamp-3">
                    {partner.description}
                  </p>
                )}

                <span className="mt-auto text-primary font-semibold text-sm group-hover:underline">
                  {t('partners_see_details')} →
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Modal detaliu partener */}
      {selectedPartner && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setSelectedPartner(null)}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo area */}
            <div className="h-52 bg-pink-50 flex items-center justify-center rounded-t-3xl sm:rounded-t-2xl border-b border-border-light">
              {selectedPartner.logo_url ? (
                <Image
                  src={selectedPartner.logo_url}
                  alt={selectedPartner.name}
                  width={200}
                  height={160}
                  className="object-contain max-h-40"
                />
              ) : (
                <span className="text-7xl">🤝</span>
              )}
            </div>

            <div className="p-6">
              {/* Header: Nume + Close */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-text-main leading-tight">{selectedPartner.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedPartner(null)}
                  className="shrink-0 text-text-muted hover:text-text-main text-2xl leading-none mt-0.5"
                >×</button>
              </div>

              {/* Meta info: Categorie + Locație */}
              <div className="flex flex-wrap items-center gap-2 mb-5 pb-5 border-b border-border-light">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColor[selectedPartner.category] || 'bg-gray-100 text-gray-700'}`}>
                  {categoryLabel[selectedPartner.category] || selectedPartner.category}
                </span>
                {selectedPartner.city && (
                  <span className="text-text-muted text-xs flex items-center gap-1">
                    <span>📍</span> {selectedPartner.city}
                  </span>
                )}
                {selectedPartner.country && (
                  <span className="text-text-muted text-xs flex items-center gap-1">
                    <span>{COUNTRIES.find(c => c.code === selectedPartner.country)?.flag || '🌍'}</span>
                    {COUNTRIES.find(c => c.code === selectedPartner.country)?.name || selectedPartner.country}
                  </span>
                )}
              </div>

              {/* About section */}
              {selectedPartner.description && (
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
                    {t('partners_about') || 'Despre'}
                  </h3>
                  <p className="text-text-main text-sm leading-relaxed text-justify">
                    {selectedPartner.description}
                  </p>
                </div>
              )}

              {/* Contact section */}
              {(selectedPartner.phone || selectedPartner.email) && (
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">
                    {t('partners_contact_info') || 'Contact'}
                  </h3>
                  <div className="space-y-2">
                    {selectedPartner.phone && (
                      <a
                        href={`tel:${selectedPartner.phone}`}
                        className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-blue-700 text-sm hover:text-blue-800 font-medium"
                      >
                        <span className="text-lg">📞</span>
                        <span className="break-all">{selectedPartner.phone}</span>
                      </a>
                    )}
                    {selectedPartner.email && (
                      <a
                        href={`mailto:${selectedPartner.email}`}
                        className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-blue-700 text-sm hover:text-blue-800 font-medium"
                      >
                        <span className="text-lg">📧</span>
                        <span className="break-all">{selectedPartner.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Website section */}
              {selectedPartner.url && (
                <div className="mb-6">
                  <a
                    href={selectedPartner.url.startsWith('http://') || selectedPartner.url.startsWith('https://') ? selectedPartner.url : `https://${selectedPartner.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-dark text-white px-6 py-3.5 rounded-xl font-bold transition-all hover:shadow-lg active:scale-95"
                  >
                    <span>🌐</span>
                    {t('partners_visit_site') || 'Vizitează website'}
                  </a>
                </div>
              )}

              {/* Close button */}
              <button
                onClick={() => setSelectedPartner(null)}
                className="w-full text-text-muted text-sm hover:text-primary transition-colors py-2.5 font-medium"
              >
                {t('campanii_close')} ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Banner devino partener */}
      <div className="mt-16 bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 text-center text-white">
        <div className="text-4xl mb-3">🏥</div>
        <h2 className="text-2xl font-bold mb-3">{t('partners_cta_title')}</h2>
        <p className="text-white/80 mb-6 max-w-lg mx-auto">
          {t('partners_cta_sub')}
        </p>
        <Link
          href="/partner-apply"
          className="inline-block bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-pink-50 transition-colors"
        >
          {t('partners_cta_btn')}
        </Link>
      </div>
    </div>
  )
}
