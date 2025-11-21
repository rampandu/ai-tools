// pages/index.js
import Head from 'next/head';
import Hero from '../components/Hero';
import AdSlot from '../components/AdSlot'; // keep this

export default function Home() {
  //const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dev-brains-ai.com';


  return (
    <>
      <Head>
        <title>Dev Brains AI — Free AI Tools for Developers (Regex, SQL & More)</title>
        <meta
          name="description"
          content="Dev Brains AI offers free AI-powered developer tools like Regex Generator and SQL Query Builder. Generate code, queries, and patterns instantly with open models."
        />
        <meta name="keywords" content="regex generator, sql generator, developer tools" />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:title" content="AI Dev Tools — Regex & SQL Generator" />
        <meta
          property="og:description"
          content="Free developer tools: convert plain English to regular expressions and SQL queries."
        />
        <meta property="og:image" content={`${siteUrl}/logo.png`} />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <Hero />

        {/* Optional ad slot — safe placeholder if AdSlot exists */}
        {typeof AdSlot !== 'undefined' && <AdSlot adSlot="" style={{ marginTop: 18 }} />}

        <section className="card" style={{ marginTop: 22 }}>
          <h2>Get started</h2>
          <p className="small">
            Pick a tool: high-quality SEO-friendly pages for regex and SQL generators are ready.
            Each tool includes examples and FAQ.
          </p>
          <div style={{ marginTop: 12 }}>   
        <a href="/regex-generator" className="btn">Open Regex Generator</a>
          </div>
        </section>

        <section className="card" style={{ marginTop: 18 }}>
          <h2>Privacy</h2>
          <p className="small">
            This demo collects no personal data by default. Read the Privacy page before enabling
            advertising or analytics.
          </p>
        </section>

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
      </main>
    </>
  );
}
