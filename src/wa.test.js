import test from 'node:test'
import assert from 'node:assert/strict'
import { buildWaLink } from './wa.js'
test('empty selection gives a plain greeting', () => assert.match(buildWaLink(), /text=Hi%20GEN-Z!$/))
test('items are encoded, trimmed and non-strings dropped', () => {
  const u = buildWaLink([' Loafers & more ', 42, ''])
  assert.ok(u.includes('Loafers%20%26%20more') && !u.includes('42'))
})
