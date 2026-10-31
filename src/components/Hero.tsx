import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ArrowRight, Search } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { categories, providers, type Category, type CategoryId } from '../data'

const ease = [0.22, 1, 0.36, 1] as const

type Props = {
  onSearch: (q: string) => void
  onPickCategory: (id: CategoryId) => void
}

export function Hero({ onSearch, onPickCategory }: Props) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yA = useTransform(scrollYProgress, [0, 1], [0, -160])
  const yB = useTransform(scrollYProgress, [0, 1], [0, -60])
  const yC = useTransform(scrollYProgress, [0, 1], [0, -240])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const [q, setQ] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(q)
  }

  const words = ['Toute', 'l’assurance,']

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative overflow-hidden bg-espresso pt-32 pb-20 text-cream sm:pt-40 lg:min-h-[100svh]"
    >
      {/* warm glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 size-[38rem] rounded-full bg-terra/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 size-[34rem] rounded-full bg-plum/40 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 lg:grid-cols-[1.1fr_1fr]">
        <motion.div style={{ opacity: fade }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-sand uppercase"
          >
            <span className="size-1.5 rounded-full bg-terra" /> L’annuaire de l’assurance en France
          </motion.p>

          <h1 className="font-serif text-[clamp(2.8rem,7vw,5.6rem)] leading-[0.95] tracking-tight">
            {words.map((w, i) => (
              <span key={w} className="mr-[0.25em] inline-block overflow-hidden pb-2 align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
            <br />
            <span className="inline-block overflow-hidden pb-2 align-bottom">
              <motion.em
                className="shine inline-block pr-2 font-normal"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.35, ease }}
              >
                en clair.
              </motion.em>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-cream/75"
          >
            Auto, habitation, santé, vie, moto ou pro : découvrez les assureurs qui comptent, réunis au même endroit et
            présentés simplement.
          </motion.p>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease }}
            className="mt-9 flex max-w-xl items-center gap-2 rounded-full border border-cream/15 bg-cream/10 p-2 backdrop-blur focus-within:border-sand/60"
            role="search"
          >
            <Search className="ml-3 size-5 shrink-0 text-sand" aria-hidden />
            <label htmlFor="hero-search" className="sr-only">
              Rechercher un assureur ou un type d’assurance
            </label>
            <input
              id="hero-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Un assureur, une mutuelle, « RC Pro »…"
              className="min-w-0 flex-1 bg-transparent py-2 text-base text-cream placeholder:text-cream/45 focus:outline-none"
            />
            <button
              type="submit"
              className="group flex items-center gap-2 rounded-full bg-sand px-5 py-3 text-sm font-semibold text-espresso transition hover:bg-cream"
            >
              Chercher
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.form>

          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.75 } } }}
            className="mt-5 flex flex-wrap gap-2"
          >
            {categories.map((c) => (
              <motion.li
                key={c.id}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              >
                <button
                  onClick={() => onPickCategory(c.id)}
                  className="flex items-center gap-1.5 rounded-full border border-cream/15 px-3.5 py-1.5 text-sm text-cream/80 transition hover:border-sand hover:bg-cream/10 hover:text-cream"
                >
                  <c.icon className="size-3.5" aria-hidden /> {c.short}
                </button>
              </motion.li>
            ))}
          </motion.ul>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex gap-10 border-t border-cream/10 pt-6"
          >
            {[
              [providers.length + '+', 'acteurs référencés'],
              ['6', 'types d’assurance'],
              ['0 €', 'commission perçue'],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-serif text-3xl text-cream">{n}</dd>
                <dd className="text-xs text-cream/55">{l}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Pinterest-like floating collage */}
        <div className="relative hidden h-[560px] grid-cols-3 gap-4 lg:grid" aria-hidden>
          <Column y={yA} items={[categories[0], categories[3]]} heights={['h-64', 'h-52']} delay={0.3} />
          <Column y={yB} items={[categories[2], categories[4]]} heights={['h-48', 'h-72']} delay={0.45} offset="mt-16" />
          <Column y={yC} items={[categories[1], categories[5]]} heights={['h-72', 'h-48']} delay={0.6} offset="mt-6" />
        </div>
      </div>
    </section>
  )
}

function Column({
  y,
  items,
  heights,
  delay,
  offset = '',
}: {
  y: MotionValue<number>
  items: Category[]
  heights: string[]
  delay: number
  offset?: string
}) {
  return (
    <motion.div style={{ y }} className={`flex flex-col gap-4 ${offset}`}>
      {items.map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 60, rotate: i % 2 ? 3 : -3 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: delay + i * 0.15, ease }}
          whileHover={{ scale: 1.04, rotate: i % 2 ? -1.5 : 1.5 }}
          className={`${heights[i]} relative flex flex-col justify-between overflow-hidden rounded-[28px] p-5 shadow-2xl shadow-black/30`}
          style={{ background: c.color, color: c.ink }}
        >
          <PinArt color={c.ink} />
          <c.icon className="relative size-8" strokeWidth={1.5} />
          <div className="relative">
            <p className="font-serif text-2xl leading-none">{c.short}</p>
            <p className="mt-1 text-xs opacity-75">{c.tagline}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export function PinArt({ color }: { color: string }) {
  return (
    <svg className="absolute -right-10 -bottom-10 size-48 opacity-20" viewBox="0 0 200 200" aria-hidden>
      <circle cx="100" cy="100" r="90" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="100" cy="100" r="64" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="100" cy="100" r="38" fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}
