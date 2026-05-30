'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import { useLanguage } from '@/context/LanguageContext'

function CancelContent() {
  const params = useSearchParams()
  const { t }  = useLanguage()
  const plan   = params.get('plan') ?? ''

  const backHref  = plan === 'partner_monthly' ? '/partner-apply' : '/pricing'
  const backLabel = plan === 'partner_monthly' ? t('paycancel_back_form') : t('paycancel_back_prices')

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-20 text-center">
      <div className="text-7xl mb-6">😕</div>

      <h1 className="text-3xl font-bold text-text-main mb-4">
        {t('paycancel_title')}
      </h1>

      <p className="text-text-muted text-lg mb-8 leading-relaxed">
        {t('paycancel_body')}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={backHref}
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
        >
          {backLabel}
        </Link>
        <Link
          href="/"
          className="border-2 border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
        >
          {t('animal_home')}
        </Link>
      </div>

      <p className="text-text-muted text-sm mt-8">
        {t('paycancel_help')}{' '}
        <a href="https://animalbond.club/contact" className="text-primary hover:underline">
          animalbond.club/contact
        </a>
      </p>
    </div>
  )
}

export default function PaymentCancelPage() {
  const { t } = useLanguage()
  return (
    <Suspense fallback={<div className="py-20 text-center text-text-muted">{t('loading')}</div>}>
      <CancelContent />
    </Suspense>
  )
}
