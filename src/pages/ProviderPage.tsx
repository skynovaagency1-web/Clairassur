import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { ProviderCard } from '../components/Directory'
import { AdSlot } from '../components/AdSlot'
import { PageIntro } from '../components/PageIntro'
import { CtaPill, Editorial, Mono, Reveal, Section } from '../components/ui'
import { categoryPages } from '../content/categories'
import { providers, type Provider } from '../data'
import { affiliateUrl, quoteHref } from '../lib/monetize'
import { useSaved } from '../lib/saved'

export function ProviderPage({ p }: { p: Provider }) {
  const { saved, toggle } = useSaved()
  const isSaved = saved.includes(p.name)
  const similar = providers
    .filter((o) => o.name !== p.name && o.categories.some((c) => p.categories.includes(c)))
    .sort((a, b) => b.categories.filter((c) => p.categories.includes(c)).length - a.categories.filter((c) => p.categories.includes(c)).length)
    .slice(0, 3)

  return (
    <>
      <PageIntro crumbs={[{ label: 'Assureurs', to: '/assureurs' }, { label: p.name }]} label={p.kind} title={p.name}>
        <p>{p.pitch}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <CtaPill to={quoteHref(p.categories[0], p.name)}>{affiliateUrl(p.categories[0]) ? 'Comparer les devis' : 'Être rappelé·e'}</CtaPill>
          <a
            href={p.partnerUrl ?? p.website}
            target="_blank"
            rel={p.partnerUrl ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
            className="pill pill-sand"
          >
            Site officiel <ArrowUpRight className="size-4" />
          </a>
          <button onClick={() => toggle(p.name)} aria-pressed={isSaved} className="pill pill-clear">
            {isSaved ? 'Épinglé' : 'Épingler'}
          </button>
        </div>
      </PageIntro>

      <Section className="pt-6!">
        <div className="grid gap-5 md:grid-cols-3">
          <Reveal className="glass p-7 md:col-span-2">
            <Mono>01 · Assurances proposées</Mono>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {p.categories.map((c) => (
                <li key={c}>
                  <Link to={`/${categoryPages[c].slug}`} className="flex items-center justify-between rounded-2xl bg-sand-50/60 px-4 py-3.5 hover:bg-sand-50">
                    <span className="font-serif text-xl font-medium">{categoryPages[c].title}</span>
                    <ArrowUpRight className="size-4 text-taupe-deep" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="glass p-7">
            <Mono>02 · En bref</Mono>
            <ul className="mt-5 space-y-2">
              {p.highlights.map((h) => (
                <li key={h} className="font-serif text-2xl font-medium">
                  {h}
                </li>
              ))}
            </ul>
            {p.sponsored && <p className="mono mt-5 text-taupe-deep">Partenaire sponsorisé</p>}
          </Reveal>
        </div>

        <Reveal className="glass mt-5 p-7">
          <Mono>03 · Avant de souscrire chez {p.name}</Mono>
          <ul className="mt-4 grid gap-x-10 gap-y-2 text-muted md:grid-cols-2">
            <li>· Demandez le document d’information (IPID) de chaque contrat.</li>
            <li>· Comparez franchises, plafonds et exclusions, pas seulement le prix.</li>
            <li>· Vérifiez les délais de carence et les conditions de résiliation.</li>
            <li>· Faites jouer la concurrence avec au moins deux autres devis.</li>
          </ul>
          <p className="mt-5 text-sm text-muted">
            Informations indicatives : seuls les documents de {p.name} font foi.
            {p.partnerUrl && ' Lien partenaire : Clairassur peut être rémunéré si vous souscrivez, sans surcoût pour vous.'}{' '}
            <Link to="/partenaires" className="underline">
              Comment nous sommes financés
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      <AdSlot className="pb-16" />
      <Section className="pt-0!">
        <Editorial index="04" label="À comparer" title="Acteurs" em="similaires." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {similar.map((o, i) => (
            <ProviderCard key={o.name} p={o} i={i} />
          ))}
        </div>
      </Section>
    </>
  )
}
