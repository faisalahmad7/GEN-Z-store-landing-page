import { createRoot } from 'react-dom/client'
import '@fontsource/space-mono/latin-400.css'
import '@fontsource/space-mono/latin-700.css'
import '@fontsource/anton/latin-400.css'
import '@fontsource/permanent-marker/latin-400.css'
import '@fontsource/bricolage-grotesque/latin-600.css'
import '@fontsource/bricolage-grotesque/latin-800.css'
import '@fontsource/instrument-serif/latin-400.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import './site.css'
import App from './App'

// Start loading the faces now (not when first laid out) and show the big headings once they are ready, so the swap can't shift the layout.
// shortcut: 2.5s cap, headings appear in the fallback face if the fonts are slower than that.
const FACES = ['400 1em Anton', "400 1em 'Permanent Marker'", "400 1em 'Instrument Serif'", "italic 400 1em 'Instrument Serif'", "800 1em 'Bricolage Grotesque'", '400 1em "Space Mono"']
const show = () => requestAnimationFrame(() => document.documentElement.classList.add('fonts-ok'))
Promise.race([Promise.all(FACES.map((f) => document.fonts.load(f))), new Promise((r) => setTimeout(r, 2500))]).then(show, show)

createRoot(document.getElementById('root')!).render(<App />)
