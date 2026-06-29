import type { Metadata } from 'next'
import { Suspense } from 'react'
import ContactContent from './ContactContent'
import Breadcrumbs from '../components/Layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Contact & Inscriptions',
  description:
    'Contactez ZYNOVIA Academy pour inscrire votre enfant, planifier une présentation pour votre école ou demander une formation en entreprise. Contactez-nous !',
  keywords: [
    'contact ZYNOVIA',
    'rendez-vous IA',
    'inscription académie IA',
    'contact formation IA',
    'devis formation IA ',
  ],
  openGraph: {
    title: 'Contact & Inscriptions | ZYNOVIA Academy',
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
    title: 'Contact & Inscriptions | ZYNOVIA Academy',
    description: 'Contactez ZYNOVIA Academy pour prendre rendez-vous et découvrir nos programmes.',
    images: ['/images/banner/image.png'],
  },
  alternates: {
    canonical: 'https://www.zynovia-academy.com/contact',
    languages: {
      'fr-TN': 'https://www.zynovia-academy.com/contact',
      'ar-TN': 'https://www.zynovia-academy.com/contact?lang=ar',
      'en': 'https://www.zynovia-academy.com/contact?lang=en',
      'x-default': 'https://www.zynovia-academy.com/contact',
    },
  },
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
      <Breadcrumbs items={[{ name: 'Contact & Inscriptions' }]} />
      <ContactContent />
    </Suspense>
  )
}