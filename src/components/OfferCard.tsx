import { Link } from 'react-router'
import { categoryPages, offerMeta } from '../content/categories'
import { photos } from '../content/photos'
import { providers, type CategoryId } from '../data'
import { quoteHref } from '../lib/monetize'
import { CreditedPhoto, CtaPill } from './ui'

/** Glass offer card: photo, mono index, serif title, "à partir de" price and two pills. */
export function OfferCard({ id, index }: { id: CategoryId; index: number }) {
  const page = categoryPages[id]
  const meta = offerMeta[id]
  const count = providers.filter((p) => p.categories.includes(id)).length
  return (
    <article className="glass grid gap-6 p-4 sm:p-5 md:grid-cols-[1fr_1.1fr] md:gap-10">
      <CreditedPhoto photo={photos[meta.photo]} imgClassName="aspect-[4/3] md:aspect-auto md:h-[19rem]" sizes="(min-width: 768px) 540px, 100vw" />
      <div className="flex flex-col px-2 pb-2 md:py-4 md:pr-6">
        <p className="mono text-taupe-deep">
          {String(index).padStart(2, '0')} · {meta.label}
        </p>
        <h3 className="serif-display mt-3 text-[2.6rem]">
          <Link to={`/${page.slug}`} className="hover:text-taupe">
            {page.title}
          </Link>
        </h3>
        <p className="mt-3 text-muted">{page.intro[0].split('. ')[0]}.</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
          {meta.fromPrice ? (
            <p>
              <span className="mono block text-muted">À partir de*</span>
              <span className="font-serif text-4xl font-medium">{meta.fromPrice}</span>
              <span className="text-muted"> / mois</span>
            </p>
          ) : (
            <p>
              <span className="mono block text-muted">Acteurs</span>
              <span className="font-serif text-4xl font-medium">{count}</span>
              <span className="text-muted"> référencés</span>
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            <Link to={`/${page.slug}`} className={`pill pill-${meta.tint}`}>
              Découvrir
            </Link>
            <CtaPill to={quoteHref(id)}>Devis</CtaPill>
          </div>
        </div>
      </div>
    </article>
  )
}

export const PRICE_NOTE =
  '* Tarifs mensuels indicatifs constatés pour un profil favorable, à titre d’exemple. Le prix réel dépend de votre profil et des garanties choisies.'
