import { useRef } from 'react'
import { CATS, SHOP } from './data'
import { OpenNow } from './Extras'
import { fmt, HOURS } from './hours.js'
import { Link } from './router'
import { buildWaLink } from './wa.js'
import { Photo, photosFor } from './Photo'
import { Mark } from './Icons'
import Seal from './Seal'
import Wiggle from './Wiggle'
import { gsap, toTop, useFit, useMotion } from './motion'

// Shared by the home page and every category page. It is also the "visit" block: shop photo, address and every way to reach the shop.
export default function Footer() {
  const root = useRef<HTMLElement>(null)
  const shop = photosFor('shop')
  const door = shop.find((p) => p.o === 'p') ?? shop[0]
  useFit(root, '.fw')
  useMotion(root, () => {
    const q = gsap.utils.selector(root.current!)
    const st = { trigger: root.current!, start: 'top 80%', once: true }
    gsap.from(q('.fw .lw'), { yPercent: 70, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: q('.fw')[0], start: 'top 95%', once: true } })
    gsap.from(q('.fcta > *'), { y: 26, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: st })
  })
  return (
    <footer className="foot" ref={root}>
      <div className="fcta">
        {door && <figure className="shopfig"><Photo p={door} alt="Inside the GEN-Z men's boutique, Kondhwa" sizes="(min-width:800px) 40vw, 80vw" gallery={shop} /></figure>}
        <h2 className="big">COME IN.<br />SAY HELLO.</h2>
        <address>
          Shop No 17, HM Royal Society,<br />opposite the main gate,<br />Kondhwa, Pune 411048<small>Kondhwa Road, near Talab Masjid.</small>
          <dl className="hrs"><dt>MON–FRI</dt><dd>{fmt(HOURS.week[0])} – {fmt(HOURS.week[1])}</dd><dt>SAT–SUN</dt><dd>{fmt(HOURS.end[0])} – {fmt(HOURS.end[1])}</dd></dl>
          <OpenNow />
        </address>
        <div className="row">
          <a className="btn" href={SHOP.tel}>CALL {SHOP.phone}</a>
          <a className="btn alt" href={SHOP.maps} target="_blank" rel="noopener noreferrer">DIRECTIONS ↗</a>
          <a className="btn alt" href={buildWaLink()} target="_blank" rel="noopener noreferrer">WHATSAPP</a>
          <a className="btn alt" href={SHOP.insta} target="_blank" rel="noopener noreferrer">@genz.formens ↗</a>
        </div>
      </div>
      <nav className="fnav" aria-label="Footer rooms">
        {CATS.map((c) => <Link key={c.id} to={'/' + c.id}>{c.word}</Link>)}
      </nav>
      <div className="fseal"><Seal id="seal-foot" /><p>Authentic, branded and genuine: the shop's promise.</p></div>
      <div className="fw" role="img" aria-label="GEN-Z"><Wiggle text="GEN-Z" /></div>
      <div className="fbot"><span className="fmk"><Mark /></span><p>© GEN-Z men's boutique · Kondhwa, Pune</p><button type="button" onClick={() => toTop(false)}>BACK TO TOP ↑</button></div>
    </footer>
  )
}
