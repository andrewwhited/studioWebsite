import styles from './Nav.module.css'

export default function Nav() {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <a href="#hero" className={styles.name}>Andrew Whited</a>
        <nav className={styles.links}>
          <a href="#work">Work</a>
          <a href="#thoughts">Thoughts</a>
          <a href="#credentials">Credentials</a>
          <a href="#links">Links</a>
        </nav>
      </div>
    </header>
  )
}
