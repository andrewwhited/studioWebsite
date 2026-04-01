import styles from './sections.module.css'

type WorkItem = {
  _id: string
  title: string
  context: string
  summary: string
  slug: { current: string }
}

export default function Work({ items }: { items?: WorkItem[] }) {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.label}>Work</div>
        <ul className={`${styles.content} ${styles.projectList}`}>
          {(items ?? []).map((project) => (
            <li key={project._id} className={styles.project}>
              <div className={styles.projectBody}>
                <div className={styles.projectTitle}>{project.title}</div>
                <div className={styles.projectContext}>{project.context}</div>
                <p className={styles.projectSummary}>{project.summary}</p>
                <a href={`/ux/work/${project.slug?.current}`} className={styles.projectLink}>
                  View project →
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
