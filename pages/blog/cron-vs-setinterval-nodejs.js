// pages/blog/cron-vs-setinterval-nodejs.js
import Head from 'next/head';
import Link from 'next/link';

export default function CronVsSetInterval() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Cron vs setInterval in Node.js — Which Should You Use?',
        item: 'https://dev-brains-ai.com/blog/cron-vs-setinterval-nodejs',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Cron vs setInterval in Node.js — Which Should You Use?',
    description:
      'Compare cron-based scheduling with setInterval in Node.js. Learn when to use node-cron, cron packages, or simple timers with real code examples.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/cron-vs-setinterval-nodejs',
  };

  return (
    <>
      <Head>
        <title>Cron vs setInterval in Node.js — Which Should You Use? | Dev Brains AI</title>
        <meta
          name="description"
          content="Compare cron-based scheduling with setInterval in Node.js. Learn when to use node-cron or the cron package vs simple timers, with real code examples and trade-offs."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/cron-vs-setinterval-nodejs" />
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
              <li aria-current="page">Cron vs setInterval in Node.js</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Cron vs setInterval in Node.js — Which Should You Use?
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            When you need to run code on a schedule in Node.js you have two main options:
            JavaScript's built-in <code>setInterval</code> or a cron-based library like{' '}
            <code>node-cron</code>. Both work, but they solve different problems. Picking the wrong
            one leads to subtle bugs around drift, missed runs, and time zone handling.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>setInterval — the quick option</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>setInterval</code> runs a function every N milliseconds from the moment it is
            called. It does not know about wall-clock time.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`// Run every 5 minutes
setInterval(() => {
  console.log('tick:', new Date().toISOString());
  doWork();
}, 5 * 60 * 1000);`}
          </pre>
          <p className="small" style={{ marginTop: 8, marginBottom: 8 }}>
            <strong>Pros:</strong> zero dependencies, simple, good for fixed intervals.
            <br />
            <strong>Cons:</strong> drifts over time (each callback adds a tiny delay), restarts
            reset the clock, can't express "every Monday at 9 AM", no timezone awareness.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>node-cron — wall-clock scheduling</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            <code>node-cron</code> fires tasks at exact calendar times using cron expressions.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`import cron from 'node-cron';

// Every weekday at 9:00 AM in Asia/Kolkata timezone
cron.schedule('0 9 * * 1-5', () => {
  console.log('Morning job running:', new Date().toISOString());
  doWork();
}, {
  timezone: 'Asia/Kolkata'
});`}
          </pre>
          <p className="small" style={{ marginTop: 8, marginBottom: 8 }}>
            <strong>Pros:</strong> expressive schedules, timezone support, survives daylight saving
            changes, aligns to wall-clock minutes.
            <br />
            <strong>Cons:</strong> adds a dependency, slightly more setup.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>The cron package (alternative)</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            The <code>cron</code> npm package offers a similar API with <code>CronJob</code> objects
            that can be started and stopped programmatically:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`import { CronJob } from 'cron';

const job = new CronJob(
  '0 0 * * 0',            // every Sunday at midnight
  () => { weeklyReport(); },
  null,                   // onComplete
  true,                   // start immediately
  'Asia/Kolkata'
);

// Stop after first run
job.stop();`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Decision guide</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li>Use <strong>setInterval</strong> for simple, interval-based tasks where exact wall-clock time does not matter (e.g., polling an API every 30 seconds).</li>
            <li>Use <strong>node-cron</strong> or <strong>cron</strong> when the task must run at a specific time of day, day of week, or on a calendar-based schedule.</li>
            <li>Use an external scheduler (GitHub Actions, AWS EventBridge, Render cron jobs) when your Node.js server may restart or scale to multiple instances — you don't want duplicate job runs.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Handling overlapping runs</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            If your task takes longer than the schedule interval, you can end up with overlapping
            executions. Use a simple flag to prevent this:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`let running = false;

cron.schedule('*/5 * * * *', async () => {
  if (running) return; // skip if previous run hasn't finished
  running = true;
  try {
    await doWork();
  } finally {
    running = false;
  }
});`}
          </pre>

          <h3 style={{ marginTop: 20, fontSize: '1.1rem', fontWeight: 600 }}>Build your cron expression</h3>
          <p className="small" style={{ marginTop: 8 }}>
            Use the{' '}
            <Link href="/cron-generator">Dev Brains AI Cron Expression Generator</Link> to convert
            plain English like "every 5 minutes" or "every weekday at 9am" into the correct cron
            string for node-cron.
          </p>

        </article>
      </main>
    </>
  );
}
