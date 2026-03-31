'use client'

import { useCart } from '@/lib/cart-context'
import styles from './product.module.css'

export default function AddToCartButton({ variantId }: { variantId: string }) {
  const { addItem, isLoading } = useCart()

  return (
    <button
      type="button"
      className={styles.addBtn}
      onClick={() => addItem(variantId)}
      disabled={isLoading}
    >
      {isLoading ? 'Adding…' : 'Add to cart'}
    </button>
  )
}
