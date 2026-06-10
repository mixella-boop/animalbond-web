/**
 * Orașe principale per țară, cu coordonate GPS.
 * Folosit pentru filtrul de oraș în ecranul Parteneri.
 */

export type City = {
  name: string;
  region: string; // județ / land / departament / etc.
  lat: number;
  lng: number;
};

// ─── România ───────────────────────────────────────────────────────────────
export const CITIES_RO: City[] = [
  { name: 'București',          region: 'Ilfov',              lat: 44.4268, lng: 26.1025 },
  { name: 'Cluj-Napoca',        region: 'Cluj',               lat: 46.7712, lng: 23.6236 },
  { name: 'Timișoara',          region: 'Timiș',              lat: 45.7489, lng: 21.2087 },
  { name: 'Iași',               region: 'Iași',               lat: 47.1585, lng: 27.6014 },
  { name: 'Constanța',          region: 'Constanța',          lat: 44.1733, lng: 28.6383 },
  { name: 'Craiova',            region: 'Dolj',               lat: 44.3302, lng: 23.7949 },
  { name: 'Brașov',             region: 'Brașov',             lat: 45.6427, lng: 25.5887 },
  { name: 'Galați',             region: 'Galați',             lat: 45.4353, lng: 28.0081 },
  { name: 'Ploiești',           region: 'Prahova',            lat: 44.9439, lng: 26.0129 },
  { name: 'Oradea',             region: 'Bihor',              lat: 47.0722, lng: 21.9218 },
  { name: 'Brăila',             region: 'Brăila',             lat: 45.2692, lng: 27.9576 },
  { name: 'Arad',               region: 'Arad',               lat: 46.1866, lng: 21.3123 },
  { name: 'Pitești',            region: 'Argeș',              lat: 44.8565, lng: 24.8692 },
  { name: 'Sibiu',              region: 'Sibiu',              lat: 45.7983, lng: 24.1256 },
  { name: 'Bacău',              region: 'Bacău',              lat: 46.5670, lng: 26.9146 },
  { name: 'Târgu Mureș',        region: 'Mureș',              lat: 46.5386, lng: 24.5579 },
  { name: 'Baia Mare',          region: 'Maramureș',          lat: 47.6567, lng: 23.5850 },
  { name: 'Buzău',              region: 'Buzău',              lat: 45.1502, lng: 26.8200 },
  { name: 'Botoșani',           region: 'Botoșani',           lat: 47.7478, lng: 26.6680 },
  { name: 'Satu Mare',          region: 'Satu Mare',          lat: 47.7925, lng: 22.8856 },
  { name: 'Râmnicu Vâlcea',     region: 'Vâlcea',             lat: 45.0997, lng: 24.3699 },
  { name: 'Suceava',            region: 'Suceava',            lat: 47.6635, lng: 26.2732 },
  { name: 'Piatra Neamț',       region: 'Neamț',              lat: 46.9269, lng: 26.3718 },
  { name: 'Deva',               region: 'Hunedoara',          lat: 45.8833, lng: 22.9000 },
  { name: 'Alba Iulia',         region: 'Alba',               lat: 46.0669, lng: 23.5806 },
  { name: 'Drobeta-Turnu Severin', region: 'Mehedinți',       lat: 44.6321, lng: 22.6561 },
  { name: 'Focșani',            region: 'Vrancea',            lat: 45.6994, lng: 27.1878 },
  { name: 'Bistrița',           region: 'Bistrița-Năsăud',    lat: 47.1305, lng: 24.4862 },
  { name: 'Reșița',             region: 'Caraș-Severin',      lat: 45.2981, lng: 21.8891 },
  { name: 'Târgoviște',         region: 'Dâmbovița',          lat: 44.9257, lng: 25.4572 },
  { name: 'Slobozia',           region: 'Ialomița',           lat: 44.5739, lng: 27.3656 },
  { name: 'Alexandria',         region: 'Teleorman',          lat: 43.9764, lng: 25.3353 },
  { name: 'Sfântu Gheorghe',    region: 'Covasna',            lat: 45.8617, lng: 25.7886 },
  { name: 'Tulcea',             region: 'Tulcea',             lat: 45.1783, lng: 28.8045 },
  { name: 'Lugoj',              region: 'Timiș',              lat: 45.6872, lng: 21.9031 },
  { name: 'Mediaș',             region: 'Sibiu',              lat: 46.1575, lng: 24.3544 },
];

