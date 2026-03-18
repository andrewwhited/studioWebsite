import Link from 'next/link'
import { works } from '@/data/art'
import styles from './art.module.css'

export default function Art() {
  return (
    <main className={styles.main}>

      {/* Stage — top half void, Art + intro in right third */}
      <div className={styles.stage}>
        <div className={styles.stageRight}>
          <p className={styles.stageLabel}>Art</p>
          <p className={styles.stageIntro}>
            Works on paper, panel, and in three dimensions. One-of-one pieces
            developed alongside the object and studio work. Inquiry via email.
          </p>
        </div>
      </div>

      {/* Works strip — bottom half, scrolls horizontally */}
      {/* Each card: text label on top, image fills the rest */}
      <ul className={styles.works}>
        {works.map((work) => (
          <li key={work.slug}>
            <Link href={`/art/${work.slug}`} className={styles.work}>
              <div className={styles.workText}>
                <span className={styles.workTitle}>{work.title}</span>
                <span className={styles.workDetail}>{work.materials}, {work.year}</span>
              </div>
              <div className={styles.workImage} />
            </Link>
          </li>
        ))}
      </ul>

    </main>
  )
}
