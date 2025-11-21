// pages/blog/ai-sql-practical.js
import Head from 'next/head';
import Link from 'next/link';

export default function AISqlPractical() {
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
        name: 'How AI Can Speed Up SQL Writing: Practical Examples & Prompts',
        item: 'https://dev-brains-ai.com/blog/ai-sql-practical',
      },
    ],
  };

  return (
    <>
      <Head>
        <title>How AI Can Speed Up SQL Writing: Practical Examples & Prompts | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn how AI can help you write SQL faster with practical prompt examples and patterns for common queries."
        />
        <link
          rel="canonical"
          href="https://dev-brains-ai.com/blog/ai-sql-practical"
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
              <li aria-current="page">
                How AI Can Speed Up SQL Writing
              </li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            How AI Can Speed Up SQL Writing: Practical Examples & Prompts
          </h1>

          {/* … your existing article body unchanged … */}
          {/* keep all the paragraphs / pre blocks you already have here */}
        </article>
      </main>
    </>
  );
}
