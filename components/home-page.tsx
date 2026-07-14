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
            {isEn ? (
              <>
                <p className="home-seo__title">
                  Play Free Demo Games — No Registration
                </p>
                <p className="seo-body">
                  Our platform provides instant access to the best crash games and slots in demo mode. Try Lucky Jet, Gates of Olympus, Sweet Bonanza, Big Bass Bonanza, Wolf Gold, Starlight Princess, Sugar Rush and more — all completely free, with no deposit required. Mobile-first design means every game works flawlessly on any smartphone or tablet.
                </p>
              </>
            ) : (
              <>
                <h1 className="home-seo__title">
                  Бесплатные демо-игры без регистрации — лучшие слоты и краш-игры с мгновенным запуском
                </h1>
                <p className="seo-body">
                  Здесь можно играть в демо-казино бесплатно — без скачивания приложений, без создания аккаунта и без любых обязательств. Каталог открывается прямо в браузере: выбираете жанр, нажимаете «Играть» — и симулятор загружается за секунды.
                </p>

                <h2 className="seo-h2">Почему стоит начать с демо-режима</h2>
                <ul className="seo-list">
                  <li className="seo-list-item">
                    <strong>Игры онлайн без скачивания.</strong> Ничего устанавливать не нужно — весь контент работает на HTML5 прямо во вкладке браузера, будь то десктоп или смартфон.
                  </li>
                  <li className="seo-list-item">
                    <strong>Мгновенный запуск игр.</strong> Никаких очередей и капчей. Тренировочный баланс начисляется автоматически — тестируйте механики, изучайте таблицы выплат и выбирайте жанр по душе.
                  </li>
                  <li className="seo-list-item">
                    <strong>Полная копия реального режима.</strong> Демо-версии используют тот же сертифицированный ГСЧ и те же показатели отдачи (RTP), что и платные раунды. Разница только в валюте — виртуальные кредиты вместо реальных денег.
                  </li>
                </ul>
                <p className="seo-body">
                  Коллекция охватывает все популярные категории: от классических барабанных автоматов с фиксированными линиями до высокоскоростных краш-механик, где коэффициент растёт каждую долю секунды. Попробуйте оба формата бесплатно — и поймёте, какой стиль вам ближе, до того как поставите на кон первый рубль.
                </p>

                <h2 className="seo-h2">Играть в казино на деньги — от тренировки к реальным ставкам</h2>
                <p className="seo-body">
                  Когда демо-режим освоен, переход на азартные игры на деньги занимает пару минут: регистрация, подтверждение возраста и пополнение счёта. После этого каждый выигрышный спин, каждый вовремя снятый коэффициент — это реальный баланс, доступный к выводу.
                </p>

                <h3 className="seo-h3">Почему игроки выбирают онлайн-казино на деньги с выводом</h3>
                <p className="seo-body">
                  Главный критерий при выборе казино на реальные деньги — прозрачная финансовая логика. Вот что это значит на практике:
                </p>
                <ul className="seo-list">
                  <li className="seo-list-item"><strong>Понятные лимиты.</strong> Минимальные и максимальные суммы на вывод опубликованы в открытом доступе, без мелкого шрифта.</li>
                  <li className="seo-list-item"><strong>Предсказуемые сроки.</strong> Безопасный вывод обрабатывается после прохождения верификации; большинство заявок закрывается в течение нескольких часов, а не дней.</li>
                  <li className="seo-list-item"><strong>Множество платёжных каналов.</strong> Банковские карты, электронные кошельки, СБП — каждый игрок находит удобный маршрут для денег.</li>
                </ul>

                <h3 className="seo-h3">Казино для телефона — полный функционал в кармане</h3>
                <p className="seo-body">
                  Мобильное казино онлайн — это не урезанная версия сайта, а полноценная среда для игры. Адаптивный интерфейс автоматически подстраивается под диагональ экрана, а тач-управление проектировалось под сенсорные жесты: свайпы, тапы, длинные нажатия. Всё работает одинаково стабильно на iOS и Android — без отдельного приложения, через мобильный браузер.
                </p>

                <h2 className="seo-h2">Слоты и краш-игры на деньги — два главных жанра площадки</h2>

                <h3 className="seo-h3">Играть в слоты онлайн — классика с глубиной</h3>
                <p className="seo-body">
                  Барабанные автоматы остаются ядром любого каталога, и на то есть причины. Современные слоты — это не просто «три вишенки в ряд». Вот чем они отличаются:
                </p>
                <ul className="seo-list">
                  <li className="seo-list-item"><strong>Вариативность механик.</strong> Каскадные символы, расширяющиеся «вайлды», раунды «Pick & Click», многоуровневые фриспин-сессии — каждая категория предлагает собственный игровой цикл.</li>
                  <li className="seo-list-item"><strong>Прозрачная математика.</strong> Перед запуском лучших слотов на деньги вы видите три ключевых параметра: RTP (процент возврата), волатильность (частота и размер выигрышей) и максимальный коэффициент за один раунд.</li>
                  <li className="seo-list-item"><strong>Диапазон ставок.</strong> От минимальных (подходит для долгих сессий с низким риском) до крупных — для опытных игроков, ищущих высокую отдачу при высокой волатильности.</li>
                </ul>
                <p className="seo-body">
                  Слоты на деньги с выводом работают на лицензионных движках от проверенных провайдеров, и результат каждого спина определяется генератором случайных чисел, который невозможно предсказать или подкрутить ни игроку, ни оператору.
                </p>

                <h3 className="seo-h3">Краш-игры на деньги — скорость и контроль</h3>
                <p className="seo-body">
                  Краш-формат — антипод классических барабанов. Здесь нет линий выплат и бонусных раундов. Механика сведена к чистому решению: когда забрать выигрыш?
                </p>
                <ul className="seo-list">
                  <li className="seo-list-item"><strong>Растущий коэффициент.</strong> После старта мультипликатор увеличивается — от ×1.00 и выше. Ваша задача — нажать кнопку вывода до того, как раунд оборвётся.</li>
                  <li className="seo-list-item"><strong>Мгновенные игры на деньги.</strong> Раунд длится от одной до нескольких десятков секунд — никаких длинных анимаций.</li>
                  <li className="seo-list-item"><strong>Вариации жанра.</strong> Минное поле, лестницы, воздушные шары — графические оболочки разные, но суть одна: растущий риск против растущего выигрыша.</li>
                </ul>
                <p className="seo-body">
                  Краш-механики привлекают тех, кто ценит адреналин коротких сессий и хочет контролировать момент выхода из раунда вручную, а не ждать комбинации случайных символов.
                </p>

                <h2 className="seo-h2">Регистрация, депозит и бонусы — быстрый старт за три шага</h2>

                <h3 className="seo-h3">Шаг 1 — Регистрация в казино на деньги</h3>
                <p className="seo-body">
                  Форма занимает одну экранную панель: e-mail или номер телефона, пароль, подтверждение возраста (18+). Никаких десятистраничных анкет — верификация документов проводится позже, перед первым выводом, и нужна для вашей же защиты.
                </p>

                <h3 className="seo-h3">Шаг 2 — Сделать депозит в казино</h3>
                <p className="seo-body">
                  Пополнить счёт в казино можно сразу после регистрации. Поддерживаются популярные методы оплаты с мгновенным зачислением. Минимальный депозит казино установлен на комфортном уровне, чтобы порог входа не отпугивал новичков: вы сами решаете, какую сумму готовы выделить на игровую сессию.
                </p>

                <h3 className="seo-h3">Шаг 3 — Забрать приветственные привилегии</h3>
                <ul className="seo-list">
                  <li className="seo-list-item"><strong>Бонус за первый депозит.</strong> Процентная надбавка к внесённой сумме — фактически дополнительный игровой ресурс, который увеличивает время за столом и количество попыток.</li>
                  <li className="seo-list-item"><strong>Фриспины без депозита.</strong> Ряд акций позволяет получить бесплатные вращения ещё до пополнения — это шанс испытать слоты в реальном режиме без собственных вложений.</li>
                  <li className="seo-list-item"><strong>Прозрачный вейджер.</strong> Условия отыгрыша бонусов прописаны в правилах и доступны до активации — никаких сюрпризов после нажатия кнопки «Получить».</li>
                </ul>
                <p className="seo-body" style={{ fontStyle: 'italic' }}>
                  <strong>Совет:</strong> Прежде чем сделать депозит и активировать бонус, откройте интересующие слоты или краш-игры в демо-режиме. Так вы потратите бонусный баланс осмысленно — на те механики, которые вам действительно нравятся.
                </p>

                <h2 className="seo-h2">Вопросы и ответы</h2>

                <h3 className="seo-h3">Можно ли играть бесплатно без регистрации?</h3>
                <p className="seo-body">
                  Да. Все демо-слоты бесплатно, без регистрации доступны прямо из каталога. Тренировочный режим работает на виртуальных кредитах, при этом математическая модель и сертифицированный ГСЧ идентичны реальному режиму. Это полноценный тренировочный режим казино, где вы изучаете волатильность и RTP без финансовых рисков.
                </p>

                <h3 className="seo-h3">Как сделать депозит в онлайн-казино?</h3>
                <p className="seo-body">
                  Авторизуйтесь, откройте раздел «Касса», выберите платёжный метод и укажите сумму. Средства зачисляются мгновенно или в течение нескольких минут — в зависимости от канала. Минимальный порог пополнения указан рядом с каждым методом.
                </p>

                <h3 className="seo-h3">Безопасно ли вводить платёжные данные?</h3>
                <p className="seo-body">
                  Все транзакции проходят по зашифрованному каналу (SSL/TLS). Платёжная информация не хранится на серверах площадки — обработку ведут сертифицированные платёжные шлюзы.
                </p>

                <h3 className="seo-h3">Как попробовать игры бесплатно, а потом перейти на реальные ставки?</h3>
                <p className="seo-body">
                  Откройте любой слот или краш-симулятор в демо-режиме. Когда будете готовы — зарегистрируйтесь, пополните счёт и переключите тумблер с «Демо» на «Реальная игра». Прогресс и настройки сохраняются.
                </p>

                <h3 className="seo-h3">Что влияет на скорость вывода выигрыша?</h3>
                <p className="seo-body">
                  Два фактора: пройденная верификация (подтверждение личности) и выбранный платёжный метод. После верификации большинство заявок обрабатывается в ускоренном режиме, а электронные кошельки обычно быстрее банковских переводов.
                </p>
              </>
            )}
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </>
  )
}
