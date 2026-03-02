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
    default: 'INOTEQIA Academy – Académie Tunisienne de l\'IA et des Technologies du Futur',
    template: '%s | INOTEQIA Academy',
  },
  description:
    'INOTEQIA Academy – Académie Tunisienne de l\'Intelligence Artificielle et des Technologies du Futur. Formation IA, robotique et programmation pour collégiens et lycéens à Tunis.',
  keywords: [
    'INOTEQIA Academy',
    'académie IA Tunisie',
    'formation intelligence artificielle',
    'formation IA enfants',
    'robotique Tunisie',
    'programmation enfants',
    'bootcamp IA',
    'formation technologique Tunisie',
  ],
  authors: [{ name: 'INOTEQIA Academy' }],
  creator: 'INOTEQIA Academy',
  publisher: 'INOTEQIA Academy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/images/logo/inoteqia-Academy-logo-v-White-color-01.png',
        type: 'image/png',
      },
    ],
    shortcut: '/images/logo/inoteqia-Academy-logo-v-White-color-01.png',
    apple: '/images/logo/inoteqia-Academy-logo-v-White-color-01.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://inoteqia.com',
    siteName: 'INOTEQIA Academy',
    title: 'INOTEQIA Academy – Académie Tunisienne de l\'IA',
    description:
      'Formation IA, robotique et programmation pour collégiens et lycéens à Tunis. Programmes annuels et bootcamps.',
    images: [
      {
        url: '/images/banner/image.png',
        width: 1200,
        height: 630,
        alt: 'INOTEQIA Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INOTEQIA Academy – Académie Tunisienne de l\'IA',
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
