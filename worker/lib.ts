// Shared helpers for the Clairassur Worker.

export type Env = {
  ASSETS: Fetcher
  DB: D1Database
  PHOTOS: R2Bucket
  /** Password for /admin (user name: admin). Set as a secret. */
  ADMIN_PASSWORD?: string
  /** Optional: Brevo API key, to get each lead and message by e-mail too. Set as a secret. */
  BREVO_API_KEY?: string
  /** Where new quote requests are e-mailed, e.g. "leads@clairassur.com" */
  LEAD_TO_EMAIL?: string
  /** Where contact-form messages go (defaults to LEAD_TO_EMAIL) */
  CONTACT_TO_EMAIL?: string
  /** Verified Brevo sender, e.g. "no-reply@clairassur.com" */
  SENDER_EMAIL?: string
  /** Brevo list id for newsletter subscribers */
  BREVO_NEWSLETTER_LIST_ID?: string
  /** Brevo list id where leads are also stored as contacts */
  BREVO_LEADS_LIST_ID?: string
}

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  })

export const isEmail = (s: unknown): s is string =>
  typeof s === 'string' && s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export const clean = (s: unknown, max = 500) => (typeof s === 'string' ? s.trim().slice(0, max) : '')

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export const canEmail = (env: Env, to?: string) => Boolean(env.BREVO_API_KEY && env.SENDER_EMAIL && to)

export async function brevo(env: Env, path: string, body: unknown, allowDuplicate = false) {
  const res = await fetch(`https://api.brevo.com/v3${path}`, {
    method: 'POST',
    headers: { 'api-key': env.BREVO_API_KEY ?? '', 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(body),
  })
  if (res.ok) return res
  const text = await res.text()
  // An existing contact is not an error for us.
  if (allowDuplicate && res.status === 400 && text.includes('duplicate_parameter')) return res
  throw new Error(`Brevo ${path} failed: ${res.status} ${text}`)
}

export async function sendEmail(env: Env, to: string, replyTo: { email: string; name: string }, subject: string, html: string) {
  await brevo(env, '/smtp/email', {
    sender: { name: 'Clairassur', email: env.SENDER_EMAIL },
    to: [{ email: to }],
    replyTo,
    subject,
    htmlContent: html,
  })
}

export async function addContact(env: Env, email: string, listId: string | undefined, attributes: Record<string, string> = {}) {
  if (!env.BREVO_API_KEY || !listId) return
  await brevo(env, '/contacts', { email, attributes, listIds: [Number(listId)], updateEnabled: true }, true)
}

export async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  try {
    const body = await request.json()
    return body && typeof body === 'object' ? (body as Record<string, unknown>) : null
  } catch {
    return null
  }
}
