'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

const PLANS = [
  {
    key: 'gold',
    icon: '⭐',
    color: 'from-yellow-400 to-amber-500',
    border: 'border-yellow-300',
    bg: 'bg-yellow-50',
    badge: null,
    price: null,
    free: true,
    features: [
      'Matching avansat cu animale',
      'Filtre de compatibilitate',
      'Mesagerie directă',
      'Notificări pentru animale noi',
      'Salvare animale favorite',
    ],
    cta: 'Activează Gold gratuit',
    ctaHref: '/',
    ctaStyle: 'bg-amber-400 hover:bg-amber-500 text-white',
  },
  {
    key: 'sale',
    icon: '🏷️',
    color: 'from-primary to-pink-600',
    border: 'border-primary/30',
    bg: 'bg-pink-50',
    badge: 'Popular',
    price: '4,99 €',
    priceNote: 'per anunț · 30 zile',
    free: false,
    features: [
      'Anunț de vânzare activ 30 zile',
      'Afișat în toată Europa',
      'Galerie foto nelimitată',
      'Contact direct cu cumpărători',
      'Certificat / pedigree upload',
    ],
    cta: 'Postează un anunț',
    ctaHref: '/',
    ctaStyle: 'bg-primary hover:bg-primary-dark text-white',
  },
  {
    key: 'partner',
    icon: '🤝',
    color: 'from-violet-500 to-purple-700',
    border: 'border-violet-300',
    bg: 'bg-violet-50',
    badge: 'Business',
    price: '19,99 €',
    priceNote: 'pe lună',
    free: false,
    features: [
      'Listing activ pe site și în app',
      'Profil complet cu poze și GPS',
      'Link direct către site-ul tău',
      'Badge „Partener verificat"',
      'Acces la mii de stăpâni din zonă',
    ],
    cta: 'Devino partener',
    ctaHref: '/partner-apply',
    ctaStyle: 'bg-violet-600 hover:bg-violet-700 text-white',
  },
]

export default function PricingPage() {
  const { lang } = useLanguage()

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="text-5xl mb-4">💳</div>
        <h1 className="text-4xl font-bold text-text-main mb-3">
          Prețuri simple și transparente
        </h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto leading-relaxed">
          Adopția este întotdeauna <strong className="text-primary">gratuită</strong>.
          Plătești doar dacă vinzi sau ești partener comercial.
        </p>
        <div className="mt-3 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm text-green-700 font-medium">
          <span>🌍</span>
          <span>Plată în EUR — acceptăm orice card (RON, HUF, etc. convertite automat)</span>
        </div>
      </div>

      {/* Grid planuri */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {PLANS.map((plan) => (
          <div
            key={plan.key}
            className={`relative rounded-2xl border-2 ${plan.border} ${plan.bg} p-6 flex flex-col`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className={`bg-gradient-to-r ${plan.color} text-white text-xs font-bold px-3 py-1 rounded-full shadow`}>
                  {plan.badge}
                </span>
              </div>
            )}

            <div className="text-4xl mb-3">{plan.icon}</div>
            <h2 className="text-xl font-bold text-text-main mb-1 capitalize">
              {plan.key === 'gold' ? 'Gold' : plan.key === 'sale' ? 'Vânzare' : 'Partener'}
            </h2>

            {/* Preț */}
            <div className="mb-4">
              {plan.free ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-green-600">Gratuit</span>
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-text-main">{plan.price}</span>
                  </div>
                  <p className="text-sm text-text-muted">{plan.priceNote}</p>
                </div>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-2 mb-6 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-text-main">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href={plan.ctaHref}
              className={`w-full text-center py-3 rounded-xl font-bold text-sm transition-colors ${plan.ctaStyle}`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="bg-white rounded-2xl border border-border-light shadow-card p-8">
        <h2 className="text-2xl font-bold text-text-main mb-6 text-center">Întrebări frecvente</h2>
        <div className="space-y-5 max-w-2xl mx-auto">
          {[
            {
              q: 'Pot plăti cu cardul românesc (RON)?',
              a: 'Da! Stripe convertește automat valuta — plătești cu orice card, iar noi primim suma în EUR. Nu ai nevoie de cont în euro.',
            },
            {
              q: 'Cât durează activarea după plată?',
              a: 'Instant — webhook-ul Stripe activează anunțul sau listing-ul de partener în câteva secunde după confirmarea plății.',
            },
            {
              q: 'Ce se întâmplă după 30 de zile (anunț vânzare)?',
              a: 'Anunțul expiră automat și dispare din liste. Poți reposta cu o nouă plată de 4,99 €.',
            },
            {
              q: 'Pot anula abonamentul de partener oricând?',
              a: 'Da, fără penalități. Anulezi din linkul primit pe email sau contactând echipa AnimalBond. Listing-ul rămâne activ până la sfârșitul perioadei plătite.',
            },
            {
              q: 'Adopția este cu adevărat gratuită?',
              a: 'Da, 100%. Postarea unui animal pentru adopție, mesageria, matching-ul — toate sunt gratuite pentru totdeauna.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-b border-border-light pb-4 last:border-0 last:pb-0">
              <p className="font-semibold text-text-main mb-1">{q}</p>
              <p className="text-sm text-text-muted leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-10">
        <p className="text-text-muted mb-4">
          Ai întrebări? Contactează-ne la{' '}
          <a href="mailto:contact@animalbond.club" className="text-primary hover:underline">
            contact@animalbond.club
          </a>
        </p>
        <Link
          href="/partner-apply"
          className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-2.5 rounded-full font-semibold hover:bg-pink-50 transition-colors text-sm"
        >
          🤝 Devino partener AnimalBond
        </Link>
      </div>
    </div>
  )
}
