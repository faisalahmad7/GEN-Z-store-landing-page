import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
// The hand-picked lead photos (data.ts PICKS / SIGN_PHOTO) are file ids; if `npm run images` renames files they silently fall back. This catches that.
const ids = new Set(Object.values(JSON.parse(readFileSync(new URL('./photos.json', import.meta.url)))).flat().map((p) => p.src.split('/').pop().replace(/-\d+\.webp$/, '')))
const src = readFileSync(new URL('./data.ts', import.meta.url), 'utf8')
test('every pinned photo id exists in photos.json', () => {
  const pinned = [...src.matchAll(/'((?:clothing|footwear|accessories|perfumes|shop)-\d+)'/g)].map((m) => m[1])
  assert.ok(pinned.length >= 13)
  for (const id of pinned) assert.ok(ids.has(id), `missing photo: ${id}`)
})
