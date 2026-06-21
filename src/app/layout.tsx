import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Header from './components/Layout/Header'
import { ThemeProvider } from 'next-themes'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/ScrollToTop'
import { AuthProvider } from '@/context/AuthContext'

const DMSans = DM_Sans({
  variable: '--font-DM-Sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.zynovia-academy.com'),
  title: {
    default: 'ZYNOVIA Academy – Académie de l\'IA et des Technologies du Futur en Tunisie',
    template: '%s | ZYNOVIA Academy',
  },
  description:
    'ZYNOVIA Academy – Académie de l\'Intelligence Artificielle et des Technologies du Futur. Formation IA (Artificial Intelligence), robotique et programmation pour collégiens, lycéens et jeunes en Tunisie. Bootcamps IA, cours d\'IA pour étudiants.',
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
    'AI courses',
    'AI courses Tunisia',
    'AI training for students',
    'AI bootcamp',
    'AI education',
    'AI programs for schools',
    'AI training in Tunisia',
    'artificial intelligence academy',
    'cours intelligence artificielle Tunisie',
    'formation IA collégiens lycéens',
    'académie IA Tunis',
    'apprendre intelligence artificielle',
    'stage IA vacances scolaires',
    'programme scolaire IA Tunisie',
  ],
  authors: [{ name: 'ZYNOVIA Academy' }],
  creator: 'ZYNOVIA Academy',
  publisher: 'ZYNOVIA Academy',
  alternates: {
    canonical: 'https://www.zynovia-academy.com',
    languages: {
      'fr-FR': 'https://www.zynovia-academy.com',
      'en-US': 'https://www.zynovia-academy.com/en',
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
    title: 'ZYNOVIA Academy – Académie de l\'IA en Tunisie | AI Courses & Training',
    description:
      'Formation IA, robotique et programmation pour collégiens et lycéens en Tunisie. Découvrez nos programmes annuels, bootcamps IA et cours d\'intelligence artificielle.',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'ZYNOVIA Academy - AI Academy Tunisie - Formation Intelligence Artificielle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZYNOVIA Academy – Académie de l\'IA en Tunisie',
    description: 'Formation IA, robotique et programmation pour collégiens, lycéens et jeunes en Tunisie. AI courses & bootcamps.',
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
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
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
    'description': 'Académie d\'Intelligence Artificielle (AI) et des Technologies du Futur en Tunisie. Formation IA, robotique et programmation pour collégiens et lycéens.',
    'telephone': '+21625857621',
    'email': 'contact@zynovia-academy.com',
    'foundingDate': '2023',
    'areaServed': {
      '@type': 'AdministrativeArea',
      'name': 'Tunisie'
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
