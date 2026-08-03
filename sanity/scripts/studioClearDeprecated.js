/**
 * Clear deprecated studioPage fields — 2026-07-26.
 * Run: npx sanity exec scripts/studioClearDeprecated.js --with-user-token
 *
 * Explicitly approved. These fields are no longer rendered and no longer
 * projected into the page query; this removes the values themselves.
 *
 * Guarded: refuses to unset heroText / bioText unless aboutText already
 * holds the merged copy, so the only surviving copy cannot be destroyed
 * by running this out of order.
 *
 * esbuild rejects top-level await here, so this is a .then() chain.
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2023-05-03'})

const UNSET = [
  'heroHeading',
  'heroText',
  'bioText',
  'locationTitle',
  'locationText',
  'locationVisitNote',
  'servicesTitle',
  'services',
  'servicesContact',
]

client
  .fetch('*[_id == "studioPage"][0]{aboutText, heroText, bioText}')
  .then((doc) => {
    if (!doc) throw new Error('studioPage not found')

    const about = (doc.aboutText || '').trim()
    if (!about) {
      throw new Error('aboutText is empty — refusing to unset heroText/bioText')
    }
    // The merged block must still contain both sources, or the merge did
    // not survive whatever edit happened since.
    for (const [name, value] of [['heroText', doc.heroText], ['bioText', doc.bioText]]) {
      if (!value) continue
      const head = value.trim().slice(0, 40)
      if (!about.includes(head)) {
        throw new Error(`aboutText does not contain ${name} — refusing to unset`)
      }
    }

    return client.patch('studioPage').unset(UNSET).commit()
  })
  .then(() => {
    console.log('Unset:', UNSET.join(', '))
  })
  .catch((err) => {
    console.error('FAILED —', err.message)
    process.exit(1)
  })
