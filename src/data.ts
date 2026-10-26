export type Cat = 'clothing' | 'footwear' | 'accessories' | 'perfumes'
// Each category is its own theme: colours + display font (--f) so the four pages feel like four rooms.
export const CATS: { id: Cat; word: string; bg: string; ink: string; ac: string; font: string; line: string; hero: string }[] = [
  { id: 'clothing', word: 'CLOTHING', bg: '#173b31', ink: '#f3f0e8', ac: '#d7ff45', font: "'Bricolage Grotesque',system-ui,sans-serif", line: 'Fits cut to make an entrance.', hero: 'The Rack' },
  { id: 'footwear', word: 'FOOTWEAR', bg: '#1c2a43', ink: '#f3f0e8', ac: '#f15a3b', font: "'Anton',Impact,sans-serif", line: 'Sneakers and loafers that earn the second glance.', hero: 'Sole Lab' },
  { id: 'accessories', word: 'ACCESSORIES', bg: '#984b32', ink: '#f8eee0', ac: '#d7ff45', font: "'Permanent Marker','Comic Sans MS',cursive", line: 'The small details that do the talking.', hero: 'The Drawer' },
  { id: 'perfumes', word: 'PERFUMES', bg: '#2b203b', ink: '#f5edf4', ac: '#e8a8cb', font: "'Instrument Serif',Georgia,serif", line: 'A scent that walks in before you do.', hero: 'The Scent Bar' },
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
  clothing: ['clothing-010', 'clothing-011', 'clothing-004'],
  footwear: ['footwear-003', 'footwear-008', 'footwear-004'],
  accessories: ['accessories-004', 'accessories-005', 'accessories-010'],
  perfumes: ['perfumes-019', 'perfumes-004', 'perfumes-001'],
}
// The shop's own wall sign ("IT'S TIME TO LEVEL UP") is sharp in this photo.
export const SIGN_PHOTO = 'accessories-004'
// Shop-only facts the owner gave. Closing time is unknown, so none is shown.
export const FACTS = { rating: '4.8', reviews: '44', opens: 'Opens at 11 am' }
