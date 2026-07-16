// pages/blog/convert-timestamp-to-date-javascript-python-sql.js
import Head from 'next/head';
import Link from 'next/link';

export default function ConvertTimestampToDateCookbook() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Convert a Timestamp to a Date in JavaScript, Python, and SQL',
        item: 'https://dev-brains-ai.com/blog/convert-timestamp-to-date-javascript-python-sql',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'How to Convert a Timestamp to a Date in JavaScript, Python, and SQL',
    description:
      'A conversion cookbook for Unix timestamps: JavaScript Date and Intl.DateTimeFormat, Python datetime.fromtimestamp, MySQL FROM_UNIXTIME, and PostgreSQL to_timestamp — with runnable snippets and the seconds vs milliseconds gotcha.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/convert-timestamp-to-date-javascript-python-sql',
    datePublished: '2026-07-14',
    dateModified: '2026-07-14',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I convert a Unix timestamp to a date in JavaScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Multiply the Unix timestamp (seconds) by 1000 and pass it to the Date constructor: new Date(1720000000 * 1000). JavaScript Date expects milliseconds, so passing raw seconds gives you a date in January 1970.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert a timestamp to a date in Python?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use datetime.fromtimestamp(ts, tz=timezone.utc) from the datetime module. Always pass an explicit timezone — calling fromtimestamp without one returns local time, which changes behaviour between your laptop and your server.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the SQL function to convert a Unix timestamp to a date?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In MySQL use FROM_UNIXTIME(ts), and in PostgreSQL use to_timestamp(ts). To go the other way, MySQL has UNIX_TIMESTAMP(datetime) and PostgreSQL has extract(epoch from timestamp).',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>How to Convert a Timestamp to a Date in JavaScript, Python, and SQL | Dev Brains AI</title>
        <meta
          name="description"
          content="Convert Unix timestamps to human-readable dates in JavaScript, Python, MySQL, and PostgreSQL. Copy-paste snippets, both directions, plus the seconds vs milliseconds trap."
        />
        <meta
          name="keywords"
          content="convert timestamp to date, unix timestamp to date javascript, python fromtimestamp, from_unixtime mysql, to_timestamp postgresql, epoch to date, timestamp converter, unix time conversion"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/convert-timestamp-to-date-javascript-python-sql" />
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
              <li aria-current="page">Convert Timestamp to Date</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How to Convert a Timestamp to a Date in JavaScript, Python, and SQL
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Every backend log, JWT token, analytics event, and database row eventually hands you a
            number like <strong>1720000000</strong> and expects you to know what moment in time it
            represents. This is a Unix timestamp — the count of seconds since 1 January 1970 UTC —
            and converting it to a readable date is one of the most repeated tasks in day-to-day
            development. This cookbook collects the exact snippets you need for JavaScript, Python,
            MySQL, and PostgreSQL, in both directions, along with the one gotcha that causes more
            bugs than everything else combined: seconds versus milliseconds.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            JavaScript: new Date(), Date.now(), and Intl.DateTimeFormat
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            JavaScript is the language where the seconds-vs-milliseconds trap bites first, because
            the <strong>Date constructor expects milliseconds</strong>, while almost every API and
            database hands you seconds. Multiply by 1000 when converting a Unix timestamp:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Unix timestamp (seconds) -> Date object
const ts = 1720000000;               // seconds since epoch
const date = new Date(ts * 1000);    // Date wants milliseconds!

console.log(date.toISOString());     // "2024-07-03T09:46:40.000Z"
console.log(date.toLocaleString());  // local time, e.g. "3/7/2024, 3:16:40 pm" in IST

// Current time, both units
Date.now();                          // 1752537600000  (milliseconds)
Math.floor(Date.now() / 1000);       // 1752537600     (seconds, Unix style)

// Date object -> Unix timestamp
Math.floor(date.getTime() / 1000);   // back to 1720000000`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            For display in a specific format or timezone, skip manual string building and use
            <strong> Intl.DateTimeFormat</strong>, which is built into every modern browser and
            Node.js:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const fmt = new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Asia/Kolkata',
});
fmt.format(new Date(1720000000 * 1000));
// "3 Jul 2024, 3:16 pm"`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Python: datetime.fromtimestamp and .timestamp()
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Python&apos;s <strong>datetime</strong> module works in seconds (as a float), so no
            multiplication is needed — but there is a different trap. Calling
            <strong> fromtimestamp()</strong> without a timezone returns <em>local</em> time, which
            means the same code produces different results on your laptop (IST) and your server
            (usually UTC). Always pass a timezone explicitly:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`from datetime import datetime, timezone

ts = 1720000000

# Timestamp -> aware datetime (recommended: always pass tz)
dt_utc = datetime.fromtimestamp(ts, tz=timezone.utc)
print(dt_utc)                # 2024-07-03 09:46:40+00:00
print(dt_utc.isoformat())    # "2024-07-03T09:46:40+00:00"

# Display in IST using zoneinfo (Python 3.9+)
from zoneinfo import ZoneInfo
dt_ist = datetime.fromtimestamp(ts, tz=ZoneInfo("Asia/Kolkata"))
print(dt_ist)                # 2024-07-03 15:16:40+05:30

# Datetime -> timestamp
dt_utc.timestamp()           # 1720000000.0
int(datetime.now(tz=timezone.utc).timestamp())  # current Unix time`}
          </pre>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Avoid datetime.utcnow()</strong> — it returns a naive datetime (no tzinfo) and is deprecated since Python 3.12. Use <strong>datetime.now(timezone.utc)</strong> instead.</li>
            <li>Calling <strong>.timestamp()</strong> on a naive datetime assumes local time, which silently shifts the value by your machine&apos;s UTC offset.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            MySQL: FROM_UNIXTIME and UNIX_TIMESTAMP
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            MySQL has a matched pair of functions. <strong>FROM_UNIXTIME()</strong> converts a
            number into a DATETIME, and <strong>UNIX_TIMESTAMP()</strong> goes back the other way.
            Both respect the session <strong>time_zone</strong> variable, so check what your
            connection is set to before trusting the output:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Timestamp -> datetime
