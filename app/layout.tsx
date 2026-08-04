import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  // String title (no template) — child pages already include `| 1weapp` in their titles.
  title: '1weapp — Play Free Crash & Slot Games',
  description:
    'Play free demo crash games and slots online. No registration, no deposit required. Enjoy Lucky Jet, Gates of Olympus, Sweet Bonanza, Mines and 50+ more games.',
  keywords: [
    'crash games',
    'slot games',
    'online casino',
    'free demo games',
    'Lucky Jet',
    'Gates of Olympus',
    'Sweet Bonanza',
    'crash game demo',
    'play for free',
    'no registration',
    'online gambling games',
  ],
  metadataBase: new URL('https://www.1weapp.online'),
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ru_RU',
    siteName: '1weapp',
    images: [
      {
        url: '/og-picture.jpg',
        width: 1200,
        height: 630,
        alt: '1weapp - Play Free Demo Games',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0908',
  colorScheme: 'dark',
}

/**
 * Passthrough root — locale / home segment layouts own <html lang>.
 * Avoids headers() so catalog pages stay statically generable.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
