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
    url: 'https://www.zynovia-academy.com/ressources',
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
    canonical: 'https://www.zynovia-academy.com/ressources',
  },
}

export default function RessourcesPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Que trouve-t-on dans les ressources ZYNOVIA ?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Les ressources regroupent des guides pratiques, des fiches pédagogiques, des supports d’ateliers, des vidéos et des analyses pour les familles, les élèves, les enseignants et les partenaires.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Les ressources sont-elles adaptées à tous les niveaux ?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Oui, certaines ressources sont pensées pour les collégiens et lycéens débutants, d’autres pour des publics plus avancés ou pour les enseignants et partenaires.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Comment utiliser ces ressources en classe ou à la maison ?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Les guides et supports pédagogiques peuvent être utilisés en autonomie ou intégrés à des ateliers, des cours, des clubs IA ou des activités en famille.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Les ressources seront-elles mises à jour ?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Oui, les contenus sont régulièrement enrichis pour suivre l’évolution de l’IA, des métiers et des besoins des familles, des écoles et des Entreprises.'
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <RessourcesContent />
    </>
  )
}
