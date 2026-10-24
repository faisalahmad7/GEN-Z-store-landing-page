// Rotating "genuine" stamp. `id` must be unique per use on a page (SVG textPath reference).
export default function Seal({ id, className = '' }: { id: string; className?: string }) {
  return (
    <svg className={'seal ' + className} viewBox="0 0 164 164" role="img" aria-label="100% genuine, authentic branded products">
      <defs><path id={id} d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" /></defs>
      <circle cx="84" cy="84" r="76" fill="#111" />
      <circle cx="80" cy="80" r="76" fill="#d4a94f" />
      <circle cx="80" cy="80" r="46" fill="none" stroke="#111" strokeWidth="1.5" strokeDasharray="2 4" />
      <g className="spin"><text fontSize="13" fontWeight="700" fill="#111" letterSpacing="1"><textPath href={'#' + id} textLength="380" lengthAdjust="spacing">100% AUTHENTIC ✶ BRANDED ✶ GENUINE ✶</textPath></text></g>
      <text x="80" y="88" textAnchor="middle" fontSize="40" fill="#111" className="seal-t">✓</text>
      <text x="80" y="106" textAnchor="middle" fontSize="13" fill="#111" className="seal-t">GENUINE</text>
    </svg>
  )
}
