/**
 * Smoke-check demo iframes (HEAD/GET) and report broken URLs.
 * Usage: node scripts/check-iframes.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const games = JSON.parse(readFileSync(join(root, 'lib/games-data.json'), 'utf8'))

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function check(url) {
  try {
    const ctrl = AbortSignal.timeout(12000)
    let r = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: ctrl, headers: { 'User-Agent': '1weapp-iframe-check/1.0' } })
    if (r.status === 405 || r.status === 501) {
      r = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(12000), headers: { 'User-Agent': '1weapp-iframe-check/1.0' } })
    }
    return { ok: r.ok, status: r.status, final: r.url }
  } catch (e) {
    return { ok: false, status: 0, error: String(e.message || e) }
  }
}

const withIframe = games.filter((g) => g.iframeUrl)
const broken = []
let i = 0
for (const g of withIframe) {
  i++
  const res = await check(g.iframeUrl)
  const mark = res.ok ? 'OK' : 'FAIL'
  if (!res.ok) broken.push({ slug: g.slug, provider: g.provider, ...res })
  if (!res.ok || i % 25 === 0) console.log(`[${i}/${withIframe.length}] ${mark} ${g.slug} ${res.status || res.error || ''}`)
  await sleep(40)
}

const report = {
  checkedAt: new Date().toISOString(),
  total: withIframe.length,
  broken: broken.length,
  items: broken,
}
writeFileSync(join(root, 'scripts/iframe-report.json'), JSON.stringify(report, null, 2))
console.log(`\nBroken: ${broken.length}/${withIframe.length}`)
if (broken.length) process.exitCode = 1
