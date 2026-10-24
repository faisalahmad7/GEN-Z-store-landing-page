import { lazy, Suspense, useEffect, useRef } from 'react'
import { CATS } from './data'
import { Link, usePath } from './router'
import { ICONS, Mark } from './Icons'
import Lightbox from './Lightbox'
import Hub from './pages/Hub'

const Category = lazy(() => import('./pages/Category'))
const prefetch = () => { import('./pages/Category') }

export default function App() {
  const path = usePath()
  const main = useRef<HTMLElement>(null)
  const cat = CATS.find((c) => path === '/' + c.id)
  useEffect(() => {
    document.title = cat ? `${cat.word[0] + cat.word.slice(1).toLowerCase()} · GEN-Z men's boutique, Kondhwa Pune` : "GEN-Z · Men's boutique, Kondhwa Pune"
    if (main.current && history.state?.nav) main.current.focus({ preventScroll: true }) // route change: screen readers start at the new page
  }, [path])
  return (
    <>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); main.current?.focus() }}>Skip to content</a>
      <main id="main" className="page" key={path} ref={main} tabIndex={-1}>
        {cat ? (
          <Suspense fallback={<div className="loading">GEN-Z</div>}><Category cat={cat} /></Suspense>
        ) : <Hub />}
      </main>
      <nav className="dock" aria-label="Main">
        <Link to="/" className={path === '/' ? 'on' : ''}><span className="mk"><Mark /></span><b>HOME</b></Link>
        {CATS.map((c) => {
          const I = ICONS[c.id]
          return (
            <Link key={c.id} to={'/' + c.id} onMouseEnter={prefetch} className={path === '/' + c.id ? 'on' : ''}>
              <span className="ic"><I /></span><b>{c.word}</b>
            </Link>
          )
        })}
      </nav>
      <Lightbox />
    </>
  )
}
