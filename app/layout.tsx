import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/context/LanguageContext'

export const metadata: Metadata = {
  metadataBase: new URL('https://animalbond.ro'),
  title: {
    default: 'AnimalBond — Adopții animale din România',
    template: '%s | AnimalBond',
  },
  description:
    'Găsește animalul perfect pentru tine. AnimalBond conectează animale fără casă cu familii iubitoare din România. Adoptă câini, pisici, iepuri și alte animale.',
  keywords: ['adoptii animale', 'adopta un caine', 'adopta o pisica', 'animale fara stapan', 'romania', 'animalbond'],
  authors: [{ name: 'AnimalBond' }],
  creator: 'AnimalBond',
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: 'https://animalbond.ro',
    siteName: 'AnimalBond',
    title: 'AnimalBond — Adopții animale din România',
    description:
      'Găsește animalul perfect pentru tine. Adoptă câini, pisici și alte animale din adăposturi și de la persoane private.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AnimalBond — Adopții animale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AnimalBond — Adopții animale din România',
    description: 'Găsește animalul perfect pentru tine. Adoptă, nu cumpăra.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
