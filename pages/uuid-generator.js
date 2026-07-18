// pages/uuid-generator.js
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const DEFAULT_COUNT = 5;
const MAX_COUNT = 100;

// Generate one RFC 4122 version 4 UUID using the browser's crypto.
// Prefers crypto.randomUUID(); falls back to crypto.getRandomValues with
// the version and variant bits set manually:
//   - byte 6: high nibble forced to 0100 (version 4)
//   - byte 8: top two bits forced to 10 (RFC 4122 variant)
function uuidV4() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // version 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // variant 10xx
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

const FAQ = [
  {
    q: 'Is this UUID Generator free?',
    a: 'Yes — the UUID Generator on Dev Brains AI is completely free to use, with no signup required, and there is no limit on how many batches you generate.',
  },
  {
    q: 'Are the UUIDs generated on a server?',
    a: 'No. Every UUID is generated locally in your browser using the Web Crypto API (crypto.randomUUID, with a crypto.getRandomValues fallback). Nothing is uploaded, logged, or stored on our servers — we never see the IDs you generate.',
  },
  {
    q: 'What version of UUID does this tool generate?',
    a: 'Version 4 (random) UUIDs, as defined by RFC 4122. Of the 128 bits, 6 are fixed (4 version bits and 2 variant bits) and the remaining 122 bits come from a cryptographically secure random number generator.',
  },
  {
    q: 'Can two generated UUIDs collide?',
    a: 'In theory yes, in practice no. With 122 random bits there are about 5.3 undecillion (5.3 x 10^36) possible v4 UUIDs. You would need to generate roughly 2.7 quintillion UUIDs to reach even a 50% chance of a single collision, so for any real application duplicates are not a practical concern.',
  },
  {
    q: 'Are these UUIDs safe to use as database keys or in URLs?',
    a: 'Yes. v4 UUIDs are unguessable and carry no embedded information (unlike v1, which encodes a timestamp and historically a MAC address). They are widely used as primary keys, API resource IDs, and idempotency keys. Note that random UUIDs can fragment clustered database indexes at very high insert rates — see our article on UUIDs vs auto-increment keys for the trade-offs.',
  },
];

