import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Siguranța copiilor | AnimalBond',
  description: 'AnimalBond — Standardele de siguranță a copiilor, politica anti-CSAM și mecanismul de raportare.',
  robots: { index: true, follow: true },
}

export default function ChildSafetyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-text-main mb-2">Standardele de siguranță a copiilor</h1>
      <p className="text-text-muted text-sm mb-10">Ultima actualizare: mai 2026</p>

      <section className="prose prose-sm max-w-none text-text-main space-y-8">

        <div>
          <h2 className="text-xl font-bold mb-3">1. Despre AnimalBond</h2>
          <p className="text-text-muted leading-relaxed">
            AnimalBond este o platformă digitală pentru adopție, găzduire temporară și îngrijirea animalelor de companie. Platforma <strong>nu este destinată copiilor</strong>. Termenii noștri de utilizare cer ca toți utilizatorii să aibă <strong>cel puțin 16 ani</strong>. Nu colectăm cu bună știință date de la minori sub această vârstă.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">2. Toleranță zero pentru abuz asupra copiilor (CSAM)</h2>
          <p className="text-text-muted leading-relaxed">
            AnimalBond aplică o <strong>politică strictă de toleranță zero</strong> împotriva oricărei forme de Material de Abuz Sexual asupra Copiilor (CSAM), grooming online, exploatare sexuală a minorilor sau orice conținut care pune în pericol siguranța și bunăstarea copiilor. Acest tip de conținut este interzis pe platforma noastră, fără excepție.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">3. Cum raportezi conținut neadecvat</h2>
          <p className="text-text-muted leading-relaxed">
            Utilizatorii pot raporta conținut neadecvat, inclusiv probleme legate de siguranța copiilor, prin următoarele căi:
          </p>
          <ul className="list-disc list-inside text-text-muted space-y-1.5 leading-relaxed mt-2">
            <li><strong>În aplicație:</strong> Fiecare anunț și profil utilizator are un buton 🚩 &quot;Raportează&quot; vizibil și accesibil</li>
            <li><strong>Formular de contact:</strong> <a href="/contact" className="text-primary hover:underline">animalbond.club/contact</a></li>
            <li><strong>Categorii de raportare disponibile:</strong> CSAM/abuz sexual minori, grooming, conținut neadecvat, fraudă, abuz animale, altele</li>
          </ul>
          <p className="text-text-muted leading-relaxed mt-3">
            Rapoartele sunt analizate de echipa noastră de moderare. Conținutul care încalcă standardele de siguranță este eliminat imediat, iar acolo unde legea cere, este raportat autorităților competente.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">4. Acțiuni pe rapoarte & cooperare cu autoritățile</h2>
          <p className="text-text-muted leading-relaxed">
            Când se raportează sau se detectează CSAM ori încălcări ale siguranței copiilor:
          </p>
          <ul className="list-disc list-inside text-text-muted space-y-1.5 leading-relaxed mt-2">
            <li>Conținutul este eliminat imediat de pe platformă</li>
            <li>Contul vinovat este blocat permanent</li>
            <li>Dovezile sunt păstrate conform cerințelor legale</li>
            <li>Rapoartele sunt trimise către <strong>NCMEC</strong> (National Center for Missing &amp; Exploited Children) acolo unde se aplică</li>
            <li>Cooperare cu autoritățile naționale: <strong>ANPDCA</strong> (Autoritatea Națională pentru Protecția Drepturilor Copilului și Adopție), Poliția Română, DIICOT pentru infracțiuni online</li>
            <li>Conformitate cu regulamentele UE, inclusiv Regulamentul (UE) 2022/2065 (Digital Services Act)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">5. Conformitate legală</h2>
          <p className="text-text-muted leading-relaxed">
            AnimalBond respectă toate legile aplicabile privind siguranța copiilor, inclusiv:
          </p>
          <ul className="list-disc list-inside text-text-muted space-y-1.5 leading-relaxed mt-2">
            <li>Regulamentul (UE) 2022/2065 — Digital Services Act</li>
            <li>Regulamentul (UE) 2016/679 — GDPR (cu protecții speciale pentru minori)</li>
            <li>Legea 678/2001 — Prevenirea și combaterea traficului de persoane</li>
            <li>Legea 196/2003 — Prevenirea și combaterea pornografiei</li>
            <li>Raportare obligatorie NCMEC (18 U.S.C. § 2258A — unde se aplică)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">6. Persoană de contact pentru siguranța copiilor</h2>
          <p className="text-text-muted leading-relaxed">
            Pentru orice îngrijorare legată de siguranța copiilor pe AnimalBond, contactează-ne prin:
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mt-3 text-text-muted text-sm space-y-1">
            <p><strong>Operator: AnimalBond</strong></p>
            <p>Platformă: AnimalBond — animalbond.club</p>
            <p>Formular de contact:{' '}
              <a href="/contact" className="text-primary hover:underline">animalbond.club/contact</a>
            </p>
            <p className="text-xs text-gray-500 mt-2">Persoana de contact desemnată este pregătită să discute despre practicile de combatere a CSAM și conformitatea platformei.</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">7. Actualizări ale politicii</h2>
          <p className="text-text-muted leading-relaxed">
            Putem actualiza aceste standarde din când în când pentru a reflecta schimbări în practicile noastre sau cerințele legale. Cea mai recentă versiune este disponibilă întotdeauna la <a href="/siguranta-copii" className="text-primary hover:underline">animalbond.club/siguranta-copii</a>.
          </p>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="text-xs text-gray-500">
          <p className="font-semibold mb-2">English summary for international users:</p>
          <p>AnimalBond is a pet adoption platform restricted to users 16+. We have zero tolerance for CSAM, child grooming, or any content endangering minors. Reports can be submitted via in-app 🚩 button or animalbond.club/contact. We cooperate with NCMEC and Romanian authorities (ANPDCA, Police, DIICOT) and comply with EU Digital Services Act, GDPR, and all relevant Romanian and EU laws.</p>
        </div>

      </section>
    </div>
  )
}
