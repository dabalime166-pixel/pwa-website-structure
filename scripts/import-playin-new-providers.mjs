/**
 * Import quality demos from playin.com for NEW providers only:
 * Nolimit City, Big Time Gaming, Red Tiger.
 *
 * Skips NetEnt (already imported), Sneaky Slots, and low-quality / joke titles.
 *
 * Usage: node scripts/import-playin-new-providers.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dataPath = join(root, 'lib/games-data.json')
const avatarDir = join(root, 'public/avatars')

const PLAYIN_FEED = 'https://playin.com/json/games.json'
const CONCURRENCY = 8

/** SoftSwiss CDN prefixes per studio */
const LUCK_PREFIX = {
  'Nolimit City': ['nlc'],
  'Big Time Gaming': ['btg'],
  'Red Tiger': ['rtr', 'rtg'],
}

const PROVIDER_LABEL = {
  'Nolimit City': 'Nolimit City',
  'Big Time Gaming': 'Big Time Gaming',
  'Red Tiger': 'Red Tiger',
}

/**
 * Low-quality / joke / early-filler Nolimit titles to skip.
 * Flagships, xMechanics and modern franchises are kept.
 */
const NLC_SKIP = new Set(
  [
    // Joke / NSFW brand-damage
    'Golden Shower',
    'Soaked By Seamen',
    'Seamen',
    'Punk Toilet',
    'Jingle Balls',
    'Crazy Ex-Girlfriend',
    'Whacked!',
    'Walk of Shame',
    'Kiss My Chainsaw',
    'Karen Maneater',
    'BRICK SNAKE 2000',
    // Early low-production fillers
    'Kitchen Drama: Sushi Mania',
    'Oktoberfest',
    'Fruits',
    'Owls',
    'Hot Nudge',
    'Coins of Fortune',
    'Casino Win Spin',
    'Wixx',
    'Starstruck',
    'Tractor Beam',
    'Mayan Magic Wildfire',
    'Immortal Fruits',
    'Gaelic Gold',
    'Harlequin Carnival',
    'The Creepy Carnival',
    'Hot 4 Cash',
    'Thor Hammer Time',
    'Pixies vs Pirates',
    'Dragon Tribe',
    'Manhattan Goes Wild',
    'Tomb of Nefertiti',
    'Tomb of Akhenaten',
    'Poison Eve',
    'Barbarian Fury',
    'Book of Shadows',
    'Buffalo Hunter',
    'Dungeon Quest',
    'Ice Ice Yeti',
    'Tesla Jolt',
    'Bonus Bunnies',
    'Space Donkey',
    'The Rave',
    'Milky Ways',
    'Golden Genie And The Walking Wilds',
    "Monkey's Gold xPays",
    'Serial',
  ].map(normName),
)

/** BTG: skip only obvious low-effort / seasonal fluff */
const BTG_SKIP = new Set(
  ['Burgers', 'More Turkey', 'Boo', 'Christmas Catch', 'Fizzy Pennyslot™', 'Fizzy Pennyslot']
    .map(normName),
)

/** Red Tiger: skip thin early fillers and joke titles */
const RT_SKIP = new Set(
  [
    'Dragon Boyz',
    'Big Rich Turkeys',
    'Bloody Murder',
    'Play With the Devil Megaways',
    'Jingle Bells Bonanza 2',
    'Jingle Bells Bonanza',
    'World Football Fortunes',
  ].map(normName),
)

