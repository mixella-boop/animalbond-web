import type { Metadata } from 'next'
import TermeniContent from './TermeniContent'

export const metadata: Metadata = {
  title: 'Terms & Conditions | AnimalBond',
  description: 'Terms and conditions of use for the AnimalBond platform.',
  robots: { index: true, follow: true },
}

export default function TermeniPage() {
  return <TermeniContent />
}
