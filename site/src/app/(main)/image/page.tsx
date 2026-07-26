import { getImagePage } from '@/lib/sanity-queries'
import ImageClient from './image-client'

export default async function ImagePage() {
  const page = await getImagePage()

  return (
    <ImageClient title={page?.title} intro={page?.text} />
  )
}
