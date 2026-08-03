import type { MetadataRoute } from 'next'
import { getAllWork, getAllThoughts } from '@/lib/sanity-queries'

const BASE = 'https://ux.andrewwhited.com'

// Sitemap is generated from Sanity at build time so new case studies and
// thoughts appear without a code change. Currently UX-only because the
// apex (andrewwhited.com) 301-redirects here.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [work, thoughts] = await Promise.all([
    getAllWork().catch(() => []),
    getAllThoughts().catch(() => []),
  ])

  const now = new Date()

  // A published essay's own date, not build time. `lastModified: now` on every
  // URL tells a crawler nothing except that the site rebuilt.
  const publishedDate = (t: { publishedAt?: string; year?: string }): Date => {
    if (t.publishedAt) {
      const [y, m, d] = t.publishedAt.split('-').map(Number)
      if (y && m && d) return new Date(y, m - 1, d)
    }
    const year = t.year?.match(/\d{4}/)?.[0]
    return year ? new Date(Number(year), 0, 1) : now
  }

  return [
    { url: BASE, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    ...work
      .filter((w: { slug?: { current?: string } }) => w?.slug?.current)
      .map((w: { slug: { current: string } }) => ({
        url: `${BASE}/${w.slug.current}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
    // Level with case studies: an essay is primary evidence here, not an
    // afterthought, and the old 0.6/yearly pairing announced it as neither.
    ...thoughts
      .filter((t: { slug?: { current?: string } }) => t?.slug?.current)
      .map((t: { slug: { current: string }; publishedAt?: string; year?: string }) => ({
        url: `${BASE}/${t.slug.current}`,
        lastModified: publishedDate(t),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      })),
  ]
}
