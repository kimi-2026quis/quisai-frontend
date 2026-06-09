/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    COZE_API_TOKEN: process.env.COZE_API_TOKEN,
    COZE_APP_ID: process.env.COZE_APP_ID,
  },
  async rewrites() {
    return [
      {
        source: '/api/scraper/:path*',
        destination: '/api/scraper/:path*',
      },
    ]
  },
}

module.exports = nextConfig