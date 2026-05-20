// JSON-LD Article schema for individual case study + thought pages.
// Keeps schema.org structure separate from page rendering.

const SITE_URL = 'https://ux.andrewwhited.com'

type ArticleInput = {
  slug: string
  title: string
  description?: string
  imageUrl?: string
  datePublished?: string
  type: 'CaseStudy' | 'Essay'
}

export function buildArticleSchema(input: ArticleInput) {
  const articleType = input.type === 'CaseStudy' ? 'CreativeWork' : 'Article'

  return {
    '@context': 'https://schema.org',
    '@type': articleType,
    headline: input.title,
    name: input.title,
    description: input.description,
    image: input.imageUrl,
    url: `${SITE_URL}/${input.slug}`,
    author: {
      '@type': 'Person',
      name: 'Andrew Whited',
      url: SITE_URL,
    },
    creator: {
      '@type': 'Person',
      name: 'Andrew Whited',
      url: SITE_URL,
    },
    ...(input.datePublished && { datePublished: input.datePublished }),
  }
}
