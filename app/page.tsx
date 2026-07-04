import { redirect } from 'next/navigation'

/**
 * Root → redirect to /en (default locale).
 * Each locale page carries hreflang alternate tags for proper SEO.
 */
export default function RootPage() {
  redirect('/en')
}
