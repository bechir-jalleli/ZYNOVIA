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
  title: 'ZYNOVIA Academy | Formation IA, Code & Robotique',
  description:
    'Formations d\'excellence en intelligence artificielle, programmation et robotique pour collégiens et lycéens  . Boostez l\'avenir de vos enfants !',
  keywords: [
    'zynovia',
    'zynovia academy',
    'academy',
    'ai',
    '',
    'ai ',
    'academy ai ',
    'zynovia academy ',
    'formation ia ',
    'intelligence artificielle ',
    'formation intelligence artificielle',
    'formation IA enfants',
    'robotique ',
    'programmation enfants',
    'bootcamp IA',
  ],
  openGraph: {
    title: 'ZYNOVIA Academy | Formation IA, Code & Robotique',
    description:
      'Formez vos enfants à l\'intelligence artificielle, la robotique et les technologies de demain avec ZYNOVIA Academy, l\'académie leader  .',
    url: 'https://www.zynovia-academy.com',
    siteName: 'ZYNOVIA Academy',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'ZYNOVIA Academy - Formation IA pour jeunes  ',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZYNOVIA Academy | Formation IA, Code & Robotique',
    description:
      'Découvrez ZYNOVIA Academy : formations en Intelligence Artificielle (AI), robotique et programmation pour jeunes  .',
    images: ['/images/banner/image.png'],
  },
  alternates: {
    canonical: 'https://www.zynovia-academy.com',
    languages: {
      'fr-TN': 'https://www.zynovia-academy.com',
      'ar-TN': 'https://www.zynovia-academy.com/?lang=ar',
      'en': 'https://www.zynovia-academy.com/?lang=en',
      'x-default': 'https://www.zynovia-academy.com',
    },
  },
}

export default function Home() {
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': 'Formations IA ZYNOVIA Academy',
    'description': 'Formations en Intelligence Artificielle, robotique et programmation   pour collégiens et lycéens. Programmes annuels et bootcamps intensifs.',
    'provider': {
      '@type': 'EducationalOrganization',
      'name': 'ZYNOVIA Academy',
      'sameAs': 'https://www.zynovia-academy.com'
    }
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'ZYNOVIA Academy',
    'url': 'https://www.zynovia-academy.com',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://www.zynovia-academy.com/ressources?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'ZYNOVIA Academy',
    'url': 'https://www.zynovia-academy.com',
    'logo': 'https://www.zynovia-academy.com/images/logo/ZYNOVIAPNGG-removebg-preview.png',
    'sameAs': [
      'https://www.facebook.com/zynovia.academy',
      'https://www.instagram.com/zynovia.academy',
      'https://www.linkedin.com/company/zynovia-academy',
      'https://x.com/zynovia_academy',
      'https://www.youtube.com/@zynovia_academy'
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+21625857621',
      'contactType': 'customer service',
      'email': 'contact@zynovia-academy.com'
    }
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
      }
    ]
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
