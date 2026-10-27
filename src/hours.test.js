import test from 'node:test'
import assert from 'node:assert/strict'
import { openState } from './hours.js'
// 2026-10-26 is a Monday. IST = UTC+5:30.
const ist = (iso) => new Date(iso + '+05:30')
test('open on a weekday afternoon', () => assert.equal(openState(ist('2026-10-26T15:00:00')).label, 'OPEN NOW · till 10 pm'))
test('closed before opening, same day', () => assert.equal(openState(ist('2026-10-26T09:00:00')).label, 'CLOSED · opens 11 am'))
test('closed after closing, next day is Tuesday', () => assert.equal(openState(ist('2026-10-26T22:30:00')).label, 'CLOSED · opens 11 am tomorrow'))
test('weekend hours differ', () => assert.equal(openState(ist('2026-10-31T12:00:00')).label, 'OPEN NOW · till 9:30 pm'))
test('Friday night rolls into Saturday 11:30', () => assert.equal(openState(ist('2026-10-30T23:00:00')).label, 'CLOSED · opens 11:30 am tomorrow'))
