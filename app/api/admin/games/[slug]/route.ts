import { adminJson, adminUnauthorized, requireAdmin } from '@/lib/admin-api'
import { deleteGameRecord, getGameRecord, upsertGameRecord } from '@/lib/admin-games-store'
import { getPersistCapabilities, persistContentFile, readJsonFile } from '@/lib/admin-persist'
import type { GameRecord } from '@/lib/admin-games-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

type Params = { slug: string }

function canMutate() {
  const caps = getPersistCapabilities()
  return caps.github || caps.localFs
}

export async function GET(request: Request, context: { params: Promise<Params> }) {
  const auth = requireAdmin(request)
  if (!auth.ok) return adminUnauthorized(auth)

  const { slug } = await context.params
  const game = getGameRecord(slug)
  if (!game) return adminJson({ error: 'Not found' }, 404)
  return adminJson({ ok: true, game })
}

export async function PATCH(request: Request, context: { params: Promise<Params> }) {
  const auth = requireAdmin(request)
  if (!auth.ok) return adminUnauthorized(auth)
  if (!canMutate()) {
    return adminJson(
      { ok: false, code: 'readonly', error: 'Cannot persist on serverless without GITHUB_TOKEN + GITHUB_REPO.' },
      503,
    )
  }

  const { slug } = await context.params
  const current = getGameRecord(slug)
  if (!current) return adminJson({ error: 'Not found' }, 404)

  const patch = (await request.json()) as Partial<GameRecord>
  const next: GameRecord = { ...current, ...patch, slug }
  upsertGameRecord(next)

  const games = readJsonFile<GameRecord[]>('lib/games-data.json')
  const persist = await persistContentFile('lib/games-data.json', games, `admin: update game ${slug}`)
  if (persist.mode === 'readonly') {
    return adminJson({ ok: true, warning: persist.warning, slug, mode: persist.mode })
  }
  if (persist.mode === 'github') {
    const catalog = readJsonFile('lib/games-catalog.json')
    const seo = readJsonFile('lib/games-seo.json')
    await persistContentFile('lib/games-catalog.json', catalog, `admin: sync catalog for ${slug}`)
    await persistContentFile('lib/games-seo.json', seo, `admin: sync seo for ${slug}`)
  }

  return adminJson({ ok: true, slug, mode: persist.mode, commit: persist.commit })
}

export async function DELETE(request: Request, context: { params: Promise<Params> }) {
  const auth = requireAdmin(request)
  if (!auth.ok) return adminUnauthorized(auth)
  if (!canMutate()) {
    return adminJson(
      { ok: false, code: 'readonly', error: 'Cannot persist on serverless without GITHUB_TOKEN + GITHUB_REPO.' },
      503,
    )
  }

  const { slug } = await context.params
  if (!deleteGameRecord(slug)) return adminJson({ error: 'Not found' }, 404)

  const games = readJsonFile<GameRecord[]>('lib/games-data.json')
  const persist = await persistContentFile('lib/games-data.json', games, `admin: delete game ${slug}`)
  if (persist.mode === 'github') {
    const catalog = readJsonFile('lib/games-catalog.json')
    const seo = readJsonFile('lib/games-seo.json')
    await persistContentFile('lib/games-catalog.json', catalog, `admin: sync catalog after delete ${slug}`)
    await persistContentFile('lib/games-seo.json', seo, `admin: sync seo after delete ${slug}`)
  }

  return adminJson({ ok: true, slug, mode: persist.mode, warning: persist.warning })
}
