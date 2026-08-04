import type { Metadata, Viewport } from 'next'
import { Manrope, Unbounded } from 'next/font/google'
import './globals.css'
// Импортируем компонент для вставки аналитики
import Script from 'next/script'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
})

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-display',
  preload: false,
  weight: ['500', '700'],
})

export const metadata: Metadata = {
  title: {
    default: '1weapp — Play Free Crash & Slot Games',
    template: '%s | 1weapp',
  },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#0a0908]">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X4YHR9MBCQ"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X4YHR9MBCQ', {
              page_path: window.location.pathname,
              page_title: document.title,
            });
          `}
        </Script>

        <Script id="yandex-metrika" strategy="lazyOnload">
          {`
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106419141', 'ym');

            ym(106419141, 'init', {
                ssr: true,
                webvisor: false,
                clickmap: true,
                ecommerce: "dataLayer",
                referrer: document.referrer,
                url: location.href,
                accurateTrackBounce: true,
                trackLinks: true
            });
          `}
        </Script>
      </head>
      
      <body className={`${manrope.variable} ${unbounded.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {/* Резервный пиксель Яндекс Метрики на случай отключенного JS у юзера */}
        <noscript>
          <div>
            <img 
              src="https://mc.yandex.ru/watch/106419141" 
              style={{ position: 'absolute', left: '-9999px' }} 
              alt="" 
            />
          </div>
        </noscript>

        {children}
      </body>
    </html>
  )
}
