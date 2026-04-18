import Link from 'next/link'
import Image from 'next/image'

type AnimalCardProps = {
  id: string
  name: string
  species: string
  breed: string | null
  age_years?: number | null
  age_months?: number | null
  location?: string | null
  photoUrl?: string | null
  expiresAt?: string | null
}

const speciesEmoji: Record<string, string> = {
  dog: '🐶',
  cat: '🐱',
  rabbit: '🐰',
  bird: '🐦',
  hamster: '🐹',
  other: '🐾',
  caine: '🐶',
  pisica: '🐱',
  iepure: '🐰',
  pasare: '🐦',
  altele: '🐾',
}

const speciesLabel: Record<string, string> = {
  dog: 'Câine',
  cat: 'Pisică',
  rabbit: 'Iepure',
  bird: 'Pasăre',
  hamster: 'Hamster',
  other: 'Alt animal',
  caine: 'Câine',
  pisica: 'Pisică',
  iepure: 'Iepure',
  pasare: 'Pasăre',
  altele: 'Alt animal',
}

function formatAge(years?: number | null, months?: number | null): string {
  if (!years && !months) return 'Vârstă necunoscută'
  if (years && years > 0) {
    if (years === 1) return '1 an'
    return `${years} ani`
  }
  if (months && months > 0) {
    if (months === 1) return '1 lună'
    return `${months} luni`
  }
  return 'Vârstă necunoscută'
}

export default function AnimalCard({
  id,
  name,
  species,
  breed,
  age_years,
  age_months,
  location,
  photoUrl,
  expiresAt,
}: AnimalCardProps) {
  const emoji = speciesEmoji[species?.toLowerCase()] || '🐾'
  const label = speciesLabel[species?.toLowerCase()] || species
  const age = formatAge(age_years, age_months)

  // Verificare expirare
  const isExpiring =
    expiresAt && new Date(expiresAt) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)

  return (
    <Link href={`/animal/${id}`} className="group block">
      <div className="bg-card-bg rounded-card shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden border border-border-light group-hover:-translate-y-0.5">
        {/* Poza */}
        <div className="relative aspect-[4/3] bg-gray-100">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={`${name} - ${label}`}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-pink-50 to-red-50">
              {emoji}
            </div>
          )}
          {/* Badge specie */}
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2 py-1 rounded-full text-text-main shadow-sm">
            {emoji} {label}
          </div>
          {/* Badge expirare */}
          {isExpiring && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Expiră curând
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3 sm:p-4">
          <h3 className="font-bold text-text-main text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          {breed && (
            <p className="text-text-muted text-sm mb-1 truncate">{breed}</p>
          )}
          <div className="flex items-center justify-between mt-2 text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {age}
            </span>
            {location && (
              <span className="flex items-center gap-1 truncate ml-2">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="truncate">{location}</span>
              </span>
            )}
          </div>
          <div className="mt-3">
            <span className="text-primary text-sm font-semibold group-hover:underline">
              Vezi detalii →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
