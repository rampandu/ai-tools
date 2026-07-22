// pages/blog/date-formatting-cheat-sheet-iso-8601.js
import Head from 'next/head';
import Link from 'next/link';

export default function DateFormattingCheatSheetIso8601() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Date Formatting Cheat Sheet — ISO 8601, RFC 3339, and Format Tokens',
        item: 'https://dev-brains-ai.com/blog/date-formatting-cheat-sheet-iso-8601',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'ISO 8601 & RFC 3339 Date Formatting Cheat Sheet',
    description:
      'ISO 8601 anatomy, RFC 3339 differences, why ISO dates sort correctly as strings, and a format-token comparison across JavaScript, Python, and SQL.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/date-formatting-cheat-sheet-iso-8601',
    datePublished: '2026-07-16',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the ISO 8601 date format?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ISO 8601 is the international standard for writing dates and times: YYYY-MM-DD for dates and YYYY-MM-DDTHH:mm:ssZ for timestamps. Components go from largest to smallest (year first), the letter T separates date from time, and Z or a numeric offset like +05:30 indicates the timezone.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between ISO 8601 and RFC 3339?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'RFC 3339 is a stricter internet profile of ISO 8601. It requires the full date and time with an explicit timezone offset, and disallows loose ISO variants like week dates, ordinal dates, or omitting the offset. Every valid RFC 3339 timestamp is valid ISO 8601, but not the reverse.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why should I never store dates as dd/mm/yyyy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'dd/mm/yyyy is ambiguous (03/04/2026 is 3 April in India but 4 March in the US), and it does not sort correctly as a string. Store dates in ISO 8601 (YYYY-MM-DD) or as UTC timestamps, then format them per locale only at display time using Intl.DateTimeFormat or equivalent.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>ISO 8601 & RFC 3339 Date Formatting Cheat Sheet | Dev Brains AI</title>
        <meta
          name="description"
          content="ISO 8601 anatomy, RFC 3339 differences, why ISO dates sort correctly as strings, and a format-token comparison across JavaScript, Python, and SQL."
        />
        <meta
          name="keywords"
          content="iso 8601 format, date formatting cheat sheet, rfc 3339 vs iso 8601, yyyy-mm-dd format, strftime cheat sheet, date_format mysql, to_char postgresql, intl datetimeformat, date format tokens"
        />
        <meta property="og:title" content="ISO 8601 & RFC 3339 Date Formatting Cheat Sheet" />
        <meta property="og:description" content="ISO 8601 anatomy, RFC 3339 differences, why ISO dates sort correctly as strings, and a format-token comparison across JavaScript, Python, and SQL." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/date-formatting-cheat-sheet-iso-8601" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/date-formatting-cheat-sheet-iso-8601" />
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
              <li aria-current="page">Date Formatting Cheat Sheet</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Date Formatting Cheat Sheet — ISO 8601, RFC 3339, and Format Tokens Across Languages
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Dates look simple until you have to move them between a browser in Mumbai, a server in
            Frankfurt, and a database that thinks in UTC. This cheat sheet covers the one format
            every developer should default to — ISO 8601 — plus its stricter cousin RFC 3339, the
            neat trick that makes ISO dates sortable as plain strings, the golden rule of storage
            vs display, and a side-by-side reference of format tokens in JavaScript, Python, and SQL.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Anatomy of an ISO 8601 Timestamp
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            ISO 8601 arranges every component from largest to smallest — year, month, day, hour,
            minute, second — which is exactly what makes it unambiguous and sortable. A full
            timestamp breaks down like this:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`2026-07-16T14:30:05.250+05:30
└──┬─────┘│└──┬──────────┘└─┬──┘
   date    T   time          offset

2026-07-16    date part: YYYY-MM-DD (always zero-padded)
T             literal separator between date and time
14:30:05      time part: HH:mm:ss (24-hour clock)
.250          optional fractional seconds
+05:30        UTC offset (IST) — or "Z" meaning UTC itself

2026-07-16T09:00:05Z        same instant, expressed in UTC
2026-07-16                  date only — also valid ISO 8601
14:30:05                    time only — also valid ISO 8601`}
          </pre>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Z</strong> stands for &quot;Zulu time&quot; and means UTC — a zero offset.</li>
            <li><strong>+05:30</strong> means the local clock is 5 hours 30 minutes ahead of UTC (India Standard Time).</li>
            <li>A timestamp <strong>without</strong> a Z or an offset is a &quot;local&quot; time — its actual instant is ambiguous, which causes real bugs. Always include the offset in data you exchange.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            RFC 3339: The Strict Internet Profile
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            ISO 8601 is a large standard that also permits exotic forms — week dates
            (2026-W29-4), ordinal dates (2026-197), and timestamps with no offset at all.
            <strong> RFC 3339</strong> is the subset used on the internet: it requires a complete
            date and time <em>with</em> an explicit offset, and drops the exotic variants. When an
            API says &quot;ISO 8601&quot;, it almost always means RFC 3339 in practice.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Every RFC 3339 timestamp is valid ISO 8601; the reverse is not true.</li>
            <li>RFC 3339 allows a space instead of <code>T</code> as a readability concession — but for maximum compatibility, always emit the <code>T</code>.</li>
            <li>JSON Schema&apos;s <code>date-time</code> format, OpenAPI, and Kubernetes manifests all specify RFC 3339.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Superpower: ISO Dates Sort Correctly as Strings
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Because components run from largest to smallest with fixed zero-padded widths,
            <strong> lexicographic (alphabetical) order equals chronological order</strong> — as
            long as all values share the same timezone (use UTC). You can sort ISO timestamps
            with a plain string sort, no date parsing needed:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// String sort = chronological sort for ISO 8601 UTC strings
