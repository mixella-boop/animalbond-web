'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ResetPasswordPage() {
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
      setError('Parola trebuie să aibă cel puțin 8 caractere.')
      return
    }
    if (password !== confirm) {
      setError('Cele două parole nu coincid.')
      return
    }
    setLoading(true)
    setError('')
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (updateError) {
      setError('Eroare la salvarea parolei. Linkul poate fi expirat — solicită unul nou.')
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#FFF9F9] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Parolă actualizată!</h1>
          <p className="text-gray-500 mb-6">
            Parola ta a fost salvată. Deschide aplicația AnimalBond și autentifică-te cu noua parolă.
          </p>
          <a
            href="/"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-colors"
          >
            Înapoi la AnimalBond
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
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Link expirat</h1>
          <p className="text-gray-500 mb-6">
            Linkul de resetare a expirat sau nu este valid. Solicită unul nou din aplicație.
          </p>
          <a
            href="/"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-colors"
          >
            Înapoi la AnimalBond
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
          <p className="text-gray-500">Se verifică linkul...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFF9F9] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🔐</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Parolă nouă</h1>
          <p className="text-gray-500 text-sm">
            Introdu noua parolă pentru contul tău AnimalBond.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parolă nouă
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minim 8 caractere"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmă parola
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repetă parola"
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
            {loading ? 'Se salvează...' : 'Salvează parola'}
          </button>
        </div>
      </div>
    </div>
  )
}
