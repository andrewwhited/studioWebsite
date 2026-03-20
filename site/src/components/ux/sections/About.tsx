import styles from './sections.module.css'
import LogoOutline from '@/components/icons/LogoOutline'

const themes = [
  {
    label: 'Experience at scale',
    body: 'Eleven years designing for enterprise contexts at IBM. Regulated industries, large-scale platforms, multi-team product organizations. Design decisions at this scale have organizational weight. Getting them right requires more than good taste.',
  },
  {
    label: 'Systems and information architecture',
    body: 'Good organization is the precondition for good design. I focus on information architecture \u2014 how information is arranged, how the system works, and how users orient themselves. Most problems are structural before they are aesthetic.',
  },
  {
    label: 'AI fluency',
    body: 'AI has been part of my work for most of my career. I design and ship products that extend user capabilities, with a focus on user experience, explainability, and trust.',
  },
  {
    label: 'Design leadership',
    body: 'I\u2019ve directed design teams, worked alongside senior leadership, and mentored designers at multiple levels to ensure user-centric design earns a seat at the table.',
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

        <div className={styles.aboutLogoBlock}>
          <LogoOutline className={styles.aboutLogoMark} />
        </div>

        <div className={styles.aboutPhoto} aria-hidden="true" />

      </div>
    </section>
  )
}
