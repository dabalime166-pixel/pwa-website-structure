import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { GameCard } from '@/components/game-card'
import { games, i18n, CTA_URL } from '@/lib/games'
import type { Lang } from '@/lib/games'

interface HomePageProps {
  lang: Lang
}

export function HomePage({ lang }: HomePageProps) {
  const t = i18n[lang]
  const isEn = lang === 'en'

  return (
    <>
      <SiteHeader lang={lang} />

      <main id="main-content" role="main">

        {/* ── Hero ── */}
        <section
          aria-label={t.heroTitle}
          style={{
            padding: 'clamp(3rem, 8vw, 5rem) 1rem clamp(2.5rem, 6vw, 4rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Radial gold glow */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-30%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '700px',
              height: '500px',
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse, rgba(201,162,39,0.09) 0%, rgba(201,162,39,0.03) 45%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', maxWidth: '680px', margin: '0 auto' }}>
            <span className="badge-gold" style={{ marginBottom: '1.25rem', display: 'inline-block' }}>
              {isEn ? 'Free to Play — No Registration' : 'Бесплатно — Без регистрации'}
            </span>

            <h1
              style={{
                marginBottom: '0.875rem',
                textWrap: 'balance',
              }}
            >
              <span style={{ color: 'var(--color-text-primary)' }}>{t.heroTitle}{' '}</span>
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 50%, #c17f15 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {isEn ? 'Online' : 'Онлайн'}
              </span>
            </h1>

            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: '1rem',
                marginBottom: '2rem',
                lineHeight: 1.7,
              }}
            >
              {t.heroSub}
            </p>

            <a
              href={CTA_URL}
              rel="noopener noreferrer sponsored"
              target="_blank"
              className="btn-cta"
              aria-label={t.playReal}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              {t.playReal}
            </a>

            <p style={{ marginTop: '0.875rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              {isEn ? '18+ · Gamble responsibly · T&C apply' : '18+ · Играйте ответственно · Применяются условия'}
            </p>
          </div>
        </section>

        {/* Gold divider */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <hr className="gold-line" />
        </div>

        {/* ── Games Grid ── */}
        <section
          aria-label={isEn ? 'Game catalog' : 'Каталог игр'}
          style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1rem 4rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <h2 style={{ color: 'var(--color-text-primary)' }}>
              {isEn ? 'All Games' : 'Все игры'}
            </h2>
            <span
              style={{
                color: 'var(--color-gold-dim)',
                fontWeight: 500,
                fontSize: '0.9375rem',
              }}
            >
              {games.length}
            </span>
          </div>

          <div className="games-grid" role="list" aria-label={isEn ? 'Games list' : 'Список игр'}>
            {games.map((game) => (
              <div key={game.slug} role="listitem">
                <GameCard game={game} lang={lang} />
              </div>
            ))}
          </div>

          {/* SEO section */}
          <div
            style={{
              marginTop: '3rem',
              padding: 'clamp(1.25rem, 3vw, 2rem)',
              background: 'var(--color-bg-surface)',
              borderRadius: 'var(--radius-card)',
              border: '1px solid var(--color-border-gold)',
            }}
          >
            <h2
              style={{
                color: 'var(--color-text-primary)',
                marginBottom: '0.875rem',
              }}
            >
              {isEn
                ? 'Play Free Demo Games — No Registration'
                : 'Играть в демо-игры бесплатно — без регистрации'}
            </h2>
            <p className="seo-body" style={{ marginBottom: 0 }}>
              {isEn
                ? 'Our platform provides instant access to the best crash games and slots in demo mode. Try Lucky Jet, Gates of Olympus, Sweet Bonanza, Big Bass Bonanza, Wolf Gold, Starlight Princess, Sugar Rush and more — all completely free, with no deposit required. Mobile-first design means every game works flawlessly on any smartphone or tablet.'
                : 'Наша платформа предоставляет мгновенный доступ к лучшим краш-играм и слотам в демо-режиме. Попробуйте Lucky Jet, Gates of Olympus, Sweet Bonanza, Big Bass Bonanza, Wolf Gold, Starlight Princess, Sugar Rush и другие — полностью бесплатно, без депозита. Mobile-first дизайн гарантирует идеальную работу на любом смартфоне или планшете.'}
            </p>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  )
}
