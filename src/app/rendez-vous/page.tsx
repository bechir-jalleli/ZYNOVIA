import type { Metadata } from 'next'
import RendezVousContent from './RendezVousContent'

export const metadata: Metadata = {
  title: 'Prendre Rendez-vous — Zynovia Academy',
  description:
    'Planifiez un entretien gratuit avec les conseillers de Zynovia Academy. Discutez de l\'orientation en IA de votre enfant et découvrez Zynovia.',
  keywords: [
    'Zynovia',
    'Zynovia Academy',
    'Rendez-vous Zynovia',
    'Contact Zynovia Academy',
    'Orientation Zynovia',
    'Entretien Zynovia',
    'rendez-vous ZYNOVIA',
    'prendre rendez-vous IA',
    'rendez-vous académie IA'
  ],
  openGraph: {
    title: 'Prendre Rendez-vous — Zynovia Academy',
    description:
      'Planifiez un entretien gratuit en visioconférence ou en présentiel avec Zynovia Academy.',
    url: 'https://www.zynovia-academy.com/rendez-vous',
    siteName: 'Zynovia Academy',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'Rendez-vous Zynovia Academy',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.zynovia-academy.com/rendez-vous',
    languages: {
      'fr-TN': 'https://www.zynovia-academy.com/rendez-vous',
      'ar-TN': 'https://www.zynovia-academy.com/rendez-vous?lang=ar',
      'en': 'https://www.zynovia-academy.com/rendez-vous?lang=en',
      'x-default': 'https://www.zynovia-academy.com/rendez-vous',
    },
  },
}

export default function RendezVousPage() {
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
        'name': 'Rendez-vous',
        'item': 'https://www.zynovia-academy.com/rendez-vous'
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <RendezVousContent />
    </>
  )
}

