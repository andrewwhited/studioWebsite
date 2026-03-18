'use client'

import { useState } from 'react'
import Link from 'next/link'
import { products, productTypes, collectionNames } from '@/data/store'
import styles from './store.module.css'

export default function StorePage() {
  const [activeCollection, setActiveCollection] = useState<string | null>(null)
  const [activeType, setActiveType] = useState<string | null>(null)

  const filtered = products.filter((p) => {
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
          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>Collection</span>
            <div className={styles.filterOptions}>
              {collectionNames.map((name) => (
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
          <div className={styles.filterRow}>
            <span className={styles.filterLabel}>Type</span>
            <div className={styles.filterOptions}>
              {productTypes.map((type) => (
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
        </div>
      </div>

      {/* Right — product grid */}
      <ul className={styles.grid}>
        {filtered.length === 0 ? (
          <li className={styles.empty}>No products match the current filters.</li>
        ) : (
          filtered.map((product) => (
            <li key={product.slug}>
              <Link href={`/store/${product.slug}`} className={styles.product}>
                <div
                  className={`${styles.productImage} ${product.status === 'sold_out' ? styles.soldOut : ''}`}
                />
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
