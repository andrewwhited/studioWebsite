import { notFound } from 'next/navigation'
import Link from 'next/link'
import { products, getProduct } from '@/data/store'
import styles from './product.module.css'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const available = product.status === 'available'

  return (
    <main className={styles.main}>
      <div className={styles.layout}>

        {/* Left — images */}
        <div className={styles.images}>
          {product.images.map((_, i) => (
            <div key={i} className={styles.imageWrap}>
              <div className={styles.image} />
            </div>
          ))}
        </div>

        {/* Right — catalogue entry */}
        <aside className={styles.details}>
          <Link href="/store" className={styles.backLink}>←</Link>

          <div className={styles.detailsScroll}>
            <div className={styles.detailsInner}>

              {/* Title */}
              <h1 className={styles.title}>{product.title}</h1>

              {/* Price — near title */}
              <p className={styles.price}>
                {available ? product.price : <span className={styles.soldOutLabel}>Sold out</span>}
              </p>

              {/* Collection provenance */}
              {product.collection && (
                <p className={styles.provenance}>From the {product.collection}.</p>
              )}

              {/* Description */}
              {product.text && (
                <p className={styles.description}>{product.text}</p>
              )}

              {/* Meta table */}
              <dl className={styles.meta}>
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>Type</dt>
                  <dd className={styles.metaValue}>{product.product_type}</dd>
                </div>
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>Materials</dt>
                  <dd className={styles.metaValue}>{product.materials}</dd>
                </div>
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>Dimensions</dt>
                  <dd className={styles.metaValue}>{product.dimensions}</dd>
                </div>
              </dl>

              <div className={styles.fulfillmentNote}>
                <p>{product.shipping_note}</p>
                {product.local_pickup_available && <p>Local pickup available in Austin, TX.</p>}
              </div>

              {available && (
                <button type="button" className={styles.addBtn}>
                  Add to cart
                </button>
              )}

            </div>
          </div>
        </aside>

      </div>
    </main>
  )
}
