import {
  getAllProducts as fetchShopifyProducts,
  getProductByHandle as fetchShopifyProduct,
  getProductHandles as fetchShopifyHandles,
  formatPrice,
  type ShopifyProduct,
  type ShopifyProductDetail,
} from '@/lib/shopify'

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
  /** Shopify variant ID — needed for cart operations */
  variantId?: string
}

function parseMetafield(value: string | undefined | null): string {
  if (!value) return ''
  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) return parsed.join(', ')
    return String(parsed)
  } catch {
    return value
  }
}

function mapProduct(p: ShopifyProduct): Product {
  return {
    title: p.title,
    slug: p.handle,
    primary_image: p.featuredImage?.url ?? null,
    images: p.featuredImage ? [p.featuredImage.url] : [null],
    price: formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode),
    status: p.availableForSale ? 'available' : 'sold_out',
    text: '',
    collection: p.collections.nodes[0]?.title,
    product_type: p.productType || 'Object',
    materials: '',
    dimensions: '',
  }
}

function mapProductDetail(p: ShopifyProductDetail): Product {
  return {
    title: p.title,
    slug: p.handle,
    primary_image: p.images.nodes[0]?.url ?? null,
    images: p.images.nodes.length > 0
      ? p.images.nodes.map((img) => img.url)
      : [null],
    price: formatPrice(p.priceRange.minVariantPrice.amount, p.priceRange.minVariantPrice.currencyCode),
    status: p.availableForSale ? 'available' : 'sold_out',
    text: p.description || '',
    collection: p.collections.nodes[0]?.title,
    product_type: p.productType || 'Object',
    materials: parseMetafield(p.materials?.value),
    dimensions: parseMetafield(p.dimensions?.value),
    variantId: p.variants.nodes[0]?.id,
  }
}

export async function getProducts(): Promise<Product[]> {
  const shopifyProducts = await fetchShopifyProducts()
  return shopifyProducts.map(mapProduct)
}

export async function getProduct(slug: string): Promise<Product | null> {
  const shopifyProduct = await fetchShopifyProduct(slug)
  if (!shopifyProduct) return null
  return mapProductDetail(shopifyProduct)
}

export async function getProductSlugs(): Promise<string[]> {
  return fetchShopifyHandles()
}

export { productTypes, collectionNames } from './store-constants'
