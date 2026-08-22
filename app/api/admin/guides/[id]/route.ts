import { adminJson, adminUnauthorized, requireAdmin } from '@/lib/admin-api'
import { persistContentFile, readJsonFile } from '@/lib/admin-persist'
import type { GuideData } from '@/lib/guides-data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

type Params = { id: string }

export async function GET(request: Request, context: { params: Promise<Params> }) {
  const auth = requireAdmin(request)
  if (!auth.ok) return adminUnauthorized(auth)

  const { id } = await context.params
  const guides = readJsonFile<GuideData[]>('lib/guides.json')
  const guide = guides.find((g) => g.id === id)
  if (!guide) return adminJson({ error: 'Not found' }, 404)
  return adminJson({ ok: true, guide })
}

export async function PATCH(request: Request, context: { params: Promise<Params> }) {
  const auth = requireAdmin(request)
  if (!auth.ok) return adminUnauthorized(auth)

  const { id } = await context.params
  const guides = readJsonFile<GuideData[]>('lib/guides.json')
  const idx = guides.findIndex((g) => g.id === id)
  if (idx < 0) return adminJson({ error: 'Not found' }, 404)

  const patch = (await request.json()) as Partial<GuideData>
  guides[idx] = { ...guides[idx], ...patch, id }
  const persist = await persistContentFile('lib/guides.json', guides, `admin: update guide ${id}`)
  if (persist.mode === 'readonly') return adminJson({ ok: false, warning: persist.warning }, 503)

  return adminJson({ ok: true, id, mode: persist.mode, commit: persist.commit })
}
