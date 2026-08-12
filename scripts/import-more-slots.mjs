/**
 * Import remaining BGaming + full Hacksaw Gaming catalog.
 * Avatars: luckmedia (slot.win CDN) → SlotIndex media fallback
 * Iframes: direct provider demo → SlotIndex embed fallback
 *
 * Usage: node scripts/import-more-slots.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataPath = join(__dirname, '../lib/games-data.json')

const JOBS = [
  { providerSlug: 'bgaming', providerName: 'BGaming', prefix: 'bgm', mode: 'missing' },
  { providerSlug: 'hacksaw-gaming', providerName: 'Hacksaw Gaming', prefix: 'hcw', mode: 'all' },
]

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

function toPascal(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('')
}

function softswissId(prefix, slug) {
  return `${prefix}_${slug.replace(/-/g, '_')}`
}

function luckmediaAvatar(prefix, slug) {
  return `https://luckmedia.link/${softswissId(prefix, slug)}/thumb_3_4_custom.webp`
}

function slotindexThumb(slug) {
  return `https://www.slotindex.io/media/slots/${slug}.webp`
}

function buildKeywords(name, provider, lang) {
  if (lang === 'ru') {
    return `${name} демо, ${name} играть бесплатно, ${name} слот, ${provider} демо, 1weapp`
  }
  return `${name} demo, play ${name} free, ${name} slot, ${provider} demo, 1weapp`
}

function buildSeo(game, provider, seed) {
  const { name, slug, rtp, volatility } = game
  const sampleSpins = 55 + (seed % 9) * 8
  const minutes = 8 + (seed % 6)
  const stake = pick(seed >>> 3, ['0.20–0.50', '0.40–1.00', '0.10–0.40', '0.25–0.75'])

  const seoTextRu = [
    `Карточка «${name} демо» на 1weapp — разбор слота ${name} от ${provider} без депозита. Откройте ${name} бесплатно в браузере и оцените темп, бонусы и UI на телефоне.`,
    `Как играть в ${name} бесплатно: запустите демо здесь, возьмите виртуальную ставку около ${stake} и пройдите ~${sampleSpins} спинов (ориентир ${minutes} минут). Зафиксируйте сухие серии и первый бонус.`,
    `Ориентиры ${slug}: RTP около ${rtp}, волатильность ${volatility}, провайдер ${provider}. Аватар — SoftSwiss/luckmedia (как у каталогов вроде slot.win); демо проверено через SlotIndex.`,
    `После демо решите осознанно: если ${name} зашёл — можно продолжить на деньги через кнопку на странице. Только 18+, с лимитом сессии и без догона.`,
  ].join('\n\n')

  const seoTextEn = [
    `The “${name} demo” card on 1weapp walks through ${name} by ${provider} with no deposit. Open ${name} for free in the browser and judge pace, bonuses and phone UI.`,
    `How to play ${name} for free: launch the demo here, pick a virtual stake around ${stake}, and run ~${sampleSpins} spins (about ${minutes} minutes). Log dry stretches and the first bonus.`,
    `Card cues for ${slug}: RTP around ${rtp}, volatility ${volatility}, provider ${provider}. Avatar from SoftSwiss/luckmedia (same CDN style as slot.win catalogs); demo validated via SlotIndex.`,
    `After the demo, decide deliberately: if ${name} fits, continue for real money via the button on this page. 18+ only, set a session limit, never chase losses.`,
  ].join('\n\n')

  return {
    seoTextRu,
    seoTextEn,
    descriptionSeoRu: `${name} демо бесплатно на 1weapp (/${slug}): ${provider}, RTP ${rtp}, без регистрации.`,
    descriptionSeoEn: `${name} demo free on 1weapp (/${slug}): ${provider}, RTP ${rtp}, no signup.`,
  }
}

async function headOk(url) {
  try {
    const r = await fetch(url, { method: 'HEAD', redirect: 'follow' })
    return r.ok
  } catch {
    return false
  }
}

async function getOk(url) {
  try {
    const r = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
    if (!r.ok) return false
    if (/playamo|stake\.games|sol\.casino|bitcoincasino/i.test(r.url)) return false
    const t = await r.text()
    return t.length > 500
  } catch {
    return false
  }
}

const CASINO_ONLY = /playamo|stake\.games|sol\.casino|bitcoincasino/i

function isDirectProviderDemo(url, providerSlug) {
  if (!url) return false
  if (CASINO_ONLY.test(url)) return false
  if (providerSlug === 'bgaming') {
    return /bgaming-network\.com\/(play|games)\//i.test(url) || /bgaming-system\.com\/launch_demo/i.test(url)
  }
  if (providerSlug === 'hacksaw-gaming') {
    return /hacksawgaming\.com/i.test(url)
  }
  return /^https?:\/\//i.test(url)
}

/** @returns {Promise<string|null>} iframe URL or null if no real demo */
async function resolveIframe(item, providerSlug) {
  try {
    const dr = await fetch(`https://demo.slotindex.io/api/demo/${item.slug}`, { redirect: 'manual' })
    const loc = dr.headers.get('location') || ''
    if (isDirectProviderDemo(loc, providerSlug) && (await getOk(loc))) return loc
    // Casino funnel only — skip this title
    if (loc && CASINO_ONLY.test(loc)) return null
  } catch {
    /* fall through */
  }

  if (providerSlug === 'bgaming') {
    const pascal = toPascal(item.slug)
    const candidates = [
      `https://demo.bgaming-network.com/play/${pascal}/FUN?server=demo`,
      `https://bgaming-network.com/play/${pascal}/FUN?server=demo`,
    ]
    for (const u of candidates) {
      if (await getOk(u)) return u
    }
    return null
  }

  if (providerSlug === 'hacksaw-gaming') {
    // No provider URL resolved — skip rather than fake a casino embed
    return null
  }

  return null
}

