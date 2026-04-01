import { sanity } from './sanity'

// ---- Singleton pages ----

export async function getHomePage() {
  return sanity.fetch(`*[_type == "homePage"][0]`, {}, { next: { tags: ['homePage'] } })
}

export async function getStudioPage() {
  return sanity.fetch(`*[_type == "studioPage"][0]`, {}, { next: { tags: ['studioPage'] } })
}

export async function getObjectsPage() {
  return sanity.fetch(`*[_type == "objectsPage"][0]`, {}, { next: { tags: ['objectsPage'] } })
}

export async function getArtPage() {
  return sanity.fetch(`*[_type == "artPage"][0]`, {}, { next: { tags: ['artPage'] } })
}

export async function getImagePage() {
  return sanity.fetch(`*[_type == "imagePage"][0]`, {}, { next: { tags: ['imagePage'] } })
}

export async function getStorePage() {
  return sanity.fetch(`*[_type == "storePage"][0]`, {}, { next: { tags: ['storePage'] } })
}

export async function getUxPage() {
  return sanity.fetch(`*[_type == "uxPage"][0]`, {}, { next: { tags: ['uxPage'] } })
}

// ---- Collections ----

export async function getAllCollections() {
  return sanity.fetch(`*[_type == "collection"] | order(title asc)`, {}, { next: { tags: ['collection'] } })
}

export async function getCollectionBySlug(slug: string) {
  return sanity.fetch(`*[_type == "collection" && slug.current == $slug][0]`, { slug }, { next: { tags: ['collection'] } })
}

// ---- Artworks ----

export async function getAllArtworks() {
  return sanity.fetch(`*[_type == "artwork"] | order(year desc)`, {}, { next: { tags: ['artwork'] } })
}

export async function getArtworkBySlug(slug: string) {
  return sanity.fetch(`*[_type == "artwork" && slug.current == $slug][0]`, { slug }, { next: { tags: ['artwork'] } })
}

// ---- Photo Sets ----

export async function getAllPhotoSets() {
  return sanity.fetch(`*[_type == "photoSet"]`, {}, { next: { tags: ['photoSet'] } })
}

// ---- Work (UX case studies) ----

export async function getAllWork() {
  return sanity.fetch(`*[_type == "work"] | order(order asc)`, {}, { next: { tags: ['work'] } })
}

export async function getWorkBySlug(slug: string) {
  return sanity.fetch(`*[_type == "work" && slug.current == $slug][0]`, { slug }, { next: { tags: ['work'] } })
}

// ---- Thoughts (essays) ----

export async function getAllThoughts() {
  return sanity.fetch(`*[_type == "thought"] | order(order asc)`, {}, { next: { tags: ['thought'] } })
}

export async function getThoughtBySlug(slug: string) {
  return sanity.fetch(`*[_type == "thought" && slug.current == $slug][0]`, { slug }, { next: { tags: ['thought'] } })
}
