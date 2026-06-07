import type { Metadata } from 'next'
import NosInfrastructuresContent from './NosInfrastructuresContent'

export const metadata: Metadata = {
  title: 'Nos Infrastructures – ZYNOVIA Academy',
  description:
    "Découvrez notre espace de coworking professionnel : open space, salles de formation, salles confort et équipements modernes pour apprendre dans un environnement professionnel.",
  keywords: [
    'infrastructure formation IA',
    'espace coworking Tunis',
    'salles formation IA',
    'équipements modernes',
    'environnement professionnel',
    'infrastructure académie',
  ],
  openGraph: {
    title: 'Nos Infrastructures – ZYNOVIA Academy',
    description:
      "Un espace conçu pour apprendre dans un environnement professionnel. Découvrez nos espaces partagés, salles de formation et équipements modernes.",
    url: 'https://inoteqia.com/nos-infrastructures',
    siteName: 'ZYNOVIA Academy',
    images: [
      {
        url: '/images/banner/entreprise.jpg',
        width: 1200,
        height: 630,
        alt: 'Espace professionnel ZYNOVIA Academy',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nos Infrastructures – ZYNOVIA Academy',
    description: 'Un espace professionnel conçu pour apprendre dans les meilleures conditions.',
    images: ['/images/banner/entreprise.jpg'],
  },
  alternates: {
    canonical: 'https://inoteqia.com/nos-infrastructures',
  },
}

export default function NosInfrastructuresPage() {
  return <NosInfrastructuresContent />
}

