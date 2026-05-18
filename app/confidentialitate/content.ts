export type Lang = 'ro' | 'en' | 'de' | 'fr' | 'it' | 'es' | 'hu'

export interface PrivacySubsection {
  title: string
  text: string
}

export interface PrivacySection {
  title: string
  paragraphs?: string[]
  subsections?: PrivacySubsection[]
  items?: string[]
  afterItems?: string
  tableHeaders?: string[]
  tableNote?: string
  tableAfter?: string
  contactBox?: { operator: string; platform: string; emailLabel: string }
}

export interface PrivacyContent {
  pageTitle: string
  lastUpdate: string
  sections: PrivacySection[]
}

// Rândurile tabelului cu furnizorii — identice în toate limbile
const TABLE_ROWS = [
  ['Supabase, Inc.', 'Database & authentication', 'USA / EU'],
  ['Vercel, Inc.', 'Web hosting', 'USA / EU'],
  ['Stripe, Inc.', 'Payment processing', 'USA'],
  ['Resend, Inc.', 'Email sending', 'USA'],
  ['Expo (Expo Go)', 'Mobile app distribution', 'USA'],
]

export const TABLE_ROWS_DATA = TABLE_ROWS

export const PRIVACY_CONTENT: Record<Lang, PrivacyContent> = {
  ro: {
    pageTitle: 'Politică de confidențialitate',
    lastUpdate: 'Ultima actualizare: 15 mai 2026',
    sections: [
      {
        title: '1. Cine suntem',
        paragraphs: [
          'AnimalBond este o platformă digitală de adopție și îngrijire a animalelor, accesibilă la animalbond.club și prin aplicația mobilă AnimalBond. Operatorul de date cu caracter personal este Elena Lenghel, persoană fizică, cu adresa de contact: contact@animalbond.club.',
          'Această politică se aplică tuturor utilizatorilor platformei AnimalBond (site web și aplicație mobilă) și descrie cum colectăm, utilizăm și protejăm datele tale cu caracter personal, în conformitate cu Regulamentul (UE) 2016/679 (GDPR).',
        ],
      },
      {
        title: '2. Ce date colectăm și de ce',
        subsections: [
          { title: '2.1 Date de cont', text: 'La înregistrare colectăm: adresa de e-mail, numele/username-ul și parola (stocată exclusiv în formă criptată, ireversibilă). Opțional, poți adăuga un număr de telefon. Baza legală: executarea contractului (art. 6(1)(b) GDPR).' },
          { title: '2.2 Date de profil', text: 'Poți completa profilul cu: țara de reședință, limba preferată, fotografie de profil și rolul ales (adoptator, cedent, adăpost, partener). Aceste date sunt necesare pentru funcționarea serviciului de matching și filtrarea anunțurilor. Baza legală: executarea contractului.' },
          { title: '2.3 Anunțuri și fotografii', text: 'Când postezi un anunț de adopție, vânzare sau pierdut/găsit, colectăm: fotografii ale animalului, descriere, locație (județ/oraș) și coordonate GPS aproximate. Coordonatele exacte nu sunt afișate public — platforma folosește o locație aproximată (raza de ~2 km) pentru a proteja adresa ta reală. Baza legală: executarea contractului.' },
          { title: '2.4 Mesaje și comunicare', text: 'Mesajele trimise între utilizatori prin sistemul de chat al platformei sunt stocate pentru a permite continuarea conversației și pentru siguranța utilizatorilor (detectarea abuzurilor). Baza legală: executarea contractului și interesul legitim (art. 6(1)(f) GDPR).' },
          { title: '2.5 Date de utilizare', text: 'Colectăm informații despre interacțiunile tale cu platforma: preferințe (like/dislike), rapoarte trimise, testimoniale publicate. Aceste date sunt folosite pentru îmbunătățirea algoritmului de matching și a serviciului. Baza legală: interesul legitim.' },
          { title: '2.6 Date tehnice', text: 'Prin simpla utilizare a platformei, serverele noastre procesează automat: adresa IP, tipul de dispozitiv, browserul, data și ora accesului. Aceste date sunt necesare pentru securitatea și funcționarea tehnică a serviciului. Baza legală: interesul legitim.' },
          { title: '2.7 Date de plată', text: 'Dacă efectuezi o donație prin platformă, plata este procesată exclusiv de Stripe, Inc. AnimalBond nu stochează niciodată datele cardului tău bancar. Primim doar confirmarea plății și suma. Baza legală: executarea contractului.' },
        ],
      },
      {
        title: '3. Cum folosim datele tale',
        items: [
          'Furnizarea și îmbunătățirea serviciilor platformei AnimalBond',
          'Autentificarea și securizarea contului tău',
          'Afișarea anunțurilor și calculul scorului de compatibilitate (matching)',
          'Trimiterea de notificări relevante legate de activitatea ta (e-mail)',
          'Prevenirea fraudei, abuzurilor și activităților ilegale',
          'Respectarea obligațiilor legale aplicabile',
        ],
        afterItems: 'Nu folosim datele tale pentru publicitate comportamentală și nu le vindem niciodată unor terți.',
      },
      {
        title: '4. Cu cine partajăm datele',
        paragraphs: ['Datele tale sunt accesate doar de operatorul platformei și de furnizorii de servicii tehnice necesari funcționării AnimalBond:'],
        tableHeaders: ['Furnizor', 'Scop', 'Locație'],
        tableNote: 'Toți furnizorii de mai sus sunt certificați sau conformi cu cerințele GDPR pentru transferul de date în afara UE (Clauze Contractuale Standard sau mecanisme echivalente).',
        tableAfter: 'Datele pot fi dezvăluite autorităților publice exclusiv când acest lucru este impus de lege.',
      },
      {
        title: '5. Cât timp păstrăm datele',
        items: [
          'Date de cont: pe toată durata existenței contului + 30 de zile după ștergere',
          'Anunțuri: până la expirare sau ștergere de către utilizator',
          'Mesaje: 12 luni de la data trimiterii',
          'Date tehnice (loguri): maximum 90 de zile',
          'Date de plată: conform cerințelor legale fiscale (5 ani)',
        ],
      },
      {
        title: '6. Drepturile tale (GDPR)',
        paragraphs: ['În calitate de persoană vizată, ai următoarele drepturi:'],
        items: [
          'Dreptul de acces — poți solicita o copie a datelor tale',
          'Dreptul la rectificare — poți corecta datele incorecte direct din profil',
          'Dreptul la ștergere — poți șterge contul și datele asociate',
          'Dreptul la portabilitate — poți solicita datele în format structurat',
          'Dreptul la restricționarea prelucrării — în cazurile prevăzute de GDPR',
          'Dreptul de opoziție — față de prelucrările bazate pe interes legitim',
          'Dreptul de a retrage consimțământul — oricând, fără consecințe negative',
        ],
        afterItems: 'Pentru exercitarea oricărui drept, contactează-ne la contact@animalbond.club. Răspundem în maximum 30 de zile. Ai și dreptul de a depune o plângere la ANSPDCP (Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal), www.dataprotection.ro.',
      },
      {
        title: '7. Cookie-uri și stocare locală',
        paragraphs: ['Site-ul AnimalBond folosește un număr minim de cookie-uri strict necesare funcționării:'],
        items: [
          'preferred_country — reține țara selectată (30 zile, stocată local)',
          'ab_lang — reține limba preferată (stocare locală în browser)',
          'Sesiune autentificare — necesară pentru menținerea stării de conectare',
        ],
        afterItems: 'Nu folosim cookie-uri de urmărire, publicitate sau analytics de la terți.',
      },
      {
        title: '8. Minori',
        paragraphs: ['Platforma AnimalBond este destinată persoanelor cu vârsta de minimum 16 ani. Nu colectăm în mod intenționat date de la minori sub această vârstă. Dacă ești părinte sau tutore și crezi că un minor și-a creat un cont, te rugăm să ne contactezi la contact@animalbond.club și vom șterge imediat datele respective.'],
      },
      {
        title: '9. Securitatea datelor',
        paragraphs: ['Luăm măsuri tehnice și organizatorice adecvate pentru a proteja datele tale: conexiuni criptate (HTTPS/TLS), parole stocate exclusiv în formă hash (bcrypt), acces restricționat la baza de date, locații GPS aproximate (nu exacte) pentru anunțuri publice, și rate limiting pe mesaje pentru prevenirea abuzurilor.'],
      },
      {
        title: '10. Modificări ale politicii',
        paragraphs: ['Putem actualiza această politică periodic. Modificările semnificative vor fi comunicate prin e-mail sau printr-un anunț vizibil în aplicație. Data ultimei actualizări este afișată în antetul acestei pagini. Continuarea utilizării platformei după o modificare constituie acceptarea noii politici.'],
      },
      {
        title: '11. Contact',
        paragraphs: ['Pentru orice întrebare legată de prelucrarea datelor tale cu caracter personal:'],
        contactBox: { operator: 'Operator: Elena Lenghel', platform: 'Platformă: AnimalBond — animalbond.club', emailLabel: 'E-mail' },
      },
    ],
  },

  en: {
    pageTitle: 'Privacy Policy',
    lastUpdate: 'Last updated: 15 May 2026',
    sections: [
      {
        title: '1. Who We Are',
        paragraphs: [
          'AnimalBond is a digital platform for animal adoption and care, accessible at animalbond.club and through the AnimalBond mobile app. The personal data controller is Elena Lenghel, an individual, reachable at: contact@animalbond.club.',
          'This policy applies to all users of the AnimalBond platform (website and mobile app) and describes how we collect, use and protect your personal data, in accordance with Regulation (EU) 2016/679 (GDPR).',
        ],
      },
      {
        title: '2. What Data We Collect and Why',
        subsections: [
          { title: '2.1 Account Data', text: 'At registration we collect: email address, name/username and password (stored exclusively in encrypted, irreversible form). Optionally, you may add a phone number. Legal basis: performance of contract (Art. 6(1)(b) GDPR).' },
          { title: '2.2 Profile Data', text: 'You may complete your profile with: country of residence, preferred language, profile photo and chosen role (adopter, giver, shelter, partner). This data is necessary for the matching service and listing filters. Legal basis: performance of contract.' },
          { title: '2.3 Listings and Photos', text: 'When you post an adoption, sale or lost/found listing, we collect: animal photos, description, location (county/city) and approximate GPS coordinates. Exact coordinates are not displayed publicly — the platform uses an approximate location (~2 km radius) to protect your real address. Legal basis: performance of contract.' },
          { title: '2.4 Messages and Communication', text: 'Messages sent between users through the platform\'s chat system are stored to allow conversation continuation and for user safety (abuse detection). Legal basis: performance of contract and legitimate interest (Art. 6(1)(f) GDPR).' },
          { title: '2.5 Usage Data', text: 'We collect information about your interactions with the platform: preferences (likes/dislikes), reports submitted, testimonials published. This data is used to improve the matching algorithm and service. Legal basis: legitimate interest.' },
          { title: '2.6 Technical Data', text: 'By simply using the platform, our servers automatically process: IP address, device type, browser, date and time of access. This data is necessary for the security and technical operation of the service. Legal basis: legitimate interest.' },
          { title: '2.7 Payment Data', text: 'If you make a donation through the platform, payment is processed exclusively by Stripe, Inc. AnimalBond never stores your bank card details. We only receive payment confirmation and amount. Legal basis: performance of contract.' },
        ],
      },
      {
        title: '3. How We Use Your Data',
        items: [
          'Providing and improving AnimalBond platform services',
          'Authenticating and securing your account',
          'Displaying listings and calculating compatibility scores (matching)',
          'Sending relevant notifications about your activity (email)',
          'Preventing fraud, abuse and illegal activities',
          'Complying with applicable legal obligations',
        ],
        afterItems: 'We do not use your data for behavioural advertising and never sell it to third parties.',
      },
      {
        title: '4. Who We Share Data With',
        paragraphs: ['Your data is accessed only by the platform operator and the technical service providers necessary for AnimalBond to operate:'],
        tableHeaders: ['Provider', 'Purpose', 'Location'],
        tableNote: 'All providers above are certified or compliant with GDPR requirements for data transfers outside the EU (Standard Contractual Clauses or equivalent mechanisms).',
        tableAfter: 'Data may be disclosed to public authorities only when required by law.',
      },
      {
        title: '5. How Long We Keep Data',
        items: [
          'Account data: for the lifetime of the account + 30 days after deletion',
          'Listings: until expiry or deletion by the user',
          'Messages: 12 months from the date sent',
          'Technical data (logs): maximum 90 days',
          'Payment data: as required by tax law (5 years)',
        ],
      },
      {
        title: '6. Your Rights (GDPR)',
        paragraphs: ['As a data subject, you have the following rights:'],
        items: [
          'Right of access — you may request a copy of your data',
          'Right to rectification — you may correct incorrect data directly from your profile',
          'Right to erasure — you may delete your account and associated data',
          'Right to data portability — you may request your data in a structured format',
          'Right to restriction of processing — in the cases provided by GDPR',
          'Right to object — to processing based on legitimate interest',
          'Right to withdraw consent — at any time, without negative consequences',
        ],
        afterItems: 'To exercise any right, contact us at contact@animalbond.club. We respond within 30 days. You also have the right to lodge a complaint with your national data protection authority.',
      },
      {
        title: '7. Cookies and Local Storage',
        paragraphs: ['The AnimalBond website uses a minimal number of strictly necessary cookies:'],
        items: [
          'preferred_country — stores the selected country (30 days, stored locally)',
          'ab_lang — stores the preferred language (local browser storage)',
          'Authentication session — necessary for maintaining login state',
        ],
        afterItems: 'We do not use tracking, advertising or third-party analytics cookies.',
      },
      {
        title: '8. Minors',
        paragraphs: ['The AnimalBond platform is intended for persons aged at least 16. We do not intentionally collect data from minors under this age. If you are a parent or guardian and believe a minor has created an account, please contact us at contact@animalbond.club and we will immediately delete the relevant data.'],
      },
      {
        title: '9. Data Security',
        paragraphs: ['We take appropriate technical and organisational measures to protect your data: encrypted connections (HTTPS/TLS), passwords stored exclusively as hash (bcrypt), restricted database access, approximate GPS locations (not exact) for public listings, and rate limiting on messages to prevent abuse.'],
      },
      {
        title: '10. Policy Changes',
        paragraphs: ['We may update this policy periodically. Significant changes will be communicated by email or a visible notice in the app. The date of the last update is shown at the top of this page. Continued use of the platform after a change constitutes acceptance of the new policy.'],
      },
      {
        title: '11. Contact',
        paragraphs: ['For any questions about the processing of your personal data:'],
        contactBox: { operator: 'Operator: Elena Lenghel', platform: 'Platform: AnimalBond — animalbond.club', emailLabel: 'E-mail' },
      },
    ],
  },

  de: {
    pageTitle: 'Datenschutzerklärung',
    lastUpdate: 'Letzte Aktualisierung: 15. Mai 2026',
    sections: [
      {
        title: '1. Wer wir sind',
        paragraphs: [
          'AnimalBond ist eine digitale Plattform für Tieradoption und -pflege, zugänglich unter animalbond.club und über die AnimalBond-App. Die verantwortliche Stelle für personenbezogene Daten ist Elena Lenghel, eine Privatperson, erreichbar unter: contact@animalbond.club.',
          'Diese Richtlinie gilt für alle Nutzer der AnimalBond-Plattform (Website und App) und beschreibt, wie wir deine personenbezogenen Daten gemäß der Verordnung (EU) 2016/679 (DSGVO) erheben, verwenden und schützen.',
        ],
      },
      {
        title: '2. Welche Daten wir erheben und warum',
        subsections: [
          { title: '2.1 Kontodaten', text: 'Bei der Registrierung erheben wir: E-Mail-Adresse, Name/Benutzername und Passwort (ausschließlich in verschlüsselter, irreversibler Form gespeichert). Optional kannst du eine Telefonnummer hinzufügen. Rechtsgrundlage: Vertragserfüllung (Art. 6(1)(b) DSGVO).' },
          { title: '2.2 Profildaten', text: 'Du kannst dein Profil ergänzen mit: Wohnsitzland, bevorzugte Sprache, Profilfoto und gewählte Rolle (Adoptant, Abgeber, Tierheim, Partner). Diese Daten sind für den Matching-Service und die Anzeigenfilterung erforderlich. Rechtsgrundlage: Vertragserfüllung.' },
          { title: '2.3 Anzeigen und Fotos', text: 'Wenn du eine Adoptions-, Verkaufs- oder Fundtier-Anzeige aufgibst, erheben wir: Tierfotos, Beschreibung, Standort (Kreis/Stadt) und ungefähre GPS-Koordinaten. Genaue Koordinaten werden nicht öffentlich angezeigt — die Plattform verwendet einen ungefähren Standort (~2 km Radius) zum Schutz deiner realen Adresse. Rechtsgrundlage: Vertragserfüllung.' },
          { title: '2.4 Nachrichten und Kommunikation', text: 'Nachrichten, die Nutzer über das Chat-System der Plattform senden, werden gespeichert, um die Fortsetzung der Konversation zu ermöglichen und für die Nutzersicherheit (Missbrauchserkennung). Rechtsgrundlage: Vertragserfüllung und berechtigtes Interesse (Art. 6(1)(f) DSGVO).' },
          { title: '2.5 Nutzungsdaten', text: 'Wir erheben Informationen über deine Interaktionen mit der Plattform: Präferenzen (Likes/Dislikes), eingereichte Meldungen, veröffentlichte Erfahrungsberichte. Diese Daten dienen der Verbesserung des Matching-Algorithmus. Rechtsgrundlage: berechtigtes Interesse.' },
          { title: '2.6 Technische Daten', text: 'Durch die bloße Nutzung der Plattform verarbeiten unsere Server automatisch: IP-Adresse, Gerätetyp, Browser, Datum und Uhrzeit des Zugriffs. Diese Daten sind für die Sicherheit und den technischen Betrieb des Dienstes erforderlich. Rechtsgrundlage: berechtigtes Interesse.' },
          { title: '2.7 Zahlungsdaten', text: 'Wenn du eine Spende über die Plattform tätigst, wird die Zahlung ausschließlich von Stripe, Inc. verarbeitet. AnimalBond speichert niemals deine Bankkartendetails. Wir erhalten nur die Zahlungsbestätigung und den Betrag. Rechtsgrundlage: Vertragserfüllung.' },
        ],
      },
      {
        title: '3. Wie wir deine Daten verwenden',
        items: [
          'Bereitstellung und Verbesserung der AnimalBond-Dienste',
          'Authentifizierung und Sicherung deines Kontos',
          'Anzeige von Inseraten und Berechnung von Kompatibilitätswerten (Matching)',
          'Versand relevanter Benachrichtigungen zu deiner Aktivität (E-Mail)',
          'Prävention von Betrug, Missbrauch und illegalen Aktivitäten',
          'Einhaltung geltender gesetzlicher Pflichten',
        ],
        afterItems: 'Wir verwenden deine Daten nicht für Verhaltensmarketing und verkaufen sie niemals an Dritte.',
      },
      {
        title: '4. Mit wem wir Daten teilen',
        paragraphs: ['Deine Daten werden nur vom Plattformbetreiber und den für den Betrieb von AnimalBond notwendigen technischen Dienstleistern eingesehen:'],
        tableHeaders: ['Anbieter', 'Zweck', 'Standort'],
        tableNote: 'Alle oben genannten Anbieter sind für Datentransfers außerhalb der EU nach DSGVO-Anforderungen zertifiziert oder konform (Standardvertragsklauseln oder gleichwertige Mechanismen).',
        tableAfter: 'Daten können öffentlichen Behörden nur offengelegt werden, wenn dies gesetzlich vorgeschrieben ist.',
      },
      {
        title: '5. Wie lange wir Daten aufbewahren',
        items: [
          'Kontodaten: für die gesamte Lebensdauer des Kontos + 30 Tage nach Löschung',
          'Anzeigen: bis zum Ablauf oder zur Löschung durch den Nutzer',
          'Nachrichten: 12 Monate ab Sendedatum',
          'Technische Daten (Logs): maximal 90 Tage',
          'Zahlungsdaten: gemäß steuerrechtlichen Anforderungen (5 Jahre)',
        ],
      },
      {
        title: '6. Deine Rechte (DSGVO)',
        paragraphs: ['Als betroffene Person hast du folgende Rechte:'],
        items: [
          'Auskunftsrecht — du kannst eine Kopie deiner Daten anfordern',
          'Recht auf Berichtigung — du kannst fehlerhafte Daten direkt im Profil korrigieren',
          'Recht auf Löschung — du kannst dein Konto und die zugehörigen Daten löschen',
          'Recht auf Datenübertragbarkeit — du kannst deine Daten in strukturierter Form anfordern',
          'Recht auf Einschränkung der Verarbeitung — in den von der DSGVO vorgesehenen Fällen',
          'Widerspruchsrecht — gegen Verarbeitungen auf Basis berechtigter Interessen',
          'Recht auf Widerruf der Einwilligung — jederzeit, ohne negative Konsequenzen',
        ],
        afterItems: 'Zur Ausübung eines Rechts kontaktiere uns unter contact@animalbond.club. Wir antworten innerhalb von 30 Tagen. Du hast auch das Recht, eine Beschwerde bei der zuständigen Datenschutzbehörde einzureichen.',
      },
      {
        title: '7. Cookies und lokale Speicherung',
        paragraphs: ['Die AnimalBond-Website verwendet eine minimale Anzahl unbedingt notwendiger Cookies:'],
        items: [
          'preferred_country — speichert das ausgewählte Land (30 Tage, lokal gespeichert)',
          'ab_lang — speichert die bevorzugte Sprache (lokaler Browser-Speicher)',
          'Authentifizierungssitzung — erforderlich für die Aufrechterhaltung des Anmeldestatus',
        ],
        afterItems: 'Wir verwenden keine Tracking-, Werbe- oder Drittanbieter-Analytics-Cookies.',
      },
      {
        title: '8. Minderjährige',
        paragraphs: ['Die AnimalBond-Plattform richtet sich an Personen ab 16 Jahren. Wir erheben nicht absichtlich Daten von Minderjährigen unter diesem Alter. Wenn du Elternteil oder Vormund bist und glaubst, dass ein Minderjähriger ein Konto erstellt hat, kontaktiere uns bitte unter contact@animalbond.club, und wir löschen die Daten sofort.'],
      },
      {
        title: '9. Datensicherheit',
        paragraphs: ['Wir ergreifen angemessene technische und organisatorische Maßnahmen zum Schutz deiner Daten: verschlüsselte Verbindungen (HTTPS/TLS), ausschließlich als Hash (bcrypt) gespeicherte Passwörter, eingeschränkter Datenbankzugriff, ungefähre GPS-Standorte (nicht exakt) für öffentliche Anzeigen und Rate Limiting bei Nachrichten zur Missbrauchsprävention.'],
      },
      {
        title: '10. Änderungen der Datenschutzrichtlinie',
        paragraphs: ['Wir können diese Richtlinie regelmäßig aktualisieren. Wesentliche Änderungen werden per E-Mail oder durch einen sichtbaren Hinweis in der App mitgeteilt. Das Datum der letzten Aktualisierung ist oben auf dieser Seite angegeben. Die fortgesetzte Nutzung der Plattform nach einer Änderung gilt als Zustimmung zur neuen Richtlinie.'],
      },
      {
        title: '11. Kontakt',
        paragraphs: ['Für alle Fragen zur Verarbeitung deiner personenbezogenen Daten:'],
        contactBox: { operator: 'Betreiberin: Elena Lenghel', platform: 'Plattform: AnimalBond — animalbond.club', emailLabel: 'E-Mail' },
      },
    ],
  },

  fr: {
    pageTitle: 'Politique de confidentialité',
    lastUpdate: 'Dernière mise à jour : 15 mai 2026',
    sections: [
      {
        title: '1. Qui nous sommes',
        paragraphs: [
          "AnimalBond est une plateforme numérique d'adoption et de soins pour animaux, accessible sur animalbond.club et via l'application mobile AnimalBond. Le responsable du traitement des données personnelles est Elena Lenghel, une personne physique, joignable à : contact@animalbond.club.",
          "Cette politique s'applique à tous les utilisateurs de la plateforme AnimalBond (site web et application mobile) et décrit comment nous collectons, utilisons et protégeons vos données personnelles, conformément au Règlement (UE) 2016/679 (RGPD).",
        ],
      },
      {
        title: '2. Quelles données nous collectons et pourquoi',
        subsections: [
          { title: '2.1 Données de compte', text: "Lors de l'inscription, nous collectons : adresse e-mail, nom/pseudonyme et mot de passe (stocké exclusivement sous forme chiffrée et irréversible). Vous pouvez facultativement ajouter un numéro de téléphone. Base légale : exécution du contrat (art. 6(1)(b) RGPD)." },
          { title: '2.2 Données de profil', text: "Vous pouvez compléter votre profil avec : pays de résidence, langue préférée, photo de profil et rôle choisi (adoptant, cédant, refuge, partenaire). Ces données sont nécessaires au service de mise en relation et au filtrage des annonces. Base légale : exécution du contrat." },
          { title: "2.3 Annonces et photos", text: "Lorsque vous publiez une annonce d'adoption, de vente ou de perdu/trouvé, nous collectons : photos de l'animal, description, localisation (département/ville) et coordonnées GPS approximatives. Les coordonnées exactes ne sont pas affichées publiquement — la plateforme utilise une localisation approximative (~2 km de rayon) pour protéger votre adresse réelle. Base légale : exécution du contrat." },
          { title: '2.4 Messages et communication', text: "Les messages échangés entre utilisateurs via le système de chat de la plateforme sont stockés pour permettre la poursuite de la conversation et assurer la sécurité des utilisateurs (détection des abus). Base légale : exécution du contrat et intérêt légitime (art. 6(1)(f) RGPD)." },
          { title: "2.5 Données d'utilisation", text: "Nous collectons des informations sur vos interactions avec la plateforme : préférences (likes/dislikes), signalements envoyés, témoignages publiés. Ces données servent à améliorer l'algorithme de mise en relation. Base légale : intérêt légitime." },
          { title: '2.6 Données techniques', text: "Par la simple utilisation de la plateforme, nos serveurs traitent automatiquement : adresse IP, type d'appareil, navigateur, date et heure d'accès. Ces données sont nécessaires à la sécurité et au fonctionnement technique du service. Base légale : intérêt légitime." },
          { title: '2.7 Données de paiement', text: "Si vous effectuez un don via la plateforme, le paiement est traité exclusivement par Stripe, Inc. AnimalBond ne stocke jamais les détails de votre carte bancaire. Nous ne recevons que la confirmation et le montant du paiement. Base légale : exécution du contrat." },
        ],
      },
      {
        title: '3. Comment nous utilisons vos données',
        items: [
          "Fourniture et amélioration des services de la plateforme AnimalBond",
          "Authentification et sécurisation de votre compte",
          "Affichage des annonces et calcul des scores de compatibilité (mise en relation)",
          "Envoi de notifications pertinentes liées à votre activité (e-mail)",
          "Prévention de la fraude, des abus et des activités illégales",
          "Respect des obligations légales applicables",
        ],
        afterItems: "Nous n'utilisons pas vos données à des fins de publicité comportementale et ne les vendons jamais à des tiers.",
      },
      {
        title: '4. Avec qui nous partageons les données',
        paragraphs: ["Vos données sont accessibles uniquement par l'opératrice de la plateforme et les prestataires de services techniques nécessaires au fonctionnement d'AnimalBond :"],
        tableHeaders: ['Prestataire', 'Finalité', 'Localisation'],
        tableNote: "Tous les prestataires ci-dessus sont certifiés ou conformes aux exigences du RGPD pour les transferts de données hors UE (Clauses Contractuelles Types ou mécanismes équivalents).",
        tableAfter: "Les données peuvent être divulguées aux autorités publiques uniquement lorsque la loi l'exige.",
      },
      {
        title: '5. Durée de conservation des données',
        items: [
          "Données de compte : pendant toute la durée d'existence du compte + 30 jours après suppression",
          "Annonces : jusqu'à expiration ou suppression par l'utilisateur",
          "Messages : 12 mois à compter de la date d'envoi",
          "Données techniques (logs) : maximum 90 jours",
          "Données de paiement : conformément aux obligations fiscales légales (5 ans)",
        ],
      },
      {
        title: '6. Vos droits (RGPD)',
        paragraphs: ["En tant que personne concernée, vous disposez des droits suivants :"],
        items: [
          "Droit d'accès — vous pouvez demander une copie de vos données",
          "Droit de rectification — vous pouvez corriger les données incorrectes directement depuis votre profil",
          "Droit à l'effacement — vous pouvez supprimer votre compte et les données associées",
          "Droit à la portabilité — vous pouvez demander vos données dans un format structuré",
          "Droit à la limitation du traitement — dans les cas prévus par le RGPD",
          "Droit d'opposition — aux traitements fondés sur l'intérêt légitime",
          "Droit de retirer votre consentement — à tout moment, sans conséquences négatives",
        ],
        afterItems: "Pour exercer l'un de ces droits, contactez-nous à contact@animalbond.club. Nous répondons dans un délai de 30 jours. Vous avez également le droit de déposer une plainte auprès de l'autorité de protection des données de votre pays.",
      },
      {
        title: '7. Cookies et stockage local',
        paragraphs: ["Le site AnimalBond utilise un nombre minimal de cookies strictement nécessaires au fonctionnement :"],
        items: [
          "preferred_country — enregistre le pays sélectionné (30 jours, stockage local)",
          "ab_lang — enregistre la langue préférée (stockage local du navigateur)",
          "Session d'authentification — nécessaire au maintien de l'état de connexion",
        ],
        afterItems: "Nous n'utilisons pas de cookies de suivi, de publicité ou d'analyse provenant de tiers.",
      },
      {
        title: '8. Mineurs',
        paragraphs: ["La plateforme AnimalBond est destinée aux personnes âgées d'au moins 16 ans. Nous ne collectons pas intentionnellement de données auprès de mineurs de moins de cet âge. Si vous êtes parent ou tuteur et pensez qu'un mineur a créé un compte, veuillez nous contacter à contact@animalbond.club et nous supprimerons immédiatement les données concernées."],
      },
      {
        title: '9. Sécurité des données',
        paragraphs: ["Nous prenons des mesures techniques et organisationnelles appropriées pour protéger vos données : connexions chiffrées (HTTPS/TLS), mots de passe stockés exclusivement sous forme de hash (bcrypt), accès restreint à la base de données, localisations GPS approximatives (non exactes) pour les annonces publiques, et limitation du débit des messages pour prévenir les abus."],
      },
      {
        title: '10. Modifications de la politique',
        paragraphs: ["Nous pouvons mettre à jour cette politique périodiquement. Les modifications significatives seront communiquées par e-mail ou par un avis visible dans l'application. La date de la dernière mise à jour est affichée en haut de cette page. La poursuite de l'utilisation de la plateforme après une modification constitue l'acceptation de la nouvelle politique."],
      },
      {
        title: '11. Contact',
        paragraphs: ["Pour toute question concernant le traitement de vos données personnelles :"],
        contactBox: { operator: 'Opératrice : Elena Lenghel', platform: 'Plateforme : AnimalBond — animalbond.club', emailLabel: 'E-mail' },
      },
    ],
  },

  it: {
    pageTitle: 'Informativa sulla privacy',
    lastUpdate: 'Ultimo aggiornamento: 15 maggio 2026',
    sections: [
      {
        title: '1. Chi siamo',
        paragraphs: [
          "AnimalBond è una piattaforma digitale per l'adozione e la cura degli animali, accessibile su animalbond.club e tramite l'app mobile AnimalBond. Il titolare del trattamento dei dati personali è Elena Lenghel, persona fisica, raggiungibile a: contact@animalbond.club.",
          "Questa informativa si applica a tutti gli utenti della piattaforma AnimalBond (sito web e app mobile) e descrive come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali, in conformità con il Regolamento (UE) 2016/679 (GDPR).",
        ],
      },
      {
        title: '2. Quali dati raccogliamo e perché',
        subsections: [
          { title: '2.1 Dati account', text: "In fase di registrazione raccogliamo: indirizzo e-mail, nome/username e password (conservata esclusivamente in forma crittografata e irreversibile). Facoltativamente puoi aggiungere un numero di telefono. Base giuridica: esecuzione del contratto (art. 6(1)(b) GDPR)." },
          { title: '2.2 Dati profilo', text: "Puoi completare il profilo con: paese di residenza, lingua preferita, foto profilo e ruolo scelto (adottante, cedente, rifugio, partner). Questi dati sono necessari per il servizio di matching e il filtraggio degli annunci. Base giuridica: esecuzione del contratto." },
          { title: '2.3 Annunci e foto', text: "Quando pubblichi un annuncio di adozione, vendita o smarrito/trovato, raccogliamo: foto dell'animale, descrizione, localizzazione (provincia/città) e coordinate GPS approssimative. Le coordinate esatte non vengono visualizzate pubblicamente — la piattaforma usa una posizione approssimativa (~2 km di raggio) per proteggere il tuo indirizzo reale. Base giuridica: esecuzione del contratto." },
          { title: '2.4 Messaggi e comunicazioni', text: "I messaggi scambiati tra utenti tramite il sistema di chat della piattaforma vengono conservati per consentire la continuazione della conversazione e per la sicurezza degli utenti (rilevamento degli abusi). Base giuridica: esecuzione del contratto e interesse legittimo (art. 6(1)(f) GDPR)." },
          { title: '2.5 Dati di utilizzo', text: "Raccogliamo informazioni sulle tue interazioni con la piattaforma: preferenze (like/dislike), segnalazioni inviate, testimonianze pubblicate. Questi dati servono a migliorare l'algoritmo di matching. Base giuridica: interesse legittimo." },
          { title: '2.6 Dati tecnici', text: "Con il semplice utilizzo della piattaforma, i nostri server elaborano automaticamente: indirizzo IP, tipo di dispositivo, browser, data e ora di accesso. Questi dati sono necessari per la sicurezza e il funzionamento tecnico del servizio. Base giuridica: interesse legittimo." },
          { title: '2.7 Dati di pagamento', text: "Se effettui una donazione tramite la piattaforma, il pagamento viene elaborato esclusivamente da Stripe, Inc. AnimalBond non conserva mai i dati della tua carta bancaria. Riceviamo solo la conferma del pagamento e l'importo. Base giuridica: esecuzione del contratto." },
        ],
      },
      {
        title: '3. Come utilizziamo i tuoi dati',
        items: [
          "Fornitura e miglioramento dei servizi della piattaforma AnimalBond",
          "Autenticazione e sicurezza del tuo account",
          "Visualizzazione degli annunci e calcolo dei punteggi di compatibilità (matching)",
          "Invio di notifiche pertinenti relative alla tua attività (e-mail)",
          "Prevenzione di frodi, abusi e attività illegali",
          "Rispetto degli obblighi di legge applicabili",
        ],
        afterItems: "Non utilizziamo i tuoi dati per pubblicità comportamentale e non li vendiamo mai a terzi.",
      },
      {
        title: '4. Con chi condividiamo i dati',
        paragraphs: ["I tuoi dati sono accessibili solo dalla titolare della piattaforma e dai fornitori di servizi tecnici necessari al funzionamento di AnimalBond:"],
        tableHeaders: ['Fornitore', 'Finalità', 'Sede'],
        tableNote: "Tutti i fornitori sopra indicati sono certificati o conformi ai requisiti GDPR per i trasferimenti di dati al di fuori dell'UE (Clausole Contrattuali Standard o meccanismi equivalenti).",
        tableAfter: "I dati possono essere divulgati alle autorità pubbliche solo quando richiesto dalla legge.",
      },
      {
        title: '5. Per quanto tempo conserviamo i dati',
        items: [
          "Dati account: per tutta la durata dell'account + 30 giorni dopo la cancellazione",
          "Annunci: fino alla scadenza o alla cancellazione da parte dell'utente",
          "Messaggi: 12 mesi dalla data di invio",
          "Dati tecnici (log): massimo 90 giorni",
          "Dati di pagamento: in conformità con gli obblighi fiscali (5 anni)",
        ],
      },
      {
        title: '6. I tuoi diritti (GDPR)',
        paragraphs: ["In qualità di interessato, hai i seguenti diritti:"],
        items: [
          "Diritto di accesso — puoi richiedere una copia dei tuoi dati",
          "Diritto di rettifica — puoi correggere i dati errati direttamente dal profilo",
          "Diritto alla cancellazione — puoi eliminare il tuo account e i dati associati",
          "Diritto alla portabilità — puoi richiedere i tuoi dati in formato strutturato",
          "Diritto di limitazione del trattamento — nei casi previsti dal GDPR",
          "Diritto di opposizione — ai trattamenti basati su interesse legittimo",
          "Diritto di revocare il consenso — in qualsiasi momento, senza conseguenze negative",
        ],
        afterItems: "Per esercitare qualsiasi diritto, contattaci a contact@animalbond.club. Rispondiamo entro 30 giorni. Hai anche il diritto di presentare un reclamo all'autorità di protezione dei dati del tuo paese.",
      },
      {
        title: '7. Cookie e archiviazione locale',
        paragraphs: ["Il sito AnimalBond utilizza un numero minimo di cookie strettamente necessari al funzionamento:"],
        items: [
          "preferred_country — memorizza il paese selezionato (30 giorni, archiviazione locale)",
          "ab_lang — memorizza la lingua preferita (archiviazione locale del browser)",
          "Sessione di autenticazione — necessaria per mantenere lo stato di accesso",
        ],
        afterItems: "Non utilizziamo cookie di tracciamento, pubblicità o analytics di terze parti.",
      },
      {
        title: '8. Minori',
        paragraphs: ["La piattaforma AnimalBond è destinata a persone di almeno 16 anni. Non raccogliamo intenzionalmente dati da minori di questa età. Se sei genitore o tutore e ritieni che un minore abbia creato un account, ti preghiamo di contattarci a contact@animalbond.club e cancelleremo immediatamente i dati in questione."],
      },
      {
        title: '9. Sicurezza dei dati',
        paragraphs: ["Adottiamo misure tecniche e organizzative adeguate per proteggere i tuoi dati: connessioni crittografate (HTTPS/TLS), password conservate esclusivamente in forma hash (bcrypt), accesso limitato al database, posizioni GPS approssimative (non esatte) per gli annunci pubblici e rate limiting sui messaggi per prevenire gli abusi."],
      },
      {
        title: '10. Modifiche alla politica',
        paragraphs: ["Possiamo aggiornare questa informativa periodicamente. Le modifiche significative saranno comunicate via e-mail o tramite un avviso visibile nell'app. La data dell'ultimo aggiornamento è indicata in cima a questa pagina. Il proseguimento dell'utilizzo della piattaforma dopo una modifica costituisce accettazione della nuova politica."],
      },
      {
        title: '11. Contatto',
        paragraphs: ["Per qualsiasi domanda relativa al trattamento dei tuoi dati personali:"],
        contactBox: { operator: 'Titolare: Elena Lenghel', platform: 'Piattaforma: AnimalBond — animalbond.club', emailLabel: 'E-mail' },
      },
    ],
  },

  es: {
    pageTitle: 'Política de privacidad',
    lastUpdate: 'Última actualización: 15 de mayo de 2026',
    sections: [
      {
        title: '1. Quiénes somos',
        paragraphs: [
          'AnimalBond es una plataforma digital de adopción y cuidado de animales, accesible en animalbond.club y a través de la app móvil AnimalBond. El responsable del tratamiento de datos personales es Elena Lenghel, persona física, contactable en: contact@animalbond.club.',
          'Esta política se aplica a todos los usuarios de la plataforma AnimalBond (sitio web y app móvil) y describe cómo recopilamos, usamos y protegemos tus datos personales, de acuerdo con el Reglamento (UE) 2016/679 (RGPD).',
        ],
      },
      {
        title: '2. Qué datos recopilamos y por qué',
        subsections: [
          { title: '2.1 Datos de cuenta', text: 'En el registro recopilamos: dirección de e-mail, nombre/usuario y contraseña (almacenada exclusivamente en forma cifrada e irreversible). Opcionalmente puedes añadir un número de teléfono. Base legal: ejecución del contrato (art. 6(1)(b) RGPD).' },
          { title: '2.2 Datos de perfil', text: 'Puedes completar tu perfil con: país de residencia, idioma preferido, foto de perfil y rol elegido (adoptante, cedente, refugio, socio). Estos datos son necesarios para el servicio de emparejamiento y el filtrado de anuncios. Base legal: ejecución del contrato.' },
          { title: '2.3 Anuncios y fotos', text: 'Al publicar un anuncio de adopción, venta o perdido/encontrado, recopilamos: fotos del animal, descripción, ubicación (provincia/ciudad) y coordenadas GPS aproximadas. Las coordenadas exactas no se muestran públicamente — la plataforma usa una ubicación aproximada (~2 km de radio) para proteger tu dirección real. Base legal: ejecución del contrato.' },
          { title: '2.4 Mensajes y comunicación', text: 'Los mensajes enviados entre usuarios a través del sistema de chat de la plataforma se almacenan para permitir la continuación de la conversación y para la seguridad de los usuarios (detección de abusos). Base legal: ejecución del contrato e interés legítimo (art. 6(1)(f) RGPD).' },
          { title: '2.5 Datos de uso', text: 'Recopilamos información sobre tus interacciones con la plataforma: preferencias (likes/dislikes), informes enviados, testimonios publicados. Estos datos se usan para mejorar el algoritmo de emparejamiento. Base legal: interés legítimo.' },
          { title: '2.6 Datos técnicos', text: 'Con el simple uso de la plataforma, nuestros servidores procesan automáticamente: dirección IP, tipo de dispositivo, navegador, fecha y hora de acceso. Estos datos son necesarios para la seguridad y el funcionamiento técnico del servicio. Base legal: interés legítimo.' },
          { title: '2.7 Datos de pago', text: 'Si realizas una donación a través de la plataforma, el pago es procesado exclusivamente por Stripe, Inc. AnimalBond nunca almacena los datos de tu tarjeta bancaria. Solo recibimos la confirmación y el importe del pago. Base legal: ejecución del contrato.' },
        ],
      },
      {
        title: '3. Cómo usamos tus datos',
        items: [
          'Prestación y mejora de los servicios de la plataforma AnimalBond',
          'Autenticación y seguridad de tu cuenta',
          'Visualización de anuncios y cálculo de puntuaciones de compatibilidad (emparejamiento)',
          'Envío de notificaciones relevantes sobre tu actividad (e-mail)',
          'Prevención de fraudes, abusos y actividades ilegales',
          'Cumplimiento de las obligaciones legales aplicables',
        ],
        afterItems: 'No usamos tus datos para publicidad comportamental y nunca los vendemos a terceros.',
      },
      {
        title: '4. Con quién compartimos los datos',
        paragraphs: ['Tus datos son accedidos únicamente por la operadora de la plataforma y los proveedores de servicios técnicos necesarios para el funcionamiento de AnimalBond:'],
        tableHeaders: ['Proveedor', 'Finalidad', 'Ubicación'],
        tableNote: 'Todos los proveedores anteriores están certificados o cumplen con los requisitos del RGPD para transferencias de datos fuera de la UE (Cláusulas Contractuales Estándar o mecanismos equivalentes).',
        tableAfter: 'Los datos pueden divulgarse a las autoridades públicas solo cuando lo exija la ley.',
      },
      {
        title: '5. Cuánto tiempo conservamos los datos',
        items: [
          'Datos de cuenta: durante toda la vida de la cuenta + 30 días tras la eliminación',
          'Anuncios: hasta su vencimiento o eliminación por el usuario',
          'Mensajes: 12 meses desde la fecha de envío',
          'Datos técnicos (registros): máximo 90 días',
          'Datos de pago: según los requisitos legales fiscales (5 años)',
        ],
      },
      {
        title: '6. Tus derechos (RGPD)',
        paragraphs: ['Como interesado, tienes los siguientes derechos:'],
        items: [
          'Derecho de acceso — puedes solicitar una copia de tus datos',
          'Derecho de rectificación — puedes corregir datos incorrectos directamente desde tu perfil',
          'Derecho de supresión — puedes eliminar tu cuenta y los datos asociados',
          'Derecho a la portabilidad — puedes solicitar tus datos en formato estructurado',
          'Derecho a la limitación del tratamiento — en los casos previstos por el RGPD',
          'Derecho de oposición — al tratamiento basado en interés legítimo',
          'Derecho a retirar el consentimiento — en cualquier momento, sin consecuencias negativas',
        ],
        afterItems: 'Para ejercer cualquier derecho, contáctanos en contact@animalbond.club. Respondemos en un máximo de 30 días. También tienes derecho a presentar una reclamación ante la autoridad de protección de datos de tu país.',
      },
      {
        title: '7. Cookies y almacenamiento local',
        paragraphs: ['El sitio web AnimalBond utiliza un número mínimo de cookies estrictamente necesarias para su funcionamiento:'],
        items: [
          'preferred_country — guarda el país seleccionado (30 días, almacenamiento local)',
          'ab_lang — guarda el idioma preferido (almacenamiento local del navegador)',
          'Sesión de autenticación — necesaria para mantener el estado de inicio de sesión',
        ],
        afterItems: 'No utilizamos cookies de seguimiento, publicidad ni análisis de terceros.',
      },
      {
        title: '8. Menores',
        paragraphs: ['La plataforma AnimalBond está destinada a personas de al menos 16 años. No recopilamos intencionalmente datos de menores de esa edad. Si eres padre, madre o tutor y crees que un menor ha creado una cuenta, contáctanos en contact@animalbond.club y eliminaremos inmediatamente los datos correspondientes.'],
      },
      {
        title: '9. Seguridad de los datos',
        paragraphs: ['Adoptamos medidas técnicas y organizativas adecuadas para proteger tus datos: conexiones cifradas (HTTPS/TLS), contraseñas almacenadas exclusivamente como hash (bcrypt), acceso restringido a la base de datos, ubicaciones GPS aproximadas (no exactas) para anuncios públicos y limitación de velocidad en mensajes para prevenir abusos.'],
      },
      {
        title: '10. Cambios en la política',
        paragraphs: ['Podemos actualizar esta política periódicamente. Los cambios significativos se comunicarán por e-mail o mediante un aviso visible en la app. La fecha de la última actualización se muestra en la parte superior de esta página. El uso continuado de la plataforma tras un cambio constituye la aceptación de la nueva política.'],
      },
      {
        title: '11. Contacto',
        paragraphs: ['Para cualquier pregunta sobre el tratamiento de tus datos personales:'],
        contactBox: { operator: 'Responsable: Elena Lenghel', platform: 'Plataforma: AnimalBond — animalbond.club', emailLabel: 'Correo' },
      },
    ],
  },

  hu: {
    pageTitle: 'Adatvédelmi irányelvek',
    lastUpdate: 'Utolsó frissítés: 2026. május 15.',
    sections: [
      {
        title: '1. Kik vagyunk',
        paragraphs: [
          'Az AnimalBond egy digitális platform az állatok örökbefogadásához és gondozásához, elérhető az animalbond.club oldalon és az AnimalBond mobilalkalmazáson keresztül. A személyes adatok kezelője Elena Lenghel, magánszemély, elérhetősége: contact@animalbond.club.',
          'Ez az irányelv az AnimalBond platform összes felhasználójára vonatkozik (weboldal és mobilalkalmazás), és leírja, hogyan gyűjtjük, használjuk és védjük személyes adataidat az (EU) 2016/679 rendeletnek (GDPR) megfelelően.',
        ],
      },
      {
        title: '2. Milyen adatokat gyűjtünk és miért',
        subsections: [
          { title: '2.1 Fiókadatok', text: 'Regisztrációkor gyűjtjük: e-mail-cím, név/felhasználónév és jelszó (kizárólag titkosított, visszafordíthatatlan formában tárolva). Opcionálisan telefonszámot is adhatsz meg. Jogalap: szerződés teljesítése (6. cikk (1)(b) GDPR).' },
          { title: '2.2 Profiladatok', text: 'A profilt kiegészítheted: lakóország, preferált nyelv, profilkép és választott szerep (örökbefogadó, átadó, menedékhely, partner). Ezek az adatok szükségesek a matching szolgáltatáshoz és a hirdetések szűréséhez. Jogalap: szerződés teljesítése.' },
          { title: '2.3 Hirdetések és fotók', text: 'Örökbefogadási, eladási vagy elveszett/talált hirdetés feladásakor gyűjtjük: az állat fotóit, leírását, helyszínét (megye/város) és hozzávetőleges GPS-koordinátáit. A pontos koordináták nem jelennek meg nyilvánosan — a platform hozzávetőleges helyszínt (~2 km sugarú) használ a valódi cím védelme érdekében. Jogalap: szerződés teljesítése.' },
          { title: '2.4 Üzenetek és kommunikáció', text: 'A felhasználók által a platform chat-rendszerén keresztül küldött üzeneteket tároljuk a kommunikáció folytatásának lehetővé tétele és a felhasználók biztonsága (visszaélések észlelése) érdekében. Jogalap: szerződés teljesítése és jogos érdek (6. cikk (1)(f) GDPR).' },
          { title: '2.5 Használati adatok', text: 'Információkat gyűjtünk a platformmal való interakcióidról: preferenciák (kedvelések/nemkedvelések), beküldött jelentések, közzétett visszajelzések. Ezeket az adatokat a matching algoritmus és a szolgáltatás fejlesztésére használjuk. Jogalap: jogos érdek.' },
          { title: '2.6 Technikai adatok', text: 'A platform puszta használatával szervereink automatikusan feldolgozzák: IP-cím, eszköztípus, böngésző, hozzáférés dátuma és időpontja. Ezek az adatok a szolgáltatás biztonságához és technikai működéséhez szükségesek. Jogalap: jogos érdek.' },
          { title: '2.7 Fizetési adatok', text: 'Ha adományt teszel a platformon keresztül, a fizetést kizárólag a Stripe, Inc. dolgozza fel. Az AnimalBond soha nem tárolja bankkártya-adataidat. Csak a fizetés visszaigazolását és az összeget kapjuk meg. Jogalap: szerződés teljesítése.' },
        ],
      },
      {
        title: '3. Hogyan használjuk adataidat',
        items: [
          'Az AnimalBond platform szolgáltatásainak nyújtása és fejlesztése',
          'Fiókod hitelesítése és biztonsága',
          'Hirdetések megjelenítése és kompatibilitási pontszámok kiszámítása (matching)',
          'Tevékenységeddel kapcsolatos releváns értesítések küldése (e-mail)',
          'Csalás, visszaélés és illegális tevékenységek megelőzése',
          'Vonatkozó jogi kötelezettségek teljesítése',
        ],
        afterItems: 'Adataidat nem használjuk viselkedésalapú reklámozásra, és soha nem adjuk el harmadik feleknek.',
      },
      {
        title: '4. Kivel osztjuk meg az adatokat',
        paragraphs: ['Adataidat csak a platform üzemeltetője és az AnimalBond működéséhez szükséges technikai szolgáltatók érik el:'],
        tableHeaders: ['Szolgáltató', 'Cél', 'Helyszín'],
        tableNote: 'A fenti szolgáltatók mindegyike tanúsított vagy megfelel az EU-n kívüli adattovábbításra vonatkozó GDPR-követelményeknek (Általános Szerződési Feltételek vagy egyenértékű mechanizmusok).',
        tableAfter: 'Az adatok közhatóságoknak csak akkor adhatók ki, ha azt a törvény megköveteli.',
      },
      {
        title: '5. Meddig őrizzük meg az adatokat',
        items: [
          'Fiókadatok: a fiók teljes élettartama alatt + 30 nappal a törlés után',
          'Hirdetések: lejáratig vagy a felhasználó általi törléséig',
          'Üzenetek: a küldés dátumától számított 12 hónapig',
          'Technikai adatok (naplók): legfeljebb 90 napig',
          'Fizetési adatok: az adójogi követelményeknek megfelelően (5 év)',
        ],
      },
      {
        title: '6. Jogaid (GDPR)',
        paragraphs: ['Érintettként az alábbi jogok illetnek meg:'],
        items: [
          'Hozzáférési jog — másolatot kérhetsz adataidról',
          'Helyesbítési jog — a pontatlan adatokat közvetlenül a profilodból javíthatod',
          'Törlési jog — törölheted fiókodat és a kapcsolódó adatokat',
          'Adathordozhatósághoz való jog — strukturált formátumban kérheted adataidat',
          'Az adatkezelés korlátozásához való jog — a GDPR által előírt esetekben',
          'Tiltakozáshoz való jog — a jogos érdeken alapuló adatkezeléssel szemben',
          'A hozzájárulás visszavonásának joga — bármikor, negatív következmények nélkül',
        ],
        afterItems: 'Bármely jog gyakorlásához lépj kapcsolatba velünk a contact@animalbond.club címen. 30 napon belül válaszolunk. Jogod van panaszt benyújtani az illetékes adatvédelmi hatósághoz is.',
      },
      {
        title: '7. Sütik és helyi tárolás',
        paragraphs: ['Az AnimalBond weboldal minimális számú, a működéshez feltétlenül szükséges sütit használ:'],
        items: [
          'preferred_country — elmenti a kiválasztott országot (30 nap, helyi tárolás)',
          'ab_lang — elmenti a preferált nyelvet (böngésző helyi tárolása)',
          'Hitelesítési munkamenet — a bejelentkezési állapot fenntartásához szükséges',
        ],
        afterItems: 'Nem használunk nyomkövető, reklám- vagy harmadik féltől származó analitikai sütiket.',
      },
      {
        title: '8. Kiskorúak',
        paragraphs: ['Az AnimalBond platform legalább 16 éves személyeknek szól. Nem gyűjtünk szándékosan adatokat e koron aluli kiskorúaktól. Ha szülő vagy gyám vagy, és úgy gondolod, hogy egy kiskorú fiókot hozott létre, kérjük, lépj kapcsolatba velünk a contact@animalbond.club címen, és azonnal töröljük az érintett adatokat.'],
      },
      {
        title: '9. Adatbiztonság',
        paragraphs: ['Megfelelő technikai és szervezési intézkedéseket teszünk adataid védelme érdekében: titkosított kapcsolatok (HTTPS/TLS), kizárólag hash (bcrypt) formában tárolt jelszavak, korlátozott adatbázis-hozzáférés, hozzávetőleges GPS-helyszínek (nem pontos) a nyilvános hirdetésekhez, és üzenetkorlátozás a visszaélések megelőzésére.'],
      },
      {
        title: '10. Az irányelv módosításai',
        paragraphs: ['Ezt az irányelvet időszakosan frissíthetjük. A jelentős változásokról e-mailben vagy az alkalmazásban megjelenő értesítéssel tájékoztatunk. Az utolsó frissítés dátuma az oldal tetején látható. A platform módosítás utáni folyamatos használata az új irányelv elfogadásának minősül.'],
      },
      {
        title: '11. Kapcsolat',
        paragraphs: ['Személyes adataid kezelésével kapcsolatos bármely kérdés esetén:'],
        contactBox: { operator: 'Üzemeltető: Elena Lenghel', platform: 'Platform: AnimalBond — animalbond.club', emailLabel: 'E-mail' },
      },
    ],
  },
}