const events = [
  '2026-07-16T09:00:00Z',
  '2025-12-31T23:59:59Z',
  '2026-01-05T08:15:00Z',
];
events.sort(); // ['2025-12-31...', '2026-01-05...', '2026-07-16...']

// This is why ISO dates work in filenames, S3 keys, and log lines:
backup-2026-07-16.sql.gz   // ls sorts these chronologically
backup-2026-07-17.sql.gz

// dd/mm/yyyy fails the same test:
['16/07/2026', '05/01/2026'].sort()
// → ['05/01/2026', '16/07/2026'] only by luck — compare
//   ['02/01/2026', '15/12/2025'] which sorts WRONG`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Storage vs Display: Never Store dd/mm/yyyy
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The golden rule: <strong>store in one canonical machine format, format for humans only
            at the last moment</strong>. Locale formats like 16/07/2026 (India, UK) and 7/16/2026
            (US) are display concerns. Stored, they are ambiguous — is 03/04/2026 the 3rd of April
            or the 4th of March? — and unsortable.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Store:</strong> UTC ISO 8601 strings, or native <code>TIMESTAMP/DATETIME</code> columns, or Unix epoch integers.</li>
            <li><strong>Transmit:</strong> RFC 3339 strings in JSON (<code>&quot;2026-07-16T09:00:00Z&quot;</code>).</li>
            <li><strong>Display:</strong> convert to the user&apos;s locale and timezone in the UI layer.</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// JavaScript: locale display with Intl (no library needed)
const d = new Date('2026-07-16T09:00:00Z');

new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Asia/Kolkata',
}).format(d);
// → "16 Jul 2026, 2:30 pm"

