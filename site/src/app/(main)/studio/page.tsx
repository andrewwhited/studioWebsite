import styles from './studio.module.css'

const services = [
  {
    title: 'Custom Furniture',
    description:
      'Site-specific and edition pieces. Tables, seating, shelving, and storage—designed around material logic and spatial need.',
    slug: 'custom-furniture',
  },
  {
    title: 'Spatial Installation',
    description:
      'Larger-scale commissions engaging architecture, surface, and volume. Institutional and private contexts.',
    slug: 'spatial-installation',
  },
  {
    title: 'Material Consulting',
    description:
      'Working with architects, developers, and designers on material selection, specification, and execution.',
    slug: 'material-consulting',
  },
  {
    title: 'Small-Batch Production',
    description:
      'Limited runs of objects developed in the workshop. Available through the store.',
    slug: 'small-batch',
  },
]

const reading = [
  // url: fill in real links — Wikipedia, publisher, YouTube, etc.
  { type: 'Book',  author: 'Donald Judd',          title: 'Complete Writings',                                     year: '1975', url: '#' },
  { type: 'Essay', author: 'Donald Judd',          title: 'Specific Objects',                                      year: '1964', url: '#' },
  { type: 'Book',  author: 'Bruno Munari',          title: 'Design as Art',                                         year: '1966', url: '#' },
  { type: 'Book',  author: 'Robert Venturi',        title: 'Complexity and Contradiction in Architecture',          year: '1966', url: '#' },
  { type: 'Essay', author: 'Robert Morris',         title: 'Notes on Sculpture',                                    year: '1966', url: '#' },
  { type: 'Book',  author: 'Anni Albers',           title: 'On Weaving',                                            year: '1965', url: '#' },
  { type: 'Book',  author: 'Christopher Alexander', title: 'Notes on the Synthesis of Form',                        year: '1964', url: '#' },
  { type: 'Book',  author: 'Jane Jacobs',           title: 'The Death and Life of Great American Cities',           year: '1961', url: '#' },
  { type: 'Book',  author: 'Georges Perec',         title: 'Species of Spaces',                                     year: '1974', url: '#' },
  { type: 'Book',  author: 'Gaston Bachelard',      title: 'The Poetics of Space',                                  year: '1958', url: '#' },
  { type: 'Book',  author: 'Ulrich Conrads, ed.',   title: 'Programs and Manifestoes on 20th-Century Architecture', year: '1964', url: '#' },
  { type: 'Film',  author: 'Charles & Ray Eames',   title: 'Powers of Ten',                                         year: '1977', url: '#' },
]

export default function Studio() {
  return (
    <main>

      {/* ── Hero ──────────────────────────────────────────
          12-column grid. Text occupies cols 1–4 (left
          third), image fills cols 5–12 (right two-thirds).
          Nav wordmark (col 1) is over the light text panel.
          Nav links (col 3) are over the dark image panel —
          handled by .navLinksLight in Nav.tsx.

          Three text clusters inside the panel (a.jpg):
          label at top → void → heading + bio at bottom.
      ─────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroHeading}>
            A designer and maker working at the intersection of object
            design, spatial thinking, and material investigation.
          </h1>
          <div className={styles.heroBottom}>
            <div className={styles.heroImageSmall} />
            <p className={styles.heroBio}>
              The studio has operated since 2018, working across furniture,
              art objects, spatial commissions, and small-batch production.
              Located in Austin, Texas.
            </p>
          </div>
        </div>
        <div className={styles.heroImage} />
      </section>

      {/* ── Workshop ──────────────────────────────────────
          12-column grid within max-width.
          Label anchored col 1–2. Statement text cols 3–9.
          Full-width image below. Address + appt together.
          Reference: e.jpg (Noa studio).
      ─────────────────────────────────────────────────── */}
      <section className={styles.workshop}>
        <div className={styles.workshopGrid}>
          <div className={styles.workshopLabel}>Workshop</div>
          <p className={styles.workshopStatement}>
            A 2,400 sq ft working space accommodating furniture-scale
            production, dimensional milling, finishing, and limited
            fabrication in steel and concrete. Equipped for hardwood
            joinery, turning, bending, and surface work.
          </p>
          <div className={styles.workshopLocation}>
            <address>Austin, TX</address>
            <span className={styles.workshopAppt}>Open by appointment</span>
          </div>
        </div>
        <div className={styles.workshopImage} />
      </section>

      {/* ── Services ──────────────────────────────────────
          2×2 card grid with small images.
          Single inquiry CTA at the bottom — not per card.
      ─────────────────────────────────────────────────── */}
      <section className={styles.services}>
        <div className={styles.servicesInner}>
          <h2 className={styles.servicesHeading}>Services</h2>
          <ul className={styles.servicesGrid}>
            {services.map((s) => (
              <li key={s.slug} className={styles.serviceCard}>
                <div className={styles.serviceImage} />
                <div className={styles.serviceBody}>
                  <h3 className={styles.serviceTitle}>{s.title}</h3>
                  <p className={styles.serviceDesc}>{s.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.servicesCta}>
            <a
              href="mailto:studio@andrewwhited.com"
              className={styles.servicesCtaLink}
            >
              Inquire about services →
            </a>
          </div>
        </div>
      </section>

      {/* ── Reading + Listening ───────────────────────────
          Reading list left — small floating thumbnail per
          item, catalog-style (c.jpg). Listening sidebar
          right — secondary, light touch.
      ─────────────────────────────────────────────────── */}
      <section className={styles.reading}>

          <div className={styles.readingCol}>
            <div className={styles.readingHead}>
              <h2 className={styles.readingHeading}>Required Reading</h2>
              <p className={styles.readingIntro}>
                Books, essays, and films that inform how the work gets made.
              </p>
            </div>
            <ul className={styles.readingList}>
              {reading.map((item, i) => (
                <li key={i} className={styles.readingItem}>
                  <a
                    href={item.url}
                    className={styles.readingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* Thumb first in DOM so text layers above it */}
                    <div className={styles.readingThumb} aria-hidden="true" />
                    <span className={styles.readingTitle}>{item.title}</span>
                    <span className={styles.readingAuthor}>{item.author}</span>
                    <span className={styles.readingTag}>{item.type}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.listeningCol}>
            <h3 className={styles.listeningHeading}>What's running in the workshop.</h3>
            {/* Replace with Spotify iframe when playlist is ready */}
            <div className={styles.listeningEmbed} aria-label="Spotify playlist" />
          </div>

      </section>

      {/* ── Contact ───────────────────────────────────────
          Simple. No chrome.
      ─────────────────────────────────────────────────── */}
      <section className={styles.contact}>
        <div className={styles.contactInner}>
          <h2 className={styles.contactHeading}>Contact</h2>
          <div className={styles.contactLinks}>
            <a href="mailto:studio@andrewwhited.com" className={styles.contactLink}>
              studio@andrewwhited.com
            </a>
            <a href="#" className={styles.contactLink}>Instagram</a>
            <a href="#" className={styles.contactLink}>Are.na</a>
          </div>
        </div>
      </section>

    </main>
  )
}
