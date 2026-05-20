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
    ...thoughts
      .filter((t: { slug?: { current?: string } }) => t?.slug?.current)
      .map((t: { slug: { current: string } }) => ({
        url: `${BASE}/${t.slug.current}`,
        lastModified: now,
        changeFrequency: 'yearly' as const,
        priority: 0.6,
      })),
  ]
}
