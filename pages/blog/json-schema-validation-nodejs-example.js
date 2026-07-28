// pages/blog/json-schema-validation-nodejs-example.js
import Head from 'next/head';
import Link from 'next/link';

export default function JsonSchemaValidationNodejsExample() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'JSON Schema Validation in Node.js with Ajv',
        item: 'https://dev-brains-ai.com/blog/json-schema-validation-nodejs-example',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'JSON Schema Validation in Node.js with Ajv: Full Example',
    description:
      'A complete, working Ajv walkthrough: define a schema, compile the validator, read structured error messages, and wire it up as Express middleware.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/json-schema-validation-nodejs-example',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Ajv used for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ajv (Another JSON Schema Validator) is the most widely used JavaScript library for validating JSON data against a JSON Schema. It is used to validate API request bodies, configuration files, and any structured JSON data at runtime.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Ajv faster than writing manual validation code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Ajv compiles a JSON Schema into an optimized JavaScript validation function ahead of time, making it significantly faster than hand-written if-checks for anything beyond a few fields, while also being far less error-prone.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a free tool to generate a JSON Schema from sample data?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI offers a free JSON Schema Generator at dev-brains-ai.com/json-schema-generator that creates a valid JSON Schema from a sample JSON object, ready to plug directly into ajv.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>JSON Schema Validation in Node.js with Ajv: Full Example | Dev Brains AI</title>
        <meta
          name="description"
          content="A complete, working Ajv walkthrough: define a schema, compile the validator, read structured error messages, and wire it up as Express middleware."
        />
        <meta
          name="keywords"
          content="json schema validation nodejs, ajv tutorial, validate json against schema, ajv json schema validator, nodejs json schema example, ajv errors"
        />
        <meta property="og:title" content="JSON Schema Validation in Node.js with Ajv: Full Example" />
        <meta property="og:description" content="A complete, working Ajv walkthrough: define a schema, compile the validator, read structured error messages, and wire it up as Express middleware." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/json-schema-validation-nodejs-example" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/json-schema-validation-nodejs-example" />
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
              <li aria-current="page">JSON Schema Validation with Ajv</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            JSON Schema Validation in Node.js with Ajv — Full Working Example
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Manually checking every field of an incoming request body with a chain of if-statements
            does not scale, and it is easy to miss edge cases. JSON Schema plus Ajv solves this by
            letting you describe the shape your data must have and validating against it in a
            single call. This tutorial walks through a complete, working setup.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Installing Ajv
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`npm install ajv ajv-formats`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            <code>ajv-formats</code> adds support for common string formats like <code>email</code>,
            <code> date-time</code>, and <code>uri</code>, which the core Ajv package does not
            include by default.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Defining a JSON Schema
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Here is a schema for validating a user signup request:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const userSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 2, maxLength: 80 },
    email: { type: "string", format: "email" },
    age: { type: "integer", minimum: 18, maximum: 120 },
    role: { type: "string", enum: ["admin", "editor", "viewer"] },
    phone: { type: "string", pattern: "^[6-9][0-9]{9}$" }
  },
  required: ["name", "email", "role"],
  additionalProperties: false
};`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Compiling and Running the Validator
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validate = ajv.compile(userSchema);

const requestBody = {
  name: "Priya Sharma",
  email: "priya@example.com",
  age: 29,
  role: "editor",
  phone: "9876543210"
};

const valid = validate(requestBody);

if (!valid) {
  console.log(validate.errors);
} else {
  console.log("Valid payload — proceed");
}`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            <code>ajv.compile()</code> turns the schema into a fast, reusable validation function.
            Compile it once outside your request handler and reuse it on every request — never
            recompile per request, as compilation has real overhead.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Reading Validation Errors
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            When validation fails, <code>validate.errors</code> gives you a structured array
            describing exactly what went wrong:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const badBody = { name: "P", email: "not-an-email", role: "superadmin" };

validate(badBody);

console.log(validate.errors);
/* [
  { instancePath: '/name', message: 'must NOT have fewer than 2 characters' },
  { instancePath: '/email', message: 'must match format "email"' },
  { instancePath: '/role', message: 'must be equal to one of the allowed values' }
] */

// Turn errors into a friendly API response
function formatErrors(errors) {
  return errors.map(e => \`\${e.instancePath || 'body'} \${e.message}\`);
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Using Ajv as Express Middleware
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function validateBody(schema) {
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    const valid = validate(req.body);
    if (!valid) {
      return res.status(400).json({
        error: "Validation failed",
        details: formatErrors(validate.errors)
      });
    }
    next();
  };
}

app.post("/signup", validateBody(userSchema), (req, res) => {
  // req.body is guaranteed to match userSchema here
  res.json({ status: "created" });
});`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Schema Keywords You Will Use Often
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>type</strong> — restricts a value to string, number, integer, boolean, object, array, or null</li>
            <li><strong>required</strong> — array of property names that must be present</li>
            <li><strong>additionalProperties: false</strong> — rejects any field not explicitly defined in the schema</li>
            <li><strong>enum</strong> — restricts a value to a fixed set of allowed options</li>
            <li><strong>pattern</strong> — validates a string against a regular expression, useful for phone numbers or codes</li>
            <li><strong>minimum / maximum</strong> — numeric range constraints</li>
            <li><strong>format</strong> — built-in formats like email, date-time, and uri via ajv-formats</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is Ajv used for?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Ajv (Another JSON Schema Validator) is the most widely used JavaScript library for validating JSON data against a JSON Schema. It is used to validate API request bodies, configuration files, and any structured JSON data at runtime.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is Ajv faster than writing manual validation code?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. Ajv compiles a JSON Schema into an optimized JavaScript validation function ahead of time, making it significantly faster than hand-written if-checks for anything beyond a few fields, while also being far less error-prone.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is there a free tool to generate a JSON Schema from sample data?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. <Link href="/json-schema-generator">Dev Brains AI JSON Schema Generator</Link> creates a valid JSON Schema from a sample JSON object, ready to plug directly into ajv.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free JSON Schema Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste a sample JSON object and get a ready-to-use JSON Schema instantly. No signup, no cost.
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
              <li><Link href="/blog/json-schema-generator-tutorial-with-examples">JSON Schema Generator Tutorial with Examples</Link></li>
              <li><Link href="/blog/how-to-validate-json-in-python-and-javascript">How to Validate JSON in Python and JavaScript</Link></li>
              <li><Link href="/blog/rest-api-json-response-best-practices">REST API JSON Response Best Practices</Link></li>
              <li><Link href="/blog/json-parsing-errors-common-causes-and-fixes">JSON Parsing Errors — Common Causes and Fixes</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
