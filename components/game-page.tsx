import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { GameCard } from '@/components/game-card'
import { GameViewer } from '@/components/game-viewer'
import { ExpertBanner } from '@/components/expert-banner'
import { FaqAccordion } from '@/components/faq-accordion'
import type { FaqItem } from '@/components/faq-accordion'
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

function buildGameFaq(game: Game, lang: Lang, playRealLabel: string): FaqItem[] {
  const isEn = lang === 'en'
  const name = game.name
  const type = game.gameType || (isEn ? 'slots' : 'слоты')
  const rtp = game.rtp || '~96%'
  const provider = game.provider

  if (isEn) {
    return [
      {
        question: `How to play ${name} demo?`,
        answer: `Open the ${name} demo on this page — no registration or deposit needed. The free demo uses virtual credits and the same core mechanics as the real version by ${provider}, so you can learn the loop before any real-money play.`,
      },
      {
        question: `Can I play ${name} for free?`,
        answer: `Yes. You can play ${name} for free in browser demo mode with virtual balance. It is ideal for checking volatility, features and pacing without risking a deposit.`,
      },
      {
        question: `${name} demo without registration — is signup required?`,
        answer: `No. The ${name} demo without registration opens instantly. You do not need an account, email or app install to start the free session.`,
      },
      {
        question: `What is the RTP of ${name} demo?`,
        answer: `${name} is listed as ${type} from ${provider} with published RTP ${rtp}. Demo mode follows the same published range so you can judge session feel before deciding anything else.`,
      },
      {
        question: `Can I play ${name} for real money?`,
        answer: `Yes — you can play ${name} for real money if you continue via the button below. Try the free demo first, stay 18+, and set limits before depositing.`,
        cta: { href: CTA_URL, label: playRealLabel },
      },
    ]
  }

  return [
    {
      question: `Как играть в ${name} демо?`,
      answer: `Откройте ${name} демо на этой странице — без регистрации и депозита. Бесплатное демо идёт на виртуальных кредитах с той же базовой механикой, что у версии на деньги от ${provider}.`,
    },
    {
      question: `Можно ли играть в ${name} бесплатно?`,
      answer: `Да. Играть в ${name} бесплатно можно в демо-режиме прямо в браузере. Так вы проверяете волатильность, бонусы и темп сессии без риска для депозита.`,
    },
    {
      question: `${name} демо без регистрации — нужен ли аккаунт?`,
      answer: `Нет. ${name} демо без регистрации запускается сразу: аккаунт, почта и установка приложения не требуются.`,
    },
    {
      question: `Какой RTP у ${name} демо?`,
      answer: `${name} — ${type} от ${provider}, заявленный RTP ${rtp}. В демо используется тот же ориентир, чтобы оценить ощущение сессии до любых решений на деньги.`,
    },
    {
      question: `Можно ли играть в ${name} на деньги?`,
      answer: `Да — играть в ${name} на деньги можно, если перейти по кнопке ниже. Сначала протестируйте бесплатное демо, играйте только 18+ и заранее задайте лимиты.`,
      cta: { href: CTA_URL, label: playRealLabel },
    },
  ]
}

function buildJsonLd(game: Game, lang: Lang, faqItems: FaqItem[]): string {
  const isEn = lang === 'en'
  const app = {
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
  }

  const faq = {
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [app, faq],
  })
}

