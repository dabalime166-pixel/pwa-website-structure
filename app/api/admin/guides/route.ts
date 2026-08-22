import { adminJson, adminUnauthorized, requireAdmin } from '@/lib/admin-api'
import { persistContentFile, readJsonFile } from '@/lib/admin-persist'
import type { GuideData } from '@/lib/guides-data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  const auth = requireAdmin(request)
  if (!auth.ok) return adminUnauthorized(auth)

  const guides = readJsonFile<GuideData[]>('lib/guides.json')
  return adminJson({
    ok: true,
    items: guides.map((g) => ({
      id: g.id,
      slug: g.slug,
      icon: g.icon,
      titleEn: g.titleEn,
      titleRu: g.titleRu,
      updatedAt: g.updatedAt,
    })),
  })
}

export async function PUT(request: Request) {
  const auth = requireAdmin(request)
  if (!auth.ok) return adminUnauthorized(auth)

  const guides = (await request.json()) as GuideData[]
  if (!Array.isArray(guides)) return adminJson({ error: 'Expected array' }, 400)

  const persist = await persistContentFile('lib/guides.json', guides, 'admin: update guides')
  if (persist.mode === 'readonly') {
    return adminJson({ ok: false, warning: persist.warning }, 503)
  }

  return adminJson({ ok: true, count: guides.length, mode: persist.mode, commit: persist.commit })
}
