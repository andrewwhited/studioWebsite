import styles from './sections.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.heroName}>Andrew Whited</h1>
        <p className={styles.heroTitle}>
          Product designer focused on complex systems,
          AI, and enterprise software.
        </p>
        <p className={styles.heroSub}>
          Available for senior design roles.
        </p>
      </div>
    </section>
  )
}
