'use client'

import { useCart } from '@/lib/cart-context'
import styles from './CartButton.module.css'

export default function CartButton() {
  const { cart, openCart } = useCart()
  const count = cart?.totalQuantity ?? 0

  if (count === 0) return null

  return (
    <button
      type="button"
      className={styles.button}
      onClick={openCart}
      aria-label={`Open cart — ${count} ${count === 1 ? 'item' : 'items'}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M6 6V5a4 4 0 1 1 8 0v1m-9.5 0h11l1 12H5.5l1-12Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      <span className={styles.count}>{count}</span>
    </button>
  )
}
