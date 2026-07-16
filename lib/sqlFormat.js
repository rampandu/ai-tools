// lib/sqlFormat.js
// Client-side SQL formatter/minifier. No dependencies, runs entirely in the browser.

const KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'INNER', 'LEFT', 'RIGHT',
  'FULL', 'OUTER', 'ON', 'GROUP', 'BY', 'ORDER', 'HAVING', 'LIMIT', 'OFFSET',
  'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'UNION', 'ALL',
  'DISTINCT', 'AS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'NULL', 'NOT',
  'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'ASC', 'DESC', 'WITH',
]);

// Clause starters that get their own line (single words).
const CLAUSE_STARTERS = new Set([
  'SELECT', 'FROM', 'WHERE', 'HAVING', 'LIMIT', 'UNION', 'VALUES', 'SET',
]);

// Words that begin a JOIN clause.
const JOIN_STARTERS = new Set(['INNER', 'LEFT', 'RIGHT', 'FULL', 'CROSS', 'JOIN']);

/**
 * Tokenize SQL, keeping single-quoted string literals and double-quoted
 * identifiers as opaque tokens so they are never re-cased or reflowed.
 */
function tokenize(sql) {
  const tokens = [];
  let i = 0;
  const n = sql.length;
  while (i < n) {
    const ch = sql[i];
    if (ch === "'") {
      // Single-quoted string literal, with '' as escaped quote.
      let j = i + 1;
      while (j < n) {
        if (sql[j] === "'" && sql[j + 1] === "'") { j += 2; continue; }
        if (sql[j] === "'") { j += 1; break; }
        j += 1;
      }
      tokens.push({ type: 'quoted', value: sql.slice(i, j) });
      i = j;
    } else if (ch === '"') {
      // Double-quoted identifier.
      let j = i + 1;
      while (j < n && sql[j] !== '"') j += 1;
      if (j < n) j += 1;
      tokens.push({ type: 'quoted', value: sql.slice(i, j) });
      i = j;
    } else if (/\s/.test(ch)) {
      let j = i;
      while (j < n && /\s/.test(sql[j])) j += 1;
      tokens.push({ type: 'ws', value: ' ' }); // collapse whitespace runs
      i = j;
    } else if (/[A-Za-z_]/.test(ch)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_$]/.test(sql[j])) j += 1;
      tokens.push({ type: 'word', value: sql.slice(i, j) });
      i = j;
    } else {
      tokens.push({ type: 'sym', value: ch });
      i += 1;
    }
  }
  return tokens;
}

function nextWord(tokens, idx) {
  for (let k = idx + 1; k < tokens.length; k += 1) {
    if (tokens[k].type === 'ws') continue;
    return tokens[k].type === 'word' ? tokens[k].value.toUpperCase() : null;
  }
  return null;
}

function prevSignificant(tokens, idx) {
  for (let k = idx - 1; k >= 0; k -= 1) {
    if (tokens[k].type === 'ws') continue;
    return tokens[k];
  }
  return null;
}

/**
 * Format SQL: uppercase (or lowercase) keywords, newline before major
 * clauses and each JOIN, 2-space indent for AND/OR continuation lines,
 * collapsed whitespace. String literals and quoted identifiers untouched.
 *
 * @param {string} sql
 * @param {{ keywordCase?: 'upper' | 'lower' }} [options]
 * @returns {string}
 */
export function formatSql(sql, options = {}) {
  const keywordCase = options.keywordCase === 'lower' ? 'lower' : 'upper';
  const tokens = tokenize(String(sql || ''));

  // Re-case keywords first (never touching quoted tokens).
  for (const t of tokens) {
    if (t.type === 'word' && KEYWORDS.has(t.value.toUpperCase())) {
      t.value = keywordCase === 'upper' ? t.value.toUpperCase() : t.value.toLowerCase();
    }
  }

  const out = [];
  let wroteAnything = false;

  for (let i = 0; i < tokens.length; i += 1) {
    const t = tokens[i];
    if (t.type === 'ws') {
      // Look ahead: the next token may force a newline, replacing this space.
      out.push({ kind: 'space' });
      continue;
    }

    if (t.type === 'word') {
      const upper = t.value.toUpperCase();
      let breakBefore = null; // '\n' or '\n  '

      if (CLAUSE_STARTERS.has(upper)) {
        breakBefore = '\n';
      } else if ((upper === 'GROUP' || upper === 'ORDER') && nextWord(tokens, i) === 'BY') {
        breakBefore = '\n';
      } else if (JOIN_STARTERS.has(upper)) {
        if (upper === 'JOIN') {
          // Bare JOIN only breaks when not preceded by INNER/LEFT/RIGHT/FULL/CROSS/OUTER.
          const prev = prevSignificant(tokens, i);
          const prevUpper = prev && prev.type === 'word' ? prev.value.toUpperCase() : null;
          if (!prevUpper || !['INNER', 'LEFT', 'RIGHT', 'FULL', 'CROSS', 'OUTER'].includes(prevUpper)) {
            breakBefore = '\n';
          }
        } else {
          // LEFT/RIGHT/FULL/INNER/CROSS: only break when actually starting a JOIN.
          const nw = nextWord(tokens, i);
          if (nw === 'JOIN' || nw === 'OUTER') breakBefore = '\n';
        }
      } else if (upper === 'AND' || upper === 'OR') {
        breakBefore = '\n  ';
      }

      if (breakBefore && wroteAnything) {
        // Replace a pending space (if any) with the line break.
        while (out.length && out[out.length - 1].kind === 'space') out.pop();
        const prev = prevSignificant(tokens, i);
        if (!(prev && prev.type === 'sym' && prev.value === '(')) {
          out.push({ kind: 'text', value: breakBefore });
        } else {
          out.push({ kind: 'space' });
        }
      }
    }

    out.push({ kind: 'text', value: t.value });
    wroteAnything = true;
  }

  return out
    .map((p) => (p.kind === 'space' ? ' ' : p.value))
    .join('')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
}

/**
 * Minify SQL: collapse all whitespace runs (including newlines) to single
 * spaces, preserving string literals and quoted identifiers exactly.
 *
 * @param {string} sql
 * @returns {string}
 */
export function minifySql(sql) {
  const tokens = tokenize(String(sql || ''));
  return tokens
    .map((t) => (t.type === 'ws' ? ' ' : t.value))
    .join('')
    .trim();
}
