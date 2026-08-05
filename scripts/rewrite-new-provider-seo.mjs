/**
 * Rewrite title/description/keywords for newly imported providers
 * (Nolimit City, Big Time Gaming, Red Tiger) to cover more demo SERP phrases.
 *
 * Usage: node scripts/rewrite-new-provider-seo.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dataPath = join(root, 'lib/games-data.json')

const TARGETS = new Set(['Nolimit City', 'Big Time Gaming', 'Red Tiger'])

function hashSeed(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function pick(seed, arr) {
  const i = (seed >>> 0) % arr.length
  return arr[i]
}

function cleanName(name) {
  return String(name || '')
    .replace(/®|™/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Title core without brand — withBrandTitle adds ` | 1weapp` (~60 total). */
function fitTitle(candidates, maxCore = 50) {
  const ok = candidates.filter((t) => t.length <= maxCore)
  if (ok.length) return ok[0]
  // Hard trim at word boundary
  let cut = candidates[0].slice(0, maxCore)
  const space = cut.lastIndexOf(' ')
  if (space > 20) cut = cut.slice(0, space)
  return cut.replace(/[\s—\-–:|,]+$/u, '').trim()
}

function titleEn(name, seed) {
  const n = cleanName(name)
  const variants = [
    `${n} Demo — Play Free No Signup`,
    `${n} Free Demo — No Registration`,
    `${n} Demo Free Online — No Deposit`,
    `Play ${n} Demo Free — No Signup`,
    `${n} Slot Demo — Play Free Online`,
    `${n} Free Demo No Signup`,
    `${n} Demo Free No Deposit`,
  ]
  // Prefer keyword-rich variants that still fit the SERP budget.
  const ordered = [
    pick(seed, variants),
    ...variants.sort((a, b) => a.length - b.length),
  ]
  return fitTitle(ordered, 50)
}

function titleRu(name, seed) {
  const n = cleanName(name)
  const variants = [
    `${n} демо — играть бесплатно без регистрации`,
    `${n} демо бесплатно без регистрации`,
    `${n} слот демо — играть бесплатно`,
    `${n} демо бесплатно онлайн`,
    `Играть в ${n} демо бесплатно`,
    `${n} — демо онлайн без регистрации`,
    `${n} демо без регистрации`,
  ]
  const ordered = [
    pick(seed, variants),
    ...variants.sort((a, b) => a.length - b.length),
  ]
  return fitTitle(ordered, 50)
}

function mechanicHint(provider, name, lang) {
  const n = name.toLowerCase()
  const megaways = /megaways/i.test(name)
  const powerReels = /power reels/i.test(name)
  const cluster = /clusterbuster|cluster/i.test(name)
  const xnudge = /xnudge|xways|xbomb|xsplit|xpays/i.test(name)
  const tombstone = /tombstone/i.test(name)
  const sanQuentin = /san quentin/i.test(name)
  const mental = /^mental/i.test(name)
  const fireHole = /fire in the hole/i.test(name)
  const bonanza = /bonanza/i.test(name)
  const whiteRabbit = /white rabbit/i.test(name)

  if (lang === 'ru') {
    if (tombstone) return 'серия Tombstone, высокая волатильность'
    if (sanQuentin) return 'серия San Quentin, xWays'
    if (mental) return 'Mental, экстремальная волатильность'
    if (fireHole) return 'серия Fire in the Hole, xBomb'
    if (bonanza) return 'Megaways, каскады Bonanza'
    if (whiteRabbit) return 'White Rabbit, Expanding Megaways'
    if (xnudge) return 'xMechanics Nolimit City'
    if (megaways) return 'Megaways, переменные барабаны'
    if (powerReels) return 'Power Reels, расширенное поле'
    if (cluster) return 'кластерные выплаты'
    if (provider === 'Nolimit City') return 'высокий волатильный слот Nolimit'
    if (provider === 'Big Time Gaming') return 'слот Big Time Gaming'
    return 'слот Red Tiger'
  }

  if (tombstone) return 'Tombstone series, high volatility'
  if (sanQuentin) return 'San Quentin series, xWays'
  if (mental) return 'Mental, extreme volatility'
  if (fireHole) return 'Fire in the Hole series, xBomb'
  if (bonanza) return 'Bonanza Megaways cascades'
  if (whiteRabbit) return 'White Rabbit Expanding Megaways'
  if (xnudge) return 'Nolimit City xMechanics'
  if (megaways) return 'Megaways variable reels'
  if (powerReels) return 'Power Reels expanded grid'
  if (cluster) return 'cluster pays'
  if (provider === 'Nolimit City') return 'high-volatility Nolimit slot'
  if (provider === 'Big Time Gaming') return 'Big Time Gaming slot'
  return 'Red Tiger slot'
}

