import { addContact, brevo, clean, escapeHtml, isEmail, json, type Ctx } from './_brevo'

const CATEGORIES: Record<string, string> = {
  auto: 'Assurance auto',
  habitation: 'Assurance habitation',
  sante: 'Mutuelle santé',
  vie: 'Assurance vie',
  moto: 'Assurance moto',
  pro: 'Assurance professionnelle',
}

export async function onRequestPost({ request, env }: Ctx) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, error: 'Requête invalide.' }, 400)
  }

  // Honeypot: bots fill every field, people never see this one.
  if (clean(body.website)) return json({ ok: true })

  const lead = {
    category: clean(body.category, 20),
    firstName: clean(body.firstName, 80),
    lastName: clean(body.lastName, 80),
    email: clean(body.email, 254),
    phone: clean(body.phone, 30),
    postcode: clean(body.postcode, 10),
    message: clean(body.message, 2000),
    provider: clean(body.provider, 80),
  }

  if (!CATEGORIES[lead.category]) return json({ ok: false, error: 'Choisissez un type d’assurance.' }, 400)
  if (!lead.firstName) return json({ ok: false, error: 'Indiquez votre prénom.' }, 400)
  if (!isEmail(lead.email)) return json({ ok: false, error: 'Adresse e-mail invalide.' }, 400)
  if (!/^\d{5}$/.test(lead.postcode)) return json({ ok: false, error: 'Code postal invalide.' }, 400)
  if (body.consent !== true) return json({ ok: false, error: 'Merci d’accepter d’être recontacté·e.' }, 400)

  if (!env.BREVO_API_KEY || !env.LEAD_TO_EMAIL || !env.SENDER_EMAIL) {
    console.error('lead: missing BREVO_API_KEY, LEAD_TO_EMAIL or SENDER_EMAIL')
    return json({ ok: false, error: 'Service momentanément indisponible.' }, 503)
  }

  const rows: [string, string][] = [
    ['Assurance', CATEGORIES[lead.category]],
    ['Assureur consulté', lead.provider || '—'],
    ['Prénom', lead.firstName],
    ['Nom', lead.lastName || '—'],
    ['E-mail', lead.email],
    ['Téléphone', lead.phone || '—'],
    ['Code postal', lead.postcode],
    ['Message', lead.message || '—'],
    ['Consentement', `Oui, le ${new Date().toISOString()}`],
  ]

  try {
    await brevo(env, '/smtp/email', {
      sender: { name: 'Clairassur', email: env.SENDER_EMAIL },
      to: [{ email: env.LEAD_TO_EMAIL }],
      replyTo: { email: lead.email, name: `${lead.firstName} ${lead.lastName}`.trim() },
      subject: `Nouvelle demande de devis · ${CATEGORIES[lead.category]} · ${lead.postcode}`,
      htmlContent: `<h2>Nouvelle demande de devis</h2><table cellpadding="6">${rows
        .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`)
        .join('')}</table>`,
    })
  } catch (e) {
    console.error(e)
    return json({ ok: false, error: 'Envoi impossible pour le moment. Réessayez plus tard.' }, 502)
  }

  // Keeping a copy in Brevo is a bonus: the lead is already in your inbox, so don't fail on it.
  try {
    await addContact(env, lead.email, env.BREVO_LEADS_LIST_ID, { PRENOM: lead.firstName, NOM: lead.lastName })
  } catch (e) {
    console.error(e)
  }

  return json({ ok: true })
}
