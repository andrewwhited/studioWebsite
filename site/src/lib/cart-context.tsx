'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import {
  createCart,
  addToCart,
  updateCartLine,
  removeFromCart,
  getCart,
  type Cart,
} from './shopify'

type CartContextType = {
  cart: Cart | null
  isOpen: boolean
  isLoading: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (variantId: string) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
}

const CartContext = createContext<CartContextType | null>(null)

const CART_ID_KEY = 'shopify_cart_id'

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Restore cart from localStorage on mount
  useEffect(() => {
    const cartId = localStorage.getItem(CART_ID_KEY)
    if (cartId) {
      getCart(cartId).then((existingCart) => {
        if (existingCart) {
          setCart(existingCart)
        } else {
          localStorage.removeItem(CART_ID_KEY)
        }
      }).catch(() => {
        localStorage.removeItem(CART_ID_KEY)
      })
    }
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback(async (variantId: string) => {
    setIsLoading(true)
    try {
      let updatedCart: Cart
      if (cart) {
        updatedCart = await addToCart(cart.id, variantId)
      } else {
        updatedCart = await createCart(variantId)
        localStorage.setItem(CART_ID_KEY, updatedCart.id)
      }
      setCart(updatedCart)
      setIsOpen(true)
    } catch (err) {
      console.error('Failed to add item to cart:', err)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    if (!cart) return
    setIsLoading(true)
    try {
      const updatedCart = await updateCartLine(cart.id, lineId, quantity)
      setCart(updatedCart)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart) return
    setIsLoading(true)
    try {
      const updatedCart = await removeFromCart(cart.id, [lineId])
      setCart(updatedCart)
    } finally {
      setIsLoading(false)
    }
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
