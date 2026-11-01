import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Compass, Layers, MousePointerClick, Plus } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { categories, categoryById, faqs, guides, type CategoryId } from '../data'
import { SectionTitle } from './Categories'
import { postJson } from '../api'
import { site } from '../config'
import { Logo } from './Logo'

const ease = [0.22, 1, 0.36, 1] as const

const steps = [
  {
    icon: Compass,
    title: 'Choisissez votre besoin',
    body: 'Auto, habitation, santé, vie, moto ou pro : partez de votre situation, pas du jargon.',
  },
  {
    icon: Layers,
    title: 'Parcourez le mur',
    body: 'Assureurs historiques, mutuelles, néo-assureurs et spécialistes, côte à côte. Épinglez ceux qui vous parlent.',
  },
  {
    icon: MousePointerClick,
    title: 'Allez à la source',
    body: 'Demandez un devis sur le site de l’assureur, ou laissez-nous votre besoin : un conseiller partenaire vous recontacte.',
  },
]

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 50%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionTitle
            kicker="Comment ça marche"
            title="Trois gestes,"
            em="zéro jargon."
            intro="On rassemble, on clarifie, et vous décidez. Gratuitement."
          />
        </div>
        <div ref={ref} className="relative pl-10">
          <div className="absolute top-2 bottom-2 left-[15px] w-px bg-espresso/10" />
          <motion.div
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[15px] w-px origin-top bg-terra"
          />
          <ol className="space-y-16">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease }}
                className="relative"
              >
                <span className="absolute top-0 -left-10 flex size-8 items-center justify-center rounded-full bg-espresso text-xs font-semibold text-cream">
                  0{i + 1}
                </span>
                <div className="rounded-[28px] border border-espresso/10 bg-cream p-7">
                  <s.icon className="size-7 text-terra" strokeWidth={1.5} />
                  <h3 className="mt-4 font-serif text-2xl">{s.title}</h3>
                  <p className="mt-2 text-espresso/70">{s.body}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

const guideHeights = { sm: 'min-h-[14rem]', md: 'min-h-[18rem]', lg: 'min-h-[23rem]' }

export function Guides({ onPick }: { onPick: (id: CategoryId) => void }) {
  return (
    <section id="guides" className="scroll-mt-20 bg-espresso py-24 text-cream">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-sand uppercase">Guides</p>
          <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.02] tracking-tight">
            Que choisir quand on est… <em className="font-normal text-sand">vous ?</em>
          </h2>
          <p className="mt-4 text-lg text-cream/70">Des repères simples, selon votre moment de vie.</p>
        </motion.div>
        <div className="masonry">
          {guides.map((g, i) => (
            <motion.button
              key={g.title}
              onClick={() => onPick(g.categories[0])}
              initial={{ opacity: 0, y: 50, rotate: i % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease }}
              whileHover={{ y: -6 }}
              className={`group flex w-full flex-col rounded-[28px] p-6 text-left ${guideHeights[g.size]}`}
              style={{ background: g.color, color: g.ink }}
            >
              <span className="w-fit rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${g.ink}1f` }}>
                {g.profile}
              </span>
              <h3 className="mt-auto pt-8 font-serif text-2xl leading-tight">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-80">{g.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                Voir les acteurs {categoryById[g.categories[0]].short.toLowerCase()}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-24">
      <SectionTitle kicker="FAQ" title="Les questions" em="qu’on nous pose." />
      <ul className="divide-y divide-espresso/10 border-y border-espresso/10">
        {faqs.map((f, i) => {
          const isOpen = open === i
          return (
            <li key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-serif text-xl">{f.q}</span>
                <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="shrink-0 rounded-full border border-espresso/15 p-2">
                  <Plus className="size-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 leading-relaxed text-espresso/70">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export function Footer({ onPick }: { onPick: (id: CategoryId) => void }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [error, setError] = useState('')
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setStatus('sending')
    setError('')
    const res = await postJson('/api/newsletter', { email: f.get('email'), website: f.get('website') })
    if (res.ok) setStatus('done')
    else {
      setStatus('idle')
      setError(res.error)
    }
  }
  return (
    <footer className="px-4 pb-6">
      <div className="grain relative mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-espresso px-6 py-16 text-cream sm:px-12">
        <div className="pointer-events-none absolute -top-32 right-0 size-96 rounded-full bg-terra/30 blur-[100px]" />
        <div className="relative grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-serif text-[clamp(2.2rem,5vw,4rem)] leading-[1] tracking-tight">
              L’assurance change. <em className="shine font-normal">Restez au clair.</em>
            </h2>
            <p className="mt-4 max-w-md text-cream/70">
              Une lettre par mois : nouveaux acteurs, changements de loi et repères pour mieux choisir. Pas de spam.
            </p>
            {status === 'done' ? (
              <p className="mt-8 rounded-full bg-cream/10 px-6 py-4 text-sand">Merci ! Vous êtes bien inscrit·e.</p>
            ) : (
              <form onSubmit={submit} className="mt-8 flex max-w-md gap-2 rounded-full bg-cream/10 p-2">
                <label htmlFor="nl" className="sr-only">
                  Adresse e-mail
                </label>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <input
                  id="nl"
                  name="email"
                  type="email"
                  required
                  placeholder="votre@email.fr"
                  className="min-w-0 flex-1 bg-transparent px-4 text-cream placeholder:text-cream/40 focus:outline-none"
                />
                <button
                  disabled={status === 'sending'}
                  className="rounded-full bg-sand px-5 py-3 text-sm font-semibold text-espresso hover:bg-cream disabled:opacity-60"
                >
                  {status === 'sending' ? 'Envoi…' : 'S’inscrire'}
                </button>
              </form>
            )}
            {error && (
              <p role="alert" className="mt-3 text-sm text-blush">
                {error}
              </p>
            )}
            <p className="mt-3 max-w-md text-xs text-cream/45">
              Désinscription en un clic dans chaque e-mail. Voir notre{' '}
              <a href="#/confidentialite" className="underline">
                politique de confidentialité
              </a>
              .
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-sand uppercase">Assurances</p>
              <ul className="space-y-2.5">
                {categories.map((c) => (
                  <li key={c.id}>
                    <button onClick={() => onPick(c.id)} className="text-cream/70 hover:text-cream">
                      {c.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.18em] text-sand uppercase">Clairassur</p>
              <ul className="space-y-2.5 text-cream/70">
                <li><a className="hover:text-cream" href="#annuaire">Annuaire</a></li>
                <li><a className="hover:text-cream" href="#guides">Guides</a></li>
                <li><a className="hover:text-cream" href="#faq">FAQ</a></li>
                <li><a className="hover:text-cream" href="#devis">Devis gratuit</a></li>
                <li><a className="hover:text-cream" href={`mailto:${site.contactEmail}`}>Contact</a></li>
                <li><a className="hover:text-cream" href="#/mentions-legales">Mentions légales</a></li>
                <li><a className="hover:text-cream" href="#/confidentialite">Confidentialité</a></li>
                <li><a className="hover:text-cream" href="#/partenaires">Partenaires</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="relative mt-16 flex flex-col gap-4 border-t border-cream/10 pt-8 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <Logo light />
          <p className="max-w-xl">
            Clairassur est un annuaire indépendant et n’est pas un assureur. Le site peut être rémunéré par certains
            partenaires, toujours signalés. Les marques citées appartiennent à leurs propriétaires. © 2026 Clairassur.
          </p>
        </div>
      </div>
    </footer>
  )
}
