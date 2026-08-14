import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const DIR = path.resolve('public/avatars')
const MAX_W = 400
const MAX_H = 520
const WEBP_QUALITY = 72

const files = fs.readdirSync(DIR).filter((f) => /\.(webp|png|jpe?g)$/i.test(f))
let saved = 0
let bytesIn = 0
let bytesOut = 0
const renames = []

for (const file of files) {
  const full = path.join(DIR, file)
  const before = fs.statSync(full).size
  bytesIn += before

  const ext = path.extname(file).toLowerCase()
  const base = file.slice(0, -ext.length)
  const outName = `${base}.webp`
  const outFull = path.join(DIR, outName)
  const tmp = `${outFull}.tmp`

  try {
    await sharp(full)
      .rotate()
      .resize(MAX_W, MAX_H, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(tmp)

    const after = fs.statSync(tmp).size
    // Keep original only if somehow smaller
    if (after >= before && ext === '.webp') {
      fs.unlinkSync(tmp)
      bytesOut += before
      continue
    }

    fs.renameSync(tmp, outFull)
    if (outName !== file && fs.existsSync(full)) fs.unlinkSync(full)
    if (outName !== file) renames.push([file, outName])

    bytesOut += after
    saved++
    const pct = (((before - after) / before) * 100).toFixed(0)
    console.log(`${file} → ${outName}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (−${pct}%)`)
  } catch (err) {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
    console.error(`FAIL ${file}:`, err.message)
    bytesOut += before
  }
}

if (renames.length) {
  const dataPath = path.resolve('lib/games-data.json')
  let json = fs.readFileSync(dataPath, 'utf8')
  for (const [from, to] of renames) {
    json = json.split(`/avatars/${from}`).join(`/avatars/${to}`)
  }
  fs.writeFileSync(dataPath, json)
  console.log(`Updated ${renames.length} avatar paths in games-data.json`)
}

console.log(
  `\nDone: ${saved}/${files.length} rewritten. ${(bytesIn / 1024 / 1024).toFixed(1)}MB → ${(bytesOut / 1024 / 1024).toFixed(1)}MB`,
)
