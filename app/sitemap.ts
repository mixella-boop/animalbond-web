import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://animalbond.ro'

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/adoptii`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/parteneri`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/partner-apply`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/despre`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
