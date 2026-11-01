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
  <svg viewBox="0 0 184 172" aria-hidden="true">
    <defs>
      <linearGradient id="tee-cloth" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity=".88" />
        <stop offset=".12" stopColor="color-mix(in srgb,var(--tc) 58%,white)" />
        <stop offset=".48" stopColor="var(--tc)" />
        <stop offset=".82" stopColor="color-mix(in srgb,var(--tc) 66%,#25242a)" />
        <stop offset="1" stopColor="#17171b" />
      </linearGradient>
      <linearGradient id="tee-edge" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity=".68" />
        <stop offset=".45" stopColor="#fff" stopOpacity=".12" />
        <stop offset="1" stopColor="#09090b" stopOpacity=".48" />
      </linearGradient>
      <clipPath id="tee-clip">
        <path d="M58 24 35 33 12 53l18 27 20-13v88q42 9 84 0V67l20 13 18-27-23-20-25-9c-7 13-17 19-33 19S65 37 58 24Z" />
      </clipPath>
    </defs>
    <path d="M58 24 35 33 12 53l18 27 20-13v88q42 9 84 0V67l20 13 18-27-23-20-25-9c-7 13-17 19-33 19S65 37 58 24Z" fill="#08080b" opacity=".52" transform="translate(4 7)" />
    <path d="M58 24 35 33 12 53l18 27 20-13v88q42 9 84 0V67l20 13 18-27-23-20-25-9c-7 13-17 19-33 19S65 37 58 24Z" fill="url(#tee-cloth)" stroke="#101014" strokeWidth="5.5" strokeLinejoin="round" />
    <g clipPath="url(#tee-clip)">
      <path d="M28 49 49 67l-2 84M156 49l-21 18 3 83" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="8" />
      <path d="M54 72c7 14 8 28 5 45M129 73c-7 13-8 26-5 43" fill="none" stroke="#17171b" strokeOpacity=".38" strokeWidth="5" strokeLinecap="round" />
      <path d="M66 45c-1 13-4 22-10 30M118 45c1 13 4 22 10 30" fill="none" stroke="#fff" strokeOpacity=".36" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 151q42 10 84 0" fill="none" stroke="#101014" strokeOpacity=".7" strokeWidth="4" />
      <path d="M51 155q41 8 82 0" fill="none" stroke="#fff" strokeOpacity=".56" strokeWidth="1.8" strokeDasharray="2.5 4" />
      <path d="M16 65 33 82M168 65l-17 17" fill="none" stroke="#fff" strokeOpacity=".38" strokeWidth="2.2" />
      <path d="M63 82q8 7 14 20M118 82q-8 7-14 20" fill="none" stroke="#fff" strokeOpacity=".3" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M74 95h36v24H74z" fill="#111" fillOpacity=".12" stroke="#fff" strokeOpacity=".48" strokeWidth="1.5" />
      <path d="M82 103h20M86 110h12" stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
    </g>
    <path d="M58 24c7 13 17 19 33 19s26-6 33-19" fill="none" stroke="#101014" strokeWidth="5.5" strokeLinecap="round" />
    <path d="M64 28c6 8 14 12 27 12s21-4 27-12" fill="none" stroke="#fff" strokeOpacity=".86" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M35 35 17 53l14 21 15-10M149 35l18 18-14 21-15-10" fill="none" stroke="#101014" strokeOpacity=".65" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M43 39 23 55M141 39l20 16" fill="none" stroke="url(#tee-edge)" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M12 53 30 80l20-13M172 53l-18 27-20-13" fill="none" stroke="#0c0c10" strokeWidth="3.4" strokeLinejoin="round" />
    <path d="M61 46q9 4 14 4M121 46q-9 4-14 4" fill="none" stroke="#fff" strokeOpacity=".52" strokeWidth="1.8" />
  </svg>
)
export const HeroSneaker = () => (
  <svg viewBox="0 0 208 150" aria-hidden="true">
    <defs>
      <linearGradient id="sneaker-mesh" x1="0" y1="0" x2=".9" y2="1">
        <stop offset="0" stopColor="#fff" />
        <stop offset=".38" stopColor="#e9e8e4" />
        <stop offset=".76" stopColor="#b6b5b4" />
        <stop offset="1" stopColor="#77777e" />
      </linearGradient>
      <linearGradient id="sneaker-leather" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff" />
        <stop offset=".38" stopColor="color-mix(in srgb,var(--tc) 25%,white)" />
        <stop offset="1" stopColor="color-mix(in srgb,var(--tc) 58%,#202027)" />
      </linearGradient>
      <linearGradient id="sneaker-rubber" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" />
        <stop offset=".22" stopColor="#e1dfda" />
        <stop offset="1" stopColor="#77777d" />
      </linearGradient>
      <linearGradient id="sneaker-mark" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="color-mix(in srgb,var(--tc) 75%,white)" />
        <stop offset="1" stopColor="var(--tc)" />
      </linearGradient>
    </defs>
    <ellipse cx="107" cy="129" rx="91" ry="10" fill="#000" opacity=".42" />
    <path d="M15 91 31 62l19-6 18-29 21 7 19 30 30 13 36 10c17 5 24 14 21 24-2 8-9 12-23 12H34c-18 0-26-9-19-22Z" fill="#050508" opacity=".62" transform="translate(3 7)" />
    <path d="M14 94 31 64l19-6 18-29 21 7 19 30 30 13 36 10c17 5 24 14 21 24-2 8-9 12-23 12H32c-17 0-25-9-18-22Z" fill="url(#sneaker-rubber)" stroke="#111116" strokeWidth="5" strokeLinejoin="round" />
    <path d="M20 97q48 11 100 5 42-5 70-1" fill="none" stroke="#fff" strokeOpacity=".94" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M26 105q62 9 131 0" fill="none" stroke="#77777d" strokeOpacity=".7" strokeWidth="2" strokeDasharray="5 4" />
    <path d="M17 83 33 62l17-4 18-29 21 7 19 30 30 13 31 8c-13 12-33 18-60 19-37 1-70-5-92-15Z" fill="url(#sneaker-mesh)" stroke="#111116" strokeWidth="4.5" strokeLinejoin="round" />
    <path d="M35 62 50 58l18-29 21 7 16 25-17 21-34-5Z" fill="url(#sneaker-mark)" stroke="#17171c" strokeWidth="3.5" strokeLinejoin="round" />
    <path d="M101 61q23 11 48 16l-15 17q-22-2-42-13Z" fill="url(#sneaker-leather)" stroke="#17171c" strokeWidth="3" strokeLinejoin="round" />
    <path d="M68 33 88 37 102 61 84 77 66 70 59 55Z" fill="#2a2b32" fillOpacity=".88" stroke="#111116" strokeWidth="2.8" />
    <path d="M76 37 89 42l10 16-11 13-17-6Z" fill="#f4f2ed" stroke="#a6a5a2" strokeWidth="1.8" />
    <path d="M51 59 67 34l10 2-14 29Z" fill="#fff" opacity=".78" />
    <path d="M31 75q18 10 39 8M128 91q25 1 39-7" fill="none" stroke="#111116" strokeOpacity=".58" strokeWidth="2.4" />
    <path d="M23 82q20 10 40 9" fill="none" stroke="#fff" strokeOpacity=".78" strokeWidth="2" />
    <path d="M72 42 92 48M68 48 89 56M64 54 85 64M60 60 81 72" stroke="#17171c" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M72 40 91 46M68 46 88 54M64 52 84 62M60 58 80 70" stroke="#fff" strokeOpacity=".92" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M69 40 64 47M91 47l-7 7M85 57l-7 7" fill="none" stroke="#777" strokeWidth="1.6" />
    <path d="M48 70q-4 10-6 21M53 72q-3 11-3 17M58 74q-1 8 0 15" fill="none" stroke="#8b8b90" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M113 70q14 8 29 12M119 65q13 8 28 12" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 88q7 8 18 9M186 94q-7 7-19 8" fill="none" stroke="#111116" strokeWidth="3" strokeLinecap="round" />
    <path d="M28 62 34 52l10-2M166 82l15 5" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
  </svg>
)
export const HeroPerfume = () => (
  <svg viewBox="0 0 138 194" aria-hidden="true">
    <defs>
      <linearGradient id="perfume-cap-metal" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#4a341a" />
        <stop offset=".16" stopColor="#f6e4ad" />
        <stop offset=".34" stopColor="#a77927" />
        <stop offset=".52" stopColor="#fff1bf" />
        <stop offset=".76" stopColor="#76501d" />
        <stop offset="1" stopColor="#e7c779" />
      </linearGradient>
      <linearGradient id="perfume-glass" x1="0" y1="0" x2="1" y2=".25">
        <stop offset="0" stopColor="#fff" stopOpacity=".93" />
        <stop offset=".12" stopColor="color-mix(in srgb,var(--tc) 35%,white)" stopOpacity=".88" />
        <stop offset=".4" stopColor="var(--tc)" stopOpacity=".76" />
        <stop offset=".72" stopColor="#4b3152" stopOpacity=".88" />
        <stop offset="1" stopColor="#fff" stopOpacity=".54" />
      </linearGradient>
      <linearGradient id="perfume-liquid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f4d78b" stopOpacity=".8" />
        <stop offset="1" stopColor="#9a6325" stopOpacity=".95" />
      </linearGradient>
      <clipPath id="perfume-body">
        <path d="M39 49h60l11 18v104q0 12-12 12H40q-12 0-12-12V67Z" />
      </clipPath>
    </defs>
    <ellipse cx="69" cy="184" rx="48" ry="7" fill="#000" opacity=".4" />
    <path d="M49 12h40v22H49z" fill="url(#perfume-cap-metal)" stroke="#302316" strokeWidth="3.8" />
    <path d="M43 34h52v15H43z" fill="url(#perfume-cap-metal)" stroke="#302316" strokeWidth="3.8" />
    <path d="M53 11V5h32v6M56 18h26" fill="none" stroke="#fff0c4" strokeWidth="2.3" strokeLinecap="round" />
    <path d="M39 49h60l11 18v104q0 12-12 12H40q-12 0-12-12V67Z" fill="#06060a" opacity=".56" transform="translate(4 6)" />
    <path d="M39 49h60l11 18v104q0 12-12 12H40q-12 0-12-12V67Z" fill="url(#perfume-glass)" stroke="#15141b" strokeWidth="5" strokeLinejoin="round" />
    <g clipPath="url(#perfume-body)">
      <path d="M24 112q44-5 92 0v72H24Z" fill="url(#perfume-liquid)" opacity=".72" />
      <path d="M25 111q43-6 90 0" fill="none" stroke="#fff1c5" strokeOpacity=".82" strokeWidth="2.4" />
      <path d="M33 70h9v91h-9zM94 68h9v93h-9z" fill="#fff" opacity=".19" />
      <path d="M43 72q8 38 3 90" fill="none" stroke="#fff" strokeOpacity=".84" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M98 78q-5 22-3 50" fill="none" stroke="#fff" strokeOpacity=".36" strokeWidth="2" strokeLinecap="round" />
      <path d="M44 163h48" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.7" />
    </g>
    <path d="M35 71h68v91H35z" fill="#201927" fillOpacity=".2" stroke="#f4e6c8" strokeOpacity=".7" strokeWidth="2" />
    <path d="M42 77h54v79H42z" fill="none" stroke="#fff" strokeOpacity=".26" strokeWidth="1.3" />
    <path d="M46 94h46v44H46z" fill="#211b2a" fillOpacity=".26" stroke="#f4e6c8" strokeWidth="1.6" />
    <path d="M51 104h36M55 113h28M58 122h22" stroke="#fff1d6" strokeOpacity=".85" strokeWidth="2" strokeLinecap="round" />
    <path d="M31 68h6M101 68h6" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" />
    <path d="M46 50h47" stroke="#fff" strokeOpacity=".55" strokeWidth="1.5" />
    <path d="M28 160v10q0 10 10 10M110 160v10q0 10-10 10" fill="none" stroke="#101014" strokeOpacity=".7" strokeWidth="3" />
  </svg>
)
export const HeroAccessory = () => (
  <svg viewBox="0 0 156 184" aria-hidden="true">
    <defs>
      <linearGradient id="watch-leather" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#111218" />
        <stop offset=".2" stopColor="#4a4850" />
        <stop offset=".46" stopColor="#201f26" />
        <stop offset=".7" stopColor="#5a5654" />
        <stop offset="1" stopColor="#101116" />
      </linearGradient>
      <linearGradient id="watch-steel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff7da" />
        <stop offset=".2" stopColor="#b6b4ae" />
        <stop offset=".42" stopColor="#f4e6bb" />
        <stop offset=".68" stopColor="#6c6253" />
        <stop offset=".86" stopColor="#e1ce9c" />
        <stop offset="1" stopColor="#66533a" />
      </linearGradient>
      <radialGradient id="watch-dial" cx=".27" cy=".2" r=".95">
        <stop offset="0" stopColor="#55535e" />
        <stop offset=".42" stopColor="#1c1c24" />
        <stop offset="1" stopColor="#050609" />
      </radialGradient>
    </defs>
    <ellipse cx="78" cy="94" rx="45" ry="83" fill="#000" opacity=".38" />
    <path d="M58 5h40l10 45-9 9H57l-9-9Z" fill="#08090e" opacity=".5" transform="translate(3 4)" />
    <path d="M58 5h40l10 45-9 9H57l-9-9Z" fill="url(#watch-leather)" stroke="#111116" strokeWidth="4.5" strokeLinejoin="round" />
    <path d="M57 126h42l9 8-10 45H58l-10-45Z" fill="#08090e" opacity=".5" transform="translate(3 3)" />
    <path d="M57 126h42l9 8-10 45H58l-10-45Z" fill="url(#watch-leather)" stroke="#111116" strokeWidth="4.5" strokeLinejoin="round" />
    <path d="M63 10h30M63 19h30M63 28h30M63 143h30M63 153h30M63 164h30" stroke="#fff" strokeOpacity=".16" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M58 7h40M58 177h40" stroke="#d2c5a8" strokeOpacity=".62" strokeWidth="1.4" strokeDasharray="2 4" />
    <path d="M57 48h42M56 132h44" stroke="#08090e" strokeWidth="4" />
    <rect x="25" y="43" width="106" height="91" rx="25" fill="#050609" opacity=".54" transform="translate(3 5)" />
    <rect x="25" y="43" width="106" height="91" rx="25" fill="url(#watch-steel)" stroke="#15151a" strokeWidth="5" />
    <rect x="33" y="51" width="90" height="75" rx="19" fill="url(#watch-dial)" stroke="#f2dda9" strokeWidth="2.8" />
    <rect x="40" y="58" width="76" height="61" rx="14" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="1.3" />
    <circle cx="78" cy="88" r="31" fill="none" stroke="#e9d6a7" strokeOpacity=".84" strokeWidth="1.7" />
    <circle cx="78" cy="88" r="25" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="1.1" />
    <path d="M78 60v6M78 110v6M50 88h6M100 88h6M58 68l5 5M93 103l5 5M98 68l-5 5M63 103l-5 5" stroke="#e6cd8d" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M78 88V68M78 88l17 11" stroke="#fff2cf" strokeWidth="3.4" strokeLinecap="round" />
    <circle cx="78" cy="88" r="3.7" fill="#fff2cf" />
    <path d="M45 63q25-17 61-4" fill="none" stroke="#fff" strokeOpacity=".48" strokeWidth="4" strokeLinecap="round" />
    <path d="M131 78h8v24h-8" fill="url(#watch-steel)" stroke="#15151a" strokeWidth="2.5" />
    <path d="M139 82v16M143 83v14" stroke="#fff2cf" strokeOpacity=".7" strokeWidth="1.5" />
    <path d="M31 57q8-6 15-5M111 121q7-3 9-10" fill="none" stroke="#fff" strokeOpacity=".38" strokeWidth="2" />
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
