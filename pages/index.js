import Head from 'next/head';
import Link from 'next/link';

export default function Home(){
  return (
    <div className="container">
      <Head>
        <title>AI Dev Tools — Regex & SQL Generator (Free)</title>
        <meta name="description" content="Free AI-powered Regex Generator and SQL Query Generator. Convert plain English to regex or SQL instantly. No signup." />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'} />
      </Head>

      <div className="header">
        <h1>AI Dev Tools</h1>
        <nav>
          <Link href="/regex-generator">Regex</Link> {' | '}
          <Link href="/sql-generator">SQL</Link>
        </nav>
      </div>

      <p className="small">Free, open-source model powered developer tools. Useful for developers, QA, and students. Start with Regex and SQL generators.</p>

      <div className="card">
        <h2>Get started</h2>
        <p className="small">Pick a tool: high-quality SEO-friendly pages for regex and sql generators are ready. Each tool page includes examples and an FAQ required for AdSense reviews.</p>
        <p><Link href="/regex-generator"><button>Open Regex Generator</button></Link></p>
      </div>

      <div className="card">
        <h3>Privacy</h3>
        <p className="small">This demo collects no personal data. See Privacy Policy page before enabling AdSense.</p>
      </div>

      <footer className="small">© {new Date().getFullYear()} AI Dev Tools — Built with open models</footer>
    </div>
  );
}
