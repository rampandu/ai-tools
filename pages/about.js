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
      'Dev Brains AI creates free AI-powered tools for developers, including regex and SQL generators.',
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
      'Learn about Dev Brains AI, a project focused on creating free AI developer tools such as regex and SQL generators.',
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
            <strong>Dev Brains AI</strong> is a free online toolkit built to help developers work
            faster using artificial intelligence. Our goal is to make complex technical tasks — like
            generating regular expressions or writing SQL queries — simple, accurate, and instant.
          </p>

          <p className="small" style={{ marginBottom: 16 }}>
            We use open and intelligent AI models to bring practical, everyday tools for developers,
            students, and data analysts. Each tool on this site is designed to save you time and let
            you focus on solving real problems instead of memorizing syntax.
          </p>

          <p className="small" style={{ marginBottom: 16 }}>
            Current tools include:
          </p>

          <ul className="small" style={{ paddingLeft: 20, marginBottom: 16 }}>
            <li>
              <Link href="/regex-generator">AI Regex Generator</Link> – convert text into regex
              patterns
            </li>
            <li>
              <Link href="/sql-generator">AI SQL Generator</Link> – convert English into SQL queries
            </li>
            <li>
              <Link href="/blog">Developer Blog</Link> – tutorials and practical AI guides
            </li>
          </ul>

          <p className="small">
            Dev Brains AI is continuously evolving. We plan to add more tools, tutorials, and
            learning resources that make coding easier, faster, and more enjoyable for everyone.
          </p>
        </section>
      </main>
    </>
  );
}
