'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ─── Types ─── */
interface Section {
  heading: string;
  body: string;
  formula?: string;
  bullets?: string[];
  callout?: string;
  strategies?: { title: string; bullets: string[] }[];
}

interface GuideData {
  id: string;
  icon: string;
  titleRu: string;
  titleEn: string;
  subtitleRu: string;
  subtitleEn: string;
  tagRu: string;
  tagEn: string;
  sections: { ru: Section[]; en: Section[] };
}

/* ─── Data ─── */
const GUIDES: GuideData[] = [
  /* ── PLINKO ── */
  {
    id: 'plinko',
    icon: '◉',
    titleRu: 'Механика Plinko',
    titleEn: 'Plinko Mechanics',
    subtitleRu: 'Анализ распределения вероятностей в доске Гальтона',
    subtitleEn: 'Analyzing probability distribution in the Galton board',
    tagRu: 'RTP 97–99%',
    tagEn: 'RTP 97–99%',
    sections: {
      ru: [
        {
          heading: 'Введение: Как физический эксперимент стал хитом iGaming',
          body: 'Индустрия современных аркадных игр часто черпает вдохновение в классических физических и математических моделях. Ярчайшим примером стала интеграция механики Plinko — игры, основанной на Доске Гальтона. В условиях онлайн-платформ традиционная математическая модель получила цифровую надстройку, позволяющую динамически управлять математическим ожиданием, количеством рядов и уровнем риска.',
        },
        {
          heading: '1. Математический базис: биномиальное распределение',
          body: 'Шарик падает через пирамидальную матрицу колышков. На каждом уровне он с равной вероятностью отклоняется влево или вправо — классическая последовательность независимых испытаний Бернулли. Вероятность попадания в определённую лунку рассчитывается по формуле треугольника Паскаля:',
          formula: 'P(k) = C(n, k) × p^k × (1 − p)^(n − k)',
          body2: 'Центральные лунки имеют максимальную вероятность (коэффициент < 1.00x), крайние — минимальную вероятность, но экстремальные множители до 1000x и выше.',
          bullets: [
            'Количество рядов (Lines): от 8 до 16. Больше рядов — выше крайние множители, ниже их вероятность.',
            'Уровень риска: Низкий / Средний / Высокий. Меняет веса коэффициентов без изменения геометрии доски.',
          ],
        } as Section & { body2?: string },
        {
          heading: '2. Психология падения: почему визуализация формирует доверие',
          body: 'Успех Plinko во многом связан со спецификой визуального восприятия траектории.',
          bullets: [
            'Эффект «Почти у цели» (Near-Miss): шарик 12 рядов движется к 1000x, но на последних колышках уходит в центр. Пользователь воспринимает это как случайность, а не математический закон.',
            'Пакетные запуски: возможность запускать десятки шаров подряд превращает игру в медитативное наблюдение за траекториями и снижает критичность оценки общего баланса.',
          ],
        },
        {
          heading: '3. Аналитические стратегии и управление дисперсией',
          body: 'Удержание RTP 97–99% требует понимания соотношения настроек и размера банкролла.',
          strategies: [
            {
              title: 'Стратегия «Центральный накопитель» — низкая волатильность',
              bullets: [
                '8–10 рядов, низкий или средний риск',
                'Центр возвращает 0.5x – 0.9x ставки, края ограничены 5x – 10x',
                'Минимизирует просадку, идеально для вейджера',
              ],
            },
            {
              title: 'Стратегия «Крайний пик» — экстремальная дисперсия',
              bullets: [
                '14–16 рядов, высокий риск',
                'Вероятность крайней лунки < 0.003%',
                'Банкролл должен выдержать 500–1000 ставок до одного попадания в угол',
              ],
            },
          ],
        },
        {
          heading: '4. Законы безопасного мани-менеджмента',
          callout: 'Никогда не ставьте более 0.5% от банка на один шар, особенно при пакетных запусках.',
          bullets: [
            'Смена режима при просадке: 200 циклов без множителя >20x — снизьте количество линий.',
            'Авто-игра: обязательно выставляйте Stop Loss и Take Profit.',
          ],
        },
      ],
      en: [
        {
          heading: 'Introduction: How a Physics Experiment Became an iGaming Phenomenon',
          body: 'The modern arcade gaming industry frequently derives inspiration from classical physics. The most prominent implementation is Plinko — rooted in Sir Francis Galton\'s invention. Within online platforms, this mathematical engine received a digital layer allowing users to dynamically configure expectation, row layout, and baseline risk indexes.',
        },
        {
          heading: '1. Mathematical Foundation: Binomial Distribution and Bernoulli Trials',
          body: 'A ball descends through a pyramidal peg matrix. At each row it deflects left or right with equal probability — a textbook sequence of Bernoulli trials. Landing probability follows Pascal\'s Triangle:',
          formula: 'P(k) = C(n, k) × p^k × (1 − p)^(n − k)',
          body2: 'Central pockets have maximum probability (coefficients < 1.00x); outer pockets have minimal probability but extreme multipliers up to 1000x+.',
          bullets: [
            'Row Density (Lines): scalable 8–16. More rows = higher outer multipliers, lower probability of reaching them.',
            'Risk Level: Low / Medium / High. Reallocates coefficient weights without altering board geometry.',
          ],
        } as Section & { body2?: string },
        {
          heading: '2. The Psychology of Descent: Why Visualization Solidifies Trust',
          body: 'Plinko\'s global traction is tied to trajectory visualization.',
          bullets: [
            'Near-Miss Phenomenon: a ball accelerates toward 1000x for 12 rows, deflects on the last two pins. Players process this as bad luck, not mathematical law.',
            'Continuous Batch Processing: dropping dozens of balls blurs individual losses, creating a meditative engagement that diminishes objective bankroll assessment.',
          ],
        },
        {
          heading: '3. Strategic Architectures and Variance Management',
          body: 'Sustaining the 97–99% RTP threshold demands strict harmonization between board variables and asset depth.',
          strategies: [
            {
              title: 'Conservative Central Strategy — Low Volatility',
              bullets: [
                '8–10 lines, low or medium risk profile',
                'Central buckets return 0.5x–0.9x; margins bounded by 5x–10x',
                'Limits aggressive drawdowns, optimal for wagering',
              ],
            },
            {
              title: 'Outlier Peak Model — High Variance',
              bullets: [
                '14–16 lines, high risk profile',
                'Terminal edge probability < 0.003% on 16 rows',
                'Bankroll must sustain 500–1000 wagers before a margin strike',
              ],
            },
          ],
        },
        {
          heading: '4. Rigid Asset Allocation Protocols',
          callout: 'Never assign more than 0.5% of total capital to an individual drop, especially during mass batch deployments.',
          bullets: [
            'Dynamic Re-indexing: no multipliers >20x across 200 cycles — compress line allocation.',
            'Automated Safety: always define strict Stop-Loss and Take-Profit caps.',
          ],
        },
      ],
    },
  },

  /* ── MINES ── */
  {
    id: 'mines',
    icon: '◆',
    titleRu: 'Стратегия Mines',
    titleEn: 'Mines Strategy',
    subtitleRu: 'Управление волатильностью в кастомных смарт-контрактах',
    subtitleEn: 'Volatility control in customizable smart contracts',
    tagRu: 'RTP 97%',
    tagEn: 'RTP 97%',
    sections: {
      ru: [
        {
          heading: 'Введение: новая эра гибкого настраиваемого риска',
          body: 'Современные Instant-игры дают пользователю возможность самостоятельно определять уровень волатильности каждого раунда. Игра Мины (Mines) исторически восходит к Сапёру, но в iGaming превратилась в аналитический инструмент, где знание комбинаторики способно кардинально изменить результаты.',
        },
        {
          heading: '1. Архитектура: комбинаторика квадратного поля',
          body: 'Игровое пространство — матрица 5×5 из 25 закрытых ячеек. Игрок задаёт количество мин (от 1 до 24). С каждым успешным кликом множитель растёт, но и вероятность ошибки увеличивается. Вероятность успеха на первом шаге:',
          formula: 'P(1) = (25 − M) / 25',
          body2: 'На каждом следующем шаге знаменатель уменьшается на 1 — формируется динамическая прогрессия риска.',
          callout: 'Честность подтверждается SHA-256: хэш расположения мин передаётся игроку до начала раунда. После раунда раскрывается соль для независимой верификации.',
        } as Section & { body2?: string },
        {
          heading: '2. Психология дискретного выбора и когнитивные ловушки',
          body: 'Mines создаёт уникальное когнитивное давление — без внешнего таймера игрок сам управляет темпом.',
          bullets: [
            'Паттерны удачи: диагонали и углы не снижают вероятность мины — каждая генерация независима. Любые пространственные паттерны — когнитивная иллюзия.',
            'Sunk Cost Fallacy: открыв 4 из 5 ячеек, игроки делают пятый шаг «потому что уже зашли далеко» вместо математически обоснованного кэшаута.',
          ],
          callout: 'Главный барьер в Mines — отсутствие таймера. Игра заставляет вести диалог с собственной жадностью и страхом потерять накопленный множитель.',
        },
        {
          heading: '3. Математические стратегии и кастомизация волатильности',
          body: 'Для удержания RTP ≈ 97% опытные аналитики используют два полярных подхода.',
          strategies: [
            {
              title: 'Тактика «Низкий риск — Длинная дистанция»',
              bullets: [
                '1–3 мины; открывать 3–5 ячеек за раунд',
                'Вероятность безопасного шага >80%',
                'Плавный рост множителей + прогрессивное увеличение ставок',
                'Идеально для вейджера и длительного удержания банкролла',
              ],
            },
            {
              title: 'Тактика «Охота за экстремальными множителями»',
              bullets: [
                '10–15 мин; жёсткий лимит 1–2 клика',
                'Два успешных клика при 10 минах — ставка растёт более чем в 3 раза',
                'Требует значительного запаса прочности банкролла',
              ],
            },
          ],
        },
        {
          heading: '4. Алгоритм правильного мани-менеджмента',
          callout: 'Определите конфигурацию (например: 3 мины, 4 клика) ДО начала сессии — не меняйте её импульсивно.',
          bullets: [
            'Масштабирование: базовая ставка при >7 минах — не более 1% от баланса.',
            'Фиксация профита: при росте баланса на 30–50% закрывайте сессию.',
          ],
        },
      ],
      en: [
        {
          heading: 'Introduction: A New Era of Fully Customizable Risk',
          body: 'Modern instant games offer unprecedented utility: independently calibrating the volatility index and house edge of each round. The Mines game, rooted in classic Minesweeper, has been re-engineered into a high-utility analytical environment where combinatorics knowledge can heavily dictate outcomes.',
        },
        {
          heading: '1. Process Architecture: Combinatorics of the Square Grid',
          body: 'A 5×5 matrix of 25 concealed tiles. Before each round, define stake and mine count (1–24). Each star tile increments the multiplier; a mine ends the round at total loss. Success probability on the first selection:',
          formula: 'P(1) = (25 − M) / 25',
          body2: 'The denominator shrinks by 1 on every step, creating a compounding risk curve.',
          callout: 'Fairness is enforced via SHA-256: the hash of mine positions is provided before tile selection. The server seed and salt are revealed after the round for independent verification.',
        } as Section & { body2?: string },
        {
          heading: '2. Psychology of Discrete Decisions and Cognitive Traps',
          body: 'Mines generates unique cognitive stress — no countdown timer means the player controls the tempo alone.',
          bullets: [
            'Availability Heuristics: diagonal or corner patterns do not lower mine probability. Every grid state is isolated; all spatial patterns are purely illusory.',
            'Sunk Cost Fallacy: having cleared 4 of 5 tiles, players click a 5th due to perceived investment rather than assessing the probability drop.',
          ],
          callout: 'The definitive variable in Mines is the absence of a countdown timer — forcing an unmediated dialogue with individual risk tolerance.',
        },
        {
          heading: '3. Mathematical Paradigms and Volatility Customization',
          body: 'To sustain near-97% RTP performance, practitioners implement two polar tactical blueprints.',
          strategies: [
            {
              title: 'Conservative Long-Tail Paradigm',
              bullets: [
                '1–3 mines; 3–5 tile exposures per cycle',
                'Safe exposure probability remains >80%',
                'Steady multiplier growth + managed progressive compounding',
                'Optimal for bankroll retention and wagering requirements',
              ],
            },
            {
              title: 'High-Amplitude Velocity Strategy',
              bullets: [
                '10–15 mines; 1–2 tile operational window',
                'Two clicks against 10 mines scales principal by 300%+',
                'Demands substantial structural asset depth',
              ],
            },
          ],
        },
        {
          heading: '4. Rigid Asset Management Protocols',
          callout: 'Establish an immutable matrix profile (e.g., 3 mines, 4 clicks) before starting; eradicate all impulse modifications mid-cycle.',
          bullets: [
            'Proportional Scale: under high-density profiles (7+ mines), stake ≤ 1% of aggregate bankroll.',
            'Voluntary Disconnect: upon 30–50% appreciation, conclude the session to mitigate cognitive fatigue.',
          ],
        },
      ],
    },
  },

  /* ── CRASH ── */
  {
    id: 'crash',
    icon: '▲',
    titleRu: 'Crash-игры',
    titleEn: 'Crash Games',
    subtitleRu: 'Психология быстрых выигрышей и управление рисками',
    subtitleEn: 'Psychology of instant wins and risk management',
    tagRu: 'RTP 96–97%',
    tagEn: 'RTP 96–97%',
    sections: {
      ru: [
        {
          heading: 'Введение: эволюция iGaming от слотов к мгновенным решениям',
          body: 'Индустрия онлайн-развлечений переживает фундаментальный сдвиг. Классические барабанные слоты уступают место интерактивным форматам. Crash-механики радикально меняют опыт: вместо пассивного наблюдения игрок становится активным участником, где каждая секунда напрямую влияет на результат.',
        },
        {
          heading: '1. Анатомия Crash-механики: как это работает',
          body: 'Игрок делает ставку, после чего множитель начинает расти с 1.00x. Задача — нажать «Кэшаут» до случайного краша. Если успел — ставка умножается. Если нет — ставка сгорает полностью.',
          callout: 'Технология Provably Fair: хэш исхода раунда генерируется заранее из серверного хэша и клиентских сидов. Любой может проверить честность через блокчейн-эксплорер.',
        },
        {
          heading: '2. Психология азарта: почему быстрые игры вызывают зависимость',
          body: 'Crash-игры активируют систему вознаграждения мозга интенсивнее, чем стандартные автоматы.',
          bullets: [
            'Иллюзия контроля: игрок сам выбирает момент кэшаута, и мозг интерпретирует успех как личный навык — хотя математическое ожидание неизменно.',
            'FOMO (страх упустить выгоду): наблюдая в чате множители >50x у других игроков, пользователь дольше держит ставку — и рискует всем.',
            'Эффект «Почти выигрыша»: краш на 1.98x при авто-кэшауте на 2.00x воспринимается не как потеря, а как досадная случайность.',
          ],
          callout: 'Дофаминовый отклик генерируется не в момент выплаты, а в процессе ожидания роста множителя — именно тогда напряжение достигает пика.',
        },
        {
          heading: '3. Математическое ожидание и стратегии риск-менеджмента',
          body: 'Средний RTP качественных Crash-игр: 96.0–97.0%. Краткосрочные сессии могут быть высокодоходными при правильном подходе.',
          strategies: [
            {
              title: 'Стратегия фиксированного авто-кэшаута',
              bullets: [
                'Авто-вывод на 1.20x – 1.50x',
                'Частота выигрышных раундов до 85%',
                'Требует серию побед для перекрытия одного раннего краша',
              ],
            },
            {
              title: 'Двойное покрытие (дифференцированные ставки)',
              bullets: [
                'Ставка 1: авто-кэшаут на 2.00x — окупает затраты раунда',
                'Ставка 2: держится для сверхприбыли на высоких множителях',
              ],
            },
            {
              title: 'Анти-Мартингейл',
              bullets: [
                'Увеличивать ставку только после выигрышных раундов',
                'Максимизирует профит в апстрики и минимизирует потери в даунстрики',
              ],
            },
          ],
        },
        {
          heading: '4. Практические советы по контролю банкролла',
          callout: 'Никогда не превышайте 2–5% от банка за один раунд. При потере 20% за сессию — немедленно остановитесь.',
          bullets: [
            'Не пытайтесь отыграться (Chase Losses) после серии ранних крашей.',
            'Устанавливайте жёсткий Stop-Loss перед каждой сессией.',
          ],
        },
      ],
      en: [
        {
          heading: 'Introduction: The Evolution of iGaming from Slots to Instant Decisions',
          body: 'The online entertainment industry is undergoing a fundamental paradigm shift. Traditional reel-based slots are losing ground to interactive formats. Crash mechanics radically transform the user experience: instead of passively watching reels, the player becomes an active agent where every split second directly impacts the financial outcome.',
        },
        {
          heading: '1. The Anatomy of Crash Mechanics: How It Operates',
          body: 'A player places a wager; a multiplier curve initiates from 1.00x. The objective: click Cash Out before an unpredictable crash. If executed in time — the stake is multiplied. If the graph crashes first — the wager is completely forfeited.',
          callout: 'Provably Fair Technology: the round outcome hash is generated from server seed + client seeds before the round starts. Any participant can independently verify fairness via a blockchain explorer.',
        },
        {
          heading: '2. The Psychology of Risk: Why Instant Games Captivate the Brain',
          body: 'Crash formats stimulate the brain\'s reward system far more intensely than standard slot machines.',
          bullets: [
            'Illusion of Control: the user determines the cashout moment — the subconscious interprets success as personal skill, even though the mathematical expectation remains fixed.',
            'FOMO: witnessing others secure >50x multipliers in the live feed triggers the urge to hold longer, leading to sub-optimal risk extension.',
            'Near-Miss Effect: a crash at 1.98x while auto-cashout was set at 2.00x is processed not as a total loss but as a minor frustrating near-success.',
          ],
          callout: 'The dopamine response is generated during the tense anticipation of the rising multiplier — not upon credit distribution.',
        },
        {
          heading: '3. Mathematical Expectation and Risk Management Strategies',
          body: 'Premium Crash titles average 96.0–97.0% RTP. Short-term volatility must be navigated with systematic betting architectures.',
          strategies: [
            {
              title: 'Fixed Low-Multiplier Auto-Cashout',
              bullets: [
                'Automated cashout at 1.20x–1.50x',
                'Winning round frequency up to 85%',
                'Requires a consistent streak to recuperate from a single 1.00x crash',
              ],
            },
            {
              title: 'Differentiated Dual Betting',
              bullets: [
                'Bet 1: automated exit at 2.00x — covers total round cost',
                'Bet 2: remains active to chase exponential high-amplitude gains',
              ],
            },
            {
              title: 'Modified Anti-Martingale Progression',
              bullets: [
                'Scale wager sizes strictly after winning outcomes',
                'Maximizes compound returns during positive variance; minimal baseline during negative runs',
              ],
            },
          ],
        },
        {
          heading: '4. Operational Protocols for Bankroll Preservation',
          callout: 'Never allocate more than 2–5% of the macro-bankroll to any individual game cycle. If the session depreciates by 20%, terminate immediately.',
          bullets: [
            'Eradicate emotional loss-chasing patterns after early-cycle crashes.',
            'Enforce rigid session-based Stop-Loss parameters before every session.',
          ],
        },
      ],
    },
  },
];

