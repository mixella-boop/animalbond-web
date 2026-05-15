import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politică de confidențialitate | AnimalBond',
  description: 'Politica de confidențialitate a platformei AnimalBond — cum colectăm, folosim și protejăm datele tale.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-text-main mb-2">Politică de confidențialitate</h1>
      <p className="text-text-muted text-sm mb-10">Ultima actualizare: 15 mai 2026</p>

      <section className="prose prose-sm max-w-none text-text-main space-y-8">

        {/* 1 */}
        <div>
          <h2 className="text-xl font-bold mb-3">1. Cine suntem</h2>
          <p className="text-text-muted leading-relaxed">
            AnimalBond este o platformă digitală de adopție și îngrijire a animalelor, accesibilă la{' '}
            <strong>animalbond.club</strong> și prin aplicația mobilă AnimalBond.
            Operatorul de date cu caracter personal este <strong>Elena Lenghel</strong>, persoană fizică,
            cu adresa de contact: <a href="mailto:contact@animalbond.club" className="text-primary hover:underline">contact@animalbond.club</a>.
          </p>
          <p className="text-text-muted leading-relaxed mt-2">
            Această politică se aplică tuturor utilizatorilor platformei AnimalBond (site web și aplicație mobilă)
            și descrie cum colectăm, utilizăm și protejăm datele tale cu caracter personal, în conformitate cu
            Regulamentul (UE) 2016/679 (GDPR).
          </p>
        </div>

        {/* 2 */}
        <div>
          <h2 className="text-xl font-bold mb-3">2. Ce date colectăm și de ce</h2>

          <h3 className="font-semibold mt-4 mb-2">2.1 Date de cont</h3>
          <p className="text-text-muted leading-relaxed">
            La înregistrare colectăm: <strong>adresa de e-mail, numele/username-ul și parola</strong> (stocată exclusiv
            în formă criptată, ireversibilă). Opțional, poți adăuga un număr de telefon.
            Baza legală: executarea contractului (art. 6(1)(b) GDPR).
          </p>

          <h3 className="font-semibold mt-4 mb-2">2.2 Date de profil</h3>
          <p className="text-text-muted leading-relaxed">
            Poți completa profilul cu: <strong>țara de reședință, limba preferată, fotografie de profil și rolul ales</strong>
            (adoptator, cedent, adăpost, partener). Aceste date sunt necesare pentru funcționarea serviciului de matching
            și filtrarea anunțurilor. Baza legală: executarea contractului.
          </p>

          <h3 className="font-semibold mt-4 mb-2">2.3 Anunțuri și fotografii</h3>
          <p className="text-text-muted leading-relaxed">
            Când postezi un anunț de adopție, vânzare sau pierdut/găsit, colectăm: <strong>fotografii ale
            animalului, descriere, locație (județ/oraș) și coordonate GPS aproximate</strong>. Coordonatele exacte
            nu sunt afișate public — platforma folosește o locație aproximată (raza de ~2 km) pentru a proteja
            adresa ta reală. Baza legală: executarea contractului.
          </p>

          <h3 className="font-semibold mt-4 mb-2">2.4 Mesaje și comunicare</h3>
          <p className="text-text-muted leading-relaxed">
            Mesajele trimise între utilizatori prin sistemul de chat al platformei sunt stocate pentru a permite
            continuarea conversației și pentru siguranța utilizatorilor (detectarea abuzurilor).
            Baza legală: executarea contractului și interesul legitim (art. 6(1)(f) GDPR).
          </p>

          <h3 className="font-semibold mt-4 mb-2">2.5 Date de utilizare</h3>
          <p className="text-text-muted leading-relaxed">
            Colectăm informații despre interacțiunile tale cu platforma: <strong>preferințe (like/dislike),
            rapoarte trimise, testimoniale publicate</strong>. Aceste date sunt folosite pentru îmbunătățirea
            algoritmului de matching și a serviciului. Baza legală: interesul legitim.
          </p>

          <h3 className="font-semibold mt-4 mb-2">2.6 Date tehnice</h3>
          <p className="text-text-muted leading-relaxed">
            Prin simpla utilizare a platformei, serverele noastre procesează automat: <strong>adresa IP,
            tipul de dispozitiv, browserul, data și ora accesului</strong>. Aceste date sunt necesare pentru
            securitatea și funcționarea tehnică a serviciului. Baza legală: interesul legitim.
          </p>

          <h3 className="font-semibold mt-4 mb-2">2.7 Date de plată</h3>
          <p className="text-text-muted leading-relaxed">
            Dacă efectuezi o donație prin platformă, plata este procesată exclusiv de <strong>Stripe, Inc.</strong>
            AnimalBond nu stochează niciodată datele cardului tău bancar. Primim doar confirmarea plății și suma.
            Baza legală: executarea contractului.
          </p>
        </div>

        {/* 3 */}
        <div>
          <h2 className="text-xl font-bold mb-3">3. Cum folosim datele tale</h2>
          <ul className="list-disc list-inside text-text-muted space-y-1.5 leading-relaxed">
            <li>Furnizarea și îmbunătățirea serviciilor platformei AnimalBond</li>
            <li>Autentificarea și securizarea contului tău</li>
            <li>Afișarea anunțurilor și calculul scorului de compatibilitate (matching)</li>
            <li>Trimiterea de notificări relevante legate de activitatea ta (e-mail)</li>
            <li>Prevenirea fraudei, abuzurilor și activităților ilegale</li>
            <li>Respectarea obligațiilor legale aplicabile</li>
          </ul>
          <p className="text-text-muted leading-relaxed mt-3">
            Nu folosim datele tale pentru publicitate comportamentală și nu le vindem niciodată unor terți.
          </p>
        </div>

        {/* 4 */}
        <div>
          <h2 className="text-xl font-bold mb-3">4. Cu cine partajăm datele</h2>
          <p className="text-text-muted leading-relaxed mb-3">
            Datele tale sunt accesate doar de operatorul platformei și de furnizorii de servicii tehnice
            necesari funcționării AnimalBond:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border-light rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2 font-semibold text-text-main">Furnizor</th>
                  <th className="text-left px-4 py-2 font-semibold text-text-main">Scop</th>
                  <th className="text-left px-4 py-2 font-semibold text-text-main">Locație</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light text-text-muted">
                <tr><td className="px-4 py-2">Supabase, Inc.</td><td className="px-4 py-2">Bază de date și autentificare</td><td className="px-4 py-2">SUA / UE</td></tr>
                <tr><td className="px-4 py-2">Vercel, Inc.</td><td className="px-4 py-2">Hosting site web</td><td className="px-4 py-2">SUA / UE</td></tr>
                <tr><td className="px-4 py-2">Stripe, Inc.</td><td className="px-4 py-2">Procesare plăți</td><td className="px-4 py-2">SUA</td></tr>
                <tr><td className="px-4 py-2">Resend, Inc.</td><td className="px-4 py-2">Trimitere e-mailuri</td><td className="px-4 py-2">SUA</td></tr>
                <tr><td className="px-4 py-2">Expo (Expo Go)</td><td className="px-4 py-2">Distribuție aplicație mobilă</td><td className="px-4 py-2">SUA</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-text-muted leading-relaxed mt-3 text-xs">
            Toți furnizorii de mai sus sunt certificați sau conformi cu cerințele GDPR pentru transferul de date
            în afara UE (Clauze Contractuale Standard sau mecanisme echivalente).
          </p>
          <p className="text-text-muted leading-relaxed mt-2">
            Datele pot fi dezvăluite autorităților publice exclusiv când acest lucru este impus de lege.
          </p>
        </div>

        {/* 5 */}
        <div>
          <h2 className="text-xl font-bold mb-3">5. Cât timp păstrăm datele</h2>
          <ul className="list-disc list-inside text-text-muted space-y-1.5 leading-relaxed">
            <li><strong>Date de cont:</strong> pe toată durata existenței contului + 30 de zile după ștergere</li>
            <li><strong>Anunțuri:</strong> până la expirare sau ștergere de către utilizator</li>
            <li><strong>Mesaje:</strong> 12 luni de la data trimiterii</li>
            <li><strong>Date tehnice (loguri):</strong> maximum 90 de zile</li>
            <li><strong>Date de plată:</strong> conform cerințelor legale fiscale (5 ani)</li>
          </ul>
        </div>

        {/* 6 */}
        <div>
          <h2 className="text-xl font-bold mb-3">6. Drepturile tale (GDPR)</h2>
          <p className="text-text-muted leading-relaxed mb-3">
            În calitate de persoană vizată, ai următoarele drepturi:
          </p>
          <ul className="list-disc list-inside text-text-muted space-y-1.5 leading-relaxed">
            <li><strong>Dreptul de acces</strong> — poți solicita o copie a datelor tale</li>
            <li><strong>Dreptul la rectificare</strong> — poți corecta datele incorecte direct din profil</li>
            <li><strong>Dreptul la ștergere</strong> — poți șterge contul și datele asociate</li>
            <li><strong>Dreptul la portabilitate</strong> — poți solicita datele în format structurat</li>
            <li><strong>Dreptul la restricționarea prelucrării</strong> — în cazurile prevăzute de GDPR</li>
            <li><strong>Dreptul de opoziție</strong> — față de prelucrările bazate pe interes legitim</li>
            <li><strong>Dreptul de a retrage consimțământul</strong> — oricând, fără consecințe negative</li>
          </ul>
          <p className="text-text-muted leading-relaxed mt-3">
            Pentru exercitarea oricărui drept, contactează-ne la{' '}
            <a href="mailto:contact@animalbond.club" className="text-primary hover:underline">contact@animalbond.club</a>.
            Răspundem în maximum 30 de zile. Ai și dreptul de a depune o plângere la{' '}
            <strong>ANSPDCP</strong> (Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal),{' '}
            <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.dataprotection.ro</a>.
          </p>
        </div>

        {/* 7 */}
        <div>
          <h2 className="text-xl font-bold mb-3">7. Cookie-uri și stocare locală</h2>
          <p className="text-text-muted leading-relaxed">
            Site-ul AnimalBond folosește un număr minim de cookie-uri strict necesare funcționării:
          </p>
          <ul className="list-disc list-inside text-text-muted space-y-1.5 leading-relaxed mt-2">
            <li><strong>preferred_country</strong> — reține țara selectată (30 zile, stocată local)</li>
            <li><strong>ab_lang</strong> — reține limba preferată (stocare locală în browser)</li>
            <li><strong>Sesiune autentificare</strong> — necesară pentru menținerea stării de conectare</li>
          </ul>
          <p className="text-text-muted leading-relaxed mt-2">
            Nu folosim cookie-uri de urmărire, publicitate sau analytics de la terți.
          </p>
        </div>

        {/* 8 */}
        <div>
          <h2 className="text-xl font-bold mb-3">8. Minori</h2>
          <p className="text-text-muted leading-relaxed">
            Platforma AnimalBond este destinată persoanelor cu vârsta de minimum <strong>16 ani</strong>.
            Nu colectăm în mod intenționat date de la minori sub această vârstă. Dacă ești părinte sau tutore
            și crezi că un minor și-a creat un cont, te rugăm să ne contactezi la{' '}
            <a href="mailto:contact@animalbond.club" className="text-primary hover:underline">contact@animalbond.club</a>{' '}
            și vom șterge imediat datele respective.
          </p>
        </div>

        {/* 9 */}
        <div>
          <h2 className="text-xl font-bold mb-3">9. Securitatea datelor</h2>
          <p className="text-text-muted leading-relaxed">
            Luăm măsuri tehnice și organizatorice adecvate pentru a proteja datele tale:
            conexiuni criptate (HTTPS/TLS), parole stocate exclusiv în formă hash (bcrypt),
            acces restricționat la baza de date, locații GPS aproximate (nu exacte) pentru anunțuri publice,
            și rate limiting pe mesaje pentru prevenirea abuzurilor.
          </p>
        </div>

        {/* 10 */}
        <div>
          <h2 className="text-xl font-bold mb-3">10. Modificări ale politicii</h2>
          <p className="text-text-muted leading-relaxed">
            Putem actualiza această politică periodic. Modificările semnificative vor fi comunicate prin e-mail
            sau printr-un anunț vizibil în aplicație. Data ultimei actualizări este afișată în antetul acestei pagini.
            Continuarea utilizării platformei după o modificare constituie acceptarea noii politici.
          </p>
        </div>

        {/* 11 */}
        <div>
          <h2 className="text-xl font-bold mb-3">11. Contact</h2>
          <p className="text-text-muted leading-relaxed">
            Pentru orice întrebare legată de prelucrarea datelor tale cu caracter personal:
          </p>
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
