/* ─── Game review pages (no demo iframe) — SEO + casino redirect ─── */

export type ReviewLang = 'en' | 'ru'

export interface ReviewFaq {
  q: string
  a: string
}

export interface ReviewSection {
  heading: string
  body?: string
  body2?: string
  bullets?: string[]
  callout?: string
  steps?: string[]
}

export interface CasinoOffer {
  id: string
  badgeEn: string
  badgeRu: string
  name: string
  rating: string
  bonusEn: string
  bonusRu: string
  noteEn: string
  noteRu: string
  highlight?: boolean
}

export interface ReviewData {
  id: string
  /** Optional link to catalog demo page slug */
  relatedDemoSlug?: string
  provider: string
  rtp: string
  volatilityEn: string
  volatilityRu: string
  maxWin: string
  releasedEn: string
  releasedRu: string
  avatar: string
  titleEn: string
  titleRu: string
  subtitleEn: string
  subtitleRu: string
  tagEn: string
  tagRu: string
  keywordsEn: string[]
  keywordsRu: string[]
  descriptionEn: string
  descriptionRu: string
  titleSeoEn: string
  titleSeoRu: string
  descriptionSeoEn: string
  descriptionSeoRu: string
  specsEn: string[]
  specsRu: string[]
  prosEn: string[]
  prosRu: string[]
  consEn: string[]
  consRu: string[]
  sections: { en: ReviewSection[]; ru: ReviewSection[] }
  faq: { en: ReviewFaq[]; ru: ReviewFaq[] }
  relatedIds: string[]
}

/** Affiliate shortlist — all offers route through CTA_URL on the page. */
export const REVIEW_CASINO_OFFERS: CasinoOffer[] = [
  {
    id: 'top',
    badgeEn: 'Top pick',
    badgeRu: 'Топ выбор',
    name: '1win',
    rating: '4.9',
    bonusEn: '500% + 70 FS',
    bonusRu: '500% + 70 FS',
    noteEn: 'Welcome pack · fast lobby search',
    noteRu: 'Приветственный пакет · быстрый поиск в лобби',
    highlight: true,
  },
  {
    id: 'new',
    badgeEn: 'New',
    badgeRu: 'Новый',
    name: 'JetTon',
    rating: '4.88',
    bonusEn: '425% + 250 FS',
    bonusRu: '425% + 250 FS',
    noteEn: 'Promo code path · crypto-friendly',
    noteRu: 'Промокод · удобно с криптой',
  },
  {
    id: 'classic',
    badgeEn: 'Classic',
    badgeRu: 'Классика',
    name: 'Stake-style lobby',
    rating: '4.85',
    bonusEn: 'VIP rakeback',
    bonusRu: 'VIP rakeback',
    noteEn: 'Bonuses without a promo code',
    noteRu: 'Бонусы без промокода',
  },
]

