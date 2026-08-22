import { adminJson, adminUnauthorized, requireAdmin } from '@/lib/admin-api'
import { getPersistCapabilities } from '@/lib/admin-persist'
import { gamesCount } from '@/lib/admin-games-store'
import { readJsonFile } from '@/lib/admin-persist'
import type { GuideData } from '@/lib/guides-data'
import type { ReviewData } from '@/lib/reviews-data'
import type { ProviderDef } from '@/lib/providers'
import { countSubscriptions } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  const auth = requireAdmin(request)
  if (!auth.ok) return adminUnauthorized(auth)

  let pushSubs = 0
  try {
    pushSubs = await countSubscriptions()
  } catch {
    pushSubs = 0
  }

  const guides = readJsonFile<GuideData[]>('lib/guides.json')
  const reviews = readJsonFile<ReviewData[]>('lib/reviews.json')
  const providers = readJsonFile<ProviderDef[]>('lib/providers.json')

  return adminJson({
    ok: true,
    counts: {
      games: gamesCount(),
      guides: guides.length,
      reviews: reviews.length,
      providers: providers.length,
      pushSubscribers: pushSubs,
    },
    persist: getPersistCapabilities(),
  })
}
