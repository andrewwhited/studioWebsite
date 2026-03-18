import Link from 'next/link'
import { getCollectionPreviews } from '@/data/objects'
import styles from './objects.module.css'

export default function Objects() {
  const previews = getCollectionPreviews()

  return (
    <main className={styles.main}>

      {/* Left panel — cols 1–4, sticky */}
      <div className={styles.left}>
        <h1 className={styles.title}>Objects</h1>
        <p className={styles.intro}>
          Object work spanning collections, foundational pieces, and commissioned
          projects. Each entry brings together images, context, and the ideas
          behind the work.
        </p>
      </div>

      {/* Right panel — cols 5–12, entry list */}
      <div className={styles.entries}>
        {previews.map((c) => (
          <Link
            key={c.slug}
            href={`/objects/${c.slug}`}
            className={styles.entry}
            style={{ '--entry-bg': c.image ? `url(${c.image})` : undefined } as React.CSSProperties}
          >
            <div className={styles.entryRow}>
              <span className={styles.entryTitle}>{c.title}</span>
              {c.year && <span className={styles.entryMeta}>{c.year}</span>}
            </div>
            <p className={styles.entryDesc}>{c.short_text}</p>
          </Link>
        ))}
      </div>

    </main>
  )
}
