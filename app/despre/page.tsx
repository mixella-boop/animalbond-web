import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Despre AnimalBond',
  description:
    'Află misiunea AnimalBond — platforma care conectează animale fără casă cu familii iubitoare din România.',
}

export default function DesprePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="text-6xl mb-5">🐾</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-main mb-4">
          Despre AnimalBond
        </h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
          O platformă creată din dragoste pentru animale. Conectăm animale fără casă
          cu familii care vor să adopte, într-un mod simplu, rapid și sigur.
        </p>
      </div>

      {/* Misiune */}
      <section className="bg-white rounded-2xl shadow-card border border-border-light p-6 sm:p-8 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-4xl shrink-0">💡</span>
          <div>
            <h2 className="text-2xl font-bold text-text-main mb-3">Misiunea noastră</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              În România, mii de animale ajung în adăposturi sau pe stradă în fiecare an.
              AnimalBond a fost creat pentru a reduce această problemă prin tehnologie —
              oferind o punte digitală între animale care au nevoie de o casă și oameni
              care doresc să adopte.
            </p>
            <p className="text-text-muted leading-relaxed">
              Credem că adopția responsabilă poate salva vieți. De aceea, platforma
              noastră este gratuită pentru adăposturi și persoane private care vor să
              dea o șansă unui animal.
            </p>
          </div>
        </div>
      </section>

      {/* Cum functioneaza pentru adaposturi */}
      <section className="bg-white rounded-2xl shadow-card border border-border-light p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-6">
          Cum funcționează AnimalBond?
        </h2>
        <div className="space-y-6">
          {[
            {
              icon: '📸',
              title: 'Postezi animalul',
              desc: 'Adăugați poze și detalii despre animal direct din aplicație — durează 2 minute. Anunțul apare imediat pe site și în aplicație.',
            },
            {
              icon: '🔍',
              title: 'Adoptatorul găsește',
              desc: 'Mii de utilizatori caută zilnic animale de adoptat. Cu filtre avansate de compatibilitate, găsesc exact ce li se potrivește.',
            },
            {
              icon: '💬',
              title: 'Comunicare directă',
              desc: 'Mesagerie integrată în aplicație. Fără numere de telefon expuse public, fără intermediari — totul securizat.',
            },
            {
              icon: '🏠',
              title: 'Adopție reușită',
              desc: 'Animalul găsește o casă, tu marchezi adopția în aplicație, iar anunțul se închide automat.',
            },
          ].map((step) => (
            <div key={step.icon} className="flex gap-4">
              <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-primary/10">
                {step.icon}
              </div>
              <div>
                <h3 className="font-bold text-text-main mb-1">{step.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pentru adaposturi */}
      <section className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl border border-primary/10 p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-3">
          Pentru adăposturi și organizații 🏢
        </h2>
        <p className="text-text-muted mb-4 leading-relaxed">
          AnimalBond oferă funcționalități speciale pentru adăposturi:
        </p>
        <ul className="space-y-2 text-text-muted text-sm">
          {[
            'Postare nelimitată de animale — gratuit',
            'Gestionare centralizată a adoptaților',
            'Statistici și vizibilitate crescută',
            'Profil verificat cu badge „Adăpost oficial"',
            'Notificări automate pentru aplicanți',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Echipa / Valori */}
      <section className="bg-white rounded-2xl shadow-card border border-border-light p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-4">Valorile noastre</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '❤️', title: 'Bunăstarea animalelor', desc: 'Fiecare decizie de produs este luată cu gândul la binele animalelor.' },
            { icon: '🔒', title: 'Siguranță și GDPR', desc: 'Datele tale sunt protejate. Respectăm integral regulamentul GDPR.' },
            { icon: '🤝', title: 'Comunitate', desc: 'Construim o comunitate de oameni responsabili care adoptă, nu cumpără.' },
            { icon: '🌱', title: 'Acces gratuit', desc: 'Platforma rămâne gratuită pentru adăposturi și persoane private.' },
          ].map((val) => (
            <div key={val.icon} className="bg-gray-50 rounded-xl p-4 border border-border-light">
              <div className="text-2xl mb-2">{val.icon}</div>
              <h3 className="font-bold text-text-main mb-1 text-sm">{val.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white rounded-2xl shadow-card border border-border-light p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-4">Contact</h2>
        <div className="space-y-3 text-text-muted">
          <div className="flex items-center gap-3">
            <span className="text-xl">📧</span>
            <a href="mailto:contact@animalbond.ro" className="text-primary hover:underline font-medium">
              contact@animalbond.ro
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">📱</span>
            <span>Aplicație disponibilă pe App Store și Google Play</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">🤝</span>
            <Link href="/partner-apply" className="text-primary hover:underline font-medium">
              Parteneriate — completează formularul
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <div className="text-center py-8">
        <Link
          href="/adoptii"
          className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg inline-block"
        >
          🐾 Caută animale de adoptat
        </Link>
      </div>
    </div>
  )
}
