// pages/api/docstring.js
// Deterministic function-signature -> JSDoc / Python docstring generator.
// No external APIs required — matches the same pattern as api/regex.js and api/cron.js.
import { rateLimit } from '../../lib/rateLimit';

const VERB_TEMPLATES = {
  get: (rest) => `Gets ${rest || 'the value'}.`,
  set: (rest) => `Sets ${rest || 'the value'}.`,
  is: (rest) => `Checks whether ${rest || 'the condition is true'}.`,
  has: (rest) => `Checks whether it has ${rest || 'the given item'}.`,
  create: (rest) => `Creates ${rest || 'a new item'}.`,
  delete: (rest) => `Deletes ${rest || 'the given item'}.`,
  remove: (rest) => `Removes ${rest || 'the given item'}.`,
  update: (rest) => `Updates ${rest || 'the given item'}.`,
  fetch: (rest) => `Fetches ${rest || 'data'}.`,
  calculate: (rest) => `Calculates ${rest || 'a value'}.`,
  validate: (rest) => `Validates ${rest || 'the input'}.`,
  parse: (rest) => `Parses ${rest || 'the input'}.`,
  format: (rest) => `Formats ${rest || 'the input'}.`,
  find: (rest) => `Finds ${rest || 'a matching item'}.`,
  build: (rest) => `Builds ${rest || 'the result'}.`,
  handle: (rest) => `Handles ${rest || 'the event'}.`,
};

function splitIdentifierWords(name) {
  // camelCase / PascalCase / snake_case -> array of lowercase words
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function guessDescription(name) {
  const words = splitIdentifierWords(name);
  if (words.length === 0) return 'TODO: describe this function.';
  const verb = words[0];
  const rest = words.slice(1).join(' ');
  if (VERB_TEMPLATES[verb]) return VERB_TEMPLATES[verb](rest);
  return `${verb.charAt(0).toUpperCase() + verb.slice(1)}${rest ? ' ' + rest : ''}.`;
}

function detectLanguage(sig) {
  if (/^def\s+\w+\s*\(.*\)\s*:?/.test(sig.trim())) return 'python';
  return 'javascript';
}

function parseSignature(sig) {
  const trimmed = sig.trim();
  // Matches: function name(params), const name = (params) =>, def name(params):, name(params)
  let m = trimmed.match(/(?:function\s+)?([a-zA-Z_$][\w$]*)\s*\(([^)]*)\)/);
  if (!m) m = trimmed.match(/def\s+([a-zA-Z_]\w*)\s*\(([^)]*)\)/);
  if (!m) return null;
  const name = m[1];
  const paramsRaw = m[2].trim();
  const params = paramsRaw
    ? paramsRaw.split(',').map((p) => p.trim().split('=')[0].split(':')[0].trim()).filter(Boolean)
    : [];
  return { name, params };
}

function generateDocstring(signature) {
  const language = detectLanguage(signature);
  const parsed = parseSignature(signature);
  if (!parsed) {
    return { error: 'Could not find a function name and parameter list in that signature. Try a format like "function getUser(id, options)" or "def get_user(id, options):".' };
  }
  const { name, params } = parsed;
  const description = guessDescription(name);

  let docstring;
  if (language === 'python') {
    const argsBlock = params.length
      ? params.map((p) => `        ${p}: `).join('\n')
      : '        (no parameters)';
    docstring = `"""\n    ${description}\n\n    Args:\n${argsBlock}\n\n    Returns:\n        \n    """`;
  } else {
    const paramLines = params.length
      ? params.map((p) => ` * @param {*} ${p}`).join('\n')
      : ' * (no parameters)';
    docstring = `/**\n * ${description}\n${paramLines}\n * @returns {*}\n */`;
  }

  return { language, name, params, description, docstring };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  if (!(await rateLimit(req, res, { key: 'docstring', points: 20, duration: 60 }))) return;

  const { signature } = req.body || {};

  if (!signature || typeof signature !== 'string' || !signature.trim()) {
    return res.status(400).json({ error: 'signature is required (non-empty string).' });
  }
  if (signature.length > 500) {
    return res.status(400).json({ error: 'signature must be 500 characters or fewer.' });
  }

  try {
    const result = generateDocstring(signature);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server_error', details: String(err) });
  }
}
