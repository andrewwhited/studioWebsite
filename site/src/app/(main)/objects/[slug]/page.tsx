import { notFound } from 'next/navigation'
import Link from 'next/link'
import styles from './collection.module.css'

/* ─── Mock data ──────────────────────────────────────── */

type ObjectPreview = {
  title: string
  description: string
}

type Collection = {
  title: string
  intro: string
  conceptText: string
  year: string
  references: { author: string; title: string }[]
  objectPreviews: ObjectPreview[]
  storeHandle?: string
}

const collections: Record<string, Collection> = {
  'vessel-series': {
    title: 'Vessel Series',
    intro:
      'A body of turned vessels exploring form, surface, and material memory. Each piece is developed on the lathe from a single billet—the form discovered through the process rather than designed toward it.',
    conceptText:
      'The vessel is one of the oldest made objects. It holds. It is hollow. It has a relationship to volume and weight that is immediate and understood. Working in this form means working with that history—not escaping it, but entering it deliberately.\n\nThese vessels move between utility and artifact. Some are functional. Others less so. All are made from materials that carry their own time: hardwoods from the Northwest, laminated scrap from the shop floor, reclaimed material with visible repairs and history. The surface is where process becomes visible: tool marks preserved or erased, finishes that reveal the wood or work against it.',
    year: '2022–',
    references: [
      { author: 'Garth Clark', title: 'The Artful Teapot' },
      { author: 'Edmund de Waal', title: 'The Pot Book' },
      { author: 'Toshiko Takaezu', title: 'Studio Ceramics' },
    ],
    objectPreviews: [
      { title: 'Vessel 01', description: 'Turned black walnut, oil finish. 6 × 4 in.' },
      { title: 'Vessel 02', description: 'Laminated hardwood, raw finish. 8 × 5 in.' },
      { title: 'Vessel 03', description: 'Reclaimed fir, wax finish. 5 × 5 in.' },
      { title: 'Vessel 04', description: 'Maple burl, shellac. 4 × 3 in.' },
      { title: 'Vessel 05', description: 'Cherry, natural oil. 9 × 6 in.' },
      { title: 'Vessel 06', description: 'Ebonized oak, wax finish. 7 × 4 in.' },
    ],
    storeHandle: 'vessel-series',
  },
  'field-objects': {
    title: 'Field Objects',
    intro:
      'Objects for use and contemplation. Developed in the workshop for the workshop—and for the world around it.',
    conceptText:
      'Field Objects began as a loose category for things that didn\'t fit the vessel work. Scoops, spatulas, handles, wedges, blocks. Objects that do something. The discipline of use is clarifying: a form that fails functionally tells you something about the form. These pieces hold that tension between utility and presence.',
    year: '2023–',
    references: [
      { author: 'Soetsu Yanagi', title: 'The Unknown Craftsman' },
      { author: 'David Pye', title: 'The Nature and Art of Workmanship' },
    ],
    objectPreviews: [
      { title: 'Scoop 01', description: 'Turned maple, oil finish. 10 in. length.' },
      { title: 'Block Set', description: 'Hardwood offcuts, waxed. Various dimensions.' },
      { title: 'Handle Study', description: 'Ash, raw. 8 in.' },
      { title: 'Wedge Form', description: 'Oak, blackened. 4 × 2 × 1 in.' },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(collections).map((slug) => ({ slug }))
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const collection = collections[slug]
  if (!collection) notFound()

  return (
    <main>
      {/* Hero — nav floats over */}
      <section className={styles.hero}>
        <div className={styles.heroImage} />
        <div className={styles.heroOverlay}>
          <p className={styles.heroLabel}>Objects — Collection</p>
          <h1 className={styles.heroTitle}>{collection.title}</h1>
        </div>
      </section>

      <div className={styles.page}>
        {/* Intro */}
        <p className={styles.intro}>{collection.intro}</p>

        {/* Concept */}
        <section className={styles.section}>
          <div className={styles.label}>About</div>
          <div className={styles.body}>
            {collection.conceptText.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* Object previews */}
        <section className={styles.section}>
          <div className={styles.label}>Objects</div>
          <div className={styles.body}>
            <ul className={styles.previewGrid}>
              {collection.objectPreviews.map((obj) => (
                <li key={obj.title} className={styles.preview}>
                  <div className={styles.previewImage} />
                  <div className={styles.previewInfo}>
                    <span className={styles.previewTitle}>{obj.title}</span>
                    <p className={styles.previewDesc}>{obj.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            {collection.storeHandle && (
              <Link
                href={`/store?collection=${collection.storeHandle}`}
                className={styles.storeLink}
              >
                View in Store →
              </Link>
            )}
          </div>
        </section>

        {/* References */}
        {collection.references.length > 0 && (
          <section className={styles.section}>
            <div className={styles.label}>References</div>
            <div className={styles.body}>
              <ul className={styles.refList}>
                {collection.references.map((r) => (
                  <li key={r.title} className={styles.ref}>
                    <span className={styles.refAuthor}>{r.author}</span>
                    <span className={styles.refTitle}>{r.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Back link */}
        <div className={styles.back}>
          <Link href="/objects" className={styles.backLink}>← Objects</Link>
        </div>
      </div>
    </main>
  )
}
