import { adminJson, adminUnauthorized, requireAdmin } from '@/lib/admin-api'
import { persistContentFile, readJsonFile } from '@/lib/admin-persist'
import type { ProviderDef } from '@/lib/providers'
import type { ExpertProfile } from '@/lib/expert'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  const auth = requireAdmin(request)
  if (!auth.ok) return adminUnauthorized(auth)

  const providers = readJsonFile<ProviderDef[]>('lib/providers.json')
  const expert = readJsonFile<ExpertProfile>('lib/expert.json')
  return adminJson({ ok: true, providers, expert })
}

export async function PUT(request: Request) {
  const auth = requireAdmin(request)
  if (!auth.ok) return adminUnauthorized(auth)

  const body = (await request.json()) as { providers?: ProviderDef[]; expert?: ExpertProfile }
  const results: { providers?: unknown; expert?: unknown } = {}

  if (body.providers) {
    results.providers = await persistContentFile(
      'lib/providers.json',
      body.providers,
      'admin: update providers',
    )
    if (results.providers && (results.providers as { mode?: string }).mode === 'readonly') {
      return adminJson({ ok: false, warning: (results.providers as { warning?: string }).warning }, 503)
    }
  }

  if (body.expert) {
    results.expert = await persistContentFile('lib/expert.json', body.expert, 'admin: update expert profile')
    if (results.expert && (results.expert as { mode?: string }).mode === 'readonly') {
      return adminJson({ ok: false, warning: (results.expert as { warning?: string }).warning }, 503)
    }
  }

  return adminJson({ ok: true, ...results })
}
