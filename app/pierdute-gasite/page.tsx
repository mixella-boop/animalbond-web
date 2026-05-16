'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { COUNTRIES } from '@/lib/countries'
import { useLanguage } from '@/context/LanguageContext'
import { useCountry } from '@/context/CountryContext'

function ComingSoonModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage()
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="text-5xl mb-4">🚀</div>
        <h3 className="text-xl font-bold text-text-main mb-2">{t('coming_soon')}</h3>
        <p className="text-text-muted text-sm leading-relaxed mb-6">{t('coming_soon_desc')}</p>
        <button onClick={onClose} className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary-dark transition-colors">OK</button>
      </div>
    </div>
  )
}

type LostFoundAnimal = {
  id: string
  name: string
  species: string
  breed: string | null
  type: 'lost' | 'found'
  location: string | null
  last_seen_location: string | null
  lost_found_date: string | null
  description: string | null
  status: string
  expires_at: string | null
  created_at: string
  country: string | null
  animal_photos: { url: string; is_primary: boolean }[]
}

const speciesEmoji: Record<string, string> = {
  dog: '🐶', cat: '🐱', rabbit: '🐰', bird: '🐦', other: '🐾',
}

function getMainPhoto(animal: LostFoundAnimal): string | null {
  if (!animal.animal_photos?.length) return null
  return animal.animal_photos.find(p => p.is_primary)?.url
    || animal.animal_photos[0]?.url
    || null
}

