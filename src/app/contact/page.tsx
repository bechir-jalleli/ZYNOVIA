import type { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact & rendez-vous – INOTEQIA Academy',
  description:
    'Contactez INOTEQIA Academy pour prendre rendez-vous et découvrir le programme le plus adapté à votre enfant. Parents, établissements, entreprises : notre équipe vous accompagne.',
  keywords: [
    'contact INOTEQIA',
    'rendez-vous IA',
    'inscription académie IA',
    'contact formation IA',
    'devis formation IA Tunisie',
  ],
  openGraph: {
    title: 'Contact & rendez-vous – INOTEQIA Academy',
    description:
      'Contactez INOTEQIA Academy pour prendre rendez-vous et découvrir le programme le plus adapté. Parents, établissements, entreprises : notre équipe vous accompagne.',
    url: 'https://inoteqia.com/contact',
    siteName: 'INOTEQIA Academy',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'Contact INOTEQIA Academy',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & rendez-vous – INOTEQIA Academy',
    description: 'Contactez INOTEQIA Academy pour prendre rendez-vous et découvrir nos programmes.',
    images: ['/images/banner/image.png'],
  },
  alternates: {
    canonical: 'https://inoteqia.com/contact',
  },
}

export default function ContactPage() {
  return <ContactContent />
}
