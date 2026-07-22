// pages/blog/unix-timestamp-explained-epoch-time-guide.js
import Head from 'next/head';
import Link from 'next/link';

export default function UnixTimestampExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Unix Timestamp Explained — A Complete Guide to Epoch Time',
        item: 'https://dev-brains-ai.com/blog/unix-timestamp-explained-epoch-time-guide',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Unix Timestamp Explained: What Epoch Time Really Means',
    description:
      'What a unix timestamp is, why epoch time starts 1970-01-01 UTC, the seconds-vs-milliseconds bug, and ready-to-use conversion code for JS, Python, and SQL.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/unix-timestamp-explained-epoch-time-guide',
    datePublished: '2026-07-14',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a unix timestamp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A unix timestamp is the number of seconds that have elapsed since 00:00:00 UTC on 1 January 1970, known as the unix epoch. It is a single integer that identifies a moment in time without any timezone information.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is a unix timestamp in seconds or milliseconds?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The classic unix timestamp is in seconds. However, JavaScript (Date.now()), Java (System.currentTimeMillis()), and many APIs use milliseconds. A 10-digit value is usually seconds and a 13-digit value is usually milliseconds.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do unix timestamps depend on timezones?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. A unix timestamp always counts from the epoch in UTC, so the same instant produces the same timestamp everywhere in the world. Timezones only matter when you convert the timestamp into a human-readable date for display.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Unix Timestamp Explained: What Epoch Time Really Means | Dev Brains AI</title>
        <meta
          name="description"
          content="What a unix timestamp is, why epoch time starts 1970-01-01 UTC, the seconds-vs-milliseconds bug, and ready-to-use conversion code for JS, Python, and SQL."
        />
        <meta
          name="keywords"
          content="unix timestamp, epoch time, unix time explained, seconds since 1970, epoch converter, unix timestamp to date, timestamp seconds vs milliseconds, what is epoch time"
        />
        <meta property="og:title" content="Unix Timestamp Explained: What Epoch Time Really Means" />
        <meta property="og:description" content="What a unix timestamp is, why epoch time starts 1970-01-01 UTC, the seconds-vs-milliseconds bug, and ready-to-use conversion code for JS, Python, and SQL." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/unix-timestamp-explained-epoch-time-guide" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/unix-timestamp-explained-epoch-time-guide" />
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
              <li aria-current="page">Unix Timestamp Explained</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Unix Timestamp Explained — A Complete Guide to Epoch Time
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Open any API response, database row, or log file and you will eventually run into a
            number like <strong>1752451200</strong>. That is a unix timestamp — the backbone of how
            computers record time. This guide explains what epoch time actually is, why it was
            designed this way, the seconds-versus-milliseconds split that causes so many bugs, and
            how to convert timestamps to readable dates in JavaScript, Python, and SQL.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            What Is a Unix Timestamp?
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A unix timestamp is simply a count of <strong>seconds elapsed since 00:00:00 UTC on
            1 January 1970</strong>. That starting moment is called the <strong>unix epoch</strong>.
            The value 0 means the epoch itself; 86,400 means exactly one day later; 1752451200
            means 14 July 2025 at midnight UTC.
          </p>
          <p className="small" style={{ marginBottom: 12 }}>
            Why 1970? The unix operating system was developed at Bell Labs around 1969–1971, and
            its engineers needed a convenient, recent, round starting date for the system clock.
            1 January 1970 was chosen, and because unix went on to influence practically every
            operating system and programming language that followed, the choice stuck. Today epoch
            time is used by Linux, macOS, Android, databases, JavaScript, Python, Go, and almost
            every API you will ever call.
          </p>
          <p className="small" style={{ marginBottom: 14 }}>
            The crucial detail is that the count is anchored to <strong>UTC</strong>. A unix
            timestamp carries no timezone. Whether your server runs in Mumbai, Frankfurt, or
            Virginia, the same instant in time produces exactly the same integer.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why Epoch Time Exists — Timezone-Free Arithmetic
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Human date formats are terrible for computation. Is "03/04/2025" the 3rd of April or
            the 4th of March? How many days are between 28 February and 1 March — it depends on
            leap years. What time is "9:00 AM" — it depends on where you are standing. Epoch time
            removes all of that ambiguity by reducing time to a plain integer:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Comparison is trivial</strong> — a bigger number is always a later moment, so sorting events is just numeric sorting.</li>
            <li><strong>Duration is subtraction</strong> — <code>end - start</code> gives elapsed seconds with no calendar logic at all.</li>
            <li><strong>Storage is compact</strong> — one integer instead of a formatted string, which also indexes efficiently in databases.</li>
            <li><strong>It is timezone-proof</strong> — servers in different regions agree on the value without any conversion.</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// How long did the job take? No calendars, no timezones.
