import styles from './sections.module.css'

export default function Background() {
  return (
    <section id="background" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <div className={styles.label}>Background</div>
          <div>
            <div className={styles.roleBlock}>
              <div className={styles.roleTitle}>Senior Product Designer</div>
              <div className={styles.roleMeta}>IBM &nbsp;&middot;&nbsp; 2018 &ndash; Present</div>
              <p className={styles.roleDesc}>
                Design lead across enterprise and AI product lines. Work has spanned AI assistant
                interfaces, data management platforms, and design system infrastructure. Most of the
                problems involve genuine complexity &mdash; large user bases, regulated industries,
                multi-team organizations &mdash; where the design challenge is structural as much
                as it is visual.
              </p>
            </div>
            <p className={styles.bodyText}>
              Earlier in my career I worked across digital product, brand, and systems design
              in smaller studio and agency contexts before moving into enterprise software full-time.
              That background informs how I think about visual quality, editorial clarity, and
              the relationship between form and function.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
