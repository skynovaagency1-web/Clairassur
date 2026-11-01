import { motion } from 'motion/react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { postJson } from '../api'
import { categories, type CategoryId } from '../data'
import { SectionTitle } from './Categories'

const ease = [0.22, 1, 0.36, 1] as const

export type QuotePrefill = { category?: CategoryId; provider?: string; nonce: number }

const field =
  'w-full rounded-2xl border border-espresso/15 bg-ivory px-4 py-3 text-sm transition focus:border-terra focus:outline-none'

export function QuoteForm({ prefill }: { prefill: QuotePrefill }) {
  const [category, setCategory] = useState<CategoryId | ''>(prefill.category ?? '')
  const [provider, setProvider] = useState(prefill.provider ?? '')
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

  return (
    <section id="devis" className="scroll-mt-20 bg-latte/60 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionTitle
            kicker="Gratuit et sans engagement"
            title="Recevez des devis"
            em="sans chercher."
            intro="Dites-nous ce que vous cherchez : un conseiller partenaire vous recontacte avec des propositions adaptées."
          />
          <ul className="space-y-3 text-espresso/75">
            {['Une seule demande, plusieurs propositions', 'Aucun frais pour vous', 'Vos données ne sont jamais revendues sans votre accord'].map(
              (t) => (
                <li key={t} className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-terra" /> {t}
                </li>
              ),
            )}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
          className="rounded-[32px] bg-ivory p-6 shadow-[0_30px_60px_-40px_rgba(43,26,16,.6)] sm:p-8"
        >
          {status === 'done' ? (
            <div className="py-10 text-center" role="status">
              <CheckCircle2 className="mx-auto size-12 text-sage" />
              <p className="mt-4 font-serif text-3xl">Demande envoyée !</p>
              <p className="mt-2 text-espresso/70">Un conseiller vous recontacte rapidement. Pensez à vérifier vos e-mails.</p>
              <button onClick={() => setStatus('idle')} className="mt-6 text-sm font-semibold text-terra underline">
                Faire une autre demande
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
              <fieldset className="sm:col-span-2">
                <legend className="mb-2 text-sm font-semibold">Quelle assurance ?</legend>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <label
                      key={c.id}
                      className="flex cursor-pointer items-center gap-1.5 rounded-full border border-espresso/15 px-3.5 py-2 text-sm transition has-[:checked]:border-espresso has-[:checked]:bg-espresso has-[:checked]:text-cream has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-terra"
                    >
                      <input
                        type="radio"
                        name="category"
                        value={c.id}
                        required
                        checked={category === c.id}
                        onChange={() => setCategory(c.id)}
                        className="sr-only"
                      />
                      <c.icon className="size-4" aria-hidden /> {c.short}
                    </label>
                  ))}
                </div>
              </fieldset>
              {provider && (
                <p className="rounded-2xl bg-cream px-4 py-3 text-sm sm:col-span-2">
                  Assureur consulté : <b>{provider}</b>{' '}
                  <button type="button" onClick={() => setProvider('')} className="ml-1 text-terra underline">
                    retirer
                  </button>
                </p>
              )}
              <Field label="Prénom" name="firstName" autoComplete="given-name" required />
              <Field label="Nom" name="lastName" autoComplete="family-name" />
              <Field label="E-mail" name="email" type="email" autoComplete="email" required />
              <Field label="Téléphone" name="phone" type="tel" autoComplete="tel" />
              <Field
                label="Code postal"
                name="postcode"
                autoComplete="postal-code"
                inputMode="numeric"
                pattern="\d{5}"
                maxLength={5}
                required
              />
              <div className="sm:col-span-2">
                <label htmlFor="q-message" className="mb-1.5 block text-sm font-semibold">
                  Votre besoin <span className="font-normal text-espresso/50">(facultatif)</span>
                </label>
                <textarea id="q-message" name="message" rows={3} maxLength={2000} className={field} placeholder="Ex. : jeune conducteur, Clio de 2019, stationnement en garage" />
              </div>
              {/* Honeypot for bots: hidden from people and screen readers */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <label className="flex items-start gap-3 text-xs leading-relaxed text-espresso/70 sm:col-span-2">
                <input type="checkbox" name="consent" required className="mt-0.5 size-4 accent-terra" />
                <span>
                  J’accepte que Clairassur transmette ma demande à des conseillers partenaires afin d’être recontacté·e
                  au sujet de mon assurance. Je peux retirer mon consentement à tout moment. Voir la{' '}
                  <a href="#/confidentialite" className="underline">
                    politique de confidentialité
                  </a>
                  .
                </span>
              </label>
              {error && (
                <p role="alert" className="rounded-2xl bg-terra/10 px-4 py-3 text-sm text-terra sm:col-span-2">
                  {error}
                </p>
              )}
              <button
                disabled={status === 'sending'}
                className="flex items-center justify-center gap-2 rounded-full bg-terra px-6 py-4 font-semibold text-ivory transition hover:bg-cocoa disabled:opacity-60 sm:col-span-2"
              >
                {status === 'sending' ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-5" />}
                Recevoir mes devis gratuits
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function Field({ label, name, ...rest }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={`q-${name}`} className="mb-1.5 block text-sm font-semibold">
        {label} {!rest.required && <span className="font-normal text-espresso/50">(facultatif)</span>}
      </label>
      <input id={`q-${name}`} name={name} className={field} {...rest} />
    </div>
  )
}
