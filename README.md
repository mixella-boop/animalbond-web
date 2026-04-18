# AnimalBond Web — Site oficial

Site-ul web al aplicației AnimalBond, construit cu Next.js 14, Tailwind CSS și Supabase.

---

## Cerințe

- Node.js 18+ instalat pe calculator
- Cont Vercel (gratuit) — vercel.com
- Același proiect Supabase ca aplicația mobilă

---

## Configurare locală (pentru testare pe calculator)

### 1. Instalează dependențele

Deschide un terminal (Command Prompt sau PowerShell) în folderul `animalbond-web` și rulează:

```bash
npm install
```

### 2. Configurează variabilele de environment

Copiază fișierul `.env.local.example` și redenumește-l în `.env.local`:

```bash
copy .env.local.example .env.local
```

Apoi deschide `.env.local` în Notepad și completează:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

**Unde găsești aceste valori:**
1. Mergi la [supabase.com](https://supabase.com) și deschide proiectul tău
2. Click pe **Settings** (roată dințată) în bara din stânga
3. Click pe **API**
4. Copiază **Project URL** → pune la `NEXT_PUBLIC_SUPABASE_URL`
5. Copiază **anon public** key → pune la `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Pornește serverul local

```bash
npm run dev
```

Deschide browserul la: **http://localhost:3000**

---

## Deploy pe Vercel (recomandat)

### Pasul 1 — Creare cont Vercel

Mergi la [vercel.com](https://vercel.com) și înregistrează-te cu contul GitHub.

### Pasul 2 — Importă proiectul

1. Click pe **"Add New Project"**
2. Selectează **"Import Git Repository"**
3. Dacă nu ai proiectul pe GitHub încă, mai întâi:
   - Mergi la [github.com](https://github.com) și creează un repository nou (ex: `animalbond-web`)
   - Încarcă fișierele din acest folder în repository
4. Selectează repository-ul `animalbond-web`

### Pasul 3 — Configurează variabilele de environment

În pagina de configurare Vercel, înainte de deploy:

1. Derulează în jos la **"Environment Variables"**
2. Adaugă fiecare variabilă:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL-ul Supabase al tău |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cheia anon Supabase |

### Pasul 4 — Deploy!

Click pe **"Deploy"** și așteaptă 1-2 minute.

Vercel îți va oferi un URL de forma: `https://animalbond-web.vercel.app`

### Pasul 5 — Domeniu personalizat (opțional)

1. În dashboard Vercel, mergi la proiectul tău
2. Click pe **"Domains"**
3. Adaugă domeniul tău (ex: `animalbond.ro`)
4. Urmează instrucțiunile pentru configurarea DNS la registrarul tău de domeniu

---

## Structura proiectului

```
animalbond-web/
├── app/
│   ├── layout.tsx          # Layout global (Navbar + Footer)
│   ├── page.tsx            # Landing page
│   ├── adoptii/
│   │   └── page.tsx        # Lista animale cu filtre
│   ├── animal/[id]/
│   │   ├── page.tsx        # Pagina unui animal (SEO)
│   │   └── AnimalGallery.tsx # Galerie poze interactivă
│   ├── parteneri/
│   │   └── page.tsx        # Lista parteneri
│   ├── partner-apply/
│   │   └── page.tsx        # Formular parteneriat
│   ├── despre/
│   │   └── page.tsx        # Pagina despre
│   └── sitemap.ts          # Sitemap automat
├── components/
│   ├── Navbar.tsx          # Navigare
│   ├── Footer.tsx          # Footer
│   └── AnimalCard.tsx      # Card animal reutilizabil
├── lib/
│   └── supabase.ts         # Client Supabase + tipuri
├── public/
│   └── robots.txt          # SEO robots
├── tailwind.config.ts      # Culori AnimalBond custom
├── next.config.ts          # Config Next.js (imagini Supabase)
└── .env.local              # Variabile locale (nu se publică!)
```

---

## Tabel Supabase necesar: `partner_applications`

Dacă nu există deja, creează tabelul în Supabase SQL Editor:

```sql
CREATE TABLE partner_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT,
  description TEXT,
  gdpr_consent BOOLEAN NOT NULL DEFAULT false,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Permite insert fără autentificare (pentru formular public)
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON partner_applications
  FOR INSERT WITH CHECK (true);
```

---

## Actualizare site

Când faci modificări la cod:
1. Publică modificările pe GitHub
2. Vercel detectează automat și face redeploy în 1-2 minute

---

## Suport

Pentru probleme tehnice: contact@animalbond.ro
