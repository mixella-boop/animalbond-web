'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { COUNTRIES, SUPPORTED_COUNTRIES } from '@/lib/countries'
import AnimalCard from '@/components/AnimalCard'
import type { Animal } from '@/lib/supabase'
import { useLanguage } from '@/context/LanguageContext'
import { COUNTRY_TO_LANG } from '@/lib/i18n'

function getMainPhoto(animal: Animal): string | null {
  if (!animal.animal_photos || animal.animal_photos.length === 0) return null
  const main = animal.animal_photos.find((p) => p.is_primary)
  if (main) return main.url
  const sorted = [...animal.animal_photos].sort((a, b) => a.order_index - b.order_index)
  return sorted[0]?.url ?? null
}

export default function HomeAnimalsSection() {
  const { t, setLang } = useLanguage()
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)
  const [country, setCountry] = useState('')

  const fetchAnimals = useCallback(async (countryFilter: string) => {
    const now = new Date().toISOString()
    let query = supabase
      .from('animals')
      .select(`
        id, name, species, breed, age_years, age_months,
        location, status, expires_at, created_at, type, country, gender, description,
        animal_photos (id, animal_id, url, is_primary, order_index)
      `)
      .eq('type', 'adoption')
      .neq('status', 'adopted')
      .neq('status', 'pending_approval')
      .or(`expires_at.is.null,expires_at.gt.${now}`)
      .order('created_at', { ascending: false })
      .limit(6)

    if (countryFilter) {
      query = query.eq('country', countryFilter)
    }

    const { data, error } = await query
    if (error) { console.error(error); return }
    setAnimals((data as Animal[]) || [])
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchAnimals(country).finally(() => setLoading(false))
  }, [country, fetchAnimals])

  const selectedCountry = COUNTRIES.find(c => c.code === country)

  return (
    <section className="py-14 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header + filtru */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-main">
              {t('section_animals_title')}
            </h2>
            <p className="text-text-muted mt-1">{t('section_animals_subtitle')}</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value)
                if (e.target.value && COUNTRY_TO_LANG[e.target.value]) setLang(COUNTRY_TO_LANG[e.target.value])
              }}
              className="border border-border-light rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary bg-white text-text-main"
            >
              <option value="">{t('filter_all_countries')}</option>
              {SUPPORTED_COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
            <Link
              href={`/adoptii${country ? `?country=${country}` : ''}`}
              className="hidden sm:block text-primary font-semibold hover:underline text-sm whitespace-nowrap"
            >
              {t('section_animals_see_all')}
            </Link>
          </div>
        </div>

        {/* Rezultate */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-card shadow-card border border-border-light overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : animals.length > 0 ? (
          <>
            {country && (
              <p className="text-text-muted text-sm mb-4">
                {selectedCountry?.flag} {selectedCountry?.name} — {animals.length} {t('found_animals')}
              </p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {animals.map((animal) => (
                <AnimalCard
                  key={animal.id}
                  id={animal.id}
                  name={animal.name}
                  species={animal.species}
                  breed={animal.breed}
                  age_years={animal.age_years}
                  age_months={animal.age_months}
                  location={animal.location}
                  photoUrl={getMainPhoto(animal)}
                  expiresAt={animal.expires_at}
                />
              ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <Link href="/adoptii" className="text-primary font-semibold hover:underline">
                {t('section_animals_see_all')}
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-text-muted">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg">
              {country
                ? `${t('section_animals_empty')} ${selectedCountry?.flag} ${selectedCountry?.name}`
                : t('section_animals_empty')}
            </p>
            <p className="text-sm mt-1">{t('section_animals_empty_sub')}</p>
            {country && (
              <button onClick={() => setCountry('')} className="mt-3 text-primary font-semibold hover:underline text-sm">
                {t('medical_see_all')}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
