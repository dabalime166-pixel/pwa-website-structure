import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware to handle SEO for invalid/404 routes.
 * Adds noindex, nofollow headers to prevent indexing of malformed URLs.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Routes that should NOT be indexed (404 pages, malformed URLs, etc.)
  const shouldNoindex =
    // Game pages without language prefix (e.g., /ancient-egypt, /gates-of-olympus)
    (/^\/[a-z0-9\-]+$/.test(pathname) && !pathname.match(/^\/(en|ru)$/)) ||
    // Guide pages without language prefix (e.g., /guides/plinko, /guides/bonuses)
    /^\/guides\//.test(pathname) ||
    // Double locale prefixes (e.g., /ru/ru/guides/*, /en/en/*)
    /^\/(en|ru)\/(en|ru)\//.test(pathname) ||
    // Invalid static/chunk patterns
    /^\/_next\//.test(pathname) ||
    // Any remaining invalid patterns
    /^\/[a-z0-9\-]+\/[a-z0-9\-]+$/.test(pathname)

  if (shouldNoindex) {
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