new Intl.DateTimeFormat('en-US', { dateStyle: 'short' }).format(d);
// → "7/16/26"  (same stored value, different display)`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Format Token Cheat Sheet: JavaScript vs Python vs SQL
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Every ecosystem invented its own placeholder tokens, and mixing them up is a classic
            bug (Python&apos;s <code>%m</code> is month, but many JS libraries use <code>mm</code>
            for minutes). Here is the mapping for the most common pieces:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`Part          Python        MySQL          PostgreSQL   Example
              strftime      DATE_FORMAT    to_char
------------------------------------------------------------------
Year (4)      %Y            %Y             YYYY         2026
Year (2)      %y            %y             YY           26
Month (01)    %m            %m             MM           07
Month name    %B            %M             Month        July
Day (01)      %d            %d             DD           16
Hour 24h      %H            %H             HH24         14
Hour 12h      %I            %h             HH12         02
Minute        %M            %i             MI           30
Second        %S            %s             SS           05
AM/PM         %p            %p             AM           PM
Weekday       %A            %W             Day          Thursday

Python:      dt.strftime('%Y-%m-%d %H:%M:%S')
MySQL:       DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s')
PostgreSQL:  to_char(created_at, 'YYYY-MM-DD HH24:MI:SS')
JavaScript:  no tokens built in — use date.toISOString() for
             machines and Intl.DateTimeFormat for humans`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Watch the traps: MySQL uses <code>%i</code> for minutes (not <code>%M</code>, which is
            month name), and PostgreSQL&apos;s <code>MM</code> is month while <code>MI</code> is
            minutes. When output looks right but values are subtly wrong — minutes showing as
            months — a token mix-up is almost always the cause. To sanity-check a conversion,
            run the same instant through the <Link href="/timestamp-converter">timestamp
            converter</Link> and compare.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Quick Rules to Remember
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Default to <strong>UTC ISO 8601 / RFC 3339</strong> for storage, logs, filenames, and APIs.</li>
            <li>Always include the <strong>Z or offset</strong> — a timestamp without one is a bug waiting to happen.</li>
            <li>Format for locale <strong>only at display time</strong>, using <code>Intl.DateTimeFormat</code> in JS or <code>babel</code>/ICU in Python.</li>
            <li>Never parse dd/mm/yyyy or mm/dd/yyyy from user input without knowing the locale explicitly.</li>
            <li>Zero-pad everything — <code>2026-7-16</code> is not valid ISO 8601 and breaks string sorting.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the ISO 8601 date format?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              ISO 8601 is the international standard for writing dates and times: YYYY-MM-DD for
              dates and YYYY-MM-DDTHH:mm:ssZ for timestamps. Components go from largest to
              smallest (year first), the letter T separates date from time, and Z or a numeric
              offset like +05:30 indicates the timezone.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between ISO 8601 and RFC 3339?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              RFC 3339 is a stricter internet profile of ISO 8601. It requires the full date and
              time with an explicit timezone offset, and disallows loose ISO variants like week
              dates, ordinal dates, or omitting the offset. Every valid RFC 3339 timestamp is
              valid ISO 8601, but not the reverse.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why should I never store dates as dd/mm/yyyy?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              dd/mm/yyyy is ambiguous (03/04/2026 is 3 April in India but 4 March in the US), and
              it does not sort correctly as a string. Store dates in ISO 8601 (YYYY-MM-DD) or as
              UTC timestamps, then format them per locale only at display time using
              Intl.DateTimeFormat or equivalent.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Timestamp Converter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Convert Unix timestamps to ISO 8601 and human-readable dates — and back — with
              instant timezone conversion. No signup, no cost.
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
              <li><Link href="/blog/milliseconds-vs-seconds-timestamp-bugs">Milliseconds vs Seconds — The 1000x Timestamp Bug</Link></li>
              <li><Link href="/blog/handling-timezones-in-web-applications">Handling Timezones in Web Applications</Link></li>
              <li><Link href="/blog/sql-date-functions-cheat-sheet">SQL Date Functions Cheat Sheet</Link></li>
              <li><Link href="/blog/convert-timestamp-to-date-javascript-python-sql">Convert Timestamp to Date in JavaScript, Python, and SQL</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
