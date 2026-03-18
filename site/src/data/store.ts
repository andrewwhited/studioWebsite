export type Product = {
  title: string
  slug: string
  primary_image: string | null
  images: (string | null)[]
  price: string
  status: 'available' | 'sold_out'
  text: string
  collection?: string
  product_type: string
  materials: string
  dimensions: string
  shipping_note: string
  local_pickup_available: boolean
}

export const products: Product[] = [
  {
    title: 'Vessel 01',
    slug: 'vessel-01',
    primary_image: null,
    images: [null, null],
    price: '$380',
    status: 'available',
    text: 'Turned from a single billet of black walnut. The form is simple—slightly asymmetric, the base left with a shadow gap. Oil finished and waxed.',
    collection: 'Vessel Series',
    product_type: 'Vessel',
    materials: 'Black walnut, linseed oil, paste wax',
    dimensions: '6 × 4 in',
    shipping_note: 'Shipping calculated at checkout',
    local_pickup_available: true,
  },
  {
    title: 'Vessel 02',
    slug: 'vessel-02',
    primary_image: null,
    images: [null, null],
    price: '$420',
    status: 'available',
    text: 'Laminated from shop offcuts—walnut, maple, and ash in alternating layers. The lamination becomes visible at the rim and base. Raw finish.',
    collection: 'Vessel Series',
    product_type: 'Vessel',
    materials: 'Laminated hardwood (walnut, maple, ash), raw finish',
    dimensions: '8 × 5 in',
    shipping_note: 'Shipping calculated at checkout',
    local_pickup_available: true,
  },
  {
    title: 'Vessel 04',
    slug: 'vessel-04',
    primary_image: null,
    images: [null],
    price: '$310',
    status: 'sold_out',
    text: 'Turned from a small maple burl blank. The figure is pronounced—dark streaks and tight grain throughout. Shellac finish.',
    collection: 'Vessel Series',
    product_type: 'Vessel',
    materials: 'Maple burl, shellac',
    dimensions: '4 × 3 in',
    shipping_note: 'Shipping calculated at checkout',
    local_pickup_available: true,
  },
  {
    title: 'Vessel 05',
    slug: 'vessel-05',
    primary_image: null,
    images: [null, null],
    price: '$460',
    status: 'available',
    text: 'A taller form in cherry, developed over several turning sessions. The interior is smooth; the exterior shows light tool texture near the base. Natural oil.',
    collection: 'Vessel Series',
    product_type: 'Vessel',
    materials: 'Cherry, natural oil',
    dimensions: '9 × 6 in',
    shipping_note: 'Shipping calculated at checkout',
    local_pickup_available: true,
  },
  {
    title: 'Scoop 01',
    slug: 'scoop-01',
    primary_image: null,
    images: [null, null],
    price: '$120',
    status: 'available',
    text: 'Turned and hand-carved from a single piece of maple. The handle and bowl meet at a clean transition. Oil finished. For dry goods, coffee, grain, or display.',
    collection: 'Field Objects',
    product_type: 'Tool',
    materials: 'Hard maple, linseed oil',
    dimensions: '10 in. length, 2 in. bowl diameter',
    shipping_note: 'Shipping calculated at checkout',
    local_pickup_available: true,
  },
  {
    title: 'Block Set',
    slug: 'block-set',
    primary_image: null,
    images: [null, null],
    price: '$180',
    status: 'available',
    text: 'Six blocks milled from workshop offcuts—various hardwoods, waxed uniformly. No intended function except presence. Good on a shelf or a desk.',
    collection: 'Field Objects',
    product_type: 'Object',
    materials: 'Mixed hardwood offcuts (walnut, ash, oak, maple), paste wax',
    dimensions: 'Various — largest approx. 4 × 2 × 1.5 in',
    shipping_note: 'Shipping calculated at checkout',
    local_pickup_available: true,
  },
  {
    title: 'Oil Finish',
    slug: 'oil-finish',
    primary_image: null,
    images: [null],
    price: '$24',
    status: 'available',
    text: 'The finish used in the workshop. Raw linseed oil cut with mineral spirits—penetrating, matte, and easy to maintain. 8 oz. bottle with application instructions.',
    collection: 'Core',
    product_type: 'Supply',
    materials: 'Raw linseed oil, mineral spirits',
    dimensions: '8 oz. glass bottle',
    shipping_note: 'Shipping calculated at checkout',
    local_pickup_available: true,
  },
  {
    title: 'Core Object 01',
    slug: 'core-01',
    primary_image: null,
    images: [null, null],
    price: '$240',
    status: 'available',
    text: 'A small turned form in hardwood. Made consistently, in small quantities, from material kept on hand. Natural finish.',
    collection: 'Core',
    product_type: 'Object',
    materials: 'Hardwood (varies), natural finish',
    dimensions: '5 × 4 in',
    shipping_note: 'Shipping calculated at checkout',
    local_pickup_available: true,
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export const productTypes = ['Vessel', 'Tool', 'Object', 'Supply'] as const
export const collectionNames = ['Vessel Series', 'Field Objects', 'Core'] as const
