'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { useLanguage } from '@/context/LanguageContext'

interface Partner {
  id: string
  company_name: string
  email: string
  phone: string
  city: string
  category: string
  status: string
  created_at: string
  is_active: boolean
  payment_status: string
}

export default function AdminPartnersPage() {
  const router = useRouter()
  const { t, lang } = useLanguage()
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    fetchPendingPartners()
  }, [])

  const fetchPendingPartners = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPartners(data || [])
    } catch (err) {
      console.error('Error fetching partners:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch partners')
    } finally {
      setLoading(false)
    }
  }

  const handleApproveAsGold = async (partnerId: string, partnerEmail: string) => {
    if (!confirm(t('admin_confirm_gold') || 'Aprobi acest partener ca Gold (gratuit)?')) return

    try {
      setActionLoading(partnerId)

      // 1. Mark as active + payment_status = exempt
      const { error: updateError } = await supabase
        .from('partners')
        .update({
          is_active: true,
          payment_status: 'exempt',
          status: 'approved',
          approved_at: new Date().toISOString(),
        })
        .eq('id', partnerId)

      if (updateError) throw updateError

      // 2. Send confirmation email (API verifică tokenul admin)
      const { data: { session } } = await supabase.auth.getSession()
      const response = await fetch('/api/send-partner-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token ?? ''}`,
        },
        body: JSON.stringify({
          partnerId,
          partnerEmail,
          type: 'approved_gold',
          locale: lang,
        }),
      })

      if (!response.ok) {
        console.error('Email send failed, but partner marked as Gold')
      }

      setPartners(partners.filter(p => p.id !== partnerId))
      alert(t('admin_gold_approved') || 'Partener aprobat ca Gold!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve partner')
    } finally {
      setActionLoading(null)
    }
  }

  const handleSendPaymentLink = async (partnerId: string, partnerEmail: string) => {
    if (!confirm(t('admin_confirm_payment') || 'Trimiti link de plată pentru 19.99€?')) return

    try {
      setActionLoading(partnerId)

      // Call Edge Function to create payment link and send email
      const { data: session } = await supabase.auth.getSession()
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''

      const response = await fetch(
        `${supabaseUrl}/functions/v1/create-partner-payment-link`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.session?.access_token}`,
          },
          body: JSON.stringify({
            partnerId,
            partnerEmail,
            locale: lang,
          }),
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create payment link')
      }

      // Mark payment_status as pending in database
      const { error: updateError } = await supabase
        .from('partners')
        .update({
          payment_status: 'pending',
          status: 'approved',
          approved_at: new Date().toISOString(),
        })
        .eq('id', partnerId)

      if (updateError) throw updateError

      setPartners(partners.filter(p => p.id !== partnerId))
      alert(t('admin_payment_link_sent') || 'Link de plată trimis!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send payment link')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (partnerId: string) => {
    if (!confirm(t('admin_confirm_reject') || 'Respingi această cerere de parteneriat?')) return

    try {
      setActionLoading(partnerId)

      const { error } = await supabase
        .from('partners')
        .update({ status: 'rejected' })
        .eq('id', partnerId)

      if (error) throw error

      setPartners(partners.filter(p => p.id !== partnerId))
      alert(t('admin_rejected') || 'Cerere respinsă')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject partner')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return <div className="p-6 text-center">Se încarcă...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {t('admin_partners_title') || 'Partner Applications'}
        </h1>
        <p className="text-gray-600 mb-6">
          {t('admin_partners_subtitle') || 'Review and approve pending partner applications'}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">
            {error}
          </div>
        )}

        {partners.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
            {t('admin_no_pending') || 'No pending applications'}
          </div>
        ) : (
          <div className="grid gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Left column: Partner Info */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      {partner.company_name}
                    </h2>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="font-semibold">Categorie:</span> {partner.category}
                      </p>
                      <p>
                        <span className="font-semibold">Oraș:</span> {partner.city}
                      </p>
                      <p>
                        <span className="font-semibold">Email:</span>{' '}
                        <a href={`mailto:${partner.email}`} className="text-blue-600 hover:underline">
                          {partner.email}
                        </a>
                      </p>
                      <p>
                        <span className="font-semibold">Telefon:</span> {partner.phone}
                      </p>
                      <p className="text-xs text-gray-400 mt-4">
                        Aplicare: {new Date(partner.created_at).toLocaleDateString(lang === 'ro' ? 'ro-RO' : 'en-US')}
                      </p>
                    </div>
                  </div>

                  {/* Right column: Status & Actions */}
                  <div className="flex flex-col justify-between">
                    <div className="mb-6">
                      <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                        {t('partner_status_pending') || 'Pending'}
                      </div>
                    </div>

                    <div className="grid gap-3">
                      {/* Gold Approval Button */}
                      <button
                        onClick={() => handleApproveAsGold(partner.id, partner.email)}
                        disabled={actionLoading === partner.id}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        {actionLoading === partner.id ? 'Se procesează...' : '✅ Aprobă ca Gold'}
                      </button>

                      {/* Send Payment Link Button */}
                      <button
                        onClick={() => handleSendPaymentLink(partner.id, partner.email)}
                        disabled={actionLoading === partner.id}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        {actionLoading === partner.id ? 'Se procesează...' : '💳 Trimite Link Plată'}
                      </button>

                      {/* Reject Button */}
                      <button
                        onClick={() => handleReject(partner.id)}
                        disabled={actionLoading === partner.id}
                        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        {actionLoading === partner.id ? 'Se procesează...' : '❌ Respinge'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
