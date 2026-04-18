'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { AnimalPhoto } from '@/lib/supabase'

type Props = {
  photos: AnimalPhoto[]
  animalName: string
}

export default function AnimalGallery({ photos, animalName }: Props) {
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
        <Image
          src={photos[activeIdx].photo_url}
          alt={`${animalName} - poza ${activeIdx + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={activeIdx === 0}
        />
        {photos.length > 1 && (
          <>
            <button
              onClick={() => setActiveIdx((i) => (i > 0 ? i - 1 : photos.length - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-text-main w-9 h-9 rounded-full shadow flex items-center justify-center transition-all"
              aria-label="Poza anterioară"
            >
              ‹
            </button>
            <button
              onClick={() => setActiveIdx((i) => (i < photos.length - 1 ? i + 1 : 0))}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-text-main w-9 h-9 rounded-full shadow flex items-center justify-center transition-all"
              aria-label="Poza următoare"
            >
              ›
            </button>
          </>
        )}
        {/* Counter */}
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
              <Image
                src={photo.photo_url}
                alt={`${animalName} - miniatură ${idx + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
