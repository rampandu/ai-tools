// pages/api/sql-visualize.js
// Parses a SQL SELECT query into a structured shape a diagram can render:
// tables + join graph + clause-by-clause breakdown, in logical execution order.
import { Parser } from 'node-sql-parser';
import { rateLimit } from '../../lib/rateLimit';

const EXEC_ORDER = ['FROM', 'JOIN', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'DISTINCT', 'ORDER BY', 'LIMIT'];

function exprToString(expr) {
  if (!expr) return '';
  if (expr.type === 'column_ref') return expr.table ? `${expr.table}.${expr.column}` : String(expr.column);
  if (expr.type === 'single_quote_string') return `'${expr.value}'`;
  if (expr.type === 'number') return String(expr.value);
  if (expr.type === 'binary_expr') {
    return `${exprToString(expr.left)} ${expr.operator} ${exprToString(expr.right)}`;
  }
  if (expr.type === 'function') {
    const name = expr.name?.name?.[0]?.value || expr.name || '';
    const args = (expr.args?.value || []).map(exprToString).join(', ');
    return `${name}(${args})`;
  }
  if (expr.type === 'aggr_func') {
    const args = expr.args?.expr ? exprToString(expr.args.expr) : '*';
    return `${expr.name}(${args})`;
  }
  return expr.column || expr.value || '';
}

function parseSqlForDiagram(sql) {
  const parser = new Parser();
  let ast;
  try {
    ast = parser.astify(sql, { database: 'MySQL' });
  } catch (e) {
    ast = parser.astify(sql, { database: 'PostgresQL' });
  }
  if (Array.isArray(ast)) ast = ast[0];
  if (!ast || ast.type !== 'select') {
    throw new Error('Only SELECT queries can be visualized right now.');
  }

  const tables = (ast.from || [])
    .filter((f) => f.table)
    .map((f, i) => ({
      table: f.table,
      alias: f.as || null,
      joinType: i === 0 ? null : (f.join || 'INNER JOIN').toUpperCase(),
      on: f.on ? exprToString(f.on) : null,
    }));

  const columns = (ast.columns === '*' ? ['*'] : (ast.columns || []).map((c) => {
    const base = exprToString(c.expr);
    return c.as ? `${base} AS ${c.as}` : base;
  }));

  const clauses = [];
  clauses.push({ step: 'FROM', text: tables[0] ? `${tables[0].table}${tables[0].alias ? ' ' + tables[0].alias : ''}` : '' });
  for (const t of tables.slice(1)) {
    clauses.push({ step: t.joinType, text: `${t.table}${t.alias ? ' ' + t.alias : ''}${t.on ? ' ON ' + t.on : ''}` });
  }
  if (ast.where) clauses.push({ step: 'WHERE', text: exprToString(ast.where) });
  if (ast.groupby?.columns?.length) {
    clauses.push({ step: 'GROUP BY', text: ast.groupby.columns.map(exprToString).join(', ') });
  }
  if (ast.having) clauses.push({ step: 'HAVING', text: exprToString(ast.having) });
  clauses.push({ step: 'SELECT', text: columns.join(', ') });
  if (ast.distinct) clauses.push({ step: 'DISTINCT', text: '(duplicate rows removed)' });
  if (ast.orderby?.length) {
    clauses.push({ step: 'ORDER BY', text: ast.orderby.map((o) => `${exprToString(o.expr)} ${o.type || 'ASC'}`).join(', ') });
  }
  if (ast.limit?.value?.length) {
    const vals = ast.limit.value.map((v) => v.value);
    clauses.push({ step: 'LIMIT', text: vals.join(', ') });
  }

  return { tables, columns, clauses };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  if (!(await rateLimit(req, res, { key: 'sql-visualize', points: 20, duration: 60 }))) return;

  const { query } = req.body || {};
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({ error: 'SQL query is required.' });
  }
  if (query.length > 3000) {
    return res.status(400).json({ error: 'Query too long (max 3000 characters).' });
  }

  try {
    const result = parseSqlForDiagram(query);
    return res.json(result);
  } catch (err) {
    return res.status(400).json({
      error: 'parse_error',
      details: 'Could not parse this SQL. Make sure it is a valid single SELECT statement (INSERT/UPDATE/DELETE and multi-statement input are not supported).',
    });
  }
}
