import { getStudioPage } from '@/lib/sanity-queries'
import { getTopArtists } from '@/lib/spotify'
import { urlFor } from '@/lib/sanity'
import ReadingList from './ReadingList'
import styles from './studio.module.css'

// Regenerate daily. Both the Spotify token refresh and the top-artists
// call sit on the same cycle, so one regeneration costs one of each.
export const revalidate = 86400

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
  const [page, topArtists] = await Promise.all([getStudioPage(), getTopArtists(5)])

  // Copy has one source of truth: Sanity. No string fallbacks — they drift, and
  // the last set held lines the voice pass had already rejected as inaccurate.
  const aboutText = page?.aboutText
  const name = page?.bioName
  const address = page?.locationAddress
  const exhibitions = page?.exhibitions ?? []
  // Cover URLs are resolved here rather than in the client component: urlFor
  // needs the Sanity client, and there is no reason to ship it to the browser
  // for twelve static image URLs.
  const readingItems = (page?.readingList ?? []).map((item: any) => ({
    key: item._key,
    title: item.title,
    creator: item.creator,
    note: item.note,
    link: item.link,
    thumbUrl: item.thumbnail?.asset
      ? urlFor(item.thumbnail).width(240).quality(80).auto('format').url()
      : undefined,
  }))
  const contactEmail = page?.email
  const instagramUrl = page?.instagram
  const tiktokUrl = page?.tiktok
  const uxSiteUrl = page?.uxSiteUrl

  // An unfilled workshop image renders a marked placeholder rather than
  // collapsing — it carries structure, so collapsing it silently changes
  // the composition rather than showing a gap.
  const hasWorkshopImage = Boolean(page?.locationImage?.asset)

  // Authored as paragraphs. Splitting on blank lines keeps the author's
  // breaks instead of collapsing the block into one slab.
  const aboutParagraphs: string[] = (aboutText?.split(/\n\s*\n/) ?? [])
    .map((p: string) => p.trim())
    .filter(Boolean)

  return (
    <main>

      {/* ── About ────────────────────────────────────────
          Two rows. Row one is the viewport: photographs on
          the middle and right thirds, the prose column
          beginning around two thirds down so the fold
          opens on space rather than text.

          The prose runs as one unbroken column across both
          rows. Exhibitions sits in row two, under the
          photographs and beside the continuing text — it
          is biography, so it stays inside this block
          rather than becoming a section of its own.
      ─────────────────────────────────────────────────── */}
      <section className={styles.about}>

        <div className={styles.aboutText}>
          <h1 className={styles.aboutName}>{name}</h1>
          <div className={styles.aboutProse}>
            {aboutParagraphs.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className={styles.aboutImageMid} style={imgStyle(page?.heroPrimaryImage)} />
        <div className={styles.aboutImageStack}>
          <div className={styles.aboutImageTop} style={imgStyle(page?.heroSecondaryImage, 800)} />
          <div className={styles.aboutImageBottom} style={imgStyle(page?.heroTertiaryImage, 800)} />
        </div>

        {exhibitions.length > 0 && (
          <section className={styles.exhibitions}>
            <h2 className={styles.label}>Exhibitions</h2>
            <ul className={styles.list}>
              {exhibitions.map((item: any) => (
                <li key={item._key} className={styles.entry}>
                  <span className={styles.entryTitle}>{item.title}</span>
                  <span className={styles.entryMeta}>{item.location}</span>
                  <span className={styles.entryMeta}>{item.year}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

      </section>

      {/* ── Workshop ─────────────────────────────────────
          Image only. The address lives in Contact now.
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

      {/* ── Taste ────────────────────────────────────────
          What is being read and what is playing. Separated
          from Exhibitions on purpose: that is record, this
          is taste.
      ─────────────────────────────────────────────────── */}
      <section className={styles.taste}>

        <div className={styles.reading}>
          <h2 className={styles.label}>Required Reading</h2>
          <ReadingList items={readingItems} />
        </div>

        <div className={styles.listening}>
          <h2 className={styles.label}>On repeat in the shop</h2>
          {topArtists.length > 0 ? (
            <ul className={styles.list}>
              {topArtists.map((artist, i) => (
                <li key={artist.id} className={styles.entry}>
                  <div className={styles.artistRow}>
                    <span className={styles.artistRank}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {artist.image ? (
                      <div
                        className={styles.artistThumb}
                        style={{ backgroundImage: `url(${artist.image})` }}
                        aria-hidden="true"
                      />
                    ) : (
                      <div
                        className={`${styles.artistThumb} ${styles.artistThumbEmpty}`}
                        aria-hidden="true"
                      />
                    )}
                    <span className={styles.entryTitle}>{artist.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            // Spotify unreachable or not configured — the column goes quiet
            // rather than showing a broken state. The failure is in the logs.
            <div className={styles.unavailable}>
              <span className={styles.placeholderLabel}>Unavailable</span>
            </div>
          )}
          {/* Below the list, so the rule above stays on the same line as
              Required Reading's. A bounded, rolling window is what signals
              the list is live, without the page announcing its plumbing. */}
          <p className={styles.listNote}>Top plays on Spotify this month</p>
        </div>

      </section>

      {/* ── Contact ──────────────────────────────────────
          Four columns on one rhythm: a verb, then the way
          to do it.
      ─────────────────────────────────────────────────── */}
      <section className={styles.contact}>

        {contactEmail && (
          <div className={styles.contactCol}>
            <h2 className={styles.label}>Contact me</h2>
            <a href={`mailto:${contactEmail}`} className={styles.contactLink}>
              {contactEmail}
            </a>
          </div>
        )}

        {(instagramUrl || tiktokUrl) && (
          <div className={styles.contactCol}>
            <h2 className={styles.label}>Follow me</h2>
            {instagramUrl && (
              <a
                href={instagramUrl}
                className={styles.contactLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            )}
            {tiktokUrl && (
              <a
                href={tiktokUrl}
                className={styles.contactLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                TikTok
              </a>
            )}
          </div>
        )}

        {address && (
          <div className={styles.contactCol}>
            <h2 className={styles.label}>Visit me</h2>
            <address className={styles.contactAddress}>{address}</address>
          </div>
        )}

        {uxSiteUrl && (
          <div className={styles.contactCol}>
            <h2 className={styles.label}>See my UX work</h2>
            <a
              href={uxSiteUrl}
              className={styles.contactLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              ux.andrewwhited.com
            </a>
          </div>
        )}

      </section>

    </main>
  )
}
