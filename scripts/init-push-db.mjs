/**
 * Creates the push_subscriptions table.
 * Usage: DATABASE_URL=... node scripts/init-push-db.mjs
 */
import { neon } from '@neondatabase/serverless'

const url = process.env.DATABASE_URL
if (!url) {
  console.error('Set DATABASE_URL first')
  process.exit(1)
}

const sql = neon(url)

await sql`
  CREATE TABLE IF NOT EXISTS push_subscriptions (
    id SERIAL PRIMARY KEY,
    endpoint TEXT NOT NULL UNIQUE,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL,
    user_agent TEXT,
    lang TEXT,
    game_slug TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`

await sql`
  CREATE INDEX IF NOT EXISTS push_subscriptions_created_at_idx
  ON push_subscriptions (created_at DESC)
`

console.log('push_subscriptions table ready')
