import type { Metadata } from 'next'
import NosFormationsContent from './NosFormationsContent'
import PictureGallery from '../components/Home/PictureGallery';
export const metadata: Metadata = {
  title: 'S\'inscrire aux Formations IA — Zynovia Academy',
  description:
    'Inscrivez votre enfant à Zynovia Academy. Accédez aux formulaires d\'inscription pour nos programmes d\'Intelligence Artificielle (IA) signés Zynovia.',
  keywords: [
    'Zynovia',
    'Zynovia Academy',
    'Inscription Zynovia',
    'Rejoindre Zynovia Academy',
    'Formulaire inscription Zynovia',
    'Tarif Zynovia'
  ],
  openGraph: {
    title: 'S\'inscrire aux Formations IA — Zynovia Academy',
    description:
      'Formulaire d\'inscription officiel pour les formations et bootcamps de Zynovia Academy.',
    url: 'https://www.zynovia-academy.com/inscription',
    siteName: 'Zynovia Academy',
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