SELECT FROM_UNIXTIME(1720000000);
-- 2024-07-03 09:46:40   (when time_zone = '+00:00')

-- With a custom display format
SELECT FROM_UNIXTIME(1720000000, '%d %b %Y %h:%i %p');
-- 03 Jul 2024 09:46 AM

-- Datetime -> timestamp
SELECT UNIX_TIMESTAMP('2024-07-03 09:46:40');   -- 1720000000
SELECT UNIX_TIMESTAMP();                        -- current Unix time

-- Filter rows stored as epoch seconds
SELECT * FROM events
WHERE created_at >= UNIX_TIMESTAMP('2024-07-01')
  AND created_at <  UNIX_TIMESTAMP('2024-08-01');`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            PostgreSQL: to_timestamp and extract(epoch)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            PostgreSQL uses <strong>to_timestamp()</strong> to turn epoch seconds into a
            <strong> timestamptz</strong> (timestamp with time zone), and
            <strong> extract(epoch from ...)</strong> to convert back:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Timestamp -> timestamptz
SELECT to_timestamp(1720000000);
-- 2024-07-03 09:46:40+00

-- Display in IST
SELECT to_timestamp(1720000000) AT TIME ZONE 'Asia/Kolkata';
-- 2024-07-03 15:16:40

-- Timestamptz -> epoch seconds
SELECT extract(epoch FROM timestamptz '2024-07-03 09:46:40+00');
-- 1720000000

-- Current Unix time
SELECT extract(epoch FROM now())::bigint;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Note that <strong>extract(epoch ...)</strong> returns a numeric with fractional
            seconds; cast to <strong>bigint</strong> when you need a clean integer. Also,
            <strong> to_timestamp()</strong> happily accepts a millisecond value and produces a
            date tens of thousands of years in the future — divide by 1000 first if your source is
            in milliseconds.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Gotchas That Cause Real Bugs
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Seconds vs milliseconds</strong> — Unix timestamps are 10 digits today; JavaScript milliseconds are 13. A date showing January 1970 means you passed seconds where milliseconds were expected; a date in the year 56789 means the opposite.</li>
            <li><strong>Implicit local time</strong> — Python&apos;s <strong>fromtimestamp()</strong> without tz, MySQL&apos;s session time_zone, and JavaScript&apos;s <strong>toLocaleString()</strong> all depend on environment settings. Be explicit everywhere.</li>
            <li><strong>Float precision</strong> — Python and PostgreSQL return fractional seconds. Truncate deliberately with <strong>int()</strong> or <strong>::bigint</strong> rather than letting rounding decide.</li>
            <li><strong>String timestamps</strong> — JSON delivers numbers as strings more often than you expect. <strong>new Date(&quot;1720000000000&quot;)</strong> is Invalid Date; parse with <strong>Number()</strong> first.</li>
            <li><strong>Negative timestamps</strong> — dates before 1970 are valid negative values. All four environments handle them, but naive validation like <strong>ts &gt; 0</strong> rejects them.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I convert a Unix timestamp to a date in JavaScript?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Multiply the Unix timestamp (seconds) by 1000 and pass it to the Date constructor:
              <strong> new Date(1720000000 * 1000)</strong>. JavaScript Date expects milliseconds,
              so passing raw seconds gives you a date in January 1970.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I convert a timestamp to a date in Python?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use <strong>datetime.fromtimestamp(ts, tz=timezone.utc)</strong> from the datetime
              module. Always pass an explicit timezone — calling fromtimestamp without one returns
              local time, which changes behaviour between your laptop and your server.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the SQL function to convert a Unix timestamp to a date?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              In MySQL use <strong>FROM_UNIXTIME(ts)</strong>, and in PostgreSQL use
              <strong> to_timestamp(ts)</strong>. To go the other way, MySQL has
              <strong> UNIX_TIMESTAMP(datetime)</strong> and PostgreSQL has
              <strong> extract(epoch from timestamp)</strong>.
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
              <li><Link href="/blog/unix-timestamp-explained-epoch-time-guide">Unix Timestamp Explained — The Complete Epoch Time Guide</Link></li>
              <li><Link href="/blog/milliseconds-vs-seconds-timestamp-bugs">Milliseconds vs Seconds: The 1000× Timestamp Bug</Link></li>
              <li><Link href="/blog/handling-timezones-in-web-applications">Handling Timezones in Web Applications</Link></li>
              <li><Link href="/blog/date-formatting-cheat-sheet-iso-8601">Date Formatting Cheat Sheet: ISO 8601 and Beyond</Link></li>
              <li><Link href="/blog/sql-date-functions-cheat-sheet">SQL Date Functions Cheat Sheet</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
