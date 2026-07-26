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

  // Copy has one source of truth: Sanity. No string fallbacks — they drift, and
  // the last set held lines the voice pass had already rejected as inaccurate.
  const aboutText = page?.aboutText
  const name = page?.bioName
  const address = page?.locationAddress
  const exhibitions = page?.exhibitions ?? []
  const readingList = page?.readingList ?? []
  const contactEmail = page?.email
  const instagramUrl = page?.instagram
  const tiktokUrl = page?.tiktok
  const uxSiteUrl = page?.uxSiteUrl
  const whatsPlaying = page?.whatsPlaying

  // Unfilled slots render a marked placeholder rather than collapsing. These
  // two carry structure — the workshop image is what the About caption hands
  // off to, and the embed holds the right rail beside Required Reading — so
  // collapsing them silently changes the composition instead of showing a gap.
  const hasWorkshopImage = Boolean(page?.locationImage?.asset)
  const hasListening = Boolean(whatsPlaying)

  // Authored as paragraphs. Splitting on blank lines keeps the author's
  // breaks instead of collapsing the block into one slab.
  const aboutParagraphs: string[] = (aboutText?.split(/\n\s*\n/) ?? [])
    .map((p: string) => p.trim())
    .filter(Boolean)

  // The block splits across the fold: the opening paragraph carries the fold
  // on its own, the rest set in two columns below it. Still one continuous
  // block of prose — the break is compositional, not editorial.
  const [aboutOpening, ...aboutRest] = aboutParagraphs

  return (
    <main>

      {/* ── About ────────────────────────────────────────
          Mirrors the home page thirds, reversed: text left,
          images right. The prose is the page's apex; the
          name and address sit under it as one caption.
      ─────────────────────────────────────────────────── */}
      <section className={styles.about}>
        <div className={styles.aboutText}>
          {aboutOpening && <p className={styles.aboutOpening}>{aboutOpening}</p>}
        </div>
        <div className={styles.aboutImageMid} style={imgStyle(page?.heroPrimaryImage)} />
        <div className={styles.aboutImageStack}>
          <div className={styles.aboutImageTop} style={imgStyle(page?.heroSecondaryImage, 800)} />
          <div className={styles.aboutImageBottom} style={imgStyle(page?.heroTertiaryImage, 800)} />
        </div>
      </section>

      {/* ── About, continued ─────────────────────────────
          Two columns of prose against an empty third. The
          caption anchors that column rather than filling
          it — the space is the point.
      ─────────────────────────────────────────────────── */}
      {aboutRest.length > 0 && (
        <section className={styles.aboutBody}>
          <div className={styles.aboutCaption}>
            <h1 className={styles.aboutName}>{name}</h1>
            {address && <address className={styles.aboutAddress}>{address}</address>}
          </div>
          {aboutRest.map((p: string, i: number) => (
            <p key={i} className={i % 2 === 0 ? styles.aboutColA : styles.aboutColB}>
              {p}
            </p>
          ))}
        </section>
      )}

      {/* ── Workshop ─────────────────────────────────────
          Image only. The address lives in the About
          caption, and the statement was cut with it —
          the photograph is the section.
      ─────────────────────────────────────────────────── */}
      <section className={styles.workshop}>
        {hasWorkshopImage ? (
          <div className={styles.workshopImage} style={imgStyle(page?.locationImage, 2000)} />
        ) : (
          <div className={`${styles.workshopImage} ${styles.placeholder}`}>
            <span className={styles.placeholderLabel}>Workshop photo</span>
          </div>
        )}
      </section>

      {/* ── Record + taste ───────────────────────────────
          Three columns of the same species: what has been
          shown, what is being read, what is playing. One
          row grammar across all of them — title over a
          muted meta line — so the band reads as a set.
      ─────────────────────────────────────────────────── */}
      <section className={styles.band}>

        <div className={styles.bandColA}>
          <h2 className={styles.bandLabel}>Exhibitions</h2>
          <ul className={styles.list}>
            {exhibitions.map((item: any) => (
              <li key={item._key} className={styles.entry}>
                <span className={styles.entryTitle}>{item.title}</span>
                {/* Venue deliberately not rendered — the field is still in
                    Sanity if it earns its place back later. */}
                <span className={styles.entryMeta}>
                  {[item.location, item.year].filter(Boolean).join('  ')}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bandColB}>
          <h2 className={styles.bandLabel}>Required Reading</h2>
          <ul className={styles.list}>
            {readingList.map((item: any) => {
              const row = (
                <>
                  <span className={styles.entryTitle}>{item.title}</span>
                  <span className={styles.entryMeta}>{item.creator}</span>
                </>
              )

              return (
                <li key={item._key} className={styles.entry}>
                  {item.link ? (
                    <a
                      href={item.link}
                      className={styles.entryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {row}
                    </a>
                  ) : (
                    // No link — render as a plain row so it isn't fake-interactive.
                    row
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        <div className={styles.bandColC}>
          <h2 className={styles.bandLabel}>What&apos;s Playing</h2>
          {hasListening ? (
            <iframe
              className={styles.embed}
              src={whatsPlaying}
              title="What's playing in the workshop"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          ) : (
            <div className={`${styles.embed} ${styles.placeholder}`}>
              <span className={styles.placeholderLabel}>Embed</span>
            </div>
          )}
        </div>

      </section>

      {/* ── Contact ──────────────────────────────────── */}
      <section className={styles.contact}>
        <div className={styles.contactInner}>
          <h2 className={styles.contactHeading}>{page?.contactTitle}</h2>
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
            {uxSiteUrl && (
              <a href={uxSiteUrl} className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                UX &amp; digital design
              </a>
            )}
          </div>
        </div>
      </section>

    </main>
  )
}
