/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/dabalime133/ava/**',
      },
    ],
  },
  // Internal rewrite: load /en content on / without changing URL in browser
  // Returns 200 OK instead of 307 redirect, improving performance and SEO
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/en',
      },
    ]
  },
  // Allow iframes from game providers in Content-Security-Policy
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
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
