import { adminJson, adminUnauthorized, requireAdmin } from '@/lib/admin-api'
import { persistContentFile, readJsonFile } from '@/lib/admin-persist'
import type { ReviewData } from '@/lib/reviews-data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

type Params = { id: string }

export async function GET(request: Request, context: { params: Promise<Params> }) {
  const auth = requireAdmin(request)
  if (!auth.ok) return adminUnauthorized(auth)

  const { id } = await context.params
  const reviews = readJsonFile<ReviewData[]>('lib/reviews.json')
  const review = reviews.find((r) => r.id === id)
  if (!review) return adminJson({ error: 'Not found' }, 404)
  return adminJson({ ok: true, review })
}

export async function PATCH(request: Request, context: { params: Promise<Params> }) {
  const auth = requireAdmin(request)
  if (!auth.ok) return adminUnauthorized(auth)

  const { id } = await context.params
  const reviews = readJsonFile<ReviewData[]>('lib/reviews.json')
  const idx = reviews.findIndex((r) => r.id === id)
  if (idx < 0) return adminJson({ error: 'Not found' }, 404)

  const patch = (await request.json()) as Partial<ReviewData>
  reviews[idx] = { ...reviews[idx], ...patch, id }
  const persist = await persistContentFile('lib/reviews.json', reviews, `admin: update review ${id}`)
  if (persist.mode === 'readonly') return adminJson({ ok: false, warning: persist.warning }, 503)

  return adminJson({ ok: true, id, mode: persist.mode, commit: persist.commit })
}
