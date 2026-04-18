export const dynamic = 'force-dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import AnimalCard from '@/components/AnimalCard'
import type { Animal, Partner } from '@/lib/supabase'

async function getRecentAnimals(): Promise<Animal[]> {
  const now = new Date().toISOString()

  const { data, error } = await supabase
    .from('animals')
    .select(`
      id, name, species, breed, age_years, age_months,
      location_city, location_county, status, expires_at, created_at,
      animal_photos (id, photo_url, is_main, order_index)
    `)
    .neq('status', 'adopted')
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Eroare la animals:', error)
    return []
  }

  return data as Animal[]
}

async function getPartners(): Promise<Partner[]> {
  const { data, error } = await supabase
    .from('partners')
    .select('id, name, category, city, description, logo_url, website_url')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(4)

  if (error) {
    console.error('Eroare la partners:', error)
    return []
  }

  return data as Partner[]
}

function getMainPhoto(animal: Animal): string | null {
  if (!animal.animal_photos || animal.animal_photos.length === 0) return null
  const main = animal.animal_photos.find((p) => p.is_main)
  if (main) return main.photo_url
  const sorted = [...animal.animal_photos].sort((a, b) => a.order_index - b.order_index)
  return sorted[0]?.photo_url ?? null
}

const categoryLabel: Record<string, string> = {
  vet: '🏥 Cabinet veterinar',
  food: '🥩 Hrană animale',
  accessories: '🎾 Accesorii',
  insurance: '🛡️ Asigurări',
  other: '🤝 Altele',
}

