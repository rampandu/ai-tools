// pages/blog/uuid-v1-v4-v5-v7-differences.js
import Head from 'next/head';
import Link from 'next/link';

export default function UuidV1V4V5V7Differences() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'UUID v1 vs v4 vs v5 vs v7 — Differences Explained',
        item: 'https://dev-brains-ai.com/blog/uuid-v1-v4-v5-v7-differences',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'UUID v1 vs v4 vs v5 vs v7 — Differences Explained (and Which to Pick)',
    description:
      'A tour of UUID versions: v1 timestamp+MAC and its privacy leak, v4 pure random, v5 deterministic name-based hashing, and v7 time-ordered UUIDs that databases love. Comparison table included.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/uuid-v1-v4-v5-v7-differences',
    datePublished: '2026-07-16',
    dateModified: '2026-07-16',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which UUID version should I use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For most new applications, use UUID v7 if your libraries and database support it — it is random enough to be unguessable but time-ordered, so database indexes stay fast. Use v4 when you just need a random ID and insert order does not matter, and v5 when you need the same input to always produce the same UUID.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is UUID v1 considered a privacy risk?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A classic UUID v1 embeds the generating machine’s MAC address and a precise timestamp. Anyone who sees the UUID can extract when it was created and potentially which network card created it. The Melissa virus author was famously traced partly via a GUID containing his MAC address.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between UUID v4 and v7?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'UUID v4 is 122 bits of pure randomness, so consecutive IDs are scattered across the entire value space. UUID v7 puts a 48-bit Unix millisecond timestamp in front of 74 random bits, so IDs generated later sort later. That ordering keeps B-tree database indexes compact and makes inserts significantly faster at scale.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>UUID v1 vs v4 vs v5 vs v7 — Differences Explained | Dev Brains AI</title>
        <meta
          name="description"
          content="UUID versions compared: v1 timestamp+MAC and its privacy leak, v4 pure random, v5 deterministic name-based, and v7 time-ordered UUIDs databases love. With a comparison table."
        />
        <meta
          name="keywords"
          content="uuid v4 vs v7, uuid versions explained, uuid v1 vs v4, uuid v5 namespace, time ordered uuid, uuidv7 database, which uuid version to use, uuid version comparison"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/uuid-v1-v4-v5-v7-differences" />
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
              <li aria-current="page">UUID v1 vs v4 vs v5 vs v7</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            UUID v1 vs v4 vs v5 vs v7 — Differences Explained (and Which to Pick)
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            All UUIDs look the same — 36 characters of hex in the familiar 8-4-4-4-12 pattern —
            but the version digit hides very different generation strategies. Some encode a
            timestamp and your network card&apos;s MAC address, some are pure randomness, some
            are deterministic hashes, and the newest one is engineered specifically to keep
            database indexes fast. This guide tours the four versions you will actually meet
            (v1, v4, v5, and v7), with a comparison table and clear advice on when to pick each.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            UUID v1 — Timestamp + MAC Address (the Original)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Version 1 builds a UUID from a 60-bit timestamp (100-nanosecond intervals since 15
            October 1582 — the Gregorian calendar epoch), a clock sequence to handle clock
            resets, and a 48-bit node identifier that was traditionally the machine&apos;s MAC
            address.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`c232ab00-9414-11ec-b3c8-9f6bdeced846
^^^^^^^^ ^^^^  ^^^       ^^^^^^^^^^^^
time-low time  time-high  node (often the MAC address)
              (version 1)`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            Uniqueness is excellent — time plus a unique hardware address rarely collides — but
            v1 has two serious problems:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Privacy leak</strong> — anyone holding the UUID can extract the creation time and the MAC address of the generating machine. The author of the 1999 Melissa virus was traced partly through a GUID embedding his MAC address.</li>
            <li><strong>Awkward sort order</strong> — the timestamp bytes are stored low-order first, so v1 UUIDs do not sort chronologically as strings, wasting the one benefit of embedding time.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Modern libraries substitute random node IDs to hide the MAC, but at that point v7
            does everything v1 does, better. Treat v1 as legacy.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            UUID v4 — Pure Randomness (the Workhorse)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Version 4 fills 122 bits with output from a cryptographically secure random number
            generator; the other 6 bits mark the version and variant. That gives about 5.3 ×
            10^36 possible values — enough that collisions are a theoretical curiosity, not an
            engineering concern.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// One line in any modern browser or Node.js 19+
