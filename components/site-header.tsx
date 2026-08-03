import Link from 'next/link'
import type { Lang } from '@/lib/games'
import { i18n } from '@/lib/games'

interface SiteHeaderProps {
  lang: Lang
  /** Current game slug — keeps language switch on the same game page */
  gameSlug?: string
  /** When true, language switch stays inside /guides */
  section?: 'guides'
  /** Current guide id — keeps language switch on the same guide */
  guideSlug?: string
  /** Game-guides hub under /guides/games */
  gameGuides?: boolean
  /** Current game-guide article id */
  gameGuideSlug?: string
}

export function SiteHeader({ lang, gameSlug, section, guideSlug, gameGuides, gameGuideSlug }: SiteHeaderProps) {
  const t = i18n[lang]

  let enHref = '/'
  let ruHref = '/ru'

  if (gameGuideSlug) {
    enHref = `/en/guides/games/${gameGuideSlug}`
    ruHref = `/ru/guides/games/${gameGuideSlug}`
  } else if (gameGuides) {
    enHref = '/en/guides/games'
    ruHref = '/ru/guides/games'
  } else if (guideSlug) {
    enHref = `/en/guides/${guideSlug}`
    ruHref = `/ru/guides/${guideSlug}`
  } else if (section === 'guides') {
    enHref = '/en/guides'
    ruHref = '/ru/guides'
  } else if (gameSlug) {
    enHref = `/en/${gameSlug}`
    ruHref = `/ru/${gameSlug}`
  }

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
              className={`site-header__nav-link${section === 'guides' || guideSlug ? ' is-active' : ''}`}
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
