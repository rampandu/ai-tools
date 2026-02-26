// pages/blog/cron-expression-complete-guide.js
import Head from 'next/head';
import Link from 'next/link';

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
        name: 'Cron Expression Complete Guide for Developers',
        item: 'https://dev-brains-ai.com/blog/cron-expression-complete-guide',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Cron Expression Complete Guide for Developers',
    description:
      'Learn cron expression syntax from scratch — fields, special characters, practical examples for Linux, GitHub Actions, and AWS EventBridge.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/cron-expression-complete-guide',
  };

  return (
    <>
      <Head>
        <title>Cron Expression Complete Guide for Developers | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn cron expression syntax from scratch — all 5 fields, special characters like * / - ,, and practical examples for Linux crontab, GitHub Actions, and AWS EventBridge."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/cron-expression-complete-guide" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <article className="card" style={{ maxWidth: 800, margin: '0 auto', padding: 24, color: '#0f172a' }}>

          <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
            <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Cron Expression Complete Guide</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Cron Expression Complete Guide for Developers
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Cron is a time-based job scheduler built into Unix-like operating systems. A cron
            expression is a compact string that defines when a job should run. Once you understand
            the five fields and the handful of special characters, you can express almost any
            schedule imaginable — from "every minute" to "at 8:45 AM on the first Monday of every
            quarter".
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>The five fields</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Every cron expression has exactly five fields separated by spaces:
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

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Special characters</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li><code>*</code> — matches every possible value for that field.</li>
            <li><code>,</code> — list separator. <code>1,3,5</code> means 1st, 3rd, and 5th.</li>
            <li><code>-</code> — range. <code>1-5</code> means 1 through 5.</li>
            <li><code>/</code> — step. <code>*/10</code> means every 10 units.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>10 practical examples</h2>
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

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Common mistakes to avoid</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li>Confusing day-of-week numbering — Sunday is <code>0</code> on most systems, but <code>7</code> is also accepted on some.</li>
            <li>Forgetting that month and day-of-month are <strong>1-indexed</strong> while hour and minute are <strong>0-indexed</strong>.</li>
            <li>Using <code>0/5</code> instead of <code>*/5</code> — both work but <code>*/5</code> is clearer.</li>
            <li>Writing cron expressions with six fields for standard crontab — the sixth field (year) is only used by some schedulers like Quartz.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Platform differences</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Cron syntax is mostly standard, but a few platforms have quirks:
          </p>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li><strong>GitHub Actions</strong> — uses standard 5-field cron in UTC. Minimum interval is every 5 minutes.</li>
            <li><strong>AWS EventBridge</strong> — uses a 6-field cron where the 6th field is year, and you cannot specify both day-of-month and day-of-week; one must be <code>?</code>.</li>
            <li><strong>GCP Cloud Scheduler</strong> — uses standard 5-field unix cron in the timezone you specify.</li>
            <li><strong>node-cron (Node.js)</strong> — supports an optional 6th field for seconds at the beginning.</li>
          </ul>

          <h3 style={{ marginTop: 20, fontSize: '1.1rem', fontWeight: 600 }}>Generate cron expressions without memorising the syntax</h3>
          <p className="small" style={{ marginTop: 8 }}>
            Instead of writing cron manually, use our{' '}
            <Link href="/cron-generator">free Cron Expression Generator</Link> — describe your
            schedule in plain English like "every weekday at 9am" and get the correct expression
            instantly with an explanation of each field.
          </p>

        </article>
      </main>
    </>
  );
}
