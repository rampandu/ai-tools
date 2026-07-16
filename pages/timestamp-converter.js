// pages/timestamp-converter.js
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const FAQ = [
  {
    q: 'Is this Unix Timestamp Converter free?',
    a: 'Yes — the Unix Timestamp Converter on Dev Brains AI is completely free to use, with no signup required.',
  },
  {
    q: 'Does my data get sent to a server?',
    a: 'No. All conversions run entirely in your browser using the JavaScript Date API. Nothing you type is uploaded, logged, or stored on our servers.',
  },
  {
    q: 'How does the tool tell seconds from milliseconds?',
    a: 'By magnitude. Values greater than 1,000,000,000,000 (1e12) are treated as milliseconds, smaller values as seconds. A unix timestamp in seconds will not exceed 1e12 until the year 33658, so the heuristic is safe for any realistic date — and the tool always tells you which unit it detected.',
  },
  {
    q: 'What timezone are the results in?',
    a: 'The "local time" result uses your browser and operating system timezone. The UTC and ISO 8601 results are always in Coordinated Universal Time (UTC), which is what unix timestamps represent.',
  },
  {
    q: 'Can I convert a date back to a unix timestamp?',
    a: 'Yes — use the second section. Pick a date and time with the date picker and the tool shows the corresponding unix timestamp in both seconds and milliseconds, interpreted in your local timezone.',
  },
];

function detectAndParse(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return { error: 'Enter a unix timestamp first.' };
  if (!/^-?\d+(\.\d+)?$/.test(trimmed)) {
    return { error: 'That does not look like a number. Enter digits only, e.g. 1752480000.' };
  }
  const num = Number(trimmed);
  if (!Number.isFinite(num)) return { error: 'Number is too large to parse.' };
  const isMs = Math.abs(num) > 1e12;
  const ms = isMs ? num : num * 1000;
  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) {
    return { error: 'That timestamp is outside the range JavaScript dates can represent.' };
  }
  return { date, isMs, ms };
}

function relativeTime(ms, nowMs) {
  const diff = ms - nowMs;
  const abs = Math.abs(diff);
  const future = diff > 0;
  let value;
  let unit;
  if (abs < 60 * 1000) {
    value = Math.round(abs / 1000);
    unit = 'second';
  } else if (abs < 60 * 60 * 1000) {
    value = Math.round(abs / (60 * 1000));
    unit = 'minute';
  } else if (abs < 24 * 60 * 60 * 1000) {
    value = Math.round(abs / (60 * 60 * 1000));
    unit = 'hour';
  } else if (abs < 365.25 * 24 * 60 * 60 * 1000) {
    value = Math.round(abs / (24 * 60 * 60 * 1000));
    unit = 'day';
  } else {
    value = Math.round((abs / (365.25 * 24 * 60 * 60 * 1000)) * 10) / 10;
    unit = 'year';
  }
  const plural = value === 1 ? unit : `${unit}s`;
  if (value === 0) return 'just now';
  return future ? `in ${value} ${plural}` : `${value} ${plural} ago`;
}

