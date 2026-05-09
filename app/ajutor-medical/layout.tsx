import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ajutor medical animale — Cazuri urgente | AnimalBond',
  description:
    'Animale care au nevoie urgentă de îngrijire medicală. Donează sau adoptă un animal cu nevoi speciale din România. Fiecare contribuție contează.',
  keywords: [
    'animale bolnave adoptie', 'ajutor medical animale', 'donatie animale',
    'cazuri urgente animale', 'animale cu nevoi speciale', 'animalbond medical',
  ],
  openGraph: {
    title: 'Ajutor medical animale — Cazuri urgente | AnimalBond',
    description:
      'Animale care au nevoie urgentă de îngrijire medicală. Donează sau adoptă un animal cu nevoi speciale.',
    url: 'https://animalbond.club/ajutor-medical',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ajutor medical animale | AnimalBond',
    description: 'Animale bolnave care au nevoie de ajutor. Fiecare contribuție contează.',
  },
  alternates: {
    canonical: 'https://animalbond.club/ajutor-medical',
  },
}

export default function AjutorMedicalLayout({ children }: { children: React.ReactNode }) {
  return children
}
