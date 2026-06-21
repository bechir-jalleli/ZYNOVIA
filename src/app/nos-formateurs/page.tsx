import type { Metadata } from 'next'
import NosFormateursContent from './NosFormateursContent'

export const metadata: Metadata = {
  title: 'Nos Formateurs – ZYNOVIA Academy',
  description:
    "Découvrez l'équipe de formateurs de ZYNOVIA Academy : experts IA, développement, robotique et produit. Profitez d'un mentorat IA Tunisie de haut niveau pour les jeunes.",
  keywords: [
    'formateurs IA Tunisie',
    'experts IA',
    'mentorat IA Tunisie',
    'coaching IA',
    'formateurs robotique',
    'experts développement',
    'mentor IA',
    'expert IA Tunisie',
  ],
  openGraph: {
    title: 'Nos Formateurs – ZYNOVIA Academy',
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
    title: 'Nos Formateurs – ZYNOVIA Academy',
    description: 'Une équipe de formateurs passionnés pour accompagner chaque apprenant.',
    images: ['/images/review/daniel.webp'],
  },
  alternates: {
    canonical: 'https://www.zynovia-academy.com/nos-formateurs',
  },
}

export default function NosFormateursPage() {
  return <NosFormateursContent />
}

