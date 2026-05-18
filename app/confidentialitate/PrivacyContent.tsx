'use client'

import { useLanguage } from '@/context/LanguageContext'
import { PRIVACY_CONTENT, TABLE_ROWS_DATA, type Lang } from './content'

export default function PrivacyContent() {
  const { lang } = useLanguage()
  const content = PRIVACY_CONTENT[(lang as Lang)] ?? PRIVACY_CONTENT.en

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold text-text-main mb-2">{content.pageTitle}</h1>
      <p className="text-text-muted text-sm mb-10">{content.lastUpdate}</p>

      <section className="prose prose-sm max-w-none text-text-main space-y-10">
        {content.sections.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-bold mb-3">{section.title}</h2>

            {/* Paragrafe simple */}
            {section.paragraphs && section.paragraphs.map((p, i) => (
              <p key={i} className="text-text-muted leading-relaxed mb-2">{p}</p>
            ))}

            {/* Subsecțiuni (ex: 2.1, 2.2, ...) */}
            {section.subsections && (
              <div className="space-y-4 mt-3">
                {section.subsections.map((sub, i) => (
                  <div key={i}>
                    <h3 className="font-semibold text-text-main mb-1">{sub.title}</h3>
                    <p className="text-text-muted leading-relaxed">{sub.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Listă cu bullet points */}
            {section.items && (
              <ul className="list-disc list-inside text-text-muted space-y-1.5 leading-relaxed mt-2">
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

            {/* Text după listă */}
            {section.afterItems && (
              <p className="text-text-muted leading-relaxed mt-3">{section.afterItems}</p>
            )}

            {/* Tabel furnizori (secțiunea 4) */}
            {section.tableHeaders && (
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm text-text-muted border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      {section.tableHeaders.map((h, i) => (
                        <th key={i} className="px-4 py-2 text-left font-semibold text-text-main">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_ROWS_DATA.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-2 border-t border-gray-100">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {section.tableNote && (
                  <p className="text-text-muted text-xs mt-2 leading-relaxed">{section.tableNote}</p>
                )}
                {section.tableAfter && (
                  <p className="text-text-muted leading-relaxed mt-2">{section.tableAfter}</p>
                )}
              </div>
            )}

            {/* Secțiunea Contact */}
            {section.contactBox && (
              <div className="bg-gray-50 rounded-xl p-4 mt-3 text-text-muted text-sm space-y-1">
                <p><strong>{section.contactBox.operator}</strong></p>
                <p>{section.contactBox.platform}</p>
                <p>
                  {section.contactBox.emailLabel}:{' '}
                  <a href="mailto:contact@animalbond.club" className="text-primary hover:underline">
                    contact@animalbond.club
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
