import { useEffect, useRef, useState } from 'react'

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
        <small>PEEK INSIDE · 8 SECONDS</small>
        <h2 className="big">STEP <span className="gold">INSIDE.</span></h2>
        <p>Filmed at the shop in Kondhwa: the front door with our neon line, the shirt wall, the mannequin, the slipper and loafer shelves.</p>
        <p className="reel-n">Plays on mute. Tap the video to pause it.</p>
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

// The logo, shown big on black where its gold belongs. A light sweep crosses it once when it scrolls into view and again on hover.
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
      <div className="brand-l" ref={box}>
        <img src="/logo.webp" width={566} height={474} alt="GEN Z logo: a gold Z holding a tuxedo jacket, a dress shoe and a wristwatch" loading="lazy" decoding="async" />
      </div>
      <div className="brand-t">
        <small>THE MARK</small>
        <h2 className="big gold">SUIT. SHOE. WATCH. ONE Z.</h2>
        <p>Our logo folds the whole idea into a single gold Z: a tuxedo jacket, a dress shoe and a wristwatch. Dress the whole look, head to toe, from one shop.</p>
      </div>
    </section>
  )
}
