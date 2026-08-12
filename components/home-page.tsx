import Image from 'next/image'
import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HomeLobby } from '@/components/home-lobby'
import { FaqAccordion } from '@/components/faq-accordion'
import { ExpertBanner } from '@/components/expert-banner'
import { JsonLd } from '@/components/json-ld'
import { games, i18n, CTA_URL } from '@/lib/games'
import type { Game, Lang } from '@/lib/games'
import { getPopularGamesPerProvider } from '@/lib/popular-games'
import { PROVIDERS, getGamesByProvider } from '@/lib/providers'

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
  const topGames: Game[] = [...featured, ...providerPopular]
    .filter((g, i, arr) => arr.findIndex((x) => x.slug === g.slug) === i)
    .slice(0, 12)

  const activeProviders = PROVIDERS.filter((p) => getGamesByProvider(p.name).length > 0)
  /** Only ship a small row per provider to the client — full hubs stay on /providers. */
  const gamesByProvider: Record<string, Game[]> = {}
  for (const p of activeProviders) {
    const popular = providerPopular.filter((g) => g.provider === p.name)
    const rest = getGamesByProvider(p.name).filter((g) => !popular.some((x) => x.slug === g.slug))
    gamesByProvider[p.name] = [...popular, ...rest].slice(0, 24)
  }

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
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={faqSchema} />
      <SiteHeader lang={lang} />

      <main id="main-content" role="main" className="db-home">
        {/* Compact banner — demo.black style, not full-viewport */}
        <section className="db-hero" aria-label="1weapp">
          <div className="db-hero__frame">
            <div className="db-hero__media" aria-hidden="true">
              <Image
                src="/banners/home-brand.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="db-hero__photo"
              />
              <div className="db-hero__veil" />
            </div>
            <div className="db-hero__copy">
              <p className="db-hero__badge">1WEAPP</p>
              <h1 className="db-hero__title">{t.heroTitle}</h1>
              <p className="db-hero__sub">{t.heroSub}</p>
              <div className="db-hero__actions">
                <a href="#lobby" className="btn-cta db-hero__cta">
                  {isEn ? 'Browse demos' : 'Смотреть демо'}
                </a>
                <a
                  href={CTA_URL}
                  rel="noopener noreferrer nofollow sponsored"
                  target="_blank"
                  className="btn-ghost"
                >
                  {t.playReal}
                </a>
              </div>
              <p className="db-hero__legal">
                18+ ·{' '}
                <Link href={isEn ? '/en/responsible-gaming' : '/ru/responsible-gaming'}>
                  {isEn ? 'Gamble responsibly' : 'Играйте ответственно'}
                </Link>
              </p>
            </div>
          </div>
        </section>

        <section id="lobby" className="db-main" aria-label={isEn ? 'Demo catalog' : 'Каталог демо'}>
          <HomeLobby
            lang={lang}
            topGames={topGames}
            providers={activeProviders}
            gamesByProvider={gamesByProvider}
          />

          <div className="db-seo home-seo">
            <h2 className="home-seo__title">
              {isEn
                ? 'Free slot demos no registration — crash, mines and browser play'
                : 'Бесплатные демо слоты без регистрации — краш, mines и игра в браузере'}
            </h2>
            {isEn ? (
              <>
                <p className="seo-body">
                  1weapp is a demo-first catalog for free slot demos no registration, crash game demos
                  online free, and mines practice before any deposit. Every title opens in the browser
                  with virtual credits.
                </p>
                <p className="seo-body">
                  Browse Top picks or jump by provider — Pragmatic Play, Hacksaw, Nolimit City and more.
                  Search the full catalog anytime. Demo first, decisions second — 18+ only.
                </p>
              </>
            ) : (
              <>
                <p className="seo-body">
                  1weapp — каталог бесплатных демо слотов без регистрации, краш-игр и mines до депозита.
                  Каждый тайтл открывается в браузере на виртуальных кредитах.
                </p>
                <p className="seo-body">
                  Смотрите топ или переходите по провайдерам. Поиск работает по всему каталогу. Сначала
                  демо — потом решения. Только 18+.
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
      </main>

      <SiteFooter lang={lang} />
    </>
  )
}
