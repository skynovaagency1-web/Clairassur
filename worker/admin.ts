// /admin: a small private inbox for leads, contact messages and newsletter sign-ups.
// Protected by HTTP Basic auth: user "admin", password = the ADMIN_PASSWORD secret.
import { CATEGORIES } from './forms'
import { escapeHtml as h, type Env } from './lib'

const TABLES = {
  leads: { label: 'Demandes de devis', cols: ['id', 'created_at', 'category', 'provider', 'first_name', 'last_name', 'email', 'phone', 'postcode', 'message', 'consent_at', 'status', 'emailed'] },
  messages: { label: 'Messages', cols: ['id', 'created_at', 'name', 'email', 'subject', 'message', 'status', 'emailed'] },
  subscribers: { label: 'Newsletter', cols: ['email', 'created_at'] },
} as const
type Table = keyof typeof TABLES
const STATUSES = ['nouveau', 'contacte', 'clos'] as const
const isTable = (t: string | null): t is Table => !!t && t in TABLES

function timingSafeEqual(a: string, b: string) {
  const x = new TextEncoder().encode(a)
  const y = new TextEncoder().encode(b)
  let diff = x.length ^ y.length
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0)
  return diff === 0
}

function authorized(request: Request, env: Env) {
  if (!env.ADMIN_PASSWORD) return false
  const header = request.headers.get('authorization') ?? ''
  if (!header.startsWith('Basic ')) return false
  let decoded = ''
  try {
    decoded = atob(header.slice(6))
  } catch {
    return false
  }
  const i = decoded.indexOf(':')
  return decoded.slice(0, i) === 'admin' && timingSafeEqual(decoded.slice(i + 1), env.ADMIN_PASSWORD)
}

const noStore = { 'cache-control': 'no-store', 'x-robots-tag': 'noindex', 'x-frame-options': 'DENY' }

export async function admin(request: Request, env: Env, url: URL) {
  if (!env.ADMIN_PASSWORD) return new Response('Admin désactivé : ajoutez le secret ADMIN_PASSWORD dans Cloudflare.', { status: 503, headers: noStore })
  if (!authorized(request, env))
    return new Response('Identifiants requis.', { status: 401, headers: { ...noStore, 'www-authenticate': 'Basic realm="Clairesoassur admin", charset="UTF-8"' } })

  if (request.method === 'POST') {
    // Basic auth is sent automatically by the browser, so refuse forms posted from other sites.
    if (request.headers.get('origin') !== url.origin) return new Response('Origine refusée.', { status: 403, headers: noStore })
    const f = await request.formData()
    const table = String(f.get('table'))
    const action = url.pathname
    if (action === '/admin/status' && (table === 'leads' || table === 'messages')) {
      const status = String(f.get('status'))
      if ((STATUSES as readonly string[]).includes(status))
        await env.DB.prepare(`UPDATE ${table} SET status = ? WHERE id = ?`).bind(status, Number(f.get('id'))).run()
    } else if (action === '/admin/delete' && isTable(table)) {
      // Used for RGPD erasure requests.
      if (table === 'subscribers') await env.DB.prepare('DELETE FROM subscribers WHERE email = ?').bind(String(f.get('email'))).run()
      else await env.DB.prepare(`DELETE FROM ${table} WHERE id = ?`).bind(Number(f.get('id'))).run()
    }
    return Response.redirect(`${url.origin}/admin?t=${isTable(table) ? table : 'leads'}`, 303)
  }

  const exportMatch = url.pathname.match(/^\/admin\/export\/(\w+)\.csv$/)
  if (exportMatch && isTable(exportMatch[1])) return exportCsv(env, exportMatch[1])
  if (url.pathname !== '/admin') return new Response('Not found', { status: 404, headers: noStore })

  const t = url.searchParams.get('t')
  const table: Table = isTable(t) ? t : 'leads'
  const q = (url.searchParams.get('q') ?? '').trim()
  return new Response(await page(env, table, q), { headers: { ...noStore, 'content-type': 'text/html; charset=utf-8' } })
}

async function exportCsv(env: Env, table: Table) {
  const { results } = await env.DB.prepare(`SELECT ${TABLES[table].cols.join(', ')} FROM ${table} ORDER BY created_at DESC`).all<Record<string, unknown>>()
  const cell = (v: unknown) => {
    let s = v == null ? '' : String(v)
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}` // stop spreadsheet formulas
    return `"${s.replace(/"/g, '""')}"`
  }
  const csv = [TABLES[table].cols.join(';'), ...results.map((r) => TABLES[table].cols.map((c) => cell(r[c])).join(';'))].join('\r\n')
  return new Response('﻿' + csv, {
    headers: { ...noStore, 'content-type': 'text/csv; charset=utf-8', 'content-disposition': `attachment; filename="clairesoassur-${table}-${new Date().toISOString().slice(0, 10)}.csv"` },
  })
}

