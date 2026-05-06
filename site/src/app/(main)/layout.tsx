import dynamic from 'next/dynamic'
import Nav from '@/components/Nav'
import { CartProvider } from '@/lib/cart-context'
import CartButton from '@/components/CartButton'

const CartDrawer = dynamic(() => import('@/components/CartDrawer'))

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <Nav />
      <CartButton />
      <CartDrawer />
      {children}
    </CartProvider>
  )
}
