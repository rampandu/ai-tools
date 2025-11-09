// pages/api/sql.js
// Simple deterministic NL -> SQL converter for common cases.
// Not a full NL2SQL engine. Handles SELECT columns FROM table [WHERE conditions].

function normalizeSpaces(s) {
  return s.replace(/\s+/g, ' ').trim();
}

function extractColumns(prompt) {
  // try common phrasing
  // If user says "select name and salary", capture columns after "select"
  let m = prompt.match(/(?:select|show|give me|list)\s+(.+?)\s+(?:from|in|where|of|from the|from table|table)/);
  if (m) {
    const cols = m[1].replace(/\band\b/gi, ',').split(',').map(c => c.trim()).filter(Boolean);
    return cols;
  }
  // fallback: if user says "get name, salary from employees" match before 'from'
  m = prompt.match(/(.+?)\s+from\s+([a-zA-Z0-9_]+)/);
  if (m && m[1].includes(' ')) {
    const cols = m[1].replace(/\band\b/gi, ',').split(',').map(c => c.trim()).filter(Boolean);
    return cols;
  }
  // if user uses 'all' or 'everything' -> select *
  if (/(all|every|everything|all columns|all fields)/.test(prompt)) return ['*'];
  // default -> select *
  return ['*'];
}

function extractTable(prompt) {
  // look for 'from <table>' or 'table <name>'
  let m = prompt.match(/from\s+([a-zA-Z0-9_]+)/);
  if (m) return m[1];
  m = prompt.match(/table\s+([a-zA-Z0-9_]+)/);
  if (m) return m[1];
  // try 'in <table>'
  m = prompt.match(/in\s+([a-zA-Z0-9_]+)/);
  if (m) return m[1];
  // If user writes 'employees' alone as last word, try grabbing it
  m = prompt.match(/([a-zA-Z0-9_]+)\s*$/);
  if (m) return m[1];
  return null;
}

function parseConditionFragment(fragment) {
  // handle 'salary > 50000', 'salary greater than 50000', 'age less than 30', 'name contains John', 'name starts with "A"'
  fragment = fragment.trim();
  // operators mapping
  const opMap = [
    { regex: /(>=|>=)/, op: '>=' },
    { regex: /(<=|<=)/, op: '<=' },
    { regex: /(>|greater than|above)/i, op: '>' },
    { regex: /(<|less than|below)/i, op: '<' },
    { regex: /(=|equals|is equal to|is)/i, op: '=' },
    { regex: /(not equal to|!=|<>)/i, op: '!=' }
  ];

  // between: "salary between 100 and 200"
  let m = fragment.match(/([a-zA-Z0-9_\.]+)\s+between\s+([0-9\-\.]+)\s+and\s+([0-9\-\.]+)/i);
  if (m) return `${m[1]} BETWEEN ${m[2]} AND ${m[3]}`;

  // IN: "id in 1,2,3" or "id in (1,2,3)"
  m = fragment.match(/([a-zA-Z0-9_\.]+)\s+in\s*\(?([^\)]+)\)?/i);
  if (m) {
    const vals = m[2].split(/[,;]/).map(v => v.trim()).filter(Boolean).map(v => isNaN(v) ? `'${v.replace(/'/g, "''")}'` : v);
    return `${m[1]} IN (${vals.join(',')})`;
  }

  // LIKE / contains / starts with / ends with
  m = fragment.match(/([a-zA-Z0-9_\.]+)\s+(contains|like|includes)\s+['"]?(.+?)['"]?$/i);
  if (m) return `${m[1]} LIKE '%${m[3].replace(/'/g, "''")}%'`;

  m = fragment.match(/([a-zA-Z0-9_\.]+)\s+(starts with)\s+['"]?(.+?)['"]?$/i);
  if (m) return `${m[1]} LIKE '${m[3].replace(/'/g, "''")}%'`;

  m = fragment.match(/([a-zA-Z0-9_\.]+)\s+(ends with)\s+['"]?(.+?)['"]?$/i);
  if (m) return `${m[1]} LIKE '%${m[3].replace(/'/g, "''")}'`;

  // direct column comparator "salary > 50000"
  m = fragment.match(/([a-zA-Z0-9_\.]+)\s*(>=|<=|>|<|=|!=|<>)\s*([0-9\-\.]+)/);
  if (m) return `${m[1]} ${m[2]} ${m[3]}`;

  // textual equals (name = John)
  m = fragment.match(/([a-zA-Z0-9_\.]+)\s+(is|=|equals)\s+['"]?(.+?)['"]?$/i);
  if (m) return `${m[1]} = '${m[3].replace(/'/g, "''")}'`;

  // fallback: return raw fragment (unsafe) but quoted
  return fragment;
}

function extractConditions(prompt) {
  // find 'where' and split on 'and' / 'or'
  const whereIdx = prompt.indexOf(' where ');
  if (whereIdx === -1) {
    // maybe user wrote 'with salary > 50000'
    const withIdx = prompt.indexOf(' with ');
    if (withIdx !== -1) {
      const frag = prompt.slice(withIdx + 6);
      return [parseConditionFragment(frag)];
    }
    return [];
  }
  const condText = prompt.slice(whereIdx + 7);
  // split by ' and ' or ' or '
  const parts = condText.split(/\s+(?:and|or)\s+/i).map(p => p.trim()).filter(Boolean);
  return parts.map(parseConditionFragment);
}

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { prompt } = req.body || {};
  if (!prompt || String(prompt).trim().length < 3) return res.status(400).json({ error: 'Prompt required (≥3 chars)' });

  try {
    const p = normalizeSpaces(String(prompt).toLowerCase());

    // Extract columns and table
    const cols = extractColumns(p);
    const table = extractTable(p) || 'my_table';
    const conds = extractConditions(p);

    let sql = `SELECT ${cols.join(', ')} FROM ${table}`;
    if (conds.length) sql += ` WHERE ${conds.join(' AND ')}`;

    // Add semicolon
    sql = sql.trim();
    if (!sql.endsWith(';')) sql += ';';

    return res.json({ sql, metadata: { columns: cols, table, conditions: conds } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server_error', details: String(err) });
  }
}
