// pages/blog/cron-expression-for-business-hours-only.js
import Head from 'next/head';
import Link from 'next/link';

export default function CronExpressionForBusinessHoursOnly() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Cron Expressions for Business Hours Only',
        item: 'https://dev-brains-ai.com/blog/cron-expression-for-business-hours-only',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Cron Expressions for Business Hours Only',
    description:
      'Cron expressions to run jobs only during business hours and weekdays, covering the day-of-week and hour-range syntax, split shifts, and common mistakes.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/cron-expression-for-business-hours-only',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the cron expression for weekdays only?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use 1-5 in the day-of-week field to mean Monday through Friday, for example 0 9 * * 1-5 runs at 9:00 AM every weekday. Day-of-week numbering is 0-6 where 0 is Sunday and 6 is Saturday.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I run a cron job every hour during business hours only?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Combine an hour range with a weekday range, for example 0 9-17 * * 1-5 runs at the top of every hour from 9 AM through 5 PM, Monday to Friday. The range 9-17 is inclusive on both ends.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does cron account for public holidays automatically?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Standard cron has no concept of holidays or calendars, only fixed day-of-week and date patterns. To skip holidays, the job script itself must check a holiday calendar (a list or an API) and exit early if today is a holiday.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Cron Expressions for Business Hours Only | Dev Brains AI</title>
        <meta
          name="description"
          content="Cron expressions to run jobs only during business hours and weekdays, covering day-of-week and hour-range syntax, split shifts, and common mistakes."
        />
        <meta
          name="keywords"
          content="cron business hours, cron weekdays only, cron expression 9 to 5, cron working hours, cron monday to friday, cron office hours"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/cron-expression-for-business-hours-only" />
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
              <li aria-current="page">Cron Expressions for Business Hours Only</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Cron Expressions for Business Hours Only
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Not every job needs to run 24/7. Sync jobs that hit a rate-limited third-party API,
            notification jobs that shouldn't wake anyone at 2 AM, or reports that are only useful
            during working hours all benefit from being restricted to weekdays and a specific hour
            range. Cron handles this cleanly by combining the hour and day-of-week fields.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The two fields that matter: hour and day-of-week
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`┌─ minute        (0 – 59)
│ ┌─ hour         (0 – 23)   ← restrict this for "business hours"
│ │ ┌─ day/month  (1 – 31)
│ │ │ ┌─ month    (1 – 12)
│ │ │ │ ┌─ day/week (0 – 6, 0 = Sunday) ← restrict this for "weekdays"
│ │ │ │ │
0 9-17  *  *  1-5   → every hour from 9 AM to 5 PM, Mon–Fri`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common business-hours patterns
          </h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><code>0 9 * * 1-5</code> — once, at 9:00 AM, Monday through Friday</li>
            <li><code>0 9-17 * * 1-5</code> — every hour on the hour, 9 AM to 5 PM, weekdays</li>
            <li><code>*/30 9-17 * * 1-5</code> — every 30 minutes during business hours, weekdays</li>
            <li><code>*/15 9-18 * * 1-5</code> — every 15 minutes, 9 AM to 6:45 PM, weekdays</li>
            <li><code>0 9,13,17 * * 1-5</code> — three times a day (9 AM, 1 PM, 5 PM), weekdays only</li>
            <li><code>0 9-17 * * 1-6</code> — includes Saturday as a working day (common in Indian retail/SME businesses)</li>
            <li><code>0 10-18 * * 1-5</code> — a 10 AM to 6 PM shift instead of 9-to-5</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Split shifts and lunch-hour exclusions
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            You can combine a comma-separated list with ranges to express something like "morning
            and afternoon shift, skip the lunch hour":
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Every 30 minutes from 9 AM–1 PM and 2 PM–6 PM, weekdays
# (skips the 1 PM–2 PM lunch hour entirely)
*/30 9-12,14-17 * * 1-5

# Reads as: hour field = 9,10,11,12,14,15,16,17`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common mistakes with business-hours expressions
          </h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><strong>Off-by-one on the end hour.</strong> <code>9-17</code> in the hour field fires at 9:00 through 17:00 (5 PM) — it does <em>not</em> include anything after 17:00. If you want the job to run through 5:59 PM, you need a minute-level trick or explicit values.</li>
            <li><strong>Forgetting cron has no holiday calendar.</strong> <code>1-5</code> covers every Monday–Friday including public holidays. If a job must skip holidays (e.g. Diwali, Republic Day), the script itself needs to check a holiday list and exit early.</li>
            <li><strong>Mixing up server timezone with "business hours."</strong> "9 AM business hours" almost always means local time for your users, not whatever timezone the server defaults to — see our timezone guide below before deploying.</li>
            <li><strong>Using day-of-week 7 for Sunday.</strong> Some cron implementations accept 7 as an alias for Sunday, but it's not universal — stick with 0 for portability.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Skipping holidays inside the script
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// business-hours-job.js — cron triggers this every hour, 9-5, Mon-Fri;
// the script itself decides whether to actually skip a holiday
const HOLIDAYS_2026 = ['2026-01-26', '2026-03-14', '2026-08-15', '2026-10-02'];

const today = new Date().toISOString().slice(0, 10);
if (HOLIDAYS_2026.includes(today)) {
  console.log(\`Skipping run — \${today} is a public holiday\`);
  process.exit(0);
}

runBusinessHoursJob();`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the cron expression for weekdays only?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use <code>1-5</code> in the day-of-week field to mean Monday through Friday, for
              example <code>0 9 * * 1-5</code> runs at 9:00 AM every weekday. Day-of-week
              numbering is 0-6 where 0 is Sunday and 6 is Saturday.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I run a cron job every hour during business hours only?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Combine an hour range with a weekday range, for example{' '}
              <code>0 9-17 * * 1-5</code> runs at the top of every hour from 9 AM through 5 PM,
              Monday to Friday. The range <code>9-17</code> is inclusive on both ends.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does cron account for public holidays automatically?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Standard cron has no concept of holidays or calendars, only fixed day-of-week
              and date patterns. To skip holidays, the job script itself must check a holiday
              calendar (a list or an API) and exit early if today is a holiday.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Cron Expression Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe a schedule like "every 30 minutes during business hours on weekdays" and
              get a validated cron expression instantly.
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
              <li><Link href="/blog/cron-expression-examples-every-5-minutes">Cron Expression Examples for Every 5, 10, 15, 30 Minutes</Link></li>
              <li><Link href="/blog/cron-expression-timezone-handling-guide">How Cron Handles Timezones</Link></li>
              <li><Link href="/blog/cron-expression-for-monthly-and-yearly-schedules">Cron Expressions for Monthly and Yearly Schedules</Link></li>
              <li><Link href="/blog/top-10-cron-schedule-patterns-developers">Top 10 Cron Schedule Patterns Developers Actually Use</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
