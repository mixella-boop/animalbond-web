'use client'

import { useLanguage } from '@/context/LanguageContext'
import { TERMS_CONTENT, type Lang } from './content'

export default function TermeniContent() {
  const { lang } = useLanguage()
  const content = TERMS_CONTENT[(lang as Lang)] ?? TERMS_CONTENT.en

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-text-main mb-2">{content.pageTitle}</h1>
      <p className="text-text-muted text-sm mb-10">{content.version}</p>

      <section className="prose prose-sm max-w-none text-text-main space-y-8">
        {content.sections.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-bold mb-3">{section.title}</h2>

            {section.items && (
              <ul className="list-disc list-inside text-text-muted space-y-1.5 leading-relaxed">
                {section.items.map((item, i) => {
                  const parts = item.split(' — ')
                  return (
                    <li key={i}>
                      {parts.length > 1
                        ? <><strong>{parts[0]}</strong> — {parts.slice(1).join(' — ')}</>
                        : item
                      }
                    </li>
                  )
                })}
              </ul>
            )}

            {section.text && (
              <p className="text-text-muted leading-relaxed mt-2">
                {section.text}
              </p>
            )}

            {/* Secțiunea Contact (ultima) */}
            {idx === content.sections.length - 1 && (
              <div className="bg-gray-50 rounded-xl p-4 mt-3 text-text-muted text-sm space-y-1">
                <p><strong>{content.contactBox.operator}</strong></p>
                <p>{content.contactBox.platform}</p>
                <p>
                  {content.contactBox.email}:{' '}
                  <a href="/contact" className="text-primary hover:underline">
                    animalbond.club/contact
                  </a>
                </p>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  )
}
