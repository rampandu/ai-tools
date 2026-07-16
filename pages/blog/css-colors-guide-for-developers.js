// pages/blog/css-colors-guide-for-developers.js
import Head from 'next/head';
import Link from 'next/link';

export default function CssColorsGuideForDevelopers() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'CSS Colors Guide for Developers',
        item: 'https://dev-brains-ai.com/blog/css-colors-guide-for-developers',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'CSS Colors Guide for Developers — Every Way to Write Color, Plus Dark Mode',
    description:
      'Every CSS color syntax (keywords, hex, rgb, hsl, currentColor, transparent), custom properties for palettes, opacity vs alpha, gradients, and a worked dark-mode token setup.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/css-colors-guide-for-developers',
    datePublished: '2026-07-16',
    dateModified: '2026-07-16',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between opacity and alpha in CSS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The opacity property fades an entire element including its text and children, while an alpha channel (rgba, hsla, 8-digit hex) makes only that specific color translucent. For a see-through background with fully readable text, use a color with alpha, not opacity.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does currentColor do in CSS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'currentColor is a keyword that resolves to the element’s computed text color. Borders, SVG icons, and box shadows using currentColor automatically follow the text color, so a single color change updates the whole component consistently.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I support dark mode in CSS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Define semantic custom properties (--bg, --text, --accent) on :root, then redefine them inside a prefers-color-scheme: dark media query. Components reference only the variables, so the entire theme switches without touching component CSS.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>CSS Colors Guide for Developers | Dev Brains AI</title>
        <meta
          name="description"
          content="Every way to write color in CSS — keywords, hex, rgb, hsl, currentColor — plus custom properties for palettes, opacity vs alpha, gradients, and dark mode tokens."
        />
        <meta
          name="keywords"
          content="css colors, css color syntax, css custom properties colors, currentColor, css dark mode, prefers-color-scheme, css gradients, rgba vs opacity"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/css-colors-guide-for-developers" />
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
              <li aria-current="page">CSS Colors Guide</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            CSS Colors Guide for Developers — Every Way to Write Color, Plus Dark Mode
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Color in CSS looks simple until you inherit a stylesheet with keywords in one file, hex
            in another, rgba sprinkled through components, and no system tying them together. This
            guide covers every syntax you will meet, then shows the pattern that tames them all —
            custom properties as a palette — and finishes with a worked dark-mode setup you can
            paste into a project.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Every Way to Write a Color
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`color: rebeccapurple;            /* 1. named keyword (148 exist) */
color: #663399;                  /* 2. hex */
color: #639;                     /* 3. hex shorthand */
color: #66339980;                /* 4. hex with alpha */
color: rgb(102, 51, 153);        /* 5. rgb */
color: rgb(102 51 153 / 0.5);    /* 6. modern rgb + alpha */
color: hsl(270, 50%, 40%);       /* 7. hsl */
color: hsl(270 50% 40% / 0.5);   /* 8. modern hsl + alpha */
color: transparent;              /* 9. fully transparent black */
color: currentColor;             /* 10. the element's text color */`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            Notes on the less obvious ones:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Keywords</strong> — fine for prototypes and tests ("red", "tomato"), rarely for production palettes since you cannot tune them. All 148 map to fixed hex values.</li>
            <li><strong>transparent</strong> — shorthand for rgb(0 0 0 / 0). Handy for gradient endpoints and toggling borders without layout shift (border-color: transparent keeps the border's width).</li>
            <li><strong>currentColor</strong> — resolves to the computed text color. Give an SVG icon fill="currentColor" and it follows the button's text automatically, in every state and theme. The single most underused keyword in CSS.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            If the hex/rgb/hsl trio is still fuzzy, start with{' '}
            <Link href="/blog/hex-rgb-hsl-color-formats-explained">HEX vs RGB vs HSL explained</Link> —
            the rest of this guide assumes the basics.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Custom Properties: Your Palette as Code
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Hard-coding #1e90ff in forty places means forty edits when the brand color changes.
            Define the palette once as custom properties on :root, and give the variables{' '}
            <strong>semantic names</strong> (what the color is for) rather than descriptive ones
            (what it looks like):
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`:root {
  /* raw scale (optional layer) */
  --blue-500: #1e90ff;
  --blue-700: #1565c0;
  --gray-100: #f1f5f9;
  --gray-900: #0f172a;

  /* semantic tokens — components use ONLY these */
  --color-bg: #ffffff;
  --color-surface: var(--gray-100);
  --color-text: var(--gray-900);
  --color-accent: var(--blue-500);
  --color-accent-hover: var(--blue-700);
}

.button {
  background: var(--color-accent);
  color: var(--color-bg);
}
.button:hover { background: var(--color-accent-hover); }`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The two-layer trick (raw scale → semantic tokens) is what makes theming trivial later:
            dark mode only redefines the semantic layer.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Opacity vs Alpha — Not the Same Thing
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A classic bug: "I made the card background translucent and now the text is faded too."
            That is the opacity property doing exactly its job — fading the{' '}
            <strong>entire element</strong>, children included. An alpha channel fades only the one
            color it belongs to:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`/* WRONG for this goal: text fades with the box */
.card { background: #0f172a; opacity: 0.6; }

/* RIGHT: only the background is translucent */
.card { background: rgb(15 23 42 / 0.6); color: white; }`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Use opacity for fading whole elements in and out (transitions, disabled states); use
            alpha colors for translucent surfaces, overlays, and tints. Remember that translucent
            text over varying backgrounds also makes contrast unpredictable — see{' '}
            <Link href="/blog/color-contrast-accessibility-wcag-guide">the WCAG contrast guide</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Gradient Basics
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Gradients are images generated from colors, used anywhere an image works (usually
            background):
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`/* linear: direction, then color stops */
background: linear-gradient(135deg, #1e90ff, #9333ea);

/* control stop positions */
background: linear-gradient(to right, #1e90ff 0%, #9333ea 80%);

/* radial: from center outward */
background: radial-gradient(circle at top left, #1e90ff33, transparent);

/* hard stop = stripes, no blend */
background: linear-gradient(90deg, #1e90ff 50%, #9333ea 50%);`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Two practical tips: fading to <code>transparent</code> can show gray fringing in some
            browsers — fade to the same color with alpha 0 instead (e.g. #1e90ff00); and gradients
            between highly saturated complementary hues pass through muddy gray in sRGB, so add an
            intermediate stop if the middle looks dirty.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Dark Mode with prefers-color-scheme — Worked Tokens
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Because components only reference semantic tokens, dark mode is a redefinition, not a
            rewrite:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`:root {
  --color-bg: #ffffff;
  --color-surface: #f1f5f9;
  --color-text: #0f172a;
  --color-text-muted: #475569;
  --color-accent: #1565c0;   /* darker blue for light bg */
  --color-border: #e2e8f0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0b1120;       /* near-black, blue-biased */
    --color-surface: #1e293b;  /* raised surfaces are LIGHTER */
    --color-text: #e2e8f0;     /* off-white, not pure #fff */
    --color-text-muted: #94a3b8;
    --color-accent: #60a5fa;   /* lighter blue for dark bg */
    --color-border: #334155;
  }
}

body { background: var(--color-bg); color: var(--color-text); }`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            The choices in that dark block are deliberate, not inverted:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li>Backgrounds are dark gray-blue, not #000 — pure black creates harsh, smearing contrast on OLED screens</li>
            <li>Text is off-white — pure white on dark backgrounds produces glare/halation</li>
            <li>The accent gets <em>lighter</em> in dark mode — the same #1565c0 that passed contrast on white fails on #0b1120</li>
            <li>Elevation flips from shadows to lighter surfaces — surfaces get lighter, not darker, as they rise</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Also set <code>color-scheme: light dark;</code> on :root so form controls and
            scrollbars follow the theme natively. For a user-facing toggle, add a class or data
            attribute that overrides the same tokens.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between opacity and alpha in CSS?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The opacity property fades an entire element including its text and children, while an alpha channel (rgba, hsla, 8-digit hex) makes only that specific color translucent. For a see-through background with fully readable text, use a color with alpha, not opacity.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What does currentColor do in CSS?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              currentColor is a keyword that resolves to the element's computed text color. Borders, SVG icons, and box shadows using currentColor automatically follow the text color, so a single color change updates the whole component consistently.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I support dark mode in CSS?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Define semantic custom properties (--bg, --text, --accent) on :root, then redefine them inside a prefers-color-scheme: dark media query. Components reference only the variables, so the entire theme switches without touching component CSS.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Color Converter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Convert HEX ↔ RGB ↔ HSL instantly while building your palette. No signup, no cost.
            </p>
            <Link href="/color-converter">
              <button style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
                Open Color Converter →
              </button>
            </Link>
          </div>

          <div style={{ marginTop: 28 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Related articles</h3>
            <ul className="small">
              <li><Link href="/blog/hex-rgb-hsl-color-formats-explained">HEX vs RGB vs HSL — Color Formats Explained</Link></li>
              <li><Link href="/blog/choosing-a-color-palette-for-your-website">Choosing a Color Palette for Your Website</Link></li>
              <li><Link href="/blog/color-contrast-accessibility-wcag-guide">Color Contrast and Accessibility — WCAG Guide</Link></li>
              <li><Link href="/blog/convert-colors-in-javascript-examples">Convert Colors in JavaScript — Working Examples</Link></li>
              <li><Link href="/blog/encode-images-base64-data-uri-html-css">Encode Images as Base64 Data URIs in HTML and CSS</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
