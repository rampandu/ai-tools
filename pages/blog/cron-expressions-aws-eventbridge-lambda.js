// pages/blog/cron-expressions-aws-eventbridge-lambda.js
import Head from 'next/head';
import Link from 'next/link';

export default function CronAwsEventBridge() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Cron Expressions for AWS EventBridge and Lambda',
        item: 'https://dev-brains-ai.com/blog/cron-expressions-aws-eventbridge-lambda',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Cron Expressions for AWS EventBridge and Lambda',
    description:
      'Learn how to write cron expressions for AWS EventBridge Scheduler to trigger Lambda functions on a schedule. Includes syntax differences from standard cron, examples, and tips.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/cron-expressions-aws-eventbridge-lambda',
  };

  return (
    <>
      <Head>
        <title>Cron Expressions for AWS EventBridge and Lambda | Dev Brains AI</title>
        <meta
          name="description"
          content="Learn how to schedule AWS Lambda functions with cron expressions in EventBridge. Covers AWS cron syntax differences, rate expressions, practical examples, and common mistakes."
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/cron-expressions-aws-eventbridge-lambda" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <article className="card" style={{ maxWidth: 800, margin: '0 auto', padding: 24, color: '#0f172a' }}>

          <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
            <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 4, listStyle: 'none', padding: 0, margin: 0 }}>
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog">Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Cron for AWS EventBridge</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Cron Expressions for AWS EventBridge and Lambda
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            AWS EventBridge (formerly CloudWatch Events) lets you schedule Lambda functions, Step
            Functions, ECS tasks, and other targets using either a <strong>rate expression</strong>{' '}
            or a <strong>cron expression</strong>. AWS cron syntax is similar to standard Unix
            cron but has some important differences that catch many developers off guard.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>AWS cron syntax — 6 fields</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            AWS EventBridge uses <strong>6 fields</strong>, not 5:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`cron(minute hour day-of-month month day-of-week year)
      ↑     ↑         ↑          ↑        ↑       ↑
      0-59  0-23     1-31       1-12     1-7    1970-2199`}
          </pre>
          <p className="small" style={{ marginTop: 8, marginBottom: 8 }}>
            Key difference from standard cron: AWS uses <strong>1–7 for days</strong> (1=Sunday)
            instead of 0–6 (0=Sunday), and adds a <strong>year field</strong>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>The ? wildcard — day-of-month XOR day-of-week</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            AWS requires that exactly one of day-of-month and day-of-week be <code>*</code> or{' '}
            <code>?</code>. If you specify a day-of-week, day-of-month must be <code>?</code> and
            vice versa.
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`# Every Monday at 9 AM UTC
cron(0 9 ? * 2 *)     # day-of-month = ? because day-of-week is set

# First of every month at midnight UTC
cron(0 0 1 * ? *)     # day-of-week = ? because day-of-month is set

# Every day at 6 PM UTC
cron(0 18 * * ? *)    # use ? for day-of-week when not constrained`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Practical examples</h2>
          <ul className="small" style={{ paddingLeft: 18, marginBottom: 12 }}>
            <li><code>cron(0 12 * * ? *)</code> — every day at noon UTC</li>
            <li><code>cron(0 2 ? * 2 *)</code> — every Monday at 2 AM UTC</li>
            <li><code>cron(*/5 * * * ? *)</code> — every 5 minutes</li>
            <li><code>cron(0 8 1 * ? *)</code> — first of every month at 8 AM UTC</li>
            <li><code>cron(0 9 ? * 2-6 *)</code> — weekdays (Mon–Fri) at 9 AM UTC</li>
            <li><code>cron(0 0 ? 1,4,7,10 1 *)</code> — first Sunday of Jan, Apr, Jul, Oct</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Rate expressions — simpler for intervals</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            For simple interval schedules, AWS rate expressions are easier than cron:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`rate(5 minutes)    # every 5 minutes
rate(1 hour)       # every hour
rate(7 days)       # every 7 days
# Note: singular for value=1 (rate(1 minute) not rate(1 minutes))`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Scheduling in Terraform</h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`resource "aws_cloudwatch_event_rule" "daily_job" {
  name                = "daily-lambda-trigger"
  schedule_expression = "cron(0 9 ? * 2-6 *)"  # weekdays 9 AM UTC
}

resource "aws_cloudwatch_event_target" "lambda_target" {
  rule = aws_cloudwatch_event_rule.daily_job.name
  arn  = aws_lambda_function.my_function.arn
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 20 }}>Timezone handling</h2>
          <p className="small" style={{ marginBottom: 8 }}>
            EventBridge cron always runs in <strong>UTC</strong> unless you use the newer{' '}
            <strong>EventBridge Scheduler</strong> (not CloudWatch Events), which supports specifying
            a timezone directly in the schedule. To run a Lambda at 9 AM IST (UTC+5:30), you would
            set the cron time to <code>3:30 UTC</code> in standard EventBridge rules:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem' }}>
{`# 9:00 AM IST = 3:30 AM UTC
cron(30 3 ? * 2-6 *)`}
          </pre>

          <h3 style={{ marginTop: 20, fontSize: '1.1rem', fontWeight: 600 }}>Generate your cron expression</h3>
          <p className="small" style={{ marginTop: 8 }}>
            Use the{' '}
            <Link href="/cron-generator">Dev Brains AI Cron Generator</Link> to build your
            base cron expression from plain English, then adjust it to AWS format by adding the
            year field and using <code>?</code> where required.
          </p>

        </article>
      </main>
    </>
  );
}
