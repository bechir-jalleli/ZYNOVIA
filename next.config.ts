import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'valotechlab.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
}

export default nextConfig
