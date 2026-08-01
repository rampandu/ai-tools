// lib/jsonDiff.js
// Structure-aware JSON diff. Runs entirely client-side — walks both parsed
// values in parallel and reports added/removed/changed leaves by JSON path.

const MAX_DIFFS = 500;

function diffValue(a, b, path, diffs) {
  if (diffs.length >= MAX_DIFFS) return;

  const aIsObj = a !== null && typeof a === 'object';
  const bIsObj = b !== null && typeof b === 'object';

  if (aIsObj && bIsObj) {
    const aIsArr = Array.isArray(a);
    const bIsArr = Array.isArray(b);

    if (aIsArr !== bIsArr) {
      diffs.push({ path: path || '(root)', type: 'changed', from: a, to: b });
      return;
    }

    if (aIsArr) {
      const len = Math.max(a.length, b.length);
      for (let i = 0; i < len; i += 1) {
        if (diffs.length >= MAX_DIFFS) return;
        const fullPath = `${path}[${i}]`;
        if (i >= a.length) {
          diffs.push({ path: fullPath, type: 'added', value: b[i] });
        } else if (i >= b.length) {
          diffs.push({ path: fullPath, type: 'removed', value: a[i] });
        } else {
          diffValue(a[i], b[i], fullPath, diffs);
        }
      }
      return;
    }

    const keys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)])).sort();
    for (const key of keys) {
      if (diffs.length >= MAX_DIFFS) return;
      const fullPath = path ? `${path}.${key}` : key;
      const inA = Object.prototype.hasOwnProperty.call(a, key);
      const inB = Object.prototype.hasOwnProperty.call(b, key);
      if (!inA) {
        diffs.push({ path: fullPath, type: 'added', value: b[key] });
      } else if (!inB) {
        diffs.push({ path: fullPath, type: 'removed', value: a[key] });
      } else {
        diffValue(a[key], b[key], fullPath, diffs);
      }
    }
    return;
  }

  if (a !== b) {
    diffs.push({ path: path || '(root)', type: 'changed', from: a, to: b });
  }
}

/**
 * Compare two already-parsed JSON values and return a flat list of
 * differences by path.
 *
 * @param {*} a - original value
 * @param {*} b - changed value
 * @returns {Array<{path: string, type: 'added'|'removed'|'changed', value?: *, from?: *, to?: *}>}
 */
export function diffJson(a, b) {
  const diffs = [];
  diffValue(a, b, '', diffs);
  return diffs;
}

export { MAX_DIFFS };
