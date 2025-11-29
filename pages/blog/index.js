// pages/blog/index.js
import Head from 'next/head';
import Link from 'next/link';

const POSTS = [
  {
    slug: 'regex-top-patterns',
    title: 'Top 10 Regex Patterns Every Developer Should Know',
    description:
      'Email validation, phone numbers, URLs, and other must-know regex patterns with explanations.',
  },
  {
    slug: 'ai-sql-practical',
    title: 'How AI Can Speed Up SQL Writing: Practical Examples & Prompts',
    description:
      'Real-world examples of using AI to generate reports, analytics queries, and dashboards from plain English.',
  },
  {
    slug: 'ai-dev-tools-save-time',
    title: '5 AI Dev Tools That Save You Time (Using Dev Brains AI)',
    description:
      'Overview of five free tools — regex, SQL, JSON formatting, error explaining, and schema generation — and how to use them together.',
  },
];

export default function BlogIndex() {
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
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 22 }}>
      <Head>
        <title>Dev Brains AI Blog — Regex & SQL with AI</title>
        <meta
          name="description"
          content="Browse Dev Brains AI blog posts on regular expressions, SQL, and practical AI tools for developers."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
                <!-- Google tag (gtag.js) -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17753334820">
        </script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-17753334820');
        </script>
      </Head>

      <div
        className="card"
        style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}
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
            <li aria-current="page">Blog</li>
          </ol>
        </nav>

        <h1>Dev Brains AI Blog</h1>
        <p className="small">
          Tutorials and practical guides on regular expressions, SQL, and AI-powered developer
          tools.
        </p>

        <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
          {POSTS.map((post) => (
            <li
              key={post.slug}
              className="card small"
              style={{ marginBottom: 12, padding: 12 }}
            >
              <h2 style={{ marginBottom: 4, fontSize: '1.1rem' }}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="small" style={{ marginTop: 4 }}>
                {post.description}
              </p>
              <Link href={`/blog/${post.slug}`} className="small">
                Read article →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
