// Serves the site photos from R2. The first request for a photo/size copies it
// from Unsplash into the bucket; every later request is served by Cloudflare only.
import { PHOTO_WIDTHS, photos } from '../src/content/photos'
import type { Env } from './lib'

const ids = new Set(Object.values(photos).map((p) => p.id))
const headers = { 'content-type': 'image/webp', 'cache-control': 'public, max-age=31536000, immutable' }

export async function photo(url: URL, env: Env) {
  const id = url.pathname.slice('/img/'.length)
  const w = Number(url.searchParams.get('w') ?? 1600)
  if (!ids.has(id) || !PHOTO_WIDTHS.includes(w)) return new Response('Not found', { status: 404 })

  const key = `${id}-${w}.webp`
  const stored = await env.PHOTOS.get(key)
  if (stored) return new Response(stored.body, { headers: { ...headers, etag: stored.httpEtag } })

  const source = `https://images.unsplash.com/${id}?auto=format&fm=webp&fit=crop&w=${w}&q=72`
  try {
    const res = await fetch(source)
    if (!res.ok) throw new Error(`Unsplash ${res.status}`)
    const bytes = await res.arrayBuffer()
    await env.PHOTOS.put(key, bytes, { httpMetadata: { contentType: 'image/webp' } })
    return new Response(bytes, { headers })
  } catch (e) {
    // Never show a broken image: send the visitor to the original while the copy is retried next time.
    console.error('photo: copy to R2 failed', e)
    return Response.redirect(source, 302)
  }
}
