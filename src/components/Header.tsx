import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'

export const navLinks = [
  { to: '/#offres', label: 'Assurances' },
  { to: '/assureurs', label: 'Assureurs' },
  { to: '/guides', label: 'Guides' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
]

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Link to="/" aria-label="Lumassur, accueil" className={`font-serif text-[1.25rem] font-medium tracking-[0.14em] sm:text-[1.45rem] sm:tracking-[0.18em] text-ink uppercase ${className}`}>
      Lumassur
    </Link>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full! gap-3 py-2 pr-2 pl-4 sm:pl-6">
        <Wordmark />
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-[0.95rem] transition-colors hover:bg-sand-50/70 ${
                      isActive && !l.to.includes('#') ? 'bg-sand-50/80 text-ink' : 'text-muted'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/devis" className="pill pill-dark hidden sm:inline-flex">
            <span>Devis gratuit</span>
            <span className="chip" aria-hidden>
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid size-11 place-items-center rounded-full text-ink hover:bg-sand-50/70 lg:hidden"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass mx-auto mt-2 max-w-6xl p-3 lg:hidden"
          >
            <ul>
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="block rounded-2xl px-4 py-3 text-lg hover:bg-sand-50/70">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 sm:hidden">
                <Link to="/devis" className="pill pill-dark w-full justify-between">
                  <span>Devis gratuit</span>
                  <span className="chip" aria-hidden>
                    <ArrowUpRight className="size-4" />
                  </span>
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
