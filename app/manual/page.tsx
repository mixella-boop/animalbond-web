'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/context/LanguageContext'

export default function ManualPage() {
  const { lang } = useLanguage()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  // Reținem limba inițială — o folosim în src (nu vrem reload la fiecare schimbare)
  const initialLang = useRef(lang)

  // Când se schimbă limba în navbar → postMessage către iframe (fără reload)
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const send = () => {
      iframe.contentWindow?.postMessage({ type: 'setLang', lang }, '*')
    }

    // Dacă iframe-ul e deja încărcat (schimbare limbă după prima render)
    send()

    // Safety: dacă nu era încă încărcat, trimitem și la load
    iframe.addEventListener('load', send)
    return () => iframe.removeEventListener('load', send)
  }, [lang])

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
          <a
            href="/manual.html"
            download="Manual_AnimalBond.html"
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            <span>⬇️</span>
            <span className="hidden sm:inline">Descarcă</span>
          </a>
        </div>
      </div>

      {/* Iframe manual — src cu ?lang inițial, schimbările ulterioare prin postMessage */}
      <iframe
        ref={iframeRef}
        src={`/manual.html?lang=${initialLang.current}`}
        className="w-full border-0"
        style={{ height: 'calc(100vh - 57px)' }}
        title="Manual AnimalBond"
      />
    </div>
  )
}
