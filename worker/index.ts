// Clairassur Worker. Static pages come from dist/ (prerendered at build time);
// only /api/*, /admin and /img/* reach this code (see run_worker_first in wrangler.jsonc).
import { admin } from './admin'
import { contact, lead, newsletter } from './forms'
import { json, type Env } from './lib'
import { photo } from './photos'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const { pathname } = url

    if (pathname.startsWith('/api/')) {
      if (request.method !== 'POST') return json({ ok: false, error: 'Méthode non autorisée.' }, 405)
      if (pathname === '/api/lead') return lead(request, env, ctx)
      if (pathname === '/api/contact') return contact(request, env, ctx)
      if (pathname === '/api/newsletter') return newsletter(request, env, ctx)
      return json({ ok: false, error: 'Introuvable.' }, 404)
    }
    if (pathname === '/admin' || pathname.startsWith('/admin/')) return admin(request, env, url)
    if (pathname.startsWith('/img/') && request.method === 'GET') return photo(url, env)
    return env.ASSETS.fetch(request)
  },

  // Daily: delete leads and messages older than 3 years, as promised in the privacy policy.
  async scheduled(_event, env) {
    await env.DB.batch([
      env.DB.prepare(`DELETE FROM leads WHERE created_at < datetime('now', '-3 years')`),
      env.DB.prepare(`DELETE FROM messages WHERE created_at < datetime('now', '-3 years')`),
    ])
  },
} satisfies ExportedHandler<Env>
