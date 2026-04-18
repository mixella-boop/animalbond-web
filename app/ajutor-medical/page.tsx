export const dynamic = 'force-dynamic'

import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export const metadata = {
  title: 'Ajutor medical animale | AnimalBond',
  description: 'Animale care au nevoie urgentă de ajutor medical. Contactează prin aplicația AnimalBond.',
}

type MedicalAnimal = {
  id: string
  name: string
  species: string
  breed: string | null
  location: string | null
  description: string | null
  status: string
  expires_at: string | null
  created_at: string
  animal_photos: { url: string; is_primary: boolean }[]
}

const speciesEmoji: Record<string, string> = {
  dog: '🐶', cat: '🐱', rabbit: '🐰', bird: '🐦', other: '🐾',
  caine: '🐶', pisica: '🐱', iepure: '🐰', pasare: '🐦', altele: '🐾',
}

function getMainPhoto(animal: MedicalAnimal): string | null {
  if (!animal.animal_photos?.length) return null
  return animal.animal_photos.find(p => p.is_primary)?.url
    || animal.animal_photos[0]?.url
    || null
}

async function getMedicalAnimals(): Promise<MedicalAnimal[]> {
  const now = new Date().toISOString()
  const { data, error } = await supabase
    .from('animals')
    .select('id, name, species, breed, location, description, status, expires_at, created_at, animal_photos (url, is_primary)')
    .eq('type', 'medical')
    .eq('status', 'available')
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .order('created_at', { ascending: false })

  if (error) { console.error(error); return [] }
  return (data as MedicalAnimal[]) || []
}

export default async function AjutorMedicalPage() {
  const animals = await getMedicalAnimals()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-4">💊</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-main mb-3">
          Ajutor medical urgent
        </h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto mb-6">
          Aceste animale au nevoie de îngrijire medicală urgentă.
          Descarcă aplicația AnimalBond pentru a contacta direct și a oferi ajutor.
        </p>
        <a
          href="#download-app"
          className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-colors shadow-lg"
        >
          💙 Vreau să ajut
        </a>
      </div>

      {/* Banner urgent */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-8 flex items-center gap-3">
        <span className="text-2xl shrink-0">🚨</span>
        <p className="text-red-800 text-sm leading-relaxed">
          <strong>Fiecare oră contează.</strong> Contactul se face direct prin aplicație —
          descarcă AnimalBond și ajunge la persoana care are nevoie de sprijin.
        </p>
      </div>

      {/* Grid animale */}
      {animals.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">💚</div>
          <h2 className="text-xl font-semibold text-text-main mb-2">Niciun caz urgent momentan</h2>
          <p className="text-text-muted">Revino curând sau descarcă aplicația pentru notificări în timp real.</p>
        </div>
      ) : (
        <>
          <p className="text-text-muted text-sm mb-6">
            {animals.length} {animals.length === 1 ? 'caz activ' : 'cazuri active'} care au nevoie de ajutor
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {animals.map((animal) => {
              const photo = getMainPhoto(animal)
              const emoji = speciesEmoji[animal.species?.toLowerCase()] || '🐾'
              return (
                <div
                  key={animal.id}
                  className="bg-white rounded-card shadow-card border border-red-100 overflow-hidden hover:shadow-card-hover transition-all"
                >
                  {/* Poza */}
                  <div className="relative aspect-[4/3] bg-red-50">
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photo} alt={animal.name} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl">
                        {emoji}
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      💊 Nevoie urgentă
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-text-main text-lg mb-1">{animal.name}</h3>
                    {animal.breed && (
                      <p className="text-text-muted text-sm mb-1">{animal.breed}</p>
                    )}
                    {animal.location && (
                      <p className="text-text-muted text-sm mb-2">📍 {animal.location}</p>
                    )}
                    {animal.description && (
                      <p className="text-text-main text-sm leading-relaxed line-clamp-3 mb-3">
                        {animal.description}
                      </p>
                    )}
                    <a
                      href="#download-app"
                      className="block text-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                    >
                      💙 Ajut prin aplicație
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* CTA download */}
      <div id="download-app" className="mt-16 bg-gradient-to-br from-red-500 to-primary rounded-2xl p-8 text-center text-white">
        <div className="text-4xl mb-3">📱</div>
        <h2 className="text-2xl font-bold mb-3">Descarcă AnimalBond</h2>
        <p className="text-white/80 mb-6 max-w-md mx-auto">
          Contactează direct, oferă ajutor și salvează vieți. Gratuit pe iOS și Android.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#" className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
          </a>
          <a href="#" className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.38.21.82.24 1.23.09l12.5-7.21-2.73-2.72-11 10.84zm16.26-9.38L16.76 12l2.68-2.38-11.44-6.6c-.48-.28-1.04-.27-1.5-.04L17.44 14.38zM2.08 1.76C2.03 1.97 2 2.2 2 2.45v19.1c0 .26.03.49.09.7l11.2-11.02-11.21-9.47zm12.01 11.5L12 12l-9.14 8.98L14.09 13.26z" />
            </svg>
            Google Play
          </a>
        </div>
      </div>
    </div>
  )
}
