// pages/blog/cron-expression-examples-every-5-minutes.js
import Head from 'next/head';
import Link from 'next/link';

export default function CronExpressionExamplesEvery5Minutes() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Cron Expression Examples for Every 5, 10, 15, 30 Minutes and More',
        item: 'https://dev-brains-ai.com/blog/cron-expression-examples-every-5-minutes',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Cron Every 5 Minutes: Expression + Examples',
    description:
      'Every 5, 10, 15 and 30-minute cron patterns, field by field — plus the overlap and scheduler-delay gotchas that break them in production.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/cron-expression-examples-every-5-minutes',
    datePublished: '2026-07-11',
    dateModified: '2026-09-04',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the cron expression for every 5 minutes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The cron expression for every 5 minutes is */5 * * * *. The step value /5 in the minute field tells cron to run at minute 0, 5, 10, 15, 20, and so on through 55.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I run a cron job every 30 minutes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use */30 * * * * to run at minute 0 and minute 30 of every hour. Alternatively you can write 0,30 * * * * which does the same thing explicitly.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between */5 and 5 in the minute field?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '*/5 means every 5 minutes starting from 0 (0, 5, 10...55). A plain 5 means the job runs once, only at minute 5 of every hour. They are not interchangeable.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the cron expression for every 10 minutes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The cron expression for every 10 minutes is */10 * * * *. That fires at minute 0, 10, 20, 30, 40, and 50 of every hour — six runs per hour, evenly spaced.',
        },
      },
      {
        '@type': 'Question',
        name: "Why doesn't my every-5-minutes cron job run exactly every 5 minutes?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Two common causes: the scheduler queues or delays runs under load (GitHub Actions explicitly warns about this at its 5-minute minimum), or the previous run is still executing when the next one is due and your platform skips or queues the overlap. Add a lock file or an in-process flag so overlapping runs are skipped instead of silently piling up.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Cron Every 5 Minutes: Expression + Examples | Dev Brains AI</title>
        <meta
          name="description"
          content="Every 5, 10, 15 and 30-minute cron patterns, field by field — plus the overlap and scheduler-delay gotchas that break them in production."
        />
        <meta
          name="keywords"
          content="cron every 5 minutes, cron expression every 15 minutes, cron every 30 minutes, cron every hour, cron step values, cron expression examples"
        />
        <meta property="og:title" content="Cron Every 5 Minutes: Expression + Examples" />
        <meta
          property="og:description"
          content="Every 5, 10, 15 and 30-minute cron patterns, field by field — plus the overlap and scheduler-delay gotchas that break them in production."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/cron-expression-examples-every-5-minutes" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/cron-expression-examples-every-5-minutes" />
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
              <li aria-current="page">Cron Expression Examples — Every N Minutes</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Cron Expression Examples for Every 5, 10, 15, 30 Minutes and More
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            "Run this every N minutes" is probably the single most common cron requirement —
            polling an API, refreshing a cache, checking a queue, or syncing data. It is also the
            one developers get wrong most often, usually by confusing a step value with a fixed
            value. This guide walks through every common minute-based and hour-based interval with
            copy-paste-ready expressions. For the full field-by-field syntax reference, see our{' '}
            <Link href="/blog/cron-expression-complete-guide">cron expression complete guide</Link>.
            Already know the interval you need?{' '}
            <Link href="/cron-generator">Skip to the Cron Expression Generator →</Link>
          </p>

          <svg viewBox="0 0 640 210" style={{ width: '100%', height: 'auto', marginBottom: 18, borderRadius: 8, background: '#0f172a' }} role="img" aria-label="Diagram of the five cron fields, with the minute field highlighted showing a step value of 5">
            <text x="320" y="20" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="ui-monospace, monospace">A cron expression always has exactly 5 fields, left to right</text>

            <rect x="16" y="36" width="112" height="104" rx="8" fill="#0d3b34" stroke="#14b8a6" />
            <text x="72" y="70" textAnchor="middle" fill="#5eead4" fontSize="22" fontFamily="ui-monospace, monospace">*/5</text>
            <text x="72" y="98" textAnchor="middle" fill="#d1fae5" fontSize="11" fontFamily="ui-monospace, monospace">MINUTE</text>
            <text x="72" y="120" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="ui-monospace, monospace">0–59, step 5</text>

            <rect x="136" y="36" width="112" height="104" rx="8" fill="#1e293b" stroke="#334155" />
            <text x="192" y="70" textAnchor="middle" fill="#e2e8f0" fontSize="20" fontFamily="ui-monospace, monospace">*</text>
            <text x="192" y="98" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="ui-monospace, monospace">HOUR</text>
            <text x="192" y="120" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="ui-monospace, monospace">0–23</text>

            <rect x="256" y="36" width="112" height="104" rx="8" fill="#1e293b" stroke="#334155" />
            <text x="312" y="70" textAnchor="middle" fill="#e2e8f0" fontSize="20" fontFamily="ui-monospace, monospace">*</text>
            <text x="312" y="98" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="ui-monospace, monospace">DAY (month)</text>
            <text x="312" y="120" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="ui-monospace, monospace">1–31</text>

            <rect x="376" y="36" width="112" height="104" rx="8" fill="#1e293b" stroke="#334155" />
            <text x="432" y="70" textAnchor="middle" fill="#e2e8f0" fontSize="20" fontFamily="ui-monospace, monospace">*</text>
            <text x="432" y="98" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="ui-monospace, monospace">MONTH</text>
            <text x="432" y="120" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="ui-monospace, monospace">1–12</text>

            <rect x="496" y="36" width="112" height="104" rx="8" fill="#1e293b" stroke="#334155" />
            <text x="552" y="70" textAnchor="middle" fill="#e2e8f0" fontSize="20" fontFamily="ui-monospace, monospace">*</text>
            <text x="552" y="98" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="ui-monospace, monospace">DAY (week)</text>
            <text x="552" y="120" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="ui-monospace, monospace">0–6</text>

            <text x="320" y="190" textAnchor="middle" fill="#34d399" fontSize="13" fontFamily="ui-monospace, monospace">*/5 * * * *  →  fires at :00, :05, :10 ... :55, every hour, every day</text>
          </svg>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            How the step syntax (<code>/</code>) works
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A standard cron expression has five fields: minute, hour, day-of-month, month, and
            day-of-week. The <code>/</code> character defines a "step" within a range. When you
            write <code>*/5</code> in the minute field, you are saying "starting from the full
            range (0–59), take every 5th value" — which gives 0, 5, 10, 15 ... 55. It does{' '}
            <strong>not</strong> mean "every 5 minutes from now" — cron always aligns to the clock,
            not to when the job was last triggered or when you deployed it.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`┌─ minute        (0 – 59)
│ ┌─ hour         (0 – 23)
│ │ ┌─ day/month  (1 – 31)
│ │ │ ┌─ month    (1 – 12)
│ │ │ │ ┌─ day/week (0 – 6)
│ │ │ │ │
*/5 * * * *   → every 5 minutes`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common minute intervals
          </h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><code>*/1 * * * *</code> — every minute (same as <code>* * * * *</code>)</li>
            <li><code>*/5 * * * *</code> — every 5 minutes (00, 05, 10, 15 ... 55)</li>
            <li><code>*/10 * * * *</code> — every 10 minutes (00, 10, 20, 30, 40, 50)</li>
            <li><code>*/15 * * * *</code> — every 15 minutes (00, 15, 30, 45)</li>
            <li><code>*/20 * * * *</code> — every 20 minutes (00, 20, 40)</li>
            <li><code>*/30 * * * *</code> — every 30 minutes (00, 30)</li>
            <li><code>0,15,30,45 * * * *</code> — identical to <code>*/15</code>, written explicitly</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Hourly and every-N-hours intervals
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The same step logic applies to the hour field once you fix the minute field to a
            single value (usually <code>0</code>, so the job runs on the hour):
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`0 * * * *      → every hour, on the hour
0 */2 * * *    → every 2 hours (00:00, 02:00, 04:00 ...)
0 */3 * * *    → every 3 hours
0 */6 * * *    → every 6 hours (4 runs a day)
0 */12 * * *   → every 12 hours (midnight and noon)
0,30 * * * *   → twice an hour, at :00 and :30
15 * * * *     → once an hour, at 15 minutes past`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Combining minute and hour steps
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            You can combine a minute step with a restricted hour range for schedules like
            "every 10 minutes, but only during business hours":
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`*/10 9-17 * * 1-5   → every 10 minutes, 9 AM–5:50 PM, Mon–Fri
*/5 0-5 * * *       → every 5 minutes, only between midnight and 5:59 AM
*/15 8-20 * * *      → every 15 minutes, 8 AM to 8:45 PM`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Remember that every time in these expressions is evaluated against whatever clock the
            scheduler uses — a <code>9-17</code> business-hours restriction means something
            different on a server set to UTC than one set to IST. If the wall-clock time actually
            matters, read <Link href="/blog/cron-expression-timezone-handling-guide">how cron handles timezones</Link>{' '}
            before you rely on it.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Mistakes with Every-N-Minute Schedules
          </h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><strong>Steps don't need to divide evenly.</strong> <code>*/7</code> runs at 0, 7, 14, 21 ... 56 — the last gap before wraparound is shorter than 7 minutes. Prefer divisors of 60 (5, 10, 15, 20, 30) for clean, evenly spaced runs.</li>
            <li><strong>node-cron and Quartz add a seconds field.</strong> If your library shows six fields, <code>*/5 * * * * *</code> means every 5 seconds, not minutes — always check the library's docs before assuming standard 5-field cron.</li>
            <li><strong>GitHub Actions caps frequency at 5 minutes</strong> and even that is a soft minimum — busy periods can delay runs. Don't rely on exact timing for sub-5-minute jobs there.</li>
            <li><strong>High-frequency jobs risk overlap.</strong> If a job scheduled every 5 minutes sometimes takes longer than 5 minutes to finish, add a lock file or a mutex so a new run never starts while the previous one is still going.</li>
            <li><strong>Assuming */5 respects a custom starting offset.</strong> The step always starts counting from 0 within the field's range, so <code>*/5</code> is always 0, 5, 10 ... 55 — you cannot make it start at :02. For an offset schedule like "2, 7, 12 ... 57," write the explicit list instead of a step.</li>
            <li><strong>Forgetting which timezone "every 5 minutes" runs in.</strong> The interval itself never changes, but the clock it's measured against can — a misconfigured server timezone shifts every run by the same amount. See <Link href="/blog/cron-expression-timezone-handling-guide">how cron handles timezones</Link> before relying on business-hours restrictions like the example above.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Putting It Together: A Real Health-Check Job Every 5 Minutes
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Here's a more realistic version of an "every 5 minutes" job — a health check that
            pings an API only during business hours, and guards against overlapping runs if a
            check ever hangs past its own 5-minute window:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# crontab -e
*/5 9-18 * * 1-5 /opt/scripts/health-check.sh >> /var/log/health-check.log 2>&1`}
          </pre>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`#!/bin/bash
# health-check.sh — skip this run if the previous one is still active
LOCK=/tmp/health-check.lock
if [ -e "$LOCK" ]; then
  echo "$(date): previous run still active, skipping" >> /var/log/health-check.log
  exit 0
fi
touch "$LOCK"
trap 'rm -f "$LOCK"' EXIT

curl -sf --max-time 240 https://api.example.com/health || \\
  echo "$(date): health check failed" >> /var/log/health-check.log`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The lock file plus a <code>trap</code> on exit is the same overlap protection listed
            above, just implemented in shell instead of application code. If you'd rather run this
            check from inside a running Node.js or Python service instead of the system crontab,
            compare the trade-offs in <Link href="/blog/cron-vs-setinterval-nodejs">cron vs setInterval in Node.js</Link>{' '}
            or see <Link href="/blog/cron-jobs-python-schedule-library-guide">cron jobs with Python&apos;s schedule library and APScheduler</Link>.
            Either way, the free <Link href="/cron-generator">Cron Expression Generator</Link> turns
            a plain-English description straight into the expression above.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the cron expression for every 5 minutes?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The cron expression for every 5 minutes is <code>*/5 * * * *</code>. The step value
              <code> /5</code> in the minute field tells cron to run at minute 0, 5, 10, 15, 20,
              and so on through 55.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I run a cron job every 30 minutes?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use <code>*/30 * * * *</code> to run at minute 0 and minute 30 of every hour.
              Alternatively you can write <code>0,30 * * * *</code> which does the same thing
              explicitly.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between */5 and 5 in the minute field?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              <code>*/5</code> means every 5 minutes starting from 0 (0, 5, 10...55). A plain{' '}
              <code>5</code> means the job runs once, only at minute 5 of every hour. They are not
              interchangeable.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the cron expression for every 10 minutes?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The cron expression for every 10 minutes is <code>*/10 * * * *</code>. That fires at
              minute 0, 10, 20, 30, 40, and 50 of every hour — six runs per hour, evenly spaced.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why doesn&apos;t my every-5-minutes cron job run exactly every 5 minutes?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Two common causes: the scheduler queues or delays runs under load (GitHub Actions
              explicitly warns about this at its 5-minute minimum), or the previous run is still
              executing when the next one is due and your platform skips or queues the overlap.
              Add a lock file or an in-process flag so overlapping runs are skipped instead of
              silently piling up.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Cron Expression Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Skip the mental math — describe your interval in plain English (e.g. "every 10
              minutes between 9 and 5 on weekdays") and get the correct cron expression instantly.
            </p>
            <Link href="/cron-generator">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open Cron Expression Generator →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/cron-explainer">Cron Expression Explainer — paste an expression, get plain English + next run times</Link></li>
              <li><Link href="/blog/cron-expression-complete-guide">Cron Expression Complete Guide for Developers</Link></li>
              <li><Link href="/blog/top-10-cron-schedule-patterns-developers">Top 10 Cron Schedule Patterns Developers Actually Use</Link></li>
              <li><Link href="/blog/cron-vs-setinterval-nodejs">Cron vs setInterval in Node.js</Link></li>
              <li><Link href="/blog/cron-expression-for-business-hours-only">Cron Expressions for Business Hours Only</Link></li>
              <li><Link href="/blog/debugging-cron-jobs-that-are-not-running">Debugging Cron Jobs That Are Not Running</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
