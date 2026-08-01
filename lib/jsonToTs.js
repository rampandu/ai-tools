// lib/jsonToTs.js
// Infers a TypeScript interface from an example JSON value. Runs entirely
// client-side — pure recursive traversal, no dependencies. For arrays, the
// first element is used as the representative shape (documented limitation:
// if array elements vary in shape, not every field is captured).

const MAX_INPUT_LENGTH = 50000;
const MAX_INTERFACES = 200;

function isValidIdentifier(key) {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
}

function toPascalCase(str) {
  const cleaned = String(str)
    .replace(/[^a-zA-Z0-9]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^./, (c) => c.toUpperCase());
  return cleaned || 'Root';
}

function inferType(value, interfaces, nameHint, usedNames) {
  if (value === null) return 'null';

  if (Array.isArray(value)) {
    if (value.length === 0) return 'unknown[]';
    const elType = inferType(value[0], interfaces, nameHint, usedNames);
    return elType.includes('|') ? `(${elType})[]` : `${elType}[]`;
  }

  const t = typeof value;
  if (t === 'string' || t === 'number' || t === 'boolean') return t;

  if (t === 'object') {
    if (interfaces.length >= MAX_INTERFACES) {
      throw new Error(`Too many nested objects (max ${MAX_INTERFACES}).`);
    }
    const baseName = toPascalCase(nameHint);
    let name = baseName;
    let i = 2;
    while (usedNames.has(name)) {
      name = `${baseName}${i}`;
      i += 1;
    }
    usedNames.add(name);

    const keys = Object.keys(value);
    const lines = keys.map((k) => {
      const propType = inferType(value[k], interfaces, k, usedNames);
      const key = isValidIdentifier(k) ? k : JSON.stringify(k);
      return `  ${key}: ${propType};`;
    });
    interfaces.push({
      name,
      body: keys.length ? `interface ${name} {\n${lines.join('\n')}\n}` : `interface ${name} {}`,
    });
    return name;
  }

  return 'unknown';
}

/**
 * Generate TypeScript interfaces from an example JSON string.
 *
 * @param {string} jsonString
 * @param {string} rootName - name for the top-level interface/type
 * @returns {{ valid: true, code: string } | { valid: false, error: string }}
 */
export function jsonToTypeScript(jsonString, rootName = 'Root') {
  if (typeof jsonString !== 'string' || jsonString.trim().length === 0) {
    return { valid: false, error: 'Paste some JSON first.' };
  }
  if (jsonString.length > MAX_INPUT_LENGTH) {
    return { valid: false, error: `Input too large (max ${MAX_INPUT_LENGTH.toLocaleString()} characters).` };
  }

  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err) {
    return { valid: false, error: `Invalid JSON — ${err.message}` };
  }

  const safeRootName = isValidIdentifier(rootName) ? rootName : 'Root';
  const interfaces = [];
  const usedNames = new Set();

  try {
    const topType = inferType(parsed, interfaces, safeRootName, usedNames);
    const body = interfaces.map((i) => i.body).join('\n\n');

    if (Array.isArray(parsed)) {
      const listAlias = `type ${safeRootName}List = ${topType};`;
      return { valid: true, code: body ? `${body}\n\n${listAlias}` : listAlias };
    }

    if (body) return { valid: true, code: body };
    return { valid: true, code: `type ${safeRootName} = ${topType};` };
  } catch (err) {
    return { valid: false, error: err.message || 'Could not infer a type from this JSON.' };
  }
}
