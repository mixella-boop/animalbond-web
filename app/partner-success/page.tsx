'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { createClient } from '@/lib/supabase-client'

export default function PartnerSuccessPage() {
  const searchParams = useSearchParams()
  const { t } = useLanguage()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [partnerName, setPartnerName] = useState<string>('')
  const supabase = createClient()

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get('session_id')
        if (!sessionId) {
          setStatus('error')
          return
        }

        // Verify payment with Stripe via our API
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })

        if (!response.ok) {
          setStatus('error')
          return
        }

        const { partnerId } = await response.json()

        // Get partner details
        const { data: partner } = await supabase
          .from('partners')
          .select('company_name')
          .eq('id', partnerId)
          .single()

        if (partner) {
          setPartnerName(partner.company_name)
        }

        setStatus('success')
      } catch (error) {
        console.error('Error verifying payment:', error)
        setStatus('error')
      }
    }

    verifyPayment()
  }, [searchParams, supabase])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Se verifică plata...</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {t('partner_payment_failed_title') || 'Plata nu a putut fi procesată'}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('partner_payment_failed_desc') ||
              'A apărut o problemă la procesarea plății. Contactați suportul.'}
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-dark transition-colors"
          >
            ← Înapoi la pagina principală
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {t('partner_payment_success_title') || 'Plată confirmată!'}
        </h1>
        {partnerName && (
          <p className="text-lg text-primary font-semibold mb-4">
            {partnerName}
          </p>
        )}
        <p className="text-gray-600 mb-6">
          {t('partner_payment_success_desc') ||
            'Mulțumim! Parteneriatul tău este acum activ. Vei apărea în aplicație și pe site.'}
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-sm text-green-700">
          <p className="font-semibold mb-2">🐾 Ce se întâmplă acum?</p>
          <ul className="text-left space-y-1">
            <li>✓ Profil activ în app și pe site</li>
            <li>✓ Primești cereri de la clienți</li>
            <li>✓ Vizibilitate premium</li>
            <li>✓ Suport din echipa AnimalBond</li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-block bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-dark transition-colors"
        >
          ← Înapoi la pagina principală
        </Link>
      </div>
    </div>
  )
}
