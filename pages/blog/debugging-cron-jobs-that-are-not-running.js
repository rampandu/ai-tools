// pages/blog/debugging-cron-jobs-that-are-not-running.js
import Head from 'next/head';
import Link from 'next/link';

export default function DebuggingCronJobsThatAreNotRunning() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Debugging Cron Jobs That Are Not Running',
        item: 'https://dev-brains-ai.com/blog/debugging-cron-jobs-that-are-not-running',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Cron Job Not Running? 5 Fixes That Actually Work',
    description:
      'Cron job silently not firing? Walk through the 5 most common causes — dead service, bad syntax, missing permissions, and PATH issues — with commands to fix each one fast.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/debugging-cron-jobs-that-are-not-running',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Why is my cron job not running at all?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most common causes are: the cron service itself is stopped, the crontab has a syntax error causing that line to be silently ignored, the script lacks execute permissions, or the schedule expression does not mean what you think it means. Check systemctl status cron first, then verify the crontab syntax and file permissions.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I check if the cron service is running on Linux?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Run systemctl status cron on Debian/Ubuntu or systemctl status crond on RHEL/CentOS/Fedora. If it shows "inactive" or "failed," start it with systemctl start cron (or crond) and enable it on boot with systemctl enable cron.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does a cron job run manually but not from crontab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This is almost always an environment difference. Cron runs with a minimal PATH and no shell profile loaded, so commands and relative file paths that work in your interactive terminal often fail silently under cron. Use absolute paths for every binary and file reference in the script.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Cron Job Not Running? 5 Fixes That Actually Work | Dev Brains AI</title>
        <meta
          name="description"
          content="Cron job silently not firing? Walk through the 5 most common causes — dead service, bad syntax, missing permissions, and PATH issues — with commands to fix each one fast."
        />
        <meta
          name="keywords"
          content="cron job not running, cron not working, debug cron job, cron job troubleshooting, crontab not executing, cron silent failure"
        />
        <meta property="og:title" content="Cron Job Not Running? 5 Fixes That Actually Work" />
        <meta property="og:description" content="Cron job silently not firing? Walk through the 5 most common causes — dead service, bad syntax, missing permissions, and PATH issues — with commands to fix each one fast." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/debugging-cron-jobs-that-are-not-running" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/debugging-cron-jobs-that-are-not-running" />
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
              <li aria-current="page">Debugging Cron Jobs That Are Not Running</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Debugging Cron Jobs That Are Not Running
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            "It's in the crontab but nothing happens" is one of the most frustrating debugging
            sessions in backend work, because cron fails silently by design — no error dialog, no
            crash, just... nothing. This guide walks through the checklist, in the order that
            catches the most common causes first.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 1: Confirm the cron service is actually running
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Before touching your crontab, rule out the daemon itself:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Debian / Ubuntu
$ systemctl status cron

# RHEL / CentOS / Fedora / Amazon Linux
$ systemctl status crond

# If inactive or failed:
$ sudo systemctl start cron
$ sudo systemctl enable cron   # so it survives a reboot`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            This is easy to overlook after a server rebuild, a minimal Docker base image, or a
            fresh cloud instance — cron isn't always installed or enabled by default.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 2: Check for a silent syntax error in the crontab
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A malformed line doesn't crash cron or throw a visible error — cron just skips that
            entry. Look for it in the system log:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# View recent cron activity in the system log
$ grep CRON /var/log/syslog | tail -20      # Debian/Ubuntu
$ journalctl -u crond --since "1 hour ago"  # RHEL/CentOS with systemd

# List your current crontab to eyeball the syntax
$ crontab -l`}
          </pre>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li>Every entry needs exactly 5 time fields before the command — 4 or 6 fields (unless you're using Quartz-style syntax elsewhere) will be rejected.</li>
            <li>Percent signs (<code>%</code>) are special in crontab — they mean newline unless escaped with <code>\%</code>. A raw <code>date +\%Y\%m\%d</code> needs the backslashes.</li>
            <li>Comments must start with <code>#</code> at the start of the line.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 3: Verify file and execute permissions
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`$ ls -l /opt/scripts/backup.sh
-rw-r--r-- 1 deploy deploy 812 Jul 11 09:00 backup.sh
# ^ missing execute bit — cron will fail to run this

