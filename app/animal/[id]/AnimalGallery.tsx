'use client'

import { useState } from 'react'
import type { AnimalPhoto } from '@/lib/supabase'
import { useLanguage } from '@/context/LanguageContext'

type Props = {
  photos: AnimalPhoto[]
  animalName: string
}

export default function AnimalGallery({ photos, animalName }: Props) {
  const { t } = useLanguage()
  const [activeIdx, setActiveIdx] = useState(0)

  if (photos.length === 0) {
    return (
      <div className="aspect-[4/3] bg-gradient-to-br from-pink-50 to-red-50 rounded-card flex items-center justify-center text-7xl border border-border-light">
        🐾
      </div>
    )
  }

  return (
    <div>
      {/* Poza mare */}
      <div className="relative aspect-[4/3] rounded-card overflow-hidden bg-gray-100 shadow-card mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photos[activeIdx].url}
          alt={`${animalName} - ${t('gallery_photo')} ${activeIdx + 1}`}
          className="object-cover w-full h-full"
        />
        {photos.length > 1 && (
          <>
            <button
              onClick={() => setActiveIdx((i) => (i > 0 ? i - 1 : photos.length - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-text-main w-9 h-9 rounded-full shadow flex items-center justify-center transition-all"
              aria-label={t('gallery_prev')}
            >
              ‹
            </button>
            <button
              onClick={() => setActiveIdx((i) => (i < photos.length - 1 ? i + 1 : 0))}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-text-main w-9 h-9 rounded-full shadow flex items-center justify-center transition-all"
              aria-label={t('gallery_next')}
            >
              ›
            </button>
          </>
        )}
        {photos.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            {activeIdx + 1} / {photos.length}
          </div>
        )}
      </div>

      {/* Miniaturi */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              onClick={() => setActiveIdx(idx)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                idx === activeIdx
                  ? 'border-primary shadow-md'
                  : 'border-border-light hover:border-primary/50'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={`${animalName} - ${t('gallery_thumb')} ${idx + 1}`}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
