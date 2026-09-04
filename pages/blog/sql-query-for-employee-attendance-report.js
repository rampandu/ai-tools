// pages/blog/sql-query-for-employee-attendance-report.js
import Head from 'next/head';
import Link from 'next/link';

export default function SqlQueryForEmployeeAttendanceReport() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'SQL Query for Employee Attendance Report',
        item: 'https://dev-brains-ai.com/blog/sql-query-for-employee-attendance-report',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SQL Queries for Employee Attendance & Late Arrivals',
    description:
      'Build an employee attendance report: daily status, monthly attendance percentage, late check-in detection, and absentee counts in MySQL and PostgreSQL.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/sql-query-for-employee-attendance-report',
    datePublished: '2026-07-11',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I calculate monthly attendance percentage in SQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Count the number of days each employee has a "present" status in attendance_logs for the month, divide by the total working days in that month, and multiply by 100. This is typically done with SUM(CASE WHEN status = \'present\' THEN 1 ELSE 0 END) divided by COUNT(*), grouped by employee and month.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I find employees who checked in late using SQL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Extract the time portion of the check_in timestamp using TIME() in MySQL or the ::time cast in PostgreSQL, then compare it to your shift start time, for example WHERE TIME(check_in) > \'09:15:00\'. This flags any row where the employee checked in after the allowed threshold.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can an AI SQL generator build attendance reports automatically?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Dev Brains AI free AI SQL Query Builder can turn a request like "show employees with attendance below 75 percent this month" into a working GROUP BY and HAVING query — you just need to confirm it matches your actual employees and attendance_logs table structure.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>SQL Queries for Employee Attendance & Late Arrivals | Dev Brains AI</title>
        <meta
          name="description"
          content="Build an employee attendance report: daily status, monthly attendance percentage, late check-in detection, and absentee counts in MySQL and PostgreSQL."
        />
        <meta
          name="keywords"
          content="sql attendance report, employee attendance sql query, sql late arrival query, monthly attendance percentage sql, attendance_logs table sql, sql absentee report"
        />
        <meta property="og:title" content="SQL Queries for Employee Attendance & Late Arrivals" />
        <meta property="og:description" content="Build an employee attendance report: daily status, monthly attendance percentage, late check-in detection, and absentee counts in MySQL and PostgreSQL." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/sql-query-for-employee-attendance-report" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/sql-query-for-employee-attendance-report" />
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
              <li aria-current="page">SQL Query for Employee Attendance Report</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            SQL Query for Employee Attendance Report
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Attendance reporting is one of the most common SQL tasks in HR and payroll systems.
            You need to know who showed up, who was late, who was absent, and what percentage of
            working days each employee actually attended. This guide walks through a realistic
            attendance schema and builds up the queries you need — daily status, monthly
            percentage, late arrivals, and absentee lists — using MySQL and PostgreSQL syntax.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Schema: employees and attendance_logs
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A minimal but realistic attendance system needs two tables: one for employee records
            and one that logs each day's check-in and check-out event.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  department VARCHAR(50) NOT NULL,
  shift_start TIME NOT NULL DEFAULT '09:00:00'
);

CREATE TABLE attendance_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  attendance_date DATE NOT NULL,
  check_in DATETIME NULL,
  check_out DATETIME NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'present', -- present, absent, half_day, leave
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            One row per employee per calendar day is the simplest design: if the employee did not
            show up, a row still exists with <code>status = 'absent'</code> and NULL check-in/out
            times. This makes attendance percentage calculations much easier than trying to infer
            absence from missing rows.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Daily Attendance Report
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A daily report lists every employee's status for a given date, along with how many
            hours they worked if they checked out.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- MySQL / PostgreSQL compatible
SELECT
  e.full_name,
  e.department,
  a.status,
  a.check_in,
  a.check_out,
  TIMESTAMPDIFF(MINUTE, a.check_in, a.check_out) / 60.0 AS hours_worked  -- MySQL
FROM employees e
JOIN attendance_logs a ON a.employee_id = e.id
WHERE a.attendance_date = '2026-07-10'
ORDER BY e.department, e.full_name;

-- PostgreSQL equivalent for hours worked:
-- EXTRACT(EPOCH FROM (a.check_out - a.check_in)) / 3600 AS hours_worked`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Monthly Attendance Percentage
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Attendance percentage is the ratio of days present to total logged working days in
            the month. Use a conditional SUM with CASE to count "present" days, and COUNT(*) for
            the total days on record.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  e.id AS employee_id,
  e.full_name,
  COUNT(*) AS total_days,
  SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) AS days_present,
  ROUND(
    SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) * 100.0 / COUNT(*),
    2
  ) AS attendance_percentage
FROM employees e
JOIN attendance_logs a ON a.employee_id = e.id
WHERE a.attendance_date BETWEEN '2026-07-01' AND '2026-07-31'
GROUP BY e.id, e.full_name
ORDER BY attendance_percentage ASC;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            To flag employees who fall below a required attendance threshold, add a HAVING clause
            after the GROUP BY — HAVING filters on the aggregated result, unlike WHERE which
            filters individual rows before aggregation:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`SELECT
  e.full_name,
  ROUND(SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) AS attendance_percentage
