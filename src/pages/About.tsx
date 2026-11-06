import { PageIntro } from '../components/PageIntro'
import { CreditedPhoto, CtaPill, Editorial, Mono, Reveal, Section } from '../components/ui'
import { photos } from '../content/photos'

const values = [
  ['Clarté', 'Les mêmes mots pour chaque assureur, et des explications sans jargon.'],
  ['Indépendance', 'Les contenus ne sont pas écrits par les assureurs. Les partenariats sont toujours signalés.'],
  ['Sérénité', 'Pas de relances agressives : vous décidez quand et avec qui parler.'],
]

export function About() {
  return (
    <>
      <PageIntro crumbs={[{ label: 'À propos' }]} label="À propos" title="Une maison calme" em="pour l’assurance.">
        <p>
          Clairesoassur est né d’un constat simple : choisir une assurance ne devrait pas ressembler à une négociation. Nous
          rassemblons l’information, vous gardez la main.
        </p>
      </PageIntro>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <CreditedPhoto photo={photos.kitchen} imgClassName="aspect-[16/9] md:aspect-[21/9] rounded-[32px]!" priority />
      </div>
      <Section>
        <Editorial index="01" label="Ce que nous faisons" title="Un annuaire," em="pas un vendeur.">
          <p>
            Nous présentons les assureurs, mutuelles et spécialistes actifs en France, expliquons les garanties et
            proposons, si vous le souhaitez, une mise en relation avec un conseiller partenaire.
          </p>
        </Editorial>
      </Section>
      <Section className="pt-0!">
        <Editorial index="02" label="Nos principes" title="Trois" em="engagements." />
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map(([t, d], i) => (
            <li key={t} className="list-none">
              <Reveal delay={i * 0.08} className="glass h-full p-7">
                <Mono>{String(i + 1).padStart(2, '0')}</Mono>
                <p className="serif-display mt-5 text-4xl">{t}</p>
                <p className="mt-3 text-muted">{d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>
      <Section className="pt-0!">
        <Editorial index="03" label="Financement" title="Gratuit pour vous," em="en toute transparence.">
          <p>
            Le site est financé par certains partenaires : fiches sponsorisées, liens partenaires et mises en relation. Tout
            est expliqué sur notre page dédiée.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CtaPill to="/partenaires">Partenaires et rémunération</CtaPill>
          </div>
        </Editorial>
      </Section>
    </>
  )
}
