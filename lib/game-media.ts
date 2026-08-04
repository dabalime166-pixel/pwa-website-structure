import type { Game, Lang } from '@/lib/games'

const PROVIDER_PREFIX: Record<string, string> = {
  'Pragmatic Play': 'pgp',
  "Play'n GO": 'png',
  NetEnt: 'ntn',
  'Hacksaw Gaming': 'hcw',
  BGaming: 'bgm',
}

export function softswissId(provider: string, slug: string): string | null {
  const prefix = PROVIDER_PREFIX[provider]
  if (!prefix) return null
  return `${prefix}_${slug.replace(/-/g, '_')}`
}

export type GameMediaItem = {
  src: string
  kind: 'cover' | 'gameplay' | 'thumb'
  altEn: string
  altRu: string
}

/** Cover + SoftSwiss/luckmedia gameplay assets (background + thumb when available). */
export function getGameMedia(game: Game): GameMediaItem[] {
  const type = (game.gameType || 'Slots').toLowerCase()
  const items: GameMediaItem[] = [
    {
      src: game.avatar,
      kind: 'cover',
      altEn: `${game.name} demo free — ${game.provider} ${type} cover art on 1weapp`,
      altRu: `${game.name} демо бесплатно — обложка ${game.provider} (${type}) на 1weapp`,
    },
  ]

  const id = softswissId(game.provider, game.slug)
  if (!id) return items

  items.push({
    src: `https://luckmedia.link/${id}/background.webp`,
    kind: 'gameplay',
    altEn: `${game.name} free demo gameplay screenshot — play ${game.name} online no deposit (${game.provider})`,
    altRu: `${game.name} демо геймплей скриншот — играть в ${game.name} бесплатно без депозита (${game.provider})`,
  })

  items.push({
    src: `https://luckmedia.link/${id}/thumb.webp`,
    kind: 'thumb',
    altEn: `${game.name} slot demo thumbnail — ${game.provider} free play no registration`,
    altRu: `${game.name} слот демо превью — ${game.provider} бесплатная игра без регистрации`,
  })

  return items
}

export function mediaAlt(item: GameMediaItem, lang: Lang): string {
  return lang === 'en' ? item.altEn : item.altRu
}
