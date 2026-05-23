'use client'

import { useLanguage } from '@/context/LanguageContext'
import { CHILD_SAFETY_CONTENT, type Lang } from './content'

export default function ChildSafetyContent() {
  const { lang } = useLanguage()
  const content = CHILD_SAFETY_CONTENT[(lang as Lang)] ?? CHILD_SAFETY_CONTENT.en

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-text-main mb-2">{content.pageTitle}</h1>
      <p className="text-text-muted text-sm mb-10">{content.lastUpdate}</p>

      <section className="prose prose-sm max-w-none text-text-main space-y-8">
        {content.sections.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-bold mb-3">{section.title}</h2>

            {section.text && (
              <p className="text-text-muted leading-relaxed mb-2">{section.text}</p>
            )}

            {section.items && (
              <ul className="list-disc list-inside text-text-muted space-y-1.5 leading-relaxed mt-2">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {/* Contact box pe ultima secțiune (Designated Contact) */}
            {idx === 5 && (
              <div className="bg-gray-50 rounded-xl p-4 mt-3 text-text-muted text-sm space-y-1">
                <p><strong>{content.contactBox.operator}</strong></p>
                <p>{content.contactBox.platform}</p>
                <p>
                  {content.contactBox.formLink}:{' '}
                  <a href="/contact" className="text-primary hover:underline">
                    animalbond.club/contact
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-2">{content.contactBox.designated}</p>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  )
}
