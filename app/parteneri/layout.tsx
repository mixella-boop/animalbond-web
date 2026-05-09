import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Parteneri — Cabinete veterinare & magazine animale | AnimalBond',
  description:
    'Găsește cabinete veterinare, magazine de hrană și accesorii pentru animale, asigurări și alți parteneri verificați AnimalBond din România.',
  keywords: [
    'cabinet veterinar romania', 'veterinar', 'magazine animale',
    'hrana animale', 'accesorii animale', 'parteneri animalbond',
  ],
  openGraph: {
    title: 'Parteneri AnimalBond — Cabinete veterinare & magazine animale',
    description:
      'Cabinete veterinare, magazine de hrană și accesorii, asigurări — parteneri verificați AnimalBond.',
    url: 'https://animalbond.club/parteneri',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Parteneri AnimalBond',
    description: 'Cabinete veterinare și magazine de animale partenere.',
  },
  alternates: {
    canonical: 'https://animalbond.club/parteneri',
  },
}

export default function ParteneriLayout({ children }: { children: React.ReactNode }) {
  return children
}
