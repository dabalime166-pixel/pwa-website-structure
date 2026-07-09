import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

/**
 * Root → redirect to /en (default locale).
 * Each locale page carries hreflang alternate tags for proper SEO.
 * This redirect uses replace() to prevent browser history stack-up.
 */
export default async function RootPage() {
  // Detect preferred language from Accept-Language header
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  
  // Default to English; only switch to Russian if explicitly requested
  const defaultLang = acceptLanguage.includes('ru-') ? 'ru' : 'en'
  
  redirect(`/${defaultLang}`)
}
