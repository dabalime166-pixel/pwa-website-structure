import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { GameCard } from '@/components/game-card'
import { games, getGame, getSeoText, getKeywords, formatSeoText, CTA_URL, i18n } from '@/lib/games'
import type { Lang, Game } from '@/lib/games'
import { notFound } from 'next/navigation'

interface GamePageProps {
  slug: string
  lang: Lang
}

/** Build structured data JSON-LD for Schema.org SoftwareApplication */
function buildJsonLd(game: Game, lang: Lang): string {
  const isEn = lang === 'en'
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${game.name} Demo`,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: isEn
      ? `Play ${game.name} demo free — no registration needed. Developed by ${game.provider}.`
      : `Играть в ${game.name} демо бесплатно — без регистрации. Разработчик: ${game.provider}.`,
    publisher: {
      '@type': 'Organization',
      name: game.provider,
    },
    image: game.avatar,
    url: `https://crashgames.demo/${lang}/${game.slug}`,
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

  // Related games (up to 4, excluding current)
  const related = games.filter((g) => g.slug !== slug).slice(0, 4)

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

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
              <span
                itemProp="name"
                aria-current="page"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {game.name}
              </span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* ── Game hero row ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '1rem',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <Image
            src={game.avatar}
            alt={`${game.name} avatar`}
            width={64}
            height={64}
            style={{ borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
            priority
          />
          <div>
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '0.2rem',
              }}
            >
              {game.provider}
            </span>
            <h1 style={{ color: 'var(--color-text-primary)', textWrap: 'balance' }}>
              {game.name}{' '}
              <span style={{ color: 'var(--color-neon)', fontWeight: 400 }}>
                {t.demo}
              </span>
            </h1>
          </div>
        </div>

        {/* ── Iframe game window ── */}
        <div className="game-frame-wrapper" role="region" aria-label={`${game.name} game window`}>
          <iframe
            src={game.iframeUrl}
            title={`${game.name} ${t.demo}`}
            allow="autoplay; fullscreen"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>

        {/* ── CTA button ── */}
        <div
          style={{
            textAlign: 'center',
            margin: '2rem 0',
            padding: '2rem 1rem',
            background: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', fontSize: '0.9375rem' }}>
            {isEn
              ? 'Ready to win real prizes? Join now!'
              : 'Готовы выиграть настоящие призы? Присоединяйтесь!'}
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
          <p
            style={{
              marginTop: '0.75rem',
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
            }}
          >
            {isEn ? '18+ · Gamble responsibly · T&C apply' : '18+ · Играйте ответственно · Применяются условия'}
          </p>
        </div>

        {/* ── Keyword tags ── */}
        {keywords.length > 0 && (
          <div
            aria-label={isEn ? 'Related keywords' : 'Связанные ключевые слова'}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '2rem',
            }}
          >
            {keywords.map((kw) => (
              <span key={kw} className="badge-neon" role="term">
                {kw}
              </span>
            ))}
          </div>
        )}

        {/* ── SEO text body ── */}
        <article
          aria-label={isEn ? 'Game description' : 'Описание игры'}
          style={{
            background: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border)',
            padding: 'clamp(1rem, 3vw, 2rem)',
            marginBottom: '3rem',
          }}
        >
          <h2 style={{ color: 'var(--color-text-primary)', marginBottom: '1.25rem' }}>
            {isEn
              ? `About ${game.name} — Full Guide`
              : `О ${game.name} — Полное руководство`}
          </h2>
          <div
            className="seo-body"
            dangerouslySetInnerHTML={{ __html: formattedSeo }}
          />
        </article>

        {/* ── Game info table ── */}
        <section
          aria-label={isEn ? 'Game details' : 'Детали игры'}
          style={{
            background: 'var(--color-bg-card)',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--color-border)',
            padding: '1.25rem',
            marginBottom: '3rem',
          }}
        >
          <h2 style={{ color: 'var(--color-text-primary)', marginBottom: '1rem', fontSize: '1.0625rem' }}>
            {isEn ? 'Game Info' : 'Информация об игре'}
          </h2>
          <dl
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '0.625rem 1.5rem',
              fontSize: '0.875rem',
            }}
          >
            <dt style={{ color: 'var(--color-text-muted)' }}>{isEn ? 'Game' : 'Игра'}</dt>
            <dd style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{game.name}</dd>

            <dt style={{ color: 'var(--color-text-muted)' }}>{t.provider}</dt>
            <dd style={{ color: 'var(--color-text-primary)' }}>{game.provider}</dd>

            <dt style={{ color: 'var(--color-text-muted)' }}>{isEn ? 'Mode' : 'Режим'}</dt>
            <dd style={{ color: 'var(--color-neon)' }}>{isEn ? 'Free Demo' : 'Бесплатное демо'}</dd>

            <dt style={{ color: 'var(--color-text-muted)' }}>{isEn ? 'Registration' : 'Регистрация'}</dt>
            <dd style={{ color: 'var(--color-text-primary)' }}>{isEn ? 'Not required' : 'Не требуется'}</dd>

            <dt style={{ color: 'var(--color-text-muted)' }}>{isEn ? 'Mobile' : 'Мобильное'}</dt>
            <dd style={{ color: 'var(--color-text-primary)' }}>{isEn ? 'Optimized' : 'Оптимизировано'}</dd>
          </dl>
        </section>

        {/* ── Related games ── */}
        {related.length > 0 && (
          <section aria-label={isEn ? 'More games' : 'Другие игры'}>
            <h2 style={{ color: 'var(--color-text-primary)', marginBottom: '1.25rem' }}>
              {isEn ? 'More Games' : 'Больше игр'}
            </h2>
            <div className="games-grid">
              {related.map((g) => (
                <GameCard key={g.slug} game={g} lang={lang} />
              ))}
            </div>
          </section>
        )}
      </main>

      <SiteFooter lang={lang} />
    </>
  )
}
