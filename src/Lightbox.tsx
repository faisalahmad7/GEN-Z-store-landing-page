import { useEffect, useRef, useState } from 'react'
import type { PhotoEntry } from './Photo'

// Click any photo to open it large. Esc closes, arrow keys / buttons / swipe move through the set.
// Focus moves into the dialog, Tab stays inside it, and focus returns to the photo that opened it.
type S = { list: PhotoEntry[]; i: number } | null
let set: ((s: S) => void) | null = null
export const openLightbox = (list: PhotoEntry[], i: number) => set?.({ list, i })
const big = (p: PhotoEntry) => (p.srcset ? p.srcset.split(',').pop()!.trim().split(' ')[0] : p.src)

export default function Lightbox() {
  const [s, setS] = useState<S>(null)
  const x0 = useRef(0)
  const box = useRef<HTMLDivElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  useEffect(() => { set = (v) => { if (v) opener.current = document.activeElement as HTMLElement; setS(v) }; return () => { set = null } }, [])
  const open = !!s
  useEffect(() => {
    if (!open) return
    document.documentElement.style.overflow = 'hidden'
    return () => { document.documentElement.style.overflow = ''; opener.current?.focus?.() }
  }, [open])
  useEffect(() => {
    if (!s) return
    const n = s.list.length
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setS(null)
      else if (e.key === 'ArrowRight') setS({ ...s, i: (s.i + 1) % n })
      else if (e.key === 'ArrowLeft') setS({ ...s, i: (s.i - 1 + n) % n })
      else if (e.key === 'Tab') { // keep focus inside the dialog
        const f = box.current!.querySelectorAll<HTMLElement>('button')
        const a = document.activeElement
        if (e.shiftKey && a === f[0]) { e.preventDefault(); f[f.length - 1].focus() }
        else if (!e.shiftKey && a === f[f.length - 1]) { e.preventDefault(); f[0].focus() }
      }
    }
    addEventListener('keydown', key)
    return () => removeEventListener('keydown', key)
  }, [s])
  if (!s) return null
  const n = s.list.length
  const go = (d: number) => setS({ ...s, i: (s.i + d + n) % n })
  const p = s.list[s.i]
  return (
    <div className="lb" ref={box} role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setS(null)}
      onTouchStart={(e) => { x0.current = e.touches[0].clientX }}
      onTouchEnd={(e) => { const d = e.changedTouches[0].clientX - x0.current; if (n > 1 && Math.abs(d) > 50) go(d < 0 ? 1 : -1) }}>
      <img key={big(p)} src={big(p)} alt={`GEN-Z photo ${s.i + 1} of ${n}, enlarged`} style={p.c ? { backgroundColor: p.c } : undefined} onClick={(e) => e.stopPropagation()} />
      <button type="button" className="lb-x" aria-label="Close photo viewer" autoFocus onClick={() => setS(null)}>✕</button>
      {n > 1 && <>
        <button type="button" className="lb-n lb-l" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); go(-1) }}>‹</button>
        <button type="button" className="lb-n lb-r" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); go(1) }}>›</button>
        <p className="lb-c" aria-live="polite">{s.i + 1} / {n}</p>
      </>}
    </div>
  )
}
