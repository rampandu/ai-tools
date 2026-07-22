// pages/blog/milliseconds-vs-seconds-timestamp-bugs.js
import Head from 'next/head';
import Link from 'next/link';

export default function MillisecondsVsSecondsTimestampBugs() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Milliseconds vs Seconds — The 1000x Timestamp Bug Explained',
        item: 'https://dev-brains-ai.com/blog/milliseconds-vs-seconds-timestamp-bugs',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Milliseconds vs Seconds: Fix the 1000x Timestamp Bug',
    description:
      'Dates showing 1970 or year 56789? Learn to spot the milliseconds vs seconds bug in seconds, fix JWT exp pitfalls, dodge the year-2038 problem, and copy a ready-to-use normalization function.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/milliseconds-vs-seconds-timestamp-bugs',
    datePublished: '2026-07-16',
    dateModified: '2026-07-16',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why does my date show January 1970?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A date near January 1970 usually means a Unix timestamp in seconds was treated as milliseconds. Dividing by 1000 shrinks the value close to zero, which is the Unix epoch: 1 January 1970 UTC. Multiply the value by 1000 before passing it to JavaScript Date.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I tell if a timestamp is in seconds or milliseconds?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Count the digits. Current Unix timestamps in seconds have 10 digits (around 1.7 to 1.8 billion), while millisecond timestamps have 13 digits. A quick heuristic in code: if the value is greater than 1e12, it is almost certainly milliseconds.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the JWT exp claim in seconds or milliseconds?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The JWT exp, iat, and nbf claims are always in seconds, as defined by RFC 7519 (NumericDate). JavaScript Date.now() returns milliseconds, so you must divide by 1000 when creating claims and multiply by 1000 when comparing them to Date.now().',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Milliseconds vs Seconds: Fix the 1000x Bug | Dev Brains AI</title>
        <meta
          name="description"
          content="Dates showing 1970 or year 56789? Learn to spot the milliseconds vs seconds bug in seconds, fix JWT exp pitfalls, dodge the year-2038 problem, and copy a ready-to-use normalization function."
        />
        <meta
          name="keywords"
          content="milliseconds vs seconds timestamp, unix timestamp 1970 bug, javascript date 1970, timestamp 13 digits vs 10 digits, jwt exp milliseconds, year 2038 problem, epoch converter, timestamp bug"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/milliseconds-vs-seconds-timestamp-bugs" />
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
              <li aria-current="page">Milliseconds vs Seconds Timestamp Bugs</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Milliseconds vs Seconds — The 1000x Timestamp Bug Explained (and How to Fix It)
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Every developer eventually ships this bug. A user profile shows &quot;Joined: 1 January 1970&quot;.
            A scheduled job claims it will run in the year 56789. A perfectly valid JWT is rejected as
            expired the moment it is issued. All three symptoms have the same root cause: somewhere,
            a Unix timestamp in <strong>seconds</strong> was mixed up with one in
            <strong> milliseconds</strong> — a value that is exactly 1000 times too big or too small.
            This guide shows you how to recognise the bug instantly, why it keeps happening across
            JavaScript, JWTs, and databases, and how to write defensive code that normalizes
            timestamps before they can bite you.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Symptoms: 1970 Dates and Far-Future Years
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The 1000x bug always shows up in one of two directions, and each direction has a
            signature symptom you can diagnose at a glance:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>
              <strong>Dates stuck near January 1970</strong> — a seconds value was interpreted as
              milliseconds. The number is 1000 times too small, so the date collapses to within a
              few weeks of the Unix epoch (1 January 1970 UTC).
            </li>
            <li>
              <strong>Dates in the year 55000+ (like 56789)</strong> — a milliseconds value was
              interpreted as seconds. The number is 1000 times too big, so the date lands roughly
              54,000 years in the future.
            </li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// The same moment in time, two units:
const seconds      = 1784160000;      // 10 digits — Unix seconds
const milliseconds = 1784160000000;   // 13 digits — Unix milliseconds

