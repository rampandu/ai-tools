// pages/blog/cron-expression-explainer-guide-how-it-works.js
import Head from 'next/head';
import Link from 'next/link';

export default function CronExplainerGuide() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Cron Expression Explainer Guide: How to Read the Output',
        item: 'https://dev-brains-ai.com/blog/cron-expression-explainer-guide-how-it-works',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Cron Expression Explainer Guide: How to Read the Output',
    description:
      "A worked example showing how the Cron Expression Explainer turns */15 9-17 * * 1-5 into a plain-English sentence and next-run list, plus why the timezone you pick changes the answer.",
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/cron-expression-explainer-guide-how-it-works',
    datePublished: '2026-08-01',
    dateModified: '2026-08-01',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does the "next run times" list actually show?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It shows the next 10 real calendar moments your cron expression will fire, computed from the current time in the timezone you selected. This is useful for sanity-checking a schedule before deploying it, especially for expressions with day-of-week or day-of-month restrictions where it is easy to miscount.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does changing the timezone dropdown change the next run times?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A cron expression like "0 9 * * *" only specifies a time — it has no timezone attached. The explainer needs you to specify one to compute a real moment, exactly like your actual cron daemon or scheduler needs to be configured with one. Switching the dropdown answers "what would this mean if the server were set to this zone," which is why the listed run times shift.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this support both 5-field and 6-field cron syntax?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Standard 5-field cron (minute hour day-of-month month day-of-week) and 6-field cron with a leading seconds field, used by Quartz, Spring, and node-cron, are both parsed correctly.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Cron Expression Explainer Guide: How to Read the Output | Dev Brains AI</title>
        <meta
          name="description"
          content="A worked example showing how the Cron Expression Explainer turns a cron string into a plain-English sentence and next-run list, plus why timezone changes the answer."
        />
        <meta
          name="keywords"
          content="cron expression explainer guide, how to read cron output, cron next run times, cron expression timezone explained, cron describer tutorial"
        />
        <meta property="og:title" content="Cron Expression Explainer Guide: How to Read the Output" />
        <meta property="og:description" content="A worked example showing how the Cron Expression Explainer turns a cron string into a plain-English sentence and next-run list, plus why timezone changes the answer." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/cron-expression-explainer-guide-how-it-works" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/cron-expression-explainer-guide-how-it-works" />
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
              <li aria-current="page">Cron Expression Explainer Guide</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Cron Expression Explainer Guide: How to Read the Output
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            The <Link href="/cron-explainer">Cron Expression Explainer</Link> takes a cron string
            and returns two things: a plain-English sentence describing the schedule, and the next
            10 real moments it will fire. This guide walks through a realistic expression so you
            know exactly how to read both parts — and why the timezone you pick changes the answer.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            A Worked Example
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Paste this expression — a common "check every 15 minutes during business hours" pattern:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`*/15 9-17 * * 1-5`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The tool returns the description <strong>"Every 15 minutes, between 09:00 AM and 05:59
            PM, Monday through Friday."</strong> Each field maps to one clause: <code>*/15</code>{' '}
            in the minute field becomes "every 15 minutes," <code>9-17</code> in the hour field
            becomes the business-hours window, and <code>1-5</code> in the day-of-week field
            becomes "Monday through Friday" (cron numbers weekdays 0-6 starting from Sunday, so 1
            is Monday and 5 is Friday — a common source of off-by-one mistakes when writing cron by
            hand).
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Reading the Next-Run List
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Below the description, the tool lists the next 10 actual times the expression will
            fire, computed from right now in whichever timezone you selected. For{' '}
            <code>*/15 9-17 * * 1-5</code> starting on a Friday afternoon, that list might show
            three or four more runs before 6 PM, then jump straight to Monday morning at 9:00 — the
            weekend and evening hours are correctly skipped. This is the fastest way to catch a
            mistake before deploying: if the list shows runs at times or days you didn't expect,
            re-check the field you think is wrong.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Why the Timezone Dropdown Matters
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A cron expression has no timezone of its own — <code>0 9 * * *</code> means "9 AM in
            whatever timezone the machine executing it is configured with." Switch the dropdown
            from UTC to <code>Asia/Kolkata</code> and the same expression's next-run list shifts by
            5 hours 30 minutes, because you're now asking "what does 9 AM mean if the server
            thinks it's in India." This mirrors the real-world confusion behind most "why did my
            cron job fire at the wrong time" bugs — the fix is almost always confirming what
            timezone the actual server or container is set to, not the expression itself. See{' '}
            <Link href="/blog/cron-expression-timezone-handling-guide">
              the cron timezone handling guide
            </Link>{' '}
            for how to check and set this correctly in Linux crontab, Docker, and cloud schedulers.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What does the "next run times" list actually show?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The next 10 real calendar moments the expression will fire, computed from now in the
              selected timezone — useful for sanity-checking a schedule before deploying it.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does changing the timezone dropdown change the next run times?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Cron expressions don't carry a timezone. The dropdown lets you answer "what would
              this mean if the server were set to this zone" — the same setting your real scheduler
              needs configured correctly.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does this support both 5-field and 6-field cron syntax?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes — standard 5-field cron and 6-field cron with a leading seconds field (Quartz,
              Spring, node-cron) are both parsed correctly.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Cron Expression Explainer</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Paste your own cron expression and see a plain-English description plus its next 10
              run times. No signup, no cost.
            </p>
            <Link href="/cron-explainer">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open Cron Expression Explainer →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/cron-expression-complete-guide">Cron Expression Complete Guide for Developers</Link></li>
              <li><Link href="/blog/cron-expression-timezone-handling-guide">Cron Expression Timezone Handling Guide</Link></li>
              <li><Link href="/blog/cron-expression-examples-every-5-minutes">Cron Expression Examples: Every 5 Minutes and More</Link></li>
              <li><Link href="/cron-generator">AI Cron Generator</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
