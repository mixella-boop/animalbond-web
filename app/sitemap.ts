import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://animalbond.club'

  return [
    // ─── Pagini principale ───────────────────────────────────
    { url: baseUrl,                         lastModified: new Date(), changeFrequency: 'daily',   priority: 1.0 },
    { url: `${baseUrl}/adoptii`,            lastModified: new Date(), changeFrequency: 'hourly',  priority: 0.95 },
    { url: `${baseUrl}/ajutor-medical`,     lastModified: new Date(), changeFrequency: 'daily',   priority: 0.85 },
    { url: `${baseUrl}/pierdute-gasite`,    lastModified: new Date(), changeFrequency: 'hourly',  priority: 0.85 },
    { url: `${baseUrl}/campanii`,           lastModified: new Date(), changeFrequency: 'daily',   priority: 0.80 },
    { url: `${baseUrl}/parteneri`,          lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.75 },
    { url: `${baseUrl}/povesti`,            lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.65 },
    { url: `${baseUrl}/despre`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.55 },
    { url: `${baseUrl}/partner-apply`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.50 },
  ]
}
