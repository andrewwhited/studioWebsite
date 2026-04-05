import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProduct, getProductSlugs } from '@/data/store'
import AddToCartButton from './add-to-cart-button'
import styles from './product.module.css'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const slugs = await getProductSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let product
  try {
    product = await getProduct(slug)
  } catch {
    product = null
  }

  if (!product) notFound()

  const available = product.status === 'available'

  return (
    <main className={styles.main}>
      <div className={styles.layout}>

        {/* Left — images */}
        <div className={styles.images}>
          {product.images.map((src, i) => (
            <div key={i} className={styles.imageWrap}>
              {src ? (
                <Image
                  src={src}
                  alt={`${product.title} — image ${i + 1}`}
                  width={1200}
                  height={1600}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                />
              ) : (
                <div className={styles.image} />
              )}
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

              {/* Collection */}
              {product.collection && (
                <p className={styles.provenance}>
                  <Link
                    href={`/objects/${product.collection.toLowerCase().replace(/\s+/g, '-')}`}
                    className={styles.collectionLink}
                  >
                    {product.collection}
                  </Link>
                </p>
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
                  <dd className={styles.metaValue}>{product.materials || '—'}</dd>
                </div>
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>Dimensions</dt>
                  <dd className={styles.metaValue}>{product.dimensions || '—'}</dd>
                </div>
              </dl>

              <div className={styles.fulfillmentNote}>
                <p>Shipping calculated at checkout</p>
                <p>Local pickup available in Austin, TX.</p>
              </div>

              {available && product.variantId && (
                <AddToCartButton variantId={product.variantId} />
              )}

            </div>
          </div>
        </aside>

      </div>
    </main>
  )
}
