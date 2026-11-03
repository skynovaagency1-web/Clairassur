import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router'
import './index.css'
import { AppRoutes } from './routes'

// HashRouter only for single-file previews (VITE_HASH_ROUTER=1); the real site uses clean URLs.
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter

const app = (
  <StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </StrictMode>
)

const root = document.getElementById('root')!
// Pages are prerendered at build time: hydrate them. In dev or preview, render from scratch.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
