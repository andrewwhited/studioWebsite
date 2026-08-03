// One-off edits to the Embodied Authorship essay. Approved 2026-08-02:
// `topics` (feeds keywords + about in the Article JSON-LD), hero image alt
// text, and the publish date moved to the day it actually goes out.

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const PUBLISHED_AT = '2026-08-03'

client
  .patch('thought-embodied-authorship')
  .set({publishedAt: PUBLISHED_AT})
  .commit()
  .then((doc) => {
    console.log('patched', doc._id, '→', doc.publishedAt)
  })
  .catch((err) => {
    console.error('failed:', err.message)
    process.exit(1)
  })
