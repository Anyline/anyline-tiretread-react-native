/** Pure helpers for presenting a Tire Sidewall (TSW) scan result. */

/** Pretty-print the raw result JSON, falling back to the raw string. */
export function prettyJson(raw: string): string {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch (_error) {
    return raw;
  }
}

/** The detected tire size string (e.g. "225/45R17"), or null if absent. */
export function sizeFromResultJson(raw: string): string | null {
  try {
    const decoded = JSON.parse(raw) as { size?: unknown };
    return typeof decoded.size === 'string' && decoded.size.length > 0 ? decoded.size : null;
  } catch (_error) {
    return null;
  }
}

/** The section width (mm) leading a tire-size string, valid only in 100–500. */
function extractTireWidth(tireSize: string): number | null {
  const match = tireSize.match(/[A-Za-z]*\d{3}/);
  const digits = match?.[0].replace(/\D/g, '');
  if (!digits || digits.length < 3) return null;
  const width = parseInt(digits.substring(0, 3), 10);
  return width >= 100 && width <= 500 ? width : null;
}

/** The tire width (mm) parsed from the sidewall result JSON, or null. */
export function tireWidthFromResultJson(raw: string): number | null {
  const size = sizeFromResultJson(raw);
  return size == null ? null : extractTireWidth(size);
}
