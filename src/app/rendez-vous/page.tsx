import type { Metadata } from 'next'
import RendezVousContent from './RendezVousContent'
import Breadcrumbs from '../components/Layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Prendre Rendez-vous',
  description:
    "Planifiez un entretien gratuit en ligne ou sur notre site de Tunis pour découvrir nos programmes d'IA pour enfants et adolescents.",
  keywords: [
    'rendez-vous ZYNOVIA',
    'prendre rendez-vous IA',
    'rendez-vous académie IA',
    'consultation formation IA ',
    'rendez-vous ZYNOVIA Academy',
  ],
  openGraph: {
    title: 'Prendre Rendez-vous | ZYNOVIA Academy',
    description:
      'Réservez un rendez-vous en visioconférence ou sur site pour découvrir nos programmes IA ou établir un partenariat.',
    url: 'https://www.zynovia-academy.com/rendez-vous',
    siteName: 'ZYNOVIA Academy',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'Rendez-vous ZYNOVIA Academy',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.zynovia-academy.com/rendez-vous',
    languages: {
      'fr-TN': 'https://www.zynovia-academy.com/rendez-vous',
      'ar-TN': 'https://www.zynovia-academy.com/rendez-vous?lang=ar',
      'en': 'https://www.zynovia-academy.com/rendez-vous?lang=en',
      'x-default': 'https://www.zynovia-academy.com/rendez-vous',
    },
  },
}

export default function RendezVousPage() {
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
        'name': 'Rendez-vous',
        'item': 'https://www.zynovia-academy.com/rendez-vous'
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Breadcrumbs items={[{ name: 'Prendre Rendez-vous' }]} />
      <RendezVousContent />
    </>
  )
}

