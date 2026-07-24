import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { GameCard } from '@/components/game-card'
import { GameViewer } from '@/components/game-viewer'
import {
  getGame,
  getSeoText,
  formatSeoText,
  CTA_URL,
  i18n,
  getRelatedGames,
  getRelatedGuideIds,
} from '@/lib/games'
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
    url: `https://www.1weapp.online/${lang}/${game.slug}`,
  })
}

export function GamePage({ slug, lang }: GamePageProps) {
  const game = getGame(slug)
  if (!game) notFound()

  const t = i18n[lang]
  const isEn = lang === 'en'
  const seoText = getSeoText(game, lang)
  const formattedSeo = formatSeoText(seoText)
  const jsonLd = buildJsonLd(game, lang)
  const related = getRelatedGames(slug, 4)
  const guideIds = getRelatedGuideIds(game.gameType)
  const relatedGuides = GUIDES.filter((g) => guideIds.includes(g.id)).slice(0, 4)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <SiteHeader lang={lang} gameSlug={slug} />

      <main id="main-content" role="main" className="game-page">
        <nav aria-label="Breadcrumb" className="game-page__breadcrumb">
          <ol className="breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href={`/${lang}`} itemProp="item">
                <span itemProp="name">{t.breadcrumbHome}</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li aria-hidden="true" className="breadcrumb-sep">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" aria-current="page" className="breadcrumb-current">
                {game.name}
              </span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <header className="game-page__hero">
          <div className="game-page__avatar">
            <Image
              src={game.avatar}
              alt={game.name}
              width={72}
              height={72}
              priority
              unoptimized
              crossOrigin="anonymous"
            />
          </div>
          <div className="game-page__hero-text">
            <p className="game-page__provider">{game.provider}</p>
            <h1 className="game-page__title">
              {game.name} <span className="game-page__demo">{t.demo}</span>
            </h1>
            <div className="game-page__meta">
              {game.gameType && <span className="card-badge card-badge--type">{game.gameType}</span>}
              {game.rtp && <span className="card-badge card-badge--rtp">RTP {game.rtp}</span>}
            </div>
          </div>
        </header>

        {game.iframeUrl ? (
          <GameViewer
            iframeUrl={game.iframeUrl}
            gameName={game.name}
            demoBadge={t.demo}
            fullscreenLabel={isEn ? 'Full Screen' : 'На весь экран'}
            closeLabel={isEn ? 'Exit' : 'Выйти'}
            launchLabel={isEn ? 'Launch Demo' : 'Запустить демо'}
            readyTitle={isEn ? 'Ready to Play?' : 'Готовы играть?'}
            readyDescription={
              isEn
                ? 'Click the button below to launch the demo'
                : 'Нажмите кнопку ниже, чтобы запустить демо'
            }
          />
        ) : (
          <div className="game-page__coming-soon">
            <p>
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
              {t.playReal}
            </a>
          </div>
        )}

        {game.iframeUrl && (
          <div className="game-page__cta">
            <p>
              {isEn
                ? 'Liked the demo? Continue for real prizes.'
                : 'Понравилось демо? Продолжите на реальные призы.'}
            </p>
            <a
              href={CTA_URL}
              rel="noopener noreferrer nofollow sponsored"
              target="_blank"
              className="btn-cta"
              aria-label={t.playReal}
            >
              {t.playReal}
            </a>
            <p className="game-page__legal">
              {isEn ? '18+ · Gamble responsibly · T&C apply' : '18+ · Играйте ответственно · Применяются условия'}
            </p>
          </div>
        )}

        <section className="game-page__info" aria-label={isEn ? 'Game details' : 'Детали игры'}>
          <h2>{isEn ? 'Game details' : 'Информация об игре'}</h2>
          <dl className="game-info-grid">
            <div>
              <dt>{isEn ? 'Title' : 'Название'}</dt>
              <dd>{game.name}</dd>
            </div>
            <div>
              <dt>{t.provider}</dt>
              <dd>{game.provider}</dd>
            </div>
            <div>
              <dt>RTP</dt>
              <dd>{game.rtp || '~96%'}</dd>
            </div>
            <div>
              <dt>{isEn ? 'Type' : 'Тип'}</dt>
              <dd>{game.gameType || 'Slots'}</dd>
            </div>
            <div>
              <dt>{isEn ? 'Mode' : 'Режим'}</dt>
              <dd>{isEn ? 'Free demo' : 'Бесплатное демо'}</dd>
            </div>
          </dl>
        </section>

        <article className="game-page__seo" aria-label={isEn ? 'Game description' : 'Описание игры'}>
          <h2>
            {isEn ? `About ${game.name}` : `О ${game.name}`}
          </h2>
          <hr className="gold-line" />
          <div className="seo-body" dangerouslySetInnerHTML={{ __html: formattedSeo }} />
        </article>

        {related.length > 0 && (
          <section className="games-related" aria-labelledby="related-games-heading">
            <div className="games-related__head">
              <h2 id="related-games-heading" className="games-related__title">
                {isEn ? 'Similar games' : 'Похожие игры'}
              </h2>
              <Link href={`/${lang}`} className="games-related__all-link">
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

      <section className="game-guides" aria-labelledby="game-guides-heading">
        <div className="game-guides__inner">
          <div className="game-guides__header">
            <h2 id="game-guides-heading" className="game-guides__title">
              {isEn ? 'Related guides' : 'Полезные гайды'}
            </h2>
            <Link href={`/${lang}/guides`} className="game-guides__all-link">
              {isEn ? 'All guides →' : 'Все гайды →'}
            </Link>
          </div>
          <p className="game-guides__sub">
            {isEn
              ? 'Mechanics, RTP, bonuses and responsible play'
              : 'Механики, RTP, бонусы и ответственная игра'}
          </p>
          <div className="game-guides__grid">
            {relatedGuides.map((guide) => (
              <Link
                key={guide.id}
                href={`/${lang}/guides/${guide.id}`}
                className="game-guides__card"
              >
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
