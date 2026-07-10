'use client';

import { useState } from 'react';
import Link from 'next/link';

/* ─── Types ─── */
interface Section {
  heading: string;
  body?: string;
  body2?: string;
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
          body: 'Шарик падает через пирамидальную матрицу колышков. На каждом уровне он с равной вероятностью отклоняется влево или вправо — классическая последовательность независимых испытаний Бернулли. Вероятность попадания в определённую лунку:',
          formula: 'P(k) = C(n, k) × p^k × (1 − p)^(n − k)',
          body2: 'Центральные лунки имеют максимальную вероятность (коэффициент < 1.00x), крайние — минимальную вероятность, но экстремальные множители до 1000x и выше.',
          bullets: [
            'Количество рядов (Lines): от 8 до 16. Больше рядов — выше крайние множители, ниже их вероятность.',
            'Уровень риска: Низкий / Средний / Высокий — меняет веса коэффициентов без изменения геометрии доски.',
          ],
        },
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
          body: "The modern arcade gaming industry frequently derives inspiration from classical physics. The most prominent implementation is Plinko — rooted in Sir Francis Galton's invention. Within online platforms, this mathematical engine received a digital layer allowing users to dynamically configure expectation, row layout, and baseline risk indexes.",
        },
        {
          heading: '1. Mathematical Foundation: Binomial Distribution and Bernoulli Trials',
          body: "A ball descends through a pyramidal peg matrix. At each row it deflects left or right with equal probability — a textbook sequence of Bernoulli trials. Landing probability follows Pascal's Triangle:",
          formula: 'P(k) = C(n, k) × p^k × (1 − p)^(n − k)',
          body2: 'Central pockets have maximum probability (coefficients < 1.00x); outer pockets have minimal probability but extreme multipliers up to 1000x+.',
          bullets: [
            'Row Density (Lines): scalable 8–16. More rows = higher outer multipliers, lower probability of reaching them.',
            'Risk Level: Low / Medium / High — reallocates coefficient weights without altering board geometry.',
          ],
        },
        {
          heading: '2. The Psychology of Descent: Why Visualization Solidifies Trust',
          body: "Plinko's global traction is tied to trajectory visualization.",
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
          callout: 'Честность подтверждается SHA-256: хэш расположения мин передаётся игроку до начала раунда.',
        },
        {
          heading: '2. Психология дискретного выбора и когнитивные ловушки',
          body: 'Mines создаёт уникальное когнитивное давление — без внешнего таймера игрок сам управляет темпом.',
          bullets: [
            'Паттерны удачи: диагонали и углы не снижают вероятность мины — каждая генерация независима.',
            'Sunk Cost Fallacy: открыв 4 из 5 ячеек, игроки делают пятый шаг вместо математически обоснованного кэшаута.',
          ],
          callout: 'Главный барьер в Mines — отсутствие таймера. Игра заставляет вести диалог с собственной жадностью.',
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
                'Плавный рост множителей; идеально для вейджера',
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
          body: 'A 5×5 matrix of 25 concealed tiles. Before each round, define stake and mine count (1–24). Each star tile increments the multiplier; a mine ends the round. Success probability on the first selection:',
          formula: 'P(1) = (25 − M) / 25',
          body2: 'The denominator shrinks by 1 on every step, creating a compounding risk curve.',
          callout: 'Fairness is enforced via SHA-256: the hash of mine positions is provided before tile selection.',
        },
        {
          heading: '2. Psychology of Discrete Decisions and Cognitive Traps',
          body: 'Mines generates unique cognitive stress — no countdown timer means the player controls the tempo alone.',
          bullets: [
            'Availability Heuristics: diagonal or corner patterns do not lower mine probability. Every grid state is isolated.',
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
          heading: 'Введение: эволюция iGaming',
          body: 'Индустрия онлайн-развлечений переживает фундаментальный сдвиг. Классические барабанные слоты уступают место интерактивным форматам. Crash-механики радикально меняют опыт: вместо пассивного наблюдения игрок становится активным участником.',
        },
        {
          heading: '1. Анатомия Crash-механики: как это работает',
          body: 'Игрок делает ставку, после чего множитель начинает расти с 1.00x. Задача — нажать «Кэшаут» до случайного краша. Если успел — ставка умножается. Если нет — ставка сгорает полностью.',
          callout: 'Технология Provably Fair: хэш исхода раунда генерируется заранее из серверного хэша и клиентских сидов.',
        },
        {
          heading: '2. Психология азарта: почему быстрые игры вызывают зависимость',
          body: 'Crash-игры активируют систему вознаграждения мозга интенсивнее, чем стандартные автоматы.',
          bullets: [
            'Иллюзия контроля: игрок сам выбирает момент кэшаута, и мозг интерпретирует успех как личный навык.',
            'FOMO: наблюдая множители >50x у других игроков, пользователь дольше держит ставку — и рискует всем.',
            'Эффект «Почти выигрыша»: краш на 1.98x при авто-кэшауте на 2.00x воспринимается как досадная случайность.',
          ],
          callout: 'Дофаминовый отклик генерируется в процессе ожидания роста множителя — именно тогда напряжение достигает пика.',
        },
        {
          heading: '3. Стратегии риск-менеджмента',
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
              title: 'Двойное покрытие',
              bullets: [
                'Ставка 1: авто-кэшаут на 2.00x — окупает затраты раунда',
                'Ставка 2: держится для сверхприбыли на высоких множителях',
              ],
            },
            {
              title: 'Анти-Мартингейл',
              bullets: [
                'Увеличивать ставку только после выигрышных раундов',
                'Максимизирует профит в апстрики, минимизирует потери в даунстрики',
              ],
            },
          ],
        },
        {
          heading: '4. Контроль банкролла',
          callout: 'Никогда не превышайте 2–5% от банка за один раунд. При потере 20% за сессию — немедленно остановитесь.',
          bullets: [
            'Не пытайтесь отыграться после серии ранних крашей.',
            'Устанавливайте жёсткий Stop-Loss перед каждой сессией.',
          ],
        },
      ],
      en: [
        {
          heading: 'Introduction: The Evolution of iGaming',
          body: 'The online entertainment industry is undergoing a fundamental paradigm shift. Traditional reel-based slots are losing ground to interactive formats. Crash mechanics radically transform the user experience: instead of passively watching reels, the player becomes an active agent.',
        },
        {
          heading: '1. The Anatomy of Crash Mechanics',
          body: 'A player places a wager; a multiplier curve initiates from 1.00x. The objective: click Cash Out before an unpredictable crash. If executed in time — the stake is multiplied. If the graph crashes first — the wager is completely forfeited.',
          callout: 'Provably Fair Technology: the round outcome hash is generated from server seed + client seeds before the round starts.',
        },
        {
          heading: '2. The Psychology of Risk: Why Instant Games Captivate',
          body: "Crash formats stimulate the brain's reward system far more intensely than standard slot machines.",
          bullets: [
            'Illusion of Control: the user determines the cashout moment — the subconscious interprets success as personal skill.',
            'FOMO: witnessing others secure >50x multipliers in the live feed triggers the urge to hold longer.',
            'Near-Miss Effect: a crash at 1.98x while auto-cashout was set at 2.00x is processed as a minor near-success rather than a total loss.',
          ],
          callout: 'The dopamine response is generated during the tense anticipation of the rising multiplier — not upon credit distribution.',
        },
        {
          heading: '3. Risk Management Strategies',
          body: 'Average RTP of quality Crash games: 96.0–97.0%.',
          strategies: [
            {
              title: 'Fixed Auto-Cashout Strategy',
              bullets: [
                'Auto-withdraw at 1.20x – 1.50x',
                'Win frequency up to 85%',
                'Requires a streak of wins to offset one early crash',
              ],
            },
            {
              title: 'Dual Coverage',
              bullets: [
                'Bet 1: auto-cashout at 2.00x — covers round costs',
                'Bet 2: held for super-profit on high multipliers',
              ],
            },
            {
              title: 'Anti-Martingale',
              bullets: [
                'Increase stake only after winning rounds',
                'Maximizes profit in upstreaks, minimizes losses in downstreaks',
              ],
            },
          ],
        },
        {
          heading: '4. Bankroll Control',
          callout: 'Never exceed 2–5% of bankroll per round. If you lose 20% in a session — stop immediately.',
          bullets: [
            'Never chase losses after a series of early crashes.',
            'Set a strict Stop-Loss before every session.',
          ],
        },
      ],
    },
  },

  /* ── MISTAKES ── */
  {
    id: 'mistakes',
    icon: '✕',
    titleRu: 'Ошибки игроков',
    titleEn: 'Player Mistakes',
    subtitleRu: 'Самые распространённые ошибки и как их избежать',
    subtitleEn: 'The most common mistakes and how to avoid them',
    tagRu: 'Советы',
    tagEn: 'Tips',
    sections: {
      ru: [
        {
          heading: 'Введение',
          body: 'Успех в онлайн-казино зависит не только от удачи, но и от подхода к игре. Многие игроки совершают одинаковые ошибки, которые приводят к быстрой потере игрового банка, эмоциональным решениям и разочарованию. Большинство подобных ситуаций можно избежать, если заранее понимать основные принципы ответственной игры.',
        },
        {
          heading: '1. Игра без заранее установленного бюджета',
          body: 'Одной из самых распространённых ошибок является отсутствие игрового бюджета. Некоторые пользователи начинают игру, не определив сумму, которую готовы потратить на развлечение.',
          callout: 'Перед началом сессии определите сумму, потеря которой не повлияет на личный бюджет. После достижения лимита — завершите игру.',
        },
        {
          heading: '2. Погоня за потерями',
          body: 'Желание быстро вернуть потерянные деньги известно как погоня за потерями (chasing losses). Это одна из главных причин чрезмерных расходов. Результат каждого раунда определяется случайным образом, поэтому увеличение ставок не повышает вероятность выигрыша.',
        },
        {
          heading: '3. Слишком большие ставки и игра на эмоциях',
          body: 'Большие ставки позволяют выиграть больше, однако одновременно ускоряют расходование банкролла. Опытные игроки рекомендуют использовать на одну ставку не более 1–3% от общего игрового бюджета.',
          bullets: [
            'После крупного выигрыша избегайте чрезмерной уверенности.',
            'После серии проигрышей не поддавайтесь желанию немедленно отыграться.',
            'Делайте регулярные перерывы и сохраняйте спокойствие.',
          ],
        },
        {
          heading: '4. Игнорирование RTP, волатильности и бонусных условий',
          body: 'Перед запуском игрового автомата важно учитывать RTP, уровень волатильности, максимальный выигрыш и бонусные функции. Также многие игроки забывают читать условия бонусов.',
          bullets: [
            'Требования по вейджеру могут существенно влиять на реальную ценность бонуса.',
            'Максимальный размер ставки во время отыгрыша — важный параметр.',
            'Срок действия бонуса ограничен — не допускайте его истечения.',
          ],
        },
        {
          heading: '5. Вера в мифы и «секретные стратегии»',
          body: 'Лицензированные игровые автоматы работают на основе генератора случайных чисел (RNG), а каждый спин является полностью независимым событием. Не существует стратегии, которая могла бы гарантировать выигрыш.',
          callout: 'Азартные игры — это развлечение. Не воспринимайте их как способ заработка или решения финансовых проблем.',
        },
      ],
      en: [
        {
          heading: 'Introduction',
          body: 'Online casino games are designed to provide entertainment. However, many players make avoidable mistakes that negatively affect their gaming experience and quickly deplete their bankroll. In most cases, these mistakes are not related to bad luck but to poor money management, emotional decision-making, or unrealistic expectations.',
        },
        {
          heading: '1. Playing Without a Budget',
          body: 'One of the biggest mistakes players make is starting a gaming session without setting a clear spending limit. Without a predetermined bankroll, it becomes much easier to overspend and make emotional decisions during gameplay.',
          callout: 'Before placing your first bet, decide how much money you are willing to spend purely for entertainment. Once your gambling budget has been reached, end the session.',
        },
        {
          heading: '2. Chasing Losses',
          body: "Trying to recover losses immediately is one of the most common and costly gambling mistakes. This behavior, known as chasing losses, often results in even greater financial losses. Every spin is independent — previous outcomes have absolutely no influence on future results.",
        },
        {
          heading: '3. Betting Too Much and Letting Emotions Control Decisions',
          body: 'Higher wagers increase the value of potential payouts, but they also drain your bankroll much faster. Many experienced players recommend risking no more than 1% to 3% of your total bankroll on a single spin.',
          bullets: [
            'After a big win, avoid becoming overconfident and increasing bets unnecessarily.',
            'After losses, resist the urge to make impulsive decisions.',
            'Taking regular breaks helps maintain better discipline throughout a session.',
          ],
        },
        {
          heading: '4. Ignoring RTP, Volatility and Bonus Terms',
          body: 'Before selecting a slot, check RTP, volatility, maximum win potential, and bonus features. Many players also activate promotions without reading the rules.',
          bullets: [
            'Wagering requirements determine how many times you must wager before withdrawing.',
            'Maximum bet limits during wagering are often overlooked.',
            'Bonus validity periods expire — always check the deadline.',
          ],
        },
        {
          heading: '5. Believing Gambling Myths',
          body: 'Modern online slots operate using certified Random Number Generators (RNGs), meaning every spin is completely random and independent. No betting system or secret strategy can change the mathematical probability of a winning combination.',
          callout: 'Treat gambling as entertainment rather than guaranteed income. Most mistakes stem from poor financial planning, not bad luck.',
        },
      ],
    },
  },

  /* ── RTP ── */
  {
    id: 'rtp',
    icon: '%',
    titleRu: 'RTP и волатильность',
    titleEn: 'RTP & Volatility',
    subtitleRu: 'Ключевые параметры современных слотов',
    subtitleEn: 'Key statistics of modern slot machines',
    tagRu: 'Механика',
    tagEn: 'Mechanics',
    sections: {
      ru: [
        {
          heading: 'Введение',
          body: 'При выборе игрового автомата многие пользователи обращают внимание не только на оформление, количество бонусных функций или максимальный выигрыш. Не менее важными характеристиками считаются RTP, волатильность и дисперсия — именно эти показатели помогают лучше понять особенности конкретного слота.',
        },
        {
          heading: '1. Что такое RTP',
          body: 'RTP (Return to Player) — это показатель теоретического возврата игроку, выраженный в процентах. Он демонстрирует, какая часть всех сделанных ставок в долгосрочной перспективе возвращается участникам игры в виде выигрышей.',
          formula: 'RTP 96% → на каждые $100 ставок теоретически возвращается $96',
          bullets: [
            'До 94% — относительно низкий показатель',
            '95–96% — средний уровень',
            '96–97% — хороший RTP',
            'Выше 97% — высокий показатель возврата',
          ],
          callout: 'RTP рассчитывается на миллионы игровых раундов. Он не гарантирует конкретный результат отдельной сессии.',
        },
        {
          heading: '2. Что такое волатильность',
          body: 'Волатильность показывает уровень риска игрового автомата. Именно этот параметр определяет, насколько часто выпадают выигрыши и какого размера они могут быть.',
          strategies: [
            {
              title: 'Низкая волатильность',
              bullets: [
                'Частые выплаты небольшого размера',
                'Небольшие просадки; комфортная игра при ограниченном банкролле',
                'Подходит для длительных сессий',
              ],
            },
            {
              title: 'Высокая волатильность',
              bullets: [
                'Редкие выигрыши, но высокий потенциал',
                'Длинные серии без значительных выплат',
                'Требует большего банкролла и терпения',
              ],
            },
          ],
        },
        {
          heading: '3. Как RTP и волатильность работают вместе',
          body: 'Одной из самых распространённых ошибок считается мнение, что высокий RTP автоматически означает частые выигрыши. Два автомата с одинаковым RTP 96.5% могут иметь совершенно разный игровой процесс из-за разной волатильности.',
          callout: 'Для игроков с небольшим банкроллом — низкая или средняя волатильность. Для охотников за крупными выигрышами — высокая волатильность.',
        },
        {
          heading: '4. Распространённые мифы о RTP',
          bullets: [
            'Миф: после серии проигрышей автомат обязательно выплатит крупный выигрыш. Факт: каждый спин независим.',
            'Миф: высокий RTP гарантирует прибыль. Факт: RTP — математическая характеристика, а не обещание выигрыша.',
            'Миф: казино может менять RTP во время игры. Факт: параметры задаются производителем и проходят независимую сертификацию.',
          ],
        },
      ],
      en: [
        {
          heading: 'Introduction',
          body: 'When choosing an online slot, most players pay attention to graphics, bonus features and jackpot size. However, the most important characteristics of any slot machine are often hidden in its technical specifications: RTP, volatility, and variance.',
        },
        {
          heading: '1. What Is RTP?',
          body: "RTP (Return to Player) represents the theoretical percentage of all wagered money that a slot returns to players over a very long period of time. For example, if a slot has an RTP of 96%, it theoretically pays back $96 for every $100 wagered across millions of spins.",
          formula: 'RTP 96% → $96 returned per $100 wagered over millions of spins',
          bullets: [
            'Below 94% — relatively low RTP',
            '95%–96% — average RTP',
            '96%–97% — good RTP',
            'Above 97% — very high RTP',
          ],
          callout: 'RTP is calculated over millions of game rounds. It does not predict the outcome of a single gaming session.',
        },
        {
          heading: '2. What Is Volatility?',
          body: 'Volatility describes how frequently a slot pays and how large those payouts are likely to be. A high-volatility slot produces fewer winning combinations but offers the potential for much larger payouts.',
          strategies: [
            {
              title: 'Low Volatility',
              bullets: [
                'Frequent small payouts',
                'Lower balance fluctuations; suitable for smaller bankrolls',
                'Best for longer gaming sessions',
              ],
            },
            {
              title: 'High Volatility',
              bullets: [
                'Rare wins but high potential',
                'Longer losing streaks before significant payouts',
                'Requires a larger bankroll and patience',
              ],
            },
          ],
        },
        {
          heading: '3. How RTP and Volatility Work Together',
          body: 'One of the biggest misconceptions is that a high RTP automatically means frequent wins. Two games that both have an RTP of 96.5% can feel completely different to play due to their different volatility levels.',
          callout: 'Players with smaller budgets often prefer low or medium-volatility slots. Those aiming for larger payouts may choose high-volatility games despite the increased risk.',
        },
        {
          heading: '4. Common Misconceptions',
          bullets: [
            'Myth: a slot must pay after a long losing streak. Fact: every spin is generated independently.',
            'Myth: a higher RTP guarantees profit. Fact: RTP is a theoretical statistical value, not a guarantee.',
            'Myth: casinos change RTP during gameplay. Fact: RTP is predetermined by the developer and independently certified.',
          ],
        },
      ],
    },
  },

  /* ── BONUSES ── */
  {
    id: 'bonuses',
    icon: '★',
    titleRu: 'Бонусы казино',
    titleEn: 'Casino Bonuses',
    subtitleRu: 'Приветственные предложения, фриспины и вейджер',
    subtitleEn: 'Welcome bonuses, free spins and wagering requirements',
    tagRu: 'Бонусы',
    tagEn: 'Bonuses',
    sections: {
      ru: [
        {
          heading: 'Введение',
          body: 'Бонусные предложения стали неотъемлемой частью современных онлайн-казино. Практически каждая игровая платформа предлагает различные акции для новых и постоянных пользователей. Однако далеко не все игроки понимают, как работают подобные предложения.',
        },
        {
          heading: '1. Приветственный бонус и бонус на депозит',
          body: 'Наиболее распространённым видом акции является приветственный бонус — он предоставляется новым пользователям после регистрации и первого пополнения счёта. Размер депозитного бонуса рассчитывается в процентах от внесённой суммы.',
          bullets: [
            'Бонус 50% на депозит',
            'Бонус 100% на первое пополнение',
            'Бездепозитный бонус — без обязательного пополнения, но с более строгими условиями',
          ],
        },
        {
          heading: '2. Бесплатные вращения (Free Spins)',
          body: 'Фриспины позволяют получить определённое количество бесплатных вращений в выбранных игровых автоматах без необходимости использовать собственные средства.',
          callout: 'Перед использованием фриспинов уточните: список доступных слотов, срок действия акции, требования по отыгрышу и максимальную сумму выигрыша.',
        },
        {
          heading: '3. Что такое вейджер',
          body: 'Вейджер (Wagering Requirement) — это условие, определяющее, сколько раз необходимо поставить сумму бонуса перед возможностью вывести выигрыш.',
          formula: 'Бонус $100 × вейджер 35 = $3500 необходимо поставить',
          callout: 'Выполнение вейджера не означает обязательную потерю средств. Он лишь определяет необходимый игровой оборот.',
        },
        {
          heading: '4. Кэшбэк, программа лояльности и советы',
          body: 'Кэшбэк — возврат части проигранных средств за определённый период. Программа лояльности открывает дополнительные преимущества для постоянных игроков.',
          strategies: [
            {
              title: 'На что обращать внимание при выборе бонуса',
              bullets: [
                'Размер вейджера и минимальный депозит',
                'Срок действия акции и список игр',
                'Максимальная сумма вывода',
                'Ограничения по максимальной ставке',
              ],
            },
            {
              title: 'Распространённые ошибки игроков',
              bullets: [
                'Активация акции без чтения правил',
                'Игнорирование требований по вейджеру',
                'Превышение максимальной ставки во время отыгрыша',
                'Использование бонуса после окончания срока действия',
              ],
            },
          ],
        },
      ],
      en: [
        {
          heading: 'Introduction',
          body: 'Bonuses have become one of the most attractive features of modern online casinos. Nearly every gaming platform offers promotions designed to reward both new and existing players. While bonuses can significantly enhance the gaming experience, many players are unfamiliar with the terms and conditions that accompany them.',
        },
        {
          heading: '1. Welcome Bonuses and Deposit Bonuses',
          body: 'The welcome bonus is one of the most popular promotions available at online casinos, usually offered to new players after they create an account and make their first deposit. Deposit bonuses are generally calculated as a percentage of the deposited amount.',
          bullets: [
            '50% Deposit Bonus',
            '100% First Deposit Bonus',
            'No Deposit Bonus — no initial deposit required, but with stricter wagering requirements',
          ],
        },
        {
          heading: '2. Free Spins',
          body: 'Free Spins are among the most popular casino rewards. Players receive a fixed number of complimentary spins on selected slot games without risking their own money.',
          callout: 'Before activating Free Spins, check: eligible slot games, promotion expiration date, wagering requirements, and maximum withdrawal limits.',
        },
        {
          heading: '3. What Are Wagering Requirements?',
          body: 'A wagering requirement determines how many times a player must wager the bonus amount before winnings can be withdrawn.',
          formula: '$100 bonus × 35x wagering = $3,500 must be wagered',
          callout: 'Wagering requirements do not guarantee losses. They simply establish the amount of betting activity required before withdrawals are permitted.',
        },
        {
          heading: '4. Cashback, Loyalty Programs and Tips',
          body: 'Cashback promotions return a percentage of a player\'s net losses. Loyalty programs reward long-term players with exclusive benefits.',
          strategies: [
            {
              title: 'What to Look for Before Claiming a Bonus',
              bullets: [
                'Wagering requirements and minimum deposit',
                'Bonus validity period and eligible games',
                'Maximum withdrawal limits',
                'Maximum betting restrictions during wagering',
              ],
            },
            {
              title: 'Common Bonus Mistakes',
              bullets: [
                'Accepting bonuses without reading the terms',
                'Ignoring wagering requirements',
                'Exceeding the maximum allowed bet during wagering',
                'Allowing the bonus to expire',
              ],
            },
          ],
        },
      ],
    },
  },

  /* ── RESPONSIBLE GAMBLING ── */
  {
    id: 'responsible',
    icon: '◎',
    titleRu: 'Ответственная игра',
    titleEn: 'Responsible Gambling',
    subtitleRu: 'Управление банкроллом и безопасная игра',
    subtitleEn: 'Bankroll management and safer casino play',
    tagRu: 'Безопасность',
    tagEn: 'Safety',
    sections: {
      ru: [
        {
          heading: 'Введение',
          body: 'Азартные игры должны оставаться формой развлечения, а не способом заработка. Именно поэтому опытные игроки уделяют особое внимание грамотному управлению собственным банкроллом. Правильный подход помогает контролировать расходы, избегать эмоциональных решений и получать удовольствие от игрового процесса.',
        },
        {
          heading: '1. Что такое банкролл и почему важно им управлять',
          body: 'Банкролл — это сумма денежных средств, которую игрок заранее выделяет исключительно для развлечений в онлайн-казино. Эти деньги не должны использоваться для оплаты повседневных расходов.',
          bullets: [
            'Контролируйте расходы и увеличьте продолжительность игровых сессий',
            'Снизьте влияние эмоций и избегайте импульсивных решений',
            'Даже при удачной серии продолжайте придерживаться стратегии',
          ],
        },
        {
          heading: '2. Правила безопасной игры',
          body: 'Многие специалисты рекомендуют использовать на одно вращение не более 1–3% от текущего игрового банка.',
          strategies: [
            {
              title: 'Правила управления банкроллом',
              bullets: [
                'Определите игровой бюджет до начала сессии',
                'Ставка не более 1–3% от банка на одно вращение',
                'Не пытайтесь отыграться после серии неудач',
                'Фиксируйте прибыль: при росте баланса на 30–50% — завершите сессию',
              ],
            },
            {
              title: 'Встроенные инструменты контроля',
              bullets: [
                'Лимиты на депозиты и ограничения по времени',
                'Лимиты проигрыша и напоминания о продолжительности',
                'Временная блокировка аккаунта и самоисключение',
              ],
            },
          ],
        },
        {
          heading: '3. Здоровые игровые привычки',
          body: 'Ответственная игра начинается с правильного отношения к азартным развлечениям. Не стоит ��оспринимать их как источник стабильного дохода или способ решения финансовых проблем.',
          callout: 'Если выделенная сумма закончилась — завершайте сессию. Если баланс значительно вырос — выведите часть выигрыша и продолжите на меньшую сумму.',
          bullets: [
            'Делайте перерывы каждые 45–60 минут',
            'Не играйте в состоянии усталости или сильных эмоций',
            'Воспринимайте выигрыши как приятный бонус, а не как гарантированный результат',
          ],
        },
      ],
      en: [
        {
          heading: 'Introduction',
          body: 'Online casino games are designed to provide entertainment rather than a reliable source of income. One of the most effective ways to enjoy casino games while maintaining control is through responsible gambling and proper bankroll management.',
        },
        {
          heading: '1. What Is a Bankroll and Why Does It Matter?',
          body: 'A bankroll is the amount of money you have specifically set aside for gambling. This budget should be completely separate from your everyday finances and should only include funds you can comfortably afford to lose.',
          bullets: [
            'Better control over gambling expenses',
            'Longer and more enjoyable gaming sessions',
            'Reduced emotional pressure during wins and losses',
          ],
        },
        {
          heading: '2. Rules for Safer Play',
          body: 'Many experienced players recommend risking no more than 1% to 3% of your total bankroll on a single spin or game round.',
          strategies: [
            {
              title: 'Bankroll Management Rules',
              bullets: [
                'Set a gambling budget before every session',
                'Keep individual bets at 1–3% of total bankroll',
                'Never chase losses by increasing your wagers',
                'Protect profits: if your balance grows 30–50%, consider ending the session',
              ],
            },
            {
              title: 'Built-in Responsible Gambling Tools',
              bullets: [
                'Deposit limits and session time reminders',
                'Loss limits and daily/weekly spending caps',
                'Temporary account suspension and self-exclusion',
              ],
            },
          ],
        },
        {
          heading: '3. Building Healthy Gambling Habits',
          body: 'Responsible gambling is based on discipline rather than luck. Players who consistently follow basic principles enjoy a more balanced and enjoyable gaming experience.',
          callout: 'If your budget is exhausted, end the session. If your balance has grown significantly, withdraw a portion and continue with a smaller amount.',
          bullets: [
            'Take breaks every 45–60 minutes',
            'Avoid playing while tired or emotionally upset',
            'View winnings as a pleasant bonus, not a guaranteed outcome',
          ],
        },
      ],
    },
  },

  /* ── SLOT MYTHS ── */
  {
    id: 'myths',
    icon: '?',
    titleRu: 'Мифы о слотах',
    titleEn: 'Slot Myths',
    subtitleRu: 'Правда о «горячих» автоматах и стратегиях',
    subtitleEn: 'The truth about hot slots and winning strategies',
    tagRu: 'Мифы',
    tagEn: 'Myths',
    sections: {
      ru: [
        {
          heading: 'Введение',
          body: 'Игровые автоматы остаются одной из самых популярных категорий развлечений в онлайн-казино. Вместе с популярностью появилось множество мифов, которые передаются из поколения в поколение. Разберём самые распространённые мифы и выясним, что действительно влияет на игровой процесс.',
        },
        {
          heading: 'Миф №1: Существуют «горячие» и «холодные» слоты',
          body: 'Согласно распространённому мнению, «горячий» слот недавно начал активно выплачивать выигрыши, поэтому вероятность очередной крупной выплаты якобы выше.',
          callout: 'Факт: игровые автоматы работают на основе генератора случайных чисел (RNG). Каждое вращение является независимым событием и не связано с предыдущими результатами.',
        },
        {
          heading: 'Мифы №2, №3 и №4',
          bullets: [
            'Миф: после серии проигрышей обязательно будет выигрыш. Факт: каждый спин полностью независим — «ошибка игрока».',
            'Миф: можно разработать беспроигрышную стратегию. Факт: никакая стратегия не способна изменить вероятность выпадения выигрышной комбинации.',
            'Миф: большие ставки повышают вероятность выигрыша. Факт: размер ставки влияет на сумму выплаты, но не на вероятность её появления.',
          ],
        },
        {
          heading: 'Мифы №5, №6, №7, №8',
          bullets: [
            'Миф: казино может управлять результатами каждого игрока. Факт: лицензированные слоты проходят независимое тестирование и сертификацию.',
            'Миф: бесплатная игра отличается от режима на реальные деньги. Факт: лицензированные разработчики используют одинаковую механику.',
            'Миф: высокий RTP гарантирует прибыль. Факт: RTP рассчитывается на миллионы раундов и не гарантирует выигрыш конкретному игроку.',
            'Миф: время суток влияет на вероятность выигрыша. Факт: RNG не зависит от времени суток, количества игроков или дня недели.',
          ],
        },
        {
          heading: 'Что действительно влияет на игровой процесс',
          body: 'Вместо мифов стоит изучать реальные характеристики слотов.',
          bullets: [
            'Показатель RTP и уровень волатильности',
            'Максимальный выигрыш и бонусные функции',
            'Количество линий выплат и специальные символы',
            'Наличие бесплатных вращений и множителей',
          ],
          callout: 'Грамотный выбор слота на основе реальных характеристик — лучшая стратегия для долгосрочной игры.',
        },
      ],
      en: [
        {
          heading: 'Introduction',
          body: 'Online slots are among the most popular casino games, attracting millions of players. As slot games have grown in popularity, countless myths and misconceptions have emerged. Understanding how these games actually work helps players make informed decisions.',
        },
        {
          heading: 'Myth #1: Hot and Cold Slots Really Exist',
          body: 'A "hot slot" is believed to be a machine that has recently produced several wins and is expected to continue paying out. A "cold slot" is thought to have gone a long time without awarding significant prizes.',
          callout: 'Fact: licensed online slots operate using a Random Number Generator (RNG). Every spin is completely independent of previous results. There is no reliable way to identify a hot or cold slot.',
        },
        {
          heading: 'Myths #2, #3 and #4',
          bullets: [
            'Myth: a big win is guaranteed after a long losing streak. Fact: every spin has exactly the same probability — known as the Gambler\'s Fallacy.',
            'Myth: there is a guaranteed winning strategy. Fact: no betting system can change the mathematical probability of a winning combination appearing.',
            'Myth: higher bets increase your chances of winning. Fact: bet size raises the value of potential payouts but does not change the probability of winning combinations.',
          ],
        },
        {
          heading: 'Myths #5, #6, #7 and #8',
          bullets: [
            'Myth: casinos control individual player results. Fact: certified slot games are independently tested and regularly verified.',
            'Myth: demo slots pay more than real-money games. Fact: reputable developers use the same mathematical model for both modes.',
            'Myth: a high RTP guarantees profit. Fact: RTP is a theoretical statistical value calculated over millions of spins.',
            'Myth: time of day affects winning chances. Fact: the RNG operates continuously, independent of time, player count, or weekday.',
          ],
        },
        {
          heading: 'What Actually Influences Slot Gameplay',
          body: 'Rather than relying on myths, focus on real game characteristics.',
          bullets: [
            'RTP percentage and volatility level',
            'Maximum win potential and bonus features',
            'Number of paylines and special symbols',
            'Free Spins, Wild and Scatter symbols, multipliers',
          ],
          callout: 'Choosing a slot based on its actual technical characteristics is the best strategy for a long-term enjoyable gaming experience.',
        },
      ],
    },
  },
];

