/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    // Vercel Image Optimization quota returns 402 — serve static assets directly.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/dabalime133/ava/**',
      },
    ],
  },
  async redirects() {
    return [
        {
          source: "/en",
          destination: "/",
          permanent: true
        },
        {
          source: "/en/",
          destination: "/",
          permanent: true
        },
        {
          source: "/en/guides/games",
          destination: "/en/reviews",
          permanent: true
        },
        {
          source: "/en/guides/games/",
          destination: "/en/reviews",
          permanent: true
        },
        {
          source: "/ru/guides/games",
          destination: "/ru/reviews",
          permanent: true
        },
        {
          source: "/ru/guides/games/",
          destination: "/ru/reviews",
          permanent: true
        },
        {
          source: "/guides/games",
          destination: "/en/reviews",
          permanent: true
        },
        {
          source: "/guides/games/",
          destination: "/en/reviews",
          permanent: true
        },
        {
          source: "/en/guides/games/lucky-jet-demo",
          destination: "/en/reviews/lucky-jet",
          permanent: true
        },
        {
          source: "/ru/guides/games/lucky-jet-demo",
          destination: "/ru/reviews/lucky-jet",
          permanent: true
        },
        {
          source: "/guides/games/lucky-jet-demo",
          destination: "/en/reviews/lucky-jet",
          permanent: true
        },
        {
          source: "/en/reviews/lucky-jet-demo",
          destination: "/en/reviews/lucky-jet",
          permanent: true
        },
        {
          source: "/ru/reviews/lucky-jet-demo",
          destination: "/ru/reviews/lucky-jet",
          permanent: true
        },
        {
          source: "/en/guides/games/gates-of-olympus-demo",
          destination: "/en/reviews/gates-of-olympus",
          permanent: true
        },
        {
          source: "/ru/guides/games/gates-of-olympus-demo",
          destination: "/ru/reviews/gates-of-olympus",
          permanent: true
        },
        {
          source: "/guides/games/gates-of-olympus-demo",
          destination: "/en/reviews/gates-of-olympus",
          permanent: true
        },
        {
          source: "/en/reviews/gates-of-olympus-demo",
          destination: "/en/reviews/gates-of-olympus",
          permanent: true
        },
        {
          source: "/ru/reviews/gates-of-olympus-demo",
          destination: "/ru/reviews/gates-of-olympus",
          permanent: true
        },
        {
          source: "/en/guides/games/sweet-bonanza-demo",
          destination: "/en/reviews/sweet-bonanza",
          permanent: true
        },
        {
          source: "/ru/guides/games/sweet-bonanza-demo",
          destination: "/ru/reviews/sweet-bonanza",
          permanent: true
        },
        {
          source: "/guides/games/sweet-bonanza-demo",
          destination: "/en/reviews/sweet-bonanza",
          permanent: true
        },
        {
          source: "/en/reviews/sweet-bonanza-demo",
          destination: "/en/reviews/sweet-bonanza",
          permanent: true
        },
        {
          source: "/ru/reviews/sweet-bonanza-demo",
          destination: "/ru/reviews/sweet-bonanza",
          permanent: true
        },
        {
          source: "/en/guides/games/rocket-queen-demo",
          destination: "/en/reviews/rocket-queen",
          permanent: true
        },
        {
          source: "/ru/guides/games/rocket-queen-demo",
          destination: "/ru/reviews/rocket-queen",
          permanent: true
        },
        {
          source: "/guides/games/rocket-queen-demo",
          destination: "/en/reviews/rocket-queen",
          permanent: true
        },
        {
          source: "/en/reviews/rocket-queen-demo",
          destination: "/en/reviews/rocket-queen",
          permanent: true
        },
        {
          source: "/ru/reviews/rocket-queen-demo",
          destination: "/ru/reviews/rocket-queen",
          permanent: true
        },
        {
          source: "/en/guides/games/sugar-rush-demo",
          destination: "/en/reviews/sugar-rush",
          permanent: true
        },
        {
          source: "/ru/guides/games/sugar-rush-demo",
          destination: "/ru/reviews/sugar-rush",
          permanent: true
        },
        {
          source: "/guides/games/sugar-rush-demo",
          destination: "/en/reviews/sugar-rush",
          permanent: true
        },
        {
          source: "/en/reviews/sugar-rush-demo",
          destination: "/en/reviews/sugar-rush",
          permanent: true
        },
        {
          source: "/ru/reviews/sugar-rush-demo",
          destination: "/ru/reviews/sugar-rush",
          permanent: true
        },
        {
          source: "/en/guides/games/starlight-princess-demo",
          destination: "/en/reviews/starlight-princess",
          permanent: true
        },
        {
          source: "/ru/guides/games/starlight-princess-demo",
          destination: "/ru/reviews/starlight-princess",
          permanent: true
        },
        {
          source: "/guides/games/starlight-princess-demo",
          destination: "/en/reviews/starlight-princess",
          permanent: true
        },
        {
          source: "/en/reviews/starlight-princess-demo",
          destination: "/en/reviews/starlight-princess",
          permanent: true
        },
        {
          source: "/ru/reviews/starlight-princess-demo",
          destination: "/ru/reviews/starlight-princess",
          permanent: true
        },
        {
          source: "/en/guides/games/big-bass-bonanza-demo",
          destination: "/en/reviews/big-bass-bonanza",
          permanent: true
        },
        {
          source: "/ru/guides/games/big-bass-bonanza-demo",
          destination: "/ru/reviews/big-bass-bonanza",
          permanent: true
        },
        {
          source: "/guides/games/big-bass-bonanza-demo",
          destination: "/en/reviews/big-bass-bonanza",
          permanent: true
        },
        {
          source: "/en/reviews/big-bass-bonanza-demo",
          destination: "/en/reviews/big-bass-bonanza",
          permanent: true
        },
        {
          source: "/ru/reviews/big-bass-bonanza-demo",
          destination: "/ru/reviews/big-bass-bonanza",
          permanent: true
        },
        {
          source: "/en/guides/games/the-dog-house-demo",
          destination: "/en/reviews/the-dog-house",
          permanent: true
        },
        {
          source: "/ru/guides/games/the-dog-house-demo",
          destination: "/ru/reviews/the-dog-house",
          permanent: true
        },
        {
          source: "/guides/games/the-dog-house-demo",
          destination: "/en/reviews/the-dog-house",
          permanent: true
        },
        {
          source: "/en/reviews/the-dog-house-demo",
          destination: "/en/reviews/the-dog-house",
          permanent: true
        },
        {
          source: "/ru/reviews/the-dog-house-demo",
          destination: "/ru/reviews/the-dog-house",
          permanent: true
        },
        {
          source: "/en/guides/games/wolf-gold-demo",
          destination: "/en/reviews/wolf-gold",
          permanent: true
        },
        {
          source: "/ru/guides/games/wolf-gold-demo",
          destination: "/ru/reviews/wolf-gold",
          permanent: true
        },
        {
          source: "/guides/games/wolf-gold-demo",
          destination: "/en/reviews/wolf-gold",
          permanent: true
        },
        {
          source: "/en/reviews/wolf-gold-demo",
          destination: "/en/reviews/wolf-gold",
          permanent: true
        },
        {
          source: "/ru/reviews/wolf-gold-demo",
          destination: "/ru/reviews/wolf-gold",
          permanent: true
        },
        {
          source: "/en/guides/games/floating-dragon-demo",
          destination: "/en/reviews/floating-dragon",
          permanent: true
        },
        {
          source: "/ru/guides/games/floating-dragon-demo",
          destination: "/ru/reviews/floating-dragon",
          permanent: true
        },
        {
          source: "/guides/games/floating-dragon-demo",
          destination: "/en/reviews/floating-dragon",
          permanent: true
        },
        {
          source: "/en/reviews/floating-dragon-demo",
          destination: "/en/reviews/floating-dragon",
          permanent: true
        },
        {
          source: "/ru/reviews/floating-dragon-demo",
          destination: "/ru/reviews/floating-dragon",
          permanent: true
        },
        {
          source: "/en/guides/games/fruit-party-demo",
          destination: "/en/reviews/fruit-party",
          permanent: true
        },
        {
          source: "/ru/guides/games/fruit-party-demo",
          destination: "/ru/reviews/fruit-party",
          permanent: true
        },
        {
          source: "/guides/games/fruit-party-demo",
          destination: "/en/reviews/fruit-party",
          permanent: true
        },
        {
          source: "/en/reviews/fruit-party-demo",
          destination: "/en/reviews/fruit-party",
          permanent: true
        },
        {
          source: "/ru/reviews/fruit-party-demo",
          destination: "/ru/reviews/fruit-party",
          permanent: true
        },
        {
          source: "/en/guides/games/zeus-vs-hades-gods-of-war-demo",
          destination: "/en/reviews/zeus-vs-hades-gods-of-war",
          permanent: true
        },
        {
          source: "/ru/guides/games/zeus-vs-hades-gods-of-war-demo",
          destination: "/ru/reviews/zeus-vs-hades-gods-of-war",
          permanent: true
        },
        {
          source: "/guides/games/zeus-vs-hades-gods-of-war-demo",
          destination: "/en/reviews/zeus-vs-hades-gods-of-war",
          permanent: true
        },
        {
          source: "/en/reviews/zeus-vs-hades-gods-of-war-demo",
          destination: "/en/reviews/zeus-vs-hades-gods-of-war",
          permanent: true
        },
        {
          source: "/ru/reviews/zeus-vs-hades-gods-of-war-demo",
          destination: "/ru/reviews/zeus-vs-hades-gods-of-war",
          permanent: true
        },
        {
          source: "/en/guides/games/buffalo-king-megaways-demo",
          destination: "/en/reviews/buffalo-king-megaways",
          permanent: true
        },
        {
          source: "/ru/guides/games/buffalo-king-megaways-demo",
          destination: "/ru/reviews/buffalo-king-megaways",
          permanent: true
        },
        {
          source: "/guides/games/buffalo-king-megaways-demo",
          destination: "/en/reviews/buffalo-king-megaways",
          permanent: true
        },
        {
          source: "/en/reviews/buffalo-king-megaways-demo",
          destination: "/en/reviews/buffalo-king-megaways",
          permanent: true
        },
        {
          source: "/ru/reviews/buffalo-king-megaways-demo",
          destination: "/ru/reviews/buffalo-king-megaways",
          permanent: true
        },
        {
          source: "/en/guides/games/madame-destiny-megaways-demo",
          destination: "/en/reviews/madame-destiny-megaways",
          permanent: true
        },
        {
          source: "/ru/guides/games/madame-destiny-megaways-demo",
          destination: "/ru/reviews/madame-destiny-megaways",
          permanent: true
        },
        {
          source: "/guides/games/madame-destiny-megaways-demo",
          destination: "/en/reviews/madame-destiny-megaways",
          permanent: true
        },
        {
          source: "/en/reviews/madame-destiny-megaways-demo",
          destination: "/en/reviews/madame-destiny-megaways",
          permanent: true
        },
        {
          source: "/ru/reviews/madame-destiny-megaways-demo",
          destination: "/ru/reviews/madame-destiny-megaways",
          permanent: true
        },
        {
          source: "/en/guides/games/mustang-gold-demo",
          destination: "/en/reviews/mustang-gold",
          permanent: true
        },
        {
          source: "/ru/guides/games/mustang-gold-demo",
          destination: "/ru/reviews/mustang-gold",
          permanent: true
        },
        {
          source: "/guides/games/mustang-gold-demo",
          destination: "/en/reviews/mustang-gold",
          permanent: true
        },
        {
          source: "/en/reviews/mustang-gold-demo",
          destination: "/en/reviews/mustang-gold",
          permanent: true
        },
        {
          source: "/ru/reviews/mustang-gold-demo",
          destination: "/ru/reviews/mustang-gold",
          permanent: true
        },
        {
          source: "/en/guides/games/wild-west-gold-demo",
          destination: "/en/reviews/wild-west-gold",
          permanent: true
        },
        {
          source: "/ru/guides/games/wild-west-gold-demo",
          destination: "/ru/reviews/wild-west-gold",
          permanent: true
        },
        {
          source: "/guides/games/wild-west-gold-demo",
          destination: "/en/reviews/wild-west-gold",
          permanent: true
        },
        {
          source: "/en/reviews/wild-west-gold-demo",
          destination: "/en/reviews/wild-west-gold",
          permanent: true
        },
        {
          source: "/ru/reviews/wild-west-gold-demo",
          destination: "/ru/reviews/wild-west-gold",
          permanent: true
        },
        {
          source: "/guides",
          destination: "/en/guides",
          permanent: true
        },
        {
          source: "/guides/",
          destination: "/en/guides",
          permanent: true
        },
        {
          source: "/guides/:slug",
          destination: "/en/guides/:slug",
          permanent: true
        },
        {
          source: "/reviews",
          destination: "/en/reviews",
          permanent: true
        },
        {
          source: "/reviews/",
          destination: "/en/reviews",
          permanent: true
        },
        {
          source: "/reviews/:slug",
          destination: "/en/reviews/:slug",
          permanent: true
        }
          ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
      {
        source: '/banners/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/avatars/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/experts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/icon-:size.png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/og-picture.jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      {
        source: '/yandex_1fecab4dce49084e.html',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ]
  },
}

export default nextConfig
