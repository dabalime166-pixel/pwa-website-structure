import { MetadataRoute } from 'next'

/**
 * robots.txt configuration for 1weapp.online
 * 
 * Rules:
 * - Allow only: / (root), /en/*, /ru/* (all pages with language prefix)
 * - Disallow: everything else including:
 *   - /_next/ (Next.js chunks and static assets)
 *   - /api/ (API routes)
 *   - /* (catch-all for malformed URLs like /game-name without language)
 * 
 * Invalid routes are additionally marked with noindex via middleware header.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',           // Main page
          '/en/',        // All English pages (games, guides, etc.)
          '/ru/',        // All Russian pages (games, guides, etc.)
        ],
        disallow: [
          '/_next/',     // Block Next.js internals (chunks, static, etc.)
          '/static/',    // Block static folder
          '/api/',       // Block API routes
          '/*?*',        // Block any URLs with query parameters
        ],
      },
    ],
    sitemap: 'https://www.1weapp.online/sitemap.xml',
  }
}
