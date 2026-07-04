import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'CrashGames Demo — Play Free Crash & Slot Games',
    template: '%s | CrashGames Demo',
  },
  description:
    'Play crash games and slots in free demo mode. No registration needed. Lucky Jet, Gates of Olympus, Sweet Bonanza and more.',
  metadataBase: new URL('https://crashgames.demo'),
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ru_RU',
    siteName: 'CrashGames Demo',
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
  themeColor: '#0a0a0b',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#0a0a0b]">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
