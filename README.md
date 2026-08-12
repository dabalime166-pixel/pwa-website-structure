# 1weapp

Next.js catalog of free casino demo games (crash, slots, mines).

## Develop

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful scripts

```bash
pnpm push:keys      # generate Web Push VAPID keys
pnpm push:export    # export subscribers to data/push-subscribers.json
pnpm push:send      # send push from your PC
node scripts/sync-games-catalog.mjs
node scripts/generate-llms-txt.mjs
node scripts/submit-indexnow.mjs
```

## Env

See `.env.example` for Web Push + Neon Postgres.
