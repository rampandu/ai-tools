// pages/blog/generate-uuids-javascript-python-sql.js
import Head from 'next/head';
import Link from 'next/link';

export default function GenerateUuidsJavascriptPythonSql() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How to Generate UUIDs in JavaScript, Python, and SQL',
        item: 'https://dev-brains-ai.com/blog/generate-uuids-javascript-python-sql',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Generate UUIDs in JavaScript, Python, and SQL — A Cookbook',
    description:
      'Copy-paste recipes for generating UUIDs: crypto.randomUUID() in JS and Node, Python uuid4/uuid5 with namespaces, MySQL UUID() and UUID_TO_BIN, PostgreSQL gen_random_uuid(), and efficient storage.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/generate-uuids-javascript-python-sql',
    datePublished: '2026-07-16',
    dateModified: '2026-07-16',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I generate a UUID in JavaScript without a library?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Call crypto.randomUUID(). It is built into all modern browsers and Node.js 19+, uses a cryptographically secure random source, and returns a standard version 4 UUID string. No npm package is needed for basic v4 generation. Note that in browsers it requires a secure context (HTTPS or localhost).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between uuid4 and uuid5 in Python?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'uuid.uuid4() generates a random UUID — different every call. uuid.uuid5(namespace, name) hashes a namespace UUID and a name string with SHA-1 to produce a deterministic UUID — the same inputs always give the same output. Use uuid4 for new unique IDs and uuid5 for reproducible IDs derived from existing keys.',
        },
      },
      {
        '@type': 'Question',
        name: 'How should I store UUIDs in MySQL and PostgreSQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In PostgreSQL, use the native uuid column type, which stores the value in 16 bytes. In MySQL, use BINARY(16) and convert with UUID_TO_BIN() and BIN_TO_UUID(). Avoid CHAR(36) text columns — they use more than double the storage and make every index larger and slower.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>How to Generate UUIDs in JavaScript, Python, and SQL | Dev Brains AI</title>
        <meta
          name="description"
          content="Copy-paste UUID recipes: crypto.randomUUID() in JS and Node, Python uuid4/uuid5 namespaces, MySQL UUID() and UUID_TO_BIN, PostgreSQL gen_random_uuid(), and efficient BINARY(16) storage."
        />
        <meta
          name="keywords"
          content="generate uuid javascript, crypto.randomUUID, python uuid module, uuid4 python, mysql uuid_to_bin, postgresql gen_random_uuid, store uuid binary 16, node crypto uuid, uuid sql"
        />
        <meta property="og:title" content="How to Generate UUIDs in JavaScript, Python, and SQL" />
        <meta
          property="og:description"
          content="Copy-paste UUID recipes: crypto.randomUUID() in JS and Node, Python uuid4/uuid5 namespaces, MySQL UUID() and UUID_TO_BIN, PostgreSQL gen_random_uuid(), and efficient BINARY(16) storage."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/generate-uuids-javascript-python-sql" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/generate-uuids-javascript-python-sql" />
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
              <li aria-current="page">Generate UUIDs in JS, Python &amp; SQL</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How to Generate UUIDs in JavaScript, Python, and SQL — A Cookbook
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Every language and database has a built-in way to generate UUIDs, and in 2026 you
            almost never need a third-party library for the basics. This cookbook collects the
            recipes you will actually use: <code>crypto.randomUUID()</code> in the browser and
            Node.js, Python&apos;s <code>uuid</code> module including deterministic namespace
            UUIDs, MySQL&apos;s <code>UUID()</code> with <code>UUID_TO_BIN()</code>, and
            PostgreSQL&apos;s <code>gen_random_uuid()</code> — plus how to store the results
            efficiently so your indexes do not bloat.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            JavaScript: Browser and Node.js
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The one-liner that covers 95% of cases — built into every modern browser and Node.js
            19+ (available under a flag from 14.17):
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Browser (secure context: HTTPS or localhost) and Node.js
const id = crypto.randomUUID();
// '36b8f84d-df4e-4d49-b662-bcde71a8764f'  (version 4)

// Node.js — explicit import if you prefer
import { randomUUID } from 'node:crypto';
const orderId = randomUUID();`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>crypto.randomUUID()</code> uses a cryptographically secure random source and
            returns a lowercase v4 string. Two things to know: in browsers it only exists in
            secure contexts (HTTPS or localhost), and it generates v4 only. For time-ordered v7
            or name-based v5, use the well-known <code>uuid</code> npm package:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`npm install uuid

import { v4, v5, v7 } from 'uuid';

v4();                                  // random
v7();                                  // time-ordered, index-friendly
v5('dev-brains-ai.com', v5.DNS);       // deterministic (same in, same out)`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Python: The uuid Module
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Python has shipped a full <code>uuid</code> module in the standard library since 2.5
            — no pip install required:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import uuid

# Random v4 — the everyday choice
uuid.uuid4()
# UUID('4b166dbe-d99d-4e63-8d99-5c53d7c286f7')

str(uuid.uuid4())    # '1cfd7d8f-...' as a plain string
uuid.uuid4().hex     # 32 hex chars, no dashes
uuid.uuid4().bytes   # raw 16 bytes for binary storage`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            The underrated feature is <code>uuid5</code> — deterministic, name-based UUIDs. You
            hash a namespace UUID plus any string, and the same inputs always produce the same
            UUID, on any machine, in any language:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Built-in namespaces: NAMESPACE_DNS, NAMESPACE_URL,
# NAMESPACE_OID, NAMESPACE_X500
uuid.uuid5(uuid.NAMESPACE_DNS, 'dev-brains-ai.com')
# UUID('6ed258d2-...') — identical every run

# Your own namespace: generate ONE v4, hard-code it forever
APP_NS = uuid.UUID('8c0fb5a6-6c14-4b47-8f4e-2d0a3c9b7e11')

def customer_uuid(email: str) -> uuid.UUID:
    return uuid.uuid5(APP_NS, email.lower())

# Re-running an import never creates duplicate IDs`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This pattern makes data imports idempotent: the row for a given email address always
            maps to the same UUID, so re-importing updates instead of duplicating. Python 3.14
            adds native <code>uuid.uuid7()</code>; on older versions use the{' '}
            <code>uuid6</code> package from PyPI.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            MySQL: UUID() and UUID_TO_BIN()
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            MySQL&apos;s <code>UUID()</code> function returns a version 1 (time-based) UUID as
            text. The important part is storing it as <code>BINARY(16)</code>, not{' '}
            <code>CHAR(36)</code>, using the conversion helpers added in MySQL 8:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT UUID();
-- '6ccd780c-baba-1026-9564-5b8c656024db'  (version 1)

CREATE TABLE orders (
  id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID(), 1)),
  customer VARCHAR(100)
);

