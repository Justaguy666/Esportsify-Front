/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    domains: [],
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/tournaments-status/:path*',
        destination: '/tournaments/tournaments-status/:path*',
      },
    ]
  },
}

export default nextConfig
