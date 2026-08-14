export const SITE_ORIGIN = 'https://www.1weapp.online'
export const SITE_BRAND = '1weapp'

/** Format a YYYY-MM-DD date for display without timezone drift. */
export function formatIsoDate(iso: string, lang: 'en' | 'ru'): string {
  const date = new Date(`${iso}T00:00:00.000Z`)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

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

/**
 * Keep meta descriptions in Ahrefs' healthy ~120–155 character band.
 * Pads short copy with a locale-aware closer; truncates long copy at a word boundary.
 */
export function clampMetaDescription(
  text: string,
  lang: 'en' | 'ru' = 'en',
  minLen = 120,
  maxLen = 155
): string {
  let t = text.replace(/\s+/g, ' ').trim()

  if (t.length < minLen) {
    const pad =
      lang === 'ru'
        ? ' Бесплатное демо в браузере на 1weapp — без регистрации и депозита.'
        : ' Free browser demo on 1weapp — no signup and no deposit required.'
    t = `${t}${pad}`.replace(/\s+/g, ' ').trim()
  }

  if (t.length <= maxLen) return t

  let cut = t.slice(0, maxLen - 1)
  const space = cut.lastIndexOf(' ')
  if (space > 100) cut = cut.slice(0, space)
  return `${cut.replace(/[\s.,;:!?…]+$/u, '')}…`
}
