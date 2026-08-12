/**
 * Rebuild light catalog + SEO split from lib/games-data.json
 * Run after any games-data.json change:
 *   node scripts/sync-games-catalog.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const games = JSON.parse(readFileSync(join(root, 'lib/games-data.json'), 'utf8'))

const catalog = games.map((g) => {
  const out = {
    slug: g.slug,
    name: g.name,
    provider: g.provider,
    avatar: g.avatar,
  }
  if (g.externalUrl) out.externalUrl = g.externalUrl
  if (g.rtp) out.rtp = g.rtp
  if (g.gameType) out.gameType = g.gameType
  return out
})

const seo = {}
for (const g of games) {
  seo[g.slug] = {
    iframeUrl: g.iframeUrl || '',
    keywordsRu: g.keywordsRu || '',
    keywordsEn: g.keywordsEn || '',
    seoTextRu: g.seoTextRu || '',
    seoTextEn: g.seoTextEn || '',
  }
  if (g.titleSeoEn) seo[g.slug].titleSeoEn = g.titleSeoEn
  if (g.titleSeoRu) seo[g.slug].titleSeoRu = g.titleSeoRu
  if (g.descriptionSeoEn) seo[g.slug].descriptionSeoEn = g.descriptionSeoEn
  if (g.descriptionSeoRu) seo[g.slug].descriptionSeoRu = g.descriptionSeoRu
}

writeFileSync(join(root, 'lib/games-catalog.json'), JSON.stringify(catalog))
writeFileSync(join(root, 'lib/games-seo.json'), JSON.stringify(seo))
console.log(
  `OK ${games.length} games → catalog ${(Buffer.byteLength(JSON.stringify(catalog)) / 1024).toFixed(1)}KB, seo ${(Buffer.byteLength(JSON.stringify(seo)) / 1024).toFixed(1)}KB`
)
