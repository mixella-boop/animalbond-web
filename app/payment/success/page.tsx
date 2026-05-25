'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { useLanguage } from '@/context/LanguageContext'

function SuccessContent() {
  const params  = useSearchParams()
  const { t }   = useLanguage()
  const plan    = params.get('plan') ?? ''

  const isSale    = plan === 'sale_listing'
  const isPartner = plan === 'partner_monthly'

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-20 text-center">
      <div className="text-7xl mb-6">{isSale ? '🎉' : isPartner ? '🤝' : '✅'}</div>

      <h1 className="text-3xl font-bold text-text-main mb-4">
        {isSale
          ? t('paysuccess_sale_title')
          : isPartner
          ? t('paysuccess_partner_title')
          : t('paysuccess_generic')}
      </h1>

      <p className="text-text-muted text-lg mb-6 leading-relaxed">
        {isSale
          ? t('paysuccess_sale_body')
          : isPartner
          ? t('paysuccess_partner_body')
          : t('paysuccess_generic_body')}
      </p>

      {isSale && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 text-sm text-green-700">
          {t('paysuccess_sale_note')}
        </div>
      )}

      {isPartner && (
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 mb-8 text-sm text-violet-700">
          {t('paysuccess_partner_note')}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
        >
          {t('partner_success_back')}
        </Link>
        <Link
          href="/animale"
          className="border-2 border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
        >
          {t('paysuccess_explore')}
        </Link>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  const { t } = useLanguage()
  return (
    <Suspense fallback={<div className="py-20 text-center text-text-muted">{t('loading')}</div>}>
      <SuccessContent />
    </Suspense>
  )
}
