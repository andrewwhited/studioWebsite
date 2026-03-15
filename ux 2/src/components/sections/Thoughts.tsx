import styles from './sections.module.css'

const thoughts = [
  {
    title: 'On Designing for Complexity',
    context: 'Essay — 2024',
    summary:
      'Most design guidance optimizes for simplicity. But in enterprise and AI products, the goal is often not to simplify &mdash; it\u2019s to clarify. To make genuine complexity navigable rather than pretending it does not exist.',
    href: '/thoughts/on-designing-for-complexity',
  },
  {
    title: 'AI and the Designer\u2019s Role',
    context: 'Talk — AIGA, 2023',
    summary:
      'How AI tools are reshaping the relationship between design thinking and production work, and what that means for designers working at the boundary of both.',
    href: '/thoughts/ai-and-the-designers-role',
  },
]

export default function Thoughts() {
  return (
    <section id="thoughts" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.label}>Thoughts</div>
          <ul className={styles.thoughtList}>
            {thoughts.map((piece) => (
              <li key={piece.href} className={styles.thought}>
                <div className={styles.thoughtContext}>{piece.context}</div>
                <div className={styles.thoughtTitle}>{piece.title}</div>
                <p
                  className={styles.thoughtSummary}
                  dangerouslySetInnerHTML={{ __html: piece.summary }}
                />
                <a href={piece.href} className={styles.thoughtLink}>
                  Read →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
