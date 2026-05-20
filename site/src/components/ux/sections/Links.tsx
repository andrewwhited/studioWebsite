import LogoSolid from '@/components/icons/LogoSolid'
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
      <path d="M6 7.5H8.5V10" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 11.5L8.5 7.5" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
    </svg>
  )
}

function EmailFileIcon() {
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
      <rect x="3" y="8" width="6" height="4" stroke="currentColor" strokeWidth="0.85" />
      <path d="M3 8L6 10.5L9 8" stroke="currentColor" strokeWidth="0.85" strokeLinejoin="round" />
    </svg>
  )
}

type Props = {
  footerCopy?: string
  email?: string
  linkedinUrl?: string
  resumeUrl?: string
  studioUrl?: string
}

export default function ClosingCta({ footerCopy, email, linkedinUrl, resumeUrl, studioUrl }: Props) {
  return (
    <footer className={styles.cta}>
      <p className={styles.ctaText}>{footerCopy || 'Find me elsewhere'}</p>
      <div className={styles.ctaLinks}>
        {email && (
          <a href={`mailto:${email}`} className={`${styles.label} ${styles.ctaFileLink}`}>
            <EmailFileIcon />
            email
          </a>
        )}
        <a
          href={linkedinUrl || 'https://linkedin.com/in/andrewwhited'}
          className={`${styles.label} ${styles.ctaFileLink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WebFileIcon />
          linkedin
        </a>
        <a href={resumeUrl || '/resume.pdf'} className={`${styles.label} ${styles.ctaFileLink}`} download>
          <FileIcon />
          resume.pdf
        </a>
        <a
          href={studioUrl || 'https://andrewwhited.com'}
          className={`${styles.label} ${styles.ctaFileLink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AliasFileIcon />
          studio
        </a>
      </div>
      <div className={styles.ctaLogo}>
        <LogoSolid />
      </div>
    </footer>
  )
}
