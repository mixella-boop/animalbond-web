import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Campanii donații animale — Adăposturi din România | AnimalBond',
  description:
    'Susține adăposturile de animale din România. Donează pentru cazuri medicale urgente, hrană, îngrijire. Fiecare donație ajunge direct la animalele care au nevoie.',
  keywords: [
    'donatie adapost animale', 'campanie donatie animale', 'ajuta animale romania',
    'donatie animale bolnave', 'sustine adapost', 'animalbond campanii',
  ],
  openGraph: {
    title: 'Campanii donații animale | AnimalBond',
    description:
      'Susține adăposturile de animale din România. Fiecare donație ajunge direct la animale.',
    url: 'https://animalbond.club/campanii',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Campanii donații animale | AnimalBond',
    description: 'Donează pentru adăposturile de animale din România.',
  },
  alternates: {
    canonical: 'https://animalbond.club/campanii',
  },
}

export default function CampaniiLayout({ children }: { children: React.ReactNode }) {
  return children
}
