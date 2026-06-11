'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { COUNTRIES, SUPPORTED_COUNTRIES } from '@/lib/countries'
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

type MedicalAnimal = {
  id: string
  name: string
  species: string
  breed: string | null
  location: string | null
  description: string | null
  status: string
  expires_at: string | null
  created_at: string
  country: string | null
  animal_photos: { url: string; is_primary: boolean }[]
}

const speciesEmoji: Record<string, string> = {
  dog: '🐶', cat: '🐱', rabbit: '🐰', bird: '🐦', other: '🐾',
  caine: '🐶', pisica: '🐱', iepure: '🐰', pasare: '🐦', altele: '🐾',
}

function getMainPhoto(animal: MedicalAnimal): string | null {
  if (!animal.animal_photos?.length) return null
  return animal.animal_photos.find(p => p.is_primary)?.url
    || animal.animal_photos[0]?.url
    || null
}

export default function AjutorMedicalPage() {
  const { t } = useLanguage()
  const { country, setCountry } = useCountry()
  const [animals, setAnimals] = useState<MedicalAnimal[]>([])
  const [loading, setLoading] = useState(true)
  const [showComingSoon, setShowComingSoon] = useState(false)

  const fetchAnimals = useCallback(async (countryFilter: string) => {
    const now = new Date().toISOString()
    let query = supabase
      .from('animals')
      .select('id, name, species, breed, location, description, status, expires_at, created_at, country, animal_photos (url, is_primary)')
      .eq('type', 'medical')
      .neq('status', 'adopted')
      .neq('status', 'pending_approval')
      .or(`expires_at.is.null,expires_at.gt.${now}`)
      .order('created_at', { ascending: true })

    if (countryFilter) {
      query = query.eq('country', countryFilter)
    }

    const { data, error } = await query
    if (error) { console.error(error); return }
    setAnimals((data as MedicalAnimal[]) || [])
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchAnimals(country).finally(() => setLoading(false))
  }, [country, fetchAnimals])

  const selectedCountry = COUNTRIES.find(c => c.code === country)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {showComingSoon && <ComingSoonModal onClose={() => setShowComingSoon(false)} />}
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">💊</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-main mb-3">
          {t('medical_title')}
        </h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto mb-6">
          {t('medical_subtitle')}
        </p>
        <button
          onClick={() => setShowComingSoon(true)}
          className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-colors shadow-lg"
        >
          {t('medical_cta')}
        </button>
      </div>

      {/* Banner urgent */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
        <span className="text-2xl shrink-0">🚨</span>
        <p className="text-red-800 text-sm leading-relaxed">
          <strong>{t('medical_banner')}</strong> {t('medical_banner_sub')}
        </p>
      </div>

      {/* Filtru țară */}
      <div className="bg-white rounded-card shadow-card border border-border-light p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <label className="text-xs font-semibold text-text-muted uppercase tracking-wide shrink-0">
          {t('medical_filter_label')}
        </label>
        <div className="flex items-center gap-3 flex-1">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-white text-text-main"
          >
            <option value="">{t('filter_all_countries')}</option>
            {SUPPORTED_COUNTRIES.map((c) => (
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
        {country && (
          <p className="text-sm text-text-muted">
            {t('filter_cases_from')} {selectedCountry?.flag} {selectedCountry?.name}
          </p>
        )}
      </div>

      {/* Grid animale */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-card shadow-card border border-red-100 overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-gray-200" />
              <div className="p-4 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-16 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : animals.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">💚</div>
          <h2 className="text-xl font-semibold text-text-main mb-2">{t('medical_empty_title')}</h2>
          <p className="text-text-muted">
            {country ? t('medical_empty_country') : t('medical_empty_sub')}
          </p>
          {country && (
            <button onClick={() => setCountry('')} className="mt-4 text-primary font-semibold hover:underline text-sm">
              {t('medical_see_all')}
            </button>
          )}
        </div>
      ) : (
        <>
          <p className="text-text-muted text-sm mb-6">
            {animals.length} {animals.length === 1 ? t('medical_active_case') : t('medical_active_cases')}
            {country && ` ${t('medical_in_country')} ${selectedCountry?.flag} ${selectedCountry?.name}`}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {animals.map((animal) => {
              const photo = getMainPhoto(animal)
              const emoji = speciesEmoji[animal.species?.toLowerCase()] || '🐾'
              return (
                <Link
                  key={animal.id}
                  href={`/animal/${animal.id}`}
                  className="bg-white rounded-card shadow-card border border-indigo-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all block cursor-pointer group"
                  style={{ borderTop: '5px solid #6366F1' }}
                >
                  <div className="relative aspect-[4/3] bg-indigo-50">
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photo} alt={animal.name} className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300" style={{ backgroundColor: '#FBEFEE' }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">{emoji}</div>
                    )}
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {t('medical_badge')}
                    </div>
                    {animal.country && (
                      <div className="absolute top-2 right-2 bg-white/90 text-xs font-bold px-2 py-1 rounded-full">
                        {COUNTRIES.find(c => c.code === animal.country)?.flag || animal.country}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-text-main text-lg mb-1 group-hover:text-indigo-600 transition-colors">{animal.name}</h3>
                    {animal.breed && <p className="text-text-muted text-sm mb-1">{animal.breed}</p>}
                    {animal.location && <p className="text-text-muted text-sm mb-2">📍 {animal.location}</p>}
                    {animal.description && (
                      <p className="text-text-main text-sm leading-relaxed line-clamp-3 mb-3">
                        {animal.description}
                      </p>
                    )}
                    <span className="block text-center bg-indigo-600 group-hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors">
                      {t('medical_help_btn')} →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </>
      )}

      {/* CTA download */}
      <div id="download-app" className="mt-16 bg-gradient-to-br from-red-500 to-primary rounded-2xl p-8 text-center text-white">
        <div className="text-4xl mb-3">📱</div>
        <h2 className="text-2xl font-bold mb-3">{t('medical_download_title')}</h2>
        <p className="text-white/80 mb-6 max-w-md mx-auto">
          {t('medical_download_sub')}
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
