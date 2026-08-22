import { adminJson, adminUnauthorized, requireAdmin } from '@/lib/admin-api'
import { gameProviders, getGameRecord, listGames, upsertGameRecord, deleteGameRecord } from '@/lib/admin-games-store'
import { getPersistCapabilities, persistContentFile, readJsonFile } from '@/lib/admin-persist'
import type { GameRecord } from '@/lib/admin-games-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

function canMutate() {
  const caps = getPersistCapabilities()
  return caps.github || caps.localFs
}

export async function GET(request: Request) {
  const auth = requireAdmin(request)
  if (!auth.ok) return adminUnauthorized(auth)

  const url = new URL(request.url)
  const q = url.searchParams.get('q') || undefined
  const provider = url.searchParams.get('provider') || undefined
  const page = Number(url.searchParams.get('page') || '1')
  const limit = Number(url.searchParams.get('limit') || '30')

  return adminJson({
    ok: true,
    ...listGames({ q, provider, page, limit }),
    providers: gameProviders(),
  })
}

export async function POST(request: Request) {
  const auth = requireAdmin(request)
  if (!auth.ok) return adminUnauthorized(auth)
  if (!canMutate()) {
    return adminJson(
      {
        ok: false,
        code: 'readonly',
        error: 'Cannot persist on serverless without GITHUB_TOKEN + GITHUB_REPO.',
      },
      503,
    )
  }

  const body = (await request.json()) as GameRecord
  if (!body?.slug?.trim() || !body?.name?.trim() || !body?.provider?.trim()) {
    return adminJson({ error: 'slug, name and provider are required' }, 400)
  }

  const slug = body.slug.trim()
  const record: GameRecord = {
    ...body,
    slug,
    name: body.name.trim(),
    provider: body.provider.trim(),
    avatar: body.avatar?.trim() || `/avatars/${slug}.webp`,
    iframeUrl: body.iframeUrl || '',
    keywordsRu: body.keywordsRu || '',
    keywordsEn: body.keywordsEn || '',
    seoTextRu: body.seoTextRu || '',
    seoTextEn: body.seoTextEn || '',
  }

  upsertGameRecord(record)

  const games = readJsonFile<GameRecord[]>('lib/games-data.json')
  const persist = await persistContentFile('lib/games-data.json', games, `admin: upsert game ${slug}`)
  if (persist.mode === 'readonly') {
    return adminJson({ ok: true, warning: persist.warning, slug, mode: persist.mode })
  }

  // catalog/seo already synced locally; persist them too when using GitHub
  if (persist.mode === 'github') {
    const catalog = readJsonFile('lib/games-catalog.json')
    const seo = readJsonFile('lib/games-seo.json')
    await persistContentFile('lib/games-catalog.json', catalog, `admin: sync catalog for ${slug}`)
    await persistContentFile('lib/games-seo.json', seo, `admin: sync seo for ${slug}`)
  }

  return adminJson({ ok: true, slug, mode: persist.mode, commit: persist.commit })
}
