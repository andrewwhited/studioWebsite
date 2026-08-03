/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'
import { getWorkBySlug, getThoughtBySlug } from '@/lib/sanity-queries'
import { urlFor } from '@/lib/sanity'

// 2x dimensions — see app/ux/opengraph-image.tsx for rationale.
export const alt = 'Andrew Whited'
export const size = { width: 2400, height: 1260 }
export const contentType = 'image/png'

const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360"><path d="M324.318,97.077l-43.324,165.357h-45.441l-14.053-31.15h-83.618l-14.053,31.15h-45.455L35.048,97.077h40.056l24.759,118.923,57.444-118.923h44.74l57.444,118.923,24.772-118.923h40.056M324.706,96.777h-40.688l-.05.239-24.592,118.059-57.06-118.129-.082-.17h-45.117l-.082.17-57.06,118.128-24.579-118.059-.05-.239h-40.688l.098.376,43.324,165.357.059.224h45.88l.08-.177,13.974-30.973h83.231l13.974,30.973.08.177h45.867l.059-.224,43.324-165.357.099-.376h0Z" fill="#5a5a52"/><path d="M179.683,138.064c2.862,7.108,25.493,58.009,28.002,63.649h-56.004c2.508-5.64,25.14-56.542,28.002-63.649M179.683,137.213c-.265,1.416-28.464,64.801-28.464,64.801h56.928s-28.199-63.385-28.464-64.801h0Z" fill="#5a5a52"/></svg>`
const LOGO_DATA_URL = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString('base64')}`

/* ----- Essay surface -----
   An essay with a hero image gets a card built like its own opening: the light
   reading surface, the title, and the band closing the composition off.
   Everything else keeps the dark card — a case study has no such opening to
   quote, and an essay without a band has no image to build one from.

   The page header's meta line and deck are dropped here. A card is read at
   thumbnail size next to a link that already carries the description; two more
   lines of small type only crowd the title out of the space it needs. */

const LIGHT = { bg: '#F6F6F2', text: '#111110', frame: '#DEDED8' }

// 1x, unlike the dark card. `ImageResponse` only emits PNG, and PNG cannot
// compress a dithered image — at 2x this card came out 4.2MB against the dark
// card's 108KB, past the size where WhatsApp and some Slack paths quietly drop
// the preview. The 2x exists to keep type crisp, and half this card is now
// photograph, so it is the wrong trade here.
const ESSAY_SIZE = { width: 1200, height: 630 }

// The band is 5:2 on the page, which a 1.9:1 card cannot hold. Half the card
// instead: what carries over is that the band is the base of the composition,
// not its own panel, and an even split crops the least out of the image.
const BAND_H = ESSAY_SIZE.height / 2

const GUTTER = 80

type PageMeta = {
  kicker: string
  title: string
  subtitle?: string
  /** Present only for the essay surface. */
  heroUrl?: string
} | null

async function lookup(slug: string): Promise<PageMeta> {
  const work = await getWorkBySlug(slug).catch(() => null)
  if (work) {
    return {
      kicker: 'CASE STUDY',
      title: work.title,
      subtitle: work.client || work.role || undefined,
    }
  }

  const thought = await getThoughtBySlug(slug).catch(() => null)
  if (thought) {
    // Cropped by the image API rather than by CSS: unlike the page band, the
    // card's crop ratio is known here, so the hotspot can be honoured server
    // side and only the pixels that survive get fetched. PNG because Satori
    // will not decode the webp `auto('format')` would negotiate.
    const hero = thought.heroImage?.asset
      ? urlFor(thought.heroImage)
          .width(ESSAY_SIZE.width)
          .height(BAND_H)
          .fit('crop')
          .format('png')
          .url()
      : undefined

    return {
      kicker: (thought.type || 'ESSAY').toUpperCase(),
      title: thought.title,
      subtitle: thought.subtitle || thought.year || undefined,
      ...(hero && { heroUrl: hero }),
    }
  }

  return null
}

export default async function Image({ params }: { params: { slug: string } }) {
  const meta = await lookup(params.slug)
  const kicker = meta?.kicker ?? 'ANDREW WHITED'
  const title = meta?.title ?? 'Andrew Whited'
  const subtitle = meta?.subtitle

  if (meta?.heroUrl) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: LIGHT.bg,
            color: LIGHT.text,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Name at the top standing in for the nav, title sitting down on the
              band — the same two anchors the page opening has, with the height
              between them left empty rather than filled. */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: ESSAY_SIZE.height - BAND_H,
              padding: `52px ${GUTTER}px 44px`,
            }}
          >
            <div
              style={{
                fontSize: 15,
                letterSpacing: 1.5,
                color: LIGHT.text,
                textTransform: 'uppercase',
              }}
            >
              Andrew Whited
            </div>

            <div
              style={{
                fontSize: 59,
                lineHeight: 1.1,
                letterSpacing: -1.7,
                fontWeight: 500,
                maxWidth: 880,
              }}
            >
              {title}
            </div>
          </div>

          {/* The grey sits behind the image here for the same reason it does on
              the page — a band that fails to load shows the frame, not a gap. */}
          <div style={{ display: 'flex', width: '100%', height: BAND_H, backgroundColor: LIGHT.frame }}>
            <img
              src={meta.heroUrl}
              alt=""
              width={ESSAY_SIZE.width}
              height={BAND_H}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      ),
      { ...ESSAY_SIZE },
    )
  }

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
          padding: '144px 160px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        <img
          src={LOGO_DATA_URL}
          alt=""
          width={1800}
          height={1800}
          style={{ position: 'absolute', right: -360, top: -360 }}
        />

        <div
          style={{
            fontSize: 44,
            letterSpacing: 1,
            color: '#969690',
            position: 'relative',
          }}
        >
          ANDREW WHITED
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 48,
            position: 'relative',
            maxWidth: 1960,
          }}
        >
          <div
            style={{
              fontSize: 36,
              letterSpacing: 4,
              color: '#969690',
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              fontSize: 144,
              lineHeight: 1.1,
              letterSpacing: -3,
              fontWeight: 500,
              color: '#F0F0EC',
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 52,
                color: '#969690',
                letterSpacing: 0.4,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size },
  )
}
