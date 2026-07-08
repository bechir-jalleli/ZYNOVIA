import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Header from './components/Layout/Header'
import { ThemeProvider } from 'next-themes'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/ScrollToTop'
import ConditionalFloatingSocialMenu from './components/Layout/ConditionalFloatingSocialMenu'
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
    default: 'Zynovia — Académie IA pour Jeunes',
    template: '%s — Zynovia',
  },
  description:
    'Zynovia est une académie d\'Intelligence Artificielle spécialisée pour collégiens et lycéens. Découvrez nos parcours annuels et bootcamps intensifs en IA.',
  authors: [{ name: 'Zynovia' }],
  creator: 'Zynovia',
  publisher: 'Zynovia',
  alternates: {
    canonical: 'https://www.zynovia-academy.com',
    languages: {
      'x-default': 'https://www.zynovia-academy.com',
      'fr': 'https://www.zynovia-academy.com',
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
    siteName: 'Zynovia',
    title: 'Zynovia — Académie d\'Intelligence Artificielle pour Jeunes',
    description:
      'Zynovia prépare les jeunes aux compétences de demain avec l\'intelligence artificielle. Découvrez nos formations.',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'Zynovia — Académie Intelligence Artificielle pour Jeunes',
      },
    ],
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
    '@id': 'https://www.zynovia-academy.com/#organization',
    'name': 'Zynovia',
    'legalName': 'Zynovia Academy',
    'url': 'https://www.zynovia-academy.com',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://www.zynovia-academy.com/images/logo/ZYNOVIAPNGG-removebg-preview.png',
      'caption': 'Zynovia'
    },
    'image': 'https://www.zynovia-academy.com/images/banner/image.png',
    'description': 'Zynovia est une académie spécialisée dans la formation en Intelligence Artificielle pour les jeunes de 12 à 18 ans.',
    'foundingDate': '2026',
    'telephone': '+21625857621',
    'email': 'contact@zynovia-academy.com',
    'brand': {
      '@type': 'Brand',
      'name': 'Zynovia'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'B2-2 Immeuble Mak Crown, rue du Lac Léman, Les Berges du Lac',
      'postalCode': '1053',
      'addressLocality': 'Tunis',
      'addressCountry': 'TN'
    },
    'knowsAbout': [
      'Intelligence Artificielle',
      'Machine Learning',
      'Formation numérique'
    ],
    'sameAs': [
      'https://www.facebook.com/profile.php?id=61590195886623',
      'https://www.instagram.com/zynovia_academy/',
      'https://wa.me/21625857621'
    ]
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.zynovia-academy.com/#website',
    'name': 'Zynovia',
    'url': 'https://www.zynovia-academy.com',
    'publisher': {
      '@id': 'https://www.zynovia-academy.com/#organization'
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://www.zynovia-academy.com/programmes?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
            <ConditionalFloatingSocialMenu />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}