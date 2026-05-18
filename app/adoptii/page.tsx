'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import AnimalCard from '@/components/AnimalCard'
import type { Animal } from '@/lib/supabase'
import { useLanguage } from '@/context/LanguageContext'
import { useCountry } from '@/context/CountryContext'
import { COUNTRIES } from '@/lib/countries'
import { LANG_TO_COUNTRIES, COUNTRY_TO_LANG, type Lang } from '@/lib/i18n'

// If the selected country belongs to the current language group (e.g. US for EN,
// PT for PT, AT for DE), expand the filter to all countries in that group.
// This way EN users selecting US also see GB/AU/CA etc.
function expandCountries(country: string, lang: string): string[] {
  if (!country) return []
  const langCountries = LANG_TO_COUNTRIES[lang as Lang]
  if (langCountries && langCountries.includes(country) && langCountries.length > 1) {
    return langCountries
  }
  return [country]
}

const SPECIES_KEYS = [
  { value: '', key: 'filter_all_species' as const },
  { value: 'dog', key: 'species_btn_dogs' as const },
  { value: 'cat', key: 'species_btn_cats' as const },
  { value: 'rabbit', key: 'species_btn_rabbits' as const },
  { value: 'bird', key: 'species_btn_birds' as const },
  { value: 'other', key: 'species_btn_others' as const },
]

const SPECIES_ALIASES: Record<string, string[]> = {
  dog: ['dog', 'caine', 'câine'],
  cat: ['cat', 'pisica', 'pisică'],
  rabbit: ['rabbit', 'iepure'],
  bird: ['bird', 'pasare', 'pasăre'],
}

const TYPE_COLORS: Record<string, { bg: string; border: string; accent: string }> = {
  '':         { bg: '#F3F4F6', border: '#9CA3AF', accent: '#6B7280' },
  adoption:   { bg: '#FFE4E4', border: '#FF6B6B', accent: '#FF6B6B' },
  sale:       { bg: '#FEF3C7', border: '#F59E0B', accent: '#D97706' },
  medical:    { bg: '#EEF2FF', border: '#6366F1', accent: '#6366F1' },
  breeding:   { bg: '#D1FAE5', border: '#10B981', accent: '#059669' },
}

const TYPE_FILTER_KEYS = [
  { value: '', key: 'type_all' as const },
  { value: 'adoption', key: 'type_adoption' as const },
  { value: 'medical', key: 'type_medical' as const },
  { value: 'sale', key: 'type_sale' as const },
  { value: 'breeding', key: 'type_breeding' as const },
]

const COUNTRY_OPTIONS = [
  { value: '', label: '' },
  ...COUNTRIES.map(c => ({ value: c.code, label: `${c.flag} ${c.name}` })),
]

function getMainPhoto(animal: Animal): string | null {
  if (!animal.animal_photos || animal.animal_photos.length === 0) return null
  const main = animal.animal_photos.find((p) => p.is_primary)
  if (main) return main.url
  const sorted = [...animal.animal_photos].sort((a, b) => a.order_index - b.order_index)
  return sorted[0]?.url ?? null
}

const PAGE_SIZE = 12

