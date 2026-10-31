import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Bookmark, BookmarkCheck, ExternalLink, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { categories, categoryById, providers, type CategoryId, type Provider, type ProviderKind } from '../data'
import { SectionTitle } from './Categories'

const ease = [0.22, 1, 0.36, 1] as const
const kinds: ProviderKind[] = ['Assureur', 'Mutuelle', 'Néo-assureur', 'Bancassureur', 'Spécialiste']
const bandHeights = ['h-28', 'h-44', 'h-36', 'h-56', 'h-32', 'h-48']

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

type Props = {
  query: string
  setQuery: (q: string) => void
  category: CategoryId | 'all'
  setCategory: (c: CategoryId | 'all') => void
}

function useSaved() {
  const [saved, setSaved] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('clairassur:saved') ?? '[]')
    } catch {
      return []
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem('clairassur:saved', JSON.stringify(saved))
    } catch {
      /* storage unavailable */
    }
  }, [saved])
  const toggle = (name: string) =>
    setSaved((s) => (s.includes(name) ? s.filter((n) => n !== name) : [...s, name]))
  return { saved, toggle }
}

export function Directory({ query, setQuery, category, setCategory }: Props) {
  const [kind, setKind] = useState<ProviderKind | 'all'>('all')
  const [open, setOpen] = useState<Provider | null>(null)
  const { saved, toggle } = useSaved()

  const results = useMemo(() => {
    const q = normalize(query.trim())
    return providers.filter((p) => {
      if (category !== 'all' && !p.categories.includes(category)) return false
      if (kind !== 'all' && p.kind !== kind) return false
      if (!q) return true
      const hay = normalize(
        [p.name, p.kind, p.pitch, ...p.highlights, ...p.categories.map((c) => categoryById[c].label)].join(' '),
      )
      return q.split(/\s+/).every((t) => hay.includes(t))
    })
  }, [query, category, kind])

  const active = category === 'all' ? null : categoryById[category]

  return (
    <section id="annuaire" className="scroll-mt-20 bg-cream py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          kicker="L’annuaire"
          title="Le mur des"
          em="assureurs."
          intro="Parcourez, filtrez, épinglez. Chaque fiche résume l’essentiel et renvoie vers le site officiel."
        />

        {/* Controls */}
        <div className="z-30 lg:sticky lg:top-20 -mx-4 mb-8 bg-cream/90 px-4 py-3 backdrop-blur-lg">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-espresso/15 bg-ivory px-4 focus-within:border-terra">
              <Search className="size-4 text-mocha" aria-hidden />
              <label htmlFor="dir-search" className="sr-only">
                Rechercher dans l’annuaire
              </label>
              <input
                id="dir-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un nom, une garantie…"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} aria-label="Effacer la recherche" className="text-mocha">
                  <X className="size-4" />
                </button>
              )}
            </div>
            <label className="sr-only" htmlFor="kind">
              Type d’acteur
            </label>
            <select
              id="kind"
              value={kind}
              onChange={(e) => setKind(e.target.value as ProviderKind | 'all')}
              className="rounded-full border border-espresso/15 bg-ivory px-4 py-3 text-sm focus:border-terra focus:outline-none"
            >
              <option value="all">Tous les types d’acteurs</option>
              {kinds.map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
          </div>
          <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]" role="tablist">
            <Chip active={category === 'all'} onClick={() => setCategory('all')}>
              Tout voir
            </Chip>
            {categories.map((c) => (
              <Chip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)} color={c.color} ink={c.ink}>
                <c.icon className="size-4" aria-hidden /> {c.short}
              </Chip>
            ))}
          </div>
        </div>

        <p className="mb-6 text-sm text-espresso/60" aria-live="polite">
          {results.length} résultat{results.length > 1 ? 's' : ''}
          {active ? ` en ${active.label.toLowerCase()}` : ''}
          {saved.length > 0 && ` · ${saved.length} épinglé${saved.length > 1 ? 's' : ''}`}
        </p>

        <div className="masonry" key={`${category}-${kind}`}>
          {active && <CategoryPin id={active.id} />}
          {results.map((p, i) => (
            <ProviderPin
              key={p.name}
              p={p}
              i={i}
              saved={saved.includes(p.name)}
              onSave={() => toggle(p.name)}
              onOpen={() => setOpen(p)}
            />
          ))}
        </div>

        {results.length === 0 && (
          <div className="rounded-[28px] border border-dashed border-espresso/20 p-12 text-center">
            <p className="font-serif text-2xl">Aucun résultat pour l’instant.</p>
            <p className="mt-2 text-espresso/60">Essayez un autre mot-clé ou retirez un filtre.</p>
            <button
              onClick={() => {
                setQuery('')
                setCategory('all')
                setKind('all')
              }}
              className="mt-6 rounded-full bg-espresso px-5 py-2.5 text-sm font-semibold text-cream"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <ProviderSheet
            p={open}
            saved={saved.includes(open.name)}
            onSave={() => toggle(open.name)}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function Chip({
  active,
  onClick,
  children,
  color = '#2b1a10',
  ink = '#f7efe3',
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  color?: string
  ink?: string
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className="relative flex shrink-0 items-center gap-1.5 rounded-full border border-espresso/15 px-4 py-2 text-sm font-medium transition-colors"
      style={active ? { color: ink, borderColor: color } : undefined}
    >
      {active && (
        <motion.span
          layoutId="chip"
          className="absolute inset-0 -z-0 rounded-full"
          style={{ background: color }}
          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
        />
      )}
      <span className="relative flex items-center gap-1.5">{children}</span>
    </button>
  )
}

function Monogram({ name }: { name: string }) {
  const letters = name
    .split(/\s+/)
    .filter((w) => /^[A-ZÉ]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
  return <span className="font-serif text-4xl tracking-tight">{letters || name[0]}</span>
}

function ProviderPin({
  p,
  i,
  saved,
  onSave,
  onOpen,
}: {
  p: Provider
  i: number
  saved: boolean
  onSave: () => void
  onOpen: () => void
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50, rotate: i % 2 ? 2 : -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease }}
      className="group relative overflow-hidden rounded-[28px] bg-ivory shadow-[0_1px_0_rgba(43,26,16,.06),0_20px_40px_-30px_rgba(43,26,16,.5)] transition-shadow hover:shadow-[0_30px_60px_-30px_rgba(43,26,16,.6)]"
    >
      <button onClick={onOpen} className="block w-full text-left" aria-label={`Voir la fiche ${p.name}`}>
        <div
          className={`${bandHeights[i % bandHeights.length]} relative flex items-end overflow-hidden p-5 text-white`}
          style={{ background: `linear-gradient(140deg, ${p.tone}, ${p.tone}cc 55%, #2b1a10)` }}
        >
          <svg className="absolute -top-12 -right-12 size-52 opacity-25 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12" viewBox="0 0 200 200" aria-hidden>
            <path d="M100 10 L180 40 V100 C180 150 145 180 100 195 C55 180 20 150 20 100 V40 Z" fill="none" stroke="#fff" strokeWidth="2" />
            <path d="M100 40 L150 60 V100 C150 130 130 150 100 160 C70 150 50 130 50 100 V60 Z" fill="none" stroke="#fff" strokeWidth="2" />
          </svg>
          <Monogram name={p.name} />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif text-xl leading-tight">{p.name}</h3>
            <span className="rounded-full bg-latte px-2.5 py-1 text-[11px] font-semibold tracking-wide text-cocoa">
              {p.kind}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-espresso/70">{p.pitch}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {p.categories.map((c) => (
              <li
                key={c}
                className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                style={{ background: `${categoryById[c].color}33`, color: '#2b1a10' }}
              >
                {categoryById[c].short}
              </li>
            ))}
          </ul>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-terra">
            Voir la fiche <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </button>
      <button
        onClick={onSave}
        aria-pressed={saved}
        aria-label={saved ? `Retirer ${p.name} des épingles` : `Épingler ${p.name}`}
        className={`absolute top-3 right-3 flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold transition md:opacity-0 md:group-hover:opacity-100 ${
          saved ? 'bg-terra text-ivory md:opacity-100' : 'bg-ivory/90 text-espresso'
        }`}
      >
        {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
        {saved ? 'Épinglé' : 'Épingler'}
      </button>
    </motion.article>
  )
}

