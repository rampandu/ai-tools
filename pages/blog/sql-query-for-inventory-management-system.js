// pages/blog/sql-query-for-inventory-management-system.js
import Head from 'next/head';
import Link from 'next/link';

export default function SqlQueryForInventoryManagementSystem() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL Queries for an Inventory Management System',
        item: 'https://dev-brains-ai.com/blog/sql-query-for-inventory-management-system',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL Queries for an Inventory Management System — Stock Levels, Alerts, and Reports',
    description:
      'Practical SQL queries for an inventory management system: current stock levels, low-stock alerts, reorder reports, and stock movement history, with a realistic schema.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-query-for-inventory-management-system',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do you calculate current stock level in SQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Current stock level is calculated by summing signed quantities from a stock movement log — positive for incoming stock (purchases, returns) and negative for outgoing stock (sales, damage). Group by product_id and use SUM(quantity_change) to get the running balance for each item.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you find low-stock items that need to be reordered?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Join a computed current stock level (from a subquery or view summing stock movements) against the product\'s reorder_threshold column, then filter with WHERE current_stock <= reorder_threshold. This flags every item that has dropped to or below its reorder point.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can an AI SQL generator build inventory reports for me?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI free AI SQL Query Builder at dev-brains-ai.com/sql-generator can generate stock level, low-stock, and movement history queries from a plain English description of your inventory schema — review table and column names before running the output.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL Queries for an Inventory Management System | Dev Brains AI</title>
        <meta
          name="description"
          content="Practical SQL queries for an inventory management system: current stock levels, low-stock alerts, reorder reports, and stock movement history, with a schema."
        />
        <meta
          name="keywords"
          content="sql inventory management, inventory management system sql queries, low stock alert sql, stock movement history sql, reorder report sql, sql inventory schema"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-query-for-inventory-management-system" />
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
              <li aria-current="page">SQL for Inventory Management</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL Queries for an Inventory Management System
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Every inventory system needs to answer the same core questions: how much stock do we
            have right now, what needs to be reordered, and what happened to a product over time.
            This guide uses a realistic products-and-movements schema to write the SQL queries
            that answer each of those questions, from current stock levels to full movement
            history reports.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Schema
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Rather than storing a single mutable <code>quantity</code> column on the product (which
            loses history and is prone to race conditions), a robust inventory system logs every
            stock change as an immutable row in a movements table:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`CREATE TABLE products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  sku VARCHAR(50) UNIQUE NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  reorder_threshold INT NOT NULL DEFAULT 10,
  reorder_quantity INT NOT NULL DEFAULT 50
);

CREATE TABLE stock_movements (
  movement_id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  quantity_change INT NOT NULL,       -- positive = in, negative = out
  movement_type VARCHAR(20) NOT NULL, -- 'purchase', 'sale', 'return', 'damage', 'adjustment'
  movement_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reference_id VARCHAR(50),           -- e.g. order number or PO number
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Every purchase order receipt, sale, customer return, and damage write-off becomes a
            row with a signed quantity. The current stock level is never stored directly — it is
            always derived by summing the log, which keeps a complete audit trail.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Current Stock Level per Product
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Summing <code>quantity_change</code> grouped by product gives the current on-hand
            quantity for every item:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  p.product_id,
  p.sku,
  p.product_name,
  COALESCE(SUM(sm.quantity_change), 0) AS current_stock
FROM products p
LEFT JOIN stock_movements sm ON sm.product_id = p.product_id
GROUP BY p.product_id, p.sku, p.product_name
ORDER BY p.product_name;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The LEFT JOIN and <code>COALESCE(..., 0)</code> matter here — a brand-new product with
            no movements yet should show 0 in stock, not disappear from the report or show NULL.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Low-Stock Alerts
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Wrap the stock level calculation in a subquery and compare it against each product's
            reorder threshold to flag items that need restocking:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT *
FROM (
  SELECT
    p.product_id,
    p.sku,
    p.product_name,
    p.reorder_threshold,
    COALESCE(SUM(sm.quantity_change), 0) AS current_stock
  FROM products p
  LEFT JOIN stock_movements sm ON sm.product_id = p.product_id
  GROUP BY p.product_id, p.sku, p.product_name, p.reorder_threshold
) stock_summary
WHERE current_stock <= reorder_threshold
ORDER BY current_stock ASC;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            This query is a good candidate to run on a schedule (a cron job or database event)
            and pipe the results into an email or dashboard alert for the purchasing team.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Reorder Report with Suggested Quantity
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Extend the low-stock query to suggest how much to order, using each product's
            preconfigured <code>reorder_quantity</code>:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  stock_summary.sku,
  stock_summary.product_name,
  stock_summary.current_stock,
  stock_summary.reorder_threshold,
  p.reorder_quantity AS suggested_order_qty
FROM (
  SELECT
    p.product_id,
    p.sku,
    p.product_name,
    p.reorder_threshold,
    COALESCE(SUM(sm.quantity_change), 0) AS current_stock
  FROM products p
  LEFT JOIN stock_movements sm ON sm.product_id = p.product_id
  GROUP BY p.product_id, p.sku, p.product_name, p.reorder_threshold
) stock_summary
JOIN products p ON p.product_id = stock_summary.product_id
WHERE stock_summary.current_stock <= stock_summary.reorder_threshold
ORDER BY stock_summary.current_stock ASC;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Stock Movement History for a Product
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            To audit exactly what happened to a specific SKU — every sale, restock, and
            adjustment in order — query the movements table directly and compute a running
            balance with a window function:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  sm.movement_date,
  sm.movement_type,
  sm.quantity_change,
  sm.reference_id,
  SUM(sm.quantity_change) OVER (
    ORDER BY sm.movement_date, sm.movement_id
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_balance
FROM stock_movements sm
JOIN products p ON p.product_id = sm.product_id
WHERE p.sku = 'SKU-10245'
ORDER BY sm.movement_date, sm.movement_id;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The running balance lets you see stock level at any point in the past, which is
            invaluable for investigating discrepancies between physical counts and system
            records.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Monthly Movement Summary by Type
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            For a higher-level view, summarize movement volume by type and month — useful for
            spotting trends in sales velocity, damage rates, or return volume:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  DATE_FORMAT(movement_date, '%Y-%m') AS month,
  movement_type,
  SUM(ABS(quantity_change)) AS total_units,
  COUNT(*) AS movement_count
FROM stock_movements
WHERE movement_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
GROUP BY DATE_FORMAT(movement_date, '%Y-%m'), movement_type
ORDER BY month DESC, movement_type;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            In PostgreSQL, replace <code>DATE_FORMAT(movement_date, '%Y-%m')</code> with{' '}
            <code>TO_CHAR(movement_date, 'YYYY-MM')</code> and{' '}
            <code>DATE_SUB(CURDATE(), INTERVAL 6 MONTH)</code> with{' '}
            <code>CURRENT_DATE - INTERVAL '6 months'</code>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Design Tips for Inventory Schemas
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Never store a mutable running quantity directly on the product row if you also need history — derive it from the movement log instead, or maintain both with a trigger for performance</li>
            <li>Index <code>stock_movements(product_id, movement_date)</code> so per-product history queries stay fast as the log grows</li>
            <li>Use a <code>movement_type</code> enum or lookup table to keep reporting consistent across purchase, sale, return, damage, and adjustment entries</li>
            <li>Store <code>reference_id</code> to link a movement back to its source order, purchase order, or adjustment ticket for traceability</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do you calculate current stock level in SQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Current stock level is calculated by summing signed quantities from a stock movement log — positive for incoming stock (purchases, returns) and negative for outgoing stock (sales, damage). Group by product_id and use SUM(quantity_change) to get the running balance for each item.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do you find low-stock items that need to be reordered?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Join a computed current stock level (from a subquery or view summing stock movements) against the product's reorder_threshold column, then filter with WHERE current_stock &lt;= reorder_threshold. This flags every item that has dropped to or below its reorder point.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can an AI SQL generator build inventory reports for me?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. Dev Brains AI free AI SQL Query Builder can generate stock level, low-stock, and movement history queries from a plain English description of your inventory schema — review table and column names before running the output.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe the inventory report you need in plain English and get a ready-to-run query instantly.
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
              <li><Link href="/blog/sql-query-for-employee-attendance-report">SQL Query for Employee Attendance Report</Link></li>
              <li><Link href="/blog/sql-group-by-having-clause-explained">SQL GROUP BY and HAVING Clause Explained</Link></li>
              <li><Link href="/blog/sql-window-functions-explained-with-examples">SQL Window Functions Explained with Examples</Link></li>
              <li><Link href="/blog/sql-optimization-techniques-for-large-tables">SQL Optimization Techniques for Large Tables</Link></li>
              <li><Link href="/blog/sql-query-generator-tutorial-for-beginners">SQL Query Generator Tutorial for Beginners</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
