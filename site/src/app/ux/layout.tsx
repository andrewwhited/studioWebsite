import type { Metadata } from 'next'
import UxNav from '@/components/UxNav'

export const metadata: Metadata = {
  title: 'Andrew Whited — Product Designer',
  description:
    'Senior product designer focused on complex systems, AI, and enterprise software.',
}

export default function UxLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <UxNav />
      {children}
    </>
  )
}
