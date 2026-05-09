import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Animale pierdute și găsite în România | AnimalBond',
  description:
    'Ai pierdut sau găsit un animal? Postează un anunț pe AnimalBond și crește șansele de reunificare. Câini și pisici pierdute sau găsite în România.',
  keywords: [
    'animal pierdut romania', 'caine pierdut', 'pisica pierduta',
    'animal gasit', 'caut animal pierdut', 'anunt animal pierdut',
    'animale disparute romania', 'animalbond pierdute gasite',
  ],
  openGraph: {
    title: 'Animale pierdute și găsite în România | AnimalBond',
    description:
      'Ai pierdut sau găsit un animal? Postează un anunț și crește șansele de reunificare.',
    url: 'https://animalbond.club/pierdute-gasite',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Animale pierdute și găsite | AnimalBond',
    description: 'Câini și pisici pierdute sau găsite în România.',
  },
  alternates: {
    canonical: 'https://animalbond.club/pierdute-gasite',
  },
}

export default function PierdutGasitLayout({ children }: { children: React.ReactNode }) {
  return children
}
