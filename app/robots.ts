import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/', 
          '/en/guides/*',
          '/ru', 
          '/ru/guides/*',
        ],
        disallow: [
          '/en',           // Disallow /en (duplicate of / - main page serves English via rewrite)
          '/_next/',       // Block Next.js chunks and assets
          '/static/',      // Block static files folder
          '/api/',         // Block API routes
          '/*?*',          // Block any URLs with query parameters (prevent duplicate content)
        ],
      },
    ],
    sitemap: 'https://www.1weapp.online/sitemap.xml',
  }
}