function CategoryPin({ id }: { id: CategoryId }) {
  const c = categoryById[id]
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease }}
      className="relative overflow-hidden rounded-[28px] p-6"
      style={{ background: c.color, color: c.ink }}
    >
      <c.icon className="size-8" strokeWidth={1.5} />
      <h3 className="mt-6 font-serif text-2xl">{c.label}</h3>
      <p className="mt-2 text-sm opacity-80">{c.description}</p>
      <p className="mt-5 text-xs font-semibold tracking-[0.16em] uppercase opacity-70">À vérifier dans votre contrat</p>
      <ul className="mt-2 space-y-1 text-sm">
        {c.essentials.map((e) => (
          <li key={e}>· {e}</li>
        ))}
      </ul>
    </motion.div>
  )
}

function ProviderSheet({
  p,
  saved,
  onSave,
  onClose,
}: {
  p: Provider
  saved: boolean
  onSave: () => void
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-espresso/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.5, ease }}
        className="max-h-[90svh] w-full max-w-lg overflow-y-auto rounded-t-[32px] bg-ivory sm:rounded-[32px]"
      >
        <div
          className="relative flex h-44 items-end p-6 text-white"
          style={{ background: `linear-gradient(140deg, ${p.tone}, #2b1a10)` }}
        >
          <button
            onClick={onClose}
            autoFocus
            aria-label="Fermer"
            className="absolute top-4 right-4 rounded-full bg-white/15 p-2 backdrop-blur hover:bg-white/25"
          >
            <X className="size-5" />
          </button>
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] uppercase opacity-75">{p.kind}</p>
            <h3 id="sheet-title" className="font-serif text-4xl">
              {p.name}
            </h3>
          </div>
        </div>
        <div className="p-6">
          <p className="text-lg leading-relaxed text-espresso/80">{p.pitch}</p>
          <h4 className="mt-6 text-xs font-semibold tracking-[0.16em] text-mocha uppercase">Assurances proposées</h4>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {p.categories.map((id) => {
              const c = categoryById[id]
              return (
                <li key={id} className="flex items-center gap-2 rounded-2xl p-3 text-sm font-medium" style={{ background: `${c.color}33` }}>
                  <c.icon className="size-4" /> {c.short}
                </li>
              )
            })}
          </ul>
          <h4 className="mt-6 text-xs font-semibold tracking-[0.16em] text-mocha uppercase">En bref</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {p.highlights.map((h) => (
              <li key={h} className="rounded-full border border-espresso/15 px-3 py-1.5 text-sm">
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <a
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-espresso px-5 py-3.5 font-semibold text-cream transition hover:bg-cocoa"
            >
              Site officiel <ExternalLink className="size-4" />
            </a>
            <button
              onClick={onSave}
              aria-pressed={saved}
              className="flex items-center justify-center gap-2 rounded-full border border-espresso/20 px-5 py-3.5 font-semibold"
            >
              {saved ? <BookmarkCheck className="size-4 text-terra" /> : <Bookmark className="size-4" />}
              {saved ? 'Épinglé' : 'Épingler'}
            </button>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-espresso/50">
            Informations indicatives. Clairassur n’est ni assureur ni courtier : vérifiez les garanties et tarifs sur le site
            de l’assureur.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
