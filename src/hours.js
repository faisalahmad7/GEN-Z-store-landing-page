// Shop hours (owner data sheet, to be confirmed by the owner). Minutes after midnight, Asia/Kolkata. Sun=0 .. Sat=6.
export const HOURS = { week: [660, 1320], end: [690, 1290] }
const span = (d) => (d === 0 || d === 6 ? HOURS.end : HOURS.week)
export const fmt = (m) => { const h = Math.floor(m / 60), n = m % 60, h12 = h % 12 || 12; return `${h12}${n ? ':' + String(n).padStart(2, '0') : ''} ${h < 12 ? 'am' : 'pm'}` }
export function openState(now = new Date()) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(now).map((x) => [x.type, x.value]))
  const d = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday)
  const t = (+p.hour % 24) * 60 + +p.minute
  const [o, c] = span(d)
  if (t >= o && t < c) return { open: true, label: `OPEN NOW · till ${fmt(c)}` }
  return { open: false, label: `CLOSED · opens ${fmt(t < o ? o : span((d + 1) % 7)[0])}${t < o ? '' : ' tomorrow'}` }
}
