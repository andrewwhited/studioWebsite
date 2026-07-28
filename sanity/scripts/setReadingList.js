// Sets the Required Reading list to the 12 entries locked 2026-07-27, with
// links. Thumbnails are not touched — they get uploaded separately, and the
// page renders a placeholder box for any entry without one.
//
// Link register: publisher or primary source where one exists, Wikipedia for
// entries with no canonical target. No retail.
//
// The two entries already in the document keep their _key so the change reads
// as a reorder plus additions rather than a wholesale replacement.
//
// Run: npx sanity exec scripts/setReadingList.js --with-user-token
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

const ENTRIES = [
  {
    _key: 'rl-albers-interaction',
    title: 'Interaction of Color',
    creator: 'Josef Albers',
    link: 'https://yalebooks.yale.edu/book/9780300179354/interaction-of-color/',
  },
  {
    _key: 'ca2cb5269877', // existing
    title: 'Designing Programmes',
    creator: 'Karl Gerstner',
    link: 'https://lars-mueller-publishers.com/designing-programmes-0',
  },
  {
    _key: 'rl-weschler-seeing',
    title: 'Seeing Is Forgetting…',
    creator: 'Lawrence Weschler on Robert Irwin',
    link: 'https://www.ucpress.edu/books/seeing-is-forgetting-the-name-of-the-thing-one-sees',
  },
  {
    _key: 'a9e0f7c3c8b0', // existing
    title: 'The Elements of Typographic Style',
    creator: 'Robert Bringhurst',
    link: 'https://en.wikipedia.org/wiki/The_Elements_of_Typographic_Style',
  },
  {
    _key: 'rl-rovelli-order-of-time',
    title: 'The Order of Time',
    creator: 'Carlo Rovelli',
    link: 'https://www.penguinrandomhouse.com/books/551483/the-order-of-time-by-carlo-rovelli/',
  },
  {
    _key: 'rl-kierkegaard-fear',
    title: 'Fear and Trembling',
    creator: 'Søren Kierkegaard',
    link: 'https://en.wikipedia.org/wiki/Fear_and_Trembling',
  },
  {
    _key: 'rl-philosophize-consciousness',
    title: 'Consciousness series',
    creator: 'Philosophize This',
    link: 'https://www.philosophizethis.org/podcast/episode-179-consciousness-hard-problem',
  },
  {
    _key: 'rl-mcmurtry-lonesome-dove',
    title: 'Lonesome Dove',
    creator: 'Larry McMurtry',
    link: 'https://en.wikipedia.org/wiki/Lonesome_Dove',
  },
  {
    _key: 'rl-carver-cathedral',
    title: 'Cathedral',
    creator: 'Raymond Carver',
    // The bare title points at the single story, not the collection.
    link: 'https://en.wikipedia.org/wiki/Cathedral_(short_story_collection)',
  },
  {
    _key: 'rl-faulkner-light-in-august',
    title: 'Light in August',
    creator: 'William Faulkner',
    link: 'https://en.wikipedia.org/wiki/Light_in_August',
  },
  {
    _key: 'rl-elder-scrolls',
    title: 'The Elder Scrolls',
    creator: 'Bethesda',
    // The series article, not a single title — the series framing is the point.
    link: 'https://en.wikipedia.org/wiki/The_Elder_Scrolls',
  },
  {
    _key: 'rl-flavin-marfa',
    title: 'untitled (Marfa project)',
    creator: 'Dan Flavin',
    link: 'https://chinati.org/collection/dan-flavin/',
  },
].map((entry) => ({_type: 'readingItem', ...entry}))

client
  .fetch(`*[_id == "studioPage"][0]{readingList[]{_key, title, "thumb": defined(thumbnail)}}`)
  .then((doc) => {
    if (!doc) throw new Error('studioPage not found')

    const withThumbs = (doc.readingList ?? []).filter((i) => i.thumb)
    if (withThumbs.length > 0) {
      // Nothing has thumbnails yet, so this should never fire — but overwriting
      // the array would drop image references silently if it ever did.
      throw new Error(
        `Refusing to overwrite: ${withThumbs.length} entr(ies) already hold a thumbnail.`,
      )
    }

    console.log(`Replacing ${doc.readingList?.length ?? 0} entries with ${ENTRIES.length}.`)
    return client.patch('studioPage').set({readingList: ENTRIES}).commit()
  })
  .then((res) => {
    console.log('Committed. rev:', res._rev)
  })
  .catch((err) => {
    console.error('Failed:', err.message)
    process.exit(1)
  })
