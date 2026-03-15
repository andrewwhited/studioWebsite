import Link from 'next/link'
import styles from './objects.module.css'

const collections = [
  {
    title: 'Vessel Series',
    slug: 'vessel-series',
    description:
      'Turned forms in hardwood and laminated composites. Exploring volume, surface, and the logic of rotation.',
    year: '2022–',
  },
  {
    title: 'Field Objects',
    slug: 'field-objects',
    description:
      'Objects for use and contemplation. Tools, vessels, and forms developed for the workshop and the world around it.',
    year: '2023–',
  },
]

export default function Objects() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Objects</h1>
        <p className={styles.intro}>
          Object work organized by body, type, and context. Collections gather
          related pieces with references, images, and editorial context. Core
          presents foundational objects directly. Commissions documents
          custom and site-specific work.
        </p>
      </header>

      <div className={styles.entries}>

        {/* Collections */}
        <div className={styles.group}>
          <div className={styles.groupLabel}>Collections</div>
          {collections.map((c) => (
            <Link key={c.slug} href={`/objects/${c.slug}`} className={styles.entry}>
              <div className={styles.entryRow}>
                <span className={styles.entryTitle}>{c.title}</span>
                <span className={styles.entryMeta}>{c.year}</span>
              </div>
              <p className={styles.entryDesc}>{c.description}</p>
            </Link>
          ))}
        </div>

        {/* Core */}
        <div className={styles.group}>
          <div className={styles.groupLabel}>Core</div>
          <Link href="/objects/core" className={styles.entry}>
            <div className={styles.entryRow}>
              <span className={styles.entryTitle}>Core Objects</span>
            </div>
            <p className={styles.entryDesc}>
              Foundational pieces in primary production. Direct presentation,
              less editorial weight.
            </p>
          </Link>
        </div>

        {/* Commissions */}
        <div className={styles.group}>
          <div className={styles.groupLabel}>Commissions</div>
          <Link href="/objects/commissions" className={styles.entry}>
            <div className={styles.entryRow}>
              <span className={styles.entryTitle}>Commissioned Work</span>
            </div>
            <p className={styles.entryDesc}>
              Custom furniture, spatial pieces, and site-specific installations.
              Examples and inquiry.
            </p>
          </Link>
        </div>

      </div>
    </main>
  )
}
