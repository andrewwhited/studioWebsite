import styles from './studio.module.css'

const services = [
  {
    title: 'Custom Furniture',
    description:
      'Site-specific and edition pieces. Tables, seating, shelving, and storage—designed around material logic and spatial need.',
  },
  {
    title: 'Spatial Installation',
    description:
      'Larger-scale commissions engaging architecture, surface, and volume. Institutional and private contexts.',
  },
  {
    title: 'Material Consulting',
    description:
      'Working with architects, developers, and designers on material selection, specification, and execution.',
  },
  {
    title: 'Small-Batch Production',
    description:
      'Limited runs of objects developed in the workshop. Available through the store.',
  },
]

const references = [
  { author: 'Donald Judd', title: 'Complete Writings', year: '1975' },
  { author: 'Bruno Munari', title: 'Design as Art', year: '1966' },
  { author: 'Robert Venturi', title: 'Complexity and Contradiction in Architecture', year: '1966' },
  { author: 'Anni Albers', title: 'On Weaving', year: '1965' },
  { author: 'Jane Jacobs', title: 'The Death and Life of Great American Cities', year: '1961' },
  { author: 'Christopher Alexander', title: 'Notes on the Synthesis of Form', year: '1964' },
  { author: 'Ulrich Conrads, ed.', title: 'Programs and Manifestoes on 20th-Century Architecture', year: '1964' },
]

export default function Studio() {
  return (
    <main>
      {/* Hero — nav floats over this */}
      <section className={styles.hero}>
        <div className={styles.heroImage} />
      </section>

      <div className={styles.page}>
        {/* Intro */}
        <p className={styles.intro}>
          Andrew Whited is a designer and maker working with wood, metal, and process.
          The studio operates at the intersection of object design, spatial thinking,
          and material investigation.
        </p>

        {/* Practice */}
        <section className={styles.section}>
          <div className={styles.label}>Practice</div>
          <div className={styles.body}>
            <p>
              Work begins with material—its behavior under force, its resistance to finish,
              its memory of where it came from. Objects emerge from that negotiation rather
              than from a predetermined form. The results tend toward restraint: things that
              earn their presence without announcing it.
            </p>
            <p>
              The studio has operated since 2018, working across furniture, art objects,
              spatial commissions, and small-batch production. Located in Portland, Oregon.
            </p>
          </div>
        </section>

        {/* Workshop */}
        <section className={styles.section}>
          <div className={styles.label}>Workshop</div>
          <div className={styles.body}>
            <p>
              A 2,400 sq ft working workshop accommodating furniture-scale production,
              dimensional milling, finishing, and limited fabrication in steel and concrete.
              Equipped for hardwood joinery, turning, bending, and surface work.
            </p>
            <p>Open by appointment.</p>
          </div>
        </section>

        {/* Location */}
        <section className={styles.section}>
          <div className={styles.label}>Location</div>
          <div className={styles.body}>
            <address className={styles.address}>
              2847 SE Division St<br />
              Portland, OR 97202
            </address>
          </div>
        </section>

        {/* Services */}
        <section className={styles.section}>
          <div className={styles.label}>Services</div>
          <div className={styles.body}>
            <ul className={styles.servicesList}>
              {services.map((s) => (
                <li key={s.title} className={styles.service}>
                  <span className={styles.serviceTitle}>{s.title}</span>
                  <p className={styles.serviceDesc}>{s.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* References */}
        <section className={styles.section}>
          <div className={styles.label}>References</div>
          <div className={styles.body}>
            <ul className={styles.refList}>
              {references.map((r) => (
                <li key={r.title} className={styles.ref}>
                  <span className={styles.refAuthor}>{r.author}</span>
                  <span className={styles.refTitle}>{r.title}</span>
                  <span className={styles.refYear}>{r.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section className={styles.section}>
          <div className={styles.label}>Contact</div>
          <div className={styles.body}>
            <ul className={styles.contactList}>
              <li>
                <a href="mailto:studio@andrewwhited.com" className={styles.contactLink}>
                  studio@andrewwhited.com
                </a>
              </li>
            </ul>
            <ul className={styles.socialList}>
              <li><a href="#" className={styles.contactLink}>Instagram</a></li>
              <li><a href="#" className={styles.contactLink}>Are.na</a></li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  )
}
