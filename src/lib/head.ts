import { site } from '../config'
import { useEffect } from 'react'

export type Head = {
  title: string
  description: string
  /** Extra JSON-LD objects for this page. */
  jsonLd?: object[]
}

export const SITE_URL = site.url
export const DEFAULT_TITLE = 'Clairesoassur · L’annuaire de l’assurance en France'

/** Keeps the title and description in sync during client-side navigation.
 *  The prerender step writes the same values into each page's static HTML. */
export function useHead({ title, description }: Head) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
