import { motion } from 'motion/react'
import { ArrowUpRight, Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { FaqList } from '../components/Faq'
import { OfferCard, PRICE_NOTE } from '../components/OfferCard'
import { QuoteBlock } from '../components/QuoteBlock'
import { quoteHref } from '../lib/monetize'
import { CtaPill, Editorial, Mono, PhotoCredit, Reveal, Section, ease } from '../components/ui'
import { categoryPages } from '../content/categories'
import { guidePath, guides } from '../content/guides'
import { photoSrcSet, photoUrl, photos } from '../content/photos'
import { faqs, providerPath, providers, type CategoryId } from '../data'

const stacked: CategoryId[] = ['auto', 'habitation', 'sante', 'pro']

const steps = [
  { t: 'Décrivez votre situation', d: 'Auto, logement, santé, activité : partez de votre vie, pas du jargon des contrats.' },
  { t: 'Comparez en clair', d: 'Assureurs historiques, mutuelles et néo-assureurs, présentés avec les mêmes mots.' },
  { t: 'Choisissez sereinement', d: 'Demandez un devis à l’assureur, ou laissez un conseiller partenaire vous rappeler.' },
]

export function Home() {
  return (
    <>
      <Hero />

      <Section className="pt-24!">
        <Editorial index="01" label="Notre approche" title="L’assurance," em="enfin lisible.">
          <p>
            Lumassur réunit les assureurs qui comptent en France et les présente simplement : ce qu’ils couvrent, à
            qui ils s’adressent, et comment les contacter. Sans pression, sans petites lignes.
          </p>
          <SearchBox />
        </Editorial>
      </Section>

      <Section id="offres" className="pt-0!">
        <Editorial index="02" label="Couvertures" title="Ce que vous" em="voulez protéger.">
          <p>Quatre familles d’assurance pour l’essentiel de la vie. Chacune a sa page, ses repères et ses acteurs.</p>
        </Editorial>
        <div className="mt-14 space-y-6">
          {stacked.map((id, i) => (
            <div key={id} className="md:sticky" style={{ top: `${96 + i * 18}px` }}>
              <Reveal>
                <OfferCard id={id} index={i + 1} />
              </Reveal>
            </div>
          ))}
        </div>
        <Reveal className="mt-8 flex flex-wrap items-center gap-3">
          <span className="mono text-muted">Aussi :</span>
          {(['moto', 'vie'] as CategoryId[]).map((id) => (
            <Link key={id} to={`/${categoryPages[id].slug}`} className="pill pill-clear">
              {categoryPages[id].title}
            </Link>
          ))}
        </Reveal>
        <p className="mt-6 max-w-3xl text-sm text-muted">{PRICE_NOTE}</p>
      </Section>

      <Section className="pt-0!">
        <Editorial index="03" label="Méthode" title="Trois gestes," em="pas plus." />
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className="list-none">
              <Reveal delay={i * 0.08} className="glass glass-lift h-full p-7">
                <p className="font-serif text-6xl font-medium text-taupe" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-6 font-serif text-2xl font-medium">{s.t}</h3>
                <p className="mt-2 text-muted">{s.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="pt-0!">
        <Editorial index="04" label="Assureurs" title={`${providers.length} acteurs,`} em="une seule lecture.">
          <p>Assureurs, mutuelles, néo-assureurs et spécialistes, présentés avec la même grille.</p>
          <CtaPill to="/assureurs" className="mt-6">
            Voir tous les assureurs
          </CtaPill>
        </Editorial>
        <Reveal className="mt-12 flex flex-wrap gap-2.5">
          {providers.map((p, i) => (
            <Link key={p.name} to={providerPath(p)} className={`pill ${['pill-clear', 'pill-sand', 'pill-sage', 'pill-clay'][i % 4]}`}>
              {p.name}
            </Link>
          ))}
        </Reveal>
      </Section>

      <Section id="devis" className="pt-0!">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Editorial stack index="05" label="Devis gratuit" title="Un seul formulaire," em="plusieurs réponses." />
          <Reveal delay={0.1}>
            <QuoteBlock />
          </Reveal>
        </div>
      </Section>

      <Section className="pt-0!">
        <Editorial index="06" label="Guides" title="Des repères" em="pour chaque étape.">
          <CtaPill to="/guides">Tous les guides</CtaPill>
        </Editorial>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {guides.slice(0, 3).map((g, i) => (
            <Reveal key={g.slug} delay={i * 0.08}>
              <Link to={guidePath(g)} className="glass glass-lift flex h-full flex-col p-7">
                <Mono>
                  {g.profile} · {g.readingTime} min
                </Mono>
                <h3 className="mt-5 font-serif text-[1.9rem] leading-tight font-medium">{g.title}</h3>
                <p className="mt-3 text-muted">{g.body}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-taupe-deep">
                  Lire le guide <ArrowUpRight className="size-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0!">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Editorial stack index="07" label="Questions" title="Ce qu’on" em="nous demande." />
          <Reveal delay={0.1}>
            <FaqList items={faqs} />
          </Reveal>
        </div>
      </Section>
    </>
  )
}

function Hero() {
  const p = photos.home
  return (
    <section className="px-3 pt-4 sm:px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease }}
        className="relative mx-auto h-[78svh] min-h-[520px] max-w-[1400px] overflow-hidden rounded-[32px] bg-sand-200"
      >
        <img
          src={photoUrl(p, 2200)}
          srcSet={photoSrcSet(p)}
          sizes="100vw"
          alt={p.alt}
          fetchPriority="high"
          className="photo-warm absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(44_37_29/0.08)_0%,rgb(44_37_29/0.05)_40%,rgb(44_37_29/0.55)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-6 p-6 sm:p-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="mono text-cream/90"
          >
            L’annuaire de l’assurance en France · Auto · Habitation · Santé · Vie · Moto · Pro
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24, letterSpacing: '0.04em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.14em' }}
            transition={{ duration: 1.4, delay: 0.15, ease }}
            className="w-full font-serif text-[clamp(2rem,10.5vw,12.5rem)] leading-[0.85] font-medium text-cream uppercase"
          >
            Lumassur
            <span className="sr-only"> : comparez les assureurs auto, habitation, santé, vie, moto et pro</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
            className="flex w-full flex-wrap items-center justify-between gap-4"
          >
            <p className="max-w-md text-lg text-cream/90">L’assurance, posée et lisible. Trouvez qui vous protège, sans bruit.</p>
            <CtaPill to={quoteHref()}>Recevoir mes devis</CtaPill>
          </motion.div>
        </div>
      </motion.div>
      <div className="mx-auto max-w-[1400px] px-2">
        <PhotoCredit photo={p} className="mt-2.5" />
      </div>
    </section>
  )
}

function SearchBox() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const submit = (e: FormEvent) => {
    e.preventDefault()
    navigate(`/assureurs${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`)
  }
  return (
    <form onSubmit={submit} role="search" className="glass mt-6 flex items-center gap-2 rounded-full! p-1.5 pl-5">
      <Search className="size-4 shrink-0 text-taupe-deep" aria-hidden />
      <label htmlFor="home-search" className="sr-only">
        Rechercher un assureur
      </label>
      <input
        id="home-search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Un assureur, une garantie…"
        className="min-w-0 flex-1 bg-transparent py-2 focus:outline-none"
      />
      <button className="pill pill-sand">Chercher</button>
    </form>
  )
}
