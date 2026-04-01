import styles from './sections.module.css'

type ThoughtItem = {
  _id: string
  title: string
  context: string
  summary: string
  slug: { current: string }
}

export default function Thoughts({ items }: { items?: ThoughtItem[] }) {
  return (
    <section id="thoughts" className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.label}>Thoughts</div>
        <ul className={`${styles.content} ${styles.thoughtList}`}>
          {(items ?? []).map((piece) => (
            <li key={piece._id} className={styles.thought}>
              <div className={styles.thoughtContext}>{piece.context}</div>
              <div className={styles.thoughtTitle}>{piece.title}</div>
              <p className={styles.thoughtSummary}>{piece.summary}</p>
              <a href={`/ux/thoughts/${piece.slug?.current}`} className={styles.thoughtLink}>
                Read →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
