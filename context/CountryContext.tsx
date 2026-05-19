'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { COUNTRIES } from '@/lib/countries'
import { useLanguage } from '@/context/LanguageContext'
import { COUNTRY_TO_LANG } from '@/lib/i18n'

// Coduri de țări suportate de aplicație (cu traduceri + orașe)
const SUPPORTED_CODES = new Set(COUNTRIES.map(c => c.code))

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
    // 1. Verifică cookie (alegere anterioară a userului)
    try {
      const match = document.cookie.match(/(?:^|;\s*)preferred_country=([^;]*)/)
      if (match) {
        const cookieCountry = decodeURIComponent(match[1]).toUpperCase()
        if (SUPPORTED_CODES.has(cookieCountry)) {
          setCountryState(cookieCountry)
          if (COUNTRY_TO_LANG[cookieCountry]) setLang(COUNTRY_TO_LANG[cookieCountry])
          return // cookie valid → stop
        }
      }
    } catch {}

    // 2. Prima vizită: detectează țara din IP (fără cookie)
    const detectFromIP = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) })
        if (!res.ok) throw new Error('ipapi failed')
        const data = await res.json()
        const detected = (data.country_code || '').toUpperCase()
        if (detected && SUPPORTED_CODES.has(detected)) {
          setCountryState(detected)
          // Salvează în cookie 30 zile — la vizite viitoare folosim direct cookie-ul
          document.cookie = `preferred_country=${detected};max-age=${60 * 60 * 24 * 30};path=/;samesite=lax`
          if (COUNTRY_TO_LANG[detected]) setLang(COUNTRY_TO_LANG[detected])
          return
        }
      } catch {
        // Silent fail — rămâne 'RO'
      }

      // 3. Fallback: derivă din limba browserului
      try {
        const browserLangs = navigator.languages || [navigator.language]
        for (const blang of browserLangs) {
          const code = blang.split('-')[1]?.toUpperCase()
          if (code && SUPPORTED_CODES.has(code)) {
            setCountryState(code)
            document.cookie = `preferred_country=${code};max-age=${60 * 60 * 24 * 30};path=/;samesite=lax`
            if (COUNTRY_TO_LANG[code]) setLang(COUNTRY_TO_LANG[code])
            return
          }
        }
      } catch {}

      // 4. Default: România
      setCountryState('RO')
    }

    detectFromIP()
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
