import { getImagePage, getAllPhotoSets } from '@/lib/sanity-queries'
import ImageClient from './image-client'

export default async function ImagePage() {
  const [page, sets] = await Promise.all([getImagePage(), getAllPhotoSets()])

  return (
    <ImageClient title={page?.title} intro={page?.text} sets={sets ?? []} />
  )
}
