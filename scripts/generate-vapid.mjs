/**
 * Generate VAPID keys + admin secret for Web Push.
 *
 * Usage: node scripts/generate-vapid.mjs
 */
import webpush from 'web-push'
import { randomUUID } from 'crypto'

const keys = webpush.generateVAPIDKeys()

console.log(`
Add these to .env.local (PC) and Vercel project env:

NEXT_PUBLIC_VAPID_PUBLIC_KEY=${keys.publicKey}
VAPID_PRIVATE_KEY=${keys.privateKey}
VAPID_SUBJECT=mailto:admin@1weapp.online
ADMIN_PUSH_SECRET=${randomUUID().replace(/-/g, '')}

# Neon Postgres (free tier): https://neon.tech
DATABASE_URL=postgresql://...

# Enable saving subscribers from the site:
NEXT_PUBLIC_PUSH_PERSIST_SUBSCRIPTIONS=true
`)
