import type { CSSProperties } from 'react'
// Typed way to set CSS custom properties inline.
export const vars = (o: Record<string, string | number>) => o as CSSProperties
