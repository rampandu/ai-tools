// pages/api/commit-message.js
// Deterministic plain-English -> Conventional Commits message generator.
// No external APIs required — matches the same pattern as api/regex.js and api/cron.js.
import { rateLimit } from '../../lib/rateLimit';

const TYPE_KEYWORDS = {
  fix: ['fix', 'bug', 'error', 'crash', 'issue', 'broken', 'resolve'],
  feat: ['add', 'new', 'implement', 'introduce', 'support', 'create'],
  docs: ['docs', 'documentation', 'readme', 'comment'],
  refactor: ['refactor', 'restructure', 'reorganize', 'rename', 'cleanup', 'clean up', 'simplify'],
  test: ['test', 'spec', 'coverage'],
  perf: ['performance', 'optimize', 'speed up', 'faster', 'slow'],
  style: ['format', 'style', 'lint', 'whitespace', 'indent'],
  chore: ['dependency', 'dependencies', 'bump', 'chore', 'config', 'build', 'ci', 'pipeline'],
};

const TYPE_DESCRIPTIONS = {
  feat: 'A new feature',
  fix: 'A bug fix',
  docs: 'Documentation only changes',
  style: 'Changes that do not affect meaning (whitespace, formatting)',
  refactor: 'A code change that neither fixes a bug nor adds a feature',
  perf: 'A code change that improves performance',
  test: 'Adding or correcting tests',
  chore: 'Build process, tooling, or dependency changes',
};

const PAST_TO_IMPERATIVE = {
  added: 'add', fixed: 'fix', updated: 'update', removed: 'removed' === 'x' ? '' : 'remove',
  changed: 'change', created: 'create', improved: 'improve', refactored: 'refactor',
  renamed: 'rename', deleted: 'delete', implemented: 'implement', introduced: 'introduce',
  resolved: 'resolve', optimized: 'optimize', simplified: 'simplify', cleaned: 'clean',
};

function detectType(description) {
  const lower = description.toLowerCase();
  for (const [type, kws] of Object.entries(TYPE_KEYWORDS)) {
    if (kws.some((k) => lower.includes(k))) return type;
  }
  return 'chore';
}

function toImperative(description) {
  const trimmed = description.trim().replace(/^i\s+/i, '').replace(/\.$/, '');
  const words = trimmed.split(' ');
  const first = words[0]?.toLowerCase();
  if (first && PAST_TO_IMPERATIVE[first]) {
    words[0] = PAST_TO_IMPERATIVE[first];
    return words.join(' ');
  }
  return trimmed;
}

function generateCommitMessage({ description, type, scope, breaking, body }) {
  const finalType = (type && TYPE_DESCRIPTIONS[type]) ? type : detectType(description);
  const subject = toImperative(description);
  const scopePart = scope ? `(${scope.trim()})` : '';
  const bang = breaking ? '!' : '';
  const header = `${finalType}${scopePart}${bang}: ${subject}`;

  let full = header;
  if (body) full += `\n\n${body.trim()}`;
  if (breaking) {
    const breakingText = typeof breaking === 'string' && breaking.trim() ? breaking.trim() : 'This change breaks backward compatibility — see description.';
    full += `\n\nBREAKING CHANGE: ${breakingText}`;
  }

  return {
    header,
    full,
    type: finalType,
    typeDescription: TYPE_DESCRIPTIONS[finalType],
    headerLength: header.length,
    tooLong: header.length > 72,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  if (!(await rateLimit(req, res, { key: 'commit-message', points: 20, duration: 60 }))) return;

  const { description, type, scope, breaking, body } = req.body || {};

  if (!description || typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({ error: 'description is required (non-empty string).' });
  }
  if (description.length > 300) {
    return res.status(400).json({ error: 'description must be 300 characters or fewer.' });
  }
  if (type && !TYPE_DESCRIPTIONS[type]) {
    // Unknown type — ignore it and let auto-detect handle it, rather than error.
  }
  if (scope && typeof scope !== 'string') {
    return res.status(400).json({ error: 'scope must be a string.' });
  }
  if (body && typeof body !== 'string') {
    return res.status(400).json({ error: 'body must be a string.' });
  }

  try {
    const result = generateCommitMessage({
      description,
      type: typeof type === 'string' && TYPE_DESCRIPTIONS[type] ? type : null,
      scope: typeof scope === 'string' ? scope : '',
      breaking: breaking || false,
      body: typeof body === 'string' ? body : '',
    });
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server_error', details: String(err) });
  }
}
