import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

let sql: NeonQueryFunction<false, false> | null = null

export function getDb() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('DATABASE_URL is not configured')
  }
  if (!sql) {
    sql = neon(url)
  }
  return sql
}

export type PushSubscriptionRow = {
  id: number
  endpoint: string
  p256dh: string
  auth: string
  user_agent: string | null
  lang: string | null
  game_slug: string | null
  created_at: string
  last_seen_at: string
}

export async function ensurePushTable() {
  const db = getDb()
  await db`
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
}

export async function upsertSubscription(input: {
  endpoint: string
  p256dh: string
  auth: string
  userAgent?: string | null
  lang?: string | null
  gameSlug?: string | null
}) {
  await ensurePushTable()
  const db = getDb()
  await db`
    INSERT INTO push_subscriptions (endpoint, p256dh, auth, user_agent, lang, game_slug)
    VALUES (
      ${input.endpoint},
      ${input.p256dh},
      ${input.auth},
      ${input.userAgent ?? null},
      ${input.lang ?? null},
      ${input.gameSlug ?? null}
    )
    ON CONFLICT (endpoint) DO UPDATE SET
      p256dh = EXCLUDED.p256dh,
      auth = EXCLUDED.auth,
      user_agent = COALESCE(EXCLUDED.user_agent, push_subscriptions.user_agent),
      lang = COALESCE(EXCLUDED.lang, push_subscriptions.lang),
      game_slug = COALESCE(EXCLUDED.game_slug, push_subscriptions.game_slug),
      last_seen_at = NOW()
  `
}

export async function deleteSubscription(endpoint: string) {
  await ensurePushTable()
  const db = getDb()
  await db`DELETE FROM push_subscriptions WHERE endpoint = ${endpoint}`
}

export async function listSubscriptions(): Promise<PushSubscriptionRow[]> {
  await ensurePushTable()
  const db = getDb()
  return (await db`
    SELECT id, endpoint, p256dh, auth, user_agent, lang, game_slug,
           created_at::text, last_seen_at::text
    FROM push_subscriptions
    ORDER BY created_at DESC
  `) as PushSubscriptionRow[]
}

export async function countSubscriptions(): Promise<number> {
  await ensurePushTable()
  const db = getDb()
  const rows = await db`SELECT COUNT(*)::int AS count FROM push_subscriptions`
  return Number(rows[0]?.count ?? 0)
}
