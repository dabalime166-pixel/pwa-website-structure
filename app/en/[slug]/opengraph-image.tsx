import { OG_CONTENT_TYPE, OG_SIZE, renderGameOgImage } from '@/lib/game-og'

export const runtime = 'nodejs'
export const alt = '1weapp free demo'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return renderGameOgImage(slug, 'en')
}
