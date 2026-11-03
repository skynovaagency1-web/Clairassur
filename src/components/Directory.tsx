import { ArrowUpRight, Bookmark, BookmarkCheck, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { categoryPages } from '../content/categories'
import { useSaved } from '../lib/saved'
import { categories, categoryById, providerPath, providers, type CategoryId, type Provider, type ProviderKind } from '../data'
import { Reveal } from './ui'

const kinds: ProviderKind[] = ['Assureur', 'Mutuelle', 'Néo-assureur', 'Bancassureur', 'Spécialiste']

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

export function filterProviders(list: Provider[], query: string, category: CategoryId | 'all', kind: ProviderKind | 'all') {
  const q = normalize(query.trim())
  const out = list.filter((p) => {
    if (category !== 'all' && !p.categories.includes(category)) return false
    if (kind !== 'all' && p.kind !== kind) return false
    if (!q) return true
    const hay = normalize([p.name, p.kind, p.pitch, ...p.highlights, ...p.categories.map((c) => categoryById[c].label)].join(' '))
    return q.split(/\s+/).every((t) => hay.includes(t))
  })
  return [...out.filter((p) => p.sponsored), ...out.filter((p) => !p.sponsored)]
}

export function Directory({ initialQuery = '', initialCategory = 'all' }: { initialQuery?: string; initialCategory?: CategoryId | 'all' }) {
  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState<CategoryId | 'all'>(initialCategory)
  const [kind, setKind] = useState<ProviderKind | 'all'>('all')
  const { saved, toggle } = useSaved()
  const results = useMemo(() => filterProviders(providers, query, category, kind), [query, category, kind])

  return (
    <div>
      <div className="glass sticky top-24 z-30 mb-10 flex flex-col gap-3 p-3 lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full bg-sand-50/60 px-4">
          <Search className="size-4 text-taupe-deep" aria-hidden />
          <label htmlFor="dir-search" className="sr-only">
            Rechercher un assureur
          </label>
          <input
            id="dir-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Un nom, une garantie…"
            className="min-w-0 flex-1 bg-transparent py-3 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Effacer la recherche" className="text-muted">
              <X className="size-4" />
            </button>
          )}
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:pb-0" role="group" aria-label="Type d’assurance">
          <button aria-pressed={category === 'all'} onClick={() => setCategory('all')} className="pill pill-clear shrink-0 py-2!">
            Tout
          </button>
          {categories.map((c) => (
            <button key={c.id} aria-pressed={category === c.id} onClick={() => setCategory(c.id)} className="pill pill-clear shrink-0 py-2!">
              {c.short}
            </button>
          ))}
        </div>
        <label htmlFor="kind" className="sr-only">
          Type d’acteur
        </label>
        <select
          id="kind"
          value={kind}
          onChange={(e) => setKind(e.target.value as ProviderKind | 'all')}
          className="field rounded-full! py-2.5! lg:w-52"
        >
          <option value="all">Tous les acteurs</option>
          {kinds.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
      </div>

      <p className="mono mb-6 text-muted" aria-live="polite">
        {results.length} résultat{results.length > 1 ? 's' : ''}
        {category !== 'all' && ` · ${categoryPages[category].title}`}
        {saved.length > 0 && ` · ${saved.length} épinglé${saved.length > 1 ? 's' : ''}`}
      </p>

      {results.length === 0 ? (
        <div className="glass p-10 text-center">
          <p className="serif-display text-3xl">Aucun résultat.</p>
          <p className="mt-2 text-muted">Essayez un autre mot, ou retirez un filtre.</p>
          <button
            onClick={() => {
              setQuery('')
              setCategory('all')
              setKind('all')
            }}
            className="pill pill-sand mt-6"
          >
            Réinitialiser
          </button>
        </div>
      ) : (
        <div className="masonry" key={`${category}-${kind}`}>
          {results.map((p, i) => (
            <ProviderCard key={p.name} p={p} i={i} saved={saved.includes(p.name)} onSave={() => toggle(p.name)} />
          ))}
        </div>
      )}
    </div>
  )
}

export function ProviderCard({ p, i, saved, onSave }: { p: Provider; i: number; saved?: boolean; onSave?: () => void }) {
  return (
    <Reveal delay={(i % 3) * 0.06} className="glass glass-lift group p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="mono text-taupe-deep">
          {String(i + 1).padStart(2, '0')} · {p.kind}
        </p>
        {onSave && (
          <button
            onClick={onSave}
            aria-pressed={saved}
            aria-label={saved ? `Retirer ${p.name} des épingles` : `Épingler ${p.name}`}
            className="relative z-10 -mt-1 -mr-1 grid size-9 place-items-center rounded-full text-taupe-deep hover:bg-sand-50/80"
          >
            {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
          </button>
        )}
      </div>
      <h3 className="mt-4 font-serif text-[2rem] leading-tight font-medium">
        <Link to={providerPath(p)} className="after:absolute after:inset-0 after:rounded-[28px] hover:text-taupe">
          {p.name}
        </Link>
      </h3>
      {p.sponsored && <span className="mono mt-2 inline-block rounded-full bg-tint-sand px-2.5 py-1 text-ink">Sponsorisé</span>}
      <p className="mt-3 text-muted">{p.pitch}</p>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {p.categories.map((c) => (
          <li key={c} className="mono rounded-full bg-sand-50/70 px-2.5 py-1 text-ink">
            {categoryById[c].short}
          </li>
        ))}
      </ul>
      <span className="mt-5 inline-flex items-center gap-1 text-taupe-deep">
        Voir la fiche <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Reveal>
  )
}
