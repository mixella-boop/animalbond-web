import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Devino partener AnimalBond — Cabinet veterinar sau magazin | AnimalBond',
  description:
    'Înscrie-ți cabinetul veterinar sau magazinul de animale pe AnimalBond. Ajungi la mii de iubitori de animale din România. Înregistrare gratuită.',
  keywords: [
    'partener animalbond', 'cabinet veterinar partener', 'magazin animale partener',
    'promovare cabinet veterinar', 'listing veterinar romania', 'partener pet shop',
  ],
  openGraph: {
    title: 'Devino partener AnimalBond',
    description:
      'Înscrie-ți cabinetul sau magazinul. Ajungi la mii de iubitori de animale din România.',
    url: 'https://animalbond.club/partner-apply',
    type: 'website',
  },
  alternates: {
    canonical: 'https://animalbond.club/partner-apply',
  },
}

export default function PartnerApplyLayout({ children }: { children: React.ReactNode }) {
  return children
}
