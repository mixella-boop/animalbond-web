'use client'

import { useState } from 'react'
import type { Testimonial } from './page'
import { useLanguage } from '@/context/LanguageContext'

function formatDate(dateStr: string, locale: string): string {
  return new Date(dateStr).toLocaleDateString(locale, { year: 'numeric', month: 'long' })
}

export default function TestimonialeClient({ testimonials }: { testimonials: Testimonial[] }) {
  const { t, lang } = useLanguage()
  const [selected, setSelected] = useState<Testimonial | null>(null)

  const dateLocale = lang === 'ro' ? 'ro-RO' : lang === 'de' ? 'de-DE' : lang === 'fr' ? 'fr-FR' :
    lang === 'it' ? 'it-IT' : lang === 'es' ? 'es-ES' : lang === 'hu' ? 'hu-HU' : 'en-GB'

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">🐾❤️</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-main mb-3">
          {t('stories_title')}
        </h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto">
          {t('stories_subtitle')}
        </p>
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-text-muted text-lg">{t('stories_empty')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="bg-white rounded-card shadow-card border border-border-light overflow-hidden hover:shadow-card-hover transition-all cursor-pointer group"
            >
              {/* Poza */}
              {item.photo_url ? (
                <div className="relative aspect-[4/3] overflow-hidden bg-pink-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.photo_url}
                    alt={item.animal_name || 'Adoptie'}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.video_url && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-2xl ml-1">▶️</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-[4/3] bg-gradient-to-br from-pink-50 to-red-50 flex items-center justify-center text-6xl">
                  🐾
                </div>
              )}

              {/* Content */}
              <div className="p-4">
                {item.animal_name && (
                  <p className="text-primary font-semibold text-sm mb-1">🐾 {item.animal_name}</p>
                )}
                <p className="text-text-main text-sm leading-relaxed line-clamp-3 mb-3">
                  {item.text}
                </p>
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>@{item.profiles?.username || 'anonim'}</span>
                  <span>{formatDate(item.created_at, dateLocale)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.photo_url && (
              <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected.photo_url}
                  alt={selected.animal_name || 'Adoptie'}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="p-6">
              {selected.animal_name && (
                <p className="text-primary font-bold text-lg mb-2">🐾 {selected.animal_name}</p>
              )}
              <p className="text-text-main leading-relaxed whitespace-pre-line mb-4">
                {selected.text}
              </p>
              <div className="flex items-center justify-between text-sm text-text-muted mb-4">
                <span className="font-medium">@{selected.profiles?.username || 'anonim'}</span>
                <span>{formatDate(selected.created_at, dateLocale)}</span>
              </div>
              {selected.video_url && (
                <a
                  href={selected.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors w-full text-center mb-3"
                >
                  {t('stories_watch_video')}
                </a>
              )}
              <button
                onClick={() => setSelected(null)}
                className="w-full text-text-muted text-sm hover:text-primary transition-colors"
              >
                {t('stories_close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
