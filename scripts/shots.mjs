// Real-browser check with Playwright. Run the site first (npm run dev), then in another terminal:  npm run shots
// Setup once:  npm i -D playwright   then   npx playwright install chromium
// For every page at phone / tablet / laptop width it: scrolls the whole page (so animations and lazy photos fire),
// saves a full-page screenshot to ./shots, and FAILS on: a heading whose letters wrapped onto a second line,
// sideways page scroll, broken images, console errors.
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const BASE = process.env.SITE || 'http://localhost:5173'
const PAGES = ['/', '/clothing', '/footwear', '/accessories', '/perfumes']
const SIZES = [['phone', 375, 812], ['tablet', 820, 1180], ['laptop', 1440, 900]]
await mkdir('shots', { recursive: true })
const browser = await chromium.launch()
let bad = 0
for (const [name, width, height] of SIZES) {
  const ctx = await browser.newContext({ viewport: { width, height }, hasTouch: name === 'phone', isMobile: name === 'phone' })
  for (const path of PAGES) {
    const page = await ctx.newPage()
    const errors = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(String(e)))
    await page.goto(BASE + path, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1800)
    const h = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < h; y += Math.round(height * 0.6)) { await page.evaluate((v) => scrollTo(0, v), y); await page.waitForTimeout(250) }
    await page.waitForTimeout(800)
    const r = await page.evaluate(() => {
      const wrapped = [...document.querySelectorAll('.mega,.rw,.nw,.fw')].filter((e) => {
        const l = [...e.querySelectorAll('.lw')]
        return l.length > 1 && new Set(l.map((x) => x.offsetTop)).size > 1
      }).map((e) => e.textContent.trim())
      const broken = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src)
      // .page has overflow-x:clip, so scrollWidth can never show content that is cut off at the screen edge: measure elements instead.
      const clipped = [...document.querySelectorAll('main *, footer *')].filter((e) => {
        if (e.closest('.marquee,.srow,svg,.lb,.tray,.hbg,picture,figure,.seal')) return false
        const b = e.getBoundingClientRect()
        return b.width > 0 && b.height > 0 && (b.right > innerWidth + 1 || b.left < -1)
      }).slice(0, 5).map((e) => `${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]} "${(e.textContent || '').trim().slice(0, 20)}"`)
      return { wrapped, broken, clipped, overflowX: document.documentElement.scrollWidth - innerWidth }
    })
    await page.evaluate(() => scrollTo(0, 0)); await page.waitForTimeout(300)
    await page.screenshot({ path: `shots/${name}${path === '/' ? '-home' : path.replace('/', '-')}.png`, fullPage: true })
    const problems = [r.wrapped.length && `heading wrapped: ${r.wrapped}`, r.broken.length && `broken images: ${r.broken.length}`, r.overflowX > 1 && `sideways scroll by ${r.overflowX}px`, r.clipped.length && `cut off at the screen edge: ${r.clipped.join(', ')}`, errors.length && `console errors: ${errors.join(' | ')}`].filter(Boolean)
    console.log(`${problems.length ? 'FAIL' : 'ok  '} ${name} ${path}${problems.length ? '  ->  ' + problems.join('; ') : ''}`)
    bad += problems.length
    await page.close()
  }
  await ctx.close()
}
await browser.close()
console.log(bad ? `\n${bad} problem(s). Screenshots are in ./shots` : '\nAll clear. Screenshots are in ./shots')
process.exit(bad ? 1 : 0)
