// pages/blog/handling-timezones-in-web-applications.js
import Head from 'next/head';
import Link from 'next/link';

export default function HandlingTimezonesInWebApplications() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Handling Timezones in Web Applications — A Practical Guide',
        item: 'https://dev-brains-ai.com/blog/handling-timezones-in-web-applications',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Handling Timezones in Web Applications — A Practical Guide',
    description:
      'Learn how to handle timezones correctly in web apps: store UTC, convert at display, use IANA timezone names, avoid SSR hydration bugs, and schedule events across zones.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/handling-timezones-in-web-applications',
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Should I store dates in UTC or local time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Store timestamps in UTC (or as Unix epoch values) and convert to the user’s local timezone only at display time. UTC is unambiguous, sorts correctly, and is unaffected by daylight saving time changes.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between an IANA timezone name and a UTC offset?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An IANA name like Asia/Kolkata identifies a region and all its historical and future rules, including daylight saving transitions. A fixed offset like +05:30 is only a snapshot and becomes wrong twice a year in zones that observe DST. Always persist IANA names, not offsets.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does India (IST) have daylight saving time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Indian Standard Time is fixed at UTC+5:30 all year, so Asia/Kolkata never shifts. However, apps serving users in the US, Europe, or Australia must still handle DST, because those zones change their offsets twice a year.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Handling Timezones in Web Applications — A Practical Guide | Dev Brains AI</title>
        <meta
          name="description"
          content="Store UTC, convert at display. A practical guide to timezone handling in web apps: IANA names vs offsets, JS Intl API, SSR pitfalls, scheduling, and testing tips."
        />
        <meta
          name="keywords"
          content="timezone handling web applications, store utc convert local, iana timezone names, javascript intl timezone, ist utc offset, ssr timezone hydration, daylight saving time bugs"
        />
        <meta property="og:title" content="Handling Timezones in Web Applications — A Practical Guide" />
        <meta
          property="og:description"
          content="Store UTC, convert at display. A practical guide to timezone handling in web apps: IANA names vs offsets, JS Intl API, SSR pitfalls, scheduling, and testing tips."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/handling-timezones-in-web-applications" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/handling-timezones-in-web-applications" />
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
              <li aria-current="page">Handling Timezones in Web Applications</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Handling Timezones in Web Applications — A Practical Guide
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Timezone bugs are among the most embarrassing bugs in software: a meeting reminder that
            fires an hour late, an invoice dated yesterday, a "daily" report that skips a day for
            users in Sydney. They pass every test on your machine and explode in production because
            your machine and your users do not share a clock. The good news is that timezone
            handling follows a small set of rules that, once adopted, eliminate almost all of these
            bugs. This guide covers the storage rule, IANA names versus offsets, the JavaScript
            Intl API, server-side rendering pitfalls, cross-zone scheduling, and how to actually
            test all of it.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Golden Rule: Store UTC, Convert at Display
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Every timestamp in your database, message queue, log file, and API payload should be in
            UTC — either an ISO 8601 string with a Z suffix or a Unix epoch number. Conversion to a
            human-readable local time happens exactly once, at the last possible moment: when the
            value is rendered for a specific user.
          </p>
          <p className="small" style={{ marginBottom: 12 }}>
            Why UTC? It is unambiguous (no "which 1:30 AM?" during a daylight saving fallback), it
            sorts and compares correctly as plain text or numbers, and it never shifts. Local times
            fail all three tests. If you store "2026-11-01 01:30" from a US user, you literally
            cannot know which instant it refers to — that wall-clock time occurs twice on the DST
            fallback night.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Good: unambiguous, sortable, DST-proof
created_at TIMESTAMPTZ  -- Postgres stores UTC internally
'2026-07-15T09:30:00Z'  -- ISO 8601 with Z = UTC
1784107800              -- Unix epoch seconds