// ─── Germania ──────────────────────────────────────────────────────────────
export const CITIES_DE: City[] = [
  { name: 'Berlin',      region: 'Berlin',           lat: 52.5200, lng: 13.4050 },
  { name: 'Hamburg',     region: 'Hamburg',          lat: 53.5753, lng: 10.0153 },
  { name: 'München',     region: 'Bayern',           lat: 48.1351, lng: 11.5820 },
  { name: 'Köln',        region: 'NRW',              lat: 50.9333, lng: 6.9500  },
  { name: 'Frankfurt',   region: 'Hessen',           lat: 50.1109, lng: 8.6821  },
  { name: 'Stuttgart',   region: 'Baden-Württemberg',lat: 48.7758, lng: 9.1829  },
  { name: 'Düsseldorf',  region: 'NRW',              lat: 51.2217, lng: 6.7762  },
  { name: 'Leipzig',     region: 'Sachsen',          lat: 51.3397, lng: 12.3731 },
  { name: 'Dortmund',    region: 'NRW',              lat: 51.5136, lng: 7.4653  },
  { name: 'Essen',       region: 'NRW',              lat: 51.4556, lng: 7.0116  },
  { name: 'Bremen',      region: 'Bremen',           lat: 53.0793, lng: 8.8017  },
  { name: 'Dresden',     region: 'Sachsen',          lat: 51.0504, lng: 13.7373 },
  { name: 'Hannover',    region: 'Niedersachsen',    lat: 52.3759, lng: 9.7320  },
  { name: 'Nürnberg',    region: 'Bayern',           lat: 49.4521, lng: 11.0767 },
  { name: 'Duisburg',    region: 'NRW',              lat: 51.4344, lng: 6.7623  },
  { name: 'Bochum',      region: 'NRW',              lat: 51.4818, lng: 7.2162  },
  { name: 'Wuppertal',   region: 'NRW',              lat: 51.2562, lng: 7.1508  },
  { name: 'Bielefeld',   region: 'NRW',              lat: 52.0302, lng: 8.5325  },
  { name: 'Bonn',        region: 'NRW',              lat: 50.7374, lng: 7.0982  },
  { name: 'Mannheim',    region: 'Baden-Württemberg',lat: 49.4875, lng: 8.4660  },
];

// ─── Austria ───────────────────────────────────────────────────────────────
export const CITIES_AT: City[] = [
  { name: 'Wien',        region: 'Wien',             lat: 48.2082, lng: 16.3738 },
  { name: 'Graz',        region: 'Steiermark',       lat: 47.0707, lng: 15.4395 },
  { name: 'Linz',        region: 'Oberösterreich',   lat: 48.3064, lng: 14.2858 },
  { name: 'Salzburg',    region: 'Salzburg',         lat: 47.8095, lng: 13.0550 },
  { name: 'Innsbruck',   region: 'Tirol',            lat: 47.2692, lng: 11.4041 },
  { name: 'Klagenfurt',  region: 'Kärnten',          lat: 46.6228, lng: 14.3058 },
  { name: 'Villach',     region: 'Kärnten',          lat: 46.6111, lng: 13.8558 },
  { name: 'Wels',        region: 'Oberösterreich',   lat: 48.1575, lng: 14.0286 },
  { name: 'St. Pölten',  region: 'Niederösterreich', lat: 48.2044, lng: 15.6256 },
];

// ─── Franța ────────────────────────────────────────────────────────────────
export const CITIES_FR: City[] = [
  { name: 'Paris',         region: 'Île-de-France',    lat: 48.8566, lng:  2.3522 },
  { name: 'Marseille',     region: 'Provence-PACA',    lat: 43.2965, lng:  5.3698 },
  { name: 'Lyon',          region: 'Auvergne-Rhône',   lat: 45.7640, lng:  4.8357 },
  { name: 'Toulouse',      region: 'Occitanie',        lat: 43.6047, lng:  1.4442 },
  { name: 'Nice',          region: 'PACA',             lat: 43.7102, lng:  7.2620 },
  { name: 'Nantes',        region: 'Pays de la Loire', lat: 47.2184, lng: -1.5536 },
  { name: 'Montpellier',   region: 'Occitanie',        lat: 43.6119, lng:  3.8772 },
  { name: 'Strasbourg',    region: 'Grand Est',        lat: 48.5734, lng:  7.7521 },
  { name: 'Bordeaux',      region: 'Nouvelle-Aquitaine',lat:44.8378, lng: -0.5792 },
  { name: 'Lille',         region: 'Hauts-de-France',  lat: 50.6292, lng:  3.0573 },
  { name: 'Rennes',        region: 'Bretagne',         lat: 48.1173, lng: -1.6778 },
  { name: 'Reims',         region: 'Grand Est',        lat: 49.2583, lng:  4.0317 },
  { name: 'Le Havre',      region: 'Normandie',        lat: 49.4938, lng:  0.1077 },
  { name: 'Grenoble',      region: 'Auvergne-Rhône',   lat: 45.1885, lng:  5.7245 },
  { name: 'Dijon',         region: 'Bourgogne',        lat: 47.3220, lng:  5.0415 },
];

