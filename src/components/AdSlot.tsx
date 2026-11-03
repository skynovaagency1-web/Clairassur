import { useEffect } from 'react'
import { site } from '../config'
import { adsEnabled } from '../lib/monetize'

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

/** A clearly labelled AdSense unit. Renders nothing until the AdSense ids are set in src/config.ts. */
export function AdSlot({ className = '' }: { className?: string }) {
  const on = adsEnabled()
  useEffect(() => {
    if (!on) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      /* ad blocked or script not loaded */
    }
  }, [on])
  if (!on) return null
  return (
    <aside aria-label="Publicité" className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>
      <div className="glass p-4 sm:p-5">
        <p className="mono mb-2 text-muted">Publicité</p>
        <ins
          className="adsbygoogle block"
          data-ad-client={site.monetize.adsense.client}
          data-ad-slot={site.monetize.adsense.slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  )
}
