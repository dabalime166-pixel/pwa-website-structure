/**
 * Export push subscribers from Neon to a local JSON file on your PC.
 *
 * Usage (from project root, with .env.local):
 *   pnpm push:export
 *   pnpm push:export -- --out data/my-backup.json
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { neon } from '@neondatabase/serverless'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

function loadEnvFile(name) {
  const path = join(root, name)
  if (!existsSync(path)) return
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = val
  }
}

loadEnvFile('.env.local')
loadEnvFile('.env')

const outArg = process.argv.indexOf('--out')
const outPath = outArg !== -1 ? process.argv[outArg + 1] : join(root, 'data', 'push-subscribers.json')

const url = process.env.DATABASE_URL
if (!url) {
  console.error('DATABASE_URL is missing. Add it to .env.local first.')
  process.exit(1)
}

const sql = neon(url)

const rows = await sql`
  SELECT id, endpoint, p256dh, auth, user_agent, lang, game_slug,
         created_at::text AS created_at, last_seen_at::text AS last_seen_at
  FROM push_subscriptions
  ORDER BY created_at DESC
`

mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(
  outPath,
  JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      count: rows.length,
      subscribers: rows,
    },
    null,
    2,
  ),
)

console.log(`Exported ${rows.length} subscriber(s) → ${outPath}`)