// Bug direction 1: seconds fed into a millisecond API
new Date(1784160000)      // → 21 Jan 1970 (wrong! near epoch)

// Bug direction 2: milliseconds fed into a second-based API
new Date(1784160000000 * 1000)  // → year 58500-ish (wrong! far future)

// Correct:
new Date(1784160000 * 1000)     // → the real 2026 date`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why the Mix-Up Happens: JavaScript vs Everything Else
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The core problem is that the software ecosystem never agreed on one unit. Unix, C,
            Python&apos;s <code>time.time()</code>, PHP, most databases, and virtually every REST API
            that predates 2010 use <strong>seconds</strong> since the epoch. JavaScript — and
            therefore every browser, Node.js server, and JSON payload built by frontend code —
            uses <strong>milliseconds</strong>:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Date.now()                    // JavaScript: 1784160000000 (ms)
new Date().getTime()          // JavaScript: milliseconds
Math.floor(Date.now() / 1000) // JavaScript → Unix seconds

time.time()                   # Python: 1784160000.123 (seconds, float)
int(time.time() * 1000)       # Python → milliseconds

SELECT UNIX_TIMESTAMP();      -- MySQL: seconds
SELECT EXTRACT(EPOCH FROM NOW()); -- PostgreSQL: seconds`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The moment a timestamp crosses a boundary — frontend to backend, API to database,
            one microservice to another — there is a chance someone on the other side assumes
            the wrong unit. The bug is rarely in one team&apos;s code; it lives in the seam
            between two systems.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Classic Trap: JWT exp vs Date.now()
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The single most common place this bug ships to production is JWT expiry checks.
            RFC 7519 defines the <code>exp</code>, <code>iat</code>, and <code>nbf</code> claims
            as <strong>NumericDate — seconds</strong> since the epoch. But the natural way to get
            &quot;now&quot; in JavaScript is <code>Date.now()</code>, which returns milliseconds:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// BUG: comparing seconds to milliseconds
if (decoded.exp < Date.now()) {
  // exp ≈ 1,784,160,000  vs  Date.now() ≈ 1,784,160,000,000
  // milliseconds is ALWAYS bigger → every token looks expired
  throw new Error('Token expired');
}

// CORRECT: convert both sides to the same unit
if (decoded.exp * 1000 < Date.now()) { ... }
// or
if (decoded.exp < Math.floor(Date.now() / 1000)) { ... }`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The reverse bug also exists: creating a token with
            <code> exp: Date.now() + 3600000</code> produces an expiry timestamp thousands of
            years in the future — a token that effectively never expires, which is a genuine
            security issue, not just a display glitch.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Detection Heuristics: Count the Digits
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            For any timestamp from the mid-1970s until the year 2286, the digit count tells you
            the unit reliably:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>10 digits</strong> (about 1.0–1.9 billion today) → seconds</li>
            <li><strong>13 digits</strong> (about 1.0–1.9 trillion today) → milliseconds</li>
            <li><strong>16 digits</strong> → microseconds (common in Python and BigQuery)</li>
            <li><strong>19 digits</strong> → nanoseconds (common in Go and Kafka)</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            In code, the practical cutoff is <code>1e12</code>. No seconds-based timestamp will
            reach 1e12 until the year 33658, and no millisecond timestamp was below 1e12 after
            September 2001 — so for modern data the check is unambiguous:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`/** Normalize any epoch value (s, ms, µs, ns) to milliseconds. */
function toMillis(ts) {
  const n = Number(ts);
  if (!Number.isFinite(n)) throw new Error('Not a numeric timestamp: ' + ts);
  const abs = Math.abs(n);
  if (abs < 1e12)  return n * 1000;        // seconds → ms
  if (abs < 1e15)  return n;               // already milliseconds
  if (abs < 1e18)  return Math.floor(n / 1e3);  // microseconds → ms
  return Math.floor(n / 1e6);              // nanoseconds → ms
}

toMillis(1784160000)        // 1784160000000
toMillis(1784160000000)     // 1784160000000
toMillis('1784160000000000') // 1784160000000 (microseconds handled)`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Use a helper like this at every boundary where timestamps enter your system — API
            request parsing, queue consumers, CSV imports. It is far cheaper than debugging a
            1970 date in production. You can also paste any suspicious number into a
            <Link href="/timestamp-converter"> timestamp converter</Link> — if the human-readable
            date looks absurd, you have found your unit mismatch.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Year-2038 Problem: A Related 32-Bit Trap
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            While you are auditing timestamp handling, check for one more landmine. Systems that
            store Unix seconds in a <strong>signed 32-bit integer</strong> can only count up to
            2,147,483,647 — which corresponds to <strong>03:14:07 UTC on 19 January 2038</strong>.
            One second later, the value overflows to a large negative number, and the date wraps
            around to 13 December 1901.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>MySQL&apos;s <code>TIMESTAMP</code> column type is 32-bit and hits this wall; prefer <code>DATETIME</code> or a <code>BIGINT</code> epoch column for far-future dates.</li>
            <li>Older embedded systems, routers, and C code using <code>time_t</code> on 32-bit builds are affected.</li>
            <li>A 30-year mortgage or insurance policy created today already has an end date past 2038 — this is not a hypothetical future problem.</li>
            <li>JavaScript is safe: it uses 64-bit floating point milliseconds, valid until roughly the year 275760.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Defensive Rules to Stop the Bug for Good
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Name your variables with the unit</strong> — <code>expiresAtMs</code> and <code>createdAtSec</code> make the mismatch visible in code review; <code>timestamp</code> hides it.</li>
            <li><strong>Normalize at the boundary</strong> — convert everything to one unit (usually milliseconds, or ISO 8601 strings) as data enters your system, and convert back only at the edge that needs it.</li>
            <li><strong>Add a sanity assertion</strong> — reject timestamps that decode to before 2000 or after 2100 unless your domain genuinely needs them.</li>
            <li><strong>Write one test per boundary</strong> — a unit test that round-trips a known date through your API catches the 1000x bug before deployment.</li>
            <li><strong>Prefer ISO 8601 strings in JSON APIs</strong> — <code>&quot;2026-07-16T09:30:00Z&quot;</code> is self-describing; a bare number never is.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does my date show January 1970?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              A date near January 1970 usually means a Unix timestamp in seconds was treated as
              milliseconds. Dividing by 1000 shrinks the value close to zero, which is the Unix
              epoch: 1 January 1970 UTC. Multiply the value by 1000 before passing it to
              JavaScript Date.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I tell if a timestamp is in seconds or milliseconds?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Count the digits. Current Unix timestamps in seconds have 10 digits (around 1.7 to
              1.8 billion), while millisecond timestamps have 13 digits. A quick heuristic in
              code: if the value is greater than 1e12, it is almost certainly milliseconds.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is the JWT exp claim in seconds or milliseconds?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The JWT exp, iat, and nbf claims are always in seconds, as defined by RFC 7519
              (NumericDate). JavaScript Date.now() returns milliseconds, so you must divide by
              1000 when creating claims and multiply by 1000 when comparing them to Date.now().
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Timestamp Converter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste any Unix timestamp — seconds or milliseconds — and instantly see the
              human-readable date in UTC, IST, and your local timezone. No signup, no cost.
            </p>
            <Link href="/timestamp-converter">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open Timestamp Converter →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/unix-timestamp-explained-epoch-time-guide">Unix Timestamp Explained — Epoch Time Guide</Link></li>
              <li><Link href="/blog/convert-timestamp-to-date-javascript-python-sql">Convert Timestamp to Date in JavaScript, Python, and SQL</Link></li>
              <li><Link href="/blog/date-formatting-cheat-sheet-iso-8601">Date Formatting Cheat Sheet — ISO 8601 and Beyond</Link></li>
              <li><Link href="/blog/handling-timezones-in-web-applications">Handling Timezones in Web Applications</Link></li>
              <li><Link href="/blog/jwt-expiry-claims-exp-iat-nbf-explained">JWT Expiry Claims — exp, iat, nbf Explained</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
