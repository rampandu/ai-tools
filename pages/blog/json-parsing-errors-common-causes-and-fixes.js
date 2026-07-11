// pages/blog/json-parsing-errors-common-causes-and-fixes.js
import Head from 'next/head';
import Link from 'next/link';

export default function JsonParsingErrorsCommonCausesAndFixes() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'JSON Parsing Errors — Common Causes and Fixes',
        item: 'https://dev-brains-ai.com/blog/json-parsing-errors-common-causes-and-fixes',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'JSON Parsing Errors — Common Causes and Fixes',
    description:
      'The most common JSON parsing errors in JavaScript — trailing commas, single quotes, unquoted keys, undefined values — explained with fixes and working examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/json-parsing-errors-common-causes-and-fixes',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why does JSON.parse throw "Unexpected token" errors?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JSON.parse throws "Unexpected token" when the input string is not valid JSON — common causes are trailing commas, single-quoted strings, unquoted object keys, or JavaScript-only values like undefined and NaN that are not valid in JSON.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can JSON have trailing commas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The JSON specification does not allow trailing commas after the last item in an array or object. JavaScript object literals allow them, which is why developers often mistakenly add one when hand-writing JSON.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free tool to find JSON syntax errors?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI offers a free JSON Formatter at dev-brains-ai.com/json-formatter that validates JSON and highlights the exact location of syntax errors as you paste or type.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>JSON Parsing Errors — Common Causes and Fixes | Dev Brains AI</title>
        <meta
          name="description"
          content="The most common JSON parsing errors in JavaScript — trailing commas, single quotes, unquoted keys, undefined values — explained with fixes and examples."
        />
        <meta
          name="keywords"
          content="json parsing error, json.parse unexpected token, fix json syntax error, trailing comma json, single quotes json error, unquoted keys json, json syntaxerror javascript"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/json-parsing-errors-common-causes-and-fixes" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <article className="card" style={{ maxWidth: 800, margin: '0 auto', padding: 24, color: '#0f172a' }}>

          <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
            <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">JSON Parsing Errors</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            JSON Parsing Errors — Common Causes and Fixes
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            <code>SyntaxError: Unexpected token in JSON</code> is one of the most common errors
            JavaScript developers hit, usually right after copy-pasting JSON from a log, a Python
            script, or a hand-edited config file. This guide walks through the most frequent causes
            of JSON parsing errors and exactly how to fix each one.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            1. Trailing Commas
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            JavaScript object and array literals tolerate a trailing comma. JSON does not.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Invalid JSON — trailing comma
{
  "name": "Priya",
  "age": 29,
}

// Error:
// SyntaxError: Unexpected token } in JSON at position 32

// Fix — remove the trailing comma
{
  "name": "Priya",
  "age": 29
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            2. Single Quotes Instead of Double Quotes
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            JSON strings and keys must use double quotes. Single quotes are valid in JavaScript
            but not in the JSON spec.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Invalid JSON
{ 'name': 'Priya', 'city': 'Bengaluru' }

// Fix
{ "name": "Priya", "city": "Bengaluru" }`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            3. Unquoted Object Keys
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Bare keys are valid JavaScript but invalid JSON — every key must be a double-quoted string.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Invalid JSON
{ name: "Priya", age: 29 }

// Fix
{ "name": "Priya", "age": 29 }`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            4. undefined, NaN, and Functions
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            JSON has no concept of <code>undefined</code>, <code>NaN</code>, <code>Infinity</code>,
            or functions. These are JavaScript-only values.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// This works in JS but JSON.stringify silently drops the "undefined" key
const obj = { name: "Priya", nickname: undefined };
JSON.stringify(obj); // '{"name":"Priya"}'

// This throws — undefined is not valid JSON text
JSON.parse('{ "name": "Priya", "nickname": undefined }');
// SyntaxError: Unexpected token u in JSON at position 30

// Fix — use null instead
JSON.parse('{ "name": "Priya", "nickname": null }'); // OK`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            5. Comments Inside JSON
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            JSON does not support <code>//</code> or <code>/* */</code> comments at all, unlike
            JSON5 or JSONC used in some config files (e.g. <code>tsconfig.json</code>, which is
            technically JSONC, not strict JSON).
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Invalid strict JSON
{
  "port": 3000 // default port
}

// Fix — remove the comment or use a JSON5 parser if needed
{
  "port": 3000
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            6. Safely Parsing Untrusted JSON
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Always wrap <code>JSON.parse</code> in a try/catch when the input comes from a network
            request, file, or user input — never assume it will be valid.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function safeParse(text) {
  try {
    return { ok: true, data: JSON.parse(text) };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

const result = safeParse('{ "id": 1, }');
if (!result.ok) {
  console.error("Invalid JSON:", result.error);
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Quick Checklist Before You Debug Further
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Every key and string value is wrapped in double quotes, not single quotes</li>
            <li>No trailing commas after the last item in an object or array</li>
            <li>No comments anywhere in the JSON text</li>
            <li>No <code>undefined</code>, <code>NaN</code>, or JavaScript functions — use <code>null</code> or a number instead</li>
            <li>All brackets and braces are properly closed and matched</li>
            <li>Backslashes inside strings are escaped as <code>\\\\</code></li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does JSON.parse throw "Unexpected token" errors?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              JSON.parse throws "Unexpected token" when the input string is not valid JSON — common causes are trailing commas, single-quoted strings, unquoted object keys, or JavaScript-only values like undefined and NaN that are not valid in JSON.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can JSON have trailing commas?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. The JSON specification does not allow trailing commas after the last item in an array or object. JavaScript object literals allow them, which is why developers often mistakenly add one when hand-writing JSON.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is there a free tool to find JSON syntax errors?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. <Link href="/json-formatter">Dev Brains AI JSON Formatter</Link> validates JSON and highlights the exact location of syntax errors as you paste or type.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free JSON Formatter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste broken JSON and instantly see where the syntax error is. No signup, no cost.
            </p>
            <Link href="/json-formatter">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open JSON Formatter →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/fix-invalid-json-error-in-nodejs">Fix Invalid JSON Error in Node.js</Link></li>
              <li><Link href="/blog/how-to-validate-json-in-python-and-javascript">How to Validate JSON in Python and JavaScript</Link></li>
              <li><Link href="/blog/json-formatter-online-free-guide">JSON Formatter Online — Free Guide</Link></li>
              <li><Link href="/blog/json-minify-vs-pretty-print-explained">JSON Minify vs Pretty Print Explained</Link></li>
              <li><Link href="/blog/json-serialization-python-guide">JSON Serialization in Python — Complete Guide</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
