import Link from 'next/link'
import styles from './art.module.css'

const works = [
  {
    title: 'Untitled (Wall Study)',
    slug: 'untitled-wall-study',
    medium: 'Oil on linen',
    year: '2024',
    status: 'Available',
  },
  {
    title: 'Weight Study',
    slug: 'weight-study',
    medium: 'Cast concrete',
    year: '2024',
    status: 'Available',
  },
  {
    title: 'Field Mark',
    slug: 'field-mark',
    medium: 'Graphite and wax on paper',
    year: '2023',
    status: 'Available',
  },
  {
    title: 'Partition',
    slug: 'partition',
    medium: 'Mixed media on panel',
    year: '2023',
    status: 'Private collection',
  },
  {
    title: 'Line Score',
    slug: 'line-score',
    medium: 'Ink on paper',
    year: '2022',
    status: 'Available',
  },
  {
    title: 'No. 4',
    slug: 'no-4',
    medium: 'Encaustic on panel',
    year: '2022',
    status: 'Private collection',
  },
]

export default function Art() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Art</h1>
        <p className={styles.intro}>
          Works on paper, panel, and in three dimensions. One-of-one pieces
          developed alongside the object and studio work. Inquiry via email.
        </p>
      </header>

      <ul className={styles.grid}>
        {works.map((work) => (
          <li key={work.slug}>
            <Link href={`/art/${work.slug}`} className={styles.workItem}>
              <div className={styles.workImage} />
              <div className={styles.workMeta}>
                <span className={styles.workTitle}>{work.title}</span>
                <span className={styles.workDetail}>
                  {work.medium} — {work.year}
                </span>
                {work.status === 'Available' && (
                  <span className={styles.workStatus}>Available</span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
