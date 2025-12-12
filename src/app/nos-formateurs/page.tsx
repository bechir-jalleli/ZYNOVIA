import type { Metadata } from 'next'
import NosFormateursContent from './NosFormateursContent'

export const metadata: Metadata = {
  title: 'Nos Formateurs – INOTEQIA Academy',
  description:
    "Découvrez l'équipe de formateurs d'INOTEQIA Academy : experts IA, développement, robotique et produit.",
  openGraph: {
    title: 'Nos Formateurs – INOTEQIA Academy',
    description:
      'Une équipe de formateurs passionnés pour accompagner chaque apprenant vers la maîtrise de l’IA et du numérique.',
    url: 'https://inoteqia.com/nos-formateurs',
    images: [
      {
        url: '/images/review/daniel.webp',
        width: 1200,
        height: 630,
        alt: 'Formateurs INOTEQIA Academy',
      },
    ],
  },
}

export default function NosFormateursPage() {
  return <NosFormateursContent />
}

