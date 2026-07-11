// pages/api/code-explain.js
// Deterministic structural code explainer — no external APIs required.
import { rateLimit } from '../../lib/rateLimit';

const VERB_MAP = {
  get: 'gets',
  set: 'sets',
  is: 'checks whether',
  has: 'checks for',
  create: 'creates',
  delete: 'deletes',
  remove: 'removes',
  update: 'updates',
  fetch: 'fetches',
  calculate: 'calculates',
  validate: 'validates',
  parse: 'parses',
  format: 'formats',
  find: 'finds',
  build: 'builds',
  handle: 'handles',
};

function splitIdentifierWords(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function guessOneLiner(name) {
  const words = splitIdentifierWords(name);
  if (!words.length) return 'performs some operation';
  const verb = VERB_MAP[words[0]] || words[0];
  return `${verb} ${words.slice(1).join(' ') || 'a value'}`;
}

function detectLanguage(code) {
  if (/^\s*def\s+\w+\s*\(.*\)\s*:/m.test(code) || (/^\s*import\s+\w+/m.test(code) && !/;\s*$/m.test(code))) return 'python';
  if (/\bpublic\s+(class|static)\b/.test(code)) return 'java';
  return 'javascript';
}

function countMatches(code, regex) {
  const m = code.match(regex);
  return m ? m.length : 0;
}

function extractNames(code, regex) {
  const names = [];
  let m;
  const re = new RegExp(regex, 'g');
  while ((m = re.exec(code)) !== null) {
    if (m[1]) names.push(m[1]);
  }
  return [...new Set(names)];
}

function analyzeCode(code, languageHint) {
  const language = languageHint && languageHint !== 'auto' ? languageHint : detectLanguage(code);

  const isPy = language === 'python';

  const functionNames = isPy
    ? extractNames(code, 'def\\s+([a-zA-Z_]\\w*)\\s*\\(')
    : extractNames(code, '(?:function\\s+([a-zA-Z_$][\\w$]*)|const\\s+([a-zA-Z_$][\\w$]*)\\s*=\\s*(?:async\\s*)?\\(|([a-zA-Z_$][\\w$]*)\\s*\\([^)]*\\)\\s*\\{)').filter(Boolean);

  const classNames = extractNames(code, isPy ? 'class\\s+([a-zA-Z_]\\w*)' : 'class\\s+([a-zA-Z_$][\\w$]*)');

  const loopCount = isPy
    ? countMatches(code, /\b(for|while)\b/g)
    : countMatches(code, /\b(for|while)\s*\(/g);

  const conditionalCount = countMatches(code, /\bif\b/g);
  const tryCatchCount = isPy ? countMatches(code, /\btry\s*:/g) : countMatches(code, /\btry\s*\{/g);

  const importLines = isPy
    ? extractNames(code, '(?:^|\\n)\\s*(?:import|from)\\s+([\\w.]+)')
    : extractNames(code, '(?:import\\s+.*?from\\s+[\'"]([^\'\"]+)[\'"]|require\\(\\s*[\'"]([^\'\"]+)[\'"]\\))').filter(Boolean);

  const returnCount = countMatches(code, /\breturn\b/g);

  return {
    language,
    functionNames,
    classNames,
    loopCount,
    conditionalCount,
    tryCatchCount,
    importLines,
    returnCount,
    lineCount: code.split('\n').length,
  };
}

function buildSummaryLines(analysis) {
  const lines = [];

  if (analysis.functionNames.length) {
    const fnList = analysis.functionNames
      .map((name) => `${name} (${guessOneLiner(name)})`)
      .join(', ');
    lines.push(`Defines ${analysis.functionNames.length} function(s): ${fnList}`);
  } else {
    lines.push('No named functions were detected.');
  }

  if (analysis.classNames.length) {
    lines.push(`Defines ${analysis.classNames.length} class(es): ${analysis.classNames.join(', ')}`);
  }

  lines.push(`Contains ${analysis.loopCount} loop(s).`);
  lines.push(`Contains ${analysis.conditionalCount} conditional(s).`);

  if (analysis.tryCatchCount) {
    lines.push(`Contains ${analysis.tryCatchCount} try/catch block(s) for error handling.`);
  }

  if (analysis.importLines.length) {
    lines.push(`Uses ${analysis.importLines.length} import(s): ${analysis.importLines.join(', ')}`);
  }

  lines.push(`Contains ${analysis.returnCount} return statement(s) across ${analysis.lineCount} line(s).`);

  return lines;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  if (!(await rateLimit(req, res, { key: 'code-explain', points: 20, duration: 60 }))) return;

  const { code, language } = req.body || {};

  if (!code || typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({ error: 'code is required (non-empty string).' });
  }
  if (code.length > 4000) {
    return res.status(400).json({ error: 'code must be 4000 characters or fewer.' });
  }
  if (language && !['auto', 'javascript', 'python', 'java'].includes(language)) {
    return res.status(400).json({ error: 'language must be one of auto, javascript, python, java.' });
  }

  try {
    const analysis = analyzeCode(code, language);
    const summaryLines = buildSummaryLines(analysis);
    const functionDetails = analysis.functionNames.map((name) => ({ name, oneLiner: guessOneLiner(name) }));
    return res.json({ ...analysis, functionDetails, summaryLines });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server_error', details: String(err) });
  }
}
