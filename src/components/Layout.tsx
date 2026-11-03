import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Footer } from './Footer'
import { Header } from './Header'

/** Scroll to the top on page change, or to the #section in the URL. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

/** Feeds the cursor position to hovered cards so their light follows it (see .glass-lift in index.css). */
function PointerLight() {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const card = (e.target as Element | null)?.closest?.<HTMLElement>('.glass-lift, .glow')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])
  return null
}

export function Layout() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      <PointerLight />
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-olive-dark focus:px-4 focus:py-2 focus:text-cream">
        Aller au contenu
      </a>
      <Header />
      <main id="contenu">
        <Outlet />
      </main>
      <Footer />
    </MotionConfig>
  )
}
