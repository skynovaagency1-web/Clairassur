import { addContact, clean, isEmail, json, type Ctx } from './_brevo'

export async function onRequestPost({ request, env }: Ctx) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'Requête invalide.' }, 400)
  }
  if (clean(body.website)) return json({ ok: true })

  const email = clean(body.email, 254)
  if (!isEmail(email)) return json({ ok: false, error: 'Adresse e-mail invalide.' }, 400)

  if (!env.BREVO_API_KEY || !env.BREVO_NEWSLETTER_LIST_ID) {
    console.error('newsletter: missing BREVO_API_KEY or BREVO_NEWSLETTER_LIST_ID')
    return json({ ok: false, error: 'Service momentanément indisponible.' }, 503)
  }
  try {
    await addContact(env, email, env.BREVO_NEWSLETTER_LIST_ID)
  } catch (e) {
    console.error(e)
    return json({ ok: false, error: 'Inscription impossible pour le moment.' }, 502)
  }
  return json({ ok: true })
}
