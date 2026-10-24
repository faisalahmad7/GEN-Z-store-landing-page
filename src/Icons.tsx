// Tiny line icons for the logo idea (owner: the logo should include what the shop sells).
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 5, strokeLinejoin: 'round', strokeLinecap: 'round' } as const
export const Shirt = () => <svg viewBox="0 0 64 64" {...S} aria-hidden="true"><path d="M22 8 8 18l7 11 7-4v31h20V25l7 4 7-11L42 8c-2 5-6 7-10 7s-8-2-10-7Z" /></svg>
export const Shoe = () => <svg viewBox="0 0 64 64" {...S} aria-hidden="true"><path d="M6 44V22l12 6 8-8 10 10c8 2 22 4 22 14v2H6Z" /><path d="M6 50h52" /></svg>
export const Cap = () => <svg viewBox="0 0 64 64" {...S} aria-hidden="true"><path d="M10 40c0-16 10-24 22-24s22 8 22 24Z" /><path d="M54 40c4 0 8 2 8 5H30" /></svg>
export const Drop = () => <svg viewBox="0 0 64 64" {...S} aria-hidden="true"><path d="M32 6c10 14 18 22 18 33a18 18 0 0 1-36 0C14 28 22 20 32 6Z" /><path d="M24 40a8 8 0 0 0 8 8" /></svg>
export const ICONS = { clothing: Shirt, footwear: Shoe, accessories: Cap, perfumes: Drop }
// GEN-Z logo mark: a hang-tag (the shop's price-tag language) with a bold Z. The string loop doubles as a clothes-hanger hook.
export const Mark = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 3a5 5 0 1 1-3.5 8.6" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M18 17h28l6 8v34H12V25z" fill="currentColor" />
    <circle cx="32" cy="24" r="2.8" fill="var(--mark-bg,#0e0e0f)" />
    <path d="M22 35h20L22 54h20" fill="none" stroke="var(--mark-bg,#0e0e0f)" strokeWidth="5.5" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
)
