import type { Metadata } from 'next'
import DespreClient from './DespreClient'

export const metadata: Metadata = {
  title: 'Despre AnimalBond',
  description:
    'Află misiunea AnimalBond — platforma care conectează animale fără casă cu familii iubitoare din România și Europa.',
}

export default function DesprePage() {
  return <DespreClient />
}