export function GamePage({ slug, lang }: GamePageProps) {
  const game = getGame(slug)
  if (!game) notFound()

  const t = i18n[lang]
  const isEn = lang === 'en'
  const seoText = getSeoText(game, lang)
  const formattedSeo = formatSeoText(seoText)
  const faqItems = buildGameFaq(game, lang, t.playReal)
  const jsonLd = buildJsonLd(game, lang, faqItems)
  const related = getRelatedGames(slug, 4)
  const guideIds = getRelatedGuideIds(game.gameType)
  const relatedGuides = GUIDES.filter((g) => guideIds.includes(g.id)).slice(0, 4)

  const typeLabel = game.gameType || (isEn ? 'Slots' : 'Слоты')
  const rtpLabel = game.rtp || '~96%'

  const highlights = isEn
    ? [
        { k: '01', title: 'Free credits', desc: 'Practice with virtual balance — no deposit.' },
        { k: '02', title: 'Same mechanics', desc: 'Demo mirrors real RTP and feature logic.' },
        { k: '03', title: 'Instant browser', desc: 'Launch on mobile or desktop in one tap.' },
      ]
    : [
        { k: '01', title: 'Бесплатный баланс', desc: 'Тренируйтесь на виртуальных кредитах.' },
        { k: '02', title: 'Та же механика', desc: 'Демо повторяет RTP и бонусные правила.' },
        { k: '03', title: 'В браузере сразу', desc: 'Запуск на телефоне и ПК без установки.' },
      ]

  const legalLine = isEn
    ? '18+ · Gamble responsibly · T&C apply'
    : '18+ · Играйте ответственно · Применяются условия'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <SiteHeader lang={lang} gameSlug={slug} />

      <main id="main-content" role="main" className="game-page">
        <div className="game-page__atmosphere" aria-hidden="true">
          <Image
            src={game.avatar}
            alt=""
            fill
            sizes="100vw"
            priority
            unoptimized
            crossOrigin="anonymous"
            className="game-page__atmosphere-img"
          />
          <div className="game-page__atmosphere-veil" />
        </div>

        <nav aria-label="Breadcrumb" className="game-page__breadcrumb">
          <ol className="breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href={`/${lang}`} itemProp="item">
                <span itemProp="name">{t.breadcrumbHome}</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li aria-hidden="true" className="breadcrumb-sep">
              /
            </li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" aria-current="page" className="breadcrumb-current">
                {game.name}
              </span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        <header className="gp-hero">
          <div className="gp-hero__cover">
            <Image
              src={game.avatar}
              alt={game.name}
              width={160}
              height={160}
              priority
              unoptimized
              crossOrigin="anonymous"
            />
          </div>

          <div className="gp-hero__body">
            <p className="gp-hero__provider">{game.provider}</p>
            <h1 className="gp-hero__title">
              {game.name} <span className="gp-hero__demo">{t.demo}</span>
            </h1>
            <p className="gp-hero__lede">
              {isEn
                ? `Free ${typeLabel.toLowerCase()} demo — no signup, same published RTP as the real version.`
                : `Бесплатное демо (${typeLabel}) — без регистрации, с тем же заявленным RTP.`}
            </p>

            <div className="gp-hero__chips" aria-label={isEn ? 'Key facts' : 'Ключевые факты'}>
              <span className="gp-chip gp-chip--type">{typeLabel}</span>
              <span className="gp-chip gp-chip--rtp">RTP {rtpLabel}</span>
              <span className="gp-chip gp-chip--mode">
                {isEn ? 'Free demo' : 'Бесплатное демо'}
              </span>
            </div>

            <div className="gp-hero__actions">
              {game.iframeUrl ? (
                <a href="#play" className="btn-ghost gp-hero__jump">
                  {isEn ? 'Jump to demo' : 'К демо'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="19 12 12 19 5 12" />
                  </svg>
                </a>
              ) : null}
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
          </div>
        </header>

        <div id="play" className="gp-play">
          <div className="gp-play__main">
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
                    ? 'Click below to load the free demo in your browser'
                    : 'Нажмите ниже, чтобы загрузить бесплатное демо в браузере'
                }
              />
            ) : (
              <div className="gp-coming-soon">
                <p className="gp-coming-soon__eyebrow">
                  {isEn ? 'Demo soon' : 'Демо скоро'}
                </p>
                <h2 className="gp-coming-soon__title">
                  {isEn
                    ? `${game.name} demo is on the way`
                    : `Демо ${game.name} скоро появится`}
                </h2>
                <p className="gp-coming-soon__text">
                  {isEn
                    ? 'Meanwhile you can continue for real prizes or browse similar titles below.'
                    : 'Пока можно продолжить на реальные призы или посмотреть похожие игры ниже.'}
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
          </div>

          <aside className="gp-aside" aria-label={isEn ? 'Game details' : 'Детали игры'}>
            <h2 className="gp-aside__title">
              {isEn ? 'At a glance' : 'Кратко об игре'}
            </h2>

            <dl className="gp-stats">
              <div className="gp-stats__item">
                <dt>{isEn ? 'Title' : 'Название'}</dt>
                <dd>{game.name}</dd>
              </div>
              <div className="gp-stats__item">
                <dt>{t.provider}</dt>
                <dd>{game.provider}</dd>
              </div>
              <div className="gp-stats__item">
                <dt>RTP</dt>
                <dd>{rtpLabel}</dd>
              </div>
              <div className="gp-stats__item">
                <dt>{isEn ? 'Type' : 'Тип'}</dt>
                <dd>{typeLabel}</dd>
              </div>
              <div className="gp-stats__item">
                <dt>{isEn ? 'Mode' : 'Режим'}</dt>
                <dd>{isEn ? 'Free demo' : 'Бесплатное демо'}</dd>
              </div>
              <div className="gp-stats__item">
                <dt>{isEn ? 'Signup' : 'Регистрация'}</dt>
                <dd>{isEn ? 'Not required' : 'Не нужна'}</dd>
              </div>
            </dl>

            <ul className="gp-aside__points" role="list">
              {(isEn
                ? [
                    'Virtual credits only in demo',
                    'Works on phone and desktop',
                    'Learn features before real play',
                  ]
                : [
                    'В демо только виртуальные кредиты',
                    'Работает на телефоне и ПК',
                    'Изучите фичи до реальной игры',
                  ]
              ).map((point) => (
                <li key={point} className="gp-aside__point">
                  <span className="gp-aside__dot" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>

            {game.iframeUrl && (
              <div className="gp-aside__cta">
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
                <p className="gp-aside__legal">{legalLine}</p>
              </div>
            )}
          </aside>
        </div>

        <section className="gp-highlights" aria-label={isEn ? 'Why this demo' : 'Зачем это демо'}>
          {highlights.map((item) => (
            <div key={item.k} className="gp-highlights__item">
              <span className="gp-highlights__index">{item.k}</span>
              <div>
                <h3 className="gp-highlights__title">{item.title}</h3>
                <p className="gp-highlights__desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </section>

        <article className="gp-about" aria-label={isEn ? 'Game description' : 'Описание игры'}>
          <div className="gp-about__head">
            <span className="gp-about__label">{isEn ? 'Overview' : 'Обзор'}</span>
            <h2 className="gp-about__title">
              {isEn ? `About ${game.name}` : `О ${game.name}`}
            </h2>
          </div>
          <div className="seo-body" dangerouslySetInnerHTML={{ __html: formattedSeo }} />
          <ExpertBanner lang={lang} variant="compact" />
        </article>

        <div className="gp-faq">
          <FaqAccordion
            idPrefix={`game-${game.slug}-faq`}
            title={isEn ? `${game.name} — FAQ` : `${game.name} — частые вопросы`}
            items={faqItems}
          />
        </div>

        {related.length > 0 && (
          <section className="games-related" aria-labelledby="related-games-heading">
            <div className="games-related__head">
              <div>
                <span className="games-related__label">
                  {isEn ? 'Next up' : 'Дальше'}
                </span>
                <h2 id="related-games-heading" className="games-related__title">
                  {isEn ? 'Similar games' : 'Похожие игры'}
                </h2>
              </div>
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
            <div>
              <span className="game-guides__label">
                {isEn ? 'Learn more' : 'Узнать больше'}
              </span>
              <h2 id="game-guides-heading" className="game-guides__title">
                {isEn ? 'Related guides' : 'Полезные гайды'}
              </h2>
            </div>
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
                <svg
                  className="game-guides__card-arrow"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
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
