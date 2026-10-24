import { useRef, useState, type PointerEvent } from 'react'
import { CATS } from '../data'
import { Link } from '../router'
import { Photo, photosFor, picks } from '../Photo'
import { ICONS } from '../Icons'
import { buildWaLink } from '../wa.js'
import Footer from '../Footer'
import Wiggle from '../Wiggle'
import { vars } from '../css'
import { gsap, ScrollTrigger, useFit, useMotion } from '../motion'

type C = (typeof CATS)[number]
const STICKERS = ['NEW', 'DROP', 'HOT', 'GEN-Z']
const NOTES = ['WOODY', 'FRESH', 'SWEET', 'SPICY', 'AQUATIC', 'MUSK']
const SIG: Record<C['id'], string> = {
  clothing: 'FITS ✶ LAYERS ✶ BASICS ✶ STATEMENTS ✶ ',
  footwear: 'SNEAKERS ✶ LOAFERS ✶ SLIDES ✶ SANDALS ✶ ',
  accessories: '', perfumes: '',
}

// Decorative sticker tray: drag with a finger or mouse inside the tray only (touch-action:none is on the stickers, never on the page);
// "reset" puts them back. Nothing here carries information, so it is hidden from screen readers.
function Stickers() {
  const [n, setN] = useState(0)
  const drag = useRef<{ el: HTMLElement; x: number; y: number; sx: number; sy: number } | null>(null)
  const down = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget, [x = 0, y = 0] = el.style.translate.split(' ').map(parseFloat)
    drag.current = { el, x, y, sx: e.clientX, sy: e.clientY }
    el.setPointerCapture(e.pointerId)
  }
  const move = (e: PointerEvent<HTMLElement>) => {
    const d = drag.current
    if (d) d.el.style.translate = `${d.x + e.clientX - d.sx}px ${d.y + e.clientY - d.sy}px`
  }
  const up = () => { drag.current = null }
  return (
    <div className="tray" aria-hidden="true" key={n}>
      {STICKERS.map((s, i) => <span key={s} className={'sticker s' + i} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>{s}</span>)}
      <button type="button" className="treset" tabIndex={-1} onClick={() => setN(n + 1)}>reset</button>
    </div>
  )
}

