import type { Metadata } from 'next'
import ProgrammesContent from './ProgrammesContent'
import Breadcrumbs from '../components/Layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Nos Programmes de Formation — Zynovia',
  description:
    'Découvrez les formations Zynovia en Intelligence Artificielle : programme annuel pour écoles et bootcamps intensifs pendant les vacances.',
  openGraph: {
    title: 'Programmes de Formation IA — Zynovia',
    description:
      "Découvrez les programmes de Zynovia : parcours annuel d'intégration IA et bootcamps intensifs pendant les vacances scolaires.",
    url: 'https://www.zynovia-academy.com/programmes',
    siteName: 'Zynovia',
    images: [
      {
        url: '/images/programe/programe.jpg',
        width: 1200,
        height: 630,
        alt: 'Programmes Zynovia — Formation IA',
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
      <Breadcrumbs items={[{ name: 'Nos Programmes de Formation' }]} />
      <ProgrammesContent />
    </>
  )
}

