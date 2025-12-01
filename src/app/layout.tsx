import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import Header from './components/Layout/Header'
import { ThemeProvider } from 'next-themes'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/ScrollToTop'

const DMSans = DM_Sans({
  variable: '--font-DM-Sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Inoteqia',
  description: 'Inoteqia Academy – Tunisian Academy of Artificial Intelligence and Future Technologies',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${DMSans.variable} antialiased dark:bg-darkmode`}>
        <ThemeProvider
          attribute='class'
          enableSystem={false}
          defaultTheme='light'>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
