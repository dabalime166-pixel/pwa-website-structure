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
  i18n,
  getRelatedGames,
  getRelatedGuideIds,
  homeHref,
} from '@/lib/games'
import { continueHref } from '@/lib/continue'
import type { Lang, GameFull } from '@/lib/games'
import {
  getGameFull,
  getSeoText,
  getSeoDescription,
  formatSeoText,
} from '@/lib/games-content'
import {
  getDemoChecklist,
  getGameHighlights,
  getThemeFaqExtra,
} from '@/lib/game-themes'
import { absoluteUrl } from '@/lib/seo'
import { getProviderByName, providerHref, providersIndexHref } from '@/lib/providers'
import { notFound } from 'next/navigation'
import { GUIDES } from '@/lib/guides-data'
import { getReviewByGameSlug } from '@/lib/reviews-data'

interface GamePageProps {
  slug: string
  lang: Lang
}

function buildGameFaq(game: GameFull, lang: Lang, playRealLabel: string, hopHref: string): FaqItem[] {
  const isEn = lang === 'en'
  const name = game.name
  const type = game.gameType || (isEn ? 'slots' : 'слоты')
  const rtp = game.rtp || '~96%'
  const provider = game.provider
  const themeFaq = getThemeFaqExtra(game, lang)

  if (isEn) {
    return [
      {
        question: `How to play ${name} demo?`,
        answer: `Open this page and launch the free ${name} demo — virtual credits, same core loop as ${provider}. No signup.`,
      },
      {
        question: `Can I play ${name} for free?`,
        answer: `Yes. Browser demo only, no deposit. Use it to check pace, features and RTP ${rtp}.`,
      },
      {
        question: `${name} demo without registration?`,
        answer: `No account needed. Launch the ${name} demo on this page — virtual credits, no signup.`,
      },
      {
        question: `What is the RTP of ${name}?`,
        answer: `${name} (${type}, ${provider}) lists RTP ${rtp}. Demo follows the published range.`,
      },
      {
        question: themeFaq.question,
        answer: themeFaq.answer,
      },
      {
        question: `Can I play ${name} for real money?`,
        answer: `Yes — after the demo, continue via the button below. 18+ only; set limits first.`,
        cta: { href: hopHref, label: playRealLabel },
      },
    ]
  }

  return [
    {
      question: `Как играть в ${name} демо?`,
      answer: `Откройте страницу и запустите бесплатное демо ${name} — виртуальные кредиты, та же база, что у ${provider}. Без регистрации.`,
    },
    {
      question: `Можно ли играть в ${name} бесплатно?`,
      answer: `Да. Только браузерное демо, без депозита. Проверьте темп, фичи и RTP ${rtp}.`,
    },
    {
      question: `${name} демо без регистрации?`,
      answer: `Аккаунт не нужен. Запустите демо ${name} на этой странице — виртуальные кредиты, без регистрации.`,
    },
    {
      question: `Какой RTP у ${name}?`,
      answer: `${name} (${type}, ${provider}) — RTP ${rtp}. В демо тот же ориентир.`,
    },
    {
      question: themeFaq.question,
      answer: themeFaq.answer,
    },
    {
      question: `Можно ли играть в ${name} на деньги?`,
      answer: `Да — после демо через кнопку ниже. Только 18+; сначала задайте лимиты.`,
      cta: { href: hopHref, label: playRealLabel },
    },
  ]
}

function buildJsonLd(game: GameFull, lang: Lang, faqItems: FaqItem[], description: string): string {
  const isEn = lang === 'en'
  const pageUrl = absoluteUrl(`/${lang}/${game.slug}`)
  const imageUrl = absoluteUrl(game.avatar)

  // Prefer WebPage + VideoGame + FAQPage over SoftwareApplication —
  // Google rich-result checks often flag SoftwareApplication without rating/review.
  const webPage = {
    '@type': 'WebPage',
    '@id': pageUrl,
    url: pageUrl,
    name: isEn ? `${game.name} Demo` : `${game.name} демо`,
    description,
    inLanguage: lang,
    isPartOf: {
      '@type': 'WebSite',
      name: '1weapp',
      url: 'https://www.1weapp.online',
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: imageUrl,
    },
  }

  const videoGame = {
    '@type': 'VideoGame',
    '@id': `${pageUrl}#game`,
    name: game.name,
    description,
    image: imageUrl,
    url: pageUrl,
    gamePlatform: 'Web Browser',
    applicationCategory: 'Game',
    author: {
      '@type': 'Organization',
      name: game.provider,
    },
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      category: 'Free',
    },
  }

  const faq = {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
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
    '@graph': [webPage, videoGame, faq],
  })
}

