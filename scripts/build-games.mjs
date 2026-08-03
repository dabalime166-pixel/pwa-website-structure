/**
 * Run this script once at build time to parse the Excel DB and output
 * a static JSON file consumed by Next.js pages/RSCs.
 *
 * Usage: node scripts/build-games.mjs
 */

import { read, utils } from 'xlsx';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const buf = readFileSync(join(root, 'data/Games_SEO_Database_Perfect_Avatars-b60c1e.xlsx'));
const wb = read(buf, { cellDates: true });
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = utils.sheet_to_json(ws);

/** Turn "Lucky Jet" → "lucky-jet" */
function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-|-$/g, '');
}

const games = rows.map((row) => ({
  slug: slugify(row['Game Name / Название']),
  name: row['Game Name / Название'],
  provider: row['Provider / Провайдер'],
  iframeUrl: row['Official Link / Ссылка'],
  keywordsRu: row['Keywords (RU)'] ?? '',
  keywordsEn: row['Keywords (EN)'] ?? '',
  seoTextRu: row['SEO Text (RU)'] ?? '',
  seoTextEn: row['SEO Text (EN)'] ?? '',
  avatar: row['Avatar Link / Ссылка на аватарку'] ?? '',
}));

const outDir = join(root, 'lib');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'games-data.json'), JSON.stringify(games, null, 2), 'utf-8');
console.log(`✅  Written ${games.length} games to lib/games-data.json`);

// Keep light catalog + SEO split in sync for client/server payloads
const { spawnSync } = await import('node:child_process');
const sync = spawnSync(process.execPath, [join(__dirname, 'sync-games-catalog.mjs')], {
  cwd: root,
  encoding: 'utf8',
});
if (sync.status !== 0) {
  console.error(sync.stderr || sync.stdout);
  process.exit(sync.status || 1);
}
console.log(sync.stdout.trim());
