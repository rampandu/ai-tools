// components/RegexTester.js
import { useState, useMemo } from 'react';

export default function RegexTester({ pattern }) {
  const [input, setInput] = useState('');
  const [flags, setFlags] = useState(''); // e.g., 'i'
  const [error, setError] = useState(null);

  const result = useMemo(() => {
    if (!pattern) return null;
    try {
      setError(null);
      // remove surrounding slashes if provided
      let pat = pattern;
      // If pattern like ^\d+$ or with slashes /.../, handle both
      if (pat.startsWith('/') && pat.lastIndexOf('/') > 0) {
        const last = pat.lastIndexOf('/');
        flags && (pat = pat.slice(1, last));
      }
      const re = new RegExp(pat, flags);
      const matched = re.test(input);
      const matches = input.match(re) || [];
      return { matched, matches };
    } catch (e) {
      setError(String(e));
      return null;
    }
  }, [pattern, input, flags]);

  return (
    <div className="card" aria-live="polite" style={{ marginTop: 14 }}>
      <h3>Test your regex</h3>
      <p className="small">Paste a sample string and see whether it matches the generated regex. You can add flags like <code>i</code> for case-insensitive.</p>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          placeholder="Type sample text to test..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #d1d5db' }}
        />
        <input
          style={{ width: 90, padding: 8, borderRadius: 8, border: '1px solid #d1d5db' }}
          placeholder="flags (e.g. i)"
          value={flags}
          onChange={(e) => setFlags(e.target.value.replace(/[^gimsuy]/g, ''))}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Pattern</strong>
        <pre style={{ background: '#0f172a', color: '#e6eef6', padding: 12, borderRadius: 8 }}>{pattern || '—'}</pre>
      </div>

      {error && <div role="alert" style={{ color: 'crimson' }}>Regex error: {error}</div>}

      {result && (
        <div style={{ marginTop: 8 }}>
          <div className="small"><strong>Matches:</strong> {result.matched ? 'Yes' : 'No'}</div>
          {result.matches.length > 0 && (
            <div style={{ marginTop: 8 }}>
              <strong>Captured groups / matches</strong>
              <pre style={{ background: '#f3f4f6', padding: 12, borderRadius: 8 }}>{JSON.stringify(result.matches, null, 2)}</pre>
            </div>
          )}
        </div>
      )}

      {!result && !error && <div className="small">Enter a pattern and sample text to test.</div>}
    </div>
  );
}
