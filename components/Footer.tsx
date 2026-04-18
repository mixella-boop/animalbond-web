import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-light mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-bold text-xl text-primary mb-3">
              <span className="text-2xl">🐾</span>
              <span>AnimalBond</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Conectăm animale fără casă cu familii iubitoare. Adoptă, nu cumpăra.
            </p>
          </div>

          {/* Linkuri */}
          <div>
            <h3 className="font-semibold text-text-main mb-3">Navigare</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/adoptii" className="text-text-muted hover:text-primary transition-colors text-sm">
                  Animale disponibile
                </Link>
              </li>
              <li>
                <Link href="/parteneri" className="text-text-muted hover:text-primary transition-colors text-sm">
                  Parteneri
                </Link>
              </li>
              <li>
                <Link href="/partner-apply" className="text-text-muted hover:text-primary transition-colors text-sm">
                  Devino partener
                </Link>
              </li>
              <li>
                <Link href="/despre" className="text-text-muted hover:text-primary transition-colors text-sm">
                  Despre noi
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-semibold text-text-main mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/termeni" className="text-text-muted hover:text-primary transition-colors text-sm">
                  Termeni și condiții
                </Link>
              </li>
              <li>
                <Link href="/confidentialitate" className="text-text-muted hover:text-primary transition-colors text-sm">
                  Politica de confidențialitate
                </Link>
              </li>
              <li>
                <Link href="/despre#contact" className="text-text-muted hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-light mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            © 2025 AnimalBond. Toate drepturile rezervate.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-text-muted text-sm">Disponibil pe:</span>
            <a
              href="#"
              className="text-text-muted hover:text-primary transition-colors text-sm font-medium"
            >
              App Store
            </a>
            <a
              href="#"
              className="text-text-muted hover:text-primary transition-colors text-sm font-medium"
            >
              Google Play
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
