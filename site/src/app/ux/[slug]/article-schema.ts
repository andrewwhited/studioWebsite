// JSON-LD Article schema for individual case study + thought pages.
// Article is a Google rich-result type; CreativeWork is not. Always emit
// Article (regardless of case-study vs essay) so the page is eligible for
// the Article rich snippet treatment.

import { PERSON_ID } from '../person-schema'

const SITE_URL = 'https://ux.andrewwhited.com'
const STUDIO_URL = 'https://andrewwhited.com'

type ArticleInput = {
  slug: string
  title: string
  description?: string
  imageUrl?: string
  /** Free-form year string from CMS: "2024", "2023–2025", etc. */
  year?: string
  /** Exact ISO date, when the CMS has one. Takes precedence over `year`,
   *  which can only ever resolve to January 1st. */
  datePublished?: string
  /** Last real edit — the CMS document's own `_updatedAt`, not build time. */
  dateModified?: string
  /** Essays only — a signal Article consumers use to gauge substance. */
  wordCount?: number
  /** What the piece is about, as opposed to what form it takes. */
  topics?: string[]
  type: 'CaseStudy' | 'Essay'
}

// Convert a year string like "2024" or "2023–2025" to an ISO date.
// Picks the end year if a range; falls back to undefined if unparseable.
function yearToIsoDate(year?: string): string | undefined {
  if (!year) return undefined
  // Match any 4-digit years; if multiple, take the last (end of range).
  const matches = year.match(/\d{4}/g)
  if (!matches || matches.length === 0) return undefined
  const endYear = matches[matches.length - 1]
  return `${endYear}-01-01`
}

export function buildArticleSchema(input: ArticleInput) {
  const datePublished = input.datePublished || yearToIsoDate(input.year)
  // Build time is not an edit. Rebuilding the site with no content change was
  // announcing a fresh dateModified on every page, every deploy.
  const dateModified = input.dateModified?.slice(0, 10) || datePublished

  const image = input.imageUrl
    ? {
        '@type': 'ImageObject',
        url: input.imageUrl,
        width: 1200,
        height: 1200,
      }
    : undefined

  // References the Person defined on the homepage by @id rather than
  // describing a second one. Name and url are repeated so parsers that don't
  // resolve @id across pages still get a usable author.
  const author = {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Andrew Whited',
    url: SITE_URL,
  }

  const publisher = {
    '@type': 'Organization',
    name: 'Andrew Whited Studio',
    url: STUDIO_URL,
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    name: input.title,
    description: input.description,
    ...(image && { image }),
    url: `${SITE_URL}/${input.slug}`,
    author,
    creator: author,
    publisher,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(input.wordCount && { wordCount: input.wordCount }),
    ...(input.topics?.length && { keywords: input.topics.join(', '), about: input.topics }),
    articleSection: input.type === 'CaseStudy' ? 'Case Study' : 'Essay',
  }
}
