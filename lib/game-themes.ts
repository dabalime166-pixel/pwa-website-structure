import type { Game, Lang } from '@/lib/games'

export type GameTheme =
  | 'fishing'
  | 'mythology'
  | 'candy'
  | 'animals'
  | 'megaways'
  | 'crash'
  | 'mines'
  | 'adventure'
  | 'glamour'
  | 'chaos'
  | 'table'
  | 'slots'

export function detectGameTheme(game: Game): GameTheme {
  const s = `${game.slug} ${game.name}`.toLowerCase()
  if (/bass|fish|splash|tuna|marlin|boat|catch/.test(s)) return 'fishing'
  if (/olympus|zeus|hades|greek|gods|cleocatra|pyramid|egypt|tut|kingdom|pharaoh|gatot|lamp|rio|anubis|horus|athena|ymir|medusa/.test(s))
    return 'mythology'
  if (/fruit|sweet|sugar|bonanza|candy|chilli|pepper|frozen|charms|monsta|clover|jelly|donut|beer|banana/.test(s))
    return 'candy'
  if (/dog|wolf|buffalo|mustang|rhino|tiger|safari|wild|animal|pixies|gladiator|kraken|gang|machine|walker|archer|cat|panda|piggy|eagle|dragon|chicken|cluck/.test(s))
    return 'animals'
  if (/megaways|stackways|stack.?n.?sync/.test(s)) return 'megaways'
  if ((game.gameType || '').toLowerCase().includes('crash') || /crash|always.?up/.test(s)) return 'crash'
  if ((game.gameType || '').toLowerCase().includes('mine') || /mines|scratch/.test(s)) return 'mines'
  if (/book|vikings|pirate|gold|treasure|spartan|john-hunter|return|mystery|empty-the-bank|wanted|outlaw|ronin|shaolin|warrior/.test(s))
    return 'adventure'
  if (/starlight|princess|starz|vegas|joker|jewels|nights|christmas|xmas|destiny|badge|blitz|luxe|miami|rainbow/.test(s))
    return 'glamour'
  if (/chaos|crew|dork|bombs|bullets|duel|rip-city|hacksaw|bandit|le-zeus|le-king|le-pharaoh|le-bunny|le-bandit|wanted-dead|six-six-six/.test(s))
    return 'chaos'
  if (/dice|roulette|blackjack|poker|twenty-one/.test(s)) return 'table'
  return 'slots'
}

type ThemeCopy = {
  labelRu: string
  labelEn: string
  focusRu: string
  focusEn: string
  checklistRu: string[]
  checklistEn: string[]
  highlightRu: { title: string; desc: string }[]
  highlightEn: { title: string; desc: string }[]
  faqExtraRu: { q: string; a: string }
  faqExtraEn: { q: string; a: string }
}

