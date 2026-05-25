'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useLanguage } from '@/context/LanguageContext'

export default function ResetPasswordPage() {
  const { t } = useLanguage()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    // Supabase JS parsează automat hash-ul din URL și emite evenimentul
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true)
      }
    })
    // Dacă hash-ul nu e prezent sau tokenul e invalid, arătăm eroare după 3s
    const timeout = setTimeout(() => {
      setExpired((prev) => { if (!prev && !ready) return true; return prev })
    }, 4000)
    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [])

  const handleReset = async () => {
    if (password.length < 8) {
      setError(t('reset_err_min'))
      return
    }
    if (password !== confirm) {
      setError(t('reset_err_match'))
      return
    }
    setLoading(true)
    setError('')
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (updateError) {
      setError(t('reset_err_link'))
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#FFF9F9] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{t('reset_done_title')}</h1>
          <p className="text-gray-500 mb-6">{t('reset_done_body')}</p>
          <a
            href="/"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-colors"
          >
            {t('reset_back')}
          </a>
        </div>
      </div>
    )
  }

  if (expired && !ready) {
    return (
      <div className="min-h-screen bg-[#FFF9F9] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⏰</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{t('reset_expired_title')}</h1>
          <p className="text-gray-500 mb-6">{t('reset_expired_body')}</p>
          <a
            href="/"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-colors"
          >
            {t('reset_back')}
          </a>
        </div>
      </div>
    )
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#FFF9F9] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🔐</div>
          <p className="text-gray-500">{t('reset_checking')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF9F9] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🔐</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('reset_title')}</h1>
          <p className="text-gray-500 text-sm">{t('reset_subtitle')}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('reset_label_new')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('reset_ph_new')}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('reset_label_confirm')}
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder={t('reset_ph_confirm')}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              onKeyDown={(e) => e.key === 'Enter' && handleReset()}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {loading ? t('reset_saving') : t('reset_save_btn')}
          </button>
        </div>
      </div>
    </div>
  )
}
