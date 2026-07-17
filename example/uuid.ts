/**
 * Generates a RFC 4122 version-4 UUID. The Tire Tread SDK rejects any
 * correlationId that is not a valid v4 UUID (INVALID_UUID), so the version
 * and variant bits must be set correctly.
 */
export function uuidV4(): string {
  const bytes: number[] = [];
  for (let i = 0; i < 16; i += 1) {
    bytes.push(Math.floor(Math.random() * 256));
  }
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.map((b) => b.toString(16).padStart(2, '0'));
  return [
    hex.slice(0, 4).join(''),
    hex.slice(4, 6).join(''),
    hex.slice(6, 8).join(''),
    hex.slice(8, 10).join(''),
    hex.slice(10, 16).join(''),
  ].join('-');
}