// ─── Italia ────────────────────────────────────────────────────────────────
export const CITIES_IT: City[] = [
  { name: 'Roma',          region: 'Lazio',            lat: 41.9028, lng: 12.4964 },
  { name: 'Milano',        region: 'Lombardia',        lat: 45.4642, lng:  9.1900 },
  { name: 'Napoli',        region: 'Campania',         lat: 40.8518, lng: 14.2681 },
  { name: 'Torino',        region: 'Piemonte',         lat: 45.0703, lng:  7.6869 },
  { name: 'Palermo',       region: 'Sicilia',          lat: 38.1157, lng: 13.3615 },
  { name: 'Genova',        region: 'Liguria',          lat: 44.4056, lng:  8.9463 },
  { name: 'Bologna',       region: 'Emilia-Romagna',   lat: 44.4949, lng: 11.3426 },
  { name: 'Firenze',       region: 'Toscana',          lat: 43.7696, lng: 11.2558 },
  { name: 'Bari',          region: 'Puglia',           lat: 41.1171, lng: 16.8719 },
  { name: 'Catania',       region: 'Sicilia',          lat: 37.5079, lng: 15.0830 },
  { name: 'Venezia',       region: 'Veneto',           lat: 45.4408, lng: 12.3155 },
  { name: 'Verona',        region: 'Veneto',           lat: 45.4384, lng: 10.9916 },
  { name: 'Messina',       region: 'Sicilia',          lat: 38.1938, lng: 15.5540 },
  { name: 'Padova',        region: 'Veneto',           lat: 45.4064, lng: 11.8768 },
  { name: 'Trieste',       region: 'Friuli-VG',        lat: 45.6495, lng: 13.7768 },
];

// ─── Spania ────────────────────────────────────────────────────────────────
export const CITIES_ES: City[] = [
  { name: 'Madrid',        region: 'Madrid',           lat: 40.4168, lng: -3.7038 },
  { name: 'Barcelona',     region: 'Cataluña',         lat: 41.3851, lng:  2.1734 },
  { name: 'Valencia',      region: 'Valencia',         lat: 39.4699, lng: -0.3763 },
  { name: 'Sevilla',       region: 'Andalucía',        lat: 37.3891, lng: -5.9845 },
  { name: 'Zaragoza',      region: 'Aragón',           lat: 41.6488, lng: -0.8891 },
  { name: 'Málaga',        region: 'Andalucía',        lat: 36.7213, lng: -4.4214 },
  { name: 'Murcia',        region: 'Murcia',           lat: 37.9922, lng: -1.1307 },
  { name: 'Palma',         region: 'Baleares',         lat: 39.5696, lng:  2.6502 },
  { name: 'Las Palmas',    region: 'Canarias',         lat: 28.1235, lng: -15.4366},
  { name: 'Bilbao',        region: 'País Vasco',       lat: 43.2630, lng: -2.9350 },
  { name: 'Alicante',      region: 'Valencia',         lat: 38.3452, lng: -0.4810 },
  { name: 'Córdoba',       region: 'Andalucía',        lat: 37.8882, lng: -4.7794 },
  { name: 'Valladolid',    region: 'Castilla y León',  lat: 41.6523, lng: -4.7245 },
  { name: 'Vigo',          region: 'Galicia',          lat: 42.2314, lng: -8.7124 },
];

// ─── Ungaria ───────────────────────────────────────────────────────────────
export const CITIES_HU: City[] = [
  { name: 'Budapest',      region: 'Pest',             lat: 47.4979, lng: 19.0402 },
  { name: 'Debrecen',      region: 'Hajdú-Bihar',      lat: 47.5316, lng: 21.6273 },
  { name: 'Miskolc',       region: 'Borsod-AB-Z',      lat: 48.1035, lng: 20.7784 },
  { name: 'Szeged',        region: 'Csongrád-Csanád',  lat: 46.2530, lng: 20.1414 },
  { name: 'Pécs',          region: 'Baranya',          lat: 46.0727, lng: 18.2328 },
  { name: 'Győr',          region: 'Győr-Moson-Sopron',lat: 47.6875, lng: 17.6504 },
  { name: 'Nyíregyháza',   region: 'Szabolcs-Szatmár', lat: 47.9551, lng: 21.7167 },
  { name: 'Kecskemét',     region: 'Bács-Kiskun',      lat: 46.9066, lng: 19.6909 },
  { name: 'Székesfehérvár',region: 'Fejér',            lat: 47.1885, lng: 18.4229 },
  { name: 'Szombathely',   region: 'Vas',              lat: 47.2307, lng: 16.6218 },
  { name: 'Szolnok',       region: 'Jász-NK-Szolnok',  lat: 47.1783, lng: 20.1894 },
  { name: 'Érd',           region: 'Pest',             lat: 47.3928, lng: 18.9139 },
];

