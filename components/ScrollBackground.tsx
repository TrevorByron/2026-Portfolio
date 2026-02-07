'use client'

import { useEffect } from 'react'

/**
 * Full-viewport fixed gradient overlay. Background position is driven by scroll
 * to create a subtle color sweep as the user scrolls. Very low opacity so it
 * only tints the black background.
 */
export default function ScrollBackground() {
  useEffect(() => {
    const root = document.documentElement

    function setScrollProgress() {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll <= 0 ? 0 : Math.min(scrollY / maxScroll, 1)
      root.style.setProperty('--scroll-progress', String(progress))
    }

    setScrollProgress()
    window.addEventListener('scroll', setScrollProgress, { passive: true })
    return () => window.removeEventListener('scroll', setScrollProgress)
  }, [])

  return (
    <div
      className="scroll-bg-overlay"
      aria-hidden
    />
  )
}
