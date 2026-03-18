import styles from './sections.module.css'

const publications = [
  {
    title: 'Method and system for adaptive interface generation in conversational AI environments',
    meta: 'US Patent Application',
  },
  {
    title: 'Context-aware component recommendation in design systems',
    meta: 'US Patent Application',
  },
]

const talks = [
  { title: 'AI and the Designer\u2019s Role', meta: 'AIGA \u2014 2023' },
  { title: 'Designing Enterprise AI', meta: 'IBM Design Symposium \u2014 2022' },
  { title: 'Systems Thinking in Product Design', meta: '2021' },
]


export default function Credentials() {
  return (
    <section id="links" className={styles.section}>
      <div className={styles.layout}>

        <div className={styles.credLogo}>
          <span className={styles.credLogoMark}>
            <span>Andrew</span>
            <span>Whited</span>
          </span>
        </div>

        <div className={styles.credPublications}>
          <div className={styles.colLabel}>Publications</div>
          <ul className={styles.colList}>
            {publications.map((item) => (
              <li key={item.title} className={styles.colItem}>
                <span className={styles.colItemTitle}>{item.title}</span>
                <span className={styles.colItemMeta}>{item.meta}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.credTalks}>
          <div className={styles.colLabel}>Talks</div>
          <ul className={styles.colList}>
            {talks.map((item) => (
              <li key={item.title} className={styles.colItem}>
                <span className={styles.colItemTitle}>{item.title}</span>
                <span className={styles.colItemMeta}>{item.meta}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
