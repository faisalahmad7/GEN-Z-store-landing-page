import { useRef } from 'react'
import { CATS, FACTS, REVIEWS, SHOP, SIGN_PHOTO } from '../data'
import { Link } from '../router'
import { buildWaLink } from '../wa.js'
import { OpenNow, Shelf } from '../Extras'
import { BrandMark, Reel, RoomFx } from '../Brand'
import { ICONS } from '../Icons'
import { Photo, byId, mixed, photosFor, picks } from '../Photo'
import { openLightbox } from '../Lightbox'
import Footer from '../Footer'
import Seal from '../Seal'
import Wiggle from '../Wiggle'
import { vars } from '../css'
import { Draggable, gsap, useFit, useMotion } from '../motion'

const WORDS = ['CLOTHING', 'FOOTWEAR', 'ACCESSORIES', 'PERFUMES', 'BRANDED', 'KONDHWA, PUNE']
// Claims below are the store's own wording; the owner should confirm them before launch. No years-in-business or awards are claimed.
const TRUST = [
  { n: '01', h: 'AUTHENTIC', p: 'Branded pieces the shop says are genuine. Ask about anything on the shelf.' },
  { n: '02', h: 'WARM SERVICE', p: 'Walk in, say what you need, and the team helps you find it. Customers mention the service in their Google reviews.' },
  { n: '03', h: 'FOUR ROOMS', p: 'Clothing, footwear, accessories and perfumes, all under one roof in Kondhwa.' },
]
const STRING = [18, 52, 30, 62] // how far each tag hangs (px)

const ROOM_DETAILS: Record<string, { intro: string; items: string[] }> = {
  clothing: {
    intro: 'Easy layers, co-ord sets and everyday pieces worth trying on in person.',
    items: ['LINEN & DENIM', 'CO-ORD SETS', 'CARGOS', 'HOODIES'],
  },
  footwear: {
    intro: 'Build your rotation with everyday pairs and sharper options for going out.',
    items: ['SNEAKERS', 'SLIDES', 'LOAFERS', 'DRESS SHOES'],
  },
  accessories: {
    intro: 'The finishing touches that pull a look together without trying too hard.',
    items: ['SUNGLASSES', 'STREET SOCKS', 'BRACELETS', 'RINGS', 'CHAINS', 'WATCHES'],
  },
  perfumes: {
    intro: 'Browse attars and masculine fragrances, then ask the team for help finding your scent.',
    items: ['ATTARS', 'MASCULINE SCENTS', 'LONG-LASTING FRAGRANCES'],
  },
}

// The shop's own wall sign says "IT'S TIME TO LEVEL UP"; it is sharp in one of the accessories photos.
function LevelUp() {
  const sign = byId(SIGN_PHOTO)
  if (!sign) return null
  return (
    <section className="lvl" aria-label="It's time to level up">
      <picture className="lvbg"><img src={sign.src} srcSet={sign.srcset || undefined} sizes="100vw" width={sign.w} height={sign.h} alt="The GEN-Z wall sign: It's time to level up" loading="lazy" decoding="async" /></picture>
      <div className="lvt">
        <small>THE LINE ON OUR OWN WALL</small>
        <p className="lvl-l"><Wiggle text="IT'S TIME" /></p>
        <p className="lvl-l hot"><Wiggle text="TO LEVEL UP." /></p>
        <button type="button" className="btn alt" onClick={() => openLightbox([sign], 0)}>SEE THE WALL ▣</button>
      </div>
    </section>
  )
}

// Full-bleed photo of the inside of the shop: a portrait one on phones, the best landscape one on wider screens.
function HeroBg() {
  const shop = photosFor('shop')
  const land = shop.find((p) => p.o === 'l') ?? shop[0]
  const port = shop.find((p) => p.o === 'p') ?? shop[0]
  if (!land || !port) return null
  return (
    <picture className="hbg">
      <source media="(min-width:800px)" srcSet={land.srcset || land.src} sizes="100vw" />
      <img src={port.src} srcSet={port.srcset || undefined} sizes="100vw" width={port.w} height={port.h} alt="Inside the GEN-Z men's boutique, Kondhwa" fetchPriority="high" decoding="async" />
    </picture>
  )
}

