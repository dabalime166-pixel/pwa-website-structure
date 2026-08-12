import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/yandex_1fecab4dce49084e.html'],
    },
    sitemap: 'https://www.1weapp.online/sitemap.xml',
  }
}
