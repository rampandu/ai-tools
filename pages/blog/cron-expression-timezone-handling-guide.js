// pages/blog/cron-expression-timezone-handling-guide.js
import Head from 'next/head';
import Link from 'next/link';

export default function CronExpressionTimezoneHandlingGuide() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How Cron Handles Timezones — A Practical Guide',
        item: 'https://dev-brains-ai.com/blog/cron-expression-timezone-handling-guide',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Cron Timezones Explained: UTC, CRON_TZ, DST',
    description:
      'How cron handles timezones: system time vs UTC, the CRON_TZ variable, DST pitfalls, and how GitHub Actions, AWS EventBridge, and GCP Cloud Scheduler handle timezone.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/cron-expression-timezone-handling-guide',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does cron use UTC or local server time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Standard Linux cron uses the system's local timezone by default, not UTC, unless the CRON_TZ environment variable is set or the server itself is configured to run in UTC. This differs from many cloud schedulers, which default to UTC.",
        },
      },
      {
        '@type': 'Question',
        name: 'What timezone does GitHub Actions cron use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "GitHub Actions scheduled workflows always run in UTC. There is no way to set a different timezone in the workflow YAML, so you must calculate the UTC-equivalent time yourself, for example 9:00 AM IST becomes 3:30 AM UTC.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I set a specific timezone for a single cron job on Linux?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, on systems using Vixie cron or cronie you can set CRON_TZ=Asia/Kolkata on its own line directly above a crontab entry, and that line will be evaluated in the specified timezone regardless of the system default.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I convert 9 AM IST to UTC for a cron job?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'IST (Asia/Kolkata) is UTC+5:30 year-round with no DST, so subtract 5 hours and 30 minutes: 9:00 AM IST becomes 3:30 AM UTC, which is written as 30 3 * * * for a UTC-only scheduler like GitHub Actions or classic AWS EventBridge Rules.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Daylight Saving Time affect cron jobs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "It affects any job scheduled with a named timezone that observes DST, such as America/New_York or Europe/London — the job's real-world trigger time shifts by an hour twice a year. India (Asia/Kolkata) does not observe DST, so IST-only schedules are unaffected, but US- or EU-hosted infrastructure and cross-timezone coordination with Indian teams often are.",
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Cron Timezones Explained: UTC, CRON_TZ, DST | Dev Brains AI</title>
        <meta
          name="description"
          content="How cron handles timezones: system time vs UTC, the CRON_TZ variable, DST pitfalls, and how GitHub Actions, AWS EventBridge, and GCP Cloud Scheduler handle timezone."
        />
        <meta
          name="keywords"
          content="cron timezone, cron UTC, CRON_TZ, github actions cron timezone, aws eventbridge timezone, cron job timezone issues, server timezone cron"
        />
        <meta property="og:title" content="Cron Timezones Explained: UTC, CRON_TZ, DST" />
        <meta
          property="og:description"
          content="How cron handles timezones: system time vs UTC, the CRON_TZ variable, DST pitfalls, and how GitHub Actions, AWS EventBridge, and GCP Cloud Scheduler handle timezone."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/cron-expression-timezone-handling-guide" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/cron-expression-timezone-handling-guide" />
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
              <li aria-current="page">Cron Expression Timezone Handling</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How Cron Handles Timezones — A Practical Guide
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            "It worked fine in staging" is a phrase that shows up a lot in timezone bugs, because
            a cron expression has no idea what timezone it's supposed to mean — it just gets
            interpreted against whatever clock the scheduler is using. For a team spread across
            India and servers hosted in US or EU regions, this is one of the most common sources
            of "why did the job run at 3:30 AM" surprises. If you need the syntax basics first,
            start with our <Link href="/blog/cron-expression-complete-guide">cron expression complete guide</Link>{' '}
            — this one assumes you already know the five fields and focuses purely on the clock
            they're evaluated against.
          </p>

          <svg viewBox="0 0 640 175" style={{ width: '100%', height: 'auto', marginBottom: 18, borderRadius: 8, background: '#0f172a' }} role="img" aria-label="Timeline showing 9 AM IST aligning to 3:30 AM UTC">
            <text x="40" y="18" fill="#94a3b8" fontSize="12" fontFamily="ui-monospace, monospace">Local server time — Asia/Kolkata (IST, UTC+5:30)</text>
            <rect x="40" y="26" width="560" height="32" rx="6" fill="#1e293b" stroke="#334155" />
            <text x="46" y="70" fill="#64748b" fontSize="9" fontFamily="ui-monospace, monospace">00:00</text>
            <text x="580" y="70" textAnchor="end" fill="#64748b" fontSize="9" fontFamily="ui-monospace, monospace">24:00</text>
            <rect x="245" y="26" width="40" height="32" rx="4" fill="#0d3b34" stroke="#14b8a6" />
            <text x="265" y="47" textAnchor="middle" fill="#5eead4" fontSize="11" fontFamily="ui-monospace, monospace">09:00</text>

            <line x1="265" y1="58" x2="265" y2="108" stroke="#14b8a6" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="280" y="87" fill="#34d399" fontSize="11" fontFamily="ui-monospace, monospace">UTC+5:30 offset</text>

            <text x="40" y="118" fill="#94a3b8" fontSize="12" fontFamily="ui-monospace, monospace">UTC</text>
            <rect x="40" y="108" width="560" height="32" rx="6" fill="#1e293b" stroke="#334155" />
            <text x="46" y="152" fill="#64748b" fontSize="9" fontFamily="ui-monospace, monospace">00:00</text>
            <text x="580" y="152" textAnchor="end" fill="#64748b" fontSize="9" fontFamily="ui-monospace, monospace">24:00</text>
            <rect x="106" y="108" width="40" height="32" rx="4" fill="#0d3b34" stroke="#14b8a6" />
            <text x="126" y="129" textAnchor="middle" fill="#5eead4" fontSize="11" fontFamily="ui-monospace, monospace">03:30</text>

            <text x="320" y="168" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="ui-monospace, monospace">0 9 * * * (CRON_TZ=Asia/Kolkata)  =  30 3 * * * (UTC)</text>
          </svg>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The core rule: cron has no built-in timezone awareness
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A cron expression like <code>0 9 * * *</code> just means "when the hour field equals
            9 and the minute field equals 0" — according to whatever clock the cron daemon reads.
            On a Linux server, that's the system's configured local timezone by default. Check it
            with:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`$ timedatectl
               Local time: Fri 2026-07-11 14:32:07 IST
           Universal time: Fri 2026-07-11 09:02:07 UTC
                 Time zone: Asia/Kolkata (IST, +0530)

# If a job says "0 9 * * *" on this server, it fires at
# 9:00 AM IST, which is 3:30 AM UTC.`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Setting a specific timezone for cron jobs
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Most modern cron implementations (Vixie cron, cronie, and the cron used in Debian/
            Ubuntu/RHEL) support a <code>CRON_TZ</code> variable that overrides the timezone for
            entries below it, without changing the whole server's timezone:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# This entry always fires at 9:00 AM IST, regardless of server timezone
CRON_TZ=Asia/Kolkata
0 9 * * * /opt/scripts/daily-report.sh

# A later entry in the same crontab, unaffected, runs in UTC
CRON_TZ=UTC
0 0 * * * /opt/scripts/utc-midnight-job.sh`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            This is safer than relying on the server's system timezone, because it survives a
            server migration, a container rebuild, or an ops team changing the default OS
            timezone for unrelated reasons.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The classic failure: server timezone changes silently
          </h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li>A server gets rebuilt from a base image that defaults to UTC instead of the previous IST configuration — every "9 AM" job now fires at 2:30 PM.</li>
            <li>An app migrates from a self-managed VM to a managed container platform, whose containers default to UTC regardless of the previous host timezone.</li>
            <li>Daylight saving time shifts a job's real-world time by an hour on regions that observe DST (India does not observe DST, but many US/EU teams working with Indian teams do, causing coordination confusion twice a year).</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            The fix is always the same: don't depend on "whatever the server happens to be set
            to." Pin the timezone explicitly with <code>CRON_TZ</code>, or better, run everything
            in UTC and do timezone conversion in application code where it's testable.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            How cloud schedulers handle timezone
          </h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><strong>GitHub Actions</strong> — scheduled workflows always run in UTC, with no timezone option in the YAML. A 9:00 AM IST report needs <code>cron: '30 3 * * *'</code> (3:30 AM UTC).</li>
            <li><strong>AWS EventBridge Scheduler</strong> — lets you set an explicit timezone per schedule (unlike the older EventBridge Rules cron, which is UTC-only), so you can specify <code>Asia/Kolkata</code> directly and it handles DST-aware regions correctly.</li>
            <li><strong>AWS EventBridge Rules (classic)</strong> — cron and rate expressions are always evaluated in UTC; you must convert manually.</li>
            <li><strong>GCP Cloud Scheduler</strong> — accepts an explicit timezone parameter per job, similar to EventBridge Scheduler.</li>
            <li><strong>Kubernetes CronJob</strong> — historically used the controller's local timezone; recent Kubernetes versions support an explicit <code>timeZone</code> field on the CronJob spec.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            In-process schedulers handle it the same way, just with a code-level parameter instead
            of a platform setting: Node's <code>node-cron</code> accepts a <code>timezone</code>{' '}
            option directly (see <Link href="/blog/cron-vs-setinterval-nodejs">cron vs setInterval in Node.js</Link>{' '}
            for how that's wired up), and Python's APScheduler accepts the same idea via{' '}
            <code>BackgroundScheduler(timezone=...)</code> — covered in{' '}
            <Link href="/blog/cron-jobs-python-schedule-library-guide">cron jobs with Python&apos;s schedule library and APScheduler</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Practical recommendations
          </h2>
          <ol className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li>Prefer running servers in UTC and setting <code>CRON_TZ</code> only for jobs that must align with a business-facing local time (e.g. "send report at 9 AM IST to the Mumbai team").</li>
            <li>Document the intended timezone directly as a comment next to every crontab entry — future you (and teammates) will thank you.</li>
            <li>For cloud schedulers without timezone support (GitHub Actions, classic EventBridge), always write the UTC-converted time and add a comment showing the IST equivalent.</li>
            <li>Test timezone-sensitive jobs around DST transition dates if any part of your team or infrastructure observes DST — even though India doesn't, US/EU-hosted infrastructure often does.</li>
          </ol>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Timezone Mistakes
          </h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><strong>Assuming crontab times are already in UTC.</strong> Most Linux installs default to the system's local timezone, not UTC — check with <code>timedatectl</code> before you assume, especially on a freshly provisioned server.</li>
            <li><strong>Placing CRON_TZ below the jobs it's meant to affect.</strong> <code>CRON_TZ</code> only applies to crontab lines that come after it in the same file — putting it at the bottom, or after the job it's supposed to control, silently does nothing.</li>
            <li><strong>Hardcoding a UTC offset instead of an IANA zone name.</strong> Using <code>+05:30</code> instead of <code>Asia/Kolkata</code> looks equivalent today, but offsets don't auto-adjust for DST-observing regions — a named zone does.</li>
            <li><strong>Testing a timezone-sensitive job only once, outside DST season.</strong> A job that fires correctly in July can silently shift an hour after a DST transition in November or March on any DST-observing infrastructure it touches.</li>
            <li><strong>Assuming every cloud scheduler behaves the same way.</strong> GitHub Actions and classic AWS EventBridge Rules are UTC-only; EventBridge Scheduler and GCP Cloud Scheduler accept an explicit timezone. Mixing these up produces an off-by-N-hours bug that's easy to miss in code review.</li>
            <li><strong>Not re-checking timezone after a platform migration.</strong> Moving from a self-managed VM to a managed container platform often silently resets the default timezone to UTC, shifting every "local time" job that didn't pin its timezone explicitly.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Putting It Together: A Multi-Region Schedule
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A more realistic case than a single crontab line: a SaaS product with an India-facing
            report and a UTC-based backup, both defined explicitly so neither depends on whatever
            timezone the server happens to default to:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# /etc/cron.d/reports — always explicit, never relies on server default

# 9:00 AM IST daily sales report for the Mumbai team
CRON_TZ=Asia/Kolkata
0 9 * * * app /opt/scripts/daily-sales-report.sh

# Midnight UTC backup — independent of any region's business hours
CRON_TZ=UTC
0 0 * * * app /opt/scripts/nightly-backup.sh`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            The same explicitness applies to a Kubernetes CronJob, where recent versions support a
            native <code>timeZone</code> field instead of relying on the controller's local clock:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`apiVersion: batch/v1
kind: CronJob
metadata:
  name: daily-sales-report
spec:
  schedule: "0 9 * * *"
  timeZone: "Asia/Kolkata"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
            - name: report
              image: myorg/daily-sales-report:latest
          restartPolicy: OnFailure`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Both examples make the timezone a first-class, visible part of the schedule instead of
            an assumption baked into the host. If you also need to tune how often each of these
            fires — every 5 minutes, every 30 minutes, or hourly — see our{' '}
            <Link href="/blog/cron-expression-examples-every-5-minutes">cron expression examples for every 5, 10, 15, and 30 minutes</Link>,
            or build the base expression with the free{' '}
            <Link href="/cron-generator">Cron Expression Generator</Link> and then add the
            timezone yourself.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Does cron use UTC or local server time?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Standard Linux cron uses the system's local timezone by default, not UTC, unless the{' '}
              <code>CRON_TZ</code> environment variable is set or the server itself is configured
              to run in UTC. This differs from many cloud schedulers, which default to UTC.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What timezone does GitHub Actions cron use?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              GitHub Actions scheduled workflows always run in UTC. There is no way to set a
              different timezone in the workflow YAML, so you must calculate the UTC-equivalent
              time yourself, for example 9:00 AM IST becomes 3:30 AM UTC.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can I set a specific timezone for a single cron job on Linux?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes, on systems using Vixie cron or cronie you can set{' '}
              <code>CRON_TZ=Asia/Kolkata</code> on its own line directly above a crontab entry,
              and that line will be evaluated in the specified timezone regardless of the system
              default.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I convert 9 AM IST to UTC for a cron job?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              IST (Asia/Kolkata) is UTC+5:30 year-round with no DST, so subtract 5 hours and 30
              minutes: 9:00 AM IST becomes 3:30 AM UTC, written as <code>30 3 * * *</code> for a
              UTC-only scheduler like GitHub Actions or classic AWS EventBridge Rules.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does Daylight Saving Time affect cron jobs?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              It affects any job scheduled with a named timezone that observes DST, such as{' '}
              America/New_York or Europe/London — the job&apos;s real-world trigger time shifts by
              an hour twice a year. India (Asia/Kolkata) does not observe DST, so IST-only
              schedules are unaffected, but US- or EU-hosted infrastructure and cross-timezone
              coordination with Indian teams often are.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Cron Expression Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe your schedule with a specific time in mind and double-check the generated
              expression against the timezone your scheduler actually runs in.
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
              <li><Link href="/blog/cron-expressions-aws-eventbridge-lambda">Cron Expressions for AWS EventBridge and Lambda</Link></li>
              <li><Link href="/blog/cron-jobs-github-actions-tutorial">Cron Jobs with GitHub Actions Tutorial</Link></li>
              <li><Link href="/blog/debugging-cron-jobs-that-are-not-running">Debugging Cron Jobs That Are Not Running</Link></li>
              <li><Link href="/blog/cron-jobs-in-linux-crontab-tutorial">Cron Jobs in Linux Crontab Tutorial</Link></li>
              <li><Link href="/blog/cron-expression-for-business-hours-only">Cron Expressions for Business Hours Only</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
