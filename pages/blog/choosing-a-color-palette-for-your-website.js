// pages/blog/choosing-a-color-palette-for-your-website.js
import Head from 'next/head';
import Link from 'next/link';

export default function ChoosingAColorPaletteForYourWebsite() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Choosing a Color Palette for Your Website',
        item: 'https://dev-brains-ai.com/blog/choosing-a-color-palette-for-your-website',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Choosing a Color Palette for Your Website — A Developer-Friendly Method',
    description:
      'A step-by-step method for building a website color palette: start from one brand hue, apply the 60-30-10 rule, build hue-biased neutrals, separate semantic colors, check contrast early, and derive dark-mode variants.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/choosing-a-color-palette-for-your-website',
    datePublished: '2026-07-16',
    dateModified: '2026-07-16',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many colors should a website palette have?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fewer than beginners expect: one brand hue with a few tints and shades, a neutral gray scale, and a small set of semantic colors (success, warning, error, info). Following the 60-30-10 rule, most of the screen is neutral and the accent appears sparingly.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the 60-30-10 rule in web design?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Roughly 60% of the interface uses a dominant neutral (backgrounds), 30% a secondary color (surfaces, section tints), and 10% the accent (buttons, links, highlights). The imbalance is what makes the accent feel important.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should a dark mode palette just invert the light colors?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Inverting breaks contrast and elevation. Dark themes need slightly desaturated, lighter accents, dark gray (not pure black) backgrounds, and surfaces that get lighter as they rise. Derive dark variants by adjusting lightness and saturation per token, then re-check contrast.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Choosing a Color Palette for Your Website | Dev Brains AI</title>
        <meta
          name="description"
          content="Build a website palette step by step: one brand hue, the 60-30-10 rule, hue-biased neutrals, semantic colors, early contrast checks, and dark-mode variants."
        />
        <meta
          name="keywords"
          content="website color palette, choosing colors for website, 60-30-10 rule, brand color, neutral gray palette, semantic colors, dark mode palette, color scheme generator"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/choosing-a-color-palette-for-your-website" />
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
              <li aria-current="page">Choosing a Color Palette</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Choosing a Color Palette for Your Website — A Developer-Friendly Method
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Developers freeze at color choices because they feel like pure taste. They mostly are
            not — a usable palette follows a repeatable procedure: pick one hue, derive everything
            else from it systematically, and let contrast math veto bad options. This post walks
            that procedure end to end and finishes with a complete mini-palette, hex values
            included, that you can adapt for your own project.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 1: Start from One Brand Hue
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Resist choosing "a palette". Choose <strong>one hue</strong> — a single angle on the
            color wheel — and let it anchor everything. If the brand exists, it is chosen for you
            (extract it from the logo). If not, pick by association: blues read trustworthy and
            technical, greens fresh and financial, purples creative, oranges energetic. Then define
            it precisely in HSL, because every other decision will be an adjustment of its numbers:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`brand hue: 210 (a confident blue)
brand color: hsl(210, 85%, 45%)  =  #1173d4

tints and shades = same hue, different lightness:
  50:  hsl(210, 85%, 96%)  #ecf5fe   subtle backgrounds
  100: hsl(210, 85%, 90%)  #d1e7fb   hover tints
  500: hsl(210, 85%, 45%)  #1173d4   THE brand color
  600: hsl(210, 85%, 38%)  #0e61b3   button hover
  700: hsl(210, 85%, 30%)  #0b4d8e   active/pressed`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Keeping hue and saturation fixed while stepping lightness is what makes a scale look
            like one family instead of five random blues. (The HSL mechanics are covered in{' '}
            <Link href="/blog/hex-rgb-hsl-color-formats-explained">HEX vs RGB vs HSL</Link>, and you
            can generate scales in code with the darken/lighten helpers from{' '}
            <Link href="/blog/convert-colors-in-javascript-examples">convert colors in
            JavaScript</Link>.)
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 2: Apply 60-30-10
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The classic interior-design ratio maps directly to interfaces:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>~60% dominant</strong> — page background and large areas: a neutral, almost always</li>
            <li><strong>~30% secondary</strong> — cards, panels, section backgrounds: a slightly different neutral or a whisper-light brand tint</li>
            <li><strong>~10% accent</strong> — the brand color itself: primary buttons, links, active states, key highlights</li>
          </ul>
          <p className="small" style={{ marginBottom: 14 }}>
            The common beginner mistake is inverting the ratio — hero sections, buttons, icons,
            borders all in full-strength brand color. When everything shouts, nothing does. The
            accent earns attention precisely because it is scarce: a page that is 90% calm neutrals
            makes the one blue button unmissable.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 3: Neutrals with a Hue Bias
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Pure grays (equal R, G, B) look lifeless next to a colored accent. The professional
            trick: give your gray scale a small dose of the brand hue — same H, very low S:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`pure gray:        hsl(0, 0%, 96%)    #f5f5f5   (flat)
blue-biased gray: hsl(210, 20%, 96%) #f3f6f9   (harmonised)

full neutral scale at hue 210, sat 15-20%:
  gray-50:  #f6f8fa    page background
  gray-100: #eaeef2    surfaces, dividers
  gray-300: #c3ccd6    borders
  gray-500: #64748b    muted text (4.8:1 on white ✓)
  gray-700: #36455a    secondary text
  gray-900: #10203a    headings, body text`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            The bias is nearly invisible in isolation but makes the whole page feel intentionally
            designed — the neutrals and the accent visibly belong to the same world.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 4: Semantic Colors, Separate from the Accent
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Success, warning, error, and info colors carry meaning and must stay independent of
            your brand accent. If your brand is green and your success state is the same green,
            "saved successfully" and "primary action" become indistinguishable. Conventions are
            strong here — do not fight them:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`success: hsl(150, 70%, 32%)  #199155
warning: hsl(38, 95%, 40%)   #c77f05
error:   hsl(0, 72%, 45%)    #c52020
info:    hsl(210, 85%, 45%)  #1173d4  (may share brand hue)

each gets a pale companion tint for banner backgrounds:
success-bg: #e7f6ee   error-bg: #fdecec   warning-bg: #fdf3e1`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Nudge each toward your palette's temperature (slightly desaturated, lightness matched
            to your accent) so they harmonise without losing their signal. And never rely on color
            alone — pair with icons and text for color-blind users.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 5: Check Contrast Early
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Before a single component is built, verify the pairs you will actually render: body
            text on background, muted text on background, white on accent-500 (button labels),
            accent on background (links). Target 4.5:1 for text and 3:1 for large text and UI
            elements. Our worked palette passes: gray-900 on gray-50 ≈ 15:1, gray-500 on white ≈
            4.8:1, white on #1173d4 ≈ 4.6:1.
          </p>
          <p className="small" style={{ marginBottom: 14 }}>
            Doing this now costs five minutes; discovering after launch that your button color
            fails means retinting components across the app. The full rules and fixing strategies
            are in the{' '}
            <Link href="/blog/color-contrast-accessibility-wcag-guide">WCAG contrast guide</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Step 6: Dark-Mode Variants (Don't Invert)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Naively inverting the palette produces glaring text, muddy accents, and broken
            elevation. Instead, re-derive each token for dark conditions:
          </p>
          <ul className="small" style={{ marginBottom: 14 }}>
            <li><strong>Backgrounds</strong> — dark gray with the same hue bias, never pure black: hsl(210, 25%, 8%) ≈ #0f1620</li>
            <li><strong>Surfaces get lighter as they rise</strong> — cards at #1a2432, modals lighter still (shadows are invisible on dark)</li>
            <li><strong>Accent gets lighter and slightly desaturated</strong> — #1173d4 fails on dark; use hsl(210, 75%, 62%) ≈ #55a0e6 (white-on-accent buttons may keep a deeper fill)</li>
            <li><strong>Text is off-white</strong> — #e4eaf1, with muted text at #94a3b8, both re-checked against the new backgrounds</li>
            <li><strong>Semantic colors brighten similarly</strong> — the same hue, raised lightness</li>
          </ul>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Worked Mini-Palette, Complete
          </h2>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`:root {
  --bg: #f6f8fa;          --surface: #ffffff;
  --border: #c3ccd6;      --text: #10203a;
  --text-muted: #64748b;  --accent: #1173d4;
  --accent-hover: #0e61b3;
  --success: #199155;  --warning: #c77f05;  --error: #c52020;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f1620;          --surface: #1a2432;
    --border: #33415580;    --text: #e4eaf1;
    --text-muted: #94a3b8;  --accent: #55a0e6;
    --accent-hover: #7ab4ec;
    --success: #34c07c;  --warning: #eda23b;  --error: #e05252;
  }
}`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            One hue (210), a biased neutral scale, four semantics, contrast verified, dark mode
            derived — a palette a solo developer can produce in an hour that will not embarrass the
            product later.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How many colors should a website palette have?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Fewer than beginners expect: one brand hue with a few tints and shades, a neutral gray scale, and a small set of semantic colors (success, warning, error, info). Following the 60-30-10 rule, most of the screen is neutral and the accent appears sparingly.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>What is the 60-30-10 rule in web design?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Roughly 60% of the interface uses a dominant neutral (backgrounds), 30% a secondary color (surfaces, section tints), and 10% the accent (buttons, links, highlights). The imbalance is what makes the accent feel important.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Should a dark mode palette just invert the light colors?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              No. Inverting breaks contrast and elevation. Dark themes need slightly desaturated, lighter accents, dark gray (not pure black) backgrounds, and surfaces that get lighter as they rise. Derive dark variants by adjusting lightness and saturation per token, then re-check contrast.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Color Converter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Convert HEX ↔ RGB ↔ HSL instantly while tuning your palette's lightness steps. No
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
              <li><Link href="/blog/color-contrast-accessibility-wcag-guide">Color Contrast and Accessibility — WCAG Guide</Link></li>
              <li><Link href="/blog/convert-colors-in-javascript-examples">Convert Colors in JavaScript — Working Examples</Link></li>
              <li><Link href="/blog/regex-for-hexadecimal-color-code-validation">Regex for Hexadecimal Color Code Validation</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
