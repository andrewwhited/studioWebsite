'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/shopify'
import styles from './CartDrawer.module.css'

export default function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, updateItem, removeItem } = useCart()
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, closeCart])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const lines = cart?.lines.nodes ?? []
  const totalQuantity = cart?.totalQuantity ?? 0

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.headerTitle}>
            Cart{totalQuantity > 0 && ` (${totalQuantity})`}
          </span>
          <button type="button" className={styles.closeBtn} onClick={closeCart}>
            ×
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {lines.length === 0 ? (
            <p className={styles.empty}>Your cart is empty.</p>
          ) : (
            <ul className={styles.lineItems}>
              {lines.map((line) => (
                <li key={line.id} className={styles.lineItem}>
                  {line.merchandise.product.featuredImage ? (
                    <Image
                      src={line.merchandise.product.featuredImage.url}
                      alt={line.merchandise.product.featuredImage.altText || line.merchandise.product.title}
                      width={80}
                      height={107}
                      className={styles.lineImage}
                    />
                  ) : (
                    <div className={styles.lineImagePlaceholder} />
                  )}
                  <div className={styles.lineDetails}>
                    <Link
                      href={`/store/${line.merchandise.product.handle}`}
                      className={styles.lineTitle}
                      onClick={closeCart}
                    >
                      {line.merchandise.product.title}
                    </Link>
                    {line.merchandise.title !== 'Default Title' && (
                      <span className={styles.lineVariant}>{line.merchandise.title}</span>
                    )}
                    <span className={styles.linePrice}>
                      {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                    </span>
                    <div className={styles.lineActions}>
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        disabled={isLoading}
                        onClick={() => {
                          if (line.quantity === 1) {
                            removeItem(line.id)
                          } else {
                            updateItem(line.id, line.quantity - 1)
                          }
                        }}
                      >
                        −
                      </button>
                      <span className={styles.qty}>{line.quantity}</span>
                      <button
                        type="button"
                        className={styles.qtyBtn}
                        disabled={isLoading}
                        onClick={() => updateItem(line.id, line.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className={styles.removeBtn}
                        disabled={isLoading}
                        onClick={() => removeItem(line.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && cart && (
          <div className={styles.footer}>
            <div className={styles.subtotal}>
              <span>Subtotal</span>
              <span>{formatPrice(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode)}</span>
            </div>
            <p className={styles.footerNote}>Shipping and taxes calculated at checkout.</p>
            <a href={cart.checkoutUrl} className={styles.checkoutBtn}>
              Checkout
            </a>
          </div>
        )}
      </aside>
    </>
  )
}
