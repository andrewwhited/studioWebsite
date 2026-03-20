import type { Metadata } from 'next'
import UxNav from '@/components/UxNav'
import GridOverlay from '@/components/GridOverlay'

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
    <div data-theme="ux" style={{ minHeight: '100svh', backgroundColor: 'var(--color-bg)' }}>
      <UxNav />
      {children}
      <GridOverlay />
    </div>
  )
}
