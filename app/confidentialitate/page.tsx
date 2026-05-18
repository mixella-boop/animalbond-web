import type { Metadata } from 'next'
import PrivacyContent from './PrivacyContent'

export const metadata: Metadata = {
  title: 'Privacy Policy | AnimalBond',
  description: 'Privacy policy of the AnimalBond platform — how we collect, use and protect your data.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return <PrivacyContent />
}
