'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Partner } from '@/lib/supabase'
import { useLanguage } from '@/context/LanguageContext'

const categoryColor: Record<string, string> = {
  vet: 'bg-blue-100 text-blue-700',
  food: 'bg-orange-100 text-orange-700',
  accessories: 'bg-green-100 text-green-700',
  insurance: 'bg-purple-100 text-purple-700',
  other: 'bg-gray-100 text-gray-700',
}

export default function ParteneriPage() {
  const { t } = useLanguage()
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('')

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
        .select('id, name, category, city, description, logo_url, url, is_active')
        .eq('is_active', true)
        .order('name', { ascending: true })

      if (category) {
        query = query.eq('category', category)
      }

      const { data, error } = await query

      if (error) {
        console.error('Eroare parteneri:', error)
        setPartners([])
      } else {
        setPartners((data as Partner[]) || [])
      }
      setLoading(false)
    }

    fetchPartners()
  }, [category])

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

      {/* Filtre categorie */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {CATEGORY_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setCategory(opt.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
              category === opt.value
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-text-main border-border-light hover:border-primary hover:text-primary'
            }`}
          >
            {opt.label}
          </button>
        ))}
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
      ) : partners.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-text-muted text-lg">
            {category ? t('partners_empty_cat') : t('partners_empty')}
          </p>
          {category && (
            <button
              onClick={() => setCategory('')}
              className="mt-4 text-primary font-semibold hover:underline"
            >
              {t('partners_show_all')}
            </button>
          )}
        </div>
      ) : (
        <>
          <p className="text-text-muted text-sm mb-4 text-center">
            {partners.length} {category ? t('partners_count_cat') : t('partners_count_active')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-card shadow-card border border-border-light p-5 hover:shadow-card-hover transition-all flex flex-col"
              >
                {/* Logo sau placeholder */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-pink-50 border border-border-light shrink-0 flex items-center justify-center">
                    {partner.logo_url ? (
                      <Image
                        src={partner.logo_url}
                        alt={partner.name}
                        fill
                        className="object-contain p-1"
                      />
                    ) : (
                      <span className="text-2xl">
                        {categoryLabel[partner.category]?.split(' ')[0] || '🤝'}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-bold text-text-main text-base leading-tight truncate">
                      {partner.name}
                    </h2>
                    <span
                      className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                        categoryColor[partner.category] || 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {categoryLabel[partner.category] || partner.category}
                    </span>
                    {partner.city && (
                      <p className="text-text-muted text-xs mt-1">📍 {partner.city}</p>
                    )}
                  </div>
                </div>

                {/* Descriere */}
                {partner.description && (
                  <p className="text-text-muted text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                    {partner.description}
                  </p>
                )}

                {/* Website */}
                {partner.url && (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center gap-1.5 text-primary font-semibold text-sm hover:underline"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {t('partners_visit_site')}
                  </a>
                )}
              </div>
            ))}
          </div>
        </>
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
