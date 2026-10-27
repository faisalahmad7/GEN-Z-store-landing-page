// Small mouse/touch polish, no library: click ripple, magnetic buttons, 3D tilt on [data-tilt] cards.
// Mouse effects run only on devices with a real mouse and never for reduced-motion users.
const fine = matchMedia('(hover: hover) and (pointer: fine)')
const calm = matchMedia('(prefers-reduced-motion: reduce)')
const RESET = ['--rx', '--ry', '--tx', '--ty']
export function initFx() {
  addEventListener('pointerdown', (e) => {
    if (calm.matches || !fine.matches) return // ripple: mouse devices only
    const b = (e.target as Element).closest<HTMLElement>('.btn,.topcta,.chipm')
    if (!b) return
    const r = b.getBoundingClientRect(), d = Math.max(r.width, r.height) * 2
    const s = document.createElement('span')
    s.className = 'rip'
    s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`
    b.appendChild(s)
    setTimeout(() => s.remove(), 650)
  }, { passive: true })
  let cur: HTMLElement | null = null
  const reset = (t: HTMLElement) => RESET.forEach((k) => t.style.removeProperty(k))
  addEventListener('pointermove', (e) => {
    if (!fine.matches || calm.matches || e.pointerType !== 'mouse') return
    const t = (e.target as Element).closest<HTMLElement>('[data-tilt],.btn,.topcta,.chipm')
    if (cur && cur !== t) reset(cur)
    cur = t
    if (!t) return
    const r = t.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    if (t.hasAttribute('data-tilt')) { t.style.setProperty('--ry', x * 9 + 'deg'); t.style.setProperty('--rx', -y * 9 + 'deg') }
    else { t.style.setProperty('--tx', x * 10 + 'px'); t.style.setProperty('--ty', y * 8 + 'px') }
  }, { passive: true })
  document.addEventListener('pointerleave', () => { if (cur) reset(cur) })
}
