/**
 * One-off / CI helper: export inline TS content arrays to JSON for admin editing.
 *   node scripts/export-content-json.mjs
 */
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

const { GUIDES } = await import('../lib/guides-data.ts')
const { REVIEWS } = await import('../lib/reviews-data.ts')
const { PROVIDERS } = await import('../lib/providers.ts')
const { EXPERT } = await import('../lib/expert.ts')

writeFileSync(join(root, 'lib/guides.json'), `${JSON.stringify(GUIDES, null, 2)}\n`)
writeFileSync(join(root, 'lib/reviews.json'), `${JSON.stringify(REVIEWS, null, 2)}\n`)
writeFileSync(join(root, 'lib/providers.json'), `${JSON.stringify(PROVIDERS, null, 2)}\n`)
writeFileSync(join(root, 'lib/expert.json'), `${JSON.stringify(EXPERT, null, 2)}\n`)

console.log(
  `OK guides=${GUIDES.length} reviews=${REVIEWS.length} providers=${PROVIDERS.length} expert=1`,
)
