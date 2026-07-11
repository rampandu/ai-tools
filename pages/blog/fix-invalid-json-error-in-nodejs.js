import Head from 'next/head';
import Link from 'next/link';

export default function FixInvalidJsonErrorInNodejs() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Fix Invalid JSON Errors in Node.js',
        item: 'https://dev-brains-ai.com/blog/fix-invalid-json-error-in-nodejs',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Fix Invalid JSON Errors in Node.js',
    description:
      'Common causes of SyntaxError: Unexpected token in JSON in Node.js, how to diagnose them, and how to fix broken JSON before it reaches JSON.parse.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/fix-invalid-json-error-in-nodejs',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why does Node.js throw SyntaxError: Unexpected token in JSON?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This error means JSON.parse received a string that is not valid JSON — common causes include trailing commas, single quotes instead of double quotes, unquoted keys, or an empty string being parsed.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I safely parse JSON in Node.js without crashing the app?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Wrap JSON.parse in a try/catch block and handle the SyntaxError gracefully, returning a clear error response instead of letting the exception crash the process.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does my Express app throw a JSON parsing error on POST requests?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This usually happens when the request body is empty or malformed but the Content-Type header is still set to application/json, causing the express.json() middleware to fail while parsing.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Fix Invalid JSON Errors in Node.js | Dev Brains AI</title>
        <meta
          name="description"
          content="Common causes of SyntaxError: Unexpected token in JSON in Node.js and how to fix them, with try/catch patterns and Express middleware examples."
        />
        <meta
          name="keywords"
          content="fix invalid json node.js, syntaxerror unexpected token json, json.parse error node, express json parsing error, node.js json syntax error"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/fix-invalid-json-error-in-nodejs" />
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
              <li aria-current="page">Fix Invalid JSON Error in Node.js</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Fix Invalid JSON Errors in Node.js
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            &quot;SyntaxError: Unexpected token in JSON&quot; is one of the most common runtime errors Node.js developers hit
            when parsing data from an API, a config file, or a request body. This guide explains exactly what causes
            this error, how to read the error message to find the broken character, and how to prevent it from
            crashing your application.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>What the error actually means</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            JSON.parse() throws a SyntaxError whenever the string you pass it is not valid JSON according to the JSON
            specification. A typical error looks like this:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SyntaxError: Unexpected token } in JSON at position 42
    at JSON.parse (<anonymous>)`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            The position number tells you the character index where parsing failed — you can use it to locate the
            exact problem in the raw string.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Common cause 1: Trailing commas</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Unlike JavaScript object literals, strict JSON does not allow a trailing comma after the last property:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Invalid JSON — trailing comma
'{"name": "Rahul", "age": 25,}'

// Valid JSON
'{"name": "Rahul", "age": 25}'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Common cause 2: Single quotes and unquoted keys</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            JSON requires double quotes for both keys and string values. Single quotes, which are valid in JavaScript
            object literals, are not valid JSON:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Invalid JSON
"{'name': 'Rahul', age: 25}"

// Valid JSON
'{"name": "Rahul", "age": 25}'`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Common cause 3: Parsing an empty or undefined value</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            This is one of the most frequent causes in Express APIs — parsing an empty request body or an
            undefined variable that was never converted to a string:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`JSON.parse('');        // SyntaxError: Unexpected end of JSON input
JSON.parse(undefined); // SyntaxError: "undefined" is not valid JSON`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Fix: always wrap JSON.parse in try/catch</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The most important defensive pattern in Node.js is to never call JSON.parse without handling the
            potential SyntaxError:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function safeJsonParse(input) {
  try {
    return { data: JSON.parse(input), error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

const result = safeJsonParse(rawString);
if (result.error) {
  console.error('Invalid JSON received:', result.error);
} else {
  console.log(result.data);
}`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            In an Express app, add an error-handling middleware right after express.json() to catch body-parsing
            failures gracefully instead of letting them crash the request:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`app.use(express.json());

app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  next(err);
});`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Checklist for debugging invalid JSON</h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>Log the raw string before calling JSON.parse to see exactly what was received.</li>
            <li>Check for trailing commas, single quotes, and unquoted keys.</li>
            <li>Confirm the string is not empty, undefined, or already an object being parsed twice.</li>
            <li>Run the string through a JSON formatter tool to pinpoint the exact broken character.</li>
            <li>For APIs, verify the Content-Type header matches the actual body format being sent.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does Node.js throw SyntaxError: Unexpected token in JSON?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              This error means JSON.parse received a string that is not valid JSON — common causes include trailing
              commas, single quotes instead of double quotes, unquoted keys, or an empty string being parsed.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I safely parse JSON in Node.js without crashing the app?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Wrap JSON.parse in a try/catch block and handle the SyntaxError gracefully, returning a clear error
              response instead of letting the exception crash the process.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does my Express app throw a JSON parsing error on POST requests?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              This usually happens when the request body is empty or malformed but the Content-Type header is still
              set to application/json, causing the express.json() middleware to fail while parsing.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free JSON Formatter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste your broken JSON and instantly see exactly where the syntax error is, with formatting and validation.
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
              <li><Link href="/blog/json-parsing-errors-common-causes-and-fixes">JSON Parsing Errors — Common Causes and Fixes</Link></li>
              <li><Link href="/blog/how-to-validate-json-in-python-and-javascript">How to Validate JSON in Python and JavaScript</Link></li>
              <li><Link href="/blog/json-schema-validation-nodejs-example">JSON Schema Validation in Node.js with Ajv</Link></li>
              <li><Link href="/blog/rest-api-json-response-best-practices">REST API JSON Response Best Practices</Link></li>
              <li><Link href="/blog/json-formatter-for-indian-gst-apis">JSON Formatter for Indian GST APIs</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
