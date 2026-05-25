'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { createClient } from '@/lib/supabase-client'

function PartnerSuccessContent() {
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
          <p className="text-gray-600">{t('partnerpay_verifying')}</p>
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
            {t('partner_payment_failed_title')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('partner_payment_failed_desc')}
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-dark transition-colors"
          >
            ← {t('partner_success_back')}
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
          {t('partner_payment_success_title')}
        </h1>
        {partnerName && (
          <p className="text-lg text-primary font-semibold mb-4">
            {partnerName}
          </p>
        )}
        <p className="text-gray-600 mb-6">
          {t('partner_payment_success_desc')}
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-sm text-green-700">
          <p className="font-semibold mb-2">{t('partnerpay_what_now')}</p>
          <ul className="text-left space-y-1">
            <li>{t('partnerpay_li_profile')}</li>
            <li>{t('partnerpay_li_requests')}</li>
            <li>{t('partnerpay_li_premium')}</li>
            <li>{t('partnerpay_li_support')}</li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-block bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-dark transition-colors"
        >
          ← {t('partner_success_back')}
        </Link>
      </div>
    </div>
  )
}

export default function PartnerSuccessPage() {
  const { t } = useLanguage()
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    }>
      <PartnerSuccessContent />
    </Suspense>
  )
}
