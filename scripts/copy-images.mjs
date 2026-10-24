// No-dependency fallback: copies the largest photos as-is (NOT WebP, NOT resized). Use only when `npm run images` (sharp) cannot run.
// It reads each file's real width/height from its header so layouts still fit (JPEG EXIF rotation is not handled).
import { readdir, mkdir, writeFile, rm, copyFile, readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.env.GENZ_IMAGES || 'D:\\WEBDEV\\GEN Z mens boutique\\IMAGES'
const FOLDERS = { clothing: 'clothing', footwear: 'footwear', accessories: 'accessories', perfumes: 'perfumes', shop: 'full store entrance view' }
const KEEP = { clothing: 9999, footwear: 9999, accessories: 9999, perfumes: 9999, shop: 9999 }
const IMG = /\.(jpe?g|png|webp)$/i

function dims(b) {
  if (b.readUInt32BE(0) === 0x89504e47) return [b.readUInt32BE(16), b.readUInt32BE(20)]
  if (b.toString('ascii', 0, 4) === 'RIFF') {
    const t = b.toString('ascii', 12, 16)
    if (t === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff]
    if (t === 'VP8L') { const v = b.readUInt32LE(21); return [(v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1] }
    if (t === 'VP8X') return [b.readUIntLE(24, 3) + 1, b.readUIntLE(27, 3) + 1]
  }
  for (let i = 2; i < b.length - 9;) {
    if (b[i] !== 0xff) { i++; continue }
    const m = b[i + 1]
    if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]
    i += 2 + b.readUInt16BE(i + 2)
  }
  return [4, 5]
}
async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else if (IMG.test(e.name)) out.push(p)
  }
  return out
}
const rootOk = await stat(ROOT).then(() => true, () => false)
console.log('Photo root:', rootOk ? ROOT : `NOT FOUND (${ROOT})`)
if (!rootOk) { console.error('Set the path, e.g. PowerShell:  $env:GENZ_IMAGES="D:\\WEBDEV\\GEN Z mens boutique\\IMAGES"'); process.exit(1) }

await rm('public/photos', { recursive: true, force: true })
const names = await readdir(ROOT)
const manifest = {}
for (const [key, folder] of Object.entries(FOLDERS)) {
  manifest[key] = []
  const hit = names.find((n) => n.toLowerCase() === folder.toLowerCase())
  const files = hit ? await walk(path.join(ROOT, hit)) : []
  console.log(`[${key}] ${hit ?? 'FOLDER NOT FOUND: ' + folder} -> ${files.length} image files`)
  const sized = await Promise.all(files.map(async (f) => ({ f, size: (await stat(f)).size })))
  sized.sort((a, b) => b.size - a.size)
  await mkdir(path.join('public/photos', key), { recursive: true })
  for (const [i, s] of sized.slice(0, KEEP[key]).entries()) {
    const name = `${key}-${String(i + 1).padStart(2, '0')}${path.extname(s.f).toLowerCase()}`
    await copyFile(s.f, path.join('public/photos', key, name))
    const [w, h] = dims(await readFile(s.f))
    manifest[key].push({ src: `/photos/${key}/${name}`, srcset: '', w, h, o: h / w > 1.15 ? 'p' : h / w < 0.87 ? 'l' : 's', c: '#222222' })
  }
}
manifest.extra = []
manifest.hero = Object.entries(manifest).filter(([k]) => k !== 'shop').flatMap(([, l]) => l).filter((p) => p.o === 'p').slice(0, 3)
const total = Object.values(manifest).reduce((n, a) => n + a.length, 0)
if (!total) { console.error('NO PHOTOS COPIED. Check the folder lines above.'); process.exit(1) }
await writeFile('src/photos.json', JSON.stringify(manifest, null, 1))
console.log(`Done: ${total} photos (originals, not WebP). Restart "npm run dev" if the page does not update.`)
