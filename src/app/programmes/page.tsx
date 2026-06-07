import type { Metadata } from 'next'
import ProgrammesContent from './ProgrammesContent'

export const metadata: Metadata = {
  title: 'Programmes – ZYNOVIA Academy',
  description:
    "Découvrez les programmes de ZYNOVIA Academy : programme annuel d'intégration IA et bootcamps IA pendant les vacances scolaires. Formation complète pour collégiens et lycéens.",
  keywords: [
    'programme IA annuel',
    'bootcamp IA vacances',
    'formation IA collégiens',
    'formation IA lycéens',
    'programme scolaire IA',
    'intégration IA établissement',
  ],
  openGraph: {
    title: 'Programmes – ZYNOVIA Academy',
    description:
      "Découvrez les programmes de ZYNOVIA Academy : programme annuel d'intégration IA et bootcamps IA pendant les vacances scolaires.",
    url: 'https://inoteqia.com/programmes',
    siteName: 'ZYNOVIA Academy',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'Programmes ZYNOVIA Academy',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Programmes – ZYNOVIA Academy',
    description: 'Découvrez nos programmes de formation IA pour collégiens et lycéens.',
    images: ['/images/banner/image.png'],
  },
  alternates: {
    canonical: 'https://inoteqia.com/programmes',
  },
}

export default function ProgrammesPage() {
  return <ProgrammesContent />
}
