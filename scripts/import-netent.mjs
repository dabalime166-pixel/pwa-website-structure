/**
 * Import full NetEnt catalog:
 * - demos via SlotIndex → playin.com embeds (stable)
 * - avatars from luckmedia (ntn_*) with SlotIndex fallback
 *
 * Usage: node scripts/import-netent.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dataPath = join(root, 'lib/games-data.json')
const avatarDir = join(root, 'public/avatars')

const PROVIDER_NAME = 'NetEnt'
const PREFIX = 'ntn'
const CONCURRENCY = 6

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

function softswissId(slug) {
  return `${PREFIX}_${slug.replace(/-/g, '_')}`
}

function luckmediaAvatar(slug) {
  return `https://luckmedia.link/${softswissId(slug)}/thumb_3_4_custom.webp`
}

function slotindexThumb(slug) {
  return `https://www.slotindex.io/media/slots/${slug}.webp`
}

function buildKeywords(name, lang) {
  if (lang === 'ru') {
    return `${name} демо, ${name} играть бесплатно, ${name} слот, NetEnt демо, 1weapp`
  }
  return `${name} demo, play ${name} free, ${name} slot, NetEnt demo, 1weapp`
}

function buildSeo(game, seed) {
  const { name, slug, rtp } = game
  const sampleSpins = 55 + (seed % 9) * 8
  const minutes = 8 + (seed % 6)
  const stake = pick(seed >>> 3, ['0.20–0.50', '0.40–1.00', '0.10–0.40', '0.25–0.75'])

  return {
    seoTextRu: [
      `Карточка «${name} демо» на 1weapp — слот ${name} от NetEnt без депозита. Откройте демо в браузере и оцените темп, бонусы и UI на телефоне.`,
      `Как играть в ${name} бесплатно: запустите демо здесь, возьмите виртуальную ставку около ${stake} и пройдите ~${sampleSpins} спинов (ориентир ${minutes} минут).`,
      `Ориентиры ${slug}: RTP около ${rtp}, провайдер NetEnt. Аватар — luckmedia; демо — стабильный FUN-embed.`,
      `После демо решите осознанно: если ${name} зашёл — можно продолжить на деньги через кнопку на странице. Только 18+, с лимитом сессии и без догона.`,
    ].join('\n\n'),
    seoTextEn: [
      `The “${name} demo” card on 1weapp covers ${name} by NetEnt with no deposit. Open the free demo in your browser and judge pace, bonuses and phone UI.`,
      `How to play ${name} for free: launch the demo here, pick a virtual stake around ${stake}, and run ~${sampleSpins} spins (about ${minutes} minutes).`,
      `Card cues for ${slug}: RTP around ${rtp}, provider NetEnt. Avatar from luckmedia; demo is a stable FUN embed.`,
      `After the demo, decide deliberately: if ${name} fits, continue for real money via the button on this page. 18+ only, set a session limit, never chase losses.`,
    ].join('\n\n'),
    descriptionSeoRu: `${name} демо бесплатно на 1weapp (/${slug}): NetEnt, RTP ${rtp}, без регистрации.`,
    descriptionSeoEn: `${name} demo free on 1weapp (/${slug}): NetEnt, RTP ${rtp}, no signup.`,
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

async function downloadAvatar(url, slug) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'image/*,*/*' },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`avatar HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 200) throw new Error('avatar too small')
  const file = `${slug}.webp`
  writeFileSync(join(avatarDir, file), buf)
  return `/avatars/${file}`
}

async function resolveAvatar(slug) {
  const local = join(avatarDir, `${slug}.webp`)
  if (existsSync(local)) return `/avatars/${slug}.webp`

  const luck = luckmediaAvatar(slug)
  if (await headOk(luck)) {
    try {
      return await downloadAvatar(luck, slug)
    } catch {
      /* fall through */
    }
  }
  const si = slotindexThumb(slug)
  return await downloadAvatar(si, slug)
}

async function resolveIframe(slug) {
  try {
    const dr = await fetch(`https://demo.slotindex.io/api/demo/${slug}`, { redirect: 'manual' })
    const loc = dr.headers.get('location') || ''
    if (!loc) return null
    if (/playamo|stake\.games|sol\.casino|bitcoincasino/i.test(loc)) return null
    if (/playin\.com\/embed/i.test(loc)) return loc
    return null
  } catch {
    return null
  }
}

async function fetchCatalogPage(offset) {
  const r = await fetch(
    `https://www.slotindex.io/api/slots?provider=netent&limit=200&offset=${offset}`,
  )
  if (!r.ok) throw new Error(`SlotIndex netent ${r.status}`)
  const data = await r.json()
  if (!Array.isArray(data)) throw new Error('Bad NetEnt catalog')
  return data
}

async function fetchAllCatalog() {
  const first = await fetchCatalogPage(0)
  const second = await fetchCatalogPage(200)
  const bySlug = new Map()
  for (const item of [...first, ...second]) {
    if (!item?.slug || !item?.name) continue
    if (item.has_demo === false) continue
    bySlug.set(item.slug, item)
  }
  return [...bySlug.values()]
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

  console.log('Fetching SlotIndex NetEnt catalog…')
  const catalog = await fetchAllCatalog()
  console.log(`NetEnt titles: ${catalog.length}`)

  const targets = catalog.filter((g) => !existingSlugs.has(g.slug))
  console.log(`New to import: ${targets.length}`)

  const added = []
  let skippedDemo = 0
  let skippedAvatar = 0

  await mapPool(targets, CONCURRENCY, async (item, idx) => {
    const iframeUrl = await resolveIframe(item.slug)
    if (!iframeUrl) {
      skippedDemo++
      console.log(`skip demo ${item.slug}`)
      return
    }

    let avatar
    try {
      avatar = await resolveAvatar(item.slug)
    } catch (e) {
      skippedAvatar++
      console.log(`skip avatar ${item.slug}: ${e.message || e}`)
      return
    }

    const rtp = typeof item.rtp === 'number' ? `${item.rtp}%` : item.rtp || '~96%'
    const seed = hashSeed(item.slug + '|' + item.name)
    const seo = buildSeo({ name: item.name, slug: item.slug, rtp }, seed)
    const gameType =
      item.subtype === 'Megaways' || /megaways/i.test(item.name) ? 'Megaways' : 'Slots'

    const rec = {
      slug: item.slug,
      name: item.name,
      provider: PROVIDER_NAME,
      iframeUrl,
      keywordsRu: buildKeywords(item.name, 'ru'),
      keywordsEn: buildKeywords(item.name, 'en'),
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

    added.push(rec)
    existingSlugs.add(item.slug)
    if ((idx + 1) % 20 === 0 || idx === targets.length - 1) {
      console.log(`progress ${idx + 1}/${targets.length} added=${added.length}`)
    }
    await sleep(15)
  })

  const merged = [...existing, ...added]
  writeFileSync(dataPath, JSON.stringify(merged, null, 2), 'utf8')
  console.log(
    `\nAdded ${added.length}. Skipped demo=${skippedDemo} avatar=${skippedAvatar}. Total games: ${merged.length}`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
