import type { Metadata } from 'next'
import NosFormateursContent from './NosFormateursContent'

export const metadata: Metadata = {
  title: 'Nos Formateurs Experts — Zynovia',
  description:
    'Découvrez l\'équipe de formateurs experts de Zynovia en Intelligence Artificielle. Une équipe passionnée dédiée au mentorat et à la réussite des jeunes.',
  openGraph: {
    title: 'Nos Formateurs Experts — Zynovia',
    description:
      "Une équipe de formateurs passionnés pour accompagner chaque apprenant vers la maîtrise de l'IA.",
    url: 'https://www.zynovia-academy.com/nos-formateurs',
    siteName: 'Zynovia',
    images: [
      {
        url: '/images/formateurs/nos-formateurs.jpg',
        width: 1200,
        height: 630,
        alt: 'Formateurs Zynovia',
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


