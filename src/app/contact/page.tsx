import type { Metadata } from 'next'
import { Suspense } from 'react'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact & Inscriptions — Zynovia',
  description:
    'Contactez Zynovia pour Inscrire votre enfant, planifier une présentation pour votre école ou demander une formation. Notre équipe vous accompagne.',
  openGraph: {
    title: 'Contact & Inscriptions — Zynovia',
    description:
      'Contactez Zynovia pour prendre rendez-vous et découvrir le programme le plus adapté. Parents, établissements, entreprises : notre équipe vous accompagne.',
    url: 'https://www.zynovia-academy.com/contact',
    siteName: 'Zynovia',
    images: [{ url: '/images/contact/cnr.jpg', width: 1200, height: 630, alt: 'Contact Zynovia' }],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.zynovia-academy.com/contact',
  },
}

export default function ContactPage() {
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'ZYNOVIA Academy',
    'image': 'https://www.zynovia-academy.com/images/contact/cnr.jpg',
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

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Accueil',
        'item': 'https://www.zynovia-academy.com'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Contact',
        'item': 'https://www.zynovia-academy.com/contact'
      }
    ]
  }

  return (
    <Suspense fallback={null}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ContactContent />
    </Suspense>
  )
}