async function resolveAvatar(prefix, slug) {
  const luck = luckmediaAvatar(prefix, slug)
  if (await headOk(luck)) return luck
  const si = slotindexThumb(slug)
  if (await headOk(si)) return si
  return luck // keep luckmedia path; download step may still get slotindex
}

async function fetchCatalog(providerSlug) {
  const r = await fetch(`https://www.slotindex.io/api/slots?provider=${providerSlug}&limit=200`)
  if (!r.ok) throw new Error(`SlotIndex ${providerSlug} ${r.status}`)
  const data = await r.json()
  if (!Array.isArray(data)) throw new Error(`Bad catalog for ${providerSlug}`)
  return data
}

function toGameRecord(item, providerName, prefix, iframeUrl, avatar) {
  const rtp = typeof item.rtp === 'number' ? `${item.rtp}%` : item.rtp || '~96%'
  const volatility = item.volatility || 'medium'
  const seed = hashSeed(item.slug + '|' + item.name)
  const seo = buildSeo(
    { name: item.name, slug: item.slug, rtp, volatility },
    providerName,
    seed,
  )
  const gameType =
    item.subtype === 'Megaways'
      ? 'Megaways'
      : /crash/i.test(item.name + (item.subtype || ''))
        ? 'Crash Games'
        : 'Slots'

  return {
    slug: item.slug,
    name: item.name,
    provider: providerName,
    iframeUrl,
    keywordsRu: buildKeywords(item.name, providerName, 'ru'),
    keywordsEn: buildKeywords(item.name, providerName, 'en'),
    seoTextRu: seo.seoTextRu,
    seoTextEn: seo.seoTextEn,
    avatar,
    rtp,
    gameType,
    descriptionSeoRu: seo.descriptionSeoRu,
    descriptionSeoEn: seo.descriptionSeoEn,
    titleSeoRu: `${item.name} демо — играть бесплатно | 1weapp`,
    titleSeoEn: `${item.name} Demo — Play Free | 1weapp`,
  }
}

async function main() {
  const existing = JSON.parse(readFileSync(dataPath, 'utf8'))
  const existingSlugs = new Set(existing.map((g) => g.slug))
  const added = []

  for (const job of JOBS) {
    const catalog = await fetchCatalog(job.providerSlug)
    const targets = catalog.filter((item) => {
      if (!item?.slug || !item.has_demo) return false
      if (existingSlugs.has(item.slug)) return false
      return true
    })
    console.log(`\n=== ${job.providerName}: ${targets.length} to import (catalog ${catalog.length}) ===`)

    let i = 0
    let skippedNoDemo = 0
    for (const item of targets) {
      i++
      const iframeUrl = await resolveIframe(item, job.providerSlug)
      await sleep(30)
      if (!iframeUrl) {
        skippedNoDemo++
        console.log(`skip no-demo ${item.slug}`)
        continue
      }
      const avatar = await resolveAvatar(job.prefix, item.slug)
      const rec = toGameRecord(item, job.providerName, job.prefix, iframeUrl, avatar)
      added.push(rec)
      existingSlugs.add(item.slug)
      console.log(`+ ${i}/${targets.length} ${item.slug}`)
    }
    console.log(`Skipped no-demo: ${skippedNoDemo}`)
  }

  const merged = [...existing, ...added]
  writeFileSync(dataPath, JSON.stringify(merged, null, 2), 'utf8')
  console.log(`\nAdded ${added.length}. Total games: ${merged.length}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
