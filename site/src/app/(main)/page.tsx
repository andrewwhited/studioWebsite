import { getHomePage, getUxPage } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'
import styles from './home.module.css'

import Hero from '@/components/ux/sections/Hero'
import About from '@/components/ux/sections/About'
import Credentials from '@/components/ux/sections/Credentials'
import Links from '@/components/ux/sections/Links'
import LogoOutlineStroke from '@/components/icons/LogoOutlineStroke'
import LogoSolid from '@/components/icons/LogoSolid'
import GridOverlay from '@/components/GridOverlay'

const comingSoon = process.env.COMING_SOON === 'true'

function heroImageStyles(image: any) {
  if (!image) return undefined

  const url = urlFor(image).width(1600).quality(80).auto('format').url()

  const style: React.CSSProperties = {
    backgroundImage: `url(${url})`,
  }

  if (image.hotspot) {
    style.backgroundPosition = `${image.hotspot.x * 100}% ${image.hotspot.y * 100}%`
  }

  return style
}

async function ComingSoonHome() {
  const page = await getUxPage()

  const resumeUrl = page?.resumeFile?.asset
    ? `https://cdn.sanity.io/files/uwr1du4g/production/${page.resumeFile.asset._ref.replace('file-', '').replace('-pdf', '.pdf')}`
    : '/resume.pdf'

  return (
    <div data-theme="ux" className="ux-root" style={{ minHeight: '100svh', backgroundColor: 'var(--color-bg)', position: 'relative', overflow: 'hidden' }}>
      <LogoOutlineStroke className="ux-bg-logo" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <header style={{ padding: 'var(--spacing-m) var(--grid-margin)' }}>
          <div style={{ height: '20px', width: 'fit-content' }}>
            <LogoSolid />
          </div>
        </header>
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
          <Links
            footerCopy={page?.footerCopy}
            linkedinUrl={page?.linkedinUrl}
            resumeUrl={resumeUrl}
            studioUrl={page?.studioUrl}
          />
        </main>
        <GridOverlay />
      </div>
    </div>
  )
}

export default async function Home() {
  if (comingSoon) {
    return <ComingSoonHome />
  }

  const page = await getHomePage()

  return (
    <main>
      <section className={styles.hero}>

        {/* Column 1 — image, full bleed left */}
        <div
          className={styles.image}
          style={heroImageStyles(page?.heroImage)}
        />

        {/* Column 2 — empty, do not add content here */}

        {/* Column 3 — text block, vertically centered */}
        <div className={styles.content}>
          <h1 className={styles.title}>
            {page?.title ?? 'Andrew Whited'}
          </h1>
          <p className={styles.descriptor}>
            {page?.text ?? 'The studio produces furniture, objects, art, and image from a workshop in Austin, Texas.'}
          </p>
        </div>

      </section>
    </main>
  )
}
