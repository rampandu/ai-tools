import Head from 'next/head';
import Link from 'next/link';

export default function JsonSchemaGeneratorTutorialWithExamples() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'JSON Schema Generator Tutorial with Examples',
        item: 'https://dev-brains-ai.com/blog/json-schema-generator-tutorial-with-examples',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'JSON Schema Generator Tutorial: From Example to Ajv',
    description:
      'Turn a real API response into a working JSON Schema step by step, then refine it with patterns and enums, and validate incoming data with Ajv in Node.js.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/json-schema-generator-tutorial-with-examples',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a JSON Schema generator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A JSON Schema generator is a tool that takes an example JSON document and automatically produces a JSON Schema describing its structure, types, and required fields, saving you from writing the schema by hand.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is JSON Schema used for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JSON Schema is used to validate incoming JSON data against a defined structure, generate API documentation, auto-generate TypeScript or other language types, and catch malformed data before it reaches application logic.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does a generated JSON Schema need manual editing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Usually yes. Auto-generated schemas infer types and required fields from a single example, so you often need to manually add validation rules like minimum/maximum values, string formats, or mark fields as optional.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>JSON Schema Generator Tutorial: From Example to Ajv | Dev Brains AI</title>

        <meta
          name="description"
          content="Turn a real API response into a working JSON Schema step by step, then refine it with patterns and enums, and validate incoming data with Ajv in Node.js."
        />
        <meta
          name="keywords"
          content="json schema generator, generate json schema from json, json schema tutorial, json schema example, json schema validation, ajv json schema"
        />
        <meta property="og:title" content="JSON Schema Generator Tutorial: From Example to Ajv" />
        <meta property="og:description" content="Turn a real API response into a working JSON Schema step by step, then refine it with patterns and enums, and validate incoming data with Ajv in Node.js." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/json-schema-generator-tutorial-with-examples" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/json-schema-generator-tutorial-with-examples" />
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
              <li aria-current="page">JSON Schema Generator Tutorial with Examples</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            JSON Schema Generator Tutorial with Examples
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Writing a JSON Schema by hand is tedious and error-prone, especially for deeply nested API responses.
            A JSON Schema generator takes an example JSON payload and produces a schema automatically, which you can
            then use for validation, documentation, and testing. This tutorial walks through generating and refining
            a schema from a real example.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Starting with example JSON</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Suppose you have an API endpoint that returns a user profile:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`{
  "id": 1042,
  "name": "Priya Sharma",
  "email": "priya.sharma@example.com",
  "isActive": true,
  "roles": ["admin", "editor"],
  "address": {
    "city": "Bengaluru",
    "pincode": "560001"
  }
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>The generated JSON Schema</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A JSON Schema generator inspects each field's type and structure and produces a Draft-07 (or newer)
            compliant schema like this:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "integer" },
    "name": { "type": "string" },
    "email": { "type": "string" },
    "isActive": { "type": "boolean" },
    "roles": {
      "type": "array",
      "items": { "type": "string" }
    },
    "address": {
      "type": "object",
      "properties": {
        "city": { "type": "string" },
        "pincode": { "type": "string" }
      },
      "required": ["city", "pincode"]
    }
  },
  "required": ["id", "name", "email", "isActive", "roles", "address"]
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Refining the generated schema</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Auto-generated schemas are a starting point, not a final product. You typically need to add stricter
            validation rules manually:
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>Add "format": "email" to the email field for format-level validation.</li>
            <li>Add "pattern" for the pincode field to enforce a 6-digit Indian PIN code, e.g. ^[0-9]{'{6}'}$.</li>
            <li>Move optional fields out of the "required" array if they are not always present.</li>
            <li>Add "enum" to the roles items if only specific role values are allowed.</li>
            <li>Set "additionalProperties": false to reject unexpected extra fields.</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            Here is the address sub-schema after refinement:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`"address": {
  "type": "object",
  "properties": {
    "city": { "type": "string", "minLength": 1 },
    "pincode": { "type": "string", "pattern": "^[0-9]{6}$" }
  },
  "required": ["city", "pincode"],
  "additionalProperties": false
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Using the schema for validation</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Once generated, the schema can be used with a validation library like Ajv in Node.js to check incoming
            data before it reaches your business logic:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const Ajv = require('ajv');
const ajv = new Ajv();
const validate = ajv.compile(userSchema);

const valid = validate(incomingUserData);
if (!valid) {
  console.log(validate.errors);
}`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            This same schema can also be reused to generate API documentation (via OpenAPI/Swagger) and to
            auto-generate TypeScript interfaces, avoiding duplicate work across your codebase.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is a JSON Schema generator?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A JSON Schema generator is a tool that takes an example JSON document and automatically produces a
              JSON Schema describing its structure, types, and required fields, saving you from writing the schema
              by hand.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is JSON Schema used for?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              JSON Schema is used to validate incoming JSON data against a defined structure, generate API
              documentation, auto-generate TypeScript or other language types, and catch malformed data before it
              reaches application logic.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does a generated JSON Schema need manual editing?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Usually yes. Auto-generated schemas infer types and required fields from a single example, so you
              often need to manually add validation rules like minimum/maximum values, string formats, or mark
              fields as optional.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free JSON Schema Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste any JSON payload and instantly generate a ready-to-use JSON Schema for validation and documentation.
            </p>
            <Link href="/json-schema-generator">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open JSON Schema Generator →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/json-schema-validation-nodejs-example">JSON Schema Validation in Node.js with Ajv</Link></li>
              <li><Link href="/blog/json-parsing-errors-common-causes-and-fixes">JSON Parsing Errors — Common Causes and Fixes</Link></li>
              <li><Link href="/blog/rest-api-json-response-best-practices">REST API JSON Response Best Practices</Link></li>
              <li><Link href="/blog/how-to-validate-json-in-python-and-javascript">How to Validate JSON in Python and JavaScript</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