export default function FeedPage() {
  const { t, lang } = useLanguage()
  const { country, setCountry: setGlobalCountry } = useCountry()
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [lfBanner, setLfBanner] = useState<{ count: number; photos: string[] } | null>(null)

  const [typeFilter, setTypeFilter] = useState('')
  const [species, setSpecies] = useState('')
  const [locationSearch, setLocationSearch] = useState('')
  const [locationInput, setLocationInput] = useState('')

  // Country search dropdown
  const [countrySearch, setCountrySearch] = useState('')
  const [countryOpen, setCountryOpen] = useState(false)
  const countryRef = useRef<HTMLDivElement>(null)
  const countryInputRef = useRef<HTMLInputElement>(null)

  const filteredCountries = COUNTRIES.filter(c =>
    COUNTRY_TO_LANG[c.code] !== undefined && (
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.toLowerCase().includes(countrySearch.toLowerCase())
    )
  )

  const selectedCountryObj = COUNTRIES.find(c => c.code === country)


  // Auto-focus input când se deschide dropdown-ul
  useEffect(() => {
    if (countryOpen) {
      setTimeout(() => countryInputRef.current?.focus(), 50)
    }
  }, [countryOpen])

  // Închide dropdown la click afară
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectCountry = (code: string) => {
    setGlobalCountry(code)
    setCountrySearch('')
    setCountryOpen(false)
  }

  // Fetch banner lost/found (count + 2 poze preview) — filtrat după țara selectată
  useEffect(() => {
    const now = new Date().toISOString()
    const fetchBanner = async () => {
      let countQ = supabase
        .from('animals')
        .select('id', { count: 'exact', head: true })
        .in('type', ['lost', 'found'])
        .eq('status', 'available')
        .or(`expires_at.is.null,expires_at.gt.${now}`)
      let photoQ = supabase
        .from('animals')
        .select('id, animal_photos (url, is_primary)')
        .in('type', ['lost', 'found'])
        .eq('status', 'available')
        .or(`expires_at.is.null,expires_at.gt.${now}`)
        .order('created_at', { ascending: false })
        .limit(2)

      if (country) {
        const countries = expandCountries(country, lang)
        countQ = countQ.in('country', countries)
        photoQ = photoQ.in('country', countries)
      }

      const [countRes, photoRes] = await Promise.all([countQ, photoQ])
      const count = countRes.count ?? 0
      const photos: string[] = ((photoRes.data as any[]) || []).flatMap((a: any) => {
        const arr: { url: string; is_primary: boolean }[] = a.animal_photos || []
        const url = arr.find(p => p.is_primary)?.url || arr[0]?.url
        return url ? [url] : []
      })
      setLfBanner(count > 0 ? { count, photos } : null)
    }
    fetchBanner()
  }, [country, lang])

  const fetchAnimals = useCallback(
    async (
      pageNum: number,
      typeF: string,
      speciesFilter: string,
      countryFilter: string,
      langFilter: string,
      locationFilter: string,
      replace: boolean
    ) => {
      const now = new Date().toISOString()
      let query = supabase
        .from('animals')
        .select(`
          id, name, species, breed, age_years, age_months,
          location, status, expires_at, created_at, type, country, gender, description,
          animal_photos (id, animal_id, url, is_primary, order_index)
        `)
        .eq('status', 'available')
        .not('type', 'in', '("lost","found")')
        .or(`expires_at.is.null,expires_at.gt.${now}`)
        .order('created_at', { ascending: true })
        .range(pageNum * PAGE_SIZE, (pageNum + 1) * PAGE_SIZE - 1)

      if (typeF) {
        query = query.eq('type', typeF)
      }

      if (speciesFilter) {
        const aliases = SPECIES_ALIASES[speciesFilter] || [speciesFilter]
        query = query.in('species', aliases)
      }

      if (countryFilter) {
        const countries = expandCountries(countryFilter, langFilter)
        query = query.in('country', countries)
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
    fetchAnimals(0, typeFilter, species, country, lang, locationSearch, true).finally(() => setLoading(false))
  }, [typeFilter, species, country, lang, locationSearch, fetchAnimals])

  const handleLoadMore = async () => {
    setLoadingMore(true)
    const nextPage = page + 1
    setPage(nextPage)
    await fetchAnimals(nextPage, typeFilter, species, country, lang, locationSearch, false)
    setLoadingMore(false)
  }

  const handleLocationSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setLocationSearch(locationInput)
  }

  const hasActiveFilters = typeFilter || species || country || locationSearch

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-main mb-2">
          {t('feed_title')}
        </h1>
        <p className="text-text-muted">
          {t('feed_subtitle')}
        </p>
      </div>

      {/* Filtre */}
      <div className="bg-white rounded-card shadow-card border border-border-light p-4 mb-8 flex flex-col gap-4">

        {/* Rând 0: Tip anunț */}
        <div>
          <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wide">
            Tip
          </label>
          <div className="flex flex-wrap gap-2">
            {TYPE_FILTER_KEYS.map((opt) => {
              const tc = TYPE_COLORS[opt.value]
              const isActive = typeFilter === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => setTypeFilter(opt.value)}
                  style={{
                    backgroundColor: isActive ? tc.accent : tc.bg,
                    borderColor: tc.accent,
                    color: isActive ? '#fff' : tc.accent,
                  }}
                  className="px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors"
                >
                  {t(opt.key)}
                </button>
              )
            })}
          </div>
        </div>

        {/* Rând 1: Specie + Țară */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Specie */}
          <div className="flex-1">
            <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wide">
              {t('filter_species')}
            </label>
            <div className="flex flex-wrap gap-2">
              {SPECIES_KEYS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSpecies(opt.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                    species === opt.value
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-text-main border-border-light hover:border-primary hover:text-primary'
                  }`}
                >
                  {t(opt.key)}
                </button>
              ))}
            </div>
          </div>

          {/* Țară — dropdown cu căutare */}
          <div className="sm:w-56" ref={countryRef}>
            <label className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wide">
              🌍 {t('filter_country')}
            </label>
            <div className="relative">
              {/* Trigger */}
              {country && !countryOpen ? (
                <div className="flex items-center gap-2 w-full border-2 border-primary rounded-lg px-3 py-2 bg-primary/5 cursor-pointer" onClick={() => { setCountrySearch(''); setCountryOpen(true) }}>
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

              {/* Dropdown lista */}
              {countryOpen && (
                <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-border-light rounded-xl shadow-lg max-h-56 overflow-y-auto">
                  <button
                    onClick={() => handleSelectCountry('')}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${!country ? 'font-semibold text-primary' : 'text-text-muted'}`}
                  >
                    🌍 {t('filter_all_countries')}
                  </button>
                  {filteredCountries.length === 0 ? (
                    <p className="px-3 py-2 text-sm text-text-muted">Nicio țară găsită</p>
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
                setTypeFilter('')
                setSpecies('')
                setGlobalCountry('')
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

      {/* Banner Lost/Found */}
      {lfBanner && (
        <Link
          href="/pierdute-gasite"
          className="flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl shadow-card border border-red-100 p-4 mb-6 hover:shadow-card-hover transition-all group"
        >
          <div className="flex gap-2 shrink-0">
            {lfBanner.photos.length > 0 ? (
              lfBanner.photos.map((url, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={url} alt="" className="w-12 h-12 rounded-xl object-cover border-2 border-red-100" />
              ))
            ) : (
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-xl border-2 border-red-100">🐾</div>
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-bold text-text-main text-sm sm:text-base group-hover:text-primary transition-colors">
              {t('lf_home_title')}
            </p>
            <p className="text-text-muted text-xs sm:text-sm mt-0.5">
              {t('lf_home_count').replace('{count}', String(lfBanner.count))}
            </p>
          </div>
          <span className="shrink-0 text-primary font-semibold text-sm group-hover:underline">
            {t('lf_home_btn')}
          </span>
        </Link>
      )}

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
              setTypeFilter('')
              setSpecies('')
              setGlobalCountry('')
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
                type={animal.type}
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
