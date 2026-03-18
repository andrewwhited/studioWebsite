export type Photo = {
  id: string
  shade: string // placeholder until real image paths
}

export type PhotoSet = {
  id: string
  cover_image: string | null
  images: Photo[]
  location: string
  year: string
}

export const photoSets: PhotoSet[] = [
  {
    id: 'workshop',
    cover_image: null,
    images: [
      { id: 'w1', shade: '#3E3C38' },
      { id: 'w2', shade: '#4A4844' },
      { id: 'w3', shade: '#363430' },
      { id: 'w4', shade: '#424038' },
    ],
    location: 'Austin, TX',
    year: '2024',
  },
  {
    id: 'objects',
    cover_image: null,
    images: [
      { id: 'o1', shade: '#5C5A56' },
      { id: 'o2', shade: '#484644' },
      { id: 'o3', shade: '#3E3C38' },
      { id: 'o4', shade: '#525050' },
    ],
    location: 'Austin, TX',
    year: '2023–2024',
  },
  {
    id: 'field',
    cover_image: null,
    images: [
      { id: 'f1', shade: '#6E6C68' },
      { id: 'f2', shade: '#544E44' },
      { id: 'f3', shade: '#4E4A42' },
      { id: 'f4', shade: '#5A5650' },
      { id: 'f5', shade: '#3C3A36' },
    ],
    location: 'Various',
    year: '2022–2024',
  },
  {
    id: 'material',
    cover_image: null,
    images: [
      { id: 'm1', shade: '#48464A' },
      { id: 'm2', shade: '#3A3836' },
      { id: 'm3', shade: '#424040' },
    ],
    location: 'Austin, TX',
    year: '2023',
  },
]
