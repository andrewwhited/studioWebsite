import Link from 'next/link'
import styles from './sections.module.css'

type ThoughtItem = {
  _id: string
  title: string
  type: string
  year: string
  context: string
  summary: string
  slug: { current: string }
}

export default function Thoughts({ items }: { items?: ThoughtItem[] }) {
  return (
    <section id="thoughts" className={styles.section}>
      <div className={`${styles.layout} ${styles.layoutBaseline}`}>
        <div className={styles.sectionLabel}>Thoughts</div>
        <ul className={`${styles.content} ${styles.thoughtList}`}>
          {(items ?? []).map((piece) => (
            <li key={piece._id}>
              <Link href={`/ux/thoughts/${piece.slug?.current}`} className={styles.thought}>
                <div className={styles.thoughtTitle}>{piece.title}</div>
                <p className={`${styles.secondary} ${styles.thoughtSummary}`}>{piece.summary}</p>
                <div className={styles.thoughtMeta}>
                  {piece.type && <span className={styles.label}>{piece.type}</span>}
                  {piece.year && <span className={styles.label}>{piece.year}</span>}
                  {!piece.type && !piece.year && piece.context && (
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