export default function UuidGeneratorPage() {
  const [count, setCount] = useState(DEFAULT_COUNT);
  const [uuids, setUuids] = useState([]);
  const [uppercase, setUppercase] = useState(false);
  const [noHyphens, setNoHyphens] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  function clampCount(value) {
    const n = parseInt(value, 10);
    if (Number.isNaN(n)) return 1;
    return Math.min(MAX_COUNT, Math.max(1, n));
  }

  function generate(n) {
    setError(null);
    setCopied(false);
    try {
      const batch = [];
      for (let i = 0; i < n; i++) batch.push(uuidV4());
      setUuids(batch);
    } catch (err) {
      console.error(err);
      setError('Could not generate UUIDs — your browser must support the Web Crypto API.');
    }
  }

  // Initial batch on mount only (never during render, to avoid SSR
  // hydration mismatches — the server renders an empty textarea).
  useEffect(() => {
    generate(DEFAULT_COUNT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayed = uuids
    .map((u) => {
      let s = noHyphens ? u.replace(/-/g, '') : u;
      return uppercase ? s.toUpperCase() : s;
    })
    .join('\n');

  async function handleCopyAll() {
    try {
      await navigator.clipboard.writeText(displayed);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error(err);
    }
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Dev Brains AI UUID Generator',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description:
      'Free UUID v4 generator that creates 1-100 cryptographically random UUIDs at a time, entirely in your browser, with uppercase and no-hyphens options and one-click copy.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'UUID Generator', item: 'https://dev-brains-ai.com/uuid-generator' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free UUID v4 Generator — Bulk Random UUIDs | Dev Brains AI</title>
        <meta
          name="description"
          content="Generate 1-100 random UUID v4 identifiers instantly in your browser using the Web Crypto API. Uppercase and no-hyphens options, one-click copy. 100% client-side — nothing is uploaded."
        />
        <meta
          name="keywords"
          content="uuid generator, uuid v4 generator, guid generator, random uuid online, bulk uuid generator, generate uuid, Dev Brains AI"
        />
        <meta property="og:title" content="Free UUID v4 Generator — Bulk Random UUIDs" />
        <meta
          property="og:description"
          content="Generate up to 100 cryptographically random UUID v4 identifiers at once, entirely in your browser. Free, no signup."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/uuid-generator" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/uuid-generator" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <div className="card" aria-live="polite">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
          <ol
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">UUID Generator</li>
          </ol>
        </nav>

        <h1>Free UUID v4 Generator</h1>
        <p className="small">
          Generate <strong>random version 4 UUIDs</strong> (RFC 4122) — one per line, up to 100 at
          a time. UUIDs are produced by your browser&apos;s cryptographically secure random number
          generator; nothing is uploaded or stored.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <strong>How many?</strong>
            <input
              type="number"
              min={1}
              max={MAX_COUNT}
              value={count}
              onChange={(e) => setCount(clampCount(e.target.value))}
              style={{ width: 80 }}
              aria-label="Number of UUIDs to generate (1 to 100)"
            />
          </label>
          <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
            />
            Uppercase
          </label>
          <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input
              type="checkbox"
              checked={noHyphens}
              onChange={(e) => setNoHyphens(e.target.checked)}
            />
            Remove hyphens
          </label>
        </div>

        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={() => generate(clampCount(count))}>
            Regenerate
          </button>
          <button type="button" onClick={handleCopyAll} disabled={uuids.length === 0}>
            {copied ? 'Copied!' : 'Copy all'}
          </button>
        </div>

        <div style={{ marginTop: 14 }}>
          {error && (
            <div role="alert" style={{ color: 'crimson' }}>
              <strong>Error:</strong> {String(error)}
            </div>
          )}

          <label htmlFor="uuid-output" className="small">
            <strong>
              Generated UUIDs{uuids.length > 0 ? ` (${uuids.length})` : ''}
            </strong>
          </label>
          <textarea
            id="uuid-output"
            readOnly
            value={displayed}
            aria-label="Generated UUIDs, one per line"
            style={{ minHeight: 160, fontFamily: 'monospace', width: '100%' }}
            placeholder="Your UUIDs will appear here..."
            onFocus={(e) => e.target.select()}
          />
        </div>
      </div>

      {/* SEO Content */}
      <div className="card">
        <h2>About this UUID Generator</h2>
        <p>
          A UUID (Universally Unique Identifier, also called a GUID on Microsoft platforms) is a
          128-bit value written as 32 hexadecimal digits in the familiar{' '}
          <code>8-4-4-4-12</code> pattern, e.g.{' '}
          <code>3f2b8c1e-9d4a-4f6b-8a2e-1c5d7e9f0a3b</code>. UUIDs let independent systems create
          identifiers without coordinating with each other or a central authority — two services,
          two devices, or two database shards can all mint IDs simultaneously with effectively
          zero risk of collision. This free generator produces <strong>version 4</strong> UUIDs,
          the fully random variety, in batches of 1 to 100, ready to paste into code, fixtures,
          config files, or spreadsheets.
        </p>
        <p>
          Generation happens entirely in your browser. The tool calls{' '}
          <code>crypto.randomUUID()</code> where available, and otherwise falls back to{' '}
          <code>crypto.getRandomValues()</code> with the version and variant bits set by hand —
          both draw from the operating system&apos;s cryptographically secure random source, not
          the predictable <code>Math.random()</code>. No network request is made and nothing you
          generate is ever seen by our servers.
        </p>

        <h3>How a version 4 UUID is built</h3>
        <p>
          A v4 UUID is 16 random bytes with 6 bits pinned to fixed values by RFC 4122:
        </p>
        <ul>
          <li>
            <strong>Version bits</strong> — the first hex digit of the third group is always{' '}
            <code>4</code>. In byte terms, the high nibble of byte 6 is forced to <code>0100</code>.
          </li>
          <li>
            <strong>Variant bits</strong> — the first hex digit of the fourth group is always one
            of <code>8</code>, <code>9</code>, <code>a</code>, or <code>b</code>, because the top
            two bits of byte 8 are forced to <code>10</code>.
          </li>
          <li>
            <strong>The remaining 122 bits</strong> are pure randomness — about 5.3 × 10
            <sup>36</sup> possible values.
          </li>
        </ul>
        <p>
          Thanks to the birthday paradox math, you would need to generate around 2.7 quintillion
          v4 UUIDs before the odds of even one duplicate reach 50%. Generating a billion UUIDs per
          second, that would take roughly 86 years — which is why v4 collisions are treated as a
          theoretical curiosity rather than an engineering concern.
        </p>

        <h3>UUID versions at a glance</h3>
        <ul>
          <li>
            <strong>v1</strong> — timestamp + node identifier. Sortable by creation time, but
            historically leaked the machine&apos;s MAC address, so it fell out of favor.
          </li>
          <li>
            <strong>v3 / v5</strong> — deterministic, derived by hashing a namespace and a name
            (MD5 for v3, SHA-1 for v5). The same input always yields the same UUID.
          </li>
          <li>
            <strong>v4</strong> — fully random. The default choice for most applications, and what
            this tool generates.
          </li>
          <li>
            <strong>v7</strong> — the newer time-ordered format (RFC 9562): a Unix millisecond
            timestamp followed by random bits. Increasingly popular for database primary keys
            because inserts stay roughly sequential.
          </li>
        </ul>

        <h3>Common uses for random UUIDs</h3>
        <ul>
          <li>
            <strong>Database primary keys</strong> — IDs can be created in the application layer
            before insert, merge cleanly across shards and replicas, and never reveal row counts
            the way auto-increment integers do.
          </li>
          <li>
            <strong>API resource identifiers</strong> — unguessable IDs in URLs prevent trivial
            enumeration of other users&apos; resources (though they are not a substitute for real
            authorization checks).
          </li>
          <li>
            <strong>Idempotency and correlation keys</strong> — attach a UUID to a request or
            message so retries can be deduplicated and logs across services can be stitched
            together.
          </li>
          <li>
            <strong>Test fixtures</strong> — seed data, mock objects, and integration tests that
            need realistic unique IDs.
          </li>
          <li>
            <strong>File and object names</strong> — collision-free names for uploads in blob
            storage.
          </li>
        </ul>
        <p>
          One trade-off worth knowing: because v4 UUIDs are random, inserting them at very high
          rates into a clustered index (like MySQL&apos;s InnoDB primary key) scatters writes
          across the index and can hurt performance compared with sequential keys. If that is your
          workload, consider UUIDv7 or a separate auto-increment clustering key — the trade-offs
          are covered in the articles linked below.
        </p>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>FAQ: UUID Generator</h3>
        {FAQ.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <strong>{item.q}</strong>
            <div className="small" style={{ marginTop: 6 }}>
              {item.a}
            </div>
          </div>
        ))}
      </div>

      {/* Cross-links */}
      <div className="card small">
        <h4>More developer tools from Dev Brains AI</h4>
        <p className="small">
          Need random secrets instead of IDs? Try the{' '}
          <Link href="/password-generator">Password Generator</Link>, or fingerprint data with the{' '}
          <Link href="/hash-generator">Hash Generator</Link>. To go deeper, read{' '}
          <Link href="/blog/what-is-a-uuid-guid-explained">What Is a UUID (GUID)? Explained</Link>,{' '}
          <Link href="/blog/uuid-vs-auto-increment-database-keys">
            UUID vs Auto-Increment Database Keys
          </Link>
          , and{' '}
          <Link href="/blog/sql-indexing-strategies-for-faster-queries">
            SQL Indexing Strategies for Faster Queries
          </Link>
          .
        </p>
      </div>
      {/* Companion guides */}
      <div className="card">
        <h3>Guides and tutorials: UUID</h3>
        <ul className="small">
          <li><Link href="/blog/what-is-a-uuid-guid-explained">What Is a UUID? GUIDs Explained for Developers</Link></li>
          <li><Link href="/blog/uuid-v1-v4-v5-v7-differences">UUID v1 vs v4 vs v5 vs v7 — Differences Explained</Link></li>
          <li><Link href="/blog/uuid-vs-auto-increment-database-keys">UUID vs Auto-Increment Database Keys — Trade-offs Explained</Link></li>
          <li><Link href="/blog/generate-uuids-javascript-python-sql">How to Generate UUIDs in JavaScript, Python, and SQL</Link></li>
          <li><Link href="/blog/are-uuids-really-unique-collision-probability">Are UUIDs Really Unique? Collision Probability Explained</Link></li>
        </ul>
      </div>

    </div>
  );
}
