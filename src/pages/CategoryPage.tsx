import { Check } from 'lucide-react'
import { Link } from 'react-router'
import { ProviderCard } from '../components/Directory'
import { FaqList } from '../components/Faq'
import { PRICE_NOTE } from '../components/OfferCard'
import { PageIntro } from '../components/PageIntro'
import { AdSlot } from '../components/AdSlot'
import { QuoteBlock } from '../components/QuoteBlock'
import { quoteHref } from '../lib/monetize'
import { CreditedPhoto, CtaPill, Editorial, Mono, Reveal, Section } from '../components/ui'
import { categoryPages, offerMeta } from '../content/categories'
import { guidePath, guides } from '../content/guides'
import { photos } from '../content/photos'
import { providers, type CategoryId } from '../data'

export function CategoryPage({ id }: { id: CategoryId }) {
  const page = categoryPages[id]
  const meta = offerMeta[id]
  const list = providers.filter((p) => p.categories.includes(id))
  const related = guides.filter((g) => g.categories.includes(id))

  return (
    <>
      <PageIntro crumbs={[{ label: page.title }]} label={`${meta.label} · ${list.length} acteurs`} title={page.title} em=".">
        <p>{page.intro[0]}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <CtaPill to={quoteHref(id)}>Devis gratuit</CtaPill>
          <a href="#acteurs" className={`pill pill-${meta.tint}`}>
            Voir les assureurs
          </a>
        </div>
      </PageIntro>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <CreditedPhoto photo={photos[meta.photo]} imgClassName="aspect-[16/9] md:aspect-[21/9] rounded-[32px]!" priority />
      </div>

      <Section>
        <div className="grid gap-8 md:grid-cols-[1.25fr_1fr] md:gap-16">
          <Reveal>
            <Mono>01 · L’essentiel</Mono>
            <p className="serif-display mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] leading-tight!">{page.intro[1]}</p>
          </Reveal>
          <Reveal delay={0.1} className="glass self-end p-6">
            <p className="mono text-terra-deep">Ce qui est obligatoire</p>
            <p className="mt-3">{page.mandatory}</p>
            {meta.fromPrice && (
              <p className="mt-5 border-t border-sand-200 pt-5">
                <span className="mono block text-muted">À partir de*</span>
                <span className="font-serif text-4xl font-medium">{meta.fromPrice}</span>
                <span className="text-muted"> / mois</span>
              </p>
            )}
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0!">
        <Editorial index="02" label="Garanties" title="Les garanties" em="à connaître." />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {page.guarantees.map((g, i) => (
            <li key={g.name} className="list-none">
              <Reveal delay={(i % 3) * 0.06} className="glass glass-lift h-full p-6">
                <p className="mono text-taupe-deep">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 font-serif text-[1.7rem] leading-tight font-medium">{g.name}</h3>
                <p className="mt-2 text-muted">{g.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <AdSlot className="pb-16" />

      <Section className="pt-0!">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <Editorial index="03" label="Bien choisir" title="Nos" em="conseils." />
          <Reveal delay={0.1}>
            <ul className="glass space-y-4 p-6 sm:p-8">
              {page.tips.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-tint-sage text-olive-deep">
                    <Check className="size-3.5" />
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section id="acteurs" className="pt-0!">
        <Editorial index="04" label="Acteurs" title={`${list.length} assureurs`} em="à découvrir.">
          <p>Présentés sans classement. Ouvrez une fiche pour l’essentiel et le lien vers le site officiel.</p>
        </Editorial>
        <div className="masonry mt-12">
          {list.map((p, i) => (
            <ProviderCard key={p.name} p={p} i={i} />
          ))}
        </div>
      </Section>

      <Section className="pt-0!">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Editorial stack index="05" label="Devis gratuit" title="Comparez" em="sans chercher.">
            <p>Une demande, et un conseiller partenaire vous recontacte avec des propositions adaptées.</p>
          </Editorial>
          <Reveal delay={0.1}>
            <QuoteBlock category={id} />
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0!">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Editorial stack index="06" label="Questions" title="Questions" em="fréquentes." />
            {related.length > 0 && (
              <Reveal className="mt-8 space-y-3">
                <Mono>Pour aller plus loin</Mono>
                {related.map((g) => (
                  <Link key={g.slug} to={guidePath(g)} className="pill pill-clear">
                    {g.title}
                  </Link>
                ))}
              </Reveal>
            )}
          </div>
          <Reveal delay={0.1}>
            <FaqList items={page.faq} />
          </Reveal>
        </div>
        {meta.fromPrice && <p className="mt-10 max-w-3xl text-sm text-muted">{PRICE_NOTE}</p>}
      </Section>
    </>
  )
}
