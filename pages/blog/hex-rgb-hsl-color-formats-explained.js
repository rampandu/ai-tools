// pages/blog/hex-rgb-hsl-color-formats-explained.js
import Head from 'next/head';
import Link from 'next/link';

export default function HexRgbHslColorFormatsExplained() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'HEX vs RGB vs HSL — Color Formats Explained',
        item: 'https://dev-brains-ai.com/blog/hex-rgb-hsl-color-formats-explained',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'HEX vs RGB vs HSL — Color Formats Explained for Developers',
    description:
      'Understand hex anatomy (#RRGGBB, shorthand, alpha), rgb()/rgba() notation, and why HSL matches how humans think about color — with one color worked through all three formats.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/hex-rgb-hsl-color-formats-explained',
    datePublished: '2026-07-16',
    dateModified: '2026-07-16',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between HEX, RGB, and HSL?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All three describe the same colors. HEX and RGB encode the red, green, and blue light channels — HEX as base-16 pairs (#1e90ff), RGB as decimal values (rgb(30, 144, 255)). HSL instead describes hue (angle on the color wheel), saturation, and lightness, which matches how humans reason about color.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I use HSL instead of HEX?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use HSL when you need to derive variations: a hover state 10% darker, a pastel version at lower saturation, or a palette of shades from one hue. Adjusting one HSL number makes predictable changes, while editing hex digits does not.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does the 8-digit hex format #RRGGBBAA mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The last two digits are an alpha (opacity) channel from 00 (fully transparent) to FF (fully opaque). For example, #1e90ff80 is the dodger blue color at roughly 50% opacity. All modern browsers support 4- and 8-digit hex with alpha.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>HEX vs RGB vs HSL — Color Formats Explained | Dev Brains AI</title>
        <meta
          name="description"
          content="Hex anatomy (#RRGGBB, shorthand, #RRGGBBAA), rgb()/rgba(), and HSL's human model — one color worked through all three formats, plus when to use which."
        />
        <meta
          name="keywords"
          content="hex vs rgb vs hsl, color formats explained, hex color code, rgb to hsl, hsl explained, css color formats, hex alpha, color converter"
        />
        <meta property="og:title" content="HEX vs RGB vs HSL — Color Formats Explained" />
        <meta
          property="og:description"
          content="Hex anatomy (#RRGGBB, shorthand, #RRGGBBAA), rgb()/rgba(), and HSL's human model — one color worked through all three formats, plus when to use which."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/hex-rgb-hsl-color-formats-explained" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/hex-rgb-hsl-color-formats-explained" />
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
              <li aria-current="page">HEX vs RGB vs HSL</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            HEX vs RGB vs HSL — Color Formats Explained for Developers
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            #1e90ff, rgb(30, 144, 255), and hsl(210, 100%, 56%) are the exact same color written
            three ways. Each notation exists because it is convenient for a different audience —
            machines, graphics programmers, and humans respectively. Once you understand what each
            number means, converting between them stops being magic and choosing the right one for
            the job becomes obvious.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Hex Anatomy: #RRGGBB
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A hex color is three numbers glued together, one per light channel, each written in
            base-16 (hexadecimal) using digits 0-9 and letters a-f:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`#1e90ff
 ── ── ──
 R  G  B
 1e = 30    red channel   (out of ff = 255)
 90 = 144   green channel
 ff = 255   blue channel  (maxed out → a blue-leaning color)

Extremes:
#000000 = no light        = black
#ffffff = all channels max = white
#ff0000 = pure red`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            Two useful variants:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>3-digit shorthand</strong> — #f0c expands to #ff00cc by doubling each digit. Only works when all three pairs are doubles, so #1e90ff has no shorthand.</li>
            <li><strong>8-digit alpha (#RRGGBBAA)</strong> — a fourth pair adds opacity: 00 is transparent, ff is opaque, 80 is ~50%. #1e90ff80 is our blue at half opacity. Supported in all modern browsers, with a #RGBA short form too.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Hex is compact, universally supported, and what design tools copy to your clipboard —
            which is why it dominates codebases. Its weakness: the numbers are opaque to humans.
            Quick — is #9b59b6 warm or cool? You cannot tune a hex value by eye. If you need to
            validate hex strings in code, see{' '}
            <Link href="/blog/regex-for-hexadecimal-color-code-validation">regex for hex color
            validation</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            rgb() and rgba(): The Same Channels in Decimal
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The rgb() function expresses the identical three channels as decimal numbers from 0 to
            255 — no mental base-16 conversion required:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`rgb(30, 144, 255)          /* same color as #1e90ff */
rgba(30, 144, 255, 0.5)    /* legacy alpha syntax */
rgb(30 144 255 / 0.5)      /* modern space-separated syntax */`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            RGB is the format JavaScript gives you back from getComputedStyle and canvas pixel
            reads, and the natural format when a color is computed at runtime. It shares hex's
            weakness, though: three light intensities still do not tell a human what the color
            looks like or how to adjust it.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            HSL: The Human Model
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            HSL abandons light channels and describes color the way people talk about it:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Hue (0-360)</strong> — the angle on the color wheel: 0 red, 60 yellow, 120 green, 180 cyan, 240 blue, 300 magenta, wrapping back to red at 360.</li>
            <li><strong>Saturation (0-100%)</strong> — color intensity: 100% is vivid, 0% is gray regardless of hue.</li>
            <li><strong>Lightness (0-100%)</strong> — 0% is always black, 100% always white, 50% is the pure color.</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            The payoff is that edits become predictable. Want a darker hover state? Lower L. A
            pastel version? Raise L, lower S. A complementary accent? Add 180 to H:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`base:       hsl(210, 100%, 56%)   /* dodger blue */
hover:      hsl(210, 100%, 46%)   /* same hue, darker */
subtle bg:  hsl(210, 100%, 95%)   /* same hue, near-white */
complement: hsl(30, 100%, 56%)    /* orange, hue + 180 */`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Try doing any of those with hex arithmetic. This is why designers and design systems
            think in HSL even when the final tokens are stored as hex.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            One Color, All Three Ways
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Let us walk dodger blue through every notation to see the equivalences:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`HEX:  #1e90ff
      1e → 30, 90 → 144, ff → 255

RGB:  rgb(30, 144, 255)
      blue is the max channel → hue lands in the blue region

HSL:  hsl(210, 100%, 56%)
      hue 210°  = between cyan (180°) and blue (240°)
      sat 100%  = the max and min channels are far apart (255 vs 30)
      light 56% = (max + min) / 2 / 255 = (255+30)/510 ≈ 0.56

With 50% opacity:
      #1e90ff80 = rgb(30 144 255 / 0.5) = hsl(210 100% 56% / 0.5)`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Same pixel on screen in every case. The conversion algorithms are a dozen lines of
            JavaScript each — we walk through working code in{' '}
            <Link href="/blog/convert-colors-in-javascript-examples">convert colors in
            JavaScript</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Who Prefers Which — and What's Next
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Hex</strong> — design handoffs, stored tokens, quick copy-paste. The lingua franca.</li>
            <li><strong>RGB</strong> — JavaScript interop, canvas work, anything computing channel values.</li>
            <li><strong>HSL</strong> — building palettes, hover/focus variants, theming systems where colors are derived rather than hand-picked.</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            One paragraph on the future: modern CSS has grown beyond sRGB. The oklch() function
            describes colors by perceptual lightness, chroma, and hue — fixing HSL's quirk where
            50% lightness yellow looks far brighter than 50% lightness blue — and the P3 color
            space unlocks more vivid colors on modern displays. The mental model you built here
            transfers directly: oklch is "HSL, but perceptually honest". For day-to-day work, hex,
            rgb(), and hsl() remain everywhere and are what tools and teams expect.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the difference between HEX, RGB, and HSL?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              All three describe the same colors. HEX and RGB encode the red, green, and blue light channels — HEX as base-16 pairs (#1e90ff), RGB as decimal values (rgb(30, 144, 255)). HSL instead describes hue (angle on the color wheel), saturation, and lightness, which matches how humans reason about color.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>When should I use HSL instead of HEX?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Use HSL when you need to derive variations: a hover state 10% darker, a pastel version at lower saturation, or a palette of shades from one hue. Adjusting one HSL number makes predictable changes, while editing hex digits does not.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What does the 8-digit hex format #RRGGBBAA mean?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              The last two digits are an alpha (opacity) channel from 00 (fully transparent) to FF (fully opaque). For example, #1e90ff80 is the dodger blue color at roughly 50% opacity. All modern browsers support 4- and 8-digit hex with alpha.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Color Converter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Convert HEX ↔ RGB ↔ HSL instantly, right in your browser. No signup, no cost.
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
              <li><Link href="/blog/css-colors-guide-for-developers">CSS Colors Guide for Developers</Link></li>
              <li><Link href="/blog/convert-colors-in-javascript-examples">Convert Colors in JavaScript — Working Examples</Link></li>
              <li><Link href="/blog/choosing-a-color-palette-for-your-website">Choosing a Color Palette for Your Website</Link></li>
              <li><Link href="/blog/regex-for-hexadecimal-color-code-validation">Regex for Hexadecimal Color Code Validation</Link></li>
              <li><Link href="/blog/color-contrast-accessibility-wcag-guide">Color Contrast and Accessibility — WCAG Guide</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
