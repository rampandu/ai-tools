// lib/colorConvert.js
// Color parsing and conversion between HEX, RGB, and HSL. Client-side only.

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

/**
 * Convert HSL to RGB.
 * @param {number} h - hue 0-360
 * @param {number} s - saturation 0-100
 * @param {number} l - lightness 0-100
 * @returns {{r: number, g: number, b: number}} channels 0-255 (rounded)
 */
export function hslToRgb(h, s, l) {
  const hue = ((Number(h) % 360) + 360) % 360;
  const sat = clamp(Number(s), 0, 100) / 100;
  const lig = clamp(Number(l), 0, 100) / 100;

  const c = (1 - Math.abs(2 * lig - 1)) * sat;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lig - c / 2;

  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (hue < 60) { r1 = c; g1 = x; }
  else if (hue < 120) { r1 = x; g1 = c; }
  else if (hue < 180) { g1 = c; b1 = x; }
  else if (hue < 240) { g1 = x; b1 = c; }
  else if (hue < 300) { r1 = x; b1 = c; }
  else { r1 = c; b1 = x; }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

/**
 * Convert RGB to HSL.
 * @param {{r: number, g: number, b: number}} rgb - channels 0-255
 * @returns {{h: number, s: number, l: number}} h 0-360, s/l 0-100 (rounded)
 */
export function rgbToHsl({ r, g, b }) {
  const rn = clamp(Number(r), 0, 255) / 255;
  const gn = clamp(Number(g), 0, 255) / 255;
  const bn = clamp(Number(b), 0, 255) / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    if (max === rn) h = 60 * (((gn - bn) / delta) % 6);
    else if (max === gn) h = 60 * ((bn - rn) / delta + 2);
    else h = 60 * ((rn - gn) / delta + 4);
  }
  if (h < 0) h += 360;

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert RGB(A) to a hex string. Alpha hex is appended only when a < 1.
 * @param {{r: number, g: number, b: number, a?: number}} rgba
 * @returns {string} e.g. "#ff0000" or "#ff000080"
 */
export function rgbToHex({ r, g, b, a }) {
  const toHex = (v) => clamp(Math.round(Number(v)), 0, 255).toString(16).padStart(2, '0');
  let hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  const alpha = a === undefined || a === null ? 1 : Number(a);
  if (alpha < 1) {
    hex += toHex(alpha * 255);
  }
  return hex;
}

/**
 * Parse a CSS-ish color string into {r, g, b, a} or null if unparseable.
 * Accepts: #rgb, #rgba, #rrggbb, #rrggbbaa (with or without the leading #),
 * rgb(r, g, b), rgba(r, g, b, a), hsl(h, s%, l%), hsla(h, s%, l%, a).
 * @param {string} str
 * @returns {{r: number, g: number, b: number, a: number} | null}
 */
export function parseColor(str) {
  if (typeof str !== 'string') return null;
  const input = str.trim().toLowerCase();
  if (!input) return null;

  // HEX forms
  const hexBody = input.startsWith('#') ? input.slice(1) : input;
  if (/^[0-9a-f]+$/.test(hexBody)) {
    if (hexBody.length === 3 || hexBody.length === 4) {
      const r = parseInt(hexBody[0] + hexBody[0], 16);
      const g = parseInt(hexBody[1] + hexBody[1], 16);
      const b = parseInt(hexBody[2] + hexBody[2], 16);
      const a = hexBody.length === 4 ? parseInt(hexBody[3] + hexBody[3], 16) / 255 : 1;
      return { r, g, b, a: Math.round(a * 1000) / 1000 };
    }
    if (hexBody.length === 6 || hexBody.length === 8) {
      const r = parseInt(hexBody.slice(0, 2), 16);
      const g = parseInt(hexBody.slice(2, 4), 16);
      const b = parseInt(hexBody.slice(4, 6), 16);
      const a = hexBody.length === 8 ? parseInt(hexBody.slice(6, 8), 16) / 255 : 1;
      return { r, g, b, a: Math.round(a * 1000) / 1000 };
    }
    return null;
  }

  // rgb() / rgba()
  let m = input.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d*\.?\d+)\s*)?\)$/
  );
  if (m) {
    const r = Number(m[1]);
    const g = Number(m[2]);
    const b = Number(m[3]);
    if (r > 255 || g > 255 || b > 255) return null;
    const a = m[4] === undefined ? 1 : clamp(Number(m[4]), 0, 1);
    return { r, g, b, a };
  }

  // hsl() / hsla()
  m = input.match(
    /^hsla?\(\s*(-?\d*\.?\d+)(?:deg)?\s*,\s*(\d*\.?\d+)%\s*,\s*(\d*\.?\d+)%\s*(?:,\s*(\d*\.?\d+)\s*)?\)$/
  );
  if (m) {
    const { r, g, b } = hslToRgb(Number(m[1]), Number(m[2]), Number(m[3]));
    const a = m[4] === undefined ? 1 : clamp(Number(m[4]), 0, 1);
    return { r, g, b, a };
  }

  return null;
}
