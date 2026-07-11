// pages/api/curl-convert.js
// Deterministic curl -> code converter — no external APIs required.
import { rateLimit } from '../../lib/rateLimit';

function tokenizeCurl(cmd) {
  const normalized = cmd.trim().replace(/\\\s*\n/g, ' ').replace(/^curl\s+/, '');
  const tokens = normalized.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
  return tokens.map((t) => t.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1'));
}

function parseCurl(cmd) {
  const tokens = tokenizeCurl(cmd);
  const result = { method: 'GET', url: '', headers: {}, data: null, isJson: false, auth: null };

  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (tok === '-X' || tok === '--request') {
      result.method = tokens[++i] || 'GET';
    } else if (tok === '-H' || tok === '--header') {
      const h = tokens[++i] || '';
      const idx = h.indexOf(':');
      if (idx > -1) {
        const key = h.slice(0, idx).trim();
        const val = h.slice(idx + 1).trim();
        result.headers[key] = val;
        if (/content-type/i.test(key) && /json/i.test(val)) result.isJson = true;
      }
    } else if (tok === '-d' || tok === '--data' || tok === '--data-raw' || tok === '--data-binary') {
      result.data = tokens[++i] || '';
      if (result.method === 'GET') result.method = 'POST';
    } else if (tok === '-u' || tok === '--user') {
      result.auth = tokens[++i] || '';
    } else if (tok === '-G' || tok === '--get') {
      result.forceGet = true;
    } else if (tok.startsWith('http://') || tok.startsWith('https://')) {
      result.url = tok;
    } else if (!tok.startsWith('-') && !result.url) {
      result.url = tok;
    }
  }
  return result;
}

function tryPrettyJson(str) {
  try {
    return JSON.stringify(JSON.parse(str), null, 2);
  } catch {
    return null;
  }
}

function toFetchCode(p) {
  const headerEntries = Object.entries(p.headers);
  const headerBlock = headerEntries.length
    ? `  headers: {\n${headerEntries.map(([k, v]) => `    "${k}": "${v}"`).join(',\n')}\n  },\n`
    : '';
  let bodyBlock = '';
  if (p.data) {
    const pretty = p.isJson ? tryPrettyJson(p.data) : null;
    bodyBlock = `  body: ${pretty ? `JSON.stringify(${pretty})` : JSON.stringify(p.data)},\n`;
  }
  const authBlock = p.auth
    ? `  headers: {\n    "Authorization": "Basic " + Buffer.from(${JSON.stringify(p.auth)}).toString("base64"),\n${headerEntries.map(([k, v]) => `    "${k}": "${v}"`).join(',\n')}${headerEntries.length ? ',' : ''}\n  },\n`
    : headerBlock;
  return `fetch(${JSON.stringify(p.url)}, {\n  method: "${p.method}",\n${authBlock}${bodyBlock}})\n  .then((res) => res.json())\n  .then((data) => console.log(data))\n  .catch((err) => console.error(err));`;
}

function toAxiosCode(p) {
  const headerEntries = Object.entries(p.headers);
  const headerBlock = headerEntries.length
    ? `,\n  headers: {\n${headerEntries.map(([k, v]) => `    "${k}": "${v}"`).join(',\n')}\n  }`
    : '';
  let dataBlock = '';
  if (p.data) {
    const pretty = p.isJson ? tryPrettyJson(p.data) : null;
    dataBlock = `,\n  data: ${pretty || JSON.stringify(p.data)}`;
  }
  const authBlock = p.auth
    ? `,\n  auth: {\n    username: ${JSON.stringify(p.auth.split(':')[0] || '')},\n    password: ${JSON.stringify(p.auth.split(':').slice(1).join(':') || '')}\n  }`
    : '';
  return `const axios = require("axios");\n\naxios({\n  method: "${p.method.toLowerCase()}",\n  url: ${JSON.stringify(p.url)}${headerBlock}${dataBlock}${authBlock}\n})\n  .then((res) => console.log(res.data))\n  .catch((err) => console.error(err));`;
}

function toPythonCode(p) {
  const headerEntries = Object.entries(p.headers);
  const headerBlock = headerEntries.length
    ? `headers = {\n${headerEntries.map(([k, v]) => `    "${k}": "${v}"`).join(',\n')}\n}\n\n`
    : '';
  let dataArg = '';
  if (p.data) {
    const pretty = p.isJson ? tryPrettyJson(p.data) : null;
    dataArg = p.isJson ? `, json=${pretty || p.data}` : `, data=${JSON.stringify(p.data)}`;
  }
  const authArg = p.auth
    ? `, auth=(${JSON.stringify(p.auth.split(':')[0] || '')}, ${JSON.stringify(p.auth.split(':').slice(1).join(':') || '')})`
    : '';
  return `import requests\n\n${headerBlock}response = requests.request(\n    "${p.method}",\n    ${JSON.stringify(p.url)}${headerEntries.length ? ',\n    headers=headers' : ''}${dataArg}${authArg}\n)\n\nprint(response.status_code)\nprint(response.json())`;
}

function convertCurl(cmd, target) {
  if (!cmd || !cmd.trim().toLowerCase().includes('curl')) {
    return { error: 'That does not look like a curl command. Paste a command starting with "curl".' };
  }
  const parsed = parseCurl(cmd);
  if (!parsed.url) {
    return { error: 'Could not find a URL in that curl command.' };
  }
  let code;
  if (target === 'axios') code = toAxiosCode(parsed);
  else if (target === 'python') code = toPythonCode(parsed);
  else code = toFetchCode(parsed);

  return { parsed, code, target: target || 'fetch' };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  if (!(await rateLimit(req, res, { key: 'curl-convert', points: 20, duration: 60 }))) return;

  const { command, target } = req.body || {};
  if (!command || String(command).trim().length < 4 || String(command).length > 2000) {
    return res.status(400).json({ error: 'A curl command is required (4-2000 characters).' });
  }

  try {
    const result = convertCurl(String(command), target);
    if (result.error) return res.status(400).json({ error: result.error });
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server_error', details: String(err) });
  }
}