export function GamePage({ slug, lang }: GamePageProps) {
  const game = getGameFull(slug)
  if (!game) notFound()

  const t = i18n[lang]
  const isEn = lang === 'en'
  const seoText = getSeoText(game, lang)
  const formattedSeo = formatSeoText(seoText)
  const hopHref = continueHref(lang, game.slug)
  const faqItems = buildGameFaq(game, lang, t.playReal, hopHref)
  const jsonLd = buildJsonLd(game, lang, faqItems, getSeoDescription(game, lang))
  const related = getRelatedGames(slug, 8)
  const guideIds = getRelatedGuideIds(game.gameType)
  const relatedReview = getReviewByGameSlug(game.slug)
  const relatedGuides = GUIDES.filter((g) => guideIds.includes(g.id)).slice(0, relatedReview ? 3 : 4)
  const providerDef = getProviderByName(game.provider)

  const typeLabel = game.gameType || (isEn ? 'Slots' : 'Слоты')
  const rtpLabel = game.rtp || '~96%'
  const highlights = getGameHighlights(game, lang)
  const checklist = getDemoChecklist(game, lang)

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
            alt={
              isEn
                ? `${game.name} demo background`
                : `Фон демо ${game.name}`
            }
            fill
            sizes="40vw"
            loading="lazy"
            className="game-page__atmosphere-img"
          />
          <div className="game-page__atmosphere-veil" />
        </div>

        <div className="game-page__topbar">
          <nav aria-label="Breadcrumb" className="game-page__breadcrumb">
            <ol className="breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href={homeHref(lang)} itemProp="item">
                  <span itemProp="name">{t.breadcrumbHome}</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li aria-hidden="true" className="breadcrumb-sep">
                /
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href={providersIndexHref(lang)} itemProp="item">
                  <span itemProp="name">{isEn ? 'Providers' : 'Провайдеры'}</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              {providerDef ? (
                <>
                  <li aria-hidden="true" className="breadcrumb-sep">
                    /
                  </li>
                  <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <Link href={providerHref(lang, providerDef.slug)} itemProp="item">
                      <span itemProp="name">
                        {isEn ? providerDef.titleEn : providerDef.titleRu}
                      </span>
                    </Link>
                    <meta itemProp="position" content="3" />
                  </li>
                </>
              ) : null}
              <li aria-hidden="true" className="breadcrumb-sep">
                /
              </li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" aria-current="page" className="breadcrumb-current">
                  {game.name}
                </span>
                <meta itemProp="position" content={providerDef ? '4' : '3'} />
              </li>
            </ol>
          </nav>

          <Link
            href={homeHref(lang)}
            className="gp-home-btn"
            aria-label={isEn ? 'Back to home' : 'На главную'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 10v10h14V10" />
            </svg>
            {isEn ? 'Home' : 'На главную'}
          </Link>
        </div>

        <header className="gp-hero">
          <div className="gp-hero__cover">
            <Image
              src={game.avatar}
              alt={
                isEn
                  ? `${game.name} demo free — ${game.provider} cover`
                  : `${game.name} демо бесплатно — обложка ${game.provider}`
              }
              width={160}
              height={160}
              priority
              sizes="160px"
            />
          </div>

          <div className="gp-hero__body">
            <p className="gp-hero__provider">
              {providerDef ? (
                <Link href={providerHref(lang, providerDef.slug)}>{game.provider}</Link>
              ) : (
                game.provider
              )}
            </p>
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
              <a href={hopHref} className="btn-cta" aria-label={t.playReal}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                {t.playReal}
              </a>
            </div>
            <p className="rg-note gp-hero__rg">
              18+ ·{' '}
              <Link href={isEn ? '/en/responsible-gaming' : '/ru/responsible-gaming'} className="rg-note__link">
                {isEn ? 'Gamble responsibly' : 'Играйте ответственно'}
              </Link>
              {' · '}
              {isEn ? 'T&C apply' : 'Условия применяются'}
            </p>
          </div>
        </header>

        <div id="play" className="gp-play">
          <div className="gp-play__main">
            {game.iframeUrl ? (
              <GameViewer
                iframeUrl={game.iframeUrl}
                gameName={game.name}
                gameSlug={game.slug}
                avatar={game.avatar}
                demoBadge={t.demo}
                fullscreenLabel={isEn ? 'Full Screen' : 'На весь экран'}
                closeLabel={isEn ? 'Exit' : 'Выйти'}
                launchLabel={isEn ? 'Launch Demo' : 'Запустить демо'}
                readyTitle={isEn ? `Play ${game.name} free` : `Играть в ${game.name} бесплатно`}
                readyDescription={
                  isEn
                    ? 'Load the official demo in this window — no signup, virtual balance.'
                    : 'Загрузите официальное демо в этом окне — без регистрации, виртуальный баланс.'
                }
                ctaUrl={hopHref}
                inviteCopy={
                  isEn
                    ? {
                        eyebrow: 'Ready for the next step?',
                        title: 'Continue {game} on a licensed operator',
                        text: 'You have been exploring the free {game} demo. The next step is a licensed operator — 18+ only, set limits first. 1weapp stays a demo catalog.',
                        ctaLabel: t.playReal,
                        dismissLabel: 'Keep playing demo',
                        legal: '18+ · Gamble responsibly · T&C apply',
                        perk1: 'Same game title in the lobby',
                        perk2: '18+ · set limits first',
                        perk3: 'Demo catalog stays on 1weapp',
                      }
                    : {
                        eyebrow: 'Готовы к следующему шагу?',
                        title: 'Продолжите {game} у лицензированного оператора',
                        text: 'Вы уже изучили бесплатное демо {game}. Дальше — лицензированный оператор. Только 18+, сначала лимиты. 1weapp остаётся каталогом демо.',
                        ctaLabel: t.playReal,
                        dismissLabel: 'Остаться в демо',
                        legal: '18+ · Играйте ответственно · Применяются условия',
                        perk1: 'То же название в лобби оператора',
                        perk2: 'Только 18+ · сначала лимиты',
                        perk3: 'Каталог демо остаётся на 1weapp',
                      }
                }
                notifyCopy={
                  isEn
                    ? {
                        eyebrow: 'Stay in the loop',
                        title: 'Get demo alerts for {game}',
                        text: 'Allow notifications and we will ping you when fresh demos and bonus drops go live. You can mute them anytime in browser settings.',
                        allowLabel: 'Allow notifications',
                        skipLabel: 'Not now — launch demo',
                        legal: 'Only sends updates you opt into · 18+ entertainment',
                        perk1: 'New demo & game alerts',
                        perk2: 'Bonus drops & promos',
                        perk3: 'One tap to turn off later',
                        iosTitle: 'Add to Home Screen for alerts',
                        iosBody:
                          'On iPhone, notifications work after you add 1weapp to your Home Screen and open {game} from the icon.',
                        iosStepShare: 'Tap Share in Safari (bottom bar)',
                        iosStepAdd: 'Choose “Add to Home Screen”',
                        iosStepOpen: 'Open the icon, then tap Launch Demo again',
                        iosContinueLabel: 'Launch demo without alerts',
                        iosShareHint: '↓ Share button is at the bottom of Safari',
                      }
                    : {
                        eyebrow: 'Будьте в курсе',
                        title: 'Уведомления о демо {game}',
                        text: 'Разрешите уведомления — сообщим о новых демо и бонусах. Отключить можно в настройках браузера в любой момент.',
                        allowLabel: 'Разрешить уведомления',
                        skipLabel: 'Не сейчас — запустить демо',
                        legal: 'Только выбранные вами обновления · 18+ развлечение',
                        perk1: 'Алерты о новых демо',
                        perk2: 'Бонусы и акции',
                        perk3: 'Можно отключить одним тапом',
                        iosTitle: 'Добавьте на экран «Домой»',
                        iosBody:
                          'На iPhone уведомления работают после добавления 1weapp на экран «Домой» и запуска {game} с иконки.',
                        iosStepShare: 'Нажмите «Поделиться» в Safari (внизу)',
                        iosStepAdd: 'Выберите «На экран «Домой»»',
                        iosStepOpen: 'Откройте с иконки и снова нажмите «Запустить демо»',
                        iosContinueLabel: 'Запустить демо без уведомлений',
                        iosShareHint: '↓ Кнопка «Поделиться» внизу Safari',
                      }
                }
                lang={isEn ? 'en' : 'ru'}
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
                <a href={hopHref} className="btn-cta" aria-label={t.playReal}>
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
                <a href={hopHref} className="btn-cta" aria-label={t.playReal}>
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

        <section className="gp-try" aria-labelledby="gp-try-heading">
          <div className="gp-try__head">
            <span className="gp-try__label">{checklist.label}</span>
            <h2 id="gp-try-heading" className="gp-try__title">
              {isEn
                ? `How to try ${game.name} usefully`
                : `Как полезно протестировать ${game.name}`}
            </h2>
            <p className="gp-try__focus">
              {isEn
                ? `What this demo is for: ${checklist.focus}.`
                : `Зачем это демо: ${checklist.focus}.`}
            </p>
          </div>
          <ol className="gp-try__list">
            {checklist.items.map((item) => (
              <li key={item} className="gp-try__item">
                {item}
              </li>
            ))}
          </ol>
        </section>

        <article className="gp-about" aria-label={isEn ? 'Game description' : 'Описание игры'}>
          <div className="gp-about__head">
            <span className="gp-about__label">{isEn ? 'Guide' : 'Гайд'}</span>
            <h2 className="gp-about__title">
              {isEn ? `${game.name} demo guide` : `Гайд по демо ${game.name}`}
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
            responsibleHref={isEn ? '/en/responsible-gaming' : '/ru/responsible-gaming'}
            responsibleLabel={isEn ? 'Responsible gaming' : 'Ответственная игра'}
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
              <Link href={homeHref(lang)} className="games-related__all-link">
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
                {isEn ? 'Related reviews & guides' : 'Обзоры и гайды'}
              </h2>
            </div>
            <Link href={`/${lang}/reviews`} className="game-guides__all-link">
              {isEn ? 'All reviews →' : 'Все обзоры →'}
            </Link>
          </div>
          <p className="game-guides__sub">
            {isEn
              ? 'Reviews with casino redirects, plus strategy guides'
              : 'Обзоры с редиректом в казино и стратегические гайды'}
          </p>
          <div className="game-guides__grid">
            {relatedReview && (
              <Link
                href={`/${lang}/reviews/${relatedReview.id}`}
                className="game-guides__card game-guides__card--avatar"
              >
                <Image
                  src={relatedReview.avatar}
                  alt={
                    isEn
                      ? `${game.name} review cover`
                      : `Обложка обзора ${game.name}`
                  }
                  width={72}
                  height={96}
                  className="game-guides__card-avatar"
                />
                <span className="game-guides__card-text">
                  <span className="game-guides__card-tag">
                    {isEn ? relatedReview.tagEn : relatedReview.tagRu}
                  </span>
                  <span className="game-guides__card-title">
                    {isEn ? relatedReview.titleEn : relatedReview.titleRu}
                  </span>
                  <span className="game-guides__card-sub">
                    {isEn ? relatedReview.subtitleEn : relatedReview.subtitleRu}
                  </span>
                </span>
              </Link>
            )}
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
