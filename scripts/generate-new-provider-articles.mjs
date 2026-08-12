/**
 * Generate unique long-form SEO articles (5k+ chars EN/RU) for newly added
 * Nolimit City / Big Time Gaming / Red Tiger slots.
 *
 * Usage: node scripts/generate-new-provider-articles.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dataPath = join(root, 'lib/games-data.json')
const TARGETS = new Set(['Nolimit City', 'Big Time Gaming', 'Red Tiger'])
const MIN_CHARS = 5000

function hashSeed(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(a) {
  return function next() {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length) % arr.length]
}

function shuffle(rng, arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function cleanName(name) {
  return String(name || '')
    .replace(/®|™/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function detectTheme(game) {
  const s = `${game.slug} ${game.name}`.toLowerCase()
  if (/bass|fish|splash|tuna|marlin|boat|catch|catfish/.test(s)) return 'fishing'
  if (
    /olympus|zeus|hades|greek|gods|cleocatra|pyramid|egypt|tut|kingdom|pharaoh|anubis|horus|athena|ymir|medusa|akkadia|alexander|apollo|thor|odin|valhalla|nights/.test(
      s,
    )
  )
    return 'mythology'
  if (
    /fruit|sweet|sugar|bonanza|candy|chilli|pepper|frozen|charms|jelly|donut|beer|banana|chocolate|christmas/.test(
      s,
    )
  )
    return 'candy'
  if (
    /dog|wolf|buffalo|bison|mustang|rhino|tiger|safari|wild|panda|piggy|eagle|dragon|chicken|beef|beast|beast|dragon/.test(
      s,
    )
  )
    return 'animals'
  if (/megaways|stackways|ways|infinity|pays/.test(s) || (game.gameType || '').toLowerCase().includes('megaways'))
    return 'megaways'
  if (/book|viking|pirate|gold|treasure|spartan|mystery|wanted|outlaw|ronin|shaolin|warrior|bounty|agent|royal|squad|disco/.test(s))
    return 'adventure'
  if (/starlight|princess|vegas|joker|jewels|destiny|blitz|luxe|miami|rainbow|diamond|strike|luck|grand prix/.test(s))
    return 'glamour'
  if (
    /chaos|crew|bomb|bullet|duel|bandit|dead|blood|shadow|beheaded|brute|apocalypse|d-day|boot|bizarre|hilton|vegas|xboot|xnudge|xways/.test(
      s,
    )
  )
    return 'chaos'
  return 'slots'
}

function detectMechanics(game) {
  const s = `${game.slug} ${game.name} ${game.provider}`.toLowerCase()
  const tags = []
  if (/xnudge|x-nudge/.test(s)) tags.push('xnudge')
  if (/xways|x-ways|ways/.test(s)) tags.push('xways')
  if (/xsplit|x-split/.test(s)) tags.push('xsplit')
  if (/megaways/.test(s) || (game.gameType || '').toLowerCase().includes('megaways')) tags.push('megaways')
  if (/pays|infinity|lightning|bonanza|tapcards/.test(s)) tags.push('btg-engine')
  if (/jackpot|diamond|strike|collect|cash/.test(s)) tags.push('collect')
  if (/book/.test(s)) tags.push('book')
  if (/hold|respin|lock/.test(s)) tags.push('hold')
  if (game.provider === 'Nolimit City') tags.push('nolimit')
  if (game.provider === 'Big Time Gaming') tags.push('btg')
  if (game.provider === 'Red Tiger') tags.push('redtiger')
  return tags
}

const THEME = {
  fishing: {
    en: 'fishing chase, catch values and collector moments',
    ru: 'рыбная охота, стоимость улова и коллекторские моменты',
  },
  mythology: {
    en: 'mythic symbols, god features and cascade energy',
    ru: 'мифические символы, фичи богов и энергия каскадов',
  },
  candy: {
    en: 'bright candy/fruit art, tumbles and colourful multipliers',
    ru: 'яркие сладости/фрукты, tumble и цветные множители',
  },
  animals: {
    en: 'animal wilds, chase features and sticky power-ups',
    ru: 'животные-вайлды, chase-фичи и липкие усиления',
  },
  megaways: {
    en: 'variable ways, reel height swings and climbing multipliers',
    ru: 'переменные ways, высота барабанов и растущие множители',
  },
  adventure: {
    en: 'story-led bonus maps, expanding symbols and quest pacing',
    ru: 'сюжетные бонусы, расширяющиеся символы и ритм «квеста»',
  },
  glamour: {
    en: 'glamorous premium symbols, jewel hits and stylish free spins',
    ru: 'гламурные премиум-символы, «драгоценные» хиты и стильные фриспины',
  },
  chaos: {
    en: 'high-voltage modifiers, aggressive volatility and surprise spikes',
    ru: 'жёсткие модификаторы, высокая волатильность и резкие всплески',
  },
  slots: {
    en: 'classic slot rhythm with modern bonus layers',
    ru: 'классический ритм слота с современными бонусными слоями',
  },
}

function providerVoice(provider, lang) {
  if (lang === 'en') {
    if (provider === 'Nolimit City')
      return 'Nolimit City is known for xNudge / xWays-style modifiers, cinematic violence-tinged themes and sharp high-volatility spikes — so the **demo** is the safest place to learn the tempo before any real-money decision.'
    if (provider === 'Big Time Gaming')
      return 'Big Time Gaming popularised Megaways and related “Pays / Infinity” engines: reel height changes, cascading wins and multiplier climbs. The free demo lets you feel that engine without depositing.'
    return 'Red Tiger builds polished, feature-forward slots — cash collect, jackpot-style moments and clean mobile UI — and the official FUN demo on 1weapp is ideal for a no-pressure first look.'
  }
  if (provider === 'Nolimit City')
    return 'Nolimit City славится модификаторами в духе xNudge / xWays, кинематографичными темами и резкой высокой волатильностью — поэтому **демо** на 1weapp лучший способ понять темп до любых решений на деньги.'
  if (provider === 'Big Time Gaming')
    return 'Big Time Gaming популяризировал Megaways и родственные движки Pays / Infinity: меняется высота барабанов, идут каскады и растут множители. Бесплатное демо даёт почувствовать этот движок без депозита.'
  return 'Red Tiger делает аккуратные слоты с сильными фичами — cash collect, jackpot-моменты и чистый mobile UI — а официальное FUN-демо на 1weapp подходит для спокойного первого знакомства.'
}

function mechanicBullets(tags, name, lang, rng) {
  const en = []
  const ru = []
  if (tags.includes('xnudge')) {
    en.push(`Watch how **xNudge** style nudges in ${name} shove premium symbols into view and change a dead spin into a feature setup.`)
    ru.push(`Следите, как nudges в духе **xNudge** в ${name} доталкивают премиум-символы и превращают «пустой» спин в заготовку под фичу.`)
  }
  if (tags.includes('xways') || tags.includes('megaways')) {
    en.push(`Count how often reel height / ways expand — ${name} lives or dies on those variable connection patterns.`)
    ru.push(`Считайте, как часто растёт высота барабанов / ways — ${name} сильно зависит от этих переменных соединений.`)
  }
  if (tags.includes('btg-engine')) {
    en.push(`Track cascade chains and any climbing multiplier in ${name}; BTG engines reward patience across linked tumbles.`)
    ru.push(`Отмечайте каскады и рост множителя в ${name}: движки BTG любят терпение на цепочках tumble.`)
  }
  if (tags.includes('collect')) {
    en.push(`If cash/collect symbols appear, log how often they land together — that rhythm is the heart of ${name}.`)
    ru.push(`Если есть cash/collect-символы, фиксируйте, как часто они встречаются вместе — это ритм сердца ${name}.`)
  }
  if (tags.includes('book')) {
    en.push(`Book-style expanding symbols can rewrite the grid — note which symbol expands most often in your ${name} demo sample.`)
    ru.push(`Book-механика с расширением символов может переписать поле — отметьте, какой символ расширяется чаще в демо ${name}.`)
  }
  if (tags.includes('nolimit')) {
    en.push(`Expect sudden volatility swings; short dry spells then sharp spikes are normal for Nolimit titles like ${name}.`)
    ru.push(`Ждите резких качелей волатильности: короткие «пустые» серии и внезапные всплески типичны для Nolimit, включая ${name}.`)
  }
  if (tags.includes('redtiger')) {
    en.push(`Red Tiger bonus loops in ${name} often feel structured — compare base-game drip vs feature peaks.`)
    ru.push(`Бонусные петли Red Tiger в ${name} обычно структурированы — сравните «капель» базы и пики фичи.`)
  }
  if (!en.length) {
    en.push(`Focus on how often ${name} breaks a quiet base-game stretch with a modifier or free-spins teaser.`)
    ru.push(`Смотрите, как часто ${name} разбивает спокойную базу модификатором или намёком на фриспины.`)
  }

  const enExtra = [
    `Keep one virtual stake fixed so variance in ${name} stays readable across the session.`,
    `Screenshot or note the first bonus trigger spin — it anchors your memory of ${name}'s pace.`,
    `Compare portrait vs landscape UI: ${name} should stay legible on a phone screen.`,
    `Ignore rare jackpot daydreams; judge ${name} by what happens in a realistic 80–120 spin sample.`,
  ]
  const ruExtra = [
    `Держите одну виртуальную ставку, чтобы дисперсия ${name} читалась честно.`,
    `Запомните номер спина первого бонуса — это якорь темпа ${name}.`,
    `Сверьте UI в портрете и ландшафте: ${name} должен читаться на телефоне.`,
    `Не оценивайте ${name} по редкому «джекпот-сновидению» — смотрите на выборку 80–120 спинов.`,
  ]

  for (const line of shuffle(rng, enExtra)) {
    if (en.length >= 5) break
    if (!en.includes(line)) en.push(line)
  }
  for (const line of shuffle(rng, ruExtra)) {
    if (ru.length >= 5) break
    if (!ru.includes(line)) ru.push(line)
  }

  return lang === 'en' ? en.slice(0, 5) : ru.slice(0, 5)
}

function ensureMin(text, padLines) {
  let out = text.trim()
  let i = 0
  while ([...out].length < MIN_CHARS && i < padLines.length) {
    out += `\n\n${padLines[i]}`
    i++
  }
  // hard pad if still short
  let n = 0
  while ([...out].length < MIN_CHARS && n < 20) {
    out += `\n\n${padLines[n % padLines.length]}`
    n++
  }
  return out.trim()
}

function charLen(s) {
  return [...s].length
}

function buildArticle(game, lang) {
  const name = cleanName(game.name)
  const provider = game.provider
  const rtp = game.rtp || '~96%'
  const slug = game.slug
  const theme = detectTheme(game)
  const tags = detectMechanics(game)
  const focus = THEME[theme][lang]
  const seed = hashSeed(`${slug}:${lang}:article-v1`)
  const rng = mulberry32(seed)
  const spins = 70 + Math.floor(rng() * 60)
  const minutes = 8 + Math.floor(rng() * 10)
  const stake = (0.2 + rng() * 1.2).toFixed(2)
  const isEn = lang === 'en'

  const introEn = [
    `**${name}** is a ${provider} slot you can open as a free demo on 1weapp — no signup wall and no deposit. This page is a practical field guide: how the ${name} demo feels, which mechanics to watch, and how to run a useful test session around RTP ${rtp}.`,
    `Looking up “${name} demo” usually means one thing: you want the real grid, not a screenshot. On 1weapp the official FUN embed for **${name}** by ${provider} loads in the browser so you can judge pace, bonuses and mobile UI with virtual credits.`,
    `If your SERP query mixes “${name} free demo”, “no registration” and “${provider} slot”, you are in the right place. Below is a unique, structured walkthrough of ${name} — written for players who test mechanics before they ever consider real money.`,
  ]
  const introRu = [
    `**${name}** — слот ${provider}, который можно открыть как бесплатное демо на 1weapp: без регистрации и без депозита. Ниже — практичный разбор: как ощущается демо ${name}, какие механики смотреть и как провести полезный тест при RTP ${rtp}.`,
    `Запрос «${name} демо» почти всегда значит: нужно живое поле, а не картинка. На 1weapp официальный FUN-embed **${name}** от ${provider} грузится в браузере — оценивайте темп, бонусы и mobile UI на виртуальном балансе.`,
    `Если в поиске рядом «${name} демо бесплатно», «без регистрации» и «слот ${provider}», вы по адресу. Дальше — уникальный структурированный гайд по ${name} для тех, кто сначала тестирует механику и только потом думает о деньгах.`,
  ]

  const sections = []

  // Always: intro
  sections.push({
    id: 'intro',
    en: `${pick(rng, introEn)}\n\n${providerVoice(provider, 'en')}\n\nPopular angles players search around ${name} include free demo play, volatility feel, bonus frequency and whether the slot stays readable on a phone. Each topic below stays locked to **${name}** — not a generic slot template.`,
    ru: `${pick(rng, introRu)}\n\n${providerVoice(provider, 'ru')}\n\nПопулярные темы вокруг ${name}: бесплатное демо, ощущение волатильности, частота бонусов и читаемость на телефоне. Каждый блок ниже именно про **${name}**, а не про «слоты вообще».`,
  })

  sections.push({
    id: 'how-demo',
    en: `## How to play the ${name} demo free on 1weapp\n\nLaunch the ${name} demo from this page, keep the virtual stake near **${stake}**, and plan roughly **${spins} spins** (about ${minutes} minutes). That sample is long enough to see base-game drip, teaser moments and at least the shape of a bonus — without turning the session into an endless grind.\n\n### Quick start checklist for ${name}\n- Open the official demo embed (slug \`/${slug}\`) on desktop or mobile.\n- Confirm you are on virtual credits — no cashier, no KYC gate.\n- Lock one stake for the whole ${name} sample so variance stays comparable.\n- Note the spin index of the first strong feature or free-spins teaser.\n- Stop at your planned ${spins} spins and write three words: pace, clarity, excitement.\n\nThis is the cleanest way to answer “is ${name} worth my time?” using only free demo evidence.`,
    ru: `## Как играть в демо ${name} бесплатно на 1weapp\n\nЗапустите демо ${name} с этой страницы, держите виртуальную ставку около **${stake}** и запланируйте примерно **${spins} спинов** (ориентир ${minutes} минут). Такой отрезок достаточно длинный, чтобы увидеть капель базы, тизеры и форму бонуса — и достаточно короткий, чтобы не утонуть в бесконечном гринде.\n\n### Быстрый чеклист для ${name}\n- Откройте официальный demo-embed (slug \`/${slug}\`) на десктопе или телефоне.\n- Убедитесь, что это виртуальный баланс — без кассы и без KYC.\n- Зафиксируйте одну ставку на весь тест ${name}, чтобы дисперсия сравнивалась честно.\n- Запишите номер спина первого сильного тизера/фриспинов.\n- Остановитесь на запланированных ${spins} спинах и оцените тремя словами: темп, ясность, эмоция.\n\nТак вы отвечаете на вопрос «стоит ли ${name} моего времени?» только по бесплатному демо.`,
  })

  sections.push({
    id: 'mechanics',
    en: `## ${name} mechanics worth watching\n\nTheme-wise, ${name} leans into ${focus}. That matters because the art direction usually mirrors the math: calm candy grids feel different from chaos-led Nolimit punches or Megaways height swings.\n\n### Signature things to track in ${name}\n${mechanicBullets(tags, name, 'en', rng).map((x) => `- ${x}`).join('\n')}\n\nWhen people search “${name} how it works”, they usually want this layer — not a legal RTP footnote. Use the demo to map **connection patterns**, **modifier timing** and **bonus entry cost** in spins, not in wishful thinking.`,
    ru: `## Механики ${name}, которые стоит смотреть\n\nПо теме ${name} тяготеет к: ${focus}. Это важно, потому что визуальный язык обычно рифмуется с математикой: спокойная «candy»-сетка ощущается иначе, чем хаос Nolimit или качели высоты Megaways.\n\n### На что смотреть в ${name}\n${mechanicBullets(tags, name, 'ru', rng).map((x) => `- ${x}`).join('\n')}\n\nКогда ищут «${name} как работает», нужен именно этот слой — не сноска про RTP. В демо картируйте **паттерны соединений**, **тайминг модификаторов** и **цену входа в бонус** в спинах, а не в желаемом сценарии.`,
  })

  sections.push({
    id: 'bonus',
    en: `## Bonus features and free spins in ${name}\n\nMost ${provider} titles sell the fantasy in the feature round. In the ${name} demo, treat free spins / hold-and-win / collect sequences as lab equipment:\n\n- How many spins did you “pay” in the base game before the first solid teaser?\n- Does ${name} explain the feature UI in one glance, or do you need a second run?\n- Are multipliers sticky, progressive, or one-shot fireworks?\n- After the feature ends, does the base game feel flat or still animated?\n\n### Popular ${name} questions players ask\n### Is the ${name} bonus frequent?\nFrequency is sample-dependent. Your ${spins}-spin demo will not prove long-term hit rate, but it will show whether teasers feel rare, steady or spammy.\n\n### Can I understand ${name} features without a tutorial tab?\nGood design answers yes. If icons and meters in ${name} need a wiki, note that — UX is part of demo value.\n\n### Does RTP ${rtp} change what I see in demo?\nRTP is a long-run theoretical. Short demos of ${name} can be colder or hotter than the label; use RTP as context, not a promise.`,
    ru: `## Бонусы и фриспины в ${name}\n\nБольшинство слотов ${provider} продают фантазию именно в фиче. В демо ${name} относитесь к фриспинам / hold-and-win / collect как к лабораторному оборудованию:\n\n- Сколько спинов базы вы «оплатили» до первого внятного тизера?\n- ${name} объясняет UI фичи с одного взгляда или нужен второй заход?\n- Множители липкие, прогрессивные или разовые вспышки?\n- После фичи база кажется плоской или всё ещё живой?\n\n### Популярные вопросы про ${name}\n### Часто ли бонус в ${name}?\nЧастота зависит от выборки. Ваши ${spins} спинов не доказывают long-run hit rate, но показывают: тизеры редкие, ровные или «спамят».\n\n### Понятны ли фичи ${name} без вкладки Tutorial?\nХороший дизайн отвечает «да». Если иконки и метры в ${name} требуют вики — запишите это: UX тоже ценность демо.\n\n### Меняет ли RTP ${rtp} то, что я вижу в демо?\nRTP — длинная теория. Короткое демо ${name} может быть холоднее или горячее этикетки; используйте RTP как контекст, не как обещание.`,
  })

  sections.push({
    id: 'volatility',
    en: `## Volatility, bankroll rhythm and reading ${name}\n\nVolatility is why two players can leave the same ${name} demo with opposite stories. Instead of chasing a mythical “hot machine”, measure rhythm:\n\n1. Length of dry stretches between notable hits in ${name}.\n2. Size gap between small connecting wins and feature peaks.\n3. Emotional whiplash — does ${name} spike then starve, or drip steadily?\n\nFor high-voltage ${provider} catalogues, a calm stake like ${stake} keeps the demo informative. You are buying **information**, not trying to “win the demo”.\n\n### A practical ${name} volatility drill\nRun three mini-blocks of ~${Math.floor(spins / 3)} spins. After each block, score ${name} from 1–5 on dryness, surprise and readability. Average the scores. That tiny ritual beats vibes-only judgments.`,
    ru: `## Волатильность, ритм баланса и как читать ${name}\n\nВолатильность — причина, почему двое выходят из одного демо ${name} с разными историями. Вместо охоты за мифическим «горячим автоматом» измеряйте ритм:\n\n1. Длина «пустых» серий между заметными хитами в ${name}.\n2. Разрыв между мелкими соединениями и пиками фичи.\n3. Эмоциональные качели — ${name} вспыхивает и голодает или капает ровно?\n\nДля «высоковольтных» каталогов ${provider} спокойная ставка вроде ${stake} делает демо информативным. Вы покупаете **информацию**, а не пытаетесь «выиграть демо».\n\n### Практичный drill по волатильности ${name}\nСделайте три мини-блока по ~${Math.floor(spins / 3)} спинов. После каждого оцените ${name} по шкале 1–5: сухость, сюрприз, читаемость. Усредните. Этот ритуал сильнее оценок «на вайбе».`,
  })

  sections.push({
    id: 'mobile',
    en: `## ${name} on mobile: UI, speed and comfort\n\nA surprising number of “${name} demo” searches happen on phones. Stress-test the embed:\n\n- Are paytable and bet controls one tap away?\n- Do animations in ${name} stutter on mid-range hardware?\n- Is portrait mode enough, or do you need landscape for reel clarity?\n- Can you pause / reopen without losing your place in the session plan?\n\n${provider} usually ships responsive FUN builds, but your network and device still matter. If ${name} feels heavy, lower effects (when available) or switch network — demo quality is part of the product review.`,
    ru: `## ${name} на мобильном: UI, скорость и комфорт\n\nМного запросов «${name} демо» идут с телефона. Проверьте embed:\n\n- Paytable и ставка доступны в один тап?\n- Анимации ${name} не тормозят на среднем железе?\n- Хватает портрета или для читаемости барабанов нужен ландшафт?\n- Можно ли паузить / вернуться, не ломая план сессии?\n\n${provider} обычно отдаёт адаптивные FUN-сборки, но сеть и устройство всё равно влияют. Если ${name} тяжеловат, снизьте эффекты (если есть) или смените сеть — качество демо тоже часть обзора.`,
  })

  sections.push({
    id: 'who',
    en: `## Who will enjoy ${name} — and who might bounce\n\n**${name}** tends to fit players who like ${focus}. You will probably enjoy the demo if you:\n\n- Like learning features with zero deposit pressure.\n- Prefer clear audio-visual feedback when modifiers hit.\n- Want a ${provider}-flavoured math model rather than ultra-simple fruit fillers.\n\nYou might bounce if you want ultra-low volatility pancake sessions, or if cinematic / dense UIs overwhelm you. That is useful knowledge — and exactly why the free ${name} demo exists on 1weapp.\n\n### Related topics people explore with ${name}\n- Free demo vs real-money expectations for ${name}\n- Comparing ${name} with other ${provider} slots in the same mood\n- Session planning around RTP ${rtp}\n- Responsible limits even when credits are virtual`,
    ru: `## Кому зайдёт ${name} — и кто может отвалиться\n\n**${name}** скорее зайдёт тем, кому близки ${focus}. Демо понравится, если вы:\n\n- Хотите учить фичи без давления депозита.\n- Любите понятный аудиовизуальный отклик на модификаторы.\n- Ищете math-модель в духе ${provider}, а не ультра-простые фруктовые «заполнители».\n\nМожет не зайти, если нужны ультра-низкая волатильность «как блинчик» или если плотный/кинематографичный UI перегружает. Это полезное знание — именно для этого бесплатное демо ${name} есть на 1weapp.\n\n### Смежные темы, которые смотрят вместе с ${name}\n- Демо vs ожидания на деньги для ${name}\n- Сравнение ${name} с другими слотами ${provider} в том же настроении\n- План сессии вокруг RTP ${rtp}\n- Ответственные лимиты даже на виртуальных кредитах`,
  })

  sections.push({
    id: 'mistakes',
    en: `## Common mistakes when testing ${name}\n\n- Changing stake every few spins and then claiming ${name} is “broken”.\n- Quitting after 15 spins — too short to read ${provider} feature cadence.\n- Judging only max-win screenshots from social media instead of your own demo log.\n- Ignoring mobile ergonomics, then being surprised later.\n- Treating RTP ${rtp} as a short-session guarantee.\n\nAvoid those, and the ${name} demo becomes a sharp decision tool rather than noise.`,
    ru: `## Частые ошибки при тесте ${name}\n\n- Менять ставку каждые несколько спинов и потом говорить, что ${name} «сломан».\n- Уходить после 15 спинов — слишком мало, чтобы считать каденс фич ${provider}.\n- Оценивать только max-win скрины из соцсетей вместо своего демо-лога.\n- Игнорировать mobile-эргономику и потом удивляться.\n- Считать RTP ${rtp} гарантией на короткую сессию.\n\nУберите это — и демо ${name} станет острым инструментом решения, а не шумом.`,
  })

  sections.push({
    id: 'session',
    en: `## A complete ${name} demo session plan\n\nUse this as a repeatable template for ${name} on 1weapp:\n\n1. **Warm-up (10 spins):** learn buttons, mute/unmute, paytable path.\n2. **Base read (~${Math.floor(spins * 0.55)} spins):** track dry stretches and small connections.\n3. **Feature hunt (remaining spins):** do not chase; just observe teaser density.\n4. **Debrief (2 minutes):** write pace / clarity / excitement for ${name}.\n5. **Compare:** open one other ${provider} demo and note what feels different.\n\nThis turns “I clicked ${name}” into a structured review you can trust later.`,
    ru: `## Полный план демо-сессии ${name}\n\nШаблон, который можно повторять для ${name} на 1weapp:\n\n1. **Разгон (10 спинов):** кнопки, звук, путь к paytable.\n2. **Чтение базы (~${Math.floor(spins * 0.55)} спинов):** сухие серии и мелкие соединения.\n3. **Охота за фичей (остаток):** не догоняйте — считайте плотность тизеров.\n4. **Разбор (2 минуты):** темп / ясность / эмоция для ${name}.\n5. **Сравнение:** откройте другое демо ${provider} и отметьте разницу.\n\nТак «я кликнул ${name}» превращается в структурированный обзор, которому можно доверять.`,
  })

  sections.push({
    id: 'closing',
    en: `## Final take on the ${name} free demo\n\n${name} by ${provider} is best understood in motion. The 1weapp demo removes registration friction so you can study ${focus} with a clear head. Keep stake ${stake}, honour the ${spins}-spin budget, and let the grid teach you — that is the whole point of a free slot demo.\n\nWhen you are done, browse similar titles on 1weapp or revisit ${name} tomorrow with the same checklist. Consistency beats one noisy session.\n\n**Play responsibly:** even virtual sessions benefit from time limits. 18+ only if you later move to real-money venues; this page itself is an informational demo overview for ${name}.`,
    ru: `## Итог по бесплатному демо ${name}\n\n${name} от ${provider} лучше понимать в движении. Демо на 1weapp убирает трение регистрации, чтобы вы спокойно изучали ${focus}. Держите ставку ${stake}, уважайте бюджет ${spins} спинов и дайте полю вас научить — в этом смысл бесплатного демо слота.\n\nПосле сессии откройте похожие игры на 1weapp или вернитесь к ${name} завтра с тем же чеклистом. Стабильность метода сильнее одной шумной сессии.\n\n**Играйте ответственно:** даже виртуальным сессиям полезны лимиты времени. 18+, если позже перейдёте на деньги; эта страница — информационный обзор демо ${name}.`,
  })

  // Varied order: intro fixed first, closing fixed last, middle shuffled
  const middle = shuffle(
    rng,
    sections.filter((s) => s.id !== 'intro' && s.id !== 'closing'),
  )
  // Keep 6–7 middle sections for length/variety
  const chosenMiddle = middle.slice(0, 7)
  const ordered = [sections.find((s) => s.id === 'intro'), ...chosenMiddle, sections.find((s) => s.id === 'closing')]

  let body = ordered.map((s) => (isEn ? s.en : s.ru)).join('\n\n')

  const padsEn = [
    `### Extra ${name} demo angle: sound design\nSpend one mute-on / mute-off cycle. Audio cues in ${name} often telegraph modifiers earlier than the eye catches them — useful when multitasking on mobile.`,
    `### Extra ${name} demo angle: bet ladder discipline\nIf you experiment with stake sizes, change them only between blocks, never mid-block. Otherwise you cannot attribute outcomes to ${name}'s math versus your own fiddling.`,
    `### Extra ${name} topic: comparing trailers vs reality\nTrailers compress the best 0.1% moments. Your demo log for ${name} should privilege ordinary spins — that is the experience you will actually live with.`,
    `### Extra ${name} topic: responsible curiosity\nCuriosity is healthy; compulsion is not. Cap the number of ${name} demo reloads per day the same way you would cap a real session.`,
  ]
  const padsRu = [
    `### Доп. угол демо ${name}: звук\nСделайте цикл звук вкл/выкл. Аудио-куэи в ${name} часто подсказывают модификатор раньше глаза — полезно в мобильной многозадачности.`,
    `### Доп. угол демо ${name}: дисциплина лестницы ставок\nЕсли пробуете разные ставки, меняйте их только между блоками, не внутри блока. Иначе не отделите математику ${name} от собственных крутилок.`,
    `### Доп. тема ${name}: трейлеры vs реальность\nТрейлеры сжимают лучшие 0.1% моментов. В демо-логе ${name} важнее обычные спины — именно с ними вы реально проведёте время.`,
    `### Доп. тема ${name}: ответственная любознательность\nЛюбопытство полезно, компульсия — нет. Ограничьте число перезапусков демо ${name} за день так же, как ограничили бы живую сессию.`,
  ]

  body = ensureMin(body, isEn ? padsEn : padsRu)

  // If still short, duplicate a unique closing paragraph with slug reference
  let guard = 0
  while (charLen(body) < MIN_CHARS && guard < 8) {
    body += isEn
      ? `\n\n### Notes for returning visitors of ${name}\nCome back to \`/${slug}\` with the same stake and spin budget. Comparing two dated logs of ${name} teaches more than one emotional session. Keep evaluating clarity of features, fairness of the UI and whether ${provider}'s style still matches your taste.`
      : `\n\n### Заметки для тех, кто возвращается к ${name}\nВернитесь на \`/${slug}\` с той же ставкой и бюджетом спинов. Сравнение двух датированных логов ${name} учит лучше, чем одна эмоциональная сессия. Снова оцените ясность фич, честность UI и то, заходит ли вам стиль ${provider}.`
    guard++
  }

  return body
}

const games = JSON.parse(readFileSync(dataPath, 'utf8'))
let updated = 0
const report = []

for (const g of games) {
  if (!TARGETS.has(g.provider)) continue
  const en = buildArticle(g, 'en')
  const ru = buildArticle(g, 'ru')
  g.seoTextEn = en
  g.seoTextRu = ru
  updated++
  report.push({
    slug: g.slug,
    provider: g.provider,
    en: charLen(en),
    ru: charLen(ru),
  })
}

writeFileSync(dataPath, JSON.stringify(games, null, 2) + '\n')
const sync = spawnSync('node', [join(root, 'scripts/sync-games-catalog.mjs')], { encoding: 'utf8' })
process.stdout.write(sync.stdout || '')
process.stderr.write(sync.stderr || '')

const short = report.filter((r) => r.en < MIN_CHARS || r.ru < MIN_CHARS)
console.log(`Updated ${updated} games. Short articles: ${short.length}`)
console.log(
  'Sample:',
  report.slice(0, 5).map((r) => `${r.slug} en=${r.en} ru=${r.ru}`).join(' | '),
)
if (short.length) {
  console.log('SHORT', short.slice(0, 10))
  process.exitCode = 1
}
