# GEN-Z men's boutique site (Vite + React 19 + TypeScript + GSAP)

Phone-first redesign (v5). Home `/` and four rooms: `/clothing`, `/footwear`, `/accessories`, `/perfumes`.

## Commands
- `npm install` then `npm run dev` / `npm run build` (typechecks, then builds) / `npm run preview`
- `npm test`: WhatsApp link tests + a check that every hand-picked photo id still exists in `src/photos.json`
- `npm run images`: rebuilds `public/photos` + `src/photos.json` from the owner's local Windows photo folders (not runnable elsewhere). If it renames files, re-pin ids in `src/data.ts` (`PICKS`, `SIGN_PHOTO`); `npm test` will tell you.

## What the redesign is
- One stylesheet, `src/site.css`, written for phones; `min-width` queries enhance tablet/desktop. (`styles.css`, `v4.css`, `fx.ts`, `Cursor.tsx`, `useReveal.ts` and the Bowlby One font were removed.)
- Logo: a hang-tag with a Z (`Mark` in `src/Icons.tsx`, favicon in `public/favicon.svg`); the four hanging tags in the hero carry the shirt / shoe / cap / perfume icons.
- Home: tag hero over the real shop photo, manifesto, a deck of four sticky room cards (each with its own signature), the shop's real "level up" wall sign, numbered trust rows, a contained photo rail, quote-led Google reviews, and a shared footer that is also the visit block.
- Rooms: clothing = garment-label frames on a hanger; footwear = tread track + staircase of photos; accessories = taped photos + draggable sticker tray (decorative, hidden from screen readers, with reset); perfumes = arch frames + scent lines that draw once.
- Motion: GSAP only plays short once-only timelines (hero, rooms, gallery); everything is final-state visible with `prefers-reduced-motion`. Desktop mouse can drag the hero tags. No smooth-scroll lib, no pinning, no always-on effects except the CSS marquee.
- Big headings stay hidden until the display fonts load (2.5 s cap, `src/main.tsx`) so the font swap cannot shift the layout.

## Owner to confirm before launch
- The WhatsApp number (`src/wa.js`) is WhatsApp-enabled; the "authentic / genuine" wording; closing time (none is shown); Maps rating/review count (4.8 / 44, re-check).
