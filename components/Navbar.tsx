'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useCountry } from '@/context/CountryContext'
import { LANG_OPTIONS, LANG_TO_COUNTRY, type Lang } from '@/lib/i18n'

function ComingSoonModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage()
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-5xl mb-4">ðŸš€</div>
        <h3 className="text-xl font-bold text-text-main mb-2">{t('coming_soon')}</h3>
        <p className="text-text-muted text-sm leading-relaxed mb-6">{t('coming_soon_desc')}</p>
        <button
          onClick={onClose}
          className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary-dark transition-colors"
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const { lang, setLang, t } = useLanguage()
  const { setCountry } = useCountry()

  const handleLangChange = (newLang: Lang) => {
    setLang(newLang)
    setCountry(LANG_TO_COUNTRY[newLang])
  }

  return (
    <>
    {showComingSoon && <ComingSoonModal onClose={() => setShowComingSoon(false)} />}
    <nav className="bg-white border-b border-border-light sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo â†’ feed (toate anunÈ›urile) */}
          <Link href="/adoptii" className="flex items-center gap-1.5 font-bold text-xl text-primary shrink-0">
            <Image src="/logo.svg" alt="AnimalBond" width={30} height={30} className="rounded-lg" />
            <span className="hidden sm:inline">AnimalBond</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4 lg:gap-5">
            <Link href="/adoptii" className="text-text-main hover:text-primary transition-colors font-medium text-sm whitespace-nowrap">
              ðŸ¾ {t('feed_title')}
            </Link>
            <Link href="/ajutor-medical" className="text-red-500 hover:text-red-600 transition-colors font-medium text-sm whitespace-nowrap">
              {t('nav_medical')}
            </Link>
            <Link href="/pierdute-gasite" className="text-blue-600 hover:text-blue-700 transition-colors font-medium text-sm whitespace-nowrap">
              {t('nav_lostfound')}
            </Link>
            <Link href="/parteneri" className="text-text-main hover:text-primary transition-colors font-medium text-sm whitespace-nowrap">
              {t('nav_parteneri')}
            </Link>
            <Link href="/campanii" className="text-orange-500 hover:text-orange-600 transition-colors font-medium text-sm whitespace-nowrap">
              ðŸ’ {t('nav_campanii')}
            </Link>
            <Link href="/povesti" className="text-text-main hover:text-primary transition-colors font-medium text-sm whitespace-nowrap">
              {t('nav_povesti')}
            </Link>
            <Link href="/despre" className="text-text-main hover:text-primary transition-colors font-medium text-sm whitespace-nowrap">
              {t('nav_despre')}
            </Link>
            {/* pricing hidden â€” reactivate when partners are monetized */}

            {/* Language selector â€” pulsating */}
            <div className="relative">
              <select
                value={lang}
                onChange={(e) => handleLangChange(e.target.value as Lang)}
                className="appearance-none pl-2 pr-7 py-1.5 rounded-full border-2 border-primary bg-primary text-white font-bold text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 hover:bg-primary-dark transition-colors animate-pulse"
                title={t('navbar_change_lang')}
              >
                {LANG_OPTIONS.map(l => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold">â–¾</div>
            </div>

            <button
              onClick={() => setShowComingSoon(true)}
              className="bg-primary text-white px-4 py-2 rounded-full font-semibold hover:bg-primary-dark transition-colors text-sm whitespace-nowrap shrink-0"
            >
              {t('nav_download')}
            </button>
          </div>

          {/* Mobile: lang select + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <div className="relative">
              <select
                value={lang}
                onChange={(e) => handleLangChange(e.target.value as Lang)}
                className="appearance-none pl-2 pr-6 py-1.5 rounded-full border-2 border-primary bg-primary text-white font-bold text-sm cursor-pointer focus:outline-none animate-pulse"
                title={t('navbar_change_lang')}
              >
                {LANG_OPTIONS.map(l => (
                  <option key={l.code} value={l.code}>
                    {l.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-white text-xs font-bold">â–¾</div>
            </div>
            <button
              className="p-2 rounded-lg text-text-main hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Meniu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-border-light flex flex-col gap-3">
            <Link href="/adoptii" className="text-text-main hover:text-primary transition-colors font-medium py-2" onClick={() => setMenuOpen(false)}>
              ðŸ¾ {t('feed_title')}
            </Link>
            <Link href="/ajutor-medical" className="text-red-500 hover:text-red-600 transition-colors font-medium py-2" onClick={() => setMenuOpen(false)}>
              {t('nav_medical')}
            </Link>
            <Link href="/pierdute-gasite" className="text-blue-600 hover:text-blue-700 transition-colors font-medium py-2" onClick={() => setMenuOpen(false)}>
              {t('nav_lostfound')}
            </Link>
            <Link href="/parteneri" className="text-text-main hover:text-primary transition-colors font-medium py-2" onClick={() => setMenuOpen(false)}>
              {t('nav_parteneri')}
            </Link>
            <Link href="/campanii" className="text-orange-500 hover:text-orange-600 transition-colors font-medium py-2" onClick={() => setMenuOpen(false)}>
              ðŸ’ {t('nav_campanii')}
            </Link>
            <Link href="/povesti" className="text-text-main hover:text-primary transition-colors font-medium py-2" onClick={() => setMenuOpen(false)}>
              {t('nav_povesti')}
            </Link>
            <Link href="/despre" className="text-text-main hover:text-primary transition-colors font-medium py-2" onClick={() => setMenuOpen(false)}>
              {t('nav_despre')}
            </Link>
            {/* pricing hidden â€” reactivate when partners are monetized */}
            <button
              onClick={() => { setShowComingSoon(true); setMenuOpen(false) }}
              className="bg-primary text-white px-5 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors text-sm text-center"
            >
              {t('nav_download')}
            </button>
          </div>
        )}
      </div>
    </nav>
    </>
  )
}
