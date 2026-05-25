// pricing/page.tsx — ascuns temporar până la activare de Mihaela
// Reactivare: scoate metadata noindex + înlocuiește conținutul cu pagina reală
import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
}

export default function PricingPage() {
  return null
}
