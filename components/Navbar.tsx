'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { LANG_OPTIONS } from '@/lib/i18n'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()

  const currentLang = LANG_OPTIONS.find(l => l.code === lang) ?? LANG_OPTIONS[0]

  return (
    <nav className="bg-white border-b border-border-light sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 font-bold text-xl text-primary">
            <Image src="/logo.svg" alt="AnimalBond" width={32} height={32} className="rounded-lg" />
            <span className="text-xl">🐾🐾</span>
            <span>AnimalBond</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/adoptii" className="text-text-main hover:text-primary transition-colors font-medium">
              {t('feed_title')}
            </Link>
            <Link href="/ajutor-medical" className="text-red-500 hover:text-red-600 transition-colors font-medium">
              {t('nav_medical')}
            </Link>
            <Link href="/parteneri" className="text-text-main hover:text-primary transition-colors font-medium">
              {t('nav_parteneri')}
            </Link>
            <Link href="/campanii" className="text-orange-500 hover:text-orange-600 transition-colors font-medium">
              💝 {t('nav_campanii')}
            </Link>
            <Link href="/povesti" className="text-text-main hover:text-primary transition-colors font-medium">
              {t('nav_povesti')}
            </Link>
            <Link href="/despre" className="text-text-main hover:text-primary transition-colors font-medium">
              {t('nav_despre')}
            </Link>

            {/* Language selector */}
            <div className="relative">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as typeof lang)}
                className="appearance-none pl-3 pr-8 py-1.5 rounded-full border-2 border-primary bg-primary/10 text-primary font-bold text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 hover:bg-primary hover:text-white transition-colors animate-[wiggle_2s_ease-in-out_3]"
                title="Schimbă limba / Change language"
              >
                {LANG_OPTIONS.map(l => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-primary text-xs font-bold">▾</div>
            </div>

            <a
              href="#download"
              className="bg-primary text-white px-5 py-2 rounded-full font-semibold hover:bg-primary-dark transition-colors text-sm"
            >
              {t('nav_download')}
            </a>
          </div>

          {/* Mobile: lang select + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <div className="relative">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as typeof lang)}
                className="appearance-none pl-2 pr-6 py-1.5 rounded-full border-2 border-primary bg-primary/10 text-primary font-bold text-sm cursor-pointer focus:outline-none"
                title="Schimbă limba"
              >
                {LANG_OPTIONS.map(l => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-primary text-xs font-bold">▾</div>
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
          <div className="md:hidden py-4 border-t border-border-light flex flex-col gap-4">
            <Link href="/adoptii" className="text-text-main hover:text-primary transition-colors font-medium py-2" onClick={() => setMenuOpen(false)}>
              {t('feed_title')}
            </Link>
            <Link href="/ajutor-medical" className="text-red-500 hover:text-red-600 transition-colors font-medium py-2" onClick={() => setMenuOpen(false)}>
              {t('nav_medical')}
            </Link>
            <Link href="/parteneri" className="text-text-main hover:text-primary transition-colors font-medium py-2" onClick={() => setMenuOpen(false)}>
              {t('nav_parteneri')}
            </Link>
            <Link href="/campanii" className="text-orange-500 hover:text-orange-600 transition-colors font-medium py-2" onClick={() => setMenuOpen(false)}>
              💝 {t('nav_campanii')}
            </Link>
            <Link href="/povesti" className="text-text-main hover:text-primary transition-colors font-medium py-2" onClick={() => setMenuOpen(false)}>
              {t('nav_povesti')}
            </Link>
            <Link href="/despre" className="text-text-main hover:text-primary transition-colors font-medium py-2" onClick={() => setMenuOpen(false)}>
              {t('nav_despre')}
            </Link>
            <a
              href="#download"
              className="bg-primary text-white px-5 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors text-sm text-center"
              onClick={() => setMenuOpen(false)}
            >
              {t('nav_download')}
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
