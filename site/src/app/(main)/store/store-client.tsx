'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { type Product } from '@/data/store'
import styles from './store.module.css'

type Props = {
  products: Product[] | null
  error: boolean
}

export default function StoreClient({ products, error }: Props) {
  const [activeCollection, setActiveCollection] = useState<string | null>(null)
  const [activeType, setActiveType] = useState<string | null>(null)

  const collections = useMemo(() => {
    if (!products) return []
    const set = new Set<string>()
    for (const p of products) {
      if (p.collection) set.add(p.collection)
    }
    return Array.from(set).sort()
  }, [products])

  const types = useMemo(() => {
    if (!products) return []
    const set = new Set<string>()
    for (const p of products) {
      if (p.product_type) set.add(p.product_type)
    }
    return Array.from(set).sort()
  }, [products])

  const filtered = (products ?? []).filter((p) => {
    if (activeCollection && p.collection !== activeCollection) return false
    if (activeType && p.product_type !== activeType) return false
    return true
  })

  return (
    <main className={styles.main}>

      {/* Left — title, intro, filters */}
      <div className={styles.left}>
        <div className={styles.leftText}>
          <p className={styles.title}>Store</p>
          <p className={styles.intro}>
            Small-batch production, vessels, tools, and objects made in the
            workshop. Shipping calculated at checkout. Local pickup available.
          </p>
        </div>
        <div className={styles.filters}>
          {collections.length > 0 && (
            <div className={styles.filterRow}>
              <span className={styles.filterLabel}>Collection</span>
              <div className={styles.filterOptions}>
                {collections.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className={`${styles.filterBtn} ${activeCollection === name ? styles.active : ''}`}
                    onClick={() => setActiveCollection(activeCollection === name ? null : name)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}
          {types.length > 0 && (
            <div className={styles.filterRow}>
              <span className={styles.filterLabel}>Type</span>
              <div className={styles.filterOptions}>
                {types.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`${styles.filterBtn} ${activeType === type ? styles.active : ''}`}
                    onClick={() => setActiveType(activeType === type ? null : type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right — product grid */}
      <ul className={styles.grid}>
        {error ? (
          <li className={styles.empty}>Unable to load products. Please try again later.</li>
        ) : !products || products.length === 0 ? (
          <li className={styles.empty}>No products available at this time.</li>
        ) : filtered.length === 0 ? (
          <li className={styles.empty}>No products match the current filters.</li>
        ) : (
          filtered.map((product) => (
            <li key={product.slug}>
              <Link href={`/store/${product.slug}`} className={styles.product}>
                {product.primary_image ? (
                  <img
                    src={product.primary_image}
                    alt={product.title}
                    className={`${styles.productImage} ${product.status === 'sold_out' ? styles.soldOut : ''}`}
                  />
                ) : (
                  <div
                    className={`${styles.productImage} ${product.status === 'sold_out' ? styles.soldOut : ''}`}
                  />
                )}
                <div className={styles.productInfo}>
                  <span className={styles.productTitle}>{product.title}</span>
                  {product.collection && (
                    <span className={styles.productCollection}>{product.collection}</span>
                  )}
                  {product.status === 'available' ? (
                    <span className={styles.productPrice}>{product.price}</span>
                  ) : (
                    <span className={styles.productSoldOut}>Sold out</span>
                  )}
                </div>
              </Link>
            </li>
          ))
        )}
      </ul>

    </main>
  )
}
