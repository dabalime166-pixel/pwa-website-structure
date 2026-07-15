import Link from 'next/link'
import type { Lang } from '@/lib/games'
import { i18n } from '@/lib/games'

interface SiteHeaderProps {
  lang: Lang
  gameSlug?: string
}

export function SiteHeader({ lang, gameSlug }: SiteHeaderProps) {
  const t = i18n[lang]

  // Language switcher links — always preserve locale prefix
  // Game pages: /en/lucky-jet ↔ /ru/lucky-jet
  // Home pages: / ↔ /ru
  const enHref = gameSlug ? `/en/${gameSlug}` : '/'
  const ruHref = gameSlug ? `/ru/${gameSlug}` : '/ru'
  
  // ИСПРАВЛЕНИЕ 2: Пути для разделов гайдов.
  // Так как для EN корень чистый, гайды лежат по адресу '/guides'
  const enGuidesHref = '/en/guides'
  const ruGuidesHref = '/ru/guides'

  // ИСПРАВЛЕНИЕ 3: Базовый URL для логотипа и главной страницы
  const homeHref = lang === 'en' ? '/' : '/ru'

  return (
    <header className="site-header" role="banner">
      <div className="site-header__inner">
        {/* Logo */}
        <Link
          href={homeHref}
          aria-label="1weapp — Home"
          className="site-header__logo"
        >
          <span
            aria-hidden="true"
            className="site-header__logo-icon"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                stroke="#0a0a0b"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="site-header__logo-text">
            <span style={{ color: 'var(--color-text-primary)' }}>1we</span>
            <span
              style={{
                background: 'linear-gradient(90deg, var(--color-gold-light), var(--color-gold))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              app
            </span>
          </span>
        </Link>

        {/* Right side: nav + lang switcher */}
        <div className="site-header__right">
          {/* Nav links */}
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

          {/* Divider — hidden on small screens */}
          <span aria-hidden="true" className="site-header__divider" />

          {/* Language switcher */}
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

      {/* Gold bottom line */}
      <div
        aria-hidden="true"
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, var(--color-gold-dim) 30%, var(--color-gold) 50%, var(--color-gold-dim) 70%, transparent)',
          opacity: 0.6,
        }}
      />
    </header>
  )
}
