import styles from './sections.module.css'

const timeline = [
  {
    name: 'Auburn University',
    role: 'B.F.A. Graphic Design',
    detail: 'Auburn, AL',
  },
  {
    name: 'Iconologic',
    role: 'Internship',
    detail: 'Brand identity · Atlanta',
  },
  {
    name: 'IBM',
    role: 'Senior Product Designer',
    detail: '2018–Present',
  },
  {
    name: 'Studio',
    role: 'Formation',
    detail: 'Austin, TX',
  },
]

export default function Background() {
  return (
    <section id="background" className={styles.section}>
      <div className={styles.layout}>
        {timeline.map((entry) => (
          <div key={entry.name} className={styles.timelineEntry}>
            <div className={styles.timelineName}>{entry.name}</div>
            <div className={styles.timelineRole}>{entry.role}</div>
            <div className={styles.timelineDetail}>{entry.detail}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