export default function PierduteGasitePage() {
  const { t } = useLanguage()
  const { country, setCountry } = useCountry()
  const [animals, setAnimals] = useState<LostFoundAnimal[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<'all' | 'lost' | 'found'>('all')
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  const fetchAnimals = useCallback(async (countryFilter: string) => {
    const now = new Date().toISOString()
    let query = supabase
      .from('animals')
      .select('id, name, species, breed, type, location, last_seen_location, lost_found_date, description, status, expires_at, created_at, country, animal_photos (url, is_primary)')
      .in('type', ['lost', 'found'])
      .eq('status', 'available')
      .or(`expires_at.is.null,expires_at.gt.${now}`)
      .order('created_at', { ascending: true })

    if (countryFilter) {
      query = query.eq('country', countryFilter)
    }

    const { data, error } = await query
    if (error) { console.error(error); return }
    setAnimals((data as LostFoundAnimal[]) || [])
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchAnimals(country).finally(() => setLoading(false))
  }, [country, fetchAnimals])

  const selectedCountry = COUNTRIES.find(c => c.code === country)
  const filtered = typeFilter === 'all' ? animals : animals.filter(a => a.type === typeFilter)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {showComingSoon && <ComingSoonModal onClose={() => setShowComingSoon(false)} />}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-main mb-3">
          {t('lf_page_title')}
        </h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto mb-6">
          {t('lf_page_subtitle')}
        </p>
        <button
          onClick={() => setShowComingSoon(true)}
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg"
        >
          {t('lf_page_cta')}
        </button>
      </div>

      {/* Banner info */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
        <span className="text-2xl shrink-0">📱</span>
        <p className="text-blue-800 text-sm leading-relaxed">
          {t('lf_page_banner')}
        </p>
      </div>

      {/* Filtre */}
      <div className="bg-white rounded-card shadow-card border border-border-light p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap">
        {/* Filtru tip */}
        <div className="flex gap-2">
          {(['all', 'lost', 'found'] as const).map(f => (
            <button
              key={f}
              onClick={() => setTypeFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                typeFilter === f
                  ? f === 'lost' ? 'bg-red-500 text-white' : f === 'found' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? `🌐 ${t('lf_filter_all')}` : f === 'lost' ? `🔍 ${t('lf_filter_lost')}` : `🐾 ${t('lf_filter_found')}`}
            </button>
          ))}
        </div>

        {/* Filtru țară */}
        <div className="flex items-center gap-3 flex-1 sm:justify-end">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-white text-text-main"
          >
            <option value="">{t('filter_all_countries')}</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
          {country && (
            <button
              onClick={() => setCountry('')}
              className="text-xs text-text-muted hover:text-primary transition-colors underline"
            >
              {t('filter_clear')}
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-card shadow-card border border-blue-100 overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-16 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-text-main mb-2">{t('lf_empty_title')}</h2>
          <p className="text-text-muted">
            {country ? t('lf_empty_country') : t('lf_empty_desc')}
          </p>
          {country && (
            <button onClick={() => setCountry('')} className="mt-4 text-primary font-semibold hover:underline text-sm">
              {t('lf_see_all')}
            </button>
          )}
        </div>
      ) : (
        <>
          <p className="text-text-muted text-sm mb-6">
            {filtered.length} {t('lf_count_label')}
            {country && ` — ${selectedCountry?.flag} ${selectedCountry?.name}`}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((animal) => {
              const photo = getMainPhoto(animal)
              const emoji = speciesEmoji[animal.species?.toLowerCase()] || '🐾'
              const isLost = animal.type === 'lost'
              const badgeColor = isLost ? '#E53935' : '#2E7D32'
              const badgeBg = isLost ? '#FFCDD2' : '#C8E6C9'
              const badgeText = isLost ? t('lf_badge_lost') : t('lf_badge_found')
              const borderColor = isLost ? '#EF9A9A' : '#A5D6A7'
              return (
                <Link
                  key={animal.id}
                  href={`/animal/${animal.id}`}
                  className="bg-white rounded-card shadow-card overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all block cursor-pointer group"
                  style={{ border: `2px solid ${borderColor}`, borderTop: `5px solid ${badgeColor}` }}
                >
                  <div className="relative aspect-[4/3]" style={{ backgroundColor: isLost ? '#FFF3F3' : '#F1FFF1' }}>
                    {/* Badge */}
                    <div
                      className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold z-10"
                      style={{ backgroundColor: badgeBg, color: badgeColor }}
                    >
                      {badgeText}
                    </div>
                    {photo && !imgErrors[animal.id] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={photo}
                        alt={animal.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        onError={() => setImgErrors(prev => ({ ...prev, [animal.id]: true }))}
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-6xl">
                        {emoji}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-text-main text-lg mb-1">{animal.name}</h3>
                    {animal.breed && (
                      <p className="text-text-muted text-sm mb-1">{animal.breed}</p>
                    )}
                    {(animal.last_seen_location || animal.location) && (
                      <p className="text-text-muted text-sm flex items-center gap-1 mb-1">
                        <span>📍</span> {animal.last_seen_location || animal.location}
                      </p>
                    )}
                    {animal.lost_found_date && (
                      <p className="text-text-muted text-sm flex items-center gap-1 mb-2">
                        <span>📅</span> {animal.lost_found_date}
                      </p>
                    )}
                    {animal.description && (
                      <p className="text-text-muted text-sm line-clamp-2 mb-3">{animal.description}</p>
                    )}
                    <button
                      onClick={(e) => { e.preventDefault(); setShowComingSoon(true) }}
                      className="w-full text-center py-2 rounded-lg text-sm font-semibold text-white transition-colors"
                      style={{ backgroundColor: isLost ? '#E53935' : '#2E7D32' }}
                    >
                      📱 {t('lf_contact_btn')}
                    </button>
                  </div>
                </Link>
              )
            })}
          </div>
        </>
      )}

      {/* Banner descărcare app */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
        <div className="text-4xl mb-3">📱</div>
        <h3 className="text-xl font-bold mb-2">{t('lf_download_title')}</h3>
        <p className="text-blue-100 text-sm mb-4">{t('lf_download_sub')}</p>
        <button
          onClick={() => setShowComingSoon(true)}
          className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
        >
          {t('nav_download')}
        </button>
      </div>
    </div>
  )
}
