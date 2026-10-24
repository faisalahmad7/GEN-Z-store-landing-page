import type { KeyboardEvent } from 'react'
import { PICKS, type Cat } from './data'
import photos from './photos.json'
import { openLightbox } from './Lightbox'

// Resize-only WebP from scripts/make-images.mjs. Every photo keeps its full frame; w/h are its real size,
// so the browser reserves the exact box (no layout shift) and nothing is cropped.
// o = orientation (p portrait, l landscape, s square), c = average colour (shown while the photo loads).
export type PhotoEntry = { src: string; srcset: string; w: number; h: number; o?: 'p' | 'l' | 's'; c?: string }
const lib = photos as unknown as Record<string, PhotoEntry[]>
export const photosFor = (c: Cat | 'shop' | 'hero' | 'extra') => lib[c] ?? []

// Round-robin across the four categories (so a strip shows a mix), then the store and any extra photos: every photo appears.
export function mixed(): PhotoEntry[] {
  const lists = (['clothing', 'footwear', 'accessories', 'perfumes'] as const).map(photosFor)
  const out: PhotoEntry[] = []
  for (let i = 0; i < Math.max(0, ...lists.map((l) => l.length)); i++) for (const l of lists) if (l[i]) out.push(l[i])
  return [...out, ...photosFor('shop'), ...photosFor('extra')]
}
export const idOf = (p: PhotoEntry) => p.src.split('/').pop()!.replace(/-\d+\.webp$/, '')
// The room's hand-picked lead photos (PICKS), topped up with the best remaining portraits if an id is missing.
export function picks(c: Cat, n = 3): PhotoEntry[] {
  const all = photosFor(c)
  const pinned = PICKS[c].map((id) => all.find((p) => idOf(p) === id)).filter((p): p is PhotoEntry => !!p)
  return [...pinned, ...portraits(all.filter((p) => !pinned.includes(p)), n)].slice(0, n)
}
export const byId = (id: string) => [...photosFor('accessories'), ...photosFor('perfumes'), ...photosFor('shop')].find((p) => idOf(p) === id)
// Best photos first, portraits ahead of the rest (they suit tall slots).
export const portraits = (l: PhotoEntry[], n: number) => [...l.filter((p) => p.o === 'p'), ...l.filter((p) => p.o !== 'p')].slice(0, n)

// gallery = the set this photo belongs to; passing it makes the photo clickable (opens the viewer at this photo).
export function Photo({ p, alt, eager, sizes = '(min-width: 800px) 33vw, 50vw', gallery }: { p: PhotoEntry; alt: string; eager?: boolean; sizes?: string; gallery?: PhotoEntry[] }) {
  const open = () => openLightbox(gallery!, Math.max(0, gallery!.indexOf(p)))
  const zoom = gallery ? { onClick: open, onKeyDown: (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open() } }, role: 'button', tabIndex: 0, 'data-cursor': 'VIEW', className: 'zoomable' } : {}
  return (
    <img src={p.src} srcSet={p.srcset || undefined} sizes={p.srcset ? sizes : undefined} width={p.w} height={p.h} alt={alt} style={p.c ? { backgroundColor: p.c } : undefined}
      loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" {...zoom} />
  )
}
