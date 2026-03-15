import styles from './sections.module.css'

const talks = [
  { title: 'AI and the Designer\u2019s Role', meta: 'AIGA — 2023' },
  { title: 'Designing Enterprise AI', meta: 'IBM Design Symposium — 2022' },
  { title: 'Systems Thinking in Product Design', meta: '2021' },
]

const patents = [
  {
    title: 'Method and system for adaptive interface generation in conversational AI environments',
    meta: 'US Patent Application',
  },
  {
    title: 'Context-aware component recommendation in design systems',
    meta: 'US Patent Application',
  },
]

const other = [
  { title: 'AIGA', meta: 'Former chapter board member' },
]

export default function Credentials() {
  return (
    <section id="credentials" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.label}>Credentials</div>
          <div>
            <div className={styles.credGroup}>
              <div className={styles.credGroupTitle}>Talks</div>
              <ul className={styles.credList}>
                {talks.map((item) => (
                  <li key={item.title} className={styles.credItem}>
                    <span className={styles.credItemTitle}>{item.title}</span>
                    <span className={styles.credItemMeta}>{item.meta}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.credGroup}>
              <div className={styles.credGroupTitle}>Patent Publications</div>
              <ul className={styles.credList}>
                {patents.map((item) => (
                  <li key={item.title} className={styles.credItem}>
                    <span className={styles.credItemTitle}>{item.title}</span>
                    <span className={styles.credItemMeta}>{item.meta}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.credGroup}>
              <div className={styles.credGroupTitle}>Other</div>
              <ul className={styles.credList}>
                {other.map((item) => (
                  <li key={item.title} className={styles.credItem}>
                    <span className={styles.credItemTitle}>{item.title}</span>
                    <span className={styles.credItemMeta}>{item.meta}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
