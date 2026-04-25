export type Lang = 'ro' | 'en'

export const translations = {
  ro: {
    // Navbar
    nav_adoptii: 'Adopții',
    nav_medical: '💊 Ajutor medical',
    nav_parteneri: 'Parteneri',
    nav_povesti: 'Povești',
    nav_despre: 'Despre',
    nav_download: 'Descarcă app',

    // Homepage Hero
    hero_title: 'Găsește animalul perfect',
    hero_title_accent: 'pentru tine',
    hero_subtitle: 'Mii de animale din România așteaptă o casă iubitoare. Conectăm adăposturi, persoane private și familii care vor să adopte.',
    hero_cta_animals: '🐶 Vezi animale disponibile',
    hero_cta_how: 'Cum funcționează?',

    // Homepage Sections
    section_animals_title: 'Ultimele animale adăugate',
    section_animals_subtitle: 'Animale care așteaptă o casă chiar acum',
    section_animals_see_all: 'Vezi toate →',
    section_animals_empty: 'Nu există animale disponibile momentan.',
    section_animals_empty_sub: 'Revino curând sau descarcă aplicația pentru notificări.',

    section_how_title: 'Cum funcționează?',
    section_how_subtitle: 'Simplu, rapid, direct',
    step1_title: 'Caută',
    step1_desc: 'Navighează prin sute de animale disponibile. Filtrează după specie, vârstă, locație.',
    step2_title: 'Contactează',
    step2_desc: 'Descarcă aplicația AnimalBond și contactează direct proprietarul sau adăpostul.',
    step3_title: 'Adoptă',
    step3_desc: 'Programează o întâlnire, completează formalitățile și oferă o casă nouă.',

    section_partners_title: 'Partenerii noștri',
    section_partners_subtitle: 'Cabinete vet și magazine de încredere',
    section_partners_see_all: 'Toți partenerii →',

    cta_partner_title: 'Ești cabinet vet sau magazin pentru animale?',
    cta_partner_subtitle: 'Devino partener AnimalBond și ajunge la mii de proprietari de animale din zona ta. Vizibilitate în aplicație și pe site.',
    cta_partner_btn: 'Înscrie-te ca partener →',
    cta_partner_see: 'Vezi partenerii actuali',

    section_stories_title: 'Povești de adopție',
    section_stories_subtitle: 'Oameni care au găsit un prieten prin AnimalBond',
    section_stories_see_all: 'Toate poveștile →',

    download_title: 'Descarcă aplicația AnimalBond',
    download_subtitle: 'Contactează proprietarii, salvează animale favorite și primește notificări pentru animale noi din zona ta.',
    download_qr: 'Scanează pentru a deschide aplicația',
    download_appstore: 'App Store',
    download_googleplay: 'Google Play',
    download_from: 'Descarcă din',

    // Adoptii page
    adoptii_title: 'Animale disponibile pentru adopție',
    adoptii_subtitle: 'Găsește companionul perfect din mii de animale care așteaptă o casă',
    filter_species: 'Specie',
    filter_country: 'Țară',
    filter_location: 'Județ / Oraș',
    filter_location_placeholder: 'Ex: Cluj, Iași...',
    filter_all_species: 'Toate speciile',
    filter_all_countries: '🌍 Toate țările',
    filter_reset: 'Resetează toate filtrele',
    filter_clear_location: '✕ Șterge filtrul locație',
    found_animals: 'animale găsite',
    found_animals_filtered: '(cu filtre aplicate)',
    load_more: 'Încarcă mai multe',
    loading: 'Se încarcă...',
    no_animals_title: 'Niciun animal găsit',
    no_animals_sub: 'Încearcă să schimbi filtrele sau caută în altă zonă.',
    reset_filters: 'Resetează filtrele',

    // Medical page
    medical_title: 'Ajutor medical urgent',
    medical_subtitle: 'Aceste animale au nevoie de îngrijire medicală urgentă. Descarcă aplicația AnimalBond pentru a contacta direct și a oferi ajutor.',
    medical_cta: '💙 Vreau să ajut',
    medical_banner: 'Fiecare oră contează.',
    medical_banner_sub: 'Contactul se face direct prin aplicație — descarcă AnimalBond și ajunge la persoana care are nevoie de sprijin.',
    medical_filter_label: 'Filtrează după țară:',
    medical_badge: '💊 Nevoie urgentă',
    medical_help_btn: '💙 Ajut prin aplicație',
    medical_empty_title: 'Niciun caz urgent momentan',
    medical_empty_sub: 'Revino curând sau descarcă aplicația pentru notificări în timp real.',
    medical_empty_country: 'Nu există cazuri active în țara selectată.',
    medical_see_all: 'Vezi toate țările',
    medical_active_cases: 'cazuri active',
    medical_active_case: 'caz activ',
    medical_in_country: 'în',

    // Download CTA
    download_cta_title: 'Descarcă AnimalBond',
    download_cta_sub: 'Contactează direct, oferă ajutor și salvează vieți. Gratuit pe iOS și Android.',

    // Country filter
    filter_clear: '✕ Șterge filtrul',
    filter_cases_from: 'Cazuri din',
  },

  en: {
    // Navbar
    nav_adoptii: 'Adoptions',
    nav_medical: '💊 Medical Help',
    nav_parteneri: 'Partners',
    nav_povesti: 'Stories',
    nav_despre: 'About',
    nav_download: 'Download app',

    // Homepage Hero
    hero_title: 'Find the perfect animal',
    hero_title_accent: 'for you',
    hero_subtitle: 'Thousands of animals are waiting for a loving home. We connect shelters, individuals and families who want to adopt.',
    hero_cta_animals: '🐶 See available animals',
    hero_cta_how: 'How does it work?',

    // Homepage Sections
    section_animals_title: 'Latest animals added',
    section_animals_subtitle: 'Animals waiting for a home right now',
    section_animals_see_all: 'See all →',
    section_animals_empty: 'No animals available at the moment.',
    section_animals_empty_sub: 'Check back soon or download the app for notifications.',

    section_how_title: 'How does it work?',
    section_how_subtitle: 'Simple, fast, direct',
    step1_title: 'Search',
    step1_desc: 'Browse hundreds of available animals. Filter by species, age, location.',
    step2_title: 'Contact',
    step2_desc: 'Download the AnimalBond app and contact the owner or shelter directly.',
    step3_title: 'Adopt',
    step3_desc: 'Schedule a meeting, complete the paperwork and give an animal a new home.',

    section_partners_title: 'Our Partners',
    section_partners_subtitle: 'Trusted vet clinics and pet stores',
    section_partners_see_all: 'All partners →',

    cta_partner_title: 'Are you a vet clinic or pet store?',
    cta_partner_subtitle: 'Become an AnimalBond partner and reach thousands of pet owners in your area. Visibility in the app and on the website.',
    cta_partner_btn: 'Join as a partner →',
    cta_partner_see: 'See current partners',

    section_stories_title: 'Adoption Stories',
    section_stories_subtitle: 'People who found a friend through AnimalBond',
    section_stories_see_all: 'All stories →',

    download_title: 'Download the AnimalBond app',
    download_subtitle: 'Contact owners, save favorite animals and get notifications for new animals in your area.',
    download_qr: 'Scan to open the app',
    download_appstore: 'App Store',
    download_googleplay: 'Google Play',
    download_from: 'Download from',

    // Adoptii page
    adoptii_title: 'Animals available for adoption',
    adoptii_subtitle: 'Find the perfect companion from thousands of animals waiting for a home',
    filter_species: 'Species',
    filter_country: 'Country',
    filter_location: 'County / City',
    filter_location_placeholder: 'E.g.: Cluj, Iași...',
    filter_all_species: 'All species',
    filter_all_countries: '🌍 All countries',
    filter_reset: 'Reset all filters',
    filter_clear_location: '✕ Clear location filter',
    found_animals: 'animals found',
    found_animals_filtered: '(with filters applied)',
    load_more: 'Load more',
    loading: 'Loading...',
    no_animals_title: 'No animals found',
    no_animals_sub: 'Try changing the filters or search in another area.',
    reset_filters: 'Reset filters',

    // Medical page
    medical_title: 'Urgent medical help',
    medical_subtitle: 'These animals need urgent medical care. Download the AnimalBond app to contact directly and offer help.',
    medical_cta: '💙 I want to help',
    medical_banner: 'Every hour counts.',
    medical_banner_sub: 'Contact is made directly through the app — download AnimalBond and reach the person who needs support.',
    medical_filter_label: 'Filter by country:',
    medical_badge: '💊 Urgent need',
    medical_help_btn: '💙 Help via app',
    medical_empty_title: 'No urgent cases at the moment',
    medical_empty_sub: 'Check back soon or download the app for real-time notifications.',
    medical_empty_country: 'No active cases in the selected country.',
    medical_see_all: 'See all countries',
    medical_active_cases: 'active cases',
    medical_active_case: 'active case',
    medical_in_country: 'in',

    // Download CTA
    download_cta_title: 'Download AnimalBond',
    download_cta_sub: 'Contact directly, offer help and save lives. Free on iOS and Android.',

    // Country filter
    filter_clear: '✕ Clear filter',
    filter_cases_from: 'Cases from',
  },
} satisfies Record<Lang, Record<string, string>>

export type TranslationKey = keyof typeof translations.ro
