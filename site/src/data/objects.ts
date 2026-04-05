export type CollectionObject = {
  name: string
  image: string | null
  description: string
  product_link?: string
}

export type HitListItem = {
  name: string
  note: string
  link: string
}

export type Collection = {
  title: string
  slug: string
  type: 'main' | 'core' | 'commission' // internal — not surfaced in UI
  hero: {
    image: string | null
    text: string
    year: string
    location: string
  }
  featured_photos: {
    images: (string | null)[]
  }
  editorial: {
    blocks: string[]
  }
  objects: {
    items: CollectionObject[]
  }
  companion: {
    playlist?: string
    hit_list: HitListItem[]
  }
  shop_collection_link?: string
}

export type CollectionPreview = {
  title: string
  slug: string
  image: string | null
  year: string
  short_text: string
}

export const collections: Collection[] = [
  {
    title: 'Vessel Series',
    slug: 'vessel-series',
    type: 'main',
    hero: {
      image: null,
      text: 'Turned forms in hardwood and laminated composites. Exploring volume, surface, and the logic of rotation.',
      year: '2022–',
      location: 'Austin, TX',
    },
    featured_photos: {
      images: [null, null, null],
    },
    editorial: {
      blocks: [
        'The vessel is one of the oldest made objects. It holds. It is hollow. It has a relationship to volume and weight that is immediate and understood. Working in this form means working with that history—not escaping it, but entering it deliberately.',
        'These vessels move between utility and artifact. Some are functional. Others less so. All are made from materials that carry their own time: hardwoods from the Northwest, laminated scrap from the shop floor, reclaimed material with visible repairs and history. The surface is where process becomes visible: tool marks preserved or erased, finishes that reveal the wood or work against it.',
      ],
    },
    objects: {
      items: [
        { name: 'Vessel 01', image: null, description: 'Turned black walnut, oil finish. 6 × 4 in.', product_link: '/store/vessel-01' },
        { name: 'Vessel 02', image: null, description: 'Laminated hardwood, raw finish. 8 × 5 in.', product_link: '/store/vessel-02' },
        { name: 'Vessel 03', image: null, description: 'Reclaimed fir, wax finish. 5 × 5 in.' },
        { name: 'Vessel 04', image: null, description: 'Maple burl, shellac. 4 × 3 in.', product_link: '/store/vessel-04' },
        { name: 'Vessel 05', image: null, description: 'Cherry, natural oil. 9 × 6 in.', product_link: '/store/vessel-05' },
        { name: 'Vessel 06', image: null, description: 'Ebonized oak, wax finish. 7 × 4 in.' },
      ],
    },
    companion: {
      playlist: 'https://open.spotify.com/playlist/placeholder-vessel',
      hit_list: [
        { name: 'Leach Pottery', note: "Bernard Leach's original studio in St Ives. The clearest example of the vessel as both art and craft.", link: '#' },
        { name: 'Common Ground, Lumsden', note: 'Annual gathering of makers in the Scottish highlands. The vessel as recurring subject.', link: '#' },
        { name: 'Garth Clark on the Artful Teapot', note: 'A survey that treats functional form as serious subject matter.', link: '#' },
      ],
    },
    shop_collection_link: '/store?collection=Vessel+Series',
  },
  {
    title: 'Field Objects',
    slug: 'field-objects',
    type: 'main',
    hero: {
      image: null,
      text: 'Objects for use and contemplation. Developed in the workshop for the workshop—and for the world around it.',
      year: '2023–',
      location: 'Austin, TX',
    },
    featured_photos: {
      images: [null, null, null, null],
    },
    editorial: {
      blocks: [
        'Field Objects began as a loose category for things that didn\'t fit the vessel work. Scoops, spatulas, handles, wedges, blocks. Objects that do something. The discipline of use is clarifying: a form that fails functionally tells you something about the form.',
        'These pieces hold the tension between utility and presence. Made from workshop offcuts and secondary materials—ash, oak, maple—they carry the logic of the workshop that made them.',
      ],
    },
    objects: {
      items: [
        { name: 'Scoop 01', image: null, description: 'Turned maple, oil finish. 10 in. length.', product_link: '/store/scoop-01' },
        { name: 'Block Set', image: null, description: 'Hardwood offcuts, waxed. Various dimensions.', product_link: '/store/block-set' },
        { name: 'Handle Study', image: null, description: 'Ash, raw. 8 in.' },
        { name: 'Wedge Form', image: null, description: 'Oak, blackened. 4 × 2 × 1 in.' },
      ],
    },
    companion: {
      playlist: 'https://open.spotify.com/playlist/placeholder-field',
      hit_list: [
        { name: 'Soetsu Yanagi — The Unknown Craftsman', note: 'The philosophical ground for thinking about use and beauty as inseparable.', link: '#' },
        { name: 'David Pye — The Nature and Art of Workmanship', note: 'Still the clearest language for talking about making things well.', link: '#' },
        { name: 'Tove Jansson\'s studio, Pellinge', note: 'A working space shaped entirely by need and accumulation. Objects for living.', link: '#' },
      ],
    },
    shop_collection_link: '/store?collection=Field+Objects',
  },
  {
    title: 'Core Objects',
    slug: 'core',
    type: 'core',
    hero: {
      image: null,
      text: 'Foundational pieces in primary production. Direct presentation, less editorial weight.',
      year: '2021–',
      location: 'Austin, TX',
    },
    featured_photos: {
      images: [null, null],
    },
    editorial: {
      blocks: [
        'Core is the standing production line. Fewer narrative frames, more direct encounter with the objects themselves. These are pieces made consistently, in small quantities, from material kept on hand.',
      ],
    },
    objects: {
      items: [
        { name: 'Oil Finish', image: null, description: 'Raw linseed and mineral spirits. 8 oz.', product_link: '/store/oil-finish' },
        { name: 'Core Object 01', image: null, description: 'Turned hardwood, natural finish. 5 × 4 in.', product_link: '/store/core-01' },
        { name: 'Core Object 02', image: null, description: 'Ash, waxed. 6 × 3 in.', product_link: '/store/core-02' },
      ],
    },
    companion: {
      hit_list: [],
    },
    shop_collection_link: '/store?collection=Core',
  },
  {
    title: 'Commissioned Work',
    slug: 'commissions',
    type: 'commission',
    hero: {
      image: null,
      text: 'Custom furniture, spatial pieces, and site-specific installations. Examples and inquiry.',
      year: '2018–',
      location: 'Austin, TX + travel',
    },
    featured_photos: {
      images: [null, null, null],
    },
    editorial: {
      blocks: [
        'Commission work typically begins with a site visit and a conversation about material. Pieces are developed iteratively—drawings, models, material samples—before production begins.',
        'Projects range from single pieces of furniture to multi-element spatial installations. Institutional and residential contexts both. Lead times are typically 8–14 weeks depending on scope.',
      ],
    },
    objects: {
      items: [
        { name: 'Dining Table, Private Residence', image: null, description: 'White oak, mortise and tenon. 96 × 38 in. Austin, TX 2023.' },
        { name: 'Entry Console, Private Residence', image: null, description: 'Blackened steel and walnut. 60 × 14 in. Houston, TX 2023.' },
        { name: 'Room Divider, Office Installation', image: null, description: 'Ash and mild steel. 96 × 84 in. Dallas, TX 2022.' },
      ],
    },
    companion: {
      hit_list: [
        { name: 'Inquiry', note: 'For commission inquiries, reach out with project location, scope, and timeline.', link: 'mailto:studio@andrewwhited.com' },
      ],
    },
  },
]

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug)
}

export function getCollectionPreviews(): CollectionPreview[] {
  return collections.map((c) => ({
    title: c.title,
    slug: c.slug,
    image: c.hero.image,
    year: c.hero.year,
    short_text: c.hero.text,
  }))
}
