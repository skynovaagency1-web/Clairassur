// Free-licence photos from Unsplash (https://unsplash.com/license), credited under each image.
// On the live site they are served from Cloudflare R2 by the Worker (/img/<id>?w=…, see worker/photos.ts).
// In local dev and single-file previews they come straight from Unsplash's CDN.

export type Photo = { id: string; alt: string; author: string; page: string }

export const photos = {
  home: {
    id: 'photo-1783883079427-d4274ca2b269',
    alt: 'Lumière dorée sur le sol et le canapé d’un salon',
    author: 'Jason Mayer',
    page: 'https://unsplash.com/photos/YDunhiTjOIE',
  },
  living: {
    id: 'photo-1763827513396-5917fc6c84f3',
    alt: 'Salon chaleureux avec un canapé et un coffre en bois',
    author: 'Clay Banks',
    page: 'https://unsplash.com/photos/E0pZm6b2z7A',
  },
  car: {
    id: 'photo-1763124320463-ab2669d6a662',
    alt: 'Une voiture garée sur un chemin de terre en automne',
    author: 'Alessandro Autiero',
    page: 'https://unsplash.com/photos/BA0tMKFFE1E',
  },
  family: {
    id: 'photo-1761839258568-fd466a93f68b',
    alt: 'Une famille cuisine ensemble dans une cuisine lumineuse',
    author: 'Land O’Lakes, Inc.',
    page: 'https://unsplash.com/photos/m9cBmbOQCmQ',
  },
  kitchen: {
    id: 'photo-1761839258803-21515f43190c',
    alt: 'Un grand-père et ses petits-enfants préparent le repas',
    author: 'Land O’Lakes, Inc.',
    page: 'https://unsplash.com/photos/pazs-Hi5mf8',
  },
  desk: {
    id: 'photo-1661446520690-b92b30acf318',
    alt: 'Un bureau avec une lampe dans une pièce calme',
    author: 'Alex Gruber',
    page: 'https://unsplash.com/photos/U8qutF7SED4',
  },
  moto: {
    id: 'photo-1659465493788-046d031bcd35',
    alt: 'Une moto garée sur une plage',
    author: 'Jan Kopřiva',
    page: 'https://unsplash.com/photos/Y2i5PHCeMik',
  },
  bedroom: {
    id: 'photo-1783990350684-71c38af04a8a',
    alt: 'Chambre baignée de soleil, ombres de lattes de bois',
    author: 'Ulises Ramirez',
    page: 'https://unsplash.com/photos/zwlrY92gAfw',
  },
} satisfies Record<string, Photo>

export const PHOTO_WIDTHS = [640, 1024, 1600, 2200]

// import.meta.env is set by Vite only; the Worker imports this file too.
const env = (import.meta as { env?: { DEV?: boolean; VITE_HASH_ROUTER?: string } }).env
const fromUnsplash = Boolean(env?.DEV || env?.VITE_HASH_ROUTER)

export const photoUrl = (p: Photo, w = 1600) =>
  fromUnsplash ? `https://images.unsplash.com/${p.id}?auto=format&fit=crop&w=${w}&q=72` : `/img/${p.id}?w=${w}`

export const photoSrcSet = (p: Photo) => PHOTO_WIDTHS.map((w) => `${photoUrl(p, w)} ${w}w`).join(', ')