export const REVIEWS: ReviewData[] = [
  {
    id: 'mine-slot',
    relatedDemoSlug: 'mine-slot',
    provider: 'InOut Games',
    rtp: '~96%',
    volatilityEn: 'Medium-high',
    volatilityRu: 'Средне-высокая',
    maxWin: 'Chests up to 100× (stack by multiply)',
    releasedEn: '24 Dec 2025',
    releasedRu: '24 дек 2025',
    avatar: '/avatars/mine-slot.webp',
    titleEn: 'Mine Slot Review',
    titleRu: 'Обзор Mine Slot',
    subtitleEn:
      'InOut Games dig hybrid: 5×3 pickaxes into a 5×7 mine field, row chests, listed RTP 96% — where to play for real money',
    subtitleRu:
      'Dig-гибрид InOut Games: кирки с 5×3 в шахту 5×7, сундуки рядов, RTP ~96% — где играть на деньги',
    tagEn: 'InOut · Mines hybrid',
    tagRu: 'InOut · гибрид Mines',
    keywordsEn: [
      'Mine Slot review',
      'Mine Slot RTP 96%',
      'play Mine Slot for real money',
      'InOut Games Mine Slot',
      'Mine Slot chest multipliers',
    ],
    keywordsRu: [
      'обзор Mine Slot',
      'Mine Slot RTP 96%',
      'играть Mine Slot на деньги',
      'InOut Games Mine Slot',
      'множители сундуков Mine Slot',
    ],
    descriptionEn:
      'Independent Mine Slot review: InOut Games mechanics, RTP ~96%, chest multipliers, pros/cons, and licensed casino shortlist — no demo iframe.',
    descriptionRu:
      'Независимый обзор Mine Slot: механика InOut Games, RTP ~96%, множители сундуков, плюсы/минусы и шортлист казино — без демо iframe.',
    titleSeoEn: 'Mine Slot Review — InOut Games, RTP 96% & Where to Play | 1weapp',
    titleSeoRu: 'Обзор Mine Slot — InOut Games, RTP 96% и где играть | 1weapp',
    descriptionSeoEn:
      'Mine Slot review (InOut Games): dig hybrid loop, listed RTP 96%, chest multipliers up to 100×, and top casinos to play for real money. 18+.',
    descriptionSeoRu:
      'Обзор Mine Slot (InOut Games): dig-гибрид, RTP ~96%, сундуки до 100× и топ-казино для игры на деньги. 18+.',
    specsEn: [
      'Studio: InOut Games · release 24.12.2025',
      'Listed RTP 96% · confirm live tier in-client',
      '5×3 reels → 5×7 mine field',
      'Chest multipliers up to 100× (stack by multiply)',
    ],
    specsRu: [
      'Студия: InOut Games · релиз 24.12.2025',
      'RTP ~96% · сверяйте тир в клиенте казино',
      'Барабаны 5×3 → шахта 5×7',
      'Множители сундуков до 100× (перемножаются)',
    ],
    prosEn: [
      'Two-layer loop: pickaxe grid + dig field',
      'Multiplicative chest spikes (not just additive)',
      'Listed 96% RTP · readable pixel UI on mobile',
      'Optional buy-bonus when the operator enables it',
    ],
    prosRu: [
      'Двухслойный цикл: сетка кирок + шахта',
      'Сундуки перемножают множители, а не просто складывают',
      'RTP ~96% · читаемый pixel-UI на телефоне',
      'Buy bonus, если оператор включил',
    ],
    consEn: [
      'Field logic needs a few rounds to click',
      'Cold dig stretches feel dry vs crash cash-out',
      'Buy bonus can be expensive vs stake',
      'Max-win / buy rules vary by casino build',
    ],
    consRu: [
      'Логику поля нужно «прочувствовать» за несколько раундов',
      'Сухие серии копания жёстче ощущаются, чем cash-out в crash',
      'Buy bonus дорогой относительно ставки',
      'Потолок выигрыша и buy-правила зависят от сборки казино',
    ],
    sections: {
      en: [
        {
          heading: 'What Mine Slot actually is',
          body: 'Mine Slot is InOut Games’ pixel mining hybrid. Public math sheets list single-player play and a 96% RTP. The loop is not a classic payline slot: you spin a 5×3 reel grid that drops pickaxes into a 5×7 block field, then dig for ores and row chests.',
          body2:
            'Studio materials describe wooden / stone / golden / enchanted pickaxes, six block tiers (dirt through obsidian), and bottom chests that can drop multipliers from 2× up to 100×. Multiple chests in one sequence multiply together — not add — so clearing full dig paths is the real spike lever.',
          bullets: [
            'Studio: InOut Games · listed release late 2025',
            'Listed RTP 96% — always confirm the live tier',
            '5×3 pickaxe grid feeds a 5×7 mine shaft',
            'Chest multipliers stack by multiply when several open',
          ],
        },
        {
          heading: 'How a round plays',
          body: 'Set the stake on the bottom bar and spin. Pickaxe symbols land on the 5×3 grid, then drop into the mine shaft. Each block has durability — stronger pickaxes dig deeper and open better ores.',
          body2:
            'Clear an entire column/row path to the bottom chest and unlock a multiplier (2×–100×). Open more than one chest in the same sequence and those multipliers multiply into each other. A buy-bonus control sits on the left when the casino enables feature skip.',
          callout:
            'This page is a review with casino redirects — there is no free demo iframe here. Use the shortlist below to open Mine Slot on a real balance.',
        },
        {
          heading: 'RTP, variance and bankroll fit',
          body: 'InOut lists 96% RTP for Mine Slot. That is a studio figure — operators can ship a different tier, so open the in-client info panel before you deposit.',
          body2:
            'Variance sits closer to medium-high instant hybrids than to low-vol crash toys: dead spins that barely scratch the field are normal, then a multi-chest multiply can spike the round. Size the stake so a cold streak does not empty the session before a chest sequence appears.',
          bullets: [
            'Confirm live RTP in the casino help panel',
            'Expect quiet digs between chest spikes',
            'Keep stake small until the field rhythm is clear',
          ],
        },
        {
          heading: 'Mine Slot vs crash and vs Mine Slot 2',
          body: 'Mine Slot is a dig-and-clear hybrid, not a cash-out curve. You do not exit mid-flight like in Lucky Jet / plane crash — the round resolves through pickaxe depth and chest unlocks.',
          body2:
            'Want active cash-out timing — stay on crash titles. Want Minecraft-style blocks, row chests and a buy-bonus lever — Mine Slot. Prefer the Nether sequel with Extra Chance + Block Bonus buys — open the Mine Slot 2 review. Do not confuse this title with Paperclip’s Mine Drop line: similar mining fantasy, different studio and math sheet.',
          bullets: [
            'Mechanic: block field + chests vs cash-out flight',
            'Studio: InOut Games (not Paperclip Mine Drop)',
            'Sequel path: Mine Slot 2 adds paid feature levers',
          ],
        },
        {
          heading: 'Who should play — and who should skip',
          body: 'Best if you like short hybrid rounds, readable pixel UI, and a clear “clear the row → open chest” goal. The Minecraft-adjacent look also helps if you want an instantly scannable mobile screen.',
          body2:
            'Skip it if you hate dig-progress games or only want pure cash-out crash — then Lucky Jet-style titles fit better. Prefer classic reels and free spins — browse the slot catalog hubs instead.',
        },
        {
          heading: 'Pros and cons snapshot',
          bullets: [
            'Strengths: unique two-layer loop, multiplicative chest spikes, listed 96% RTP, mobile-friendly pixel UI',
            'Trade-offs: learning curve, cold digs, buy bonus cost vs stake, operator-specific caps',
            'Always read the in-client rules before depositing',
          ],
        },
        {
          heading: 'Where to play Mine Slot for real money',
          body: 'For cash play use the top licensed casinos block below (#top-casino): pick a favorite, claim a welcome bonus, then search Mine Slot / InOut in the casino lobby and launch on a real balance.',
          steps: [
            'Compare the top casinos in the shortlist',
            'Claim a casino welcome bonus (18+, T&C apply)',
            'Launch Mine Slot on a real balance',
          ],
          callout:
            'Affiliate links below are sponsored. Only play where it is legal for you. 18+ · Gamble responsibly.',
        },
      ],
      ru: [
        {
          heading: 'Что такое Mine Slot на самом деле',
          body: 'Mine Slot — pixel mining-гибрид InOut Games. В публичных материалах обычно указывают single-player и RTP около 96%. Это не классический payline-слот: вы крутите сетку 5×3, кирки падают в шахту 5×7, дальше идёт копание блоков и сундуки рядов.',
          body2:
            'Студия описывает деревянные / каменные / золотые / зачарованные кирки, шесть тиров блоков (от земли до обсидиана) и нижние сундуки с множителями от 2× до 100×. Несколько сундуков в одной серии перемножаются — не складываются — поэтому полная очистка пути и есть главный «шип».',
          bullets: [
            'Студия: InOut Games · релиз конца 2025',
            'RTP ~96% — всегда сверяйте живой тир',
            'Сетка кирок 5×3 кормит шахту 5×7',
            'Множители сундуков перемножаются при нескольких открытиях',
          ],
        },
        {
          heading: 'Как проходит раунд',
          body: 'Выставьте ставку на нижней панели и крутите. Символы кирок падают на 5×3, затем уходят в шахту. У блоков есть прочность — более сильные кирки копают глубже и открывают лучшие руды.',
          body2:
            'Очистите полный путь к нижнему сундуку и получите множитель (2×–100×). Несколько сундуков в одной серии перемножают множители. Buy bonus слева доступен, если казино включило пропуск в фичу.',
          callout:
            'Это страница-обзор с редиректом в казино — здесь нет бесплатного демо iframe. Шортлист ниже ведёт к игре на реальном балансе.',
        },
        {
          heading: 'RTP, дисперсия и банкролл',
          body: 'InOut указывает RTP ~96% для Mine Slot. Это цифра студии — оператор может отдать другой тир, поэтому перед депозитом откройте info-панель в клиенте.',
          body2:
            'Дисперсия ближе к средне-высоким instant-гибридам, чем к низковолатильным crash: «пустые» спины, едва царапающие поле, — норма, затем мульти-сундук может резко поднять раунд. Ставьте так, чтобы сухая серия не съела сессию до появления сундуков.',
          bullets: [
            'Сверяйте live RTP в справке казино',
            'Ожидайте тихие копания между шипами',
            'Держите ставку маленькой, пока не поймёте ритм поля',
          ],
        },
        {
          heading: 'Mine Slot vs crash и vs Mine Slot 2',
          body: 'Mine Slot — dig-and-clear гибрид, а не кривая cash-out. Вы не выходите «в полёте», как в Lucky Jet / plane crash — раунд закрывается глубиной кирок и сундуками.',
          body2:
            'Нужен активный cash-out — оставайтесь на crash. Нужны блоки в стиле Minecraft, сундуки рядов и buy-bonus — Mine Slot. Хотите Nether-сиквел с Extra Chance и Block Bonus — читайте обзор Mine Slot 2. Не путайте с линейкой Paperclip Mine Drop: похожий майнинг-фэнтези, другая студия и другой math sheet.',
          bullets: [
            'Механика: поле блоков + сундуки vs cash-out полёт',
            'Студия: InOut Games (не Paperclip Mine Drop)',
            'Сиквел: Mine Slot 2 добавляет платные рычаги фич',
          ],
        },
        {
          heading: 'Кому зайдёт — и кому лучше пройти мимо',
          body: 'Зайдёт, если любите короткие гибридные раунды, читаемый pixel-UI и понятную цель «очистил ряд → открыл сундук». Minecraft-adjacent визуал удобен на мобильном.',
          body2:
            'Пройдите мимо, если ненавидите dig-progress или хотите только чистый cash-out crash — тогда ближе Lucky Jet. Классические барабаны и фриспины — смотрите слот-хабы каталога.',
        },
        {
          heading: 'Плюсы и минусы коротко',
          bullets: [
            'Сильные стороны: двухслойный цикл, мультипликативные сундуки, RTP ~96%, удобный mobile UI',
            'Минусы: кривая обучения, сухие копания, цена buy bonus, потолки зависят от оператора',
            'Всегда читайте правила в клиенте до депозита',
          ],
        },
        {
          heading: 'Где играть Mine Slot на деньги',
          body: 'Для игры на деньги используйте блок лицензированных казино ниже (#top-casino): выберите площадку, заберите welcome-бонус, найдите Mine Slot / InOut в лобби и запустите на реальном балансе.',
          steps: [
            'Сравните казино в шортлисте',
            'Заберите welcome-бонус (18+, действуют правила)',
            'Запустите Mine Slot на реальном балансе',
          ],
          callout:
            'Ссылки ниже — рекламные (sponsored). Играйте только там, где это законно. 18+ · Играйте ответственно.',
        },
      ],
    },
    faq: {
      en: [
        {
          q: 'What is Mine Slot?',
          a: 'An InOut Games hybrid: 5×3 reels drop pickaxes into a 5×7 block mine. Clear paths to open chests with multipliers up to 100×.',
        },
        {
          q: 'What is Mine Slot RTP?',
          a: 'InOut lists about 96% RTP. Always confirm the live tier inside the casino client before depositing.',
        },
        {
          q: 'Who made Mine Slot?',
          a: 'InOut Games.',
        },
        {
          q: 'How do chest multipliers work?',
          a: 'Clearing a full dig path opens a bottom chest (2×–100×). Multiple chests in one sequence multiply together, not add.',
        },
        {
          q: 'Is Mine Slot a crash game?',
          a: 'No. It is a dig hybrid without mid-round cash-out. For cash-out crash see Lucky Jet-style titles; for the sequel see Mine Slot 2.',
        },
        {
          q: 'Where can I play Mine Slot for real money?',
          a: 'Use the top casinos block on this page (#top-casino): pick a favorite, claim a welcome bonus, then open Mine Slot on a real balance.',
        },
        {
          q: 'Is there a free demo on this page?',
          a: 'No. This review focuses on mechanics, RTP and casino redirects. Catalog demo links (if available) are separate from this review URL.',
        },
      ],
      ru: [
        {
          q: 'Что такое Mine Slot?',
          a: 'Гибрид InOut Games: барабаны 5×3 роняют кирки в шахту 5×7. Очищайте пути, чтобы открыть сундуки с множителями до 100×.',
        },
        {
          q: 'Какой RTP у Mine Slot?',
          a: 'InOut указывает около 96%. Всегда сверяйте живой тир в клиенте казино до депозита.',
        },
        {
          q: 'Кто сделал Mine Slot?',
          a: 'InOut Games.',
        },
        {
          q: 'Как работают множители сундуков?',
          a: 'Полный путь копания открывает нижний сундук (2×–100×). Несколько сундуков в одной серии перемножаются, а не складываются.',
        },
        {
          q: 'Mine Slot — это crash?',
          a: 'Нет. Это dig-гибрид без mid-round cash-out. Для cash-out смотрите Lucky Jet; сиквел — Mine Slot 2.',
        },
        {
          q: 'Где играть Mine Slot на деньги?',
          a: 'Через блок казино на этой странице (#top-casino): выберите площадку, заберите бонус и откройте игру на реальном балансе.',
        },
        {
          q: 'Есть ли бесплатное демо на этой странице?',
          a: 'Нет. Этот обзор про механику, RTP и редирект в казино. Демо из каталога (если есть) — отдельный URL.',
        },
      ],
    },
    relatedIds: ['mine-slot-2'],
  },
  {
    id: 'mine-slot-2',
    relatedDemoSlug: 'mine-slot-2',
    provider: 'InOut Games',
    rtp: '~96%',
    volatilityEn: 'Medium-high',
    volatilityRu: 'Средне-высокая',
    maxWin: '~1,000× (operator caps may differ)',
    releasedEn: '11 Mar 2026',
    releasedRu: '11 мар 2026',
    avatar: '/avatars/mine-slot-2.webp',
    titleEn: 'Mine Slot 2 Review',
    titleRu: 'Обзор Mine Slot 2',
    subtitleEn:
      'InOut Games Nether sequel: Extra Chance, Block Bonus, scratch free spins, listed RTP 96% — where to play for real',
    subtitleRu:
      'Nether-сиквел InOut Games: Extra Chance, Block Bonus, scratch-фриспины, RTP ~96% — где играть на деньги',
    tagEn: 'InOut · Sequel',
    tagRu: 'InOut · сиквел',
    keywordsEn: [
      'Mine Slot 2 review',
      'Mine Slot Two RTP',
      'Extra Chance Block Bonus',
      'play Mine Slot 2 for real money',
      'Mine Slot 2 vs Mine Drop 2',
    ],
    keywordsRu: [
      'обзор Mine Slot 2',
      'Mine Slot Two RTP',
      'Extra Chance Block Bonus',
      'играть Mine Slot 2 на деньги',
      'Mine Slot 2 vs Mine Drop 2',
    ],
    descriptionEn:
      'Mine Slot 2 review: InOut Games Nether dig hybrid, Extra Chance / Block Bonus buys, scratch free spins, RTP ~96%, casino shortlist — no demo.',
    descriptionRu:
      'Обзор Mine Slot 2: Nether dig-гибрид InOut, Extra Chance / Block Bonus, scratch-фриспины, RTP ~96%, шортлист казино — без демо.',
    titleSeoEn: 'Mine Slot 2 Review — InOut Games, RTP 96% & Where to Play | 1weapp',
    titleSeoRu: 'Обзор Mine Slot 2 — InOut Games, RTP 96% и где играть | 1weapp',
    descriptionSeoEn:
      'Mine Slot 2 (Mine Slot Two) review: Nether theme, Extra Chance & Block Bonus, scratch free spins, listed RTP 96%, top casinos. 18+.',
    descriptionSeoRu:
      'Обзор Mine Slot 2 (Mine Slot Two): Nether-тема, Extra Chance и Block Bonus, scratch-фриспины, RTP ~96%, топ-казино. 18+.',
    specsEn: [
      'Studio: InOut Games · release 11.03.2026',
      'Listed RTP 96% · confirm live tier in-client',
      'Sequel to Mine Slot · Nether theme',
      'Extra Chance + Block Bonus feature buys',
    ],
    specsRu: [
      'Студия: InOut Games · релиз 11.03.2026',
      'RTP ~96% · сверяйте тир в клиенте',
      'Сиквел Mine Slot · Nether-тема',
      'Покупки Extra Chance + Block Bonus',
    ],
    prosEn: [
      'Readable Nether UI on mobile',
      'Sequel feature menu: Extra Chance + Block Bonus',
      'Scratch-style free spins layer',
      'Listed 96% RTP · clearer bonus control vs original',
    ],
    prosRu: [
      'Читаемый Nether-UI на мобильном',
      'Меню фич сиквела: Extra Chance + Block Bonus',
      'Scratch-слой фриспинов',
      'RTP ~96% · больше контроля фич, чем в оригинале',
    ],
    consEn: [
      'Block Bonus (~100× stake) can burn bankroll fast',
      'Dig cold streaks still happen',
      'Max-win / buy rules vary by casino',
      'Sequel loop still needs a few rounds to learn',
    ],
    consRu: [
      'Block Bonus (~100× ставки) быстро жжёт банк',
      'Сухие серии копания никуда не делись',
      'Потолок / цены buy зависят от казино',
      'Сиквел всё ещё нужно «почувствовать» за несколько раундов',
    ],
    sections: {
      en: [
        {
          heading: 'What Mine Slot 2 is',
          body: 'Mine Slot 2 (also searched as Mine Slot Two) is InOut Games’ sequel to Mine Slot. The dig hybrid stays — pickaxes feed a block mine — but the world shifts to a Nether-style cave with hotter block tiers and a denser feature menu.',
          body2:
            'Studio materials keep a 96% RTP listing and a round ceiling commonly cited around 1,000× stake (hard caps can differ by operator). New rhythm comes from a scratch-style bonus that unlocks free spins, plus two paid feature levers: Extra Chance and Block Bonus.',
          bullets: [
            'Studio: InOut Games · listed March 2026',
            'Listed RTP 96% · confirm live tier in-client',
            'Sequel to Mine Slot · Nether theme',
            'Extra Chance + Block Bonus feature buys',
          ],
        },
        {
          heading: 'How the sequel round works',
          body: 'Set bet on the bottom bar, then spin. Pickaxes land in the inventory strip and dig through the stacked field. Stronger tools clear deeper / tougher blocks; clearing toward bottom chests is still the spike path when multipliers unlock.',
          body2:
            'HUD stays readable on mobile: Balance, Total Win, Spins Left, bet stepper, Spin, auto and turbo. During free-spin stretches Spins Left counts down while the mine field stays in play.',
          callout:
            'No demo iframe on this review URL. Scroll to #top-casino for sponsored casino redirects and launch Mine Slot 2 on a real balance.',
        },
        {
          heading: 'Extra Chance and Block Bonus',
          body: 'These are in-game feature purchases — not casino welcome bonuses. Prices scale with stake; on a $0.2 bet example panels often show Extra Chance activate around $0.6 (3× stake) and Block Bonus buy around $20 (100× stake).',
          body2:
            'Extra Chance is the lighter ante-style lever — you pay a small multiple to push feature odds / pickaxe quality. Block Bonus is the full buy into the block-bonus layer, with chest multipliers highlighted on the card. Always confirm live prices and rules in the casino client — operators can retune buy costs and availability.',
          steps: [
            'Extra Chance ≈ 3× stake ante-style activate',
            'Block Bonus ≈ 100× stake feature buy',
            'Separate from casino welcome / promo offers',
          ],
        },
        {
          heading: 'Scratch free spins and RTP',
          body: 'InOut describes an updated bonus phase: when the right symbols appear, play shifts to a scratch-style reveal that unlocks free spins. The mine field can stay relevant across those spins instead of resetting into an unrelated reel-only bonus — the clearest sequel upgrade versus the first Mine Slot.',
          body2:
            'Listed RTP is 96% — same ballpark as the original. Treat it as a studio figure; open the in-client info panel before depositing. Public sheets often cite ~1,000× max multiplier with an absolute cash cap on some builds. Variance still feels dig-driven: quiet spins, then Extra Chance / Block Bonus / scratch free spins can spike the session.',
        },
        {
          heading: 'Mine Slot 2 vs Mine Slot vs Mine Drop 2',
          body: 'Versus Mine Slot: same dig DNA, darker Nether look, plus Extra Chance / Block Bonus buys and the scratch free-spin layer. If you already like the original loop, the sequel is the feature-richer path.',
          body2:
            'Versus Mine Drop 2 (Paperclip): similar mining tile art, different studio and ceiling — do not mix the names in search. Versus cash-out crash like Lucky Jet: there is still no mid-round exit slider — the round resolves through dig depth, chests and bought / triggered features.',
          bullets: [
            'Sequel levers: Extra Chance + Block Bonus + scratch FS',
            'Not Paperclip Mine Drop 2 — different studio',
            'Confirm buy prices / caps per casino',
          ],
        },
        {
          heading: 'Who it suits',
          body: 'Best if you liked Mine Slot and want more paid feature control, or you want a Minecraft-adjacent dig hybrid with a clearer bonus menu. Extra Chance suits smaller top-ups; Block Bonus suits players who accept a 100× buy for a direct feature entry.',
          body2:
            'Skip it if you only want pure cash-out timing, hate dig progress, or refuse feature buys — then crash / plane reviews fit better. Prefer the quieter first dig hybrid — read the Mine Slot review.',
        },
        {
          heading: 'Where to play Mine Slot 2 for real money',
          body: 'For cash play use the top licensed casinos block below (#top-casino): pick a favorite, claim a welcome bonus, then open Mine Slot 2 / Mine Slot Two in the casino lobby on a real balance.',
          steps: [
            'Compare the top casinos below',
            'Claim a casino welcome bonus',
            'Launch Mine Slot 2 on a real balance',
          ],
          callout:
            'Sponsored affiliate links. Legal play only where permitted. 18+ · Gamble responsibly.',
        },
      ],
      ru: [
        {
          heading: 'Что такое Mine Slot 2',
          body: 'Mine Slot 2 (в поиске также Mine Slot Two) — сиквел Mine Slot от InOut Games. Dig-гибрид остаётся — кирки кормят шахту блоков — но мир уходит в Nether-пещеру с более «горячими» тирами блоков и плотным меню фич.',
          body2:
            'Студийные материалы держат RTP около 96% и потолок раунда часто около 1,000× ставки (жёсткие капы зависят от оператора). Новый ритм даёт scratch-бонус с фриспинами плюс два платных рычага: Extra Chance и Block Bonus.',
          bullets: [
            'Студия: InOut Games · март 2026',
            'RTP ~96% · сверяйте живой тир',
            'Сиквел Mine Slot · Nether-тема',
            'Покупки Extra Chance + Block Bonus',
          ],
        },
        {
          heading: 'Как устроен раунд сиквела',
          body: 'Ставка на нижней панели — Spin. Кирки попадают в инвентарь и копают стек блоков. Более сильный инструмент берёт глубже / крепче; путь к нижним сундукам по-прежнему главный шип, когда открываются множители.',
          body2:
            'HUD читаем на мобильном: Balance, Total Win, Spins Left, степпер ставки, Spin, auto и turbo. На фриспинах Spins Left считает вниз, а шахта остаётся в игре.',
          callout:
            'На этом URL обзора нет демо iframe. Спускайтесь к #top-casino за редиректом в казино и запускайте Mine Slot 2 на реальном балансе.',
        },
        {
          heading: 'Extra Chance и Block Bonus',
          body: 'Это внутриигровые покупки фич — не welcome-бонусы казино. Цены масштабируются со ставкой; на примере $0.2 часто видно Extra Chance ~$0.6 (3×) и Block Bonus ~$20 (100×).',
          body2:
            'Extra Chance — лёгкий ante-рычаг: небольшой мультипл, чтобы подтолкнуть шансы фичи / качество кирок. Block Bonus — полный вход в block-bonus слой с множителями сундуков на карточке. Всегда сверяйте живые цены в клиенте — операторы могут менять стоимость и доступность.',
          steps: [
            'Extra Chance ≈ 3× ставки (ante-activate)',
            'Block Bonus ≈ 100× ставки (feature buy)',
            'Это отдельно от welcome / promo казино',
          ],
        },
        {
          heading: 'Scratch-фриспины и RTP',
          body: 'InOut описывает обновлённую бонусную фазу: нужные символы переводят игру в scratch-reveal, который открывает фриспины. Шахта может оставаться важной на этих спинах — главный апгрейд относительно первого Mine Slot.',
          body2:
            'RTP ~96% — тот же порядок, что у оригинала. Это цифра студии; откройте info в клиенте до депозита. Часто цитируют ~1,000× max с абсолютным cash-cap на части сборок. Дисперсия всё ещё dig-driven: тихие спины, затем Extra Chance / Block Bonus / scratch FS могут резко поднять сессию.',
        },
        {
          heading: 'Mine Slot 2 vs Mine Slot vs Mine Drop 2',
          body: 'Против Mine Slot: та же dig-DNA, более тёмный Nether-вид, плюс Extra Chance / Block Bonus и scratch-фриспины. Если оригинал зашёл — сиквел даёт больше контроля фич.',
          body2:
            'Против Mine Drop 2 (Paperclip): похожий майнинг-арт, другая студия и потолок — не смешивайте названия в поиске. Против cash-out crash вроде Lucky Jet: mid-round exit slider нет — раунд закрывается глубиной, сундуками и купленными / триггерными фичами.',
          bullets: [
            'Рычаги сиквела: Extra Chance + Block Bonus + scratch FS',
            'Это не Paperclip Mine Drop 2',
            'Цены buy и капы — по казино',
          ],
        },
        {
          heading: 'Кому зайдёт',
          body: 'Зайдёт, если Mine Slot уже нравился и хочется больше платного контроля фич, либо нужен dig-гибрид с понятным bonus-меню. Extra Chance — для небольших докруток; Block Bonus — если готовы к покупке ~100× ставки.',
          body2:
            'Пройдите мимо, если нужен только cash-out, не любите dig-progress или отказываетесь от feature buys — тогда ближе crash/plane обзоры. Хотите спокойнее первый гибрид — читайте обзор Mine Slot.',
        },
        {
          heading: 'Где играть Mine Slot 2 на деньги',
          body: 'Для игры на деньги используйте блок казино ниже (#top-casino): выберите площадку, заберите welcome-бонус, найдите Mine Slot 2 / Mine Slot Two в лобби и запустите на реальном балансе.',
          steps: [
            'Сравните казино ниже',
            'Заберите welcome-бонус',
            'Запустите Mine Slot 2 на реальном балансе',
          ],
          callout:
            'Рекламные affiliate-ссылки. Играйте только там, где это законно. 18+ · Играйте ответственно.',
        },
      ],
    },
    faq: {
      en: [
        {
          q: 'What is Mine Slot 2?',
          a: 'An InOut Games dig hybrid sequel: Nether-themed mine, Extra Chance and Block Bonus feature buys, plus a scratch bonus that unlocks free spins. Listed RTP about 96%.',
        },
        {
          q: 'What is Mine Slot 2 RTP?',
          a: 'InOut lists about 96% RTP. Always confirm the live tier inside the casino client before depositing.',
        },
        {
          q: 'What are Extra Chance and Block Bonus?',
          a: 'In-game feature buys (not casino welcome offers). At a $0.2 stake example UI, Extra Chance activate is often ~$0.6 (3×) and Block Bonus buy ~$20 (100×). Prices scale with bet.',
        },
        {
          q: 'How is Mine Slot 2 different from Mine Slot?',
          a: 'Same dig DNA, Nether look, scratch free spins, and the Extra Chance / Block Bonus purchase panel. Read the Mine Slot review for the original loop.',
        },
        {
          q: 'Is Mine Slot 2 the same as Mine Drop 2?',
          a: 'No. Mine Slot 2 is InOut Games. Mine Drop 2 is Paperclip Gaming. Similar mining fantasy, different products.',
        },
        {
          q: 'Where can I play Mine Slot 2 for real money?',
          a: 'Through the top casinos block on this page (#top-casino) — pick a favorite, claim a welcome bonus, then open the game on a real balance.',
        },
        {
          q: 'Does this page include a free demo?',
          a: 'No. This is a text review with casino redirects only — no demo iframe.',
        },
      ],
      ru: [
        {
          q: 'Что такое Mine Slot 2?',
          a: 'Dig-гибрид-сиквел InOut Games: Nether-шахта, покупки Extra Chance и Block Bonus, scratch-бонус с фриспинами. RTP около 96%.',
        },
        {
          q: 'Какой RTP у Mine Slot 2?',
          a: 'InOut указывает около 96%. Всегда сверяйте живой тир в клиенте казино до депозита.',
        },
        {
          q: 'Что такое Extra Chance и Block Bonus?',
          a: 'Внутриигровые покупки фич (не welcome казино). На примере ставки $0.2 часто: Extra Chance ~$0.6 (3×) и Block Bonus ~$20 (100×). Цены растут со ставкой.',
        },
        {
          q: 'Чем Mine Slot 2 отличается от Mine Slot?',
          a: 'Та же dig-DNA, Nether-вид, scratch-фриспины и панель Extra Chance / Block Bonus. Оригинал — в обзоре Mine Slot.',
        },
        {
          q: 'Mine Slot 2 — это то же, что Mine Drop 2?',
          a: 'Нет. Mine Slot 2 — InOut Games. Mine Drop 2 — Paperclip Gaming. Похожий майнинг-фэнтези, разные продукты.',
        },
        {
          q: 'Где играть Mine Slot 2 на деньги?',
          a: 'Через блок казино на этой странице (#top-casino) — выберите площадку, заберите бонус и откройте игру на реальном балансе.',
        },
        {
          q: 'Есть ли на странице бесплатное демо?',
          a: 'Нет. Это текстовый обзор только с редиректом в казино — без демо iframe.',
        },
      ],
    },
    relatedIds: ['mine-slot'],
  },
]

export function getReviewById(id: string): ReviewData | undefined {
  return REVIEWS.find((r) => r.id === id)
}

export function reviewHref(lang: ReviewLang, id?: string): string {
  if (!id) return `/${lang}/reviews`
  return `/${lang}/reviews/${id}`
}