-- Bad: ambiguous, breaks on DST, unsortable across users
'15/07/2026 3:00 PM'    -- whose 3 PM?`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            IANA Names vs Fixed Offsets
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            When you need to remember a user&apos;s timezone, store the IANA identifier
            (Asia/Kolkata, America/New_York, Europe/London), never a raw offset like +05:30 or
            -05:00. The difference matters because of daylight saving time.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Asia/Kolkata</strong> — always UTC+5:30. India abolished seasonal clock changes long ago, so IST never moves. Lucky us.</li>
            <li><strong>America/New_York</strong> — UTC-5:00 in winter, UTC-4:00 in summer. A stored "-05:00" is wrong for half the year.</li>
            <li><strong>Europe/London</strong> — UTC+0:00 in winter, UTC+1:00 in summer. "GMT" and "London time" are not the same thing year-round.</li>
            <li><strong>Australia/Sydney</strong> — DST in the southern hemisphere runs October to April, the opposite season from the north.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            An IANA name carries the full rule set — past and future transitions — via the tz
            database that ships with your OS, browser, and language runtimes. An offset is a
            snapshot that silently becomes wrong. Get the user&apos;s zone in the browser with
            <strong> Intl.DateTimeFormat().resolvedOptions().timeZone</strong> and persist that
            string with their profile.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Converting for Display with the JavaScript Intl API
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Modern JavaScript needs no library for display conversion. Intl.DateTimeFormat accepts
            a timeZone option and handles DST, locale conventions, and 12/24-hour preferences:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const ts = new Date('2026-07-15T09:30:00Z'); // stored UTC

// Detect the viewer's zone
const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// e.g. "Asia/Kolkata"

// Render in the viewer's zone and locale
new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: zone,
}).format(ts);
// "15 Jul 2026, 3:00 pm"

// Render the SAME instant for a New York colleague
new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'America/New_York',
}).format(ts);
// "Jul 15, 2026, 5:30 AM"`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Note that the underlying Date object never changes — it represents one instant. Only
            the formatting differs. If you need parsing, arithmetic, or "next Tuesday in this zone"
            logic, reach for a library such as date-fns-tz, Luxon, or the emerging Temporal API,
            but keep the storage format UTC regardless.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            SSR vs Client: The Hydration Trap
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            In Next.js and other SSR frameworks, the server renders HTML first and the browser
            hydrates it. If your component formats a date with the runtime&apos;s default zone, the
            server (usually running in UTC) produces one string and the client (running in the
            user&apos;s zone) produces another — a hydration mismatch warning at best, a flash of
            wrong time at worst.
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Option 1:</strong> render a stable UTC or ISO string on the server, then re-format in useEffect after mount, when the real browser zone is known.</li>
            <li><strong>Option 2:</strong> store the user&apos;s IANA zone server-side (in their profile or a cookie) and pass it explicitly to Intl on both server and client so both render identical output.</li>
            <li><strong>Option 3:</strong> use suppressHydrationWarning on the specific element as a last resort, accepting one repaint.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            The same trap exists in APIs: never let a backend format dates using its own server
            zone. Cloud servers commonly run in UTC, but a lift-and-shift VM configured for IST
            will happily bake +5:30 into every response until someone notices.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Scheduling Events Across Timezones
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Scheduling is the one case where "store UTC" needs a footnote. A one-off event
            ("deploy at 2026-08-01 02:00 UTC") stores perfectly as UTC. But a recurring
            human-anchored event — "standup at 9:30 AM every weekday" — must store the wall-clock
            time plus the IANA zone, because the correct UTC instant changes whenever that zone
            enters or leaves DST.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// Recurring event: store intent, compute instants
{
  "rule": "every weekday",
  "localTime": "09:30",
  "timeZone": "America/Chicago"
}
// Winter occurrence -> 15:30 UTC
// Summer occurrence -> 14:30 UTC (DST active)`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Compute the concrete UTC instant for each occurrence at scheduling time (or on the fly)
            using the tz database. This is also why cron jobs pinned to server time drift for
            international users — see our <Link href="/blog/cron-expression-timezone-handling-guide">cron
            timezone guide</Link> for the server-side version of this problem.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Testing Timezone Logic
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Run tests in a hostile zone.</strong> Set TZ=Pacific/Kiritimati (UTC+14) or TZ=America/New_York in CI, not UTC. Code that only works in UTC is hiding bugs.</li>
            <li><strong>Test the DST boundaries.</strong> Use fixed instants just before and after a spring-forward and a fall-back transition, plus the ambiguous repeated hour.</li>
            <li><strong>Test half-hour and 45-minute zones.</strong> Asia/Kolkata (+5:30) and Asia/Kathmandu (+5:45) catch code that assumes whole-hour offsets.</li>
            <li><strong>Freeze the clock.</strong> Use fake timers (Jest fake timers, freezegun in Python) so tests are deterministic.</li>
            <li><strong>Verify a real timestamp end to end.</strong> Paste an epoch value into a <Link href="/timestamp-converter">timestamp converter</Link> and confirm your UI shows the same instant in the target zone.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Should I store dates in UTC or local time?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Store timestamps in UTC (or as Unix epoch values) and convert to the user&apos;s local
              timezone only at display time. UTC is unambiguous, sorts correctly, and is unaffected
              by daylight saving time changes.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between an IANA timezone name and a UTC offset?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              An IANA name like Asia/Kolkata identifies a region and all its historical and future
              rules, including daylight saving transitions. A fixed offset like +05:30 is only a
              snapshot and becomes wrong twice a year in zones that observe DST. Always persist
              IANA names, not offsets.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does India (IST) have daylight saving time?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Indian Standard Time is fixed at UTC+5:30 all year, so Asia/Kolkata never shifts.
              However, apps serving users in the US, Europe, or Australia must still handle DST,
              because those zones change their offsets twice a year.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Timestamp Converter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Convert Unix timestamps to human-readable dates in any timezone — and back — right in
              your browser. No signup, no cost.
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
              <li><Link href="/blog/milliseconds-vs-seconds-timestamp-bugs">Milliseconds vs Seconds — The 1000× Timestamp Bug</Link></li>
              <li><Link href="/blog/date-formatting-cheat-sheet-iso-8601">Date Formatting Cheat Sheet — ISO 8601 and Beyond</Link></li>
              <li><Link href="/blog/cron-expression-timezone-handling-guide">Cron Expression Timezone Handling Guide</Link></li>
              <li><Link href="/blog/convert-timestamp-to-date-javascript-python-sql">Convert Timestamp to Date in JavaScript, Python, and SQL</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