const start = 1752451200;   // job started
const end   = 1752454800;   // job finished
const durationSeconds = end - start;      // 3600
const durationMinutes = durationSeconds / 60;  // 60 minutes`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Seconds vs Milliseconds — Know Your Ecosystem
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The single most common timestamp bug is mixing up units. The classic unix timestamp is
            in <strong>seconds</strong>, but several major ecosystems count in
            <strong> milliseconds</strong>:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`Ecosystem / API              Unit          Example (same instant)
---------------------------  ------------  ----------------------
Linux time(), date +%s       seconds       1752451200
Python time.time()           seconds*      1752451200.123 (float)
MySQL UNIX_TIMESTAMP()       seconds       1752451200
JWT exp / iat claims         seconds       1752451200
JavaScript Date.now()        MILLIseconds  1752451200000
Java System.currentTimeMillis MILLIseconds 1752451200000
MongoDB Date type            MILLIseconds  1752451200000

* Python returns seconds as a float with sub-second precision.`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            A quick heuristic: current timestamps in seconds have <strong>10 digits</strong>, while
            millisecond timestamps have <strong>13 digits</strong>. If you feed a seconds value
            into JavaScript&apos;s <code>new Date()</code> without multiplying by 1000, you will get a
            date in January 1970 — a bug so common we wrote a
            {' '}<Link href="/blog/milliseconds-vs-seconds-timestamp-bugs">separate article about it</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Negative Timestamps and Leap Seconds
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Two edge cases worth knowing about:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>
              <strong>Negative timestamps</strong> represent moments before 1970. For example,
              -86400 is 31 December 1969, and India&apos;s independence day, 15 August 1947, is
              roughly -706320000. Most modern languages handle negatives correctly, but some
              older APIs, JSON parsers, and 32-bit systems do not — test before relying on them
              for birthdates or historical data.
            </li>
            <li>
              <strong>Leap seconds are ignored.</strong> Astronomical time occasionally drifts from
              atomic time, so a leap second is inserted into UTC every few years. Unix time
              pretends these do not exist: every day is exactly 86,400 seconds. During a leap
              second the unix clock effectively repeats or smears a second. For 99.9% of
              applications this is irrelevant, but it means unix time is not a perfect count of
              physical seconds since 1970 — it is off by 27 seconds and counting.
            </li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Converting Timestamps in JavaScript, Python, and SQL
          </h2>
          <p className="small"><strong>JavaScript</strong> — remember: milliseconds.</p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`// Current timestamp
Date.now();                          // 1752451200000 (ms)
Math.floor(Date.now() / 1000);       // 1752451200 (unix seconds)

// Unix seconds -> readable date
const ts = 1752451200;
new Date(ts * 1000).toISOString();   // "2025-07-14T00:00:00.000Z"

// Date -> unix seconds
Math.floor(new Date('2025-07-14T00:00:00Z').getTime() / 1000);`}
          </pre>

          <p className="small"><strong>Python</strong> — seconds, as a float.</p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`import time
from datetime import datetime, timezone

time.time()                          # 1752451200.123 (seconds, float)

# Unix seconds -> aware datetime in UTC
dt = datetime.fromtimestamp(1752451200, tz=timezone.utc)
print(dt.isoformat())                # 2025-07-14T00:00:00+00:00

# datetime -> unix seconds
int(dt.timestamp())                  # 1752451200`}
          </pre>

          <p className="small"><strong>SQL</strong> — MySQL and PostgreSQL differ.</p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- MySQL
SELECT FROM_UNIXTIME(1752451200);            -- timestamp -> datetime
SELECT UNIX_TIMESTAMP('2025-07-14 00:00:00'); -- datetime -> timestamp

-- PostgreSQL
SELECT to_timestamp(1752451200);              -- timestamp -> timestamptz
SELECT extract(epoch FROM now())::bigint;     -- datetime -> timestamp`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            For a deeper cookbook with the timezone gotchas of each function, see our
            {' '}<Link href="/blog/convert-timestamp-to-date-javascript-python-sql">timestamp conversion guide</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is a unix timestamp?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              It is the number of seconds that have elapsed since 00:00:00 UTC on 1 January 1970,
              known as the unix epoch. It is a single integer that identifies a moment in time
              without any timezone information.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Is a unix timestamp in seconds or milliseconds?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The classic unix timestamp is in seconds. However, JavaScript (Date.now()), Java
              (System.currentTimeMillis()), and many APIs use milliseconds. A 10-digit value is
              usually seconds and a 13-digit value is usually milliseconds.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Do unix timestamps depend on timezones?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. A unix timestamp always counts from the epoch in UTC, so the same instant
              produces the same timestamp everywhere in the world. Timezones only matter when you
              convert the timestamp into a human-readable date for display.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Timestamp Converter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Convert unix timestamps to human-readable dates and back, in your browser.
              Handles seconds and milliseconds automatically. No signup, no cost.
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
              <li><Link href="/blog/convert-timestamp-to-date-javascript-python-sql">Convert Timestamps to Dates in JavaScript, Python, and SQL</Link></li>
              <li><Link href="/blog/milliseconds-vs-seconds-timestamp-bugs">Milliseconds vs Seconds — The Classic Timestamp Bug</Link></li>
              <li><Link href="/blog/handling-timezones-in-web-applications">Handling Timezones in Web Applications</Link></li>
              <li><Link href="/blog/date-formatting-cheat-sheet-iso-8601">Date Formatting Cheat Sheet — ISO 8601 and Beyond</Link></li>
              <li><Link href="/blog/sql-date-functions-cheat-sheet">SQL Date Functions Cheat Sheet</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
