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
import HomeFAQ from './components/Home/HomeFAQ'
import FinalCTA from './components/Home/FinalCTA'

export const metadata: Metadata = {
  title: 'Zynovia Academy | L\'académie de l\'intelligence Artificielle',
  description:
    'Zynovia forme les collégiens et lycéens aux métiers de demain : intelligence artificielle. Découvrez nos programmes et bootcamps.',
  openGraph: {
    title: 'Zynovia Academy | L\'académie de l\'intelligence Artificielle',
    description:
      'Zynovia forme les collégiens et lycéens à l\'intelligence artificielle. Découvrez nos formations.',
    url: 'https://www.zynovia-academy.com',
    siteName: 'Zynovia',
    images: [
      {
        url: '/images/logo/ZYNOVIAPNGG-removebg-preview.png',
        width: 1200,
        height: 630,
        alt: 'Zynovia — Académie IA pour Jeunes',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },

  alternates: {
    canonical: 'https://www.zynovia-academy.com',
  },
}

export default function Home() {
  // WebPage schema linking this page to the Zynovia brand entity
  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.zynovia-academy.com/#webpage',
    'url': 'https://www.zynovia-academy.com',
    'name': 'Zynovia — Académie d\'Intelligence Artificielle pour Jeunes',
    'description': 'Zynovia forme les collégiens et lycéens aux métiers de demain : intelligence artificielle.',
    'isPartOf': { '@id': 'https://www.zynovia-academy.com/#website' },
    'about': { '@id': 'https://www.zynovia-academy.com/#organization' },
    'primaryImageOfPage': {
      '@type': 'ImageObject',
      'url': 'https://www.zynovia-academy.com/images/banner/image.png'
    },
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Accueil',
          'item': 'https://www.zynovia-academy.com'
        }
      ]
    }
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
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

      {/* 9.5️⃣ FAQ SECTION - Questions fréquentes */}
      <HomeFAQ />

      {/* 🔟 CTA FINAL - Texte inspirant + 2 boutons */}
      <FinalCTA />
    </main>
  )
}
