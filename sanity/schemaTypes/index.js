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

// Case study (work) building blocks
import simpleProse from './simpleProse'
import section from './section'
import subsection from './subsection'
import prose from './prose'
import figure from './figure'
import figureFlow from './figureFlow'
import pullQuote from './pullQuote'
import kpiCallout from './kpiCallout'
import emDashList from './emDashList'
import reflection from './reflection'
import ndaNote from './ndaNote'
import taxonomyTiles from './taxonomyTiles'
import integrationTiles from './integrationTiles'

export const schemaTypes = [
  // Portable text
  blockContent,
  simpleProse,

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

  // Case study object types
  section,
  subsection,
  prose,
  figure,
  figureFlow,
  pullQuote,
  kpiCallout,
  emDashList,
  reflection,
  ndaNote,
  taxonomyTiles,
  integrationTiles,
]
