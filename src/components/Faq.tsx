import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { ease } from './ui'

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const id = useId()
  return (
    <ul className="glass divide-y divide-sand-200/80 px-5 sm:px-8">
      {items.map((f, i) => {
        const isOpen = open === i
        return (
          <li key={f.q}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="flex items-baseline gap-4">
                  <span className="mono text-taupe-deep">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-serif text-[1.45rem] leading-snug font-medium">{f.q}</span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  className="pill pill-clear shrink-0 p-2!"
                  aria-hidden
                >
                  <Plus className="size-4" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pl-0 text-muted sm:pl-12">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
