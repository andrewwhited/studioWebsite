import type { Metadata, Viewport } from 'next'
import UxNav from '@/components/UxNav'
import GridOverlay from '@/components/GridOverlay'
import ScrollFadeLogo from '@/components/ScrollFadeLogo'
import { getUxSiteSettings } from '@/lib/sanity-queries'

const SITE_URL = 'https://ux.andrewwhited.com'

// Fallbacks used if the corresponding Sanity field is empty.
// Hardcoded so the site never ships broken metadata. Override in
// the studio under "UX Site → Site Settings (SEO)".
const FALLBACK_TITLE =
  'Andrew Whited — Senior Design Leader · AI, Enterprise Platforms, Information Architecture'
const FALLBACK_DESCRIPTION =
  'Senior design leader with 11 years at IBM scaling design across Hybrid Cloud, Business Automation, and AIOps. Deep practice in AI product design, information architecture, and multi-team design leadership.'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getUxSiteSettings().catch(() => null)

  const title = settings?.defaultMetaTitle || FALLBACK_TITLE
  const description = settings?.defaultMetaDescription || FALLBACK_DESCRIPTION
  const shareTitle = settings?.defaultShareTitle || title
  const shareDescription = settings?.defaultShareDescription || description

  return {
    title: {
      default: title,
      template: '%s — Andrew Whited',
    },
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: shareTitle,
      description: shareDescription,
      url: SITE_URL,
      siteName: 'Andrew Whited — Portfolio',
      locale: 'en_US',
      type: 'website',
      // Images are set per-page (so the external URL omits the internal /ux prefix).
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description: shareDescription,
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#111110',
}

export default function UxLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div data-theme="ux" className="ux-root" style={{ minHeight: '100svh', backgroundColor: 'var(--color-bg)', position: 'relative', overflow: 'hidden' }}>
      <ScrollFadeLogo />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <UxNav />
        {children}
        <GridOverlay />
      </div>
    </div>
  )
}
