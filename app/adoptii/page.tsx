'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import AnimalCard from '@/components/AnimalCard'
import type { Animal } from '@/lib/supabase'
import { useLanguage } from '@/context/LanguageContext'

const SPECIES_OPTIONS = [
  { value: '', label: '' },
  { value: 'dog', label: '🐶 Câini' },
  { value: 'cat', label: '🐱 Pisici' },
  { value: 'rabbit', label: '🐰 Iepuri' },
  { value: 'bird', label: '🐦 Păsări' },
  { value: 'other', label: '🐾 Altele' },
]

const SPECIES_ALIASES: Record<string, string[]> = {
  dog: ['dog', 'caine', 'câine'],
  cat: ['cat', 'pisica', 'pisică'],
  rabbit: ['rabbit', 'iepure'],
  bird: ['bird', 'pasare', 'pasăre'],
}

const COUNTRY_OPTIONS = [
  { value: '', label: '' },
  { value: 'RO', label: '🇷🇴 România' },
  { value: 'MD', label: '🇲🇩 Moldova' },
  { value: 'DE', label: '🇩🇪 Germania' },
  { value: 'AT', label: '🇦🇹 Austria' },
  { value: 'IT', label: '🇮🇹 Italia' },
  { value: 'FR', label: '🇫🇷 Franța' },
  { value: 'ES', label: '🇪🇸 Spania' },
  { value: 'GB', label: '🇬🇧 UK' },
  { value: 'NL', label: '🇳🇱 Olanda' },
  { value: 'BE', label: '🇧🇪 Belgia' },
  { value: 'HU', label: '🇭🇺 Ungaria' },
  { value: 'BG', label: '🇧🇬 Bulgaria' },
]

function getMainPhoto(animal: Animal): string | null {
  if (!animal.animal_photos || animal.animal_photos.length === 0) return null
  const main = animal.animal_photos.find((p) => p.is_primary)
  if (main) return main.url
  const sorted = [...animal.animal_photos].sort((a, b) => a.order_index - b.order_index)
  return sorted[0]?.url ?? null
}

const PAGE_SIZE = 12

export default function AdoptiiPage() {
  const { t } = useLanguage()
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  const [species, setSpecies] = useState('')
  const [country, setCountry] = useState('')
  const [locationSearch, setLocationSearch] = useState('')
  const [locationInput, setLocationInput] = useState('')

  const fetchAnimals = useCallback(
    async (
      pageNum: number,
      speciesFilter: string,
      countryFilter: string,
      locationFilter: string,
      replace: boolean
    ) => {
      const now = new Date().toISOString()
      let query = supabase
        .from('animals')
        .select(`
          id, name, species, breed, age_years, age_months,
          location, status, expires_at, created_at, type, country,
          animal_photos (id, url, is_primary, order_index)
        `)
        // Doar anunțuri de adopție
        .eq('type', 'adoption')
        // Exclude adoptate și neaprobate
        .neq('status', 'adopted')
        .neq('status', 'pending_approval')
        .or(`expires_at.is.null,expires_at.gt.${now}`)
        .order('created_at', { ascending: false })
        .range(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE - 1)

      if (speciesFilter) {
        const aliases = SPECIES_ALIASES[speciesFilter] || [speciesFilter]
        query = query.in('species', aliases)
      }

      if (countryFilter) {
        query = query.eq('country', countryFilter)
      }

      if (locationFilter) {
        query = query.ilike('location', `%${locationFilter}%`)
      }

      const { data, error } = await query

      if (error) {
        console.error('Eroare:', error)
        return
      }

      const result = (data as Animal[]) || []
      setHasMore(result.length === PAGE_SIZE)

      if (replace) {
        setAnimals(result)
      } else {
        setAnimals((prev) => [...prev, ...result])
      }
    },
    []
  )

  useEffect(() => {
    setLoading(true)
    setPage(0)
    fetchAnimals(0, species, country, locationSearch, true).finally(() => setLoading(false))
  }, [species, country, locationSearch, fetchAnimals])

  const handleLoadMore = async () => {
    setLoadingMore(true)
    const nextPage = page + 1
    setPage(nextPage)
    await fetchAnimals(nextPage, species, country, locationSearch, false)
    setLoadingMore(false)
  }

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setLocationSearch(locationInput)
  }

  const hasActiveFilters = species || country || locationSearch

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-main mb-2">
          {t('adoptii_title')}
        </h1>
        <p className="text-text-muted">
          {t('adoptii_subtitle')}
        </p>
      </div>

      {/* Filtre */}
      <div className="bg-white rounded-card shadow-card border border-border-light p-4 mb-8 flex flex-col gap-4">
        {/* Rând 1: Specie + Țară */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Specie */}
          <div className="flex-1">
            <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wide">
              {t('filter_species')}
            </label>
            <div className="flex flex-wrap gap-2">
              {SPECIES_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSpecies(opt.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                    species === opt.value
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-text-main border-border-light hover:border-primary hover:text-primary'
                  }`}
                >
                  {opt.value === '' ? t('filter_all_species') : opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Țară */}
          <div className="sm:w-48">
            <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wide">
              {t('filter_country')}
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-white text-text-main"
            >
              {COUNTRY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.value === '' ? t('filter_all_countries') : opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Rând 2: Locație */}
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="sm:w-72">
            <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wide">
              {t('filter_location')}
            </label>
            <form onSubmit={handleLocationSearch} className="flex gap-2">
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder={t('filter_location_placeholder')}
                className="flex-1 border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
              />
              <button
                type="submit"
                className="bg-primary text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                🔍
              </button>
            </form>
            {locationSearch && (
              <button
                onClick={() => { setLocationSearch(''); setLocationInput('') }}
                className="text-xs text-text-muted hover:text-primary mt-1 transition-colors"
              >
                {t('filter_clear_location')}
              </button>
            )}
          </div>

          {/* Reset toate filtrele */}
          {hasActiveFilters && (
            <button
              onClick={() => {
                setSpecies('')
                setCountry('')
                setLocationSearch('')
                setLocationInput('')
              }}
              className="text-sm text-text-muted hover:text-primary transition-colors underline pb-0.5"
            >
              {t('filter_reset')}
            </button>
          )}
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
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : animals.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-xl font-semibold text-text-main mb-2">
            {t('no_animals_title')}
          </h2>
          <p className="text-text-muted mb-6">
            {t('no_animals_sub')}
          </p>
          <button
            onClick={() => {
              setSpecies('')
              setCountry('')
              setLocationSearch('')
              setLocationInput('')
            }}
            className="text-primary font-semibold hover:underline"
          >
            {t('reset_filters')}
          </button>
        </div>
      ) : (
        <>
          <p className="text-text-muted text-sm mb-4">
            {animals.length} {t('found_animals')}{hasActiveFilters ? ` (${t('found_animals_filtered')})` : ''}
          </p>
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

          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t('loading')}
                  </span>
                ) : (
                  t('load_more')
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