const THEMES: Record<GameTheme, ThemeCopy> = {
  fishing: {
    labelRu: 'Рыбная охота',
    labelEn: 'Fishing hunt',
    focusRu: 'улов, рыбак и суммирование множителей',
    focusEn: 'catch features, the angler and stacked multipliers',
    checklistRu: [
      'Зафиксируйте, на каком спине впервые пришёл рыбак',
      'Сравните мелкий улов и редкий крупный множитель',
      'Не меняйте виртуальную ставку в середине теста',
    ],
    checklistEn: [
      'Note which spin first brings the angler',
      'Compare small catches vs rare big multipliers',
      'Keep the virtual stake fixed mid-test',
    ],
    highlightRu: [
      { title: 'Охота без депозита', desc: 'Смотрите улов и множители на виртуальном балансе.' },
      { title: 'Ритм рыбака', desc: 'Оцените, как часто бонус вмешивается в сессию.' },
      { title: 'Ставка под тест', desc: 'Одна виртуальная ставка — честнее сравнение дисперсии.' },
    ],
    highlightEn: [
      { title: 'Hunt without deposit', desc: 'Watch catches and multipliers on virtual credits.' },
      { title: 'Angler rhythm', desc: 'Judge how often the bonus interrupts the base game.' },
      { title: 'One test stake', desc: 'A fixed virtual stake keeps variance readable.' },
    ],
    faqExtraRu: {
      q: 'На что смотреть в демо рыбной темы?',
      a: 'Смотрите частоту рыбака, силу множителей за короткий отрезок и длину «пустых» серий между уловами. Так вы понимаете темп до игры на деньги.',
    },
    faqExtraEn: {
      q: 'What should I watch in a fishing-theme demo?',
      a: 'Track angler frequency, multiplier strength over a short sample, and dry stretches between catches — that reveals pace before real-money play.',
    },
  },
  mythology: {
    labelRu: 'Мифология',
    labelEn: 'Mythology',
    focusRu: 'орбы богов, каскады и множители',
    focusEn: 'god orbs, cascades and multipliers',
    checklistRu: [
      'Посчитайте, как часто бог меняет итог каскада',
      'Отметьте длину tumble/каскада без депозита',
      'Сравните спокойный базовый спин и «божественный» режим',
    ],
    checklistEn: [
      'Count how often a god feature changes the cascade',
      'Log tumble/cascade length with no deposit',
      'Compare calm base spins vs the god mode feel',
    ],
    highlightRu: [
      { title: 'Каскады в демо', desc: 'Учите длину цепочек без риска депозита.' },
      { title: 'Множители богов', desc: 'Смотрите, спасают ли орбы «сухие» серии.' },
      { title: 'Темп мифа', desc: 'Поймите, подходит ли ритм вашему стилю.' },
    ],
    highlightEn: [
      { title: 'Cascades in demo', desc: 'Learn chain length without deposit risk.' },
      { title: 'God multipliers', desc: 'See whether orbs soften dry stretches.' },
      { title: 'Myth pace', desc: 'Decide if the rhythm fits your style.' },
    ],
    faqExtraRu: {
      q: 'Чем полезно демо мифологического слота?',
      a: 'Вы видите, как часто вмешивается бог/орб и как каскады меняют итоговый множитель. Это важнее красивых скриншотов бонуса.',
    },
    faqExtraEn: {
      q: 'Why try a mythology slot in demo?',
      a: 'You see how often the god/orb feature lands and how cascades change the total — more useful than highlight-reel screenshots.',
    },
  },
  candy: {
    labelRu: 'Сладости / фрукты',
    labelEn: 'Candy / fruit',
    focusRu: 'кластеры, tumble и цветные множители',
    focusEn: 'clusters, tumbles and coloured multipliers',
    checklistRu: [
      'Замерьте среднюю длину tumble-цепочки',
      'Отметьте частоту бомб/множителей',
      'Проверьте читаемость символов на узком экране',
    ],
    checklistEn: [
      'Measure average tumble-chain length',
      'Log bomb/multiplier hit rate',
      'Check symbol readability on a narrow screen',
    ],
    highlightRu: [
      { title: 'Tumble без риска', desc: 'Смотрите цепочки выплат на виртуальном балансе.' },
      { title: 'Цветные множители', desc: 'Оцените, как часто они реально спасают спин.' },
      { title: 'Темп сладостей', desc: 'Поймите, не слишком ли быстрый ритм для вас.' },
    ],
    highlightEn: [
      { title: 'Risk-free tumbles', desc: 'Watch pay chains on virtual credits.' },
      { title: 'Coloured multipliers', desc: 'Judge how often they actually save a spin.' },
      { title: 'Candy pace', desc: 'Decide if the tempo feels too fast.' },
    ],
    faqExtraRu: {
      q: 'Что проверять в candy/fruit демо?',
      a: 'Длину tumble, частоту множителей и ощущение «пустых» спинов. Так вы отделяете красивую анимацию от реального темпа сессии.',
    },
    faqExtraEn: {
      q: 'What to check in a candy/fruit demo?',
      a: 'Tumble length, multiplier frequency and empty-spin feel — so flashy animation does not hide real session pace.',
    },
  },
  animals: {
    labelRu: 'Животные / wild',
    labelEn: 'Animals / wilds',
    focusRu: 'вайлды, фриспины и липкие множители',
    focusEn: 'wilds, free spins and sticky multipliers',
    checklistRu: [
      'Проверьте, насколько «липкие» вайлды во фриспинах',
      'Запишите спин первого бонуса',
      'Сравните базовую игру и бонусный режим по темпу',
    ],
    checklistEn: [
      'Check how sticky wilds feel in free spins',
      'Log the spin of the first bonus',
      'Compare base-game vs bonus-mode pace',
    ],
    highlightRu: [
      { title: 'Вайлды в деле', desc: 'Увидите липкость символов без депозита.' },
      { title: 'Фриспины демо', desc: 'Оцените рост множителя на короткой выборке.' },
      { title: 'Стиль охоты', desc: 'Поймите, подходит ли волатильность.' },
    ],
    highlightEn: [
      { title: 'Wilds in action', desc: 'See sticky symbols with no deposit.' },
      { title: 'Free-spin demo', desc: 'Judge multiplier growth on a short sample.' },
      { title: 'Hunt style', desc: 'Decide if volatility fits you.' },
    ],
    faqExtraRu: {
      q: 'Как оценить animal/wild слот в демо?',
      a: 'Смотрите липкость вайлдов, скорость роста множителя во фриспинах и длину сухих серий в базе. Это и есть полезный контент карточки.',
    },
    faqExtraEn: {
      q: 'How do I judge an animal/wild slot in demo?',
      a: 'Watch wild stickiness, free-spin multiplier growth and base-game dry stretches — that is the useful part of the card.',
    },
  },
  megaways: {
    labelRu: 'Megaways',
    labelEn: 'Megaways',
    focusRu: 'переменные ways, каскады и растущий множитель',
    focusEn: 'variable ways, cascades and climbing multipliers',
    checklistRu: [
      'Сравните «узкий» и «широкий» спин по ways',
      'Отметьте, как растёт множитель в каскаде',
      'Не судите по одному скриншоту максимального ways',
    ],
    checklistEn: [
      'Compare narrow vs wide ways spins',
      'Note how the cascade multiplier climbs',
      'Do not judge from one max-ways screenshot',
    ],
    highlightRu: [
      { title: 'Ways вживую', desc: 'Увидите разброс способов выиграть за сессию.' },
      { title: 'Каскадный множитель', desc: 'Проверьте рост без риска депозита.' },
      { title: 'Честный темп', desc: 'Megaways ощущается иначе, чем статичные линии.' },
    ],
    highlightEn: [
      { title: 'Ways live', desc: 'See win-ways spread across a session.' },
      { title: 'Cascade multiplier', desc: 'Test the climb with no deposit risk.' },
      { title: 'Honest pace', desc: 'Megaways feels different from fixed lines.' },
    ],
    faqExtraRu: {
      q: 'Зачем демо именно для Megaways?',
      a: 'Число ways меняется каждый спин. Только демо показывает, как часто бывают «узкие» раунды и как это бьёт по ощущению сессии.',
    },
    faqExtraEn: {
      q: 'Why demo Megaways specifically?',
      a: 'Ways count changes every spin. Only demo shows how often narrow rounds appear and how that shapes session feel.',
    },
  },
  crash: {
    labelRu: 'Crash',
    labelEn: 'Crash',
    focusRu: 'рост множителя и момент кэшаута',
    focusEn: 'multiplier climb and cashout timing',
    checklistRu: [
      'Зафиксируйте цель автокэшаута на 20–30 раундов',
      'Сравните ручной выход и авторежим',
      'Ведите простой лог раундов в заметках',
    ],
    checklistEn: [
      'Lock an auto-cashout target for 20–30 rounds',
      'Compare manual exits vs auto mode',
      'Keep a simple round log in your notes',
    ],
    highlightRu: [
      { title: 'Кэшаут без риска', desc: 'Тренируйте выход на виртуальном балансе.' },
      { title: 'Цель множителя', desc: 'Проверьте дисциплину автокэшаута.' },
      { title: 'Темп раундов', desc: 'Поймите ритм до депозита.' },
    ],
    highlightEn: [
      { title: 'Risk-free cashout', desc: 'Practice exits on virtual balance.' },
      { title: 'Multiplier target', desc: 'Test auto-cashout discipline.' },
      { title: 'Round pace', desc: 'Learn the rhythm before depositing.' },
    ],
    faqExtraRu: {
      q: 'Чем полезно crash-демо?',
      a: 'Вы отрабатываете решение о выходе без давления депозита. Это навык, а не «поиск горячего коэффициента».',
    },
    faqExtraEn: {
      q: 'What is useful about a crash demo?',
      a: 'You practice exit decisions without deposit pressure — a skill, not a hunt for a “hot” multiplier.',
    },
  },
  mines: {
    labelRu: 'Mines',
    labelEn: 'Mines',
    focusRu: 'число мин, открытие клеток и кэшаут',
    focusEn: 'mine count, tile opens and cashout',
    checklistRu: [
      'Начните с 3 мин и цели 1.5x–2.5x',
      'Не повышайте риск после двух неудач подряд',
      'Сравните осторожный и агрессивный сценарий',
    ],
    checklistEn: [
      'Start with 3 mines and a 1.5x–2.5x target',
      'Do not raise risk after two failures in a row',
      'Compare a cautious vs aggressive scenario',
    ],
    highlightRu: [
      { title: 'Риск читаем', desc: 'Число мин видно до каждого открытия.' },
      { title: 'Кэшаут в демо', desc: 'Учите момент выхода без депозита.' },
      { title: 'Сценарии', desc: 'Сравните спокойный и резкий стиль.' },
    ],
    highlightEn: [
      { title: 'Readable risk', desc: 'Mine count is clear before each open.' },
      { title: 'Cashout in demo', desc: 'Learn exit timing with no deposit.' },
      { title: 'Scenarios', desc: 'Compare calm vs sharp styles.' },
    ],
    faqExtraRu: {
      q: 'Как тренироваться в Mines демо?',
      a: 'Выберите фиксированное число мин и цель кэшаута, сделайте серию раундов и смотрите дисциплину — не «удачные клетки».',
    },
    faqExtraEn: {
      q: 'How should I train in Mines demo?',
      a: 'Pick a fixed mine count and cashout target, run a series of rounds, and judge discipline — not “lucky tiles.”',
    },
  },
  adventure: {
    labelRu: 'Приключения',
    labelEn: 'Adventure',
    focusRu: 'книги, скаттеры и выкуп бонуса',
    focusEn: 'books, scatters and bonus-buy feel',
    checklistRu: [
      'Посчитайте спины до первых скаттеров',
      'Сначала изучите обычный триггер, потом buy',
      'Сравните темп с соседними book-слотами',
    ],
    checklistEn: [
      'Count spins to the first scatters',
      'Learn the natural trigger before any buy',
      'Compare pace with neighbouring book titles',
    ],
    highlightRu: [
      { title: 'Скаттеры в демо', desc: 'Увидите реальный темп до бонуса.' },
      { title: 'Книга / бонус', desc: 'Оцените режим без депозита.' },
      { title: 'Сравнение релизов', desc: 'Рядом — похожие приключенческие слоты.' },
    ],
    highlightEn: [
      { title: 'Scatters in demo', desc: 'See real time-to-bonus pace.' },
      { title: 'Book / bonus', desc: 'Judge the mode with no deposit.' },
      { title: 'Compare releases', desc: 'Similar adventure titles sit nearby.' },
    ],
    faqExtraRu: {
      q: 'Что даёт демо adventure/book слота?',
      a: 'Вы измеряете ожидание до скаттеров и ощущение бонуса на виртуальных кредитах — без покупки «кота в мешке».',
    },
    faqExtraEn: {
      q: 'What does an adventure/book demo give you?',
      a: 'You measure wait-to-scatters and bonus feel on virtual credits — without buying a mystery box.',
    },
  },
  glamour: {
    labelRu: 'Яркий визуал',
    labelEn: 'Glamour visuals',
    focusRu: 'множители, бонусные режимы и читаемость UI',
    focusEn: 'multipliers, bonus modes and UI clarity',
    checklistRu: [
      'Следите за частотой множителя, а не только за анимацией',
      'Проверьте кнопки на мобильном',
      'Отметьте, спасает ли множитель сухие серии',
    ],
    checklistEn: [
      'Track multiplier frequency, not only animation',
      'Check buttons on mobile',
      'Note whether multipliers soften dry stretches',
    ],
    highlightRu: [
      { title: 'Красота + механика', desc: 'Отделите визуал от реального темпа выплат.' },
      { title: 'Множители', desc: 'Проверьте hit-rate без депозита.' },
      { title: 'UI на телефоне', desc: 'Удобство кнопок тоже часть решения.' },
    ],
    highlightEn: [
      { title: 'Looks + mechanics', desc: 'Separate visuals from real pay pace.' },
      { title: 'Multipliers', desc: 'Check hit-rate with no deposit.' },
      { title: 'Phone UI', desc: 'Button comfort is part of the decision.' },
    ],
    faqExtraRu: {
      q: 'Почему демо важно для «глянцевых» слотов?',
      a: 'Яркая картинка легко маскирует сухие серии. Демо показывает частоту множителей и удобство интерфейса на реальном экране.',
    },
    faqExtraEn: {
      q: 'Why demo flashy glamour slots?',
      a: 'Pretty art can hide dry stretches. Demo shows multiplier frequency and UI comfort on a real screen.',
    },
  },
  chaos: {
    labelRu: 'Hacksaw / xFeatures',
    labelEn: 'Hacksaw / xFeatures',
    focusRu: 'резкий темп, множители и усиленные режимы',
    focusEn: 'sharp pace, multipliers and enhanced modes',
    checklistRu: [
      'Отметьте, как часто база «ломается» в усиленный режим',
      'Сравните ощущение дисперсии на 80–100 спинах',
      'Проверьте читаемость UI на узком экране',
    ],
    checklistEn: [
      'Note how often base game breaks into an enhanced mode',
      'Compare variance feel across 80–100 spins',
      'Check UI readability on a narrow screen',
    ],
    highlightRu: [
      { title: 'Темп Hacksaw', desc: 'Поймите резкость сессии без депозита.' },
      { title: 'xFeatures в деле', desc: 'Смотрите частоту усилений на короткой выборке.' },
      { title: 'Дисперсия', desc: 'Решите, комфортен ли размах до кассы.' },
    ],
    highlightEn: [
      { title: 'Hacksaw pace', desc: 'Judge session sharpness with no deposit.' },
      { title: 'xFeatures live', desc: 'Watch enhancement frequency on a short sample.' },
      { title: 'Variance', desc: 'Decide if the swing fits you before the cashier.' },
    ],
    faqExtraRu: {
      q: 'Зачем демо для слотов Hacksaw-стиля?',
      a: 'У таких релизов темп и дисперсия часто выше среднего. Демо показывает, комфортен ли ритм именно вам — до депозита.',
    },
    faqExtraEn: {
      q: 'Why demo Hacksaw-style slots?',
      a: 'These titles often run above-average pace and variance. Demo shows whether the rhythm fits you — before any deposit.',
    },
  },
  table: {
    labelRu: 'Стол / кости',
    labelEn: 'Table / dice',
    focusRu: 'темп раундов, правила выплат и UI',
    focusEn: 'round pace, payout rules and UI',
    checklistRu: [
      'Сделайте 30–50 демо-раундов с одной ставкой',
      'Проверьте понятность правил выплат',
      'Оцените удобство кнопок на телефоне',
    ],
    checklistEn: [
      'Run 30–50 demo rounds at one stake',
      'Check that payout rules stay clear',
      'Judge button comfort on a phone',
    ],
    highlightRu: [
      { title: 'Правила без риска', desc: 'Изучите выплаты на виртуальном балансе.' },
      { title: 'Темп раундов', desc: 'Поймите ритм до депозита.' },
      { title: 'UI стола', desc: 'Удобство управления тоже важно.' },
    ],
    highlightEn: [
      { title: 'Rules risk-free', desc: 'Learn payouts on virtual balance.' },
      { title: 'Round pace', desc: 'Feel the rhythm before depositing.' },
      { title: 'Table UI', desc: 'Control comfort matters too.' },
    ],
    faqExtraRu: {
      q: 'Чем полезно демо table/dice игры?',
      a: 'Вы проверяете темп раундов и понятность UI без давления депозита — это и есть полезный контент карточки.',
    },
    faqExtraEn: {
      q: 'What is useful about a table/dice demo?',
      a: 'You check round pace and UI clarity without deposit pressure — that is the useful part of the card.',
    },
  },
  slots: {
    labelRu: 'Классический слот',
    labelEn: 'Classic slot',
    focusRu: 'линии/вейсы, фриспины и RTP',
    focusEn: 'lines/ways, free spins and RTP',
    checklistRu: [
      'Сделайте 80–120 демо-спинов с одной ставкой',
      'Запишите длину самой длинной сухой серии',
      'Сравните ощущение с 1–2 соседними слотами',
    ],
    checklistEn: [
      'Run 80–120 demo spins at one stake',
      'Log the longest dry stretch',
      'Compare feel with 1–2 neighbouring titles',
    ],
    highlightRu: [
      { title: 'Бесплатный баланс', desc: 'Тренируйтесь на виртуальных кредитах.' },
      { title: 'Та же механика', desc: 'Демо повторяет RTP и бонусные правила.' },
      { title: 'В браузере сразу', desc: 'Запуск на телефоне и ПК без установки.' },
    ],
    highlightEn: [
      { title: 'Free credits', desc: 'Practice with virtual balance — no deposit.' },
      { title: 'Same mechanics', desc: 'Demo mirrors RTP and feature logic.' },
      { title: 'Instant browser', desc: 'Launch on mobile or desktop in one tap.' },
    ],
    faqExtraRu: {
      q: 'Как извлечь пользу из демо классического слота?',
      a: 'Фиксируйте ставку, считайте сухие серии и смотрите частоту фриспинов. Так карточка помогает решить, подходит ли темп, а не просто повторяет название.',
    },
    faqExtraEn: {
      q: 'How do I get value from a classic slot demo?',
      a: 'Fix the stake, count dry stretches and watch free-spin frequency. The card then helps you decide on pace — not just repeat the title.',
    },
  },
}

