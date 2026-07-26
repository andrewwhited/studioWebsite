import { getProducts } from '@/data/store'
import { getStorePage } from '@/lib/sanity-queries'
import StoreClient from './store-client'

export const revalidate = 60

export default async function StorePage() {
  let products = null
  let error = false

  try {
    products = await getProducts()
  } catch {
    error = true
  }

  const page = await getStorePage()

  return (
    <StoreClient
      products={products}
      error={error}
      title={page?.title}
      intro={page?.text}
    />
  )
}
