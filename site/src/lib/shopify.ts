const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!

const endpoint = `https://${domain}/api/2024-01/graphql.json`

type ShopifyResponse<T> = {
  data: T
  errors?: { message: string }[]
}

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  })

  const json: ShopifyResponse<T> = await res.json()

  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join('\n'))
  }

  return json.data
}

// ─── Product queries ────────────────────────────────────

const PRODUCT_CARD_FRAGMENT = `
  fragment ProductCard on Product {
    id
    title
    handle
    productType
    tags
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      url
      altText
      width
      height
    }
    collections(first: 5) {
      nodes {
        title
      }
    }
  }
`

const PRODUCT_DETAIL_FRAGMENT = `
  fragment ProductDetail on Product {
    id
    title
    handle
    descriptionHtml
    description
    productType
    tags
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      nodes {
        url
        altText
        width
        height
      }
    }
    variants(first: 10) {
      nodes {
        id
        title
        availableForSale
        price {
          amount
          currencyCode
        }
      }
    }
    collections(first: 5) {
      nodes {
        title
      }
    }
    materials: metafield(namespace: "custom", key: "materials") {
      value
    }
    dimensions: metafield(namespace: "custom", key: "dimensions") {
      value
    }
  }
`

export type ShopifyImage = {
  url: string
  altText: string | null
  width: number
  height: number
}

export type ShopifyProduct = {
  id: string
  title: string
  handle: string
  productType: string
  tags: string[]
  availableForSale: boolean
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  featuredImage: ShopifyImage | null
  collections: {
    nodes: { title: string }[]
  }
}

export type ShopifyProductDetail = {
  id: string
  title: string
  handle: string
  descriptionHtml: string
  description: string
  productType: string
  tags: string[]
  availableForSale: boolean
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  images: {
    nodes: ShopifyImage[]
  }
  variants: {
    nodes: {
      id: string
      title: string
      availableForSale: boolean
      price: {
        amount: string
        currencyCode: string
      }
    }[]
  }
  collections: {
    nodes: { title: string }[]
  }
  materials: { value: string } | null
  dimensions: { value: string } | null
}

export async function getAllProducts(): Promise<ShopifyProduct[]> {
  const { products } = await shopifyFetch<{
    products: { nodes: ShopifyProduct[] }
  }>(`
    ${PRODUCT_CARD_FRAGMENT}
    query Products {
      products(first: 100, sortKey: TITLE) {
        nodes {
          ...ProductCard
        }
      }
    }
  `)
  return products.nodes
}

export async function getProductByHandle(handle: string): Promise<ShopifyProductDetail | null> {
  const { product } = await shopifyFetch<{
    product: ShopifyProductDetail | null
  }>(`
    ${PRODUCT_DETAIL_FRAGMENT}
    query Product($handle: String!) {
      product(handle: $handle) {
        ...ProductDetail
      }
    }
  `, { handle })
  return product
}

export async function getProductHandles(): Promise<string[]> {
  const { products } = await shopifyFetch<{
    products: { nodes: { handle: string }[] }
  }>(`
    query ProductHandles {
      products(first: 100) {
        nodes {
          handle
        }
      }
    }
  `)
  return products.nodes.map((p) => p.handle)
}

// ─── Collection queries ─────────────────────────────────

export async function getCollectionNames(): Promise<string[]> {
  const { collections } = await shopifyFetch<{
    collections: { nodes: { title: string }[] }
  }>(`
    query Collections {
      collections(first: 25) {
        nodes {
          title
        }
      }
    }
  `)
  return collections.nodes.map((c) => c.title)
}

// ─── Cart operations ────────────────────────────────────

export type CartLine = {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    product: {
      title: string
      handle: string
      featuredImage: ShopifyImage | null
    }
    price: {
      amount: string
      currencyCode: string
    }
  }
}

export type Cart = {
  id: string
  checkoutUrl: string
  totalQuantity: number
  cost: {
    totalAmount: {
      amount: string
      currencyCode: string
    }
  }
  lines: {
    nodes: CartLine[]
  }
}

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            product {
              title
              handle
              featuredImage {
                url
                altText
                width
                height
              }
            }
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

export async function createCart(variantId: string, quantity: number = 1): Promise<Cart> {
  const { cartCreate } = await shopifyFetch<{
    cartCreate: { cart: Cart }
  }>(`
    ${CART_FRAGMENT}
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          ...CartFields
        }
      }
    }
  `, {
    input: {
      lines: [{ merchandiseId: variantId, quantity }],
    },
  })
  return cartCreate.cart
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1): Promise<Cart> {
  const { cartLinesAdd } = await shopifyFetch<{
    cartLinesAdd: { cart: Cart }
  }>(`
    ${CART_FRAGMENT}
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }
  `, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  })
  return cartLinesAdd.cart
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const { cartLinesUpdate } = await shopifyFetch<{
    cartLinesUpdate: { cart: Cart }
  }>(`
    ${CART_FRAGMENT}
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...CartFields
        }
      }
    }
  `, {
    cartId,
    lines: [{ id: lineId, quantity }],
  })
  return cartLinesUpdate.cart
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const { cartLinesRemove } = await shopifyFetch<{
    cartLinesRemove: { cart: Cart }
  }>(`
    ${CART_FRAGMENT}
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...CartFields
        }
      }
    }
  `, {
    cartId,
    lineIds,
  })
  return cartLinesRemove.cart
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const { cart } = await shopifyFetch<{ cart: Cart | null }>(`
    ${CART_FRAGMENT}
    query Cart($cartId: ID!) {
      cart(id: $cartId) {
        ...CartFields
      }
    }
  `, { cartId })
  return cart
}

// ─── Helpers ────────────────────────────────────────────

export function formatPrice(amount: string, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}
