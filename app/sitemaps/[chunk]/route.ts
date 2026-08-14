import {
  sitemapChunkIds,
  sitemapEntriesForChunk,
  urlsetXml,
  SITEMAP_HEADERS,
} from '@/lib/sitemap'

export const dynamic = 'force-static'
export const revalidate = 86400

type Params = { chunk: string }

export function generateStaticParams(): Params[] {
  return sitemapChunkIds().map((chunk) => ({ chunk }))
}

export async function GET(
  _request: Request,
  context: { params: Promise<Params> },
) {
  const { chunk: raw } = await context.params
  const chunk = raw.replace(/\.xml$/, '')
  const entries = sitemapEntriesForChunk(chunk)
  if (!entries) {
    return new Response('Not Found', { status: 404, headers: { 'Content-Type': 'text/plain' } })
  }
  return new Response(urlsetXml(entries), { headers: SITEMAP_HEADERS })
}