export function getThemeCopy(theme: GameTheme): ThemeCopy {
  return THEMES[theme]
}

export function getGameHighlights(game: Game, lang: Lang) {
  const theme = detectGameTheme(game)
  const copy = getThemeCopy(theme)
  const list = lang === 'en' ? copy.highlightEn : copy.highlightRu
  return list.map((item, i) => ({
    k: String(i + 1).padStart(2, '0'),
    title: item.title,
    desc: item.desc,
  }))
}

export function getDemoChecklist(game: Game, lang: Lang): {
  label: string
  focus: string
  items: string[]
} {
  const theme = detectGameTheme(game)
  const copy = getThemeCopy(theme)
  if (lang === 'en') {
    return {
      label: copy.labelEn,
      focus: copy.focusEn,
      items: copy.checklistEn.map((line) => line.replace(/\{name\}/g, game.name)),
    }
  }
  return {
    label: copy.labelRu,
    focus: copy.focusRu,
    items: copy.checklistRu.map((line) => line.replace(/\{name\}/g, game.name)),
  }
}

export function getThemeFaqExtra(game: Game, lang: Lang): { question: string; answer: string } {
  const theme = detectGameTheme(game)
  const copy = getThemeCopy(theme)
  const extra = lang === 'en' ? copy.faqExtraEn : copy.faqExtraRu
  return {
    question: extra.q.replace(/\{name\}/g, game.name),
    answer: `${extra.a} ${lang === 'en' ? `${game.name} · ${game.provider} · RTP ${game.rtp || '~96%'}.` : `${game.name} · ${game.provider} · RTP ${game.rtp || '~96%'}.`}`,
  }
}