function normName(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/®|™/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function slugify(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/®|™/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
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

function shouldKeep(studio, name) {
  const n = normName(name)
  if (studio === 'Nolimit City') return !NLC_SKIP.has(n)
  if (studio === 'Big Time Gaming') return !BTG_SKIP.has(n)
  if (studio === 'Red Tiger') {
    if (RT_SKIP.has(n)) return false
    // Skip ultra-generic single-word early fillers without Megaways/Cluster/etc.
    if (/^(dragon|phoenix|tiger|lion|wolf)\s+luck$/i.test(name)) return false
    return true
  }
  return false
}

function luckIds(studio, name, code) {
  const slug = slugify(name)
  const prefixes = LUCK_PREFIX[studio] || []
  const ids = new Set()
  for (const p of prefixes) {
    ids.add(`${p}_${slug.replace(/-/g, '_')}`)
  }
  // CamelCase code → snake
  const fromCode = String(code || '')
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .toLowerCase()
    .replace(/^_|_$/g, '')
  for (const p of prefixes) {
    if (fromCode) ids.add(`${p}_${fromCode}`)
    ids.add(`${p}_${String(code || '').toLowerCase()}`)
  }
  // Known SoftSwiss aliases
  const aliases = {
    mental2: 'mental_2',
    fireinthehole: 'fire_in_the_hole_xbomb',
    tombstoneslaughter: 'tombstone_slaughter_el_gordos_revenge',
    sanquentin: 'san_quentin',
    deadwoodrip: 'deadwood_rip',
    deadwoodxnudge: 'deadwood',
    infectious5: 'infectious_5',
    xwayshoarder: 'xways_hoarder',
    xwayshoarder2: 'xways_hoarder_2',
  }
  const codeKey = String(code || '').toLowerCase()
  if (aliases[codeKey]) {
    for (const p of prefixes) ids.add(`${p}_${aliases[codeKey]}`)
  }
  return [...ids]
}

async function headOk(url) {
  try {
    const r = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
    return r.ok
  } catch {
    return false
  }
}

async function downloadAndCompress(url, slug) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'image/*,*/*' },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`avatar HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 200) throw new Error('avatar too small')
  const outFile = join(avatarDir, `${slug}.webp`)
  await sharp(buf)
    .resize(480, 640, { fit: 'cover', withoutEnlargement: true })
    .webp({ quality: 72, effort: 4 })
    .toFile(outFile)
  if (!existsSync(outFile)) throw new Error('avatar write failed')
  return `/avatars/${slug}.webp`
}

async function resolveAvatar(studio, name, code, slug) {
  const local = join(avatarDir, `${slug}.webp`)
  if (existsSync(local)) return `/avatars/${slug}.webp`

  for (const id of luckIds(studio, name, code)) {
    const url = `https://luckmedia.link/${id}/thumb_3_4_custom.webp`
    if (await headOk(url)) {
      try {
        return await downloadAndCompress(url, slug)
      } catch {
        /* try next */
      }
    }
  }

  const si = `https://www.slotindex.io/media/slots/${slug}.webp`
  if (await headOk(si)) return await downloadAndCompress(si, slug)

  throw new Error('no avatar')
}

function buildKeywords(name, provider, lang) {
  if (lang === 'ru') {
    return `${name} демо, ${name} играть бесплатно, ${name} слот, ${provider} демо, 1weapp`
  }
  return `${name} demo, play ${name} free, ${name} slot, ${provider} demo, 1weapp`
}

function buildSeo(game, provider, seed) {
  const { name, slug, rtp } = game
  const sampleSpins = 55 + (seed % 9) * 8
  const minutes = 8 + (seed % 6)
  const stake = pick(seed >>> 3, ['0.20–0.50', '0.40–1.00', '0.10–0.40', '0.25–0.75'])

  return {
    seoTextRu: [
      `Карточка «${name} демо» на 1weapp — слот ${name} от ${provider} без депозита. Откройте демо в браузере и оцените темп, бонусы и UI на телефоне.`,
      `Как играть в ${name} бесплатно: запустите демо здесь, возьмите виртуальную ставку около ${stake} и пройдите ~${sampleSpins} спинов (ориентир ${minutes} минут).`,
      `Ориентиры ${slug}: RTP около ${rtp}, провайдер ${provider}. Демо — официальный FUN-embed через playin.`,
      `После демо решите осознанно: если ${name} зашёл — можно продолжить на деньги через кнопку на странице. Только 18+, с лимитом сессии и без догона.`,
    ].join('\n\n'),
    seoTextEn: [
      `The “${name} demo” card on 1weapp covers ${name} by ${provider} with no deposit. Open the free demo in your browser and judge pace, bonuses and phone UI.`,
      `How to play ${name} for free: launch the demo here, pick a virtual stake around ${stake}, and run ~${sampleSpins} spins (about ${minutes} minutes).`,
      `Card cues for ${slug}: RTP around ${rtp}, provider ${provider}. Demo is an official FUN embed via playin.`,
      `After the demo, decide deliberately: if ${name} fits, continue for real money via the button on this page. 18+ only, set a session limit, never chase losses.`,
    ].join('\n\n'),
    descriptionSeoRu: `${name} демо бесплатно на 1weapp (/${slug}): ${provider}, RTP ${rtp}, без регистрации.`,
    descriptionSeoEn: `${name} demo free on 1weapp (/${slug}): ${provider}, RTP ${rtp}, no signup.`,
  }
}

