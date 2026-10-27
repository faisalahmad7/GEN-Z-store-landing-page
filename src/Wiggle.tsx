import type { PointerEvent } from 'react'
import { vars } from './css'

// Letters jiggle on mouse-over and on tap (squash-pop on the inner span; GSAP intros only touch the outer one, so they never fight).
const pop = (e: PointerEvent<HTMLSpanElement>) => {
  const el = e.currentTarget
  el.classList.remove('wob')
  void el.offsetWidth // restart the animation
  el.classList.add('wob')
}
export default function Wiggle({ text }: { text: string }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span key={i} className="lw" style={vars({ '--i': i })} aria-hidden="true">
          <span className="li" onPointerEnter={(e) => e.pointerType === 'mouse' && pop(e)} onAnimationEnd={(e) => e.currentTarget.classList.remove('wob')}>
            {ch === ' ' ? ' ' : ch}
          </span>
        </span>
      ))}
    </>
  )
}
