import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Adopții animale — Câini, pisici, iepuri | AnimalBond',
  description:
    'Adoptă un animal și schimbă o viață. Sute de câini, pisici, iepuri și alte animale caută o familie iubitoare în România și Europa. Filtrează după specie, locație și mai mult.',
  keywords: [
    'adoptii animale romania', 'adopta un caine', 'adopta o pisica',
    'animale fara stapan', 'adapost animale', 'caini de adoptie',
    'pisici de adoptie', 'animale de companie', 'animalbond',
  ],
  openGraph: {
    title: 'Adopții animale — Câini, pisici, iepuri | AnimalBond',
    description:
      'Adoptă un animal și schimbă o viață. Sute de animale caută o familie iubitoare în România și Europa.',
    url: 'https://animalbond.club/adoptii',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adopții animale | AnimalBond',
    description: 'Câini, pisici și alte animale care caută o familie. Adoptă, nu cumpăra.',
  },
  alternates: {
    canonical: 'https://animalbond.club/adoptii',
  },
}

export default function AdoptiiLayout({ children }: { children: React.ReactNode }) {
  return children
}
