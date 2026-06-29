import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Header from './components/Layout/Header'
import { ThemeProvider } from 'next-themes'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/ScrollToTop'
import { AuthProvider } from '@/context/AuthContext'
import { Suspense } from 'react'
import TrackingScripts from './components/Analytics/TrackingScripts'

const DMSans = DM_Sans({
  variable: '--font-DM-Sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.zynovia-academy.com'),
  title: {
    default: 'ZYNOVIA Academy | Académie IA & Robotique ',
    template: '%s | ZYNOVIA Academy',
  },
  description:
    'Formation IA, robotique et programmation pour jeunes . Bootcamps et cours d\'intelligence artificielle pour collégiens et lycéens.',
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
    'AI courses',
    'AI courses ',
    'AI training for students',
    'AI bootcamp',
    'AI education',
    'AI programs for schools',
    'AI training in ',
    'artificial intelligence academy',
    'cours intelligence artificielle ',
    'formation IA collégiens lycéens',
    'académie IA ',
    'apprendre intelligence artificielle',
    'stage IA vacances scolaires',
    'programme scolaire IA ',
  ],
  authors: [{ name: 'ZYNOVIA Academy' }],
  creator: 'ZYNOVIA Academy',
  publisher: 'ZYNOVIA Academy',
  alternates: {
    canonical: 'https://www.zynovia-academy.com',
    languages: {
      'fr-TN': 'https://www.zynovia-academy.com',
      'ar-TN': 'https://www.zynovia-academy.com/?lang=ar',
      'en': 'https://www.zynovia-academy.com/?lang=en',
      'x-default': 'https://www.zynovia-academy.com',
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/images/logo/ZYNOVIAPNGG-removebg-preview.png',
        type: 'image/png',
      },
    ],
    shortcut: '/images/logo/ZYNOVIAPNGG-removebg-preview.png',
    apple: '/images/logo/ZYNOVIAPNGG-removebg-preview.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://www.zynovia-academy.com',
    siteName: 'ZYNOVIA Academy',
    title: 'ZYNOVIA Academy | Académie IA & Robotique ',
    description:
      'Formez vos enfants à l\'intelligence artificielle, la robotique et les technologies de demain avec ZYNOVIA Academy, l\'académie leader .',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'ZYNOVIA Academy - AI Academy  - Formation Intelligence Artificielle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZYNOVIA Academy | Académie IA & Robotique ',
    description: 'Formation IA, robotique et programmation pour collégiens, lycéens et jeunes . AI courses & bootcamps.',
    images: ['/images/banner/image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-placeholder',
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    'name': 'ZYNOVIA Academy',
    'alternateName': 'Zynovia',
    'url': 'https://www.zynovia-academy.com',
    'logo': 'https://www.zynovia-academy.com/images/logo/ZYNOVIAPNGG-removebg-preview.png',
    'description': 'Académie d\'Intelligence Artificielle (AI) et des Technologies du Futur . Formation IA, robotique et programmation pour collégiens et lycéens.',
    'telephone': '+21625857621',
    'email': 'contact@zynovia-academy.com',
    'foundingDate': '2023',
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': ''
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'B2-2 Immeuble Mak Crown, rue du Lac Léman, Les Berges du Lac',
      'postalCode': '1053',
      'addressLocality': 'Tunis',
      'addressCountry': 'TN'
    },
    'sameAs': [
      'https://www.facebook.com/zynovia.academy',
      'https://www.instagram.com/zynovia.academy',
      'https://www.linkedin.com/company/zynovia-academy'
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Programmes de Formation en IA',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Course',
            'name': 'Programme Annuel IA',
            'description': 'Parcours annuel de formation en intelligence artificielle pour les jeunes.'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Course',
            'name': 'Bootcamp IA',
            'description': 'Sessions intensives de formation en IA et robotique pendant les vacances.'
          }
        }
      ]
    }
  }

  const businessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'ZYNOVIA Academy',
    'image': 'https://www.zynovia-academy.com/images/banner/image.png',
    'telephone': '+21625857621',
    'email': 'contact@zynovia-academy.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'B2-2 Immeuble Mak Crown, rue du Lac Léman, Les Berges du Lac',
      'postalCode': '1053',
      'addressLocality': 'Tunis',
      'addressCountry': 'TN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 36.8550972,
      'longitude': 10.274117
    },
    'url': 'https://www.zynovia-academy.com',
    'priceRange': '$$',
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        'opens': '08:00',
        'closes': '19:00'
      }
    ]
  }

  return (
    <html lang='fr' suppressHydrationWarning>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (typeof window === 'undefined') return;
                  var fallback = function(query) {
                    return {
                      matches: false,
                      media: query || '',
                      onchange: null,
                      addListener: function() {},
                      removeListener: function() {},
                      addEventListener: function() {},
                      removeEventListener: function() {},
                      dispatchEvent: function() { return false; }
                    };
                  };
                  if (!window.matchMedia) {
                    window.matchMedia = fallback;
                  } else {
                    var orig = window.matchMedia.bind(window);
                    window.matchMedia = function(query) {
                      try {
                        var res = orig(query);
                        if (!res) return fallback(query);
                        if (!res.addListener) {
                          res.addListener = function(cb) {
                            try { res.addEventListener('change', cb); } catch(e) {}
                          };
                        }
                        if (!res.removeListener) {
                          res.removeListener = function(cb) {
                            try { res.removeEventListener('change', cb); } catch(e) {}
                          };
                        }
                        return res;
                      } catch (e) {
                        return fallback(query);
                      }
                    };
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body className={`${DMSans.variable} antialiased dark:bg-darkmode`}>
        <Suspense fallback={null}>
          <TrackingScripts />
        </Suspense>
        <ThemeProvider
          attribute='class'
          enableSystem={false}
          defaultTheme='light'>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