// ─── Elveția ───────────────────────────────────────────────────────────────
export const CITIES_CH: City[] = [
  { name: 'Zürich',        region: 'Zürich',           lat: 47.3769, lng:  8.5417 },
  { name: 'Genève',        region: 'Genève',           lat: 46.2044, lng:  6.1432 },
  { name: 'Basel',         region: 'Basel-Stadt',      lat: 47.5596, lng:  7.5886 },
  { name: 'Bern',          region: 'Bern',             lat: 46.9480, lng:  7.4474 },
  { name: 'Lausanne',      region: 'Vaud',             lat: 46.5197, lng:  6.6323 },
  { name: 'Winterthur',    region: 'Zürich',           lat: 47.4988, lng:  8.7242 },
  { name: 'Luzern',        region: 'Luzern',           lat: 47.0502, lng:  8.3093 },
  { name: 'St. Gallen',    region: 'St. Gallen',       lat: 47.4245, lng:  9.3767 },
];

// ─── Belgia ────────────────────────────────────────────────────────────────
export const CITIES_BE: City[] = [
  { name: 'Bruxelles',     region: 'Bruxelles',        lat: 50.8503, lng:  4.3517 },
  { name: 'Antwerpen',     region: 'Antwerpen',        lat: 51.2213, lng:  4.4051 },
  { name: 'Gent',          region: 'Oost-Vlaanderen',  lat: 51.0543, lng:  3.7174 },
  { name: 'Charleroi',     region: 'Hainaut',          lat: 50.4108, lng:  4.4446 },
  { name: 'Liège',         region: 'Liège',            lat: 50.6326, lng:  5.5797 },
  { name: 'Brugge',        region: 'West-Vlaanderen',  lat: 51.2093, lng:  3.2247 },
  { name: 'Namur',         region: 'Namur',            lat: 50.4669, lng:  4.8675 },
];

// ─── Moldova ───────────────────────────────────────────────────────────────
export const CITIES_MD: City[] = [
  { name: 'Chișinău',      region: 'Chișinău',         lat: 47.0105, lng: 28.8638 },
  { name: 'Bălți',         region: 'Bălți',            lat: 47.7617, lng: 27.9289 },
  { name: 'Orhei',         region: 'Orhei',            lat: 47.3795, lng: 28.8231 },
  { name: 'Ungheni',       region: 'Ungheni',          lat: 47.2108, lng: 27.8003 },
  { name: 'Soroca',        region: 'Soroca',           lat: 48.1572, lng: 28.3019 },
  { name: 'Cahul',         region: 'Cahul',            lat: 45.9083, lng: 28.2000 },
  { name: 'Tiraspol',      region: 'Transnistria',     lat: 46.8403, lng: 29.6433 },
];

// ─── Luxemburg ─────────────────────────────────────────────────────────────
export const CITIES_LU: City[] = [
  { name: 'Luxembourg',    region: 'Luxembourg',       lat: 49.6116, lng:  6.1319 },
  { name: 'Esch-sur-Alzette', region: 'Esch',         lat: 49.4956, lng:  5.9806 },
  { name: 'Differdange',   region: 'Differdange',      lat: 49.5231, lng:  5.8896 },
];

// ─── Monaco ────────────────────────────────────────────────────────────────
export const CITIES_MC: City[] = [
  { name: 'Monaco',        region: 'Monaco',           lat: 43.7384, lng:  7.4246 },
];

// ─── Portugalia ────────────────────────────────────────────────────────────
export const CITIES_PT: City[] = [
  { name: 'Lisboa',         region: 'Lisboa',           lat: 38.7169, lng: -9.1395 },
  { name: 'Porto',          region: 'Porto',            lat: 41.1579, lng: -8.6291 },
  { name: 'Braga',          region: 'Braga',            lat: 41.5454, lng: -8.4265 },
  { name: 'Coimbra',        region: 'Coimbra',          lat: 40.2033, lng: -8.4103 },
  { name: 'Setúbal',        region: 'Setúbal',          lat: 38.5243, lng: -8.8926 },
  { name: 'Faro',           region: 'Faro',             lat: 37.0194, lng: -7.9304 },
  { name: 'Funchal',        region: 'Madeira',          lat: 32.6669, lng: -16.9241 },
  { name: 'Aveiro',         region: 'Aveiro',           lat: 40.6405, lng: -8.6538 },
  { name: 'Évora',          region: 'Évora',            lat: 38.5711, lng: -7.9086 },
  { name: 'Viseu',          region: 'Viseu',            lat: 40.6566, lng: -7.9122 },
  { name: 'Leiria',         region: 'Leiria',           lat: 39.7436, lng: -8.8071 },
  { name: 'Guimarães',      region: 'Braga',            lat: 41.4425, lng: -8.2942 },
];

