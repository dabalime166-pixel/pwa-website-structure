/** Client-side prefs: recently viewed + favorites */

const RECENT_KEY = '1weapp-recent-demos'
const FAV_KEY = '1weapp-favorite-demos'
const RECENT_SECTION_DISMISSED_KEY = '1weapp-recent-section-dismissed'
const MAX_RECENT = 12

export function readRecentSlugs(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    const list = raw ? (JSON.parse(raw) as string[]) : []
    return Array.isArray(list) ? list.filter((s) => typeof s === 'string') : []
  } catch {
    return []
  }
}

export function pushRecentSlug(slug: string) {
  if (typeof window === 'undefined' || !slug) return
  try {
    const next = [slug, ...readRecentSlugs().filter((s) => s !== slug)].slice(0, MAX_RECENT)
    localStorage.setItem(RECENT_KEY, JSON.stringify(next))
    localStorage.removeItem(RECENT_SECTION_DISMISSED_KEY)
  } catch {
    /* private mode */
  }
}

export function isRecentSectionDismissed(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return localStorage.getItem(RECENT_SECTION_DISMISSED_KEY) === '1'
  } catch {
    return false
  }
}

export function dismissRecentSection(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(RECENT_SECTION_DISMISSED_KEY, '1')
  } catch {
    /* private mode */
  }
}

export function readFavoriteSlugs(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(FAV_KEY)
    const list = raw ? (JSON.parse(raw) as string[]) : []
    return Array.isArray(list) ? list.filter((s) => typeof s === 'string') : []
  } catch {
    return []
  }
}

export function isFavorite(slug: string): boolean {
  return readFavoriteSlugs().includes(slug)
}

export function toggleFavorite(slug: string): boolean {
  if (typeof window === 'undefined' || !slug) return false
  try {
    const cur = readFavoriteSlugs()
    const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [slug, ...cur].slice(0, 40)
    localStorage.setItem(FAV_KEY, JSON.stringify(next))
    return next.includes(slug)
  } catch {
    return false
  }
}
