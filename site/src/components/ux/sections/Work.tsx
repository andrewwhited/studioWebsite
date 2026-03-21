import styles from './sections.module.css'

const projects = [
  {
    title: 'Unified AI Strategy \u2014 AIOps',
    context: 'IBM \u00b7 Senior Design Lead \u00b7 2020\u20132025',
    summary:
      'Led design strategy across three product teams and developed a unified AI approach across twelve teams. Designed and shipped generative AI features and led an AI bot project end to end \u2014 aligning UX efforts, conducting user research, and defining information architecture across a large distributed organization.',
    href: '/ux/work/aiops-ai-strategy',
  },
  {
    title: 'Platform Consolidation \u2014 Business Automation',
    context: 'IBM \u00b7 Senior Design Lead \u00b7 2016\u20132020',
    summary:
      'Led a portfolio-wide initiative to unify over a dozen individual product offerings into a single platform. Served as key liaison between product teams and executive stakeholders, overseeing five design teams and driving user-centered design thinking across the organization.',
    href: '/ux/work/business-automation-platform',
  },
  {
    title: 'Cross-Product Research Framework',
    context: 'IBM \u00b7 Senior Design Lead \u00b7 2022\u20132024',
    summary:
      'Built a unified user research framework adopted across multiple design teams with different product contexts and goals. Adapted processes and best practices to operate across organizational boundaries without requiring centralized control.',
    href: '/ux/work/research-framework',
  },
]

export default function Work() {
  return (
    <section id="work" className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.label}>Work</div>
        <ul className={`${styles.content} ${styles.projectList}`}>
          {projects.map((project) => (
            <li key={project.title} className={styles.project}>
              <div className={styles.projectBody}>
                <div className={styles.projectTitle}>{project.title}</div>
                <div className={styles.projectContext}>{project.context}</div>
                <p className={styles.projectSummary}>{project.summary}</p>
                <a href={project.href} className={styles.projectLink}>
                  View project \u2192
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
