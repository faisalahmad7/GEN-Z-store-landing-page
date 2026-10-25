// Route normaliser: "/clothing/" and "/Clothing" must land on the clothing room, not the home page.
// shortcut: only strips trailing slashes and lower-cases; query strings and hashes are not part of location.pathname.
export const normPath = (p = '/') => p.toLowerCase().replace(/\/+$/, '') || '/'
