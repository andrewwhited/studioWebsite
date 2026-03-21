import styles from './sections.module.css'

const themes = [
  {
    label: 'Design leadership at scale',
    body: 'Over a decade leading design across enterprise product organizations at IBM. Regulated industries, multi-team platforms, senior stakeholders. I\u2019ve led teams, mentored designers, and worked to ensure user-centered design earns a seat at the table.',
  },
  {
    label: 'Systems and information architecture',
    body: 'Good organization is the precondition for good design. I focus on information architecture \u2014 how information is arranged, how the system works, and how users orient themselves. Most problems are structural before they are aesthetic.',
  },
  {
    label: 'AI fluency',
    body: 'AI has been part of my work for most of my career. I design and ship products that extend user capabilities, with a focus on user experience, explainability, and trust.',
  },
]


export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.layout}>

        <p className={styles.aboutHeading}>
          Foundation before surface, system before screen. I've been leading principled design across product teams at scale for over a decade — before forming{' '}
          <a href="https://andrewwhited.com" className={styles.aboutHeadingLink}>
            a multidiscipline creative studio
          </a>
          .
        </p>

        {themes.map((theme) => (
          <div key={theme.label} className={styles.themeBlock}>
            <div className={styles.themeBlockLabel}>{theme.label}</div>
            <p className={styles.themeBlockBody}>{theme.body}</p>
          </div>
        ))}

      </div>
    </section>
  )
}
