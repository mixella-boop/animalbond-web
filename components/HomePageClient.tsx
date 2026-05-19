'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import HomeAnimalsSection from '@/components/HomeAnimalsSection'
import type { Partner } from '@/lib/supabase'
import type { Testimonial } from '@/app/povesti/page'

const categoryLabel: Record<string, string> = {
  vet: '🏥',
  food: '🥩',
  accessories: '🎾',
  insurance: '🛡️',
  other: '🤝',
}

type Props = {
  partners: Partner[]
  testimonials: Testimonial[]
  lostFoundBanner: { count: number; photos: string[] }
}

export default function HomePageClient({ partners, testimonials, lostFoundBanner }: Props) {
  const { t } = useLanguage()

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-br from-pink-50 via-background to-red-50 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-6xl mb-6 animate-bounce">🐾</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-main leading-tight mb-6">
            {t('hero_title')}{' '}
            <span className="text-primary">{t('hero_title_accent')}</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/adoptii"
              className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-dark transition-colors shadow-lg hover:shadow-xl"
            >
              {t('hero_cta_animals')}
            </Link>
            <a
              href="#cum-functioneaza"
              className="bg-white text-primary border-2 border-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-50 transition-colors"
            >
              {t('hero_cta_how')}
            </a>
          </div>
        </div>
      </section>

      {/* ===== ULTIMELE ANIMALE ===== */}
      <HomeAnimalsSection />

      {/* ===== BANNER PIERDUTE / GĂSITE ===== */}
      {lostFoundBanner.count > 0 && (
        <section className="py-8 px-4 sm:px-6 bg-gradient-to-r from-red-50 via-orange-50 to-teal-50">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/pierdute-gasite"
              className="flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl shadow-card border border-red-100 p-5 hover:shadow-card-hover transition-all group"
            >
              {/* Poze preview */}
              <div className="flex gap-2 shrink-0">
                {lostFoundBanner.photos.length > 0 ? (
                  lostFoundBanner.photos.map((url, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={url}
                      alt=""
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-red-100"
                    />
                  ))
                ) : (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-red-50 flex items-center justify-center text-2xl border-2 border-red-100">🐾</div>
                )}
              </div>

              {/* Text */}
              <div className="flex-1 text-center sm:text-left">
                <p className="font-bold text-text-main text-base sm:text-lg group-hover:text-primary transition-colors">
                  {t('lf_home_title')}
                </p>
                <p className="text-text-muted text-sm mt-0.5">
                  {t('lf_home_count').replace('{count}', String(lostFoundBanner.count))}
                </p>
              </div>

              {/* CTA */}
              <span className="shrink-0 text-primary font-semibold text-sm group-hover:underline">
                {t('lf_home_btn')}
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* ===== CUM FUNCȚIONEAZĂ ===== */}
      <section id="cum-functioneaza" className="bg-white py-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-text-main">{t('section_how_title')}</h2>
            <p className="text-text-muted mt-2">{t('section_how_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { num: t('step1_num'), icon: '🔍', title: t('step1_title'), desc: t('step1_desc') },
              { num: t('step2_num'), icon: '💬', title: t('step2_title'), desc: t('step2_desc') },
              { num: t('step3_num'), icon: '🏠', title: t('step3_title'), desc: t('step3_desc') },
            ].map((item) => (
              <div key={item.num} className="text-center">
                <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
                  {item.icon}
                </div>
                <div className="text-primary font-bold text-sm mb-1">{item.num}</div>
                <h3 className="text-xl font-bold text-text-main mb-2">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARTENERI ===== */}
      {partners.length > 0 && (
        <section className="py-14 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-main">{t('section_partners_title')}</h2>
                <p className="text-text-muted mt-1">{t('section_partners_subtitle')}</p>
              </div>
              <Link href="/parteneri" className="hidden sm:block text-primary font-semibold hover:underline">
                {t('section_partners_see_all')}
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-card shadow-card p-4 border border-border-light hover:shadow-card-hover transition-all"
                >
                  {partner.logo_url ? (
                    <div className="relative w-full h-16 mb-3">
                      <Image src={partner.logo_url} alt={partner.name} fill className="object-contain" />
                    </div>
                  ) : (
                    <div className="w-full h-16 bg-pink-50 rounded-lg mb-3 flex items-center justify-center text-2xl">
                      {categoryLabel[partner.category] || '🤝'}
                    </div>
                  )}
                  <h3 className="font-semibold text-text-main text-sm truncate">{partner.name}</h3>
                  <p className="text-text-muted text-xs mt-0.5">
                    {partner.city && `📍 ${partner.city}`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA PARTENERI ===== */}
      <section id="download" className="bg-gradient-to-br from-primary to-primary-dark py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="text-5xl mb-4">🏥</div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('cta_partner_title')}</h2>
          <p className="text-white/80 mb-8 text-lg leading-relaxed">{t('cta_partner_subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/partner-apply"
              className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-50 transition-colors shadow-lg"
            >
              {t('cta_partner_btn')}
            </Link>
            <Link
              href="/parteneri"
              className="bg-white/20 text-white border-2 border-white/50 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-colors"
            >
              {t('cta_partner_see')}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALE ===== */}
      {testimonials.length > 0 && (
        <section className="py-14 px-4 sm:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-text-main">{t('section_stories_title')}</h2>
                <p className="text-text-muted mt-1">{t('section_stories_subtitle')}</p>
              </div>
              <Link href="/povesti" className="hidden sm:block text-primary font-semibold hover:underline">
                {t('section_stories_see_all')}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {testimonials.map((item) => (
                <Link href="/povesti" key={item.id} className="group block bg-white rounded-card shadow-card border border-border-light overflow-hidden hover:shadow-card-hover transition-all">
                  {(() => {
                    const ytMatch = item.video_url?.match(/(?:youtube\.com\/watch\?(?:.*&)?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
                    const imgSrc = item.photo_url || item.video_thumbnail_url || (ytMatch ? `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg` : null)
                    return imgSrc ? (
                      <div className="aspect-[4/3] overflow-hidden relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imgSrc} alt={item.animal_name || ''} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                        {item.video_url && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center">
                              <span className="text-lg ml-0.5">▶️</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-gradient-to-br from-pink-50 to-red-50 flex items-center justify-center text-5xl">🐾</div>
                    )
                  })()}
                  <div className="p-4">
                    {item.animal_name && <p className="text-primary font-semibold text-sm mb-1">🐾 {item.animal_name}</p>}
                    <p className="text-text-main text-sm leading-relaxed line-clamp-3">{item.text}</p>
                    <p className="text-text-muted text-xs mt-2">@{item.profiles?.username || 'anonim'}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-6 sm:hidden">
              <Link href="/povesti" className="text-primary font-semibold hover:underline">{t('section_stories_see_all')}</Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== DOWNLOAD APP ===== */}
      <section className="py-14 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 text-center lg:text-left">
              <div className="text-5xl mb-4">📱</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-main mb-4">{t('download_title')}</h2>
              <p className="text-text-muted mb-8 text-lg max-w-xl">{t('download_subtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#" className="flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span>
                    <div className="text-xs opacity-75">{t('download_from')}</div>
                    <div className="text-base leading-tight">{t('download_appstore')}</div>
                  </span>
                </a>
                <a href="#" className="flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.38.21.82.24 1.23.09l12.5-7.21-2.73-2.72-11 10.84zm16.26-9.38L16.76 12l2.68-2.38-11.44-6.6c-.48-.28-1.04-.27-1.5-.04L17.44 14.38zM2.08 1.76C2.03 1.97 2 2.2 2 2.45v19.1c0 .26.03.49.09.7l11.2-11.02-11.21-9.47zm12.01 11.5L12 12l-9.14 8.98L14.09 13.26z" />
                  </svg>
                  <span>
                    <div className="text-xs opacity-75">{t('download_from')}</div>
                    <div className="text-base leading-tight">{t('download_googleplay')}</div>
                  </span>
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="bg-white border-2 border-border-light rounded-2xl p-4 shadow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&color=333333&bgcolor=ffffff&data=https://animalbond2025.vercel.app"
                  alt="QR code"
                  width={160}
                  height={160}
                />
              </div>
              <p className="text-sm text-text-muted text-center max-w-[160px]">{t('download_qr')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
