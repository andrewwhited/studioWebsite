import { notFound } from 'next/navigation'
import Link from 'next/link'
import { collections, getCollection } from '@/data/objects'
import styles from './collection.module.css'

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }))
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const collection = getCollection(slug)
  if (!collection) notFound()

  const { hero, featured_photos, editorial, objects, companion } = collection

  return (
    <main>

      {/* Hero — nav floats over */}
      <section className={styles.hero}>
        <div className={styles.heroImage} />
        <Link href="/objects" className={styles.heroBack} aria-label="Back to Objects">←</Link>
        <div className={styles.heroOverlay}>
          <p className={styles.heroLocation}>{hero.location} — {hero.year}</p>
          <h1 className={styles.heroTitle}>{collection.title}</h1>
        </div>
      </section>

      <div className={styles.page}>

        {/* Intro */}
        <p className={styles.intro}>{hero.text}</p>

        {/* Featured photos — early visual payoff */}
        {featured_photos.images.length > 0 && (
          <div className={styles.featuredPhotos}>
            {featured_photos.images.map((_, i) => (
              <div key={i} className={styles.featuredPhoto} />
            ))}
          </div>
        )}

        {/* Editorial — flexible blocks */}
        <section className={styles.section}>
          <div className={styles.label}>About</div>
          <div className={styles.body}>
            {editorial.blocks.map((block, i) => (
              <p key={i}>{block}</p>
            ))}
          </div>
        </section>

        {/* Objects */}
        {objects.items.length > 0 && (
          <section className={styles.objectsSection}>
            <div className={styles.label}>Objects</div>
            <ul className={styles.objectsGrid}>
              {objects.items.map((obj) => (
                <li key={obj.name}>
                  {obj.product_link ? (
                    <Link href={obj.product_link} className={styles.preview}>
                      <div className={styles.previewImage} />
                      <div className={styles.previewInfo}>
                        <span className={styles.previewTitle}>{obj.name}</span>
                        <p className={styles.previewDesc}>{obj.description}</p>
                      </div>
                    </Link>
                  ) : (
                    <div className={styles.preview}>
                      <div className={styles.previewImage} />
                      <div className={styles.previewInfo}>
                        <span className={styles.previewTitle}>{obj.name}</span>
                        <p className={styles.previewDesc}>{obj.description}</p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {collection.shop_collection_link && (
              <Link href={collection.shop_collection_link} className={styles.storeLink}>
                Browse all in Store →
              </Link>
            )}
          </section>
        )}

      </div>

      {/* Companion — full-width 12-col, 3 equal sections */}
      {(companion.hit_list.length > 0 || companion.playlist) && (
        <section className={styles.companion}>
          <div className={styles.companionLabel}>Companion</div>
          {companion.hit_list.length > 0 ? (
            <ul className={styles.hitList}>
              {companion.hit_list.map((item) => (
                <li key={item.name} className={styles.hitItem}>
                  <a
                    href={item.link}
                    className={styles.hitName}
                    target={item.link.startsWith('mailto') ? undefined : '_blank'}
                    rel={item.link.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  >
                    {item.name}
                  </a>
                  <span className={styles.hitNote}>{item.note}</span>
                </li>
              ))}
            </ul>
          ) : <div />}
          {companion.playlist ? (
            <div className={styles.playlist} />
          ) : <div />}
        </section>
      )}

    </main>
  )
}
