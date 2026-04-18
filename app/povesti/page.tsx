export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabase'
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
  profiles: { username: string; full_name: string | null } | null
}

async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*, profiles (username, full_name)')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Eroare testimoniale:', error)
    return []
  }
  return data as Testimonial[]
}

export default async function PovestiPage() {
  const testimonials = await getTestimonials()
  return <TestimonialeClient testimonials={testimonials} />
}
