import Link from 'next/link'
import type { Lang } from '@/lib/games'
import { i18n } from '@/lib/games'

interface SiteHeaderProps {
  lang: Lang
  gameSlug?: string
}

export function SiteHeader({ lang, gameSlug }: SiteHeaderProps) {
  const t = i18n[lang]

  const enHref = gameSlug ? `/en/${gameSlug}` : '/en'
  const ruHref = gameSlug ? `/ru/${gameSlug}` : '/ru'

  return (
    <header className="site-header" role="banner">
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1rem',
          height: '58px',
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
          style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}
        >
          {/* Gold coin icon */}
          <span
            aria-hidden="true"
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 55%, #8a6d14 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(201,162,39,0.45)',
              flexShrink: 0,
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
                stroke="#0a0a0b"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            style={{
              fontWeight: 800,
              fontSize: '1.0625rem',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}
          >
            <span style={{ color: 'var(--color-text-primary)' }}>Crash</span>
            <span
              style={{
                background: 'linear-gradient(90deg, var(--color-gold-light), var(--color-gold))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Games
            </span>
          </span>
        </Link>

        {/* Nav + Lang switcher */}
        <nav
          aria-label="Primary navigation"
          style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
        >
          <Link
            href={`/${lang}`}
            style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
              padding: '0.375rem 0.75rem',
              borderRadius: '0.375rem',
              minHeight: '36px',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.15s',
            }}
          >
            {t.games}
          </Link>

          {/* Divider */}
          <span
            aria-hidden="true"
            style={{ width: 1, height: 20, background: 'var(--color-border-gold)', opacity: 0.6 }}
          />

          {/* Language switcher */}
          <div
            role="navigation"
            aria-label="Language switcher"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
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

      {/* Gold bottom line */}
      <div
        aria-hidden="true"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-gold-dim) 30%, var(--color-gold) 50%, var(--color-gold-dim) 70%, transparent)',
          opacity: 0.6,
        }}
      />
    </header>
  )
}
