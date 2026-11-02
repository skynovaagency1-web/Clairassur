import { motion } from 'motion/react'
import { ArrowUpRight, Check, Loader2 } from 'lucide-react'
import { useState, type FormEvent, type InputHTMLAttributes } from 'react'
import { Link } from 'react-router'
import { postJson } from '../api'
import { categories, type CategoryId } from '../data'

export function QuoteForm({ category: initialCategory, provider: initialProvider }: { category?: CategoryId; provider?: string }) {
  const [category, setCategory] = useState<CategoryId | ''>(initialCategory ?? '')
  const [provider, setProvider] = useState(initialProvider ?? '')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [error, setError] = useState('')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setStatus('sending')
    setError('')
    const res = await postJson('/api/lead', {
      category,
      provider,
      firstName: f.get('firstName'),
      lastName: f.get('lastName'),
      email: f.get('email'),
      phone: f.get('phone'),
      postcode: f.get('postcode'),
      message: f.get('message'),
      consent: f.get('consent') === 'on',
      website: f.get('website'),
    })
    if (res.ok) setStatus('done')
    else {
      setStatus('idle')
      setError(res.error)
    }
  }

  if (status === 'done') {
    return (
      <div className="glass p-8 text-center sm:p-12" role="status">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-tint-sage text-olive-deep">
          <Check className="size-6" />
        </span>
        <p className="serif-display mt-5 text-4xl">Demande envoyée.</p>
        <p className="mt-3 text-muted">Un conseiller partenaire vous recontacte rapidement. Pensez à vérifier vos e-mails.</p>
        <button onClick={() => setStatus('idle')} className="pill pill-clear mt-6">
          Faire une autre demande
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="glass grid gap-5 p-6 sm:grid-cols-2 sm:p-10">
      <fieldset className="sm:col-span-2">
        <legend className="mono text-taupe-deep">01 · Votre besoin</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((c) => (
            <label key={c.id} className="pill pill-clear cursor-pointer has-[:checked]:bg-olive-dark has-[:checked]:text-cream has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-taupe-deep">
              <input
                type="radio"
                name="category"
                value={c.id}
                required
                checked={category === c.id}
                onChange={() => setCategory(c.id)}
                className="sr-only"
              />
              {c.short}
            </label>
          ))}
        </div>
      </fieldset>

      {provider && (
        <p className="rounded-2xl bg-sand-50/60 px-4 py-3 text-sm sm:col-span-2">
          Assureur consulté : <b className="font-medium">{provider}</b>{' '}
          <button type="button" onClick={() => setProvider('')} className="ml-1 text-taupe-deep underline">
            retirer
          </button>
        </p>
      )}

      <p className="mono -mb-2 text-taupe-deep sm:col-span-2">02 · Vos coordonnées</p>
      <Field label="Prénom" name="firstName" autoComplete="given-name" required />
      <Field label="Nom" name="lastName" autoComplete="family-name" />
      <Field label="E-mail" name="email" type="email" autoComplete="email" required />
      <Field label="Téléphone" name="phone" type="tel" autoComplete="tel" />
      <Field label="Code postal" name="postcode" autoComplete="postal-code" inputMode="numeric" pattern="\d{5}" maxLength={5} required />
      <div className="sm:col-span-2">
        <label htmlFor="q-message" className="mb-1.5 block text-[0.95rem]">
          Précisions <span className="text-muted">(facultatif)</span>
        </label>
        <textarea id="q-message" name="message" rows={3} maxLength={2000} className="field" placeholder="Ex. : jeune conducteur, Clio de 2019, garage fermé" />
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted sm:col-span-2">
        <input type="checkbox" name="consent" required className="mt-1 size-4 shrink-0 accent-olive-dark" />
        <span>
          J’accepte que Clairassur transmette ma demande à des conseillers partenaires afin d’être recontacté·e au sujet
          de mon assurance. Je peux retirer mon consentement à tout moment.{' '}
          <Link to="/confidentialite" className="text-ink underline">
            Confidentialité
          </Link>
          .
        </span>
      </label>
      {error && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="alert" className="rounded-2xl bg-tint-clay/70 px-4 py-3 text-sm text-terra-deep sm:col-span-2">
          {error}
        </motion.p>
      )}
      <div className="flex flex-col items-start gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button disabled={status === 'sending'} className="pill pill-dark disabled:opacity-60">
          <span>Recevoir mes devis gratuits</span>
          <span className="chip" aria-hidden>
            {status === 'sending' ? <Loader2 className="size-4 animate-spin" /> : <ArrowUpRight className="size-4" />}
          </span>
        </button>
        <p className="mono text-muted">Gratuit · sans engagement</p>
      </div>
    </form>
  )
}

function Field({ label, name, ...rest }: { label: string; name: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={`q-${name}`} className="mb-1.5 block text-[0.95rem]">
        {label} {!rest.required && <span className="text-muted">(facultatif)</span>}
      </label>
      <input id={`q-${name}`} name={name} className="field" {...rest} />
    </div>
  )
}
