'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function CancelContent() {
  const params = useSearchParams()
  const plan   = params.get('plan') ?? ''

  const backHref  = plan === 'partner_monthly' ? '/partner-apply' : '/pricing'
  const backLabel = plan === 'partner_monthly' ? 'Înapoi la formular' : 'Înapoi la prețuri'

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-20 text-center">
      <div className="text-7xl mb-6">😕</div>

      <h1 className="text-3xl font-bold text-text-main mb-4">
        Plata a fost anulată
      </h1>

      <p className="text-text-muted text-lg mb-8 leading-relaxed">
        Nu a fost efectuată nicio plată. Poți încerca din nou oricând sau
        ne poți contacta dacă ai întâmpinatt o problemă.
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
          Acasă
        </Link>
      </div>

      <p className="text-text-muted text-sm mt-8">
        Probleme? Scrie-ne la{' '}
        <a href="mailto:contact@animalbond.club" className="text-primary hover:underline">
          contact@animalbond.club
        </a>
      </p>
    </div>
  )
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-text-muted">Se încarcă...</div>}>
      <CancelContent />
    </Suspense>
  )
}
