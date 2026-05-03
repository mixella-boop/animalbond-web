'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import type { Animal, AnimalPhoto } from '@/lib/supabase'
import AnimalGallery from './AnimalGallery'

type Props = {
  animal: Animal
}

function getSortedPhotos(photos?: AnimalPhoto[]): AnimalPhoto[] {
  if (!photos || photos.length === 0) return []
  return [...photos].sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1
    if (!a.is_primary && b.is_primary) return 1
    return a.order_index - b.order_index
  })
}

const SPECIES_EMOJI: Record<string, string> = {
  dog: '🐶', cat: '🐱', rabbit: '🐰', bird: '🐦',
  hamster: '🐹', other: '🐾',
  caine: '🐶', pisica: '🐱', iepure: '🐰', pasare: '🐦', altele: '🐾',
}

const SPECIES_KEY_MAP: Record<string, string> = {
  dog: 'species_dog', caine: 'species_dog', câine: 'species_dog',
  cat: 'species_cat', pisica: 'species_cat', pisică: 'species_cat',
  rabbit: 'species_rabbit', iepure: 'species_rabbit',
  bird: 'species_bird', pasare: 'species_bird', pasăre: 'species_bird',
  hamster: 'species_hamster',
  other: 'species_other', altele: 'species_other', alta: 'species_other',
}

const TYPE_COLOR: Record<string, string> = {
  adoption: '#FF6B6B',
  sale:     '#F59E0B',
  medical:  '#6366F1',
  breeding: '#10B981',
}

const TYPE_BG: Record<string, string> = {
  adoption: 'from-pink-50 to-red-50',
  sale:     'from-yellow-50 to-amber-50',
  medical:  'from-indigo-50 to-purple-50',
  breeding: 'from-emerald-50 to-green-50',
}

const TYPE_BORDER: Record<string, string> = {
  adoption: 'border-primary/20',
  sale:     'border-amber-200',
  medical:  'border-indigo-200',
  breeding: 'border-emerald-200',
}

