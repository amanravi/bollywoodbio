/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // When DATA_DIR is set, uploaded images are stored outside public/.
  // This rewrite sends /images/TIMESTAMP_* requests to the API that serves
  // from the persistent uploads folder. Static files (like logos) in
  // public/images/ are served first by Next.js, so they're unaffected.
  async rewrites() {
    return [
      {
        source: '/images/:filename(\\d+_.*)',
        destination: '/api/uploads/:filename',
      },
    ]
  },
}

module.exports = nextConfig
