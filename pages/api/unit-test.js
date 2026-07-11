// pages/api/unit-test.js
// Deterministic unit test scaffold generator — no external APIs required.
import { rateLimit } from '../../lib/rateLimit';

function detectLanguage(sig) {
  if (/^def\s+\w+\s*\(.*\)\s*:?/.test(sig.trim())) return 'python';
  return 'javascript';
}

function parseSignature(sig) {
  const trimmed = sig.trim();
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

function toSnakeCase(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
}

function generateUnitTest(signature) {
  const language = detectLanguage(signature);
  const parsed = parseSignature(signature);
  if (!parsed) {
    return { error: 'Could not find a function name and parameter list in that signature. Try a format like "function add(a, b)" or "def add(a, b):".' };
  }
  const { name, params } = parsed;
  const argPlaceholder = params.map(() => '/* value */').join(', ');

  let testCode;
  if (language === 'python') {
    const snake = toSnakeCase(name);
    testCode = [
      `from your_module import ${name}`,
      '',
      `def test_${snake}_typical_case():`,
      `    # TODO: replace with real arguments and expected output`,
      `    result = ${name}(${params.map(() => '...').join(', ')})`,
      `    assert result is not None`,
      '',
      `def test_${snake}_edge_cases():`,
      `    # TODO: add edge cases — empty input, None, boundary values`,
      `    pass`,
    ].join('\n');
  } else {
    testCode = [
      `import { ${name} } from './path-to-file';`,
      '',
      `describe('${name}', () => {`,
      `  it('should return the expected result for typical input', () => {`,
      `    // TODO: replace with real arguments and expected output`,
      `    const result = ${name}(${argPlaceholder});`,
      `    expect(result).toBeDefined();`,
      `  });`,
      '',
      `  it('should handle edge cases', () => {`,
      `    // TODO: add edge case assertions — empty input, null, boundary values`,
      `  });`,
      `});`,
    ].join('\n');
  }

  return { language, name, params, testCode, framework: language === 'python' ? 'pytest' : 'Jest' };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  if (!(await rateLimit(req, res, { key: 'unit-test', points: 20, duration: 60 }))) return;

  const { signature } = req.body || {};
  if (!signature || String(signature).trim().length < 3 || String(signature).length > 500) {
    return res.status(400).json({ error: 'A function signature is required (3-500 characters).' });
  }

  try {
    const result = generateUnitTest(String(signature));
    if (result.error) return res.status(400).json({ error: result.error });
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server_error', details: String(err) });
  }
}
