import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { CATS, type Cat } from './data'
import { Link, usePath } from './router'
import { Mark } from './Icons'
import { picks } from './Photo'
import { buildWaLink } from './wa.js'
import { openState, fmt, HOURS } from './hours.js'

// Top bar + full-screen menu + scroll progress. Everything is CSS-driven; no extra libraries.
export function Header() {
  const path = usePath()
  const [open, setOpen] = useState(false)
  const bar = useRef<HTMLDivElement>(null)
  const room = CATS.find((c) => '/' + c.id === path)
  useEffect(() => { setOpen(false) }, [path])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [open])
  useEffect(() => {
    let r = 0
    const f = () => { cancelAnimationFrame(r); r = requestAnimationFrame(() => { const m = document.documentElement.scrollHeight - innerHeight; bar.current?.style.setProperty('--p', String(m > 0 ? scrollY / m : 0)) }) }
    addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  return (
    <>
      <div className="prog" ref={bar} style={{ '--pc': room?.ac ?? '#c6ff3d' } as CSSProperties} aria-hidden="true" />
      <header className="top">
        <Link to="/" className="logo" aria-label="GEN-Z home"><Mark /><b>GEN-Z</b></Link>
        <div className="topr">
          <a className="topcta" href={buildWaLink()} target="_blank" rel="noopener noreferrer">WHATSAPP ↗</a>
          <button type="button" className="burger" aria-expanded={open} aria-controls="menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}><i /><i /></button>
        </div>
      </header>
      <nav id="menu" className={'menu' + (open ? ' on' : '')} aria-label="Menu" aria-hidden={!open} inert={!open}>
        {CATS.map((c, i) => (
          <Link key={c.id} to={'/' + c.id} className="mi" style={{ '--mb': c.bg, '--mk': c.ink, '--ma': c.ac, '--d': i } as CSSProperties}>
            <small>0{i + 1}</small><b>{c.word}</b><span>{c.line}</span>
          </Link>
        ))}
        <a className="mi mw" href={buildWaLink()} target="_blank" rel="noopener noreferrer"><small>→</small><b>SAY HI ON WHATSAPP</b></a>
      </nav>
    </>
  )
}

// THE LAB: one playful tool. Only a real shop photo is used; the result opens a prefilled WhatsApp message.
const VIBES = ['FRESH', 'WOODY', 'SWEET', 'SPICY']
const Q: { q: string; o: [string, number][] }[] = [
  { q: 'Where are you headed?', o: [['Café hangout', 0], ['The office', 1], ['A wedding', 2], ['Night out', 3]] },
  { q: 'Pick a colour', o: [['Sky blue', 0], ['Forest green', 1], ['Rose pink', 2], ['Deep red', 3]] },
  { q: 'Your weekend?', o: [['Football outside', 0], ['Long quiet drive', 1], ['Dessert run', 2], ['Party', 3]] },
]
function ScentQuiz() {
  const [a, setA] = useState<number[]>([])
  const done = a.length === Q.length
  const win = done ? [0, 1, 2, 3].sort((x, y) => a.filter((v) => v === y).length - a.filter((v) => v === x).length)[0] : 0
  const ph = picks('perfumes', 4)[win]
  return (
    <div className="lab-card scent">
      <h3>SCENT QUIZ</h3>
      {!done ? (
        <>
          <p>{a.length + 1} / {Q.length} · {Q[a.length].q}</p>
          <div className="sq-o">{Q[a.length].o.map(([l, v]) => <button key={l} type="button" className="chipb" onClick={() => setA([...a, v])}>{l}</button>)}</div>
        </>
      ) : (
        <div aria-live="polite" className="sq-r">
          {ph && <img src={ph.src} width={ph.w} height={ph.h} alt="A perfume from the GEN-Z shelf" />}
          <p>YOUR VIBE</p><b>{VIBES[win]}</b>
          <a className="btn" href={buildWaLink([`a ${VIBES[win].toLowerCase()} perfume`])} target="_blank" rel="noopener noreferrer">ASK FOR {VIBES[win]} ↗</a>
          <button type="button" className="chipb" onClick={() => setA([])}>RETAKE</button>
        </div>
      )}
    </div>
  )
}

export function Lab() {
  return (
    <section className="lab" aria-label="The Lab">
      <small className="lab-k">QUICK ONE · 3 QUESTIONS</small>
      <h2 className="big">FIND YOUR SCENT.</h2>
      <div className="lab-g"><ScentQuiz /></div>
    </section>
  )
}

// Live open/closed badge from the owner's hours (see hours.js), re-checked every minute.
export function OpenNow() {
  const [s, setS] = useState(() => openState())
  useEffect(() => { const t = setInterval(() => setS(openState()), 60000); return () => clearInterval(t) }, [])
  return <span className={'opn ' + (s.open ? 'yes' : 'no')}><i aria-hidden="true" />{s.label}</span>
}

// What the shop really stocks, as plain facts from the owner (no prices, no brand claims).
const SHELF: Record<Cat, string[]> = {
  clothing: ['Linen shirts', 'Denim shirts', 'Corduroy shirts', 'Boxy-fit shirts', 'Polos', 'Round-necks', 'Co-ord sets', 'Zipper hoodies', 'Dry-fit jackets', 'Windbreakers', 'Cargos', 'Track pants', 'Joggers', 'Eid & Ramzan edits'],
  footwear: ['Sneakers', 'Skate shoes', 'Slides', 'Clogs', 'Rainy-season slippers', 'Loafers', 'Dress shoes', 'Pathani chappals', "Kids' shoes"],
  accessories: ['Sunglasses', 'Street socks', 'Prayer caps'],
  perfumes: ['Attars', 'Long-lasting masculine fragrances'],
}
export function Shelf() {
  return (
    <section className="shelf" aria-label="What is on the shelves">
      <h2 className="big">ON THE SHELVES.</h2>
      <p className="shelf-s">Open 7 days a week, holidays too. {fmt(HOURS.week[0])}–{fmt(HOURS.week[1])} Mon–Fri, {fmt(HOURS.end[0])}–{fmt(HOURS.end[1])} Sat–Sun.</p>
      <div className="shelf-g">
        {CATS.map((c, i) => (
          <article key={c.id} className="shelf-c" style={{ '--mb': c.bg, '--mk': c.ink, '--ma': c.ac } as CSSProperties}>
            <small>0{i + 1} · {c.word}</small>
            <ul>{SHELF[c.id].map((x) => <li key={x}>{x}</li>)}</ul>
            <Link to={'/' + c.id} className="btn">SEE {c.word} →</Link>
            {c.id === 'perfumes' && <a className="shelf-l" href="https://www.instagram.com/genperfume.in/" target="_blank" rel="noopener noreferrer">Fragrance drops: @genperfume.in ↗</a>}
          </article>
        ))}
      </div>
    </section>
  )
}
