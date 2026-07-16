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
  "sql-query-generator-tutorial-for-beginners": { title: "SQL Query Generator Tutorial for Beginners", description: "Learn how to use an AI SQL generator to write SELECT, JOIN, GROUP BY, and WHERE queries without remembering syntax. A step-by-step beginner tutorial." },
  "sql-join-interview-questions-with-examples": { title: "SQL JOIN Interview Questions with Examples", description: "Common SQL JOIN interview questions with answers and worked examples for MySQL and PostgreSQL." },
  "common-sql-errors-and-fix-using-ai": { title: "Common SQL Errors and How to Fix Them with AI", description: "The most frequent SQL errors in MySQL and PostgreSQL — syntax errors, ambiguous columns, GROUP BY issues, deadlocks — and how AI helps you fix them fast." },
  "sql-optimization-techniques-for-large-tables": { title: "SQL Optimization Techniques for Large Tables", description: "Speed up slow queries with indexing, query planning, and pagination strategies for large datasets." },
  "mysql-vs-postgresql-performance-comparison": { title: "MySQL vs PostgreSQL: Performance Comparison", description: "A practical comparison of MySQL and PostgreSQL query performance, indexing, concurrency, and feature set — with guidance on when to choose each." },
  "50-sql-queries-for-freshers-in-india": { title: "50 SQL Queries for Freshers in India", description: "50 essential SQL queries practised in TCS, Infosys, and Wipro technical rounds — with solutions." },
  "ai-sql-practical": { title: "Practical AI SQL Use Cases for Developers", description: "Real-world scenarios where an AI SQL generator saves time: reporting, data exploration, and ETL." },
  "sql-queries-asked-in-accenture-capgemini-interviews": { title: "SQL Queries Asked in Accenture & Capgemini Interviews", description: "Frequently asked SQL questions in Accenture, Capgemini, and similar service company interviews, with worked query examples and explanations." },
  "sql-query-for-duplicate-records-detection": { title: "SQL Query to Find and Remove Duplicate Records", description: "Step-by-step SQL techniques to detect, count, and delete duplicate rows in MySQL and PostgreSQL, with safe DELETE patterns using window functions." },
  "sql-query-for-sales-report-dashboard": { title: "SQL Queries for Sales Report Dashboards", description: "Ready-to-use SQL queries for building sales report dashboards: revenue by month, by region, top products, and month-over-month growth calculations." },
  "top-sql-interview-questions-tcs-infosys-wipro": { title: "Top SQL Interview Questions: TCS, Infosys, Wipro", description: "SQL interview preparation for IT services companies: TCS, Infosys, and Wipro. Common questions, expected answers, and query walkthroughs." },
  "regex-top-patterns": { title: "Top 10 Regex Patterns Every Developer Should Know", description: "The most useful regular expressions for email, URL, phone, date, and IP address matching." },
  "regex-cheat-sheet-for-backend-developers": { title: "Regex Cheat Sheet for Backend Developers", description: "A concise reference of regex syntax, flags, anchors, quantifiers, and character classes." },
  "top-50-useful-regex-patterns-for-developers": { title: "Top 50 Useful Regex Patterns for Developers", description: "50 practical, ready-to-use regex patterns for validation, parsing, and search — covering email, URL, phone, date, IP, password, hex color, and more." },
  "regex-for-email-validation-javascript-example": { title: "Regex for Email Validation in JavaScript — Practical Patterns and Edge Cases", description: "How to validate email addresses using regex in JavaScript, with a practical pattern, edge case handling, and why full RFC 5322 compliance is not worth chasing." },
  "regex-for-indian-phone-number-validation": { title: "Regex for Indian Phone Number Validation — +91, 91, and 10-Digit Formats", description: "Validate Indian mobile numbers with regex, covering +91, 91, and plain 10-digit formats. JavaScript and Python examples plus common formatting pitfalls." },
  "regex-for-password-validation-rules": { title: "Regex for Password Validation Rules — Strength Checks That Work", description: "Build strong password validation with regex: minimum length, uppercase, lowercase, digits, and special characters. JavaScript and Python examples included." },
  "regex-for-gst-number-validation": { title: "Regex for GST Number Validation in India — GSTIN Format Explained", description: "Validate Indian GST Identification Numbers (GSTIN) with a precise regex pattern. Covers the 15-character format, JavaScript examples, and validation limits." },
  "regex-for-pan-card-validation": { title: "Regex for PAN Card Validation in JavaScript and Python", description: "Validate Indian PAN card numbers with a reliable regex pattern. Includes JavaScript and Python examples, format breakdown, and common mistakes to avoid." },
  "regex-for-aadhaar-card-validation": { title: "Regex for Aadhaar Card Validation — 12-Digit Format and Edge Cases", description: "Validate Aadhaar card numbers with regex. Covers the 12-digit format, spaced input handling, JavaScript and Python examples, and Verhoeff checksum limits." },
  "regex-for-ifsc-code-validation": { title: "Regex for IFSC Code Validation — Indian Bank Codes Explained", description: "Validate Indian bank IFSC codes with a precise regex pattern. Covers the 11-character format, JavaScript and Python examples, and common pitfalls." },
  "regex-for-indian-pin-code-validation": { title: "Regex for Indian PIN Code Validation — 6-Digit Postal Codes", description: "Validate 6-digit Indian postal PIN codes using regex in JavaScript and Python. Covers the zone-digit rule, common mistakes, and address-form best practices." },
  "cron-vs-setinterval-nodejs": { title: "Cron vs setInterval in Node.js — Which Should You Use?", description: "Compare node-cron and setInterval for task scheduling in Node.js — with code examples and trade-offs." },
  "cron-expressions-aws-eventbridge-lambda": { title: "Cron Expressions for AWS EventBridge and Lambda", description: "Write cron expressions that schedule AWS Lambda functions correctly using EventBridge syntax." },
  "cron-jobs-github-actions-tutorial": { title: "Cron Jobs in GitHub Actions — Schedule Workflows", description: "How to use cron expressions in GitHub Actions to run workflows on a schedule with examples." },
  "cron-expression-complete-guide": { title: "Cron Expression Complete Guide for Developers", description: "Everything you need to know about cron syntax: fields, special characters, and real-world patterns." },
  "top-10-cron-schedule-patterns-developers": { title: "Top 10 Cron Schedule Patterns for Developers", description: "The most commonly used cron expressions for daily jobs, hourly tasks, and monthly schedules." },
  "url-encoding-rest-api-query-parameters": { title: "URL Encoding for REST API Query Parameters", description: "Why and how to URL-encode query parameters in JavaScript using encodeURIComponent and URLSearchParams." },
  "url-encoding-guide-for-web-developers": { title: "URL Encoding Guide for Web Developers", description: "A complete guide to percent-encoding, when it is required, and common encoding mistakes to avoid." },
  "base64-encoding-javascript-examples": { title: "Base64 Encoding in JavaScript — Examples", description: "How to encode and decode Base64 strings in JavaScript with browser and Node.js examples." },
  "base64-vs-url-encoding-difference": { title: "Base64 vs URL Encoding — What\'s the Difference?", description: "When to use Base64 vs percent-encoding and how each affects data size and portability." },
  "encode-images-base64-data-uri-html-css": { title: "Encode Images as Base64 Data URIs in HTML/CSS", description: "Embed images directly in HTML and CSS using Base64 data URIs to avoid extra HTTP requests." },
  "decode-jwt-tokens-base64-javascript": { title: "Decode JWT Tokens Using Base64 in JavaScript", description: "How JWT tokens use Base64url encoding and how to decode the header and payload in JavaScript." },
  "fix-invalid-json-error-in-nodejs": { title: "Fix Invalid JSON Errors in Node.js", description: "Common causes of SyntaxError: Unexpected token in JSON in Node.js and how to fix them, with try/catch patterns and Express middleware examples." },
  "how-to-validate-json-in-python-and-javascript": { title: "How to Validate JSON in Python and JavaScript", description: "Validate JSON structure in Python using json.loads and in JavaScript using JSON.parse with proper error handling and schema-level validation." },
  "json-formatter-for-indian-gst-apis": { title: "JSON Formatter for Indian GST APIs", description: "Format and validate GST API JSON responses in India — common GSTIN, invoice, and e-invoice field references with formatting and debugging tips." },
  "json-schema-generator-tutorial-with-examples": { title: "JSON Schema Generator Tutorial with Examples", description: "Generate a JSON Schema from example JSON and use it for API validation, documentation, and automated testing, with a full worked example." },
  "ai-dev-tools-save-time": { title: "How AI Dev Tools Save Developer Time", description: "Practical examples of AI-powered tools that reduce repetitive tasks for developers." },
  "ai-sql-practical": { title: "Practical AI SQL Use Cases for Developers", description: "Real-world scenarios where AI SQL generation saves time in reporting and data work." },
  "ai-projects-for-engineering-students-india": { title: "AI Projects for Engineering Students in India", description: "Beginner-friendly AI project ideas for B.Tech and M.Tech students with implementation guidance." },
  "best-ai-projects-for-final-year-btech": { title: "Best AI Projects for Final Year B.Tech Students", description: "High-impact final year project ideas using machine learning, NLP, and computer vision." },
  "python-ai-projects-for-engineering-students-india": { title: "Python AI Projects for Engineering Students in India", description: "Practical Python and AI project ideas for Indian engineering students, from beginner to final-year level, with libraries, datasets, and resources." },
  "ai-microservices-tutorial-for-backend-developers": { title: "AI Microservices Tutorial for Backend Developers", description: "Learn how to design and integrate an AI-powered microservice into an existing backend using Python, FastAPI, and REST APIs, with a working example." },
  "ai-anomaly-detection-for-server-logs-python-example": { title: "AI Anomaly Detection for Server Logs in Python", description: "Detect unusual patterns in server logs using Python, scikit-learn, and simple statistical models." },
  "common-api-errors-and-how-to-fix-them": { title: "Common API Errors and How to Fix Them", description: "A practical guide to the most common REST API error codes — 400, 401, 403, 404, 429, 500 — with real-world causes and how to fix each one." },
  "how-to-debug-rest-api-errors-using-ai": { title: "How to Debug REST API Errors Using AI", description: "A step-by-step workflow for using AI tools to diagnose REST API errors faster: reading responses, tracing requests, and fixing issues efficiently." },
  "fix-nodejs-errors-beginners-india": { title: "Fix Common Node.js Errors — Guide for Beginners in India", description: "Step-by-step fixes for common Node.js errors beginners face in India: Cannot find module, EACCES, ECONNREFUSED, and npm install failures." },
  "best-free-developer-tools-for-indian-programmers": { title: "Best Free Developer Tools for Indian Programmers", description: "A curated list of free developer tools for Indian programmers — editors, version control, API testing, hosting, databases, and everyday utilities." },
  "sql-optimization-techniques-for-large-tables": { title: "SQL Optimization Techniques for Large Tables", description: "Speed up slow SQL queries with indexing, EXPLAIN, query rewriting, and pagination strategies." },
  "free-mysql-query-generator-online": { title: "Free MySQL Query Generator Online", description: "How to use a free AI MySQL query generator to build SELECT, JOIN, GROUP BY queries from plain English — no SQL knowledge required." },
  "ai-regex-generator-guide": { title: "AI Regex Generator — How to Use Automatic Regex Generation", description: "How an AI regex generator works, how to prompt it for email, phone, date, and custom patterns, and how to test the output." },
  "natural-language-to-sql-guide": { title: "Natural Language to SQL — How AI SQL Generators Work", description: "Learn how natural language to SQL conversion works, how to prompt an AI SQL query builder, and when AI-generated SQL saves time." },

  "regex-for-credit-card-validation": { title: "Regex for Credit Card Validation — Visa, Mastercard, Amex, RuPay", description: "Regex patterns to validate major credit card formats — Visa, Mastercard, Amex, RuPay, Discover — plus why you also need the Luhn algorithm for real validity." },
  "regex-for-indian-vehicle-number-validation": { title: "Regex for Indian Vehicle Number Validation (RTO + BH Series)", description: "A complete regex pattern for validating Indian vehicle registration numbers (state code, RTO code, series, number), including the BH series format." },
  "regex-for-url-validation-javascript": { title: "Regex for URL Validation in JavaScript (+ URL API Alternative)", description: "Regex patterns to validate URLs in JavaScript — protocol, domain, port, path, query string — plus when the built-in URL constructor is the safer choice." },
  "regex-for-date-format-validation": { title: "Regex for Date Format Validation — DD/MM/YYYY, ISO 8601", description: "Regex patterns for validating DD/MM/YYYY, MM-DD-YYYY, and ISO 8601 (YYYY-MM-DD) dates, plus why regex alone cannot catch impossible dates like Feb 30." },
  "regex-for-hexadecimal-color-code-validation": { title: "Regex for Hexadecimal Color Code Validation (3, 6, 8-Digit)", description: "Regex patterns to validate 3-digit and 6-digit hex color codes, with and without #, plus the 8-digit alpha-channel format, with CSS and JS examples." },
  "regex-for-ipv4-address-validation": { title: "Regex for IPv4 Address Validation (Correct Octet Range)", description: "A correct regex for validating IPv4 addresses, explaining the common mistake of allowing octets above 255 and how to fix it properly." },
  "regex-for-username-validation-rules": { title: "Regex for Username Validation Rules (Length, Characters)", description: "Common username validation rules — length limits, allowed characters, no leading digits, no consecutive special characters — with regex examples." },
  "regex-for-html-tag-stripping": { title: "Regex for HTML Tag Stripping — and Its Security Risks", description: "How to strip HTML tags with regex for plain-text previews, and why a proper HTML parser is required instead for untrusted, security-sensitive input." },
  "regex-for-extracting-hashtags-and-mentions": { title: "Regex for Extracting Hashtags and Mentions (JS Examples)", description: "How to extract #hashtags and @mentions from text using JavaScript regex with match and matchAll, including Unicode-friendly patterns." },
  "regex-lookahead-and-lookbehind-explained": { title: "Regex Lookahead and Lookbehind Explained (With Examples)", description: "A clear explanation of positive/negative lookahead and lookbehind in regex, with practical examples like password rules and currency formatting." },
  "regex-non-greedy-vs-greedy-matching": { title: "Regex Non-Greedy vs Greedy Matching (Side-by-Side Examples)", description: "The difference between greedy (.*) and lazy/non-greedy (.*?) quantifiers in regex, with side-by-side examples showing how matched results differ." },
  "regex-for-splitting-csv-strings": { title: "Regex for Splitting CSV Strings (Handling Quoted Commas)", description: "Regex to split CSV lines correctly, including handling quoted fields that contain commas, and why a real CSV parser is safer for production." },
  "regex-for-indian-passport-number-validation": { title: "Regex for Indian Passport Number Validation", description: "A regex pattern for validating the Indian passport number format — one letter followed by seven digits — with JavaScript examples and edge cases." },
  "regex-for-driving-license-number-validation-india": { title: "Regex for Driving License Number Validation in India", description: "A regex pattern for validating Indian driving license numbers (state code + RTO + year + unique number), and why the format varies by state." },
  "regex-for-multiline-text-matching": { title: "Regex for Multiline Text Matching — m and s Flags Explained", description: "How to use the m (multiline) and s (dotall) regex flags to match across multiple lines in JavaScript, with practical log-parsing examples." },
  "regex-performance-and-catastrophic-backtracking": { title: "Regex Performance and Catastrophic Backtracking (ReDoS)", description: "How catastrophic backtracking happens with nested quantifiers like (a+)+, why it causes ReDoS, and how to write safer, more efficient regex patterns." },
  "regex-for-extracting-numbers-from-string": { title: "Regex for Extracting Numbers from a String (JS Examples)", description: "How to extract integers, decimals, and negative numbers from mixed text using JavaScript regex, with working code for common real-world formats." },
  "regex-vs-string-methods-when-to-use-which": { title: "Regex vs String Methods — When to Use Which", description: "A practical decision guide for when to use regex versus plain string methods like includes, split, indexOf, and startsWith for common tasks." },
  "sql-window-functions-explained-with-examples": { title: "SQL Window Functions Explained with Examples", description: "Learn SQL window functions with clear examples: ROW_NUMBER, RANK, DENSE_RANK, LAG, and LEAD using OVER (PARTITION BY ... ORDER BY ...) syntax." },
  "sql-cte-common-table-expressions-guide": { title: "SQL CTE (Common Table Expressions) Guide — The WITH Clause Explained", description: "Learn SQL Common Table Expressions (CTEs) with the WITH clause: why they beat nested subqueries for readability, multiple CTEs, and a recursive CTE example." },
  "sql-subqueries-vs-joins-explained": { title: "SQL Subqueries vs JOINs Explained — Which One Should You Use?", description: "Compare SQL subqueries and JOINs for solving the same problems, with performance notes and clear guidance on when to prefer each approach." },
  "sql-group-by-having-clause-explained": { title: "SQL GROUP BY and HAVING Clause Explained with Examples", description: "Learn SQL GROUP BY and HAVING with SUM, COUNT, AVG, MIN, and MAX examples, and why HAVING filters groups while WHERE filters individual rows." },
  "sql-indexing-strategies-for-faster-queries": { title: "SQL Indexing Strategies for Faster Queries — B-Tree, Composite Indexes, EXPLAIN", description: "Learn how SQL B-tree indexes work, how composite index column order matters, when indexes hurt write performance, and how to read EXPLAIN output." },
  "sql-normalization-explained-1nf-2nf-3nf": { title: "SQL Normalization Explained — 1NF, 2NF, 3NF with a Before/After Example", description: "Learn database normalization with a concrete before/after example: how an unnormalized table gets split into 1NF, 2NF, and 3NF step by step." },
  "sql-transactions-acid-properties-explained": { title: "SQL Transactions and ACID Properties Explained", description: "Learn SQL transactions — BEGIN, COMMIT, ROLLBACK — and the four ACID properties (Atomicity, Consistency, Isolation, Durability) with a bank-transfer example." },
  "sql-query-for-pagination-limit-offset": { title: "SQL Query for Pagination — LIMIT, OFFSET, and Keyset Pagination", description: "Learn SQL pagination with LIMIT and OFFSET, why OFFSET gets slow at scale, and how keyset (cursor-based) pagination with WHERE id > last_seen_id solves it." },
  "sql-union-vs-union-all-explained": { title: "SQL UNION vs UNION ALL Explained", description: "Learn the difference between SQL UNION and UNION ALL, when each removes duplicates, and why UNION ALL is faster because it skips deduplication." },
  "sql-case-statement-examples": { title: "SQL CASE Statement Examples — Conditional Logic in SELECT", description: "Learn the SQL CASE WHEN expression with real examples: age bands, order status labels, grading, conditional aggregation, and CASE inside ORDER BY." },
  "sql-date-functions-cheat-sheet": { title: "SQL Date Functions Cheat Sheet — MySQL vs PostgreSQL", description: "A side-by-side cheat sheet of common SQL date functions in MySQL and PostgreSQL: current date/time, adding dates, date differences, formatting, and extracting parts." },
  "sql-query-for-hierarchical-data-recursive-cte": { title: "SQL Query for Hierarchical Data with Recursive CTE", description: "Learn how to query hierarchical data in SQL using a recursive CTE (WITH RECURSIVE), with an employee-manager org chart example and a category tree example." },
  "sql-interview-questions-for-freshers-with-answers": { title: "SQL Interview Questions for Freshers with Answers", description: "A practical set of beginner-level SQL interview questions and answers covering SELECT basics, JOIN types, keys, normalization, and DELETE vs TRUNCATE vs DROP." },
  "sql-stored-procedures-vs-functions": { title: "SQL Stored Procedures vs Functions — Key Differences with Examples", description: "Understand the difference between stored procedures and user-defined functions in SQL, with MySQL syntax examples, PostgreSQL notes, and when to use each." },
  "sql-query-for-inventory-management-system": { title: "SQL Queries for an Inventory Management System", description: "Practical SQL queries for an inventory management system: current stock levels, low-stock alerts, reorder reports, and stock movement history, with a schema." },
  "sql-null-handling-best-practices": { title: "SQL NULL Handling Best Practices — COALESCE, IS NULL, Three-Valued Logic", description: "Understand SQL NULL semantics, three-valued logic, COALESCE and IFNULL/ISNULL functions, and why '= NULL' never matches a row in SQL." },
  "sql-query-for-employee-attendance-report": { title: "SQL Query for Employee Attendance Report — Daily, Monthly, Late Arrivals", description: "Practical SQL queries for building an employee attendance report: daily and monthly attendance percentage, late arrival detection, and absentee reports." },
  "sql-vs-nosql-when-to-choose-which": { title: "SQL vs NoSQL — When to Choose Which Database Model", description: "Compare SQL and NoSQL databases across schema flexibility, scaling, consistency models, and use cases, with a practical decision checklist." },
  "cron-expression-examples-every-5-minutes": { title: "Cron Expression Examples for Every 5, 10, 15, 30 Minutes", description: "Practical cron expression examples for every 5, 10, 15, 30 minutes, every hour, and every N hours, with a clear explanation of how the step syntax works." },
  "cron-job-best-practices-for-production": { title: "Cron Job Best Practices for Production Systems", description: "Best practices for running cron jobs reliably in production: logging, alerting on failure, idempotency, locking to avoid overlapping runs, and error handling." },
  "cron-vs-quartz-scheduler-java": { title: "Cron vs Quartz Scheduler in Java — Syntax Differences", description: "Compare Unix cron syntax vs Quartz Scheduler's cron-like syntax in Java, including the extra seconds field and the day-of-month/day-of-week conflict rule." },
  "cron-jobs-in-linux-crontab-tutorial": { title: "Cron Jobs in Linux Crontab — Step-by-Step Tutorial", description: "Step-by-step tutorial on editing Linux crontab with crontab -e, syntax basics, logging job output, and common gotchas like PATH and environment variable issues." },
  "cron-expression-for-monthly-and-yearly-schedules": { title: "Cron Expressions for Monthly and Yearly Schedules", description: "Cron expressions for monthly and yearly recurring schedules, including first-of-month, last-day-of-month, and specific-date patterns with workarounds." },
  "cron-job-monitoring-and-alerting-guide": { title: "Cron Job Monitoring and Alerting Guide", description: "How to monitor cron jobs and get alerted on failures: the dead man's switch pattern, healthcheck pings, exit-code alerting, and centralized logging." },
  "cron-jobs-python-schedule-library-guide": { title: "Cron Jobs with Python's schedule Library and APScheduler", description: "Using Python's schedule library and APScheduler as alternatives to system cron, with code examples for interval jobs, cron-style triggers, and best practices." },
  "cron-expression-timezone-handling-guide": { title: "How Cron Handles Timezones — A Practical Guide", description: "How cron handles timezones: system time vs UTC, pitfalls when a server's timezone changes, and how AWS EventBridge and GitHub Actions handle timezone." },
  "cron-jobs-docker-container-tutorial": { title: "Running Cron Jobs Inside Docker Containers — A Tutorial", description: "Approaches for running cron jobs with Docker: cron daemon in-container, host cron with docker exec, and a sidecar container, with a working Dockerfile example." },
  "cron-vs-message-queue-when-to-use-which": { title: "Cron vs Message Queue — When to Use Which", description: "Decision criteria for choosing cron-based scheduling versus event-driven message queues like SQS or RabbitMQ for background work, with concrete examples." },
  "cron-expression-for-business-hours-only": { title: "Cron Expressions for Business Hours Only", description: "Cron expressions to run jobs only during business hours and weekdays, covering day-of-week and hour-range syntax, split shifts, and common mistakes." },
  "debugging-cron-jobs-that-are-not-running": { title: "Debugging Cron Jobs That Are Not Running", description: "Troubleshooting guide for cron jobs that silently fail to run: PATH issues, permissions, syntax errors, a disabled cron service, and how to debug each." },
  "base64-encoding-python-examples": { title: "Base64 Encoding in Python — Complete Guide with Examples", description: "Learn how to encode and decode Base64 in Python using the base64 module. Covers strings, bytes, files, URL-safe Base64, and common errors with examples." },
  "base64-file-upload-encoding-guide": { title: "Base64 File Upload Encoding — A Practical Guide", description: "How Base64 is used to encode files like images and PDFs for upload in web forms and JSON APIs, the size overhead it adds, and when to use multipart/form-data instead." },
  "url-encoding-vs-uri-encoding-difference": { title: "URL Encoding vs URI Encoding — What's the Real Difference?", description: "URL encoding and URI encoding both mean percent-encoding, but the terms come from different specs. Learn the nuance, reserved characters, and correct usage." },
  "percent-encoding-special-characters-guide": { title: "Percent-Encoding Special Characters — A Reference Guide", description: "A quick-reference table for percent-encoding common special characters like space, &, =, ?, # and more, with JavaScript encodeURIComponent examples." },
  "jwt-authentication-explained-for-beginners": { title: "JWT Authentication Explained for Beginners", description: "A beginner-friendly explanation of JWT structure, how Base64url encoding is used inside a token, and how the full JWT authentication flow works end to end." },
  "base64-encoding-vs-encryption-difference": { title: "Base64 Encoding vs Encryption — What's the Difference?", description: "Base64 is not encryption. Learn why Base64 provides zero confidentiality, why it looks secure to beginners, and what to use instead for real security." },
  "how-to-decode-base64-in-python": { title: "How to Decode Base64 in Python — Step by Step", description: "A step-by-step tutorial on decoding Base64 strings in Python, handling padding errors, and choosing between decoding to bytes or UTF-8 text." },
  "url-shortener-encoding-techniques-explained": { title: "How URL Shorteners Generate Short Codes — Encoding Techniques Explained", description: "Learn how URL shorteners like bit.ly generate short codes using base62 encoding of auto-increment IDs and hashing approaches, with a working JS example." },
  "base64-encoding-limitations-and-alternatives": { title: "Base64 Encoding Limitations and Alternatives", description: "Base64 has real limitations: ~33% size overhead and no compression. Learn when those limitations matter and what alternatives solve them better." },
  "encode-decode-query-strings-nodejs": { title: "Encoding and Decoding Query Strings in Node.js", description: "How to build and parse URL query strings in Node.js using URLSearchParams and the querystring module, with correct encoding examples for arrays and special characters." },
  "base64-encoding-email-attachments-mime": { title: "How Base64 Encodes Email Attachments in MIME", description: "How Base64 is used inside MIME to encode email attachments so binary files survive text-only email transport, with a simplified raw MIME message example." },
  "url-encoding-common-mistakes-developers-make": { title: "Common URL Encoding Mistakes Developers Make", description: "The most common URL-encoding bugs developers run into: double-encoding, encoding a whole URL instead of just parameters, and mixing up + and %20 for spaces." },
  "json-vs-xml-comparison-for-apis": { title: "JSON vs XML for APIs — Which Should You Use?", description: "Compare JSON and XML for API payloads — readability, payload size, parsing speed, schema support, and why JSON became the default format for REST APIs." },
  "json-parsing-errors-common-causes-and-fixes": { title: "JSON Parsing Errors — Common Causes and Fixes", description: "The most common JSON parsing errors in JavaScript — trailing commas, single quotes, unquoted keys, undefined values — explained with fixes and examples." },
  "nested-json-flattening-techniques": { title: "Nested JSON Flattening Techniques", description: "Learn how to flatten deeply nested JSON objects into flat key-value structures for CSV export or analytics, with a working recursive JavaScript function." },
  "json-formatter-online-free-guide": { title: "Free Online JSON Formatter — Complete Guide", description: "What a free online JSON formatter does — pretty-print, validate, and minify — and why it is one of the fastest ways to debug messy API responses and config files." },
  "json-diff-comparing-two-json-objects": { title: "JSON Diff — How to Compare Two JSON Objects", description: "How to compare two JSON objects for differences — deep equality checks, key-by-key diffing, and using JSON diffing for API response regression testing." },
  "json-minify-vs-pretty-print-explained": { title: "JSON Minify vs Pretty Print — Explained", description: "JSON minification vs pretty-printing explained — when to use each, how they affect payload size and readability, with before and after examples." },
  "json-schema-validation-nodejs-example": { title: "JSON Schema Validation in Node.js with Ajv", description: "A hands-on tutorial on validating JSON data against a JSON Schema in Node.js using the ajv library, with a complete working example and error handling." },
  "working-with-large-json-files-nodejs": { title: "Working with Large JSON Files in Node.js", description: "How to process large JSON files in Node.js without loading everything into memory — streaming JSON parsers, chunked processing, and practical code examples." },
  "json-to-csv-conversion-guide": { title: "JSON to CSV Conversion Guide", description: "How to convert a JSON array of objects into CSV format, with a manual JavaScript implementation and a rundown of the most common Node.js and Python libraries." },
  "json-web-token-vs-session-authentication": { title: "JWT vs Session Authentication — Which Should You Use?", description: "Compare JSON Web Tokens (JWT) with traditional server-side session authentication — statelessness, scalability, revocation, and security trade-offs explained." },
  "rest-api-json-response-best-practices": { title: "REST API JSON Response Best Practices", description: "Best practices for structuring JSON API responses — consistent envelope format, error objects, pagination metadata, and naming conventions like camelCase vs snake_case." },
  "json-serialization-python-guide": { title: "JSON Serialization in Python — Complete Guide", description: "How to serialize and deserialize JSON in Python using the json module — handling datetime objects, custom encoders, and the common TypeError: not JSON serializable fix." },
  "ai-code-review-tools-for-developers": { title: "AI Code Review Tools for Developers — What They Catch and What They Miss", description: "How AI-powered code review tools work, what they catch well (style, obvious bugs) vs miss (business logic), and how to combine them with human review." },
  "ai-powered-code-documentation-generator-guide": { title: "AI-Powered Code Documentation Generators — A Practical Guide", description: "How AI tools generate code documentation like docstrings and README sections from source code, with a real before/after example and best practices." },
  "machine-learning-projects-for-beginners-india": { title: "Machine Learning Projects for Beginners in India — With Learning Paths", description: "Concrete beginner ML project ideas — house price prediction, spam classifier, movie recommendation — with tech stack and learning path for each." },
  "nlp-projects-for-final-year-students": { title: "NLP Projects for Final Year Students — With Implementation Approach", description: "Final-year NLP project ideas — sentiment analysis, text summarization, chatbot, resume parser — with implementation approach and required libraries." },
  "computer-vision-projects-for-engineering-students": { title: "Computer Vision Projects for Engineering Students — Tools and Approach", description: "Computer vision project ideas — face mask detection, license plate recognition, handwriting recognition — with tools (OpenCV, TensorFlow) and approach." },
  "how-to-use-chatgpt-for-coding-interview-prep": { title: "How to Use ChatGPT for Coding Interview Prep — Without Cheating Yourself", description: "Practical strategies for using ChatGPT/AI to prepare for coding interviews — generating practice problems, mock interviews, and pitfalls to avoid." },
  "ai-resume-builder-tips-for-freshers-india": { title: "AI Resume Builder Tips for Freshers in India", description: "Tips for using AI resume tools effectively for Indian fresher job applications — ATS optimization, what to keep human-reviewed, common mistakes." },
  "best-ai-tools-for-developers-2026": { title: "Best AI Tools for Developers in 2026", description: "Curated list of AI developer tool categories useful in 2026 — code completion, code review, debugging, documentation, SQL/regex generation — explained." },
  "how-ai-code-generators-work-explained": { title: "How AI Code Generators Work, Explained", description: "Conceptual explanation of how AI code generation tools work — training on code corpora, tokenization, autoregressive generation, why output needs review." },
  "ai-vs-traditional-programming-when-to-use-ai": { title: "AI vs Traditional Programming — When to Use AI/ML and When Not To", description: "A decision framework for when to reach for an AI/ML approach vs traditional rule-based programming for a given problem, with concrete examples." },
  "building-your-first-ai-chatbot-python-tutorial": { title: "Building Your First AI Chatbot — A Python Tutorial for Beginners", description: "Step-by-step beginner tutorial building a simple rule-based or API-based chatbot in Python, with real working code you can run today." },
  "career-roadmap-for-backend-developers-india": { title: "Career Roadmap for Backend Developers in India — Fresher to Senior", description: "A concrete skill roadmap for backend developers in India — from fresher to senior — languages, databases, system design, DevOps basics, with milestones." },
  "how-to-crack-technical-interviews-at-product-companies": { title: "How to Crack Technical Interviews at Product-Based Companies", description: "Practical prep advice for cracking technical interviews at product-based companies vs service companies — DSA focus, system design, behavioral rounds." },
  "freelancing-as-a-developer-guide-for-indians": { title: "Freelancing as a Developer — A Practical Guide for Indians", description: "Practical guide to freelancing as a developer in India — platforms, pricing in INR/USD, contracts, taxation basics, and building a portfolio." },
  "rest-api-vs-graphql-comparison": { title: "REST vs GraphQL — A Practical Comparison for Backend Developers", description: "Compare REST and GraphQL on over-fetching, endpoint design, caching, and tooling — with real examples to help you choose the right approach for your API." },
  "how-to-design-a-rest-api-best-practices": { title: "How to Design a REST API — Best Practices That Actually Matter", description: "A practical guide to REST API design — resource naming, HTTP verbs and status codes, versioning, pagination, and a consistent error response format." },
  "api-rate-limiting-strategies-explained": { title: "API Rate Limiting Strategies Explained (With Node.js Examples)", description: "Understand fixed window, sliding window, and token bucket rate limiting algorithms, with a working Node.js/Express middleware example for each." },
  "cors-error-explained-and-how-to-fix-it": { title: "CORS Error Explained — And How to Fix It on Express.js", description: "What causes the classic \"No Access-Control-Allow-Origin header\" CORS error, how CORS headers work, and how to fix it on an Express.js backend." },
  "common-nodejs-npm-errors-and-fixes": { title: "Common Node.js and npm Errors and How to Fix Them", description: "Fixes for the most common npm and Node.js errors: EACCES permission denied, peer dependency conflicts, Cannot find module, and ENOENT package.json." },
  "how-to-handle-async-errors-in-nodejs": { title: "How to Handle Async Errors in Node.js the Right Way", description: "Best practices for handling errors in async/await and Promise-based Node.js code, including unhandled promise rejections and Express route wrappers." },
  "api-authentication-methods-explained-oauth-jwt-apikey": { title: "API Authentication Methods Explained — API Keys vs JWT vs OAuth 2.0", description: "A clear comparison of the three most common API authentication methods — API keys, JWT bearer tokens, and OAuth 2.0 — with guidance on when to use each." },
  "debugging-memory-leaks-in-nodejs": { title: "Debugging Memory Leaks in Node.js — A Practical Walkthrough", description: "How to detect and debug memory leaks in a Node.js application using heap snapshots and --inspect, plus the most common leak sources: closures and event listeners." },
  "express-js-error-handling-middleware-guide": { title: "Express.js Error Handling Middleware — A Complete Guide", description: "How to write centralized error-handling middleware in Express.js, with a working code example covering custom error classes, async errors, and 404 handling." },
  "api-versioning-strategies-explained": { title: "API Versioning Strategies Explained — URL, Header, and Query Param", description: "Compare the three main API versioning strategies — URL path versioning, header versioning, and query parameter versioning — with the trade-offs of each." },
  "how-to-test-rest-apis-with-postman": { title: "How to Test REST APIs with Postman — Collections, Env Vars, and Automation", description: "A practical guide to testing REST APIs with Postman — organizing collections, using environment variables, writing test assertions, and automating with Newman." },
  "common-git-errors-and-how-to-fix-them": { title: "Common Git Errors and How to Fix Them", description: "Fixes for the most common Git errors: merge conflicts, detached HEAD, refusing to merge unrelated histories, and failed to push — with real commands." },
  "docker-errors-for-beginners-explained": { title: "Docker Errors for Beginners Explained", description: "The most common Docker errors beginners hit — port already in use, cannot connect to daemon, no space left, image not found — explained with fixes." },
  "how-to-fix-cannot-read-property-of-undefined-javascript": { title: "How to Fix 'Cannot Read Property of Undefined' in JavaScript", description: "Why 'Cannot read property of undefined' happens in JavaScript, how to read the message, and how to fix and prevent it with optional chaining and defaults." },

  "regex-explainer-guide-how-it-works": { title: "How to Read Any Regex Pattern — A Step-by-Step Explainer Guide", description: "Learn a systematic method for reading any regex pattern, with a token-by-token breakdown of a real email validation regex and a symbol reference table." },
  "sql-explainer-guide-how-it-works": { title: "How to Read a SQL Query You Did Not Write — A Step-by-Step Guide", description: "Learn how to read any SQL query clause by clause, understand execution order vs reading order, and parse nested subqueries with a worked JOIN example." },
  "how-to-write-conventional-commit-messages": { title: "How to Write Conventional Commit Messages — A Practical Guide", description: "A practical guide to Conventional Commits: the exact spec, the 8 standard types, imperative mood, breaking change syntax, and how semantic-release uses it." },
  "jsdoc-vs-python-docstrings-guide": { title: "JSDoc vs Python Docstrings — How to Document Functions Properly", description: "A comparison guide to JSDoc and Python docstrings, with worked @param/@returns and Google-style Args/Returns examples, plus tips for writing useful documentation." },
  "how-to-read-a-stack-trace": { title: "How to Read a Stack Trace (JavaScript and Python)", description: "Learn how to read a stack trace in JavaScript, Node.js, and Python with annotated real-world examples. Find the actual error origin fast, not just the first line." },
  "how-to-quickly-understand-unfamiliar-code": { title: "How to Quickly Understand Unfamiliar Code", description: "A systematic approach to quickly getting oriented in unfamiliar code — entry points, naming clues, top-down vs bottom-up reading, and when to just run it." },
  "jest-vs-pytest-getting-started-guide": { title: "Jest vs pytest — Getting Started Guide", description: "A beginner-friendly Jest vs pytest comparison: install, setup, syntax side by side, a worked example in each, common assertions, and basic mocking." },
  "how-to-write-a-great-readme": { title: "How to Write a Great README.md (With Examples)", description: "Learn what makes a README great: essential sections, badges explained, good vs mediocre examples, and how to keep your README.md maintained as your project grows." },
  "how-to-document-a-rest-api-endpoint": { title: "How to Document a REST API Endpoint (With a Worked Example)", description: "Learn what to include when documenting a REST API endpoint, see a full worked example, and understand when you need Markdown docs vs an OpenAPI spec." },
  "convert-curl-commands-to-fetch-axios-python": { title: "Convert cURL Commands to fetch, axios, and Python requests", description: "Learn how to read curl flags and convert curl commands into working JavaScript fetch, axios, and Python requests code, with a full side-by-side example." },

  "how-to-decode-a-jwt-token-safely": { title: "How to Decode a JWT Token Safely", description: "Decode a JWT token safely in JavaScript, Python, or your browser. Understand the three base64url parts, why decoding is not verifying, and how to protect live tokens." },
  "jwt-structure-explained-header-payload-signature": { title: "JWT Structure Explained: Header, Payload, Signature", description: "Deep dive into JWT anatomy: header fields (alg, typ, kid), registered vs public vs private claims, HS256 vs RS256 signing, with a real token decoded field by field." },
  "jwt-expiry-claims-exp-iat-nbf-explained": { title: "JWT Expiry Claims Explained: exp, iat, and nbf", description: "Understand JWT time claims — exp, iat, and nbf — in unix seconds, handle clock skew with leeway, avoid the ms-vs-seconds bug, and design token lifetimes." },
  "jwt-security-best-practices-for-developers": { title: "JWT Security Best Practices for Developers", description: "A practical JWT security checklist: strong keys, preventing alg confusion attacks, short expiry with refresh tokens, cookie vs localStorage storage, aud/iss validation, and revocation. With Node.js code." },
  "common-jwt-errors-and-how-to-fix-them": { title: "Common JWT Errors and How to Fix Them", description: "Fix jwt malformed, invalid signature, jwt expired, and invalid token errors in Node.js jsonwebtoken. Exact cause plus working fix and code for each error." },
  "md5-vs-sha256-which-hash-should-you-use": { title: "MD5 vs SHA-256 — Which Hash Should You Use?", description: "MD5 vs SHA-256 compared: speed vs security, the collision attacks that broke MD5 and SHA-1, when MD5 is still OK for checksums, and why passwords need bcrypt or Argon2." },
  "what-is-hashing-explained-for-beginners": { title: "What Is Hashing? Explained for Beginners", description: "Hashing explained simply: one-way functions, determinism, the avalanche effect, fixed-size output, hashing vs encryption vs encoding, and everyday uses from Git to hash tables." },
  "password-hashing-bcrypt-vs-sha256": { title: "Password Hashing — bcrypt vs SHA-256", description: "Why fast hashes like SHA-256 fail for passwords: GPU brute-force economics, salting, work factors, bcrypt vs scrypt vs Argon2, a Node.js bcrypt example with cost guidance, and common mistakes." },
  "verify-file-integrity-with-checksums": { title: "Verify File Integrity with Checksums (Linux &amp; Windows)", description: "Verify downloads with sha256sum, certutil, and Get-FileHash. Compare published hashes, understand why checksums catch corrupted or tampered files, and automate checks in CI." },
  "hash-collisions-explained": { title: "Hash Collisions Explained — Birthday Paradox &amp; Broken Hashes", description: "Hash collisions explained: the pigeonhole principle, the birthday paradox and the 2^(n/2) bound, how collisions broke MD5 and SHA-1 in the real world, and why SHA-256 is still collision-free." },
  "sql-formatting-best-practices-style-guide": { title: "SQL Formatting Best Practices — A Practical Style Guide", description: "A practical SQL style guide: keyword casing, one clause per line, JOIN indentation, alias rules, leading vs trailing commas, and CTE formatting with examples." },
  "why-consistent-sql-style-matters-for-teams": { title: "Why Consistent SQL Style Matters for Teams", description: "A shared SQL style speeds up code reviews, cuts diff noise, shortens onboarding, and exposes bugs. Here is how to adopt one with sqlfluff, CI, and a formatter." },
  "sql-keywords-uppercase-or-lowercase": { title: "SQL Keywords: Uppercase or Lowercase? The Casing Debate", description: "SELECT or select? The history of SQL keyword casing, arguments for both styles, what popular style guides choose, and why consistency beats either option." },
  "how-to-format-long-sql-queries-for-readability": { title: "How to Format Long SQL Queries for Readability", description: "Tame 100+ line SQL queries: break logic into CTEs, one JOIN per line, extract subqueries, comment headers, vertical whitespace — with a worked refactor example." },
  "sql-code-review-checklist": { title: "SQL Code Review Checklist: Correctness, Performance, Safety", description: "Actionable SQL code review checklist: JOIN types, NULL handling, GROUP BY completeness, SELECT *, missing WHERE, index use, implicit casts, SQL injection, and style." },
  "how-to-compare-two-text-files-online": { title: "How to Compare Two Text Files Online (Safely)", description: "Compare two text files online: use cases, how line diffs work, privacy of online diff tools (prefer client-side), and CLI alternatives like diff, fc, and git diff --no-index." },
  "understanding-diff-output-unified-vs-split-view": { title: "Understanding Diff Output: Unified vs Split View", description: "Read diffs like a pro: unified format anatomy (---/+++ headers, @@ hunks, +/- prefixes), split view, when each shines, GitHub PR diffs, and ignoring whitespace noise." },
  "git-diff-explained-for-beginners": { title: "Git Diff Explained for Beginners: Every Variant You Need", description: "Beginner-friendly git diff guide: working tree vs --staged, comparing commits and branches, single files, --stat, --word-diff, -w, and reading unified output." },
  "how-diff-algorithms-work-lcs-explained": { title: "How Diff Algorithms Work: LCS Explained", description: "The algorithm behind diff tools: longest common subsequence intuition with a worked matrix, the Myers algorithm, why moved blocks show as delete+add, and performance notes." },
  "compare-config-files-across-environments": { title: "Compare Config Files Across Environments: Find Drift", description: "Find config drift between dev, staging, and prod: redact secrets before diffing, sort keys for JSON/YAML, automate drift detection in CI, with a worked .env example." },
  "unix-timestamp-explained-epoch-time-guide": { title: "Unix Timestamp Explained — A Complete Guide to Epoch Time", description: "What a unix timestamp is, why epoch time starts at 1970-01-01 UTC, seconds vs milliseconds in JS and Python, negative timestamps, and conversion code for JS, Python, and SQL." },
  "convert-timestamp-to-date-javascript-python-sql": { title: "How to Convert a Timestamp to a Date in JavaScript, Python, and SQL", description: "Convert Unix timestamps to human-readable dates in JavaScript, Python, MySQL, and PostgreSQL. Copy-paste snippets, both directions, plus the seconds vs milliseconds trap." },
  "handling-timezones-in-web-applications": { title: "Handling Timezones in Web Applications — A Practical Guide", description: "Store UTC, convert at display. A practical guide to timezone handling in web apps: IANA names vs offsets, JS Intl API, SSR pitfalls, scheduling, and testing tips." },
  "milliseconds-vs-seconds-timestamp-bugs": { title: "Milliseconds vs Seconds — The 1000x Timestamp Bug Explained", description: "Dates showing 1970 or year 56789? That is the milliseconds vs seconds bug. Learn detection heuristics, JWT exp pitfalls, the year-2038 problem, and normalization code." },
  "date-formatting-cheat-sheet-iso-8601": { title: "Date Formatting Cheat Sheet — ISO 8601, RFC 3339, and Format Tokens", description: "ISO 8601 anatomy, RFC 3339, lexicographic sorting, locale display vs storage, and format token comparison across JavaScript, Python strftime, and SQL in one cheat sheet." },
  "yaml-vs-json-differences-explained": { title: "YAML vs JSON — Key Differences Explained with Examples", description: "YAML vs JSON side by side: readability, comments, the Norway problem, anchors, the superset relationship, and when each format wins. With real examples." },
  "yaml-syntax-guide-for-beginners": { title: "YAML Syntax Guide for Beginners — Complete Walkthrough", description: "Learn YAML step by step: key-value pairs, indentation (spaces, never tabs), lists, flow style, multi-line strings, quoting rules, comments, and anchors with a full config example." },
  "common-yaml-errors-in-kubernetes-and-ci": { title: "Common YAML Errors in Kubernetes and CI Pipelines", description: "Fix the YAML errors that break Kubernetes, GitHub Actions, and docker-compose: indentation, tabs, unquoted 3.10 becoming 3.1, on/off becoming booleans, --- separators, yamllint and kubectl --dry-run." },
  "convert-yaml-to-json-javascript-python": { title: "How to Convert YAML to JSON in JavaScript and Python", description: "Convert YAML to JSON in JavaScript (js-yaml) and Python (PyYAML safe_load) with security notes, round-trip caveats — lost comments, flattened anchors — and yq one-liners." },
  "when-to-use-yaml-json-toml-config": { title: "YAML vs JSON vs TOML — Choosing the Right Config Format", description: "When to use YAML (Kubernetes, CI), JSON (machine-generated, APIs), TOML (Cargo, pyproject), or plain .env files — decision criteria, examples, and migration notes." },
  "markdown-syntax-cheat-sheet": { title: "Markdown Syntax Cheat Sheet — Every Element with Examples", description: "Complete markdown cheat sheet: headings, bold, italic, lists, links, images, inline and fenced code, blockquotes, horizontal rules, and escaping — with examples." },
  "github-flavored-markdown-guide": { title: "GitHub Flavored Markdown (GFM) — The Complete Guide", description: "Master GitHub Flavored Markdown: tables with alignment syntax, task lists, strikethrough, autolinks, mentions, code fences with syntax highlighting, footnotes, and alerts." },
  "markdown-for-technical-documentation-tips": { title: "Markdown for Technical Documentation — 7 Tips That Keep Docs Readable", description: "Practical Markdown tips for technical docs: heading hierarchy discipline, code block language tags, relative links, alt text, tables vs lists, and a docs-as-code CI workflow." },
  "markdown-vs-html-when-to-use-which": { title: "Markdown vs HTML — When to Use Which", description: "Markdown covers 80% of writing needs with 20% of the effort; HTML gives full control. Learn when each wins, how inline HTML in Markdown works, and a simple rule of thumb." },
  "writing-github-issues-and-prs-with-markdown": { title: "Writing GitHub Issues and PRs with Markdown", description: "Write GitHub issues and PRs that get fixed faster: minimal repros in fenced code blocks, task-list acceptance criteria, collapsible logs, environment tables, and templates." },
  "what-is-a-uuid-guid-explained": { title: "What Is a UUID? GUIDs Explained for Developers", description: "A plain-English guide to UUIDs and GUIDs: the 128-bit structure, 8-4-4-4-12 hex format, version and variant bits, why they are universally unique, and where they are used." },
  "uuid-v1-v4-v5-v7-differences": { title: "UUID v1 vs v4 vs v5 vs v7 — Differences Explained", description: "UUID versions compared: v1 timestamp+MAC and its privacy leak, v4 pure random, v5 deterministic name-based, and v7 time-ordered UUIDs databases love. With a comparison table." },
  "uuid-vs-auto-increment-database-keys": { title: "UUID vs Auto-Increment Database Keys — Trade-offs Explained", description: "Should your primary key be a UUID or an auto-increment integer? Enumeration attacks, distributed generation, replication, index locality, 16 vs 4/8 bytes, and the UUIDv7/ULID middle ground." },
  "generate-uuids-javascript-python-sql": { title: "How to Generate UUIDs in JavaScript, Python, and SQL", description: "Copy-paste UUID recipes: crypto.randomUUID() in JS and Node, Python uuid4/uuid5 namespaces, MySQL UUID() and UUID_TO_BIN, PostgreSQL gen_random_uuid(), and efficient BINARY(16) storage." },
  "are-uuids-really-unique-collision-probability": { title: "Are UUIDs Really Unique? Collision Probability Explained", description: "The math behind UUID uniqueness made tangible: the 2^122 space, the birthday approximation, concrete collision numbers, and what actually causes duplicate UUIDs in practice." },
  "how-to-create-strong-passwords-guide": { title: "How to Create Strong Passwords — A Practical Guide", description: "What actually makes a password strong: length over complexity tricks, why P@ssw0rd1 fails, unique-per-site as rule #1, generated vs passphrase, and MFA." },
  "password-entropy-explained-length-vs-complexity": { title: "Password Entropy Explained — Length vs Complexity", description: "Password entropy with real math: bits = length × log2(pool), worked examples, GPU cracking-time tables, and why human patterns destroy theoretical entropy." },
  "passphrases-vs-random-passwords": { title: "Passphrases vs Random Passwords — Which Should You Use?", description: "Diceware passphrases (~12.9 bits/word, memorable) vs random strings (denser, need a manager): threat models, honest math, and a real diceware how-to." },
  "how-password-managers-work": { title: "How Password Managers Work — Under the Hood", description: "Master password → KDF (PBKDF2/Argon2) → AES-256 encrypted vault. Zero-knowledge architecture, sync and breach implications, and why autofill blocks phishing." },
  "common-password-attacks-explained": { title: "Common Password Attacks Explained", description: "Brute force, dictionary, credential stuffing, phishing, keyloggers, rainbow tables, and breach lists — how each password attack works and what stops it." },
  "hex-rgb-hsl-color-formats-explained": { title: "HEX vs RGB vs HSL — Color Formats Explained", description: "Hex anatomy (#RRGGBB, shorthand, #RRGGBBAA), rgb()/rgba(), and HSL's human model — one color worked through all three formats, plus when to use which." },
  "css-colors-guide-for-developers": { title: "CSS Colors Guide for Developers", description: "Every way to write color in CSS — keywords, hex, rgb, hsl, currentColor — plus custom properties for palettes, opacity vs alpha, gradients, and dark mode tokens." },
  "color-contrast-accessibility-wcag-guide": { title: "Color Contrast and Accessibility — A WCAG Guide", description: "WCAG ratios (4.5:1 normal, 3:1 large/UI), how relative luminance works, common failures like gray placeholders, checking tools, and fixes without redesign." },
  "convert-colors-in-javascript-examples": { title: "Convert Colors in JavaScript — Working Examples", description: "Cookbook: hex→RGB with parseInt, RGB→hex with toString(16), full RGB↔HSL functions, getComputedStyle quirks, canvas pixel reads, and a utility module." },
  "choosing-a-color-palette-for-your-website": { title: "Choosing a Color Palette for Your Website", description: "Build a website palette step by step: one brand hue, the 60-30-10 rule, hue-biased neutrals, semantic colors, early contrast checks, and dark-mode variants." },
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