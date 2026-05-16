'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

function AppModal({ onClose, t }: { onClose: () => void; t: (k: any) => string }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-5xl mb-4">📱</div>
        <h3 className="text-xl font-bold text-text-main mb-2">{t('pricing_app_modal_title')}</h3>
        <p className="text-text-muted text-sm leading-relaxed mb-6">{t('pricing_app_modal_desc')}</p>
        <div className="flex flex-col gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.animalbond.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-900 transition-colors"
          >
            🤖 Google Play
          </a>
          <a
            href="https://apps.apple.com/app/animalbond"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 text-text-main px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
          >
            🍎 App Store
          </a>
          <button
            onClick={onClose}
            className="text-text-muted text-sm hover:text-text-main transition-colors mt-1"
          >
            ✕ Închide
          </button>
        </div>
      </div>
    </div>
  )
}

export default function PricingPage() {
  const { t } = useLanguage()
  const [showAppModal, setShowAppModal] = useState(false)

  const PLANS = [
    {
      key: 'gold',
      icon: '⭐',
      gradient: 'from-yellow-400 to-amber-500',
      border: 'border-yellow-300',
      bg: 'bg-yellow-50',
      badge: null,
      price: t('pricing_gold_price'),
      priceNote: null,
      isFree: true,
      features: [
        t('pricing_gold_f1'),
        t('pricing_gold_f2'),
        t('pricing_gold_f3'),
        t('pricing_gold_f4'),
        t('pricing_gold_f5'),
      ],
      cta: t('pricing_gold_cta'),
      ctaAction: 'app' as const,
      ctaStyle: 'bg-amber-400 hover:bg-amber-500 text-white',
    },
    {
      key: 'sale',
      icon: '🏷️',
      gradient: 'from-primary to-pink-600',
      border: 'border-primary/30',
      bg: 'bg-pink-50',
      badge: t('pricing_badge_popular'),
      price: '4,99 €',
      priceNote: t('pricing_sale_note'),
      isFree: false,
      features: [
        t('pricing_sale_f1'),
        t('pricing_sale_f2'),
        t('pricing_sale_f3'),
        t('pricing_sale_f4'),
        t('pricing_sale_f5'),
      ],
      cta: t('pricing_sale_cta'),
      ctaAction: 'app' as const,
      ctaStyle: 'bg-primary hover:bg-primary-dark text-white',
      note: t('pricing_sale_app_note'),
    },
    {
      key: 'partner',
      icon: '🤝',
      gradient: 'from-violet-500 to-purple-700',
      border: 'border-violet-300',
      bg: 'bg-violet-50',
      badge: t('pricing_badge_business'),
      price: '19,99 €',
      priceNote: t('pricing_partner_note'),
      isFree: false,
      features: [
        t('pricing_partner_f1'),
        t('pricing_partner_f2'),
        t('pricing_partner_f3'),
        t('pricing_partner_f4'),
        t('pricing_partner_f5'),
      ],
      cta: t('pricing_partner_cta'),
      ctaAction: 'partner' as const,
      ctaStyle: 'bg-violet-600 hover:bg-violet-700 text-white',
    },
  ]

  const PLAN_NAMES: Record<string, string> = {
    gold: t('pricing_plan_gold'),
    sale: t('pricing_plan_sale'),
    partner: t('pricing_plan_partner'),
  }

  const FAQS = [
    { q: t('pricing_faq_1q'), a: t('pricing_faq_1a') },
    { q: t('pricing_faq_2q'), a: t('pricing_faq_2a') },
    { q: t('pricing_faq_3q'), a: t('pricing_faq_3a') },
    { q: t('pricing_faq_4q'), a: t('pricing_faq_4a') },
    { q: t('pricing_faq_5q'), a: t('pricing_faq_5a') },
  ]

  return (
    <>
      {showAppModal && <AppModal onClose={() => setShowAppModal(false)} t={t} />}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">💳</div>
          <h1 className="text-4xl font-bold text-text-main mb-3">
            {t('pricing_title')}
          </h1>
          <p className="text-text-muted text-lg max-w-xl mx-auto leading-relaxed">
            {t('pricing_subtitle')}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm text-green-700 font-medium">
            <span>🌍</span>
            <span>{t('pricing_eur_note')}</span>
          </div>
        </div>

        {/* Grid planuri */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className={`relative rounded-2xl border-2 ${plan.border} ${plan.bg} p-6 flex flex-col`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`bg-gradient-to-r ${plan.gradient} text-white text-xs font-bold px-3 py-1 rounded-full shadow`}>
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-4xl mb-3">{plan.icon}</div>
              <h2 className="text-xl font-bold text-text-main mb-1">{PLAN_NAMES[plan.key]}</h2>

              {/* Preț */}
              <div className="mb-4">
                {plan.isFree ? (
                  <span className="text-4xl font-extrabold text-green-600">{plan.price}</span>
                ) : (
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-text-main">{plan.price}</span>
                    </div>
                    <p className="text-sm text-text-muted">{plan.priceNote}</p>
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-4 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-main">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Nota "se face din app" */}
              {'note' in plan && plan.note && (
                <p className="text-xs text-text-muted text-center mb-3 italic">{plan.note}</p>
              )}

              {/* CTA */}
              {plan.ctaAction === 'app' ? (
                <button
                  onClick={() => setShowAppModal(true)}
                  className={`w-full text-center py-3 rounded-xl font-bold text-sm transition-colors ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </button>
              ) : (
                <Link
                  href="/partner-apply"
                  className={`w-full text-center py-3 rounded-xl font-bold text-sm transition-colors ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-border-light shadow-card p-8">
          <h2 className="text-2xl font-bold text-text-main mb-6 text-center">{t('pricing_faq_title')}</h2>
          <div className="space-y-5 max-w-2xl mx-auto">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="border-b border-border-light pb-4 last:border-0 last:pb-0">
                <p className="font-semibold text-text-main mb-1">{q}</p>
                <p className="text-sm text-text-muted leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <p className="text-text-muted mb-4">
            {t('pricing_contact')}{' '}
            <a href="mailto:contact@animalbond.club" className="text-primary hover:underline">
              contact@animalbond.club
            </a>
          </p>
          <Link
            href="/partner-apply"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-2.5 rounded-full font-semibold hover:bg-pink-50 transition-colors text-sm"
          >
            🤝 {t('pricing_partner_btn')}
          </Link>
        </div>
      </div>
    </>
  )
}
