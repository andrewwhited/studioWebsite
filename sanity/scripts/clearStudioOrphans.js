// One-off: clear the field values orphaned by the studioPage schema cleanup.
// contactTitle, readingList[].note, and exhibitions[].venue were all removed
// from the schema, which hides them from the Studio UI but leaves the stored
// values in the document. This unsets them.
//
// Run: npx sanity exec scripts/clearStudioOrphans.js --with-user-token
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

client
  .fetch(`*[_id == "studioPage"][0]{
    contactTitle,
    readingList[]{_key, note},
    exhibitions[]{_key, venue}
  }`)
  .then((doc) => {
    if (!doc) throw new Error('studioPage not found')

    // Built from _key rather than a bare array traversal so the unset targets
    // exactly the entries that hold a value today.
    const paths = []
    if (doc.contactTitle !== undefined) paths.push('contactTitle')
    for (const item of doc.readingList ?? []) {
      if (item.note !== undefined && item.note !== null) {
        paths.push(`readingList[_key=="${item._key}"].note`)
      }
    }
    for (const item of doc.exhibitions ?? []) {
      if (item.venue !== undefined && item.venue !== null) {
        paths.push(`exhibitions[_key=="${item._key}"].venue`)
      }
    }

    if (paths.length === 0) {
      console.log('Nothing to clear.')
      return null
    }

    console.log('Unsetting:', paths)
    return client.patch('studioPage').unset(paths).commit()
  })
  .then((res) => {
    if (res) console.log('Committed. rev:', res._rev)
  })
  .catch((err) => {
    console.error('Failed:', err.message)
    process.exit(1)
  })
