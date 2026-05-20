import type { Metadata } from 'next'
import { getUxPage, getUxSiteSettings, getAllWork, getAllThoughts } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import Hero from '@/components/ux/sections/Hero'
import About from '@/components/ux/sections/About'
import Credentials from '@/components/ux/sections/Credentials'
import Work from '@/components/ux/sections/Work'
import Thoughts from '@/components/ux/sections/Thoughts'
import Links from '@/components/ux/sections/Links'
import { buildPersonSchema } from './person-schema'

// Page-level metadata override — needed to use the clean `/opengraph-image` URL
// (the subdomain-rewritten one) instead of the file-based `/ux/opengraph-image`
// that Next emits by default. Title/description inherit from layout.
export const metadata: Metadata = {
  openGraph: {
    images: [
      { url: '/opengraph-image', width: 2400, height: 1260, alt: 'Andrew Whited — Senior Design Leader' },
    ],
  },
  twitter: {
    images: ['/opengraph-image'],
  },
}

export default async function UxHome() {
  const [page, settings, work, thoughts] = await Promise.all([
    getUxPage(),
    getUxSiteSettings(),
    getAllWork(),
    getAllThoughts(),
  ])

  const portraitUrl = page?.image
    ? urlFor(page.image).width(800).quality(80).auto('format').url()
    : undefined

  const personSchema = buildPersonSchema(settings, portraitUrl)

  // Resume is served from /resume.pdf — a stable URL that proxies to the
  // current Sanity asset. See app/resume.pdf/route.ts.

  return (
    <main className="ux-home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Hero text={page?.heroText} />
      <About
        heading={page?.aboutHeading}
        themes={page?.aboutThemes}
      />
      <Credentials
        image={portraitUrl}
        imageAlt={page?.image?.alt}
        imageHotspot={page?.image?.hotspot}
        publications={page?.publications}
        talks={page?.talks}
      />
      <Work items={work} />
      <Thoughts items={thoughts} />
      <Links
        footerCopy={page?.footerCopy}
        linkedinUrl={page?.linkedinUrl}
        resumeUrl="/resume.pdf"
        studioUrl={page?.studioUrl}
      />
    </main>
  )
}
