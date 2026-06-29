import type { Metadata } from 'next'
import ProgrammesContent from './ProgrammesContent'
import Breadcrumbs from '../components/Layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Nos Programmes de Formation',
  description:
    'Découvrez nos formations en intelligence artificielle et robotique en  : programme annuel pour écoles et bootcamps intensifs pendant les vacances.',
  keywords: [
    'programme IA annuel',
    'bootcamp IA vacances',
    'formation IA collégiens',
    'formation IA lycéens',
    'programme scolaire IA',
    'intégration IA établissement',
    'cours intelligence artificielle ',
    'formation robotique enfants',
  ],
  openGraph: {
    title: 'Programmes de Formation IA | ZYNOVIA Academy',
    description:
      "Découvrez les programmes de ZYNOVIA Academy : programme annuel d'intégration IA et bootcamps IA pendant les vacances scolaires.",
    url: 'https://www.zynovia-academy.com/programmes',
    siteName: 'ZYNOVIA Academy',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'Programmes ZYNOVIA Academy',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Programmes de Formation IA | ZYNOVIA Academy',
    description: 'Découvrez nos programmes de formation IA pour collégiens et lycéens en .',
    images: ['/images/banner/image.png'],
  },
  alternates: {
    canonical: 'https://www.zynovia-academy.com/programmes',
    languages: {
      'fr-TN': 'https://www.zynovia-academy.com/programmes',
      'ar-TN': 'https://www.zynovia-academy.com/programmes?lang=ar',
      'en': 'https://www.zynovia-academy.com/programmes?lang=en',
      'x-default': 'https://www.zynovia-academy.com/programmes',
    },
  },
}

export default function ProgrammesPage() {
  const coursesJsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      'name': 'Programme Annuel IA',
      'description': "Parcours annuel d'apprentissage de l'Intelligence Artificielle et de la robotique pour les collégiens et lycéens en .",
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
      'description': 'Sessions intensives de formation en Intelligence Artificielle et robotique pendant les vacances scolaires pour jeunes de 12 à 18 ans.',
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

