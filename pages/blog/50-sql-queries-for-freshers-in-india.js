import Head from "next/head";

export default function Blog() {
  return (
    <>
      <Head>
        <title>50 SQL Queries for Freshers in India</title>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: "50 SQL Queries for Freshers in India",
              author: { "@type": "Organization", name: "Dev-Brains-AI" },
              publisher: { "@type": "Organization", name: "Dev-Brains-AI" },
            }),
          }}
        />
      </Head>

      <main style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
        <h1>50 SQL Queries for Freshers in India</h1>

        <p>
          SQL interviews are common in companies like TCS, Infosys, Wipro,
          Accenture, and startups. Freshers are often asked SQL queries to test
          database knowledge and logical thinking.
        </p>

        <p>
          👉 Try SQL Generator Tool → https://dev-brains-ai.com/sql-generator
        </p>

        <hr />

        <h2>1️⃣ Basic SQL Queries</h2>

        <h3>1. Select All Records</h3>
        <pre>{`SELECT * FROM employees;`}</pre>

        <h3>2. Select Specific Columns</h3>
        <pre>{`SELECT name, salary FROM employees;`}</pre>

        <h3>3. Where Condition</h3>
        <pre>{`SELECT * FROM employees WHERE salary > 50000;`}</pre>

        <h3>4. Order By</h3>
        <pre>{`SELECT * FROM employees ORDER BY salary DESC;`}</pre>

        <h3>5. Limit Results</h3>
        <pre>{`SELECT * FROM employees LIMIT 5;`}</pre>

        <hr />

        <h2>2️⃣ Important Interview Queries</h2>

        <h3>6. Find Duplicate Records</h3>
        <pre>{`
SELECT name, COUNT(*)
FROM employees
GROUP BY name
HAVING COUNT(*) > 1;
`}</pre>

        <h3>7. Second Highest Salary</h3>
        <pre>{`
SELECT MAX(salary)
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);
`}</pre>

        <h3>8. Top 3 Salaries</h3>
        <pre>{`
SELECT * FROM employees
ORDER BY salary DESC
LIMIT 3;
`}</pre>

        <h3>9. Employees Without Department</h3>
        <pre>{`
SELECT * FROM employees
WHERE department_id IS NULL;
`}</pre>

        <h3>10. Count Employees Per Department</h3>
        <pre>{`
SELECT department_id, COUNT(*)
FROM employees
GROUP BY department_id;
`}</pre>

        <hr />

        <h2>3️⃣ SQL Join Queries</h2>

        <h3>11. Inner Join</h3>
        <pre>{`
SELECT o.id, c.name
FROM orders o
JOIN customers c ON o.customer_id = c.id;
`}</pre>

        <h3>12. Left Join</h3>
        <pre>{`
SELECT c.name, o.id
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;
`}</pre>

        <h3>13. Right Join</h3>
        <pre>{`
SELECT *
FROM customers
RIGHT JOIN orders ON customers.id = orders.customer_id;
`}</pre>

        <hr />

        <h2>4️⃣ Aggregate Queries</h2>

        <h3>14. Total Salary</h3>
        <pre>{`SELECT SUM(salary) FROM employees;`}</pre>

        <h3>15. Average Salary</h3>
        <pre>{`SELECT AVG(salary) FROM employees;`}</pre>

        <h3>16. Max Salary</h3>
        <pre>{`SELECT MAX(salary) FROM employees;`}</pre>

        <h3>17. Min Salary</h3>
        <pre>{`SELECT MIN(salary) FROM employees;`}</pre>

        <h3>18. Count Employees</h3>
        <pre>{`SELECT COUNT(*) FROM employees;`}</pre>

        <hr />

        <h2>5️⃣ Advanced Queries Freshers Should Know</h2>

        <h3>19. Employees Joined This Month</h3>
        <pre>{`
SELECT *
FROM employees
WHERE MONTH(join_date) = MONTH(CURRENT_DATE());
`}</pre>

        <h3>20. Update Salary</h3>
        <pre>{`
UPDATE employees
SET salary = salary * 1.1
WHERE department_id = 3;
`}</pre>

        <h3>21. Create Table</h3>
        <pre>{`
CREATE TABLE employees (
 id INT,
 name VARCHAR(100),
 salary INT
);
`}</pre>

        <h3>22. Add Column</h3>
        <pre>{`ALTER TABLE employees ADD email VARCHAR(100);`}</pre>

        <hr />

        <h2>Tips for SQL Interview Preparation</h2>
        <ul>
          <li>Practice joins daily</li>
          <li>Learn GROUP BY deeply</li>
          <li>Understand indexing basics</li>
          <li>Write queries without copy-paste</li>
        </ul>

        <p>
          👉 Use Dev-Brains-AI Error Explainer → https://dev-brains-ai.com/ai-error-explainer
        </p>

        <hr />

        <h2>Conclusion</h2>
        <p>
          SQL is one of the most important skills for backend developers and data
          engineers in India. Practice these queries regularly and use Dev-Brains-AI
          tools to improve faster.
        </p>

        <p>👉 https://dev-brains-ai.com/</p>
      </main>
    </>
  );
}