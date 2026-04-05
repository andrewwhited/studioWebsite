'use client'

import { useEffect, useRef } from 'react'
import LogoOutlineStroke from '@/components/icons/LogoOutlineStroke'

export default function ScrollFadeLogo() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const fadeEnd = window.innerHeight
      const opacity = Math.max(0, 1 - scrollY / fadeEnd)
      el.style.opacity = String(opacity)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={ref} className="ux-bg-logo">
      <LogoOutlineStroke />
    </div>
  )
}
