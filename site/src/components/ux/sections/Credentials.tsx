import styles from './sections.module.css'

type Publication = {
  _key: string
  title: string
  type: string
  date: string
}

type Talk = {
  _key: string
  title: string
  venue: string
  location: string
  date: string
}

type Props = {
  image?: string
  imageHotspot?: { x: number; y: number }
  publications?: Publication[]
  talks?: Talk[]
}

export default function PublicationsTalks({ image, imageHotspot, publications, talks }: Props) {
  return (
    <section id="credentials" className={styles.section}>
      <div className={styles.layout}>

        {image && (
          <img
            src={image}
            alt="Andrew Whited"
            className={styles.aboutPhoto}
            style={
              imageHotspot
                ? { objectPosition: `${imageHotspot.x * 100}% ${imageHotspot.y * 100}%` }
                : undefined
            }
          />
        )}

        <div className={styles.pubCol}>
          <div className={styles.colLabel}>Publications</div>
          <ul className={styles.colList}>
            {(publications ?? []).map((item) => (
              <li key={item._key} className={styles.colItem}>
                <span className={styles.colItemTitle}>{item.title}</span>
                <span className={styles.colItemMeta}>{item.type} · {item.date}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.talksCol}>
          <div className={styles.colLabel}>Talks</div>
          <ul className={styles.colList}>
            {(talks ?? []).map((talk) => (
              <li key={talk._key} className={styles.colItem}>
                <span className={styles.colItemTitle}>{talk.title}</span>
                <span className={styles.colItemMeta}>
                  {talk.venue} · {talk.location} · {talk.date}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
