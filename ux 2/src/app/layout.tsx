import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import './globals.css'

export const metadata: Metadata = {
  title: 'Andrew Whited — Product Designer',
  description:
    'Senior product designer focused on complex systems, AI, and enterprise software.',
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
        <Nav />
        {children}
      </body>
    </html>
  )
}
