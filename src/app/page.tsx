import type { Metadata } from 'next'
import Hero from './components/Home/Hero'
import Records from './components/Home/Records'
import Specialize from './components/Home/Specialize'
import PourQui from './components/Home/PourQui'
import FormationsBootcamps from './components/Home/FormationsBootcamps'
import Project from './components/Home/Project'
import Review from './components/Home/Review'
import Pricing from './components/Home/Pricing'
import Category from './components/Home/Category'
import PartnersBanner from './components/Home/PartnersBanner'
import FinalCTA from './components/Home/FinalCTA'

export const metadata: Metadata = {
  title: 'INOTEQIA Academy – Académie Tunisienne de l\'IA et des Technologies du Futur',
  description:
    'Formez votre enfant à l\'intelligence artificielle, la robotique et les technologies du futur. Programmes annuels et bootcamps pour collégiens et lycéens à Tunis.',
  keywords: [
    'IA Tunisie',
    'intelligence artificielle enfants',
    'formation IA collégiens',
    'formation IA lycéens',
    'robotique Tunisie',
    'programmation enfants',
    'académie IA Tunisie',
    'INOTEQIA Academy',
  ],
  openGraph: {
    title: 'INOTEQIA Academy – Académie Tunisienne de l\'IA et des Technologies du Futur',
    description:
      'Formez votre enfant à l\'intelligence artificielle, la robotique et les technologies du futur. Programmes annuels et bootcamps pour collégiens et lycéens.',
    url: 'https://inoteqia.com',
    siteName: 'INOTEQIA Academy',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'INOTEQIA Academy - Formation IA pour jeunes',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INOTEQIA Academy – Académie Tunisienne de l\'IA',
    description:
      'Formez votre enfant à l\'intelligence artificielle, la robotique et les technologies du futur.',
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

      {/* 3️⃣ NOTRE VALEUR AJOUTÉE - 4 cartes */}
      <Specialize />

      {/* 4️⃣ POUR QUI ? - Section stratégique avec 3 cartes */}
      <PourQui />

      {/* 4.5️⃣ FORMATIONS & BOOTCAMPS - Formations actuelles */}
      <FormationsBootcamps />

      {/* 5️⃣ POPULAR PROJECTS - Présentation des projets */}
      <Project />

      {/* 6️⃣ CLIENT REVIEWS - Avis clients */}
      <Review />

      {/* 7️⃣ PRICING - Plans tarifaires */}
      <Pricing />

      {/* 8️⃣ NOS INFRASTRUCTURES - Catégories d'espaces */}
      <Category />

      {/* 9️⃣ PREUVE SOCIALE - Logos partenaires + chiffre clé + témoignage */}
      <PartnersBanner />

      {/* 🔟 CTA FINAL - Texte inspirant + 2 boutons */}
      <FinalCTA />
    </main>
  )
}
