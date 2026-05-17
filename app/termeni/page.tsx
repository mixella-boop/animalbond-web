import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termeni și Condiții | AnimalBond',
  description: 'Termenii și condițiile de utilizare ale platformei AnimalBond.',
  robots: { index: true, follow: true },
}

export default function TermeniPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-text-main mb-2">Termeni și Condiții</h1>
      <p className="text-text-muted text-sm mb-10">Versiunea 1.0 · 11 aprilie 2026</p>

      <section className="prose prose-sm max-w-none text-text-main space-y-8">

        <div>
          <h2 className="text-xl font-bold mb-3">1. Cine suntem</h2>
          <p className="text-text-muted leading-relaxed">
            AnimalBond este o platformă digitală care conectează persoanele care doresc să adopte, să găzduiască
            temporar, să dea spre adopție sau să ajute animale aflate în nevoie. Suntem o platformă intermediară
            — nu deținem, nu vindem și nu garantăm niciun animal listat. Operatorul platformei este{' '}
            <strong>Elena Lenghel</strong>, persoană fizică, cu adresa de contact:{' '}
            <a href="mailto:contact@animalbond.club" className="text-primary hover:underline">contact@animalbond.club</a>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">2. Eligibilitate</h2>
          <p className="text-text-muted leading-relaxed">
            Trebuie să ai cel puțin <strong>16 ani</strong> pentru a utiliza platforma.
            Serviciul nu este disponibil în țări aflate sub sancțiuni internaționale
            (Iran, Coreea de Nord, Rusia, Belarus, Siria, Cuba).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">3. Tipuri de cont</h2>
          <ul className="list-disc list-inside text-text-muted space-y-1.5 leading-relaxed">
            <li><strong>Utilizator</strong> — adoptă, dă spre adopție, donează. Gratuit.</li>
            <li><strong>Adăpost / Asociație</strong> — verificat manual. Gratuit.</li>
            <li><strong>Partener (companie)</strong> — veterinari, magazine pet, etc. Abonament lunar.</li>
          </ul>
          <p className="text-text-muted leading-relaxed mt-2">
            Poți deține un singur tip de cont. Adopția este disponibilă tuturor.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">4. Anunțuri — responsabilitățile tale</h2>
          <ul className="list-disc list-inside text-text-muted space-y-1.5 leading-relaxed">
            <li>Ești proprietarul legal al animalului</li>
            <li>Animalul NU este o specie protejată / CITES</li>
            <li>Pozele și descrierile sunt reale și actuale</li>
            <li>Marchezi anunțul ca „Adoptat" când animalul își găsește casă</li>
            <li>Anunțurile expiră automat după 90 de zile</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">5. Cazuri medicale și donații</h2>
          <p className="text-text-muted leading-relaxed">
            Poți publica IBAN-ul tău pentru donații directe. AnimalBond <strong>NU</strong> procesează,
            nu deține și nu transferă bani. Nu suntem responsabili pentru utilizarea incorectă a fondurilor.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">6. Comportament interzis</h2>
          <ul className="list-disc list-inside text-text-muted space-y-1.5 leading-relaxed">
            <li>Specii protejate, trafic de animale, practici crude</li>
            <li>Hărțuire, amenințări, mesaje comerciale nesolicitate</li>
            <li>Fraudă sau orice activitate ilegală</li>
            <li>Conturi false sau impersonarea altor persoane</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">7. Raportare</h2>
          <p className="text-text-muted leading-relaxed">
            Folosește butonul „Raportează" din aplicație sau de pe site pentru a semnala conținut
            inadecvat. Acționăm conform <strong>Digital Services Act (DSA — UE)</strong>.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">8. Ștergere cont</h2>
          <p className="text-text-muted leading-relaxed">
            Poți șterge contul oricând din Setări. Ștergerea este <strong>definitivă</strong> — profil,
            anunțuri, mesaje, fotografii.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">9. Răspundere</h2>
          <p className="text-text-muted leading-relaxed">
            Serviciul este oferit „așa cum este", fără garanții. Nu suntem responsabili pentru comportamentul
            utilizatorilor sau starea animalelor. Platforma este intermediară — orice tranzacție sau acord
            între utilizatori este responsabilitatea exclusivă a acestora.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">10. Proprietate intelectuală</h2>
          <p className="text-text-muted leading-relaxed">
            Toate elementele de design, logo-ul și denumirea „AnimalBond" sunt proprietatea operatorului.
            Fotografiile și descrierile anunțurilor aparțin utilizatorilor care le-au publicat.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">11. Modificări ale termenilor</h2>
          <p className="text-text-muted leading-relaxed">
            Ne rezervăm dreptul de a actualiza acești termeni. Modificările semnificative vor fi comunicate
            prin e-mail sau printr-un anunț în aplicație. Continuarea utilizării platformei după o modificare
            constituie acceptarea noilor termeni.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">12. Legea aplicabilă</h2>
          <p className="text-text-muted leading-relaxed">
            Legile <strong>României</strong> și, unde se aplică, ale <strong>Uniunii Europene</strong>.
            Instanțele competente sunt cele din București, România.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">13. Contact</h2>
          <div className="bg-gray-50 rounded-xl p-4 mt-3 text-text-muted text-sm space-y-1">
            <p><strong>Operator:</strong> Elena Lenghel</p>
            <p><strong>Platformă:</strong> AnimalBond — animalbond.club</p>
            <p><strong>E-mail:</strong>{' '}
              <a href="mailto:contact@animalbond.club" className="text-primary hover:underline">contact@animalbond.club</a>
            </p>
          </div>
        </div>

      </section>
    </div>
  )
}