export default async function HomePage() {
  const [animals, partners] = await Promise.all([getRecentAnimals(), getPartners()])

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-pink-50 via-background to-red-50 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-6xl mb-6 animate-bounce">🐾</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-main leading-tight mb-6">
            Găsește animalul perfect{' '}
            <span className="text-primary">pentru tine</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Mii de animale din România așteaptă o casă iubitoare. Conectăm adăposturi,
            persoane private și familii care vor să adopte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/adoptii"
              className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
            >
              🐶 Vezi animale disponibile
            </Link>
            <a
              href="#cum-functioneaza"
              className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-50 transition-colors"
            >
              Cum funcționează?
            </a>
          </div>
        </div>
      </section>

      {/* ===== ULTIMELE ANIMALE ===== */}
      <section className="py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-main">
                Ultimele animale adăugate
              </h2>
              <p className="text-text-muted mt-1">Animale care așteaptă o casă chiar acum</p>
            </div>
            <Link
              href="/adoptii"
              className="hidden sm:block text-primary font-semibold hover:underline"
            >
              Vezi toate →
            </Link>
          </div>

          {animals.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {animals.map((animal) => (
                  <AnimalCard
                    key={animal.id}
                    id={animal.id}
                    name={animal.name}
                    species={animal.species}
                    breed={animal.breed}
                    age_years={animal.age_years}
                    age_months={animal.age_months}
                    location_city={animal.location_city}
                    location_county={animal.location_county}
                    photoUrl={getMainPhoto(animal)}
                    expiresAt={animal.expires_at}
                  />
                ))}
              </div>
              <div className="text-center mt-8 sm:hidden">
                <Link
                  href="/adoptii"
                  className="text-primary font-semibold hover:underline"
                >
                  Vezi toate animalele →
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-text-muted">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg">Nu există animale disponibile momentan.</p>
              <p className="text-sm mt-2">Revino curând sau descarcă aplicația pentru notificări.</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== CUM FUNCTIONEAZA ===== */}
      <section id="cum-functioneaza" className="bg-white py-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-main">Cum funcționează?</h2>
            <p className="text-text-muted mt-2">Simplu, rapid, direct</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                icon: '🔍',
                title: 'Caută',
                desc: 'Navighează prin sute de animale disponibile. Filtrează după specie, vârstă, locație.',
              },
              {
                step: '2',
                icon: '💬',
                title: 'Contactează',
                desc: 'Descarcă aplicația AnimalBond și contactează direct proprietarul sau adăpostul.',
              },
              {
                step: '3',
                icon: '🏠',
                title: 'Adoptă',
                desc: 'Programează o întâlnire, completează formalitățile și oferă o casă nouă.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
                  {item.icon}
                </div>
                <div className="text-primary font-bold text-sm mb-1">Pasul {item.step}</div>
                <h3 className="text-xl font-bold text-text-main mb-2">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARTENERI ===== */}
      {partners.length > 0 && (
        <section className="py-14 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-main">Partenerii noștri</h2>
                <p className="text-text-muted mt-1">Cabinete vet și magazine de încredere</p>
              </div>
              <Link href="/parteneri" className="hidden sm:block text-primary font-semibold hover:underline">
                Toți partenerii →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-card shadow-card p-4 border border-border-light hover:shadow-card-hover transition-all"
                >
                  {partner.logo_url ? (
                    <div className="relative w-full h-16 mb-3">
                      <Image
                        src={partner.logo_url}
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-16 bg-pink-50 rounded-lg mb-3 flex items-center justify-center text-2xl">
                      {categoryLabel[partner.category]?.split(' ')[0] || '🤝'}
                    </div>
                  )}
                  <h3 className="font-semibold text-text-main text-sm truncate">{partner.name}</h3>
                  <p className="text-text-muted text-xs mt-1">
                    {categoryLabel[partner.category] || partner.category}
                  </p>
                  {partner.city && (
                    <p className="text-text-muted text-xs mt-0.5">📍 {partner.city}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA PARTENERI ===== */}
      <section id="download" className="bg-gradient-to-br from-primary to-primary-dark py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="text-5xl mb-4">🏥</div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ești cabinet vet sau magazin pentru animale?
          </h2>
          <p className="text-white/80 mb-8 text-lg leading-relaxed">
            Înscrie-te gratuit ca partener AnimalBond și ajunge la mii de proprietari de animale
            din zona ta. Promovare gratuită în aplicație și pe site.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/partner-apply"
              className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-50 transition-colors shadow-lg"
            >
              Înscrie-te gratuit →
            </Link>
            <Link
              href="/parteneri"
              className="bg-white/20 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-colors"
            >
              Vezi partenerii actuali
            </Link>
          </div>
        </div>
      </section>

      {/* ===== DOWNLOAD APP ===== */}
      <section className="py-14 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Text + butoane */}
            <div className="flex-1 text-center lg:text-left">
              <div className="text-5xl mb-4">📱</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-main mb-4">
                Descarcă aplicația AnimalBond
              </h2>
              <p className="text-text-muted mb-8 text-lg max-w-xl">
                Contactează proprietarii, salvează animale favorite și primește notificări pentru animale noi din zona ta.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#"
                  className="flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span>
                    <div className="text-xs opacity-75">Descarcă din</div>
                    <div className="text-base leading-tight">App Store</div>
                  </span>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.38.21.82.24 1.23.09l12.5-7.21-2.73-2.72-11 10.84zm16.26-9.38L16.76 12l2.68-2.38-11.44-6.6c-.48-.28-1.04-.27-1.5-.04L17.44 14.38zM2.08 1.76C2.03 1.97 2 2.2 2 2.45v19.1c0 .26.03.49.09.7l11.2-11.02-11.21-9.47zm12.01 11.5L12 12l-9.14 8.98L14.09 13.26z" />
                  </svg>
                  <span>
                    <div className="text-xs opacity-75">Descarcă din</div>
                    <div className="text-base leading-tight">Google Play</div>
                  </span>
                </a>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center gap-3">
              <div className="bg-white border-2 border-border-light rounded-2xl p-4 shadow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&color=333333&bgcolor=ffffff&data=https://animalbond2025.vercel.app"
                  alt="QR code descărcare AnimalBond"
                  width={160}
                  height={160}
                />
              </div>
              <p className="text-sm text-text-muted text-center max-w-[160px]">
                Scanează pentru a deschide aplicația
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
