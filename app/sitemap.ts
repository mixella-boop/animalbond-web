import type { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://animalbond.ro'

  // Pagini statice
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/adoptii`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/parteneri`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/partner-apply`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/despre`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  // Pagini dinamice (animale)
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return staticPages
    }
    const now = new Date().toISOString()
    const { data } = await supabase
      .from('animals')
      .select('id, created_at')
      .neq('status', 'adopted')
      .or(`expires_at.is.null,expires_at.gt.${now}`)
      .limit(1000)

    const animalPages: MetadataRoute.Sitemap = (data || []).map((a) => ({
      url: `${baseUrl}/animal/${a.id}`,
      lastModified: new Date(a.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [...staticPages, ...animalPages]
  } catch {
    return staticPages
  }
}
