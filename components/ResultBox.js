// components/ResultBox.js
import { useState } from 'react';

export default function ResultBox({ data, isSQL = false }) {
  const [copied, setCopied] = useState(false);

  // data may be { regex: "...", model: "..." } or { sql: "...", metadata: {...} } or plain object
  const content = data?.regex ?? data?.sql ?? JSON.stringify(data, null, 2);
  const meta = (data?.model) ? { model: data.model } : data?.metadata ?? null;

  async function copyText() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  function useInApp() {
    // copy a snippet that developers can paste in their code
    const snippet = isSQL ? `-- SQL\n${content}` : `const re = /${content}/;`;
    navigator.clipboard.writeText(snippet).then(() => setCopied(true)).catch(()=>{});
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <button onClick={copyText}>{copied ? 'Copied!' : 'Copy'}</button>
        <button onClick={useInApp}>Use in my app</button>
        {meta && <div className="small" style={{ color: '#666' }}>Source: {meta.model || 'rule-engine'}</div>}
      </div>

      <pre aria-label="Result output" style={{ whiteSpace: 'pre-wrap' }}>{content}</pre>

      {isSQL && data?.metadata && (
        <div style={{ marginTop: 8 }}>
          <strong>Metadata:</strong>
          <div className="small">{JSON.stringify(data.metadata, null, 2)}</div>
        </div>
      )}
    </div>
  );
}
