import styles from './sections.module.css'
import LogoOutline from '@/components/icons/LogoOutline'

const themes = [
  {
    label: 'Enterprise experience',
    body: 'Fifteen years designing for enterprise contexts — IBM, regulated industries, large-scale platforms. Design decisions at this scale have organizational weight. Getting them right requires more than good taste.',
  },
  {
    label: 'Systems and information architecture',
    body: 'I tend toward IA problems. How information is organized, how task flows connect, where navigation decisions create or destroy clarity. Most of my best work started with restructuring before it started with designing.',
  },
  {
    label: 'AI product design',
    body: 'Three years focused on AI interfaces — conversational systems, trust and confidence signaling, uncertainty design. The hardest design problem I\u2019ve worked on, and the most interesting.',
  },
  {
    label: 'Design leadership',
    body: 'Senior designer means being accountable when the design is wrong, managing relationships across product and engineering, and making structure out of ambiguity when there\u2019s no clear brief.',
  },
]

function FileIcon() {
  return (
    <svg
      width="18"
      height="22"
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={styles.fileIcon}
    >
      <path d="M1 1H7.5L11 4.5V14H1V1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M7.5 1V4.5H11" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}

function WebFileIcon() {
  return (
    <svg
      width="18"
      height="22"
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={styles.fileIcon}
    >
      <path d="M1 1H7.5L11 4.5V14H1V1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M7.5 1V4.5H11" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <circle cx="6" cy="9.5" r="2" stroke="currentColor" strokeWidth="0.85" />
      <path d="M4 9.5H8" stroke="currentColor" strokeWidth="0.85" />
      <path d="M6 7.5V11.5" stroke="currentColor" strokeWidth="0.85" />
    </svg>
  )
}

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.layout}>

        <p className={styles.aboutHeading}>
          Structural designer with fifteen years in enterprise software,
          AI product design, and complex systems. Most recently at IBM for over
          a decade before forming{' '}
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
          <div className={styles.aboutFileLinks}>
            <a
              href="https://linkedin.com/in/andrewwhited"
              className={styles.fileLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WebFileIcon />
              linkedin
            </a>
            <a href="/resume.pdf" className={styles.fileLink} download>
              <FileIcon />
              resume.pdf
            </a>
          </div>
          <LogoOutline className={styles.aboutLogoMark} />
        </div>

        <div className={styles.aboutPhoto} aria-hidden="true" />

      </div>
    </section>
  )
}
