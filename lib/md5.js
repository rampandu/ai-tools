// lib/md5.js
// Standard MD5 implementation (RFC 1321), adapted from well-known
// public-domain JavaScript ports. UTF-8 safe: input strings are encoded
// to UTF-8 bytes with TextEncoder before hashing.
// Exports: md5(str) -> lowercase hex digest string.

/* eslint-disable no-bitwise */

// Per-round shift amounts (RFC 1321).
const S = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
  5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
  4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
  6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
];

// Binary integer parts of the sines of integers (radians), K[i] = floor(2^32 * abs(sin(i+1))).
const K = (() => {
  const k = new Array(64);
  for (let i = 0; i < 64; i++) {
    k[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) >>> 0;
  }
  return k;
})();

function leftRotate(x, c) {
  return ((x << c) | (x >>> (32 - c))) >>> 0;
}

function toUtf8Bytes(str) {
  if (typeof TextEncoder !== 'undefined') {
    return new TextEncoder().encode(str);
  }
  // Minimal fallback UTF-8 encoder for very old environments.
  const out = [];
  const encoded = unescape(encodeURIComponent(str));
  for (let i = 0; i < encoded.length; i++) out.push(encoded.charCodeAt(i) & 0xff);
  return Uint8Array.from(out);
}

export function md5(str) {
  const msg = toUtf8Bytes(String(str));
  const msgLen = msg.length;

  // Padding: append 0x80, then zeros until length % 64 === 56,
  // then the original bit length as a 64-bit little-endian integer.
  const paddedLen = (((msgLen + 8) >> 6) + 1) << 6; // multiple of 64
  const padded = new Uint8Array(paddedLen);
  padded.set(msg);
  padded[msgLen] = 0x80;

  const bitLenLo = (msgLen << 3) >>> 0; // low 32 bits of bit length
  const bitLenHi = Math.floor(msgLen / 536870912); // msgLen * 8 / 2^32
  padded[paddedLen - 8] = bitLenLo & 0xff;
  padded[paddedLen - 7] = (bitLenLo >>> 8) & 0xff;
  padded[paddedLen - 6] = (bitLenLo >>> 16) & 0xff;
  padded[paddedLen - 5] = (bitLenLo >>> 24) & 0xff;
  padded[paddedLen - 4] = bitLenHi & 0xff;
  padded[paddedLen - 3] = (bitLenHi >>> 8) & 0xff;
  padded[paddedLen - 2] = (bitLenHi >>> 16) & 0xff;
  padded[paddedLen - 1] = (bitLenHi >>> 24) & 0xff;

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  const M = new Array(16);

  for (let chunk = 0; chunk < paddedLen; chunk += 64) {
    // Break chunk into sixteen 32-bit little-endian words.
    for (let j = 0; j < 16; j++) {
      const o = chunk + j * 4;
      M[j] =
        (padded[o] | (padded[o + 1] << 8) | (padded[o + 2] << 16) | (padded[o + 3] << 24)) >>> 0;
    }

    let A = a0;
    let B = b0;
    let C = c0;
    let D = d0;

    for (let i = 0; i < 64; i++) {
      let F;
      let g;
      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }
      const tmp = D;
      D = C;
      C = B;
      const sum = (((A + F) | 0) + ((K[i] + M[g]) | 0)) | 0;
      B = (B + leftRotate(sum >>> 0, S[i])) | 0;
      A = tmp;
    }

    a0 = (a0 + A) | 0;
    b0 = (b0 + B) | 0;
    c0 = (c0 + C) | 0;
    d0 = (d0 + D) | 0;
  }

  return wordToHexLE(a0) + wordToHexLE(b0) + wordToHexLE(c0) + wordToHexLE(d0);
}

function wordToHexLE(word) {
  let hex = '';
  for (let i = 0; i < 4; i++) {
    const byte = (word >>> (i * 8)) & 0xff;
    hex += byte.toString(16).padStart(2, '0');
  }
  return hex;
}
