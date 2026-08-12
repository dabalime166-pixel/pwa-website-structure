/**
 * Build one collage preview per provider (3 avatars → 1 webp).
 * Output: public/banners/providers/{slug}.webp
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import catalog from '../lib/games-catalog.json' with { type: 'json' }

const PROVIDERS = [
  { slug: 'pragmatic-play', name: 'Pragmatic Play' },
  { slug: 'play-n-go', name: "Play'n GO" },
  { slug: 'netent', name: 'NetEnt' },
  { slug: 'hacksaw-gaming', name: 'Hacksaw Gaming' },
  { slug: 'bgaming', name: 'BGaming' },
  { slug: 'nolimit-city', name: 'Nolimit City' },
  { slug: 'big-time-gaming', name: 'Big Time Gaming' },
  { slug: 'red-tiger', name: 'Red Tiger' },
  { slug: '1weapp-games', name: '1weapp Games' },
  { slug: 'inout-games', name: 'InOut Games' },
]

const OUT_DIR = path.resolve('public/banners/providers')
const TILE_W = 96
const TILE_H = 128
const OVERLAP = 28
const PAD = 4
const COUNT = 3

fs.mkdirSync(OUT_DIR, { recursive: true })

const canvasW = PAD * 2 + TILE_W * COUNT - OVERLAP * (COUNT - 1)
const canvasH = PAD * 2 + TILE_H

function publicPath(avatar) {
  // avatar is like /avatars/foo.webp
  return path.resolve('public', avatar.replace(/^\//, ''))
}

for (const provider of PROVIDERS) {
  const list = catalog
    .filter((g) => g.provider === provider.name)
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, COUNT)

  if (!list.length) {
    console.warn('skip empty', provider.slug)
    continue
  }

  const layers = []
  // dark plate
  const base = await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: { r: 18, g: 17, b: 15, alpha: 1 },
    },
  })
    .png()
    .toBuffer()

  layers.push({ input: base, top: 0, left: 0 })

  for (let i = 0; i < list.length; i++) {
    const src = publicPath(list[i].avatar)
    if (!fs.existsSync(src)) {
      console.warn('missing avatar', src)
      continue
    }
    const rounded = Buffer.from(
      `<svg width="${TILE_W}" height="${TILE_H}"><rect x="0" y="0" width="${TILE_W}" height="${TILE_H}" rx="10" ry="10" fill="#fff"/></svg>`,
    )
    const tile = await sharp(src)
      .resize(TILE_W, TILE_H, { fit: 'cover', position: 'centre' })
      .composite([{ input: rounded, blend: 'dest-in' }])
      .png()
      .toBuffer()

    // thin gold rim
    const rim = Buffer.from(
      `<svg width="${TILE_W}" height="${TILE_H}"><rect x="0.5" y="0.5" width="${TILE_W - 1}" height="${TILE_H - 1}" rx="10" ry="10" fill="none" stroke="rgba(226,184,74,0.45)" stroke-width="1.5"/></svg>`,
    )
    const withRim = await sharp(tile)
      .composite([{ input: rim, blend: 'over' }])
      .png()
      .toBuffer()

    const left = PAD + i * (TILE_W - OVERLAP)
    layers.push({ input: withRim, top: PAD, left })
  }

  const out = path.join(OUT_DIR, `${provider.slug}.webp`)
  await sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(layers)
    .webp({ quality: 78, effort: 5 })
    .toFile(out)

  const kb = (fs.statSync(out).size / 1024).toFixed(1)
  console.log(`✓ ${provider.slug}.webp (${canvasW}×${canvasH}, ${kb} KB)`)
}
