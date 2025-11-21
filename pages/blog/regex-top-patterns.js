// pages/blog/regex-top-patterns.js
import Head from 'next/head';
import Link from 'next/link';

export default function TopRegexPatterns() {
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
        name: 'Blog',
        item: 'https://dev-brains-ai.com/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Top 10 Regex Patterns Every Developer Should Know',
        item: 'https://dev-brains-ai.com/blog/regex-top-patterns',
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Top 10 Regex Patterns Every Developer Should Know | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn the top 10 regular expression patterns every developer should know, with practical examples and how to use them."
        />
        <link
          rel="canonical"
          href="https://dev-brains-ai.com/blog/regex-top-patterns"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <article
          className="card"
          style={{ maxWidth: 800, margin: '0 auto', padding: 24, color: '#0f172a' }}
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
            <ol
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 4,
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Top 10 Regex Patterns</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Top 10 Regex Patterns Every Developer Should Know
          </h1>

          {/* … your existing regex article body here … */}
        </article>
      </main>
    </>
  );
}
