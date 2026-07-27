/**
 * Set locationAddress to standard two-line address formatting — 2026-07-27.
 * Run: npx sanity exec scripts/studioAddressLineBreak.js --with-user-token
 *
 * Explicitly approved. The page renders this with white-space: pre-line,
 * so the authored break decides where the address folds rather than the
 * column width.
 *
 * esbuild rejects top-level await here, so this is a .then() chain.
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2023-05-03'})

const ADDRESS = '9909 FM 969\nAustin, TX 78725'

client
  .fetch('*[_id == "studioPage"][0]{locationAddress}')
  .then((doc) => {
    if (!doc) throw new Error('studioPage not found')

    // Same street and city, only the break changes. Guard against silently
    // rewriting an address that has been edited since this was written.
    const current = (doc.locationAddress || '').replace(/\s+/g, ' ').trim()
    const expected = ADDRESS.replace(/\s+/g, ' ').trim()
    if (current !== expected) {
      throw new Error(
        `locationAddress is "${current}", expected "${expected}" — refusing to overwrite`,
      )
    }

    return client.patch('studioPage').set({locationAddress: ADDRESS}).commit()
  })
  .then(() => console.log('Patched locationAddress with a line break'))
  .catch((err) => {
    console.error('FAILED —', err.message)
    process.exit(1)
  })
