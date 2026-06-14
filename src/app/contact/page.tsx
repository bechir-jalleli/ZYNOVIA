import type { Metadata } from 'next'
import { Suspense } from 'react'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact & rendez-vous – ZYNOVIA Academy',
  description:
    'Contactez ZYNOVIA Academy pour prendre rendez-vous et découvrir le programme le plus adapté à votre enfant. Parents, établissements, Entreprises : notre équipe vous accompagne.',
  keywords: [
    'contact ZYNOVIA',
    'rendez-vous IA',
    'inscription académie IA',
    'contact formation IA',
    'devis formation IA Tunisie',
  ],
  openGraph: {
    title: 'Contact & rendez-vous – ZYNOVIA Academy',
    description:
      'Contactez ZYNOVIA Academy pour prendre rendez-vous et découvrir le programme le plus adapté. Parents, établissements, Entreprises : notre équipe vous accompagne.',
    url: 'https://inoteqia.com/contact',
    siteName: 'ZYNOVIA Academy',
    images: [{ url: '/images/banner/image.png', width: 1200, height: 630, alt: 'Contact ZYNOVIA Academy' }],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & rendez-vous – ZYNOVIA Academy',
    description: 'Contactez ZYNOVIA Academy pour prendre rendez-vous et découvrir nos programmes.',
    images: ['/images/banner/image.png'],
  },
  alternates: { canonical: 'https://inoteqia.com/contact' },
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactContent />
    </Suspense>
  )
}