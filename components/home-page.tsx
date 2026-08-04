import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HomeLobby } from '@/components/home-lobby'
import { HomeDiscover } from '@/components/home-discover'
import { HomeProviderHubs } from '@/components/home-provider-hubs'
import { LazyRandomDemo } from '@/components/lazy-random-demo'
import { FaqAccordion } from '@/components/faq-accordion'
import { ExpertBanner } from '@/components/expert-banner'
import { JsonLd } from '@/components/json-ld'
import { games, i18n, CTA_URL } from '@/lib/games'
import type { Game, Lang } from '@/lib/games'

interface HomePageProps {
  lang: Lang
}

/** Hero art + carousel order — Mines kept out of the very top */
const FEATURED_SLUGS = [
  'lucky-jet',
  'gates-of-olympus',
  'sweet-bonanza',
  'rocket-queen',
  'sugar-rush',
  'starlight-princess',
  'big-bass-bonanza',
  'the-dog-house',
  'wolf-gold',
  'floating-dragon',
  'fruit-party',
  'zeus-vs-hades-gods-of-war',
  'buffalo-king-megaways',
  'madame-destiny-megaways',
  'mustang-gold',
  'wild-west-gold',
]

export function HomePage({ lang }: HomePageProps) {
  const t = i18n[lang]
  const isEn = lang === 'en'
  const featured = FEATURED_SLUGS.map((slug) => games.find((g) => g.slug === slug)).filter(
    (g): g is NonNullable<typeof g> => Boolean(g)
  )

  /** Home client payload stays tiny — full provider catalogs live on hub pages. */
  const popularGames: Game[] = [
    ...featured,
    ...games.filter((g) => !FEATURED_SLUGS.includes(g.slug)).slice(0, 8),
  ]
    .filter((g, i, arr) => arr.findIndex((x) => x.slug === g.slug) === i)
    .slice(0, 20)

  const randomPool = featured.slice(0, 16)

  const faqItems = isEn
    ? [
        {
          question: 'Can I open free slot demos with no registration?',
          answer:
            'Yes. Every free online casino demo game on 1weapp launches in the browser with virtual credits — no account, app install, or deposit wall.',
        },
        {
          question: 'Is a crash game demo online free the same as real play?',
          answer:
            'Crash demos use the same core loop and published RTP ranges as real-money versions. Only the balance is virtual, so you can practice cashout timing safely.',
        },
        {
          question: 'Can I play Lucky Jet demo free and Pragmatic Play slots demo here?',
          answer:
            'Yes. Open Lucky Jet demo play free alongside Gates of Olympus, Sweet Bonanza and other Pragmatic Play slots demo titles from the catalog filters.',
        },
        {
          question: 'How does mines demo no deposit work?',
          answer:
            'Mines demo no deposit lets you set bomb count, open tiles, and practice cashout timing on virtual credits before any real-money decision.',
        },
        {
          question: 'How do I move from demo to real money?',
          answer:
            'Learn the mechanics in demo first, then use Play for Real Money when ready. Stay 18+, set deposit and session limits, and never chase losses.',
        },
      ]
    : [
        {
          question: 'Можно ли открыть бесплатные демо слоты без регистрации?',
          answer:
            'Да. Любые бесплатные игровые автоматы онлайн демо на 1weapp запускаются в браузере на виртуальных кредитах — без аккаунта, установки и депозита.',
        },
        {
          question: 'Краш игры демо онлайн совпадают с режимом на деньги?',
          answer:
            'Краш-демо использует тот же игровой цикл и заявленный RTP. Отличается только баланс — виртуальный, чтобы спокойно отработать момент кэшаута.',
        },
        {
          question: 'Есть ли Lucky Jet демо играть бесплатно и слоты Pragmatic Play демо?',
          answer:
            'Да. Откройте Lucky Jet демо играть бесплатно рядом с Gates of Olympus, Sweet Bonanza и другими слотами Pragmatic Play демо через фильтры каталога.',
        },
        {
          question: 'Как работает mines демо без депозита?',
          answer:
            'Mines демо без депозита позволяет задать число мин, открывать клетки и тренировать кэшаут на виртуальных кредитах до любых решений на деньги.',
        },
        {
          question: 'Как перейти от демо к игре на деньги?',
          answer:
            'Сначала изучите механику в демо, затем используйте «Играть на реальные деньги». Только 18+, с лимитами депозита и сессии, без догона проигрыша.',
        },
      ]

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '1weapp',
    description: t.metaDescHome,
    url: 'https://www.1weapp.online',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free demo games',
    },
    author: {
      '@type': 'Person',
      name: 'Dr. Henrik Adler',
      jobTitle: isEn
        ? 'Demo Mechanics & Responsible Play Reviewer'
        : 'Рецензент демо-механик и ответственной игры',
      image: 'https://www.1weapp.online/experts/dr-henrik-adler.webp',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
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

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={faqSchema} />
      <SiteHeader lang={lang} />

      <main id="main-content" role="main">
        <section className="home-brand-banner" aria-label="1weapp">
          <div className="home-brand-banner__media" aria-hidden="true">
            <Image
              src="/banners/home-brand.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="home-brand-banner__photo"
            />
            <div className="home-brand-banner__veil" />
          </div>

          <div className="home-brand-banner__inner">
            <p className="home-brand-banner__brand">
              <span className="home-brand-banner__brand-main">1we</span>
              <span className="home-brand-banner__brand-accent">app</span>
            </p>
            <h1 className="home-brand-banner__title">{t.heroTitle}</h1>
            <p className="home-brand-banner__sub">{t.heroSub}</p>

            <div className="home-brand-banner__actions">
              <a href="#lobby" className="btn-cta">
                {isEn ? 'Browse demos' : 'Смотреть демо'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href={CTA_URL}
                rel="noopener noreferrer nofollow sponsored"
                target="_blank"
                className="btn-ghost"
                aria-label={t.playReal}
              >
                {t.playReal}
              </a>
            </div>

            <p className="home-brand-banner__legal">
              {isEn ? (
                <>
                  18+ ·{' '}
                  <a href="/en/responsible-gaming" className="rg-note__link">
                    Gamble responsibly
                  </a>
                </>
              ) : (
                <>
                  18+ ·{' '}
                  <a href="/ru/responsible-gaming" className="rg-note__link">
                    Играйте ответственно
                  </a>
                </>
              )}
            </p>
          </div>
        </section>

        <section
          id="lobby"
          className="home-games"
          aria-label={isEn ? 'Popular demos' : 'Популярные демо'}
        >
          <div className="home-section-head">
            <span className="home-section-head__label">
              {isEn ? 'Lobby' : 'Лобби'}
            </span>
            <h2 className="home-section-head__title">
              {isEn ? 'Start with Popular' : 'Начните с популярных'}
            </h2>
            <p className="home-section-head__count">{popularGames.length}</p>
          </div>

          <HomeLobby lang={lang} popularGames={popularGames} />
          <HomeProviderHubs lang={lang} />
          <HomeDiscover lang={lang} catalog={featured} />

          <div className="home-seo">
            {isEn ? (
              <>
                <h2 className="home-seo__title">
                  Free slot demos no registration — crash, mines and browser play
                </h2>
                <p className="seo-body">
                  1weapp is a demo-first catalog for players who want free slot demos no
                  registration, a crash game demo online free, and mines practice before any
                  deposit. Every title opens in the browser with virtual credits, so you can
                  learn paytables, bonus triggers, cashout timing and published RTP without
                  creating an account. When a format fits your style, you can continue for real
                  money — still 18+, still with limits.
                </p>
                <p className="seo-body">
                  The library mixes instant-win crash titles, cluster and lines slots, and grid
                  games. Search by name or filter by type and provider to jump straight to Lucky
                  Jet, Gates of Olympus, Sweet Bonanza, Rocket Queen and dozens of other demos.
                  Free online casino demo games here are built for short learning sessions on
                  phone or desktop.
                </p>

                <h3 className="seo-h3">Crash game demo online free</h3>
                <p className="seo-body">
                  Looking for a crash game demo online free? Start with Lucky Jet demo play free
                  or Rocket Queen: watch the multiplier climb, set an auto-cashout target, and
                  compare flat staking vs emotional exits. A crash round is short, so demo mode
                  is the safest place to test when to cash out crash games without burning a
                  bankroll. Use the same target for 20–30 rounds and log how often early crashes
                  hit — that sample teaches more than any “hot streak” tip.
                </p>

                <h3 className="seo-h3">Pragmatic Play slots demo and free online slot machines</h3>
                <p className="seo-body">
                  If you want Pragmatic Play slots demo access, open Gates of Olympus, Sweet
                  Bonanza, Sugar Rush, Starlight Princess, Big Bass Bonanza and other catalog
                  hits. Free online slot machines demo mode shows tumble features, free-spin
                  frequency feel and volatility pace on virtual credits. Pair a high-RTP card
                  with a short demo sample before you judge whether the slot fits a small session
                  bankroll. Slot rtp explained simply still applies: RTP is a long-run average;
                  volatility decides how rough a short session feels.
                </p>

                <h3 className="seo-h3">Mines demo no deposit</h3>
                <p className="seo-body">
                  Mines demo no deposit is ideal for learning tile risk. Set three bombs, open a
                  few safe cells, and practice cashout timing on a written target — for example
                  1.5x–2.5x — instead of “one more click.” The same combinatorics appear in
                  real-money mines; demo only changes the currency. After a calm 3-bomb sample,
                  you can try higher mine counts and see how quickly dry streaks grow.
                </p>

                <h3 className="seo-h3">Why start with free online casino demo games</h3>
                <ul className="seo-list">
                  <li className="seo-list-item">
                    Instant browser launch — free slot demos no registration and no app install.
                  </li>
                  <li className="seo-list-item">
                    Virtual credits to explore bonuses, paytables and crash cashout rules.
                  </li>
                  <li className="seo-list-item">
                    Filters by crash, slots, mines and provider across the full catalog.
                  </li>
                  <li className="seo-list-item">
                    Same published RTP ranges as real versions — only the balance is fake.
                  </li>
                </ul>

                <h3 className="seo-h3">How to use the 1weapp catalog</h3>
                <p className="seo-body">
                  Pick a genre, open the demo, and run a fixed sample: 50–100 slot spins or 20–30
                  crash rounds with one cashout rule. Note dry streaks, bonus feel and whether
                  your planned stake size survives the volatility. Then read our{' '}
                  <a href="/en/guides" className="seo-inline-link">
                    strategy guides
                  </a>{' '}
                  on crash auto cashout, mines 3 bombs strategy, slot RTP, wagering terms and
                  responsible deposit limits. Demo first, decisions second — play responsibly,
                  18+ only.
                </p>
              </>
            ) : (
              <>
                <h2 className="home-seo__title">
                  Бесплатные демо слоты без регистрации — краш, mines и игра в браузере
                </h2>
                <p className="seo-body">
                  1weapp — каталог для тех, кому нужны бесплатные демо слоты без регистрации,
                  краш игры демо онлайн и тренировка mines до любого депозита. Каждый тайтл
                  открывается в браузере на виртуальных кредитах: изучайте таблицы выплат,
                  бонусные раунды, момент кэшаута и заявленный RTP без создания аккаунта. Если
                  формат подошёл — можно продолжить на деньги, оставаясь в рамках 18+ и заранее
                  заданных лимитов.
                </p>
                <p className="seo-body">
                  В библиотеке — instant-win краш, каскадные и классические слоты, а также
                  grid-игры. Ищите по названию или фильтруйте по типу и провайдеру, чтобы сразу
                  открыть Lucky Jet, Gates of Olympus, Sweet Bonanza, Rocket Queen и десятки
                  других демо. Бесплатные игровые автоматы онлайн демо здесь рассчитаны на
                  короткие учебные сессии с телефона или ПК.
                </p>

                <h3 className="seo-h3">Краш игры демо онлайн</h3>
                <p className="seo-body">
                  Нужны краш игры демо онлайн? Начните с Lucky Jet демо играть бесплатно или
                  Rocket Queen: следите за ростом множителя, задайте цель автокэшаута и сравните
                  ровную ставку с эмоциональным выходом. Раунд краша короткий, поэтому демо —
                  лучшее место отработать, когда выводить, не сжигая банкролл. Зафиксируйте одну
                  цель на 20–30 раундов и запишите, как часто случаются ранние краши — такая
                  выборка полезнее любых советов про «горячую серию».
                </p>

                <h3 className="seo-h3">Слоты Pragmatic Play демо и бесплатные автоматы</h3>
                <p className="seo-body">
                  Если нужны слоты Pragmatic Play демо, откройте Gates of Olympus, Sweet Bonanza,
                  Sugar Rush, Starlight Princess, Big Bass Bonanza и другие хиты каталога.
                  Бесплатные игровые автоматы онлайн демо показывают тумблы, ощущение частоты
                  фриспинов и темп волатильности на виртуальных кредитах. Сверьте карточку с
                  высоким RTP и короткий демо-прогон, прежде чем решать, подходит ли слот
                  небольшому банку. Помните: RTP — длинная дистанция; волатильность решает,
                  насколько жёсткой будет короткая сессия.
                </p>

                <h3 className="seo-h3">Mines демо без депозита</h3>
                <p className="seo-body">
                  Mines демо без депозита удобно для разбора риска клеток. Поставьте три мины,
                  откройте несколько безопасных полей и тренируйте кэшаут по заранее записанной
                  цели — например 1.5x–2.5x — а не по принципу «ещё один клик». Та же
                  комбинаторика работает в режиме на деньги; в демо меняется только валюта.
                  После спокойной серии на 3 минах можно поднять число бомб и увидеть, как
                  быстро растут сухие отрезки.
                </p>

                <h3 className="seo-h3">Зачем начинать с бесплатных демо казино</h3>
                <ul className="seo-list">
                  <li className="seo-list-item">
                    Мгновенный запуск в браузере — бесплатные демо слоты без регистрации и без
                    установки приложения.
                  </li>
                  <li className="seo-list-item">
                    Виртуальные кредиты для изучения бонусов, таблиц выплат и правил кэшаута в
                    краше.
                  </li>
                  <li className="seo-list-item">
                    Фильтры по крашу, слотам, mines и провайдеру по всему каталогу.
                  </li>
                  <li className="seo-list-item">
                    Тот же заявленный RTP, что у версий на деньги — отличается только баланс.
                  </li>
                </ul>

                <h3 className="seo-h3">Как пользоваться каталогом 1weapp</h3>
                <p className="seo-body">
                  Выберите жанр, откройте демо и прогоните фиксированную выборку: 50–100 спинов
                  слота или 20–30 краш-раундов с одним правилом кэшаута. Отметьте сухие серии,
                  ощущение бонусов и выдерживает ли запланированная ставка волатильность. Затем
                  читайте{' '}
                  <a href="/ru/guides" className="seo-inline-link">
                    гайды
                  </a>{' '}
                  по автокэшауту в краше, стратегии mines на 3 мины, RTP слотов, вейджеру бонусов
                  и лимитам депозита. Сначала демо — потом решения. Играйте ответственно, только
                  18+.
                </p>
              </>
            )}

            <ExpertBanner lang={lang} />

            <FaqAccordion
              title={isEn ? 'Frequently asked questions' : 'Частые вопросы'}
              items={faqItems}
              responsibleHref={isEn ? '/en/responsible-gaming' : '/ru/responsible-gaming'}
              responsibleLabel={isEn ? 'Responsible gaming' : 'Ответственная игра'}
            />
          </div>
        </section>

        <LazyRandomDemo games={randomPool} lang={lang} />
      </main>

      <SiteFooter lang={lang} />
    </>
  )
}
