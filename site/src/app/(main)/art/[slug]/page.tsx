import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllArtworks, getArtworkBySlug } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import SanityImage from '@/lib/sanity-image'
import WorkImageStrip from './WorkImageStrip'
import styles from './work.module.css'

export async function generateStaticParams() {
  const artworks = await getAllArtworks()
  return (artworks ?? []).map((w: any) => ({ slug: w.slug?.current }))
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const work = await getArtworkBySlug(slug)
  if (!work) notFound()

  const isAvailable = work.status === 'available'

  // Combine hero image + additional images, dropping any without an asset
  const allImages = [
    work.heroImage,
    ...(work.images ?? []),
  ].filter((img: any) => img?.asset)

  return (
    <main className={styles.main}>
      <div className={styles.layout}>

        {/* Left — images */}
        <WorkImageStrip className={styles.images}>
          {allImages.map((img: any, i: number) => {
            const dims = img.asset?.metadata?.dimensions
            return (
              <div key={i} className={styles.imageWrap}>
                <SanityImage
                  src={urlFor(img).url()}
                  alt={work.title}
                  width={dims?.width ?? 1200}
                  height={dims?.height ?? 1600}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.image}
                />
              </div>
            )
          })}
        </WorkImageStrip>

        {/* Right — details */}
        <aside className={styles.details}>
          <Link href="/art" className={styles.backLink}>←</Link>
          <div className={styles.detailsScroll}>
          <div className={styles.detailsInner}>
            <h1 className={styles.title}>{work.title}</h1>

            <dl className={styles.meta}>
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>Year</dt>
                <dd className={styles.metaValue}>{work.year}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>Materials</dt>
                <dd className={styles.metaValue}>{work.materials}</dd>
              </div>
              {work.dimensions && (
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>Dimensions</dt>
                  <dd className={styles.metaValue}>{work.dimensions}</dd>
                </div>
              )}
            </dl>

            {work.text && (
              <p className={styles.description}>{work.text}</p>
            )}

            <dl className={styles.meta}>
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>Availability</dt>
                <dd className={styles.metaValue}>
                  {isAvailable
                    ? (work.price ? work.price : 'Price on request')
                    : 'Private collection'}
                </dd>
              </div>
            </dl>

            {isAvailable && (
              <a
                href={`mailto:studio@andrewwhited.com?subject=Inquiry — ${work.title}`}
                className={styles.inquireBtn}
              >
                Inquire about this work
              </a>
            )}

          </div>
          </div>
        </aside>

      </div>
    </main>
  )
}
