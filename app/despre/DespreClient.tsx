'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function DespreClient() {
  const { t } = useLanguage()

  const howSteps = [
    { icon: '📸', titleKey: 'about_post_title', descKey: 'about_post_desc' },
    { icon: '🔍', titleKey: 'about_find_title', descKey: 'about_find_desc' },
    { icon: '💬', titleKey: 'about_chat_title', descKey: 'about_chat_desc' },
    { icon: '🏠', titleKey: 'about_adopted_title', descKey: 'about_adopted_desc' },
  ] as const

  const shelterFeatures = [
    'about_shelter_f1',
    'about_shelter_f2',
    'about_shelter_f3',
    'about_shelter_f4',
    'about_shelter_f5',
  ] as const

  const values = [
    { icon: '❤️', titleKey: 'about_val1_title', descKey: 'about_val1_desc' },
    { icon: '🔒', titleKey: 'about_val2_title', descKey: 'about_val2_desc' },
    { icon: '🤝', titleKey: 'about_val3_title', descKey: 'about_val3_desc' },
    { icon: '🌱', titleKey: 'about_val4_title', descKey: 'about_val4_desc' },
  ] as const

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="text-6xl mb-5">🐾</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-main mb-4">
          {t('about_title')}
        </h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
          {t('about_subtitle')}
        </p>
      </div>

      {/* Misiune */}
      <section className="bg-white rounded-2xl shadow-card border border-border-light p-6 sm:p-8 mb-8">
        <div className="flex items-start gap-4">
          <span className="text-4xl shrink-0">💡</span>
          <div>
            <h2 className="text-2xl font-bold text-text-main mb-3">{t('about_mission_title')}</h2>
            <p className="text-text-muted leading-relaxed mb-4">{t('about_mission_p1')}</p>
            <p className="text-text-muted leading-relaxed">{t('about_mission_p2')}</p>
          </div>
        </div>
      </section>

      {/* Cum functioneaza */}
      <section className="bg-white rounded-2xl shadow-card border border-border-light p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-6">{t('about_how_title')}</h2>
        <div className="space-y-6">
          {howSteps.map((step) => (
            <div key={step.icon} className="flex gap-4">
              <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-primary/10">
                {step.icon}
              </div>
              <div>
                <h3 className="font-bold text-text-main mb-1">{t(step.titleKey)}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{t(step.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pentru adaposturi */}
      <section className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl border border-primary/10 p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-3">{t('about_shelters_title')}</h2>
        <p className="text-text-muted mb-4 leading-relaxed">{t('about_shelters_sub')}</p>
        <ul className="space-y-2 text-text-muted text-sm">
          {shelterFeatures.map((key) => (
            <li key={key} className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              {t(key)}
            </li>
          ))}
        </ul>
      </section>

      {/* Valori */}
      <section className="bg-white rounded-2xl shadow-card border border-border-light p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-4">{t('about_values_title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map((val) => (
            <div key={val.icon} className="bg-gray-50 rounded-xl p-4 border border-border-light">
              <div className="text-2xl mb-2">{val.icon}</div>
              <h3 className="font-bold text-text-main mb-1 text-sm">{t(val.titleKey)}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{t(val.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white rounded-2xl shadow-card border border-border-light p-6 sm:p-8 mb-8">
        <h2 className="text-2xl font-bold text-text-main mb-4">{t('about_contact_title')}</h2>
        <div className="space-y-3 text-text-muted">
          <div className="flex items-center gap-3">
            <span className="text-xl">📧</span>
            <a href="mailto:contact@animalbond.club" className="text-primary hover:underline font-medium">
              contact@animalbond.club
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">📱</span>
            <span>{t('about_app_text')}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl">🤝</span>
            <Link href="/partner-apply" className="text-primary hover:underline font-medium">
              {t('about_partnerships_text')}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <div className="text-center py-8">
        <Link
          href="/adoptii"
          className="bg-primary text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg inline-block"
        >
          {t('about_cta_btn')}
        </Link>
      </div>
    </div>
  )
}
