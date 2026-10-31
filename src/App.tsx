import { MotionConfig } from 'motion/react'
import { useState } from 'react'
import { Categories, Marquee } from './components/Categories'
import { Directory } from './components/Directory'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Faq, Footer, Guides, HowItWorks } from './components/Sections'
import type { CategoryId } from './data'

const scrollToDirectory = () =>
  requestAnimationFrame(() => document.getElementById('annuaire')?.scrollIntoView({ behavior: 'smooth' }))

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryId | 'all'>('all')

  const pick = (id: CategoryId) => {
    setCategory(id)
    setQuery('')
    scrollToDirectory()
  }
  const search = (q: string) => {
    setQuery(q)
    setCategory('all')
    scrollToDirectory()
  }

  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero onSearch={search} onPickCategory={pick} />
        <Marquee />
        <Categories onPick={pick} />
        <Directory query={query} setQuery={setQuery} category={category} setCategory={setCategory} />
        <HowItWorks />
        <Guides onPick={pick} />
        <Faq />
      </main>
      <Footer onPick={pick} />
    </MotionConfig>
  )
}
