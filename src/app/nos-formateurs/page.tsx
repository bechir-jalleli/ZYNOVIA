import type { Metadata } from 'next'
import NosFormateursContent from './NosFormateursContent'

export const metadata: Metadata = {
  title: 'Nos Formateurs Experts en IA — Zynovia Academy',
  description:
    'Faites connaissance avec les mentors et ingénieurs de Zynovia Academy. Une équipe de formateurs d\'élite chez Zynovia pour guider les jeunes en IA.',
  keywords: [
    'Zynovia',
    'Zynovia Academy',
    'Formateurs Zynovia',
    'Mentors Zynovia Academy',
    'Ingénieurs Zynovia',
    'Professeurs Zynovia'
  ],
  openGraph: {
    title: 'Nos Formateurs Experts en IA — Zynovia Academy',
    description:
      'Rencontrez les ingénieurs et formateurs experts en Intelligence Artificielle de Zynovia Academy.',
    url: 'https://www.zynovia-academy.com/nos-formateurs',
    siteName: 'Zynovia Academy',
    images: [
      {
        url: '/images/formateurs/nos-formateurs.jpg',
        width: 1200,
        height: 630,
        alt: 'Formateurs Zynovia Academy',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.zynovia-academy.com/nos-formateurs',
  },
}

export default function NosFormateursPage() {
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
        'name': 'Nos Formateurs',
        'item': 'https://www.zynovia-academy.com/nos-formateurs'
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <NosFormateursContent />
    </>
  )
}


