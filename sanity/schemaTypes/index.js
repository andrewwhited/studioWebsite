import blockContent from './blockContent'
import homePage from './homePage'
import studioPage from './studioPage'
import objectsPage from './objectsPage'
import artPage from './artPage'
import imagePage from './imagePage'
import storePage from './storePage'
import uxPage from './uxPage'
import artwork from './artwork'
import collection from './collection'
import photoSet from './photoSet'
import work from './work'
import thought from './thought'

export const schemaTypes = [
  // Portable text
  blockContent,

  // Singleton pages
  homePage,
  studioPage,
  objectsPage,
  artPage,
  imagePage,
  storePage,
  uxPage,

  // Document types
  artwork,
  collection,
  photoSet,
  work,
  thought,
]