function gameTypeFor(name) {
  if (/megaways/i.test(name)) return 'Megaways'
  return 'Slots'
}

async function mapPool(items, limit, fn) {
  const out = new Array(items.length)
  let i = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      out[idx] = await fn(items[idx], idx)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()))
  return out
}

async function main() {
  mkdirSync(avatarDir, { recursive: true })
  const existing = JSON.parse(readFileSync(dataPath, 'utf8'))
  const existingSlugs = new Set(existing.map((g) => g.slug))

  console.log('Fetching playin catalog…')
  const feed = await fetch(PLAYIN_FEED, {
    headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
  })
  if (!feed.ok) throw new Error(`playin feed ${feed.status}`)
  const catalog = await feed.json()
  if (!Array.isArray(catalog)) throw new Error('bad playin feed')

  const targets = catalog.filter((item) => {
    const studio = item?.studio
    if (!PROVIDER_LABEL[studio]) return false
    if (!item?.name || !item?.code || !item?.url) return false
    if (!shouldKeep(studio, item.name)) return false
    const slug = slugify(item.name)
    if (!slug || existingSlugs.has(slug)) return false
    if (!/^https:\/\/playin\.com\/embed\/v1\/demo\//i.test(item.url)) return false
    return true
  })

  console.log(`Candidates after quality filter: ${targets.length}`)
  const byStudio = {}
  for (const t of targets) byStudio[t.studio] = (byStudio[t.studio] || 0) + 1
  console.log(byStudio)

  const added = []
  let skippedAvatar = 0

  await mapPool(targets, CONCURRENCY, async (item, idx) => {
    const slug = slugify(item.name)
    const provider = PROVIDER_LABEL[item.studio]
    let avatar
    try {
      avatar = await resolveAvatar(item.studio, item.name, item.code, slug)
    } catch (e) {
      skippedAvatar++
      console.log(`skip avatar ${slug}: ${e.message || e}`)
      return
    }

    const rtp = '~96%'
    const seed = hashSeed(slug + '|' + item.name)
    const seo = buildSeo({ name: item.name, slug, rtp }, provider, seed)

    const rec = {
      slug,
      name: item.name,
      provider,
      iframeUrl: item.url,
      keywordsRu: buildKeywords(item.name, provider, 'ru'),
      keywordsEn: buildKeywords(item.name, provider, 'en'),
      seoTextRu: seo.seoTextRu,
      seoTextEn: seo.seoTextEn,
      avatar,
      rtp,
      gameType: gameTypeFor(item.name),
      descriptionSeoRu: seo.descriptionSeoRu,
      descriptionSeoEn: seo.descriptionSeoEn,
      titleSeoRu: `${item.name} демо — играть бесплатно | 1weapp`,
      titleSeoEn: `${item.name} Demo — Play Free | 1weapp`,
    }

    added.push(rec)
    existingSlugs.add(slug)
    if ((idx + 1) % 25 === 0 || idx === targets.length - 1) {
      console.log(`progress ${idx + 1}/${targets.length} added=${added.length} skipAvatar=${skippedAvatar}`)
    }
    await sleep(10)
  })

  // Stable order: existing + new sorted by provider then name
  added.sort((a, b) => a.provider.localeCompare(b.provider) || a.name.localeCompare(b.name))
  const merged = [...existing, ...added]
  writeFileSync(dataPath, JSON.stringify(merged, null, 2), 'utf8')

  const summary = {}
  for (const g of added) summary[g.provider] = (summary[g.provider] || 0) + 1
  console.log('\nAdded by provider:', summary)
  console.log(
    `Added ${added.length}. Skipped avatar=${skippedAvatar}. Total games: ${merged.length}`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
