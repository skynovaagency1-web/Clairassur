import { ArrowUpRight, Check, Loader2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { postJson } from '../api'
import { PageIntro } from '../components/PageIntro'
import { Mono, Reveal, Section } from '../components/ui'
import { site } from '../config'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [error, setError] = useState('')
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setStatus('sending')
    setError('')
    const res = await postJson('/api/contact', Object.fromEntries(f.entries()))
    if (res.ok) setStatus('done')
    else {
      setStatus('idle')
      setError(res.error)
    }
  }
  return (
    <>
      <PageIntro crumbs={[{ label: 'Contact' }]} label="Contact" title="Écrivez-nous," em="simplement.">
        <p>Une question, une demande de référencement ou un partenariat : nous répondons sous deux jours ouvrés.</p>
      </PageIntro>
      <Section className="pt-0!">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <Reveal>
            {status === 'done' ? (
              <div className="glass p-10 text-center" role="status">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-tint-sage text-olive-deep">
                  <Check className="size-6" />
                </span>
                <p className="serif-display mt-5 text-4xl">Message envoyé.</p>
                <p className="mt-3 text-muted">Merci, nous revenons vers vous très vite.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="glass grid gap-5 p-6 sm:grid-cols-2 sm:p-10">
                <div>
                  <label htmlFor="c-name" className="mb-1.5 block">Nom</label>
                  <input id="c-name" name="name" required autoComplete="name" className="field" />
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-1.5 block">E-mail</label>
                  <input id="c-email" name="email" type="email" required autoComplete="email" className="field" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-subject" className="mb-1.5 block">Sujet</label>
                  <select id="c-subject" name="subject" className="field">
                    <option value="question">Une question</option>
                    <option value="referencement">Référencer un assureur</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="donnees">Mes données personnelles</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-message" className="mb-1.5 block">Message</label>
                  <textarea id="c-message" name="message" required minLength={10} rows={6} maxLength={4000} className="field" />
                </div>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <p className="text-sm text-muted sm:col-span-2">
                  Vos informations servent uniquement à vous répondre. <Link to="/confidentialite" className="text-ink underline">Confidentialité</Link>.
                </p>
                {error && (
                  <p role="alert" className="rounded-2xl bg-tint-clay/70 px-4 py-3 text-sm text-terra-deep sm:col-span-2">
                    {error}
                  </p>
                )}
                <button disabled={status === 'sending'} className="pill pill-dark w-fit disabled:opacity-60 sm:col-span-2">
                  <span>Envoyer</span>
                  <span className="chip" aria-hidden>
                    {status === 'sending' ? <Loader2 className="size-4 animate-spin" /> : <ArrowUpRight className="size-4" />}
                  </span>
                </button>
              </form>
            )}
          </Reveal>
          <Reveal delay={0.1} className="space-y-5">
            <div className="glass p-6">
              <Mono>E-mail</Mono>
              <a href={`mailto:${site.contactEmail}`} className="mt-3 block font-serif text-2xl font-medium hover:text-taupe">
                {site.contactEmail}
              </a>
            </div>
            <div className="glass p-6">
              <Mono>Besoin d’un devis ?</Mono>
              <p className="mt-3 text-muted">Pour une demande d’assurance, le formulaire dédié est plus rapide.</p>
              <Link to="/devis" className="pill pill-sand mt-4">
                Demander un devis
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
