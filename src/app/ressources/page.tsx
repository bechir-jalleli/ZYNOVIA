import type { Metadata } from 'next'
import RessourcesContent from './RessourcesContent'

export const metadata: Metadata = {
  title: 'Ressources, Blog & Articles IA – ZYNOVIA Academy',
  description:
    'Articles, guides et ressources pour mieux appréhender l’Intelligence Artificielle (AI), la robotique et la programmation pour les jeunes en Tunisie.',
  keywords: [
    'blog zynovia',
    'ressources IA tunisie',
    'articles intelligence artificielle',
    'blog formation IA',
    'actualités robotique tunisie',
    'zynovia academy',
  ],
  openGraph: {
    title: 'Ressources, Blog & Articles IA – ZYNOVIA Academy',
    description:
      'Découvrez nos articles et ressources sur l’Intelligence Artificielle, l’éducation technologique et l’avenir des métiers en Tunisie.',
    url: 'https://inoteqia.com/ressources',
    siteName: 'ZYNOVIA Academy',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'Blog ZYNOVIA Academy',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ressources & Blog IA – ZYNOVIA Academy',
    description: 'Articles et ressources sur l’IA et l’orientation des jeunes en Tunisie.',
    images: ['/images/banner/image.png'],
  },
  alternates: {
    canonical: 'https://inoteqia.com/ressources',
  },
}

export default function RessourcesPage() {
  return <RessourcesContent />
}
