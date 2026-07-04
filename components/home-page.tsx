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

  const metaTitle = t.metaTitleHome
  const canonicalBase = `https://crashgames.demo/${lang}`

  return (
    <>
      {/* hreflang in <head> is handled by generateMetadata in each route */}
      <SiteHeader lang={lang} />

      <main id="main-content" role="main">
        {/* ── Hero ── */}
        <section
          aria-label={t.heroTitle}
          style={{
            background:
              'linear-gradient(180deg, #0d0e12 0%, #12141c 60%, #0d0e12 100%)',
            padding: '3.5rem 1rem 2.5rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle neon glow blob */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '400px',
              borderRadius: '50%',
              background:
                'radial-gradient(ellipse, rgba(0,229,255,0.07) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
            <span className="badge-neon" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              {isEn ? 'Free to Play' : 'Бесплатно'}
            </span>
            <h1
              style={{
                color: 'var(--color-text-primary)',
                marginBottom: '0.75rem',
                textWrap: 'balance',
              }}
            >
              {t.heroTitle}{' '}
              <span style={{ color: 'var(--color-neon)' }}>
                {isEn ? 'Online' : 'Онлайн'}
              </span>
            </h1>
            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: '1rem',
                marginBottom: '1.75rem',
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
              {t.playReal}
            </a>
          </div>
        </section>

        {/* ── Games Grid ── */}
        <section
          aria-label={isEn ? 'Game catalog' : 'Каталог игр'}
          style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1rem 4rem' }}
        >
          <h2
            style={{
              color: 'var(--color-text-primary)',
              marginBottom: '1.5rem',
              fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
            }}
          >
            {isEn ? 'All Games' : 'Все игры'}{' '}
            <span style={{ color: 'var(--color-text-muted)', fontWeight: 400, fontSize: '0.9em' }}>
              ({games.length})
            </span>
          </h2>

          <div className="games-grid" role="list" aria-label={isEn ? 'Games list' : 'Список игр'}>
            {games.map((game) => (
              <div key={game.slug} role="listitem">
                <GameCard game={game} lang={lang} />
              </div>
            ))}
          </div>

          {/* LSI keyword paragraph — hidden visually but read by crawlers */}
          <div
            style={{
              marginTop: '3rem',
              padding: '1.5rem',
              background: 'var(--color-bg-surface)',
              borderRadius: 'var(--radius-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h2 style={{ color: 'var(--color-text-primary)', marginBottom: '0.75rem' }}>
              {isEn ? 'Play Free Demo Games — No Registration' : 'Играть в демо-игры бесплатно — без регистрации'}
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
