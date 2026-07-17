/**
 * @format
 */

import { uuidV4 } from '../uuid';

const V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

test('uuidV4 produces a valid version-4 UUID', () => {
  for (let i = 0; i < 200; i += 1) {
    expect(uuidV4()).toMatch(V4);
  }
});

test('uuidV4 values are unique', () => {
  const set = new Set(Array.from({ length: 100 }, () => uuidV4()));
  expect(set.size).toBe(100);
});