// Coming Soon modal component
function ComingSoonModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage()
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-5xl mb-4">🚀</div>
        <h3 className="text-xl font-bold text-text-main mb-2">{t('coming_soon')}</h3>
        <p className="text-text-muted text-sm leading-relaxed mb-6">{t('coming_soon_desc')}</p>
        <button
          onClick={onClose}
          className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary-dark transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default function AnimalDetailClient({ animal }: Props) {
  const { t } = useLanguage()
  const [showComingSoon, setShowComingSoon] = useState(false)

  const photos = getSortedPhotos(animal.animal_photos)
  const isExpired = !!(animal.expires_at && new Date(animal.expires_at) < new Date())
  const isAdopted = animal.status === 'adopted'
  const species = animal.species?.toLowerCase() ?? ''
  const emoji = SPECIES_EMOJI[species] || '🐾'
  const location = animal.location || ''
  const animalType = animal.type ?? 'adoption'

  const speciesKey = SPECIES_KEY_MAP[species]
  const speciesLabel = speciesKey ? t(speciesKey as any) : animal.species || ''

  const sexRaw = animal.gender?.toLowerCase() || ''
  let sexLabel: string
  if (sexRaw === 'male' || sexRaw === 'm' || sexRaw === 'mascul') {
    sexLabel = t('animal_sex_male')
  } else if (sexRaw === 'female' || sexRaw === 'f' || sexRaw === 'femela' || sexRaw === 'femelă') {
    sexLabel = t('animal_sex_female')
  } else {
    sexLabel = t('animal_sex_unknown')
  }

  function formatAge(years?: number | null, months?: number | null): string {
    if (!years && !months) return t('animal_age_unknown')
    if (years && years > 0) {
      return `${years} ${years === 1 ? t('card_age_year') : t('card_age_years')}`
    }
    if (months && months > 0) {
      return `${months} ${months === 1 ? t('card_age_month') : t('card_age_months')}`
    }
    return t('animal_age_unknown')
  }

  let statusLabel: string
  if (isAdopted) statusLabel = t('animal_status_adopted')
  else if (isExpired) statusLabel = t('animal_status_expired')
  else statusLabel = t('animal_status_available')

  // Helper: replace {name} in translation strings
  const tn = (key: Parameters<typeof t>[0]) =>
    t(key).replace(/\{name\}/g, animal.name)

  // CTA keys based on type
  const ctaTitleKey: Parameters<typeof t>[0] =
    animalType === 'sale'     ? 'animal_cta_title_sale' :
    animalType === 'medical'  ? 'animal_cta_title_medical' :
    animalType === 'breeding' ? 'animal_cta_title_breeding' :
    'animal_cta_title'

  const ctaDescKey: Parameters<typeof t>[0] =
    animalType === 'sale'     ? 'animal_cta_desc_sale' :
    animalType === 'medical'  ? 'animal_cta_desc_medical' :
    animalType === 'breeding' ? 'animal_cta_desc_breeding' :
    'animal_cta_desc'

  // Accent color for type
  const accentColor = TYPE_COLOR[animalType] ?? TYPE_COLOR['adoption']
  const bgGradient = TYPE_BG[animalType] ?? TYPE_BG['adoption']
  const borderClass = TYPE_BORDER[animalType] ?? TYPE_BORDER['adoption']

  return (
    <>
      {showComingSoon && <ComingSoonModal onClose={() => setShowComingSoon(false)} />}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-text-muted mb-6">
          <Link href="/" className="hover:text-primary transition-colors">{t('animal_home')}</Link>
          <span>/</span>
          <Link href="/adoptii" className="hover:text-primary transition-colors">{t('feed_title')}</Link>
          <span>/</span>
          <span className="text-text-main font-medium">{animal.name}</span>
        </div>

        {/* Type badge */}
        {animalType && (
          <div className="mb-4">
            <span
              className="inline-block text-white text-xs font-bold px-3 py-1 rounded-full"
              style={{ backgroundColor: accentColor }}
            >
              {t(
                animalType === 'adoption' ? 'type_adoption' :
                animalType === 'sale'     ? 'type_sale' :
                animalType === 'medical'  ? 'type_medical' :
                animalType === 'breeding' ? 'type_breeding' : 'type_adoption'
              )}
            </span>
          </div>
        )}

        {/* Status banner */}
        {(isAdopted || isExpired) && (
          <div className={`rounded-xl p-4 mb-6 font-semibold text-center ${isAdopted ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
            {isAdopted ? `✅ ${t('animal_adopted_banner')}` : `⏰ ${t('animal_expired_banner')}`}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galerie */}
          <div>
            <AnimalGallery photos={photos} animalName={animal.name} />
          </div>

          {/* Detalii */}
          <div>
            {/* Top border color by type */}
            <div
              className="h-1 rounded-full mb-4"
              style={{ backgroundColor: accentColor }}
            />

            <div className="flex items-start gap-3 mb-4">
              <span className="text-4xl">{emoji}</span>
              <div>
                <h1 className="text-3xl font-bold text-text-main">{animal.name}</h1>
                <p className="text-text-muted mt-1">
                  {speciesLabel}
                  {animal.breed ? ` · ${animal.breed}` : ''}
                </p>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: t('animal_label_age'), value: formatAge(animal.age_years, animal.age_months), icon: '🎂' },
                { label: t('animal_label_sex'), value: sexLabel, icon: '⚥' },
                { label: t('animal_label_location'), value: location || t('animal_location_unknown'), icon: '📍' },
                { label: t('animal_label_status'), value: statusLabel, icon: '✅' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white rounded-xl border border-border-light p-3 shadow-sm"
                >
                  <div className="text-xs text-text-muted mb-1 font-medium uppercase tracking-wide">
                    {item.label}
                  </div>
                  <div className="font-semibold text-text-main flex items-center gap-1.5">
                    <span>{item.icon}</span>
                    <span>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Descriere */}
            {animal.description && (
              <div className="mb-6">
                <h2 className="font-bold text-text-main mb-2 text-lg">{tn('animal_about')}</h2>
                <p className="text-text-muted leading-relaxed whitespace-pre-line">
                  {animal.description}
                </p>
              </div>
            )}

            {/* CTA dinamic pe tip */}
            {!isAdopted && !isExpired && (
              <div className={`bg-gradient-to-br ${bgGradient} rounded-xl p-5 border ${borderClass}`}>
                <h3 className="font-bold text-text-main text-lg mb-2">
                  {tn(ctaTitleKey)}
                </h3>
                <p className="text-text-muted text-sm mb-4 leading-relaxed">
                  {tn(ctaDescKey)}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowComingSoon(true)}
                    className="flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    App Store
                  </button>
                  <button
                    onClick={() => setShowComingSoon(true)}
                    className="flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-sm"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.18 23.76c.38.21.82.24 1.23.09l12.5-7.21-2.73-2.72-11 10.84zm16.26-9.38L16.76 12l2.68-2.38-11.44-6.6c-.48-.28-1.04-.27-1.5-.04L17.44 14.38zM2.08 1.76C2.03 1.97 2 2.2 2 2.45v19.1c0 .26.03.49.09.7l11.2-11.02-11.21-9.47zm12.01 11.5L12 12l-9.14 8.98L14.09 13.26z" />
                    </svg>
                    Google Play
                  </button>
                </div>
              </div>
            )}

            {/* Adoptie finalizata */}
            {isAdopted && (
              <div className="bg-green-50 rounded-xl p-5 border border-green-200 text-center">
                <div className="text-3xl mb-2">🎉</div>
                <p className="font-semibold text-green-800">
                  {tn('animal_adopted_success')}
                </p>
                <Link
                  href="/adoptii"
                  className="mt-3 inline-block text-primary font-semibold hover:underline text-sm"
                >
                  {t('animal_see_other')}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Back */}
        <div className="mt-10 pt-6 border-t border-border-light">
          <Link
            href={animalType === 'medical' ? '/ajutor-medical' : '/adoptii'}
            className="text-primary font-semibold hover:underline flex items-center gap-2"
          >
            ← {animalType === 'medical' ? t('nav_medical') : t('animal_back')}
          </Link>
        </div>
      </div>
    </>
  )
}
