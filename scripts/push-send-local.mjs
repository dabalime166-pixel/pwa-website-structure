/**
 * Send Web Push from your PC (terminal), using Neon DB or a local JSON export.
 *
 * Usage:
 *   pnpm push:send -- --title "Новое демо" --body "Зайди на сайт" --url "/ru"
 *   pnpm push:send -- --from-local data/push-subscribers.json --title "..." --body "..."
 */
import { readFileSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { neon } from '@neondatabase/serverless'
import webpush from 'web-push'

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

function arg(name, fallback = '') {
  const i = process.argv.indexOf(`--${name}`)
  return i !== -1 ? process.argv[i + 1] : fallback
}

loadEnvFile('.env.local')
loadEnvFile('.env')

const title = arg('title')
const body = arg('body')
const url = arg('url', '/')
const icon = arg('icon', '/icon-192.png')
const tag = arg('tag', '1weapp-broadcast')
const fromLocal = arg('from-local', '')

if (!title || !body) {
  console.error('Required: --title "..." --body "..."')
  process.exit(1)
}

const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
const privateKey = process.env.VAPID_PRIVATE_KEY
if (!publicKey || !privateKey) {
  console.error('NEXT_PUBLIC_VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY required in .env.local')
  process.exit(1)
}

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT || 'mailto:admin@1weapp.online',
  publicKey,
  privateKey,
)

/** @type {Array<{endpoint:string,p256dh:string,auth:string}>} */
let subscribers = []

if (fromLocal) {
  const file = join(root, fromLocal)
  const data = JSON.parse(readFileSync(file, 'utf8'))
  subscribers = (data.subscribers || []).map((s) => ({
    endpoint: s.endpoint,
    p256dh: s.p256dh,
    auth: s.auth,
  }))
} else {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    console.error('DATABASE_URL missing, or pass --from-local data/push-subscribers.json')
    process.exit(1)
  }
  const sql = neon(dbUrl)
  subscribers = await sql`
    SELECT endpoint, p256dh, auth FROM push_subscriptions ORDER BY created_at DESC
  `
}

if (subscribers.length === 0) {
  console.log('No subscribers to send to.')
  process.exit(0)
}

const payload = JSON.stringify({ title, body, url, icon, badge: icon, tag })

let sent = 0
let failed = 0

for (const sub of subscribers) {
  try {
    await webpush.sendNotification(
      { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
      payload,
      { TTL: 60 * 60 * 12, urgency: 'normal' },
    )
    sent += 1
    process.stdout.write('.')
  } catch (err) {
    failed += 1
    process.stdout.write('x')
  }
}

console.log(`\nDone: sent ${sent}/${subscribers.length}, failed ${failed}`)
