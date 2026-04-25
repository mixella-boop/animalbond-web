export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabase'
import HomePageClient from '@/components/HomePageClient'
import type { Partner } from '@/lib/supabase'
import type { Testimonial } from './povesti/page'

async function getRecentTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabase
    .from('testimonials')
    .select('*, profiles (username, full_name)')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(3)
  return (data as Testimonial[]) || []
}

async function getPartners(): Promise<Partner[]> {
  const { data, error } = await supabase
    .from('partners')
    .select('id, name, category, city, description, logo_url, url')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(4)
  if (error) { console.error('Eroare la partners:', error); return [] }
  return data as Partner[]
}

export default async function HomePage() {
  const [partners, testimonials] = await Promise.all([getPartners(), getRecentTestimonials()])
  return <HomePageClient partners={partners} testimonials={testimonials} />
}
