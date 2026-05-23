export type Lang = 'ro' | 'en' | 'de' | 'fr' | 'it' | 'es' | 'hu' | 'pt' | 'nl' | 'ru'

export interface ChildSafetySection {
  title: string
  text?: string
  items?: string[]
}

export interface ChildSafetyContent {
  pageTitle: string
  lastUpdate: string
  sections: ChildSafetySection[]
  contactBox: { operator: string; platform: string; formLink: string; designated: string }
  englishSummary?: string  // doar pentru non-EN — rezumat în engleză pentru reviewer internațional
}

export const CHILD_SAFETY_CONTENT: Record<Lang, ChildSafetyContent> = {
  ro: {
    pageTitle: 'Standardele de siguranță a copiilor',
    lastUpdate: 'Ultima actualizare: mai 2026',
    sections: [
      {
        title: '1. Despre AnimalBond',
        text: 'AnimalBond este o platformă digitală pentru adopție, găzduire temporară și îngrijirea animalelor de companie. Platforma NU este destinată copiilor. Termenii noștri de utilizare cer ca toți utilizatorii să aibă cel puțin 16 ani. Nu colectăm cu bună știință date de la minori sub această vârstă.',
      },
      {
        title: '2. Toleranță zero pentru abuz asupra copiilor (CSAM)',
        text: 'AnimalBond aplică o politică strictă de toleranță zero împotriva oricărei forme de Material de Abuz Sexual asupra Copiilor (CSAM), grooming online, exploatare sexuală a minorilor sau orice conținut care pune în pericol siguranța și bunăstarea copiilor. Acest tip de conținut este interzis pe platforma noastră, fără excepție.',
      },
      {
        title: '3. Cum raportezi conținut neadecvat',
        text: 'Utilizatorii pot raporta conținut neadecvat, inclusiv probleme legate de siguranța copiilor, prin următoarele căi:',
        items: [
          'În aplicație: Fiecare anunț și profil utilizator are un buton 🚩 „Raportează" vizibil și accesibil',
          'Formular de contact: animalbond.club/contact',
          'Categorii de raportare disponibile: CSAM/abuz sexual minori, grooming, conținut neadecvat, fraudă, abuz animale, altele',
        ],
      },
      {
        title: '4. Acțiuni pe rapoarte și cooperare cu autoritățile',
        text: 'Când se raportează sau se detectează CSAM ori încălcări ale siguranței copiilor:',
        items: [
          'Conținutul este eliminat imediat de pe platformă',
          'Contul vinovat este blocat permanent',
          'Dovezile sunt păstrate conform cerințelor legale',
          'Rapoartele sunt trimise către NCMEC (National Center for Missing & Exploited Children) acolo unde se aplică',
          'Cooperare cu autoritățile naționale: ANPDCA, Poliția Română, DIICOT pentru infracțiuni online',
          'Conformitate cu Regulamentul (UE) 2022/2065 (Digital Services Act)',
        ],
      },
      {
        title: '5. Conformitate legală',
        text: 'AnimalBond respectă toate legile aplicabile privind siguranța copiilor, inclusiv:',
        items: [
          'Regulamentul (UE) 2022/2065 — Digital Services Act',
          'Regulamentul (UE) 2016/679 — GDPR (cu protecții speciale pentru minori)',
          'Legea 678/2001 — Prevenirea și combaterea traficului de persoane',
          'Legea 196/2003 — Prevenirea și combaterea pornografiei',
          'Raportare obligatorie NCMEC (18 U.S.C. § 2258A — unde se aplică)',
        ],
      },
      {
        title: '6. Persoană de contact pentru siguranța copiilor',
        text: 'Pentru orice îngrijorare legată de siguranța copiilor pe AnimalBond, contactează-ne prin formularul de contact.',
      },
      {
        title: '7. Actualizări ale politicii',
        text: 'Putem actualiza aceste standarde din când în când pentru a reflecta schimbări în practicile noastre sau cerințele legale.',
      },
    ],
    contactBox: {
      operator: 'Operator: AnimalBond',
      platform: 'Platformă: AnimalBond — animalbond.club',
      formLink: 'Formular de contact',
      designated: 'Persoana de contact desemnată este pregătită să discute despre practicile de combatere a CSAM și conformitatea platformei.',
    },
  },

  en: {
    pageTitle: 'Child Safety Standards',
    lastUpdate: 'Last updated: May 2026',
    sections: [
      {
        title: '1. About AnimalBond',
        text: 'AnimalBond is a digital platform for animal adoption, fostering and care. The platform is NOT directed at children. Our Terms of Service require all users to be at least 16 years old. We do not knowingly collect data from minors under this age.',
      },
      {
        title: '2. Zero Tolerance for Child Sexual Abuse Material (CSAM)',
        text: 'AnimalBond has a strict zero-tolerance policy against any form of Child Sexual Abuse Material (CSAM), online grooming, sexual exploitation of minors or any content endangering the safety and well-being of children. Such content is strictly prohibited on our platform, without exception.',
      },
      {
        title: '3. How to Report Inappropriate Content',
        text: 'Users can report inappropriate content, including child safety concerns, through the following channels:',
        items: [
          'In-app: Each listing and user profile has a 🚩 "Report" button visible and accessible',
          'Contact form: animalbond.club/contact',
          'Available reporting categories: CSAM/child sexual abuse, grooming, inappropriate content, fraud, animal abuse, other',
        ],
      },
      {
        title: '4. Action on Reports & Cooperation with Authorities',
        text: 'When CSAM or child safety violations are reported or detected:',
        items: [
          'Content is immediately removed from the platform',
          'The offending account is permanently banned',
          'Evidence is preserved as required by law',
          'Reports are forwarded to NCMEC (National Center for Missing & Exploited Children) where applicable',
          'Cooperation with national authorities: ANPDCA (Romania), Police, DIICOT for online crimes',
          'Compliance with EU Regulation 2022/2065 (Digital Services Act)',
        ],
      },
      {
        title: '5. Legal Compliance',
        text: 'AnimalBond complies with all applicable laws regarding child safety, including:',
        items: [
          'EU Regulation 2022/2065 — Digital Services Act',
          'EU Regulation 2016/679 — GDPR (with special protections for minors)',
          'Romanian Law 678/2001 — Preventing human trafficking',
          'Romanian Law 196/2003 — Preventing pornography',
          'Mandatory NCMEC reporting (18 U.S.C. § 2258A — where applicable)',
        ],
      },
      {
        title: '6. Designated Contact for Child Safety',
        text: 'For any concerns related to child safety on AnimalBond, contact us through the contact form.',
      },
      {
        title: '7. Policy Updates',
        text: 'We may update these standards from time to time to reflect changes in our practices or legal requirements.',
      },
    ],
    contactBox: {
      operator: 'Operator: AnimalBond',
      platform: 'Platform: AnimalBond — animalbond.club',
      formLink: 'Contact form',
      designated: 'The designated contact is prepared to discuss CSAM prevention practices and platform compliance.',
    },
  },

  de: {
    pageTitle: 'Standards für die Sicherheit von Kindern',
    lastUpdate: 'Zuletzt aktualisiert: Mai 2026',
    sections: [
      {
        title: '1. Über AnimalBond',
        text: 'AnimalBond ist eine digitale Plattform für Tieradoption, vorübergehende Unterbringung und Pflege. Die Plattform ist NICHT für Kinder bestimmt. Unsere Nutzungsbedingungen erfordern, dass alle Nutzer mindestens 16 Jahre alt sind. Wir erheben nicht wissentlich Daten von Minderjährigen unter diesem Alter.',
      },
      {
        title: '2. Nulltoleranz gegenüber CSAM',
        text: 'AnimalBond hat eine strenge Nulltoleranz-Politik gegen jede Form von Material über sexuellen Missbrauch von Kindern (CSAM), Online-Grooming, sexueller Ausbeutung Minderjähriger oder Inhalten, die die Sicherheit und das Wohlbefinden von Kindern gefährden. Solche Inhalte sind auf unserer Plattform ausnahmslos verboten.',
      },
      {
        title: '3. Wie man unangemessene Inhalte meldet',
        text: 'Nutzer können unangemessene Inhalte, einschließlich Bedenken hinsichtlich der Sicherheit von Kindern, über folgende Kanäle melden:',
        items: [
          'In der App: Jede Anzeige und jedes Nutzerprofil hat einen sichtbaren 🚩 „Melden"-Button',
          'Kontaktformular: animalbond.club/contact',
          'Verfügbare Meldekategorien: CSAM/Kindesmissbrauch, Grooming, unangemessene Inhalte, Betrug, Tiermissbrauch, Sonstiges',
        ],
      },
      {
        title: '4. Maßnahmen bei Meldungen und Zusammenarbeit mit Behörden',
        text: 'Wenn CSAM oder Verletzungen der Kindersicherheit gemeldet oder erkannt werden:',
        items: [
          'Der Inhalt wird sofort von der Plattform entfernt',
          'Das schuldige Konto wird dauerhaft gesperrt',
          'Beweise werden gemäß den gesetzlichen Anforderungen aufbewahrt',
          'Berichte werden an NCMEC weitergeleitet (wo zutreffend)',
          'Zusammenarbeit mit nationalen Behörden: ANPDCA (Rumänien), Polizei, DIICOT für Online-Straftaten',
          'Einhaltung der EU-Verordnung 2022/2065 (Digital Services Act)',
        ],
      },
      {
        title: '5. Gesetzliche Einhaltung',
        text: 'AnimalBond hält alle geltenden Gesetze zum Schutz von Kindern ein, einschließlich:',
        items: [
          'EU-Verordnung 2022/2065 — Digital Services Act',
          'EU-Verordnung 2016/679 — DSGVO (mit besonderen Schutzmaßnahmen für Minderjährige)',
          'Rumänisches Gesetz 678/2001 — Verhinderung von Menschenhandel',
          'Rumänisches Gesetz 196/2003 — Verhinderung von Pornografie',
          'Verpflichtende NCMEC-Meldung (18 U.S.C. § 2258A — wo zutreffend)',
        ],
      },
      {
        title: '6. Benannte Kontaktperson für Kindersicherheit',
        text: 'Bei Bedenken zur Kindersicherheit auf AnimalBond kontaktiere uns über das Kontaktformular.',
      },
      {
        title: '7. Richtlinienaktualisierungen',
        text: 'Wir können diese Standards von Zeit zu Zeit aktualisieren, um Änderungen in unseren Praktiken oder gesetzlichen Anforderungen widerzuspiegeln.',
      },
    ],
    contactBox: {
      operator: 'Betreiber: AnimalBond',
      platform: 'Plattform: AnimalBond — animalbond.club',
      formLink: 'Kontaktformular',
      designated: 'Die benannte Kontaktperson ist bereit, über CSAM-Präventionspraktiken und Plattform-Compliance zu sprechen.',
    },
  },

  fr: {
    pageTitle: "Normes de sécurité des enfants",
    lastUpdate: 'Dernière mise à jour : mai 2026',
    sections: [
      {
        title: '1. À propos d\'AnimalBond',
        text: "AnimalBond est une plateforme numérique pour l'adoption, l'accueil temporaire et les soins d'animaux. La plateforme N'EST PAS destinée aux enfants. Nos conditions exigent que tous les utilisateurs aient au moins 16 ans. Nous ne collectons pas sciemment de données auprès de mineurs en dessous de cet âge.",
      },
      {
        title: '2. Tolérance zéro pour le CSAM',
        text: "AnimalBond applique une politique stricte de tolérance zéro contre toute forme de Matériel d'Abus Sexuel sur Enfants (CSAM), de grooming en ligne, d'exploitation sexuelle des mineurs ou de tout contenu mettant en danger la sécurité et le bien-être des enfants. Ce type de contenu est interdit sur notre plateforme, sans exception.",
      },
      {
        title: '3. Comment signaler du contenu inapproprié',
        text: 'Les utilisateurs peuvent signaler du contenu inapproprié, y compris les préoccupations liées à la sécurité des enfants, via les canaux suivants :',
        items: [
          "Dans l'application : Chaque annonce et profil utilisateur dispose d'un bouton 🚩 « Signaler » visible et accessible",
          'Formulaire de contact : animalbond.club/contact',
          "Catégories de signalement disponibles : CSAM/abus sexuel de mineurs, grooming, contenu inapproprié, fraude, maltraitance animale, autre",
        ],
      },
      {
        title: '4. Actions sur les signalements et coopération avec les autorités',
        text: 'Lorsque du CSAM ou des violations de la sécurité des enfants sont signalés ou détectés :',
        items: [
          'Le contenu est immédiatement retiré de la plateforme',
          'Le compte fautif est banni définitivement',
          "Les preuves sont conservées conformément aux exigences légales",
          'Les signalements sont transmis au NCMEC (le cas échéant)',
          "Coopération avec les autorités nationales : ANPDCA (Roumanie), Police, DIICOT pour les crimes en ligne",
          'Conformité avec le Règlement (UE) 2022/2065 (Digital Services Act)',
        ],
      },
      {
        title: '5. Conformité légale',
        text: "AnimalBond respecte toutes les lois applicables concernant la sécurité des enfants, notamment :",
        items: [
          'Règlement (UE) 2022/2065 — Digital Services Act',
          'Règlement (UE) 2016/679 — RGPD (avec protections spéciales pour les mineurs)',
          'Loi roumaine 678/2001 — Prévention de la traite des êtres humains',
          'Loi roumaine 196/2003 — Prévention de la pornographie',
          'Signalement obligatoire NCMEC (18 U.S.C. § 2258A — le cas échéant)',
        ],
      },
      {
        title: '6. Contact désigné pour la sécurité des enfants',
        text: "Pour toute préoccupation liée à la sécurité des enfants sur AnimalBond, contactez-nous via le formulaire de contact.",
      },
      {
        title: '7. Mises à jour de la politique',
        text: "Nous pouvons mettre à jour ces normes de temps à autre pour refléter les changements dans nos pratiques ou les exigences légales.",
      },
    ],
    contactBox: {
      operator: 'Opérateur : AnimalBond',
      platform: 'Plateforme : AnimalBond — animalbond.club',
      formLink: 'Formulaire de contact',
      designated: "Le contact désigné est prêt à discuter des pratiques de prévention CSAM et de la conformité de la plateforme.",
    },
  },

  it: {
    pageTitle: 'Standard di sicurezza dei bambini',
    lastUpdate: 'Ultimo aggiornamento: maggio 2026',
    sections: [
      {
        title: '1. Informazioni su AnimalBond',
        text: "AnimalBond è una piattaforma digitale per l'adozione, l'affidamento temporaneo e la cura degli animali. La piattaforma NON è destinata ai bambini. I nostri Termini di Servizio richiedono che tutti gli utenti abbiano almeno 16 anni. Non raccogliamo consapevolmente dati da minori sotto questa età.",
      },
      {
        title: '2. Tolleranza zero per CSAM',
        text: "AnimalBond applica una politica rigorosa di tolleranza zero contro qualsiasi forma di Materiale di Abuso Sessuale su Minori (CSAM), grooming online, sfruttamento sessuale dei minori o qualsiasi contenuto che metta in pericolo la sicurezza e il benessere dei bambini. Tale contenuto è vietato sulla nostra piattaforma, senza eccezioni.",
      },
      {
        title: '3. Come segnalare contenuti inappropriati',
        text: 'Gli utenti possono segnalare contenuti inappropriati, incluse preoccupazioni sulla sicurezza dei bambini, attraverso i seguenti canali:',
        items: [
          "Nell'app: Ogni annuncio e profilo utente ha un pulsante 🚩 \"Segnala\" visibile e accessibile",
          'Modulo di contatto: animalbond.club/contact',
          'Categorie di segnalazione: CSAM/abuso sessuale su minori, grooming, contenuto inappropriato, frode, abuso di animali, altro',
        ],
      },
      {
        title: '4. Azioni sulle segnalazioni e cooperazione con le autorità',
        text: 'Quando CSAM o violazioni della sicurezza dei bambini vengono segnalati o rilevati:',
        items: [
          'Il contenuto viene immediatamente rimosso dalla piattaforma',
          "L'account responsabile viene bannato permanentemente",
          'Le prove vengono conservate come richiesto dalla legge',
          'Le segnalazioni vengono inoltrate a NCMEC (ove applicabile)',
          'Cooperazione con le autorità nazionali: ANPDCA (Romania), Polizia, DIICOT per i crimini online',
          'Conformità con il Regolamento (UE) 2022/2065 (Digital Services Act)',
        ],
      },
      {
        title: '5. Conformità legale',
        text: "AnimalBond rispetta tutte le leggi applicabili sulla sicurezza dei bambini, incluse:",
        items: [
          'Regolamento (UE) 2022/2065 — Digital Services Act',
          "Regolamento (UE) 2016/679 — GDPR (con protezioni speciali per i minori)",
          'Legge rumena 678/2001 — Prevenzione del traffico di esseri umani',
          'Legge rumena 196/2003 — Prevenzione della pornografia',
          'Segnalazione obbligatoria NCMEC (18 U.S.C. § 2258A — ove applicabile)',
        ],
      },
      {
        title: '6. Contatto designato per la sicurezza dei bambini',
        text: "Per qualsiasi preoccupazione relativa alla sicurezza dei bambini su AnimalBond, contattaci tramite il modulo di contatto.",
      },
      {
        title: '7. Aggiornamenti della politica',
        text: 'Possiamo aggiornare questi standard di tanto in tanto per riflettere cambiamenti nelle nostre pratiche o requisiti legali.',
      },
    ],
    contactBox: {
      operator: 'Operatore: AnimalBond',
      platform: 'Piattaforma: AnimalBond — animalbond.club',
      formLink: 'Modulo di contatto',
      designated: "Il contatto designato è preparato a discutere le pratiche di prevenzione CSAM e la conformità della piattaforma.",
    },
  },

  es: {
    pageTitle: 'Estándares de seguridad infantil',
    lastUpdate: 'Última actualización: mayo de 2026',
    sections: [
      {
        title: '1. Acerca de AnimalBond',
        text: 'AnimalBond es una plataforma digital para la adopción, acogida temporal y cuidado de animales. La plataforma NO está dirigida a niños. Nuestros Términos requieren que todos los usuarios tengan al menos 16 años. No recopilamos conscientemente datos de menores de esta edad.',
      },
      {
        title: '2. Tolerancia cero para CSAM',
        text: 'AnimalBond aplica una política estricta de tolerancia cero contra cualquier forma de Material de Abuso Sexual Infantil (CSAM), grooming en línea, explotación sexual de menores o cualquier contenido que ponga en peligro la seguridad y el bienestar de los niños. Este tipo de contenido está prohibido en nuestra plataforma, sin excepción.',
      },
      {
        title: '3. Cómo reportar contenido inapropiado',
        text: 'Los usuarios pueden reportar contenido inapropiado, incluidas preocupaciones sobre seguridad infantil, a través de los siguientes canales:',
        items: [
          'En la app: Cada anuncio y perfil de usuario tiene un botón 🚩 "Reportar" visible y accesible',
          'Formulario de contacto: animalbond.club/contact',
          'Categorías de reporte disponibles: CSAM/abuso sexual de menores, grooming, contenido inapropiado, fraude, abuso animal, otros',
        ],
      },
      {
        title: '4. Acciones en reportes y cooperación con autoridades',
        text: 'Cuando se reporta o detecta CSAM o violaciones de seguridad infantil:',
        items: [
          'El contenido se elimina inmediatamente de la plataforma',
          'La cuenta infractora es baneada permanentemente',
          'La evidencia se conserva según los requisitos legales',
          'Los reportes se envían a NCMEC (donde aplique)',
          'Cooperación con autoridades nacionales: ANPDCA (Rumanía), Policía, DIICOT para crímenes en línea',
          'Cumplimiento del Reglamento (UE) 2022/2065 (Digital Services Act)',
        ],
      },
      {
        title: '5. Cumplimiento legal',
        text: 'AnimalBond cumple con todas las leyes aplicables sobre seguridad infantil, incluyendo:',
        items: [
          'Reglamento (UE) 2022/2065 — Digital Services Act',
          'Reglamento (UE) 2016/679 — RGPD (con protecciones especiales para menores)',
          'Ley rumana 678/2001 — Prevención de trata de personas',
          'Ley rumana 196/2003 — Prevención de pornografía',
          'Reporte obligatorio NCMEC (18 U.S.C. § 2258A — donde aplique)',
        ],
      },
      {
        title: '6. Contacto designado para seguridad infantil',
        text: 'Para cualquier preocupación relacionada con la seguridad infantil en AnimalBond, contáctanos a través del formulario de contacto.',
      },
      {
        title: '7. Actualizaciones de la política',
        text: 'Podemos actualizar estos estándares de vez en cuando para reflejar cambios en nuestras prácticas o requisitos legales.',
      },
    ],
    contactBox: {
      operator: 'Operador: AnimalBond',
      platform: 'Plataforma: AnimalBond — animalbond.club',
      formLink: 'Formulario de contacto',
      designated: 'El contacto designado está preparado para discutir prácticas de prevención de CSAM y cumplimiento de la plataforma.',
    },
  },

  hu: {
    pageTitle: 'Gyermekbiztonsági szabványok',
    lastUpdate: 'Utolsó frissítés: 2026. május',
    sections: [
      {
        title: '1. Az AnimalBondról',
        text: 'Az AnimalBond egy digitális platform állatok örökbefogadásához, ideiglenes elhelyezéséhez és gondozásához. A platform NEM gyermekeknek készült. Felhasználási Feltételeink legalább 16 éves életkort követelnek meg. Nem gyűjtünk szándékosan adatokat ennél fiatalabb kiskorúaktól.',
      },
      {
        title: '2. Zéró tolerancia a CSAM-mel szemben',
        text: 'Az AnimalBond szigorú zéró tolerancia politikát alkalmaz a gyermekek szexuális visszaélését bemutató anyagok (CSAM), online grooming, kiskorúak szexuális kihasználása vagy bármely olyan tartalom ellen, amely veszélyezteti a gyermekek biztonságát és jólétét. Az ilyen tartalom kivétel nélkül tilos platformunkon.',
      },
      {
        title: '3. Hogyan jelentsünk nem megfelelő tartalmat',
        text: 'A felhasználók jelenthetnek nem megfelelő tartalmat, beleértve a gyermekbiztonsággal kapcsolatos aggodalmakat is, a következő csatornákon keresztül:',
        items: [
          'Az alkalmazásban: Minden hirdetés és felhasználói profil rendelkezik látható 🚩 „Jelentés" gombbal',
          'Kapcsolatfelvételi űrlap: animalbond.club/contact',
          'Elérhető bejelentési kategóriák: CSAM/gyermek szexuális visszaélés, grooming, nem megfelelő tartalom, csalás, állatbántalmazás, egyéb',
        ],
      },
      {
        title: '4. Intézkedések a bejelentésekre és együttműködés a hatóságokkal',
        text: 'Amikor CSAM-et vagy gyermekbiztonsági jogsértéseket jelentenek vagy észlelnek:',
        items: [
          'A tartalom azonnal eltávolításra kerül a platformról',
          'A felelős fiók véglegesen kitiltásra kerül',
          'A bizonyítékokat a törvény előírásai szerint megőrizzük',
          'A jelentéseket továbbítjuk a NCMEC-nek (ha alkalmazható)',
          'Együttműködés a nemzeti hatóságokkal: ANPDCA (Románia), Rendőrség, DIICOT online bűncselekmények esetén',
          'A 2022/2065 (EU) rendelet (Digital Services Act) betartása',
        ],
      },
      {
        title: '5. Jogi megfelelés',
        text: 'Az AnimalBond minden alkalmazandó gyermekbiztonsági törvénynek megfelel, beleértve:',
        items: [
          '2022/2065 (EU) rendelet — Digital Services Act',
          '2016/679 (EU) rendelet — GDPR (kiskorúakra vonatkozó különleges védelemmel)',
          'Román 678/2001 törvény — Emberkereskedelem megelőzése',
          'Román 196/2003 törvény — Pornográfia megelőzése',
          'Kötelező NCMEC bejelentés (18 U.S.C. § 2258A — ahol alkalmazandó)',
        ],
      },
      {
        title: '6. Kijelölt kapcsolattartó gyermekbiztonság ügyében',
        text: 'Az AnimalBond-on a gyermekbiztonsággal kapcsolatos aggodalmakkal lépj kapcsolatba velünk a kapcsolatfelvételi űrlapon keresztül.',
      },
      {
        title: '7. Szabályzat frissítések',
        text: 'Időről időre frissíthetjük ezeket a szabványokat, hogy tükrözzék a gyakorlatainkban vagy a jogi követelményekben bekövetkezett változásokat.',
      },
    ],
    contactBox: {
      operator: 'Üzemeltető: AnimalBond',
      platform: 'Platform: AnimalBond — animalbond.club',
      formLink: 'Kapcsolatfelvételi űrlap',
      designated: 'A kijelölt kapcsolattartó felkészült a CSAM megelőzési gyakorlatok és a platform megfelelőségének megvitatására.',
    },
  },

  pt: {
    pageTitle: 'Padrões de segurança infantil',
    lastUpdate: 'Última atualização: maio de 2026',
    sections: [
      {
        title: '1. Sobre o AnimalBond',
        text: 'O AnimalBond é uma plataforma digital para adoção, acolhimento temporário e cuidados de animais. A plataforma NÃO se destina a crianças. Os nossos Termos exigem que todos os utilizadores tenham pelo menos 16 anos. Não recolhemos conscientemente dados de menores abaixo desta idade.',
      },
      {
        title: '2. Tolerância zero para CSAM',
        text: 'O AnimalBond aplica uma política rigorosa de tolerância zero contra qualquer forma de Material de Abuso Sexual de Crianças (CSAM), aliciamento online, exploração sexual de menores ou qualquer conteúdo que coloque em risco a segurança e o bem-estar das crianças. Este tipo de conteúdo é proibido na nossa plataforma, sem exceção.',
      },
      {
        title: '3. Como denunciar conteúdo inadequado',
        text: 'Os utilizadores podem denunciar conteúdo inadequado, incluindo preocupações relacionadas com a segurança infantil, através dos seguintes canais:',
        items: [
          'Na aplicação: Cada anúncio e perfil de utilizador tem um botão 🚩 "Denunciar" visível e acessível',
          'Formulário de contacto: animalbond.club/contact',
          'Categorias de denúncia disponíveis: CSAM/abuso sexual de menores, aliciamento, conteúdo inadequado, fraude, abuso de animais, outros',
        ],
      },
      {
        title: '4. Ações sobre denúncias e cooperação com autoridades',
        text: 'Quando CSAM ou violações da segurança infantil são denunciados ou detectados:',
        items: [
          'O conteúdo é removido imediatamente da plataforma',
          'A conta infratora é banida permanentemente',
          'As provas são preservadas conforme exigido por lei',
          'As denúncias são encaminhadas ao NCMEC (quando aplicável)',
          'Cooperação com autoridades nacionais: ANPDCA (Roménia), Polícia, DIICOT para crimes online',
          'Conformidade com o Regulamento (UE) 2022/2065 (Digital Services Act)',
        ],
      },
      {
        title: '5. Conformidade legal',
        text: 'O AnimalBond cumpre todas as leis aplicáveis sobre segurança infantil, incluindo:',
        items: [
          'Regulamento (UE) 2022/2065 — Digital Services Act',
          'Regulamento (UE) 2016/679 — RGPD (com proteções especiais para menores)',
          'Lei romena 678/2001 — Prevenção do tráfico de seres humanos',
          'Lei romena 196/2003 — Prevenção da pornografia',
          'Denúncia obrigatória NCMEC (18 U.S.C. § 2258A — quando aplicável)',
        ],
      },
      {
        title: '6. Contacto designado para segurança infantil',
        text: 'Para qualquer preocupação relacionada com a segurança infantil no AnimalBond, contacta-nos através do formulário de contacto.',
      },
      {
        title: '7. Atualizações da política',
        text: 'Podemos atualizar estes padrões periodicamente para refletir alterações nas nossas práticas ou requisitos legais.',
      },
    ],
    contactBox: {
      operator: 'Operador: AnimalBond',
      platform: 'Plataforma: AnimalBond — animalbond.club',
      formLink: 'Formulário de contacto',
      designated: 'O contacto designado está preparado para discutir práticas de prevenção de CSAM e conformidade da plataforma.',
    },
  },

  nl: {
    pageTitle: 'Kinderveiligheidsnormen',
    lastUpdate: 'Laatst bijgewerkt: mei 2026',
    sections: [
      {
        title: '1. Over AnimalBond',
        text: 'AnimalBond is een digitaal platform voor dieradoptie, tijdelijke opvang en verzorging. Het platform is NIET gericht op kinderen. Onze gebruiksvoorwaarden vereisen dat alle gebruikers minimaal 16 jaar oud zijn. Wij verzamelen niet bewust gegevens van minderjarigen onder deze leeftijd.',
      },
      {
        title: '2. Nultolerantie voor CSAM',
        text: 'AnimalBond hanteert een strikt nultolerantiebeleid tegen elke vorm van materiaal van seksueel misbruik van kinderen (CSAM), online grooming, seksuele uitbuiting van minderjarigen of enige inhoud die de veiligheid en het welzijn van kinderen in gevaar brengt. Dergelijke inhoud is op ons platform zonder uitzondering verboden.',
      },
      {
        title: '3. Hoe ongepaste inhoud te melden',
        text: 'Gebruikers kunnen ongepaste inhoud, inclusief zorgen over kinderveiligheid, melden via de volgende kanalen:',
        items: [
          'In de app: Elke advertentie en gebruikersprofiel heeft een zichtbare 🚩 "Melden"-knop',
          'Contactformulier: animalbond.club/contact',
          'Beschikbare meldingscategorieën: CSAM/seksueel misbruik van minderjarigen, grooming, ongepaste inhoud, fraude, dierenmishandeling, overig',
        ],
      },
      {
        title: '4. Actie op meldingen en samenwerking met autoriteiten',
        text: 'Wanneer CSAM of schendingen van kinderveiligheid worden gemeld of gedetecteerd:',
        items: [
          'De inhoud wordt onmiddellijk van het platform verwijderd',
          'Het overtredende account wordt permanent verbannen',
          'Bewijs wordt bewaard zoals vereist door de wet',
          'Meldingen worden doorgestuurd naar NCMEC (waar van toepassing)',
          'Samenwerking met nationale autoriteiten: ANPDCA (Roemenië), Politie, DIICOT voor online misdrijven',
          'Naleving van EU-verordening 2022/2065 (Digital Services Act)',
        ],
      },
      {
        title: '5. Wettelijke naleving',
        text: 'AnimalBond voldoet aan alle toepasselijke wetten met betrekking tot kinderveiligheid, waaronder:',
        items: [
          'EU-verordening 2022/2065 — Digital Services Act',
          'EU-verordening 2016/679 — AVG (met speciale bescherming voor minderjarigen)',
          'Roemeense wet 678/2001 — Preventie van mensenhandel',
          'Roemeense wet 196/2003 — Preventie van pornografie',
          'Verplichte NCMEC-melding (18 U.S.C. § 2258A — waar van toepassing)',
        ],
      },
      {
        title: '6. Aangewezen contactpersoon voor kinderveiligheid',
        text: 'Voor zorgen over kinderveiligheid op AnimalBond kun je contact met ons opnemen via het contactformulier.',
      },
      {
        title: '7. Beleidsupdates',
        text: 'We kunnen deze normen van tijd tot tijd bijwerken om wijzigingen in onze praktijken of wettelijke vereisten weer te geven.',
      },
    ],
    contactBox: {
      operator: 'Beheerder: AnimalBond',
      platform: 'Platform: AnimalBond — animalbond.club',
      formLink: 'Contactformulier',
      designated: 'De aangewezen contactpersoon is voorbereid om CSAM-preventiepraktijken en platformnaleving te bespreken.',
    },
  },

  ru: {
    pageTitle: 'Стандарты безопасности детей',
    lastUpdate: 'Последнее обновление: май 2026 г.',
    sections: [
      {
        title: '1. О AnimalBond',
        text: 'AnimalBond — это цифровая платформа для усыновления, временного содержания и ухода за животными. Платформа НЕ предназначена для детей. Наши условия требуют, чтобы все пользователи были не моложе 16 лет. Мы сознательно не собираем данные от несовершеннолетних младше этого возраста.',
      },
      {
        title: '2. Нулевая терпимость к CSAM',
        text: 'AnimalBond применяет строгую политику нулевой терпимости к любым формам Материалов сексуального насилия над детьми (CSAM), онлайн-грумингу, сексуальной эксплуатации несовершеннолетних или любому контенту, угрожающему безопасности и благополучию детей. Такой контент запрещён на нашей платформе без исключений.',
      },
      {
        title: '3. Как сообщить о неподобающем контенте',
        text: 'Пользователи могут сообщать о неподобающем контенте, включая проблемы безопасности детей, через следующие каналы:',
        items: [
          'В приложении: Каждое объявление и профиль пользователя имеют видимую кнопку 🚩 «Пожаловаться»',
          'Контактная форма: animalbond.club/contact',
          'Доступные категории жалоб: CSAM/сексуальное насилие над детьми, груминг, неподобающий контент, мошенничество, жестокое обращение с животными, прочее',
        ],
      },
      {
        title: '4. Действия по жалобам и сотрудничество с властями',
        text: 'Когда CSAM или нарушения безопасности детей сообщены или обнаружены:',
        items: [
          'Контент немедленно удаляется с платформы',
          'Виновный аккаунт навсегда блокируется',
          'Доказательства сохраняются в соответствии с требованиями закона',
          'Сообщения направляются в NCMEC (где применимо)',
          'Сотрудничество с национальными властями: ANPDCA (Румыния), Полиция, DIICOT для онлайн-преступлений',
          'Соответствие Регламенту ЕС 2022/2065 (Digital Services Act)',
        ],
      },
      {
        title: '5. Соблюдение законодательства',
        text: 'AnimalBond соблюдает все применимые законы, касающиеся безопасности детей, включая:',
        items: [
          'Регламент ЕС 2022/2065 — Digital Services Act',
          'Регламент ЕС 2016/679 — GDPR (со специальной защитой для несовершеннолетних)',
          'Румынский закон 678/2001 — Предотвращение торговли людьми',
          'Румынский закон 196/2003 — Предотвращение порнографии',
          'Обязательная отчётность NCMEC (18 U.S.C. § 2258A — где применимо)',
        ],
      },
      {
        title: '6. Назначенное контактное лицо по безопасности детей',
        text: 'По любым вопросам, связанным с безопасностью детей на AnimalBond, свяжитесь с нами через контактную форму.',
      },
      {
        title: '7. Обновления политики',
        text: 'Мы можем периодически обновлять эти стандарты, чтобы отразить изменения в наших практиках или законодательных требованиях.',
      },
    ],
    contactBox: {
      operator: 'Оператор: AnimalBond',
      platform: 'Платформа: AnimalBond — animalbond.club',
      formLink: 'Контактная форма',
      designated: 'Назначенное контактное лицо готово обсудить практики предотвращения CSAM и соответствие платформы.',
    },
  },
}
