// pages/blog/regex-for-extracting-hashtags-and-mentions.js
import Head from 'next/head';
import Link from 'next/link';

export default function RegexForExtractingHashtagsAndMentions() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Regex for Extracting Hashtags and Mentions',
        item: 'https://dev-brains-ai.com/blog/regex-for-extracting-hashtags-and-mentions',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Regex for Extracting Hashtags and Mentions from Text',
    description:
      'How to extract #hashtags and @mentions from social media posts and comments using JavaScript regex with match and matchAll, including Unicode-friendly patterns.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/regex-for-extracting-hashtags-and-mentions',
    datePublished: '2026-07-11',
    dateModified: '2026-07-11',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the regex to extract hashtags from text?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The pattern /#[\\w]+/g matches hashtags made of word characters. For Unicode hashtags that include accented letters or non-Latin scripts, use /#[\\p{L}\\p{N}_]+/gu with the unicode flag.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the regex to extract @mentions from text?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The pattern /@[\\w.]+/g matches @ followed by letters, digits, underscores, or dots, which covers most platforms’ mention/username formats.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between String.match and String.matchAll in JavaScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'With the global flag, match() returns a simple array of matched strings only. matchAll() returns an iterator of full match objects, including capture groups and index positions, which is useful when you need more detail than just the matched text.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Regex for Extracting Hashtags and Mentions (JS Examples) | Dev Brains AI</title>
        <meta
          name="description"
          content="How to extract #hashtags and @mentions from text using JavaScript regex with match and matchAll, including Unicode-friendly patterns."
        />
        <meta
          name="keywords"
          content="regex extract hashtags, regex extract mentions, javascript hashtag regex, matchall regex example, extract @mentions javascript"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/regex-for-extracting-hashtags-and-mentions" />
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
              <li aria-current="page">Regex for Hashtags and Mentions</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Regex for Extracting Hashtags and Mentions from Text
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Building a comment section, social feed, or content moderation tool almost always
            requires pulling out <code>#hashtags</code> and <code>@mentions</code> from free text.
            This guide covers the regex patterns, JavaScript's <code>match</code> and{' '}
            <code>matchAll</code> methods, and the Unicode edge cases that trip up naive patterns.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Basic Hashtag Extraction
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const text = 'Loving the new #NextJS release! Also check out #WebDev and #AI tools.';
const hashtags = text.match(/#[\\w]+/g);
console.log(hashtags);
// ['#NextJS', '#WebDev', '#AI']`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Basic Mention Extraction
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const comment = 'Great point @rahul_dev! Loop in @priya.codes too.';
const mentions = comment.match(/@[\\w.]+/g);
console.log(mentions);
// ['@rahul_dev', '@priya.codes']`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Note the mention pattern includes a dot in the character class since many platforms allow
            dots in usernames (Instagram-style). Adjust the allowed characters to match your own
            username rules.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Using matchAll for More Detail
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>match()</code> with the global flag only returns matched strings. If you need the
            position of each match (for highlighting in a UI, for example), use{' '}
            <code>matchAll()</code>, which returns an iterator of full match objects:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const text = 'Shoutout to @devbrains for the #regex tips!';
const matches = [...text.matchAll(/([@#])(\\w+)/g)];

matches.forEach((m) => {
  console.log({
    full: m[0],        // '@devbrains' or '#regex'
    type: m[1],         // '@' or '#'
    value: m[2],         // 'devbrains' or 'regex'
    index: m.index,      // character position in the string
  });
});`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Unicode-Friendly Hashtags
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            <code>\w</code> only covers ASCII letters, digits, and underscore. If your users post in
            Hindi, Tamil, or other non-Latin scripts, hashtags like <code>#नमस्ते</code> will not
            match. Use Unicode property escapes with the <code>u</code> flag instead:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const unicodeHashtag = /#[\\p{L}\\p{N}_]+/gu;

const text = 'खुश रहो #नमस्ते और #India साथ मिलकर!';
console.log(text.match(unicodeHashtag));
// ['#नमस्ते', '#India']`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            <code>\p{'{L}'}</code> matches any Unicode letter and <code>\p{'{N}'}</code> matches any
            Unicode number — together with the <code>u</code> flag, this makes your pattern work
            across scripts instead of only ASCII.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Pitfalls
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Forgetting the global flag (<code>g</code>) — without it, <code>match()</code> only returns the first hit</li>
            <li>Matching email addresses accidentally — <code>user@example.com</code> contains an <code>@</code> that a loose mention regex may partially match; add a word-boundary or space-based lookbehind if this matters for your data</li>
            <li>Not deduplicating — the same hashtag can appear multiple times in one post; use a <code>Set</code> if you need unique tags</li>
            <li>Case sensitivity — <code>#NextJS</code> and <code>#nextjs</code> are the same tag conceptually; normalize with <code>.toLowerCase()</code> before storing or counting</li>
          </ul>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function extractUniqueHashtags(text) {
  const matches = text.match(/#[\\w]+/g) || [];
  return [...new Set(matches.map((tag) => tag.toLowerCase()))];
}`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the regex to extract hashtags from text?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The pattern <code>{'/#[\\w]+/g'}</code> matches hashtags made of word characters. For
              Unicode hashtags that include accented letters or non-Latin scripts, use{' '}
              <code>{'/#[\\p{L}\\p{N}_]+/gu'}</code> with the unicode flag.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the regex to extract @mentions from text?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The pattern <code>{'/@[\\w.]+/g'}</code> matches @ followed by letters, digits,
              underscores, or dots, which covers most platforms' mention/username formats.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between String.match and String.matchAll in JavaScript?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              With the global flag, <code>match()</code> returns a simple array of matched strings
              only. <code>matchAll()</code> returns an iterator of full match objects, including
              capture groups and index positions, which is useful when you need more detail than
              just the matched text.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free AI Regex Generator</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Describe any validation rule in plain English and get a working regex instantly —
              no signup required.
            </p>
            <Link href="/regex-generator">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open AI Regex Generator →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/regex-for-html-tag-stripping">Regex for HTML Tag Stripping</Link></li>
              <li><Link href="/blog/regex-for-extracting-numbers-from-string">Regex for Extracting Numbers from String</Link></li>
              <li><Link href="/blog/regex-non-greedy-vs-greedy-matching">Regex Non-Greedy vs Greedy Matching</Link></li>
              <li><Link href="/blog/regex-top-patterns">Top 10 Regex Patterns Every Developer Should Know</Link></li>
              <li><Link href="/blog/ai-regex-generator-guide">AI Regex Generator Guide</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
