import type { Metadata } from 'next'
import Hero from './components/Home/Hero'
import Records from './components/Home/Records'
import Specialize from './components/Home/Specialize'
import PourQui from './components/Home/PourQui'
import FormationsBootcamps from './components/Home/FormationsBootcamps'
// import Project from './components/Home/Project'
import Review from './components/Home/Review'
import Pricing from './components/Home/Pricing'
import PartnersBanner from './components/Home/PartnersBanner'
import FinalCTA from './components/Home/FinalCTA'

export const metadata: Metadata = {
  title: 'ZYNOVIA Academy – Académie de l\'IA (Artificial Intelligence) en Tunisie',
  description:
    'L\'académie de référence en Intelligence Artificielle (AI), Robotique et Programmation en Tunisie. Programmes scolaires et bootcamps pour collégiens et lycéens.',
  keywords: [
    'zynovia',
    'zynovia academy',
    'academy',
    'ai',
    'tunisie',
    'ai tunisie',
    'academy ai tunisie',
    'zynovia academy tunisie',
    'formation ia tunisie',
    'intelligence artificielle tunisie',
    'formation intelligence artificielle',
    'formation IA enfants',
    'robotique Tunisie',
    'programmation enfants',
    'bootcamp IA',
  ],
  openGraph: {
    title: 'ZYNOVIA Academy – Académie de l\'IA en Tunisie',
    description:
      'Formez vos enfants à l\'intelligence artificielle, la robotique et les technologies de demain avec ZYNOVIA Academy, l\'académie leader en Tunisie.',
    url: 'https://inoteqia.com',
    siteName: 'ZYNOVIA Academy',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'ZYNOVIA Academy - Formation IA pour jeunes en Tunisie',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZYNOVIA Academy – Académie de l\'IA en Tunisie',
    description:
      'Découvrez ZYNOVIA Academy : formations en Intelligence Artificielle (AI), robotique et programmation pour jeunes en Tunisie.',
    images: ['/images/banner/image.png'],
  },
  alternates: {
    canonical: 'https://inoteqia.com',
  },
}

export default function Home() {
  return (
    <main>
      {/* 1️⃣ HERO - Avec 3 CTAs clairs */}
      <Hero />

      {/* 2️⃣ POURQUOI APPRENDRE L'IA ? - Version courte avec 3 chiffres + bouton */}
      <Records />

      {/* 3️⃣ Notre valeur ajoutée - 4 cartes */}
      <Specialize />

      {/* 4️⃣ POUR QUI ? - Section stratégique avec 3 cartes */}
      <PourQui />

      {/* 4.5️⃣ FORMATIONS & BOOTCAMPS - Formations actuelles */}
      <FormationsBootcamps />

      {/* 5️⃣ POPULAR PROJECTS - Présentation des projets */}
      {/* <Project /> */}

      {/* 6️⃣ CLIENT REVIEWS - Avis clients */}
      <Review />

      {/* 7️⃣ PRICING - Plans tarifaires */}
      <Pricing />


      {/* 9️⃣ PREUVE SOCIALE - Logos partenaires + chiffre clé + témoignage */}
      <PartnersBanner />

      {/* 🔟 CTA FINAL - Texte inspirant + 2 boutons */}
      <FinalCTA />
    </main>
  )
}
