import styles from './sections.module.css'

const projects = [
  {
    num: '01',
    title: 'Unified AI Strategy — AIOps',
    context: 'IBM · Senior Design Lead · 2020–2025',
    summary:
      'Led design strategy across three product teams and developed a unified AI approach across twelve teams. Designed and shipped generative AI features and led an AI bot project end to end — aligning UX efforts, conducting user research, and defining information architecture across a large distributed organization.',
    href: '/ux/work/aiops-ai-strategy',
  },
  {
    num: '02',
    title: 'Platform Consolidation — Business Automation',
    context: 'IBM · Senior Design Lead · 2016–2020',
    summary:
      'Led a portfolio-wide initiative to unify over a dozen individual product offerings into a single platform. Served as key liaison between product teams and executive stakeholders, overseeing five design teams and driving user-centered design thinking across the organization.',
    href: '/ux/work/business-automation-platform',
  },
  {
    num: '03',
    title: 'Cross-Product Research Framework',
    context: 'IBM · Senior Design Lead · 2022–2024',
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
            <li key={project.num} className={styles.project}>
              <span className={styles.projectNum}>{project.num}</span>
              <div className={styles.projectBody}>
                <div className={styles.projectTitle}>{project.title}</div>
                <div className={styles.projectContext}>{project.context}</div>
                <p className={styles.projectSummary}>{project.summary}</p>
                <a href={project.href} className={styles.projectLink}>
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
