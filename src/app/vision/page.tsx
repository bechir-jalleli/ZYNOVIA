import type { Metadata } from 'next'
import NotreVisionPage from '../components/Home/Vision/page'

export const metadata: Metadata = {
  title: 'Notre vision – ZYNOVIA Academy',
  description:
    "Découvrez la vision pédagogique de ZYNOVIA Academy : préparer les collégiens et lycéens à un avenir transformé par l'IA. Statistiques, objectifs et approche pédagogique.",
  keywords: [
    'vision pédagogique IA',
    'pédagogie IA enfants',
    'objectifs formation IA',
    'statistiques IA emploi',
    'futur IA',
    'compétences IA',
    'pourquoi apprendre IA',
    'avenir IA éducation',
    'formation technologique Tunisie',
  ],
  openGraph: {
    title: 'Notre vision – ZYNOVIA Academy',
    description:
      "Découvrez la vision pédagogique de ZYNOVIA Academy : préparer les collégiens et lycéens à un avenir transformé par l'IA.",
    url: 'https://www.zynovia-academy.com/vision',
    siteName: 'ZYNOVIA Academy',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'Vision ZYNOVIA Academy',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notre vision – ZYNOVIA Academy',
    description: "Découvrez la vision pédagogique de ZYNOVIA Academy pour préparer les jeunes à l'IA.",
    images: ['/images/banner/image.png'],
  },
  alternates: {
    canonical: 'https://www.zynovia-academy.com/vision',
  },
}

export default function VisionPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': "Notre vision : Préparer la jeunesse tunisienne à l'ère de l'Intelligence Artificielle",
    'description': "La vision pédagogique de ZYNOVIA Academy pour armer les collégiens et lycéens tunisiens face aux transformations majeures induites par l'IA.",
    'image': 'https://www.zynovia-academy.com/images/banner/image.png',
    'author': {
      '@type': 'Organization',
      'name': 'ZYNOVIA Academy',
      'url': 'https://www.zynovia-academy.com'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'ZYNOVIA Academy',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.zynovia-academy.com/images/logo/ZYNOVIAPNGG-removebg-preview.png'
      }
    },
    'datePublished': '2024-01-01',
    'mainEntityOfPage': 'https://www.zynovia-academy.com/vision'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <NotreVisionPage />
    </>
  )
}


