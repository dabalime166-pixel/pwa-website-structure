/**
 * Download all game avatars into public/avatars and rewrite games-data.json
 * to local /avatars/{slug}.{ext} paths.
 *
 * Usage: node scripts/download-avatars.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const dataPath = join(root, 'lib/games-data.json')
const outDir = join(root, 'public/avatars')

function extFrom(url, contentType) {
  const m = url.toLowerCase().match(/\.(webp|png|jpe?g|gif|svg)(?:\?|$)/)
  if (m) return m[1] === 'jpeg' ? 'jpg' : m[1]
  if (contentType?.includes('webp')) return 'webp'
  if (contentType?.includes('png')) return 'png'
  if (contentType?.includes('jpeg') || contentType?.includes('jpg')) return 'jpg'
  return 'webp'
}

mkdirSync(outDir, { recursive: true })
const games = JSON.parse(readFileSync(dataPath, 'utf8'))

let ok = 0
let fail = 0

for (const g of games) {
  const url = g.avatar
  if (!url || url.startsWith('/avatars/')) {
    // Already local — still try to refresh if absolute source missing
    if (url?.startsWith('/avatars/')) {
      ok++
      continue
    }
    fail++
    console.log(`x ${g.slug} empty avatar`)
    continue
  }

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'image/*,*/*' },
      redirect: 'follow',
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 100) throw new Error(`too small ${buf.length}`)
    const ext = extFrom(url, res.headers.get('content-type') || '')
    const file = `${g.slug}.${ext}`
    writeFileSync(join(outDir, file), buf)
    g.avatar = `/avatars/${file}`
    ok++
    console.log(`+ ${ok} ${g.slug}`)
  } catch (e) {
    fail++
    console.log(`x ${g.slug} ${e.message || e}`)
  }
}

writeFileSync(dataPath, JSON.stringify(games, null, 2))
console.log(`Done: ok=${ok} fail=${fail} total=${games.length}`)
