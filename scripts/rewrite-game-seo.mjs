/**
 * Rewrite ALL game SEO texts into unique, useful bilingual copy
 * (anti thin-content for Yandex/Google).
 *
 * Usage: node scripts/rewrite-game-seo.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const path = join(__dirname, '../lib/games-data.json')
const games = JSON.parse(readFileSync(path, 'utf8'))

const KEEP_UNIQUE = new Set(['gates-of-olympus', 'sweet-bonanza', 'tower-rush'])

function detectTheme(game) {
  const s = `${game.slug} ${game.name}`.toLowerCase()
  if (/bass|fish|splash|tuna|marlin|boat|catch/.test(s)) return 'fishing'
  if (/olympus|zeus|hades|greek|gods|cleocatra|pyramid|egypt|tut|kingdom|pharaoh|gatot|lamp|rio|anubis|horus|athena|ymir|medusa/.test(s))
    return 'mythology'
  if (/fruit|sweet|sugar|bonanza|candy|chilli|pepper|frozen|charms|monsta|clover|jelly|donut|beer|banana/.test(s))
    return 'candy'
  if (/dog|wolf|buffalo|mustang|rhino|tiger|safari|wild|animal|pixies|gladiator|kraken|gang|machine|walker|archer|cat|panda|piggy|eagle|dragon|chicken|cluck/.test(s))
    return 'animals'
  if (/megaways|stackways|stack.?n.?sync|ways/.test(s)) return 'megaways'
  if ((game.gameType || '').toLowerCase().includes('crash') || /crash|aviator|always.?up/.test(s))
    return 'crash'
  if ((game.gameType || '').toLowerCase().includes('mine') || /mines|scratch/.test(s)) return 'mines'
  if (/book|vikings|pirate|gold|treasure|spartan|john-hunter|return|mystery|empty-the-bank|wanted|outlaw|ronin|shaolin|warrior/.test(s))
    return 'adventure'
  if (/starlight|princess|starz|vegas|joker|jewels|nights|christmas|xmas|destiny|badge|blitz|luxe|miami|rainbow/.test(s))
    return 'glamour'
  if (/chaos|crew|dork|bombs|bullets|duel|rip-city|rip city|hacksaw|bandit|le-zeus|le-king|le-pharaoh|le-bunny|le-bandit|wanted-dead|six-six-six/.test(s))
    return 'chaos'
  if (/dice|roulette|blackjack|poker|twenty-one|twenty one/.test(s)) return 'table'
  return 'slots'
}

function hashSeed(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function pick(seed, arr) {
  return arr[seed % arr.length]
}

const THEME = {
  fishing: {
    ruFocus: 'рыбная охота, улов и множители рыбака',
    enFocus: 'fishing features, catches and angler multipliers',
    ruTip: 'В демо отметьте частоту рыбака и силу суммирования множителей за короткий отрезок.',
    enTip: 'In demo, track angler frequency and how hard multipliers stack in a short sample.',
  },
  mythology: {
    ruFocus: 'мифологические символы, орбы богов и каскады',
    enFocus: 'mythology symbols, god orbs and cascades',
    ruTip: 'Смотрите, как часто бог/орб меняет итог каскада без депозита.',
    enTip: 'Watch how often a god/orb feature changes the cascade total.',
  },
  candy: {
    ruFocus: 'сладости/фрукты, tumble и цветные множители',
    enFocus: 'candy/fruit themes, tumbles and coloured multipliers',
    ruTip: 'Оцените длину tumble-цепочек и частоту бомб/множителей.',
    enTip: 'Judge tumble-chain length and bomb/multiplier frequency.',
  },
  animals: {
    ruFocus: 'животные/вайлды, фриспины и липкие множители',
    enFocus: 'animal/wild themes, free spins and sticky multipliers',
    ruTip: 'Проверьте липкость вайлдов и рост множителя во фриспинах.',
    enTip: 'Check wild stickiness and free-spin multiplier growth.',
  },
  megaways: {
    ruFocus: 'переменные ways/stackways и растущий множитель',
    enFocus: 'variable ways/stackways and a climbing multiplier',
    ruTip: 'Сравните «узкие» и «широкие» спины по частоте мелких выплат.',
    enTip: 'Compare narrow vs wide spins on small-win frequency.',
  },
  crash: {
    ruFocus: 'рост множителя и момент кэшаута',
    enFocus: 'multiplier climb and cashout timing',
    ruTip: 'Зафиксируйте цель автокэшаута на 20–30 раундов и сравните с ручным выходом.',
    enTip: 'Lock an auto-cashout target for 20–30 rounds and compare with manual exits.',
  },
  mines: {
    ruFocus: 'риск по клеткам/царапинам и момент выхода',
    enFocus: 'tile/scratch risk and exit timing',
    ruTip: 'Начните с низкого риска и цели 1.5x–2.5x — так проще читать дисперсию.',
    enTip: 'Start low-risk with a 1.5x–2.5x target so variance stays readable.',
  },
  adventure: {
    ruFocus: 'приключение, скаттеры/книги и бонусный режим',
    enFocus: 'adventure setting, scatters/books and bonus mode',
    ruTip: 'Посчитайте спины до первых скаттеров, прежде чем судить о темпе.',
    enTip: 'Count spins-to-scatters before judging the pace.',
  },
  glamour: {
    ruFocus: 'яркий визуал, множители и бонусные режимы',
    enFocus: 'flashy visuals, multipliers and bonus modes',
    ruTip: 'Следите за hit-rate множителя, а не только за анимацией.',
    enTip: 'Track multiplier hit-rate, not only the animation.',
  },
  chaos: {
    ruFocus: 'агрессивный темп Hacksaw-стиля, множители и xFeatures',
    enFocus: 'Hacksaw-style pace, multipliers and xFeatures',
    ruTip: 'В демо отдельно отметьте, как часто «ломается» база и входит усиленный режим.',
    enTip: 'In demo, note how often the base game breaks into an enhanced mode.',
  },
  table: {
    ruFocus: 'темп раундов, правила выплат и читаемость UI',
    enFocus: 'round pace, payout rules and UI clarity',
    ruTip: 'Сделайте 30–50 демо-раундов с одной ставкой и проверьте удобство кнопок.',
    enTip: 'Run 30–50 demo rounds at one stake and check button comfort.',
  },
  slots: {
    ruFocus: 'линии/вейсы, фриспины и заявленный RTP',
    enFocus: 'lines/ways, free spins and published RTP',
    ruTip: 'Сделайте 80–120 демо-спинов с одной ставкой и запишите длину сухих серий.',
    enTip: 'Run 80–120 demo spins at one stake and log dry-stretch length.',
  },
}

const OPENERS_RU = [
  'Если вы ищете',
  'Для тех, кто хочет понять',
  'Практичный разбор',
  'Коротко и по делу про',
  'Этот гайд поможет освоить',
  'Отдельная карточка про',
  'Разобрать без шума',
  'Полезный чеклист по',
  'Спокойный разбор',
  'Рабочая инструкция к',
]
const OPENERS_EN = [
  'If you are looking for',
  'A practical breakdown of',
  'Use this page to understand',
  'A clear walkthrough of',
  'Learn how to approach',
  'A focused card about',
  'Cut the noise around',
  'A useful checklist for',
  'A calm breakdown of',
  'A working guide to',
]

function providerAngle(provider, seed, lang) {
  const ru = {
    'BGaming': [
      'BGaming обычно даёт быстрый HTML5-запуск и понятный FUN-режим — удобно тестировать на телефоне.',
      'У BGaming демо совпадает с базовой механикой кассы, поэтому выводы по темпу переносятся на реальную игру осторожно, но честно.',
      'Серия BGaming в каталоге 1weapp собрана так, чтобы сравнивать соседние релизы студии без регистрации.',
    ],
    'Hacksaw Gaming': [
      'Hacksaw Gaming часто делает резкий темп и сильные x-фичи — демо нужно именно чтобы понять комфорт дисперсии.',
      'У Hacksaw важна читаемость бонусного режима: в демо проверьте, не перегружает ли UI на узком экране.',
      'Каталог Hacksaw на 1weapp позволяет сравнить «спокойные» и «хаотичные» релизы студии подряд.',
    ],
    'Pragmatic Play': [
      'Pragmatic Play демо удобно для длинных сессий на виртуальном балансе — так лучше видно сухие серии.',
      'Официальные demo-ссылки Pragmatic позволяют оценить RTP-ориентир и бонусы без депозита.',
      'Сравнивайте релизы Pragmatic рядом: один провайдер — честнее понять разницу темпа.',
    ],
    "Play'n GO": [
      'Play\'n GO демо удобно для проверки фич — фриспины и Blitz-режимы читаются в FUN-режиме.',
      'У Play\'n GO сравните соседние тайтлы по частоте бонуса, прежде чем судить о волатильности.',
      'Каталог Play\'n GO на 1weapp рассчитан на длинный скролл без регистрации.',
    ],
    NetEnt: [
      'NetEnt демо удобно сравнивать классику и современные релизы — от Starburst до Megaways.',
      'В FUN-режиме NetEnt оцените полировку UI и читаемость фич на телефоне до депозита.',
      'Соседние карточки NetEnt показывают, как студия меняла ощущение сухих серий годами.',
    ],
    default: [
      'Демо на 1weapp нужно для механики и темпа, а не для поиска «сигнала».',
      'Виртуальный баланс снимает давление депозита — вы смотрите на интерфейс и дисперсию.',
      'Сравнивайте соседние карточки того же провайдера, чтобы выбрать комфортный ритм.',
    ],
  }
  const en = {
    'BGaming': [
      'BGaming usually offers a fast HTML5 FUN mode — ideal for phone testing.',
      'BGaming demos mirror core cashier mechanics, so pace notes transfer carefully but honestly.',
      'The BGaming set on 1weapp is built to compare neighbouring studio releases without signup.',
    ],
    'Hacksaw Gaming': [
      'Hacksaw Gaming often runs sharp pace and strong x-features — demo exists to judge variance comfort.',
      'With Hacksaw, bonus-mode readability matters: check whether the UI feels crowded on a narrow screen.',
      'The Hacksaw catalog on 1weapp lets you compare calmer vs chaotic studio releases back-to-back.',
    ],
    'Pragmatic Play': [
      'Pragmatic Play demos suit longer virtual-balance sessions — dry stretches become visible.',
      'Official Pragmatic demo links let you judge RTP range and bonuses with no deposit.',
      'Compare neighbouring Pragmatic titles: one studio makes pace differences clearer.',
    ],
    "Play'n GO": [
      "Play'n GO demos are strong for feature-check sessions — free spins and Blitz modes feel clear in FUN mode.",
      "With Play'n GO, compare neighbouring titles on bonus frequency before you judge volatility.",
      "The Play'n GO catalog on 1weapp is built for long scrolling sessions without signup friction.",
    ],
    NetEnt: [
      'NetEnt demos are ideal for classic-vs-modern pace checks — Starburst-era titles sit next to Megaways releases.',
      'Use NetEnt FUN mode to judge UI polish and feature clarity on phone before any deposit.',
      'Comparing neighbouring NetEnt cards shows how the same studio changes dry-stretch feel over years.',
    ],
    default: [
      '1weapp demos are for mechanics and pace — not for hunting a “signal”.',
      'Virtual balance removes deposit pressure so you can watch UI and variance.',
      'Compare neighbouring cards from the same provider to pick a comfortable rhythm.',
    ],
  }
  const bag = (lang === 'ru' ? ru : en)[provider] || (lang === 'ru' ? ru : en).default
  return pick(seed >>> 13, bag)
}

function slugInsight(slug, name, seed, lang) {
  const letters = slug.replace(/[^a-z0-9]/gi, '')
  const code = letters.slice(0, 4) || slug.slice(0, 4)
  if (lang === 'ru') {
    return pick(seed >>> 15, [
      `Практический якорь страницы: код «${code}» в URL /${slug} — это отдельная карточка ${name}, а не общий лендинг провайдера.`,
      `В каталоге 1weapp слот помечен slug «${slug}»: сохраните его, если будете сравнивать несколько демо подряд.`,
      `Страница /${slug} отвечает только за ${name}. Соседние URL — другие игры, другие наблюдения.`,
      `Чтобы не путать тайтлы, ориентируйтесь на slug ${slug} и название ${name} в шапке карточки.`,
    ])
  }
  return pick(seed >>> 15, [
    `Page anchor: code “${code}” in URL /${slug} marks a dedicated ${name} card — not a generic provider landing.`,
    `In the 1weapp catalog this title is tagged “${slug}”: keep it if you compare several demos in a row.`,
    `URL /${slug} is only about ${name}. Neighbouring paths are different games and different notes.`,
    `To avoid mixing titles, use slug ${slug} plus the ${name} header on this card.`,
  ])
}

function buildRu(game, theme, seed) {
  const t = THEME[theme] || THEME.slots
  const name = game.name
  const slug = game.slug
  const rtp = game.rtp || '~96%'
  const type = game.gameType || 'Slots'
  const provider = game.provider || 'Pragmatic Play'
  const opener = pick(seed, OPENERS_RU)
  const kw = (game.keywordsRu || '')
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean)
    .slice(0, 3)

  const kwLine = kw.length
    ? `Частые запросы вокруг тайтла: ${kw.join(', ')}.`
    : `Частый запрос: ${name} демо, ${name} бесплатно, ${name} играть.`

  const sampleSpins = 48 + (seed % 11) * 7
  const stakeHint = pick(seed >>> 3, ['0.20–0.50', '0.40–1.00', '0.10–0.40', '0.25–0.75', '0.50–1.20', '0.15–0.60'])
  const minutes = 7 + (seed % 8)
  const checkpoint = pick(seed >>> 5, [
    `Отдельно запишите, на каком спине впервые сработал бонусный режим в ${name}.`,
    `Сравните ${name} с соседними слотами ${provider} по темпу «сухих» серий.`,
    `Проверьте ${name} на телефоне и ПК — удобство кнопок и читаемость символов тоже важны.`,
    `Не меняйте виртуальную ставку посередине теста ${name}: так проще честно оценить дисперсию.`,
    `Если в ${name} есть покупка бонуса — сначала изучите обычный триггер в демо, потом уже buy.`,
    `Ведите мини-лог из ${minutes} минут по ${name}: плюс/минус по ощущению, без охоты за «сигналом».`,
    `После ${sampleSpins} спинов в ${name} ответьте себе: темп комфортный или хочется более спокойный релиз.`,
    `Зафиксируйте самый длинный сухой отрезок в ${name} за тестовую сессию — это полезнее скриншота максимума.`,
  ])
  const whyDemo = pick(seed >>> 7, [
    `Демо ${name} полезно как тренировочная площадка, а не как «способ найти горячий автомат».`,
    `${name} demo без депозита снимает давление: вы смотрите на механику, а не на баланс карты.`,
    `Бесплатный режим ${name} показывает реальный ритм быстрее любого короткого обзора.`,
    `Карточка ${slug} заточена под практику: открыли демо → собрали наблюдения → только потом деньги.`,
    `Уникальность страницы в действиях: вы сами крутите ${name}, а не читаете чужой «топ».`,
    `Цель демо ${name} — понять, подходит ли волатильность вашему лимиту сессии.`,
  ])

  const blocks = [
    `${opener} ${name} демо без регистрации — начните здесь. ${name} от ${provider} (${type}, RTP ${rtp}) удобно изучать на виртуальных кредитах: вы видите ${t.ruFocus}, не рискуя депозитом. ${whyDemo}`,
    `Как играть в ${name} бесплатно на 1weapp: откройте демо на этой странице, выберите виртуальную ставку около ${stakeHint} и сделайте серию из ~${sampleSpins} спинов/раундов (ориентир ${minutes} минут). ${t.ruTip} ${checkpoint}`,
    `Что сравнивать в ${name} демо: частоту мелких выплат, длину «сухих» серий, ощущение бонусного режима и то, подходит ли темп банкроллу. ${kwLine} ${slugInsight(slug, name, seed, 'ru')}`,
    `${providerAngle(provider, seed, 'ru')} Для сравнения рядом — другие релизы ${provider}. Если ${name} покажется резким, переключитесь на соседнюю карточку типа ${type} без регистрации.`,
    `Итог по /${slug}: после демо решите осознанно. Если формат зашёл — можно продолжить ${name} на деньги через кнопку на странице. Только 18+, с лимитом сессии и без догона проигрыша.`,
  ]

  const rot = seed % blocks.length
  return [...blocks.slice(rot), ...blocks.slice(0, rot)].join('\n\n')
}

function buildEn(game, theme, seed) {
  const t = THEME[theme] || THEME.slots
  const name = game.name
  const slug = game.slug
  const rtp = game.rtp || '~96%'
  const type = game.gameType || 'Slots'
  const provider = game.provider || 'Pragmatic Play'
  const opener = pick(seed, OPENERS_EN)
  const kw = (game.keywordsEn || '')
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean)
    .slice(0, 3)

  const kwLine = kw.length
    ? `Common search intents: ${kw.join(', ')}.`
    : `Common intents: ${name} demo, ${name} free, play ${name}.`

  const sampleSpins = 48 + (seed % 11) * 7
  const stakeHint = pick(seed >>> 3, ['0.20–0.50', '0.40–1.00', '0.10–0.40', '0.25–0.75', '0.50–1.20', '0.15–0.60'])
  const minutes = 7 + (seed % 8)
  const checkpoint = pick(seed >>> 5, [
    `Separately note which spin first triggered the bonus mode in ${name}.`,
    `Compare ${name} with neighbouring ${provider} titles on dry-stretch pace.`,
    `Test ${name} on phone and desktop — button comfort and symbol readability matter too.`,
    `Do not change the virtual stake mid-test in ${name}: that keeps variance readable.`,
    `If ${name} offers bonus buy, learn the natural trigger in demo before considering buy.`,
    `Keep a ${minutes}-minute mini-log for ${name}: gut feel plus/minus, no hunt for a “signal”.`,
    `After ~${sampleSpins} spins in ${name}, answer: is the pace comfortable or do you want a calmer title?`,
    `Log the longest dry stretch in ${name} during the test — more useful than a max-win screenshot.`,
  ])
  const whyDemo = pick(seed >>> 7, [
    `The ${name} demo is a practice space — not a way to find a “hot” machine.`,
    `${name} demo with no deposit removes pressure so you can watch mechanics, not card balance.`,
    `Free ${name} mode reveals real game rhythm faster than any short review.`,
    `The ${slug} card is built for practice: open demo → collect notes → only then money.`,
    `What makes this page useful: you spin ${name} yourself instead of reading someone else’s “top list”.`,
    `The ${name} demo goal is to see whether volatility fits your session limit.`,
  ])

  const blocks = [
    `${opener} the ${name} demo with no registration — start on this page. ${name} by ${provider} (${type}, RTP ${rtp}) is easiest to learn with virtual credits: you can study ${t.enFocus} without risking a deposit. ${whyDemo}`,
    `How to play ${name} for free on 1weapp: launch the demo here, pick a virtual stake around ${stakeHint}, and run about ${sampleSpins} spins/rounds (roughly ${minutes} minutes). ${t.enTip} ${checkpoint}`,
    `What to compare in the ${name} demo: small-win frequency, dry-stretch length, bonus-mode feel, and whether the pace fits your bankroll. ${kwLine} ${slugInsight(slug, name, seed, 'en')}`,
    `${providerAngle(provider, seed, 'en')} Nearby you will find other ${provider} releases. If ${name} feels sharp, switch to a neighbouring ${type} card without registration.`,
    `Bottom line for /${slug}: after the demo, decide deliberately. If the format fits, continue ${name} for real money via the button on this page. 18+ only, set a session limit, never chase losses.`,
  ]

  const rot = seed % blocks.length
  return [...blocks.slice(rot), ...blocks.slice(0, rot)].join('\n\n')
}

function buildDescRu(game, theme, seed) {
  const t = THEME[theme] || THEME.slots
  const name = game.name
  const rtp = game.rtp || '~96%'
  const spins = 48 + (seed % 11) * 7
  const variants = [
    `${name} демо бесплатно на 1weapp (/${game.slug}): ${game.provider}, RTP ${rtp}. Разберите ${t.ruFocus} за ~${spins} спинов без регистрации.`,
    `Играть в ${name} бесплатно — демо «${game.slug}». ${game.provider} · RTP ${rtp} · без депозита, 18+.`,
    `${name} демо без регистрации: темп, бонусы и UI на телефоне. Страница /${game.slug}, провайдер ${game.provider}.`,
    `Бесплатное демо ${name} (${game.gameType || 'Slots'}): виртуальный баланс, фокус на ${t.ruFocus}. Карточка /${game.slug}.`,
    `${name} — демо онлайн на 1weapp. ${game.provider}, RTP ${rtp}. Откройте /${game.slug} и протестируйте механику бесплатно.`,
  ]
  return pick(seed >>> 2, variants)
}

function buildDescEn(game, theme, seed) {
  const t = THEME[theme] || THEME.slots
  const name = game.name
  const rtp = game.rtp || '~96%'
  const spins = 48 + (seed % 11) * 7
  const variants = [
    `${name} demo free on 1weapp (/${game.slug}): ${game.provider}, RTP ${rtp}. Study ${t.enFocus} across ~${spins} spins — no signup.`,
    `Play ${name} for free — “${game.slug}” demo. ${game.provider} · RTP ${rtp} · no deposit, 18+.`,
    `${name} demo without registration: pace, bonuses and phone UI. Page /${game.slug}, provider ${game.provider}.`,
    `Free ${name} demo (${game.gameType || 'Slots'}): virtual balance, focus on ${t.enFocus}. Card /${game.slug}.`,
    `${name} — free online demo on 1weapp. ${game.provider}, RTP ${rtp}. Open /${game.slug} and test the mechanics.`,
  ]
  return pick(seed >>> 2, variants)
}

function buildTitles(game) {
  const name = game.name
  return {
    titleSeoRu: `${name} демо — играть бесплатно без регистрации | 1weapp`,
    titleSeoEn: `${name} Demo — Play Free No Signup | 1weapp`,
  }
}

function enrichKeywords(game, lang) {
  const name = game.name
  const provider = game.provider || 'studio'
  const type = game.gameType || 'Slots'
  if (lang === 'ru') {
    const base = [
      `${name} демо`,
      `${name} играть бесплатно`,
      `${name} демо без регистрации`,
      `${name} бесплатно`,
      `${name} слот демо`,
      `${provider} ${name}`,
      `${name} без депозита`,
      `играть в ${name} онлайн`,
      `${type} демо`,
      `1weapp ${name}`,
    ]
    return [...new Set(base)].join(', ')
  }
  const base = [
    `${name} demo`,
    `play ${name} free`,
    `${name} free demo`,
    `${name} demo no registration`,
    `${name} slot demo`,
    `${provider} ${name}`,
    `${name} no deposit`,
    `play ${name} online free`,
    `${type} demo free`,
    `1weapp ${name}`,
  ]
  return [...new Set(base)].join(', ')
}

let rewritten = 0
const updated = games.map((game) => {
  if (KEEP_UNIQUE.has(game.slug)) {
    return {
      ...game,
      keywordsRu: enrichKeywords(game, 'ru'),
      keywordsEn: enrichKeywords(game, 'en'),
    }
  }

  const theme = detectTheme(game)
  const seed = hashSeed(game.slug + '|' + game.name + '|' + (game.provider || ''))
  const titles = buildTitles(game)
  rewritten++
  return {
    ...game,
    seoTextRu: buildRu(game, theme, seed),
    seoTextEn: buildEn(game, theme, seed),
    descriptionSeoRu: buildDescRu(game, theme, seed),
    descriptionSeoEn: buildDescEn(game, theme, seed),
    titleSeoRu: titles.titleSeoRu,
    titleSeoEn: titles.titleSeoEn,
    keywordsRu: enrichKeywords(game, 'ru'),
    keywordsEn: enrichKeywords(game, 'en'),
  }
})

writeFileSync(path, JSON.stringify(updated, null, 2), 'utf8')
console.log(`Rewrote ${rewritten} / ${games.length} games (keywords enriched for all)`)