/* ─── Section renderer ─── */
function GuideSection({ section, idx }: { section: Section & { body2?: string }; idx: number }) {
  return (
    <div className="guide-section">
      <h3 className="guide-section__heading">
        <span className="guide-section__num">{String(idx + 1).padStart(2, '0')}</span>
        {section.heading}
      </h3>

      {section.body && <p className="guide-section__body">{section.body}</p>}

      {section.formula && (
        <div className="guide-formula">
          <span className="guide-formula__label">Formula</span>
          <code className="guide-formula__code">{section.formula}</code>
        </div>
      )}

      {(section as any).body2 && (
        <p className="guide-section__body">{(section as any).body2}</p>
      )}

      {section.callout && (
        <div className="guide-callout">
          <span className="guide-callout__icon" aria-hidden="true">!</span>
          <p className="guide-callout__text">{section.callout}</p>
        </div>
      )}

      {section.bullets && (
        <ul className="guide-bullets">
          {section.bullets.map((b, i) => (
            <li key={i} className="guide-bullets__item">
              <span className="guide-bullets__dot" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
      )}

      {section.strategies && (
        <div className="guide-strategies">
          {section.strategies.map((s, i) => (
            <div key={i} className="guide-strategy-card">
              <h4 className="guide-strategy-card__title">{s.title}</h4>
              <ul className="guide-bullets">
                {s.bullets.map((b, j) => (
                  <li key={j} className="guide-bullets__item">
                    <span className="guide-bullets__dot" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main component ─── */
export default function GuidesPage({ lang }: { lang: 'en' | 'ru' }) {
  const [active, setActive] = useState(0);
  const isEn = lang === 'en';
  const guide = GUIDES[active];
  const sections = isEn ? guide.sections.en : guide.sections.ru;

  return (
    <main className="guides-main">
      {/* ── Hero ── */}
      <div className="guides-hero">
        <p className="guides-hero__eyebrow">
          {isEn ? 'Strategy Guides' : 'Стратегические гайды'}
        </p>
        <h1 className="guides-hero__title">
          {isEn ? 'Master iGaming Mechanics' : 'Освой механики iGaming'}
        </h1>
        <p className="guides-hero__sub">
          {isEn
            ? 'In-depth analysis of probability, psychology, and bankroll strategy.'
            : 'Глубокий анализ математики, психологии и управления банкроллом.'}
        </p>
      </div>

      {/* ── Sticky tab bar ── */}
      <div className="guides-tabbar" role="tablist" aria-label={isEn ? 'Guide tabs' : 'Вкладки гайдов'}>
        {GUIDES.map((g, idx) => {
          const isSelected = active === idx;
          return (
            <button
              key={g.id}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`guide-panel-${g.id}`}
              onClick={() => setActive(idx)}
              className={`guides-tab${isSelected ? ' guides-tab--active' : ''}`}
            >
              <span className="guides-tab__icon" aria-hidden="true">{g.icon}</span>
              <span className="guides-tab__label">{isEn ? g.titleEn : g.titleRu}</span>
              <span className="guides-tab__tag">{isEn ? g.tagEn : g.tagRu}</span>
            </button>
          );
        })}
      </div>

      {/* ── Content ── */}
      <div className="guides-content-wrap">
        {/* Sidebar meta */}
        <aside className="guides-sidebar">
          <div className="guides-sidebar__card">
            <span className="guides-sidebar__icon" aria-hidden="true">{guide.icon}</span>
            <h2 className="guides-sidebar__title">{isEn ? guide.titleEn : guide.titleRu}</h2>
            <p className="guides-sidebar__sub">{isEn ? guide.subtitleEn : guide.subtitleRu}</p>
            <div className="guides-sidebar__tag">{isEn ? guide.tagEn : guide.tagRu}</div>
            <nav aria-label={isEn ? 'Sections' : 'Разделы'}>
              <ul className="guides-sidebar__toc">
                {sections.map((s, i) => (
                  <li key={i} className="guides-sidebar__toc-item">
                    <span className="guides-sidebar__toc-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="guides-sidebar__toc-label">{s.heading}</span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Article */}
        <article
          id={`guide-panel-${guide.id}`}
          role="tabpanel"
          className="guides-article"
        >
          {sections.map((section, idx) => (
            <GuideSection
              key={idx}
              section={section as Section & { body2?: string }}
              idx={idx}
            />
          ))}
        </article>
      </div>

      {/* ── Back link ── */}
      <div className="guides-back">
        <Link href={isEn ? '/en' : '/ru'} className="guides-back__link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {isEn ? 'Back to Home' : 'На главную'}
        </Link>
      </div>
    </main>
  );
}
