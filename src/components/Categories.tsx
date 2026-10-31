import { motion } from 'motion/react'
import { ArrowUpRight, Check } from 'lucide-react'
import { categories, providers, type CategoryId } from '../data'
import { PinArt } from './Hero'

const ease = [0.22, 1, 0.36, 1] as const

export function Marquee() {
  const names = providers.map((p) => p.name)
  return (
    <div className="overflow-hidden border-y border-espresso/10 bg-cream py-5" aria-label="Quelques acteurs référencés">
      <div className="marquee flex w-max gap-12 whitespace-nowrap">
        {[...names, ...names].map((n, i) => (
          <span key={i} className="flex items-center gap-12 font-serif text-2xl text-espresso/60 italic">
            {n}
            <span className="text-base text-terra not-italic" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function SectionTitle({ kicker, title, em, intro }: { kicker: string; title: string; em: string; intro?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease }}
      className="mb-12 max-w-2xl"
    >
      <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-terra uppercase">{kicker}</p>
      <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.02] tracking-tight">
        {title} <em className="font-normal text-mocha">{em}</em>
      </h2>
      {intro && <p className="mt-4 text-lg text-espresso/70">{intro}</p>}
    </motion.div>
  )
}

export function Categories({ onPick }: { onPick: (id: CategoryId) => void }) {
  return (
    <section id="categories" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
      <SectionTitle
        kicker="Six univers"
        title="Quelle assurance"
        em="cherchez-vous ?"
        intro="Choisissez un type d’assurance pour voir l’essentiel à savoir et les acteurs qui le proposent."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => {
          const count = providers.filter((p) => p.categories.includes(c.id)).length
          return (
            <motion.button
              key={c.id}
              onClick={() => onPick(c.id)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease }}
              whileHover="hover"
              className={`group relative flex flex-col overflow-hidden rounded-[32px] p-7 text-left ${
                i === 0 || i === 4 ? 'min-h-[15rem] lg:row-span-2 lg:min-h-[30rem]' : i === 5 ? 'min-h-[15rem] lg:col-span-2' : 'min-h-[15rem]'
              }`}
              style={{ background: c.color, color: c.ink }}
            >
              <PinArt color={c.ink} />
              <div className="relative flex items-start justify-between">
                <span className="flex size-14 items-center justify-center rounded-2xl" style={{ background: `${c.ink}22` }}>
                  <c.icon className="size-7" strokeWidth={1.5} />
                </span>
                <motion.span
                  variants={{ hover: { rotate: 45, scale: 1.1 } }}
                  className="flex size-11 items-center justify-center rounded-full border"
                  style={{ borderColor: `${c.ink}55` }}
                >
                  <ArrowUpRight className="size-5" />
                </motion.span>
              </div>
              <div className="relative mt-auto pt-10">
                <p className="text-xs font-semibold tracking-[0.16em] uppercase opacity-70">{count} acteurs</p>
                <h3 className="mt-2 font-serif text-3xl leading-tight">{c.label}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-80">{c.description}</p>
                {(i === 0 || i === 4) && (
                  <ul className="mt-6 hidden space-y-2 text-sm lg:block">
                    {c.essentials.map((e) => (
                      <li key={e} className="flex items-center gap-2">
                        <Check className="size-4" /> {e}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
