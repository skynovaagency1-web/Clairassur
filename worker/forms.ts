// Form endpoints. Every submission is saved in D1 first, so nothing is lost
// even if e-mail is not set up. E-mail through Brevo is an optional extra.
import { addContact, canEmail, clean, escapeHtml, isEmail, json, readJson, sendEmail, type Env } from './lib'

export const CATEGORIES: Record<string, string> = {
  auto: 'Assurance auto',
  habitation: 'Assurance habitation',
  sante: 'Mutuelle santé',
  vie: 'Assurance vie',
  moto: 'Assurance moto',
  pro: 'Assurance professionnelle',
}

export const SUBJECTS: Record<string, string> = {
  question: 'Question',
  referencement: 'Référencement d’un assureur',
  partenariat: 'Partenariat',
  donnees: 'Données personnelles',
  autre: 'Autre',
}

const invalid = () => json({ ok: false, error: 'Requête invalide.' }, 400)
const saveFailed = () => json({ ok: false, error: 'Envoi impossible pour le moment. Réessayez plus tard.' }, 502)

export async function lead(request: Request, env: Env, ctx: ExecutionContext) {
  const body = await readJson(request)
  if (!body) return invalid()
  // Honeypot: bots fill every field, people never see this one.
  if (clean(body.website)) return json({ ok: true })

  const l = {
    category: clean(body.category, 20),
    firstName: clean(body.firstName, 80),
    lastName: clean(body.lastName, 80),
    email: clean(body.email, 254),
    phone: clean(body.phone, 30),
    postcode: clean(body.postcode, 10),
    message: clean(body.message, 2000),
    provider: clean(body.provider, 80),
  }
  if (!CATEGORIES[l.category]) return json({ ok: false, error: 'Choisissez un type d’assurance.' }, 400)
  if (!l.firstName) return json({ ok: false, error: 'Indiquez votre prénom.' }, 400)
  if (!isEmail(l.email)) return json({ ok: false, error: 'Adresse e-mail invalide.' }, 400)
  if (!/^\d{5}$/.test(l.postcode)) return json({ ok: false, error: 'Code postal invalide.' }, 400)
  if (body.consent !== true) return json({ ok: false, error: 'Merci d’accepter d’être recontacté·e.' }, 400)

  const consentAt = new Date().toISOString()
  let id: number
  try {
    const row = await env.DB.prepare(
      `INSERT INTO leads (category, provider, first_name, last_name, email, phone, postcode, message, consent_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id`,
    )
      .bind(l.category, l.provider || null, l.firstName, l.lastName || null, l.email, l.phone || null, l.postcode, l.message || null, consentAt)
      .first<{ id: number }>()
    id = row!.id
  } catch (e) {
    console.error('lead: D1 insert failed', e)
    return saveFailed()
  }

  // The lead is saved: e-mail and the Brevo copy run after the response, and never fail the request.
  ctx.waitUntil(
    (async () => {
      if (canEmail(env, env.LEAD_TO_EMAIL)) {
        const rows: [string, string][] = [
          ['Assurance', CATEGORIES[l.category]],
          ['Assureur consulté', l.provider || '—'],
          ['Prénom', l.firstName],
          ['Nom', l.lastName || '—'],
          ['E-mail', l.email],
          ['Téléphone', l.phone || '—'],
          ['Code postal', l.postcode],
          ['Message', l.message || '—'],
          ['Consentement', `Oui, le ${consentAt}`],
        ]
        try {
          await sendEmail(
            env,
            env.LEAD_TO_EMAIL!,
            { email: l.email, name: `${l.firstName} ${l.lastName}`.trim() },
            `Nouvelle demande de devis · ${CATEGORIES[l.category]} · ${l.postcode}`,
            `<h2>Nouvelle demande de devis n° ${id}</h2><table cellpadding="6">${rows
              .map(([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`)
              .join('')}</table>`,
          )
          await env.DB.prepare('UPDATE leads SET emailed = 1 WHERE id = ?').bind(id).run()
        } catch (e) {
          console.error('lead: e-mail failed', e)
        }
      }
      try {
        await addContact(env, l.email, env.BREVO_LEADS_LIST_ID, { PRENOM: l.firstName, NOM: l.lastName })
      } catch (e) {
        console.error('lead: Brevo contact failed', e)
      }
    })(),
  )
  return json({ ok: true })
}

export async function contact(request: Request, env: Env, ctx: ExecutionContext) {
  const body = await readJson(request)
  if (!body) return invalid()
  if (clean(body.website)) return json({ ok: true })

  const name = clean(body.name, 120)
  const email = clean(body.email, 254)
  const subject = SUBJECTS[clean(body.subject, 30)] ?? SUBJECTS.autre
  const message = clean(body.message, 4000)
  if (!name) return json({ ok: false, error: 'Indiquez votre nom.' }, 400)
  if (!isEmail(email)) return json({ ok: false, error: 'Adresse e-mail invalide.' }, 400)
  if (message.length < 10) return json({ ok: false, error: 'Votre message est trop court.' }, 400)

  let id: number
  try {
    const row = await env.DB.prepare('INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?) RETURNING id')
      .bind(name, email, subject, message)
      .first<{ id: number }>()
    id = row!.id
  } catch (e) {
    console.error('contact: D1 insert failed', e)
    return saveFailed()
  }

  const to = env.CONTACT_TO_EMAIL || env.LEAD_TO_EMAIL
  if (canEmail(env, to)) {
    ctx.waitUntil(
      sendEmail(
        env,
        to!,
        { email, name },
        `Contact · ${subject} · ${name}`,
        `<p><b>${escapeHtml(name)}</b> &lt;${escapeHtml(email)}&gt;</p><p><b>Sujet :</b> ${escapeHtml(subject)}</p><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
      )
        .then(() => env.DB.prepare('UPDATE messages SET emailed = 1 WHERE id = ?').bind(id).run())
        .catch((e) => console.error('contact: e-mail failed', e)),
    )
  }
  return json({ ok: true })
}

export async function newsletter(request: Request, env: Env, ctx: ExecutionContext) {
  const body = await readJson(request)
  if (!body) return invalid()
  if (clean(body.website)) return json({ ok: true })

  const email = clean(body.email, 254).toLowerCase()
  if (!isEmail(email)) return json({ ok: false, error: 'Adresse e-mail invalide.' }, 400)
  try {
    await env.DB.prepare('INSERT OR IGNORE INTO subscribers (email) VALUES (?)').bind(email).run()
  } catch (e) {
    console.error('newsletter: D1 insert failed', e)
    return json({ ok: false, error: 'Inscription impossible pour le moment.' }, 502)
  }
  ctx.waitUntil(addContact(env, email, env.BREVO_NEWSLETTER_LIST_ID).catch((e) => console.error('newsletter: Brevo failed', e)))
  return json({ ok: true })
}
