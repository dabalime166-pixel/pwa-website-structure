/**
 * Import missing Pragmatic Play titles that have both a real demo and an avatar.
 * Source: SlotIndex catalog → demogamesfree.pragmaticplay.net + SlotIndex thumbs.
 *
 * Usage: node scripts/import-pragmatic-missing.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dataPath = join(root, 'lib/games-data.json')
const outDir = join(root, 'public/avatars')

const SITE = 'https://www.1weapp.online'
const PROVIDER = 'Pragmatic Play'
const PROVIDER_SLUG = 'pragmatic-play'

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

function buildKeywords(name, lang) {
  if (lang === 'ru') {
    return `${name} демо, ${name} играть бесплатно, ${name} слот, Pragmatic Play демо, 1weapp`
  }
  return `${name} demo, play ${name} free, ${name} slot, Pragmatic Play demo, 1weapp`
}

function buildSeo(game, seed) {
  const { name, slug, rtp, volatility } = game
  const sampleSpins = 55 + (seed % 9) * 8
  const minutes = 8 + (seed % 6)
  const stake = pick(seed >>> 3, ['0.20–0.50', '0.40–1.00', '0.10–0.40', '0.25–0.75'])

  const seoTextRu = [
    `Карточка «${name} демо» на 1weapp — разбор слота ${name} от Pragmatic Play без депозита. Откройте ${name} бесплатно в браузере и оцените темп, бонусы и UI на телефоне.`,
    `Как играть в ${name} бесплатно: запустите демо здесь, возьмите виртуальную ставку около ${stake} и пройдите ~${sampleSpins} спинов (ориентир ${minutes} минут). Зафиксируйте сухие серии и первый бонус.`,
    `Ориентиры ${slug}: RTP около ${rtp}, волатильность ${volatility}, провайдер Pragmatic Play. Демо открывается напрямую с demogamesfree.pragmaticplay.net.`,
    `После демо решите осознанно: если ${name} зашёл — можно продолжить на деньги через кнопку на странице. Только 18+, с лимитом сессии и без догона.`,
  ].join('\n\n')

  const seoTextEn = [
    `The “${name} demo” card on 1weapp walks through ${name} by Pragmatic Play with no deposit. Open ${name} for free in the browser and judge pace, bonuses and phone UI.`,
    `How to play ${name} for free: launch the demo here, pick a virtual stake around ${stake}, and run ~${sampleSpins} spins (about ${minutes} minutes). Log dry stretches and the first bonus.`,
    `Card cues for ${slug}: RTP around ${rtp}, volatility ${volatility}, provider Pragmatic Play. Demo launches directly from demogamesfree.pragmaticplay.net.`,
    `After the demo, decide deliberately: if ${name} fits, continue for real money via the button on this page. 18+ only, set a session limit, never chase losses.`,
  ].join('\n\n')

  return {
    seoTextRu,
    seoTextEn,
    descriptionSeoRu: `${name} демо бесплатно на 1weapp: Pragmatic Play, RTP ${rtp}, без регистрации.`,
    descriptionSeoEn: `${name} demo free on 1weapp: Pragmatic Play, RTP ${rtp}, no signup.`,
  }
}

function rewriteDemoUrl(loc) {
  try {
    const u = new URL(loc)
    if (!/demogamesfree\.pragmaticplay\.net/i.test(u.hostname)) return null
    u.searchParams.set('websiteUrl', SITE)
    u.searchParams.set('lobbyUrl', SITE)
    u.searchParams.set('lobby_url', SITE)
    u.searchParams.set('lang', 'en')
    u.searchParams.set('cur', 'USD')
    return u.toString()
  } catch {
    return null
  }
}

async function resolveDemo(slug) {
  const dr = await fetch(`https://demo.slotindex.io/api/demo/${slug}`, {
    redirect: 'manual',
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })
  const loc = dr.headers.get('location') || ''
  if (!loc) return null
  return rewriteDemoUrl(loc)
}

async function downloadAvatar(slug) {
  const url = `https://www.slotindex.io/media/slots/${slug}.webp`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'image/*,*/*' },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`avatar HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length < 500) throw new Error(`avatar too small ${buf.length}`)

  mkdirSync(outDir, { recursive: true })
  const outFile = join(outDir, `${slug}.webp`)
  await sharp(buf)
    .rotate()
    .resize(400, 520, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 72, effort: 4 })
    .toFile(outFile)

  if (!existsSync(outFile)) throw new Error('avatar write failed')
  return `/avatars/${slug}.webp`
}

async function main() {
  const existing = JSON.parse(readFileSync(dataPath, 'utf8'))
  const existingSlugs = new Set(existing.map((g) => g.slug))

  const catalogRes = await fetch(
    `https://www.slotindex.io/api/slots?provider=${PROVIDER_SLUG}&limit=200`,
    { headers: { Accept: 'application/json', 'User-Agent': 'Mozilla/5.0' } },
  )
  if (!catalogRes.ok) throw new Error(`catalog ${catalogRes.status}`)
  const catalog = await catalogRes.json()
  if (!Array.isArray(catalog)) throw new Error('bad catalog')

  const targets = catalog.filter((item) => item?.slug && item.has_demo && !existingSlugs.has(item.slug))
  console.log(`Candidates: ${targets.length} (catalog ${catalog.length}, ours already ${[...existingSlugs].filter((s) => existing.find((g) => g.slug === s && /pragmatic/i.test(g.provider))).length})`)

  const added = []
  let skipped = 0

  for (let i = 0; i < targets.length; i++) {
    const item = targets[i]
    process.stdout.write(`[${i + 1}/${targets.length}] ${item.slug} … `)
    try {
      const iframeUrl = await resolveDemo(item.slug)
      await sleep(40)
      if (!iframeUrl) {
        skipped++
        console.log('skip (no pragmatic demo)')
        continue
      }
      const avatar = await downloadAvatar(item.slug)
      const rtp = typeof item.rtp === 'number' ? `${item.rtp}%` : item.rtp || '~96%'
      const volatility = item.volatility || 'medium'
      const seed = hashSeed(item.slug + '|' + item.name)
      const seo = buildSeo({ name: item.name, slug: item.slug, rtp, volatility }, seed)
      const gameType = item.subtype === 'Megaways' ? 'Megaways' : 'Slots'

      added.push({
        slug: item.slug,
        name: item.name,
        provider: PROVIDER,
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
      })
      existingSlugs.add(item.slug)
      console.log('OK')
    } catch (e) {
      skipped++
      console.log('skip', e.message || e)
    }
  }

  const merged = [...existing, ...added]
  writeFileSync(dataPath, JSON.stringify(merged, null, 2) + '\n', 'utf8')
  console.log(`\nAdded ${added.length}, skipped ${skipped}. Total games: ${merged.length}`)
  console.log(
    'Pragmatic total:',
    merged.filter((g) => /pragmatic/i.test(g.provider)).length,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
