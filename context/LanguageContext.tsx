'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, type Lang, type TranslationKey } from '@/lib/i18n'

type LanguageContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ro',
  setLang: () => {},
  t: (key) => translations.ro[key],
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ro')

  useEffect(() => {
    const saved = localStorage.getItem('ab_lang') as Lang | null
    if (saved === 'ro' || saved === 'en') setLangState(saved)
  }, [])

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem('ab_lang', newLang)
  }

  const t = (key: TranslationKey): string => translations[lang][key] ?? translations.ro[key]

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
