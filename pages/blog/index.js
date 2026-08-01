// pages/blog/index.js
import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";

export default function BlogIndex({ posts }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://dev-brains-ai.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://dev-brains-ai.com/blog",
      },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 22 }}>
      <Head>
        <title>Dev Brains AI Blog — Regex, SQL & AI Dev Tools Tutorials</title>
        <meta
          name="description"
          content="Tutorials, cheat sheets, and practical guides on regular expressions, SQL queries, cron expressions, and AI tools for developers. Free, no signup."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

</Head>

      <div className="card" style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
          <ol style={{ display: "flex", flexWrap: "wrap", gap: 4, listStyle: "none", padding: 0 }}>
            <li><Link href="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Blog</li>
          </ol>
        </nav>

        <h1>Dev Brains AI Blog — Regex, SQL & AI Dev Tools Tutorials</h1>
        <p className="small">
          Practical tutorials, cheat sheets, and step-by-step guides for developers. Topics cover
          regular expressions, SQL queries, cron scheduling, JSON handling, and AI-powered tools.
          All articles are free, practical, and written for real-world use.
        </p>

        <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
          {posts.map((post) => (
            <li key={post.slug} className="card small" style={{ marginBottom: 12, padding: 12 }}>
              <h2 style={{ marginBottom: 4, fontSize: "1.1rem" }}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              {post.description && (
                <p className="small" style={{ marginTop: 4 }}>
                  {post.description}
                </p>
              )}

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


// ✅ Auto-load ALL blogs with curated descriptions
const POST_META = {
  "sql-query-generator-tutorial-for-beginners": { title: "SQL Query Generator Tutorial: A Beginner's Guide", description: "Learn to turn plain English into SELECT, JOIN, and GROUP BY queries with an AI SQL generator, with real beginner examples and a review-before-running checklist." },
  "sql-interview-questions-complete-guide": { title: "SQL Interview Questions: The Complete Guide", description: "Every SQL question TCS, Infosys, Wipro, Accenture, and Capgemini actually ask, organized by topic — JOINs, keys, normalization, Nth highest salary — with worked queries." },
  "common-sql-errors-and-fix-using-ai": { title: "5 Common SQL Errors and How to Fix Them Fast", description: "Fix the 5 SQL errors developers hit most in MySQL and PostgreSQL — syntax, ambiguous columns, GROUP BY, type mismatches, deadlocks — and how AI speeds up fixes." },
  "sql-optimization-techniques-for-large-tables": { title: "7 SQL Optimization Techniques for Large Tables", description: "Speed up slow queries on multi-million row tables with indexing, avoiding SELECT *, smarter WHERE clauses, JOIN tuning, partitioning, and reading EXPLAIN output." },
  "mysql-vs-postgresql-performance-comparison": { title: "MySQL vs PostgreSQL: Which Wins for Your Workload?", description: "MySQL vs PostgreSQL on real workloads: InnoDB reads vs MVCC writes, JSONB indexing, EXPLAIN ANALYZE, and a 4-point rule of thumb for picking the right one." },
  "50-sql-queries-for-freshers-in-india": { title: "50 SQL Interview Queries for Freshers in India", description: "50 ready-to-run SQL queries for fresher interviews at TCS, Infosys, Wipro, and Accenture, covering joins, GROUP BY, subqueries, and CREATE TABLE examples." },
  "ai-sql-practical": { title: "Write SQL Faster with AI: Prompts That Actually Work", description: "Copy-paste AI prompts that generate working SQL for top-N rankings, time-series reports, and multi-table joins, plus tips for getting reliable output every time." },
  "sql-query-for-duplicate-records-detection": { title: "SQL Query to Find and Remove Duplicate Records", description: "Detect duplicate rows with GROUP BY and HAVING, then safely delete them using ROW_NUMBER() and PARTITION BY, plus a UNIQUE constraint to block repeats." },
  "sql-query-for-sales-report-dashboard": { title: "SQL Queries for Sales Dashboards: Revenue & Growth", description: "Copy-paste SQL for revenue by month, revenue by region, top-selling products, and month-over-month growth using LAG(), built on a typical e-commerce schema." },
  "regex-top-patterns": { title: "10 Copy-Paste Regex Patterns Every Developer Needs", description: "10 ready-to-use regex patterns for emails, URLs, phone numbers, hex colors, and more — each with a working example you can paste straight into your code." },
  "regex-cheat-sheet-for-backend-developers": { title: "Regex Cheat Sheet for Backend Developers (Node & Python)", description: "A regex cheat sheet for backend developers: symbols, character classes, and patterns for email, phone, PAN, GST, and PIN validation in Node.js and Python." },
  "top-50-useful-regex-patterns-for-developers": { title: "50 Ready-to-Use Regex Patterns for Developers", description: "50 copy-paste regex patterns for email, URL, phone, IP, password, and date validation — organized by category with real examples, not abstract syntax." },
  "regex-for-email-validation-javascript-example": { title: "Regex for Email Validation in JavaScript — Practical Patterns and Edge Cases", description: "How to validate email addresses using regex in JavaScript, with a practical pattern, edge case handling, and why full RFC 5322 compliance is not worth chasing." },
  "regex-for-password-validation-rules": { title: "Password Validation Regex: 4 Rules, One Line (JS & Python)", description: "Enforce password strength — length, case, digits, symbols — with a single regex lookahead pattern. Includes ready-to-use JavaScript and Python code." },
  "regex-for-indian-id-document-validation": { title: "Regex for Indian ID & Document Validation — Aadhaar, PAN, GST", description: "Working regex patterns for every major Indian ID: Aadhaar, PAN, GSTIN, IFSC, passport, phone, PIN code, driving license — plus which ones regex can't fully validate." },
  "cron-vs-setinterval-nodejs": { title: "Cron vs setInterval in Node.js: Which One?", description: "Cron vs setInterval in Node.js compared: drift, timezone support, restarts, and overlapping runs. See working node-cron, cron package, and timer examples." },
  "cron-expressions-aws-eventbridge-lambda": { title: "AWS EventBridge Cron: 6-Field Syntax for Lambda", description: "AWS EventBridge cron uses 6 fields, not 5 — learn the day-of-week offset, the ? wildcard rule, rate expressions, and a working Terraform example for Lambda." },
  "cron-jobs-github-actions-tutorial": { title: "GitHub Actions Cron Jobs: Syntax and Gotchas", description: "Schedule GitHub Actions workflows with cron: working YAML examples, the 5-minute minimum interval, UTC-only timing, and inactive-repo run skips." },
  "cron-expression-complete-guide": { title: "Cron Expression Syntax Explained (10 Examples)", description: "All 5 cron fields explained, 10 ready-to-use example expressions, common mistakes to avoid, and how GitHub Actions, AWS EventBridge, and Linux syntax differ." },
  "top-10-cron-schedule-patterns-developers": { title: "10 Cron Expressions Every Developer Should Know", description: "10 ready-to-use cron expressions with real use cases — from every-minute polling to yearly cleanup jobs — plus a field-by-field syntax reference." },
  "url-encoding-rest-api-query-parameters": { title: "URL-Encode REST API Query Parameters (JS Examples)", description: "URL-encode REST API query parameters correctly with encodeURIComponent, URLSearchParams, fetch, and axios — the mistakes that silently break API calls." },
  "url-encoding-guide-for-web-developers": { title: "URL Encoding Guide: encodeURI vs encodeURIComponent", description: "Learn URL encoding the right way: encodeURIComponent vs encodeURI, building query strings with URLSearchParams, and the most common encoding bugs to avoid." },
  "base64-encoding-javascript-examples": { title: "Base64 Encoding in JavaScript: btoa, atob, Unicode Fix", description: "btoa and atob explained, the Unicode bug that breaks btoa() and how to fix it, plus Node.js Buffer, URL-safe Base64, and real use cases with working code." },
  "base64-vs-url-encoding-difference": { title: "Base64 vs URL Encoding: Key Differences (With Code)", description: "Base64 and URL encoding solve different problems — compare output size, character sets, and JavaScript code, then see exactly when to use each one." },
  "encode-images-base64-data-uri-html-css": { title: "Base64 Image Encoding in HTML/CSS: When It Helps", description: "Embed images directly in HTML and CSS with Base64 data URIs and skip the extra HTTP request. Covers when it helps, when it hurts performance, and working code examples." },
  "decode-jwt-tokens-base64-javascript": { title: "Decode a JWT in JavaScript in 3 Lines (No Library)", description: "Decode any JWT header and payload with plain JavaScript Base64Url decoding — no library needed. Includes ready-to-run browser and Node.js code examples." },
  "how-to-validate-json-in-python-and-javascript": { title: "Validate JSON in Python & JavaScript: Syntax + Schema", description: "Validate JSON two ways in Python and JavaScript: syntax checks with json.loads/JSON.parse, plus schema validation using jsonschema and Ajv, with code examples." },
  "json-formatter-for-indian-gst-apis": { title: "JSON Formatter for Indian GST APIs: GSTIN & IRN Fields", description: "Decode India's GST e-invoice (IRP) JSON responses field by field — Irn, AckNo, GSTIN, HSN codes — plus formatting and debugging tips for failed e-invoices." },
  "json-schema-generator-tutorial-with-examples": { title: "JSON Schema Generator Tutorial: From Example to Ajv", description: "Turn a real API response into a working JSON Schema step by step, then refine it with patterns and enums, and validate incoming data with Ajv in Node.js." },
  "ai-dev-tools-save-time": { title: "How AI Dev Tools Save Developer Time", description: "Practical examples of AI-powered tools that reduce repetitive tasks for developers." },
  "ai-projects-for-engineering-students-india": { title: "20 AI Project Ideas for Engineering Students in India", description: "20 AI project ideas for Indian engineering students — beginner to final-year B.Tech capstone projects — with working Python and FastAPI deployment code." },
  "python-ai-projects-for-engineering-students-india": { title: "12 Python AI Project Ideas for Engineering Students (India)", description: "12 Python and AI project ideas for Indian engineering students, from beginner-friendly to final-year level, with the libraries and datasets needed for each." },
  "ai-microservices-tutorial-for-backend-developers": { title: "Build an AI Microservice for Your Backend (FastAPI)", description: "A working FastAPI example for wrapping an AI model as its own microservice, plus how to call it from Node.js, handle timeouts, and deploy it independently." },
  "ai-anomaly-detection-for-server-logs-python-example": { title: "AI Anomaly Detection for Server Logs: Python Example", description: "Detect anomalies in server logs with Python's Isolation Forest algorithm, a working FastAPI microservice example, and real use cases from Indian startups." },
  "common-api-errors-and-how-to-fix-them": { title: "6 Common REST API Errors and How to Fix Them", description: "Fix the 6 REST API errors developers hit most — 400, 401, 403, 404, 429, 500 — with the real cause and a concrete fix for each status code." },
  "how-to-debug-rest-api-errors-using-ai": { title: "How to Debug REST API Errors Using AI: A 4-Step Workflow", description: "A repeatable 4-step workflow for debugging REST API errors with AI: capture the full error, include the exact request, trace it through your code, verify the fix." },
  "fix-nodejs-errors-beginners-india": { title: "5 Common Node.js Errors Beginners Face in India", description: "The 5 Node.js errors beginners in India hit most: Cannot find module, EACCES, ECONNREFUSED, unhandled rejections, and EADDRINUSE — with the fix for each." },
  "best-free-developer-tools-for-indian-programmers": { title: "19 Free Developer Tools for Indian Programmers (2026)", description: "19 free tools for Indian developers, organized by category — editors, GitHub Student Pack, Postman, Vercel hosting, MongoDB Atlas — and why each is worth using." },
  "free-mysql-query-generator-online": { title: "Free MySQL Query Generator & Builder Online — Instant, No Signup", description: "Free MySQL query generator and query builder online. Describe what you need in plain English and get a working MySQL query instantly — no signup, no login, unlimited use." },
  "ai-regex-generator-guide": { title: "AI Regex Generator Guide: Prompts, Examples, Testing", description: "Turn plain English into working regex, with prompting tips, ready-made patterns for email, phone, GST, and PAN, plus how to test the output in JS and Python." },
  "natural-language-to-sql-guide": { title: "Text-to-SQL: How AI SQL Generators Work (+4 Prompt Tips)", description: "See how AI turns plain English into SQL, 4 prompting tips for better queries, and which patterns (JOINs, GROUP BY) it handles well vs needs manual fixes." },
  "regex-for-credit-card-validation": { title: "Regex for Credit Card Validation — Visa, Mastercard, Amex, RuPay", description: "Regex patterns to validate major credit card formats — Visa, Mastercard, Amex, RuPay, Discover — plus why you also need the Luhn algorithm for real validity." },
  "regex-for-indian-vehicle-number-validation": { title: "Regex for Indian Vehicle Number Validation (RTO + BH Series)", description: "A complete regex pattern for validating Indian vehicle registration numbers (state code, RTO code, series, number), including the BH series format." },
  "regex-for-url-validation-javascript": { title: "JavaScript URL Validation: Regex vs the URL Constructor", description: "A working regex for validating URLs in JavaScript, plus why the built-in URL constructor catches edge cases regex misses — with code for both." },
  "regex-for-date-format-validation": { title: "Regex for Date Format Validation — DD/MM/YYYY, ISO 8601", description: "Regex patterns for validating DD/MM/YYYY, MM-DD-YYYY, and ISO 8601 (YYYY-MM-DD) dates, plus why regex alone cannot catch impossible dates like Feb 30." },
  "regex-for-hexadecimal-color-code-validation": { title: "Regex for Hexadecimal Color Code Validation (3, 6, 8-Digit)", description: "Regex patterns to validate 3-digit and 6-digit hex color codes, with and without #, plus the 8-digit alpha-channel format, with CSS and JS examples." },
  "regex-for-ipv4-address-validation": { title: "Regex for IPv4 Address Validation (Correct Octet Range)", description: "A correct regex for validating IPv4 addresses, explaining the common mistake of allowing octets above 255 and how to fix it properly." },
  "regex-for-username-validation-rules": { title: "Username Validation Regex: Length, Characters & Edge Cases", description: "Copy-paste regex for username rules — 3-20 characters, no leading digits, no double dots — plus GitHub- and Instagram-style social patterns." },
  "regex-for-html-tag-stripping": { title: "Regex for HTML Tag Stripping — and Its Security Risks", description: "How to strip HTML tags with regex for plain-text previews, and why a proper HTML parser is required instead for untrusted, security-sensitive input." },
  "regex-for-extracting-hashtags-and-mentions": { title: "Regex for Extracting Hashtags and Mentions (JS Examples)", description: "How to extract #hashtags and @mentions from text using JavaScript regex with match and matchAll, including Unicode-friendly patterns." },
  "regex-lookahead-and-lookbehind-explained": { title: "Regex Lookahead vs Lookbehind: 4 Patterns Explained", description: "All four regex lookaround assertions — positive/negative lookahead and lookbehind — explained with password validation and currency-formatting examples." },
  "regex-non-greedy-vs-greedy-matching": { title: "Greedy vs Non-Greedy Regex: Side-by-Side Match Results", description: "See exactly what .* and .*? match differently on the same HTML string, plus when a negated character class beats a lazy quantifier for safe extraction." },
  "regex-for-splitting-csv-strings": { title: "Split CSV Strings with Regex (Quoted Commas Fixed)", description: "Why str.split(',') breaks on quoted CSV fields, the lookahead regex that fixes it, and when to reach for a real parser like PapaParse or csv-parse." },
  "regex-for-multiline-text-matching": { title: "Regex Multiline Matching in JS: m vs s Flags Explained", description: "See exactly how JavaScript's m and s regex flags change ^, $, and . behavior, with copy-paste examples for parsing multi-line logs and YAML frontmatter." },
  "regex-performance-and-catastrophic-backtracking": { title: "Catastrophic Backtracking: Why (a+)+ Freezes Your Regex", description: "How a nested quantifier like (a+)+ can hang your Node.js server for minutes (ReDoS), with the exact fix and tools to catch dangerous patterns." },
  "regex-for-extracting-numbers-from-string": { title: "Regex for Extracting Numbers from a String (JS Examples)", description: "How to extract integers, decimals, and negative numbers from mixed text using JavaScript regex, with working code for common real-world formats." },
  "regex-vs-string-methods-when-to-use-which": { title: "Regex vs String Methods: A Quick Decision Guide", description: "A task-by-task cheat sheet for when includes(), startsWith(), and split() beat regex — and when regex is the only tool that expresses the pattern you need." },
  "sql-window-functions-explained-with-examples": { title: "SQL Window Functions: ROW_NUMBER, RANK, LAG, LEAD", description: "Learn ROW_NUMBER, RANK, DENSE_RANK, LAG, and LEAD with runnable OVER (PARTITION BY ... ORDER BY ...) examples, including running totals and moving averages." },
  "sql-cte-common-table-expressions-guide": { title: "SQL CTE Guide: WITH Clause, Chaining & Recursion", description: "Learn SQL CTEs with the WITH clause — why they beat nested subqueries for readability, how to chain multiple CTEs, and a simple recursive CTE example." },
  "sql-subqueries-vs-joins-explained": { title: "SQL Subqueries vs JOINs: Which Should You Use?", description: "Compare the same query written as a JOIN and as a subquery, see why correlated subqueries can be a performance trap, and when EXISTS beats IN for filtering." },
  "sql-group-by-having-clause-explained": { title: "SQL GROUP BY vs HAVING: 5 Aggregate Function Examples", description: "Why HAVING COUNT(*) >= 5 works but WHERE COUNT(*) >= 5 fails — with SUM, AVG, MIN, and MAX examples showing when to use GROUP BY vs HAVING." },
  "sql-indexing-strategies-for-faster-queries": { title: "SQL Indexing Strategies: B-Tree, Composite Keys, EXPLAIN", description: "Learn how B-tree indexes turn full table scans into fast lookups, why composite index column order matters, and how to confirm it with EXPLAIN before shipping." },
  "sql-normalization-explained-1nf-2nf-3nf": { title: "SQL Normalization Explained: 1NF, 2NF, 3NF in One Example", description: "See one messy table split step by step into 1NF, 2NF, and 3NF, with the exact SQL needed to remove redundancy and prevent update, insert, and delete anomalies." },
  "sql-transactions-acid-properties-explained": { title: "SQL Transactions & ACID Properties (Bank Example)", description: "Learn BEGIN, COMMIT, and ROLLBACK plus the four ACID properties using a real bank-transfer example that shows exactly what breaks without transactions." },
  "sql-query-for-pagination-limit-offset": { title: "SQL Pagination Guide — LIMIT/OFFSET vs Keyset (Copy-Paste SQL)", description: "SQL pagination explained: LIMIT/OFFSET syntax, why deep OFFSET pages get slow, and the keyset (cursor) pattern that keeps every page fast. Copy-paste MySQL and PostgreSQL examples." },
  "sql-union-vs-union-all-explained": { title: "SQL UNION vs UNION ALL: Differences & Performance", description: "See why UNION ALL is faster than UNION, when UNION's deduplication step can silently drop real rows, and a quick decision guide for picking the right one." },
  "sql-case-statement-examples": { title: "SQL CASE Statement Examples: 4 Real-World Patterns", description: "Four copy-paste SQL CASE WHEN examples — age bands, order status labels, letter grades, and conditional SUM aggregation — plus CASE inside ORDER BY." },
  "sql-date-functions-cheat-sheet": { title: "SQL Date Functions Cheat Sheet: MySQL vs PostgreSQL", description: "NOW(), DATE_ADD, DATEDIFF, and DATE_FORMAT side-by-side in MySQL and PostgreSQL syntax — plus the index-friendly way to filter by date range in both." },
  "sql-query-for-hierarchical-data-recursive-cte": { title: "SQL Recursive CTE for Org Charts and Category Trees", description: "Write a WITH RECURSIVE query that walks org charts and category trees of any depth, including the depth-counter trick that stops infinite loops on bad data." },
  "sql-stored-procedures-vs-functions": { title: "SQL Stored Procedures vs Functions: Key Differences", description: "See exactly when to use a stored procedure vs a function in SQL, with runnable MySQL CREATE PROCEDURE and CREATE FUNCTION examples plus PostgreSQL differences." },
  "sql-query-for-inventory-management-system": { title: "SQL Queries for Inventory Management Systems", description: "Track current stock levels, trigger low-stock alerts, generate reorder reports, and audit movement history with a real products-and-stock-movements SQL schema." },
  "sql-null-handling-best-practices": { title: "SQL NULL Handling Best Practices (COALESCE, IS NULL)", description: "Why 'WHERE column = NULL' always returns zero rows, how three-valued logic works, and how to use COALESCE, IFNULL, and IS NOT DISTINCT FROM correctly." },
  "sql-query-for-employee-attendance-report": { title: "SQL Queries for Employee Attendance & Late Arrivals", description: "Build an employee attendance report: daily status, monthly attendance percentage, late check-in detection, and absentee counts in MySQL and PostgreSQL." },
  "sql-vs-nosql-when-to-choose-which": { title: "SQL vs NoSQL: When to Choose Which (With Examples)", description: "Compare SQL and NoSQL on schema flexibility, horizontal scaling, ACID vs eventual consistency, and joins, then use our checklist to pick the right database." },
  "cron-expression-examples-every-5-minutes": { title: "Cron Every 5 Minutes: Expression + Examples", description: "The cron expression for every 5 minutes is */5 * * * *. See ready-to-use patterns for every 10, 15, 30 minutes and every N hours, explained field by field." },
  "cron-job-best-practices-for-production": { title: "6 Cron Job Best Practices for Production", description: "6 practices for reliable production cron jobs: idempotency, flock locking, structured logging, failure alerts, timeouts, and secrets handling." },
  "cron-vs-quartz-scheduler-java": { title: "Cron vs Quartz in Java: The Seconds Field Trap", description: "Convert Unix cron to Quartz syntax in Java: the extra seconds field, the day-of-month/day-of-week ? rule, and a side-by-side table of matching expressions." },
  "cron-jobs-in-linux-crontab-tutorial": { title: "Linux Crontab Tutorial: Fix the #1 PATH Gotcha", description: "Edit the Linux crontab with crontab -e, redirect job output to a log file, and fix the #1 PATH gotcha that silently breaks cron jobs on every distro." },
  "cron-expression-for-monthly-and-yearly-schedules": { title: "Cron for Monthly & Yearly Jobs (Last-Day Trick)", description: "Cron patterns for monthly, quarterly, and yearly schedules, plus the workaround for cron's missing last-day-of-month field — no native L flag needed." },
  "cron-job-monitoring-and-alerting-guide": { title: "Cron Job Monitoring: Dead Man's Switch Guide", description: "Monitor cron jobs with exit-code alerts, the dead man's switch healthcheck-ping pattern, and centralized logging that catches jobs that silently stop running." },
  "cron-jobs-python-schedule-library-guide": { title: "Python Cron Jobs: schedule vs APScheduler", description: "Python schedule library vs APScheduler: which to use for cron-style jobs, interval tasks, and persistence. Working code examples for both, plus system cron." },
  "cron-expression-timezone-handling-guide": { title: "Cron Timezones Explained: UTC, CRON_TZ, DST", description: "How cron handles timezones: system time vs UTC, the CRON_TZ variable, DST pitfalls, and how GitHub Actions, AWS EventBridge, and GCP Cloud Scheduler handle timezone." },
  "cron-jobs-docker-container-tutorial": { title: "Cron Jobs in Docker: 3 Approaches Compared", description: "Three ways to run cron in Docker: an in-container daemon, host cron with docker exec, or a sidecar container — with working Dockerfile and CronJob examples." },
  "cron-vs-message-queue-when-to-use-which": { title: "Cron vs Message Queue: A Decision Checklist", description: "Decide between cron and a queue like SQS or RabbitMQ with a 4-point checklist, real examples for each, and the hybrid pattern of cron feeding a queue." },
  "cron-expression-for-business-hours-only": { title: "Cron Expressions for Business Hours (9-to-5)", description: "Cron patterns to run jobs only on weekdays 9-to-5, plus split-shift schedules, lunch-hour exclusions, and the top mistakes that break business-hours cron." },
  "debugging-cron-jobs-that-are-not-running": { title: "Cron Job Not Running? 5 Fixes That Actually Work", description: "Cron job silently not firing? Walk through the 5 most common causes — dead service, bad syntax, missing permissions, and PATH issues — with commands to fix each one fast." },
  "base64-encoding-python-examples": { title: "Base64 Encoding in Python: b64encode, Errors and Fixes", description: "Working Python code for base64.b64encode and b64decode on strings and files, plus fixes for the Incorrect padding and bytes-vs-str errors everyone hits." },
  "base64-file-upload-encoding-guide": { title: "Base64 File Uploads: JSON APIs vs multipart/form-data", description: "Working code for Base64-encoding a file upload into a JSON API, the 33% size overhead it adds, and when multipart/form-data is the faster choice instead." },
  "url-encoding-vs-uri-encoding-difference": { title: "URL vs URI Encoding: What's the Real Difference?", description: "URL encoding and URI encoding both mean percent-encoding, but the terms come from different specs — learn the nuance and which term to use where." },
  "percent-encoding-special-characters-guide": { title: "Percent-Encoding Cheat Sheet: 12 Characters + JS Examples", description: "A quick-reference table for percent-encoding 12 common special characters — space, &, =, ?, # and more — each with a working encodeURIComponent example." },
  "jwt-authentication-explained-for-beginners": { title: "JWT Authentication Explained: How It Works + 4 Mistakes", description: "A beginner's walkthrough of JWT auth: the header.payload.signature format, why Base64url is used, the full login flow, and 4 mistakes that break token security." },
  "base64-encoding-vs-encryption-difference": { title: "Base64 Is Not Encryption: Here's the Real Difference", description: "Base64 has no key and zero confidentiality. See exactly why it isn't encryption, why developers mistake it for security, and when to use AES or bcrypt instead." },
  "how-to-decode-base64-in-python": { title: "How to Decode Base64 in Python — Step by Step", description: "A step-by-step tutorial on decoding Base64 strings in Python, handling padding errors, and choosing between decoding to bytes or UTF-8 text." },
  "url-shortener-encoding-techniques-explained": { title: "How URL Shorteners Generate Short Codes (Base62 Explained)", description: "How URL shorteners like bit.ly generate short codes: base62 encoding of auto-increment IDs, hash-based alternatives, and working JavaScript examples." },
  "base64-encoding-limitations-and-alternatives": { title: "Base64 Encoding Limitations: When to Use Base85 Instead", description: "Base64's real costs: 33% size overhead, CPU time, and worse gzip compression, plus when Base85, multipart/form-data, or raw binary are the better choice." },
  "encode-decode-query-strings-nodejs": { title: "Node.js Query Strings: Encode & Decode the Right Way", description: "Stop hand-rolling URL encoding. Learn to build and parse Node.js query strings correctly with URLSearchParams, including arrays, special characters, and common pitfalls." },
  "base64-encoding-email-attachments-mime": { title: "How Base64 Encodes Email Attachments (MIME Explained)", description: "See the raw MIME structure behind an email attachment: why Base64 is required, how Content-Transfer-Encoding works, and why attachments end up 33% larger." },
  "url-encoding-common-mistakes-developers-make": { title: "4 Common URL Encoding Mistakes (And How to Fix Them)", description: "The 4 URL-encoding bugs that quietly break production: double-encoding, encoding a whole URL, unescaped redirects, and confusing + with %20 — with fixes." },
  "json-vs-xml-comparison-for-apis": { title: "JSON vs XML for APIs in 2026: Which Should You Use?", description: "JSON payloads run 30-50% smaller than XML and parse faster in JS. Compare both head-to-head, see 5 reasons JSON won REST APIs, and when XML still wins." },
  "json-parsing-errors-common-causes-and-fixes": { title: "JSON Parsing Errors: 6 Common Causes and Fixes", description: "Fix JSON.parse 'Unexpected token' errors fast — 6 common causes including trailing commas, single quotes, and unquoted keys, each with a working fix." },
  "nested-json-flattening-techniques": { title: "Flatten Nested JSON in JavaScript: A Recursive Function", description: "Copy a recursive JavaScript function that flattens nested JSON into dot-notation keys (customer.address.city) — plus how to handle arrays and 4 common pitfalls." },
  "json-formatter-online-free-guide": { title: "Free Online JSON Formatter: Pretty-Print, Validate, Minify", description: "What a free online JSON formatter actually does — pretty-print, validate, and minify — plus 5 real situations where it beats writing a one-off script." },
  "json-diff-comparing-two-json-objects": { title: "JSON Diff: How to Compare Two JSON Objects (With Code)", description: "Why JSON.stringify comparison fails, a working deepEqual function, a diffJson() that lists exactly what changed, and 5 libraries that do it for you." },
  "json-minify-vs-pretty-print-explained": { title: "JSON Minify vs Pretty Print: Save ~28% with Examples", description: "JSON minify vs pretty-print explained with real before/after code — when to use each, plus a worked example showing a 28% payload size reduction." },
  "json-schema-validation-nodejs-example": { title: "JSON Schema Validation in Node.js with Ajv: Full Example", description: "A complete, working Ajv walkthrough: define a schema, compile the validator, read structured error messages, and wire it up as Express middleware." },
  "working-with-large-json-files-nodejs": { title: "Large JSON Files in Node.js: Avoid Heap Out of Memory", description: "How to process large JSON files in Node.js without crashing with 'heap out of memory' — streaming parsers, NDJSON, and working code examples." },
  "json-to-csv-conversion-guide": { title: "JSON to CSV in JavaScript: Working Code + 4 Libraries", description: "Convert JSON arrays to CSV with a copy-paste JavaScript function that handles RFC 4180 escaping, plus json2csv, papaparse, pandas, and csv-writer — and 5 pitfalls to avoid." },
  "json-web-token-vs-session-authentication": { title: "JWT vs Session Authentication — Which Should You Use?", description: "Compare JSON Web Tokens (JWT) with traditional server-side session authentication — statelessness, scalability, revocation, and security trade-offs explained." },
  "rest-api-json-response-best-practices": { title: "REST API JSON Response Best Practices (With Examples)", description: "A consistent envelope format, structured error objects, pagination metadata, and camelCase vs snake_case rules — with real JSON examples you can copy." },
  "json-serialization-python-guide": { title: "Python JSON Serialization: Fix the Not-Serializable Error", description: "Stuck on Python's not-JSON-serializable TypeError? Two working fixes — a default function and a custom JSONEncoder — plus datetime, Decimal, and object_hook examples you can copy." },
  "ai-code-review-tools-for-developers": { title: "AI Code Review Tools: What They Catch (and Miss)", description: "What AI code review tools like Copilot and CodeRabbit catch well (style, obvious bugs), what they miss (business logic), and how to combine them with human review." },
  "ai-powered-code-documentation-generator-guide": { title: "AI Code Documentation Generators: Before and After", description: "See a real before/after example of AI-generated Python docstrings, how documentation generators actually work, and where they still need a human review pass." },
  "machine-learning-projects-for-beginners-india": { title: "5 Machine Learning Projects for Beginners in India", description: "5 beginner ML projects — from house price prediction to digit recognition — each with dataset, tech stack, and a step-by-step learning path to follow." },
  "nlp-projects-for-final-year-students": { title: "4 NLP Projects for Final Year Students (with Code)", description: "4 final-year NLP projects — sentiment analysis, summarization, a domain chatbot, and a resume parser — each with approach, libraries, and working code." },
  "computer-vision-projects-for-engineering-students": { title: "4 Computer Vision Projects for Engineering Students", description: "4 computer vision projects for engineering students — face mask detection, plate recognition, handwriting OCR, object detection — with code and tools for each." },
  "how-to-use-chatgpt-for-coding-interview-prep": { title: "ChatGPT for Coding Interview Prep: 4 Smart Strategies", description: "4 practical ways to use ChatGPT for coding interview prep — generate targeted problems, mock interviews, and the one mistake that sabotages candidates." },
  "ai-resume-builder-tips-for-freshers-india": { title: "AI Resume Builder Tips for Indian Freshers (ATS Guide)", description: "How Indian freshers can use AI resume tools without sounding like a robot: ATS formatting rules, what to keep human-written, and mistakes that get resumes rejected." },
  "best-ai-tools-for-developers-2026": { title: "AI Tools for Developers in 2026: 5 Categories Explained", description: "5 categories of AI developer tools worth using in 2026 — code completion, code review, debugging, docs, and utility generators — plus what each one solves." },
  "how-ai-code-generators-work-explained": { title: "How AI Code Generators Work (And Why They Hallucinate)", description: "How tools like Copilot turn a prompt into code: training data, tokenization, and token-by-token generation — plus why they invent APIs that do not exist." },
  "ai-vs-traditional-programming-when-to-use-ai": { title: "AI vs Traditional Programming: A Simple Decision Test", description: "A 5-question checklist for choosing AI/ML vs traditional rule-based code, with real examples like fraud detection vs tax calculation, plus a hybrid code pattern." },
  "building-your-first-ai-chatbot-python-tutorial": { title: "Build an AI Chatbot in Python: 3 Approaches (With Code)", description: "Build a Python chatbot 3 ways — rule-based, ML classifier, and LLM-powered — with full runnable code for each, no machine learning degree required." },
  "career-roadmap-for-backend-developers-india": { title: "Backend Developer Roadmap in India: Fresher to Senior", description: "A 4-stage backend developer roadmap for India — fresher, SDE-1, SDE-2, senior — with exact skills, tools, and milestones expected at each career level." },
  "how-to-crack-technical-interviews-at-product-companies": { title: "How to Crack Technical Interviews at Product Companies", description: "What Amazon, Flipkart, and Google test: 200-300 DSA problems by pattern, system design basics, STAR-framework behavioral rounds, and a realistic prep timeline." },
  "freelancing-as-a-developer-guide-for-indians": { title: "Freelance Developer in India: Rates, Taxes, Contracts", description: "Real USD/INR freelance rates by experience level, GST and Section 44ADA tax rules, milestone payment contracts, and how to build a portfolio that lands clients." },
  "rest-api-vs-graphql-comparison": { title: "REST vs GraphQL: Caching, Errors & When to Use Each", description: "Real examples comparing REST and GraphQL on over-fetching, HTTP caching, and error handling — plus a clear decision guide for choosing the right one." },
  "how-to-design-a-rest-api-best-practices": { title: "How to Design a REST API — Best Practices That Actually Matter", description: "A practical guide to REST API design — resource naming, HTTP verbs and status codes, versioning, pagination, and a consistent error response format." },
  "api-rate-limiting-strategies-explained": { title: "API Rate Limiting: Fixed Window vs Sliding vs Token Bucket", description: "Fixed window, sliding window, and token bucket rate limiting explained with working Express.js middleware code you can drop straight into your API." },
  "cors-error-explained-and-how-to-fix-it": { title: "CORS Error Explained — And How to Fix It on Express.js", description: "What causes the classic \"No Access-Control-Allow-Origin header\" CORS error, how CORS headers work, and how to fix it on an Express.js backend." },
  "common-nodejs-npm-errors-and-fixes": { title: "4 Common Node.js & npm Errors and How to Fix Them", description: "Fix 4 npm and Node.js errors every developer hits — EACCES permission denied, peer dependency conflicts, Cannot find module, and ENOENT — with exact commands." },
  "how-to-handle-async-errors-in-nodejs": { title: "Node.js Async Error Handling: Avoid Unhandled Rejections", description: "Stop silent crashes from unhandled promise rejections in Node.js — working try/catch patterns, an Express async route wrapper, and Promise.allSettled examples." },
  "api-authentication-methods-explained-oauth-jwt-apikey": { title: "API Keys vs JWT vs OAuth 2.0: Which Should You Use?", description: "Compare API keys, JWT bearer tokens, and OAuth 2.0 side by side with code samples for each, so you can pick the right authentication method instead of guessing." },
  "debugging-memory-leaks-in-nodejs": { title: "How to Find a Node.js Memory Leak: Step-by-Step", description: "Node.js process memory keeps climbing and never drops? Learn to catch the leak with heap snapshots and --inspect, plus the two culprits behind most Node.js memory leaks." },
  "express-js-error-handling-middleware-guide": { title: "Express.js Error Handling Middleware: A Working Example", description: "Build centralized Express.js error-handling middleware: a custom error class, async route errors, a 404 handler, and the fix for ERR_HTTP_HEADERS_SENT." },
  "api-versioning-strategies-explained": { title: "API Versioning: URL vs Header vs Query Param Compared", description: "URL path, header, and query param API versioning compared side by side, with code examples and a practical recommendation for public-facing APIs." },
  "how-to-test-rest-apis-with-postman": { title: "Test REST APIs with Postman: Collections to CI", description: "Organize Postman collections, use environment variables across environments, write pm.test() assertions, and automate everything in CI/CD with Newman." },
  "common-git-errors-and-how-to-fix-them": { title: "7 Common Git Errors and How to Fix Them Fast", description: "Stuck on a Git error? Step-by-step fixes for merge conflicts, detached HEAD, refusing to merge unrelated histories, and failed to push, with real commands you can copy." },
  "docker-errors-for-beginners-explained": { title: "5 Common Docker Errors and How to Fix Them Fast", description: "Stuck on a Docker error? Get fast fixes for the 5 most common beginner issues — port already in use, daemon not connecting, no space left, and image not found." },
  "how-to-fix-cannot-read-property-of-undefined-javascript": { title: "Fix 'Cannot Read Property of Undefined' — 3 JS Fixes", description: "Why 'Cannot read properties of undefined' happens in JS, how to trace it in the stack, and 3 fixes: optional chaining, default values, and async guards." },
  "regex-explainer-guide-how-it-works": { title: "How to Read Any Regex Pattern — A Step-by-Step Explainer Guide", description: "Learn a systematic method for reading any regex pattern, with a token-by-token breakdown of a real email validation regex and a symbol reference table." },
  "sql-explainer-guide-how-it-works": { title: "How to Read Any SQL Query: Execution Order Explained", description: "Learn why SQL executes FROM before SELECT, then read a real JOIN, GROUP BY, and HAVING query clause by clause in the order the database actually runs it." },
  "how-to-write-conventional-commit-messages": { title: "Conventional Commits: The 8 Types + Breaking Changes", description: "The Conventional Commits spec explained: all 8 commit types, imperative mood rules, breaking change syntax, and how semantic-release picks your next version." },
  "jsdoc-vs-python-docstrings-guide": { title: "JSDoc vs Python Docstrings: 3 Styles Compared", description: "JSDoc's @param/@returns tags vs Python's Google, NumPy, and reST docstring styles — worked examples for both plus rules for when detail is worth adding." },
  "how-to-read-a-stack-trace": { title: "How to Read a Stack Trace: JS Top-Down, Python Bottom-Up", description: "Why JavaScript stack traces read top-down but Python tracebacks read bottom-up — annotated real examples plus 5 common mistakes that waste debugging time." },
  "how-to-quickly-understand-unfamiliar-code": { title: "Understand Unfamiliar Code Fast: A 4-Step Method", description: "A 4-step method for getting oriented in unfamiliar code fast: find entry points, scan function names, spot complexity signals, and read the imports." },
  "jest-vs-pytest-getting-started-guide": { title: "Jest vs pytest: Side-by-Side Setup and Test Examples", description: "Jest and pytest compared side by side: install steps, syntax, a worked test for the same function in both, common assertions, and basic mocking." },
  "how-to-write-a-great-readme": { title: "How to Write a Great README.md: 8 Essential Sections", description: "The 8 sections every great README needs, good-vs-mediocre examples for each, what badges actually signal, and how to keep your docs from going stale." },
  "how-to-document-a-rest-api-endpoint": { title: "REST API Endpoint Documentation: 7-Point Checklist", description: "See exactly what to include when documenting a REST endpoint — a 7-item checklist, a full worked POST /api/orders example, and when Markdown beats OpenAPI." },
  "convert-curl-commands-to-fetch-axios-python": { title: "Convert cURL to fetch, axios & Python Requests (Example)", description: "Turn any curl command into fetch, axios, or Python requests code — flag mappings plus one full POST request converted to all three, side by side." },

  "how-to-decode-a-jwt-token-safely": { title: "How to Decode a JWT Token Safely", description: "Decode a JWT token safely in JavaScript, Python, or your browser. Understand the three base64url parts, why decoding is not verifying, and how to protect live tokens." },
  "jwt-structure-explained-header-payload-signature": { title: "JWT Structure Explained: Header, Payload, Signature", description: "Deep dive into JWT anatomy: header fields (alg, typ, kid), registered vs public vs private claims, HS256 vs RS256 signing, with a real token decoded field by field." },
  "jwt-expiry-claims-exp-iat-nbf-explained": { title: "JWT exp, iat & nbf Explained — Avoid the Silent Expiry Bugs", description: "JWT exp, iat, and nbf explained in plain English: why they're unix seconds not milliseconds, how clock skew silently rejects valid tokens, and how to pick a safe token lifetime — with Node.js examples." },
  "jwt-security-best-practices-for-developers": { title: "6 JWT Security Best Practices Every Developer Needs", description: "A 6-point JWT security checklist covering strong keys, alg confusion defenses, refresh tokens, safe storage, aud/iss checks, and revocation — with Node.js code." },
  "common-jwt-errors-and-how-to-fix-them": { title: "4 Common JWT Errors and How to Fix Them (Node.js)", description: "Fix jwt malformed, invalid signature, jwt expired, and invalid token errors in Node.js jsonwebtoken. Get the exact cause and a working code fix for each error." },
  "md5-vs-sha256-which-hash-should-you-use": { title: "MD5 vs SHA-256 — Which Hash Should You Use?", description: "MD5 vs SHA-256 compared: speed vs security, the collision attacks that broke MD5 and SHA-1, when MD5 is still OK for checksums, and why passwords need bcrypt or Argon2." },
  "what-is-hashing-explained-for-beginners": { title: "What Is Hashing? 4 Properties Explained Simply", description: "Hashing explained simply: the 4 core properties, how it differs from encryption and encoding, and real uses from Git commits to password storage." },
  "password-hashing-bcrypt-vs-sha256": { title: "Password Hashing: Why bcrypt Beats SHA-256", description: "Why SHA-256 fails for passwords: GPU crack economics, salting, bcrypt vs scrypt vs Argon2, and a working Node.js bcrypt example with cost-factor guidance." },
  "verify-file-integrity-with-checksums": { title: "Verify File Integrity with SHA-256 Checksums", description: "Verify downloads with sha256sum, certutil, and Get-FileHash on Linux, macOS, and Windows — spot corrupted or tampered files, and automate checks in CI." },
  "hash-collisions-explained": { title: "Hash Collisions Explained — Birthday Paradox & Broken Hashes", description: "Hash collisions explained: the pigeonhole principle, the birthday paradox and the 2^(n/2) bound, how collisions broke MD5 and SHA-1 in the real world, and why SHA-256 is still collision-free." },
  "sql-formatting-best-practices-style-guide": { title: "SQL Formatting Style Guide: Before & After Examples", description: "Keyword casing, JOIN indentation, alias rules, and the leading-vs-trailing-comma debate — with before/after SQL examples your whole team can agree on." },
  "why-consistent-sql-style-matters-for-teams": { title: "Why Consistent SQL Style Speeds Up Code Review", description: "A shared SQL style speeds up code reviews, cuts diff noise, and exposes hidden bugs. Here's how to adopt one on your team with sqlfluff, CI, and a formatter." },
  "sql-keywords-uppercase-or-lowercase": { title: "SQL Keywords: Uppercase or Lowercase? Here's the Answer", description: "SELECT or select? The real history behind SQL keyword casing, arguments for each style, what GitLab and Celko's style guides recommend, and why consistency wins." },
  "how-to-format-long-sql-queries-for-readability": { title: "Format Long SQL Queries: 3-Step Refactor Example", description: "Turn a 150-line SQL nightmare into readable code: CTEs, one JOIN per line, comment headers, and a real 3-step before/after refactor of a messy query." },
  "sql-code-review-checklist": { title: "SQL Code Review Checklist: 4 Things to Check First", description: "A repeatable 4-step SQL review order — correctness, performance, safety, style — with real before/after query fixes for JOINs, indexes, and SQL injection." },
  "how-to-compare-two-text-files-online": { title: "How to Compare Two Text Files Online (Safely)", description: "Compare two text files online: use cases, how line diffs work, privacy of online diff tools (prefer client-side), and CLI alternatives like diff, fc, and git diff --no-index." },
  "understanding-diff-output-unified-vs-split-view": { title: "Unified vs Split Diff View — How to Read Any Diff", description: "Learn to read unified diff hunks (@@ headers, +/- lines) and split view side by side, when to use each in code review, and how to silence whitespace-only diff noise." },
  "git-diff-explained-for-beginners": { title: "Git Diff Explained for Beginners: Every Variant You Need", description: "Beginner-friendly git diff guide: working tree vs --staged, comparing commits and branches, single files, --stat, --word-diff, -w, and reading unified output." },
  "how-diff-algorithms-work-lcs-explained": { title: "How Diff Algorithms Work: LCS Explained", description: "The algorithm behind diff tools: longest common subsequence intuition with a worked matrix, the Myers algorithm, why moved blocks show as delete+add, and performance notes." },
  "compare-config-files-across-environments": { title: "Find Config Drift Across Environments: A 3-Step Guide", description: "Find configuration drift between dev, staging, and prod in 3 steps — redact secrets, sort keys before diffing, and automate detection in CI — plus a worked example." },
  "unix-timestamp-explained-epoch-time-guide": { title: "Unix Timestamp Explained: What Epoch Time Really Means", description: "What a unix timestamp is, why epoch time starts 1970-01-01 UTC, the seconds-vs-milliseconds bug, and ready-to-use conversion code for JS, Python, and SQL." },
  "convert-timestamp-to-date-javascript-python-sql": { title: "Convert a Unix Timestamp to a Date: JS, Python & SQL", description: "Convert Unix timestamps to dates in JavaScript, Python, MySQL, and PostgreSQL — copy-paste snippets both ways, plus the seconds-vs-milliseconds bug to avoid." },
  "handling-timezones-in-web-applications": { title: "Handling Timezones in Web Applications — A Practical Guide", description: "Store UTC, convert at display. A practical guide to timezone handling in web apps: IANA names vs offsets, JS Intl API, SSR pitfalls, scheduling, and testing tips." },
  "milliseconds-vs-seconds-timestamp-bugs": { title: "Milliseconds vs Seconds: Fix the 1000x Bug", description: "Dates showing 1970 or year 56789? Learn to spot the milliseconds vs seconds bug in seconds, fix JWT exp pitfalls, dodge the year-2038 problem, and copy a ready-to-use normalization function." },
  "date-formatting-cheat-sheet-iso-8601": { title: "ISO 8601 & RFC 3339 Date Formatting Cheat Sheet", description: "ISO 8601 anatomy, RFC 3339 differences, why ISO dates sort correctly as strings, and a format-token comparison across JavaScript, Python, and SQL." },
  "yaml-vs-json-differences-explained": { title: "YAML vs JSON: Key Differences (Plus the Norway Problem)", description: "YAML vs JSON side by side: comments, the Norway problem (no/yes/on/off as booleans), anchors, the JSON-superset relationship, and when each format wins." },
  "yaml-syntax-guide-for-beginners": { title: "YAML Syntax Guide for Beginners (Indentation, Lists, More)", description: "Learn YAML step by step: key-value pairs, spaces-only indentation, lists, multi-line strings, quoting, and anchors — with a full worked config example." },
  "common-yaml-errors-in-kubernetes-and-ci": { title: "4 Common YAML Errors in Kubernetes & CI (and Fixes)", description: "Fix the 4 YAML mistakes that break Kubernetes and CI — bad indentation, tab characters, unquoted 3.10 becoming a float, and missing --- separators — with validation tools." },
  "convert-yaml-to-json-javascript-python": { title: "Convert YAML to JSON in JavaScript & Python (Safely)", description: "Convert YAML to JSON using js-yaml and PyYAML safe_load, dodge the yaml.load security trap, and see what round-tripping silently loses: comments and anchors." },
  "when-to-use-yaml-json-toml-config": { title: "YAML vs JSON vs TOML: Which Config Format to Use?", description: "When to use YAML (Kubernetes, CI), JSON (APIs, lock files), TOML (Cargo, pyproject.toml), or plain .env files — decision criteria and migration notes." },
  "markdown-syntax-cheat-sheet": { title: "Markdown Syntax Cheat Sheet — Every Element with Examples", description: "Complete markdown cheat sheet: headings, bold, italic, lists, links, images, inline and fenced code, blockquotes, horizontal rules, and escaping — with examples." },
  "github-flavored-markdown-guide": { title: "GFM Cheat Sheet: GitHub Flavored Markdown Tables & Alerts", description: "The GFM (GitHub Flavored Markdown) cheat sheet with real GitHub examples: tables, task lists, alerts, and a clear comparison to plain CommonMark." },
  "markdown-for-technical-documentation-tips": { title: "Markdown for Technical Documentation — 7 Tips That Keep Docs Readable", description: "Practical Markdown tips for technical docs: heading hierarchy discipline, code block language tags, relative links, alt text, tables vs lists, and a docs-as-code CI workflow." },
  "markdown-vs-html-when-to-use-which": { title: "Markdown vs HTML: The 80/20 Rule for When to Use Each", description: "Markdown covers 80% of writing needs with 20% of the effort; HTML gives full control. Learn when each wins, how inline HTML in Markdown works, and a simple rule of thumb." },
  "writing-github-issues-and-prs-with-markdown": { title: "Write GitHub Issues & PRs That Get Fixed Faster", description: "Write GitHub issues and PRs that get fixed faster: minimal repros in code blocks, task-list checklists, collapsible logs, and environment tables." },
  "what-is-a-uuid-guid-explained": { title: "What Is a UUID? GUID vs UUID Explained (128-Bit IDs)", description: "A plain-English guide to UUIDs and GUIDs: the 128-bit structure, 8-4-4-4-12 hex format, version/variant bits, and why collisions are practically impossible." },
  "uuid-v1-v4-v5-v7-differences": { title: "UUID v1 vs v4 vs v5 vs v7: Which One Should You Use?", description: "UUID versions compared: v1's MAC privacy leak, v4 pure randomness, v5 deterministic hashing, and v7's time-ordered IDs — with a full comparison table." },
  "uuid-vs-auto-increment-database-keys": { title: "UUID vs Auto-Increment Keys: Trade-offs That Matter", description: "UUID or auto-increment for primary keys? Enumeration attacks, index locality, replication, storage size (16 vs 4/8 bytes), and the UUIDv7/ULID middle ground." },
  "generate-uuids-javascript-python-sql": { title: "How to Generate UUIDs in JavaScript, Python, and SQL", description: "Copy-paste UUID recipes: crypto.randomUUID() in JS and Node, Python uuid4/uuid5 namespaces, MySQL UUID() and UUID_TO_BIN, PostgreSQL gen_random_uuid(), and efficient BINARY(16) storage." },
  "are-uuids-really-unique-collision-probability": { title: "Are UUIDs Really Unique? The Real Collision Odds", description: "The real math behind UUID collisions: the 2^122 space, the birthday paradox, concrete odds like one-in-a-billion at 103 trillion UUIDs, and what causes duplicates." },
  "how-to-create-strong-passwords-guide": { title: "How to Create Strong Passwords — A Practical Guide", description: "What actually makes a password strong: length over complexity tricks, why P@ssw0rd1 fails, unique-per-site as rule #1, generated vs passphrase, and MFA." },
  "password-entropy-explained-length-vs-complexity": { title: "Password Entropy Explained: Why Length Beats Complexity", description: "Password entropy with real math: bits = length × log2(pool), worked examples, GPU cracking-time tables, and why human patterns destroy theoretical entropy." },
  "passphrases-vs-random-passwords": { title: "Passphrases vs Random Passwords — Which Should You Use?", description: "Diceware passphrases (~12.9 bits/word, memorable) vs random strings (denser, need a manager): threat models, honest math, and a real diceware how-to." },
  "how-password-managers-work": { title: "How Password Managers Work — Under the Hood", description: "Master password → KDF (PBKDF2/Argon2) → AES-256 encrypted vault. Zero-knowledge architecture, sync and breach implications, and why autofill blocks phishing." },
  "common-password-attacks-explained": { title: "7 Common Password Attacks Explained (and How to Stop Them)", description: "Brute force, credential stuffing, phishing, rainbow tables, and 3 more password attacks explained — how each works and the exact defence that stops it." },
  "hex-rgb-hsl-color-formats-explained": { title: "HEX vs RGB vs HSL — Color Formats Explained", description: "Hex anatomy (#RRGGBB, shorthand, #RRGGBBAA), rgb()/rgba(), and HSL's human model — one color worked through all three formats, plus when to use which." },
  "css-colors-guide-for-developers": { title: "CSS Colors: Every Syntax Plus Dark Mode Tokens", description: "Every CSS color syntax — hex, rgb, hsl, currentColor — plus custom-property palettes, opacity vs alpha explained, gradient tips, and a dark-mode token setup." },
  "color-contrast-accessibility-wcag-guide": { title: "WCAG Color Contrast Ratios Explained: 4.5:1 vs 3:1", description: "WCAG contrast ratios explained — 4.5:1 for text, 3:1 for large text and UI — how the math works, common failures like gray placeholders, and easy fixes." },
  "convert-colors-in-javascript-examples": { title: "Convert Colors in JavaScript: HEX, RGB & HSL (Code)", description: "A copy-paste JavaScript cookbook for color conversion — hex to RGB, RGB to HSL, getComputedStyle, and canvas pixel reads — with a reusable utility module." },
  "choosing-a-color-palette-for-your-website": { title: "How to Choose a Website Color Palette: A 6-Step Method", description: "A repeatable 6-step method for a website color palette — one brand hue, the 60-30-10 rule, contrast checks, and dark mode — with a complete hex code example." },
};

export async function getStaticProps() {
  const blogDir = path.join(process.cwd(), "pages", "blog");

  const files = fs.readdirSync(blogDir)
    .filter(
      (f) =>
        f.endsWith(".js") &&
        f !== "index.js" &&
        !f.startsWith("_")
    );

  const posts = files.map((file) => {
    const slug = file.replace(".js", "");
    const meta = POST_META[slug];

    return {
      slug,
      title: meta?.title || slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      description: meta?.description || "",
    };
  });

  // Sort: posts with known meta first
  posts.sort((a, b) => (b.description ? 1 : 0) - (a.description ? 1 : 0));

  return {
    props: { posts },
  };
}