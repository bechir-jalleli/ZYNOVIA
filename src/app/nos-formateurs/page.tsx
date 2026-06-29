import type { Metadata } from 'next'
import NosFormateursContent from './NosFormateursContent'
import Breadcrumbs from '../components/Layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Nos Formateurs Experts',
  description:
    'Découvrez nos formateurs experts en IA, robotique et codage en . Une équipe passionnée dédiée au mentorat et à la réussite des jeunes talents.',
  keywords: [
    'formateurs IA ',
    'experts IA',
    'mentorat IA ',
    'coaching IA',
    'formateurs robotique',
    'experts développement',
    'mentor IA',
    'expert IA ',
  ],
  openGraph: {
    title: 'Nos Formateurs Experts | ZYNOVIA Academy',
    description:
      "Une équipe de formateurs passionnés pour accompagner chaque apprenant vers la maîtrise de l'IA et du numérique.",
    url: 'https://www.zynovia-academy.com/nos-formateurs',
    siteName: 'ZYNOVIA Academy',
    images: [
      {
        url: '/images/review/daniel.webp',
        width: 1200,
        height: 630,
        alt: 'Formateurs ZYNOVIA Academy',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nos Formateurs Experts | ZYNOVIA Academy',
    description: 'Une équipe de formateurs passionnés pour accompagner chaque apprenant.',
    images: ['/images/review/daniel.webp'],
  },
  alternates: {
    canonical: 'https://www.zynovia-academy.com/nos-formateurs',
    languages: {
      'fr-TN': 'https://www.zynovia-academy.com/nos-formateurs',
      'ar-TN': 'https://www.zynovia-academy.com/nos-formateurs?lang=ar',
      'en': 'https://www.zynovia-academy.com/nos-formateurs?lang=en',
      'x-default': 'https://www.zynovia-academy.com/nos-formateurs',
    },
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
      <Breadcrumbs items={[{ name: 'Nos Formateurs' }]} />
      <NosFormateursContent />
    </>
  )
}


