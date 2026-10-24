// WhatsApp link builder. Owner must confirm this number is on WhatsApp.
export const WA_NUMBER = '919373558814'
export function buildWaLink(items = []) {
  const clean = items.filter((s) => typeof s === 'string').map((s) => s.trim().slice(0, 80)).filter(Boolean).slice(0, 8)
  const text = clean.length ? `Hi GEN-Z! I'm interested in: ${clean.join(', ')}` : 'Hi GEN-Z!'
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}
