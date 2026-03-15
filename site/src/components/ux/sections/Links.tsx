import styles from './sections.module.css'

const links = [
  {
    label: 'LinkedIn',
    display: 'linkedin.com/in/andrewwhited',
    href: 'https://linkedin.com/in/andrewwhited',
  },
  {
    label: 'Resume',
    display: 'Download PDF',
    href: '/resume.pdf',
  },
  {
    label: 'Studio',
    display: 'andrewwhited.com',
    href: 'https://andrewwhited.com',
  },
]

export default function Links() {
  return (
    <section id="links" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.label}>Elsewhere</div>
          <div>
            <ul className={styles.linkList}>
              {links.map((link) => (
                <li key={link.label} className={styles.linkItem}>
                  <span className={styles.linkLabel}>{link.label}</span>
                  <a
                    href={link.href}
                    className={styles.linkHref}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.display}
                  </a>
                </li>
              ))}
            </ul>
            <p className={styles.sectionNote}>
              The UX work here is one part of a broader practice. The main studio site covers
              objects, art, and image work.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
