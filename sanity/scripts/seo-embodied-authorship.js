// One-off SEO pass on the Embodied Authorship essay: `topics` (feeds keywords
// + about in the Article JSON-LD) and hero image alt text. Approved 2026-08-02.

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const TOPICS = [
  'Authorship',
  'AI Product Design',
  'Design Leadership',
  'Creative Direction',
  'Design Theory',
]

const HERO_ALT =
  'A dithered, halftone-textured scene in blue and black: two small figures ' +
  'stand far apart on stepped ledges, each ringed in red and green fringing, ' +
  'in a space built entirely from dot grids.'

client
  .patch('thought-embodied-authorship')
  .set({topics: TOPICS, 'heroImage.alt': HERO_ALT})
  .commit()
  .then((doc) => {
    console.log('patched', doc._id, doc._updatedAt)
  })
  .catch((err) => {
    console.error('failed:', err.message)
    process.exit(1)
  })
