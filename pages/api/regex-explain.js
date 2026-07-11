// pages/api/regex-explain.js
// Deterministic regex tokenizer/explainer — no external APIs required.
import { rateLimit } from '../../lib/rateLimit';

function explainRegex(patternStr) {
  let flags = '';
  let body = String(patternStr).trim();
  const slashMatch = body.match(/^\/(.*)\/([gimsuy]*)$/);
  if (slashMatch) { body = slashMatch[1]; flags = slashMatch[2]; }

  const tokens = [];
  let i = 0;
  const shorthand = { '\\d': 'a digit (0-9)', '\\D': 'a non-digit', '\\w': 'a word character (letter, digit, or underscore)', '\\W': 'a non-word character', '\\s': 'a whitespace character', '\\S': 'a non-whitespace character', '\\b': 'a word boundary', '\\B': 'a non-word-boundary' };

  while (i < body.length) {
    const c = body[i];
    if (c === '^') { tokens.push({ t: '^', d: 'Start of the string (or line, in multiline mode)' }); i++; continue; }
    if (c === '$') { tokens.push({ t: '$', d: 'End of the string (or line, in multiline mode)' }); i++; continue; }
    if (c === '.') { tokens.push({ t: '.', d: 'Any character except newline' }); i++; continue; }
    if (c === '\\') {
      const two = body.slice(i, i + 2);
      if (shorthand[two]) { tokens.push({ t: two, d: `Matches ${shorthand[two]}` }); i += 2; continue; }
      tokens.push({ t: two, d: `Literal character "${body[i + 1] ?? ''}"` }); i += 2; continue;
    }
    if (c === '[') {
      const end = body.indexOf(']', i + 1);
      const cls = body.slice(i, end === -1 ? body.length : end + 1);
      const negated = cls[1] === '^';
      tokens.push({ t: cls, d: `${negated ? 'Any character NOT' : 'Any one character'} in the set ${cls}` });
      i = end === -1 ? body.length : end + 1; continue;
    }
    if (c === '(') {
      if (body.slice(i, i + 3) === '(?:') { tokens.push({ t: '(?:', d: 'Start of a non-capturing group' }); i += 3; continue; }
      if (body.slice(i, i + 3) === '(?=') { tokens.push({ t: '(?=', d: 'Start of a positive lookahead — asserts what follows without consuming it' }); i += 3; continue; }
      if (body.slice(i, i + 3) === '(?!') { tokens.push({ t: '(?!', d: 'Start of a negative lookahead — asserts what does NOT follow' }); i += 3; continue; }
      if (body.slice(i, i + 4) === '(?<=') { tokens.push({ t: '(?<=', d: 'Start of a positive lookbehind — asserts what precedes' }); i += 4; continue; }
      if (body.slice(i, i + 4) === '(?<!') { tokens.push({ t: '(?<!', d: 'Start of a negative lookbehind — asserts what does NOT precede' }); i += 4; continue; }
      const named = body.slice(i).match(/^\(\?<([a-zA-Z_][a-zA-Z0-9_]*)>/);
      if (named) { tokens.push({ t: named[0], d: `Start of a named capturing group called "${named[1]}"` }); i += named[0].length; continue; }
      tokens.push({ t: '(', d: 'Start of a capturing group' }); i++; continue;
    }
    if (c === ')') { tokens.push({ t: ')', d: 'End of the group' }); i++; continue; }
    if (c === '|') { tokens.push({ t: '|', d: 'OR — matches the pattern on either side' }); i++; continue; }
    if (c === '*') { tokens.push({ t: '*', d: 'Zero or more of the preceding token' }); i++; continue; }
    if (c === '+') { tokens.push({ t: '+', d: 'One or more of the preceding token' }); i++; continue; }
    if (c === '?') { tokens.push({ t: '?', d: 'Zero or one of the preceding token (optional)' }); i++; continue; }
    if (c === '{') {
      const end = body.indexOf('}', i + 1);
      const quant = body.slice(i, end === -1 ? body.length : end + 1);
      const m = quant.match(/\{(\d+)(,)?(\d+)?\}/);
      let d = quant;
      if (m) {
        if (m[3]) d = `Between ${m[1]} and ${m[3]} of the preceding token`;
        else if (m[2]) d = `${m[1]} or more of the preceding token`;
        else d = `Exactly ${m[1]} of the preceding token`;
      }
      tokens.push({ t: quant, d }); i = end === -1 ? body.length : end + 1; continue;
    }
    tokens.push({ t: c, d: `Literal character "${c}"` }); i++;
  }

  return { tokens, flags, original: patternStr };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  if (!(await rateLimit(req, res, { key: 'regex-explain', points: 20, duration: 60 }))) return;

  const { pattern } = req.body || {};
  if (!pattern || typeof pattern !== 'string' || pattern.trim().length === 0) {
    return res.status(400).json({ error: 'Regex pattern is required.' });
  }
  if (pattern.length > 500) {
    return res.status(400).json({ error: 'Pattern too long (max 500 characters).' });
  }

  try {
    const { tokens, flags, original } = explainRegex(pattern);
    return res.json({ tokens, flags, original });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server_error', details: String(err) });
  }
}
