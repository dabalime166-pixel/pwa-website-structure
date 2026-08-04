/**
 * Import Play'n GO catalog from slot.win (avatars + demo availability),
 * resolve free demos via Play'n GO ContainerLauncher, download luckmedia avatars.
 *
 * Usage: node scripts/import-slotwin-playngo.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dataPath = join(root, 'lib/games-data.json')
const avatarDir = join(root, 'public/avatars')

const PROVIDER_ID = 'png'
const PROVIDER_NAME = "Play'n GO"
const SLOTWIN_GAMES = 'https://api.slot.win/v1/slot-win/provider/get-provider-games'
const SLOTWIN_LAUNCH = 'https://api.slot.win/v1/slot-win/provider/launch-provider-game'
const CONCURRENCY = 8

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

function toSlug(providerGameId) {
  const raw = providerGameId.startsWith(`${PROVIDER_ID}_`)
    ? providerGameId.slice(PROVIDER_ID.length + 1)
    : providerGameId
  return raw.replace(/_/g, '-')
}

function toPlaynGoGid(providerGameId) {
  const raw = providerGameId.startsWith(`${PROVIDER_ID}_`)
    ? providerGameId.slice(PROVIDER_ID.length + 1)
    : providerGameId
  return raw.replace(/_/g, '')
}

function playnGoDemoUrl(gid) {
  return `https://asccw.playngonetwork.com/casino/ContainerLauncher?pid=2&gid=${encodeURIComponent(gid)}&lang=en_GB&practice=1&channel=desktop`
}

function buildKeywords(name, lang) {
  if (lang === 'ru') {
    return `${name} демо, ${name} играть бесплатно, ${name} слот, Play'n GO демо, 1weapp`
  }
  return `${name} demo, play ${name} free, ${name} slot, Play'n GO demo, 1weapp`
}

function buildSeo(game, seed) {
  const { name, slug, rtp } = game
  const sampleSpins = 55 + (seed % 9) * 8
  const minutes = 8 + (seed % 6)
  const stake = pick(seed >>> 3, ['0.20–0.50', '0.40–1.00', '0.10–0.40', '0.25–0.75'])

  return {
    seoTextRu: [
      `Карточка «${name} демо» на 1weapp — слот ${name} от Play'n GO без депозита. Откройте демо в браузере и оцените темп, бонусы и UI на телефоне.`,
      `Как играть в ${name} бесплатно: запустите демо здесь, возьмите виртуальную ставку около ${stake} и пройдите ~${sampleSpins} спинов (ориентир ${minutes} минут).`,
      `Ориентиры ${slug}: RTP около ${rtp}, провайдер Play'n GO. Аватар — luckmedia (каталог slot.win); демо — официальный FUN-режим Play'n GO.`,
      `После демо решите осознанно: если ${name} зашёл — можно продолжить на деньги через кнопку на странице. Только 18+, с лимитом сессии и без догона.`,
    ].join('\n\n'),
    seoTextEn: [
      `The “${name} demo” card on 1weapp covers ${name} by Play'n GO with no deposit. Open the free demo in your browser and judge pace, bonuses and phone UI.`,
      `How to play ${name} for free: launch the demo here, pick a virtual stake around ${stake}, and run ~${sampleSpins} spins (about ${minutes} minutes).`,
      `Card cues for ${slug}: RTP around ${rtp}, provider Play'n GO. Avatar from luckmedia (slot.win catalog); demo is official Play'n GO FUN mode.`,
      `After the demo, decide deliberately: if ${name} fits, continue for real money via the button on this page. 18+ only, set a session limit, never chase losses.`,
    ].join('\n\n'),
    descriptionSeoRu: `${name} демо бесплатно на 1weapp (/${slug}): Play'n GO, RTP ${rtp}, без регистрации.`,
    descriptionSeoEn: `${name} demo free on 1weapp (/${slug}): Play'n GO, RTP ${rtp}, no signup.`,
  }
}

async function fetchJson(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
      Origin: 'https://slot.win',
      Referer: 'https://slot.win/',
      'User-Agent': 'Mozilla/5.0',
    },
    body: JSON.stringify(body ?? {}),
  })
  if (!res.ok) throw new Error(`${url} HTTP ${res.status}`)
  return res.json()
}

async function demoWorks(url) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
    if (!res.ok) return false
    const text = await res.text()
    return text.length > 200
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

  console.log('Fetching slot.win catalog…')
  const catalog = await fetchJson(SLOTWIN_GAMES, {})
  const games = (catalog.games || []).filter(
    (g) => g.provider_id === PROVIDER_ID && g.is_demo_available && g.provider_game_id && g.title,
  )
  console.log(`Play'n GO with demo flag: ${games.length}`)

  const targets = games.filter((g) => !existingSlugs.has(toSlug(g.provider_game_id)))
  console.log(`New to import: ${targets.length}`)

  const added = []
  let skippedDemo = 0
  let skippedAvatar = 0

  await mapPool(targets, CONCURRENCY, async (item, idx) => {
    const slug = toSlug(item.provider_game_id)
    const gid = toPlaynGoGid(item.provider_game_id)
    const iframeUrl = playnGoDemoUrl(gid)

    const ok = await demoWorks(iframeUrl)
    if (!ok) {
      skippedDemo++
      console.log(`skip demo ${slug}`)
      return
    }

    let avatar
    try {
      avatar = await downloadAvatar(item.image_url, slug)
    } catch (e) {
      skippedAvatar++
      console.log(`skip avatar ${slug}: ${e.message || e}`)
      return
    }

    // Prefer official PNG launcher; keep slot.win launch URL as comment in keywords only if needed
    let launchUrl = iframeUrl
    try {
      const launched = await fetchJson(SLOTWIN_LAUNCH, {
        game_id: item.id,
        currency: 'USD',
        platform: 'desktop',
        demo_mode: true,
      })
      if (launched?.url && typeof launched.url === 'string') {
        // slot.win aggregator URL — store only if PNG direct already validated
        // Keep PNG direct as iframe (more reliable for embeds)
        launchUrl = iframeUrl
      }
    } catch {
      /* ignore */
    }

    const rtp = typeof item.rtp === 'number' ? `${item.rtp}%` : item.rtp || '~96%'
    const seed = hashSeed(slug + '|' + item.title)
    const seo = buildSeo({ name: item.title, slug, rtp }, seed)
    const gameType = (item.tags || []).includes('megaways') ? 'Megaways' : 'Slots'

    const rec = {
      slug,
      name: item.title,
      provider: PROVIDER_NAME,
      iframeUrl: launchUrl,
      keywordsRu: buildKeywords(item.title, 'ru'),
      keywordsEn: buildKeywords(item.title, 'en'),
      seoTextRu: seo.seoTextRu,
      seoTextEn: seo.seoTextEn,
      avatar,
      rtp,
      gameType,
      descriptionSeoRu: seo.descriptionSeoRu,
      descriptionSeoEn: seo.descriptionSeoEn,
      titleSeoRu: `${item.title} демо — играть бесплатно | 1weapp`,
      titleSeoEn: `${item.title} Demo — Play Free | 1weapp`,
    }

    added.push(rec)
    existingSlugs.add(slug)
    if ((idx + 1) % 25 === 0 || idx === targets.length - 1) {
      console.log(`progress ${idx + 1}/${targets.length} added=${added.length}`)
    }
    await sleep(20)
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
