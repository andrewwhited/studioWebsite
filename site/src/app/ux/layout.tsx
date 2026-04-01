import type { Metadata } from 'next'
import UxNav from '@/components/UxNav'
import GridOverlay from '@/components/GridOverlay'
import LogoOutlineStroke from '@/components/icons/LogoOutlineStroke'

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
    <div data-theme="ux" className="ux-root" style={{ minHeight: '100svh', backgroundColor: 'var(--color-bg)', position: 'relative', overflow: 'hidden' }}>
      <LogoOutlineStroke className="ux-bg-logo" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <UxNav />
        {children}
        <GridOverlay />
      </div>
    </div>
  )
}
