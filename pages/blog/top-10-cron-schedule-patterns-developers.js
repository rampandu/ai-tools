// pages/blog/top-10-cron-schedule-patterns-developers.js
import Head from 'next/head';
import Link from 'next/link';

export default function Top10CronPatterns() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Top 10 Cron Schedule Patterns Every Developer Should Know',
        item: 'https://dev-brains-ai.com/blog/top-10-cron-schedule-patterns-developers',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What cron expression runs a job every hour?',
        acceptedAnswer: { '@type': 'Answer', text: '0 * * * * — this runs at minute 0 of every hour.' },
      },
      {
        '@type': 'Question',
        name: 'What cron expression runs a job every weekday at 9am?',
        acceptedAnswer: { '@type': 'Answer', text: '0 9 * * 1-5 — runs at 9:00 AM Monday through Friday.' },
      },
      {
        '@type': 'Question',
        name: 'What cron expression runs on the first day of every month?',
        acceptedAnswer: { '@type': 'Answer', text: '0 0 1 * * — runs at midnight on the 1st of every month.' },
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Top 10 Cron Schedule Patterns Every Developer Should Know',
    description:
      'The 10 most useful cron expressions with explanations, real use cases, and variations. From every-minute polling to monthly reports — a practical cron cheat sheet.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/top-10-cron-schedule-patterns-developers',
  };

  const patterns = [
    {
      title: '1. Every minute — health checks & polling',
      cron: '* * * * *',
      use: 'Polling an external API, lightweight health checks, queue processing ticks.',
      note: 'Every-minute crons add up. Make sure the job completes in under 60 seconds to avoid overlap.',
    },
    {
      title: '2. Every 5 minutes — rate-limited tasks',
      cron: '*/5 * * * *',
      use: 'Syncing data with an external service, sending queued emails, scraping feeds.',
      note: 'The step syntax */5 means "every 5 units". */10, */15, */30 work the same way.',
    },
    {
      title: '3. Every hour on the hour',
      cron: '0 * * * *',
      use: 'Generating hourly reports, aggregating metrics, rotating log files.',
      note: 'The leading 0 means "at minute 0". Without it (*/60 is invalid), this is the correct form.',
    },
    {
      title: '4. Every day at midnight',
      cron: '0 0 * * *',
      use: 'Daily backups, clearing expired sessions, resetting daily quotas.',
      note: 'All times in cron are local server time (or UTC for cloud schedulers). Verify your timezone.',
    },
    {
      title: '5. Every weekday at 9 AM',
      cron: '0 9 * * 1-5',
      use: 'Business-hours jobs: sending morning digest emails, triggering daily standups, running payroll.',
      note: '1=Monday, 5=Friday. Use 0 or 7 for Sunday depending on your system.',
    },
    {
      title: '6. Every Monday at 8 AM — weekly tasks',
      cron: '0 8 * * 1',
      use: 'Weekly summary emails, cache warm-ups before the working week, dependency audits.',
      note: 'Change 1 to 0 for Sunday, 5 for Friday, 6 for Saturday.',
    },
    {
      title: '7. First day of every month at midnight',
      cron: '0 0 1 * *',
      use: 'Monthly billing runs, generating monthly invoices, archiving the previous month\'s data.',
      note: 'For the last day of the month, cron has no native "last" keyword — use day 28 as a safe fallback, or handle it in your script.',
    },
    {
      title: '8. Multiple specific hours — morning, noon, evening',
      cron: '0 8,12,18 * * *',
      use: 'Sending reminder notifications at set times, updating dashboards, running health checks at key intervals.',
      note: 'Comma-separated values in any field mean "run at each of these". You can combine this with day-of-week filters.',
    },
    {
      title: '9. Every 15 minutes during business hours',
      cron: '*/15 9-17 * * 1-5',
      use: 'Sending intra-day alerts, syncing data during working hours only, refreshing an internal dashboard.',
      note: 'Combining step (*/15), range (9-17), and list (1-5) fields in a single expression is where cron really shines.',
    },
    {
      title: '10. Once a year — annual tasks',
      cron: '0 0 1 1 *',
      use: 'Archiving the previous year\'s data, generating annual compliance reports, rotating long-lived API keys.',
      note: 'January 1st at midnight. Test this one with a manual trigger before relying on it.',
    },
  ];

  return (
    <>
      <Head>
        <title>Top 10 Cron Schedule Patterns Every Developer Should Know | Dev Brains AI</title>
        <meta
          name="description"
          content="The 10 most useful cron expressions with explanations and real use cases. From every-minute polling to monthly billing runs — a practical cron cheat sheet for developers."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/top-10-cron-schedule-patterns-developers" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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
              <li aria-current="page">Top 10 Cron Patterns</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Top 10 Cron Schedule Patterns Every Developer Should Know
          </h1>

          <p className="small" style={{ marginBottom: 20 }}>
            Most scheduling needs in production fall into a handful of recurring patterns. Rather
            than reaching for the cron man page every time, bookmark this cheat sheet. Each pattern
            below includes the expression, what it means, the most common use case, and a practical
            tip. You can use these with standard Unix crontab, GitHub Actions, node-cron, and most
            other schedulers.
          </p>

          {patterns.map((p, i) => (
            <div key={i} style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 6 }}>{p.title}</h2>
              <pre style={{ background: '#0f172a', color: '#34d399', padding: '10px 14px', borderRadius: 8, overflowX: 'auto', fontSize: '1rem', marginBottom: 8 }}>
                {p.cron}
              </pre>
              <p className="small" style={{ marginBottom: 4 }}>
                <strong>Use case:</strong> {p.use}
              </p>
              <p className="small" style={{ color: '#6b7280' }}>
                💡 {p.note}
              </p>
            </div>
          ))}

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 8, marginBottom: 10 }}>Quick cron field reference</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 12 }}>
{`* * * * *
│ │ │ │ └── day of week  (0–6, 0=Sunday)
│ │ │ └──── month        (1–12)
│ │ └────── day of month (1–31)
│ └──────── hour         (0–23)
└────────── minute       (0–59)

Special chars:  *=any  ,=list  -=range  /=step`}
          </pre>

          <h3 style={{ marginTop: 20, fontSize: '1.1rem', fontWeight: 600 }}>Generate any cron expression from plain English</h3>
          <p className="small" style={{ marginTop: 8 }}>
            Can't remember the exact field order? Use the{' '}
            <Link href="/cron-generator">Dev Brains AI Cron Expression Generator</Link> — describe
            your schedule in plain English and get the correct cron string with a field-by-field
            breakdown.
          </p>

        </article>
      </main>
    </>
  );
}
