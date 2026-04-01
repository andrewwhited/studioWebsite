import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Andrew Whited',
  description: 'Studio, objects, art, and image.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/kya8jzr.css" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
