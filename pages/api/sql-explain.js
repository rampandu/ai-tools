// pages/api/sql-explain.js
// Deterministic SQL clause explainer — no external APIs required.
import { rateLimit } from '../../lib/rateLimit';

function explainSql(sqlInput) {
  const sql = String(sqlInput).trim().replace(/\s+/g, ' ');
  const upper = sql.toUpperCase();

  // Ordered list of clause keywords to look for (longest/most specific first where overlapping)
  const KEYWORDS = ['SELECT', 'FROM', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN', 'JOIN', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT'];

  // Find each keyword's position (first occurrence at or after the previous keyword's position), preserving order of appearance
  const found = [];
  let searchFrom = 0;
  for (const kw of KEYWORDS) {
    const idx = upper.indexOf(kw, searchFrom);
    if (idx !== -1) {
      found.push({ kw, idx });
    }
  }
  // sort by actual position (JOIN variants can appear multiple times but we keep first pass simple: one explanation per keyword type found)
  found.sort((a, b) => a.idx - b.idx);

  const segments = [];
  for (let k = 0; k < found.length; k++) {
    const start = found[k].idx + found[k].kw.length;
    const end = k + 1 < found.length ? found[k + 1].idx : sql.length;
    segments.push({ keyword: found[k].kw, text: sql.slice(start, end).trim() });
  }

  const explanations = [];

  for (const seg of segments) {
    if (seg.keyword === 'SELECT') {
      if (seg.text === '*' || /^\*/.test(seg.text)) {
        explanations.push({ clause: 'SELECT', text: seg.text, explain: 'Retrieves all columns.' });
      } else {
        const cols = seg.text.split(',').map((c) => c.trim()).filter(Boolean);
        explanations.push({ clause: 'SELECT', text: seg.text, explain: `Retrieves these columns/expressions: ${cols.join(', ')}.` });
      }
    } else if (seg.keyword === 'FROM') {
      const table = seg.text.split(/\s+/)[0];
      const aliasMatch = seg.text.match(/^\S+\s+(?:AS\s+)?(\S+)$/i);
      explanations.push({ clause: 'FROM', text: seg.text, explain: `Reads from the table \`${table}\`${aliasMatch ? ` (aliased as \`${aliasMatch[1]}\`)` : ''}.` });
    } else if (/JOIN$/.test(seg.keyword)) {
      const onMatch = seg.text.match(/^(\S+)\s+(?:AS\s+)?(\S+\s+)?ON\s+(.+)$/i) || seg.text.match(/^(\S+)\s+ON\s+(.+)$/i);
      const table = seg.text.split(/\s+/)[0];
      const cond = seg.text.split(/\bON\b/i)[1]?.trim();
      explanations.push({ clause: seg.keyword, text: seg.text, explain: `Combines rows with the table \`${table}\`${cond ? ` where ${cond}` : ''} (${seg.keyword.replace('JOIN', '').trim() || 'INNER'} join).` });
    } else if (seg.keyword === 'WHERE') {
      const conditions = seg.text.split(/\s+AND\s+/i).map((c) => c.trim());
      explanations.push({ clause: 'WHERE', text: seg.text, explain: `Filters rows to only those where: ${conditions.join('; and ')}.` });
    } else if (seg.keyword === 'GROUP BY') {
      explanations.push({ clause: 'GROUP BY', text: seg.text, explain: `Groups the results by: ${seg.text}.` });
    } else if (seg.keyword === 'HAVING') {
      explanations.push({ clause: 'HAVING', text: seg.text, explain: `After grouping, keeps only groups where: ${seg.text}.` });
    } else if (seg.keyword === 'ORDER BY') {
      const desc = /DESC/i.test(seg.text);
      explanations.push({ clause: 'ORDER BY', text: seg.text, explain: `Sorts the results by ${seg.text.replace(/\s+(ASC|DESC)/gi, '')} in ${desc ? 'descending' : 'ascending'} order.` });
    } else if (seg.keyword === 'LIMIT') {
      explanations.push({ clause: 'LIMIT', text: seg.text, explain: `Returns only the first ${seg.text.trim()} row(s).` });
    }
  }

  const summaryParts = explanations.map((e) => e.explain);
  return { explanations, summary: summaryParts.join(' '), original: sqlInput };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  if (!(await rateLimit(req, res, { key: 'sql-explain', points: 20, duration: 60 }))) return;

  const { query } = req.body || {};
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({ error: 'SQL query is required.' });
  }
  if (query.length > 2000) {
    return res.status(400).json({ error: 'Query too long (max 2000 characters).' });
  }

  try {
    const { explanations, summary, original } = explainSql(query);
    if (!explanations.length) {
      return res.json({
        explanations: [],
        summary: 'No recognizable SQL clauses (SELECT, FROM, WHERE, JOIN, GROUP BY, HAVING, ORDER BY, LIMIT) were found in this query.',
        original
      });
    }
    return res.json({ explanations, summary, original });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server_error', details: String(err) });
  }
}
