import type { Metadata } from 'next'
import NosInfrastructuresContent from './NosInfrastructuresContent'

export const metadata: Metadata = {
  title: 'Nos Infrastructures – INOTEQIA Academy',
  description:
    "Découvrez notre espace de coworking professionnel : open space, salles de formation, salles confort et équipements modernes pour apprendre dans un environnement professionnel.",
  openGraph: {
    title: 'Nos Infrastructures – INOTEQIA Academy',
    description:
      "Un espace conçu pour apprendre dans un environnement professionnel. Découvrez nos espaces partagés, salles de formation et équipements modernes.",
    url: 'https://inoteqia.com/nos-infrastructures',
    images: [
      {
        url: '/images/banner/entreprise.jpg',
        width: 1200,
        height: 630,
        alt: 'Espace professionnel INOTEQIA Academy',
      },
    ],
  },
}

export default function NosInfrastructuresPage() {
  return <NosInfrastructuresContent />
}

