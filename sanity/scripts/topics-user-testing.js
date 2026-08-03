// Topics for the 2016 essay — feeds `keywords` and `about` in the Article
// JSON-LD. Four rather than five: the schema's own guidance is that a vague
// tag is worse than none, and nothing honest was left to add. Approved
// 2026-08-02.

import {getCliClient} from 'sanity/cli'

const client = getCliClient()

const TOPICS = ['Visual Literacy', 'UX Research Strategy', 'Design Theory', 'Typography']

client
  .patch('thought-user-testing')
  .set({topics: TOPICS})
  .commit()
  .then((doc) => {
    console.log('patched', doc._id, '→', doc.topics.join(', '))
  })
  .catch((err) => {
    console.error('failed:', err.message)
    process.exit(1)
  })
