import type { Metadata } from 'next'
import ProgrammesContent from './ProgrammesContent'

export const metadata: Metadata = {
  title: 'Programmes – ZYNOVIA Academy',
  description:
    "Découvrez les programmes de ZYNOVIA Academy : cours annuel d'IA pour les écoles et bootcamps intensifs d'intelligence artificielle en Tunisie. Formation complète en programmation et robotique pour collégiens et lycéens.",
  keywords: [
    'programme IA annuel',
    'bootcamp IA vacances',
    'formation IA collégiens',
    'formation IA lycéens',
    'programme scolaire IA',
    'intégration IA établissement',
    'cours intelligence artificielle tunisie',
    'formation robotique enfants',
  ],
  openGraph: {
    title: 'Programmes de Formation IA – ZYNOVIA Academy',
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
    title: 'Programmes de Formation IA – ZYNOVIA Academy',
    description: 'Découvrez nos programmes de formation IA pour collégiens et lycéens en Tunisie.',
    images: ['/images/banner/image.png'],
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
      'description': "Parcours annuel d'apprentissage de l'Intelligence Artificielle et de la robotique pour les collégiens et lycéens en Tunisie.",
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }}
      />
      <ProgrammesContent />
    </>
  )
}
