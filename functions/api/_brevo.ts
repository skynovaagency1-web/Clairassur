// Shared helpers for the Cloudflare Pages Functions that talk to Brevo.
// Configure these in Cloudflare: Pages project > Settings > Variables and secrets.

export type Env = {
  BREVO_API_KEY: string
  /** Where new quote requests are emailed, e.g. "leads@clairassur.fr" */
  LEAD_TO_EMAIL: string
  /** Where contact-form messages go (defaults to LEAD_TO_EMAIL) */
  CONTACT_TO_EMAIL?: string
  /** Verified Brevo sender, e.g. "no-reply@clairassur.fr" */
  SENDER_EMAIL: string
  /** Brevo list id for newsletter subscribers */
  BREVO_NEWSLETTER_LIST_ID?: string
  /** Brevo list id where leads are also stored as contacts (optional) */
  BREVO_LEADS_LIST_ID?: string
}

export type Ctx = { request: Request; env: Env }

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })

export const isEmail = (s: unknown): s is string =>
  typeof s === 'string' && s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export const clean = (s: unknown, max = 500) =>
  typeof s === 'string' ? s.trim().slice(0, max) : ''

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export async function brevo(env: Env, path: string, body: unknown, allowDuplicate = false) {
  const res = await fetch(`https://api.brevo.com/v3${path}`, {
    method: 'POST',
    headers: {
      'api-key': env.BREVO_API_KEY,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (res.ok) return res
  const text = await res.text()
  // An existing contact is not an error for us.
  if (allowDuplicate && res.status === 400 && text.includes('duplicate_parameter')) return res
  throw new Error(`Brevo ${path} failed: ${res.status} ${text}`)
}

export async function addContact(env: Env, email: string, listId: string | undefined, attributes: Record<string, string> = {}) {
  if (!listId) return
  await brevo(env, '/contacts', {
    email,
    attributes,
    listIds: [Number(listId)],
    updateEnabled: true,
  }, true)
}
