import { ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import type { CategoryId } from '../data'
import { affiliateUrl } from '../lib/monetize'
import { QuoteForm } from './QuoteForm'
import { CtaPill, Mono } from './ui'

/** Sends visitors to the affiliate comparator when one is set, otherwise shows the built-in form. */
export function QuoteBlock({ category, provider }: { category?: CategoryId; provider?: string }) {
  const url = affiliateUrl(category)
  if (!url) return <QuoteForm category={category} provider={provider} />
  return (
    <div className="glass p-7 sm:p-10">
      <Mono>01 · Devis en ligne</Mono>
      <p className="serif-display mt-4 text-4xl sm:text-5xl">
        Comparez les offres <em className="text-taupe">en quelques minutes.</em>
      </p>
      <p className="mt-4 max-w-lg text-muted">
        Vous êtes redirigé·e vers notre partenaire comparateur. Le service est gratuit et sans engagement.
      </p>
      <CtaPill to={url} sponsored className="mt-7">
        Comparer les devis
      </CtaPill>
      <p className="mt-6 flex items-start gap-2 text-sm text-muted">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-olive-deep" aria-hidden />
        <span>
          Lien partenaire : Clairesoassur peut être rémunéré si vous demandez un devis, sans surcoût pour vous.{' '}
          <Link to="/partenaires" className="text-ink underline">
            En savoir plus
          </Link>
          .
        </span>
      </p>
    </div>
  )
}
