// lib/diffLines.js
// Classic LCS (longest common subsequence) line diff. Runs entirely client-side.

const MAX_LINES = 5000;

/**
 * Diff two texts line by line using LCS dynamic programming.
 *
 * @param {string} a - original text
 * @param {string} b - changed text
 * @returns {Array<{type: 'same'|'removed'|'added', line: string}> | {error: string}}
 */
export function diffLines(a, b) {
  const aLines = String(a === undefined || a === null ? '' : a).split('\n');
  const bLines = String(b === undefined || b === null ? '' : b).split('\n');

  if (aLines.length > MAX_LINES || bLines.length > MAX_LINES) {
    return {
      error: `Input too large: each side is limited to ${MAX_LINES} lines (got ${aLines.length} and ${bLines.length}).`,
    };
  }

  const m = aLines.length;
  const n = bLines.length;

  // DP table of LCS lengths, (m+1) x (n+1), stored flat.
  // Uint16Array is enough: lengths never exceed MAX_LINES (5000) < 65536.
  const width = n + 1;
  const dp = new Uint16Array((m + 1) * width);

  for (let i = 1; i <= m; i += 1) {
    const row = i * width;
    const prevRow = (i - 1) * width;
    const aLine = aLines[i - 1];
    for (let j = 1; j <= n; j += 1) {
      if (aLine === bLines[j - 1]) {
        dp[row + j] = dp[prevRow + j - 1] + 1;
      } else {
        const up = dp[prevRow + j];
        const left = dp[row + j - 1];
        dp[row + j] = up >= left ? up : left;
      }
    }
  }

  // Backtrack from (m, n) building the diff in reverse.
  const result = [];
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (aLines[i - 1] === bLines[j - 1]) {
      result.push({ type: 'same', line: aLines[i - 1] });
      i -= 1;
      j -= 1;
    } else if (dp[(i - 1) * width + j] >= dp[i * width + j - 1]) {
      result.push({ type: 'removed', line: aLines[i - 1] });
      i -= 1;
    } else {
      result.push({ type: 'added', line: bLines[j - 1] });
      j -= 1;
    }
  }
  while (i > 0) {
    result.push({ type: 'removed', line: aLines[i - 1] });
    i -= 1;
  }
  while (j > 0) {
    result.push({ type: 'added', line: bLines[j - 1] });
    j -= 1;
  }

  result.reverse();
  return result;
}
