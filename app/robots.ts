import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/$',          // Разрешаем ТОЛЬКО чистую главную страницу (символ $ означает точный конец строки)
        '/en',         // Разрешаем английскую главную
        '/en/*',       // Разрешаем любые подстраницы на английском (игры, гайды)
        '/ru',         // Разрешаем русскую главную
        '/ru/*',       // Разрешаем любые подстраницы на русском (игры, гайды)
      ],
      disallow: [
        '/_next/',     // Жестко блокируем системный мусор (chunks, статику)
        '/api/',       // Блокируем API-роуты
        '/',           // Блокируем всё остальное в корне (любые /sweet-bonanza, /guides без языка и т.д.)
      ],
    },
    sitemap: 'https://www.1weapp.online/sitemap.xml',
  }
}
