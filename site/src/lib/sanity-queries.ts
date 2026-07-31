import { sanity } from './sanity'

// ---- Singleton pages ----

export async function getHomePage() {
  return sanity.fetch(`*[_type == "homePage"][0]`)
}

// Projected rather than `*` on purpose: the document is serialized into the
// RSC payload and is readable in page source, so only fields the page renders
// should be selected. Anything unrendered would otherwise be crawlable.
export async function getStudioPage() {
  return sanity.fetch(`*[_type == "studioPage"][0]{
    aboutText,
    heroPrimaryImage,
    heroSecondaryImage,
    heroTertiaryImage,
    bioName,
    locationAddress,
    locationImage,
    exhibitions[]{_key, title, location, year},
    readingList[]{_key, title, creator, link, thumbnail, note},
    email,
    instagram,
    tiktok,
    uxSiteUrl
  }`)
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

export async function getUxSiteSettings() {
  return sanity.fetch(`*[_type == "uxSiteSettings"][0]`)
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
  return sanity.fetch(
    `*[_type == "artwork" && slug.current == $slug][0] {
      ...,
      heroImage {
        ...,
        asset->{ _id, url, metadata { dimensions } }
      },
      images[] {
        ...,
        asset->{ _id, url, metadata { dimensions } }
      }
    }`,
    { slug }
  )
}

// ---- Photo Sets ----

// `_id` is deliberately not projected. Document IDs are opaque and carry no
// display value, and the payload is readable in page source — the cover URL is
// already unique per set, so it serves as the React key.
//
// Image dimensions come along because the lightbox renders each frame at its
// native ratio: the sets mix 6:7 (RZ67), 3:4 (645), and 2:3 (35mm), and some
// frames are landscape. Only the grid cover is normalised to 6:7.
export async function getAllPhotoSets() {
  return sanity.fetch(`*[_type == "photoSet"] | order(year desc, _createdAt asc){
    location,
    year,
    category,
    coverImage{ hotspot, asset->{ url } },
    images[]{ asset->{ url, metadata { dimensions { width, height } } } }
  }`)
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
      seo,
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

// Newest first. `coalesce` covers the un-ported 2016 essay, which carries a
// year string and no publish date — "2017" and "2026-07-31" still sort
// correctly against each other as strings.
export async function getAllThoughts() {
  return sanity.fetch(`*[_type == "thought"] | order(coalesce(publishedAt, year) desc) {
    _id,
    title,
    slug,
    subtitle,
    summary,
    type,
    topics,
    year,
    publishedAt,
    context
  }`)
}

// Polymorphic projection for the essay body array.
const essayBlockProjection = `
  _type,
  _key,
  _type == "essayHeading" => { title },
  _type == "essayProseBlock" => { body },
  _type == "epigraph" => { text, attribution },
  _type == "pullQuote" => { text },
  _type == "marginNote" => { label, text, url },
  _type == "sectionBreak" => { note },
  _type == "figure" => {
    image { asset, alt, hotspot },
    alt,
    caption,
    width,
    fullWidth,
    hideCaption,
    placeholder,
    placeholderLabel,
    placeholderRatio
  },
  _type == "figureFlow" => {
    images[] { asset, alt, hotspot },
    alt,
    caption,
    width,
    fullWidth
  }
`

export async function getThoughtBySlug(slug: string) {
  return sanity.fetch(
    `*[_type == "thought" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      subtitle,
      summary,
      type,
      year,
      publishedAt,
      readingTime,
      topics,
      crossPosts[] { _key, platform, url },
      heroImage { asset, alt, hotspot },
      closing,
      seo,
      context,
      body[]{ ${essayBlockProjection} }
    }`,
    { slug },
  )
}
