/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import { getUxSiteSettings, getUxPage } from '@/lib/sanity-queries'

export const alt = 'Andrew Whited — Senior Design Leader'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const FALLBACK_HEADLINE =
  'Andrew Whited is a senior design leader bringing order and elegance to complexity'
const FALLBACK_SUBTITLE = 'AI · Enterprise Platforms · Information Architecture'

// Inline SVG of the AW "W" mark, embedded as a data URL so Satori can render it
// without a network fetch. Source: site/public/logo-bg.svg.
const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360"><path d="M324.318,97.077l-43.324,165.357h-45.441l-14.053-31.15h-83.618l-14.053,31.15h-45.455L35.048,97.077h40.056l24.759,118.923,57.444-118.923h44.74l57.444,118.923,24.772-118.923h40.056M324.706,96.777h-40.688l-.05.239-24.592,118.059-57.06-118.129-.082-.17h-45.117l-.082.17-57.06,118.128-24.579-118.059-.05-.239h-40.688l.098.376,43.324,165.357.059.224h45.88l.08-.177,13.974-30.973h83.231l13.974,30.973.08.177h45.867l.059-.224,43.324-165.357.099-.376h0Z" fill="#454540"/><path d="M179.683,138.064c2.862,7.108,25.493,58.009,28.002,63.649h-56.004c2.508-5.64,25.14-56.542,28.002-63.649M179.683,137.213c-.265,1.416-28.464,64.801-28.464,64.801h56.928s-28.199-63.385-28.464-64.801h0Z" fill="#454540"/></svg>`
const LOGO_DATA_URL = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString('base64')}`

export default async function Image() {
  const [settings, page] = await Promise.all([
    getUxSiteSettings().catch(() => null),
    getUxPage().catch(() => null),
  ])

  const headline = settings?.ogPrimary || page?.heroText || FALLBACK_HEADLINE
  const subtitle = settings?.ogSecondary || FALLBACK_SUBTITLE

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#111110',
          color: '#F0F0EC',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* AW outline watermark — large, low-contrast, off-center to bleed off the right edge */}
        <img
          src={LOGO_DATA_URL}
          alt=""
          width={900}
          height={900}
          style={{
            position: 'absolute',
            right: -180,
            top: -180,
            opacity: 1,
          }}
        />

        {/* Top: small monogram */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 22,
            letterSpacing: 0.5,
            color: '#969690',
            position: 'relative',
          }}
        >
          <img src={LOGO_DATA_URL} alt="" width={28} height={28} />
          <span>ANDREW WHITED</span>
        </div>

        {/* Bottom: headline + subtitle */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            position: 'relative',
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: 56,
              lineHeight: 1.15,
              letterSpacing: -1,
              fontWeight: 500,
              color: '#F0F0EC',
            }}
          >
            {headline}
          </div>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 0.3,
              color: '#969690',
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
