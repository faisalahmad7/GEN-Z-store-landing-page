// Tiny line icons for the logo idea (owner: the logo should include what the shop sells).
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 5, strokeLinejoin: 'round', strokeLinecap: 'round' } as const
export const Shirt = () => <svg viewBox="0 0 64 64" {...S} aria-hidden="true"><path d="M22 8 8 18l7 11 7-4v31h20V25l7 4 7-11L42 8c-2 5-6 7-10 7s-8-2-10-7Z" /></svg>
export const Shoe = () => <svg viewBox="0 0 64 64" {...S} aria-hidden="true"><path d="M6 44V22l12 6 8-8 10 10c8 2 22 4 22 14v2H6Z" /><path d="M6 50h52" /></svg>
export const Boot = () => <svg viewBox="0 0 64 64" {...S} aria-hidden="true"><path d="M17 7h27v25c0 5 3 9 9 11l5 2c4 2 6 5 6 10v2H7v-7c0-5 3-9 8-12l2-2Z" /><path d="M17 7v18h27M22 13h12M22 19h12M7 51h57" /></svg>
export const PerfumeBottle = () => <svg viewBox="0 0 64 64" {...S} aria-hidden="true"><path d="M25 6h14v9H25zM21 15h22v8H21zM18 23h28l5 8v25H13V31z" /><path d="M24 6V3h16v3M22 39h20M27 46h10" /></svg>
export const Cap = () => <svg viewBox="0 0 64 64" {...S} aria-hidden="true"><path d="M10 40c0-16 10-24 22-24s22 8 22 24Z" /><path d="M54 40c4 0 8 2 8 5H30" /></svg>
export const Drop = () => <svg viewBox="0 0 64 64" {...S} aria-hidden="true"><path d="M32 6c10 14 18 22 18 33a18 18 0 0 1-36 0C14 28 22 20 32 6Z" /><path d="M24 40a8 8 0 0 0 8 8" /></svg>
export const ICONS = { clothing: Shirt, footwear: Boot, accessories: Cap, perfumes: PerfumeBottle }

// Four product silhouettes used only by the clickable homepage hangings.
export const HeroTee = () => <svg viewBox="0 0 160 150" aria-hidden="true"><path d="M54 19 35 28 12 45l17 24 17-10v78h68V59l17 10 17-24-23-17-19-9c-5 10-13 15-26 15S59 29 54 19Z" fill="var(--tc)" stroke="#111" strokeWidth="5" strokeLinejoin="round"/><path d="M61 22c3 10 10 15 19 15s16-5 19-15" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round"/><path d="M56 72h48" stroke="#111" strokeWidth="3" strokeLinecap="round"/><path d="M67 87h26" stroke="#111" strokeWidth="3" strokeLinecap="round"/></svg>
export const HeroSneaker = () => <svg viewBox="0 0 190 125" aria-hidden="true"><path d="M15 58 31 36l16 8 16-25 19 7 18 27 29 10 30 8c13 4 20 13 18 25H27C13 96 7 86 9 75Z" fill="var(--tc)" stroke="#111" strokeWidth="5" strokeLinejoin="round"/><path d="m63 45 25 8M72 35l24 17M83 29l22 23M30 101h151" stroke="#111" strokeWidth="4" strokeLinecap="round"/><path d="M18 78c28 7 51 6 78-1" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>
export const HeroPerfume = () => <svg viewBox="0 0 120 180" aria-hidden="true"><path d="M45 8h30v17H45zM38 25h44v17H38z" fill="var(--tc)" stroke="#111" strokeWidth="5" strokeLinejoin="round"/><path d="M32 42h56l10 17v103H22V59z" fill="var(--tc)" stroke="#111" strokeWidth="5" strokeLinejoin="round"/><path d="M34 74h52v58H34z" fill="none" stroke="#111" strokeWidth="3"/><path d="M46 97h28M46 108h28" stroke="#111" strokeWidth="3" strokeLinecap="round"/><path d="M52 8V3h16v5" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round"/></svg>
export const HeroAccessory = () => <svg viewBox="0 0 150 170" aria-hidden="true"><path d="M58 5h34l8 42H50zM50 123h50l-8 42H58z" fill="var(--tc)" stroke="#111" strokeWidth="5" strokeLinejoin="round"/><rect x="30" y="42" width="90" height="86" rx="23" fill="var(--tc)" stroke="#111" strokeWidth="5"/><circle cx="75" cy="85" r="29" fill="none" stroke="#111" strokeWidth="4"/><path d="M75 85V66M75 85l16 9" stroke="#111" strokeWidth="4" strokeLinecap="round"/><circle cx="75" cy="85" r="4" fill="#111"/></svg>
export const HERO_ICONS = { clothing: HeroTee, footwear: HeroSneaker, accessories: HeroAccessory, perfumes: HeroPerfume }
// GEN-Z logo mark: a hang-tag (the shop's price-tag language) with a bold Z. The string loop doubles as a clothes-hanger hook.
export const Mark = () => (
  <svg viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 3a5 5 0 1 1-3.5 8.6" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M18 17h28l6 8v34H12V25z" fill="currentColor" />
    <circle cx="32" cy="24" r="2.8" fill="var(--mark-bg,#0e0e0f)" />
    <path d="M22 35h20L22 54h20" fill="none" stroke="var(--mark-bg,#0e0e0f)" strokeWidth="5.5" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
)
