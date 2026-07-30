'use client'

import { RandomDemoPromo } from '@/components/random-demo-promo'
import type { Game, Lang } from '@/lib/games'

/** Light shell — reel avatars only load after the user presses Spin. */
export function LazyRandomDemo({ games, lang }: { games: Game[]; lang: Lang }) {
  return (
    <div className="lazy-random-demo">
      <RandomDemoPromo games={games} lang={lang} />
    </div>
  )
}
