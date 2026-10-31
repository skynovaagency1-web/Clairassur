import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Logo } from './Logo'

const links = [
  { href: '#categories', label: 'Assurances' },
  { href: '#annuaire', label: 'Annuaire' },
  { href: '#guides', label: 'Guides' },
  { href: '#faq', label: 'FAQ' },
]

export function Nav() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > window.innerHeight * 0.7))

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2 backdrop-blur-xl transition-colors duration-500 sm:px-6 ${
          scrolled
            ? 'border-espresso/10 bg-ivory/80 shadow-[0_10px_40px_-20px_rgba(43,26,16,.45)]'
            : 'border-cream/15 bg-espresso/30'
        }`}
      >
        <Logo light={!scrolled} />
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  scrolled ? 'text-espresso/80 hover:bg-latte' : 'text-cream/80 hover:bg-cream/10 hover:text-cream'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#annuaire"
          className="hidden rounded-full bg-terra px-5 py-2.5 text-sm font-semibold text-ivory transition-transform hover:scale-[1.03] md:inline-block"
        >
          Explorer l’annuaire
        </a>
        <button
          className={`rounded-full p-2 md:hidden ${scrolled ? 'text-espresso' : 'text-cream'}`}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 max-w-6xl rounded-3xl border border-espresso/10 bg-ivory p-3 shadow-xl md:hidden"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 font-medium hover:bg-latte"
              >
                {l.label}
              </a>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.header>
  )
}
