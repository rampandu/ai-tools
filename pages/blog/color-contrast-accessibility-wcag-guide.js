// pages/blog/color-contrast-accessibility-wcag-guide.js
import Head from 'next/head';
import Link from 'next/link';

export default function ColorContrastAccessibilityWcagGuide() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Color Contrast and Accessibility — A WCAG Guide',
        item: 'https://dev-brains-ai.com/blog/color-contrast-accessibility-wcag-guide',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'WCAG Color Contrast Ratios Explained: 4.5:1 vs 3:1',
    description:
      'WCAG contrast ratios explained — 4.5:1 for text, 3:1 for large text and UI — how the math works, common failures like gray placeholders, and easy fixes.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/color-contrast-accessibility-wcag-guide',
    datePublished: '2026-07-16',
    dateModified: '2026-07-22',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What contrast ratio does WCAG require?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'WCAG AA requires 4.5:1 for normal text, and 3:1 for large text (18pt/24px regular, or 14pt/18.66px bold) and for UI components like input borders and icons. The stricter AAA level asks for 7:1 on normal text.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is the contrast ratio calculated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each color is converted to relative luminance — a weighted, gamma-corrected measure of how bright it appears, where green counts most and blue least. The ratio is (L1 + 0.05) / (L2 + 0.05) with L1 the lighter color, giving values from 1:1 (identical) to 21:1 (black on white).',
        },
      },
      {
        '@type': 'Question',
        name: 'Does color contrast only matter for blind or low-vision users?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Good contrast helps everyone reading a phone in sunlight, on a low-quality or dimmed screen, or with ageing eyes. It is one of the few accessibility fixes with a measurable payoff for every single user.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>WCAG Color Contrast Ratios Explained: 4.5:1 vs 3:1 | Dev Brains AI</title>
        <meta
          name="description"
          content="WCAG contrast ratios explained — 4.5:1 for text, 3:1 for large text and UI — how the math works, common failures like gray placeholders, and easy fixes."
        />
        <meta
          name="keywords"
          content="wcag contrast ratio, 4.5:1 vs 3:1 contrast, relative luminance formula, accessible color contrast, contrast checker tool, aa vs aaa wcag, fix contrast without redesign"
        />
        <meta property="og:title" content="WCAG Color Contrast Ratios Explained: 4.5:1 vs 3:1" />
        <meta property="og:description" content="WCAG contrast ratios explained — 4.5:1 for text, 3:1 for large text and UI — how the math works, common failures like gray placeholders, and easy fixes." />
        <meta property="og:url" content="https://dev-brains-ai.com/blog/color-contrast-accessibility-wcag-guide" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/color-contrast-accessibility-wcag-guide" />
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
              <li aria-current="page">Color Contrast &amp; WCAG</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Color Contrast and Accessibility — A Practical WCAG Guide for Developers
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Light gray text on white looks elegant in a design mockup and unreadable on a phone in
            Hyderabad afternoon sun. Contrast is the most commonly failed accessibility criterion
            on the web — and also the most mechanical to get right, because it reduces to a number
            you can compute and check in seconds. This guide covers the WCAG thresholds, how the
            ratio is actually calculated, the failures that appear in almost every codebase, and
            how to fix them without touching your brand.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The WCAG Ratios: 4.5:1 and 3:1
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            WCAG expresses contrast as a ratio from 1:1 (identical colors) to 21:1 (black on
            white). The AA level — the standard legal and practical target — requires:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>4.5:1 for normal text</strong> — body copy, labels, links</li>
            <li><strong>3:1 for large text</strong> — 24px+ regular weight, or 18.66px+ bold</li>
            <li><strong>3:1 for UI components and graphics</strong> — input borders, focus rings, icons, chart elements (WCAG 1.4.11)</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            AAA raises text to 7:1 / 4.5:1 — worth it for long-form reading, rarely mandated.
            Some calibration points:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`#000000 on #ffffff  →  21.0:1   maximum
#0f172a on #ffffff  →  17.9:1   near-black, plenty
#475569 on #ffffff  →   7.5:1   passes AAA
#64748b on #ffffff  →   4.8:1   passes AA
#94a3b8 on #ffffff  →   2.4:1   FAILS — yet extremely common
#ffffff on #1e90ff  →   3.0:1   passes only for large text/UI`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            How the Ratio Is Computed (Briefly)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Each color is first converted to <strong>relative luminance</strong> — a measure of
            perceived brightness on a 0 (black) to 1 (white) scale. Two details make it
            non-obvious:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Gamma correction</strong> — sRGB values are not linear light; each channel is linearised first, so 50% gray is not 0.5 luminance</li>
            <li><strong>Channel weighting</strong> — luminance = 0.2126·R + 0.7152·G + 0.0722·B. The eye is most sensitive to green and barely sensitive to blue, which is why pure blue (#0000ff) is dark (luminance ≈ 0.07) while pure yellow (#ffff00) is bright (≈ 0.93)</li>
          </ul>
          <p className="small" style={{ marginBottom: 12 }}>
            The ratio is then:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`contrast = (L_lighter + 0.05) / (L_darker + 0.05)

white (L=1.0) vs black (L=0.0):
  (1.0 + 0.05) / (0.0 + 0.05) = 21`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The channel weighting explains a trap: hue changes alone barely move contrast if
            luminance stays similar. Red text (#ff0000) on a green background (#00a000) looks
            "high contrast" to many viewers but computes near 1.3:1 — and is invisible to users
            with red-green color blindness (roughly 8% of men). Contrast is about light and dark,
            not hue.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Common Failures in Real Codebases
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Gray placeholder text</strong> — default #999-ish placeholders sit near 2.8:1. Style ::placeholder to at least #767676 on white — and never use placeholders as the only label.</li>
            <li><strong>Colored buttons with white text</strong> — brand oranges, greens, and light blues frequently land at 2-3:1 with white labels. Test the label against the button fill, not the page.</li>
            <li><strong>Muted secondary text</strong> — timestamps, captions, helper text at #94a3b8 (2.4:1). "De-emphasised" must still clear 4.5:1; use a darker gray and lighter font-weight instead.</li>
            <li><strong>Disabled-looking active elements</strong> — genuinely disabled controls are exempt, but muted styling on enabled controls is a failure.</li>
            <li><strong>Text over images and gradients</strong> — the ratio must hold at the worst point. Add a scrim overlay or text shadow.</li>
            <li><strong>Focus rings and input borders below 3:1</strong> — a #e2e8f0 border on white (1.2:1) makes inputs invisible; the 3:1 UI rule applies.</li>
            <li><strong>Dark mode drift</strong> — an accent tuned for white backgrounds usually fails on dark surfaces; dark themes need their own tested values.</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            How to Check
          </h2>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Browser DevTools</strong> — Chrome and Edge show the ratio with AA/AAA badges directly in the color picker for any text element, and can flag issues page-wide</li>
            <li><strong>WebAIM Contrast Checker</strong> — paste two hex values, get an instant verdict; the reference tool</li>
            <li><strong>Lighthouse / axe DevTools</strong> — automated page audits that list every failing pair; good in CI</li>
            <li><strong>Color-blindness simulators</strong> — DevTools' "Emulate vision deficiencies" catches hue-only signalling that ratios alone miss</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            Grab exact color values from computed styles or a{' '}
            <Link href="/color-converter">color converter</Link> when translating between hex, rgb,
            and hsl for a checker.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Fixing Contrast Without a Redesign
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Failing contrast almost never means abandoning the brand — it means nudging lightness
            while keeping hue and saturation, which preserves the color's identity:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`brand blue:  hsl(210 100% 66%)  → 2.5:1 on white  ✗
darkened:    hsl(210 90% 40%)   → 5.9:1 on white  ✓
             same hue — still reads as the brand color

Other moves:
- swap the pair: dark-on-light instead of light-on-mid
- bump size/weight: 24px regular only needs 3:1
- keep the light tint as a BACKGROUND with dark text on it`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            A practical workflow: fix the semantic tokens (--color-text-muted, --color-accent) in
            one place rather than hunting individual rules — the token pattern from our{' '}
            <Link href="/blog/css-colors-guide-for-developers">CSS colors guide</Link> pays off
            here. And check contrast <strong>early</strong>, when the palette is being chosen; a
            failing brand color discovered after fifty components ship is a much worse day.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            It Helps Everyone
          </h2>
          <p className="small" style={{ marginBottom: 14 }}>
            Contrast requirements exist for users with low vision, but the beneficiaries include
            anyone on a cheap panel at minimum brightness, outdoors under sun, on a cracked screen,
            in battery-saver dim mode, or simply over 40 as contrast sensitivity declines. Unlike
            most accessibility work, contrast has zero performance cost, zero layout impact, and a
            measurable benefit for 100% of your users. There are few easier wins in front-end
            development.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>What contrast ratio does WCAG require?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              WCAG AA requires 4.5:1 for normal text, and 3:1 for large text (18pt/24px regular, or 14pt/18.66px bold) and for UI components like input borders and icons. The stricter AAA level asks for 7:1 on normal text.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How is the contrast ratio calculated?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Each color is converted to relative luminance — a weighted, gamma-corrected measure of how bright it appears, where green counts most and blue least. The ratio is (L1 + 0.05) / (L2 + 0.05) with L1 the lighter color, giving values from 1:1 (identical) to 21:1 (black on white).
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Does color contrast only matter for blind or low-vision users?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Good contrast helps everyone reading a phone in sunlight, on a low-quality or dimmed screen, or with ageing eyes. It is one of the few accessibility fixes with a measurable payoff for every single user.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Color Converter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Convert HEX ↔ RGB ↔ HSL instantly when preparing colors for contrast checks. No
              signup, no cost.
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
              <li><Link href="/blog/css-colors-guide-for-developers">CSS Colors Guide for Developers</Link></li>
              <li><Link href="/blog/choosing-a-color-palette-for-your-website">Choosing a Color Palette for Your Website</Link></li>
              <li><Link href="/blog/convert-colors-in-javascript-examples">Convert Colors in JavaScript — Working Examples</Link></li>
              <li><Link href="/blog/regex-for-hexadecimal-color-code-validation">Regex for Hexadecimal Color Code Validation</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
