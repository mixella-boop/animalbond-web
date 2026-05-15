import TestimonialeClient from './TestimonialeClient'

export const metadata = {
  title: 'Povești de adopție | AnimalBond',
  description: 'Povești reale de la oameni care au adoptat prin AnimalBond.',
}

export type Testimonial = {
  id: string
  text: string
  animal_name: string | null
  photo_url: string | null
  video_url: string | null
  created_at: string
  country: string | null
  profiles: { username: string; full_name: string | null; country_code: string | null } | null
}

export default function PovestiPage() {
  return <TestimonialeClient />
}
