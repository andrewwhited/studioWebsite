import styles from './sections.module.css'

const publications = [
  {
    title: 'Automatic Content Transfer to a Physically Present Person Based on NLP',
    meta: 'US Patent Application \u00b7 2024',
  },
  {
    title: 'UXR System and Method using AI to Facilitate and Enhance Research Activities',
    meta: 'US Patent Application \u00b7 2025',
  },
]

type Venue = { name: string; city: string; year: string }

const talks: { title: string; venues: Venue[] }[] = [
  {
    title: 'User Testing vs. User Teaching',
    venues: [
      { name: 'UX+DEV Summit', city: 'Miami, FL', year: '2017' },
      { name: 'INTERACT', city: 'Mumbai, India', year: '2017' },
    ],
  },
  {
    title: 'Collaboration: Design, Engineering, OM',
    venues: [
      { name: 'IBM', city: 'Austin, TX', year: '2018' },
    ],
  },
]

export default function PublicationsTalks() {
  return (
    <section id="credentials" className={styles.section}>
      <div className={styles.layout}>

        <img src="/andrew.jpg" alt="Andrew Whited" className={styles.aboutPhoto} />

        <div className={styles.pubCol}>
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

        <div className={styles.talksCol}>
          <div className={styles.colLabel}>Talks</div>
          <ul className={styles.colList}>
            {talks.map((talk) => (
              <li key={talk.title} className={styles.colItem}>
                <span className={styles.colItemTitle}>{talk.title}</span>
                {talk.venues.map((v) => (
                  <span key={v.name + v.city} className={styles.colItemMeta}>
                    {v.name} \u00b7 {v.city} \u00b7 {v.year}
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
