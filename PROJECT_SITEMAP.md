# 1weapp Project Sitemap & Architecture

**Project:** PWA Casino Gaming Platform (1weapp.online)  
**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4  
**Deployment:** Vercel | **Repo:** dabalime166-pixel/pwa-website-structure | **Branch:** new-games-and-avatars

---

## 📋 URL Structure & Routing

```
/ (root - redirects to /en or /ru based on locale)
├── /en/ (English home)
│   ├── /en/[slug]/ (English game page - dynamic)
│   ├── /en/guides/ (Guides index)
│   └── /en/guides/[slug]/ (Individual guide)
├── /ru/ (Russian home)
│   ├── /ru/[slug]/ (Russian game page - dynamic)
│   ├── /ru/guides/ (Guides index - Russian)
│   └── /ru/guides/[slug]/ (Individual guide - Russian)
├── /sitemap.xml (XML sitemap)
├── /robots.txt (generated from robots.ts)
└── /llms.txt (LLM sitemap)
```

---

## 📁 File Structure & Key Components

### **App Layer** (`/app/`)

#### Root Layout & Pages
- **`app/layout.tsx`** - Root layout with metadata, GA4, Yandex Metrika
  - Sets og:image from GitHub: https://raw.githubusercontent.com/dabalime133/ava/main/og-picture.jpg
  - Contains analytics scripts (afterInteractive strategy)
  
- **`app/page.tsx`** - Redirect to /en or /ru based on locale detection

#### Locale-Specific Layouts
- **`app/en/layout.tsx`** - English locale wrapper
- **`app/ru/layout.tsx`** - Russian locale wrapper
- **`app/en/page.tsx`** - English home page
- **`app/ru/page.tsx`** - Russian home page

#### Game Pages (Dynamic Routes)
- **`app/en/[slug]/page.tsx`** - English game page
  - Props: `{ params: { slug: string } }`
  - Uses `getGame()` to fetch from games-data.json
  - Renders `GamePage` component
  - Schema.org with unique rating via `getGameRating()`

- **`app/ru/[slug]/page.tsx`** - Russian game page (same structure)

#### Guides Section
- **`app/en/guides/page.tsx`** - English guides index
- **`app/en/guides/[slug]/page.tsx`** - Individual English guide
- **`app/ru/guides/page.tsx`** - Russian guides index  
- **`app/ru/guides/[slug]/page.tsx`** - Individual Russian guide

#### Special Routes
- **`app/not-found.tsx`** - 404 error page
- **`app/robots.ts`** - Robot.txt configuration (disallow _next/, /api/, /static/)
- **`app/sitemap.ts`** - Dynamic XML sitemap generation

---

### **Components Layer** (`/components/`)

#### Page Components (main layout containers)
| Component | Purpose |
|-----------|---------|
| `home-page.tsx` | Home page content (hero, game catalog, SEO sections) |
| `game-page.tsx` | Individual game page with schema.org markup |
| `guide-single-page.tsx` | Single guide article page |
| `guides-page.tsx` | Guides index/list page |
| `guides-index-page.tsx` | Alternative guides layout (if needed) |

#### Reusable Components
| Component | Purpose |
|-----------|---------|
| `site-header.tsx` | Navigation, language switcher (EN/RU), logo |
| `site-footer.tsx` | Footer with links, legal info |
| `game-card.tsx` | Individual game card in grid |
| `game-search.tsx` | Search + filter + pagination (shows 12 initial, Load More) |
| `game-viewer.tsx` | Game iframe/viewer container |
| `ui/button.tsx` | Custom button component |

---

### **Lib Layer** (`/lib/`)

| File | Purpose | Key Exports |
|------|---------|-------------|
| **`games.ts`** | Game data utilities & translations | `getGame()`, `getSeoTitle()`, `getSeoDescription()`, `getGameRating()`, `i18n` object |
| **`games-data.json`** | Game catalog (50+ games) | Array of `Game` objects with slug, name, provider, titleSeoEn, titleSeoRu, etc. |
| **`guides-data.ts`** | Guide content & metadata | Guide objects with titles, descriptions |
| **`utils.ts`** | General utilities | Helper functions |

#### Key Functions in `games.ts`
```typescript
getGame(slug: string): Game | undefined
getSeoTitle(game: Game, lang: 'en' | 'ru'): string
getSeoDescription(game: Game, lang: 'en' | 'ru'): string
getGameRating(gameName: string): { rating: number; reviewCount: number }
```

---

### **Config Files**

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js configuration |
| `tailwind.config.js` | Tailwind CSS v4 theme |
| `tsconfig.json` | TypeScript configuration |
| `components.json` | shadcn/ui configuration |
| `package.json` | Dependencies & scripts |
| `vercel.json` | Vercel deployment config |
| `public/manifest.json` | PWA manifest |

---

### **Public Assets** (`/public/`)

- `llms.txt` - Machine-readable sitemap for LLMs
- `manifest.json` - PWA configuration
- (Images, favicons, etc. - if present)

