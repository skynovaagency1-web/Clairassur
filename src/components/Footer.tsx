import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { postJson } from '../api'
import { site } from '../config'
import { categoryPages } from '../content/categories'
import { categories } from '../data'
import { Wordmark } from './Header'

export function Footer() {
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
    <footer className="px-3 pb-4 sm:px-4">
      <div className="glass mx-auto max-w-6xl px-6 py-12 sm:px-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-sm text-muted">
              L’annuaire calme de l’assurance en France. Une lettre par mois, sans bruit.
            </p>
            {status === 'done' ? (
              <p className="mono mt-6 text-olive-deep" role="status">
                Merci, vous êtes inscrit·e.
              </p>
            ) : (
              <form onSubmit={submit} className="mt-6 flex max-w-sm gap-2">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <label htmlFor="nl" className="sr-only">
                  Adresse e-mail
                </label>
                <input id="nl" name="email" type="email" required placeholder="votre@email.fr" className="field rounded-full! py-2.5!" />
                <button disabled={status === 'sending'} className="pill pill-sand shrink-0 disabled:opacity-60">
                  {status === 'sending' ? '…' : 'S’inscrire'}
                </button>
              </form>
            )}
            {error && (
              <p role="alert" className="mt-2 text-sm text-terra-deep">
                {error}
              </p>
            )}
            <p className="mt-2 text-sm text-muted">
              Désinscription en un clic. <Link to="/confidentialite" className="underline">Confidentialité</Link>.
            </p>
          </div>
          <nav aria-label="Assurances">
            <p className="mono text-taupe-deep">Assurances</p>
            <ul className="mt-4 space-y-2">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/${categoryPages[c.id].slug}`} className="text-muted hover:text-ink">
                    {categoryPages[c.id].title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Lumassur">
            <p className="mono text-taupe-deep">Lumassur</p>
            <ul className="mt-4 space-y-2">
              {[
                ['/assureurs', 'Tous les assureurs'],
                ['/guides', 'Guides'],
                ['/devis', 'Devis gratuit'],
                ['/a-propos', 'À propos'],
                ['/contact', 'Contact'],
              ].map(([to, l]) => (
                <li key={to}>
                  <Link to={to} className="text-muted hover:text-ink">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-sand-200 pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 {site.name}. Annuaire indépendant, n’est pas un assureur.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li><Link to="/mentions-legales" className="hover:text-ink">Mentions légales</Link></li>
            <li><Link to="/cgu" className="hover:text-ink">CGU</Link></li>
            <li><Link to="/confidentialite" className="hover:text-ink">Confidentialité</Link></li>
            <li><Link to="/partenaires" className="hover:text-ink">Partenaires</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
