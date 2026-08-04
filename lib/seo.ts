export const SITE_ORIGIN = 'https://www.1weapp.online'
export const SITE_BRAND = '1weapp'

/** Build an absolute URL from a site path or pass through full URLs. */
export function absoluteUrl(path: string): string {
  if (!path) return SITE_ORIGIN
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Ensure a single `| 1weapp` suffix and keep titles within a typical SERP budget.
 * Root metadata must NOT use a `%s | 1weapp` template when titles already include the brand.
 */
export function withBrandTitle(title: string, maxLen = 60): string {
  const core = title.replace(/\s*\|\s*1weapp\s*$/i, '').trim()
  const brand = ` | ${SITE_BRAND}`
  if (core.length + brand.length <= maxLen) return `${core}${brand}`

  const budget = Math.max(24, maxLen - brand.length)
  let cut = core.slice(0, budget)

  const demoIdx = cut.toLowerCase().lastIndexOf(' demo')
  const breakAt = Math.max(
    demoIdx,
    cut.lastIndexOf(' — '),
    cut.lastIndexOf(' – '),
    cut.lastIndexOf(': '),
    cut.lastIndexOf(' - ')
  )
  if (breakAt > Math.floor(budget * 0.35)) {
    cut = cut.slice(0, breakAt === demoIdx ? demoIdx + 5 : breakAt)
  } else {
    const space = cut.lastIndexOf(' ')
    if (space > Math.floor(budget * 0.55)) cut = cut.slice(0, space)
  }

  cut = cut
    .replace(/\s+(?:is|the|a|an|to|for|and|of|or|no)\s*$/i, '')
    .replace(/[\s—\-–:|,]+$/u, '')
    .trim()
  return `${cut || core.slice(0, budget)}${brand}`
}

/** Keep meta descriptions in a healthy ~120–155 character range when possible. */
export function clampMetaDescription(text: string, maxLen = 155): string {
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= maxLen) return t

  let cut = t.slice(0, maxLen - 1)
  const space = cut.lastIndexOf(' ')
  if (space > 100) cut = cut.slice(0, space)
  return `${cut.replace(/[\s.,;:!?…]+$/u, '')}…`
}
