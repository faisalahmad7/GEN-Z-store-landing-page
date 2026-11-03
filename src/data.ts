export type Cat = 'clothing' | 'footwear' | 'accessories' | 'perfumes'
// One shared display family across every room keeps the identity consistent; each room gets its own colour pairing.
export const CATS: { id: Cat; word: string; bg: string; ink: string; ac: string; font: string; line: string; hero: string }[] = [
  { id: 'clothing', word: 'CLOTHING', bg: '#173d35', ink: '#f4f0e8', ac: '#d7ff48', font: "'Bricolage Grotesque',system-ui,sans-serif", line: 'Fits cut to make an entrance.', hero: 'The Rack' },
  { id: 'footwear', word: 'FOOTWEAR', bg: '#1b2a52', ink: '#f4f0e8', ac: '#ff6a43', font: "'Bricolage Grotesque',system-ui,sans-serif", line: 'Sneakers and loafers that earn the second glance.', hero: 'Sole Lab' },
  { id: 'accessories', word: 'ACCESSORIES', bg: '#f2e6d2', ink: '#171815', ac: '#3556d9', font: "'Bricolage Grotesque',system-ui,sans-serif", line: 'The small details that do the talking.', hero: 'The Drawer' },
  { id: 'perfumes', word: 'PERFUMES', bg: '#2b2037', ink: '#f6eff8', ac: '#e7a8d0', font: "'Bricolage Grotesque',system-ui,sans-serif", line: 'Fragrance that defines you, wherever you go.', hero: 'The Scent Bar' },
]
export const SHOP = {
  address: 'Shop No 17, HM Royal Society, opp. main gate, Kondhwa, Pune 411048',
  phone: '093735 58814',
  tel: 'tel:+919373558814',
  maps: 'https://www.google.com/maps/search/?api=1&query=GEN-Z+Shop+No+17+HM+Royal+Society+Kondhwa+Pune+411048',
  insta: 'https://www.instagram.com/genz.formens/',
}
// Real Google Maps snippets; several are ~5 years old so they are labelled, not dated as recent.
export const REVIEWS = [
  'Amazing collection with lots of variety at best price.',
  'Awesome quality and reasonable rate, customer service is also good.',
  'Amazing place for shoes with new varieties never seen before.',
]
// Hand-picked lead photos per room, by file id (first = lead). If `npm run images` renames files, the helper falls back to the best portraits; re-pin here.
// shortcut: ids come from the current photos.json, re-pin after a re-run of the image script.
export const PICKS: Record<Cat, string[]> = {
  clothing: ['clothing-010', 'IMG_6913.JPG.webp', 'IMG_6915.JPG.webp'],
  footwear: ['IMG_6904.JPG.webp', 'footwear-008', 'IMG_6892.JPG.webp'],
  accessories: ['accessories-004', 'clothing-013', 'IMG_6847.JPG.webp'],
  perfumes: ['IMG_6873.JPG.webp', 'perfumes-001', 'IMG_6859.JPG.webp'],
}
// The shop's own wall sign ("IT'S TIME TO LEVEL UP") is sharp in this photo.
export const SIGN_PHOTO = 'accessories-004'
// Shop-only facts the owner gave. Closing time is unknown, so none is shown.
export const FACTS = { rating: '4.8', reviews: '44', opens: 'Opens at 11 am' }