export default function Category({ cat: c }: { cat: C }) {
  const root = useRef<HTMLDivElement>(null)
  const all = photosFor(c.id)
  const lead = picks(c.id, 3)
  const rest = all.filter((p) => !lead.includes(p))
  const feature = rest.find((p) => p.o === 'l')
  const grid = rest.filter((p) => p !== feature)
  const next = CATS[(CATS.findIndex((x) => x.id === c.id) + 1) % CATS.length]
  const I = ICONS[c.id]
  const [note, setNote] = useState<string | null>(null)

  useFit(root, '.mega.word, .nw')
  useMotion(root, () => {
    const q = gsap.utils.selector(root.current!)
    const one = (s: string) => q<HTMLElement>(s)[0]
    const enter = (trigger: Element | string, start = 'top 85%') => ({ trigger, start, once: true })

    // Hero: one timeline. The word rises letter by letter, the photos land, then the line and actions arrive.
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from(q('.hero .tag'), { y: 16, opacity: 0, duration: 0.5, ease: 'power3.out' }, 0)
      .from(q('.hero .mega .lw'), { yPercent: 70, opacity: 0, rotation: () => gsap.utils.random(-18, 18), duration: 0.9, stagger: 0.06 }, 0.05)
      .from(q('.collage figure'), { y: 70, opacity: 0, rotation: () => gsap.utils.random(-8, 8), duration: 1, stagger: 0.12 }, 0.3)
      .from(q('.hero .sub, .hero .row, .tray'), { y: 18, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, 0.7)

    // Perfumes: the scent lines draw once (stroke only, no running animation).
    gsap.from(q('.contour path'), { strokeDashoffset: 1, duration: 2.4, ease: 'power2.out', stagger: 0.25, delay: 0.4 })

    // Gallery: each photo lands as it first scrolls into view, then stays put.
    ScrollTrigger.batch(q('.feature, .masonry figure'), { start: 'top 92%', once: true, onEnter: (b) => gsap.from(b, { y: 50, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.08 }) })
    gsap.from(q('.next .nw'), { yPercent: 40, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: enter(one('.next'), 'top 85%') })
  })

  return (
    <>
      <div ref={root} className={'themed t-' + c.id} style={vars({ '--bg': c.bg, '--ink': c.ink, '--ac': c.ac, '--f': c.font })}>
        <section className={'hero cat h-' + c.id}>
          {c.id === 'perfumes' && (
            <svg className="contour" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M-10 220C80 150 140 270 230 190S360 120 420 170" /><path pathLength="1" d="M-10 250C90 190 150 300 240 225S370 160 420 205" /><path pathLength="1" d="M-10 190C70 110 150 240 220 150S350 80 420 135" />
            </svg>
          )}
          <p className="tag rot-r"><I />{c.hero.toUpperCase()}</p>
          <h1 className="mega word" aria-label={c.word}><Wiggle text={c.word} /></h1>
          {SIG[c.id] && <div className="rail" aria-hidden="true"><div>{Array(6).fill(SIG[c.id]).join('')}</div></div>}
          <p className="sub">{c.line}</p>
          {lead.length > 0 && <div className="collage">{lead.map((p, i) => <figure key={p.src} className={'f' + i}><Photo p={p} alt={`${c.word.toLowerCase()} at GEN-Z`} eager={i === 0} sizes="(min-width:800px) 28vw, 60vw" gallery={all} /></figure>)}</div>}
          {c.id === 'accessories' && <Stickers />}
          <div className="row"><a className="btn" href={buildWaLink([c.word.toLowerCase()])} target="_blank" rel="noopener noreferrer">ASK ABOUT {c.word} ↗</a></div>
        </section>

        {c.id === 'perfumes' && (
          <section className="notes">
            <h2 className="big">PICK A VIBE</h2>
            <p>Tell us the mood and we'll show you what we have. Tap one to start a WhatsApp message.</p>
            <div className="chips">{NOTES.map((n) => <button type="button" key={n} className={note === n ? 'on' : ''} aria-pressed={note === n} onClick={() => setNote(note === n ? null : n)}>{n}</button>)}</div>
            {note && <a className="btn" href={buildWaLink(['Perfume: ' + note.toLowerCase()])} target="_blank" rel="noopener noreferrer">ASK ABOUT {note} ↗</a>}
          </section>
        )}

        {all.length > 0 && (
          <section className="gal" aria-label={c.word.toLowerCase() + ' photos'}>
            <h2 className="big">{c.id === 'perfumes' ? 'ON THE SHELF.' : c.id === 'footwear' ? 'WALL TO WALL.' : c.id === 'accessories' ? 'IN THE DRAWER.' : 'ON THE RACK.'}</h2>
            <p className="swipe">{all.length} photos · tap one to open</p>
            {feature && <figure className="feature"><Photo p={feature} alt={`${c.word.toLowerCase()} at GEN-Z, wide view`} sizes="100vw" gallery={all} /></figure>}
            <div className="masonry">{grid.map((p, i) => <figure key={p.src}><Photo p={p} alt={`${c.word.toLowerCase()} at GEN-Z, photo ${i + 4}`} sizes="(min-width:800px) 33vw, 50vw" gallery={all} /></figure>)}</div>
          </section>
        )}

        <section className="next" style={vars({ '--nbg': next.bg, '--nink': next.ink, '--nac': next.ac, '--nf': next.font })}>
          <small>NEXT ROOM</small>
          <Link to={'/' + next.id} className="nw">{next.word} →</Link>
        </section>
      </div>
      <Footer />
    </>
  )
}
