export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import type { Animal } from '@/lib/supabase'
import AnimalDetailClient from './AnimalDetailClient'

type PageProps = {
  params: Promise<{ id: string }>
}

async function getAnimal(id: string): Promise<Animal | null> {
  const { data, error } = await supabase
    .from('animals')
    .select(`
      id, name, species, breed, age_years, age_months, gender,
      location, description, status, expires_at, created_at, type, country,
      animal_photos (id, url, is_primary, order_index)
    `)
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data as Animal
}

const speciesLabelRo: Record<string, string> = {
  dog: 'Câine', cat: 'Pisică', rabbit: 'Iepure', bird: 'Pasăre',
  hamster: 'Hamster', other: 'Alt animal',
  caine: 'Câine', pisica: 'Pisică', iepure: 'Iepure', pasare: 'Pasăre', altele: 'Alt animal',
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const animal = await getAnimal(id)

  if (!animal) {
    return { title: 'Animal negăsit | AnimalBond' }
  }

  const photos = (animal.animal_photos || []).sort((a, b) => {
    if (a.is_primary && !b.is_primary) return -1
    if (!a.is_primary && b.is_primary) return 1
    return a.order_index - b.order_index
  })
  const mainPhoto = photos[0]?.url
  const species = animal.species?.toLowerCase() ?? ''

  const description = animal.description
    ? animal.description.slice(0, 150) + (animal.description.length > 150 ? '...' : '')
    : `Adoptă ${animal.name} — ${speciesLabelRo[species] || animal.species} disponibil pentru adopție pe AnimalBond.`

  const location = animal.location || ''
  const title = `Adopție ${animal.name} — ${animal.breed || speciesLabelRo[species] || animal.species}${location ? `, ${location}` : ''}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: mainPhoto ? [{ url: mainPhoto, width: 800, height: 600, alt: animal.name }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: mainPhoto ? [mainPhoto] : [],
    },
  }
}

export default async function AnimalPage({ params }: PageProps) {
  const { id } = await params
  const animal = await getAnimal(id)

  if (!animal) {
    notFound()
  }

  return <AnimalDetailClient animal={animal} />
}
