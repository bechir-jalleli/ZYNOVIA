import type { Metadata } from 'next'
import NotreVisionPage from '../components/Home/Vision/page'

export const metadata: Metadata = {
  title: 'Notre vision – INOTEQIA Academy',
  description:
    "Découvrez la vision pédagogique d'INOTEQIA Academy : préparer les collégiens et lycéens à un avenir transformé par l'IA. Statistiques, objectifs et approche pédagogique.",
  keywords: [
    'vision pédagogique IA',
    'pédagogie IA enfants',
    'objectifs formation IA',
    'statistiques IA emploi',
    'futur IA',
    'compétences IA',
  ],
  openGraph: {
    title: 'Notre vision – INOTEQIA Academy',
    description:
      "Découvrez la vision pédagogique d'INOTEQIA Academy : préparer les collégiens et lycéens à un avenir transformé par l'IA.",
    url: 'https://inoteqia.com/vision',
    siteName: 'INOTEQIA Academy',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'Vision INOTEQIA Academy',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notre vision – INOTEQIA Academy',
    description: "Découvrez la vision pédagogique d'INOTEQIA Academy pour préparer les jeunes à l'IA.",
    images: ['/images/banner/image.png'],
  },
  alternates: {
    canonical: 'https://inoteqia.com/vision',
  },
}

export default function VisionPage() {
  return <NotreVisionPage />
}


