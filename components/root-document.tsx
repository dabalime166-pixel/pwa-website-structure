import type { Lang } from '@/lib/games'
import Script from 'next/script'

/** Shared <html>/<body> shell so EN/RU layouts can set lang without headers(). */
export function RootDocument({
  lang,
  fontClassName,
  children,
}: {
  lang: Lang
  fontClassName: string
  children: React.ReactNode
}) {
  return (
    <html lang={lang} className="bg-[#0a0908]">
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

      <body className={`${fontClassName} font-sans antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/106419141"
              style={{ position: 'absolute', left: '-9999px' }}
              alt="Yandex Metrika"
            />
          </div>
        </noscript>

        {children}
      </body>
    </html>
  )
}