/* ─── Section Renderer ─── */
function GuideSection({ section, idx }: { section: Section; idx: number }) {
  return (
    <div className="guide-section">
      <h3 className="guide-section__heading">
        <span className="guide-section__num">0{idx + 1}</span>
        {section.heading}
      </h3>
      {section.body && <p className="guide-section__body">{section.body}</p>}
      {section.formula && (
        <div className="guide-formula">
          <span className="guide-formula__label">Formula</span>
          <code className="guide-formula__code">{section.formula}</code>
        </div>
      )}
      {section.body2 && <p className="guide-section__body">{section.body2}</p>}
      {section.callout && (
        <div className="guide-callout">
          <span className="guide-callout__icon" aria-hidden="true">!</span>
          <p className="guide-callout__text">{section.callout}</p>
        </div>
      )}
      {section.bullets && section.bullets.length > 0 && (
        <ul className="guide-bullets" role="list">
          {section.bullets.map((b, i) => (
            <li key={i} className="guide-bullets__item">
              <span className="guide-bullets__dot" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
      )}
      {section.strategies && section.strategies.length > 0 && (
        <div className="guide-strategies">
          {section.strategies.map((s, i) => (
            <div key={i} className="guide-strategy-card">
              <p className="guide-strategy-card__title">{s.title}</p>
              <ul className="guide-bullets" role="list">
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

/* ─── Main Component ─── */
export default function GuidesPage({ lang }: { lang: 'en' | 'ru' }) {
  const isEn = lang === 'en';
  const [activeId, setActiveId] = useState(GUIDES[0].id);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const guide = GUIDES.find((g) => g.id === activeId) ?? GUIDES[0];
  const sections = isEn ? guide.sections.en : guide.sections.ru;
  const title = isEn ? guide.titleEn : guide.titleRu;
  const subtitle = isEn ? guide.subtitleEn : guide.subtitleRu;
  const tag = isEn ? guide.tagEn : guide.tagRu;

  function selectGuide(id: string) {
    setActiveId(id);
    setDropdownOpen(false);
  }

  return (
    <main className="guides-main">
      {/* ── Sticky top bar: dropdown + lang switcher ── */}
      <div className="guides-topbar">
        <div className="guides-topbar__inner">
          {/* Back link */}
          <Link href={`/${lang}`} className="guides-back__link" aria-label={isEn ? 'Back to games' : 'Назад к играм'}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="guides-back__label">{isEn ? 'Games' : 'Игры'}</span>
          </Link>

          <span aria-hidden="true" className="guides-topbar__sep" />

          {/* Dropdown trigger */}
          <div className="guides-dropdown" style={{ position: 'relative' }}>
            <button
              className="guides-dropdown__trigger"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              aria-label={isEn ? 'Select guide' : 'Выберите гайд'}
            >
              <span className="guides-dropdown__icon" aria-hidden="true">{guide.icon}</span>
              <span className="guides-dropdown__current">{title}</span>
              <svg
                className={`guides-dropdown__chevron${dropdownOpen ? ' guides-dropdown__chevron--open' : ''}`}
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {dropdownOpen && (
              <>
                {/* Backdrop to close */}
                <div
                  className="guides-dropdown__backdrop"
                  onClick={() => setDropdownOpen(false)}
                  aria-hidden="true"
                />
                <ul className="guides-dropdown__menu" role="listbox" aria-label={isEn ? 'Guide list' : 'Список гайдов'}>
                  {GUIDES.map((g) => (
                    <li key={g.id} role="option" aria-selected={g.id === activeId}>
                      <Link
                        href={`/${lang}/guides/${g.id}`}
                        className={`guides-dropdown__item${g.id === activeId ? ' guides-dropdown__item--active' : ''}`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <span className="guides-dropdown__item-icon" aria-hidden="true">{g.icon}</span>
                        <span className="guides-dropdown__item-text">
                          <span className="guides-dropdown__item-title">{isEn ? g.titleEn : g.titleRu}</span>
                          <span className="guides-dropdown__item-tag">{isEn ? g.tagEn : g.tagRu}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

         {/* Language switcher */}
          <div role="navigation" aria-label={isEn ? 'Language' : 'Язык'} className="guides-topbar__lang">
            <Link
              href={cleanPathname(`/en/guides/${slug}`)}
              hrefLang="en"
              className={`lang-btn${isEn ? ' active' : ''}`}
              aria-current={isEn ? 'true' : undefined}
            >
              EN
            </Link>
            <Link
              href={cleanPathname(`/ru/guides/${slug}`)}
              hrefLang="ru"
              className={`lang-btn${!isEn ? ' active' : ''}`}
              aria-current={!isEn ? 'true' : undefined}
            >
              RU
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <header className="guides-hero">
        <span className="guides-hero__eyebrow">{isEn ? 'Strategy Guides' : 'Стратегические гайды'}</span>
        <h1 className="guides-hero__title">{title}</h1>
        <p className="guides-hero__sub">{subtitle}</p>
      </header>

      {/* Content */}
      <div className="guides-content-wrap">
        {/* Sidebar */}
        <aside className="guides-sidebar" aria-label={isEn ? 'Guide info' : 'О гайде'}>
          <div className="guides-sidebar__card">
            <span className="guides-sidebar__icon" aria-hidden="true">{guide.icon}</span>
            <p className="guides-sidebar__tag">{tag}</p>
            <h2 className="guides-sidebar__title">{title}</h2>
            <p className="guides-sidebar__sub">{subtitle}</p>
            <ol className="guides-sidebar__toc" aria-label={isEn ? 'Table of contents' : 'Содержание'}>
              {sections.map((s, i) => (
                <li key={i} className="guides-sidebar__toc-item">
                  <span className="guides-sidebar__toc-num">0{i + 1}</span>
                  <span className="guides-sidebar__toc-label">{s.heading}</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        {/* Article */}
        <article className="guides-article" role="tabpanel" aria-label={title}>
          {sections.map((section, idx) => (
            <GuideSection key={idx} section={section} idx={idx} />
          ))}
        </article>
      </div>
    </main>
  );
}
