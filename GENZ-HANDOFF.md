# GEN-Z website: handoff file for the next Claude chat

Paste this whole file into a new Claude chat (or attach it) and say:
"Read GENZ-HANDOFF.md fully, then continue the GEN-Z build from the STOP POINT section. Follow the Ponytail coding rules in section 3. Do not restart or re-research."

Last updated: 2026-10-26 (v6 audit batch, see the v6 UPDATE block below); previous: 2026-10-24 (v4.2: headings can't wrap, click-to-open photo viewer, ALL photos used, hero collage, light animation back; typechecked with tsc = 0 errors; earlier v4.1: lag fixes, new boutique palette, hero photo slot, no forced horizontal scroll, no-crop WebP pipeline with orientation/colour analysis; source only, never built by Claude)

---

## v6 UPDATE (2026-10-26): audit + small correctness/a11y batch (UNCOMMITTED, delivered as a patch)

Environment of this session: Claude cloud sandbox, Free plan. `npm ci` FAILED: the egress proxy returns 403 for registry.npmjs.org (policy block, not a project fault), so `node_modules`, `npm run build`, real `tsc` and any browser render were NOT possible. The live site (gen-z-store-landing-page.vercel.app) is also blocked at the proxy; WebFetch only showed the same `<title>` and meta description as `index.html`, nothing about the JS bundle. Compared: repo HEAD 121efad (shallow clone, one commit) vs production: NOT compared beyond title/description.

Audit summary (read from source, current HEAD):
- Routing: custom History-API router (`src/router.tsx`, `usePath`, `go`, `Link`); `/` = `pages/Hub.tsx`, `/clothing|/footwear|/accessories|/perfumes` = lazy `pages/Category.tsx` driven by `CATS` in `src/data.ts`. `vercel.json` rewrites everything to `/index.html`.
- Shared: `Footer.tsx` (visit block, used on every page), `Photo.tsx` (img + manifest helpers), `Lightbox.tsx`, `Wiggle.tsx`, `Seal.tsx`, `Icons.tsx`, dock nav in `App.tsx`. Single stylesheet `src/site.css`.
- Motion: GSAP only (`src/motion.ts`: `useMotion` = gsap.matchMedia + revert on unmount, reduced motion returns before any tween; `useFit` shrinks headings to one line). Draggable hero tags only with `(hover:hover) and (pointer:fine)`. `@gsap/react` and `motion` are NOT dependencies. `main.tsx` does not use StrictMode (effects do clean up). Headings are `visibility:hidden` until `html.fonts-ok`, set after fonts load OR a 2.5 s cap (also on rejection), so they cannot stay hidden.
- Media (script-verified this session): 73 photos x 3 WebP widths = 219 files in `public/photos`, 0 missing vs `src/photos.json`, 0 orphans, every entry has real w/h, orientation flags consistent with w/h, 27 MB on disk. `hero` array in photos.json (3 entries, repeats of clothing-004/005, perfumes-001) is not used by current code. NOT visually inspected this session (no image viewing).
- Pinned picks (`PICKS`, `SIGN_PHOTO`) all resolve (`src/picks.test.js` passes).
- `scripts/make-images.mjs` DELETES `public/photos` before regenerating and reads `D:\WEBDEV\GEN Z mens boutique\IMAGES`; `photos-in/` holds only a README. Do not run it without the originals, or the photos are gone (they are in git, so recoverable).

Changes (files: `src/router.tsx`, `src/path.js` new, `src/path.test.js` new, `src/App.tsx`, `src/Footer.tsx`, `src/Photo.tsx`, `index.html`, `package.json`):
1. `Link` no longer swallows ctrl/cmd/shift/alt-click or middle-click (open-in-new-tab was broken); it now forwards any `<a>` prop.
2. `/clothing/`, `/Clothing` etc. rendered the HOME page (exact string match). New `normPath` (strip trailing slashes, lowercase) used by `usePath` and `go`. Covered by `src/path.test.js`; `npm test` now runs it.
3. Dock links get `aria-current="page"` (only a CSS class before).
4. Hub had two `<nav aria-label="Rooms">` (hero tags and footer): footer is now "Footer rooms".
5. Footer wordmark `div` had `aria-label` with no role: added `role="img"`.
6. Removed dead `data-cursor` attribute in `Photo.tsx` (Cursor was removed in v5).
7. `index.html`: Open Graph + twitter:card tags reusing the existing title/description. No `og:image` or canonical, because the final domain is unknown.
Tests run: `node --test src/wa.test.js src/picks.test.js src/path.test.js` = 5 pass, 0 fail (an earlier run of the original two files: 3 pass). Syntax-only esbuild transpile of the 5 changed source files = OK. NOT run: `npm run build`, `tsc`, lint (none configured), any browser, reduced-motion test, Lighthouse.
Side effects to check on first real build: `Link` prop typing (now `ComponentProps<'a'>`), `.js` import from TSX (same pattern as `wa.js`).

OUTSTANDING
- Unverified: `npm run build`/`tsc` on these edits; browser behaviour of every route, hero tag drag (click-vs-drag on the `<a>` tags), reduced motion, real iPhone, Lighthouse; production vs HEAD comparison.
- Candidate (not changed, no measurement): category hero `.collage figure` and `.mega` letters animate from `opacity:0`, which may delay LCP on room pages; measure first. Strip photos all share the same alt text. JSON-LD LocalBusiness not added.
- Owner decisions (unchanged): WhatsApp number is WhatsApp-enabled; "authentic/genuine" wording; closing time; 4.8 / 44 rating (re-check); final domain for canonical/og:image.
- NEXT 3 ACTIONS: (1) on the owner machine run `npm ci && npm run build && npm test`, fix anything from the typed `Link`; (2) open `/`, `/clothing/` and ctrl-click a dock link to confirm items 1-3 in a real browser, then run Lighthouse on the deployed URL; (3) decide domain, then add canonical + `og:image` (+ optional LocalBusiness JSON-LD from `SHOP` in `src/data.ts`).

CONTINUE FROM HERE (next Claude): read this file and README.md; run `git status` and inspect the real code; re-run `npm ci`, `npm run build`, `npm test` yourself instead of trusting the results above; do not redo the items listed as done; keep the photo picks, palette, tags and copy; update this same file. If `npm` is blocked by a proxy (403), say so and work from source only. Do not commit or push without the owner's approval. Section 12's file list and STOP POINT below are older (v4.3); README.md and this block are current.

## v5 UPDATE (2026-10-24): phone-first redesign implemented and built

STOP POINT NOW: the redesign in README.md is in the source and was built, rendered and checked (see README + the checks below). Remaining: real-iPhone test, Lighthouse on a deployed URL, owner confirmations (README), optional polish.
- Checked here: tsc 0 errors; `npm test` 3/3; five routes at 320/375/390/430/768/1024/1440 px: no horizontal overflow, no console errors, no broken images; lightbox (keyboard, focus trap/restore, swipe), back/forward, active dock state, tap targets >= 44px, reduced motion.
- Measured (Chromium, 390px phone emulation, 4x CPU throttle, ~1.6 Mbps/150 ms, gzip, median of 3; NOT Lighthouse): FCP 1.6-2.1 s, LCP 2.4-3.6 s, CLS 0-0.034, TBT approx 70-175 ms, transfer 560-680 KB (mostly photos).
- Not done: real iPhone/Safari test, Lighthouse, a build with the real Vite binary (built here with esbuild because npm's registry was blocked; `npm run build` unverified in this environment, tsc passes).

## 1. The client and the goal

- Store: GEN-Z (Devanagari on Maps: जन-ज़), men's boutique, Instagram @genz.formens
- Address: Shop No 17, HM Royal Society, opp. main gate, Kondhwa, Pune, Maharashtra 411048 (Google Maps lists it as located in Talab Factory; plus code FV6R+JF)
- Phone: 093735 58814 (WhatsApp link form would be https://wa.me/919373558814; the owner should confirm this is his WhatsApp number)
- Hours: the only thing known is "opens 11 am". Closing time is UNKNOWN: ask the user before showing any closing time or a live "open now" badge.
- Google Maps: 4.8 rating from 44 reviews. Services listed: in-store shopping, in-store pick-up, delivery.
- Sells (all men's): clothing, footwear, accessories, perfumes. Clothes and footwear skew to a younger (Gen Z) audience, as the name suggests.
- Owner's own idea: the logo itself should include the things the shop sells.
- Review snippets on the Maps listing (real, but several are about 5 years old, so show with "Google reviews" attribution and don't present them as recent): "amazing collection with lots of variety at best price", "awesome quality and reasonable rate, customer service is also good", "amazing place for shoes with new varieties never seen before". A reviewer also mentions the owner arranged a specific loafer within a few hours.
- The user is a web developer building this for the shop owner.

## 2. What the user asked for (their words, summarised)

- VERY unique, "crazy", NOT generic. Award-winning (Awwwards-style) design and animation, with features that feel cool to Gen Z.
- Uses React and light, efficient tech so the code and performance stay light.
- Must be TOTALLY optimized for phones, especially iPhones. Design the iPhone layout first, then widen for desktop (rules in section 5b).
- Each of the 4 categories (Clothing, Footwear, Accessories, Perfumes) is important: each gets its OWN hero section and its OWN page, but the whole thing is one app that feels multi-page and still loads quickly.
- Performance must be measured and kept healthy: First Contentful Paint, Largest Contentful Paint, Total Blocking Time, Cumulative Layout Shift, Speed Index.
- Photos exist but are large; the user will share them (section 10).
- Animation ideas may be drawn from prompt/component libraries (section 8).
- The user asked for the Ponytail coding rules (github.com/DietrichGebert/ponytail) to be used in the code. See section 3.
- If the chat limit is near, hand over an incomplete but well-documented project plus this file so the next chat continues exactly where the last one stopped.

## 3. Coding rules: Ponytail ("lazy senior dev")

Source: github.com/DietrichGebert/ponytail (MIT licence). It is NOT a code library. It is a prompt/skill that makes an AI agent write the smallest complete change. The rules below are a condensed copy of its AGENTS.md / skills/ponytail/SKILL.md. Level used here: **full** (default).

How to get it:
- In Claude Code: `/plugin marketplace add DietrichGebert/ponytail` then `/plugin install ponytail@ponytail`. Only install from `DietrichGebert/ponytail` on GitHub or `@dietrichgebert/ponytail` on npm.
- In a normal Claude chat or any other agent: follow the rules below as written; if building a project folder, also copy the repo's `AGENTS.md` into the project root.
- Useful commands where supported: `/ponytail-review` (review the diff), `/ponytail-audit` (whole repo, ranked), `/ponytail-debt` (collects `shortcut:` comments). If not supported, do the same checks by hand at milestone (f).

The rules:
1. Before writing, read the task and the code it touches. List everywhere the change must reach: callers, tests, fixtures, config, exports. Check what it could break for users. That is scope. Extra features are not scope.
2. Take the first option that fully works:
   1. Does it need to exist? Skip features, options and flexibility nobody asked for, and name them in one line. A vague request gets the smallest version that does the core job.
   2. Already in this codebase (helper, component, pattern)? Reuse it the way surrounding code does.
   3. Standard library or a native platform feature? Use it, unless the project has its own.
   4. An installed dependency? Use it. Never add a dependency for a few lines.
   5. Can it be one line a reader gets at a glance? One line.
   6. Otherwise the minimum code that works.
3. Lazy about the solution, never about the change: finish every part the task needs, including callers, tests and fixtures the change breaks.
4. No abstraction, wrapper, option, config, boilerplate or "for later" code nobody asked for. Deletion beats addition. Keep the structure the codebase already has.
5. Comments only for the "why" the code can't show, in one line.
6. Code you move or merge keeps its error handling and validation. Between options of equal size, take the one correct on edge cases.
7. New non-trivial logic (a branch, a loop, a parser, money or security) leaves one small test or an assert-based self-check. Trivial changes need none.
8. A shortcut with a known limit gets a comment in this form: `shortcut: <the limit>, <when to upgrade>`.
9. NEVER cut: validation at trust boundaries, error handling that prevents data loss, security, accessibility, anything the user asked for.
10. End every reply with one or two lines: what was skipped or not checked, and any risk the user must know.

How this applies to a "crazy, not generic" site (important):
- Ponytail limits how much code it takes to deliver a feature, not how ambitious the features are. The bold design, per-category heroes and the animations were ASKED for, so they are never cut. What gets cut: speculative abstractions, component-library sprawl, config layers, extra dependencies, and effects built the long way when a native way exists.
- Every dependency needs a one-line reason in the final summary ("GSAP: hero timelines CSS can't do").

## 4. Decisions made vs. still open

DECIDED
- React (user's requirement), four category pages inside one single-page app, each with its own hero.
- Mobile-first and iPhone-first (user's requirement): section 5b is the rulebook and overrides desktop-first habits.
- Stack per section 5 (Ponytail ladder applied).
- Honest content only: no invented prices, offers, awards, years in business or testimonials.

STILL OPEN (ask the user once, early, in one short message)
- Art direction. The user has not chosen. Options offered:
  1. "GEN-Z OS": the site is a retro desktop/OS; categories are folders and windows.
  2. "Tactile street": hard borders, hard shadows, sticker tags, mono type, one neon accent.
  3. Dark editorial drop: cinematic dark mode with WebGL (most Awwwards-looking, heaviest, most common).
  Recommended default if the user doesn't pick: option 1 as the shell with option 2 as an accent, plus at most ONE lazy heavy-effect moment (research notes that full-page brutalism is cooling, while it works well as an accent).
- Store closing time, final logo files, which photos belong to which category.

## 5. Stack, with the Ponytail ladder applied (native first)

Base: Vite + React + TypeScript (TypeScript costs nothing at runtime). Optional: alias react to preact/compat if the bundle budget gets tight. Deploy as static files (Vercel or similar); deliver a zip of the project unless the user asks otherwise.

| Need | Native / zero-dependency first | Add a dependency only if |
|---|---|---|
| Routing for `/`, `/clothing`, `/footwear`, `/accessories`, `/perfumes` | A small History API hook (about 15 lines) plus `React.lazy` per page | never needed |
| Page transitions | View Transitions API with a plain CSS fallback | never needed |
| Prefetch next page | `import()` on link hover or when the link enters the viewport | never needed |
| Reveals and progress on scroll | CSS scroll-driven animations (with a fallback; support is uneven) and IntersectionObserver | the choreography needs a timeline CSS can't express |
| Hero timelines, velocity-based motion | GSAP core + ScrollTrigger (now used, see section 12 v4) (this is the one animation library; justified by the "crazy animation" requirement) | already justified |
| Smooth scroll | Native scrolling and CSS scroll-snap first | Lenis only if the feel genuinely needs inertia; give a one-line reason |
| Magnetic cursor | CSS plus about 20 lines of pointer-event JS, desktop pointers only | never needed |
| Draggable stickers (Accessories) | Pointer events, about 30 lines | never needed |
| Marquees, hover effects, border animations | CSS keyframes/transforms | never needed |
| Colored backgrounds with product photos | `mix-blend-mode: multiply` | never needed |
| Mist / fog (Perfumes hero) | CSS/SVG or canvas 2D first | OGL (about 24 KB gzipped, versus about 160 KB for three.js), lazy-loaded after first paint, only if the look can't be reached otherwise |
| Images | Native `<picture>`, `srcset`, `width`/`height`, `loading`, `fetchpriority`; `sharp` at build time only (dev dependency) to make AVIF/WebP/JPEG | never needed |
| Fonts | Self-hosted WOFF2, subset, `font-display: swap`, one preload, metric-matched fallback. Devanagari जन-ज़ drawn as outlined SVG in the logo so no Devanagari font is shipped | never needed |
| State | `useState` / `useReducer` | never needed |
| Styling | Plain CSS with custom properties | not needed |
| Tests | `node --test` on small pure helpers kept in plain `.js` files (WhatsApp message builder, scent-quiz mapping, open/closed logic) | not needed |

## 5b. Mobile and iPhone rules (design and build for these FIRST)

All iPhone browsers (Safari, Chrome, Firefox) run on WebKit, so Safari behaviour is the target. Write mobile-first CSS (base styles for phones, `min-width` queries for larger screens). Items marked (verify) come from memory rather than the research, so check them.

1. Viewport tag: `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`. Never disable pinch-zoom (accessibility).
2. Full-screen heights: do not rely on `100vh` (it ignores Safari's changing toolbar). Declare `100vh` first as a fallback, then `100svh` (or `100dvh`); these units work on iOS 15.4 and later.
3. Safe areas: fixed bars near an edge (bottom dock, top bar) get `padding-bottom: env(safe-area-inset-bottom)` and the matching top/side insets. This is a normal Safari tab, not an installed home-screen app (WebKit reports odd heights with viewport-fit=cover in installed apps), so test in a real Safari tab.
4. Form fields: every input, textarea and select (quiz, Fit Check) uses font-size of at least 16px, otherwise iOS zooms in on focus.
5. Hover: wrap hover-only styles in `@media (hover: hover) and (pointer: fine)`, otherwise touch devices need a double tap. Every hover reveal (perfume notes, product details) needs a tap equivalent. Give buttons an `:active` state for tactile feedback.
6. Video: in iOS Low Power Mode, autoplay is blocked and a play button appears, and Low Power Mode cannot be detected. So every hero must look finished with a still poster image alone; any video is a muted, `playsinline`, poster-backed extra, and the LCP element is the poster image, never the video. Default: no autoplay video.
7. Tilt/gyro effects: iOS needs `DeviceOrientationEvent.requestPermission()` called from a user tap, on HTTPS. For "Sole Lab" on phones use touch drag/swipe. Skip gyro unless the user asks (Ponytail rule 1).
8. CSS scroll-driven animations only run on Safari 26 and later (shipped September 2025), so many iPhones will not run them. Wrap them in `@supports (animation-timeline: view())` and keep all content visible and usable without them; use IntersectionObserver for the fallback.
9. View Transitions: same-document transitions work from Safari 18. Feature-check `document.startViewTransition` and fall back to an instant swap.
10. Touch handling: tap targets at least 44 by 44 px (Apple's guideline, verify); pointer events for drags; `touch-action: none` ONLY on draggable stickers and `touch-action: pan-y` on horizontal rails so vertical scrolling keeps working; passive listeners; `-webkit-tap-highlight-color: transparent` with own `:active` styles; `-webkit-touch-callout: none` and `user-select: none` on draggable items (verify); `overscroll-behavior: contain` on drawers and modals (Safari 16+).
11. Scrolling: native scrolling on phones, no scroll-jacking. If Lenis is ever added, desktop only.
12. Layout: one-handed use first. A bottom dock (Home + the 4 categories) in the thumb zone on phones, with safe-area padding, suits the "GEN-Z OS" idea. Fluid type with `clamp()`. No horizontal page scroll. Test widths 375, 390, 393 and 430 px (typical iPhone widths, verify) plus 360 px for small Android phones, and landscape.
13. Effects budget on phones: no WebGL by default (CSS/SVG/canvas-2D versions only); no stacked blurs or heavy `backdrop-filter`; keep only a few layers animating at once (my guideline: 2 to 3); pause off-screen animation with IntersectionObserver and when `document.hidden`; honour `prefers-reduced-motion`. Do not gate effects on `navigator.deviceMemory` or the Network Information API (Safari does not expose them, verify); gate on `pointer: coarse`, viewport width and reduced motion.
14. Images: write `sizes` so a phone downloads a phone-sized file, never the desktop one; AVIF with WebP/JPEG fallback. My guideline: aim for a phone hero well under about 100 KB and adjust after measuring.
15. Head tags (cheap iPhone polish): `theme-color` and `apple-touch-icon`. Skip PWA/offline (Ponytail rule 1).
16. Links: `tel:` to call, `wa.me` for WhatsApp, a Google Maps link for Directions (matches the shop's listing). Add an Apple Maps link only if the user asks.
17. Testing, honestly: Lighthouse in the workspace emulates Chrome, NOT iPhone Safari. Try Playwright's WebKit with an iPhone device profile if the workspace network allows installing it; if not, say so plainly. The user must check on a real iPhone at each milestone, ideally with Low Power Mode on and off. Real-iPhone checklist: the hero fits and does not jump when the toolbar collapses; the bottom dock clears the home bar; quiz inputs do not zoom; every reveal works by tap and no hover sticks; hero shows its poster; page transitions play or fall back cleanly; scrolling is smooth and not hijacked; nothing scrolls sideways; landscape is not broken.

## 6. Information architecture

- Shell (always visible): logo, nav to the 4 categories (on phones a bottom dock, see 5b), "Visit / Directions / WhatsApp" actions, status badge (only if hours are confirmed).
- Hub `/`: a crazy hero that introduces the logo concept and lets the user jump into any of the 4 categories, then a short "visit us" block (address, phone, Maps link, Instagram) and the real rating.
- 4 category pages, each with its own distinct hero idea (PROPOSED, refine with the user):
  - Clothing: "The Rack". A garment rail that scrolls horizontally; hangers swing with scroll velocity.
  - Footwear: "Sole Lab". Pointer-tilt/parallax product stage, a wall of sneakers and loafers; core category for this audience, so give it the loudest hero.
  - Accessories: "The Drawer". Items as stickers on a table that can be dragged and tossed (lightweight pointer physics, no physics engine).
  - Perfumes: "The Scent Bar". Bottle lineup with a mist hero, notes revealed on hover/tap, plus a short scent-vibe quiz.
- Footer: address, hours (if confirmed), phone, Instagram, Maps.

## 7. Features worth building (Gen Z appeal, all lightweight)

- Fit Check builder: pick top + shoes + accessory + scent, then send the look to the shop's WhatsApp via a prefilled wa.me message. URL-encode the message and validate selections before building the link (trust boundary).
- Scent vibe quiz leading to a perfume category.
- Drop wall: a curated static grid styled like a feed. Do NOT embed the Instagram widget (heavy, hurts TBT/CLS); link out to @genz.formens.
- Magnetic custom cursor on desktop pointers only; disabled on touch; keep native cursor accessible (visible focus, keyboard works everywhere).
- Logo concept (mine, not the owner's): wordmark GEN-Z where the G holds a perfume drop, the hyphen becomes a belt buckle, and the Z is a zigzag shoelace; on hover/load it cycles through the four product types. Show the user the SVG before committing.

## 8. Animation idea sources (user asked to draw ideas from these)

- Superdesign prompt library (superdesign.dev/library, category=animation; app at app.superdesign.dev/library). Prompts are plain text that can be pasted into any coding agent. The page renders client-side, so Claude could not read individual prompts: ask the user to paste any prompt they like. The one linked is named "animated didone landing page, blush and dusty pink editorial with multiply-blended product photography" (from the URL slug; the prompt body was NOT read). The slug suggests trying `mix-blend-mode: multiply` on product photos over coloured backgrounds.
- React Bits (130+ copy-paste animated components, minimal dependencies). Prefer its GSAP variants so only one animation library ships.
- Magic UI and Aceternity UI (Tailwind + Motion based; marquee, container scroll, 3D marquee, text hover effect). 21st.dev hosts them; installs there may need an account key.
- CSS scroll-driven animations: zero runtime, uneven browser support, always add a fallback.
- Rule: use these as idea sources and re-implement lean (Ponytail rules 2 and 4). Do not paste in whole libraries or any component that pulls in a second animation library or a large 3D dependency. Check each licence before shipping client work.

## 9. Performance rules (non-negotiable)

Targets: LCP under 2.5 s, CLS under 0.1, INP at or under 200 ms (Lighthouse cannot measure INP, so use Total Blocking Time as the lab proxy), and keep FCP and Speed Index green on mobile throttling. Suggested internal budget (my guidance, adjust if needed): home route initial JS about 100 KB gzipped or less, each category chunk about 50 KB gzipped or less.

- The hero LCP element must be visible from the first paint. Never start it at opacity 0 (LCP is delayed until it becomes visible); use a tiny non-zero opacity or animate transform only. Never lazy-load the LCP image; preload it.
- Defer canvas/WebGL work until after first paint.
- Animate only transform and opacity. Avoid animating layout properties.
- `content-visibility: auto` on below-the-fold sections.
- Every image and video slot reserves its size (`aspect-ratio` or width/height) to prevent CLS.
- Support `prefers-reduced-motion` everywhere.
- Phone numbers come first: measure after each milestone with Lighthouse on mobile (it emulates Chrome, not iPhone Safari; see 5b item 17). Try `npx lighthouse` in the workspace if headless Chrome is available; if not, say so plainly and give the user PageSpeed Insights / Chrome DevTools steps. Never claim a score that wasn't measured.

## 10. Photos (large files)

LATEST (v2) DECISION: photos are read from the user's own PC, not uploaded. Folders (Windows): D:\WEBDEV\GEN Z mens boutique\IMAGES\{accessories, Clothing (with subfolder caps), footwear, full store entrance view, perfumes}. `scripts/make-images.mjs` already points there (override with env GENZ_IMAGES), scores every photo (sharpness, exposure, resolution), drops near-duplicates, keeps the best (clothing 14, footwear 14, accessories 10, perfumes 10, shop 3), writes AVIF/WebP and src/photos.json, and a photos-report.txt (rank 01 = that page's hero). It must be run on the user's machine: `npm run images`. A Claude workspace cannot reach D:\ (no bridge, Free plan has no computer control) and cannot fetch the Drive zip (see section 12). HEIC files are not read by sharp: export to JPG first. The scoring is a heuristic and was NOT run: the user should glance at the picks and reorder if a hero is wrong.

Older notes below (still true as background):

- Attach straight in the chat with the + button. The official upload help page says chat uploads allow up to 20 files per chat and up to 500 MB per file (older pages and some third parties still say 30 MB; if an upload is rejected, shrink or split).
- More than 20 photos: put them in zip batches, use several chats or a Project's Files, or push them to a GitHub repo the user creates and read it with the GitHub tools.
- The user can shrink them first (long edge about 1600 to 2400 px, JPEG/WebP about 80 percent). Claude still builds the final AVIF/WebP/srcset set, so originals are fine, just slower to upload.
- The user's photo zip is about 472 MB. That is under the 500 MB per-file figure on the official help page, so try attaching it as is; if it fails or stalls, use one of the other routes above. Best plan: one zip per category (clothing, footwear, accessories, perfumes, plus shop/store photos), ideally shrunk first, which also tells Claude which photos belong where.
- Photo repo: github.com/faisalahmad7/images-for-genz-store. On 2026-10-24 it was reachable but EMPTY (no commits yet). Planned folders: photos/clothing, photos/footwear, photos/accessories, photos/perfumes, photos/shop. Check it first with the GitHub file tools (get_file_contents); if it has files, use them and do not ask for the photos again. Browser uploads allow 25 MiB per file and 100 files per upload; larger files need GitHub Desktop or git (100 MiB hard limit).
- Ask which photos belong to which category and which should be each page's hero.

## 11. Workflow for the next Claude

1. Read this whole file first. Do not redo the research.
2. If the art direction is still open, ask once (short message) and start the foundation work in the same reply.
3. Check /mnt/user-data/uploads and the working directory for the project and photos before asking for them again.
4. No invented facts or claims. Hours, prices, offers and quotes only if the user gave them.
5. Milestones: (a) scaffold + design tokens + logo, (b) shell + routing + hub hero, (c) four category pages, (d) features, (e) image pipeline + performance pass, (f) final review and audit (Ponytail-style: bugs, security, real load, missing tests, speed, what to cut), then zip. Every milestone also passes the iPhone checklist in 5b item 17.
6. After each milestone update section 12 (progress log + STOP POINT).
7. Follow Ponytail rule 10 on every reply: end with what was skipped or unchecked and any risk.
8. When the conversation or usage limit is close: stop starting new work, finish the file you're in so it compiles, update section 12, and give the user the project zip plus this file.

## 12. PROGRESS LOG and STOP POINT (keep this section current)

Progress log
- [done] Research (section 13), handoff, Ponytail rules, mobile/iPhone rulebook (5b).
- [done] v1 source: scaffold, router with View Transitions fallback, Hub, Category page, wa.js + 2 passing tests, image script.
- [done] v2 (this chat's second pass), source only:
  - Theme: each category is its own room via CSS vars (--bg --ink --ac --f) set in src/data.ts: Clothing pink + Bowlby One; Footwear electric blue + Anton; Accessories amber + Permanent Marker; Perfumes deep plum + Playfair Display italic (a dark page for contrast). Hub is acid green with Bowlby One + Space Mono. Grain texture on heroes (static SVG, no JS).
  - Fonts (all @fontsource, latin only, self-hosted): Bowlby One, Space Mono, Permanent Marker (main bundle); Anton and Playfair Display are imported inside the Category lazy chunk.
  - Fixed v1 bug: hero words overflowed on phones (GEN-Z and ACCESSORIES); sizes are now per category in vw with desktop caps.
  - Photos used: hero collage (first 3 photos, first is the eager LCP candidate), hub category cards show each category's best photo as a tilted thumb, hub visit section shows the "full store entrance view" photo, category grid shows the rest with some wide tiles. Typographic placeholder tiles show when a category has no photos.
  - New: src/Icons.tsx (shirt/shoe/cap/drop line icons, first step of the owner's "logo includes what we sell" idea; the proper logo SVG is still not built), src/useReveal.ts (IntersectionObserver fade-up on below-the-fold blocks only), round stickers on hub.
  - scripts/make-images.mjs rewritten as the best-photo picker reading the user's D:\ folders (section 10).
- [done] v3 (source only, user had confirmed photos now show on the site): (1) Image pipeline rewritten: `npm run images` now makes WebP ONLY (AVIF dropped), smart-crops each kept photo with sharp's attention/saliency strategy (NOT generative AI; honest label) to 4:5 portrait (400/720/1080 px) and 16:10 wide (640/1024 px), quality 72; manifest entries are {src,srcset,w,h,wsrc,wsrcset,ww,wh}; src/Photo.tsx is now a plain <img> using the wide crop when `wide` is set (the <picture>/avif path is gone). `images:simple` fallback still copies originals unoptimized. (2) First-page glitch fixed: cause was CSS animations overwriting `transform` (letters jumped) plus a full-hero `mix-blend-mode: multiply` grain layer. Now all idle/hover animations use the individual `rotate`/`scale`/`translate` properties (they compose with `transform`), and the grain has no blend mode. (3) Speed: no blend layer, `will-change` on animated letters, `content-visibility:auto` on below-fold sections, on touch devices the 2nd/3rd text rails and extra mist blobs are hidden and the hub blob stops animating. (4) Wiggle/funk: src/Wiggle.tsx (letters squash-pop on mouse-over and tap, idle bob), src/fx.ts (scroll-velocity jelly skew on big headings via --sk, magnetic buttons for mouse), springy overshoot easing on buttons/cards/floaters, tilted bobbing thumbs, zigzag edge above the visit block, page pop-in on route change, soft pink blob behind the hub hero. (5) The four floating boxes on the hub are now photo tiles (first photo of each category, linked to that page, label strip, icon fallback if no photo); category cards use the 2nd best photo. (6) src/css.ts `vars()` helper for typed CSS custom properties.
- [done] v4 (source only, user said the site "looks very flat", the crop damaged photos, and the home page had no proper sections; user explicitly allowed GSAP/Lenis and any libraries):
  - Photos: `scripts/make-images.mjs` NO LONGER CROPS. It resizes the whole photo to 480/960/1440 px WebP (q76) and stores the REAL w/h in src/photos.json. src/Photo.tsx is a plain <img> with those w/h; all layouts use the natural ratio (masonry columns, fixed-height strips with auto width, rooms). The old WebP files in public/photos were cropped for good: the user MUST re-run `npm run images` from the originals (it deletes public/photos first). Tested here on synthetic photos: ratios preserved. `images:simple` fallback hardcodes w/h 480x600 (cannot read sizes without sharp), so it can shift layout a little.
  - New deps (reason): gsap (ScrollTrigger pin/scrub, timelines CSS cannot do; free since 3.13), lenis (inertia scroll on mouse devices only; phones keep native scroll).
  - src/motion.ts: `useMotion` (gsap.matchMedia: desk = min-width 800px + hover:hover; reduced motion = no animation; everything reverts on unmount), `useSmooth` (Lenis, mouse only), `toTop`, `slide` (strip scrub). src/Cursor.tsx: mouse-only dot+ring (labels via data-cursor, e.g. ENTER/GO) and a scroll progress bar. router.tsx: Link has a `cursor` prop; View Transitions removed on purpose (snapshot layer fights pinned sections); .page fades with opacity only (a transform on .page would break the pin).
  - Hub sections: hero (letters drop in, photo tiles pop, pointer parallax on desktop), marquee, manifesto (words light up on scroll), ROOMS (pinned horizontal scroll on desktop with per-room parallax; stacked reveal on phones/tablets), photo strips (two rows sliding opposite ways), proof (4.8 / 44 / 4 count up + the 3 real review snippets), visit (store photo, address, call/Insta/directions), footer (big wordmark, nav, top button).
  - Category pages: existing themed hero + collage (natural ratio), perfume vibe chips, ALL OF IT strip, masonry of the rest with scroll-batched landing, SEE IT IRL, NEXT ROOM link (loops through the 4 rooms).
  - Styles: src/v4.css, imported after styles.css, overrides it (floaters now natural ratio, content-visibility removed because it breaks pin measuring).
  - Verified here: syntax-only transpile of every changed .ts/.tsx = 0 errors; the image script was run on synthetic photos. NOT verified: npm install, tsc types, vite build, any browser rendering, pin behaviour, iPhone. Likely first-run problems: TypeScript typing of GSAP callbacks, pin layout jumps, strip widths before images load.
- [done] v4.1 (source only; user said: laggy, photos must be WebP, home page generic, copy bad, remove the forced horizontal scroll, hero needs a photo container, colours should suit a men's boutique, some photos did not fit their boxes or were missing):
  - Lag: removed Lenis (dependency dropped), removed the pinned horizontal rooms, removed the scroll-speed skew in fx.ts (it set a CSS variable on <html> every frame), the full-section SVG grain, the mix-blend cursor, idle letter bobbing, moving blobs and extra rails. GSAP remains for one-off entrances, manifesto word scrub, counters and the top progress bar. Only GSAP motion left that scrubs: manifesto words and progress bar.
  - Photos: `npm run images` (sharp) writes WebP only, resize-only (480/960/1440), keeps full frame. Manifest entries now {src,srcset,w,h,o,c}: real size, orientation p/l/s, average colour (shown as the image background while loading). It also writes a `hero` array (best 3 portrait photos). Dedupe is looser-per-photo (hash distance <=4) and keep counts are larger (clothing 18, footwear 18, accessories 12, perfumes 12, shop 4). The script lists the folders it finds in the photo root, so a wrong folder name is visible. `images:simple` (originals, NOT WebP) now reads real sizes from the file headers. The "analysis" is numeric (sharpness, exposure, orientation, colour), not Claude looking at the photos: Claude never saw them.
  - Fit: all photo slots use the photo's own ratio (rooms, masonry, strips with fixed height + auto width, shop entrance). Strips are native horizontal scrollers (swipe), so lazy images load as you scroll (the old transformed rows left blank gaps).
  - Hero (home): dark, editorial, with a photo frame (4:5). It shows public/hero.webp if the file exists, else the best portrait from `npm run images`, else a placeholder telling the user to save a photo as public/hero.webp.
  - Palette: night #0e0e0f, bone #ece5d8, brass #d4a94f, rust #c8431f. Rooms: clothing bone + rust, footwear navy + amber, accessories forest green + brass, perfumes aubergine + rose gold. Display font is now Anton, with Playfair italic accents. Set in src/data.ts (rooms) and :root in src/v4.css (site).
  - Copy rewritten (hero, manifesto, room lines, section headings). No invented claims: no prices, awards, years, drops.
  - Verified here: syntax transpile of all .ts/.tsx = 0 errors; both image scripts run on synthetic photos (ratios, orientation, hero set, header-based sizes OK). NOT verified: npm install, tsc types, vite build, browser, iPhone, real speed.
- [done] v4.4 (user furious it still felt generic; this time Claude RENDERED the site: esbuild (Linux copy from global tsx) bundle + Chrome 131 + Playwright in the sandbox, phone 390 / laptop 1440; no heading wraps, no sideways scroll, no console errors on home + 4 category pages):
  - New "IT'S TIME TO LEVEL UP." section (Hub.tsx LevelUp): the shop's OWN wall sign (visible in the owner's photos, "GENZ - IT'S TIME TO LEVEL UP") over the bracelet-tray photo, giant letters drop in, photo drifts. Optional: save a photo of that wall as public/levelup.webp to choose the picture; otherwise hero[1] is used (npm run images re-picks hero photos automatically, so this slot is how to pin it). "SEE THE WALL" opens it in the viewer.
  - Type: body copy is now Playfair Display (serif, italic for the hero line and room one-liners); mono only for micro labels/buttons; Anton for headlines.
  - Bottom nav showed cut words (CLOTH/FOOTW/ACCES/PERFU): now full words.
  - Footer wordmark grows to fill the width (fit still shrinks if needed). Photo strip height reduced on phones.
  - Verified from real renders: hero (phone+laptop), rooms, trust cards, strip, proof, level-up, footer. NOT verified: dragging price tags, hover effects, scroll animation timing, real photos at 960/1440 widths on a retina phone, Vite build.
- [done] v4.3c: `npx impeccable detect src/` (regex-only scan) flagged a side-tab border (.reviews li) and 5 bounce easings: all replaced (CSS cubic-bezier(.25,1,.5,1), GSAP back.out/elastic -> expo.out, tag drag release -> power4.out). Full element-level scan still to do against the running site: `npx impeccable detect http://localhost:5173`. Also fixed scripts/shots.mjs (innerHeight was used in Node).
- [done] v4.3b tooling (user asked to use taste-skill, impeccable, emilkowalski/skills, awesome-design-md, playwright):
  - Claude (in the chat sandbox) cannot install or run these: bash has no network, and the skills/CLIs run on the OWNER'S machine inside a coding agent (Claude Code/Cursor/Codex). Claude did read emilkowalski/skills animation-performance SKILL.md and audited the CSS against it: fixed the rotating seal (an SVG drop-shadow filter would repaint every frame x3); everything else already animates transform/rotate/scale/opacity only, no `transition: all`, hover only on (hover:hover), 100svh used.
  - Added scripts/shots.mjs + `npm run shots`: Playwright check at phone/tablet/laptop for every page; fails on wrapped heading letters, sideways scroll, broken images, console errors; saves full-page screenshots to ./shots. Needs `npm i -D playwright` and `npx playwright install chromium` (owner machine).
  - Owner install commands (run in project root): `npx impeccable install` then `/impeccable init`; `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"`; `npx skills@latest add emilkowalski/skills`; `npx getdesign@latest add <site>` for a DESIGN.md. Use them inside Claude Code/Cursor, not in claude.ai chat.
- [done] v4.3 (user: still flat/generic, wants something UNIQUE, store photos in the hero, a better footer, and the copy to say: authentic/genuine branded products, warm service, experienced shop for a long time):
  - Hero is now a full-bleed photo of the INSIDE of the shop (best landscape shop photo on desktop, best portrait on phones via <picture>), slow zoom (mouse devices only), scroll parallax, dark gradient for legibility. The old photo collage and public/hero.webp slot are gone. "LOOK INSIDE" button opens the shop photos in the viewer.
  - Signature idea: four PRICE TAGS hang on strings from the top of the hero (one per room, vertical Anton label, room accent colour), swing with CSS `rotate` (cheap), fall in with an elastic drop, and on desktop mouse can be grabbed and dragged (GSAP Draggable, springs back on release). Phones just swing + tap. Small swinging number tags also hang off each room section.
  - Rotating "100% AUTHENTIC / BRANDED / GENUINE" seal (src/Seal.tsx) in the hero (desktop), the new trust section and the footer.
  - New "WHY GEN-Z" section: AUTHENTIC, ALWAYS / WARM SERVICE / WE KNOW OUR STUFF. Copy comes from the owner's own claims (authentic branded products, warm service, experienced shop for a long time). NO year or number of years is claimed: ask the owner for one before adding it.
  - New shared footer (src/Footer.tsx, used on the home page AND all category pages): "COME IN. SAY HELLO." + call/WhatsApp/directions, visit/rooms/follow columns, seal, a swipeable row of shop photos (open in the viewer), giant GEN-Z wordmark (fit to width), back-to-top.
  - Copy: marquee, manifesto ("Real brands. Real fits.") and hero line rewritten around authentic/branded/warm service. Gsap Draggable registered in src/motion.ts (ships free inside the gsap package, no new dependency).
  - Verified: tsc 0 errors, wa tests pass. NOT verified: vite build (Windows node_modules), browser look, dragging tags (click-vs-drag on the tag links), iPhone. Libraries NOT added on purpose: Claude's sandbox has no npm access so nothing new could be installed or tested; candidates if wanted (user must run npm install): ogl (perfume mist shader), lenis (desktop inertia, was the lag source before).
- [done] v4.2 (user: still flat, animations gone, last letter of section headings (FOOTWEAR "R") wrapped to a new line, hero poor, photos must open on click, use ALL photos in WebP):
  - Headings: `useFit` in src/motion.ts shrinks a heading's font-size until its letters fit on ONE line (measured from the last letter's layout position, re-runs on font load and resize). Applied to hub hero/rooms/footer and category hero + NEXT ROOM link. CSS: white-space:nowrap, min-width:0, grid columns minmax(0,..).
  - Photos: src/Lightbox.tsx (click/Enter opens full size, Esc, arrows, swipe, counter). `Photo` takes `gallery` to be clickable. scripts/make-images.mjs now converts EVERY photo (no dedupe, no keep limit), folder names matched loosely (a folder with "cap" in its name goes to clothing), unknown folders go to "extra" and show on the home strip. images:simple also keeps everything. Strip, masonry and rooms all open the viewer.
  - Hero: collage of 3 overlapping tilted photos + spinning "4.8★ GEN-Z" badge, pointer parallax on desktop after the intro. Main frame = public/hero.webp if present. src/photos.json "hero" is currently hand-picked from the real photos (racing jacket on rail, bracelet tray with GENZ sign, perfume held up); re-running `npm run images` replaces it with the automatic best-portrait picks, so save a photo as public/hero.webp to pin one.
  - Animation back, cheap (transform/opacity only): letters drop in with tilt, photos wipe in and drift on scroll, review cards land, headings slide up, floating hero frames, hover tilt on photos (mouse only). Still no Lenis, no pinning, no scroll-speed skew.
  - Fixed: `npm run build` failed at baseline (CSS imports had no types): added src/vite-env.d.ts.
  - Photos seen by Claude this time (contact sheets of the user's current public/photos): shelves of folded jeans/shirts, a cap table, a racing jacket on a rail, a long shoe wall (sneakers, slides, loafers), bracelet/ring trays, boxed wallets, perfume bottles labelled GZ, GENZ neon sign "IT'S TIME TO LEVEL UP", warm wood-and-gold shop interior with black marble counter. Palette should stay warm (gold/rust on charcoal) to match it.
  - Verified: `tsc --noEmit` 0 errors; wa tests 2 pass; image script on synthetic photos (ratios kept, all converted). NOT verified: vite build (the zip's node_modules is the Windows build, so it cannot run in Claude's Linux sandbox), any browser rendering, real speed, iPhone.
- [done] v2.2: user ran the site (saved page snapshot of http://localhost:5173/ proved the dev server and theme render; category cards showed icon fallbacks, so src/photos.json was still empty = photo step never produced output). Added `npm run images:simple` (scripts/copy-images.mjs): no sharp needed, copies the largest files per category as-is (tested here on fake folders, case-insensitive folder match and the Clothing\\caps subfolder work), writes src/photos.json with srcset/avif empty; src/Photo.tsx now skips the avif <source> when empty. Originals are unoptimized: use `npm run images` for the fast AVIF/WebP set once sharp works. If the user reports another failure, ask for the terminal output of whichever command they ran.
- [fixed, untested] v2.1: the user reported the site/script "is not taking pictures" (exact symptom unknown: script output or site not showing photos). Fixed a scoring bug (sharp stats() ignores chained operations, now buffered per step) and made scripts/make-images.mjs print the photo root, each folder's file count, every skipped file with the reason, and exit with an error if nothing was processed. FIRST THING: ask the user to paste the `npm run images` output. Other likely causes: wrong path (PowerShell: $env:GENZ_IMAGES="D:\\WEBDEV\\GEN Z mens boutique\\IMAGES"), HEIC files (export to JPG), dev server not restarted after src/photos.json changed, photos not in the expected folder names.
- [blocked, unchanged] Drive: IMAGES.zip (485,474,303 bytes, Drive id 1gAXXnBt2VfIJVRzKiGFsp2SVTUac4FYP, owner ethanhuntredd@gmail.com) is private; drive.google.com gets 403 from the egress proxy; the Drive connector's download returns base64 into chat, too big. GitHub repo faisalahmad7/images-for-genz-store holds only a README.
- [blocked, unchanged] npm: registry.npmjs.org got 403 from the egress proxy (on the Free plan only package managers can be allowed, in Settings > Capabilities on claude.ai). So `npm install`, `vite build`, `tsc`, sharp, Lighthouse and any screenshot were NEVER run. Only a syntax-only TypeScript transpile (0 errors) and `node --check` on the script passed. Dependency ranges were written from memory. Type, build and layout bugs are likely; the first run will tell.
- [not started] Proper logo SVG; Fit Check builder; scent quiz; Drop wall; magnetic cursor; closing-time/open badge (hours unknown); per-category chunk split; Lighthouse numbers; real-iPhone testing; deploy (public/_redirects already has the SPA fallback for Cloudflare/Netlify).

STOP POINT
- Last thing completed: v4.3 (see section 12 entry above) and this handoff.
- Currently in progress: nothing.
- Files (genz-site/): package.json (gsap, no lenis), index.html, vite.config.ts, tsconfig.json, public/{favicon.svg,_redirects}, src/{main.tsx,vite-env.d.ts,Seal.tsx,Footer.tsx,App.tsx,router.tsx,motion.ts,Lightbox.tsx,Cursor.tsx,data.ts,Icons.tsx,Photo.tsx,Wiggle.tsx,fx.ts,css.ts,useReveal.ts,photos.json,styles.css,v4.css,wa.js,wa.test.js}, src/pages/{Hub.tsx,Category.tsx}, scripts/{make-images.mjs,copy-images.mjs}. v4.css overrides styles.css (older rules still sit in styles.css).
- What runs / what is broken: only `node --test src/wa.test.js` and the image scripts (synthetic photos) were run here. Everything else unrun.
- Measured performance: none.
- `shortcut:` limits: one Category chunk for all four pages; "best photo" score is a heuristic; hero photo auto-pick is the best portrait, not necessarily the nicest; WhatsApp number 919373558814 unconfirmed; no closing time shown; styles.css still carries dead rules from v2/v3.
- Exact next step: user runs `npm run images` (needed to get ALL photos; the public/photos in the zip is the older deduped set), `npm run dev`, checks headings on a phone width, then `npm run dev`, and reports what is still laggy or ugly with a screenshot or recording. If still laggy, ask for the Chrome DevTools Performance recording or check the original photo sizes (the unoptimized originals were the likely worst offender). Then: proper logo SVG, Fit Check, scent quiz, Drop wall, Lighthouse on the user's machine, real-iPhone check.
- Open questions for the user: which photo should be the hero (or save one as public/hero.webp); closing time; WhatsApp number confirmation; logo; Fit Check and scent quiz next?

## 13. References that were researched (open and study, do not clone)

- Awwwards fashion winners 2026: Cartier Watches & Wonders, Delvaux Digital Flagship Store, Outfit, Floema, Maison Alaia; Ranboo Fashion merch store (WebGL, microinteractions, product flow).
- Menswear boutique sites: End Clothing, Mr Porter, Bodega, Concepts, Union LA, Huckberry.
- Indian Gen Z brands: Snitch (fast weekly drops), Urban Monkey (bold graphics, oversized), The Souled Store, Bewakoof.
- Tutorials: Codrops (GSAP + Lenis infinite scroll), freefrontend Lenis demos.
- Design trends: tactile brutalism, OS-inspired UI, saturated neon on interactive elements only, technical monospace type, "polished is the new generic".
- Coding rules: github.com/DietrichGebert/ponytail (MIT).
