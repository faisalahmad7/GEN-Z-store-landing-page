import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { toTop } from './motion'

export function usePath() {
  const [p, setP] = useState(location.pathname)
  useEffect(() => {
    const f = () => setP(location.pathname)
    addEventListener('popstate', f)
    return () => removeEventListener('popstate', f)
  }, [])
  return p
}

// No View Transitions on purpose: a snapshot layer fights pinned (position: fixed) scroll sections. The page fades in via CSS instead.
export function go(to: string) {
  if (to === location.pathname) return
  history.pushState({ nav: 1 }, '', to)
  dispatchEvent(new PopStateEvent('popstate'))
  toTop()
}

export function Link({ to, className, children, onMouseEnter, style, ...rest }: { to: string; className?: string; children: ReactNode; onMouseEnter?: () => void; style?: CSSProperties; 'aria-label'?: string }) {
  return (
    <a href={to} className={className} style={style} onMouseEnter={onMouseEnter} aria-label={rest['aria-label']} onClick={(e) => { e.preventDefault(); go(to) }}>
      {children}
    </a>
  )
}
