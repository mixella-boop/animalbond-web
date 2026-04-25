'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, type Lang, type TranslationKey, COUNTRY_TO_LANG } from '@/lib/i18n'

const ALL_LANGS: Lang[] = ['ro', 'en', 'de', 'fr', 'it', 'es', 'hu']

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
    const saved = localStorage.getItem('ab_lang') as Lang | null
    if (saved && ALL_LANGS.includes(saved)) setLangState(saved)
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
