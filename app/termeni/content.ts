export type Lang = 'ro' | 'en' | 'de' | 'fr' | 'it' | 'es' | 'hu'

export interface TermsSection {
  title: string
  items?: string[]
  text?: string
}

export interface TermsContent {
  pageTitle: string
  version: string
  sections: TermsSection[]
  contactBox: { operator: string; platform: string; email: string }
}

export const TERMS_CONTENT: Record<Lang, TermsContent> = {
  ro: {
    pageTitle: 'Termeni și Condiții',
    version: 'Versiunea 1.0 · 11 aprilie 2026',
    sections: [
      {
        title: '1. Cine suntem',
        text: 'AnimalBond este o platformă digitală care conectează persoanele care doresc să adopte, să găzduiască temporar, să dea spre adopție sau să ajute animale aflate în nevoie. Suntem o platformă intermediară — nu deținem, nu vindem și nu garantăm niciun animal listat. Operatorul platformei este Elena Lenghel, persoană fizică, cu adresa de contact: contact@animalbond.club.',
      },
      {
        title: '2. Eligibilitate',
        text: 'Trebuie să ai cel puțin 16 ani pentru a utiliza platforma. Serviciul nu este disponibil în țări aflate sub sancțiuni internaționale (Iran, Coreea de Nord, Rusia, Belarus, Siria, Cuba).',
      },
      {
        title: '3. Tipuri de cont',
        items: [
          'Utilizator — adoptă, dă spre adopție, donează. Gratuit.',
          'Adăpost / Asociație — verificat manual. Gratuit.',
          'Partener (companie) — veterinari, magazine pet, etc. Abonament lunar.',
        ],
        text: 'Poți deține un singur tip de cont. Adopția este disponibilă tuturor.',
      },
      {
        title: '4. Anunțuri — responsabilitățile tale',
        items: [
          'Ești proprietarul legal al animalului',
          'Animalul NU este o specie protejată / CITES',
          'Pozele și descrierile sunt reale și actuale',
          'Marchezi anunțul ca „Adoptat" când animalul își găsește casă',
          'Anunțurile expiră automat după 90 de zile',
        ],
      },
      {
        title: '5. Cazuri medicale și donații',
        text: 'Poți publica IBAN-ul tău pentru donații directe. AnimalBond NU procesează, nu deține și nu transferă bani. Nu suntem responsabili pentru utilizarea incorectă a fondurilor.',
      },
      {
        title: '6. Comportament interzis',
        items: [
          'Specii protejate, trafic de animale, practici crude',
          'Hărțuire, amenințări, mesaje comerciale nesolicitate',
          'Fraudă sau orice activitate ilegală',
          'Conturi false sau impersonarea altor persoane',
        ],
      },
      {
        title: '7. Raportare',
        text: 'Folosește butonul „Raportează" din aplicație sau de pe site pentru a semnala conținut inadecvat. Acționăm conform Digital Services Act (DSA — UE).',
      },
      {
        title: '8. Ștergere cont',
        text: 'Poți șterge contul oricând din Setări. Ștergerea este definitivă — profil, anunțuri, mesaje, fotografii.',
      },
      {
        title: '9. Răspundere',
        text: 'Serviciul este oferit „așa cum este", fără garanții. Nu suntem responsabili pentru comportamentul utilizatorilor sau starea animalelor. Platforma este intermediară — orice tranzacție sau acord între utilizatori este responsabilitatea exclusivă a acestora.',
      },
      {
        title: '10. Proprietate intelectuală',
        text: 'Toate elementele de design, logo-ul și denumirea „AnimalBond" sunt proprietatea operatorului. Fotografiile și descrierile anunțurilor aparțin utilizatorilor care le-au publicat.',
      },
      {
        title: '11. Modificări ale termenilor',
        text: 'Ne rezervăm dreptul de a actualiza acești termeni. Modificările semnificative vor fi comunicate prin e-mail sau printr-un anunț în aplicație. Continuarea utilizării platformei după o modificare constituie acceptarea noilor termeni.',
      },
      {
        title: '12. Legea aplicabilă',
        text: 'Legile României și, unde se aplică, ale Uniunii Europene. Instanțele competente sunt cele din București, România.',
      },
      {
        title: '13. Contact',
        text: '',
      },
    ],
    contactBox: {
      operator: 'Operator: Elena Lenghel',
      platform: 'Platformă: AnimalBond — animalbond.club',
      email: 'E-mail: contact@animalbond.club',
    },
  },

  en: {
    pageTitle: 'Terms and Conditions',
    version: 'Version 1.0 · April 11, 2026',
    sections: [
      {
        title: '1. Who We Are',
        text: 'AnimalBond is a digital platform connecting people who want to adopt, foster, rehome or help animals in need. We are an intermediary platform — we do not own, sell or guarantee any listed animal. The platform operator is Elena Lenghel, an individual, reachable at: contact@animalbond.club.',
      },
      {
        title: '2. Eligibility',
        text: 'You must be at least 16 years old to use the platform. The service is not available in countries under international sanctions (Iran, North Korea, Russia, Belarus, Syria, Cuba).',
      },
      {
        title: '3. Account Types',
        items: [
          'User — adopt, rehome, donate. Free.',
          'Shelter / Association — manually verified. Free.',
          'Partner (company) — vets, pet shops, etc. Monthly subscription.',
        ],
        text: 'You may hold only one account type. Adoption is available to everyone.',
      },
      {
        title: '4. Listings — Your Responsibilities',
        items: [
          'You are the legal owner of the animal',
          'The animal is NOT a protected / CITES species',
          'Photos and descriptions are real and current',
          'You mark the listing as "Adopted" when the animal finds a home',
          'Listings expire automatically after 90 days',
        ],
      },
      {
        title: '5. Medical Cases and Donations',
        text: 'You may publish your IBAN for direct donations. AnimalBond does NOT process, hold or transfer money. We are not responsible for the misuse of funds.',
      },
      {
        title: '6. Prohibited Conduct',
        items: [
          'Protected species, animal trafficking, cruel practices',
          'Harassment, threats, unsolicited commercial messages',
          'Fraud or any illegal activity',
          'Fake accounts or impersonating others',
        ],
      },
      {
        title: '7. Reporting',
        text: 'Use the "Report" button in the app or on the website to flag inappropriate content. We act in accordance with the Digital Services Act (DSA — EU).',
      },
      {
        title: '8. Account Deletion',
        text: 'You may delete your account at any time from Settings. Deletion is permanent — profile, listings, messages, photos.',
      },
      {
        title: '9. Liability',
        text: 'The service is provided "as is" without warranties. We are not liable for user behaviour or the condition of animals. The platform is an intermediary — any transaction or agreement between users is their sole responsibility.',
      },
      {
        title: '10. Intellectual Property',
        text: 'All design elements, the logo and the name "AnimalBond" are the property of the operator. Photos and listing descriptions belong to the users who posted them.',
      },
      {
        title: '11. Changes to Terms',
        text: 'We reserve the right to update these terms. Significant changes will be communicated via email or an in-app notice. Continued use of the platform after a change constitutes acceptance of the new terms.',
      },
      {
        title: '12. Applicable Law',
        text: 'The laws of Romania and, where applicable, of the European Union. Competent courts are those in Bucharest, Romania.',
      },
      {
        title: '13. Contact',
        text: '',
      },
    ],
    contactBox: {
      operator: 'Operator: Elena Lenghel',
      platform: 'Platform: AnimalBond — animalbond.club',
      email: 'E-mail: contact@animalbond.club',
    },
  },

  de: {
    pageTitle: 'Nutzungsbedingungen',
    version: 'Version 1.0 · 11. April 2026',
    sections: [
      {
        title: '1. Wer wir sind',
        text: 'AnimalBond ist eine digitale Plattform, die Personen verbindet, die Tiere adoptieren, vorübergehend aufnehmen, abgeben oder unterstützen möchten. Wir sind eine Vermittlungsplattform — wir besitzen, verkaufen oder garantieren keine gelisteten Tiere. Betreiberin der Plattform ist Elena Lenghel, eine Privatperson, erreichbar unter: contact@animalbond.club.',
      },
      {
        title: '2. Nutzungsberechtigung',
        text: 'Du musst mindestens 16 Jahre alt sein, um die Plattform zu nutzen. Der Dienst ist nicht in Ländern verfügbar, die unter internationalen Sanktionen stehen (Iran, Nordkorea, Russland, Belarus, Syrien, Kuba).',
      },
      {
        title: '3. Kontotypen',
        items: [
          'Nutzer — adoptieren, abgeben, spenden. Kostenlos.',
          'Tierheim / Verein — manuell verifiziert. Kostenlos.',
          'Partner (Unternehmen) — Tierärzte, Zoohandlungen usw. Monatliches Abo.',
        ],
        text: 'Du kannst nur einen Kontotyp besitzen. Adoption ist für alle verfügbar.',
      },
      {
        title: '4. Anzeigen — deine Verantwortung',
        items: [
          'Du bist der rechtmäßige Eigentümer des Tieres',
          'Das Tier ist KEINE geschützte / CITES-Art',
          'Fotos und Beschreibungen sind echt und aktuell',
          'Du markierst die Anzeige als „Adoptiert", wenn das Tier ein Zuhause findet',
          'Anzeigen laufen nach 90 Tagen automatisch ab',
        ],
      },
      {
        title: '5. Medizinische Fälle und Spenden',
        text: 'Du kannst deine IBAN für direkte Spenden veröffentlichen. AnimalBond verarbeitet, hält oder überweist KEIN Geld. Wir haften nicht für den Missbrauch von Spendengeldern.',
      },
      {
        title: '6. Verbotenes Verhalten',
        items: [
          'Geschützte Arten, Tierhandel, grausame Praktiken',
          'Belästigung, Drohungen, unerwünschte kommerzielle Nachrichten',
          'Betrug oder jede illegale Tätigkeit',
          'Fake-Accounts oder das Vortäuschen einer anderen Identität',
        ],
      },
      {
        title: '7. Melden',
        text: 'Verwende den „Melden"-Button in der App oder auf der Website, um unangemessene Inhalte zu melden. Wir handeln gemäß dem Digital Services Act (DSA — EU).',
      },
      {
        title: '8. Kontolöschung',
        text: 'Du kannst dein Konto jederzeit in den Einstellungen löschen. Die Löschung ist endgültig — Profil, Anzeigen, Nachrichten, Fotos.',
      },
      {
        title: '9. Haftung',
        text: 'Der Dienst wird „wie besehen" ohne Garantien bereitgestellt. Wir haften nicht für das Verhalten der Nutzer oder den Zustand der Tiere. Die Plattform ist ein Vermittler — jede Transaktion oder Vereinbarung zwischen Nutzern liegt in deren alleiniger Verantwortung.',
      },
      {
        title: '10. Geistiges Eigentum',
        text: 'Alle Designelemente, das Logo und der Name „AnimalBond" sind Eigentum der Betreiberin. Fotos und Anzeigenbeschreibungen gehören den Nutzern, die sie veröffentlicht haben.',
      },
      {
        title: '11. Änderungen der Bedingungen',
        text: 'Wir behalten uns das Recht vor, diese Bedingungen zu aktualisieren. Wesentliche Änderungen werden per E-Mail oder durch eine In-App-Benachrichtigung mitgeteilt. Die fortgesetzte Nutzung der Plattform nach einer Änderung gilt als Zustimmung zu den neuen Bedingungen.',
      },
      {
        title: '12. Anwendbares Recht',
        text: 'Die Gesetze Rumäniens und, soweit anwendbar, der Europäischen Union. Zuständige Gerichte sind die in Bukarest, Rumänien.',
      },
      {
        title: '13. Kontakt',
        text: '',
      },
    ],
    contactBox: {
      operator: 'Betreiberin: Elena Lenghel',
      platform: 'Plattform: AnimalBond — animalbond.club',
      email: 'E-Mail: contact@animalbond.club',
    },
  },

  fr: {
    pageTitle: "Conditions d'utilisation",
    version: "Version 1.0 · 11 avril 2026",
    sections: [
      {
        title: '1. Qui sommes-nous',
        text: "AnimalBond est une plateforme numérique mettant en relation des personnes souhaitant adopter, accueillir temporairement, donner à l'adoption ou aider des animaux dans le besoin. Nous sommes une plateforme intermédiaire — nous ne possédons, ne vendons et ne garantissons aucun animal listé. L'opératrice de la plateforme est Elena Lenghel, une personne physique, joignable à : contact@animalbond.club.",
      },
      {
        title: '2. Éligibilité',
        text: "Vous devez avoir au moins 16 ans pour utiliser la plateforme. Le service n'est pas disponible dans les pays soumis à des sanctions internationales (Iran, Corée du Nord, Russie, Biélorussie, Syrie, Cuba).",
      },
      {
        title: '3. Types de compte',
        items: [
          "Utilisateur — adopter, donner à l'adoption, faire des dons. Gratuit.",
          'Refuge / Association — vérifié manuellement. Gratuit.',
          'Partenaire (entreprise) — vétérinaires, animaleries, etc. Abonnement mensuel.',
        ],
        text: "Vous ne pouvez détenir qu'un seul type de compte. L'adoption est disponible pour tous.",
      },
      {
        title: '4. Annonces — vos responsabilités',
        items: [
          "Vous êtes le propriétaire légal de l'animal",
          "L'animal N'EST PAS une espèce protégée / CITES",
          'Les photos et descriptions sont réelles et actuelles',
          "Vous marquez l'annonce comme « Adopté » lorsque l'animal trouve un foyer",
          "Les annonces expirent automatiquement après 90 jours",
        ],
      },
      {
        title: '5. Cas médicaux et dons',
        text: "Vous pouvez publier votre IBAN pour des dons directs. AnimalBond ne traite PAS, ne détient pas et ne transfère pas d'argent. Nous ne sommes pas responsables du mauvais usage des fonds.",
      },
      {
        title: '6. Comportement interdit',
        items: [
          "Espèces protégées, trafic d'animaux, pratiques cruelles",
          'Harcèlement, menaces, messages commerciaux non sollicités',
          'Fraude ou toute activité illégale',
          "Faux comptes ou usurpation d'identité",
        ],
      },
      {
        title: '7. Signalement',
        text: "Utilisez le bouton « Signaler » dans l'application ou sur le site pour signaler un contenu inapproprié. Nous agissons conformément au Digital Services Act (DSA — UE).",
      },
      {
        title: '8. Suppression du compte',
        text: 'Vous pouvez supprimer votre compte à tout moment depuis les Paramètres. La suppression est définitive — profil, annonces, messages, photos.',
      },
      {
        title: '9. Responsabilité',
        text: "Le service est fourni « tel quel », sans garantie. Nous ne sommes pas responsables du comportement des utilisateurs ni de l'état des animaux. La plateforme est un intermédiaire — toute transaction ou accord entre utilisateurs est de leur seule responsabilité.",
      },
      {
        title: '10. Propriété intellectuelle',
        text: "Tous les éléments de design, le logo et le nom « AnimalBond » sont la propriété de l'opératrice. Les photos et descriptions des annonces appartiennent aux utilisateurs qui les ont publiées.",
      },
      {
        title: '11. Modifications des conditions',
        text: "Nous nous réservons le droit de mettre à jour ces conditions. Les modifications significatives seront communiquées par e-mail ou par une notification dans l'application. La poursuite de l'utilisation de la plateforme après une modification constitue une acceptation des nouvelles conditions.",
      },
      {
        title: '12. Droit applicable',
        text: 'Les lois de la Roumanie et, le cas échéant, de l\'Union européenne. Les tribunaux compétents sont ceux de Bucarest, Roumanie.',
      },
      {
        title: '13. Contact',
        text: '',
      },
    ],
    contactBox: {
      operator: 'Opératrice : Elena Lenghel',
      platform: 'Plateforme : AnimalBond — animalbond.club',
      email: 'E-mail : contact@animalbond.club',
    },
  },

  it: {
    pageTitle: 'Termini e Condizioni',
    version: 'Versione 1.0 · 11 aprile 2026',
    sections: [
      {
        title: '1. Chi siamo',
        text: "AnimalBond è una piattaforma digitale che mette in contatto persone che desiderano adottare, ospitare temporaneamente, cedere o aiutare animali bisognosi. Siamo una piattaforma intermediaria — non possediamo, non vendiamo e non garantiamo nessun animale elencato. L'operatrice della piattaforma è Elena Lenghel, persona fisica, raggiungibile a: contact@animalbond.club.",
      },
      {
        title: '2. Idoneità',
        text: 'Devi avere almeno 16 anni per utilizzare la piattaforma. Il servizio non è disponibile nei paesi soggetti a sanzioni internazionali (Iran, Corea del Nord, Russia, Bielorussia, Siria, Cuba).',
      },
      {
        title: '3. Tipi di account',
        items: [
          'Utente — adottare, cedere, donare. Gratuito.',
          'Rifugio / Associazione — verificato manualmente. Gratuito.',
          'Partner (azienda) — veterinari, negozi per animali, ecc. Abbonamento mensile.',
        ],
        text: 'Puoi avere un solo tipo di account. L\'adozione è disponibile per tutti.',
      },
      {
        title: '4. Annunci — le tue responsabilità',
        items: [
          "Sei il proprietario legale dell'animale",
          "L'animale NON è una specie protetta / CITES",
          'Le foto e le descrizioni sono reali e aggiornate',
          "Contrassegni l'annuncio come \"Adottato\" quando l'animale trova casa",
          "Gli annunci scadono automaticamente dopo 90 giorni",
        ],
      },
      {
        title: '5. Casi medici e donazioni',
        text: 'Puoi pubblicare il tuo IBAN per donazioni dirette. AnimalBond NON elabora, detiene o trasferisce denaro. Non siamo responsabili per l\'uso improprio dei fondi.',
      },
      {
        title: '6. Comportamento vietato',
        items: [
          'Specie protette, traffico di animali, pratiche crudeli',
          'Molestie, minacce, messaggi commerciali non richiesti',
          'Frode o qualsiasi attività illegale',
          'Account falsi o impersonazione di altre persone',
        ],
      },
      {
        title: '7. Segnalazione',
        text: 'Usa il pulsante "Segnala" nell\'app o sul sito per segnalare contenuti inappropriati. Agiamo in conformità con il Digital Services Act (DSA — UE).',
      },
      {
        title: '8. Eliminazione account',
        text: 'Puoi eliminare il tuo account in qualsiasi momento dalle Impostazioni. L\'eliminazione è definitiva — profilo, annunci, messaggi, foto.',
      },
      {
        title: '9. Responsabilità',
        text: 'Il servizio è fornito "così com\'è", senza garanzie. Non siamo responsabili per il comportamento degli utenti o le condizioni degli animali. La piattaforma è un intermediario — qualsiasi transazione o accordo tra utenti è di loro esclusiva responsabilità.',
      },
      {
        title: '10. Proprietà intellettuale',
        text: 'Tutti gli elementi di design, il logo e il nome "AnimalBond" sono di proprietà dell\'operatrice. Le foto e le descrizioni degli annunci appartengono agli utenti che le hanno pubblicate.',
      },
      {
        title: '11. Modifiche ai termini',
        text: 'Ci riserviamo il diritto di aggiornare questi termini. Le modifiche significative saranno comunicate via e-mail o tramite un avviso nell\'app. Il proseguimento dell\'utilizzo della piattaforma dopo una modifica costituisce accettazione dei nuovi termini.',
      },
      {
        title: '12. Legge applicabile',
        text: 'Le leggi della Romania e, ove applicabile, dell\'Unione Europea. I tribunali competenti sono quelli di Bucarest, Romania.',
      },
      {
        title: '13. Contatto',
        text: '',
      },
    ],
    contactBox: {
      operator: 'Operatrice: Elena Lenghel',
      platform: 'Piattaforma: AnimalBond — animalbond.club',
      email: 'E-mail: contact@animalbond.club',
    },
  },

  es: {
    pageTitle: 'Términos y Condiciones',
    version: 'Versión 1.0 · 11 de abril de 2026',
    sections: [
      {
        title: '1. Quiénes somos',
        text: 'AnimalBond es una plataforma digital que conecta a personas que desean adoptar, acoger temporalmente, dar en adopción o ayudar a animales necesitados. Somos una plataforma intermediaria — no poseemos, vendemos ni garantizamos ningún animal listado. La operadora de la plataforma es Elena Lenghel, persona física, contactable en: contact@animalbond.club.',
      },
      {
        title: '2. Elegibilidad',
        text: 'Debes tener al menos 16 años para usar la plataforma. El servicio no está disponible en países bajo sanciones internacionales (Irán, Corea del Norte, Rusia, Bielorrusia, Siria, Cuba).',
      },
      {
        title: '3. Tipos de cuenta',
        items: [
          'Usuario — adoptar, dar en adopción, donar. Gratuito.',
          'Refugio / Asociación — verificado manualmente. Gratuito.',
          'Socio (empresa) — veterinarios, tiendas de mascotas, etc. Suscripción mensual.',
        ],
        text: 'Solo puedes tener un tipo de cuenta. La adopción está disponible para todos.',
      },
      {
        title: '4. Anuncios — tus responsabilidades',
        items: [
          'Eres el propietario legal del animal',
          'El animal NO es una especie protegida / CITES',
          'Las fotos y descripciones son reales y actuales',
          'Marcas el anuncio como "Adoptado" cuando el animal encuentra hogar',
          'Los anuncios caducan automáticamente a los 90 días',
        ],
      },
      {
        title: '5. Casos médicos y donaciones',
        text: 'Puedes publicar tu IBAN para donaciones directas. AnimalBond NO procesa, retiene ni transfiere dinero. No somos responsables del uso indebido de los fondos.',
      },
      {
        title: '6. Conducta prohibida',
        items: [
          'Especies protegidas, tráfico de animales, prácticas crueles',
          'Acoso, amenazas, mensajes comerciales no solicitados',
          'Fraude o cualquier actividad ilegal',
          'Cuentas falsas o suplantación de identidad',
        ],
      },
      {
        title: '7. Denuncias',
        text: 'Usa el botón "Denunciar" en la app o en el sitio web para reportar contenido inapropiado. Actuamos conforme al Reglamento de Servicios Digitales (DSA — UE).',
      },
      {
        title: '8. Eliminación de cuenta',
        text: 'Puedes eliminar tu cuenta en cualquier momento desde Configuración. La eliminación es definitiva — perfil, anuncios, mensajes, fotos.',
      },
      {
        title: '9. Responsabilidad',
        text: 'El servicio se ofrece "tal como está", sin garantías. No somos responsables del comportamiento de los usuarios ni del estado de los animales. La plataforma es intermediaria — cualquier transacción o acuerdo entre usuarios es de su exclusiva responsabilidad.',
      },
      {
        title: '10. Propiedad intelectual',
        text: 'Todos los elementos de diseño, el logotipo y el nombre "AnimalBond" son propiedad de la operadora. Las fotos y descripciones de los anuncios pertenecen a los usuarios que las publicaron.',
      },
      {
        title: '11. Cambios en los términos',
        text: 'Nos reservamos el derecho de actualizar estos términos. Los cambios significativos se comunicarán por correo electrónico o mediante un aviso en la app. El uso continuado de la plataforma tras un cambio constituye la aceptación de los nuevos términos.',
      },
      {
        title: '12. Ley aplicable',
        text: 'Las leyes de Rumanía y, donde sea aplicable, de la Unión Europea. Los tribunales competentes son los de Bucarest, Rumanía.',
      },
      {
        title: '13. Contacto',
        text: '',
      },
    ],
    contactBox: {
      operator: 'Operadora: Elena Lenghel',
      platform: 'Plataforma: AnimalBond — animalbond.club',
      email: 'Correo: contact@animalbond.club',
    },
  },

  hu: {
    pageTitle: 'Felhasználási feltételek',
    version: '1.0 verzió · 2026. április 11.',
    sections: [
      {
        title: '1. Kik vagyunk',
        text: 'Az AnimalBond egy digitális platform, amely összeköti azokat a személyeket, akik örökbefogadni, átmeneti otthont adni, leadni vagy segíteni szeretnének rászoruló állatoknak. Közvetítő platform vagyunk — nem rendelkezünk, nem adunk el és nem garantálunk egyetlen hirdetett állatot sem. A platform üzemeltetője Elena Lenghel, magánszemély, elérhetősége: contact@animalbond.club.',
      },
      {
        title: '2. Jogosultság',
        text: 'A platform használatához legalább 16 évesnek kell lenned. A szolgáltatás nem érhető el nemzetközi szankciók alatt álló országokban (Irán, Észak-Korea, Oroszország, Fehéroroszország, Szíria, Kuba).',
      },
      {
        title: '3. Fióktípusok',
        items: [
          'Felhasználó — örökbefogadás, leadás, adományozás. Ingyenes.',
          'Menedékhely / Egyesület — kézi ellenőrzéssel. Ingyenes.',
          'Partner (vállalat) — állatorvosok, kisállat-boltok stb. Havi előfizetés.',
        ],
        text: 'Csak egy fióktípussal rendelkezhetsz. Az örökbefogadás mindenki számára elérhető.',
      },
      {
        title: '4. Hirdetések — a te felelősséged',
        items: [
          'Te vagy az állat törvényes tulajdonosa',
          'Az állat NEM védett / CITES faj',
          'A fotók és leírások valósak és aktuálisak',
          'A hirdetést „Örökbefogadva" státuszra állítod, amikor az állat gazdára talál',
          'A hirdetések automatikusan lejárnak 90 nap után',
        ],
      },
      {
        title: '5. Orvosi esetek és adományok',
        text: 'Közzéteheted az IBAN-számodat közvetlen adományokhoz. Az AnimalBond NEM dolgoz fel, tart vagy utal át pénzt. Nem vagyunk felelősek az alapok helytelen felhasználásáért.',
      },
      {
        title: '6. Tiltott magatartás',
        items: [
          'Védett fajok, állatkereskedelem, kegyetlen gyakorlatok',
          'Zaklatás, fenyegetések, kéretlen kereskedelmi üzenetek',
          'Csalás vagy bármilyen illegális tevékenység',
          'Hamis fiókok vagy más személyek megszemélyesítése',
        ],
      },
      {
        title: '7. Bejelentés',
        text: 'Használd az alkalmazásban vagy a weboldalon található „Bejelentés" gombot a nem megfelelő tartalom jelzéséhez. A Digital Services Act (DSA — EU) szerint járunk el.',
      },
      {
        title: '8. Fiók törlése',
        text: 'Fiókod bármikor törölheted a Beállítások menüpontból. A törlés végleges — profil, hirdetések, üzenetek, fotók.',
      },
      {
        title: '9. Felelősség',
        text: 'A szolgáltatás „ahogy van" alapon, garancia nélkül kerül biztosításra. Nem vagyunk felelősek a felhasználók magatartásáért vagy az állatok állapotáért. A platform közvetítő — a felhasználók közötti tranzakciók és megállapodások kizárólag az ő felelősségük.',
      },
      {
        title: '10. Szellemi tulajdon',
        text: 'Minden tervezési elem, a logó és az „AnimalBond" név az üzemeltető tulajdona. A hirdetések fotói és leírásai az azokat közzétevő felhasználókhoz tartoznak.',
      },
      {
        title: '11. A feltételek módosítása',
        text: 'Fenntartjuk a jogot, hogy frissítsük ezeket a feltételeket. A jelentős változásokat e-mailben vagy az alkalmazáson belüli értesítéssel közöljük. A platform módosítás utáni folyamatos használata az új feltételek elfogadásának minősül.',
      },
      {
        title: '12. Alkalmazandó jog',
        text: 'Románia törvényei, és ahol alkalmazható, az Európai Unió jogszabályai. Az illetékes bíróságok a romániai Bukarestben találhatók.',
      },
      {
        title: '13. Kapcsolat',
        text: '',
      },
    ],
    contactBox: {
      operator: 'Üzemeltető: Elena Lenghel',
      platform: 'Platform: AnimalBond — animalbond.club',
      email: 'E-mail: contact@animalbond.club',
    },
  },
}
