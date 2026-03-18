import styles from './UxNav.module.css'
import LogoSolid from './icons/LogoSolid'

export default function UxNav() {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.name} aria-label="Andrew Whited">
          <LogoSolid className={styles.navLogo} />
        </a>
        <nav className={styles.links} aria-label="Site navigation">
          <a href="#work">Work</a>
          <a href="#thoughts">Thoughts</a>
        </nav>
      </div>
    </header>
  )
}
