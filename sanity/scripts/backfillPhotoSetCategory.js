// One-off: set category on the photoSets that predate the field.
//
// Every set uploaded before the All / People / Places filter existed is a
// portrait session, so this is a blanket assignment rather than a per-document
// judgment. Only touches documents where category is missing, so re-running is
// safe and it will never overwrite a value set by hand in the Studio.
//
// Run: npx sanity exec scripts/backfillPhotoSetCategory.js --with-user-token
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

const CATEGORY = 'people'

client
  .fetch(`*[_type == "photoSet" && !defined(category)]{_id, location, year}`)
  .then((docs) => {
    if (docs.length === 0) {
      console.log('Nothing to backfill — every photoSet already has a category.')
      return null
    }

    console.log(`Setting category="${CATEGORY}" on ${docs.length} sets:`)
    docs.forEach((d) => console.log(`  ${d._id}  ${d.location} ${d.year}`))

    // One transaction so the 20 sets land together rather than leaving the
    // dataset half-tagged if something fails midway.
    const tx = docs.reduce(
      (acc, doc) => acc.patch(doc._id, (p) => p.set({category: CATEGORY})),
      client.transaction(),
    )

    return tx.commit()
  })
  .then((res) => {
    if (res) console.log(`\nCommitted ${res.results.length} patches.`)
  })
  .catch((err) => {
    console.error('Failed:', err.message)
    process.exit(1)
  })
