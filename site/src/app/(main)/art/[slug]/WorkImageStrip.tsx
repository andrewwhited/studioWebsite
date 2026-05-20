'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export default function WorkImageStrip({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const resetScroll = () => {
      el.scrollLeft = 0
    }

    resetScroll()

    const imgs = Array.from(el.querySelectorAll('img'))
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', resetScroll, { once: true })
    })

    return () => {
      imgs.forEach((img) => img.removeEventListener('load', resetScroll))
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
