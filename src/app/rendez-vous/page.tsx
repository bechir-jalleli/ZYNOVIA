import type { Metadata } from 'next'
import RendezVousContent from './RendezVousContent'

export const metadata: Metadata = {
  title: 'Rendez-vous – ZYNOVIA Academy',
  description:
    'Réservez un rendez-vous avec ZYNOVIA Academy en visioconférence ou sur site. Parents, établissements, Entreprises : notre équipe vous accompagne pour trouver le programme adapté.',
  keywords: [
    'rendez-vous ZYNOVIA',
    'prendre rendez-vous IA',
    'rendez-vous académie IA',
    'consultation formation IA Tunisie',
    'rendez-vous ZYNOVIA Academy',
  ],
  openGraph: {
    title: 'Rendez-vous – ZYNOVIA Academy',
    description:
      'Réservez un rendez-vous en visioconférence ou sur site pour découvrir nos programmes IA ou établir un partenariat.',
    url: 'https://inoteqia.com/rendez-vous',
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
  twitter: {
    card: 'summary_large_image',
    title: 'Rendez-vous – ZYNOVIA Academy',
    description: 'Réservez un créneau avec ZYNOVIA Academy pour découvrir nos programmes IA.',
    images: ['/images/banner/image.png'],
  },
  alternates: {
    canonical: 'https://inoteqia.com/rendez-vous',
  },
}

export default function RendezVousPage() {
  return <RendezVousContent />
}
