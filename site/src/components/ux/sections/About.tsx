import styles from './sections.module.css'

type Theme = {
  _key: string
  title: string
  body: string
}

type Props = {
  heading?: string
  themes?: Theme[]
}

const FALLBACK_HEADING = 'Foundation before surface, system before screen. I\u2019ve been leading principled design across product teams at scale for over a decade \u2014 before forming a multidiscipline creative studio.'

const FALLBACK_THEMES: Theme[] = [
  {
    _key: 'theme1',
    title: 'Design leadership at scale',
    body: 'Over a decade leading design across enterprise product organizations at IBM. Regulated industries, multi-team platforms, senior stakeholders. I\u2019ve led teams, mentored designers, and worked to ensure user-centered design earns a seat at the table.',
  },
  {
    _key: 'theme2',
    title: 'Systems and information architecture',
    body: 'Good organization is the precondition for good design. I focus on information architecture \u2014 how information is arranged, how the system works, and how users orient themselves. Most problems are structural before they are aesthetic.',
  },
  {
    _key: 'theme3',
    title: 'AI fluency',
    body: 'AI has been part of my work for most of my career. I design and ship products that extend user capabilities, with a focus on user experience, explainability, and trust.',
  },
]

export default function About({ heading, themes }: Props) {
  const aboutHeading = heading || FALLBACK_HEADING
  const aboutThemes = themes?.length ? themes : FALLBACK_THEMES

  return (
    <section id="about" className={styles.section}>
      <div className={styles.layout}>

        <p className={`${styles.h3} ${styles.aboutHeading}`}>
          {aboutHeading}
        </p>

        {aboutThemes.map((theme) => (
          <div key={theme._key || theme.title} className={styles.themeBlock}>
            <div className={`${styles.body} ${styles.themeBlockLabel}`}>{theme.title}</div>
            <p className={styles.secondary}>{theme.body}</p>
          </div>
        ))}

      </div>
    </section>
  )
}
