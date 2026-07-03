import type { Metadata } from 'next'
import NotreVisionPage from '../components/Home/Vision/page'

export const metadata: Metadata = {
  title: 'Notre Vision Pédagogique — Zynovia',
  description:
    "Découvrez l'approche pédagogique et la vision de Zynovia pour préparer la jeunesse aux métiers de demain grâce à l'IA.",
  openGraph: {
    title: 'Notre Vision Pédagogique — Zynovia',
    description:
      "Découvrez la vision de Zynovia : préparer les collégiens et lycéens à un avenir transformé par l'IA.",
    url: 'https://www.zynovia-academy.com/vision',
    siteName: 'Zynovia',
    images: [
      {
        url: '/images/vision/vision.jpg',
        width: 1200,
        height: 630,
        alt: 'Vision pédagogique de Zynovia',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.zynovia-academy.com/vision',
  },
}

export default function VisionPage() {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': "Notre vision : Préparer la jeunesse nne à l'ère de l'Intelligence Artificielle",
    'description': "La vision pédagogique de ZYNOVIA Academy pour armer les collégiens et lycéens ns face aux transformations majeures induites par l'IA.",
    'image': 'https://www.zynovia-academy.com/images/vision/vision.jpg',
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
        'name': 'Notre Vision',
        'item': 'https://www.zynovia-academy.com/vision'
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <NotreVisionPage />
    </>
  )
}



