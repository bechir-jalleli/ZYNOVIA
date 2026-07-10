import type { Metadata } from 'next'
import ProgrammesContent from './ProgrammesContent'

export const metadata: Metadata = {
  title: 'Programmes de Formation IA — Zynovia Academy',
  description:
    'Explorez les programmes exclusifs de Zynovia Academy : cours annuels d\'Intelligence Artificielle (IA), ateliers pratiques et bootcamps d\'été avec Zynovia.',
  keywords: [
    'Zynovia',
    'Zynovia Academy',
    'Programmes Zynovia',
    'Formations Zynovia Academy',
    'Cours IA Zynovia',
    'Bootcamp Zynovia Academy',
    'Zynovia cursus'
  ],
  openGraph: {
    title: 'Programmes de Formation IA — Zynovia Academy',
    description:
      'Découvrez les programmes de Zynovia Academy : parcours annuel d\'intégration IA et bootcamps intensifs en IA.',
    url: 'https://www.zynovia-academy.com/programmes',
    siteName: 'Zynovia Academy',
    images: [
      {
        url: '/images/programe/programe.jpg',
        width: 1200,
        height: 630,
        alt: 'Programmes Zynovia Academy — Formation IA',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.zynovia-academy.com/programmes',
  },
}

export default function ProgrammesPage() {
  const coursesJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': 'Programme Annuel IA',
      'description': "Parcours annuel d'apprentissage de l'Intelligence Artificielle pour les collégiens et lycéens.",
      'provider': {
        '@type': 'EducationalOrganization',
        'name': 'ZYNOVIA Academy',
        'sameAs': 'https://www.zynovia-academy.com'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': 'Bootcamp IA',
      'description': 'Sessions intensives de formation en Intelligence Artificielle pendant les vacances scolaires pour jeunes de 12 à 18 ans.',
      'provider': {
        '@type': 'EducationalOrganization',
        'name': 'ZYNOVIA Academy',
        'sameAs': 'https://www.zynovia-academy.com'
      }
    }
  ]

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
        'name': 'Programmes',
        'item': 'https://www.zynovia-academy.com/programmes'
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProgrammesContent />
    </>
  )
}

