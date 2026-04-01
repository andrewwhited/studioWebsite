import { getImagePage } from '@/lib/sanity-queries'
import ImageClient from './image-client'

export default async function ImagePage() {
  const page = await getImagePage()

  return (
    <ImageClient
      title={page?.title ?? 'Image'}
      intro={page?.text ?? 'Photographs from the field. Documentation of work in progress, finished objects, and the space around making.'}
    />
  )
}
