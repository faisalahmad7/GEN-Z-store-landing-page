import test from 'node:test'
import assert from 'node:assert/strict'
import { normPath } from './path.js'
test('trailing slashes and case are ignored', () => {
  assert.equal(normPath('/clothing/'), '/clothing')
  assert.equal(normPath('/Footwear'), '/footwear')
  assert.equal(normPath('/perfumes//'), '/perfumes')
})
test('root stays root', () => {
  assert.equal(normPath('/'), '/')
  assert.equal(normPath(''), '/')
  assert.equal(normPath(), '/')
})
