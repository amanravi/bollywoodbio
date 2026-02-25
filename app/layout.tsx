import type { Metadata, Viewport } from 'next'
import './globals.css'

let fontClasses = ''

try {
  // Dynamic import pattern to prevent font loading from crashing the layout
  const { Bebas_Neue, Inter } = require('next/font/google')
  
  const displayFont = Bebas_Neue({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
    variable: '--font-display',
  })

  const bodyFont = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    display: 'swap',
    variable: '--font-body',
  })

  fontClasses = `${bodyFont.className} ${displayFont.variable}`
} catch (error) {
  console.error('[Layout] Font loading failed:', error)
  fontClasses = ''
}

export const metadata: Metadata = {
  title: 'BollywoodBio - Book Your Movie Tickets',
  description: 'Your premier destination for Bollywood movies. Book tickets for the latest releases.',
  icons: {
    icon: '/images/logo1.png',
    apple: '/images/logo1.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={fontClasses}>{children}</body>
    </html>
  )
}
