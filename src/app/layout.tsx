import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WC 2026 AI Predictor',
  description: 'Live AI-powered match predictions for FIFA World Cup 2026',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
