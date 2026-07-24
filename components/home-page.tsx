import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { GameSearch } from '@/components/game-search'
import { GameCard } from '@/components/game-card'
import { FaqAccordion } from '@/components/faq-accordion'
import { JsonLd } from '@/components/json-ld'
import { games, i18n, CTA_URL } from '@/lib/games'
import type { Lang } from '@/lib/games'

interface HomePageProps {
  lang: Lang
}

/** Spotlight titles — Mines intentionally excluded from top featured */
const FEATURED_SLUGS = ['lucky-jet', 'gates-of-olympus', 'sweet-bonanza', 'rocket-queen']

export function HomePage({ lang }: HomePageProps) {
  const t = i18n[lang]
  const isEn = lang === 'en'
  const featured = FEATURED_SLUGS.map((slug) => games.find((g) => g.slug === slug)).filter(Boolean)
  const heroArt = featured.slice(0, 4)

  const faqItems = isEn
    ? [
        {
          question: 'Can I play without registration?',
          answer:
            'Yes. Every demo in the catalog opens in your browser with virtual credits — no account, download, or deposit required.',
        },
        {
          question: 'Are demo games the same as real-money versions?',
          answer:
            'Demo titles use the same core mechanics and published RTP ranges as their real-money counterparts. Only the currency is virtual.',
        },
        {
          question: 'What game types are available?',
          answer:
            'Browse slots, crash games, and mines. Use search and filters to jump straight to a provider or genre.',
        },
        {
          question: 'How do I switch to real-money play?',
          answer:
            'Try the demo first, then use Play for Real Money when you are ready. Always play 18+ and set limits before depositing.',
        },
      ]
    : [
        {
          question: 'Можно ли играть без регистрации?',
          answer:
            'Да. Любое демо из каталога открывается в браузере на виртуальных кредитах — без аккаунта, скачивания и депозита.',
        },
        {
          question: 'Демо совпадает с реальной версией?',
          answer:
            'Демо использует ту же механику и заявленный RTP, что и версии на деньги. Отличается только валюта — виртуальные кредиты.',
        },
        {
          question: 'Какие типы игр есть в каталоге?',
          answer:
            'Слоты, краш-игры и Mines. Поиск и фильтры помогают быстро найти нужный жанр или провайдера.',
        },
        {
          question: 'Как перейти к игре на деньги?',
          answer:
            'Сначала протестируйте демо, затем используйте кнопку «Играть на реальные деньги». Играйте только 18+ и заранее задайте лимиты.',
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

  return (
    <>
      <JsonLd data={organizationSchema} />
      <SiteHeader lang={lang} />

      <main id="main-content" role="main">
        <section className="home-hero" aria-label="1weapp">
          <div className="home-hero__stage" aria-hidden="true">
            <div className="home-hero__glow home-hero__glow--a" />
            <div className="home-hero__glow home-hero__glow--b" />
            <div className="home-hero__noise" />
            <div className="home-hero__art">
              {heroArt.map((game, index) =>
                game ? (
                  <div key={game.slug} className={`home-hero__poster home-hero__poster--${index + 1}`}>
                    <Image
                      src={game.avatar}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 40vw, 28vw"
                      priority={index < 2}
                      unoptimized
                      crossOrigin="anonymous"
                    />
                  </div>
                ) : null
              )}
            </div>
            <div className="home-hero__veil" />
          </div>

          <div className="home-hero__inner">
            <p className="home-hero__brand anim-fade-up">
              <span className="home-hero__brand-main">1we</span>
              <span className="home-hero__brand-accent">app</span>
            </p>

            <h1 className="home-hero__title anim-fade-up anim-delay-1">{t.heroTitle}</h1>
            <p className="home-hero__sub anim-fade-up anim-delay-2">{t.heroSub}</p>

            <div className="home-hero__actions anim-fade-up anim-delay-3">
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

              <a href="#games" className="btn-ghost">
                {isEn ? 'Browse demos' : 'Смотреть демо'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>

            <p className="home-hero__legal anim-fade-up anim-delay-4">
              {isEn ? '18+ · Gamble responsibly · T&C apply' : '18+ · Играйте ответственно · Применяются условия'}
            </p>
          </div>
        </section>

        <section className="home-rail" aria-label={isEn ? 'Why play here' : 'Почему у нас'}>
          {(isEn
            ? [
                { k: '01', title: 'Instant launch', desc: 'One tap — demo in the browser.' },
                { k: '02', title: 'Zero signup', desc: 'No account. No deposit wall.' },
                { k: '03', title: 'Built for mobile', desc: 'Crisp play on any screen.' },
              ]
            : [
                { k: '01', title: 'Мгновенный старт', desc: 'Один тап — демо в браузере.' },
                { k: '02', title: 'Без регистрации', desc: 'Без аккаунта и депозита.' },
                { k: '03', title: 'Для мобильных', desc: 'Чётко на любом экране.' },
              ]
          ).map((f) => (
            <div key={f.k} className="home-rail__item">
              <span className="home-rail__index">{f.k}</span>
              <div>
                <h3 className="home-rail__title">{f.title}</h3>
                <p className="home-rail__desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {featured.length > 0 && (
          <section className="home-featured" aria-label={isEn ? 'Featured demos' : 'Избранные демо'}>
            <div className="home-section-head">
              <span className="home-section-head__label">
                {isEn ? 'Spotlight' : 'В фокусе'}
              </span>
              <h2 className="home-section-head__title">
                {isEn ? 'Hot demos' : 'Горячие демо'}
              </h2>
            </div>
            <div className="spotlight-grid">
              {featured.map((game, index) =>
                game ? (
                  <div
                    key={game.slug}
                    className={`spotlight-grid__item ${index === 0 ? 'is-lead' : ''}`}
                  >
                    <GameCard game={game} lang={lang} />
                  </div>
                ) : null
              )}
            </div>
          </section>
        )}

        <section
          id="games"
          className="home-games"
          aria-label={isEn ? 'Game catalog' : 'Каталог игр'}
        >
          <div className="home-section-head">
            <span className="home-section-head__label">
              {isEn ? 'Catalog' : 'Каталог'}
            </span>
            <h2 className="home-section-head__title">
              {isEn ? 'All demo games' : 'Все демо-игры'}
            </h2>
            <p className="home-section-head__count">{games.length}</p>
          </div>

          <GameSearch
            games={games}
            lang={lang}
            totalLabel={isEn ? 'All Games' : 'Все игры'}
            emptyLabel={isEn ? 'No games found' : 'Ничего не найдено'}
            clearLabel={isEn ? 'Clear' : 'Сбросить'}
            placeholderLabel={isEn ? 'Search games…' : 'Поиск игр…'}
          />

          <div className="home-seo">
            <h2 className="home-seo__title">
              {isEn
                ? 'Free demo games — no registration'
                : 'Бесплатные демо-игры — без регистрации'}
            </h2>
            <p className="seo-body">
              {isEn
                ? '1weapp is a demo catalog for crash games, mines, and slots. Open any title in your browser, learn the mechanics, and check published RTP before you decide whether to play for real money.'
                : '1weapp — каталог демо краш-игр, mines и слотов. Откройте любой тайтл в браузере, изучите механику и заявленный RTP — и только потом решайте, переходить ли к игре на деньги.'}
            </p>

            <h3 className="seo-h3">
              {isEn ? 'Why start in demo mode' : 'Зачем начинать с демо'}
            </h3>
            <ul className="seo-list">
              <li className="seo-list-item">
                {isEn
                  ? 'Instant browser play — no app install.'
                  : 'Мгновенный запуск в браузере — без установки.'}
              </li>
              <li className="seo-list-item">
                {isEn
                  ? 'Virtual credits to explore paytables and bonus rounds.'
                  : 'Виртуальные кредиты для изучения таблиц выплат и бонусов.'}
              </li>
              <li className="seo-list-item">
                {isEn
                  ? 'Filters by type and provider across the full catalog.'
                  : 'Фильтры по типу и провайдеру по всему каталогу.'}
              </li>
            </ul>

            <p className="seo-body">
              {isEn ? (
                <>
                  Need deeper strategy notes? Open our{' '}
                  <a href="/en/guides" className="seo-inline-link">
                    guides
                  </a>{' '}
                  on crash timing, RTP, bonuses, and responsible play.
                </>
              ) : (
                <>
                  Нужны стратегии подробнее? Смотрите{' '}
                  <a href="/ru/guides" className="seo-inline-link">
                    гайды
                  </a>{' '}
                  по крашу, RTP, бонусам и ответственной игре.
                </>
              )}
            </p>

            <FaqAccordion
              title={isEn ? 'Frequently asked questions' : 'Частые вопросы'}
              items={faqItems}
            />
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  )
}
