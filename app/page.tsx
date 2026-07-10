/**
 * Root page - internally rewritten to /en via next.config.mjs rewrites()
 * Returns 200 OK with /en content while keeping URL as /
 * No redirect needed - handled by Next.js rewrite
 */
export default function RootPage() {
  return null
}
