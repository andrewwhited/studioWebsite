import Link from 'next/link'
import styles from './objects.module.css'

const entries = [
  {
    title: 'Vessel Series',
    href: '/objects/vessel-series',
    description:
      'Turned forms in hardwood and laminated composites. Exploring volume, surface, and the logic of rotation.',
    year: '2022–',
  },
  {
    title: 'Field Objects',
    href: '/objects/field-objects',
    description:
      'Objects for use and contemplation. Tools, vessels, and forms developed for the workshop and the world around it.',
    year: '2023–',
  },
  {
    title: 'Core Objects',
    href: '/objects/core',
    description:
      'Foundational pieces in primary production. Direct presentation, less editorial weight.',
  },
  {
    title: 'Commissioned Work',
    href: '/objects/commissions',
    description:
      'Custom furniture, spatial pieces, and site-specific installations. Examples and inquiry.',
  },
]

export default function Objects() {
  return (
    <main className={styles.main}>

      {/* Left panel — cols 1–5, sticky */}
      <div className={styles.left}>
        <h1 className={styles.title}>Objects</h1>
        <p className={styles.intro}>
          Object work spanning collections, foundational pieces, and commissioned
          projects. Each entry brings together images, context, and the ideas
          behind the work.
        </p>
      </div>

      {/* Right panel — cols 6–16, entry list */}
      <div className={styles.entries}>
        {entries.map((e) => (
          <Link key={e.href} href={e.href} className={styles.entry}>
            <div className={styles.entryRow}>
              <span className={styles.entryTitle}>{e.title}</span>
              {e.year && <span className={styles.entryMeta}>{e.year}</span>}
            </div>
            <p className={styles.entryDesc}>{e.description}</p>
          </Link>
        ))}
      </div>

    </main>
  )
}
