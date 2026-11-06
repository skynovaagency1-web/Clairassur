import type { ReactElement } from 'react'
import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { site } from './config'
import { Legal, legalPages, type LegalPage } from './components/Legal'
import { breadcrumbJsonLd, faqJsonLd } from './lib/jsonld'
import { categoryPages } from './content/categories'
import { guidePath, guides } from './content/guides'
import { categories, faqs, providerPath, providers } from './data'
import { useHead, DEFAULT_TITLE, type Head } from './lib/head'
import { About } from './pages/About'
import { CategoryPage } from './pages/CategoryPage'
import { Contact } from './pages/Contact'
import { Devis } from './pages/Devis'
import { GuidePage, GuidesIndex } from './pages/Guides'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProviderPage } from './pages/ProviderPage'
import { Providers } from './pages/Providers'

export type SiteRoute = { path: string; head: Head; element: ReactElement; priority?: number }

const t = (s: string) => `${s} · Clairesoassur`

/** Every page of the site. Used both by the router and by the prerender step. */
export const siteRoutes: SiteRoute[] = [
  {
    path: '/',
    priority: 1,
    head: {
      title: DEFAULT_TITLE,
      description:
        'Clairesoassur vous aide à découvrir et comparer les assureurs en France : auto, habitation, santé, vie, moto et professionnelle, présentés simplement.',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Clairesoassur',
          url: `${site.url}/`,
          inLanguage: 'fr-FR',
        },
        faqJsonLd(faqs),
      ],
    },
    element: <Home />,
  },
  ...categories.map((c) => {
    const page = categoryPages[c.id]
    const path = `/${page.slug}`
    return {
      path,
      priority: 0.9,
      head: {
        title: t(page.metaTitle),
        description: page.metaDescription,
        jsonLd: [breadcrumbJsonLd([{ label: page.title, path }]), faqJsonLd(page.faq)],
      },
      element: <CategoryPage id={c.id} />,
    }
  }),
  {
    path: '/assureurs',
    priority: 0.8,
    head: {
      title: t('Tous les assureurs en France : annuaire'),
      description: `Annuaire de ${providers.length} assureurs, mutuelles et néo-assureurs en France, à filtrer par type d’assurance.`,
      jsonLd: [breadcrumbJsonLd([{ label: 'Assureurs', path: '/assureurs' }])],
    },
    element: <Providers />,
  },
  ...providers.map((p) => {
    const path = providerPath(p)
    return {
      path,
      priority: 0.6,
      head: {
        title: t(`${p.name} : assurances proposées et avis pratique`),
        description: `${p.name} (${p.kind.toLowerCase()}) : ${p.pitch} Les assurances proposées et l’essentiel avant de souscrire.`,
        jsonLd: [
          breadcrumbJsonLd([
            { label: 'Assureurs', path: '/assureurs' },
            { label: p.name, path },
          ]),
        ],
      },
      element: <ProviderPage p={p} />,
    }
  }),
  {
    path: '/guides',
    priority: 0.7,
    head: {
      title: t('Guides assurance : repères simples par situation'),
      description: 'Jeune conducteur, locataire, freelance, famille, motard, épargnant : des guides courts pour choisir son assurance.',
      jsonLd: [breadcrumbJsonLd([{ label: 'Guides', path: '/guides' }])],
    },
    element: <GuidesIndex />,
  },
  ...guides.map((g) => {
    const path = guidePath(g)
    return {
      path,
      priority: 0.7,
      head: {
        title: t(g.title),
        description: g.metaDescription,
        jsonLd: [
          breadcrumbJsonLd([
            { label: 'Guides', path: '/guides' },
            { label: g.title, path },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: g.title,
            description: g.metaDescription,
            inLanguage: 'fr-FR',
            publisher: { '@type': 'Organization', name: 'Clairesoassur' },
          },
        ],
      },
      element: <GuidePage g={g} />,
    }
  }),
  {
    path: '/devis',
    priority: 0.8,
    head: {
      title: t('Devis assurance gratuit et sans engagement'),
      description: 'Décrivez votre besoin en une minute : un conseiller partenaire vous recontacte avec des devis adaptés. Gratuit.',
    },
    element: <Devis />,
  },
  {
    path: '/contact',
    priority: 0.4,
    head: { title: t('Contact'), description: 'Contactez Clairesoassur : question, référencement d’un assureur ou partenariat.' },
    element: <Contact />,
  },
  {
    path: '/a-propos',
    priority: 0.4,
    head: {
      title: t('À propos'),
      description: 'Clairesoassur, un annuaire indépendant et calme pour comprendre et choisir son assurance en France.',
    },
    element: <About />,
  },
  ...(Object.keys(legalPages) as LegalPage[]).map((k) => ({
    path: `/${k}`,
    priority: 0.2,
    head: { title: t(legalPages[k]), description: `${legalPages[k]} du site Clairesoassur.` },
    element: <Legal page={k} />,
  })),
]

export const notFoundHead: Head = { title: t('Page introuvable'), description: 'Cette page n’existe pas.' }

function Page({ head, children }: { head: Head; children: ReactElement }) {
  useHead(head)
  return children
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {siteRoutes.map((r) => (
          <Route key={r.path} path={r.path} element={<Page head={r.head}>{r.element}</Page>} />
        ))}
        <Route path="*" element={<Page head={notFoundHead}><NotFound /></Page>} />
      </Route>
    </Routes>
  )
}
