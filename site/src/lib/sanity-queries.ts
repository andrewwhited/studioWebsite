import { sanity } from './sanity'

// ---- Singleton pages ----

export async function getHomePage() {
  return sanity.fetch(`*[_type == "homePage"][0]`)
}

export async function getStudioPage() {
  return sanity.fetch(`*[_type == "studioPage"][0]`)
}

export async function getObjectsPage() {
  return sanity.fetch(`*[_type == "objectsPage"][0]`)
}

export async function getArtPage() {
  return sanity.fetch(`*[_type == "artPage"][0]`)
}

export async function getImagePage() {
  return sanity.fetch(`*[_type == "imagePage"][0]`)
}

export async function getStorePage() {
  return sanity.fetch(`*[_type == "storePage"][0]`)
}

export async function getUxPage() {
  return sanity.fetch(`*[_type == "uxPage"][0]`)
}

// ---- Collections ----

export async function getAllCollections() {
  return sanity.fetch(`*[_type == "collection"] | order(title asc)`)
}

export async function getCollectionBySlug(slug: string) {
  return sanity.fetch(`*[_type == "collection" && slug.current == $slug][0]`, { slug })
}

// ---- Artworks ----

export async function getAllArtworks() {
  return sanity.fetch(`*[_type == "artwork"] | order(year desc)`)
}

export async function getArtworkBySlug(slug: string) {
  return sanity.fetch(`*[_type == "artwork" && slug.current == $slug][0]`, { slug })
}

// ---- Photo Sets ----

export async function getAllPhotoSets() {
  return sanity.fetch(`*[_type == "photoSet"]`)
}

// ---- Work (UX case studies) ----

// Listing query — only fields needed for the index card on /ux
export async function getAllWork() {
  return sanity.fetch(
    `*[_type == "work"] | order(order asc) {
      _id,
      title,
      slug,
      summary,
      client,
      role,
      year,
      heroImage { asset, alt }
    }`
  )
}

// Polymorphic block projection used inside both section.blocks and subsection.blocks.
// Sanity GROQ conditional projection — `_type == "x" => { ... }` adds fields when
// the block matches that type.
const blockProjection = `
  _type,
  _key,
  _type == "figure" => {
    image { asset, alt, hotspot },
    alt,
    caption,
    fullWidth,
    hideCaption
  },
  _type == "figureFlow" => {
    images[] { asset, alt, hotspot },
    alt,
    caption,
    fullWidth
  },
  _type == "prose" => { body },
  _type == "pullQuote" => { text },
  _type == "kpiCallout" => { value, label, source },
  _type == "emDashList" => { items[] { _key, lead, body } },
  _type == "reflection" => { body },
  _type == "ndaNote" => { text },
  _type == "taxonomyTiles" => { tiles[] { _key, number, title, body } },
  _type == "integrationTiles" => { tiles[] { _key, number, title, body } }
`

const subsectionProjection = `
  _type,
  _key,
  _type == "subsection" => {
    title,
    body,
    blocks[]{ ${blockProjection} }
  }
`

export async function getWorkBySlug(slug: string) {
  return sanity.fetch(
    `*[_type == "work" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      summary,
      client,
      role,
      year,
      heroImage { asset, alt, hotspot },
      sections[]{
        _type,
        _key,
        title,
        layout,
        body,
        asideKind,
        asideImage { asset, alt, caption, hotspot },
        asidePullQuote,
        blocks[]{
          ${subsectionProjection},
          ${blockProjection}
        }
      }
    }`,
    { slug }
  )
}

// ---- Thoughts (essays) ----

export async function getAllThoughts() {
  return sanity.fetch(`*[_type == "thought"] | order(order asc)`)
}

export async function getThoughtBySlug(slug: string) {
  return sanity.fetch(`*[_type == "thought" && slug.current == $slug][0]`, { slug })
}