// ─── Brazilia ──────────────────────────────────────────────────────────────
export const CITIES_BR: City[] = [
  { name: 'São Paulo',      region: 'São Paulo',        lat: -23.5505, lng: -46.6333 },
  { name: 'Rio de Janeiro', region: 'Rio de Janeiro',   lat: -22.9068, lng: -43.1729 },
  { name: 'Brasília',       region: 'Distrito Federal', lat: -15.7801, lng: -47.9292 },
  { name: 'Salvador',       region: 'Bahia',            lat: -12.9714, lng: -38.5014 },
  { name: 'Fortaleza',      region: 'Ceará',            lat: -3.7172,  lng: -38.5433 },
  { name: 'Belo Horizonte', region: 'Minas Gerais',     lat: -19.9191, lng: -43.9386 },
  { name: 'Manaus',         region: 'Amazonas',         lat: -3.1190,  lng: -60.0217 },
  { name: 'Curitiba',       region: 'Paraná',           lat: -25.4290, lng: -49.2671 },
  { name: 'Recife',         region: 'Pernambuco',       lat: -8.0476,  lng: -34.8770 },
  { name: 'Porto Alegre',   region: 'Rio Grande do Sul',lat: -30.0346, lng: -51.2177 },
  { name: 'Belém',          region: 'Pará',             lat: -1.4558,  lng: -48.5044 },
  { name: 'Goiânia',        region: 'Goiás',            lat: -16.6869, lng: -49.2648 },
];

// ─── Olanda ────────────────────────────────────────────────────────────────
export const CITIES_NL: City[] = [
  { name: 'Amsterdam',      region: 'Noord-Holland',    lat: 52.3676, lng:  4.9041 },
  { name: 'Rotterdam',      region: 'Zuid-Holland',     lat: 51.9244, lng:  4.4777 },
  { name: 'Den Haag',       region: 'Zuid-Holland',     lat: 52.0705, lng:  4.3007 },
  { name: 'Utrecht',        region: 'Utrecht',          lat: 52.0907, lng:  5.1214 },
  { name: 'Eindhoven',      region: 'Noord-Brabant',    lat: 51.4416, lng:  5.4697 },
  { name: 'Tilburg',        region: 'Noord-Brabant',    lat: 51.5555, lng:  5.0913 },
  { name: 'Groningen',      region: 'Groningen',        lat: 53.2194, lng:  6.5665 },
  { name: 'Almere',         region: 'Flevoland',        lat: 52.3508, lng:  5.2647 },
  { name: 'Breda',          region: 'Noord-Brabant',    lat: 51.5719, lng:  4.7683 },
  { name: 'Nijmegen',       region: 'Gelderland',       lat: 51.8126, lng:  5.8372 },
  { name: 'Enschede',       region: 'Overijssel',       lat: 52.2215, lng:  6.8937 },
  { name: 'Haarlem',        region: 'Noord-Holland',    lat: 52.3874, lng:  4.6462 },
  { name: 'Arnhem',         region: 'Gelderland',       lat: 51.9851, lng:  5.8987 },
  { name: 'Maastricht',     region: 'Limburg',          lat: 50.8514, lng:  5.6910 },
];

// ─── Regatul Unit ──────────────────────────────────────────────────────────
export const CITIES_GB: City[] = [
  { name: 'London',        region: 'England',          lat: 51.5074, lng: -0.1278 },
  { name: 'Birmingham',    region: 'England',          lat: 52.4862, lng: -1.8904 },
  { name: 'Manchester',    region: 'England',          lat: 53.4808, lng: -2.2426 },
  { name: 'Leeds',         region: 'England',          lat: 53.8008, lng: -1.5491 },
  { name: 'Glasgow',       region: 'Scotland',         lat: 55.8642, lng: -4.2518 },
  { name: 'Sheffield',     region: 'England',          lat: 53.3811, lng: -1.4701 },
  { name: 'Edinburgh',     region: 'Scotland',         lat: 55.9533, lng: -3.1883 },
  { name: 'Liverpool',     region: 'England',          lat: 53.4084, lng: -2.9916 },
  { name: 'Bristol',       region: 'England',          lat: 51.4545, lng: -2.5879 },
  { name: 'Cardiff',       region: 'Wales',            lat: 51.4816, lng: -3.1791 },
  { name: 'Leicester',     region: 'England',          lat: 52.6369, lng: -1.1398 },
  { name: 'Belfast',       region: 'Northern Ireland', lat: 54.5973, lng: -5.9301 },
  { name: 'Nottingham',    region: 'England',          lat: 52.9548, lng: -1.1581 },
  { name: 'Newcastle',     region: 'England',          lat: 54.9783, lng: -1.6178 },
  { name: 'Southampton',   region: 'England',          lat: 50.9097, lng: -1.4044 },
  { name: 'Brighton',      region: 'England',          lat: 50.8225, lng: -0.1372 },
  { name: 'Oxford',        region: 'England',          lat: 51.7520, lng: -1.2577 },
  { name: 'Cambridge',     region: 'England',          lat: 52.2053, lng:  0.1218 },
  { name: 'Coventry',      region: 'England',          lat: 52.4068, lng: -1.5197 },
  { name: 'Wolverhampton', region: 'England',          lat: 52.5862, lng: -2.1285 },
];

