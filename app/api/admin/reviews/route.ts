import { adminJson, adminUnauthorized, requireAdmin } from '@/lib/admin-api'
import { persistContentFile, readJsonFile } from '@/lib/admin-persist'
import type { ReviewData } from '@/lib/reviews-data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  const auth = requireAdmin(request)
  if (!auth.ok) return adminUnauthorized(auth)

  const reviews = readJsonFile<ReviewData[]>('lib/reviews.json')
  return adminJson({
    ok: true,
    items: reviews.map((r) => ({
      id: r.id,
      titleEn: r.titleEn,
      titleRu: r.titleRu,
      provider: r.provider,
      relatedDemoSlug: r.relatedDemoSlug,
    })),
  })
}

export async function PUT(request: Request) {
  const auth = requireAdmin(request)
  if (!auth.ok) return adminUnauthorized(auth)

  const reviews = (await request.json()) as ReviewData[]
  if (!Array.isArray(reviews)) return adminJson({ error: 'Expected array' }, 400)

  const persist = await persistContentFile('lib/reviews.json', reviews, 'admin: update reviews')
  if (persist.mode === 'readonly') return adminJson({ ok: false, warning: persist.warning }, 503)

  return adminJson({ ok: true, count: reviews.length, mode: persist.mode, commit: persist.commit })
}
