import { useEffect, useState, type ComponentProps } from 'react'
import { flushSync } from 'react-dom'
import { toTop } from './motion'
import { normPath } from './path.js'

export function usePath() {
  const [p, setP] = useState(() => normPath(location.pathname))
  useEffect(() => {
    const f = () => setP(normPath(location.pathname))
    addEventListener('popstate', f)
    return () => removeEventListener('popstate', f)
  }, [])
  return p
}

// Soft crossfade between pages (View Transitions, where the browser has them). Header, dock and progress bar are named so they stay still.
export function go(to: string) {
  if (normPath(to) === normPath(location.pathname)) return
  const run = () => { history.pushState({ nav: 1 }, '', to); flushSync(() => dispatchEvent(new PopStateEvent('popstate'))); toTop() }
  const d = document as Document & { startViewTransition?: (cb: () => void) => unknown }
  if (d.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) d.startViewTransition(run)
  else run()
}

// Any <a> prop (className, style, aria-*, onMouseEnter...) passes straight through.
// Ctrl/Cmd/Shift/Alt-click and middle-click are left to the browser so "open in new tab" works.
export function Link({ to, children, ...rest }: { to: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <a {...rest} href={to} onClick={(e) => {
      rest.onClick?.(e)
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      e.preventDefault()
      go(to)
    }}>
      {children}
    </a>
  )
}
