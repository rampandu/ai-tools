// pages/blog/cron-jobs-github-actions-tutorial.js
import Head from 'next/head';
import Link from 'next/link';

export default function CronJobsGithubActions() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Cron Jobs in GitHub Actions: Complete Tutorial',
        item: 'https://dev-brains-ai.com/blog/cron-jobs-github-actions-tutorial',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Cron Jobs in GitHub Actions: Complete Tutorial',
    description:
      'Learn how to schedule automated workflows in GitHub Actions using cron expressions. Includes syntax, real examples, debugging tips, and common pitfalls.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/cron-jobs-github-actions-tutorial',
  };

  return (
    <>
      <Head>
        <title>Cron Jobs in GitHub Actions: Complete Tutorial | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn how to schedule GitHub Actions workflows with cron expressions. Includes real YAML examples, debugging tips, timezone handling, and common mistakes to avoid."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/cron-jobs-github-actions-tutorial" />
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
              <li aria-current="page">Cron Jobs in GitHub Actions</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Cron Jobs in GitHub Actions: Complete Tutorial
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            GitHub Actions supports scheduled workflows using the <code>schedule</code> trigger and
            standard cron expressions. This lets you automate tasks like nightly builds, weekly
            dependency audits, daily data syncs, or monthly reports — all within your repository,
            with no external scheduler needed.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Basic scheduled workflow</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Create a file at <code>.github/workflows/scheduled.yml</code>:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`name: Nightly build

on:
  schedule:
    - cron: '0 2 * * *'   # every day at 2:00 AM UTC

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: npm test`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Multiple schedules on one workflow</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            You can define multiple cron triggers in the same workflow:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`on:
  schedule:
    - cron: '0 8 * * 1-5'   # weekdays at 8 AM UTC
    - cron: '0 0 * * 0'     # Sundays at midnight UTC`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Practical schedule examples</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li><code>'*/30 * * * *'</code> — run every 30 minutes (minimum reliable interval is 5 min)</li>
            <li><code>'0 6 * * *'</code> — daily report at 6 AM UTC</li>
            <li><code>'0 9 * * 1'</code> — weekly summary every Monday at 9 AM</li>
            <li><code>'0 0 1 * *'</code> — monthly cleanup on the 1st at midnight</li>
            <li><code>'0 12 * * 1-5'</code> — weekday noon deployment</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Important limitations and gotchas</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li><strong>UTC only</strong> — GitHub Actions cron always runs in UTC. Convert your local time before writing the expression.</li>
            <li><strong>Minimum interval is 5 minutes</strong> — GitHub enforces this; more frequent triggers will be throttled.</li>
            <li><strong>Delays on free plans</strong> — scheduled workflows on free/shared runners can be delayed by up to 15–30 minutes during high load.</li>
            <li><strong>Inactive repos</strong> — GitHub disables scheduled workflows on repos with no activity for 60 days.</li>
            <li><strong>No seconds field</strong> — GitHub Actions uses standard 5-field cron, not 6-field (no seconds).</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Checking when a workflow last ran</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Go to your repo → <strong>Actions</strong> tab → click the workflow name → you will see
            all past runs with their trigger time. You can also manually trigger a scheduled
            workflow using <code>workflow_dispatch</code> for testing:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`on:
  schedule:
    - cron: '0 2 * * *'
  workflow_dispatch:     # allows manual trigger from the UI`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Skipping runs when nothing changed</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            Add a check at the start of your job to exit early if there is nothing to do — this
            saves runner minutes:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`steps:
  - uses: actions/checkout@v4
  - name: Check for changes
    id: check
    run: |
      git fetch origin main
      CHANGES=$(git diff HEAD origin/main --name-only | wc -l)
      echo "changes=$CHANGES" >> $GITHUB_OUTPUT
  - name: Run build
    if: steps.check.outputs.changes > 0
    run: npm run build`}
          </pre>

          <h3 style={{ marginTop: 20, fontSize: '1.1rem', fontWeight: 600 }}>Build your cron expression</h3>
          <p className="small" style={{ marginTop: 8 }}>
            Not sure how to write the cron string for your schedule? Use the{' '}
            <Link href="/cron-generator">Dev Brains AI Cron Expression Generator</Link> — type your
            schedule in plain English and get the correct expression with a field-by-field breakdown.
          </p>

        </article>
      </main>
    </>
  );
}
