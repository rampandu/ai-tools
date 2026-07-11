// pages/api/stack-trace.js
// Deterministic stack trace analyzer — no external APIs required.
import { rateLimit } from '../../lib/rateLimit';

const ERROR_PATTERNS = [
  {
    test: (t) => t.includes('is not a function'),
    explanation: 'A value you tried to call like a function is actually undefined, null, or a non-function type. This often happens with a wrong import, a missing method, or a typo in a method name.',
    fixes: ['Check the import/require path for the function or module.', 'Verify the object actually has that method (log it before calling).', 'Check for typos in the method name.'],
  },
  {
    test: (t) => t.includes('cannot read') && t.includes('of undefined'),
    explanation: 'Code tried to access a property on a value that is undefined. Some object earlier in the chain was never initialized or an async value had not loaded yet.',
    fixes: ['Trace back to find which object in the chain is undefined.', 'Add optional chaining (?.) or a null/undefined guard before accessing the property.', 'If this is UI code, make sure data has loaded before rendering.'],
  },
  {
    test: (t) => t.includes('cannot read') && t.includes('of null'),
    explanation: 'Code tried to access a property on a null value — commonly a DOM element that was not found, or a database/query result that returned no rows.',
    fixes: ['Check that the DOM selector or query actually matches something before use.', 'Add a null check with a clear fallback.', 'Log the value right before the failing line to confirm it is null.'],
  },
  {
    test: (t) => t.includes('module not found') || t.includes('cannot find module'),
    explanation: 'A required module, package, or file path could not be resolved.',
    fixes: ['Check the relative path (./ or ../) and file extension.', 'Confirm the package is listed in package.json and installed in node_modules.', 'Restart the dev server or clear the build cache if the file was just added.'],
  },
  {
    test: (t) => t.includes('unexpected token') && t.includes('json'),
    explanation: 'Invalid JSON was passed to a parser — commonly a missing quote, a trailing comma, or the response body was actually HTML/plain text, not JSON.',
    fixes: ['Log the raw text before parsing to see what was actually received.', 'Check for trailing commas or unquoted keys if this is hand-written JSON.', 'Confirm the API endpoint is returning JSON, not an error page.'],
  },
  {
    test: (t) => t.includes('maximum call stack') || t.includes('stack overflow') || t.includes('recursionerror'),
    explanation: 'A function is calling itself (directly or indirectly) without a proper base case, causing infinite recursion.',
    fixes: ['Check the recursive function has a clear terminating condition.', 'Verify the recursive call actually moves toward that base case each time.', 'Consider converting to an iterative loop if recursion depth could be large.'],
  },
  {
    test: (t) => t.includes('econnrefused'),
    explanation: 'A network connection was refused — the target server or service is not running, not listening on that port, or is blocked by a firewall.',
    fixes: ['Confirm the target service is actually running.', 'Double-check the host and port in your connection string.', 'If this is local dev, make sure the dependent service (DB, API) is started first.'],
  },
  {
    test: (t) => t.includes('eaddrinuse'),
    explanation: 'The port your app is trying to listen on is already in use by another process.',
    fixes: ['Stop the other process using that port, or choose a different port.', 'On the command line, find the process holding the port and terminate it.'],
  },
  {
    test: (t) => t.includes('permission denied') || t.includes('eacces'),
    explanation: 'The process does not have permission to access a file, directory, or port.',
    fixes: ['Check file/folder ownership and permissions.', 'On Linux/macOS, avoid running as a privileged user just to fix permissions — fix ownership instead.', 'For ports below 1024, use a higher port or proper permission grants.'],
  },
  {
    test: (t) => t.includes('nullpointerexception'),
    explanation: 'Java tried to use a reference that points to nothing (null) — calling a method or accessing a field on a null object.',
    fixes: ['Trace the stack to the exact line and check which variable is null.', 'Add null checks before dereferencing.', 'Consider Optional<T> for values that may legitimately be absent.'],
  },
  {
    test: (t) => t.includes('indexerror') || t.includes('index out of range') || t.includes('list index out of range'),
    explanation: 'Code tried to access a list/array index that does not exist — often off-by-one, or the collection was empty/shorter than expected.',
    fixes: ['Print the length of the collection right before the failing access.', 'Check loop bounds for off-by-one errors.', 'Guard against empty collections before indexing.'],
  },
  {
    test: (t) => t.includes('keyerror'),
    explanation: 'Python code tried to access a dictionary key that does not exist.',
    fixes: ['Use dict.get(key, default) instead of dict[key] when the key may be missing.', 'Check the exact key spelling/case.', 'Print the dictionary keys to confirm what is actually present.'],
  },
  {
    test: (t) => t.includes('typeerror'),
    explanation: 'A value is being used in a way that does not match its type — e.g. calling a non-function, or mixing incompatible types in an operation.',
    fixes: ['Log the values and their types right before the failing line.', 'Add guards for null/undefined/unexpected types.', 'Review recent changes to function signatures or return types.'],
  },
];

const GENERIC_FIXES = [
  'Search the exact error message (with identifying details removed) online.',
  'Check recent commits or changes around where the error originates.',
  'Add a log statement just before the failing line to inspect the actual values.',
];

function parseStackTrace(raw) {
  const lines = String(raw).split('\n').map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return null;

  const headerLine = lines[0];
  const colonIdx = headerLine.indexOf(':');
  const errorType = colonIdx > -1 && /^[A-Za-z._]+$/.test(headerLine.slice(0, colonIdx).trim())
    ? headerLine.slice(0, colonIdx).trim()
    : null;
  const message = colonIdx > -1 ? headerLine.slice(colonIdx + 1).trim() : headerLine;

  // Find first "frame" line: JS "at X (file:line:col)", Python "File "x", line N, in Y", Java "at pkg.Class.method(File.java:N)"
  let originFrame = null;
  for (const line of lines.slice(1)) {
    if (/^at\s+/.test(line) || /^\s*File\s+"/.test(line)) {
      originFrame = line;
      break;
    }
  }

  return { errorType, message, originFrame, headerLine, totalLines: lines.length };
}

function analyzeStackTrace(raw) {
  const parsed = parseStackTrace(raw);
  if (!parsed) return { error: 'No stack trace text found.' };

  const lower = raw.toLowerCase();
  const matched = ERROR_PATTERNS.find((p) => p.test(lower));

  return {
    errorType: parsed.errorType,
    message: parsed.message,
    originFrame: parsed.originFrame,
    explanation: matched ? matched.explanation : 'This error pattern was not specifically recognized, but the general debugging steps below still apply.',
    fixes: matched ? matched.fixes : GENERIC_FIXES,
    matchedPattern: !!matched,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  if (!(await rateLimit(req, res, { key: 'stack-trace', points: 20, duration: 60 }))) return;

  const { trace } = req.body || {};

  if (!trace || typeof trace !== 'string' || !trace.trim()) {
    return res.status(400).json({ error: 'trace is required (non-empty string).' });
  }
  if (trace.length > 5000) {
    return res.status(400).json({ error: 'trace must be 5000 characters or fewer.' });
  }

  try {
    const result = analyzeStackTrace(trace);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server_error', details: String(err) });
  }
}
