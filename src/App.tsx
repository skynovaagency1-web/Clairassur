import { MotionConfig } from 'motion/react'
import { useEffect, useState } from 'react'
import { Categories, Marquee } from './components/Categories'
import { Directory } from './components/Directory'
import { Hero } from './components/Hero'
import { Legal } from './components/Legal'
import { Nav } from './components/Nav'
import { QuoteForm, type QuotePrefill } from './components/QuoteForm'
import { Faq, Footer, Guides, HowItWorks } from './components/Sections'
import type { CategoryId, Provider } from './data'
import { isLegalPage, type LegalPage } from './legal'

const scrollTo = (id: string) =>
  requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }))

/** Legal pages live at #/mentions-legales, #/confidentialite and #/partenaires. */
function useLegalRoute(): LegalPage | null {
  const read = () => {
    const h = window.location.hash.replace(/^#\/?/, '')
    return window.location.hash.startsWith('#/') && isLegalPage(h) ? h : null
  }
  const [page, setPage] = useState(read)
  useEffect(() => {
    const on = () => setPage(read())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return page
}

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryId | 'all'>('all')
  const [prefill, setPrefill] = useState<QuotePrefill>({ nonce: 0 })
  const legal = useLegalRoute()

  // Coming back from a legal page to an in-page anchor (#devis, #annuaire…)
  useEffect(() => {
    if (!legal && window.location.hash.length > 1 && !window.location.hash.startsWith('#/')) {
      scrollTo(window.location.hash.slice(1))
    }
  }, [legal])

  const pick = (id: CategoryId) => {
    setCategory(id)
    setQuery('')
    scrollTo('annuaire')
  }
  const search = (q: string) => {
    setQuery(q)
    setCategory('all')
    scrollTo('annuaire')
  }
  const quote = (p: Provider) => {
    setPrefill((prev) => ({
      category: category !== 'all' && p.categories.includes(category) ? category : p.categories[0],
      provider: p.name,
      nonce: prev.nonce + 1,
    }))
    scrollTo('devis')
  }

  if (legal) return <Legal page={legal} />

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero onSearch={search} onPickCategory={pick} />
        <Marquee />
        <Categories onPick={pick} />
        <Directory query={query} setQuery={setQuery} category={category} setCategory={setCategory} onQuote={quote} />
        <HowItWorks />
        <QuoteForm key={prefill.nonce} prefill={prefill} />
        <Guides onPick={pick} />
        <Faq />
      </main>
      <Footer onPick={pick} />
    </MotionConfig>
  )
}
