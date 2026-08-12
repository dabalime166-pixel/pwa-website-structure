/**
 * Submit URLs to Yandex / IndexNow.
 *
 * Prerequisites:
 * 1. Key file is live: https://www.1weapp.online/<KEY>.txt
 * 2. KEY matches public/<KEY>.txt contents
 *
 * Usage:
 *   INDEXNOW_KEY=af09e23d29923067247adca2a3f1b739 node scripts/submit-indexnow.mjs
 *   INDEXNOW_KEY=... node scripts/submit-indexnow.mjs --all   # whole catalog EN+RU
 *   INDEXNOW_KEY=... node scripts/submit-indexnow.mjs --file scripts/indexnow-urls.json
 */
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const HOST = 'www.1weapp.online'
const BASE = `https://${HOST}`
const ENDPOINT = 'https://yandex.com/indexnow'

function resolveKey() {
  if (process.env.INDEXNOW_KEY) return process.env.INDEXNOW_KEY.trim()
  const local = join(root, '.indexnow-key')
  if (existsSync(local)) return readFileSync(local, 'utf8').trim()
  const files = readdirSync(join(root, 'public')).filter((f) => /^[a-f0-9]{8,128}\.txt$/i.test(f))
  if (files[0]) return files[0].replace(/\.txt$/i, '')
  throw new Error('Set INDEXNOW_KEY or keep public/<key>.txt in the repo')
}

function urlsFromArgs(key) {
  const args = process.argv.slice(2)
  if (args.includes('--all')) {
    const games = JSON.parse(readFileSync(join(root, 'lib/games-data.json'), 'utf8'))
    const urls = []
    for (const g of games) {
      urls.push(`${BASE}/en/${g.slug}`)
      urls.push(`${BASE}/ru/${g.slug}`)
    }
    urls.push(`${BASE}/`, `${BASE}/ru`, `${BASE}/en/guides`, `${BASE}/ru/guides`)
    return urls
  }
  const fileFlag = args.indexOf('--file')
  if (fileFlag >= 0 && args[fileFlag + 1]) {
    return JSON.parse(readFileSync(join(root, args[fileFlag + 1]), 'utf8'))
  }
  const preset = join(__dirname, 'indexnow-urls.json')
  if (existsSync(preset)) return JSON.parse(readFileSync(preset, 'utf8'))

  // fallback: diff vs main
  const main = JSON.parse(execSync('git show main:lib/games-data.json', { encoding: 'utf8', cwd: root }))
  const now = JSON.parse(readFileSync(join(root, 'lib/games-data.json'), 'utf8'))
  const base = new Set(main.map((g) => g.slug))
  const added = now.map((g) => g.slug).filter((s) => !base.has(s)).sort()
  const urls = []
  for (const s of added) {
    urls.push(`${BASE}/en/${s}`)
    urls.push(`${BASE}/ru/${s}`)
  }
  return urls
}

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

async function submitBatch(key, urlList) {
  const body = {
    host: HOST,
    key,
    keyLocation: `${BASE}/${key}.txt`,
    urlList,
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  return { status: res.status, text }
}

async function main() {
  const key = resolveKey()
  const keyUrl = `${BASE}/${key}.txt`
  console.log('Key:', key)
  console.log('Key URL:', keyUrl)

  const probe = await fetch(keyUrl, { redirect: 'follow' })
  const probeText = (await probe.text()).trim()
  if (!probe.ok || probeText !== key) {
    console.error(`\nKey file is not live yet (HTTP ${probe.status}, body="${probeText.slice(0, 40)}").`)
    console.error('Deploy public/' + key + '.txt to production, then re-run:')
    console.error(`  INDEXNOW_KEY=${key} node scripts/submit-indexnow.mjs`)
    process.exit(2)
  }

  const urls = [...new Set(urlsFromArgs(key))]
  console.log(`Submitting ${urls.length} URLs to ${ENDPOINT}…`)

  // Yandex IndexNow: up to 10_000 URLs/day; keep batches comfortable
  const batches = chunk(urls, 9000)
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i]
    const { status, text } = await submitBatch(key, batch)
    console.log(`Batch ${i + 1}/${batches.length}: ${batch.length} URLs → HTTP ${status} ${text.slice(0, 200)}`)
    if (status !== 200 && status !== 202) {
      process.exit(1)
    }
  }
  console.log('Done.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
