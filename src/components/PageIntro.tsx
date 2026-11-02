import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Mono, Reveal } from './ui'

export type Crumb = { label: string; to?: string }

/** Inner page opening: breadcrumb, mono label, big serif title, short intro on the right. */
export function PageIntro({
  crumbs,
  label,
  title,
  em,
  children,
}: {
  crumbs: Crumb[]
  label: string
  title: string
  em?: string
  children?: ReactNode
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-14 pb-12 sm:px-6 md:pt-20">
      <nav aria-label="Fil d’Ariane">
        <ol className="mono flex flex-wrap items-center gap-1.5 text-muted">
          <li>
            <Link to="/" className="hover:text-ink">
              Accueil
            </Link>
          </li>
          {crumbs.map((c) => (
            <li key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="size-3" aria-hidden />
              {c.to ? (
                <Link to={c.to} className="hover:text-ink">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-[1.3fr_1fr] md:gap-16">
        <Reveal>
          <Mono>{label}</Mono>
          <h1 className="serif-display mt-4 text-[clamp(2.8rem,6.6vw,5.4rem)]">
            {title}{em && (/^[.,!?]/.test(em) ? '' : ' ')}{em && <em className="text-taupe">{em}</em>}
          </h1>
        </Reveal>
        {children && (
          <Reveal delay={0.1} className="self-end text-[1.06rem] text-muted md:pb-3">
            {children}
          </Reveal>
        )}
      </div>
    </section>
  )
}
