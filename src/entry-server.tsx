import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { AppRoutes, notFoundHead, siteRoutes } from './routes'

export { siteRoutes, notFoundHead }
export { site } from './config'
export { SITE_URL } from "./lib/head"

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
}
