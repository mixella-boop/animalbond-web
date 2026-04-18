'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-border-light sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <span className="text-2xl">🐾</span>
            <span>AnimalBond</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/adoptii"
              className="text-text-main hover:text-primary transition-colors font-medium"
            >
              Adopții
            </Link>
            <Link
              href="/parteneri"
              className="text-text-main hover:text-primary transition-colors font-medium"
            >
              Parteneri
            </Link>
            <Link
              href="/despre"
              className="text-text-main hover:text-primary transition-colors font-medium"
            >
              Despre
            </Link>
            <a
              href="#download"
              className="bg-primary text-white px-5 py-2 rounded-full font-semibold hover:bg-primary-dark transition-colors text-sm"
            >
              Descarcă app
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-text-main hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Meniu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-border-light flex flex-col gap-4">
            <Link
              href="/adoptii"
              className="text-text-main hover:text-primary transition-colors font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              Adopții
            </Link>
            <Link
              href="/parteneri"
              className="text-text-main hover:text-primary transition-colors font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              Parteneri
            </Link>
            <Link
              href="/despre"
              className="text-text-main hover:text-primary transition-colors font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              Despre
            </Link>
            <a
              href="#download"
              className="bg-primary text-white px-5 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors text-sm text-center"
              onClick={() => setMenuOpen(false)}
            >
              Descarcă app
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
