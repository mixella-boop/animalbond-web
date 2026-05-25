'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

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
              {t('footer_tagline')}
            </p>
          </div>

          {/* Linkuri */}
          <div>
            <h3 className="font-semibold text-text-main mb-3">{t('footer_nav_title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/adoptii" className="text-text-muted hover:text-primary transition-colors text-sm">
                  {t('footer_nav_animals')}
                </Link>
              </li>
              <li>
                <Link href="/parteneri" className="text-text-muted hover:text-primary transition-colors text-sm">
                  {t('footer_nav_partners')}
                </Link>
              </li>
              <li>
                <Link href="/partner-apply" className="text-text-muted hover:text-primary transition-colors text-sm">
                  {t('footer_nav_become_partner')}
                </Link>
              </li>
              <li>
                <Link href="/despre" className="text-text-muted hover:text-primary transition-colors text-sm">
                  {t('footer_nav_about')}
                </Link>
              </li>
              <li>
                <Link href="/manual" className="text-text-muted hover:text-primary transition-colors text-sm">
                  {t('footer_nav_manual')}
                </Link>
              </li>
              {/* pricing hidden */}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-semibold text-text-main mb-3">{t('footer_legal_title')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/termeni" className="text-text-muted hover:text-primary transition-colors text-sm">
                  {t('footer_legal_terms')}
                </Link>
              </li>
              <li>
                <Link href="/confidentialitate" className="text-text-muted hover:text-primary transition-colors text-sm">
                  {t('footer_legal_privacy')}
                </Link>
              </li>
              <li>
                <Link href="/siguranta-copii" className="text-text-muted hover:text-primary transition-colors text-sm">
                  {t('footer_legal_child_safety')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-muted hover:text-primary transition-colors text-sm">
                  {t('footer_legal_contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-light mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            {t('footer_copyright')}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-text-muted text-sm">{t('footer_available_on')}</span>
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