export default function Hub() {
  const root = useRef<HTMLDivElement>(null)
  const shop = photosFor('shop')
  const pool = mixed().slice(0, 18)
  useFit(root, '.hub .mega, .rw, .lvl-l')

  useMotion(root, () => {
    const q = gsap.utils.selector(root.current!)
    const one = (s: string) => q<HTMLElement>(s)[0]
    const enter = (trigger: Element | string, start = 'top 82%') => ({ trigger, start, once: true })

    // Hero: ONE timeline. Letters rise, the four tags drop on their strings and settle, then the actions arrive.
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from(q('.hub .mega .lw'), { yPercent: 70, opacity: 0, rotation: () => gsap.utils.random(-4, 4), duration: 0.9, stagger: 0.06 }, 0)
      .from(q('.ht'), { y: -300, duration: 1.4, stagger: 0.1 }, 0.1)
      .from(q('.hub .tag, .hub .sub, .hub .row, .hub .meta'), { y: 22, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, 0.5)

    // Desktop mouse only: grab a tag and let go, it swings back on its string. Touch users just tap the tag.
    let drag: Draggable[] = []
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      drag = Draggable.create(q('.ht'), { type: 'x,y', minimumMovement: 6, onRelease() { gsap.to(this.target, { x: 0, y: 0, duration: 1.4, ease: 'power4.out' }) } })
    }

    // Manifesto: the two big lines rise, and the hot line's underline draws in.
    gsap.from(q('.mani-b > span'), { yPercent: 40, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.15, scrollTrigger: enter(one('.mani')) })
    gsap.from(q('.mani .ul'), { scaleX: 0, transformOrigin: '0 50%', duration: 0.9, delay: 0.4, ease: 'power3.inOut', scrollTrigger: enter(one('.mani')) })

    // Trust: numbers and rows step in one after another.
    gsap.from(q('.tc'), { y: 36, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: enter(one('.trust'), 'top 75%') })

    // Rooms: word drops in, the photo wipes in. Once per room, then everything stays put.
    q<HTMLElement>('.room').forEach((r) => {
      const st = enter(r, 'top 60%')
      gsap.from(r.querySelectorAll('.rw .lw'), { yPercent: 60, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.04, scrollTrigger: st })
      gsap.from(r.querySelectorAll('.rl, .rb'), { y: 24, opacity: 0, duration: 0.6, stagger: 0.08, delay: 0.15, ease: 'power3.out', scrollTrigger: st })
      const rp = r.querySelector('.rp')
      if (rp) gsap.fromTo(rp, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', clearProps: 'clipPath', duration: 0.9, ease: 'power3.inOut', scrollTrigger: st })
    })

    // Level up: the sign photo wipes in, then the line slams in.
    const lv = one('.lvl')
    if (lv) {
      gsap.fromTo(q('.lvbg'), { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', clearProps: 'clipPath', duration: 1, ease: 'power3.inOut', scrollTrigger: enter(lv, 'top 75%') })
      gsap.from(q('.lvl-l .lw'), { yPercent: 70, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.035, delay: 0.35, scrollTrigger: enter(lv, 'top 75%') })
    }

    // Gallery rail: photos appear as the rail arrives (once), then stop.
    gsap.from(q('.srow figure'), { x: 40, opacity: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out', scrollTrigger: enter(one('.strip'), 'top 80%') })
    gsap.from(q('.rc'), { y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out', scrollTrigger: enter(one('.proof'), 'top 75%') })
    return () => drag.forEach((d) => d.kill())
  })

  return (
    <div ref={root}>
      <section className="hero hub">
        <HeroBg />
        <nav className="htags" aria-label="Rooms">
          {CATS.map((c, i) => {
            const I = ICONS[c.id]
            return (
              <Link key={c.id} to={'/' + c.id} className="ht" style={vars({ '--i': i, '--tc': c.ac, '--sl': STRING[i] })}>
                <i /><b><span className="ico"><I /></span><small>0{i + 1}</small><span className="wd">{c.word}</span></b>
              </Link>
            )
          })}
        </nav>
        <p className="tag rot-l">MEN'S BOUTIQUE · KONDHWA, PUNE</p>
        <h1 className="mega" aria-label="GEN-Z"><Wiggle text="GEN-Z" /></h1>
        <p className="sub">Branded menswear, footwear, accessories and perfumes. One shop in Kondhwa, four rooms to walk through.</p>
        <div className="row">
          <a className="btn" href={SHOP.maps} target="_blank" rel="noopener noreferrer">DIRECTIONS ↗</a>
          <a className="btn alt" href={buildWaLink()} target="_blank" rel="noopener noreferrer">WHATSAPP</a>
        </div>
        <p className="meta"><span>{FACTS.rating}★ on Google ({FACTS.reviews} reviews)</span><OpenNow />{shop.length > 0 && <button type="button" onClick={() => openLightbox(shop, 0)}>look inside ▣</button>}</p>
      </section>

      <div className="marquee" aria-hidden="true" style={{ rotate: "none", transform: "none", margin: 0, top: "16px" }}><div>{[...WORDS, ...WORDS, ...WORDS].map((x, i) => <span key={i}>{x} ✶ </span>)}</div></div>

      <section className="mani" aria-label="Real brands. Real fits.">
        <small>THE SHOP IN TWO LINES</small>
        <h2 className="mani-b"><span>REAL BRANDS.</span><span className="hot">real fits.<i className="ul" aria-hidden="true" /></span></h2>
        <p>Branded pieces, picked with an eye and sold with a smile. Walk in and try things on, or message us first.</p>
      </section>

      <div className="gild"><BrandMark /><Reel /></div>

      <section className="rooms" aria-label="The four rooms">
        {CATS.map((c, i) => {
          const list = photosFor(c.id)
          // FOOTWEAR card uses footwear-006 directly (the 480px file that is already in the folder)
          const f6 = photosFor('footwear').find((p) => p.src.includes('footwear-006'))
          const ph = c.id === 'footwear' && f6 ? { ...f6, srcset: '' } : picks(c.id, 1)[0]
          const I = ICONS[c.id]
          return (
            <article key={c.id} className={'room r-' + c.id} style={vars({ '--bg': c.bg, '--ink': c.ink, '--ac': c.ac, '--f': c.font, '--k': i })}>
              <RoomFx id={c.id} />
              <small className="rm"><b>0{i + 1}</b> / 04 · {c.hero.toUpperCase()}</small>
              <h2 className="rw" aria-label={c.word}><Wiggle text={c.word} /></h2>
              <p className="rl">{c.line}</p>
              <div className="room-details" aria-label={`Highlights in ${c.word}`}>
                <span className="rd-kicker">THE LINEUP <i aria-hidden="true">/</i> 0{i + 1}</span>
                <p>{ROOM_DETAILS[c.id].intro}</p>
                <ul>{ROOM_DETAILS[c.id].items.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <figure className={'rp' + (ph ? '' : ' nop')} data-tilt>{ph ? <Photo p={ph} alt={c.word.toLowerCase() + ' at GEN-Z'} sizes="(min-width:800px) 40vw, 80vw" gallery={c.id === 'footwear' && f6 ? list.map((x) => (x === f6 ? ph : x)) : list} /> : <I />}</figure>
              <Link to={'/' + c.id} className="btn rb">ENTER {c.word} →</Link>
            </article>
          )
        })}
      </section>

      <LevelUp />

      <Shelf />

      <section className="trust" aria-label="Why GEN-Z">
        <Seal id="seal-trust" className="tseal" />
        <h2 className="big">WHY GEN-Z.</h2>
        <ol className="tcs">
          {TRUST.map((t) => <li key={t.n} className="tc"><b>{t.n}</b><div><h3>{t.h}</h3><p>{t.p}</p></div></li>)}
        </ol>
      </section>

      <section className="strip" aria-label="Photos from the shop">
        <h2 className="big">THE FLOOR, UP CLOSE.</h2>
        <p className="swipe">tap any photo to open it big</p>
        <div className="srow" role="list">
          {pool.map((p) => <figure key={p.src} role="listitem"><Photo p={p} alt="Inside GEN-Z, Kondhwa" sizes="(min-width:800px) 26vw, 62vw" gallery={pool} /></figure>)}
        </div>
      </section>

      <section className="proof" aria-label="Google reviews">
        <h2 className="big">WORD ON THE STREET.</h2>
        <p className="gscore"><b>{FACTS.rating}★</b> on Google · {FACTS.reviews} reviews<small>Snippets from Google reviews; some were written a few years ago.</small></p>
        <ul className="rcs">
          {REVIEWS.map((r, i) => <li key={r} className={'rc q' + i}><blockquote>{r}</blockquote><small>Google review</small></li>)}
        </ul>
      </section>

      <Footer />
    </div>
  )
}
