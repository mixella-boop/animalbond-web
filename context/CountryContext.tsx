'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { COUNTRIES } from '@/lib/countries'
import { useLanguage } from '@/context/LanguageContext'
import { COUNTRY_TO_LANG } from '@/lib/i18n'

type CountryContextType = {
  country: string
  setCountry: (code: string) => void
}

const CountryContext = createContext<CountryContextType>({
  country: 'RO',
  setCountry: () => {},
})

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState('RO')
  const { setLang } = useLanguage()

  useEffect(() => {
    try {
      const match = document.cookie.match(/(?:^|;\s*)preferred_country=([^;]*)/)
      if (match) {
        const cookieCountry = decodeURIComponent(match[1]).toUpperCase()
        if (COUNTRIES.find(c => c.code === cookieCountry)) {
          setCountryState(cookieCountry)
          if (COUNTRY_TO_LANG[cookieCountry]) setLang(COUNTRY_TO_LANG[cookieCountry])
          return
        }
      }
    } catch {}
    setCountryState('RO')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setCountry = (code: string) => {
    setCountryState(code)
    if (code) {
      document.cookie = `preferred_country=${code};max-age=${60 * 60 * 24 * 30};path=/;samesite=lax`
      if (COUNTRY_TO_LANG[code]) setLang(COUNTRY_TO_LANG[code])
    } else {
      document.cookie = `preferred_country=;max-age=0;path=/;samesite=lax`
    }
  }

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  )
}

export function useCountry() {
  return useContext(CountryContext)
}
