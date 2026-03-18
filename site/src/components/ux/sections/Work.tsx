import styles from './sections.module.css'

const projects = [
  {
    num: '01',
    title: 'Conversational AI Interface',
    context: 'IBM — Lead Designer, 2023',
    summary:
      'Designed the interaction model, component system, and motion language for a conversational AI product deployed across multiple IBM enterprise software products. Led from concept through implementation across research, engineering, and product.',
    href: '/ux/work/conversational-ai',
  },
  {
    num: '02',
    title: 'Enterprise Data Platform',
    context: 'IBM — Senior Designer, 2022',
    summary:
      'Restructured the core information architecture and primary task flows of a data management platform used by enterprise teams in regulated industries. The redesign addressed significant usability debt while preserving established user workflows.',
    href: '/ux/work/data-platform',
  },
  {
    num: '03',
    title: 'Design System Governance',
    context: 'IBM — Design Systems, 2021',
    summary:
      'Built the contribution process, documentation framework, and governance model for a multi-team design system operating across a large product organization. Focused on enabling consistent quality without requiring centralized control.',
    href: '/ux/work/design-system-governance',
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
