import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HomeLobby } from '@/components/home-lobby'
import { HomeDiscover } from '@/components/home-discover'
import { HomeProviderHubs } from '@/components/home-provider-hubs'
import { FaqAccordion } from '@/components/faq-accordion'
import { ExpertBanner } from '@/components/expert-banner'
import { JsonLd } from '@/components/json-ld'
import { GameCard } from '@/components/game-card'
import { games, i18n, CTA_URL } from '@/lib/games'
import type { Game, Lang } from '@/lib/games'
import { getPopularGamesPerProvider } from '@/lib/popular-games'

interface HomePageProps {
  lang: Lang
}

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
    (g): g is NonNullable<typeof g> => Boolean(g),
  )

  const providerPopular = getPopularGamesPerProvider(10)
  const popularGames: Game[] = [...featured, ...providerPopular].filter(
    (g, i, arr) => arr.findIndex((x) => x.slug === g.slug) === i,
  )

  const spotlight = featured.slice(0, 4)

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

      <main id="main-content" role="main" className="atelier">
        {/* 1 — Hero: one composition */}
        <section className="atelier-hero" aria-label="1weapp">
          <div className="atelier-hero__media" aria-hidden="true">
            <Image
              src="/banners/home-brand.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              className="atelier-hero__photo"
            />
            <div className="atelier-hero__veil" />
          </div>

          <div className="atelier-hero__content">
            <p className="atelier-hero__brand atelier-rise">
              <span>1we</span>
              <span className="atelier-hero__brand-accent">app</span>
            </p>
            <h1 className="atelier-hero__title atelier-rise atelier-rise--2">{t.heroTitle}</h1>
            <p className="atelier-hero__sub atelier-rise atelier-rise--3">{t.heroSub}</p>
            <div className="atelier-hero__actions atelier-rise atelier-rise--4">
              <a href="#catalog" className="atelier-btn atelier-btn--primary">
                {isEn ? 'Browse demos' : 'Смотреть демо'}
              </a>
              <a
                href={CTA_URL}
                rel="noopener noreferrer nofollow sponsored"
                target="_blank"
                className="atelier-btn atelier-btn--ghost"
              >
                {t.playReal}
              </a>
            </div>
            <p className="atelier-hero__legal atelier-rise atelier-rise--5">
              18+ ·{' '}
              <Link href={isEn ? '/en/responsible-gaming' : '/ru/responsible-gaming'}>
                {isEn ? 'Gamble responsibly' : 'Играйте ответственно'}
              </Link>
            </p>
          </div>
        </section>

        {/* 2 — Spotlight: one job */}
        <section className="atelier-spot" aria-labelledby="atelier-spot-title">
          <div className="atelier-wrap">
            <header className="atelier-head">
              <p className="atelier-head__eyebrow">{isEn ? 'Tonight' : 'Сейчас'}</p>
              <h2 id="atelier-spot-title" className="atelier-head__title">
                {isEn ? 'Four demos to open first' : 'Четыре демо, с которых начать'}
              </h2>
              <p className="atelier-head__sub">
                {isEn
                  ? 'Hand-picked titles — crash and slots, ready in the browser.'
                  : 'Отобранные тайтлы — краш и слоты, сразу в браузере.'}
              </p>
            </header>

            <div className="atelier-spot__grid" role="list">
              {spotlight.map((game, i) => (
                <div key={game.slug} className="atelier-spot__item" role="listitem" data-i={i}>
                  <GameCard game={game} lang={lang} priority={i < 2} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 — Catalog + search */}
        <section
          id="catalog"
          className="atelier-catalog"
          aria-label={isEn ? 'Demo catalog' : 'Каталог демо'}
        >
          <div className="atelier-wrap">
            <header className="atelier-head">
              <p className="atelier-head__eyebrow">{isEn ? 'Library' : 'Библиотека'}</p>
              <h2 className="atelier-head__title">
                {isEn ? 'Find any demo' : 'Найди любое демо'}
              </h2>
              <p className="atelier-head__sub">
                {isEn
                  ? 'Search the full catalog, then filter by type.'
                  : 'Ищи по всему каталогу, затем фильтруй по типу.'}
              </p>
            </header>

            <HomeLobby lang={lang} popularGames={popularGames} allGames={games} />
          </div>
        </section>

        {/* 4 — Providers */}
        <section className="atelier-providers" aria-labelledby="atelier-providers-title">
          <div className="atelier-wrap">
            <HomeProviderHubs lang={lang} />
          </div>
        </section>

        {/* 5 — Themes + guides */}
        <section className="atelier-explore" aria-label={isEn ? 'Explore' : 'Обзор'}>
          <div className="atelier-wrap">
            <HomeDiscover lang={lang} catalog={featured} />
          </div>
        </section>

        {/* 6 — Journal / SEO */}
        <section className="atelier-journal" aria-labelledby="atelier-journal-title">
          <div className="atelier-wrap atelier-journal__inner">
            <header className="atelier-head">
              <p className="atelier-head__eyebrow">{isEn ? 'Notes' : 'Заметки'}</p>
              <h2 id="atelier-journal-title" className="atelier-head__title home-seo__title">
                {isEn
                  ? 'Free slot demos no registration — crash, mines and browser play'
                  : 'Бесплатные демо слоты без регистрации — краш, mines и игра в браузере'}
              </h2>
            </header>

            <div className="home-seo atelier-journal__body">
              {isEn ? (
                <>
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
                  </p>
                  <h3 className="seo-h3">Crash game demo online free</h3>
                  <p className="seo-body">
                    Looking for a crash game demo online free? Start with Lucky Jet demo play free
                    or Rocket Queen: watch the multiplier climb, set an auto-cashout target, and
                    compare flat staking vs emotional exits.
                  </p>
                  <h3 className="seo-h3">Pragmatic Play slots demo</h3>
                  <p className="seo-body">
                    Open Gates of Olympus, Sweet Bonanza, Sugar Rush, Starlight Princess and more.
                    Free online slot machines demo mode shows tumble features and volatility pace
                    on virtual credits.
                  </p>
                  <h3 className="seo-h3">Mines demo no deposit</h3>
                  <p className="seo-body">
                    Mines demo no deposit lets you set bomb count, open tiles, and practice cashout
                    timing on a written target before any real-money decision.
                  </p>
                  <p className="seo-body">
                    Then read our{' '}
                    <a href="/en/guides" className="seo-inline-link">
                      strategy guides
                    </a>
                    . Demo first, decisions second — play responsibly, 18+ only.
                  </p>
                </>
              ) : (
                <>
                  <p className="seo-body">
                    1weapp — каталог для тех, кому нужны бесплатные демо слоты без регистрации,
                    краш игры демо онлайн и тренировка mines до любого депозита. Каждый тайтл
                    открывается в браузере на виртуальных кредитах.
                  </p>
                  <p className="seo-body">
                    Ищите по названию или фильтруйте по типу и провайдеру, чтобы сразу открыть
                    Lucky Jet, Gates of Olympus, Sweet Bonanza, Rocket Queen и десятки других
                    демо.
                  </p>
                  <h3 className="seo-h3">Краш игры демо онлайн</h3>
                  <p className="seo-body">
                    Начните с Lucky Jet демо играть бесплатно или Rocket Queen: следите за ростом
                    множителя и задайте цель автокэшаута.
                  </p>
                  <h3 className="seo-h3">Слоты Pragmatic Play демо</h3>
                  <p className="seo-body">
                    Откройте Gates of Olympus, Sweet Bonanza, Sugar Rush и другие хиты — тумблы и
                    волатильность на виртуальных кредитах.
                  </p>
                  <h3 className="seo-h3">Mines демо без депозита</h3>
                  <p className="seo-body">
                    Задайте число мин, открывайте клетки и тренируйте кэшаут по заранее записанной
                    цели.
                  </p>
                  <p className="seo-body">
                    Затем читайте{' '}
                    <a href="/ru/guides" className="seo-inline-link">
                      гайды
                    </a>
                    . Сначала демо — потом решения. Только 18+.
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
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  )
}
