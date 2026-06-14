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
  metadataBase: new URL('https://inoteqia.com'),
  title: {
    default: 'ZYNOVIA Academy – Académie  de l\'IA et des Technologies du Futur',
    template: '%s | ZYNOVIA Academy',
  },
  description:
    'ZYNOVIA Academy – Académie  de l\'Intelligence Artificielle et des Technologies du Futur. Formation IA, robotique et programmation pour collégiens et lycéens à Tunis.',
  keywords: [
    'ZYNOVIA Academy',
    'académie IA Tunisie',
    'formation intelligence artificielle',
    'formation IA enfants',
    'robotique Tunisie',
    'programmation enfants',
    'bootcamp IA',
    'formation technologique Tunisie',
  ],
  authors: [{ name: 'ZYNOVIA Academy' }],
  creator: 'ZYNOVIA Academy',
  publisher: 'ZYNOVIA Academy',
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
    url: 'https://inoteqia.com',
    siteName: 'ZYNOVIA Academy',
    title: 'ZYNOVIA Academy – Académie  de l\'IA',
    description:
      'Formation IA, robotique et programmation pour collégiens et lycéens à Tunis. Programmes annuels et bootcamps.',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'ZYNOVIA Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZYNOVIA Academy – Académie  de l\'IA',
    description: 'Formation IA, robotique et programmation pour collégiens et lycéens à Tunis.',
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
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='fr' suppressHydrationWarning>
      <head>
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
