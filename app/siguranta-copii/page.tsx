import type { Metadata } from 'next'
import ChildSafetyContent from './ChildSafetyContent'

export const metadata: Metadata = {
  title: 'Child Safety Standards | AnimalBond',
  description: 'AnimalBond — Child safety standards, anti-CSAM policy and reporting mechanism. Available in 10 languages.',
  robots: { index: true, follow: true },
}

export default function ChildSafetyPage() {
  return <ChildSafetyContent />
}
