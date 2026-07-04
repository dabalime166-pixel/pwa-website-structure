import Link from 'next/link'
import type { Lang } from '@/lib/games'
import { i18n } from '@/lib/games'

interface SiteHeaderProps {
  lang: Lang
  /** The slug of the current game page (if on game page), used to build alternate links */
  gameSlug?: string
}

export function SiteHeader({ lang, gameSlug }: SiteHeaderProps) {
  const t = i18n[lang]

  // Build hreflang alternate URLs
  const enHref = gameSlug ? `/en/${gameSlug}` : '/en'
  const ruHref = gameSlug ? `/ru/${gameSlug}` : '/ru'

  return (
    <header className="site-header" role="banner">
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1rem',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {/* Logo */}
        <Link
          href={`/${lang}`}
          aria-label="CrashGames Demo — Home"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #00e5ff 0%, #0080ff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            style={{
              fontWeight: 700,
              fontSize: '1.0625rem',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            Crash<span style={{ color: 'var(--color-neon)' }}>Games</span>
          </span>
        </Link>

        {/* Nav + Lang switcher */}
        <nav
          aria-label="Primary navigation"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Link
            href={`/${lang}`}
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              padding: '0.375rem 0.625rem',
              borderRadius: '0.375rem',
              minHeight: '36px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {t.games}
          </Link>

          {/* Language switcher */}
          <div
            role="navigation"
            aria-label="Language switcher"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginLeft: '0.5rem' }}
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
        </nav>
      </div>
    </header>
  )
}
