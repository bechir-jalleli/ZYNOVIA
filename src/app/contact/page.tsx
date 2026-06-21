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
    url: 'https://www.zynovia-academy.com/contact',
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
  alternates: { canonical: 'https://www.zynovia-academy.com/contact' },
}

export default function ContactPage() {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'ZYNOVIA Academy',
    'image': 'https://www.zynovia-academy.com/images/banner/image.png',
    'telephone': '+21625857621',
    'email': 'contact@zynovia-academy.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'B2-2 Immeuble Mak Crown, rue du Lac Léman, Les Berges du Lac',
      'postalCode': '1053',
      'addressLocality': 'Tunis',
      'addressCountry': 'TN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 36.8550972,
      'longitude': 10.274117
    },
    'url': 'https://www.zynovia-academy.com/contact',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+21625857621',
      'contactType': 'customer service',
      'email': 'contact@zynovia-academy.com',
      'areaServed': 'TN',
      'availableLanguage': ['French', 'Arabic', 'English']
    }
  }

  return (
    <Suspense fallback={null}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <ContactContent />
    </Suspense>
  )
}