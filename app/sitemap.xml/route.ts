import { sitemapIndexXml, SITEMAP_HEADERS } from '@/lib/sitemap'

export const dynamic = 'force-static'
export const revalidate = 86400

export function GET() {
  return new Response(sitemapIndexXml(), { headers: SITEMAP_HEADERS })
}
