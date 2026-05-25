'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, type Lang, type TranslationKey, COUNTRY_TO_LANG } from '@/lib/i18n'

const ALL_LANGS: Lang[] = ['ro', 'en', 'de', 'fr', 'it', 'es', 'hu', 'pt', 'nl', 'ru']

type LanguageContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
  setLangForCountry: (countryCode: string) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ro',
  setLang: () => {},
  setLangForCountry: () => {},
  t: (key) => translations.ro[key],
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ro')

  useEffect(() => {
    // 1. Preferința salvată de user → prioritate maximă
    const saved = localStorage.getItem('ab_lang') as Lang | null
    if (saved && ALL_LANGS.includes(saved)) {
      setLangState(saved)
      return
    }
    // 2. Nicio preferință salvată → detectare din IP (Vercel x-vercel-ip-country)
    fetch('/api/detect-country')
      .then(r => r.json())
      .then(({ country }: { country: string }) => {
        if (country && COUNTRY_TO_LANG[country]) {
          setLangState(COUNTRY_TO_LANG[country])
          // Nu salvăm în localStorage — dacă userul schimbă manual, se salvează atunci
        }
      })
      .catch(() => {}) // fallback la 'ro' (default din useState)
  }, [])

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem('ab_lang', newLang)
  }

  const setLangForCountry = (countryCode: string) => {
    if (!countryCode) return // no auto-switch when clearing filter
    const mapped = COUNTRY_TO_LANG[countryCode]
    if (mapped) setLang(mapped)
  }

  const t = (key: TranslationKey): string => translations[lang][key] ?? translations.ro[key]

  return (
    <LanguageContext.Provider value={{ lang, setLang, setLangForCountry, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
