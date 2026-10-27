import { useLayoutEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(ScrollTrigger, Draggable)
export { gsap, ScrollTrigger, Draggable }

// Runs `setup` inside gsap.matchMedia, so every tween and ScrollTrigger is reverted on unmount (page changes).
// Reduced-motion users get no animation at all; the CSS keeps all content visible by default.
// Native scrolling everywhere: no smooth-scroll library, no pinning (both were the main sources of lag).
export function useMotion(scope: RefObject<HTMLElement | null>, setup: () => void | (() => void)) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add({ reduce: '(prefers-reduced-motion: reduce)' }, (ctx) => {
      if ((ctx.conditions as unknown as { reduce: boolean }).reduce) return
      return setup()
    }, scope.current ?? undefined)
    const refresh = () => ScrollTrigger.refresh()
    const raf = requestAnimationFrame(refresh)
    addEventListener('load', refresh)
    return () => { cancelAnimationFrame(raf); removeEventListener('load', refresh); mm.revert() }
  }, [])
}

export const toTop = (instant = true) => scrollTo({ top: 0, behavior: instant ? 'auto' : 'smooth' })

// Shrinks a heading's font-size until it fits on ONE line, so letters can never wrap. Re-runs when fonts load and when the width changes.
// Width is measured from the last letter's layout position (not scrollWidth), so intro rotations/translations never skew the result.
export function useFit(scope: RefObject<HTMLElement | null>, selector: string) {
  useLayoutEffect(() => {
    const root = scope.current!
    let width = 0
    const fit = () => root.querySelectorAll<HTMLElement>(selector).forEach((e) => {
      e.style.fontSize = ''
      const cw = e.clientWidth
      const last = e.lastElementChild as HTMLElement | null
      const sw = last?.classList.contains('lw') ? last.offsetLeft + last.offsetWidth : e.scrollWidth
      if (cw && sw > cw) e.style.fontSize = parseFloat(getComputedStyle(e).fontSize) * (cw / sw) * 0.97 + 'px'
    })
    fit()
    document.fonts?.ready.then(fit)
    document.fonts?.addEventListener('loadingdone', fit) // fonts that load late (e.g. a page's own face) re-fit the headings
    const ro = new ResizeObserver(() => { if (root.clientWidth !== width) { width = root.clientWidth; fit() } })
    ro.observe(root)
    return () => { ro.disconnect(); document.fonts?.removeEventListener('loadingdone', fit) }
  }, [])
}
