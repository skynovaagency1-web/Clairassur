// Renders every route to static HTML after `vite build` so each page has real,
// Pages are written as /path.html: Cloudflare Pages serves them at /path (no trailing slash), matching the canonical URLs.
// indexable content, its own <title>, description, canonical and JSON-LD.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssr = join(root, 'dist-ssr')

const { render, siteRoutes, notFoundHead, SITE_URL, site } = await import(pathToFileURL(join(ssr, 'entry-server.js')).href)

let template = await readFile(join(dist, 'index.html'), 'utf8')
const { client: adClient, slot: adSlot } = site.monetize.adsense
if (adClient && adSlot) {
  template = template.replace(
    '<!--head-->',
    `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}" crossorigin="anonymous"></script>\n    <!--head-->`,
  )
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const jsonScript = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`

function page(url, head, { canonical = true } = {}) {
  const full = SITE_URL + (url === '/' ? '/' : url)
  const tags = [
    `<meta property="og:title" content="${esc(head.title)}" />`,
    `<meta property="og:description" content="${esc(head.description)}" />`,
    canonical ? `<link rel="canonical" href="${full}" />\n    <meta property="og:url" content="${full}" />` : '<meta name="robots" content="noindex" />',
    ...(head.jsonLd ?? []).map(jsonScript),
  ].join('\n    ')
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(head.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(head.description)}$2`)
    .replace('<!--head-->', tags)
    .replace('<!--app-->', render(url))
}

for (const r of siteRoutes) {
  const file = r.path === '/' ? join(dist, 'index.html') : join(dist, r.path.slice(1) + '.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, page(r.path, r.head))
}
await writeFile(join(dist, '404.html'), page('/404-page-introuvable', notFoundHead, { canonical: false }))

const today = new Date().toISOString().slice(0, 10)
const urls = siteRoutes
  .map((r) => `  <url><loc>${SITE_URL}${r.path}</loc><lastmod>${today}</lastmod><priority>${(r.priority ?? 0.5).toFixed(1)}</priority></url>`)
  .join('\n')
await writeFile(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

if (adClient) {
  // ads.txt lets AdSense confirm you own the site.
  await writeFile(join(dist, 'ads.txt'), `google.com, ${adClient.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n`)
}

await rm(ssr, { recursive: true, force: true })
console.log(`Prerendered ${siteRoutes.length} pages + 404, sitemap.xml, robots.txt`)
