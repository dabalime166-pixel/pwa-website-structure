# SEO Management Guide

## Overview

All pages now support per-page SEO metadata (title, description) that can be easily managed without touching route code.

## Game Pages

### Managing Game SEO

Edit `/lib/games-data.json` to customize SEO for each game:

```json
{
  "slug": "lucky-jet",
  "name": "Lucky Jet",
  "titleSeoEn": "Lucky Jet Strategy Guide 2026 — How to Win | 1weapp",
  "titleSeoRu": "Стратегия Lucky Jet 2026 — Как выиграть | 1weapp",
  "descriptionSeoEn": "Master Lucky Jet with expert strategies, best multiplier targets, bankroll rules and proven tactics.",
  "descriptionSeoRu": "Полный гайд по Lucky Jet: стратегии, выбор множителя, управление банкроллом и советы."
}
```

### Fallback Behavior

- **If `titleSeoEn` is empty:** Auto-generates as `{game.name} Demo — Play Free Online`
- **If `titleSeoRu` is empty:** Auto-generates as `{game.name} — Играть в демо онлайн`
- **If `descriptionSeoEn` is empty:** Auto-generates from keywords
- **If `descriptionSeoRu` is empty:** Auto-generates from keywords

### Functions

In `lib/games.ts`:
- `getSeoTitle(game, lang)` — returns custom title or fallback
- `getSeoDescription(game, lang)` — returns custom description or fallback

## Guide Pages

### Managing Guide SEO

Edit `/lib/guides-data.ts` to customize SEO for each guide:

```typescript
{
  id: 'plinko',
  titleEn: 'Plinko Mechanics',
  titleSeoEn: 'Plinko Strategy Guide 2026 — How to Win at Plinko Online | 1weapp',
  descriptionSeoEn: 'Master Plinko with our expert strategy guide...',
  titleRu: 'Механика Plinko',
  titleSeoRu: 'Стратегия Плинко 2026 — Как выиграть в Plinko онлайн | 1weapp',
  descriptionSeoRu: 'Полный гайд по Плинко: теория вероятностей...',
}
```

### Fallback Behavior

In `app/en/guides/[slug]/page.tsx` and `app/ru/guides/[slug]/page.tsx`:

- **If `titleSeoEn/titleSeoRu` is empty:** Falls back to hardcoded SEO object
- **If that's also empty:** Uses guide `titleEn`/`titleRu` with " — iGaming Strategy Guide | 1weapp"
- **If `descriptionSeoEn/descriptionSeoRu` is empty:** Falls back to hardcoded SEO object
- **If that's also empty:** Uses guide subtitle

## Updating Site Domain

All hardcoded domains are now `https://1weapp.vercel.app`. Update in:
- `app/en/[slug]/page.tsx` — Line 25 (game canonical)
- `app/ru/[slug]/page.tsx` — Line 25 (game canonical)
- `app/en/guides/[slug]/page.tsx` — Line 6 (guide canonical)
- `app/ru/guides/[slug]/page.tsx` — Line 6 (guide canonical)

If you move to a different domain, search and replace `https://1weapp.vercel.app` in all four files.

## Example: Customizing a Game Page

To override the auto-generated title for "Lucky Jet" on both EN and RU:

1. Open `/lib/games-data.json`
2. Find the "lucky-jet" entry
3. Add or update:
   ```json
   "titleSeoEn": "Lucky Jet Strategy Guide 2026 — Master the Multiplier | 1weapp",
   "titleSeoRu": "Стратегия Lucky Jet 2026 — Как выиграть в краш-игре | 1weapp"
   ```
4. Deploy — changes are live immediately

## Example: Customizing a Guide Page

To override the SEO for the "Mines" guide:

1. Open `/lib/guides-data.ts`
2. Find the Mines guide object (id: 'mines')
3. Add or update:
   ```typescript
   titleSeoEn: 'Mines Game Strategy 2026 — Expert Tips & Winning Tactics | 1weapp',
   descriptionSeoEn: 'Learn the best Mines strategies for online casinos...',
   titleSeoRu: 'Стратегия Мины 22026 — Лучшие тактики и советы | 1weapp',
   descriptionSeoRu: 'Полный гайд по игре Мины в онлайн-казино...',
   ```
4. Deploy — changes are live immediately

## Notes

- All SEO fields are optional — leave them empty to use auto-generated values
- Keep titles under 60 characters and descriptions under 160 characters for best SEO display
- Include your target keywords naturally in both title and description
- Ensure each page has a unique title and description
