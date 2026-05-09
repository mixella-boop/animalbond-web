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

async function getLostFoundBanner(): Promise<{ count: number; photos: string[] }> {
  const now = new Date().toISOString()

  // Count real (fără date)
  const { count } = await supabase
    .from('animals')
    .select('id', { count: 'exact', head: true })
    .in('type', ['lost', 'found'])
    .eq('status', 'available')
    .or(`expires_at.is.null,expires_at.gt.${now}`)

  // Ultimele 2 poze pentru preview
  const { data: photoData } = await supabase
    .from('animals')
    .select('id, animal_photos (url, is_primary)')
    .in('type', ['lost', 'found'])
    .eq('status', 'available')
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .order('created_at', { ascending: false })
    .limit(2)

  const photos: string[] = (photoData || []).flatMap((a: any) => {
    const arr: { url: string; is_primary: boolean }[] = a.animal_photos || []
    const primary = arr.find(p => p.is_primary)?.url
    const first = arr[0]?.url
    const url = primary || first
    return url ? [url] : []
  })

  return { count: count ?? 0, photos }
}

export default async function HomePage() {
  const [partners, testimonials, lostFoundBanner] = await Promise.all([
    getPartners(),
    getRecentTestimonials(),
    getLostFoundBanner(),
  ])
  return <HomePageClient partners={partners} testimonials={testimonials} lostFoundBanner={lostFoundBanner} />
}
