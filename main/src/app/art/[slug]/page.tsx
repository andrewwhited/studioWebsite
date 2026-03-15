import { notFound } from 'next/navigation'
import Link from 'next/link'
import styles from './work.module.css'

/* ─── Mock data ──────────────────────────────────────── */

type Work = {
  title: string
  medium: string
  year: string
  dimensions?: string
  description?: string
  price?: string
  status: 'Available' | 'Private collection' | 'NFS'
  imageCount: number
}

const works: Record<string, Work> = {
  'untitled-wall-study': {
    title: 'Untitled (Wall Study)',
    medium: 'Oil on linen',
    year: '2024',
    dimensions: '60 × 48 in',
    description:
      'A study in surface and edge. Paint applied and removed in layers over several weeks, each session responding to the state left by the last. The linen beneath reads through in places—not as accident but as decision.',
    price: '$4,800',
    status: 'Available',
    imageCount: 2,
  },
  'weight-study': {
    title: 'Weight Study',
    medium: 'Cast concrete',
    year: '2024',
    dimensions: '14 × 8 × 6 in',
    description:
      'Cast in a single pour, the form holds the ghost of its mold—seam lines, surface variation, a slight asymmetry in the base. Weight as subject and material simultaneously.',
    price: '$1,200',
    status: 'Available',
    imageCount: 3,
  },
  'field-mark': {
    title: 'Field Mark',
    medium: 'Graphite and wax on paper',
    year: '2023',
    dimensions: '24 × 18 in',
    description:
      'Graphite applied with a block, burnished, waxed. The surface holds the pressure history of the mark-making. Mounted unframed.',
    price: '$900',
    status: 'Available',
    imageCount: 1,
  },
  'partition': {
    title: 'Partition',
    medium: 'Mixed media on panel',
    year: '2023',
    dimensions: '36 × 24 in',
    status: 'Private collection',
    imageCount: 2,
  },
  'line-score': {
    title: 'Line Score',
    medium: 'Ink on paper',
    year: '2022',
    dimensions: '18 × 24 in',
    description:
      'Ruled lines in black ink, intervals determined by a simple arithmetic sequence. The grid as notation, as landscape, as accumulation.',
    price: '$650',
    status: 'Available',
    imageCount: 1,
  },
  'no-4': {
    title: 'No. 4',
    medium: 'Encaustic on panel',
    year: '2022',
    dimensions: '12 × 12 in',
    status: 'Private collection',
    imageCount: 1,
  },
}

export function generateStaticParams() {
  return Object.keys(works).map((slug) => ({ slug }))
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const work = works[slug]
  if (!work) notFound()

  // Generate placeholder image indices
  const images = Array.from({ length: work.imageCount }, (_, i) => i)

  return (
    <main className={styles.main}>
      <div className={styles.layout}>

        {/* Left — images */}
        <div className={styles.images}>
          {images.map((i) => (
            <div key={i} className={styles.imageWrap}>
              <div className={styles.image} />
            </div>
          ))}
        </div>

        {/* Right — details */}
        <aside className={styles.details}>
          <div className={styles.detailsInner}>
            <h1 className={styles.title}>{work.title}</h1>

            <dl className={styles.meta}>
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>Medium</dt>
                <dd className={styles.metaValue}>{work.medium}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>Date</dt>
                <dd className={styles.metaValue}>{work.year}</dd>
              </div>
              {work.dimensions && (
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>Dimensions</dt>
                  <dd className={styles.metaValue}>{work.dimensions}</dd>
                </div>
              )}
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>Status</dt>
                <dd className={styles.metaValue}>{work.status}</dd>
              </div>
              {work.price && work.status === 'Available' && (
                <div className={styles.metaRow}>
                  <dt className={styles.metaLabel}>Price</dt>
                  <dd className={styles.metaValue}>{work.price}</dd>
                </div>
              )}
            </dl>

            {work.description && (
              <p className={styles.description}>{work.description}</p>
            )}

            {work.status === 'Available' && (
              <a
                href={`mailto:studio@andrewwhited.com?subject=Inquiry — ${work.title}`}
                className={styles.inquireBtn}
              >
                Inquire about this work
              </a>
            )}

            <div className={styles.back}>
              <Link href="/art" className={styles.backLink}>← Art</Link>
            </div>
          </div>
        </aside>

      </div>
    </main>
  )
}