-- Insert and read back
INSERT INTO orders (customer) VALUES ('Asha');
SELECT BIN_TO_UUID(id, 1) AS id, customer FROM orders;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The second argument <code>1</code> to <code>UUID_TO_BIN(uuid, swap_flag)</code> is a
            clever trick: it swaps the time-low and time-high fields of the v1 UUID so the most
            significant bytes become the timestamp. Stored that way, keys arrive in roughly
            ascending order and behave like sequential IDs in the clustered index — MySQL&apos;s
            own workaround for the random-insert problem. Always use the same flag in{' '}
            <code>BIN_TO_UUID()</code> when reading.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            PostgreSQL: gen_random_uuid() and the uuid Type
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            PostgreSQL is the most pleasant of the three: it has a first-class <code>uuid</code>{' '}
            column type (16 bytes internally, rendered as the familiar 36-character text), and
            since version 13 <code>gen_random_uuid()</code> is built in — no extension needed:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT gen_random_uuid();
-- 5b30857e-... (version 4)

CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer text
);

-- PostgreSQL 18+: time-ordered v7, better for busy tables
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT uuidv7(),
  payload jsonb
);`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            On versions before 13, enable <code>pgcrypto</code> with{' '}
            <code>CREATE EXTENSION pgcrypto;</code> to get <code>gen_random_uuid()</code>. The
            older <code>uuid-ossp</code> extension also offers <code>uuid_generate_v4()</code>{' '}
            and <code>uuid_generate_v5()</code> if you need name-based UUIDs in SQL.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Storing UUIDs Efficiently: The Rules
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>PostgreSQL</strong> — always the native <code>uuid</code> type. 16 bytes, validated, indexed efficiently.</li>
            <li><strong>MySQL / MariaDB</strong> — <code>BINARY(16)</code> with <code>UUID_TO_BIN(..., 1)</code> / <code>BIN_TO_UUID(..., 1)</code>. MariaDB 10.7+ also has a native <code>UUID</code> type.</li>
            <li><strong>SQL Server</strong> — the <code>uniqueidentifier</code> type with <code>NEWID()</code>, or <code>NEWSEQUENTIALID()</code> for ordered keys.</li>
            <li><strong>Never CHAR(36)/VARCHAR(36)</strong> — text storage is 36+ bytes vs 16, comparisons are slower, and every secondary index inherits the bloat.</li>
            <li><strong>Prefer time-ordered generation</strong> (UUIDv7, or MySQL&apos;s swap flag) for primary keys on insert-heavy tables.</li>
            <li><strong>Generate where it is convenient</strong> — app-side generation lets you know the ID before the INSERT; database defaults guarantee no row ever lacks one. Both are fine; pick one per table and stay consistent.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Need a few UUIDs right now for a test fixture, a seed script, or an API call? The{' '}
            <Link href="/uuid-generator">free UUID generator</Link> creates single or bulk UUIDs
            in your browser with one click.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I generate a UUID in JavaScript without a library?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Call crypto.randomUUID(). It is built into all modern browsers and Node.js 19+,
              uses a cryptographically secure random source, and returns a standard version 4
              UUID string. No npm package is needed for basic v4 generation. Note that in
              browsers it requires a secure context (HTTPS or localhost).
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between uuid4 and uuid5 in Python?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              uuid.uuid4() generates a random UUID — different every call. uuid.uuid5(namespace,
              name) hashes a namespace UUID and a name string with SHA-1 to produce a
              deterministic UUID — the same inputs always give the same output. Use uuid4 for new
              unique IDs and uuid5 for reproducible IDs derived from existing keys.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How should I store UUIDs in MySQL and PostgreSQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              In PostgreSQL, use the native uuid column type, which stores the value in 16
              bytes. In MySQL, use BINARY(16) and convert with UUID_TO_BIN() and BIN_TO_UUID().
              Avoid CHAR(36) text columns — they use more than double the storage and make every
              index larger and slower.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free UUID Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Generate UUIDs instantly in your browser — single or in bulk — and copy them with
              one click. No signup, no cost.
            </p>
            <Link href="/uuid-generator">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open UUID Generator →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/what-is-a-uuid-guid-explained">What Is a UUID? GUIDs Explained for Developers</Link></li>
              <li><Link href="/blog/uuid-v1-v4-v5-v7-differences">UUID v1 vs v4 vs v5 vs v7 — What&apos;s the Difference?</Link></li>
              <li><Link href="/blog/uuid-vs-auto-increment-database-keys">UUID vs Auto-Increment Database Keys</Link></li>
              <li><Link href="/blog/are-uuids-really-unique-collision-probability">Are UUIDs Really Unique? Collision Probability Explained</Link></li>
              <li><Link href="/blog/sql-indexing-strategies-for-faster-queries">SQL Indexing Strategies for Faster Queries</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
