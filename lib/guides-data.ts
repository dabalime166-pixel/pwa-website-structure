/* ─── Types ─── */
export interface Section {
  heading: string
  body?: string
  body2?: string
  formula?: string
  bullets?: string[]
  callout?: string
  strategies?: { title: string; bullets: string[] }[]
}

export interface GuideData {
  id: string
  slug: string
  icon: string
  titleRu: string
  titleEn: string
  subtitleRu: string
  subtitleEn: string
  tagRu: string
  tagEn: string
  /** 2–3 low-frequency focus phrases (RU) */
  keywordsRu: string[]
  /** 2–3 low-frequency focus phrases (EN) */
  keywordsEn: string[]
  descriptionRu: string
  descriptionEn: string
  titleSeoRu?: string
  titleSeoEn?: string
  descriptionSeoRu?: string
  descriptionSeoEn?: string
  sections: { ru: Section[]; en: Section[] }
}

/* ─── Data ─── */
export const GUIDES: GuideData[] = [
  /* ── PLINKO ── */
  {
    id: 'plinko',
    slug: 'plinko',
    icon: '◉',
    titleRu: 'Plinko стратегия низкий риск',
    titleEn: 'Plinko Low Risk Strategy Demo',
    subtitleRu: 'Как работает Plinko демо, ряды и риск — без депозита',
    subtitleEn: 'How Plinko demo rows and risk settings change your odds',
    tagRu: 'Механика',
    tagEn: 'Mechanics',
    keywordsRu: [
      'plinko стратегия низкий риск',
      'как работает plinko демо',
      'plinko количество рядов влияние',
    ],
    keywordsEn: [
      'plinko low risk strategy demo',
      'how plinko demo rows affect odds',
      'plinko risk level settings guide',
    ],
    descriptionRu:
      'Практический гайд: plinko стратегия низкий риск, как работает plinko демо и как количество рядов влияет на множители. Без депозита, 18+.',
    descriptionEn:
      'Practical guide to plinko low risk strategy demo, how plinko demo rows affect odds, and risk level settings. No deposit, 18+.',
    titleSeoRu: 'Plinko стратегия низкий риск — как работает демо | 1weapp',
    titleSeoEn: 'Plinko Low Risk Strategy Demo — Rows & Odds Guide | 1weapp',
    descriptionSeoRu:
      'Разбор: plinko стратегия низкий риск, как работает plinko демо и влияние количества рядов на множители. Тренируйтесь без депозита.',
    descriptionSeoEn:
      'Learn plinko low risk strategy demo, how plinko demo rows affect odds, and risk level settings — practice free before real play.',
    sections: {
      ru: [
        {
          heading: 'Как работает Plinko демо',
          body: 'Если вы ищете, как работает plinko демо, начните с простой модели: шарик падает через ряды колышков и с равной вероятностью уходит влево или вправо. Центральные лунки чаще, крайние — редко, но с высокими множителями. Демо повторяет ту же математику, что и режим на деньги, только баланс виртуальный.',
          callout: 'Сначала 50–100 дропов в демо — так вы увидите разброс без риска депозита.',
        },
        {
          heading: 'Plinko количество рядов: влияние на шансы',
          body: 'Ключевой параметр — plinko количество рядов влияние на крайние коэффициенты. Больше рядов (14–16) = выше потолок множителя, но ниже шанс крайнего кармана. Меньше рядов (8–10) = спокойнее сессия и чаще мелкие возвраты.',
          formula: 'P(k) = C(n, k) × 0.5ⁿ',
          bullets: [
            '8–10 рядов — удобный старт для обучения траекториям',
            '12 рядов — баланс частоты и потолка множителя',
            '14–16 рядов — редкие «краевые» выплаты, длинные сухие серии',
          ],
        },
        {
          heading: 'Plinko стратегия низкий риск на практике',
          body: 'Рабочая plinko стратегия низкий риск строится на короткой доске и профиле Low/Medium. Цель — не поймать 1000x, а понять темп сессии: как часто центр отдаёт 0.5x–0.9x и как ведёт себя банкролл за 100 дропов.',
          strategies: [
            {
              title: 'Низкий риск — учебный режим',
              bullets: [
                '8–10 рядов, риск Low или Medium',
                'Ставка ≤ 0.5% виртуального банка на шар',
                'Фиксируйте Stop-Loss на сессию заранее',
              ],
            },
            {
              title: 'Высокий риск — только после демо',
              bullets: [
                '14–16 рядов и High risk',
                'Банк должен выдержать сотни дропов без края',
                'Не повышайте ставку после near-miss у 1000x',
              ],
            },
          ],
        },
        {
          heading: 'Короткий чеклист перед реальной игрой',
          bullets: [
            'Проверили влияние рядов в демо',
            'Выбрали риск под длину сессии',
            'Задали лимит просадки и не меняете его «на эмоциях»',
          ],
          callout: 'Демо нужно, чтобы изучить механику. Играйте ответственно, 18+.',
        },
      ],
      en: [
        {
          heading: 'How Plinko demo rows affect odds',
          body: 'If you want to know how plinko demo rows affect odds, start with the Galton model: each peg deflects left or right with equal chance. Center pockets hit often; edges are rare but pay large multipliers. Demo uses the same engine as real-money mode with virtual credits.',
          callout: 'Run 50–100 free drops first so you feel variance without a deposit.',
        },
        {
          heading: 'Plinko risk level settings guide',
          body: 'This plinko risk level settings guide is simple: Low/Medium reallocates payout weights toward the center; High pushes value into the edges. Row count and risk stack — changing both at once makes sessions harder to read.',
          formula: 'P(k) = C(n, k) × 0.5ⁿ',
          bullets: [
            '8–10 rows — calmer learning loop',
            '12 rows — middle ground for frequency vs ceiling',
            '14–16 rows — rare edge hits and longer dry spells',
          ],
        },
        {
          heading: 'Plinko low risk strategy demo in practice',
          body: 'A solid plinko low risk strategy demo focuses on short boards and Low/Medium risk. You are not hunting 1000x — you are measuring how often small returns appear and how a 100-drop sample moves the bankroll.',
          strategies: [
            {
              title: 'Low-risk learning mode',
              bullets: [
                '8–10 rows with Low or Medium risk',
                'Stake ≤ 0.5% of virtual bankroll per ball',
                'Set a session stop-loss before you start',
              ],
            },
            {
              title: 'High-risk only after demo practice',
              bullets: [
                '14–16 rows with High risk',
                'Bankroll must survive hundreds of misses',
                'Never raise stake after a near-miss at the edge',
              ],
            },
          ],
        },
        {
          heading: 'Pre-real checklist',
          bullets: [
            'You tested row count impact in demo',
            'Risk profile matches your session length',
            'Loss limit is fixed and not renegotiated mid-tilt',
          ],
          callout: 'Use demo to learn the loop. Play responsibly, 18+ only.',
        },
      ],
    },
  },

  /* ── MINES ── */
  {
    id: 'mines',
    slug: 'mines',
    icon: '◆',
    titleRu: 'Mines стратегия 3 мины',
    titleEn: 'Mines 3 Bombs Strategy',
    subtitleRu: 'Когда делать кэшаут и как играть mines демо без депозита',
    subtitleEn: 'Cashout timing and how to play mines demo with no deposit',
    tagRu: 'Тактика',
    tagEn: 'Tactics',
    keywordsRu: [
      'mines стратегия 3 мины',
      'mines когда делать кэшаут',
      'как играть mines демо без депозита',
    ],
    keywordsEn: [
      'mines 3 bombs strategy',
      'mines cashout timing guide',
      'play mines demo no deposit',
    ],
    descriptionRu:
      'Гайд: mines стратегия 3 мины, mines когда делать кэшаут и как играть mines демо без депозита. RTP ~97%, 18+.',
    descriptionEn:
      'Guide covering mines 3 bombs strategy, mines cashout timing guide, and how to play mines demo no deposit. RTP ~97%, 18+.',
    titleSeoRu: 'Mines стратегия 3 мины — кэшаут и демо без депозита | 1weapp',
    titleSeoEn: 'Mines 3 Bombs Strategy — Cashout Timing Demo Guide | 1weapp',
    descriptionSeoRu:
      'Разберите mines стратегию 3 мины, когда делать кэшаут и как тренироваться в mines демо без депозита.',
    descriptionSeoEn:
      'Learn mines 3 bombs strategy, cashout timing, and how to play mines demo with no deposit before real stakes.',
    sections: {
      ru: [
        {
          heading: 'Как играть mines демо без депозита',
          body: 'Если цель — понять, как играть mines демо без депозита, откройте раунд на виртуальных кредитах и зафиксируйте число мин до первого клика. На поле 5×5 каждая безопасная клетка поднимает множитель и одновременно повышает шанс попасть на мину на следующем шаге.',
          formula: 'P(1) = (25 − M) / 25',
          callout: 'Демо показывает ту же комбинаторику — меняется только валюта баланса.',
        },
        {
          heading: 'Mines стратегия 3 мины',
          body: 'Популярная mines стратегия 3 мины держит риск умеренным: на старте шанс безопасной клетки ≈ 88%. Это удобный учебный режим — множитель растёт заметно, но сессия не ломается от одного агрессивного клика.',
          strategies: [
            {
              title: 'План на 3 мины',
              bullets: [
                'Откройте 3–5 клеток и оцените темп множителя',
                'Не увеличивайте число мин «чтобы быстрее отыграться»',
                'Ведите учёт: сколько раундов закрыли в плюс vs в минус',
              ],
            },
            {
              title: 'Когда усложнять',
              bullets: [
                'Переход на 5–8 мин только после 30+ спокойных демо-раундов',
                'Сверьте длину сухих серий с размером банка',
                'Высокий mine-count = короче целевая глубина открытия',
              ],
            },
          ],
        },
        {
          heading: 'Mines: когда делать кэшаут',
          body: 'Вопрос mines когда делать кэшаут важнее «угадай паттерн». Заранее выберите целевой множитель (например 1.5x–2.5x на 3 минах) и выходите по плану, а не по ощущению «ещё одна клетка точно безопасна».',
          bullets: [
            'Фиксируйте цель кэшаута до первого клика',
            'После двух неудачных попыток подряд — пауза или меньше клеток',
            'Не возвращайтесь в раунд, если уже нажали Cash Out',
          ],
          callout: 'Эмоция «почти открыл всё поле» — главный враг дисциплины в Mines.',
        },
      ],
      en: [
        {
          heading: 'Play mines demo no deposit',
          body: 'To play mines demo no deposit, start a round with virtual credits and lock mine count before the first click. On a 5×5 grid each safe tile raises the multiplier and also raises the chance the next pick is a bomb.',
          formula: 'P(1) = (25 − M) / 25',
          callout: 'Demo mirrors the same combinatorics — only the balance currency changes.',
        },
        {
          heading: 'Mines 3 bombs strategy',
          body: 'A practical mines 3 bombs strategy keeps risk readable: first-click safety is about 88%. Multipliers move enough to teach pacing without turning every round into a coin flip.',
          strategies: [
            {
              title: '3-bomb training plan',
              bullets: [
                'Open 3–5 tiles and watch multiplier growth',
                'Do not raise mine count to “win it back faster”',
                'Track how many rounds you cash out green vs bust',
              ],
            },
            {
              title: 'When to increase difficulty',
              bullets: [
                'Move to 5–8 mines only after 30+ calm demo rounds',
                'Compare dry streaks with bankroll depth',
                'Higher mine count means a shorter open-depth target',
              ],
            },
          ],
        },
        {
          heading: 'Mines cashout timing guide',
          body: 'This mines cashout timing guide is rule-based: pick a target multiplier before round one (for example 1.5x–2.5x on 3 bombs) and exit on plan — not on the feeling that “one more tile is safe.”',
          bullets: [
            'Set the cashout target before the first click',
            'After two busts in a row, pause or open fewer tiles',
            'Never re-enter a round you already cashed out of',
          ],
          callout: 'The “almost cleared the board” urge is the main discipline killer in Mines.',
        },
      ],
    },
  },

  /* ── CRASH ── */
  {
    id: 'crash',
    slug: 'crash',
    icon: '▲',
    titleRu: 'Crash автокэшаут стратегия',
    titleEn: 'Crash Auto Cashout Strategy',
    subtitleRu: 'Когда выводить в краш-игре и тактика кэшаута в Lucky Jet демо',
    subtitleEn: 'When to cash out crash games and Lucky Jet demo tactics',
    tagRu: 'Краш',
    tagEn: 'Crash',
    keywordsRu: [
      'crash автокэшаут стратегия',
      'краш игра когда выводить',
      'lucky jet демо тактика кэшаута',
    ],
    keywordsEn: [
      'crash auto cashout strategy',
      'when to cash out crash games',
      'lucky jet demo cashout tactics',
    ],
    descriptionRu:
      'Гайд: crash автокэшаут стратегия, краш игра когда выводить и lucky jet демо тактика кэшаута. Без регистрации в демо, 18+.',
    descriptionEn:
      'Guide to crash auto cashout strategy, when to cash out crash games, and lucky jet demo cashout tactics. Free demo, 18+.',
    titleSeoRu: 'Crash автокэшаут стратегия — когда выводить | 1weapp',
    titleSeoEn: 'Crash Auto Cashout Strategy — Timing & Demo Tactics | 1weapp',
    descriptionSeoRu:
      'Разберите crash автокэшаут стратегию, решите краш игра когда выводить и отработайте lucky jet демо тактику кэшаута.',
    descriptionSeoEn:
      'Learn crash auto cashout strategy, when to cash out crash games, and lucky jet demo cashout tactics before real stakes.',
    sections: {
      ru: [
        {
          heading: 'Краш игра: когда выводить',
          body: 'Главный вопрос краш игра когда выводить решается до ставки, а не в момент роста множителя. Вы заранее выбираете целевой коэффициент (например 1.40x–2.00x) и оцениваете, выдерживает ли банкролл серию ранних крашей.',
          bullets: [
            'Низкая цель (1.2x–1.5x) — чаще мелкие плюсы, меньше эмоций',
            'Средняя цель (1.8x–2.5x) — нужен запас на серию промахов',
            'Высокая цель (5x+) — развлекательный режим, не «система»',
          ],
        },
        {
          heading: 'Crash автокэшаут стратегия',
          body: 'Рабочая crash автокэшаут стратегия снимает ручной клик в панике. Авто-вывод на фиксированном множителе превращает сессию в проверку дисциплины: ставка одинаковая, цель одинаковая, лимит просадки заранее.',
          strategies: [
            {
              title: 'Плоская ставка + автокэшаут',
              bullets: [
                'Одинаковый размер ставки на всю сессию',
                'Автокэшаут на заранее выбранном x',
                'Стоп после N минусов подряд или % банка',
              ],
            },
            {
              title: 'Чего избегать',
              bullets: [
                'Удваивать ставку после каждого краша (Мартингейл)',
                'Поднимать цель «потому что предыдущий улетел далеко»',
                'Играть без таймера сессии',
              ],
            },
          ],
          callout: 'Прошлый множитель не влияет на следующий раунд — это независимые испытания.',
        },
        {
          heading: 'Lucky Jet демо: тактика кэшаута',
          body: 'Lucky jet демо тактика кэшаута нужна, чтобы прочувствовать скорость роста множителя без депозита. В демо сравните ручной вывод и автокэшаут на одной и той же цели — чаще выигрывает заранее заданное правило.',
          bullets: [
            '20 раундов с автокэшаутом на 1.5x',
            '20 раундов вручную на ту же цель',
            'Сравните итоговый виртуальный баланс и число тильт-решений',
          ],
        },
      ],
      en: [
        {
          heading: 'When to cash out crash games',
          body: 'Deciding when to cash out crash games happens before you bet — not while the multiplier is climbing. Pick a target (for example 1.40x–2.00x) and check whether your bankroll can survive a streak of early crashes.',
          bullets: [
            'Low target (1.2x–1.5x) — frequent small wins, less tilt',
            'Mid target (1.8x–2.5x) — needs room for miss streaks',
            'High target (5x+) — entertainment mode, not a system',
          ],
        },
        {
          heading: 'Crash auto cashout strategy',
          body: 'A clean crash auto cashout strategy removes panic clicks. Locking auto-cashout at a fixed multiplier turns the session into a discipline test: flat stake, fixed target, pre-set loss limit.',
          strategies: [
            {
              title: 'Flat stake + auto cashout',
              bullets: [
                'Same stake size for the whole session',
                'Auto cashout at a pre-chosen multiplier',
                'Stop after N losses or a % bankroll drawdown',
              ],
            },
            {
              title: 'What to avoid',
              bullets: [
                'Doubling after every crash (Martingale)',
                'Raising the target because the last round flew high',
                'Playing without a session timer',
              ],
            },
          ],
          callout: 'The previous multiplier does not change the next round — trials are independent.',
        },
        {
          heading: 'Lucky Jet demo cashout tactics',
          body: 'Lucky jet demo cashout tactics help you feel multiplier speed without a deposit. In demo, compare manual exits vs auto-cashout on the same target — a pre-written rule usually wins.',
          bullets: [
            '20 rounds with auto cashout at 1.5x',
            '20 rounds manual on the same target',
            'Compare virtual balance and tilt decisions',
          ],
        },
      ],
    },
  },

  /* ── MISTAKES ── */
  {
    id: 'mistakes',
    slug: 'mistakes',
    icon: '✕',
    titleRu: 'Ошибки новичков в онлайн казино',
    titleEn: 'Online Casino Beginner Mistakes',
    subtitleRu: 'Почему нельзя догонять проигрыш и как вести банкролл',
    subtitleEn: 'Why chasing losses fails and how new players manage bankroll',
    tagRu: 'Ошибки',
    tagEn: 'Mistakes',
    keywordsRu: [
      'ошибки новичков в онлайн казино',
      'почему нельзя догонять проигрыш',
      'банкролл менеджмент для новичков',
    ],
    keywordsEn: [
      'online casino beginner mistakes',
      'why chasing losses fails',
      'bankroll management for new players',
    ],
    descriptionRu:
      'Разбор: ошибки новичков в онлайн казино, почему нельзя догонять проигрыш и банкролл менеджмент для новичков. 18+.',
    descriptionEn:
      'Breakdown of online casino beginner mistakes, why chasing losses fails, and bankroll management for new players. 18+.',
    titleSeoRu: 'Ошибки новичков в онлайн казино — банкролл и догон | 1weapp',
    titleSeoEn: 'Online Casino Beginner Mistakes — Chasing Losses & Bankroll | 1weapp',
    descriptionSeoRu:
      'Какие ошибки новичков в онлайн казино стоят дороже всего, почему нельзя догонять проигрыш и как строить банкролл менеджмент для новичков.',
    descriptionSeoEn:
      'The costliest online casino beginner mistakes, why chasing losses fails, and bankroll management for new players.',
    sections: {
      ru: [
        {
          heading: 'Ошибки новичков в онлайн казино',
          body: 'Типичные ошибки новичков в онлайн казино редко связаны с «не той кнопкой». Чаще это отсутствие лимита сессии, ставка больше 2–3% банка и переход в реальный режим без демо-теста механики.',
          bullets: [
            'Игра без заранее записанного стоп-лосса',
            'Смена игры после каждого проигрыша «потому что эта горячая»',
            'Игнор RTP и волатильности при выборе слота',
          ],
        },
        {
          heading: 'Почему нельзя догонять проигрыш',
          body: 'Ответ на вопрос почему нельзя догонять проигрыш математический: повышение ставки после минуса ускоряет разорение, а не «возвращает справедливость». Серия независимых раундов не обязана компенсировать прошлый результат.',
          callout: 'Догон превращает один плохой день в полный слив банка.',
          bullets: [
            'Фиксируйте размер ставки до сессии',
            'После лимита просадки — выход, не «ещё пять спинов»',
            'Отыгрыш эмоций перенесите в демо, не в депозит',
          ],
        },
        {
          heading: 'Банкролл менеджмент для новичков',
          body: 'Простой банкролл менеджмент для новичков: разделите банк на 50–100 условных ставок, определите дневной лимит и не пополняйте его в тот же день. Демо помогает проверить, выдерживает ли ваш план волатильность выбранной игры.',
          strategies: [
            {
              title: 'Мини-план на неделю',
              bullets: [
                '1 депозит = 1 бюджет, без доливок',
                'Ставка 1–2% банка',
                'Дневной стоп: −20% или +30% — выход',
              ],
            },
          ],
        },
      ],
      en: [
        {
          heading: 'Online casino beginner mistakes',
          body: 'Common online casino beginner mistakes are rarely about the wrong button. They are missing session limits, staking more than 2–3% of bankroll, and jumping to real money before testing mechanics in demo.',
          bullets: [
            'Playing without a written stop-loss',
            'Switching titles after every loss because one feels “hot”',
            'Ignoring RTP and volatility when picking a slot',
          ],
        },
        {
          heading: 'Why chasing losses fails',
          body: 'Why chasing losses fails is mathematical: raising stakes after a loss speeds ruin instead of restoring “fairness.” Independent rounds are not obligated to repay the previous result.',
          callout: 'Chasing turns one bad session into a full bankroll wipe.',
          bullets: [
            'Lock stake size before the session',
            'After the drawdown limit — exit, do not take “five more spins”',
            'Process tilt in demo, not with a fresh deposit',
          ],
        },
        {
          heading: 'Bankroll management for new players',
          body: 'Simple bankroll management for new players: split funds into 50–100 unit bets, set a daily cap, and do not top up the same day. Demo checks whether your plan survives the game’s volatility.',
          strategies: [
            {
              title: 'One-week mini plan',
              bullets: [
                'One deposit = one budget, no reloads',
                'Stake 1–2% of bankroll',
                'Daily stop at −20% or +30%',
              ],
            },
          ],
        },
      ],
    },
  },

  /* ── RTP ── */
  {
    id: 'rtp',
    slug: 'rtp',
    icon: '％',
    titleRu: 'Что такое RTP слота простыми словами',
    titleEn: 'Slot RTP Explained Simply',
    subtitleRu: 'Волатильность слота, банкролл и выбор высокого RTP',
    subtitleEn: 'Slot volatility, bankroll fit, and high RTP low volatility picks',
    tagRu: 'RTP',
    tagEn: 'RTP',
    keywordsRu: [
      'что такое rtp слота простыми словами',
      'волатильность слота и банкролл',
      'высокий rtp низкая волатильность',
    ],
    keywordsEn: [
      'slot rtp explained simply',
      'slot volatility and bankroll',
      'high rtp low volatility slots',
    ],
    descriptionRu:
      'Гайд: что такое rtp слота простыми словами, волатильность слота и банкролл, высокий rtp низкая волатильность — с примерами для демо.',
    descriptionEn:
      'Guide: slot rtp explained simply, slot volatility and bankroll, and high rtp low volatility slots — with demo practice tips.',
    titleSeoRu: 'Что такое RTP слота простыми словами — волатильность | 1weapp',
    titleSeoEn: 'Slot RTP Explained Simply — Volatility & Bankroll Fit | 1weapp',
    descriptionSeoRu:
      'Объясняем, что такое rtp слота простыми словами, как связаны волатильность слота и банкролл, и кому подходит высокий rtp низкая волатильность.',
    descriptionSeoEn:
      'Slot rtp explained simply, how slot volatility and bankroll interact, and when high rtp low volatility slots fit your sessions.',
    sections: {
      ru: [
        {
          heading: 'Что такое RTP слота простыми словами',
          body: 'Если кратко: что такое rtp слота простыми словами — это теоретический процент возврата игрокам на очень длинной дистанции. RTP 96% не значит, что вы получите 96 из 100 ставок сегодня; это среднее по миллионам раундов у провайдера.',
          callout: 'Короткой сессии «справедливый» RTP почти не виден — видна волатильность.',
        },
        {
          heading: 'Волатильность слота и банкролл',
          body: 'Связка волатильность слота и банкролл важнее рекламного RTP. Высокая волатильность даёт редкие крупные всплески и длинные сухие серии — банку нужно больше юнитов. Низкая волатильность чаще возвращает мелкие выплаты и мягче к короткой сессии.',
          bullets: [
            'Низкая волатильность — короткие сессии, учебный банкролл',
            'Средняя — универсальный компромисс',
            'Высокая — только с запасом и заранее принятым риском просадки',
          ],
        },
        {
          heading: 'Высокий RTP, низкая волатильность',
          body: 'Искать высокий rtp низкая волатильность имеет смысл, если цель — дольше изучать механику в демо и реже ловить резкие просадки. Сначала сравните заявленный RTP в карточке игры, затем прогоните 100–200 демо-спинов и оцените частоту мелких возвратов.',
          strategies: [
            {
              title: 'Как выбрать игру под банк',
              bullets: [
                'Короткий банк → приоритет низкой/средней волатильности',
                'Смотрите RTP в карточке демо на 1weapp',
                'Не путайте высокий RTP с «гарантией плюса за вечер»',
              ],
            },
          ],
        },
      ],
      en: [
        {
          heading: 'Slot RTP explained simply',
          body: 'Slot rtp explained simply: it is the theoretical long-run return to players. A 96% RTP does not mean you get 96 back from 100 bets today — it is an average across a huge sample of rounds.',
          callout: 'In a short session you barely see RTP — you feel volatility.',
        },
        {
          heading: 'Slot volatility and bankroll',
          body: 'Slot volatility and bankroll matter more than a marketing RTP number. High volatility means rare spikes and longer dry stretches — you need more units. Low volatility pays smaller wins more often and is gentler on short sessions.',
          bullets: [
            'Low volatility — short sessions and learning bankrolls',
            'Medium — the usual compromise',
            'High — only with depth and an accepted drawdown risk',
          ],
        },
        {
          heading: 'High RTP low volatility slots',
          body: 'Looking for high rtp low volatility slots makes sense when you want longer demo practice with fewer sharp drawdowns. Check the published RTP on the game card, then run 100–200 demo spins and judge small-win frequency.',
          strategies: [
            {
              title: 'Match the game to the bank',
              bullets: [
                'Short bank → prefer low/medium volatility',
                'Read RTP on the 1weapp demo card',
                'Do not treat high RTP as a same-evening profit guarantee',
              ],
            },
          ],
        },
      ],
    },
  },

  /* ── BONUSES ── */
  {
    id: 'bonuses',
    slug: 'bonuses',
    icon: '★',
    titleRu: 'Вейджер бонуса казино как считать',
    titleEn: 'Casino Wagering Requirement Explained',
    subtitleRu: 'Фриспины с вейджером и подводные камни приветственного бонуса',
    subtitleEn: 'Free spins wagering terms and welcome bonus traps to avoid',
    tagRu: 'Бонусы',
    tagEn: 'Bonuses',
    keywordsRu: [
      'вейджер бонуса казино как считать',
      'фриспины с вейджером условия',
      'приветственный бонус подводные камни',
    ],
    keywordsEn: [
      'casino wagering requirement explained',
      'free spins wagering terms',
      'welcome bonus traps to avoid',
    ],
    descriptionRu:
      'Гайд: вейджер бонуса казино как считать, фриспины с вейджером условия и приветственный бонус подводные камни. 18+.',
    descriptionEn:
      'Guide: casino wagering requirement explained, free spins wagering terms, and welcome bonus traps to avoid. 18+.',
    titleSeoRu: 'Вейджер бонуса казино как считать — фриспины и ловушки | 1weapp',
    titleSeoEn: 'Casino Wagering Requirement Explained — Free Spins & Traps | 1weapp',
    descriptionSeoRu:
      'Считаем вейджер бонуса казино, читаем условия фриспинов с вейджером и разбираем подводные камни приветственного бонуса.',
    descriptionSeoEn:
      'Casino wagering requirement explained, free spins wagering terms clarified, and welcome bonus traps to avoid.',
    sections: {
      ru: [
        {
          heading: 'Вейджер бонуса казино: как считать',
          body: 'Формула, если нужно понять вейджер бонуса казино как считать: обычно (депозит + бонус) × множитель вейджера, либо только бонус × множитель — читайте правила оффера. Пока вейджер не закрыт, вывод часто заблокирован.',
          formula: 'Отыгрыш ≈ (депозит + бонус) × W',
          bullets: [
            'W = 30–40x — уже ощутимая нагрузка на банк',
            'Проверяйте, какие игры засчитываются на 100% / 10% / 0%',
            'Макс. ставка на время вейджера почти всегда ограничена',
          ],
        },
        {
          heading: 'Фриспины с вейджером: условия',
          body: 'Раздел фриспины с вейджером условия чаще всего забывают новички: выигрыш со спинов тоже нужно отыграть, слот фиксирован, а срок жизни оффера ограничен днями. Сравните ценность спинов с размером вейджера до активации.',
          callout: 'Иногда «100 фриспинов» дороже по условиям, чем небольшой кэш-бонус с честным W.',
        },
        {
          heading: 'Приветственный бонус: подводные камни',
          body: 'Список приветственный бонус подводные камни: вкладка стран/провайдеров, исключённые игры, лимит максимального вывода с бонуса и запрет параллельных акций. Перед реальной активацией изучите механику слота в демо на 1weapp — так вы не сожжёте вейджер на незнакомой волатильности.',
          strategies: [
            {
              title: 'Чеклист до клика «Забрать»',
              bullets: [
                'Посчитали полный отыгрыш в деньгах',
                'Проверили % вклада вашей игры',
                'Есть лимит времени и макс. ставки',
              ],
            },
          ],
        },
      ],
      en: [
        {
          heading: 'Casino wagering requirement explained',
          body: 'Casino wagering requirement explained in one line: usually (deposit + bonus) × wager multiplier, or bonus-only × multiplier — read the offer rules. Withdrawals stay locked until wagering clears.',
          formula: 'Playthrough ≈ (deposit + bonus) × W',
          bullets: [
            'W = 30–40x already stresses a small bankroll',
            'Check which games contribute 100% / 10% / 0%',
            'Max bet during wagering is almost always capped',
          ],
        },
        {
          heading: 'Free spins wagering terms',
          body: 'Free spins wagering terms are where beginners slip: spin wins often need playthrough, the slot is fixed, and the offer expires in days. Compare spin value to wager size before you activate.',
          callout: 'Sometimes “100 free spins” is worse value than a smaller cash bonus with clearer W.',
        },
        {
          heading: 'Welcome bonus traps to avoid',
          body: 'Welcome bonus traps to avoid include country/provider exclusions, capped max cashout from bonus funds, and stacked-promo bans. Before activating, learn the slot in a 1weapp demo so wagering is not burned on unfamiliar volatility.',
          strategies: [
            {
              title: 'Checklist before claiming',
              bullets: [
                'Total playthrough converted to money',
                'Contribution % of your intended game',
                'Time limit and max bet confirmed',
              ],
            },
          ],
        },
      ],
    },
  },

  /* ── RESPONSIBLE ── */
  {
    id: 'responsible',
    slug: 'responsible',
    icon: '◈',
    titleRu: 'Лимит депозита онлайн казино',
    titleEn: 'Online Casino Deposit Limit Guide',
    subtitleRu: 'Признаки проблемной игры и как ограничить время сессии',
    subtitleEn: 'Problem gambling warning signs and how to set session limits',
    tagRu: 'Безопасность',
    tagEn: 'Safety',
    keywordsRu: [
      'лимит депозита онлайн казино',
      'признаки проблемной игры чеклист',
      'как ограничить время сессии в казино',
    ],
    keywordsEn: [
      'online casino deposit limit guide',
      'problem gambling warning signs checklist',
      'how to set casino session limits',
    ],
    descriptionRu:
      'Гайд: лимит депозита онлайн казино, признаки проблемной игры чеклист и как ограничить время сессии в казино. 18+.',
    descriptionEn:
      'Guide: online casino deposit limit guide, problem gambling warning signs checklist, and how to set casino session limits. 18+.',
    titleSeoRu: 'Лимит депозита онлайн казино — сессии и чеклист | 1weapp',
    titleSeoEn: 'Online Casino Deposit Limit Guide — Session Limits & Checklist | 1weapp',
    descriptionSeoRu:
      'Как поставить лимит депозита онлайн казино, пройти чеклист признаков проблемной игры и ограничить время сессии.',
    descriptionSeoEn:
      'Set an online casino deposit limit, use a problem gambling warning signs checklist, and learn how to set casino session limits.',
    sections: {
      ru: [
        {
          heading: 'Лимит депозита онлайн казино',
          body: 'Поставить лимит депозита онлайн казино лучше в день регистрации, а не после тильта. Выберите сумму, которую готовы потерять за неделю без ущерба для обязательных расходов, и не поднимайте лимит в ту же сессию.',
          bullets: [
            'Недельный потолок депозита заранее',
            'Отдельный «игровой» бюджет вне зарплатной карты на все траты',
            'Демо на 1weapp — чтобы не тестировать эмоции на депозите',
          ],
        },
        {
          heading: 'Признаки проблемной игры: чеклист',
          body: 'Пройдите признаки проблемной игры чеклист честно: скрываете ли сумму ставок, занимаете ли на игру, раздражаетесь ли, когда не можете зайти в аккаунт? Даже один устойчивый пункт — повод поставить паузу и обратиться за помощью.',
          callout: 'Ответственная игра — это инструменты до проблемы, а не «сила воли после».',
          bullets: [
            'Игра дольше, чем планировали, снова и снова',
            'Попытки отыграться обязательными платежами',
            'Ложь близким о времени и сумме',
          ],
        },
        {
          heading: 'Как ограничить время сессии в казино',
          body: 'Практика как ограничить время сессии в казино: таймер на телефоне, лимит потери/выигрыша и правило «один стоп — выход без исключений». Краш и слоты ускоряют время — внешний таймер важнее внутренних ощущений.',
          strategies: [
            {
              title: 'Правила безопасной сессии',
              bullets: [
                'Максимум 30–45 минут подряд',
                'Стоп по времени срабатывает раньше стопа по эмоциям',
                'При пробитии лимита — самоисключение/пауза в кабинете',
              ],
            },
          ],
        },
      ],
      en: [
        {
          heading: 'Online casino deposit limit guide',
          body: 'This online casino deposit limit guide starts on signup day — not after tilt. Choose an amount you can lose in a week without touching essentials, and do not raise the cap in the same session.',
          bullets: [
            'Weekly deposit ceiling set in advance',
            'Separate play budget away from essential spending',
            'Use 1weapp demos to test emotions without depositing',
          ],
        },
        {
          heading: 'Problem gambling warning signs checklist',
          body: 'Use this problem gambling warning signs checklist honestly: hiding stake size, borrowing to play, or anger when you cannot log in? Even one persistent item is a reason to pause and seek help.',
          callout: 'Responsible play is tools before a crisis — not willpower after.',
          bullets: [
            'Sessions keep running longer than planned',
            'Trying to win back money needed for bills',
            'Lying about time or amounts spent',
          ],
        },
        {
          heading: 'How to set casino session limits',
          body: 'How to set casino session limits in practice: phone timer, loss/win caps, and a hard stop with no exceptions. Crash and slots compress time — an external timer beats gut feel.',
          strategies: [
            {
              title: 'Safer session rules',
              bullets: [
                'Cap continuous play at 30–45 minutes',
                'Time stop triggers before emotional stop',
                'If limits break — use cool-off / self-exclusion tools',
              ],
            },
          ],
        },
      ],
    },
  },

  /* ── MYTHS ── */
  {
    id: 'myths',
    slug: 'myths',
    icon: '?',
    titleRu: 'Миф о горячих и холодных слотах',
    titleEn: 'Hot and Cold Slots Myth',
    subtitleRu: 'RNG, «должен отдать» после проигрышей и другие суеверия',
    subtitleEn: 'RNG reality, due-payout myths, and why streaks fool players',
    tagRu: 'Мифы',
    tagEn: 'Myths',
    keywordsRu: [
      'миф о горячих и холодных слотах',
      'можно ли обмануть rng слота',
      'слот должен отдать после проигрышей',
    ],
    keywordsEn: [
      'hot and cold slots myth',
      'can you beat slot rng',
      'due payout after losing streak myth',
    ],
    descriptionRu:
      'Разбор мифов: миф о горячих и холодных слотах, можно ли обмануть rng слота и вера что слот должен отдать после проигрышей. 18+.',
    descriptionEn:
      'Myth-busting: hot and cold slots myth, can you beat slot rng, and the due payout after losing streak myth. 18+.',
    titleSeoRu: 'Миф о горячих и холодных слотах — RNG и «должен отдать» | 1weapp',
    titleSeoEn: 'Hot and Cold Slots Myth — RNG & Due Payout Explained | 1weapp',
    descriptionSeoRu:
      'Почему жив миф о горячих и холодных слотах, можно ли обмануть rng слота и почему фраза «слот должен отдать после проигрышей» опасна.',
    descriptionSeoEn:
      'Why the hot and cold slots myth persists, whether you can beat slot rng, and why the due payout after losing streak myth is costly.',
    sections: {
      ru: [
        {
          heading: 'Миф о горячих и холодных слотах',
          body: 'Миф о горячих и холодных слотах звучит так: «автомат нагрелся / остыл». На деле сертифицированный генератор не хранит «температуру». Короткие серии плюсов или минусов — нормальная дисперсия, а не сигнал менять ставку.',
          callout: 'Смена слота после трёх минусов не меняет математику следующего спина.',
        },
        {
          heading: 'Можно ли обмануть RNG слота',
          body: 'Короткий ответ на можно ли обмануть rng слота: нет, если речь о легальном провайдерском демо/слоте с проверенным ГСЧ. Паттерны в истории спинов — когнитивная иллюзия. Полезнее изучить RTP и волатильность в демо, чем искать «схему».',
          bullets: [
            'Прошлые спины не кодируют будущий результат',
            '«Системы» ставок не сдвигают house edge',
            'Provably Fair / аудит RNG ≠ способ предсказать спин',
          ],
        },
        {
          heading: 'Слот должен отдать после проигрышей?',
          body: 'Убеждение слот должен отдать после проигрышей — дорогая ошибка. Игры не ведут счёт «долга» перед вами. После серии минусов банкролл меньше, а риск тильта выше — именно поэтому нужен стоп, а не увеличение ставки.',
          strategies: [
            {
              title: 'Анти-миф практика',
              bullets: [
                '100 демо-спинов с фиксацией серий — увидите случайность',
                'Пишите правило стопа до сессии',
                'Не повышайте ставку «потому что пора отдать»',
              ],
            },
          ],
        },
      ],
      en: [
        {
          heading: 'Hot and cold slots myth',
          body: 'The hot and cold slots myth claims a machine “heated up” or “went cold.” A certified RNG has no temperature. Short win or loss streaks are normal variance — not a signal to change stake size.',
          callout: 'Switching slots after three losses does not change the next spin’s math.',
        },
        {
          heading: 'Can you beat slot RNG',
          body: 'Can you beat slot rng? Not on a legitimate provider title with audited randomness. Patterns in spin history are cognitive illusions. Studying RTP and volatility in demo beats hunting a “system.”',
          bullets: [
            'Past spins do not encode the next result',
            'Betting systems do not move the house edge',
            'Provably Fair / RNG audits ≠ a way to predict a spin',
          ],
        },
        {
          heading: 'Due payout after losing streak myth',
          body: 'The due payout after losing streak myth is expensive. Games do not track a debt owed to you. After a losing run your bankroll is smaller and tilt risk is higher — that is why you stop, not raise.',
          strategies: [
            {
              title: 'Anti-myth practice',
              bullets: [
                'Log 100 demo spins and watch streak randomness',
                'Write the stop rule before the session',
                'Never raise stake because a payout is “due”',
              ],
            },
          ],
        },
      ],
    },
  },
]

export function getGuide(slug: string): GuideData | undefined {
  return GUIDES.find((g) => g.slug === slug)
}
