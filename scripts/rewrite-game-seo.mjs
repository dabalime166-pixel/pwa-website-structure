/**
 * Rewrite game SEO texts into unique, useful bilingual copy.
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
  if (/bass|fish|splash/.test(s)) return 'fishing'
  if (/olympus|zeus|hades|greek|gods|cleocatra|pyramid|egypt|tut|kingdom|pharaoh|gatot|lamp|rio/.test(s))
    return 'mythology'
  if (/fruit|sweet|sugar|bonanza|candy|chilli|pepper|frozen|charms/.test(s)) return 'candy'
  if (/dog|wolf|buffalo|mustang|rhino|tiger|safari|wild|animal|pixies|gladiator|kraken|gang|machine|walker|archer/.test(s))
    return 'animals'
  if (/megaways/.test(s)) return 'megaways'
  if ((game.gameType || '').toLowerCase().includes('crash')) return 'crash'
  if ((game.gameType || '').toLowerCase().includes('mine')) return 'mines'
  if (/book|vikings|pirate|gold|treasure|spartan|john-hunter|return|mystery|empty-the-bank/.test(s))
    return 'adventure'
  if (/starlight|princess|starz|vegas|joker|jewels|nights|christmas|xmas|destiny|badge|blitz/.test(s))
    return 'glamour'
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
    ruFocus: 'рыбная охота, сбор множителей с уловом и бонусные раунды с рыбаком',
    enFocus: 'fishing features, catch multipliers and angler bonus rounds',
    ruTip: 'В демо отметьте, как часто появляется рыбак и насколько сильно он суммирует множители за короткий отрезок.',
    enTip: 'In demo, track how often the angler appears and how hard multipliers stack in a short sample.',
  },
  mythology: {
    ruFocus: 'мифологические символы, орбы/множители богов и каскадные выплаты',
    enFocus: 'mythology symbols, god orbs/multipliers and cascading pays',
    ruTip: 'Смотрите, как часто бог вмешивается в спин и меняет итоговый множитель за каскад.',
    enTip: 'Watch how often the god feature lands and changes the cascade total.',
  },
  candy: {
    ruFocus: 'сладости/фрукты, кластеры или tumble и цветные множители',
    enFocus: 'candy/fruit themes, clusters or tumbles and coloured multipliers',
    ruTip: 'В демо оцените длину tumble-цепочек и частоту бомб/множителей без депозита.',
    enTip: 'Use demo to judge tumble chain length and bomb/multiplier frequency with no deposit.',
  },
  animals: {
    ruFocus: 'животные/вайлды, фриспины и липкие множители',
    enFocus: 'animal/wild themes, free spins and sticky multipliers',
    ruTip: 'Проверьте, насколько «липкие» вайлды и как быстро растёт множитель во фриспинах.',
    enTip: 'Check how sticky wilds feel and how fast free-spin multipliers grow.',
  },
  megaways: {
    ruFocus: 'переменное число способов выиграть, каскады и растущий множитель',
    enFocus: 'variable win ways, cascades and a climbing multiplier',
    ruTip: 'Сравните «узкие» и «широкие» спины: как число ways влияет на частоту мелких выплат.',
    enTip: 'Compare narrow vs wide spins: how ways count changes small-win frequency.',
  },
  crash: {
    ruFocus: 'рост множителя в реальном времени и решение о кэшауте',
    enFocus: 'live multiplier climb and cashout timing',
    ruTip: 'Зафиксируйте цель автокэшаута на 20–30 раундов и сравните результат с ручным выходом.',
    enTip: 'Lock an auto-cashout target for 20–30 rounds and compare it with manual exits.',
  },
  mines: {
    ruFocus: 'открытие клеток, выбор числа мин и момент кэшаута',
    enFocus: 'tile opens, mine-count choice and cashout timing',
    ruTip: 'Начните с 3 мин и цели 1.5x–2.5x — так проще понять риск без эмоций.',
    enTip: 'Start with 3 mines and a 1.5x–2.5x target so risk stays readable.',
  },
  adventure: {
    ruFocus: 'приключенческий сеттинг, книги/скаттеры и выкуп бонуса',
    enFocus: 'adventure setting, book/scatter features and bonus buy feel',
    ruTip: 'В демо посчитайте, сколько спинов обычно уходит до скаттеров, прежде чем судить о темпе.',
    enTip: 'In demo, count spins-to-scatters before judging the pace.',
  },
  glamour: {
    ruFocus: 'яркий визуал, множители принцесс/джокеров и бонусные режимы',
    enFocus: 'flashy visuals, princess/joker multipliers and bonus modes',
    ruTip: 'Следите за тем, как часто выпадает множитель и насколько он спасает «сухие» серии.',
    enTip: 'Track multiplier hit rate and whether it softens dry stretches.',
  },
  slots: {
    ruFocus: 'классические линии/вейсы, фриспины и заявленный RTP',
    enFocus: 'classic lines/ways, free spins and published RTP',
    ruTip: 'Сделайте 80–120 демо-спинов с одной ставкой и запишите длину сухих отрезков.',
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
]
const OPENERS_EN = [
  'If you are looking for',
  'A practical breakdown of',
  'Use this page to understand',
  'A clear walkthrough of',
  'Learn how to approach',
  'A focused card about',
  'Cut the noise around',
]

function buildRu(game, theme, seed) {
  const t = THEME[theme]
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
    : `Частый запрос вокруг тайтла: ${name} демо и ${name} играть бесплатно.`

  const sampleSpins = 55 + (seed % 9) * 8
  const stakeHint = pick(seed >>> 3, ['0.20–0.50', '0.40–1.00', '0.10–0.40', '0.25–0.75', '0.50–1.20'])
  const minutes = 8 + (seed % 6)
  const checkpoint = pick(seed >>> 5, [
    `Отдельно запишите, на каком спине впервые сработал бонусный режим в ${name}.`,
    `Сравните ${name} с соседними слотами того же провайдера по темпу «сухих» серий.`,
    `Проверьте ${name} на телефоне и ПК — удобство кнопок и читаемость символов тоже важны.`,
    `Не меняйте виртуальную ставку посередине теста ${name}: так проще честно оценить дисперсию.`,
    `Если в ${name} есть покупка бонуса — сначала изучите обычный триггер в демо, потом уже buy.`,
    `Ведите мини-лог из ${minutes} минут по ${name}: плюс/минус по ощущению, без охоты за «сигналом».`,
    `После ${sampleSpins} спинов в ${name} ответьте себе: темп комфортный или хочется более спокойный релиз.`,
  ])
  const whyDemo = pick(seed >>> 7, [
    `Демо ${name} полезно именно как тренировочная площадка, а не как «способ найти горячий автомат».`,
    `${name} demo без депозита снимает давление: вы смотрите на механику, а не на баланс карты.`,
    `Бесплатный режим ${name} показывает реальный ритм игры быстрее, чем любой короткий обзор.`,
    `Карточка ${slug} заточена под практику: открыли демо — собрали наблюдения — только потом решение о деньгах.`,
    `Уникальность этой страницы в действиях: вы сами крутите ${name}, а не читаете чужой «топ».`,
  ])
  const fingerprint = pick(seed >>> 9, [
    `Идентификатор страницы в каталоге 1weapp: ${slug}.`,
    `В URL и внутренней навигации тайтл отмечен как «${slug}».`,
    `Эта страница отвечает именно за слот «${name}» (slug: ${slug}), а не за общий каталог.`,
  ])
  const compare = pick(seed >>> 11, [
    `Для сравнения рядом лежат другие релизы ${provider} — переключайтесь без регистрации.`,
    `Если ${name} покажется резким, откройте соседнюю карточку того же типа ${type} и сравните темп.`,
    `После демо сохраните 2–3 вывода по ${name}: волатильность, бонус, удобство UI.`,
  ])

  const blocks = [
    `${opener} ${name} демо без регистрации — начните здесь. ${name} от ${provider} (${type}, RTP ${rtp}) удобно изучать на виртуальных кредитах: вы видите ${t.ruFocus}, не рискуя депозитом. ${whyDemo}`,
    `Как играть в ${name} бесплатно на 1weapp: откройте демо на этой странице, выберите комфортную виртуальную ставку около ${stakeHint} и сделайте серию из ~${sampleSpins} спинов/раундов (ориентир ${minutes} минут спокойного теста). ${t.ruTip} ${checkpoint}`,
    `Что сравнивать в ${name} демо: частоту мелких выплат, длину «сухих» серий, ощущение бонусного режима и то, подходит ли темп вашему банкроллу. ${kwLine} ${fingerprint}`,
    `${compare} После демо решите осознанно: если формат зашёл — можно продолжить ${name} на деньги через кнопку на странице. Играйте только 18+, с лимитом сессии и без догона проигрыша.`,
  ]

  // Rotate starting block by seed so structure differs across similar themes
  const rot = seed % blocks.length
  return [...blocks.slice(rot), ...blocks.slice(0, rot)].join('\n\n')
}

function buildEn(game, theme, seed) {
  const t = THEME[theme]
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
    ? `Common search intents around this title: ${kw.join(', ')}.`
    : `Common intents: ${name} demo and play ${name} free.`

  const sampleSpins = 55 + (seed % 9) * 8
  const stakeHint = pick(seed >>> 3, ['0.20–0.50', '0.40–1.00', '0.10–0.40', '0.25–0.75', '0.50–1.20'])
  const minutes = 8 + (seed % 6)
  const checkpoint = pick(seed >>> 5, [
    `Separately note which spin first triggered the bonus mode in ${name}.`,
    `Compare ${name} with neighbouring titles from the same provider on dry-stretch pace.`,
    `Test ${name} on phone and desktop — button comfort and symbol readability matter too.`,
    `Do not change the virtual stake mid-test in ${name}: that keeps variance readable.`,
    `If ${name} offers bonus buy, learn the natural trigger in demo before considering buy.`,
    `Keep a ${minutes}-minute mini-log for ${name}: gut feel plus/minus, no hunt for a “signal”.`,
    `After ~${sampleSpins} spins in ${name}, answer: is the pace comfortable or do you want a calmer title?`,
  ])
  const whyDemo = pick(seed >>> 7, [
    `The ${name} demo is a practice space — not a way to find a “hot” machine.`,
    `${name} demo with no deposit removes pressure so you can watch mechanics, not card balance.`,
    `Free ${name} mode reveals real game rhythm faster than any short review.`,
    `The ${slug} card is built for practice: open demo → collect notes → only then decide on money.`,
    `What makes this page useful: you spin ${name} yourself instead of reading someone else’s “top list”.`,
  ])
  const fingerprint = pick(seed >>> 9, [
    `Catalog page id on 1weapp: ${slug}.`,
    `In URLs and internal nav this title is tagged “${slug}”.`,
    `This page is specifically for “${name}” (slug: ${slug}), not a generic catalog blurb.`,
  ])
  const compare = pick(seed >>> 11, [
    `Nearby you will find other ${provider} releases — switch without registration.`,
    `If ${name} feels sharp, open a neighbouring ${type} card and compare pace.`,
    `After demo, keep 2–3 notes on ${name}: volatility, bonus feel, UI comfort.`,
  ])

  const blocks = [
    `${opener} the ${name} demo with no registration — start on this page. ${name} by ${provider} (${type}, RTP ${rtp}) is easiest to learn with virtual credits: you can study ${t.enFocus} without risking a deposit. ${whyDemo}`,
    `How to play ${name} for free on 1weapp: launch the demo here, pick a comfortable virtual stake around ${stakeHint}, and run about ${sampleSpins} spins/rounds (roughly ${minutes} minutes of calm testing). ${t.enTip} ${checkpoint}`,
    `What to compare in the ${name} demo: small-win frequency, dry-stretch length, bonus-mode feel, and whether the pace fits your bankroll. ${kwLine} ${fingerprint}`,
    `${compare} After the demo, decide deliberately: if the format fits, you can continue ${name} for real money via the button on this page. Play 18+ only, set a session limit, and never chase losses.`,
  ]

  const rot = seed % blocks.length
  return [...blocks.slice(rot), ...blocks.slice(0, rot)].join('\n\n')
}

function buildDescRu(game, theme, seed) {
  const t = THEME[theme]
  const name = game.name
  const rtp = game.rtp || '~96%'
  const spins = 55 + (seed % 9) * 8
  const variants = [
    `${name} демо бесплатно на 1weapp (/${game.slug}): без регистрации, RTP ${rtp}. Разберите ${t.ruFocus} за ~${spins} спинов в браузере.`,
    `Играть в ${name} бесплатно — официальное демо «${game.slug}». ${game.provider}, ориентир RTP ${rtp}. Без депозита, 18+.`,
    `${name} демо без регистрации: проверьте темп, бонусы и UI на телефоне. Страница ${game.slug} · ${game.provider} · RTP ${rtp}.`,
    `Бесплатное демо ${name}: виртуальный баланс, та же механика, фокус на ${t.ruFocus}. Карточка /${game.slug}, RTP ${rtp}.`,
  ]
  return pick(seed >>> 2, variants)
}

function buildDescEn(game, theme, seed) {
  const t = THEME[theme]
  const name = game.name
  const rtp = game.rtp || '~96%'
  const spins = 55 + (seed % 9) * 8
  const variants = [
    `${name} demo free on 1weapp (/${game.slug}): no signup, RTP ${rtp}. Study ${t.enFocus} across ~${spins} spins.`,
    `Play ${name} for free — official “${game.slug}” browser demo. ${game.provider}, RTP about ${rtp}. No deposit, 18+.`,
    `${name} demo without registration: check pace, bonuses and phone UI. Page ${game.slug} · ${game.provider} · RTP ${rtp}.`,
    `Free ${name} demo: virtual balance, same mechanics, focus on ${t.enFocus}. Card /${game.slug}, RTP ${rtp}.`,
  ]
  return pick(seed >>> 2, variants)
}

let rewritten = 0
const updated = games.map((game) => {
  if (KEEP_UNIQUE.has(game.slug)) return game

  const theme = detectTheme(game)
  const seed = hashSeed(game.slug + '|' + game.name)
  rewritten++
  return {
    ...game,
    seoTextRu: buildRu(game, theme, seed),
    seoTextEn: buildEn(game, theme, seed),
    descriptionSeoRu: buildDescRu(game, theme, seed),
    descriptionSeoEn: buildDescEn(game, theme, seed),
  }
})

writeFileSync(path, JSON.stringify(updated, null, 2), 'utf8')
console.log(`Rewrote ${rewritten} / ${games.length} games`)
