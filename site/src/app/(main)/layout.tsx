import Nav from '@/components/Nav'
import { CartProvider } from '@/lib/cart-context'
import CartDrawer from '@/components/CartDrawer'
import CartButton from '@/components/CartButton'

const comingSoon = process.env.COMING_SOON === 'true'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (comingSoon) {
    return <>{children}</>
  }

  return (
    <CartProvider>
      <Nav />
      <CartButton />
      <CartDrawer />
      {children}
    </CartProvider>
  )
}
