// The 2016 essay is on the editorial template now, so the fields the thought
// schema kept "until the piece is ported" have nothing left to hold open:
// `year` is superseded by Published, `context` by Type + Published, and
// `summary` by Subtitle. Approved 2026-08-02.

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

client
  .patch('thought-user-testing')
  .unset(['year', 'summary', 'context'])
  .commit()
  .then((doc) => {
    console.log('cleared legacy fields on', doc._id)
  })
  .catch((err) => {
    console.error('failed:', err.message)
    process.exit(1)
  })
