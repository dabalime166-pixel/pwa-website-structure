import { headers } from 'next/headers'

/**
 * Component to inject noindex,nofollow meta tag when middleware sets X-Robots-Tag header.
 * Prevents indexing of 404 pages and malformed URLs.
 */
export async function NoIndexHandler() {
  const headersList = await headers()
  const robotsTag = headersList.get('X-Robots-Tag')

  if (!robotsTag) {
    return null
  }

  return <meta name="robots" content={robotsTag} />
}
