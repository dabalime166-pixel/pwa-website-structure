/**
 * Import 50 BGaming slots with:
 * - avatars from luckmedia.link (same SoftSwiss CDN used by slot.win)
 * - iframe demos resolved via SlotIndex → demo.bgaming-network.com
 *
 * Usage: node scripts/import-bgaming-slots.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataPath = join(__dirname, '../lib/games-data.json')
const TARGET = 50
const PROVIDER = 'BGaming'
const SKIP_SLUGS = new Set(['classic-multihand-blackjack', 'dragons-crash'])

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
  return `bgm_${slug.replace(/-/g, '_')}`
}

function luckmediaAvatar(slug) {
  return `https://luckmedia.link/${softswissId(slug)}/thumb_3_4_custom.webp`
}

function slotindexThumb(slug) {
  return `https://www.slotindex.io/media/slots/${slug}.webp`
}

function isGoodDemo(url) {
  return /bgaming-network\.com\/(play|games)\//i.test(url)
}

function buildKeywords(name, lang) {
  if (lang === 'ru') {
    return `${name} демо, ${name} играть бесплатно, ${name} слот, BGaming демо, 1weapp`
  }
  return `${name} demo, play ${name} free, ${name} slot, BGaming demo, 1weapp`
}

function buildSeo(game, seed) {
  const name = game.name
  const slug = game.slug
  const rtp = game.rtp || '~96%'
  const vol = game.volatility || 'medium'
  const sampleSpins = 55 + (seed % 9) * 8
  const minutes = 8 + (seed % 6)
  const stake = pick(seed >>> 3, ['0.20–0.50', '0.40–1.00', '0.10–0.40', '0.25–0.75'])

  const seoTextRu = [
    `Карточка «${name} демо» на 1weapp — отдельный разбор слота ${name} от BGaming без депозита. Откройте ${name} бесплатно в браузере и оцените темп, бонусы и удобство интерфейса на телефоне.`,
    `Как играть в ${name} бесплатно: запустите демо на этой странице, возьмите виртуальную ставку около ${stake} и пройдите ~${sampleSpins} спинов (ориентир ${minutes} минут). Запишите длину сухих серий и момент первого бонуса.`,
    `Ориентиры карточки ${slug}: RTP около ${rtp}, волатильность ${vol}, провайдер BGaming. Аватар взят с той же SoftSwiss/luckmedia CDN, что используют казино-каталоги вроде slot.win; демо — официальный FUN-режим BGaming.`,
    `После демо решите осознанно: если формат ${name} зашёл — можно продолжить на деньги через кнопку на странице. Только 18+, с лимитом сессии и без догона проигрыша.`,
  ].join('\n\n')

  const seoTextEn = [
    `The “${name} demo” card on 1weapp is a focused walkthrough of ${name} by BGaming with no deposit. Open ${name} for free in the browser and judge pace, bonuses and phone UI comfort.`,
    `How to play ${name} for free: launch the demo here, pick a virtual stake around ${stake}, and run ~${sampleSpins} spins (about ${minutes} minutes). Log dry-stretch length and the first bonus hit.`,
    `Card cues for ${slug}: RTP around ${rtp}, volatility ${vol}, provider BGaming. The avatar uses the same SoftSwiss/luckmedia CDN casino catalogs like slot.win rely on; the iframe is the official BGaming FUN demo.`,
    `After the demo, decide deliberately: if ${name} fits, continue for real money via the button on this page. 18+ only, set a session limit, and never chase losses.`,
  ].join('\n\n')

  const descriptionSeoRu = `${name} демо бесплатно на 1weapp (/${slug}): BGaming, RTP ${rtp}, без регистрации. Официальное FUN-демо в браузере.`
  const descriptionSeoEn = `${name} demo free on 1weapp (/${slug}): BGaming, RTP ${rtp}, no signup. Official FUN demo in your browser.`

  return { seoTextRu, seoTextEn, descriptionSeoRu, descriptionSeoEn }
}

async function headOk(url) {
  try {
    const r = await fetch(url, { method: 'HEAD', redirect: 'follow' })
    return r.ok
  } catch {
    return false
  }
}

async function resolveDemo(slug) {
  const r = await fetch(`https://demo.slotindex.io/api/demo/${slug}`, { redirect: 'manual' })
  const loc = r.headers.get('location') || ''
  return loc
}

async function fetchBgamingCatalog() {
  const r = await fetch('https://www.slotindex.io/api/slots?provider=bgaming&limit=200')
  if (!r.ok) throw new Error(`SlotIndex API ${r.status}`)
  const data = await r.json()
  if (!Array.isArray(data)) throw new Error('Unexpected SlotIndex payload')
  return data
}

async function main() {
  const existing = JSON.parse(readFileSync(dataPath, 'utf8'))
  const existingSlugs = new Set(existing.map((g) => g.slug))

  console.log(`Existing games: ${existing.length}`)
  const catalog = await fetchBgamingCatalog()
  console.log(`BGaming catalog: ${catalog.length}`)

  const picked = []
  for (const item of catalog) {
    if (picked.length >= TARGET) break
    if (!item?.slug || !item.has_demo) continue
    if (existingSlugs.has(item.slug) || SKIP_SLUGS.has(item.slug)) continue
    if ((item.game_type || 'slot') !== 'slot') continue

    const demo = await resolveDemo(item.slug)
    await sleep(40)
    if (!isGoodDemo(demo)) {
      console.log(`skip demo ${item.slug}`)
      continue
    }

    let avatar = luckmediaAvatar(item.slug)
    if (!(await headOk(avatar))) {
      avatar = slotindexThumb(item.slug)
      if (!(await headOk(avatar))) {
        console.log(`skip avatar ${item.slug}`)
        continue
      }
    }

    const rtp =
      typeof item.rtp === 'number' ? `${item.rtp}%` : item.rtp || '~96%'
    const seed = hashSeed(item.slug + '|' + item.name)
    const seo = buildSeo(
      { name: item.name, slug: item.slug, rtp, volatility: item.volatility || 'medium' },
      seed,
    )

    picked.push({
      slug: item.slug,
      name: item.name,
      provider: PROVIDER,
      iframeUrl: demo,
      keywordsRu: buildKeywords(item.name, 'ru'),
      keywordsEn: buildKeywords(item.name, 'en'),
      seoTextRu: seo.seoTextRu,
      seoTextEn: seo.seoTextEn,
      avatar,
      rtp,
      gameType: item.subtype === 'Megaways' ? 'Megaways' : 'Slots',
      descriptionSeoRu: seo.descriptionSeoRu,
      descriptionSeoEn: seo.descriptionSeoEn,
      titleSeoRu: `${item.name} демо — играть бесплатно | 1weapp`,
      titleSeoEn: `${item.name} Demo — Play Free | 1weapp`,
    })
    console.log(`+ ${picked.length}/${TARGET} ${item.slug}`)
  }

  if (picked.length < TARGET) {
    console.warn(`Only collected ${picked.length}/${TARGET}`)
  }

  const merged = [...existing, ...picked]
  writeFileSync(dataPath, JSON.stringify(merged, null, 2), 'utf8')
  console.log(`Wrote ${merged.length} games (${picked.length} new BGaming)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
