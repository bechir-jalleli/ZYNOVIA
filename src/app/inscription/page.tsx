import type { Metadata } from 'next'
import NosFormationsContent from './NosFormationsContent'
import PictureGallery from '../components/Home/PictureGallery';
export const metadata: Metadata = {
  title: 'Nos Formations en Intelligence Artificielle — Zynovia',
  description:
    'Inscrivez votre enfant à une formation IA avec Zynovia Academy. Découvrez nos ateliers pratiques, parcours et bootcamps encadrés par des ingénieurs IA.',
  openGraph: {
    title: 'Nos Formations en Intelligence Artificielle — Zynovia',
    description:
      'Inscrivez votre enfant à une formation IA avec Zynovia Academy. Ateliers pratiques, certification incluse, aucun prérequis, encadré par des ingénieurs IA.',
    url: 'https://www.zynovia-academy.com/inscription',
    siteName: 'Zynovia',
    images: [
      {
        url: '/images/parent/image.png',
        width: 1200,
        height: 630,
        alt: 'Zynovia Academy — Formations IA',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.zynovia-academy.com/inscription',
  },
}

export default function NosFormationsPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Accueil',
        'item': 'https://www.zynovia-academy.com',
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Inscription',
        'item': 'https://www.zynovia-academy.com/inscription',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <NosFormationsContent />

    </>
  )
}
