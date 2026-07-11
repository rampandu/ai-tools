import Head from 'next/head';
import Link from 'next/link';

export default function SqlQueryForSalesReportDashboard() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL Queries for Sales Report Dashboards',
        item: 'https://dev-brains-ai.com/blog/sql-query-for-sales-report-dashboard',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL Queries for Sales Report Dashboards',
    description:
      'Ready-to-use SQL queries for building sales report dashboards: revenue by month, revenue by region, top-selling products, and month-over-month growth.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-query-for-sales-report-dashboard',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I calculate monthly revenue in SQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Group your orders table by a truncated or formatted order date (month and year), then sum the order amount for each group. In PostgreSQL use DATE_TRUNC, and in MySQL use DATE_FORMAT.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I find the top-selling products with SQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Join your order_items table to the products table, group by product, sum the quantity or revenue, order the result descending, and use LIMIT to show only the top N products.',
        },
      },
      {
        '@type': 'Question',
        name: 'What SQL function calculates month-over-month growth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use the LAG() window function to pull the previous month’s revenue into the same row as the current month, then calculate the percentage difference between the two values.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL Queries for Sales Report Dashboards | Dev Brains AI</title>
        <meta
          name="description"
          content="Ready-to-use SQL queries for building sales report dashboards: revenue by month, by region, top products, and month-over-month growth calculations."
        />
        <meta
          name="keywords"
          content="sql sales report query, revenue by month sql, top selling products sql, sales dashboard sql, sql query for sales analysis, month over month growth sql"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-query-for-sales-report-dashboard" />
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
              <li aria-current="page">SQL Query for Sales Report Dashboard</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL Queries for Sales Report Dashboards
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Most internal sales dashboards are built on top of a handful of recurring SQL patterns: revenue by month,
            revenue by region, top-selling products, and growth compared to the previous period. This guide gives you
            copy-paste-ready queries for each of these, based on a typical e-commerce style schema.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Sample schema</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`orders
------------------------
id          INT PRIMARY KEY
customer_id INT
region      VARCHAR(50)
order_date  DATE
total       DECIMAL(10,2)

order_items
------------------------
id          INT PRIMARY KEY
order_id    INT
product_id  INT
quantity    INT
price       DECIMAL(10,2)

products
------------------------
id          INT PRIMARY KEY
name        VARCHAR(100)`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Revenue by month</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            In PostgreSQL, DATE_TRUNC groups timestamps by month cleanly:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- PostgreSQL
SELECT
  DATE_TRUNC('month', order_date) AS month,
  SUM(total) AS revenue
FROM orders
GROUP BY month
ORDER BY month;`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            In MySQL, use DATE_FORMAT instead:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- MySQL
SELECT
  DATE_FORMAT(order_date, '%Y-%m') AS month,
  SUM(total) AS revenue
FROM orders
GROUP BY month
ORDER BY month;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Revenue by region</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  region,
  COUNT(*) AS total_orders,
  SUM(total) AS revenue
FROM orders
GROUP BY region
ORDER BY revenue DESC;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Top-selling products</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            This joins order_items to products and ranks by total revenue generated, limited to the top 10:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  p.name AS product_name,
  SUM(oi.quantity) AS units_sold,
  SUM(oi.quantity * oi.price) AS revenue
FROM order_items oi
JOIN products p ON oi.product_id = p.id
GROUP BY p.name
ORDER BY revenue DESC
LIMIT 10;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Month-over-month growth</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Use the LAG() window function to compare each month's revenue against the previous month:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`WITH monthly AS (
  SELECT
    DATE_TRUNC('month', order_date) AS month,
    SUM(total) AS revenue
  FROM orders
  GROUP BY month
)
SELECT
  month,
  revenue,
  LAG(revenue) OVER (ORDER BY month) AS previous_month_revenue,
  ROUND(
    (revenue - LAG(revenue) OVER (ORDER BY month)) /
    NULLIF(LAG(revenue) OVER (ORDER BY month), 0) * 100, 2
  ) AS growth_percent
FROM monthly
ORDER BY month;`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            Tips for building dashboard-ready SQL:
          </p>
          <ul className="small" style={{ marginBottom: 14, paddingLeft: 20 }}>
            <li>Use NULLIF to avoid divide-by-zero errors when calculating percentages.</li>
            <li>Always add an index on order_date and region if you filter or group by them frequently.</li>
            <li>Store pre-aggregated summary tables for very large datasets to avoid recomputing on every dashboard load.</li>
            <li>Use LIMIT with ORDER BY together — LIMIT alone without ORDER BY gives unpredictable rows.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Generating custom report queries</h2>
          <p className="small" style={{ marginBottom: 12 }}>
            If your schema differs from the example above, an AI SQL generator can adapt these patterns to your exact
            table and column names — just describe the report you need, such as "top 5 regions by revenue this quarter."
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>Frequently Asked Questions</h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I calculate monthly revenue in SQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Group your orders table by a truncated or formatted order date (month and year), then sum the order
              amount for each group. In PostgreSQL use DATE_TRUNC, and in MySQL use DATE_FORMAT.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I find the top-selling products with SQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Join your order_items table to the products table, group by product, sum the quantity or revenue,
              order the result descending, and use LIMIT to show only the top N products.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What SQL function calculates month-over-month growth?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use the LAG() window function to pull the previous month's revenue into the same row as the current
              month, then calculate the percentage difference between the two values.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe the sales report you need in plain English and get a working SQL query for your dashboard instantly.
            </p>
            <Link href="/sql-generator">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open AI SQL Query Builder →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/sql-window-functions-explained-with-examples">SQL Window Functions Explained with Examples</Link></li>
              <li><Link href="/blog/sql-optimization-techniques-for-large-tables">SQL Optimization Techniques for Large Tables</Link></li>
              <li><Link href="/blog/natural-language-to-sql-guide">Natural Language to SQL — How AI SQL Generators Work</Link></li>
              <li><Link href="/blog/free-mysql-query-generator-online">Free MySQL Query Generator Online</Link></li>
              <li><Link href="/blog/sql-query-for-duplicate-records-detection">SQL Query to Find and Remove Duplicate Records</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
