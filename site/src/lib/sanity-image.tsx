'use client'

import Image, { type ImageProps, type ImageLoaderProps } from 'next/image'

const sanityLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  const url = new URL(src)
  url.searchParams.set('w', width.toString())
  url.searchParams.set('q', (quality || 80).toString())
  url.searchParams.set('auto', 'format')
  return url.toString()
}

export default function SanityImage(props: Omit<ImageProps, 'loader'>) {
  return <Image loader={sanityLoader} {...props} />
}
