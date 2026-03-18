import { notFound } from 'next/navigation'
import Link from 'next/link'
import { works, getWork } from '@/data/art'
import styles from './work.module.css'

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }))
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const work = getWork(slug)
  if (!work) notFound()

  const { availability } = work

  return (
    <main className={styles.main}>
      <div className={styles.layout}>

        {/* Left — images */}
        <div className={styles.images}>
          {work.images.map((_, i) => (
            <div key={i} className={styles.imageWrap}>
              <div className={styles.image} />
            </div>
          ))}
        </div>

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
                  {availability.status === 'available' && 'Available'}
                  {availability.status === 'sold' && 'Private collection'}
                  {availability.status === 'inquiry' && 'Inquiry'}
                </dd>
              </div>
              {availability.status === 'available' && availability.price && (
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>Price</dt>
                  <dd className={styles.metaValue}>{availability.price}</dd>
                </div>
              )}
            </dl>

            {(availability.status === 'available' || availability.status === 'inquiry') && (
              <a
                href={`mailto:${availability.contact ?? 'studio@andrewwhited.com'}?subject=Inquiry — ${work.title}`}
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
