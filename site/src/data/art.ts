export type ArtWork = {
  title: string
  slug: string
  primary_image: string | null
  images: string[]
  year: string
  materials: string
  dimensions?: string
  text?: string
  availability: {
    status: 'available' | 'sold' | 'inquiry'
    price?: string
    contact?: string
  }
}

export const works: ArtWork[] = [
  {
    title: 'Untitled (Wall Study)',
    slug: 'untitled-wall-study',
    primary_image: null,
    images: [null, null] as unknown as string[],
    year: '2024',
    materials: 'Oil on linen',
    dimensions: '60 × 48 in',
    text: 'A study in surface and edge. Paint applied and removed in layers over several weeks, each session responding to the state left by the last. The linen beneath reads through in places—not as accident but as decision.',
    availability: {
      status: 'available',
      price: '$4,800',
      contact: 'studio@andrewwhited.com',
    },
  },
  {
    title: 'Weight Study',
    slug: 'weight-study',
    primary_image: null,
    images: [null, null, null] as unknown as string[],
    year: '2024',
    materials: 'Cast concrete',
    dimensions: '14 × 8 × 6 in',
    text: 'Cast in a single pour, the form holds the ghost of its mold—seam lines, surface variation, a slight asymmetry in the base. Weight as subject and material simultaneously.',
    availability: {
      status: 'available',
      price: '$1,200',
      contact: 'studio@andrewwhited.com',
    },
  },
  {
    title: 'Field Mark',
    slug: 'field-mark',
    primary_image: null,
    images: [null] as unknown as string[],
    year: '2023',
    materials: 'Graphite and wax on paper',
    dimensions: '24 × 18 in',
    text: 'Graphite applied with a block, burnished, waxed. The surface holds the pressure history of the mark-making. Mounted unframed.',
    availability: {
      status: 'available',
      price: '$900',
      contact: 'studio@andrewwhited.com',
    },
  },
  {
    title: 'Partition',
    slug: 'partition',
    primary_image: null,
    images: [null, null] as unknown as string[],
    year: '2023',
    materials: 'Mixed media on panel',
    dimensions: '36 × 24 in',
    availability: {
      status: 'sold',
    },
  },
  {
    title: 'Line Score',
    slug: 'line-score',
    primary_image: null,
    images: [null] as unknown as string[],
    year: '2022',
    materials: 'Ink on paper',
    dimensions: '18 × 24 in',
    text: 'Ruled lines in black ink, intervals determined by a simple arithmetic sequence. The grid as notation, as landscape, as accumulation.',
    availability: {
      status: 'available',
      price: '$650',
      contact: 'studio@andrewwhited.com',
    },
  },
  {
    title: 'No. 4',
    slug: 'no-4',
    primary_image: null,
    images: [null] as unknown as string[],
    year: '2022',
    materials: 'Encaustic on panel',
    dimensions: '12 × 12 in',
    availability: {
      status: 'sold',
    },
  },
]

export function getWork(slug: string): ArtWork | undefined {
  return works.find((w) => w.slug === slug)
}
