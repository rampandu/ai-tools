import Head from "next/head";

export default function Blog() {
  return (
    <>
      <Head>
        <title>SQL Join Interview Questions With Examples</title>

        <meta
          name="description"
          content="Top SQL Join interview questions with examples for freshers in India. Learn INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN with real interview queries."
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: "SQL Join Interview Questions With Examples",
              author: { "@type": "Organization", name: "Dev-Brains-AI" },
              publisher: { "@type": "Organization", name: "Dev-Brains-AI" }
            })
          }}
        />
      </Head>

      <main style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
        <h1>SQL Join Interview Questions With Examples</h1>

        <p>
          SQL JOIN questions are very common in interviews at Indian IT
          companies like TCS, Infosys, Wipro, Accenture, Capgemini, and startups.
          Freshers are expected to understand INNER JOIN, LEFT JOIN,
          RIGHT JOIN, and FULL JOIN clearly.
        </p>

        <p>
          👉 Try SQL Generator Tool → https://dev-brains-ai.com/sql-generator
        </p>

        <hr />

        <h2>1️⃣ What is SQL JOIN?</h2>

        <p>
          SQL JOIN combines rows from two or more tables based on a related column.
          It is used when data is stored in multiple tables.
        </p>

        <h3>Example Tables</h3>

        <pre>{`
Customers Table
id | name
1  | Ravi
2  | Sita

Orders Table
id | customer_id
10 | 1
11 | 2
12 | 1
`}</pre>

        <hr />

        <h2>2️⃣ INNER JOIN Interview Questions</h2>

        <h3>Q1: Show customers with their orders</h3>

        <pre>{`
SELECT c.name, o.id
FROM customers c
INNER JOIN orders o
ON c.id = o.customer_id;
`}</pre>

        <p>
          INNER JOIN returns only matching rows.
        </p>

        <hr />

        <h2>3️⃣ LEFT JOIN Interview Questions</h2>

        <h3>Q2: Show all customers even without orders</h3>

        <pre>{`
SELECT c.name, o.id
FROM customers c
LEFT JOIN orders o
ON c.id = o.customer_id;
`}</pre>

        <p>
          LEFT JOIN returns all rows from left table.
        </p>

        <hr />

        <h2>4️⃣ RIGHT JOIN Interview Questions</h2>

        <pre>{`
SELECT c.name, o.id
FROM customers c
RIGHT JOIN orders o
ON c.id = o.customer_id;
`}</pre>

        <p>
          RIGHT JOIN returns all rows from right table.
        </p>

        <hr />

        <h2>5️⃣ FULL JOIN Example</h2>

        <pre>{`
SELECT *
FROM customers c
FULL JOIN orders o
ON c.id = o.customer_id;
`}</pre>

        <p>
          FULL JOIN returns all records from both tables.
        </p>

        <hr />

        <h2>6️⃣ Important Interview Queries in India</h2>

        <h3>Find customers without orders</h3>

        <pre>{`
SELECT c.name
FROM customers c
LEFT JOIN orders o
ON c.id = o.customer_id
WHERE o.id IS NULL;
`}</pre>

        <h3>Count orders per customer</h3>

        <pre>{`
SELECT c.name, COUNT(o.id)
FROM customers c
LEFT JOIN orders o
ON c.id = o.customer_id
GROUP BY c.name;
`}</pre>

        <h3>Join 3 Tables</h3>

        <pre>{`
SELECT o.id, c.name, p.product_name
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id;
`}</pre>

        <hr />

        <h2>7️⃣ Common Mistakes Freshers Make</h2>

        <ul>
          <li>Missing ON condition</li>
          <li>Wrong join type</li>
          <li>Duplicate rows confusion</li>
          <li>Forgetting GROUP BY</li>
        </ul>

        <p>
          👉 Use Dev-Brains-AI Error Explainer → https://dev-brains-ai.com/ai-error-explainer
        </p>

        <hr />

        <h2>8️⃣ Real Interview Questions Asked in India</h2>

        <ul>
          <li>Find employees without manager</li>
          <li>Find duplicate records using join</li>
          <li>Get highest salary per department</li>
          <li>Join employee and department tables</li>
        </ul>

        Practice these daily 👍

        <hr />

        <h2>Tips to Crack SQL Join Interviews</h2>

        <ul>
          <li>Practice 10 JOIN queries daily</li>
          <li>Understand real database schemas</li>
          <li>Use MySQL Workbench or PostgreSQL</li>
          <li>Explain logic clearly in interview</li>
        </ul>

        <hr />

        <h2>Conclusion</h2>

        <p>
          SQL JOIN is one of the most important topics for freshers in India.
          Master INNER, LEFT, RIGHT, and FULL JOIN to crack interviews easily.
        </p>

        <p>
          Use Dev-Brains-AI SQL Generator to practice faster.
        </p>

        <p>👉 https://dev-brains-ai.com/</p>
      </main>
    </>
  );
}