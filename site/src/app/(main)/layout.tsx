import Nav from '@/components/Nav'
import { CartProvider } from '@/lib/cart-context'
import CartDrawer from '@/components/CartDrawer'
import CartButton from '@/components/CartButton'

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