async function page(env: Env, table: Table, q: string) {
  const counts = await env.DB.batch([
    env.DB.prepare(`SELECT COUNT(*) AS n FROM leads WHERE status = 'nouveau'`),
    env.DB.prepare(`SELECT COUNT(*) AS n FROM messages WHERE status = 'nouveau'`),
    env.DB.prepare('SELECT COUNT(*) AS n FROM subscribers'),
  ])
  const n = counts.map((c) => (c.results[0] as { n: number }).n)

  const like = `%${q}%`
  const where =
    table === 'leads'
      ? 'WHERE email LIKE ?1 OR first_name LIKE ?1 OR last_name LIKE ?1 OR postcode LIKE ?1'
      : table === 'messages'
        ? 'WHERE email LIKE ?1 OR name LIKE ?1 OR message LIKE ?1'
        : 'WHERE email LIKE ?1'
  const { results } = await env.DB.prepare(`SELECT * FROM ${table} ${q ? where : ''} ORDER BY created_at DESC LIMIT 200`)
    .bind(...(q ? [like] : []))
    .all<Record<string, string | number | null>>()

  const tabs = (Object.keys(TABLES) as Table[])
    .map((k, i) => `<a href="/admin?t=${k}" class="tab${k === table ? ' on' : ''}">${TABLES[k].label}${n[i] ? ` <b>${n[i]}</b>` : ''}</a>`)
    .join('')

  const del = (key: string, value: string | number) =>
    `<form method="post" action="/admin/delete" onsubmit="return confirm('Supprimer définitivement ?')"><input type="hidden" name="table" value="${table}"><input type="hidden" name="${key}" value="${h(String(value))}"><button class="del">Supprimer</button></form>`
  const status = (r: Record<string, unknown>) =>
    `<form method="post" action="/admin/status"><input type="hidden" name="table" value="${table}"><input type="hidden" name="id" value="${r.id}"><select name="status" onchange="this.form.submit()">${STATUSES.map((s) => `<option${s === r.status ? ' selected' : ''}>${s}</option>`).join('')}</select></form>`
  const v = (x: unknown) => h(x == null ? '' : String(x))
  const date = (x: unknown) => v(String(x ?? '').slice(0, 16).replace('T', ' '))

  const rows = results
    .map((r) => {
      if (table === 'leads')
        return `<tr class="${r.status}"><td>${date(r.created_at)}</td><td>${v(CATEGORIES[String(r.category)] ?? r.category)}${r.provider ? `<small>${v(r.provider)}</small>` : ''}</td><td>${v(r.first_name)} ${v(r.last_name)}</td><td><a href="mailto:${v(r.email)}">${v(r.email)}</a>${r.phone ? `<small><a href="tel:${v(r.phone)}">${v(r.phone)}</a></small>` : ''}</td><td>${v(r.postcode)}</td><td class="msg">${v(r.message)}</td><td>${status(r)}</td><td>${del('id', r.id!)}</td></tr>`
      if (table === 'messages')
        return `<tr class="${r.status}"><td>${date(r.created_at)}</td><td>${v(r.subject)}</td><td>${v(r.name)}</td><td><a href="mailto:${v(r.email)}">${v(r.email)}</a></td><td class="msg">${v(r.message)}</td><td>${status(r)}</td><td>${del('id', r.id!)}</td></tr>`
      return `<tr><td>${date(r.created_at)}</td><td>${v(r.email)}</td><td>${del('email', r.email!)}</td></tr>`
    })
    .join('')
  const head =
    table === 'leads'
      ? ['Date', 'Assurance', 'Nom', 'Contact', 'CP', 'Message', 'Statut', '']
      : table === 'messages'
        ? ['Date', 'Sujet', 'Nom', 'E-mail', 'Message', 'Statut', '']
        : ['Date', 'E-mail', '']

  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Admin · Clairesoassur</title>
<style>
:root{--ink:#2b2622;--muted:#7a6f66;--bg:#f4efea;--card:#fffdfb;--line:#e6ddd4;--accent:#5b5a3c}
*{box-sizing:border-box}body{margin:0;font:15px/1.45 system-ui,sans-serif;color:var(--ink);background:var(--bg)}
header{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;padding:20px 24px}
h1{font:500 26px Georgia,serif;margin:0}nav{display:flex;flex-wrap:wrap;gap:8px}
.tab{padding:8px 14px;border-radius:99px;background:var(--card);border:1px solid var(--line);color:inherit;text-decoration:none}
.tab.on{background:var(--accent);color:#fff;border-color:var(--accent)}.tab b{background:#c0563f;color:#fff;border-radius:99px;padding:0 7px;font-size:12px;margin-left:4px}
.bar{display:flex;flex-wrap:wrap;gap:8px;padding:0 24px 16px}.bar input{flex:1;min-width:200px;padding:9px 12px;border:1px solid var(--line);border-radius:10px}
.bar button,.bar a{padding:9px 14px;border-radius:10px;border:1px solid var(--line);background:var(--card);color:inherit;text-decoration:none;cursor:pointer}
.wrap{overflow-x:auto;margin:0 24px 32px;background:var(--card);border:1px solid var(--line);border-radius:14px}
table{border-collapse:collapse;width:100%;min-width:760px}th,td{padding:10px 12px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}
th{font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}small{display:block;color:var(--muted)}
td.msg{max-width:340px;white-space:pre-wrap}tr.nouveau td:first-child{box-shadow:inset 3px 0 #c0563f}tr.clos{opacity:.55}
form{margin:0}select{padding:4px 6px;border-radius:8px;border:1px solid var(--line)}.del{border:0;background:none;color:#a33;cursor:pointer;padding:0}
.empty{padding:40px;text-align:center;color:var(--muted)}
</style></head><body>
<header><h1>Clairesoassur · admin</h1><nav>${tabs}</nav></header>
<form class="bar" method="get" action="/admin"><input type="hidden" name="t" value="${table}"><input name="q" value="${h(q)}" placeholder="Rechercher (e-mail, nom, code postal…)"><button>Rechercher</button><a href="/admin/export/${table}.csv">Exporter en CSV</a></form>
<div class="wrap">${results.length ? `<table><thead><tr>${head.map((x) => `<th>${x}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>` : '<p class="empty">Rien pour le moment.</p>'}</div>
</body></html>`
}
