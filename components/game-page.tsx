import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { GameCard } from '@/components/game-card'
import { GameViewer } from '@/components/game-viewer'
import { games, getGame, getSeoText, getKeywords, formatSeoText, CTA_URL, i18n } from '@/lib/games'
import type { Lang, Game } from '@/lib/games'
import { notFound } from 'next/navigation'
import { GUIDES } from '@/lib/guides-data'

interface GamePageProps {
  slug: string
  lang: Lang
}

function buildJsonLd(game: Game, lang: Lang): string {
  const isEn = lang === 'en'
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${game.name} Demo`,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: isEn
      ? `Play ${game.name} demo free — no registration needed. Developed by ${game.provider}.`
      : `Играть в ${game.name} демо бесплатно — без регистрации. Разработчик: ${game.provider}.`,
    publisher: { '@type': 'Organization', name: game.provider },
    image: game.avatar,
    url: `https://1weapp.online/${lang}/${game.slug}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '284',
      bestRating: '5',
      worstRating: '1',
    },
  })
}

export function GamePage({ slug, lang }: GamePageProps) {
  const game = getGame(slug)
  if (!game) notFound()

  const t = i18n[lang]
  const isEn = lang === 'en'
  const seoText = getSeoText(game, lang)
  const keywords = getKeywords(game, lang)
  const formattedSeo = formatSeoText(seoText)
  const jsonLd = buildJsonLd(game, lang)

  const related = games.filter((g) => g.slug !== slug).slice(0, 4)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <SiteHeader lang={lang} gameSlug={slug} />

      <main id="main-content" role="main" style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem 1rem 4rem' }}>

        {/* ── Breadcrumbs ── */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
          <ol className="breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href={`/${lang}`} itemProp="item">
                <span itemProp="name">{t.breadcrumbHome}</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li aria-hidden="true" className="breadcrumb-sep">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" aria-current="page" style={{ color: 'var(--color-text-primary)' }}>
                {game.name}
              </span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── Game hero row ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            padding: '1rem 1.25rem',
            background: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border-gold)',
          }}
        >
          {/* Avatar — full image visible */}
          <div
            style={{
              width: 68,
              height: 68,
              flexShrink: 0,
              borderRadius: '10px',
              overflow: 'hidden',
              background: '#0d0d0f',
              border: '2px solid var(--color-gold-dim)',
              boxShadow: '0 0 10px rgba(201,162,39,0.25)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src={game.avatar}
              alt={game.name}
              width={68}
              height={68}
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              priority
              unoptimized
              crossOrigin="anonymous"
            />
          </div>
          <div style={{ minWidth: 0 }}>
            <span
              style={{
                fontSize: '0.6875rem',
                color: 'var(--color-gold-dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                display: 'block',
                marginBottom: '0.25rem',
                fontWeight: 600,
              }}
            >
              {game.provider}
            </span>
            <h1 style={{ color: 'var(--color-text-primary)', textWrap: 'balance', fontSize: 'clamp(1.25rem, 3vw, 1.875rem)' }}>
              {game.name}{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, var(--color-gold-light), var(--color-gold))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: 400,
                }}
              >
                {t.demo}
              </span>
            </h1>
          </div>
        </div>

        {/* ── Game iframe with fullscreen button ── */}
        {game.iframeUrl ? (
          <GameViewer
            iframeUrl={game.iframeUrl}
            gameName={game.name}
            demoBadge={t.demo}
            fullscreenLabel={isEn ? 'Full Screen' : 'На весь экран'}
            closeLabel={isEn ? 'Exit' : 'Выйти'}
          />
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: 'clamp(2rem, 5vw, 3rem) 1rem',
              background: 'var(--color-bg-surface)',
              borderRadius: 'var(--radius-card)',
              border: '1px solid var(--color-border-gold)',
              marginBottom: '2rem',
            }}
          >
            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: '1rem',
                marginBottom: '1.25rem',
              }}
            >
              {isEn
                ? `${game.name} demo is coming soon. Play now for real prizes!`
                : `Демо ${game.name} появится скоро. Играйте прямо сейчас!`}
            </p>
            <a
              href={CTA_URL}
              rel="noopener noreferrer nofollow sponsored"
              target="_blank"
              className="btn-cta"
              aria-label={t.playReal}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              {t.playReal}
            </a>
          </div>
        )}

        {/* ── CTA block — only shown when a demo iframe is present ── */}
        {game.iframeUrl && (
          <div
            style={{
              textAlign: 'center',
              margin: '2rem 0',
              padding: 'clamp(1.5rem, 4vw, 2.5rem) 1rem',
              background: 'var(--color-bg-surface)',
              borderRadius: 'var(--radius-card)',
              border: '1px solid var(--color-border-gold)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 50% 100%, rgba(201,162,39,0.07) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <p
              style={{
                color: 'var(--color-text-secondary)',
                marginBottom: '1.25rem',
                fontSize: '1rem',
                position: 'relative',
              }}
            >
              {isEn
                ? 'Ready to win real prizes? Join now!'
                : 'Готовы выиграть настоящие призы? Присоединяйтесь!'}
            </p>
            <a
              href={CTA_URL}
              rel="noopener noreferrer nofollow sponsored"
              target="_blank"
              className="btn-cta"
              aria-label={t.playReal}
              style={{ position: 'relative' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              {t.playReal}
            </a>
            <p style={{ marginTop: '0.875rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', position: 'relative' }}>
              {isEn ? '18+ · Gamble responsibly · T&C apply' : '18+ · Играйте ответственно · Применяются условия'}
            </p>
          </div>
        )}

        {/* ── Keyword tags ── */}
        {keywords.length > 0 && (
          <div
            aria-label={isEn ? 'Related keywords' : 'Связанные ключевые слова'}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}
          >
            {keywords.map((kw) => (
              <span key={kw} className="badge-gold" role="term">{kw}</span>
            ))}
          </div>
        )}

        {/* ── SEO text ── */}
        <article
          aria-label={isEn ? 'Game description' : 'Описание игры'}
          style={{
            background: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border-gold)',
            padding: 'clamp(1rem, 3vw, 2rem)',
            marginBottom: '2.5rem',
          }}
        >
          <h2 style={{ color: 'var(--color-text-primary)', marginBottom: '1.25rem' }}>
            {isEn ? `About ${game.name} — Full Guide` : `О ${game.name} — Полное руководство`}
          </h2>
          <hr className="gold-line" style={{ marginBottom: '1.25rem' }} />
          <div className="seo-body" dangerouslySetInnerHTML={{ __html: formattedSeo }} />
        </article>

        {/* ── Game info section — big and prominent ── */}
        <section
          aria-label={isEn ? 'Game details' : 'Детали игры'}
          style={{
            background: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border-gold)',
            padding: 'clamp(2rem, 5vw, 3rem)',
            marginBottom: '3rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle glow background */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 600px 300px at 50% 0%, rgba(201,162,39,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          
          <h2 style={{ color: 'var(--color-gold)', marginBottom: 'clamp(1.25rem, 3vw, 1.75rem)', fontSize: 'clamp(0.875rem, 2vw, 1.125rem)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, position: 'relative' }}>
            {isEn ? '📋 Game Details' : '📋 Информация об игре'}
          </h2>

          {/* Info grid — 5 items in row on desktop, responsive on mobile */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 'clamp(1.25rem, 3vw, 2rem)', position: 'relative' }}>
            {/* Game Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                {isEn ? 'Title' : 'Название'}
              </span>
              <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
                {game.name}
              </span>
            </div>

            {/* Provider */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                {t.provider}
              </span>
              <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 700, color: 'var(--color-gold-light)', lineHeight: 1.2 }}>
                {game.provider}
              </span>
            </div>

            {/* Mode */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                {isEn ? 'Mode' : 'Режим'}
              </span>
              <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 700, color: 'var(--color-gold)', lineHeight: 1.2 }}>
                {isEn ? 'Free Demo' : 'Демо'}
              </span>
            </div>

            {/* Registration */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                {isEn ? 'Sign Up' : 'Вход'}
              </span>
              <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 700, color: 'var(--color-gold)', lineHeight: 1.2 }}>
                {isEn ? 'None' : 'Не надо'}
              </span>
            </div>

            {/* Mobile */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                📱 {isEn ? 'Mobile' : 'Мобильная'}
              </span>
              <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: 700, color: 'var(--color-gold-light)', lineHeight: 1.2 }}>
                {isEn ? 'Yes' : 'Да'}
              </span>
            </div>
          </div>
        </section>

        {/* ── Related games ── */}
        {related.length > 0 && (
          <section aria-label={isEn ? 'More games' : 'Другие игры'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <h2 style={{ color: 'var(--color-text-primary)' }}>
                {isEn ? 'More Games' : 'Больше игр'}
              </h2>
              <Link
                href={`/${lang}`}
                style={{ fontSize: '0.8125rem', color: 'var(--color-gold-dim)', marginLeft: 'auto' }}
              >
                {isEn ? 'View all →' : 'Все игры →'}
              </Link>
            </div>
            <div className="games-grid">
              {related.map((g) => (
                <GameCard key={g.slug} game={g} lang={lang} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ── Guides list ── */}
      <section className="game-guides" aria-labelledby="game-guides-heading">
        <div className="game-guides__inner">
          <div className="game-guides__header">
            <h2 id="game-guides-heading" className="game-guides__title">
              {isEn ? 'Strategy Guides' : 'Стратегические гайды'}
            </h2>
            <Link href={`/${lang}/guides`} className="game-guides__all-link">
              {isEn ? 'All guides →' : 'Все гайды →'}
            </Link>
          </div>
          <p className="game-guides__sub">
            {isEn
              ? 'Learn game mechanics, RTP, bonuses and responsible gambling'
              : 'Механики игр, RTP, бонусы и ответственная игра'}
          </p>
          <div className="game-guides__grid">
            {GUIDES.map((guide) => (
              <Link
                key={guide.id}
                href={`/${lang}/guides/${guide.id}`}
                className="game-guides__card"
              >
                <span className="game-guides__card-icon" aria-hidden="true">{guide.icon}</span>
                <span className="game-guides__card-text">
                  <span className="game-guides__card-title">
                    {isEn ? guide.titleEn : guide.titleRu}
                  </span>
                  <span className="game-guides__card-tag">
                    {isEn ? guide.tagEn : guide.tagRu}
                  </span>
                </span>
                <svg className="game-guides__card-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />
    </>
  )
}
