'use client'

import { Suspense, useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'

// Componentă separată care folosește useSearchParams (necesită Suspense)
function ManualContent() {
  const { lang } = useLanguage()
  const searchParams = useSearchParams()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // URL lang override — trimis de aplicația mobilă (?lang=fr etc.)
  const urlLang = searchParams.get('lang') ?? null
  const initialLang = useRef(urlLang || lang)

  // La prima montare folosim URL lang (sau context); ulterior urmărim contextul
  const isFirstEffect = useRef(true)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const effectiveLang = isFirstEffect.current ? initialLang.current : lang
    isFirstEffect.current = false

    const send = () => {
      iframe.contentWindow?.postMessage({ type: 'setLang', lang: effectiveLang }, '*')
    }

    send()
    iframe.addEventListener('load', send)
    return () => iframe.removeEventListener('load', send)
  }, [lang])

  const handleDownload = () => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'download' }, '*')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📖</span>
            <div>
              <h1 className="text-base font-bold text-gray-800 leading-tight">Manual AnimalBond</h1>
              <p className="text-xs text-gray-400">Versiunea 1.0 · 2026</p>
            </div>
          </div>
          {/* Download PDF */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            <span>⬇️</span>
            <span className="hidden sm:inline">Descarcă PDF</span>
          </button>
        </div>
      </div>

      {/* Iframe manual — src cu ?lang inițial, schimbările ulterioare prin postMessage */}
      <iframe
        ref={iframeRef}
        src={`/manual.html?lang=${initialLang.current}`}
        className="w-full border-0"
        style={{ height: 'calc(100vh - 57px)' }}
        title="Manual AnimalBond"
        sandbox="allow-scripts allow-same-origin allow-modals allow-downloads"
      />
    </div>
  )
}

export default function ManualPage() {
  return (
    <Suspense>
      <ManualContent />
    </Suspense>
  )
}
