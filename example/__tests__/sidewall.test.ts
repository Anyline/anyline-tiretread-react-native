/**
 * @format
 */

import { prettyJson, sizeFromResultJson, tireWidthFromResultJson } from '../sidewall';

describe('sizeFromResultJson', () => {
  test('returns the size string when present', () => {
    expect(sizeFromResultJson('{"size":"225/45R17","other":1}')).toBe('225/45R17');
  });

  test('returns null for empty, missing, or non-string size', () => {
    expect(sizeFromResultJson('{"size":""}')).toBeNull();
    expect(sizeFromResultJson('{"other":1}')).toBeNull();
    expect(sizeFromResultJson('{"size":225}')).toBeNull();
  });

  test('returns null for invalid JSON', () => {
    expect(sizeFromResultJson('not json')).toBeNull();
  });
});

describe('tireWidthFromResultJson', () => {
  test('extracts the leading section width from a size string', () => {
    expect(tireWidthFromResultJson('{"size":"225/45R17"}')).toBe(225);
    expect(tireWidthFromResultJson('{"size":"P215/65R16"}')).toBe(215);
    expect(tireWidthFromResultJson('{"size":"LT265/70R17"}')).toBe(265);
  });

  test('returns null when out of the 100-500 range or unparseable', () => {
    expect(tireWidthFromResultJson('{"size":"600/50R22"}')).toBeNull();
    expect(tireWidthFromResultJson('{"size":"R17"}')).toBeNull();
    expect(tireWidthFromResultJson('{"other":1}')).toBeNull();
    expect(tireWidthFromResultJson('not json')).toBeNull();
  });
});

describe('prettyJson', () => {
  test('indents valid JSON', () => {
    expect(prettyJson('{"a":1}')).toBe('{\n  "a": 1\n}');
  });

  test('falls back to the raw string on invalid JSON', () => {
    expect(prettyJson('not json')).toBe('not json');
  });
});