FROM employees e
JOIN attendance_logs a ON a.employee_id = e.id
WHERE a.attendance_date BETWEEN '2026-07-01' AND '2026-07-31'
GROUP BY e.id, e.full_name
HAVING SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) * 100.0 / COUNT(*) < 75
ORDER BY attendance_percentage ASC;`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Late Arrivals — Check-In After a Threshold Time
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            To find late arrivals, compare only the time portion of the check-in timestamp
            against the shift start time plus a grace period. MySQL uses <code>TIME()</code> to
            extract the time component; PostgreSQL uses a cast to <code>::time</code>.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- MySQL: employees who checked in after 9:15 AM (15-minute grace period)
SELECT
  e.full_name,
  a.attendance_date,
  a.check_in,
  TIME(a.check_in) AS check_in_time
FROM employees e
JOIN attendance_logs a ON a.employee_id = e.id
WHERE a.status = 'present'
  AND TIME(a.check_in) > '09:15:00'
ORDER BY a.attendance_date DESC, check_in_time DESC;

-- PostgreSQL equivalent
SELECT
  e.full_name,
  a.attendance_date,
  a.check_in,
  a.check_in::time AS check_in_time
FROM employees e
JOIN attendance_logs a ON a.employee_id = e.id
WHERE a.status = 'present'
  AND a.check_in::time > TIME '09:15:00'
ORDER BY a.attendance_date DESC, check_in_time DESC;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            For a per-employee shift start time stored on the employees table instead of a fixed
            threshold, join against <code>e.shift_start</code> and add the grace period with
            interval arithmetic:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- MySQL: compare against each employee's own shift start + 15 minutes
SELECT e.full_name, a.attendance_date, TIME(a.check_in) AS check_in_time
FROM employees e
JOIN attendance_logs a ON a.employee_id = e.id
WHERE a.status = 'present'
  AND TIME(a.check_in) > ADDTIME(e.shift_start, '00:15:00');`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Absentee Report
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            List every employee marked absent on a given date, or count total absences per
            employee over a date range to spot attendance issues early.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`-- Absentees for a single day
SELECT e.full_name, e.department
FROM employees e
JOIN attendance_logs a ON a.employee_id = e.id
WHERE a.attendance_date = '2026-07-10'
  AND a.status = 'absent'
ORDER BY e.department, e.full_name;

-- Employees with more than 3 absences this month
SELECT
  e.full_name,
  COUNT(*) AS absent_days
FROM employees e
JOIN attendance_logs a ON a.employee_id = e.id
WHERE a.status = 'absent'
  AND a.attendance_date BETWEEN '2026-07-01' AND '2026-07-31'
GROUP BY e.id, e.full_name
HAVING COUNT(*) > 3
ORDER BY absent_days DESC;`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Common attendance metrics worth tracking beyond raw presence:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Attendance percentage</strong> — present days divided by total working days</li>
            <li><strong>Late arrival count</strong> — how many times check-in exceeded the grace period</li>
            <li><strong>Average hours worked</strong> — average of check-out minus check-in per day</li>
            <li><strong>Consecutive absences</strong> — often calculated with window functions to detect streaks</li>
            <li><strong>Half-day count</strong> — rows where status is 'half_day', useful for payroll deductions</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I calculate monthly attendance percentage in SQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Count the number of days each employee has a "present" status in attendance_logs for the month, divide by the total working days in that month, and multiply by 100. This is typically done with SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) divided by COUNT(*), grouped by employee and month.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I find employees who checked in late using SQL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Extract the time portion of the check_in timestamp using TIME() in MySQL or the ::time cast in PostgreSQL, then compare it to your shift start time, for example WHERE TIME(check_in) &gt; '09:15:00'. This flags any row where the employee checked in after the allowed threshold.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Can an AI SQL generator build attendance reports automatically?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Yes. Dev Brains AI free AI SQL Query Builder can turn a request like "show employees with attendance below 75 percent this month" into a working GROUP BY and HAVING query — you just need to confirm it matches your actual employees and attendance_logs table structure.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI SQL Query Builder</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe the attendance report you need in plain English and get a ready-to-run query instantly.
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
              <li><Link href="/blog/sql-group-by-having-clause-explained">SQL GROUP BY and HAVING Clause Explained</Link></li>
              <li><Link href="/blog/sql-date-functions-cheat-sheet">SQL Date Functions Cheat Sheet</Link></li>
              <li><Link href="/blog/sql-query-for-inventory-management-system">SQL Query for Inventory Management System</Link></li>
              <li><Link href="/blog/sql-interview-questions-complete-guide">SQL Interview Questions: The Complete Guide</Link></li>
              <li><Link href="/blog/sql-query-generator-tutorial-for-beginners">SQL Query Generator Tutorial for Beginners</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
