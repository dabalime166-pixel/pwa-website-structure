import Link from 'next/link'
import type { Lang } from '@/lib/games'
import { providersIndexHref } from '@/lib/providers'

interface SiteFooterProps {
  lang: Lang
}

export function SiteFooter({ lang }: SiteFooterProps) {
  const isEn = lang === 'en'
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__line" aria-hidden="true" />
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div>
            <p className="site-footer__brand">
              <span className="site-footer__brand-plain">1we</span>
              <span className="site-footer__brand-accent">app</span>
            </p>
            <p className="site-footer__blurb">
              {isEn
                ? 'Free demo versions of crash games and slots. No real money involved. For entertainment only. 18+ only.'
                : 'Бесплатные демо-версии краш-игр и слотов. Без реальных денег. Только для развлечения. 18+.'}
            </p>
          </div>
          <div className="site-footer__navs">
            <nav aria-label="Language selection">
              <ul className="site-footer__langs">
                <li>
                  <Link href="/" className={lang === 'en' ? 'is-active' : undefined}>
                    EN
                  </Link>
                </li>
                <li>
                  <Link href="/ru" className={lang === 'ru' ? 'is-active' : undefined}>
                    RU
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Explore">
              <ul className="site-footer__legal">
                <li>
                  <Link href={providersIndexHref(lang)}>
                    {isEn ? 'Providers' : 'Провайдеры'}
                  </Link>
                </li>
                <li>
                  <Link href={isEn ? '/en/guides' : '/ru/guides'}>
                    {isEn ? 'Guides' : 'Гайды'}
                  </Link>
                </li>
                <li>
                  <Link href={isEn ? '/en/reviews' : '/ru/reviews'}>
                    {isEn ? 'Reviews' : 'Обзоры'}
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Legal and compliance">
              <ul className="site-footer__legal">
                <li>
                  <Link href={isEn ? '/en/terms' : '/ru/terms'}>
                    {isEn ? 'Terms of Service' : 'Условия обслуживания'}
                  </Link>
                </li>
                <li>
                  <Link href={isEn ? '/en/privacy' : '/ru/privacy'}>
                    {isEn ? 'Privacy Policy' : 'Политика конфиденциальности'}
                  </Link>
                </li>
                <li>
                  <Link href={isEn ? '/en/disclaimer' : '/ru/disclaimer'}>
                    {isEn ? 'Disclaimer' : 'Дисклеймер'}
                  </Link>
                </li>
                <li>
                  <Link href={isEn ? '/en/responsible-gaming' : '/ru/responsible-gaming'}>
                    {isEn ? 'Responsible Gaming' : 'Ответственная игра'}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="site-footer__rule" aria-hidden="true" />

        <p className="site-footer__rg">
          <a
            href="https://www.begambleaware.org/"
            rel="noopener noreferrer nofollow"
            target="_blank"
          >
            BeGambleAware
          </a>
          <span aria-hidden="true"> · </span>
          18+
        </p>

        <p className="site-footer__copy">
          &copy; {year} 1weapp. {isEn ? 'All rights reserved.' : 'Все права защищены.'}
        </p>
      </div>
    </footer>
  )
}
