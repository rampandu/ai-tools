// pages/index.js
import Head from 'next/head';
import Hero from '../components/Hero';
import AdSlot from '../components/AdSlot'; 
import Footer from '../components/Footer';

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dev-brains-ai.com';

  return (
    <>
      <Head>
        <title>Dev Brains AI — Free AI Tools for Developers (Regex, SQL & More)</title>
        <meta
          name="description"
          content="Dev Brains AI offers free AI-powered developer tools like Regex Generator, SQL Query Builder, JSON Formatter, Error Explainer, and JSON Schema Generator."
        />
        <meta
          name="keywords"
          content="regex generator, sql generator, json formatter, error explainer, json schema generator, developer tools, Dev Brains AI"
        />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:title" content="AI Dev Tools — Regex, SQL & JSON" />
        <meta
          property="og:description"
          content="Free developer tools: convert plain English to regex and SQL, format JSON, explain errors, and generate JSON Schema."
        />
        <meta property="og:image" content={`${siteUrl}/logo.png`} />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <Hero />

        {/* Optional ad slot — safe placeholder if AdSlot exists */}
        {typeof AdSlot !== 'undefined' && <AdSlot adSlot="" style={{ marginTop: 18 }} />}

        {/* Tools grid */}
        <section className="card" style={{ marginTop: 22 }}>
          <h2>AI Dev Tools at a glance</h2>
          <p className="small">
            Explore the current set of free tools built for developers. Each tool runs in your
            browser and is designed to save you time on everyday tasks.
          </p>

          <div
            style={{
              marginTop: 16,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}
          >
            <div className="card small">
              <h3 style={{ marginBottom: 6 }}>AI Regex Generator</h3>
              <p className="small">
                Convert plain English into regular expressions with readable explanations. Great for
                validation, parsing, and log analysis.
              </p>
              <a href="/regex-generator" className="small" style={{ marginTop: 8, display: 'inline-block' }}>
                Open Regex Generator →
              </a>
            </div>

            <div className="card small">
              <h3 style={{ marginBottom: 6 }}>AI SQL Generator</h3>
              <p className="small">
                Describe the data you need and get ready-to-run SQL queries for MySQL, PostgreSQL,
                SQL Server, SQLite, and more.
              </p>
              <a href="/sql-generator" className="small" style={{ marginTop: 8, display: 'inline-block' }}>
                Open SQL Generator →
              </a>
            </div>

            <div className="card small">
              <h3 style={{ marginBottom: 6 }}>JSON Formatter &amp; Validator</h3>
              <p className="small">
                Pretty-print, validate, and minify JSON directly in your browser. Perfect for API
                responses, logs, and configuration files.
              </p>
              <a href="/json-formatter" className="small" style={{ marginTop: 8, display: 'inline-block' }}>
                Open JSON Formatter →
              </a>
            </div>

            <div className="card small">
              <h3 style={{ marginBottom: 6 }}>AI Error Message Explainer</h3>
              <p className="small">
                Paste JavaScript or web errors and get a human-readable explanation plus practical
                debugging steps.
              </p>
              <a href="/ai-error-explainer" className="small" style={{ marginTop: 8, display: 'inline-block' }}>
                Open Error Explainer →
              </a>
            </div>

            <div className="card small">
              <h3 style={{ marginBottom: 6 }}>AI JSON Schema Generator</h3>
              <p className="small">
                Paste example JSON and instantly generate a draft-style JSON Schema as a starting
                point for validation and API contracts.
              </p>
              <a
                href="/json-schema-generator"
                className="small"
                style={{ marginTop: 8, display: 'inline-block' }}
              >
                Open Schema Generator →
              </a>
            </div>
          </div>
        </section>

        {/* Previous "Get started" section can remain as a simpler CTA */}
        <section className="card" style={{ marginTop: 18 }}>
          <h2>Get started</h2>
          <p className="small">
            Jump straight into a tool. Each page includes examples, explanations, and FAQs so you
            can be productive in a few seconds.
          </p>
          <div
            style={{
              marginTop: 12,
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            <a href="/regex-generator" className="btn">
              Open Regex Generator
            </a>
            <a href="/sql-generator" className="btn">
              Open SQL Generator
            </a>
            <a href="/json-formatter" className="btn">
              Open JSON Formatter
            </a>
          </div>
        </section>

        <section className="card" style={{ marginTop: 18 }}>
          <h2>Privacy</h2>
          <p className="small">
            This demo collects no personal data by default. Read the Privacy page before enabling
            advertising or analytics.
          </p>
        </section>
{/*
        <section style={{ marginTop: 18 }}>
          <div className="card">
            <h3>Newsletter (optional)</h3>
            <p className="small">
              Get notified when new tools or features are added. No spam — you can unsubscribe
              anytime.
            </p>

            <form
              id="subscribeForm"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const email = form.email.value;
                try {
                  const res = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                  });
                  const j = await res.json();
                  if (!res.ok) throw j;
                  alert('Thanks — you are subscribed (demo).');
                  form.reset();
                } catch (err) {
                  console.error(err);
                  alert('Subscription failed. Try again later.');
                }
              }}
            >
       
              
              <div style={{ display: 'flex', gap: 8, maxWidth: 520 }}>
                <input name="email" type="email" placeholder="you@yourdomain.com" required />
                <button type="submit">Subscribe</button>
              </div>
              <div className="small" style={{ marginTop: 8 }}>
                We store emails in memory for this demo. Replace with your mailing provider for
                production.
              </div>
            </form>
          </div>
        </section>
        */}
      </main>
        <Footer />
    </>
  );
}