function typeLabel(game, lang) {
  if (game.gameType === 'Megaways' || /megaways/i.test(game.name)) {
    return 'Megaways'
  }
  return lang === 'ru' ? 'слот' : 'slot'
}

/** Aim ~120–155 chars; clampMetaDescription will pad/trim. */
function descriptionEn(game, seed) {
  const n = cleanName(game.name)
  const provider = game.provider
  const rtp = game.rtp || '~96%'
  const type = typeLabel(game, 'en')
  const mech = mechanicHint(provider, n, 'en')
  const variants = [
    `Play ${n} demo free online — no registration, no deposit. ${provider} ${type}, RTP ${rtp}. Test ${mech} in your browser on 1weapp.`,
    `${n} free demo (no signup): ${provider} ${type} with RTP ${rtp}. Open the browser demo to try ${mech} before real-money play.`,
    `Free ${n} slot demo on 1weapp — no account needed. ${provider}, RTP ${rtp}. Practice ${mech} with virtual credits.`,
    `${n} demo free without registration. ${provider} ${type}, RTP ${rtp}. Instant browser play to study ${mech}.`,
    `Play the ${n} demo free — no deposit. ${provider} ${type} (RTP ${rtp}). Check ${mech} on desktop or mobile.`,
  ]
  return pick(seed, variants)
}

function descriptionRu(game, seed) {
  const n = cleanName(game.name)
  const provider = game.provider
  const rtp = game.rtp || '~96%'
  const type = typeLabel(game, 'ru')
  const mech = mechanicHint(provider, n, 'ru')
  const variants = [
    `Играть в ${n} демо бесплатно онлайн — без регистрации и депозита. ${provider}, ${type}, RTP ${rtp}. Проверьте ${mech} в браузере на 1weapp.`,
    `${n} демо бесплатно без регистрации: ${provider}, ${type}, RTP ${rtp}. Откройте демо в браузере и оцените ${mech} до игры на деньги.`,
    `Бесплатное демо ${n} на 1weapp — без аккаунта. ${provider}, RTP ${rtp}. Потренируйте ${mech} на виртуальных кредитах.`,
    `${n} — слот демо онлайн бесплатно. ${provider}, RTP ${rtp}. Мгновенный запуск в браузере, фокус на ${mech}.`,
    `Играйте в демо ${n} без депозита. ${provider} ${type} (RTP ${rtp}). Изучите ${mech} на телефоне или ПК.`,
  ]
  return pick(seed, variants)
}

function keywordsEn(game) {
  const n = cleanName(game.name)
  const p = game.provider
  const type = typeLabel(game, 'en')
  const extra = []
  if (/megaways/i.test(n) || game.gameType === 'Megaways') {
    extra.push(`${n} Megaways demo`, `play ${n} Megaways free`)
  }
  if (/xnudge|xways|xbomb/i.test(n)) extra.push(`${n} xWays demo`)
  if (p === 'Nolimit City') extra.push(`Nolimit City ${n}`, `${n} high volatility demo`)
  if (p === 'Big Time Gaming') extra.push(`BTG ${n} demo`, `${n} Big Time Gaming free`)
  if (p === 'Red Tiger') extra.push(`Red Tiger ${n} free demo`)

  return [
    `${n} demo`,
    `play ${n} free`,
    `${n} free demo`,
    `${n} demo no registration`,
    `${n} slot demo`,
    `${n} demo no deposit`,
    `play ${n} online free`,
    `${p} ${n}`,
    `${type} demo free`,
    ...extra,
    `1weapp ${n}`,
  ]
    .filter(Boolean)
    .slice(0, 12)
    .join(', ')
}

