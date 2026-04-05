import Link from 'next/link'
import styles from './sections.module.css'

type WorkItem = {
  _id: string
  title: string
  company: string
  role: string
  year: string
  context: string
  summary: string
  slug: { current: string }
}

export default function Work({ items }: { items?: WorkItem[] }) {
  return (
    <section id="work" className={styles.section}>
      <div className={`${styles.layout} ${styles.layoutBaseline}`}>
        <div className={styles.sectionLabel}>Work</div>
        <ul className={`${styles.content} ${styles.projectList}`}>
          {(items ?? []).map((project) => (
            <li key={project._id}>
              <Link href={`/ux/work/${project.slug?.current}`} className={styles.project}>
                <div className={styles.projectTitle}>{project.title}</div>
                <p className={`${styles.secondary} ${styles.projectSummary}`}>{project.summary}</p>
                <div className={styles.projectMeta}>
                  {project.company && <span className={styles.label}>{project.company}</span>}
                  {project.role && <span className={styles.label}>{project.role}</span>}
                  {project.year && <span className={styles.label}>{project.year}</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
