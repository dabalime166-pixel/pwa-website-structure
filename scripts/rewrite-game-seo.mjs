/**
 * Unique, SEO-useful titles / descriptions / bodies for catalog cards.
 * Keeps long handmade articles; rewrites templated + path-leaking copy.
 *
 *   node scripts/rewrite-game-seo.mjs
 *   node scripts/sync-games-catalog.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const file = join(root, 'lib/games-data.json')
const games = JSON.parse(readFileSync(file, 'utf8'))

function fnv(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619)
  return h >>> 0
}
function pick(arr, h, salt = 0) {
  return arr[(h + salt) % arr.length]
}

function detectTheme(game) {
  const s = `${game.slug} ${game.name}`.toLowerCase()
  const type = (game.gameType || '').toLowerCase()
  if (/bass|fish|splash|tuna|marlin|boat|catch/.test(s)) return 'fishing'
  if (/olympus|zeus|hades|greek|gods|cleocatra|pyramid|egypt|tut|kingdom|pharaoh|gatot|lamp|rio|anubis|horus|athena|ymir|medusa/.test(s))
    return 'mythology'
  if (/fruit|sweet|sugar|bonanza|candy|chilli|pepper|frozen|charms|monsta|clover|jelly|donut|beer|banana/.test(s))
    return 'candy'
  if (/dog|wolf|buffalo|mustang|rhino|tiger|safari|wild|animal|pixies|gladiator|kraken|gang|machine|walker|archer|cat|panda|piggy|eagle|dragon|chicken|cluck/.test(s))
    return 'animals'
  if (/megaways|stackways|stack.?n.?sync/.test(s) || type.includes('megaway')) return 'megaways'
  if (type.includes('crash') || /crash|always.?up|lucky.?jet|rocket.?queen|tower.?rush/.test(s))
    return 'crash'
  if (type.includes('mine') || /mines|scratch/.test(s)) return 'mines'
  if (/book|vikings|pirate|gold|treasure|spartan|john-hunter|return|mystery|empty-the-bank|wanted|outlaw|ronin|shaolin|warrior/.test(s))
    return 'adventure'
  if (/starlight|princess|starz|vegas|joker|jewels|nights|christmas|xmas|destiny|badge|blitz|luxe|miami|rainbow/.test(s))
    return 'glamour'
  if (/chaos|crew|dork|bombs|bullets|duel|rip-city|hacksaw|bandit|le-zeus|le-king|le-pharaoh|le-bunny|le-bandit|wanted-dead|six-six-six/.test(s))
    return 'chaos'
  if (/dice|roulette|blackjack|poker|twenty-one/.test(s)) return 'table'
  return 'slots'
}

const THEME = {
  fishing: {
    en: 'catches, the angler feature and stacked multipliers',
    ru: 'улов, фичу рыбака и суммирование множителей',
  },
  mythology: {
    en: 'god orbs, cascades and multiplier climbs',
    ru: 'орбы богов, каскады и рост множителей',
  },
  candy: {
    en: 'clusters, tumbles and coloured multipliers',
    ru: 'кластеры, tumble и цветные множители',
  },
  animals: {
    en: 'wilds, free spins and sticky multipliers',
    ru: 'вайлды, фриспины и липкие множители',
  },
  megaways: {
    en: 'variable ways, cascades and climbing multipliers',
    ru: 'переменные ways, каскады и растущий множитель',
  },
  crash: {
    en: 'multiplier climb and cashout timing',
    ru: 'рост множителя и момент кэшаута',
  },
  mines: {
    en: 'mine count, tile opens and cashout',
    ru: 'число мин, открытие клеток и кэшаут',
  },
  adventure: {
    en: 'books, scatters and bonus-trigger pace',
    ru: 'книги, скаттеры и темп до бонуса',
  },
  glamour: {
    en: 'multipliers, bonus modes and UI clarity',
    ru: 'множители, бонусные режимы и читаемость UI',
  },
  chaos: {
    en: 'sharp pace, x-features and enhanced modes',
    ru: 'резкий темп, x-фичи и усиленные режимы',
  },
  table: {
    en: 'round pace, payout rules and table UI',
    ru: 'темп раундов, правила выплат и UI стола',
  },
  slots: {
    en: 'line hits, free-spin frequency and dry stretches',
    ru: 'попадания по линиям, частоту фриспинов и сухие серии',
  },
}

const TYPE_EN = { crash: 'Crash', mines: 'Mines', megaways: 'Megaways', slots: 'Slot' }
const TYPE_RU = { crash: 'краш', mines: 'mines', megaways: 'Megaways', slots: 'слот' }

function typeKey(theme, gameType) {
  const t = (gameType || '').toLowerCase()
  if (theme === 'crash' || t.includes('crash')) return 'crash'
  if (theme === 'mines' || t.includes('mine')) return 'mines'
  if (theme === 'megaways' || t.includes('megaway')) return 'megaways'
  return 'slots'
}

function fitTitle(core) {
  const brand = ' | 1weapp'
  const clean = core
    .replace(/\s*\|\s*1weapp\s*$/i, '')
    .replace(/\s+on 1weapp$/i, '')
    .replace(/\s+на 1weapp$/i, '')
    .trim()
  if (clean.length + brand.length <= 60) return `${clean}${brand}`
  const budget = 60 - brand.length
  let cut = clean.slice(0, budget)
  const breakAt = Math.max(cut.lastIndexOf(' — '), cut.lastIndexOf(' – '), cut.lastIndexOf(' - '), cut.lastIndexOf(': '))
  if (breakAt > 18) cut = cut.slice(0, breakAt)
  else {
    const space = cut.lastIndexOf(' ')
    if (space > 20) cut = cut.slice(0, space)
  }
  return `${cut.replace(/[\s—\-–:|,]+$/u, '').trim()}${brand}`
}

const STOP_TAIL = /(?:\s+(?:is|the|a|an|to|for|and|of|or|no|in|on|at|и|на|в|с|по|для|без|от|до))+$/iu

function fitDesc(parts, closers, h) {
  let t = parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim()
  let i = 0
  while (t.length < 120 && i < closers.length) {
    const next = `${t} ${pick(closers, h, 11 + i)}`.replace(/\s+/g, ' ').trim()
    if (next.length > 155 && t.length >= 110) break
    t = next
    i++
  }
  if (t.length <= 155 && t.length >= 120) return t
  if (t.length < 120) {
    const bump = t.match(/[а-яё]/i) ? ' Без регистрации.' : ' No signup.'
    t = `${t}${bump}`.replace(/\s+/g, ' ').trim()
  }
  if (t.length <= 155) return t
  let cut = t.slice(0, 155)
  const space = cut.lastIndexOf(' ')
  if (space > 100) cut = cut.slice(0, space)
  return cut.replace(/[\s.,;:!?…]+$/u, '').replace(STOP_TAIL, '').trim()
}

function titles(name, theme, type, h) {
  const te = TYPE_EN[type]
  const tr = TYPE_RU[type]
  const en = [
    `${name} Demo — Play Free No Signup`,
    `${name} — Free ${te} Demo Online`,
    `Play ${name} Demo Free in Browser`,
    `${name} Demo — No Registration`,
    `${name} Free Demo — ${te}`,
    `${name} — Test the Demo Before Real Play`,
  ]
  const ru = [
    `${name} демо — играть бесплатно`,
    `${name} — бесплатное демо ${tr}`,
    `Играть в ${name} демо онлайн`,
    `${name} демо без регистрации`,
    `${name} — демо ${tr}`,
    `${name} демо — проверить до кассы`,
  ]
  return { en: fitTitle(pick(en, h, 2)), ru: fitTitle(pick(ru, h, 3)) }
}

function descriptions(game, theme, type, h) {
  const { name, provider, rtp } = game
  const rtpBit = rtp ? `RTP ${rtp}` : 'RTP listed in-game'
  const focusEn = THEME[theme].en
  const focusRu = THEME[theme].ru
  const te = TYPE_EN[type]
  const tr = TYPE_RU[type]

  const enA = [
    `${name} demo free on 1weapp — ${provider} ${te}, ${rtpBit}.`,
    `Play ${name} demo in the browser: ${provider}, ${rtpBit}.`,
    `Free ${name} demo (${te}) by ${provider}. ${rtpBit}.`,
    `${name} — no-signup demo from ${provider}. ${rtpBit}.`,
  ]
  const enB = [
    `Study ${focusEn} on a virtual balance.`,
    `Judge ${focusEn} before any deposit.`,
    `Check ${focusEn} with no registration.`,
    `Test ${focusEn} in a short demo session.`,
  ]
  const ruA = [
    `${name} демо бесплатно на 1weapp — ${provider}, ${tr}, ${rtpBit}.`,
    `Играйте в ${name} демо в браузере: ${provider}, ${rtpBit}.`,
    `Бесплатное демо ${name} (${tr}) от ${provider}. ${rtpBit}.`,
    `${name} — демо без регистрации, ${provider}. ${rtpBit}.`,
  ]
  const ruB = [
    `Разберите ${focusRu} на виртуальном балансе.`,
    `Оцените ${focusRu} до депозита.`,
    `Проверьте ${focusRu} без регистрации.`,
    `Протестируйте ${focusRu} за короткую сессию.`,
  ]
  const enClose = [
    'Virtual credits only.',
    'Same published rules as the real client.',
    'Works on phone and desktop.',
    'No download required.',
  ]
  const ruClose = [
    'Только виртуальные кредиты.',
    'Те же заявленные правила, что в клиенте.',
    'На телефоне и ПК.',
    'Без установки.',
  ]
  return {
    en: fitDesc([pick(enA, h, 4), pick(enB, h, 5)], enClose, h),
    ru: fitDesc([pick(ruA, h, 6), pick(ruB, h, 7)], ruClose, h + 9),
  }
}

function keywords(game, type) {
  const { name, provider } = game
  const te = TYPE_EN[type]
  const tr = TYPE_RU[type]
  return {
    en: `${name} demo, play ${name} free, ${name} ${te}, ${provider} ${name}, ${name} no registration`,
    ru: `${name} демо, играть ${name} бесплатно, ${name} ${tr}, ${provider} ${name}, ${name} без регистрации`,
  }
}

function providerNote(provider, name, h, lang) {
  const p = provider || 'the studio'
  const poolsEn = {
    "Play'n GO": [
      `Play'n GO builds ${name} around readable bonus flags — use the demo to count how often the feature actually interrupts the base game, not how it looks on a trailer.`,
      `With Play'n GO, neighbouring titles share a UI language. ${name} is still its own math: log dry stretches here instead of borrowing a feel from the next card.`,
      `${name} sits in a large Play'n GO catalog. A 1weapp demo session is the honest way to see whether this release is calmer or sharper than the studio average.`,
    ],
    NetEnt: [
      `NetEnt polish is obvious on ${name}; the useful test is still pace. Run a fixed-stake demo and decide if the classic-vs-modern rhythm fits you.`,
      `${name} inherits NetEnt UI clarity. Use FUN mode to check whether features stay readable on a phone before you ever open a cashier.`,
      `Comparing ${name} with other NetEnt cards only works if this session has a written stake and a spin count — otherwise you remember the trailer, not the math.`,
    ],
    'Hacksaw Gaming': [
      `Hacksaw often ships sharp x-features. ${name} exists in demo so you can judge whether that chaos is fun or exhausting on your screen.`,
      `On ${name}, watch how often the base game breaks into an enhanced mode. That frequency is the real Hacksaw tell — not a max-win screenshot.`,
      `${name} will feel louder than a classic line slot. Give the demo 80–100 virtual spins before you decide the variance is “your style”.`,
    ],
    'Pragmatic Play': [
      `Pragmatic demos are built for longer virtual-balance sessions. On ${name}, dry stretches become obvious only after you stop chasing the highlight reel.`,
      `${name} uses the familiar Pragmatic control set. Spend the demo on feature timing and mobile layout, not on hunting a lucky screenshot.`,
      `Official ${name} demo rules match the published RTP band. Confirm the in-game info panel, then keep the virtual stake fixed for the whole test.`,
    ],
    'Red Tiger': [
      `Red Tiger titles often stack modifiers. ${name} demo time is best spent noting which modifier actually changes a spin vs which is just chrome.`,
      `For ${name}, treat Red Tiger’s bonus trailers as advertising. Your notes from a no-deposit session are the ranking that matters.`,
      `${name} rewards a patient demo: count feature teases, then see how many convert. That ratio is more useful than a max-win figure.`,
    ],
    'Nolimit City': [
      `Nolimit City math on ${name} is usually high-vol. Demo first so a cold stretch does not surprise you after a deposit.`,
      `${name} can look cinematic and still play brutally. Use virtual credits to learn the tempo of xNudge-style swings.`,
      `If ${name} feels too sharp after one demo block, that is a valid result — Nolimit catalogs are not meant to fit every bankroll.`,
    ],
    BGaming: [
      `BGaming HTML5 on ${name} is typically light in the browser. Use that to test 50–80 spins on mobile data without a download.`,
      `${name} from BGaming is easy to launch; the work is still logging bonus feel and empty-spin length on a virtual balance.`,
      `Keep ${name} at one virtual stake. BGaming UIs make it tempting to click around — a fixed plan beats random tapping.`,
    ],
    'Big Time Gaming': [
      `Big Time Gaming popularised changing reel heights. On ${name}, compare “narrow” vs “wide” spins instead of judging one max-ways screenshot.`,
      `${name} demo value is the cascade multiplier climb — watch it live, then decide if Megaways-style swing fits your session length.`,
      `Use ${name} to feel the engine, not to hunt a jackpot clip. Virtual credits make that honest.`,
    ],
    '1weapp Games': [
      `${name} is a 1weapp Games original. The demo on this page is the place to learn the loop with virtual credits before any real-money decision.`,
      `Treat ${name} as entertainment math: run a short, logged demo, then stop. Originals still need limits.`,
    ],
    'InOut Games': [
      `${name} is an InOut Games hybrid. Demo (when available) or a careful rules read both beat jumping in blind — confirm live RTP in the client.`,
    ],
  }
  const poolsRu = {
    "Play'n GO": [
      `Play'n GO собирает ${name} вокруг читаемых бонусных флагов — в демо считайте, как часто фича реально вмешивается в базу, а не как она выглядит в трейлере.`,
      `У Play'n GO соседние тайтлы говорят на одном UI. ${name} всё равно со своей математикой: записывайте сухие серии здесь, не переносите ощущение с соседней карточки.`,
      `${name} стоит в большом каталоге Play'n GO. Демо на 1weapp честно показывает, спокойнее этот релиз среднего по студии или резче.`,
    ],
    NetEnt: [
      `Полировка NetEnt на ${name} заметна сразу; полезный тест — темп. Фиксируйте ставку в демо и решите, ваш ли это ритм.`,
      `${name} наследует ясный UI NetEnt. В FUN-режиме проверьте, читаются ли фичи на телефоне до кассы.`,
      `Сравнивать ${name} с другими NetEnt имеет смысл только с записанной ставкой и числом спинов — иначе в памяти останется трейлер, не математика.`,
    ],
    'Hacksaw Gaming': [
      `Hacksaw часто делает резкие x-фичи. Демо ${name} нужно, чтобы понять: этот хаос вам в кайф или утомляет на вашем экране.`,
      `В ${name} смотрите, как часто база ломается в усиленный режим. Эта частота — главный маркер Hacksaw, не скриншот max win.`,
      `${name} будет громче классического слота с линиями. Дайте демо 80–100 виртуальных спинов, прежде чем решать, «ваш» ли размах.`,
    ],
    'Pragmatic Play': [
      `Демо Pragmatic удобны для длинных сессий на виртуальном балансе. В ${name} сухие серии видны, только когда вы перестаёте гоняться за хайлайтом.`,
      `${name} использует знакомый набор кнопок Pragmatic. Тратьте демо на тайминг фич и мобильную вёрстку, не на «удачный» скрин.`,
      `Правила демо ${name} совпадают с заявленной полосой RTP. Сверьте инфо-панель и не меняйте виртуальную ставку до конца теста.`,
    ],
    'Red Tiger': [
      `У Red Tiger часто стопка модификаторов. В демо ${name} отмечайте, какой модификатор реально меняет спин, а какой — только хром.`,
      `Для ${name} трейлеры Red Tiger — реклама. Ваши заметки с сессии без депозита важнее.`,
      `${name} любит терпеливое демо: считайте тизеры фичи и сколько из них конвертируются. Это полезнее цифры max win.`,
    ],
    'Nolimit City': [
      `Математика Nolimit City в ${name} обычно высоковолатильная. Сначала демо, чтобы холодная серия не удивила после депозита.`,
      `${name} может выглядеть кинематографично и играться жёстко. На виртуальных кредитах учите темп качаний.`,
      `Если ${name} кажется слишком резким после одного блока демо — это нормальный вывод. Каталог Nolimit не обязан подходить каждому банкроллу.`,
    ],
    BGaming: [
      `HTML5 BGaming в ${name} обычно лёгкий в браузере. Удобно прогнать 50–80 спинов на мобильном интернете без установки.`,
      `${name} от BGaming легко запускается; работа — записать ощущение бонуса и длину пустых спинов на виртуальном балансе.`,
      `Держите ${name} на одной виртуальной ставке. В UI BGaming легко тыкать всё подряд — план лучше хаотичных тапов.`,
    ],
    'Big Time Gaming': [
      `Big Time Gaming прославился переменной высотой барабанов. В ${name} сравнивайте «узкие» и «широкие» спины, а не один скрин max ways.`,
      `Ценность демо ${name} — рост каскадного множителя вживую. Потом решите, подходит ли размах Megaways длине вашей сессии.`,
      `В ${name} изучайте движок, а не охотьтесь за клипом джекпота. Виртуальные кредиты делают тест честным.`,
    ],
    '1weapp Games': [
      `${name} — оригинал 1weapp Games. Демо на этой странице — место выучить петлю на виртуальных кредитах до любого решения про деньги.`,
      `Считайте ${name} развлечением: короткий лог в демо, затем стоп. Оригиналам тоже нужны лимиты.`,
    ],
    'InOut Games': [
      `${name} — гибрид InOut Games. Демо (если есть) или внимательное чтение правил лучше, чем заход вслепую. Живой RTP сверяйте в клиенте.`,
    ],
  }
  const fallbackEn = [
    `${p} publishes ${name} with a browser demo so you can learn the loop on virtual credits. That is the point of this card.`,
    `Studio: ${p}. Title: ${name}. Your job in demo is to log pace, not to hunt a highlight.`,
  ]
  const fallbackRu = [
    `${p} даёт ${name} с браузерным демо, чтобы петлю можно было выучить на виртуальных кредитах. В этом смысл карточки.`,
    `Студия: ${p}. Тайтл: ${name}. В демо ваша задача — записать темп, а не поймать хайлайт.`,
  ]
  if (lang === 'en') return pick(poolsEn[p] || fallbackEn, h, 21)
  return pick(poolsRu[p] || fallbackRu, h, 22)
}

function howto(name, theme, spins, stake, minutes, h, lang) {
  const en = {
    crash: [
      `How to play ${name} for free: launch the demo here, set a virtual stake around ${stake}, and run about ${spins} rounds (roughly ${minutes} minutes). Lock an auto-cashout target for 20–30 rounds, then compare with a handful of manual exits. Do not move the stake mid-test.`,
      `Open the ${name} demo on this page. Pick one virtual stake (${stake}) and a cashout idea before the first round. Log ${spins} rounds — about ${minutes} minutes — and mark every exit you regret. That log is the strategy, not a “hot” multiplier.`,
    ],
    mines: [
      `How to play ${name} demo: start with 3 mines, a ${stake} virtual stake, and a 1.5x–2.5x cashout goal. Play about ${spins} rounds (~${minutes} min). After two failures in a row, do not raise risk — reset to the plan.`,
      `On ${name}, choose mine count before the first tile. Keep stake ${stake}, run ${spins} rounds, and compare a cautious vs aggressive target. Demo exists so you train discipline, not “lucky cells”.`,
    ],
    megaways: [
      `How to play ${name} free: launch the demo, set stake ${stake}, and take ~${spins} spins (${minutes} min). Note a “narrow” ways spin and a “wide” one in the same session. Judge the cascade multiplier climb, not a single max-ways frame.`,
      `In the ${name} demo, freeze the virtual stake at ${stake} and complete ${spins} spins. Write down the longest cascade and the emptiest stretch. Megaways only makes sense as a distribution, not as one clip.`,
    ],
    default: [
      `How to play ${name} for free on 1weapp: open the demo on this page, pick a virtual stake around ${stake}, and run about ${spins} spins (roughly ${minutes} minutes). Keep the stake fixed. Note which spin first showed a bonus tease.`,
      `Launch ${name} here with no signup. Stake ${stake}, sample size ${spins} spins (~${minutes} min). Your notes should cover small-win frequency, the longest dry stretch, and whether the bonus mode feels readable on a phone.`,
      `A practical ${name} session: virtual credits, stake ${stake}, ${spins} spins. Pause once if the UI feels crowded. Demo quality is “can I understand this tired on a small screen”, not “did I see the max win”.`,
    ],
  }
  const ru = {
    crash: [
      `Как играть в ${name} бесплатно: откройте демо здесь, поставьте виртуальную ставку около ${stake} и сделайте ~${spins} раундов (ориентир ${minutes} мин). Зафиксируйте автокэшаут на 20–30 раундов и сравните с ручным выходом. Ставку в середине теста не меняйте.`,
      `Откройте демо ${name} на этой странице. До первого раунда выберите ставку (${stake}) и идею кэшаута. Запишите ${spins} раундов — около ${minutes} мин — и отметьте каждый выход, о котором жалеете. Это и есть стратегия, а не «горячий» множитель.`,
    ],
    mines: [
      `Как играть в демо ${name}: начните с 3 мин, ставки ${stake} и цели 1.5x–2.5x. Около ${spins} раундов (~${minutes} мин). После двух неудач подряд риск не повышайте — вернитесь к плану.`,
      `В ${name} число мин выбирайте до первой клетки. Ставка ${stake}, ${spins} раундов, сравните осторожную и агрессивную цель. Демо учит дисциплине, а не «везучим клеткам».`,
    ],
    megaways: [
      `Как играть в ${name} бесплатно: запустите демо, ставка ${stake}, ~${spins} спинов (${minutes} мин). В одной сессии отметьте «узкий» и «широкий» спин по ways. Смотрите рост каскадного множителя, а не один кадр max ways.`,
      `В демо ${name} заморозьте ставку ${stake} и закройте ${spins} спинов. Запишите самый длинный каскад и самую пустую серию. Megaways имеет смысл как распределение, не как один клип.`,
    ],
    default: [
      `Как играть в ${name} бесплатно на 1weapp: откройте демо на этой странице, выберите виртуальную ставку около ${stake} и сделайте ~${spins} спинов (ориентир ${minutes} мин). Ставку не меняйте. Отметьте, на каком спине впервые мелькнул тизер бонуса.`,
      `Запустите ${name} здесь без регистрации. Ставка ${stake}, выборка ${spins} спинов (~${minutes} мин). В заметках: частота мелких выплат, самая длинная сухая серия и читается ли бонус на телефоне.`,
      `Практичная сессия ${name}: виртуальные кредиты, ставка ${stake}, ${spins} спинов. Один раз остановитесь, если UI кажется тесным. Качество демо — «понятно ли это усталым на узком экране», а не «увидел ли max win».`,
    ],
  }
  const key = theme === 'crash' || theme === 'mines' || theme === 'megaways' ? theme : 'default'
  if (lang === 'en') return pick(en[key], h, 31)
  return pick(ru[key], h, 32)
}

function watchBlock(name, theme, h, lang) {
  const en = {
    fishing: `In ${name}, ignore highlight-reel catches. Count how often the angler actually appears in your sample, how multipliers stack, and how long empty water lasts between features.`,
    mythology: `On ${name}, track god/orb interventions vs quiet tumbles. Cascades that look cinematic can still pay small — write the total multiplier, not the animation.`,
    candy: `For ${name}, measure average tumble length and how often coloured bombs/multipliers save a dead spin. Candy art is easy; session pace is the ranking.`,
    animals: `Watch ${name} wild stickiness in the bonus and the wait to first free spins. Animal themes hide variance behind cute symbols — your dry-stretch log will not.`,
    megaways: `${name} changes ways every spin. Your notes should include at least one poor ways result so the average is honest.`,
    crash: `${name} is a cashout skill test. A demo without a written exit plan is just watching a graph.`,
    mines: `${name} is readable risk: mine count is known before each open. If you raise mines after a loss, the demo already failed its job.`,
    adventure: `On ${name}, count spins to the first scatter cluster. Book-style bonuses feel rare until you sample them — that wait is the product.`,
    glamour: `${name} can mask dry spins with sparkle. Track multiplier hit-rate and whether buttons stay easy on a thumb.`,
    chaos: `${name} will spike. Decide after a full demo block whether that spike-and-silence loop is entertainment or stress.`,
    table: `${name} is about round tempo and rule clarity. If payouts are confusing in demo, they will not get clearer with a deposit.`,
    slots: `On ${name}, log line/ways hits, free-spin frequency and the longest empty run. That trio beats any “hot slot” story.`,
  }
  const ru = {
    fishing: `В ${name} не смотрите на хайлайт-улов. Считайте, как часто реально приходит рыбак, как складываются множители и сколько длится «пустая вода» между фичами.`,
    mythology: `В ${name} отдельно считайте вмешательства бога/орба и тихие каскады. Красивая цепочка может платить мало — пишите итоговый множитель, не анимацию.`,
    candy: `В ${name} меряйте среднюю длину tumble и как часто цветные бомбы/множители спасают пустой спин. Картинка сладкая; ранжирует темп сессии.`,
    animals: `Смотрите липкость вайлдов ${name} в бонусе и ожидание до первых фриспинов. Милые символы прячут дисперсию — лог сухих серий нет.`,
    megaways: `${name} меняет ways каждый спин. В заметках должен быть хотя бы один «бедный» ways, иначе среднее вранье.`,
    crash: `${name} — тест навыка кэшаута. Демо без записанного плана выхода — просто просмотр графика.`,
    mines: `В ${name} риск читаем: число мин известно до открытия. Если после проигрыша вы поднимаете мины, демо уже не сработало.`,
    adventure: `В ${name} считайте спины до первого пакета скаттеров. Book-бонусы кажутся редкими, пока не снимете выборку — это ожидание и есть продукт.`,
    glamour: `${name} маскирует сухие спины блеском. Считайте hit-rate множителей и удобство кнопок большим пальцем.`,
    chaos: `${name} будет дёргаться. После полного блока демо решите: этот цикл всплеск–тишина — развлечение или стресс.`,
    table: `${name} про темп раундов и ясность правил. Если выплаты непонятны в демо, с депозитом яснее не станет.`,
    slots: `В ${name} пишите попадания по линиям/ways, частоту фриспинов и самый длинный простой. Эта тройка сильнее любой истории про «горячий слот».`,
  }
  const extraEn = [
    `Common searches around ${name} are “demo”, “no registration” and “RTP”. This page answers them with a test plan, not a slogan.`,
    `If you bounced between similar studio cards, restart the ${name} sample — mixed memory is how duplicate reviews get written.`,
    `${name} should be judged on one device you actually use. A desktop trailer is not a phone session.`,
  ]
  const extraRu = [
    `Частые запросы вокруг ${name} — «демо», «без регистрации» и «RTP». Эта страница отвечает планом теста, а не слоганом.`,
    `Если вы прыгали по похожим карточкам студии, выборку ${name} начните заново — смешанная память порождает одинаковые обзоры.`,
    `${name} оценивайте на том устройстве, которым пользуетесь. Трейлер с десктопа — это не сессия с телефона.`,
  ]
  const a = lang === 'en' ? en[theme] : ru[theme]
  const b = lang === 'en' ? pick(extraEn, h, 41) : pick(extraRu, h, 42)
  return `${a} ${b}`
}

function facts(game, type, lang) {
  const rtp = game.rtp || '~96%'
  const kind = game.gameType || (type === 'crash' ? 'Crash Games' : type === 'mines' ? 'Mines' : 'Slots')
  if (lang === 'en') {
    return `${game.name} is listed as ${kind} from ${game.provider} with RTP ${rtp}. Demo credits are virtual and do not convert to cash. Always re-check the live RTP tier inside a real client — studios and operators can ship more than one band.`
  }
  return `${game.name} указан как ${kind}, провайдер ${game.provider}, RTP ${rtp}. Кредиты демо виртуальные и не конвертируются в деньги. Живой тир RTP всегда сверяйте в реальном клиенте — студия и оператор могут отдавать разные полосы.`
}

function afterword(name, h, lang) {
  const en = [
    `After the ${name} demo, decide on purpose. If the pace fits, continue via the button on this page to a licensed operator. 18+ only — set a deposit and session limit, never chase a loss. 1weapp stays a demo catalog.`,
    `Finished testing ${name}? Stop while the notes are honest. Continuing to real play is optional entertainment, not a way to “recover” a virtual downswing. 18+, limits first.`,
    `The useful outcome of ${name} is a yes/no on tempo. If yes, continue 18+ with limits. If no, open a neighbouring demo — switching titles is cheaper than forcing a deposit.`,
  ]
  const ru = [
    `После демо ${name} решите осознанно. Если темп зашёл — продолжите кнопкой на странице к лицензированному оператору. Только 18+, лимит депозита и сессии, без догона. 1weapp остаётся каталогом демо.`,
    `Закончили тест ${name}? Остановитесь, пока заметки честные. Продолжение на деньги — развлечение по желанию, не способ отыграть виртуальный минус. 18+, сначала лимиты.`,
    `Полезный итог ${name} — да/нет по темпу. Если да — продолжайте 18+ с лимитами. Если нет — откройте соседнее демо: смена тайтла дешевле настойчивого депозита.`,
  ]
  return pick(lang === 'en' ? en : ru, h, 51)
}

function checklist(name, theme, lang, h) {
  const en = {
    fishing: [`Note the first angler spin in ${name}`, 'Compare small catch vs rare multiplier', 'Keep virtual stake fixed'],
    mythology: [`Count god/orb saves on ${name}`, 'Log longest cascade', 'Compare base vs feature pace'],
    candy: [`Measure tumble length on ${name}`, 'Log bomb/multiplier hits', 'Check symbols on a narrow screen'],
    animals: [`Check wild stickiness in ${name}`, 'Log first bonus spin', 'Compare base vs free-spin tempo'],
    megaways: [`Mark narrow vs wide ways on ${name}`, 'Watch cascade multiplier climb', 'Ignore a single max-ways screenshot'],
    crash: [`Lock auto-cashout for ${name} sample`, 'Compare manual vs auto exits', 'Write a 20–30 round log'],
    mines: [`Start ${name} on 3 mines`, 'Do not raise risk after two fails', 'Compare 1.5x vs aggressive targets'],
    adventure: [`Count spins to scatters on ${name}`, 'Learn natural trigger before any buy', 'Compare with a neighbouring book title'],
    glamour: [`Track multiplier frequency on ${name}`, 'Test buttons on mobile', 'Separate art from dry stretches'],
    chaos: [`Note enhanced-mode frequency on ${name}`, 'Judge variance over 80+ spins', 'Check UI crowding on phone'],
    table: [`Run 30–50 ${name} rounds at one stake`, 'Confirm payout rules', 'Judge table UI on a phone'],
    slots: [`Run 80–120 ${name} spins at one stake`, 'Log the longest dry stretch', 'Compare with 1–2 neighbour titles'],
  }
  const ru = {
    fishing: [`Запишите первый спин рыбака в ${name}`, 'Сравните мелкий улов и редкий множитель', 'Не меняйте виртуальную ставку'],
    mythology: [`Посчитайте спасения бога/орба в ${name}`, 'Запишите самый длинный каскад', 'Сравните базу и фичу'],
    candy: [`Замерьте длину tumble в ${name}`, 'Отметьте бомбы/множители', 'Проверьте символы на узком экране'],
    animals: [`Проверьте липкость вайлдов ${name}`, 'Запишите спин первого бонуса', 'Сравните базу и фриспины'],
    megaways: [`Отметьте узкий и широкий ways в ${name}`, 'Смотрите рост каскадного множителя', 'Не судите по одному max-ways'],
    crash: [`Зафиксируйте автокэшаут для выборки ${name}`, 'Сравните ручной и авто выход', 'Ведите лог 20–30 раундов'],
    mines: [`Начните ${name} с 3 мин`, 'Не повышайте риск после двух неудач', 'Сравните 1.5x и агрессивную цель'],
    adventure: [`Посчитайте спины до скаттеров в ${name}`, 'Сначала обычный триггер, потом buy', 'Сравните с соседним book-слотом'],
    glamour: [`Считайте частоту множителя в ${name}`, 'Проверьте кнопки на мобильном', 'Отделите картинку от сухих серий'],
    chaos: [`Отметьте частоту усиленного режима в ${name}`, 'Оцените дисперсию на 80+ спинах', 'Проверьте тесноту UI на телефоне'],
    table: [`30–50 раундов ${name} на одной ставке`, 'Проверьте понятность выплат', 'Оцените UI стола на телефоне'],
    slots: [`80–120 спинов ${name} на одной ставке`, 'Запишите самую длинную сухую серию', 'Сравните с 1–2 соседними тайтлами'],
  }
  const list = lang === 'en' ? en[theme] : ru[theme]
  const rotated = [pick(list, h, 61), pick(list, h, 62), pick(list, h, 63)]
  const uniq = [...new Set(rotated)]
  while (uniq.length < 3) uniq.push(list[uniq.length % list.length])
  return uniq
}

function bodyFor(game, theme, type, h) {
  const spins = 64 + (h % 57)
  const minutes = 9 + (h % 8)
  const stake = pick(['0.20–0.60', '0.25–0.75', '0.40–1.00', '0.50–1.20', '0.10–0.40'], h, 8)
  const name = game.name
  const focusEn = THEME[theme].en
  const focusRu = THEME[theme].ru

  const headsEn = [
    [`## How to play ${name} demo`, howto(name, theme, spins, stake, minutes, h, 'en')],
    [`## What to watch`, watchBlock(name, theme, h, 'en')],
    [`## RTP, type and provider`, `${facts(game, type, 'en')}\n\n${providerNote(game.provider, name, h, 'en')}`],
  ]
  const order = [0, 1, 2]
  if (h % 2 === 1) order.reverse()
  const checks = checklist(name, theme, 'en', h)
  const en = [
    pick(
      [
        `A working plan for the ${name} demo — no registration, virtual credits, focus on ${focusEn}.`,
        `${name} demo on 1weapp is a test bench: same published rules, no signup, and a sample you can actually finish.`,
        `Use this ${name} card to judge pace in the browser. Skip slogans; keep a short log.`,
      ],
      h,
      1
    ),
    '',
    ...order.flatMap((i) => [headsEn[i][0], '', headsEn[i][1], '']),
    `## Demo checklist`,
    '',
    ...checks.map((c) => `- ${c}`),
    '',
    `## After the demo`,
    '',
    afterword(name, h, 'en'),
  ].join('\n')

  const headsRu = [
    [`## Как играть в ${name} демо`, howto(name, theme, spins, stake, minutes, h, 'ru')],
    [`## На что смотреть`, watchBlock(name, theme, h, 'ru')],
    [`## RTP, тип и провайдер`, `${facts(game, type, 'ru')}\n\n${providerNote(game.provider, name, h, 'ru')}`],
  ]
  const checksRu = checklist(name, theme, 'ru', h)
  const ru = [
    pick(
      [
        `Рабочий план демо ${name} — без регистрации, виртуальные кредиты, фокус: ${focusRu}.`,
        `Демо ${name} на 1weapp — стенд для теста: те же заявленные правила, без регистрации, выборка, которую реально закончить.`,
        `Карточка ${name} нужна, чтобы оценить темп в браузере. Без слоганов, с коротким логом.`,
      ],
      h,
      1
    ),
    '',
    ...order.flatMap((i) => [headsRu[i][0], '', headsRu[i][1], '']),
    `## Чеклист демо`,
    '',
    ...checksRu.map((c) => `- ${c}`),
    '',
    `## После демо`,
    '',
    afterword(name, h, 'ru'),
  ].join('\n')

  return { en, ru }
}

function openingKey(text) {
  return String(text || '')
    .split('\n')[0]
    .slice(0, 90)
}

function hasSlugPath(game) {
  const re = new RegExp(`/${game.slug}\\b`)
  return re.test(game.seoTextEn || '') || re.test(game.seoTextRu || '') || re.test(game.descriptionSeoEn || '') || re.test(game.descriptionSeoRu || '')
}

function shouldKeepBody(game, enCounts) {
  const en = game.seoTextEn || ''
  if (en.length < 600) return false
  if (hasSlugPath(game)) return false
  if ((enCounts[openingKey(en)] || 0) > 1) return false
  return true
}

const enCounts = {}
for (const g of games) {
  const k = openingKey(g.seoTextEn)
  enCounts[k] = (enCounts[k] || 0) + 1
}

let kept = 0
let rewritten = 0
const usedDescEn = new Set()
const usedOpenEn = new Set()

for (const game of games) {
  const h = fnv(game.slug)
  const theme = detectTheme(game)
  const type = typeKey(theme, game.gameType)
  const t = titles(game.name, theme, type, h)
  let d = descriptions(game, theme, type, h)
  let salt = 0
  while (usedDescEn.has(d.en) && salt < 20) {
    salt++
    d = descriptions(game, theme, type, h + salt * 17)
  }
  usedDescEn.add(d.en)
  const kw = keywords(game, type)
  game.titleSeoEn = t.en
  game.titleSeoRu = t.ru
  game.descriptionSeoEn = d.en
  game.descriptionSeoRu = d.ru
  game.keywordsEn = kw.en
  game.keywordsRu = kw.ru

  if (shouldKeepBody(game, enCounts)) {
    kept++
    continue
  }

  let bodies = bodyFor(game, theme, type, h)
  let extra = 0
  while (usedOpenEn.has(openingKey(bodies.en)) && extra < 12) {
    extra++
    bodies = bodyFor(game, theme, type, h + extra * 31)
  }
  usedOpenEn.add(openingKey(bodies.en))
  game.seoTextEn = bodies.en
  game.seoTextRu = bodies.ru
  rewritten++
}

writeFileSync(file, `${JSON.stringify(games, null, 2)}\n`)

const pathHits = games.filter((g) => hasSlugPath(g)).length
const descLens = games.map((g) => (g.descriptionSeoEn || '').length)
const shortD = descLens.filter((n) => n < 120).length
const longD = descLens.filter((n) => n > 155).length
const openMap = {}
for (const g of games) {
  const k = openingKey(g.seoTextEn)
  openMap[k] = (openMap[k] || 0) + 1
}
const dupOpens = Object.values(openMap).filter((n) => n > 1).length
const uniqueOpens = Object.values(openMap).filter((n) => n === 1).length

console.log(
  JSON.stringify(
    {
      games: games.length,
      rewritten,
      keptHandmade: kept,
      slugPathLeaks: pathHits,
      descUnder120: shortD,
      descOver155: longD,
      uniqueEnOpenings: uniqueOpens,
      duplicatedEnOpenings: dupOpens,
      luckyJet: {
        title: games[0].titleSeoEn,
        desc: games[0].descriptionSeoEn,
        descLen: games[0].descriptionSeoEn.length,
        open: openingKey(games[0].seoTextEn),
      },
    },
    null,
    2
  )
)
