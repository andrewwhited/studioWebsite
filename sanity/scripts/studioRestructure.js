/**
 * Studio page restructure — 2026-07-26.
 * Run: npx sanity exec scripts/studioRestructure.js --with-user-token
 *
 * Three changes, all explicitly approved:
 *   1. aboutText — heroText + bioText collapsed into one field.
 *      Source fields are left in place; unset separately after visual sign-off.
 *   2. exhibitions — two entries, reverse-chronological.
 *   3. uxSiteUrl — contact link out to the UX subdomain.
 *
 * esbuild rejects top-level await here, so this is a .then() chain.
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2023-05-03'})

const EXHIBITIONS = [
  {
    _key: 'exh-new-texas-talent-2026',
    _type: 'exhibition',
    title: 'New Texas Talent',
    venue: 'Craighead Green Gallery',
    location: 'Dallas, TX',
    year: '2026',
  },
  {
    _key: 'exh-offsite-in-the-margins-2025',
    _type: 'exhibition',
    title: 'Offsite: In the Margins',
    // No venue — the show was in Andrew's own studio, and naming it on his
    // own studio page is the kind of annotation the register cuts.
    location: 'Austin, TX',
    year: '2025',
  },
]

client
  .fetch('*[_id == "studioPage"][0]{heroText, bioText}')
  .then((doc) => {
    if (!doc) throw new Error('studioPage not found')
    if (!doc.heroText || !doc.bioText) {
      throw new Error('heroText or bioText is empty — refusing to build aboutText')
    }

    // Concatenated from the live values rather than transcribed, so the
    // merge cannot silently alter a word.
    const aboutText = [doc.heroText.trim(), doc.bioText.trim()].join('\n\n')

    return client
      .patch('studioPage')
      .set({
        aboutText,
        exhibitions: EXHIBITIONS,
        uxSiteUrl: 'https://ux.andrewwhited.com',
      })
      .commit()
  })
  .then(() => {
    console.log('Patched studioPage: aboutText, exhibitions, uxSiteUrl')
  })
  .catch((err) => {
    console.error('FAILED —', err.message)
    process.exit(1)
  })