// ─── SUA ───────────────────────────────────────────────────────────────────
export const CITIES_US: City[] = [
  { name: 'New York',      region: 'New York',         lat: 40.7128, lng: -74.0060 },
  { name: 'Los Angeles',   region: 'California',       lat: 34.0522, lng: -118.2437 },
  { name: 'Chicago',       region: 'Illinois',         lat: 41.8781, lng: -87.6298 },
  { name: 'Houston',       region: 'Texas',            lat: 29.7604, lng: -95.3698 },
  { name: 'Phoenix',       region: 'Arizona',          lat: 33.4484, lng: -112.0740 },
  { name: 'Philadelphia',  region: 'Pennsylvania',     lat: 39.9526, lng: -75.1652 },
  { name: 'San Antonio',   region: 'Texas',            lat: 29.4241, lng: -98.4936 },
  { name: 'San Diego',     region: 'California',       lat: 32.7157, lng: -117.1611 },
  { name: 'Dallas',        region: 'Texas',            lat: 32.7767, lng: -96.7970 },
  { name: 'San Francisco', region: 'California',       lat: 37.7749, lng: -122.4194 },
  { name: 'Seattle',       region: 'Washington',       lat: 47.6062, lng: -122.3321 },
  { name: 'Denver',        region: 'Colorado',         lat: 39.7392, lng: -104.9903 },
  { name: 'Boston',        region: 'Massachusetts',    lat: 42.3601, lng: -71.0589 },
  { name: 'Miami',         region: 'Florida',          lat: 25.7617, lng: -80.1918 },
  { name: 'Atlanta',       region: 'Georgia',          lat: 33.7490, lng: -84.3880 },
  { name: 'Minneapolis',   region: 'Minnesota',        lat: 44.9778, lng: -93.2650 },
  { name: 'Portland',      region: 'Oregon',           lat: 45.5231, lng: -122.6765 },
  { name: 'Las Vegas',     region: 'Nevada',           lat: 36.1699, lng: -115.1398 },
  { name: 'Austin',        region: 'Texas',            lat: 30.2672, lng: -97.7431 },
  { name: 'Nashville',     region: 'Tennessee',        lat: 36.1627, lng: -86.7816 },
];

// ─── Canada ────────────────────────────────────────────────────────────────
export const CITIES_CA: City[] = [
  { name: 'Toronto',       region: 'Ontario',          lat: 43.6532, lng: -79.3832 },
  { name: 'Montreal',      region: 'Quebec',           lat: 45.5017, lng: -73.5673 },
  { name: 'Vancouver',     region: 'British Columbia', lat: 49.2827, lng: -123.1207 },
  { name: 'Calgary',       region: 'Alberta',          lat: 51.0447, lng: -114.0719 },
  { name: 'Edmonton',      region: 'Alberta',          lat: 53.5461, lng: -113.4938 },
  { name: 'Ottawa',        region: 'Ontario',          lat: 45.4215, lng: -75.6972 },
  { name: 'Winnipeg',      region: 'Manitoba',         lat: 49.8951, lng: -97.1384 },
  { name: 'Quebec City',   region: 'Quebec',           lat: 46.8139, lng: -71.2080 },
  { name: 'Hamilton',      region: 'Ontario',          lat: 43.2557, lng: -79.8711 },
  { name: 'Kitchener',     region: 'Ontario',          lat: 43.4516, lng: -80.4925 },
  { name: 'Victoria',      region: 'British Columbia', lat: 48.4284, lng: -123.3656 },
  { name: 'Halifax',       region: 'Nova Scotia',      lat: 44.6488, lng: -63.5752 },
  { name: 'Saskatoon',     region: 'Saskatchewan',     lat: 52.1332, lng: -106.6700 },
  { name: 'Regina',        region: 'Saskatchewan',     lat: 50.4452, lng: -104.6189 },
];

// ─── Australia ─────────────────────────────────────────────────────────────
export const CITIES_AU: City[] = [
  { name: 'Sydney',        region: 'New South Wales',  lat: -33.8688, lng: 151.2093 },
  { name: 'Melbourne',     region: 'Victoria',         lat: -37.8136, lng: 144.9631 },
  { name: 'Brisbane',      region: 'Queensland',       lat: -27.4698, lng: 153.0251 },
  { name: 'Perth',         region: 'Western Australia',lat: -31.9505, lng: 115.8605 },
  { name: 'Adelaide',      region: 'South Australia',  lat: -34.9285, lng: 138.6007 },
  { name: 'Gold Coast',    region: 'Queensland',       lat: -28.0167, lng: 153.4000 },
  { name: 'Newcastle',     region: 'New South Wales',  lat: -32.9283, lng: 151.7817 },
  { name: 'Canberra',      region: 'ACT',              lat: -35.2809, lng: 149.1300 },
  { name: 'Wollongong',    region: 'New South Wales',  lat: -34.4278, lng: 150.8931 },
  { name: 'Hobart',        region: 'Tasmania',         lat: -42.8821, lng: 147.3272 },
  { name: 'Geelong',       region: 'Victoria',         lat: -38.1499, lng: 144.3617 },
  { name: 'Darwin',        region: 'Northern Territory',lat: -12.4634, lng: 130.8456 },
];