export default function TimestampConverterPage() {
  const [nowSec, setNowSec] = useState(null); // set in useEffect to avoid hydration mismatch
  const [tsInput, setTsInput] = useState('1752480000');
  const [tsResult, setTsResult] = useState(null);
  const [tsError, setTsError] = useState(null);
  const [dtInput, setDtInput] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setNowSec(Math.floor(Date.now() / 1000));
    const id = setInterval(() => {
      setNowSec(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  function handleConvertTimestamp(value) {
    const parsed = detectAndParse(value !== undefined ? value : tsInput);
    if (parsed.error) {
      setTsError(parsed.error);
      setTsResult(null);
      return;
    }
    setTsError(null);
    setTsResult({
      detected: parsed.isMs ? 'milliseconds' : 'seconds',
      local: parsed.date.toString(),
      utc: parsed.date.toUTCString(),
      iso: parsed.date.toISOString(),
      relative: relativeTime(parsed.ms, Date.now()),
    });
  }

  function handleNow() {
    const now = String(Math.floor(Date.now() / 1000));
    setTsInput(now);
    handleConvertTimestamp(now);
  }

  function handleCopyNow() {
    if (nowSec !== null) {
      navigator.clipboard?.writeText(String(nowSec));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  let dtResult = null;
  let dtError = null;
  if (dtInput) {
    const d = new Date(dtInput);
    if (Number.isNaN(d.getTime())) {
      dtError = 'Invalid date/time value.';
    } else {
      dtResult = { seconds: Math.floor(d.getTime() / 1000), ms: d.getTime() };
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
    name: 'Dev Brains AI Unix Timestamp Converter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description:
      'Free two-way unix timestamp converter that runs entirely in your browser. Convert epoch seconds or milliseconds to local, UTC, ISO 8601 and relative time — and dates back to timestamps.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Unix Timestamp Converter',
        item: 'https://dev-brains-ai.com/timestamp-converter',
      },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free Unix Timestamp Converter — Epoch to Date &amp; Back | Dev Brains AI</title>
        <meta
          name="description"
          content="Convert unix timestamps to human-readable dates (local, UTC, ISO 8601, relative time) and dates back to epoch seconds or milliseconds. Auto-detects seconds vs milliseconds. Free, 100% in-browser."
        />
        <meta
          name="keywords"
          content="unix timestamp converter, epoch converter, timestamp to date, date to timestamp, epoch to date, unix time converter, Dev Brains AI"
        />
        <meta property="og:title" content="Free Unix Timestamp Converter — Epoch to Date &amp; Back" />
        <meta
          property="og:description"
          content="Two-way unix timestamp converter with live current-epoch ticker, seconds/milliseconds auto-detection, UTC, ISO 8601 and relative time output. Runs 100% in your browser."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/timestamp-converter" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/timestamp-converter" />

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
            <li aria-current="page">Unix Timestamp Converter</li>
          </ol>
        </nav>

        <h1>Free Unix Timestamp Converter</h1>
        <p className="small">
          Convert <strong>unix timestamps</strong> (epoch time) to human-readable dates and back.
          Seconds vs milliseconds are detected automatically, and results include local time, UTC,
          ISO 8601, and relative time. Everything runs in your browser.
        </p>

        {/* Live ticker */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
            background: '#0f172a',
            color: '#e2e8f0',
            padding: '10px 14px',
            borderRadius: 8,
            marginTop: 8,
          }}
        >
          <span className="small">Current unix timestamp:</span>
          <strong style={{ fontFamily: 'monospace', fontSize: '1.15rem' }}>
            {nowSec !== null ? nowSec : '…'}
          </strong>
          <button type="button" className="small" onClick={handleCopyNow} disabled={nowSec === null}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        {/* Section A: timestamp -> date */}
        <h2 style={{ fontSize: '1.15rem', marginTop: 18, marginBottom: 6 }}>
          Timestamp → Date
        </h2>
        <label htmlFor="ts-input">
          <strong>Unix timestamp (seconds or milliseconds)</strong>
        </label>
        <input
          id="ts-input"
          type="text"
          inputMode="numeric"
          aria-label="Unix timestamp to convert"
          value={tsInput}
          onChange={(e) => setTsInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleConvertTimestamp();
          }}
          placeholder="e.g. 1752480000 or 1752480000000"
          style={{ fontFamily: 'monospace' }}
        />
        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={() => handleConvertTimestamp()}>
            Convert
          </button>
          <button type="button" onClick={handleNow}>
            Now
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          {tsError && (
            <div role="alert" style={{ color: 'crimson' }}>
              <strong>Error:</strong> {tsError}
            </div>
          )}
          {tsResult && (
            <div className="small">
              <p style={{ margin: '4px 0' }}>
                <strong>Detected unit:</strong> {tsResult.detected}
              </p>
              <p style={{ margin: '4px 0' }}>
                <strong>Local time:</strong>{' '}
                <span style={{ fontFamily: 'monospace' }}>{tsResult.local}</span>
              </p>
              <p style={{ margin: '4px 0' }}>
                <strong>UTC:</strong>{' '}
                <span style={{ fontFamily: 'monospace' }}>{tsResult.utc}</span>
              </p>
              <p style={{ margin: '4px 0' }}>
                <strong>ISO 8601:</strong>{' '}
                <span style={{ fontFamily: 'monospace' }}>{tsResult.iso}</span>
              </p>
              <p style={{ margin: '4px 0' }}>
                <strong>Relative:</strong> {tsResult.relative}
              </p>
            </div>
          )}
          {!tsResult && !tsError && (
            <div className="small">
              No result yet — press <strong>Convert</strong> or <strong>Now</strong>.
            </div>
          )}
        </div>

        {/* Section B: date -> timestamp */}
        <h2 style={{ fontSize: '1.15rem', marginTop: 22, marginBottom: 6 }}>
          Date → Timestamp
        </h2>
        <label htmlFor="dt-input">
          <strong>Pick a date and time (your local timezone)</strong>
        </label>
        <input
          id="dt-input"
          type="datetime-local"
          aria-label="Date and time to convert to a unix timestamp"
          value={dtInput}
          onChange={(e) => setDtInput(e.target.value)}
          style={{ fontFamily: 'monospace' }}
        />
        <div style={{ marginTop: 10 }}>
          {dtError && (
            <div role="alert" style={{ color: 'crimson' }}>
              <strong>Error:</strong> {dtError}
            </div>
          )}
          {dtResult && (
            <div className="small">
              <p style={{ margin: '4px 0' }}>
                <strong>Unix seconds:</strong>{' '}
                <span style={{ fontFamily: 'monospace' }}>{dtResult.seconds}</span>
              </p>
              <p style={{ margin: '4px 0' }}>
                <strong>Unix milliseconds:</strong>{' '}
                <span style={{ fontFamily: 'monospace' }}>{dtResult.ms}</span>
              </p>
            </div>
          )}
          {!dtResult && !dtError && (
            <div className="small">Pick a date above to see its unix timestamp.</div>
          )}
        </div>
      </div>

      {/* SEO Content */}
      <div className="card">
        <h2>About this Unix Timestamp Converter</h2>
        <p>
          Unix time (also called epoch time or POSIX time) counts the number of seconds elapsed
          since 00:00:00 UTC on 1 January 1970. It is the universal machine format for dates:
          databases store it, APIs exchange it, log files are full of it, and JWTs use it for
          expiry claims. The catch is that a raw number like <code>1752480000</code> means nothing
          to a human — and that is where this converter comes in. Paste any timestamp and get the
          local time, UTC time, ISO 8601 string, and a plain-English relative time
          (&quot;3 days ago&quot;, &quot;in 2 hours&quot;) instantly, entirely in your browser.
        </p>

        <h3>Seconds vs milliseconds — the classic bug</h3>
        <p>
          Unix timestamps come in two common flavors. POSIX systems, most databases, and JWT
          claims use <strong>seconds</strong>; JavaScript&apos;s <code>Date.now()</code>, Java&apos;s{' '}
          <code>System.currentTimeMillis()</code>, and many logging systems use{' '}
          <strong>milliseconds</strong>. Mixing them up produces dates in 1970 (milliseconds
          treated as seconds are about 20 days after the epoch) or tens of thousands of years in
          the future (seconds multiplied by 1000 twice). This tool auto-detects the unit: values
          above 1e12 are treated as milliseconds, everything else as seconds, and the detected unit
          is always shown so you can sanity-check the assumption.
        </p>

        <h3>Which output format should you use?</h3>
        <ul>
          <li>
            <strong>ISO 8601</strong> (<code>2026-07-14T08:00:00.000Z</code>) — the best choice for
            APIs, logs, and anything machine-readable. It sorts lexicographically and is
            unambiguous about timezone.
          </li>
          <li>
            <strong>UTC string</strong> — human-readable and timezone-neutral; good for comparing
            events across servers in different regions.
          </li>
          <li>
            <strong>Local time</strong> — what your users actually experience; useful when
            debugging &quot;it happened at 3pm&quot; reports against server logs.
          </li>
          <li>
            <strong>Relative time</strong> — the quickest gut-check: is this token expired, is this
            log entry recent, did this cron job actually run last night?
          </li>
        </ul>

        <h3>Tips for working with timestamps</h3>
        <ul>
          <li>
            Store timestamps in UTC and convert to local time only at the display layer — never
            store local times without an offset.
          </li>
          <li>
            In JavaScript, <code>new Date(ts)</code> expects milliseconds; multiply unix seconds by
            1000 first.
          </li>
          <li>
            The &quot;year 2038 problem&quot; affects systems storing seconds in signed 32-bit
            integers, which overflow on 19 January 2038. Use 64-bit integers for timestamp storage.
          </li>
          <li>
            When scheduling jobs across timezones, remember that cron runs in the server&apos;s
            timezone by default — see our{' '}
            <Link href="/blog/cron-expression-timezone-handling-guide">
              cron timezone handling guide
            </Link>{' '}
            for the pitfalls.
          </li>
          <li>
            The date-to-timestamp section interprets your input in your local timezone, matching
            how a form input would behave in your app.
          </li>
        </ul>

        <h3>Common use cases</h3>
        <ul>
          <li>Checking whether a JWT <code>exp</code> claim has passed.</li>
          <li>Translating <code>created_at</code> values from database dumps or API responses.</li>
          <li>Correlating log lines from different services during an incident.</li>
          <li>Generating test fixtures with known timestamps.</li>
          <li>Verifying that a scheduled job ran when it should have.</li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>FAQ: Unix Timestamp Converter</h3>
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
          Scheduling something? Build the schedule with our{' '}
          <Link href="/cron-generator">Cron Expression Generator</Link>. To learn more, read{' '}
          <Link href="/blog/unix-timestamp-explained-epoch-time-guide">
            Unix Timestamps Explained: A Guide to Epoch Time
          </Link>
          ,{' '}
          <Link href="/blog/cron-expression-timezone-handling-guide">
            Cron Expression Timezone Handling
          </Link>
          , and the{' '}
          <Link href="/blog/sql-date-functions-cheat-sheet">SQL Date Functions Cheat Sheet</Link>.
        </p>
      </div>
    </div>
  );
}
