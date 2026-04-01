import Link from 'next/link'
import { getArtPage, getAllArtworks } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import styles from './art.module.css'

export default async function Art() {
  const [page, artworks] = await Promise.all([getArtPage(), getAllArtworks()])

  return (
    <main className={styles.main}>

      {/* Stage — top half void, Art + intro in right third */}
      <div className={styles.stage}>
        <div className={styles.stageRight}>
          <p className={styles.stageLabel}>{page?.title ?? 'Art'}</p>
          <p className={styles.stageIntro}>
            {page?.text ??
              'Works on paper, panel, and in three dimensions. One-of-one pieces developed alongside the object and studio work. Inquiry via email.'}
          </p>
        </div>
      </div>

      {/* Works strip — bottom half, scrolls horizontally */}
      <ul className={styles.works}>
        {(artworks ?? []).map((work: any) => (
          <li key={work.slug?.current}>
            <Link href={`/art/${work.slug?.current}`} className={styles.work}>
              <div className={styles.workText}>
                <span className={styles.workTitle}>{work.title}</span>
                <span className={styles.workDetail}>{work.materials}, {work.year}</span>
              </div>
              <div
                className={styles.workImage}
                style={
                  work.primaryImage
                    ? {
                        backgroundImage: `url(${urlFor(work.primaryImage).width(800).quality(80).auto('format').url()})`,
                        backgroundSize: 'cover',
                        backgroundPosition: work.primaryImage.hotspot
                          ? `${work.primaryImage.hotspot.x * 100}% ${work.primaryImage.hotspot.y * 100}%`
                          : 'center',
                      }
                    : undefined
                }
              />
            </Link>
          </li>
        ))}
      </ul>

    </main>
  )
}
