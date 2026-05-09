// ─── AnimalBond Web — Middleware (Vercel IP → preferred_country cookie) ────────
//
// Detectează automat țara vizitatorului din header-ul Vercel `x-vercel-ip-country`
// și o salvează ca cookie `preferred_country` (valabil 30 zile).
//
// Condiție: cookie-ul se setează DOAR dacă nu există deja — astfel preferința
// manuală a utilizatorului (dacă a schimbat țara din feed) este respectată.
//
// Cookie-ul nu este httpOnly → poate fi citit de JS pe client (adoptii/page.tsx).

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Mapare cod Vercel → cod țară folosit în app
// Vercel returnează ISO 3166-1 alpha-2 (ex: 'RO', 'DE', 'FR')
// care coincide cu codurile din lib/countries.ts
const SUPPORTED_COUNTRIES = new Set([
  'RO', 'MD', 'DE', 'IT', 'ES', 'FR', 'GB', 'AT', 'BE',
  'NL', 'CH', 'HU', 'BG', 'GR', 'US', 'CA', 'AU',
])

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Setăm cookie-ul DOAR dacă nu există deja (nu suprascrie preferința manuală)
  if (!request.cookies.has('preferred_country')) {
    const ipCountry = request.headers.get('x-vercel-ip-country')

    if (ipCountry && SUPPORTED_COUNTRIES.has(ipCountry.toUpperCase())) {
      response.cookies.set('preferred_country', ipCountry.toUpperCase(), {
        maxAge: 60 * 60 * 24 * 30, // 30 zile
        sameSite: 'lax',
        path: '/',
        // Nu punem httpOnly: true → să fie citibil din JS pe client
      })
    }
  }

  return response
}

// Rulează pe toate rutele publice, excludem fișierele statice și API
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|api/).*)',
  ],
}
