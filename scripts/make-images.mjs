// Converts EVERY photo in the owner's folders to WebP (resize only, never cropped) and writes src/photos.json.
// Photos are sorted best-first (sharpness, exposure, size) only to decide ORDER and the hero picks; none are thrown away.
// Folder names are matched loosely (clothing/footwear/accessories/perfumes/store); anything unrecognised goes to "extra" and still shows on the home strip.
// Source root: env GENZ_IMAGES, else the folder below (the user's Windows PC), else ./photos-in.   Run: npm run images
import { readdir, mkdir, writeFile, rm, stat } from 'node:fs/promises'
import path from 'node:path'
let sharp
try { sharp = (await import('sharp')).default } catch (e) {
  console.error('sharp could not load:', e.message, '\nTry:  npm rebuild sharp    or    npm install --include=optional sharp')
  process.exit(1)
}

const ROOT = process.env.GENZ_IMAGES || 'D:\\WEBDEV\\GEN Z mens boutique\\IMAGES'
const WIDTHS = [480, 960, 1440] // resize only, aspect ratio preserved
const IMG = /\.(jpe?g|png|webp|avif|tiff?)$/i
const HEIC = /\.(heic|heif)$/i // prebuilt sharp cannot read these: export them to JPG first
const KEYS = ['clothing', 'footwear', 'accessories', 'perfumes', 'shop', 'extra']
const keyFor = (n) => {
  n = n.toLowerCase()
  if (/foot|shoe|sneaker|loafer|sandal|boot/.test(n)) return 'footwear'
  if (/cloth|shirt|apparel|garment|tee|jean|cap/.test(n)) return 'clothing'
  if (/access/.test(n)) return 'accessories'
  if (/perfume|fragrance|scent|attar/.test(n)) return 'perfumes'
  if (/store|shop|entrance|exterior|front/.test(n)) return 'shop'
  return 'extra'
}
let heic = 0
async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else if (IMG.test(e.name)) out.push(p)
    else if (HEIC.test(e.name)) heic++
  }
  return out
}
async function pool(items, n, fn) {
  const out = new Array(items.length)
  let i = 0
  await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k], k) } }))
  return out
}

// Higher = sharper, well exposed, big enough. Used for ORDER only.
async function score(file) {
  try {
    const base = sharp(file, { failOn: 'none' }).rotate()
    const smallBuf = await base.clone().resize(256, 256, { fit: 'inside' }).greyscale().png().toBuffer()
    const full = await sharp(file, { failOn: 'none' }).metadata()
    const lapBuf = await sharp(smallBuf).convolve({ width: 3, height: 3, kernel: [0, 1, 0, 1, -4, 1, 0, 1, 0] }).png().toBuffer()
    const lap = await sharp(lapBuf).stats()
    const st = await sharp(smallBuf).stats()
    const exposure = 1 - Math.abs(st.channels[0].mean - 128) / 128
    const size = Math.min(1, ((full.width ?? 0) * (full.height ?? 0)) / (1200 * 900))
    const px = await base.clone().resize(1, 1, { fit: 'fill' }).removeAlpha().raw().toBuffer()
    return { file, c: '#' + [...px].map((v) => v.toString(16).padStart(2, '0')).join(''), score: Math.log1p(lap.channels[0].stdev ** 2) * (0.4 + 0.6 * exposure) * size }
  } catch { return { file, c: '#222222', score: 0 } }
}

const base = (await stat(ROOT).then(() => true, () => false)) ? ROOT : 'photos-in'
console.log('Photo root:', base === ROOT ? ROOT : `NOT FOUND (${ROOT}) -> using ./photos-in`)
if (base !== ROOT) console.log('Fix: set the path, e.g. PowerShell:  $env:GENZ_IMAGES="D:\\WEBDEV\\GEN Z mens boutique\\IMAGES"; npm run images')
const files = Object.fromEntries(KEYS.map((k) => [k, []]))
for (const e of await readdir(base, { withFileTypes: true }).catch(() => [])) {
  const p = path.join(base, e.name)
  if (e.isDirectory()) { const k = keyFor(e.name); const f = await walk(p); files[k].push(...f); console.log(`[${k}] <- folder "${e.name}": ${f.length} photos`) }
  else if (IMG.test(e.name)) files.extra.push(p)
  else if (HEIC.test(e.name)) heic++
}
if (heic) console.log(`WARNING: ${heic} HEIC/HEIF files were skipped (sharp cannot read them). Export them to JPG and run again to include them.`)

await rm('public/photos', { recursive: true, force: true })
const manifest = {}
const report = []
const all = []
for (const key of KEYS) {
  manifest[key] = []
  if (!files[key].length) continue
  console.log(`[${key}] scoring ${files[key].length} photos...`)
  const scored = (await pool(files[key], 4, score)).sort((a, b) => b.score - a.score)
  await mkdir(path.join('public/photos', key), { recursive: true })
  const done = await pool(scored, 3, async (s, i) => {
    const id = `${key}-${String(i + 1).padStart(3, '0')}`
    try {
      const set = []
      let first = null
      for (const w of WIDTHS) {
        const out = `/photos/${key}/${id}-${w}.webp`
        const info = await sharp(s.file, { failOn: 'none' }).rotate()
          .resize({ width: w, withoutEnlargement: true }) // scales the WHOLE photo, never crops
          .webp({ quality: 76, effort: 5, smartSubsample: true }).toFile('public' + out)
        first ??= info
        if (!set.some((x) => x.endsWith(info.width + 'w'))) set.push(`${out} ${info.width}w`)
      }
      const r = first.height / first.width
      if ((i + 1) % 10 === 0) console.log(`  ${key}: ${i + 1}/${scored.length}`)
      return { entry: { src: set[0].split(' ')[0], srcset: set.join(', '), w: first.width, h: first.height, o: r > 1.15 ? 'p' : r < 0.87 ? 'l' : 's', c: s.c }, s, id }
    } catch (e) { console.log('  SKIPPED', s.file, '-', e.message); return null }
  })
  for (const d of done) if (d) { manifest[key].push(d.entry); all.push({ key, entry: d.entry, score: d.s.score }); report.push(`${d.id}\t${d.s.score.toFixed(2)}\t${d.entry.o}\t${d.s.file}`) }
  console.log(`[${key}] ${manifest[key].length} of ${files[key].length} converted`)
}
// hero set: best portrait photos of the four product folders
manifest.hero = all.filter((x) => ['clothing', 'footwear', 'accessories', 'perfumes'].includes(x.key) && x.entry.o === 'p').sort((a, b) => b.score - a.score).slice(0, 3).map((x) => x.entry)
await writeFile('src/photos.json', JSON.stringify(manifest, null, 1))
await writeFile('photos-report.txt', 'id\tscore\torientation\toriginal file\n' + report.join('\n'))
if (!all.length) { console.error('NO PHOTOS PROCESSED. Check the folder lines above: 0 photos means wrong path or only HEIC files.'); process.exit(1) }
console.log(`Done: ${all.length} photos, all WebP. Hero set: ${manifest.hero.length}. photos-report.txt maps each id to its original file.`)
