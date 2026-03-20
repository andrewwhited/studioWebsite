import styles from './sections.module.css'

function FileIcon() {
  return (
    <svg
      width="28"
      height="34"
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={styles.ctaFileIcon}
    >
      <path d="M1 1H7.5L11 4.5V14H1V1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M7.5 1V4.5H11" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}

function WebFileIcon() {
  return (
    <svg
      width="28"
      height="34"
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={styles.ctaFileIcon}
    >
      <path d="M1 1H7.5L11 4.5V14H1V1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M7.5 1V4.5H11" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <circle cx="6" cy="9.5" r="2" stroke="currentColor" strokeWidth="0.85" />
      <path d="M4 9.5H8" stroke="currentColor" strokeWidth="0.85" />
      <path d="M6 7.5V11.5" stroke="currentColor" strokeWidth="0.85" />
    </svg>
  )
}

function AliasFileIcon() {
  return (
    <svg
      width="28"
      height="34"
      viewBox="0 0 12 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={styles.ctaFileIcon}
    >
      <path d="M1 1H7.5L11 4.5V14H1V1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      <path d="M7.5 1V4.5H11" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      {/* Alias arrow: ↗ in the file body */}
      <path d="M6 7.5H8.5V10" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 11.5L8.5 7.5" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
    </svg>
  )
}

export default function ClosingCta() {
  return (
    <footer className={styles.cta}>
      <div className={styles.ctaLinks}>
        <a
          href="https://linkedin.com/in/andrewwhited"
          className={styles.ctaFileLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WebFileIcon />
          linkedin
        </a>
        <a href="/resume.pdf" className={styles.ctaFileLink} download>
          <FileIcon />
          resume.pdf
        </a>
        <a
          href="https://andrewwhited.com"
          className={styles.ctaFileLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AliasFileIcon />
          studio
        </a>
      </div>
    </footer>
  )
}
