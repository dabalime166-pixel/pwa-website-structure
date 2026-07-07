import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { GameSearch } from '@/components/game-search'
import { games, i18n, CTA_URL } from '@/lib/games'
import type { Lang } from '@/lib/games'

interface HomePageProps {
  lang: Lang
}

export function HomePage({ lang }: HomePageProps) {
  const t = i18n[lang]
  const isEn = lang === 'en'

  const providerCount = new Set(games.map((g) => g.provider)).size

  const features = isEn
    ? [
        {
          title: 'Instant Play',
          desc: 'Launch any game in one tap — no downloads, no waiting.',
          icon: 'bolt',
        },
        {
          title: 'No Registration',
          desc: 'Play in demo mode instantly. No sign-up, no deposit.',
          icon: 'shield',
        },
        {
          title: 'Mobile Optimized',
          desc: 'Smooth performance on any phone, tablet or slow connection.',
          icon: 'phone',
        },
      ]
    : [
        {
          title: 'Мгновенный запуск',
          desc: 'Любая игра в один тап — без загрузок и ожидания.',
          icon: 'bolt',
        },
        {
          title: 'Без регистрации',
          desc: 'Демо-режим сразу. Без входа и без депозита.',
          icon: 'shield',
        },
        {
          title: 'Для смартфонов',
          desc: 'Плавно работает на любом телефоне и медленном интернете.',
          icon: 'phone',
        },
      ]

  return (
    <>
      <SiteHeader lang={lang} />

      <main id="main-content" role="main">

        {/* ── Hero ── */}
        <section className="home-hero" aria-label={t.heroTitle}>
          <div className="home-hero__bg" aria-hidden="true" />

          <div className="home-hero__inner">
            <span className="badge-gold home-hero__badge">
              {isEn ? 'Free to Play — No Registration' : 'Бесплатно — Без регистрации'}
            </span>

            <h1 className="home-hero__title">
              <span>{t.heroTitle}{' '}</span>
              <span className="home-hero__title-accent">
                {isEn ? 'Online' : 'Онлайн'}
              </span>
            </h1>

            <p className="home-hero__sub">{t.heroSub}</p>

            <div className="home-hero__actions">
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
                {isEn ? 'Browse games' : 'Смотреть игры'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>

            {/* Stats strip */}
            <dl className="home-stats" aria-label={isEn ? 'Platform stats' : 'Статистика платформы'}>
              <div className="home-stats__item">
                <dt className="home-stats__num">{games.length}+</dt>
                <dd className="home-stats__label">{isEn ? 'Games' : 'Игр'}</dd>
              </div>
              <div className="home-stats__sep" aria-hidden="true" />
              <div className="home-stats__item">
                <dt className="home-stats__num">{providerCount}+</dt>
                <dd className="home-stats__label">{isEn ? 'Providers' : 'Провайдеров'}</dd>
              </div>
              <div className="home-stats__sep" aria-hidden="true" />
              <div className="home-stats__item">
                <dt className="home-stats__num">100%</dt>
                <dd className="home-stats__label">{isEn ? 'Free demo' : 'Бесплатно'}</dd>
              </div>
            </dl>

            <p className="home-hero__legal">
              {isEn ? '18+ · Gamble responsibly · T&C apply' : '18+ · Играйте ответственно · Применяются условия'}
            </p>
          </div>
        </section>

        {/* ── Features ── */}
        <section
          className="home-features"
          aria-label={isEn ? 'Why play here' : 'Почему у нас'}
        >
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <span className="feature-card__icon" aria-hidden="true">
                {f.icon === 'bolt' && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                )}
                {f.icon === 'shield' && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                )}
                {f.icon === 'phone' && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <line x1="12" y1="18" x2="12" y2="18" />
                  </svg>
                )}
              </span>
              <div className="feature-card__body">
                <h3 className="feature-card__title">{f.title}</h3>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ── Games ── */}
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
              {isEn ? 'All Demo Games' : 'Все демо-игры'}
            </h2>
          </div>

          <GameSearch
            games={games}
            lang={lang}
            totalLabel={isEn ? 'All Games' : 'Все игры'}
            emptyLabel={isEn ? 'No games found' : 'Ничего не найдено'}
            clearLabel={isEn ? 'Clear' : 'Сбросить'}
            placeholderLabel={isEn ? 'Search games…' : 'Поиск игр…'}
          />

          {/* SEO section */}
          <div className="home-seo">
            <h2 className="home-seo__title">
              {isEn
                ? 'Play Free Demo Games — No Registration'
                : 'Играть в демо-игры бесплатно — без регистрации'}
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
