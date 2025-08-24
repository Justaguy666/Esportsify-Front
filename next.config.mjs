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
      // Legacy top-level routes -> /user/*
      {
        source: '/home',
        destination: '/user/home',
      },
      {
        source: '/login',
        destination: '/user/login',
      },
      {
        source: '/forgot-password',
        destination: '/user/forgot-password',
      },
      {
        source: '/profile',
        destination: '/user/profile',
      },
      // Legacy tournaments paths -> /user/tournaments/*
      {
        source: '/tournaments/:path*',
        destination: '/user/tournaments/:path*',
      },
      {
        source: '/tournaments-status/:path*',
        destination: '/user/tournaments/tournaments-status/:path*',
      },
      // Legacy schedule -> /user/schedule
      {
        source: '/schedule',
        destination: '/user/schedule',
      },
    ]
  },
}

export default nextConfig
