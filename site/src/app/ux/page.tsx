import { getUxPage, getAllWork, getAllThoughts } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import Hero from '@/components/ux/sections/Hero'
import About from '@/components/ux/sections/About'
import Credentials from '@/components/ux/sections/Credentials'
import Work from '@/components/ux/sections/Work'
import Thoughts from '@/components/ux/sections/Thoughts'
import Links from '@/components/ux/sections/Links'

export default async function UxHome() {
  const [page, work, thoughts] = await Promise.all([
    getUxPage(),
    getAllWork(),
    getAllThoughts(),
  ])

  const resumeUrl = page?.resumeFile?.asset
    ? `https://cdn.sanity.io/files/uwr1du4g/production/${page.resumeFile.asset._ref.replace('file-', '').replace('-pdf', '.pdf')}`
    : '/resume.pdf'

  return (
    <main className="ux-home">
      <Hero text={page?.heroText} />
      <About
        heading={page?.aboutHeading}
        themes={page?.aboutThemes}
      />
      <Credentials
        image={page?.image ? urlFor(page.image).width(800).quality(80).auto('format').url() : undefined}
        imageHotspot={page?.image?.hotspot}
        publications={page?.publications}
        talks={page?.talks}
      />
      <Work items={work} />
      <Thoughts items={thoughts} />
      <Links
        footerCopy={page?.footerCopy}
        linkedinUrl={page?.linkedinUrl}
        resumeUrl={resumeUrl}
        studioUrl={page?.studioUrl}
      />
    </main>
  )
}
