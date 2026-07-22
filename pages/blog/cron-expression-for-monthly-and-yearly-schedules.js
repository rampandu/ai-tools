// pages/blog/cron-expression-for-monthly-and-yearly-schedules.js
import Head from 'next/head';
import Link from 'next/link';

export default function CronExpressionForMonthlyAndYearlySchedules() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Cron Expressions for Monthly and Yearly Schedules',
        item: 'https://dev-brains-ai.com/blog/cron-expression-for-monthly-and-yearly-schedules',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Cron for Monthly & Yearly Jobs (Last-Day Trick)',
    description:
      "Cron patterns for monthly, quarterly, and yearly schedules, plus the workaround for cron's missing last-day-of-month field — no native L flag needed.",
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/cron-expression-for-monthly-and-yearly-schedules',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the cron expression for the first day of every month?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The cron expression 0 0 1 * * runs at midnight on the 1st day of every month. The day-of-month field is set to 1, and month and day-of-week are left as wildcards.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does standard cron support running on the last day of the month?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Standard 5-field Unix cron has no native concept of "last day of month" because months have different lengths. The common workaround is to schedule the job on the 1st of the next month, or check the date inside the script itself.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I schedule a cron job to run once a year?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Set the month and day-of-month fields to a fixed value and leave everything else as usual, for example 0 0 1 1 * runs once a year at midnight on January 1st. Standard cron has no year field, so this repeats every year automatically.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Cron for Monthly & Yearly Jobs (Last-Day Trick) | Dev Brains AI</title>
        <meta
          name="description"
          content="Cron patterns for monthly, quarterly, and yearly schedules, plus the workaround for cron's missing last-day-of-month field — no native L flag needed."
        />
        <meta
          name="keywords"
          content="cron monthly schedule, cron yearly schedule, cron last day of month, cron first day of month, cron expression once a month, cron expression once a year"
        />
        <meta property="og:title" content="Cron for Monthly & Yearly Jobs (Last-Day Trick)" />
        <meta property="og:description" content="Cron patterns for monthly, quarterly, and yearly schedules, plus the workaround for cron's missing last-day-of-month field — no native L flag needed." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/cron-expression-for-monthly-and-yearly-schedules" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/cron-expression-for-monthly-and-yearly-schedules" />
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
              <li aria-current="page">Cron Expressions for Monthly and Yearly Schedules</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Cron Expressions for Monthly and Yearly Schedules
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Billing runs, monthly reports, and yearly cleanups all need schedules that fire on
            specific dates rather than fixed intervals. Cron handles most of these cleanly with
            the day-of-month and month fields — except for one common request it can't express
            natively: "the last day of the month." Here's how to handle both cases correctly.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Monthly schedules — first of the month and specific dates
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Set the day-of-month field (3rd field) to the date you want, and leave month and
            day-of-week as wildcards so it repeats every month:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`0 0 1 * *     → midnight on the 1st of every month
0 9 1 * *     → 9:00 AM on the 1st of every month
0 0 15 * *    → midnight on the 15th of every month
0 6 1,15 * *  → 6:00 AM on the 1st AND 15th of every month
0 0 5 * *     → midnight on the 5th of every month (e.g. after month-end reconciliation)`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why "last day of month" doesn't exist in standard cron
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Standard cron fields are static ranges — day-of-month accepts 1 through 31. There is
            no value that means "whatever the last valid day happens to be this month," because
            that number changes (28, 29, 30, or 31) depending on the month and leap years. Two
            reliable workarounds exist:
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><strong>Run on the 1st of the next month instead.</strong> If the job is a month-end report, running it at 00:05 on the 1st and having it process "yesterday" is usually equivalent and far simpler.</li>
            <li><strong>Run every day near month-end and check inside the script.</strong> Schedule the job for the 28th–31st daily, then have the script itself compute whether "tomorrow" rolls into a new month, and only proceed if so.</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Runs daily at 23:55 from the 28th through the 31st,
# script itself decides if today is actually the last day
55 23 28-31 * * /opt/scripts/month-end-check.sh

# month-end-check.sh (bash)
#!/bin/bash
TOMORROW=$(date -d "+1 day" +\\%d)
if [ "$TOMORROW" -eq "01" ]; then
  /opt/scripts/run-month-end-report.sh
fi`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            Node.js's <code>node-cron</code> and Quartz support this more elegantly — Quartz has a
            native <code>L</code> ("last") value: <code>0 0 0 L * ?</code> means "midnight on the
            last day of every month," no manual date math needed.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Quarterly schedules
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            List the specific months in the month field (4th field) instead of using a wildcard:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`0 0 1 1,4,7,10 *   → midnight on the 1st of Jan, Apr, Jul, Oct (quarterly)
0 9 1 3,6,9,12 *   → 9 AM on the 1st of Mar, Jun, Sep, Dec`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Yearly (annual) schedules
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Fix both the day-of-month and month fields to a specific date. Standard cron has no
            year field, so the job simply repeats on that date every year automatically:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`0 0 1 1 *     → midnight on January 1st every year (annual reset job)
0 0 1 4 *     → midnight on April 1st every year (India fiscal year start)
0 9 25 12 *   → 9:00 AM on December 25th every year
0 0 31 3 *    → midnight on March 31st every year (India fiscal year end)`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            For jobs that should only run in a specific year (e.g. a one-time migration), don't
            rely on cron's date fields at all — schedule it as a one-off with <code>at</code>{' '}
            instead, or add an explicit year check inside the script and remove the crontab entry
            once it has run.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the cron expression for the first day of every month?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The cron expression <code>0 0 1 * *</code> runs at midnight on the 1st day of every
              month. The day-of-month field is set to 1, and month and day-of-week are left as
              wildcards.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does standard cron support running on the last day of the month?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Standard 5-field Unix cron has no native concept of "last day of month" because
              months have different lengths. The common workaround is to schedule the job on the
              1st of the next month, or check the date inside the script itself.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I schedule a cron job to run once a year?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Set the month and day-of-month fields to a fixed value and leave everything else as
              usual, for example <code>0 0 1 1 *</code> runs once a year at midnight on January
              1st. Standard cron has no year field, so this repeats every year automatically.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Cron Expression Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe a monthly, quarterly, or yearly schedule in plain English and get a
              validated cron expression instantly, with an explanation of each field.
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
              <li><Link href="/blog/cron-expression-complete-guide">Cron Expression Complete Guide for Developers</Link></li>
              <li><Link href="/blog/cron-vs-quartz-scheduler-java">Cron vs Quartz Scheduler in Java</Link></li>
              <li><Link href="/blog/cron-expression-for-business-hours-only">Cron Expressions for Business Hours Only</Link></li>
              <li><Link href="/blog/cron-expression-examples-every-5-minutes">Cron Expression Examples for Every 5, 10, 15, 30 Minutes</Link></li>
              <li><Link href="/blog/top-10-cron-schedule-patterns-developers">Top 10 Cron Schedule Patterns Developers Actually Use</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