function keywordsRu(game) {
  const n = cleanName(game.name)
  const p = game.provider
  const type = typeLabel(game, 'ru')
  const extra = []
  if (/megaways/i.test(n) || game.gameType === 'Megaways') {
    extra.push(`${n} Megaways демо`, `${n} Megaways играть бесплатно`)
  }
  if (p === 'Nolimit City') extra.push(`Nolimit City ${n}`, `${n} высокий волатильный демо`)
  if (p === 'Big Time Gaming') extra.push(`${n} Big Time Gaming демо`)
  if (p === 'Red Tiger') extra.push(`Red Tiger ${n} демо`)

  return [
    `${n} демо`,
    `${n} играть бесплатно`,
    `${n} демо бесплатно`,
    `${n} демо без регистрации`,
    `${n} слот демо`,
    `${n} без депозита`,
    `играть в ${n} онлайн`,
    `${p} ${n}`,
    `${type} демо бесплатно`,
    ...extra,
    `1weapp ${n}`,
  ]
    .filter(Boolean)
    .slice(0, 12)
    .join(', ')
}

function main() {
  const games = JSON.parse(readFileSync(dataPath, 'utf8'))
  let updated = 0
  const byProv = {}

  for (const g of games) {
    if (!TARGETS.has(g.provider)) continue
    const seed = hashSeed(`${g.slug}|${g.name}|seo2`)
    const tEn = titleEn(g.name, seed)
    const tRu = titleRu(g.name, seed ^ 0x9e3779b9)
    const dEn = descriptionEn(g, seed >>> 3)
    const dRu = descriptionRu(g, seed >>> 5)
    const kEn = keywordsEn(g)
    const kRu = keywordsRu(g)

    if (![tEn, tRu, dEn, dRu, kEn, kRu].every((x) => typeof x === 'string' && x.length > 8)) {
      throw new Error(`Bad SEO payload for ${g.slug}: ${JSON.stringify({ tEn, tRu, dEn, dRu })}`)
    }

    g.titleSeoEn = tEn
    g.titleSeoRu = tRu
    g.descriptionSeoEn = dEn
    g.descriptionSeoRu = dRu
    g.keywordsEn = kEn
    g.keywordsRu = kRu
    updated++
    byProv[g.provider] = (byProv[g.provider] || 0) + 1
  }

  // Ensure every target game persisted the RU title before write
  const missing = games.filter(
    (g) => TARGETS.has(g.provider) && (!g.titleSeoRu || !g.titleSeoEn || !g.descriptionSeoRu),
  )
  if (missing.length) {
    throw new Error(`Missing SEO on ${missing.length} games, e.g. ${missing[0].slug}`)
  }

  writeFileSync(dataPath, JSON.stringify(games, null, 2), 'utf8')
  console.log('Updated', updated, byProv)

  const samples = games.filter((g) => TARGETS.has(g.provider)).slice(0, 5)
  for (const g of samples) {
    console.log('---', g.slug)
    console.log('tEN', g.titleSeoEn, `(${g.titleSeoEn.length})`)
    console.log('tRU', g.titleSeoRu, `(${g.titleSeoRu.length})`)
    console.log('dEN', g.descriptionSeoEn.slice(0, 100) + '…', `(${g.descriptionSeoEn.length})`)
    console.log('dRU', g.descriptionSeoRu.slice(0, 100) + '…', `(${g.descriptionSeoRu.length})`)
  }

  const sync = spawnSync(process.execPath, [join(root, 'scripts/sync-games-catalog.mjs')], {
    cwd: root,
    encoding: 'utf8',
  })
  if (sync.status !== 0) {
    console.error(sync.stderr || sync.stdout)
    process.exit(sync.status || 1)
  }
  console.log(sync.stdout.trim())
}

main()
