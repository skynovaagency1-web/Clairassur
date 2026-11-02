import { PageIntro } from '../components/PageIntro'
import { QuoteForm } from '../components/QuoteForm'
import { Mono, Reveal, Section } from '../components/ui'
import { categories, type CategoryId } from '../data'
import { useQueryParams } from '../lib/search'

export function Devis() {
  const params = useQueryParams()
  const t = params.get('type')
  const type = categories.some((c) => c.id === t) ? (t as CategoryId) : undefined
  const provider = params.get('assureur') ?? undefined
  return (
    <>
      <PageIntro crumbs={[{ label: 'Devis gratuit' }]} label="Gratuit · sans engagement" title="Recevez vos devis," em="sans chercher.">
        <p>Décrivez votre besoin en une minute. Un conseiller partenaire vous recontacte avec des propositions adaptées.</p>
      </PageIntro>
      <Section className="pt-0!">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <Reveal>
            <QuoteForm key={`${type}|${provider}`} category={type} provider={provider} />
          </Reveal>
          <Reveal delay={0.1} className="space-y-5">
            {[
              ['01', 'Une seule demande', 'Plusieurs propositions, sans remplir dix formulaires.'],
              ['02', 'Aucun frais', 'Le service est gratuit pour vous, sans engagement.'],
              ['03', 'Vos données protégées', 'Transmises uniquement aux conseillers partenaires, avec votre accord.'],
            ].map(([n, t, d]) => (
              <div key={n} className="glass p-6">
                <Mono>{n}</Mono>
                <p className="mt-3 font-serif text-2xl font-medium">{t}</p>
                <p className="mt-1 text-muted">{d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>
    </>
  )
}
