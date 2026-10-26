import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { CATS } from './data'
import { Header } from './Extras'
import { Link, usePath } from './router'
import { ICONS, Mark } from './Icons'
import Lightbox from './Lightbox'
import Hub from './pages/Hub'

const Category = lazy(() => import('./pages/Category'))
const prefetch = () => { import('./pages/Category') }

export default function App() {
  const path = usePath()
  const [showLoader, setShowLoader] = useState(true)
  const main = useRef<HTMLElement>(null)
  const cat = CATS.find((c) => path === '/' + c.id)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = window.setTimeout(() => setShowLoader(false), reduced ? 250 : 1850)
    return () => window.clearTimeout(id)
  }, [])
  useEffect(() => {
    document.title = cat ? `${cat.word[0] + cat.word.slice(1).toLowerCase()} · GEN-Z men's boutique, Kondhwa Pune` : "GEN-Z · Men's boutique, Kondhwa Pune"
    if (main.current && history.state?.nav) main.current.focus({ preventScroll: true }) // route change: screen readers start at the new page
  }, [path])
  return (
    <>
      {showLoader && (
        <div className="site-loader" role="status" aria-label="Loading GEN-Z store">
          <div className="loader-topline" aria-hidden="true">
            <span>GEN-Z <i>/</i> MEN'S BOUTIQUE</span>
            <span>KONDHWA · PUNE</span>
          </div>
          <div className="loader-main">
            <div className="loader-stage" aria-hidden="true">
              <span className="loader-orbit loader-orbit-a" />
              <span className="loader-orbit loader-orbit-b" />
              <span className="loader-orbit-dot" />
              <div className="loader-logo-frame">
                <img src="/logo.webp" width="566" height="474" alt="" decoding="async" fetchPriority="high" />
              </div>
              <span className="loader-star">✳</span>
            </div>
            <div className="loader-copy">
              <p className="loader-kicker">YOUR NEXT FIT STARTS HERE</p>
              <div className="loader-progress-meta">
                <span>PREPARING YOUR EXPERIENCE</span>
                <span className="loader-live">LOADING</span>
              </div>
              <div className="loader-track" role="progressbar" aria-label="Loading GEN-Z store" aria-valuemin={0} aria-valuemax={100}>
                <span />
              </div>
            </div>
          </div>
          <div className="loader-bottomline" aria-hidden="true">
            <span>REAL BRANDS. REAL FITS.</span>
            <span>CLOTHING · FOOTWEAR · ACCESSORIES · FRAGRANCE</span>
          </div>
        </div>
      )}
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); main.current?.focus() }}>Skip to content</a>
      <Header />
      <main id="main" className="page" key={path} ref={main} tabIndex={-1}>
        {cat ? (
          <Suspense fallback={<div className="loading">GEN-Z</div>}><Category cat={cat} /></Suspense>
        ) : <Hub />}
      </main>
      <nav className="dock" aria-label="Main">
        <Link to="/" className={path === '/' ? 'on' : ''} aria-current={path === '/' ? 'page' : undefined}><span className="mk"><Mark /></span><b>HOME</b></Link>
        {CATS.map((c) => {
          const I = ICONS[c.id]
          return (
            <Link key={c.id} to={'/' + c.id} onMouseEnter={prefetch} className={path === '/' + c.id ? 'on' : ''} aria-current={path === '/' + c.id ? 'page' : undefined}>
              <span className="ic"><I /></span><b>{c.word}</b>
            </Link>
          )
        })}
      </nav>
      <Lightbox />
    </>
  )
}