---

## 🎮 Game Data Structure

### `Game` Interface (from games-data.json)
```typescript
{
  slug: string               // URL identifier (e.g., "lucky-jet")
  name: string              // Display name (e.g., "Lucky Jet")
  titleSeoEn: string        // English SEO title
  titleSeoRu: string        // Russian SEO title
  descSeoEn: string         // English meta description
  descSeoRu: string         // Russian meta description
  provider: string          // Developer name (e.g., "1weapp Games")
  avatar: string            // Game thumbnail URL
  rtp: number              // Return to player percentage
  volatility: string       // "Low" | "Medium" | "High"
  // ... other metadata
}
```

### Schema.org Implementation
- **Type:** `SoftwareApplication`
- **aggregateRating:** Unique per game (3.5-4.9★, 100-500 reviews) via `getGameRating()`
- **URL:** `https://www.1weapp.online/{lang}/{slug}`
- **Image:** Game avatar
- **Price:** Free (0 USD)

---

## 🌐 SEO & Meta Configuration

### Languages & Locale Handling
- **Default:** English (/)
- **Supported:** English (/en), Russian (/ru)
- **Switching:** Language buttons preserve slug (e.g., /en/lucky-jet ↔ /ru/lucky-jet)

### Title Strategy
- **Home pages:** `metaTitleHome[Lang]` from `i18n`
- **Game pages:** `getSeoTitle(game, lang)` from games-data
- **Guides:** Title from `guides-data.ts`
- **Pattern:** Game name + optimized SEO phrase

### Description Strategy
- **Meta descriptions:** `getSeoDescription(game, lang)`
- **OG image:** Shared across site (og-picture.jpg from GitHub)
- **Canonical URLs:** Language-specific without duplication (e.g., /en/guides/plinko)

### Indexing Rules (robots.txt)
```
Allow:   /
Allow:   /en/*
Allow:   /ru/*
Disallow: /_next/
Disallow: /api/
Disallow: /static/
```

---

## 🔧 Common Tasks & Where to Find Code

| Task | File(s) |
|------|---------|
| Add new game | `lib/games-data.json` |
| Change game title/description | `lib/games-data.json` (titleSeoEn, titleSeoRu, etc.) |
| Fix language switcher URLs | `components/site-header.tsx` (lines ~13-16) |
| Add analytics tracking | `app/layout.tsx` (GA4, Yandex Metrika scripts) |
| Change home page content | `components/home-page.tsx` |
| Modify game card styling | `components/game-card.tsx` + `app/globals.css` |
| Add pagination/Load More logic | `components/game-search.tsx` (INITIAL_GAMES_COUNT = 12) |
| Update game rating generation | `lib/games.ts` (`getGameRating()` function) |
| Change site colors/fonts | `app/globals.css` (CSS variables & Tailwind config) |
| Add new guide | `lib/guides-data.ts` + create page in `/app/{lang}/guides/[slug]/` |
| Modify SEO schema | `components/game-page.tsx` (`buildJsonLd()` function) |

---

## 📊 Performance Optimizations

- **Initial game load:** 12 games (pagination)
- **Load More increment:** 12 games per click
- **Home page size:** ~150-200 KB (reduced from 470 KB)
- **Analytics:** afterInteractive strategy (non-blocking)
- **Image optimization:** Next.js automatic optimization

---

## 🐛 Known Issues & Recent Fixes

✅ **Fixed:**
1. Russian title on /en/ pages (titleSeoEn corrected)
2. Language switcher URL duplication (preserved locale prefix)
3. Fake uniform ratings (now unique per game via hash)
4. Home page bloat (pagination implemented)
5. og:image missing (added to layout.tsx)

⏳ **TODO:**
- Mines game display (pending implementation)

---

## 📝 Important Notes

- **Git Branch:** `new-games-and-avatars` (development)
- **Main Branch:** `main` (production)
- **Deployment:** Automatic on push via Vercel
- **Environment Variables:** Set in Vercel project settings
  - GA4 ID: G-X4YHR9MBCQ (in code)
  - Yandex Metrika ID: 106419141 (in middleware.tsx)
- **CSS Architecture:** Tailwind v4 with CSS variables in `globals.css`
- **i18n Pattern:** No external i18n library, simple object in `games.ts`

---

## 🎯 Quick Reference: Key Exports

```typescript
// From lib/games.ts
import { 
  getGame,              // (slug: string) => Game | undefined
  getSeoTitle,          // (game: Game, lang: Lang) => string
  getSeoDescription,    // (game: Game, lang: Lang) => string
  getGameRating,        // (gameName: string) => { rating, reviewCount }
  i18n,                 // { home, guides, games: {...} }
  games,                // All games array
  CTA_URL               // https://lkiv.cc/dea2
} from '@/lib/games'
```

---

**Last Updated:** July 15, 2026  
**Maintained By:** v0 AI Assistant
