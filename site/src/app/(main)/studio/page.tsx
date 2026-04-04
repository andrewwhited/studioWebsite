import { getStudioPage } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import styles from './studio.module.css'

function imgStyle(image: any, width = 1200) {
  if (!image) return undefined
  const url = urlFor(image).width(width).quality(80).auto('format').url()
  const style: React.CSSProperties = {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: image.hotspot
      ? `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
      : 'center',
  }
  return style
}

export default async function Studio() {
  const page = await getStudioPage()

  const heroHeading = page?.heroHeading ?? 'A designer and maker working at the intersection of object design, spatial thinking, and material investigation.'
  const heroText = page?.heroText ?? 'The studio has operated since 2018, working across furniture, art objects, spatial commissions, and small-batch production. Located in Austin, Texas.'
  const bioName = page?.bioName ?? 'Andrew Whited'
  const bioText = page?.bioText ?? 'Designer and maker based in Austin, Texas.'
  const workshopText = page?.locationText ?? 'A 2,400 sq ft working space accommodating furniture-scale production, dimensional milling, finishing, and limited fabrication in steel and concrete. Equipped for hardwood joinery, turning, bending, and surface work.'
  const workshopAddress = page?.locationAddress ?? 'Austin, TX'
  const workshopVisit = page?.locationVisitNote ?? 'Visit by appointment'
  const services = page?.services ?? []
  const readingList = page?.readingList ?? []
  const contactEmail = page?.email ?? 'studio@andrewwhited.com'
  const instagramUrl = page?.instagram
  const tiktokUrl = page?.tiktok
  const whatsPlaying = page?.whatsPlaying

  return (
    <main>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroHeading}>{heroHeading}</h1>
          <p className={styles.heroBio}>{heroText}</p>
        </div>
        <div className={styles.heroImageMid} style={imgStyle(page?.heroPrimaryImage)} />
        <div className={styles.heroImageStack}>
          <div className={styles.heroImageTop} style={imgStyle(page?.heroSecondaryImage, 800)} />
          <div className={styles.heroImageBottom} style={imgStyle(page?.heroTertiaryImage, 800)} />
        </div>
      </section>

      {/* ── Bio ──────────────────────────────────────── */}
      <section className={styles.bio}>
        <div className={styles.bioGrid}>
          <p className={styles.bioName}>{bioName}</p>
          <p className={styles.bioText}>{bioText}</p>
        </div>
      </section>

      {/* ── Workshop ─────────────────────────────────── */}
      <section className={styles.workshop}>
        <div className={styles.workshopGrid}>
          <div className={styles.workshopContent}>
            <p className={styles.workshopStatement}>{workshopText}</p>
            <div className={styles.workshopMeta}>
              <address>{workshopAddress}</address>
              <span className={styles.workshopAppt}>{workshopVisit}</span>
            </div>
          </div>
          <div className={styles.workshopImage} style={imgStyle(page?.locationImage)} />
        </div>
      </section>

      {/* ── Services ─────────────────────────────────── */}
      <section className={styles.services}>
        <div className={styles.servicesInner}>
          <ul className={styles.servicesGrid}>
            {services.map((s: any) => (
              <li key={s._key} className={styles.serviceRow}>
                <h3 className={styles.serviceTitle}>{s.title}</h3>
                <p className={styles.serviceDesc}>{s.text}</p>
              </li>
            ))}
          </ul>
          <div className={styles.servicesCta}>
            <a
              href={`mailto:${contactEmail}`}
              className={styles.servicesCtaLink}
            >
              {page?.servicesContact ?? 'Inquire about services →'}
            </a>
          </div>
        </div>
      </section>

      {/* ── Reading + Listening ──────────────────────── */}
      <section className={styles.reading}>

        <div className={styles.readingCol}>
          <div className={styles.readingHead}>
            <h2 className={styles.readingHeading}>Required Reading</h2>
            <p className={styles.readingIntro}>
              Books, essays, and films that inform how the work gets made.
            </p>
          </div>
          <ul className={styles.readingList}>
            {readingList.map((item: any) => (
              <li key={item._key} className={styles.readingItem}>
                <a
                  href={item.link ?? '#'}
                  className={styles.readingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.readingThumb} aria-hidden="true" />
                  <span className={styles.readingTitle}>{item.title}</span>
                  <span className={styles.readingAuthor}>{item.creator}</span>
                  {item.note && <span className={styles.readingNote}>{item.note}</span>}
                  <span className={styles.readingTag}>{item.itemType}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.listeningCol}>
          <h3 className={styles.listeningHeading}>What's running in the workshop.</h3>
          {whatsPlaying ? (
            <iframe
              className={styles.listeningEmbed}
              src={whatsPlaying}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          ) : (
            <div className={styles.listeningEmbed} aria-label="Spotify playlist" />
          )}
        </div>

      </section>

      {/* ── Contact ──────────────────────────────────── */}
      <section className={styles.contact}>
        <div className={styles.contactInner}>
          <h2 className={styles.contactHeading}>{page?.contactTitle ?? 'Contact'}</h2>
          <div className={styles.contactLinks}>
            <a href={`mailto:${contactEmail}`} className={styles.contactLink}>
              {contactEmail}
            </a>
            {instagramUrl && (
              <a href={instagramUrl} className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            )}
            {tiktokUrl && (
              <a href={tiktokUrl} className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}
