import { games, type Game } from '@/lib/games'
import { PROVIDERS } from '@/lib/providers'

/**
 * Curated “most popular” slugs per provider (industry hits first).
 * Missing slugs are skipped; remaining seats are filled by catalog heuristics.
 */
const POPULAR_BY_PROVIDER: Record<string, string[]> = {
  'Pragmatic Play': [
    'gates-of-olympus',
    'sweet-bonanza',
    'sugar-rush',
    'starlight-princess',
    'big-bass-bonanza',
    'the-dog-house',
    'wolf-gold',
    'gates-of-olympus-1000',
    'sweet-bonanza-1000',
    'mustang-gold',
  ],
  "Play'n GO": [
    'reactoonz',
    'book-of-dead',
    'fire-joker',
    'rise-of-olympus',
    'moon-princess',
    'reactoonz-100',
    'legacy-of-dead',
    'gemix',
    'honey-rush',
    'ring-of-odin',
  ],
  NetEnt: [
    'starburst',
    'gonzos-quest',
    'dead-or-alive-2',
    'twin-spin',
    'starburst-xxxtreme',
    'divine-fortune',
    'blood-suckers',
    'jack-hammer',
    'mega-joker',
    'fruit-shop',
  ],
  'Hacksaw Gaming': [
    'wanted-dead-or-a-wild',
    'le-bandit',
    'le-pharaoh',
    'chaos-crew',
    'chaos-crew-2',
    'rip-city',
    'hand-of-anubis',
    'le-zeus',
    'dork-unit',
    'donny-dough',
  ],
  BGaming: [
    'aztec-clusters',
    'aviamasters',
    'balloon-mania',
    'beer-bonanza',
    'burning-chilli-x',
    'dice-clash',
    'always-up',
    'aztec-magic-megaways',
    'bonanza-billion',
    'aloha-king-elvis',
  ],
  'Nolimit City': [
    'mental',
    'tombstone',
    'fire-in-the-hole',
    'deadwood-xnudge',
    'san-quentin-xways',
    'bushido-ways-xnudge',
    'das-xboot',
    'blood-and-shadow',
    'tombstone-no-mercy',
    'roadkill',
  ],
  'Big Time Gaming': [
    'bonanza',
    'extra-chilli',
    'white-rabbit',
    'danger-high-voltage',
    'bonanza-falls',
    'donuts',
    'chocolates',
    'star-clusters',
    'royal-mint',
    'apollo-pays',
  ],
  'Red Tiger': [
    'piggy-riches-megaways',
    'rainbow-jackpots',
    'cash-volt',
    'atlantis',
    'mystery-reels',
    'treasure-mine',
    'vault-of-anubis',
    'multiplier-riches',
    'zeus-lightning-megaways',
    'pirates-plenty-megaways',
  ],
  '1weapp Games': ['lucky-jet', 'rocket-queen', 'mines', 'tower-rush'],
  'InOut Games': ['mine-slot', 'mine-slot-2'],
}

const PER_PROVIDER = 10

function popularityScore(game: Game): number {
  const s = `${game.slug} ${game.name}`.toLowerCase()
  let score = 0
  if ((game.gameType || '').toLowerCase().includes('megaways')) score += 4
  if (/bonanza|olympus|starburst|reactoonz|tombstone|mental|wanted|pharaoh|bass|dog.?house/.test(s))
    score += 5
  if (/1000|xxxtreme|megaways|xnudge|xways/.test(s)) score += 2
  if (/christmas|xmas|halloween/.test(s)) score -= 1
  return score
}

function fillFromCatalog(provider: string, taken: Set<string>, need: number): Game[] {
  if (need <= 0) return []
  return games
    .filter((g) => g.provider === provider && !taken.has(g.slug))
    .sort(
      (a, b) =>
        popularityScore(b) - popularityScore(a) || a.name.localeCompare(b.name),
    )
    .slice(0, need)
}

/** Top N popular demos for every catalog provider (default 10 each). */
export function getPopularGamesPerProvider(perProvider = PER_PROVIDER): Game[] {
  const bySlug = new Map(games.map((g) => [g.slug, g]))
  const out: Game[] = []
  const seen = new Set<string>()

  for (const provider of PROVIDERS) {
    const curated = POPULAR_BY_PROVIDER[provider.name] || []
    const picked: Game[] = []

    for (const slug of curated) {
      if (picked.length >= perProvider) break
      const game = bySlug.get(slug)
      if (!game || game.provider !== provider.name || seen.has(slug)) continue
      picked.push(game)
      seen.add(slug)
    }

    const fillers = fillFromCatalog(provider.name, seen, perProvider - picked.length)
    for (const g of fillers) {
      picked.push(g)
      seen.add(g.slug)
    }

    out.push(...picked)
  }

  return out
}

export function getPopularGamesCount(): number {
  return getPopularGamesPerProvider().length
}
