// pages/blog/cron-expression-complete-guide.js
import Head from 'next/head';
import Link from 'next/link';

const FAQ = [
  {
    q: 'What is the difference between cron and crontab?',
    a: 'Cron is the background daemon (process) that runs on a schedule. Crontab ("cron table") is both the file format used to define schedules and the command (crontab -e) used to edit that file. In everyday conversation "cron" and "crontab" are often used interchangeably, but strictly: cron runs the jobs, crontab is how you tell it what to run and when.',
  },
  {
    q: 'Can cron run more often than once a minute?',
    a: "No — standard cron's smallest unit is one minute; there is no seconds field. To run something every 10 or 30 seconds, either call your script twice from cron with a sleep 30 in between, use a scheduler that supports sub-minute intervals (node-cron and Quartz both support an optional seconds field), or use a long-running process with its own internal timer instead of cron.",
  },
  {
    q: 'Why did my cron job not run?',
    a: "The most common causes: the cron daemon isn't running, the script path in the crontab isn't absolute, the script relies on environment variables that don't exist in cron's minimal environment, or a permissions issue. See the full troubleshooting guide below for the complete checklist with commands.",
  },
  {
    q: 'Does cron use my local timezone?',
    a: "By default, cron uses the system timezone of the machine it runs on — not your local timezone, and not UTC unless the server happens to be set to UTC. This is one of the most common sources of 'why did my job run at the wrong time' bugs. See the dedicated timezone guide below for how to check and set this correctly."
  },
];

