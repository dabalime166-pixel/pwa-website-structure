import webpush from 'web-push'

const keys = webpush.generateVAPIDKeys()

console.log(`
Add these to .env.local and Vercel project env:

NEXT_PUBLIC_VAPID_PUBLIC_KEY=${keys.publicKey}
VAPID_PRIVATE_KEY=${keys.privateKey}
VAPID_SUBJECT=mailto:admin@crashgames.demo
ADMIN_PUSH_SECRET=${crypto.randomUUID().replace(/-/g, '')}
`)
