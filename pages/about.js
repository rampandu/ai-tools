// pages/about.js
import Head from "next/head";
import Link from "next/link";

export default function About() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://dev-brains-ai.com/#organization',
    name: 'Dev Brains AI',
    url: 'https://dev-brains-ai.com/',
    logo: 'https://dev-brains-ai.com/logo.png',
    description:
      'Dev Brains AI builds 31 free browser-based developer tools — regex, SQL, JSON, cron, JWT, hashing, and encoding utilities — plus 150+ in-depth guides.',
  };

  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://dev-brains-ai.com/about',
    },
    url: 'https://dev-brains-ai.com/about',
    name: 'About Dev Brains AI',
    description:
      'Dev Brains AI is a free toolkit of 31 browser-based developer utilities and 150+ guides covering regex, SQL, JSON, cron, JWT, and encoding.',
    publisher: {
      '@id': 'https://dev-brains-ai.com/#organization',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://dev-brains-ai.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://dev-brains-ai.com/about',
      },
    ],
  };

  return (
    <>
      <Head>
        <title>About Dev Brains AI | Free AI Developer Tools</title>
        <meta
          name="description"
          content="Dev Brains AI creates free, open, and intelligent tools for developers — from Regex and SQL Generators to AI-powered productivity utilities."
        />
        <meta property="og:title" content="About Dev Brains AI" />
        <meta
          property="og:description"
          content="Our mission is to make AI accessible to every developer through free tools and open technology."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/about" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://dev-brains-ai.com/about" />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <section
          className="card"
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: 24,
            color: "#0f172a",
          }}
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
            <ol
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">About</li>
            </ol>
          </nav>

          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            About Dev Brains AI
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            <strong>Dev Brains AI</strong> is a free toolkit of 31 browser-based utilities for
            developers — regex, SQL, JSON, cron, JWT, hashing, encoding, and more — plus a library of
            150+ in-depth guides covering how each format and pattern actually works, not just a
            generator you paste output from without understanding it.
          </p>

          <p className="small" style={{ marginBottom: 16 }}>
            Every tool runs either entirely in your browser or through a stateless API call — nothing
            you paste in is stored. There's no account, no signup, and no usage cap pushing you toward
            a paid tier. See the <Link href="/privacy">Privacy Policy</Link> for the specifics of what
            each tool does and doesn't send anywhere.
          </p>

          <p className="small" style={{ marginBottom: 16 }}>
            The toolkit is organized into four groups — browse them all on the{' '}
            <Link href="/">homepage</Link>:
          </p>

          <ul className="small" style={{ paddingLeft: 20, marginBottom: 16 }}>
            <li>
              <strong>Generate</strong> — <Link href="/regex-generator">Regex</Link>,{' '}
              <Link href="/sql-generator">SQL</Link>, <Link href="/cron-generator">cron</Link>,{' '}
              README, API docs, unit tests, commit messages, and docstrings from a plain-English
              description.
            </li>
            <li>
              <strong>Explain</strong> — paste a regex, SQL query, code snippet, stack trace, or error
              message and get a plain-English breakdown, including a <Link href="/jwt-decoder">JWT decoder</Link>.
            </li>
            <li>
              <strong>Convert &amp; Format</strong> — JSON, Base64, URL encoding, cURL-to-code, SQL
              formatting, YAML↔JSON, and live Markdown preview.
            </li>
            <li>
              <strong>Utilities</strong> — diff checker, timestamp converter, UUID generator, password
              generator, hash generator, and color converter.
            </li>
          </ul>

          <p className="small">
            The <Link href="/blog">blog</Link> is where the "why," not just the "how," lives —
            explanations of the formats and syntax behind the tools, common mistakes, and worked
            examples for real scenarios. Dev Brains AI adds new tools and guides on an ongoing basis;
            if a tool you need doesn't exist yet, that's useful to know — reach out via the{' '}
            <Link href="/contact">contact page</Link>.
          </p>
        </section>
      </main>
    </>
  );
}
