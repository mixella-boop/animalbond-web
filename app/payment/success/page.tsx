'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function SuccessContent() {
  const params  = useSearchParams()
  const plan    = params.get('plan') ?? ''

  const isSale    = plan === 'sale_listing'
  const isPartner = plan === 'partner_monthly'

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-20 text-center">
      <div className="text-7xl mb-6">{isSale ? '🎉' : isPartner ? '🤝' : '✅'}</div>

      <h1 className="text-3xl font-bold text-text-main mb-4">
        {isSale
          ? 'Plată confirmată! Anunțul tău este activ.'
          : isPartner
          ? 'Bun venit ca partener AnimalBond!'
          : 'Plată confirmată!'}
      </h1>

      <p className="text-text-muted text-lg mb-6 leading-relaxed">
        {isSale
          ? 'Anunțul tău de vânzare a fost activat și va fi vizibil timp de 30 de zile. Vei primi confirmarea și pe email.'
          : isPartner
          ? 'Listing-ul tău este acum activ pe AnimalBond. Echipa noastră te va contacta în scurt timp pentru detalii suplimentare.'
          : 'Tranzacția a fost procesată cu succes.'}
      </p>

      {isSale && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 text-sm text-green-700">
          <strong>Activ 30 zile</strong> — anunțul expiră automat după această perioadă.
          Poți reposta oricând cu o nouă plată de 4,99 €.
        </div>
      )}

      {isPartner && (
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 mb-8 text-sm text-violet-700">
          Abonamentul se reînnoiește automat lunar. Poți anula oricând fără penalități
          contactând echipa la{' '}
          <a href="mailto:contact@animalbond.club" className="underline">
            contact@animalbond.club
          </a>
          .
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/"
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors"
        >
          Înapoi la pagina principală
        </Link>
        <Link
          href="/animale"
          className="border-2 border-primary text-primary px-6 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
        >
          Explorează animale
        </Link>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-text-muted">Se încarcă...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
