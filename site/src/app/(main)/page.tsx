import { getHomePage } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import styles from './home.module.css'

function heroImageStyles(image: any) {
  if (!image) return undefined

  const url = urlFor(image).width(1600).quality(80).auto('format').url()

  const style: React.CSSProperties = {
    backgroundImage: `url(${url})`,
  }

  if (image.hotspot) {
    style.backgroundPosition = `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
  }

  return style
}

export default async function Home() {
  const page = await getHomePage()

  return (
    <main>
      <section className={styles.hero}>

        {/* Column 1 — image, full bleed left */}
        <div
          className={styles.image}
          style={heroImageStyles(page?.heroImage)}
        />

        {/* Column 2 — empty, do not add content here */}

        {/* Column 3 — text block, vertically centered */}
        <div className={styles.content}>
          <h1 className={styles.title}>{page?.title}</h1>
          <p className={styles.descriptor}>{page?.text}</p>
        </div>

      </section>
    </main>
  )
}