// ─── Noua Zeelandă ─────────────────────────────────────────────────────────
export const CITIES_NZ: City[] = [
  { name: 'Auckland',       region: 'Auckland',         lat: -36.8485, lng: 174.7633 },
  { name: 'Wellington',     region: 'Wellington',       lat: -41.2865, lng: 174.7762 },
  { name: 'Christchurch',   region: 'Canterbury',       lat: -43.5321, lng: 172.6362 },
  { name: 'Hamilton',       region: 'Waikato',          lat: -37.7870, lng: 175.2793 },
  { name: 'Tauranga',       region: 'Bay of Plenty',    lat: -37.6878, lng: 176.1651 },
  { name: 'Dunedin',        region: 'Otago',            lat: -45.8788, lng: 170.5028 },
  { name: 'Palmerston North',region: 'Manawatu',        lat: -40.3523, lng: 175.6082 },
  { name: 'Nelson',         region: 'Nelson',           lat: -41.2706, lng: 173.2840 },
  { name: 'Rotorua',        region: 'Bay of Plenty',    lat: -38.1368, lng: 176.2497 },
  { name: 'Napier',         region: "Hawke's Bay",      lat: -39.4928, lng: 176.9120 },
];

// ─── Irlanda ───────────────────────────────────────────────────────────────
export const CITIES_IE: City[] = [
  { name: 'Dublin',         region: 'Leinster',         lat: 53.3498, lng: -6.2603 },
  { name: 'Cork',           region: 'Munster',          lat: 51.8985, lng: -8.4756 },
  { name: 'Limerick',       region: 'Munster',          lat: 52.6638, lng: -8.6267 },
  { name: 'Galway',         region: 'Connacht',         lat: 53.2707, lng: -9.0568 },
  { name: 'Waterford',      region: 'Munster',          lat: 52.2593, lng: -7.1101 },
  { name: 'Drogheda',       region: 'Leinster',         lat: 53.7179, lng: -6.3561 },
  { name: 'Dundalk',        region: 'Leinster',         lat: 54.0004, lng: -6.4003 },
  { name: 'Swords',         region: 'Leinster',         lat: 53.4597, lng: -6.2181 },
  { name: 'Kilkenny',       region: 'Leinster',         lat: 52.6541, lng: -7.2448 },
  { name: 'Sligo',          region: 'Connacht',         lat: 54.2697, lng: -8.4694 },
];

// ─── Mexic ─────────────────────────────────────────────────────────────────
export const CITIES_MX: City[] = [
  { name: 'Ciudad de México', region: 'CDMX',           lat: 19.4326, lng: -99.1332 },
  { name: 'Guadalajara',    region: 'Jalisco',           lat: 20.6597, lng: -103.3496 },
  { name: 'Monterrey',      region: 'Nuevo León',        lat: 25.6866, lng: -100.3161 },
  { name: 'Puebla',         region: 'Puebla',            lat: 19.0414, lng: -98.2063 },
  { name: 'Tijuana',        region: 'Baja California',   lat: 32.5149, lng: -117.0382 },
  { name: 'León',           region: 'Guanajuato',        lat: 21.1236, lng: -101.6860 },
  { name: 'Mérida',         region: 'Yucatán',           lat: 20.9674, lng: -89.5926 },
  { name: 'Querétaro',      region: 'Querétaro',         lat: 20.5888, lng: -100.3899 },
  { name: 'Chihuahua',      region: 'Chihuahua',         lat: 28.6353, lng: -106.0889 },
  { name: 'San Luis Potosí',region: 'San Luis Potosí',   lat: 22.1565, lng: -100.9855 },
  { name: 'Acapulco',       region: 'Guerrero',          lat: 16.8531, lng: -99.8237 },
  { name: 'Hermosillo',     region: 'Sonora',            lat: 29.0729, lng: -110.9559 },
];

