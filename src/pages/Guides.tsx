import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { PageIntro } from '../components/PageIntro'
import { CreditedPhoto, CtaPill, Mono, Reveal, Section } from '../components/ui'
import { categoryPages, offerMeta } from '../content/categories'
import { guidePath, guides, type Guide } from '../content/guides'
import { photos } from '../content/photos'

export function GuidesIndex() {
  return (
    <>
      <PageIntro crumbs={[{ label: 'Guides' }]} label={`Guides · ${guides.length} articles`} title="Des repères" em="pour chaque étape.">
        <p>Des guides courts et concrets, écrits pour vous aider à choisir sereinement, selon votre moment de vie.</p>
      </PageIntro>
      <Section className="pt-0!">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((g, i) => (
            <Reveal key={g.slug} delay={(i % 3) * 0.06}>
              <Link to={guidePath(g)} className="glass glass-lift flex h-full flex-col p-7">
                <Mono>
                  {String(i + 1).padStart(2, '0')} · {g.profile}
                </Mono>
                <h2 className="mt-5 font-serif text-[1.9rem] leading-tight font-medium">{g.title}</h2>
                <p className="mt-3 text-muted">{g.body}</p>
                <span className="mono mt-auto flex items-center justify-between pt-8 text-taupe-deep">
                  {g.readingTime} min de lecture <ArrowUpRight className="size-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}

export function GuidePage({ g }: { g: Guide }) {
  const cat = g.categories[0]
  const others = guides.filter((o) => o.slug !== g.slug).slice(0, 3)
  return (
    <>
      <PageIntro
        crumbs={[{ label: 'Guides', to: '/guides' }, { label: g.title }]}
        label={`${g.profile} · ${g.readingTime} min de lecture`}
        title={g.title}
      >
        <p>{g.body}</p>
      </PageIntro>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <CreditedPhoto photo={photos[offerMeta[cat].photo]} imgClassName="aspect-[16/9] md:aspect-[21/8] rounded-[32px]!" priority />
      </div>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <article className="max-w-2xl">
            {g.sections.map((s, i) => (
              <Reveal key={s.h} className="mb-12">
                <Mono>{String(i + 1).padStart(2, '0')}</Mono>
                <h2 className="serif-display mt-3 text-[2.4rem]">{s.h}</h2>
                <div className="prose-warm mt-4 text-[1.08rem] text-ink/90">
                  {s.p.map((t) => (
                    <p key={t.slice(0, 30)}>{t}</p>
                  ))}
                </div>
              </Reveal>
            ))}
            <p className="text-sm text-muted">
              Ce guide donne des repères généraux. Les règles et garanties peuvent évoluer : vérifiez toujours les documents de
              l’assureur avant de souscrire.
            </p>
          </article>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass p-6">
              <Mono>Passer à l’action</Mono>
              <p className="mt-3 font-serif text-2xl leading-snug font-medium">{categoryPages[cat].title}</p>
              <p className="mt-2 text-muted">Garanties, conseils et assureurs.</p>
              <div className="mt-5 flex flex-col gap-2">
                <Link to={`/${categoryPages[cat].slug}`} className={`pill pill-${offerMeta[cat].tint} justify-center`}>
                  Voir la page
                </Link>
                <CtaPill to={`/devis?type=${cat}`} className="justify-between">
                  Devis gratuit
                </CtaPill>
              </div>
            </div>
          </aside>
        </div>
      </Section>
      <Section className="pt-0!">
        <Mono>À lire aussi</Mono>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {others.map((o) => (
            <Link key={o.slug} to={guidePath(o)} className="glass glass-lift p-6">
              <Mono>{o.profile}</Mono>
              <p className="mt-3 font-serif text-2xl leading-tight font-medium">{o.title}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
