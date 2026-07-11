// pages/blog/cron-jobs-in-linux-crontab-tutorial.js
import Head from 'next/head';
import Link from 'next/link';

export default function CronJobsInLinuxCrontabTutorial() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Cron Jobs in Linux Crontab — Step-by-Step Tutorial',
        item: 'https://dev-brains-ai.com/blog/cron-jobs-in-linux-crontab-tutorial',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Cron Jobs in Linux Crontab — Step-by-Step Tutorial',
    description:
      'A step-by-step tutorial on editing the Linux crontab with crontab -e, understanding syntax, logging output, and avoiding common gotchas like PATH and environment variable issues.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/cron-jobs-in-linux-crontab-tutorial',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I edit the crontab in Linux?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Run crontab -e in a terminal. This opens your user crontab in the default editor (often vi or nano). Add one cron expression per line, save, and exit — cron picks up the changes automatically without needing a restart.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does my cron job work manually but not from crontab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most common cause is PATH. Cron runs with a minimal environment, usually just /usr/bin:/bin, so commands that work in your interactive shell (which loads .bashrc or .profile) may not be found. Always use absolute paths to binaries and scripts in crontab entries.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where does crontab output go by default?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'By default cron emails any stdout or stderr output to the crontab owner using the local mail system, if one is configured. In practice most servers don\'t have mail set up, so output is silently lost unless you explicitly redirect it to a log file.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Cron Jobs in Linux Crontab — Step-by-Step Tutorial | Dev Brains AI</title>
        <meta
          name="description"
          content="Step-by-step tutorial on editing Linux crontab with crontab -e, syntax basics, logging job output, and common gotchas like PATH and environment variable issues."
        />
        <meta
          name="keywords"
          content="linux crontab tutorial, crontab -e, crontab syntax, cron job linux, crontab logging, crontab path issues, edit crontab"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/cron-jobs-in-linux-crontab-tutorial" />
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
              <li aria-current="page">Cron Jobs in Linux Crontab Tutorial</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Cron Jobs in Linux Crontab — Step-by-Step Tutorial
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Every Linux distribution ships with cron, the daemon that runs scheduled commands in
            the background. This tutorial walks through creating, listing, and removing crontab
            entries, plus the environment quirks that catch almost every developer the first time
            they move a script from their terminal into cron.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 1: Open your crontab with crontab -e
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Each user on the system has their own crontab. To edit yours:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`$ crontab -e

# first time you run this, it may ask which editor to use:
# 1. /bin/nano   <---- easiest for beginners
# 2. /usr/bin/vim.basic
# choose 1 and press Enter`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            This opens an empty (or existing) crontab file. Every non-comment line is one
            scheduled job in the format <code>minute hour day month weekday command</code>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 2: Add your first job
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Run a backup script every day at 2:30 AM
30 2 * * * /home/deploy/scripts/backup.sh

# Save and exit:
#   nano: Ctrl+O, Enter, then Ctrl+X
#   vim:  Esc, then :wq, Enter`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            After saving, cron reloads the crontab automatically — no need to restart any
            service. Verify it was saved with <code>crontab -l</code> (list) at any time.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 3: Redirect output so you can actually see what happened
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            By default, cron tries to email job output to you, but most servers don't have local
            mail configured, so output silently disappears. Always redirect explicitly:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Append both stdout and stderr to a log file
30 2 * * * /home/deploy/scripts/backup.sh >> /home/deploy/logs/backup.log 2>&1

# Discard output entirely (not recommended — you lose error visibility)
30 2 * * * /home/deploy/scripts/backup.sh > /dev/null 2>&1`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 4: Fix the #1 gotcha — PATH and environment variables
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Cron does not load your <code>.bashrc</code>, <code>.bash_profile</code>, or{' '}
            <code>.profile</code>. It runs with a bare-minimum environment, so a script that
            calls <code>node</code>, <code>python3</code>, or <code>npm</code> by name — and works
            fine in your terminal — often fails silently or with "command not found" under cron.
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li>Use full absolute paths in crontab commands: <code>/usr/bin/node</code> instead of <code>node</code>.</li>
            <li>Or set <code>PATH</code> explicitly at the top of the crontab file: <code>PATH=/usr/local/bin:/usr/bin:/bin</code>.</li>
            <li>Or source your environment at the top of the script itself, e.g. <code>source /home/deploy/.nvm/nvm.sh</code> before calling <code>node</code>.</li>
            <li>Check exactly what environment cron gives you by scheduling <code>* * * * * env &gt; /tmp/cron-env.txt</code> once, then deleting the entry.</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`# Top of crontab — set PATH and any env vars all jobs need
PATH=/usr/local/bin:/usr/local/sbin:/usr/bin:/bin
NODE_ENV=production

*/10 * * * * /usr/bin/node /home/deploy/app/sync.js`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 5: Other crontab commands you'll need
          </h2>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 18 }}>
            <li><code>crontab -l</code> — list the current user's crontab entries.</li>
            <li><code>crontab -r</code> — remove the entire crontab for the current user (no confirmation — be careful).</li>
            <li><code>sudo crontab -u username -e</code> — edit another user's crontab (requires root).</li>
            <li><code>/etc/crontab</code> and <code>/etc/cron.d/</code> — system-wide crontabs; these require an extra "user" field between the schedule and the command.</li>
            <li><code>systemctl status cron</code> (Debian/Ubuntu) or <code>systemctl status crond</code> (RHEL/CentOS) — confirm the cron daemon itself is running.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I edit the crontab in Linux?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Run <code>crontab -e</code> in a terminal. This opens your user crontab in the
              default editor (often vi or nano). Add one cron expression per line, save, and exit
              — cron picks up the changes automatically without needing a restart.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does my cron job work manually but not from crontab?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The most common cause is PATH. Cron runs with a minimal environment, usually just{' '}
              <code>/usr/bin:/bin</code>, so commands that work in your interactive shell (which
              loads .bashrc or .profile) may not be found. Always use absolute paths to binaries
              and scripts in crontab entries.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Where does crontab output go by default?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              By default cron emails any stdout or stderr output to the crontab owner using the
              local mail system, if one is configured. In practice most servers don't have mail
              set up, so output is silently lost unless you explicitly redirect it to a log file.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Cron Expression Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Before you open <code>crontab -e</code>, describe your schedule in plain English
              and get the exact expression to paste in — no guessing required.
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
              <li><Link href="/blog/debugging-cron-jobs-that-are-not-running">Debugging Cron Jobs That Are Not Running</Link></li>
              <li><Link href="/blog/cron-job-best-practices-for-production">Cron Job Best Practices for Production Systems</Link></li>
              <li><Link href="/blog/cron-jobs-docker-container-tutorial">Running Cron Jobs Inside Docker Containers</Link></li>
              <li><Link href="/blog/top-10-cron-schedule-patterns-developers">Top 10 Cron Schedule Patterns Developers Actually Use</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
