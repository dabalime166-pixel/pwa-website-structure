import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware to handle SEO for invalid/404 routes.
 * Adds noindex, nofollow headers only to malformed or invalid URLs.
 *
 * ALLOWED (indexable):
 *   /                          root
 *   /en                        English home
 *   /ru                        Russian home
 *   /en/<slug>                 English game pages
 *   /ru/<slug>                 Russian game pages
 *   /en/guides                 English guides index
 *   /ru/guides                 Russian guides index
 *   /en/guides/<slug>          English guide pages
 *   /ru/guides/<slug>          Russian guide pages
 *
 * NOINDEX (malformed / duplicate):
 *   /<slug>                    game without language prefix
 *   /guides/<slug>             guide without language prefix
 *   /en/en/... or /ru/ru/...   double locale prefixes
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Valid paths — do NOT add noindex
  const isValid =
    pathname === '/' ||
    pathname === '/en' ||
    pathname === '/ru' ||
    // /en/<anything> or /ru/<anything> — game and guide pages with correct prefix
    /^\/(en|ru)\//.test(pathname)

  if (!isValid) {
    const response = NextResponse.next()
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all routes except static assets
    '/((?!.*\\.[a-z0-9]+$).*)',
  ],
}