// ─── Argentina ─────────────────────────────────────────────────────────────
export const CITIES_AR: City[] = [
  { name: 'Buenos Aires',   region: 'Buenos Aires',     lat: -34.6037, lng: -58.3816 },
  { name: 'Córdoba',        region: 'Córdoba',          lat: -31.4201, lng: -64.1888 },
  { name: 'Rosario',        region: 'Santa Fe',         lat: -32.9442, lng: -60.6505 },
  { name: 'Mendoza',        region: 'Mendoza',          lat: -32.8908, lng: -68.8272 },
  { name: 'Tucumán',        region: 'Tucumán',          lat: -26.8241, lng: -65.2226 },
  { name: 'La Plata',       region: 'Buenos Aires',     lat: -34.9215, lng: -57.9545 },
  { name: 'Mar del Plata',  region: 'Buenos Aires',     lat: -38.0023, lng: -57.5575 },
  { name: 'Salta',          region: 'Salta',            lat: -24.7859, lng: -65.4116 },
  { name: 'Santa Fe',       region: 'Santa Fe',         lat: -31.6333, lng: -60.7000 },
  { name: 'San Juan',       region: 'San Juan',         lat: -31.5375, lng: -68.5364 },
];

// ─── Colombia ──────────────────────────────────────────────────────────────
export const CITIES_CO: City[] = [
  { name: 'Bogotá',         region: 'Cundinamarca',     lat:  4.7110, lng: -74.0721 },
  { name: 'Medellín',       region: 'Antioquia',        lat:  6.2518, lng: -75.5636 },
  { name: 'Cali',           region: 'Valle del Cauca',  lat:  3.4516, lng: -76.5320 },
  { name: 'Barranquilla',   region: 'Atlántico',        lat: 10.9685, lng: -74.7813 },
  { name: 'Cartagena',      region: 'Bolívar',          lat: 10.3997, lng: -75.5144 },
  { name: 'Cúcuta',         region: 'Norte de Santander',lat: 7.8939, lng: -72.5078 },
  { name: 'Bucaramanga',    region: 'Santander',        lat:  7.1193, lng: -73.1227 },
  { name: 'Pereira',        region: 'Risaralda',        lat:  4.8087, lng: -75.6906 },
  { name: 'Santa Marta',    region: 'Magdalena',        lat: 11.2408, lng: -74.2110 },
  { name: 'Ibagué',         region: 'Tolima',           lat:  4.4389, lng: -75.2322 },
];

// ─── Chile ─────────────────────────────────────────────────────────────────
export const CITIES_CL: City[] = [
  { name: 'Santiago',       region: 'Región Metropolitana', lat: -33.4489, lng: -70.6693 },
  { name: 'Valparaíso',     region: 'Valparaíso',       lat: -33.0472, lng: -71.6127 },
  { name: 'Concepción',     region: 'Biobío',           lat: -36.8201, lng: -73.0444 },
  { name: 'Antofagasta',    region: 'Antofagasta',      lat: -23.6509, lng: -70.3975 },
  { name: 'Viña del Mar',   region: 'Valparaíso',       lat: -33.0153, lng: -71.5500 },
  { name: 'Temuco',         region: 'La Araucanía',     lat: -38.7359, lng: -72.5904 },
  { name: 'Rancagua',       region: "O'Higgins",        lat: -34.1703, lng: -70.7444 },
  { name: 'Talca',          region: 'Maule',            lat: -35.4264, lng: -71.6554 },
  { name: 'Arica',          region: 'Arica y Parinacota', lat: -18.4783, lng: -70.3126 },
  { name: 'Puerto Montt',   region: 'Los Lagos',        lat: -41.4693, lng: -72.9424 },
];

// ─── Mapping cod țară → lista de orașe ─────────────────────────────────────
export const CITIES_BY_COUNTRY: Record<string, City[]> = {
  RO: CITIES_RO,
  DE: CITIES_DE,
  AT: CITIES_AT,
  FR: CITIES_FR,
  IT: CITIES_IT,
  ES: CITIES_ES,
  HU: CITIES_HU,
  CH: CITIES_CH,
  BE: CITIES_BE,
  MD: CITIES_MD,
  LU: CITIES_LU,
  MC: CITIES_MC,
  // EN — engleză
  GB: CITIES_GB,
  US: CITIES_US,
  CA: CITIES_CA,
  AU: CITIES_AU,
  NZ: CITIES_NZ,
  IE: CITIES_IE,
  // ES — spaniolă (țări suplimentare)
  MX: CITIES_MX,
  AR: CITIES_AR,
  CO: CITIES_CO,
  CL: CITIES_CL,
  // PT — portugheză
  PT: CITIES_PT,
  // BR: CITIES_BR, // SCOS TEMPORAR (v15) — Google Play Brazil cere Merchant Verification (CNPJ/CPF). Re-adăugăm când facem setup.
  // NL — olandeză
  NL: CITIES_NL,
  // RU SCOS (2026-06-10) — Rusia nu e piață suportată (sancțiuni + plăți suspendate);
  // limba rusă rămâne pt diaspora UE.
};

// Țările cu suport complet (traduceri UI + orașe). Se extinde automat la fiecare sesiune de i18n.
export const SUPPORTED_COUNTRY_CODES: string[] = Object.keys(CITIES_BY_COUNTRY);

export function getCitiesForCountry(countryCode: string): City[] {
  return CITIES_BY_COUNTRY[countryCode?.toUpperCase()] ?? [];
}
