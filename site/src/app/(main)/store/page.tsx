import { getProducts } from '@/data/store'
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

  return <StoreClient products={products} error={error} />
}
