import { brevo, clean, escapeHtml, isEmail, json, type Ctx } from './_brevo'

const SUBJECTS: Record<string, string> = {
  question: 'Question',
  referencement: 'Référencement d’un assureur',
  partenariat: 'Partenariat',
  donnees: 'Données personnelles',
  autre: 'Autre',
}

export async function onRequestPost({ request, env }: Ctx) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'Requête invalide.' }, 400)
  }
  if (clean(body.website)) return json({ ok: true })

  const name = clean(body.name, 120)
  const email = clean(body.email, 254)
  const subject = SUBJECTS[clean(body.subject, 30)] ?? SUBJECTS.autre
  const message = clean(body.message, 4000)

  if (!name) return json({ ok: false, error: 'Indiquez votre nom.' }, 400)
  if (!isEmail(email)) return json({ ok: false, error: 'Adresse e-mail invalide.' }, 400)
  if (message.length < 10) return json({ ok: false, error: 'Votre message est trop court.' }, 400)

  const to = env.CONTACT_TO_EMAIL || env.LEAD_TO_EMAIL
  if (!env.BREVO_API_KEY || !to || !env.SENDER_EMAIL) {
    console.error('contact: missing BREVO_API_KEY, CONTACT_TO_EMAIL/LEAD_TO_EMAIL or SENDER_EMAIL')
    return json({ ok: false, error: 'Service momentanément indisponible.' }, 503)
  }

  try {
    await brevo(env, '/smtp/email', {
      sender: { name: 'Clairassur', email: env.SENDER_EMAIL },
      to: [{ email: to }],
      replyTo: { email, name },
      subject: `Contact · ${subject} · ${name}`,
      htmlContent: `<p><b>${escapeHtml(name)}</b> &lt;${escapeHtml(email)}&gt;</p><p><b>Sujet :</b> ${escapeHtml(subject)}</p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    })
  } catch (e) {
    console.error(e)
    return json({ ok: false, error: 'Envoi impossible pour le moment. Réessayez plus tard.' }, 502)
  }
  return json({ ok: true })
}