$ chmod +x /opt/scripts/backup.sh
$ ls -l /opt/scripts/backup.sh
-rwxr-xr-x 1 deploy deploy 812 Jul 11 09:00 backup.sh`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            Also confirm the crontab's owning user actually has permission to read/write any
            files or directories the script touches — a job in root's crontab writing to a
            directory only "deploy" owns will fail with a permission error you'll only see in the
            logs, not on screen.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 4: Rule out the classic PATH / environment problem
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            This is the single most common cause of "works manually, not from cron." Cron
            provides a minimal environment — typically just <code>PATH=/usr/bin:/bin</code> — with
            none of your shell profile loaded:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Temporarily add this entry to see exactly what environment cron gives you
* * * * * env > /tmp/cron-env.txt 2>&1

# Compare with your interactive shell's environment
$ env > /tmp/shell-env.txt
$ diff /tmp/cron-env.txt /tmp/shell-env.txt

# Fix: use absolute paths in the script/crontab, or set PATH explicitly
# at the top of the crontab file
PATH=/usr/local/bin:/usr/bin:/bin
*/10 * * * * /usr/bin/node /app/sync.js`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 5: Double-check the schedule actually means what you think
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Sometimes cron is running exactly as configured — it's just not the schedule you
            intended. Common misreadings:
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><code>0 0 1,15 * *</code> was meant as "1st AND 15th" but was typed as <code>0 0 1-15 * *</code> which runs every day from the 1st through the 15th.</li>
            <li>Assuming the server runs in IST when it's actually configured for UTC (or vice versa) — see our timezone guide for how to confirm this.</li>
            <li>A day-of-month and day-of-week field combined unexpectedly — in standard cron, if both are restricted (not <code>*</code>), the job runs when <em>either</em> condition matches, which surprises people expecting an AND.</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# This does NOT mean "1st of the month AND a Monday"
# It means "1st of the month OR any Monday" — a very common trap
0 9 1 * 1`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Quick reference checklist
          </h2>
          <ol className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li>Is the cron/crond service active? (<code>systemctl status cron</code>)</li>
            <li>Does <code>crontab -l</code> show the entry with exactly 5 valid time fields?</li>
            <li>Does the script have execute permission and correct file ownership?</li>
            <li>Does the script use absolute paths for every binary and file it touches?</li>
            <li>Is output redirected somewhere you can actually see it (not silently discarded)?</li>
            <li>Does the schedule's day-of-month/day-of-week combination mean OR, not AND, as intended?</li>
            <li>Is the server's timezone what you assumed it was?</li>
          </ol>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>Why is my cron job not running at all?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The most common causes are: the cron service itself is stopped, the crontab has a
              syntax error causing that line to be silently ignored, the script lacks execute
              permissions, or the schedule expression does not mean what you think it means. Check{' '}
              <code>systemctl status cron</code> first, then verify the crontab syntax and file
              permissions.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I check if the cron service is running on Linux?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Run <code>systemctl status cron</code> on Debian/Ubuntu or{' '}
              <code>systemctl status crond</code> on RHEL/CentOS/Fedora. If it shows "inactive" or
              "failed," start it with <code>systemctl start cron</code> (or crond) and enable it
              on boot with <code>systemctl enable cron</code>.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does a cron job run manually but not from crontab?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              This is almost always an environment difference. Cron runs with a minimal PATH and
              no shell profile loaded, so commands and relative file paths that work in your
              interactive terminal often fail silently under cron. Use absolute paths for every
              binary and file reference in the script.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Cron Expression Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Rule out schedule confusion entirely — describe the schedule you want in plain
              English and get a validated, correctly-formed cron expression.
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
              <li><Link href="/blog/cron-jobs-in-linux-crontab-tutorial">Cron Jobs in Linux Crontab Tutorial</Link></li>
              <li><Link href="/blog/cron-job-monitoring-and-alerting-guide">Cron Job Monitoring and Alerting Guide</Link></li>
              <li><Link href="/blog/cron-job-best-practices-for-production">Cron Job Best Practices for Production Systems</Link></li>
              <li><Link href="/blog/cron-expression-timezone-handling-guide">How Cron Handles Timezones</Link></li>
              <li><Link href="/blog/cron-expression-complete-guide">Cron Expression Complete Guide for Developers</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