crypto.randomUUID();
// '7f9c24e8-3b12-4c8f-9a6d-e51fca2aa07f'
//               ^ version 4`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            v4 is the default almost everywhere because it is simple, unguessable, and leaks
            nothing — no time, no hardware, no counter. Its one weakness shows up at database
            scale: consecutive v4 values land in random spots across a B-tree index, causing
            page splits and cache misses on insert-heavy tables. If your IDs will be a primary
            key on a large table, keep reading.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            UUID v5 — Deterministic, Name-Based (the Odd One Out)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Version 5 is fundamentally different: it is not random at all. You give it a
            namespace UUID and a name (any string), it hashes them with SHA-1, and it packs 122
            bits of the digest into UUID form. The same namespace + name always produces the
            same UUID, on any machine, in any language:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`import uuid

# Same inputs -> same UUID, every time, everywhere
uuid.uuid5(uuid.NAMESPACE_DNS, 'dev-brains-ai.com')
# UUID('6ed258d2-8bfd-5b3a-a4b8-2c1c2b0f4f52')  (version 5)`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Use v5 when you need reproducible IDs: mapping external keys (emails, URLs, product
            codes) to stable UUIDs, idempotent imports where re-running must not create
            duplicates, or generating the same ID independently in two services. Note that SHA-1
            is fine here — v5 is about determinism, not cryptographic secrecy — but anyone who
            knows the namespace and name can compute the UUID, so never treat a v5 UUID as a
            secret.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            UUID v7 — Time-Ordered Random (the Modern Default)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Version 7, standardised in RFC 9562 (2024), fixes v4&apos;s database problem while
            keeping its safety. The first 48 bits are a Unix timestamp in milliseconds; the
            remaining 74 bits are random:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`018f4e2a-5b1c-7d3e-9f4a-1c2b3d4e5f6a
\\_____________/ ^
 48-bit Unix ms  version 7, then 74 random bits

Generated later -> sorts later (as string AND as bytes)`}
          </pre>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Index-friendly</strong> — new rows always land at the right edge of the B-tree, like auto-increment IDs, so inserts stay fast and indexes stay compact.</li>
            <li><strong>Still unguessable</strong> — 74 random bits per millisecond is far beyond brute-force range.</li>
            <li><strong>Roughly sortable by creation time</strong> — handy for pagination and debugging, without a separate created_at sort in many cases.</li>
            <li><strong>Mild trade-off</strong> — it does reveal creation time, which is usually harmless but worth knowing.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            PostgreSQL 18 ships <code>uuidv7()</code> natively, and mature libraries exist for
            JavaScript, Python, Java, Go, and Rust. For new systems where UUIDs are primary
            keys, v7 is the modern default.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Comparison Table and How to Choose
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Version | Built from            | Sortable | Deterministic | Leaks info      | Verdict
--------|-----------------------|----------|---------------|-----------------|------------------
v1      | timestamp + MAC       | poorly   | no            | time + MAC addr | legacy, avoid
v4      | 122 random bits       | no       | no            | nothing         | fine everywhere
v5      | SHA-1(namespace+name) | no       | YES           | nothing*        | reproducible IDs
v7      | unix ms + 74 random   | YES      | no            | creation time   | modern default

* computable by anyone who knows the inputs`}
          </pre>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Database primary keys, event IDs, anything insert-heavy</strong> → v7</li>
            <li><strong>Session tokens, API keys&apos; IDs, anywhere time leakage bothers you</strong> → v4</li>
            <li><strong>Same input must always yield the same ID</strong> → v5</li>
            <li><strong>Maintaining a system that already uses v1</strong> → keep it working, migrate to v7 when convenient</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Want to compare outputs side by side? The{' '}
            <Link href="/uuid-generator">free UUID generator</Link> lets you generate UUIDs in
            your browser and inspect the version digit yourself.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Which UUID version should I use?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              For most new applications, use UUID v7 if your libraries and database support it —
              it is random enough to be unguessable but time-ordered, so database indexes stay
              fast. Use v4 when you just need a random ID and insert order does not matter, and
              v5 when you need the same input to always produce the same UUID.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why is UUID v1 considered a privacy risk?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A classic UUID v1 embeds the generating machine&apos;s MAC address and a precise
              timestamp. Anyone who sees the UUID can extract when it was created and potentially
              which network card created it. The Melissa virus author was famously traced partly
              via a GUID containing his MAC address.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between UUID v4 and v7?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              UUID v4 is 122 bits of pure randomness, so consecutive IDs are scattered across the
              entire value space. UUID v7 puts a 48-bit Unix millisecond timestamp in front of 74
              random bits, so IDs generated later sort later. That ordering keeps B-tree database
              indexes compact and makes inserts significantly faster at scale.
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
              <li><Link href="/blog/uuid-vs-auto-increment-database-keys">UUID vs Auto-Increment Database Keys</Link></li>
              <li><Link href="/blog/generate-uuids-javascript-python-sql">Generate UUIDs in JavaScript, Python, and SQL</Link></li>
              <li><Link href="/blog/are-uuids-really-unique-collision-probability">Are UUIDs Really Unique? Collision Probability Explained</Link></li>
              <li><Link href="/blog/sql-indexing-strategies-for-faster-queries">SQL Indexing Strategies for Faster Queries</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
