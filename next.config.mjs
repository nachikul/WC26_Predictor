/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  serverExternalPackages: ['@anthropic-ai/sdk', 'groq-sdk'],
}

export default nextConfig
