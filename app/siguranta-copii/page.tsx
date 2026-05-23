import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Child Safety Standards | AnimalBond',
  description: 'AnimalBond — Child Safety Standards, CSAM prevention policy and reporting mechanism.',
  robots: { index: true, follow: true },
}

export default function ChildSafetyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-text-main mb-2">Child Safety Standards</h1>
      <p className="text-text-muted text-sm mb-2">AnimalBond — Standardele de siguranță a copiilor</p>
      <p className="text-text-muted text-sm mb-10">Last updated: May 2026</p>

      <section className="prose prose-sm max-w-none text-text-main space-y-8">

        <div>
          <h2 className="text-xl font-bold mb-3">1. About AnimalBond</h2>
          <p className="text-text-muted leading-relaxed">
            AnimalBond is a digital platform for animal adoption, fostering and care. The platform is <strong>not directed at children</strong>. Our Terms of Service require all users to be at least <strong>16 years old</strong>. We do not knowingly collect data from minors under this age.
          </p>
          <p className="text-text-muted leading-relaxed mt-2">
            <strong>RO:</strong> AnimalBond este o platformă digitală pentru adopție, găzduire temporară și îngrijirea animalelor. Platforma <strong>nu este destinată copiilor</strong>. Termenii noștri cer ca toți utilizatorii să aibă cel puțin <strong>16 ani</strong>. Nu colectăm cu bună știință date de la minori sub această vârstă.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">2. Zero Tolerance for Child Sexual Abuse Material (CSAM)</h2>
          <p className="text-text-muted leading-relaxed">
            AnimalBond has a <strong>strict zero-tolerance policy</strong> against any form of Child Sexual Abuse Material (CSAM), child grooming, sexual exploitation of minors or any other content that endangers the safety and well-being of children. Such content is strictly prohibited on our platform.
          </p>
          <p className="text-text-muted leading-relaxed mt-2">
            <strong>RO:</strong> AnimalBond aplică o <strong>politică strictă de toleranță zero</strong> împotriva oricărei forme de Material de Abuz Sexual asupra Copiilor (CSAM), groomingului, exploatării sexuale a minorilor sau orice alt conținut care pune în pericol siguranța și bunăstarea copiilor. Acest tip de conținut este strict interzis pe platforma noastră.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">3. Reporting Mechanism</h2>
          <p className="text-text-muted leading-relaxed">Users can report inappropriate content, including any concerns related to child safety, through the following channels:</p>
          <ul className="list-disc list-inside text-text-muted space-y-1.5 leading-relaxed mt-2">
            <li><strong>In-app:</strong> Each listing and user profile has a &quot;Report&quot; button (🚩) directly accessible</li>
            <li><strong>Contact form:</strong> <a href="/contact" className="text-primary hover:underline">animalbond.club/contact</a></li>
            <li><strong>Email:</strong> Through our contact form, monitored by the operator</li>
          </ul>
          <p className="text-text-muted leading-relaxed mt-3">
            Reports are reviewed by our moderation team. Content that violates child safety standards is removed immediately, and where required by law, reported to the appropriate authorities.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">4. Action on Reports & Cooperation with Authorities</h2>
          <p className="text-text-muted leading-relaxed">When CSAM or child safety violations are reported or detected:</p>
          <ul className="list-disc list-inside text-text-muted space-y-1.5 leading-relaxed mt-2">
            <li>Content is immediately removed from the platform</li>
            <li>The offending account is permanently banned</li>
            <li>Evidence is preserved as required by law</li>
            <li>Reports are forwarded to <strong>NCMEC</strong> (National Center for Missing & Exploited Children) where applicable</li>
            <li>Cooperation with national law enforcement and child protection authorities (in Romania: <strong>ANPDCA</strong> — Autoritatea Națională pentru Protecția Drepturilor Copilului și Adopție, Police, DIICOT for online crimes)</li>
            <li>Compliance with EU regulations including the Digital Services Act (DSA) and Regulation (EU) 2022/2065</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">5. Compliance with Laws</h2>
          <p className="text-text-muted leading-relaxed">AnimalBond complies with all relevant laws regarding child safety, including but not limited to:</p>
          <ul className="list-disc list-inside text-text-muted space-y-1.5 leading-relaxed mt-2">
            <li>EU Regulation 2022/2065 (Digital Services Act)</li>
            <li>EU Regulation 2016/679 (GDPR) — including special protections for minors</li>
            <li>Romanian Law 678/2001 on preventing and combating human trafficking</li>
            <li>Romanian Law 196/2003 on preventing and combating pornography</li>
            <li>U.S. 18 U.S.C. § 2258A (mandatory NCMEC reporting where applicable)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">6. Designated Contact for Child Safety</h2>
          <p className="text-text-muted leading-relaxed">
            For any concerns related to child safety on AnimalBond, contact us through:
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mt-3 text-text-muted text-sm space-y-1">
            <p><strong>Operator:</strong> AnimalBond</p>
            <p><strong>Platform:</strong> AnimalBond — animalbond.club</p>
            <p><strong>Contact form:</strong>{' '}
              <a href="/contact" className="text-primary hover:underline">animalbond.club/contact</a>
            </p>
            <p className="text-xs text-gray-500 mt-2">The designated contact is prepared to discuss CSAM prevention practices and platform compliance.</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">7. Updates to This Policy</h2>
          <p className="text-text-muted leading-relaxed">
            We may update these standards from time to time to reflect changes in our practices or legal requirements. The latest version is always available at <a href="/siguranta-copii" className="text-primary hover:underline">animalbond.club/siguranta-copii</a>.
          </p>
        </div>

      </section>
    </div>
  )
}
