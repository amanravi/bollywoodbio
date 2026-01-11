import type { Metadata, Viewport } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
