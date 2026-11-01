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
export const HeroTee = () => (
  <svg viewBox="0 0 180 166" aria-hidden="true">
    <defs>
      <linearGradient id="tee-fabric" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="color-mix(in srgb,var(--tc) 72%,white)" />
        <stop offset=".46" stopColor="var(--tc)" />
        <stop offset="1" stopColor="color-mix(in srgb,var(--tc) 62%,#202027)" />
      </linearGradient>
      <linearGradient id="tee-sheen" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity=".38" />
        <stop offset=".42" stopColor="#fff" stopOpacity=".03" />
        <stop offset="1" stopColor="#111" stopOpacity=".18" />
      </linearGradient>
    </defs>
    <path d="M56 25 34 34 12 54l18 25 19-12v81h82V67l19 12 18-25-22-20-25-10c-6 12-16 18-32 18S62 37 56 25Z" fill="#050507" opacity=".42" transform="translate(3 6)" />
    <path d="M56 25 34 34 12 54l18 25 19-12v81h82V67l19 12 18-25-22-20-25-10c-6 12-16 18-32 18S62 37 56 25Z" fill="url(#tee-fabric)" stroke="#171719" strokeWidth="4.5" strokeLinejoin="round" />
    <path d="M56 25 34 34 12 54l18 25 19-12v81h82V67l19 12 18-25-22-20-25-10c-6 12-16 18-32 18S62 37 56 25Z" fill="url(#tee-sheen)" />
    <path d="M56 25c6 12 16 18 32 18s26-6 32-18" fill="none" stroke="#171719" strokeWidth="5" strokeLinecap="round" />
    <path d="M63 28c5 7 13 11 25 11s20-4 25-11" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M49 68v74M131 68v74M60 147h56" fill="none" stroke="#fff" strokeOpacity=".42" strokeWidth="1.8" strokeDasharray="3 4" />
    <path d="M30 77 44 89M150 77l-14 12" fill="none" stroke="#171719" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
    <path d="M75 81h27" stroke="#fff" strokeOpacity=".72" strokeWidth="3" strokeLinecap="round" />
    <path d="M82 92h13" stroke="#171719" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
  </svg>
)
export const HeroSneaker = () => (
  <svg viewBox="0 0 200 140" aria-hidden="true">
    <defs>
      <linearGradient id="sneaker-upper" x1="0" y1="0" x2=".9" y2="1">
        <stop offset="0" stopColor="#fff" />
        <stop offset=".42" stopColor="#e5e4e0" />
        <stop offset="1" stopColor="#85858a" />
      </linearGradient>
      <linearGradient id="sneaker-sole" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" />
        <stop offset="1" stopColor="#a9a9a9" />
      </linearGradient>
      <linearGradient id="sneaker-accent" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="color-mix(in srgb,var(--tc) 70%,white)" />
        <stop offset="1" stopColor="var(--tc)" />
      </linearGradient>
    </defs>
    <ellipse cx="103" cy="119" rx="85" ry="9" fill="#000" opacity=".38" />
    <path d="M16 82 31 55l19-3 15-27 22 8 19 28 29 11 34 9c15 4 22 13 20 23-1 7-7 10-19 10H32c-16 0-24-8-20-19Z" fill="#111" opacity=".45" transform="translate(2 6)" />
    <path d="M13 86 31 58l19-3 15-27 22 8 19 28 29 11 34 9c15 4 22 13 20 23-1 7-7 10-19 10H29c-15 0-23-8-16-19Z" fill="url(#sneaker-sole)" stroke="#171719" strokeWidth="4" strokeLinejoin="round" />
    <path d="M17 92c24 6 54 8 91 6 37-2 61-6 80-1" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    <path d="M17 83 34 59l16-4 15-27 22 8 19 28 29 11 31 8c-13 9-31 14-54 15-38 2-69-2-95-10Z" fill="url(#sneaker-upper)" stroke="#171719" strokeWidth="4" strokeLinejoin="round" />
    <path d="M34 59 50 55l15-27 22 8 19 28-17 17-34-5Z" fill="url(#sneaker-accent)" stroke="#171719" strokeWidth="3" strokeLinejoin="round" />
    <path d="m70 41 17 8-10 14-19-5Z" fill="#fff" opacity=".8" />
    <path d="M83 37 97 51 87 64 70 56Z" fill="#303039" opacity=".9" />
    <path d="M96 57 116 66l-12 18-20-8Z" fill="#f5f3ed" stroke="#777" strokeWidth="2" />
    <path d="m72 38 17 8M68 45l18 8M64 52l17 8" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    <path d="M90 39 99 52M86 47l9 12" stroke="#171719" strokeOpacity=".65" strokeWidth="2" strokeLinecap="round" />
    <path d="M112 66c15 7 28 12 46 14" fill="none" stroke="#fff" strokeOpacity=".8" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M30 83c31 9 75 12 119 3" fill="none" stroke="#171719" strokeOpacity=".35" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M19 90c4 6 13 9 25 9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
)
export const HeroPerfume = () => (
  <svg viewBox="0 0 132 190" aria-hidden="true">
    <defs>
      <linearGradient id="scent-glass" x1="0" y1="0" x2="1" y2=".2">
        <stop offset="0" stopColor="#fff" stopOpacity=".85" />
        <stop offset=".18" stopColor="color-mix(in srgb,var(--tc) 55%,white)" stopOpacity=".82" />
        <stop offset=".52" stopColor="var(--tc)" stopOpacity=".72" />
        <stop offset=".82" stopColor="#25202b" stopOpacity=".84" />
        <stop offset="1" stopColor="#fff" stopOpacity=".5" />
      </linearGradient>
      <linearGradient id="scent-cap" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff1bb" />
        <stop offset=".35" stopColor="#c99a37" />
        <stop offset=".68" stopColor="#6c4718" />
        <stop offset="1" stopColor="#f7d77d" />
      </linearGradient>
    </defs>
    <ellipse cx="66" cy="177" rx="43" ry="7" fill="#000" opacity=".36" />
    <path d="M47 13h38v22H47z" fill="url(#scent-cap)" stroke="#2b2117" strokeWidth="3" />
    <path d="M42 35h48v15H42z" fill="url(#scent-cap)" stroke="#2b2117" strokeWidth="3" />
    <path d="M52 13V5h28v8" fill="none" stroke="#f9e8b7" strokeWidth="3" strokeLinecap="round" />
    <path d="M33 49h66l9 17v100c0 7-5 11-12 11H36c-7 0-12-4-12-11V66Z" fill="#050507" opacity=".38" transform="translate(3 5)" />
    <path d="M33 49h66l9 17v100c0 7-5 11-12 11H36c-7 0-12-4-12-11V66Z" fill="url(#scent-glass)" stroke="#171719" strokeWidth="4" />
    <path d="M32 80h68v72H32z" fill="#1b1820" fillOpacity=".28" stroke="#e8d9bd" strokeOpacity=".58" strokeWidth="2" />
    <path d="M37 84h58v64H37z" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="1.5" />
    <path d="M31 68h8v91h-8zM96 68h7v91h-7z" fill="#fff" opacity=".16" />
    <path d="M39 76v74" stroke="#fff" strokeOpacity=".72" strokeWidth="3" strokeLinecap="round" />
    <path d="M48 89h37" stroke="#fff" strokeOpacity=".52" strokeWidth="2" strokeLinecap="round" />
    <path d="M54 108h25M58 117h17" stroke="#f4e7cb" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M41 160h50" stroke="#fff" strokeOpacity=".55" strokeWidth="2" />
    <path d="M28 63h7M97 63h7" stroke="#f7edda" strokeWidth="3" strokeLinecap="round" />
  </svg>
)
export const HeroAccessory = () => (
  <svg viewBox="0 0 150 178" aria-hidden="true">
    <defs>
      <linearGradient id="watch-strap" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#14151a" />
        <stop offset=".48" stopColor="#57545a" />
        <stop offset="1" stopColor="#17171c" />
      </linearGradient>
      <linearGradient id="watch-case" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff0bc" />
        <stop offset=".25" stopColor="#b78b32" />
        <stop offset=".52" stopColor="#513917" />
        <stop offset=".78" stopColor="#e7c36d" />
        <stop offset="1" stopColor="#6d4c20" />
      </linearGradient>
      <radialGradient id="watch-face" cx=".28" cy=".18" r=".9">
        <stop offset="0" stopColor="#44434a" />
        <stop offset=".5" stopColor="#15151a" />
        <stop offset="1" stopColor="#050507" />
      </radialGradient>
    </defs>
    <ellipse cx="75" cy="91" rx="42" ry="79" fill="#000" opacity=".28" />
    <path d="M57 5h36l10 43-7 4H54l-7-4Z" fill="url(#watch-strap)" stroke="#0a0a0d" strokeWidth="4" />
    <path d="M54 126h42l7 4-10 43H57l-10-43Z" fill="url(#watch-strap)" stroke="#0a0a0d" strokeWidth="4" />
    <path d="M58 8h34M60 165h30" stroke="#a7a5a3" strokeOpacity=".65" strokeWidth="1.7" strokeDasharray="3 4" />
    <path d="M63 17h24M63 30h24M63 143h24M63 156h24" stroke="#fff" strokeOpacity=".16" strokeWidth="2" strokeLinecap="round" />
    <rect x="30" y="43" width="90" height="88" rx="23" fill="url(#watch-case)" stroke="#171719" strokeWidth="4" />
    <rect x="38" y="51" width="74" height="72" rx="18" fill="url(#watch-face)" stroke="#f3d88e" strokeWidth="2.5" />
    <circle cx="75" cy="87" r="30" fill="none" stroke="#f5e0aa" strokeOpacity=".85" strokeWidth="1.5" />
    <circle cx="75" cy="87" r="23" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="1" />
    <path d="M75 61v5M75 108v5M49 87h5M96 87h5M57 69l4 4M89 101l4 4M93 69l-4 4M61 101l-4 4" stroke="#e7c878" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M75 87V69M75 87l15 10" stroke="#f7e9c8" strokeWidth="3" strokeLinecap="round" />
    <circle cx="75" cy="87" r="3.5" fill="#f7e9c8" />
    <path d="M48 62c13-10 31-12 48-5" fill="none" stroke="#fff" strokeOpacity=".42" strokeWidth="4" strokeLinecap="round" />
    <path d="M120 72h7v26h-7" fill="url(#watch-case)" stroke="#171719" strokeWidth="2" />
  </svg>
)
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