export default function CronExpressionCompleteGuide() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Cron Expression Guide: Syntax, Fields & Platform Differences',
        item: 'https://dev-brains-ai.com/blog/cron-expression-complete-guide',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Cron Expression Guide: Syntax, Fields & Platform Differences',
    description:
      'Every cron field explained, 10 ready-to-use examples, real application patterns, a platform comparison table, common mistakes, and a troubleshooting checklist.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/cron-expression-complete-guide',
    datePublished: '2026-02-26',
    dateModified: '2026-08-17',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <Head>
        <title>Cron Expression Guide: Syntax, Fields &amp; Platforms | Dev Brains AI</title>
        <meta
          name="description"
          content="Every cron field explained, 10 ready-to-use examples, real application patterns, a platform comparison table, common mistakes, and a troubleshooting checklist."
        />
        <meta
          name="keywords"
          content="cron expression guide, cron syntax, crontab syntax, cron fields explained, cron special characters, cron platform comparison, cron troubleshooting"
        />
        <meta property="og:title" content="Cron Expression Guide: Syntax, Fields & Platforms" />
        <meta property="og:description" content="Every cron field explained, 10 ready-to-use examples, real application patterns, a platform comparison table, common mistakes, and a troubleshooting checklist." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/cron-expression-complete-guide" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/cron-expression-complete-guide" />
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
              <li aria-current="page">Cron Expression Guide</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Cron Expression Guide: Syntax, Fields &amp; Platform Differences
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Cron is a time-based job scheduler built into Unix-like operating systems. A cron
            expression is a compact string that defines when a job should run — once you understand
            the five fields and the handful of special characters, you can express almost any
            schedule imaginable, from "every minute" to "at 8:45 AM on the first Monday of every
            quarter." This is the reference page for the syntax itself; if you have a specific
            expression already and just want it explained, the free{' '}
            <Link href="/cron-explainer">Cron Expression Explainer</Link> will do that instantly.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>The Five Fields</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Every standard cron expression has exactly five fields separated by spaces:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`┌─ minute        (0 – 59)
│ ┌─ hour         (0 – 23)
│ │ ┌─ day/month  (1 – 31)
│ │ │ ┌─ month    (1 – 12)
│ │ │ │ ┌─ day/week (0 – 6, 0 = Sunday)
│ │ │ │ │
* * * * *`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Special Characters</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li><code>*</code> — matches every possible value for that field.</li>
            <li><code>,</code> — list separator. <code>1,3,5</code> means the 1st, 3rd, and 5th.</li>
            <li><code>-</code> — range. <code>1-5</code> means 1 through 5.</li>
            <li><code>/</code> — step. <code>*/10</code> means every 10 units, starting from 0.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>10 Practical Examples</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li><code>* * * * *</code> — every minute</li>
            <li><code>0 * * * *</code> — every hour on the hour</li>
            <li><code>0 0 * * *</code> — every day at midnight</li>
            <li><code>0 9 * * 1-5</code> — weekdays at 9:00 AM</li>
            <li><code>*/15 * * * *</code> — every 15 minutes</li>
            <li><code>0 0 1 * *</code> — first day of every month at midnight</li>
            <li><code>30 18 * * 5</code> — every Friday at 6:30 PM</li>
            <li><code>0 8,12,18 * * *</code> — at 8 AM, noon, and 6 PM daily</li>
            <li><code>0 0 * * 0</code> — every Sunday at midnight</li>
            <li><code>0 2 * * 1</code> — every Monday at 2:00 AM (good for weekly backups)</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Need "every 5 minutes" specifically, with more variations? See{' '}
            <Link href="/blog/cron-expression-examples-every-5-minutes">
              cron every 5 minutes: expression and examples
            </Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Real-World Application Patterns
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Beyond the syntax, here's what these expressions actually get used for in production:
          </p>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li><strong>Database backups</strong> — <code>0 2 * * *</code>, nightly during low-traffic hours, before the day's data volume makes the backup window too long.</li>
            <li><strong>Log rotation and cleanup</strong> — <code>0 0 * * 0</code>, weekly, deleting or archiving logs older than a retention window so disk usage doesn't grow unbounded.</li>
            <li><strong>Cache warming</strong> — <code>*/15 * * * *</code>, refreshing a computed cache slightly before it would otherwise expire, so users never hit a cold cache.</li>
            <li><strong>Scheduled reports</strong> — <code>0 8 1 * *</code>, generating and emailing a monthly summary on the 1st at 8 AM, timed to land before the workday starts.</li>
            <li><strong>Health checks and monitoring pings</strong> — <code>*/5 * * * *</code>, checking a service is still responding and alerting if a run is missed (see the monitoring guide linked below for how to detect a <em>silent</em> failure — a cron job that stops running without erroring).</li>
            <li><strong>Token or session cleanup</strong> — <code>0 3 * * *</code>, nightly removal of expired auth tokens or stale sessions from the database.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Common Mistakes to Avoid</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li>Confusing day-of-week numbering — Sunday is <code>0</code> on most systems, but <code>7</code> is also accepted on some.</li>
            <li>Forgetting that month and day-of-month are <strong>1-indexed</strong> while hour and minute are <strong>0-indexed</strong>.</li>
            <li>Using <code>0/5</code> instead of <code>*/5</code> — both work but <code>*/5</code> is clearer.</li>
            <li>Writing six fields for a standard crontab — the extra field (seconds or year) is only understood by specific schedulers like Quartz or node-cron, not plain Unix cron.</li>
            <li>Specifying both day-of-month <em>and</em> day-of-week and assuming it means "and" — on standard cron it means "or": the job runs if either field matches.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Platform Comparison
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Cron syntax is mostly standard, but every platform that implements it has quirks:
          </p>
          <div style={{ overflowX: 'auto', marginBottom: 14 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', minWidth: 560 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '6px 10px', background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>Platform</th>
                  <th style={{ textAlign: 'left', padding: '6px 10px', background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>Fields</th>
                  <th style={{ textAlign: 'left', padding: '6px 10px', background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>Timezone</th>
                  <th style={{ textAlign: 'left', padding: '6px 10px', background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>Notable quirk</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>Linux / Unix crontab</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>5</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>System timezone</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>Minimal environment — no login shell PATH by default</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>GitHub Actions</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>5</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>UTC only</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>5-minute minimum interval; can be delayed further under load</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>AWS EventBridge</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>6 (adds year)</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>UTC only</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>Day-of-month and day-of-week can't both be a value — one must be <code>?</code></td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>GCP Cloud Scheduler</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>5</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>Configurable per job</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>Only unix cron using standard 5-field syntax is accepted</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>node-cron (Node.js)</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>5 or 6</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>Process timezone by default, configurable</td>
                  <td style={{ padding: '6px 10px', borderBottom: '1px solid #e2e8f0' }}>Optional leading seconds field for sub-minute schedules</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 10px' }}>Quartz (Java)</td>
                  <td style={{ padding: '6px 10px' }}>6 or 7</td>
                  <td style={{ padding: '6px 10px' }}>Configurable per trigger</td>
                  <td style={{ padding: '6px 10px' }}>Seconds field is required, not optional — a 5-field unix expression is invalid here</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="small" style={{ marginBottom: 14 }}>
            For the Quartz/Java seconds-field trap specifically, see{' '}
            <Link href="/blog/cron-vs-quartz-scheduler-java">Cron vs Quartz in Java</Link>. For a
            full walkthrough of editing, logging, and the PATH gotcha on plain Linux crontab, see{' '}
            <Link href="/blog/cron-jobs-in-linux-crontab-tutorial">the Linux crontab tutorial</Link>.
            For the AWS-specific 6-field syntax and the day-of-month/day-of-week{' '}
            <code>?</code> rule, see{' '}
            <Link href="/blog/cron-expressions-aws-eventbridge-lambda">cron for AWS EventBridge and Lambda</Link>,
            and for GitHub Actions' 5-minute minimum and inactive-repo gotchas, see{' '}
            <Link href="/blog/cron-jobs-github-actions-tutorial">cron jobs in GitHub Actions</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Troubleshooting: My Cron Job Isn't Running
          </h2>
          <p className="small" style={{ marginBottom: 8 }}>
            The short version — check these in order:
          </p>
          <ol className="small" style={{ paddingLeft: 18, marginBottom: 8 }}>
            <li>Is the cron daemon actually running? (<code>systemctl status cron</code> on most Linux distros)</li>
            <li>Does the crontab use an absolute path to the script, not a relative one?</li>
            <li>Does the script depend on environment variables that exist in your login shell but not in cron's minimal environment?</li>
            <li>Does the file running the job have execute permission?</li>
          </ol>
          <p className="small" style={{ marginBottom: 14 }}>
            For the full checklist with the exact commands to run for each check, see{' '}
            <Link href="/blog/debugging-cron-jobs-that-are-not-running">
              Cron Job Not Running? 5 Fixes That Actually Work
            </Link>.
          </p>

          <div style={{ marginTop: 24, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Two Free Tools for Working with Cron</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe a schedule in plain English and get the expression with the{' '}
              <Link href="/cron-generator">Cron Generator</Link>, or paste an expression you already
              have to see what it means and its next run times with the{' '}
              <Link href="/cron-explainer">Cron Expression Explainer</Link>. Both are free, with
              nothing stored.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/cron-generator">
                <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                  Open Cron Generator →
                </button>
              </Link>
              <Link href="/cron-explainer">
                <button style={{ background: '#0d9488', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                  Open Cron Explainer →
                </button>
              </Link>
            </div>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          {FAQ.map((f, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <strong>{f.q}</strong>
              <p className="small" style={{ marginTop: 6 }}>{f.a}</p>
            </div>
          ))}

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>More in this cron series</h3>
            <ul className="small">
              <li><Link href="/blog/cron-expression-examples-every-5-minutes">Cron Every 5 Minutes: Expression + Examples</Link></li>
              <li><Link href="/blog/cron-expression-timezone-handling-guide">Cron Timezones Explained: UTC, CRON_TZ, DST</Link></li>
              <li><Link href="/blog/cron-vs-setinterval-nodejs">Cron vs setInterval in Node.js</Link></li>
              <li><Link href="/blog/cron-jobs-python-schedule-library-guide">Python Cron Jobs: schedule vs APScheduler</Link></li>
              <li><Link href="/blog/debugging-cron-jobs-that-are-not-running">Cron Job Not Running? 5 Fixes That Actually Work</Link></li>
              <li><Link href="/blog/cron-job-monitoring-and-alerting-guide">Cron Job Monitoring and Alerting Guide</Link></li>
              <li><Link href="/blog/top-10-cron-schedule-patterns-developers">Top 10 Cron Schedule Patterns Developers Actually Use</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
