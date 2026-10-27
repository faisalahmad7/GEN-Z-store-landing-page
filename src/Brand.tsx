import { useEffect, useRef, useState } from 'react'
import { Link } from './router'
import type { Cat } from './data'

// The shop's own walk-through video. The frame uses the video's exact ratio (478:850), so nothing is stretched or cropped on any screen.
// It plays muted while it is on screen, pauses when it leaves, and never auto-plays for people who asked for reduced motion.
export function Reel() {
  const box = useRef<HTMLDivElement>(null)
  const vid = useRef<HTMLVideoElement>(null)
  const held = useRef(false) // true once the visitor paused it themselves, so scrolling never restarts it
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const v = vid.current
    const b = box.current
    if (!v || !b) return
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !calm && !held.current) v.play().catch(() => {})
      else if (!e.isIntersecting) v.pause()
    }, { threshold: 0.55 })
    io.observe(b)
    return () => io.disconnect()
  }, [])

  const toggle = () => {
    const v = vid.current
    if (!v) return
    if (v.paused) { held.current = false; v.play().catch(() => {}) } else { held.current = true; v.pause() }
  }

  return (
    <section className="reel" aria-label="Video tour of the shop">
      <div className="reel-t">
        <small>PEEK INSIDE</small>
        <h2 className="big">STEP <span className="gold">INSIDE.</span></h2>
        <p>Four rooms, one door. Press play and walk straight in.</p>
        <p className="reel-n">Tap 🔇 for the full effect.</p>
      </div>
      <div className="reel-f" ref={box}>
        <video
          ref={vid}
          poster="/media/shop-reel-poster.webp"
          width={478}
          height={850}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          aria-label="Walk-through of the GEN-Z men's boutique in Kondhwa"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onClick={toggle}
        >
          <source src="/media/shop-reel.mp4" type="video/mp4" />
          <source src="/media/shop-reel.webm" type="video/webm" />
        </video>
        {!playing && <button type="button" className="reel-p" onClick={toggle} aria-label="Play the shop video"><i /></button>}
        <button type="button" className="reel-s" aria-pressed={!muted} aria-label={muted ? 'Turn the sound on' : 'Turn the sound off'} onClick={() => setMuted(!muted)}>{muted ? '🔇 SOUND' : '🔊 ON'}</button>
        <span className="reel-tag" aria-hidden="true">FILMED IN-STORE</span>
      </div>
    </section>
  )
}

// The logo, big, on black where its gold belongs. It tilts toward the pointer, and the three things hiding inside it link to their rooms.
const BITS = [{ w: 'SUIT', to: '/clothing', r: 'THE RACK' }, { w: 'SHOE', to: '/footwear', r: 'SOLE LAB' }, { w: 'WATCH', to: '/accessories', r: 'THE DRAWER' }]
export function BrandMark() {
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('shine'); io.disconnect() } }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <section className="brand" aria-label="The GEN Z logo">
      <div className="brand-l" ref={box} data-tilt>
        <img src="/logo.webp" width={566} height={474} alt="GEN Z logo: a gold Z holding a tuxedo jacket, a dress shoe and a wristwatch" loading="lazy" decoding="async" />
      </div>
      <div className="brand-t">
        <small>THE MARK</small>
        <h2 className="big gold">WEAR THE Z.</h2>
        <p>Three things hide inside our logo. Tap one and we'll walk you to its room.</p>
        <div className="bits">{BITS.map((x, i) => <Link key={x.w} to={x.to} className="chipm bit" style={{ '--i': i } as React.CSSProperties}><b>{x.w}</b><small>{x.r} →</small></Link>)}</div>
      </div>
    </section>
  )
}

// Each room on the home page gets its own ambient decoration: drifting outline words, a trail that draws on scroll, a spinning badge, rising bubbles.
const FXT: Record<Cat, string> = { clothing: 'FITS ✶ LAYERS ✶ BASICS ✶ ', footwear: 'STEP UP ✶ LOAFERS ✶ SLIDES ✶ ', accessories: 'ACCESSORIES ✶ DETAILS ✶ GEN-Z ✶ KONDHWA ✶ ', perfumes: 'FRESH ✶ WOODY ✶ SWEET ✶ SPICY ✶ ' }
export function RoomFx({ id }: { id: Cat }) {
  const t = Array(5).fill(FXT[id]).join('')
  return (
    <div className={'fxw fx-' + id} aria-hidden="true">
      {(id === 'clothing' || id === 'footwear') && <><div className="fx-m"><div>{t}{t}</div></div><div className="fx-m r"><div>{t}{t}</div></div></>}
      {id === 'footwear' && <svg className="fx-trail" viewBox="0 0 400 800" preserveAspectRatio="none"><path pathLength="1" d="M-10 80C120 140 280 40 410 160S120 340 410 430 100 620 410 720" /></svg>}
      {id === 'accessories' && <svg className="fx-badge" viewBox="0 0 120 120"><defs><path id="ring" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" /></defs><text><textPath href="#ring">{'ACCESSORIES ✶ DETAILS ✶ GEN-Z ✶ '}</textPath></text><circle cx="60" cy="60" r="7" /></svg>}
      {id === 'perfumes' && <div className="fx-bub">{Array.from({ length: 9 }, (_, i) => <i key={i} style={{ '--i': i } as React.CSSProperties}/>)}</div>}
    </div>
  )
}
