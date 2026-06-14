import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Required for optimised Docker production image (copies only what's needed)
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@anthropic-ai/sdk', 'groq-sdk'],
  },
}

export default nextConfig
