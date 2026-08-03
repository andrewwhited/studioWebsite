// One-off: clear readingList[].itemType, orphaned when the field was removed
// from the studioPage schema. Nothing rendered it — a non-book entry was
// indistinguishable from a book on the page — so the attribute was cut rather
// than given a design.
//
// Run: npx sanity exec scripts/clearReadingItemType.js --with-user-token
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

client
  .fetch(`*[_id == "studioPage"][0]{readingList[]{_key, itemType}}`)
  .then((doc) => {
    if (!doc) throw new Error('studioPage not found')

    const paths = (doc.readingList ?? [])
      .filter((item) => item.itemType !== undefined && item.itemType !== null)
      .map((item) => `readingList[_key=="${item._key}"].itemType`)

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
