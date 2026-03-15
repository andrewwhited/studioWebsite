import styles from './home.module.css'

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>

        {/* Column 1 — image, full bleed left/top/bottom */}
        <div className={styles.image} />

        {/* Column 2 — empty, do not add content here */}

        {/* Column 3 — text block, vertically centered */}
        <div className={styles.content}>
          <h1 className={styles.title}>Andrew Whited</h1>
          <p className={styles.descriptor}>
            Studio, objects,<br />
            art, and image.
          </p>
        </div>

      </section>
    </main>
  )
}
