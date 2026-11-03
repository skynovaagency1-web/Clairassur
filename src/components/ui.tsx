import { motion, type HTMLMotionProps } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { photoSrcSet, photoUrl, type Photo } from '../content/photos'

export const ease = [0.22, 1, 0.36, 1] as const

/** Subtle fade + slide on scroll. */
export function Reveal({ delay = 0, y = 18, ...rest }: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    />
  )
}

export function Mono({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`mono text-taupe-deep ${className}`}>{children}</p>
}

/** Dark primary CTA with a round arrow chip. */
export function CtaPill({
  to,
  children,
  className = '',
  sponsored = to.startsWith('http'),
}: {
  to: string
  children: ReactNode
  className?: string
  /** Marks outbound links as paid (rel="sponsored"). Defaults to true for external links. */
  sponsored?: boolean
}) {
  const inner = (
    <>
      <span>{children}</span>
      <span className="chip" aria-hidden>
        <ArrowUpRight className="size-4" />
      </span>
    </>
  )
  return to.startsWith('http') ? (
    <a href={to} className={`pill pill-dark ${className}`} target="_blank" rel={`${sponsored ? 'sponsored ' : ''}noopener noreferrer`}>
      {inner}
    </a>
  ) : (
    <Link to={to} className={`pill pill-dark ${className}`}>
      {inner}
    </Link>
  )
}

export function Pill({
  to,
  tint = 'clear',
  children,
  className = '',
}: {
  to: string
  tint?: 'clear' | 'sand' | 'sage' | 'clay'
  children: ReactNode
  className?: string
}) {
  return (
    <Link to={to} className={`pill pill-${tint} ${className}`}>
      {children}
    </Link>
  )
}

/** Two-column editorial heading: mono number + big serif statement left, short paragraph right. */
export function Editorial({
  index,
  label,
  title,
  em,
  children,
  as: H = 'h2',
  stack = false,
}: {
  index?: string
  label: string
  title: string
  em?: string
  children?: ReactNode
  as?: 'h1' | 'h2'
  /** Keep title and paragraph in one column (when nested in a narrow column). */
  stack?: boolean
}) {
  return (
    <div className={`grid grid-cols-[minmax(0,1fr)] gap-6 ${stack ? '' : 'md:grid-cols-[1.25fr_1fr] md:gap-16'}`}>
      <Reveal>
        <Mono>
          {index ? `${index} · ` : ''}
          {label}
        </Mono>
        <H className="serif-display mt-4 text-[clamp(2.4rem,5.4vw,4.4rem)] text-ink">
          {title}{em && (/^[.,!?]/.test(em) ? '' : ' ')}{em && <em className="text-taupe">{em}</em>}
        </H>
      </Reveal>
      {children && (
        <Reveal delay={0.1} className={`text-[1.06rem] leading-relaxed text-muted ${stack ? 'max-w-md' : 'self-end md:pb-2'}`}>
          {children}
        </Reveal>
      )}
    </div>
  )
}

export function Section({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl scroll-mt-28 px-4 py-20 sm:px-6 md:py-28 ${className}`}>
      {children}
    </section>
  )
}

/** Warm-graded photo with its credit underneath. */
export function CreditedPhoto({
  photo,
  className = '',
  imgClassName = '',
  sizes = '100vw',
  priority = false,
}: {
  photo: Photo
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
}) {
  return (
    <figure className={className}>
      <div className={`overflow-hidden rounded-[28px] bg-sand-200 ${imgClassName}`}>
        <img
          src={photoUrl(photo)}
          srcSet={photoSrcSet(photo)}
          sizes={sizes}
          alt={photo.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="photo-warm size-full object-cover"
        />
      </div>
      <PhotoCredit photo={photo} className="mt-2.5" />
    </figure>
  )
}

export function PhotoCredit({ photo, className = '' }: { photo: Photo; className?: string }) {
  return (
    <figcaption className={`mono text-muted ${className}`}>
      Photo ·{' '}
      <a href={photo.page} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
        {photo.author}
      </a>{' '}
      / Unsplash
    </figcaption>
  )
}
