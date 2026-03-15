import styles from './sections.module.css'

const focusAreas = [
  'Complex systems and information architecture',
  'AI product design',
  'UX strategy and design research',
  'Design systems and governance',
  'Cross-functional design leadership',
]

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.label}>About</div>
          <div>
            <p className={styles.bodyText}>
              I&rsquo;m drawn to design problems where the challenge isn&rsquo;t making something
              look good &mdash; it&rsquo;s making something legible. The work I find most meaningful
              involves systems that are inherently complex: AI products, large enterprise platforms,
              data tools where clarity is hard to achieve and expensive to maintain.
            </p>
            <p className={styles.bodyText}>
              My approach is structural. I care about information architecture, interaction logic,
              and systems that hold together over time and across teams. I tend to be most useful
              at the point where design strategy and execution intersect &mdash; when there&rsquo;s
              ambiguity to resolve, structure to build, or a system to make coherent.
            </p>
            <ul className={styles.focusList}>
              {focusAreas.map((area) => (
                <li key={area} className={styles.focusItem}>{area}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
