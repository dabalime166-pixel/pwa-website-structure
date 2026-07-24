import Link from 'next/link'
import type { Lang } from '@/lib/games'
import { i18n } from '@/lib/games'

interface SiteHeaderProps {
  lang: Lang
  gameSlug?: string
}

export function SiteHeader({ lang, gameSlug }: SiteHeaderProps) {
  const t = i18n[lang]

  const enHref = gameSlug ? `/en/${gameSlug}` : '/'
  const ruHref = gameSlug ? `/ru/${gameSlug}` : '/ru'
  const enGuidesHref = '/en/guides'
  const ruGuidesHref = '/ru/guides'
  const homeHref = lang === 'en' ? '/' : '/ru'

  return (
    <header className="site-header" role="banner">
      <div className="site-header__inner">
        <Link href={homeHref} aria-label="1weapp — Home" className="site-header__logo">
          <span aria-hidden="true" className="site-header__logo-mark">
            1
          </span>
          <span className="site-header__logo-text">
            <span className="site-header__logo-plain">1we</span>
            <span className="site-header__logo-accent">app</span>
          </span>
        </Link>

        <div className="site-header__right">
          <nav aria-label="Primary navigation" className="site-header__nav">
            <Link href={homeHref} className="site-header__nav-link">
              {t.games}
            </Link>
            <Link
              href={lang === 'en' ? enGuidesHref : ruGuidesHref}
              className="site-header__nav-link"
            >
              {lang === 'en' ? 'Guides' : 'Гайды'}
            </Link>
          </nav>

          <div
            role="navigation"
            aria-label="Language switcher"
            className="site-header__lang"
          >
            <Link
              href={enHref}
              hrefLang="en"
              lang="en"
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              aria-current={lang === 'en' ? 'true' : undefined}
            >
              EN
            </Link>
            <Link
              href={ruHref}
              hrefLang="ru"
              lang="ru"
              className={`lang-btn ${lang === 'ru' ? 'active' : ''}`}
              aria-current={lang === 'ru' ? 'true' : undefined}
            >
              RU
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
