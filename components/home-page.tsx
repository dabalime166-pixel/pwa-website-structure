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
                <h1 className="home-seo__title">
                  Free Demo Games No Registration — Best Slots and Crash Games with Instant Play
                </h1>
                <p className="seo-body">
                  To choose a fair online casino and guarantee successful withdrawals, verify three things before you ever create an account: a valid regulatory license displayed in the site footer, independently certified RNG (Random Number Generator) audit reports, and clearly published withdrawal timelines backed by real user payout history. If a platform openly shares its RTP rates across every game category, submits to third-party fairness audits, and processes verified withdrawal requests within stated timeframes — you're dealing with a trustworthy operator. Every feature of this platform is built on those exact principles.
                </p>
                <p className="seo-body">
                  You're one click away from the industry's most exciting gaming library. Play casino demo for free — no download, no signup form, no strings attached. Every title in our catalog launches directly in your browser through instant play technology, powered by HTML5 for seamless performance on any device and any screen size.
                </p>

                <h2 className="seo-h2">Why Start with Free Demo Mode?</h2>
                <ul className="seo-list">
                  <li className="seo-list-item">
                    <strong>Play games online, no download required.</strong> No app store visits, no storage space sacrificed. Open a tab, pick a genre, and the gaming simulator loads in seconds — desktop, tablet, or smartphone.
                  </li>
                  <li className="seo-list-item">
                    <strong>Instant play games with zero commitment.</strong> A virtual practice balance is credited automatically. Explore paytables, trigger bonus rounds, test betting strategies — all risk-free.
                  </li>
                  <li className="seo-list-item">
                    <strong>Identical math under the hood.</strong> Demo versions run on the same certified RNG engine and the same RTP rates as their real-money counterparts. The only difference is the currency: virtual credits instead of cash.
                  </li>
                </ul>
                <p className="seo-body">
                  From classic reel formats with fixed paylines to high-speed crash mechanics where a rising multiplier can collapse at any moment — every genre is available for unlimited free exploration. Discover what truly fits your play style before risking a single cent.
                </p>

                <h2 className="seo-h2">Play Casino for Real Money — From Practice to Real Payouts</h2>
                <p className="seo-body">
                  The transition from demo to real stakes is seamless. Once you've mapped out your favorite genres in free mode, switching to gambling for real money takes minutes: create an account, confirm your age, fund your balance, and every winning spin or perfectly timed cash-out becomes a real, withdrawable amount.
                </p>

                <h3 className="seo-h3">Why Players Choose an Online Casino with Real Money and Withdrawal</h3>
                <p className="seo-body">
                  When selecting a casino for real money, financial transparency isn't optional — it's everything. Here's what that looks like in practice:
                </p>
                <ul className="seo-list">
                  <li className="seo-list-item"><strong>Published limits.</strong> Minimum and maximum withdrawal amounts are displayed upfront — no buried fine print, no surprise caps after you've already won.</li>
                  <li className="seo-list-item"><strong>Predictable processing.</strong> Instant payouts begin processing as soon as identity verification is complete. Most requests clear within hours, not business days.</li>
                  <li className="seo-list-item"><strong>Flexible payment methods.</strong> Bank cards, e-wallets, cryptocurrency, and local payment systems — choose the channel that works for your region and your preferred speed.</li>
                  <li className="seo-list-item"><strong>Play for money with withdrawal confidence.</strong> Every transaction is logged, traceable, and protected by banking-grade encryption.</li>
                </ul>

                <h3 className="seo-h3">Casino for Phone — Full Power in Your Pocket</h3>
                <p className="seo-body">
                  A mobile casino online shouldn't feel like a compromise. Our responsive interface auto-adapts to any screen size, and touch controls are engineered for swipes, taps, and long-press gestures — not awkward desktop ports. Whether you're on iOS or Android, the full catalog, cashier, and bonus dashboard are accessible through your mobile browser. No dedicated app required — just bookmark and play. This is a true casino for phone built for modern players who refuse to be tethered to a desk.
                </p>

                <h2 className="seo-h2">Slots and Crash Games — Two Genres, Two Philosophies</h2>

                <h3 className="seo-h3">Play Slots Online — Depth, Variety, and Proven Mathematics</h3>
                <p className="seo-body">
                  Slot machines remain the backbone of every serious gaming platform, and for good reason. Modern reels have evolved far beyond matching fruit symbols. Here's why best slots for money continue to dominate:
                </p>
                <ul className="seo-list">
                  <li className="seo-list-item"><strong>Mechanic diversity.</strong> Cascading reels, expanding wilds, Megaways™-style dynamic paylines, pick-and-click bonus stages, multi-level free spin rounds with progressive multipliers — each sub-genre delivers a distinct rhythm and reward cycle.</li>
                  <li className="seo-list-item"><strong>Transparent math models.</strong> Before launching any slot, you see three critical data points: RTP (return-to-player percentage), volatility rating (low, medium, or high), and maximum win potential per spin. No guesswork required.</li>
                  <li className="seo-list-item"><strong>Flexible bet ranges.</strong> Micro-stakes for marathon sessions with controlled bankroll burn, or high-limit wagers for experienced players hunting volatile jackpots — the spectrum is yours.</li>
                </ul>
                <p className="seo-body">
                  Slots for money with withdrawal on this platform run exclusively on licensed engines from top-tier software providers. Every outcome is determined by a certified RNG that neither the player nor the operator can predict or manipulate. Free slots no registration are also always available — switch between demo and real mode at any time.
                </p>

                <h3 className="seo-h3">Crash Games for Real Money — Speed, Tension, and Pure Decision-Making</h3>
                <p className="seo-body">
                  Crash format is the philosophical opposite of reel-based play. No paylines. No bonus rounds. No waiting. The mechanic is distilled to a single, pulse-raising question: when do you cash out?
                </p>
                <ul className="seo-list">
                  <li className="seo-list-item"><strong>Rising multiplier.</strong> After launch, the coefficient climbs — ×1.01… ×1.50… ×3.00… ×10.00 and beyond. Your job: hit the cash-out button before the round crashes to zero.</li>
                  <li className="seo-list-item"><strong>Instant win games for money.</strong> A single round lasts anywhere from one to thirty seconds. No lengthy animations, no filler — just raw, rapid results.</li>
                  <li className="seo-list-item"><strong>Genre variations.</strong> Minefields, towers, ladder climbs, balloon inflators — the visual skins differ, but the core loop is identical: escalating risk versus escalating reward.</li>
                  <li className="seo-list-item"><strong>Provably fair technology.</strong> Many crash titles use cryptographic hash verification, allowing you to independently confirm that each round's crash point was determined before any bets were placed.</li>
                </ul>
                <p className="seo-body">
                  Crash games with money withdrawal attract players who crave adrenaline in short bursts and want manual control over the exit moment, rather than waiting for random symbol combinations. It's a genre built on nerve, timing, and discipline.
                </p>

                <h2 className="seo-h2">Register, Deposit, and Claim Your Welcome Bonus — Three Steps to Launch</h2>

                <h3 className="seo-h3">Step 1 — Register at Casino for Real Money</h3>
                <p className="seo-body">
                  The signup form fits on a single screen: email or phone number, a secure password, and age confirmation (18+). That's it. No multi-page questionnaires. Full identity verification happens later, before your first withdrawal — it exists to protect your funds, not to slow you down. After registration, you can login to casino for real money from any device using the same credentials.
                </p>

                <h3 className="seo-h3">Step 2 — Make a Deposit in Casino</h3>
                <p className="seo-body">
                  Ready to fund your account? Top up casino account instantly using any of the supported payment methods. The minimum deposit casino threshold is set deliberately low — we believe the barrier to entry should never discourage a curious player. You decide how much you're comfortable allocating to a session, and you're never pressured to deposit more.
                </p>
                <p className="seo-body">
                  Here's how to make a deposit in online casino in practice:
                </p>
                <ul className="seo-list">
                  <li className="seo-list-item">Log in and open the Cashier section.</li>
                  <li className="seo-list-item">Select your preferred payment method.</li>
                  <li className="seo-list-item">Enter the amount (minimum is clearly displayed next to each option).</li>
                  <li className="seo-list-item">Confirm the transaction — funds arrive instantly or within minutes, depending on the channel.</li>
                </ul>

                <h3 className="seo-h3">Step 3 — Activate Your Welcome Rewards</h3>
                <ul className="seo-list">
                  <li className="seo-list-item"><strong>First deposit bonus.</strong> A percentage match on your initial deposit — effectively extra playing power that extends your session time and multiplies your opportunities. Every casino deposit with withdrawal capability applies to bonus-generated winnings, provided wagering conditions are met.</li>
                  <li className="seo-list-item"><strong>Free spins no deposit.</strong> Select promotions offer complimentary spins before you fund your balance — a chance to test real-money slot mechanics with zero personal investment.</li>
                  <li className="seo-list-item"><strong>Transparent wagering.</strong> Bonus terms, rollover requirements, game contribution percentages, and expiration dates are published before you activate anything. No post-click surprises, no hidden clauses.</li>
                </ul>
                <p className="seo-body" style={{ fontStyle: 'italic' }}>
                  <strong>Pro Tip:</strong> Before you make a deposit and lock in a bonus, open your target slots or crash games in demo mode first. Learn the volatility, understand the bonus triggers, study the paytable. That way, every unit of bonus balance is spent with precision — on mechanics you've already vetted.
                </p>

                <h2 className="seo-h2">Frequently Asked Questions</h2>

                <h3 className="seo-h3">Can I try games for free without creating an account?</h3>
                <p className="seo-body">
                  Absolutely. All free slots demo, no registration required, are accessible directly from the game catalog. The casino practice mode runs on virtual credits while using the exact same certified RNG and RTP rates as the real-money version. It's a full-fidelity gaming simulator — not a watered-down preview. Play demo for free for as long as you like, with no time limits and no pressure to convert.
                </p>

                <h3 className="seo-h3">How do I switch from demo to real-money play?</h3>
                <p className="seo-body">
                  Open any game in demo mode. When you're ready, create an account, fund your balance, and toggle from "Demo" to "Real Money" within the same game window. Your display settings and preferences carry over.
                </p>

                <h3 className="seo-h3">What payment methods are available for deposits?</h3>
                <p className="seo-body">
                  The platform supports a wide range of options — bank cards (Visa, Mastercard), e-wallets, prepaid vouchers, bank transfers, and select cryptocurrency channels. Each method shows its processing speed and minimum/maximum limits before confirmation.
                </p>

                <h3 className="seo-h3">How long do withdrawals take?</h3>
                <p className="seo-body">
                  Two factors determine speed: completed verification status and chosen payment method. Once your identity is verified, most electronic wallet withdrawals process within minutes to a few hours. Bank transfers may take slightly longer depending on your financial institution.
                </p>

                <h3 className="seo-h3">Are my financial details safe?</h3>
                <p className="seo-body">
                  All payment data is transmitted through 256-bit SSL/TLS encryption. Sensitive card information is never stored on platform servers — processing is handled entirely by PCI DSS-compliant payment gateways. Two-factor authentication adds an additional layer of account security.
                </p>

                <h3 className="seo-h3">What does volatility mean, and how should it affect my choice?</h3>
                <p className="seo-body">
                  Volatility describes the risk profile of a game. Low-volatility slots pay out smaller amounts more frequently — ideal for extended sessions. High-volatility titles pay less often but offer significantly larger potential wins. Choose based on your bankroll size and risk appetite. Demo mode is the perfect place to feel the difference before committing real funds.
                </p>

                <h2 className="seo-h2">About This Platform — Fair Play, Security, and Player Protection</h2>
                <p className="seo-body">
                  You are on a licensed online casino that operates under the oversight of a recognized regulatory authority. Every element — from game outcome generation to financial transaction processing — adheres to strict compliance standards and undergoes regular external audits.
                </p>
                <p className="seo-body">
                  Fair online casino is not a tagline here — it's an auditable set of commitments:
                </p>
                <ul className="seo-list">
                  <li className="seo-list-item"><strong>Certified RNG.</strong> The random number generator powering every game is tested and certified by an independent laboratory. Audit certificates are available upon request, and results are verifiable.</li>
                  <li className="seo-list-item"><strong>Casino with fast money withdrawal.</strong> Rapid payouts to e-wallets, predictable timelines for bank-based methods, and no fabricated delays. This is a verified casino with payout integrity — your winnings are yours, and they move when you say so.</li>
                  <li className="seo-list-item"><strong>Safe online betting environment.</strong> 256-bit SSL encryption, mandatory two-factor authentication options, and strict KYC (Know Your Customer) compliance form three layers of protection around your account and your money.</li>
                  <li className="seo-list-item"><strong>Responsible gambling 18+.</strong> Self-limitation tools �� deposit caps, loss limits, session duration timers, cooling-off periods, and self-exclusion options — are available in your account settings at all times. If gaming stops being entertainment, we provide resources and tools to help you pause or stop entirely.</li>
                </ul>
                <p className="seo-body">
                  Gambling is entertainment for adults. Play consciously. Set your limits before you start. Never wager more than you can afford to lose. If you or someone you know needs support, responsible gaming resources are always one click away in the platform footer.
                </p>
              </>
            ) : (
              <>
                <h2 className="home-seo__title">
                  Бесплатные демо-игры без регистрации — лучшие слоты и краш-игры с мгновенным запуском
                </h2>
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
                  <li className="seo-list-item"><strong>Диапазон ставок.</strong> От минимальных (подходит для долгих сессий с низким риском) до крупных — для опытных игроков, ищущих высокую ��тдачу при высокой волатильности.</li>
                </ul>
                <p className="seo-body">
                  Слоты на деньги с выводом работают на лиценз��онных движках от проверенных провайдеров, и результат каждого спина определяется генератором случайных чисел, который невозможно предсказать или подкрутить ни игроку, ни оператору.
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
