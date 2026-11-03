import { site } from '../config'
import type { CategoryId } from '../data'

/** The affiliate link for an insurance type, or the default one, or '' if none is set. */
export function affiliateUrl(category?: CategoryId) {
  const a = site.monetize.affiliate
  return (category && a[category]) || a.default || ''
}

/** Where a "Devis gratuit" button goes: the affiliate partner if set, else the built-in quote page. */
export function quoteHref(category?: CategoryId, provider?: string) {
  const url = affiliateUrl(category)
  if (url) return url
  const q = new URLSearchParams()
  if (category) q.set('type', category)
  if (provider) q.set('assureur', provider)
  const qs = q.toString()
  return `/devis${qs ? `?${qs}` : ''}`
}

export const adsEnabled = () => Boolean(site.monetize.adsense.client && site.monetize.adsense.slot)
