import Link from 'next/link'
import styles from './sections.module.css'

type ThoughtItem = {
  _id: string
  title: string
  type: string
  subtitle?: string
  publishedAt?: string
  /** Legacy — carried only by the un-ported 2016 essay. */
  year?: string
  context?: string
  /** Legacy — carried only by the un-ported 2016 essay. */
  summary?: string
  slug: { current: string }
}

// Subtitle is the description everywhere. `summary` is legacy — only the
// un-ported 2016 essay has one, and it predates the subtitle field.
function displaySummary(piece: ThoughtItem): string | undefined {
  return piece.subtitle || piece.summary || undefined
}

// New pieces carry a publish date; the un-ported one carries a year string.
function displayYear(piece: ThoughtItem): string | undefined {
  return piece.publishedAt?.slice(0, 4) || piece.year || undefined
}

export default function Thoughts({ items }: { items?: ThoughtItem[] }) {
  return (
    <section id="thoughts" className={styles.section}>
      <div className={`${styles.layout} ${styles.layoutBaseline}`}>
        <div className={styles.sectionLabel}>Thoughts</div>
        <ul className={`${styles.content} ${styles.thoughtList}`}>
          {(items ?? []).map((piece) => (
            <li key={piece._id}>
              <Link href={`/${piece.slug?.current}`} className={styles.thought}>
                <div className={styles.thoughtTitle}>{piece.title}</div>
                <p className={`${styles.secondary} ${styles.thoughtSummary}`}>
                  {displaySummary(piece)}
                </p>
                <div className={styles.thoughtMeta}>
                  {piece.type && <span className={styles.label}>{piece.type}</span>}
                  {displayYear(piece) && (
                    <span className={styles.label}>{displayYear(piece)}</span>
                  )}
                  {!piece.type && !displayYear(piece) && piece.context && (
                    <span className={styles.label}>{piece.context}</span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
