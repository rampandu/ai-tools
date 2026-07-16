// pages/color-converter.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { parseColor, rgbToHex, rgbToHsl } from '../lib/colorConvert';

const EXAMPLES = [
  { label: '#0ea5a6', value: '#0ea5a6' },
  { label: 'rgb(34, 197, 94)', value: 'rgb(34, 197, 94)' },
  { label: 'hsl(220, 90%, 56%)', value: 'hsl(220, 90%, 56%)' },
];

const FAQ = [
  {
    q: 'Is this Color Converter free?',
    a: 'Yes — the Color Converter on Dev Brains AI is completely free to use, with no signup required.',
  },
  {
    q: 'Is my input sent to a server?',
    a: 'No. Parsing and conversion happen entirely in your browser with plain JavaScript. Nothing you type is uploaded, logged, or stored on our servers.',
  },
  {
    q: 'Which color formats can I paste?',
    a: 'HEX in 3, 4, 6, or 8-digit form (with or without the leading #), rgb() and rgba() with numeric channels, and hsl() / hsla(). The tool converts whatever you paste into all three formats at once.',
  },
  {
    q: 'Does it support alpha (transparency)?',
    a: 'Yes. Paste an 8-digit hex like #ff000080, an rgba() value, or an hsla() value and the alpha channel is preserved in the hex and rgba/hsla outputs. Note that the native color picker only handles opaque colors, so it shows the color without its alpha.',
  },
  {
    q: 'Why do HSL values sometimes round-trip slightly differently?',
    a: 'HSL components are rounded to whole numbers for readability, and RGB channels are 0-255 integers, so converting back and forth can shift a channel by a point or two. The difference is imperceptible on screen, but for pixel-exact work treat one format as your source of truth.',
  },
];

export default function ColorConverterPage() {
  const [text, setText] = useState('#0ea5a6');
  const [copiedKey, setCopiedKey] = useState(null);

  const parsed = parseColor(text);
  const hasInput = text.trim().length > 0;

  let hex = '';
  let rgbStr = '';
  let hslStr = '';
  let pickerHex = '#000000';
  if (parsed) {
    hex = rgbToHex(parsed);
    const { r, g, b, a } = parsed;
    rgbStr =
      a < 1
        ? `rgba(${r}, ${g}, ${b}, ${a})`
        : `rgb(${r}, ${g}, ${b})`;
    const { h, s, l } = rgbToHsl(parsed);
    hslStr = a < 1 ? `hsla(${h}, ${s}%, ${l}%, ${a})` : `hsl(${h}, ${s}%, ${l}%)`;
    // <input type="color"> only accepts #rrggbb — strip any alpha digits.
    pickerHex = rgbToHex({ r, g, b, a: 1 }).slice(0, 7);
  }

  async function handleCopy(key, value) {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch (e) {
      // Clipboard API unavailable; nothing else to do client-side.
    }
  }

  const outputs = [
    { key: 'hex', label: 'HEX', value: hex },
    { key: 'rgb', label: 'RGB', value: rgbStr },
    { key: 'hsl', label: 'HSL', value: hslStr },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Dev Brains AI Color Converter',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web',
    description:
      'Free color converter that runs entirely in your browser. Paste any HEX, RGB, or HSL value to see it in all three formats with a live swatch and a synced native color picker.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Color Converter', item: 'https://dev-brains-ai.com/color-converter' },
    ],
  };

  return (
    <div className="container" style={{ paddingTop: 16 }}>
      <Head>
        <title>Free Color Converter — HEX ↔ RGB ↔ HSL Online | Dev Brains AI</title>
        <meta
          name="description"
          content="Convert colors between HEX, RGB, and HSL instantly in your browser. Paste any CSS color, see a live swatch, copy each format, and fine-tune with a native color picker. 100% client-side."
        />
        <meta
          name="keywords"
          content="color converter, hex to rgb, rgb to hex, hsl to hex, hex to hsl, css color converter, color picker online, Dev Brains AI"
        />
        <meta property="og:title" content="Free Color Converter — HEX ↔ RGB ↔ HSL Online" />
        <meta
          property="og:description"
          content="Paste any HEX, RGB, or HSL color and get all three formats with a live swatch and synced color picker. Runs 100% in your browser."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/color-converter" />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://dev-brains-ai.com/color-converter" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <div className="card" aria-live="polite">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
          <ol
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Color Converter</li>
          </ol>
        </nav>

        <h1>Free Color Converter (HEX ↔ RGB ↔ HSL)</h1>
        <p className="small">
          Paste any CSS color — <code>#0ea5a6</code>, <code>rgb(34, 197, 94)</code>,{' '}
          <code>hsl(220, 90%, 56%)</code>, with or without alpha — and see it converted to all
          three formats instantly, with a live swatch and a synced native color picker. Everything
          runs in your browser; nothing is uploaded.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 260px' }}>
            <label htmlFor="color-input">
              <strong>Color value</strong>
            </label>
            <input
              id="color-input"
              type="text"
              aria-label="Color value to convert"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ width: '100%', fontFamily: 'monospace', padding: '8px 10px', marginTop: 6 }}
              placeholder="#0ea5a6 or rgb(14, 165, 166) or hsl(180, 84%, 35%)"
            />
          </div>
          <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            Picker:
            <input
              type="color"
              aria-label="Native color picker"
              value={pickerHex}
              onChange={(e) => setText(e.target.value)}
              style={{ width: 48, height: 36, padding: 2, cursor: 'pointer' }}
            />
          </label>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Examples</strong>
          <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                type="button"
                className="small"
                onClick={() => setText(ex.value)}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>

        {hasInput && !parsed && (
          <div role="alert" style={{ color: 'crimson', marginTop: 12 }}>
            <strong>Error:</strong> Could not parse that as a color. Try formats like{' '}
            <code>#1e90ff</code>, <code>rgb(30, 144, 255)</code>, or <code>hsl(210, 100%, 56%)</code>.
          </div>
        )}

        {parsed && (
          <div style={{ marginTop: 14 }}>
            <div
              aria-label="Color swatch"
              style={{
                background: rgbStr,
                border: '1px solid #e6eef2',
                borderRadius: 8,
                height: 80,
                width: '100%',
              }}
            />
            <div style={{ marginTop: 12 }}>
              {outputs.map((out) => (
                <div
                  key={out.key}
                  style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}
                >
                  <span className="small" style={{ width: 42 }}>
                    <strong>{out.label}</strong>
                  </span>
                  <input
                    type="text"
                    readOnly
                    aria-label={`${out.label} value`}
                    value={out.value}
                    style={{ flex: 1, fontFamily: 'monospace', padding: '6px 10px', minWidth: 0 }}
                    onFocus={(e) => e.target.select()}
                  />
                  <button
                    type="button"
                    className="small"
                    onClick={() => handleCopy(out.key, out.value)}
                  >
                    {copiedKey === out.key ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div className="card">
        <h2>About this Color Converter</h2>
        <p>
          CSS understands the same color written three common ways: hexadecimal (
          <code>#0ea5a6</code>), RGB function notation (<code>rgb(14, 165, 166)</code>), and HSL
          function notation (<code>hsl(180, 84%, 35%)</code>). Design tools export one format, your
          design system standardizes on another, and the CSS you inherited uses a third. This free
          Color Converter accepts any of them — including shorthand hex, alpha variants like{' '}
          <code>#0ea5a680</code> and <code>rgba()</code>/<code>hsla()</code> — and shows the same
          color in all three formats side by side, with a live swatch so you can confirm it looks
          right.
        </p>
        <p>
          Conversion is pure math done locally in your browser: no API call, no upload, no storage.
          You can also drag the native color picker to explore — it writes the chosen hex back into
          the input, and all three outputs update live.
        </p>

        <h3>How the three formats relate</h3>
        <ul>
          <li>
            <strong>HEX</strong> is RGB in base 16: two hex digits per channel, red-green-blue, so{' '}
            <code>#0ea5a6</code> means red 14, green 165, blue 166. An optional fourth pair encodes
            alpha. Compact and ubiquitous, but hard to reason about mentally.
          </li>
          <li>
            <strong>RGB</strong> spells out the same three channels as decimal numbers 0-255. It is
            the format closest to how screens actually mix light, and the easiest to manipulate in
            code.
          </li>
          <li>
            <strong>HSL</strong> re-expresses the color as hue (0-360 degrees around the color
            wheel), saturation (0-100%), and lightness (0-100%). It is the most human-friendly
            format: want a darker shade of the same color? Lower the lightness. A muted version?
            Lower the saturation. Related accent colors? Rotate the hue.
          </li>
        </ul>
        <p>
          All three describe the same sRGB color, so conversion is lossless apart from rounding
          HSL components to whole numbers for readability.
        </p>

        <h3>When to use which format</h3>
        <ul>
          <li>
            <strong>Use hex for tokens and handoff</strong> — it is the shortest form, universally
            supported, and what most design tools copy by default.
          </li>
          <li>
            <strong>Use rgb()/rgba() when alpha matters in older codebases</strong> —{' '}
            <code>rgba(14, 165, 166, 0.5)</code> reads more clearly than 8-digit hex to many
            reviewers.
          </li>
          <li>
            <strong>Use HSL when designing palettes</strong> — systematic shade scales (hover
            states, disabled states, dark-mode variants) are trivial to derive by adjusting
            lightness while holding hue and saturation constant.
          </li>
        </ul>

        <h3>Alpha channels, briefly</h3>
        <p>
          Alpha is opacity from 0 (transparent) to 1 (opaque). In hex it rides along as a fourth
          pair of digits, where <code>80</code> is about 50%. This converter preserves alpha
          through every format: paste <code>rgba(34, 197, 94, 0.5)</code> and the hex output gains
          an alpha pair while the HSL output becomes <code>hsla()</code>. The one limitation is the
          native picker, which browsers restrict to opaque 6-digit colors.
        </p>

        <h3>Practical tips</h3>
        <ul>
          <li>
            Shorthand hex expands each digit: <code>#0af</code> is <code>#00aaff</code>, not{' '}
            <code>#0a0f00</code>.
          </li>
          <li>
            Grays are any color with 0% saturation in HSL — the hue value is irrelevant for them.
          </li>
          <li>
            When two colors will sit as text on background, check their contrast ratio — a
            pleasant palette can still fail WCAG AA. Our{' '}
            <Link href="/blog/color-contrast-accessibility-wcag-guide">
              color contrast accessibility guide
            </Link>{' '}
            covers the thresholds.
          </li>
          <li>
            Validating user-supplied colors in code? See our{' '}
            <Link href="/blog/regex-for-hexadecimal-color-code-validation">
              regex for hex color validation
            </Link>{' '}
            before rolling your own.
          </li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="card">
        <h3>FAQ: Color Converter</h3>
        {FAQ.map((item, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <strong>{item.q}</strong>
            <div className="small" style={{ marginTop: 6 }}>
              {item.a}
            </div>
          </div>
        ))}
      </div>

      {/* Cross-links */}
      <div className="card small">
        <h4>More developer tools from Dev Brains AI</h4>
        <p className="small">
          Building validation patterns? Try the <Link href="/regex-generator">Regex Generator</Link>.
          To go deeper on color, read{' '}
          <Link href="/blog/hex-rgb-hsl-color-formats-explained">
            HEX, RGB &amp; HSL Color Formats Explained
          </Link>
          ,{' '}
          <Link href="/blog/color-contrast-accessibility-wcag-guide">
            Color Contrast &amp; Accessibility: WCAG Guide
          </Link>
          , and{' '}
          <Link href="/blog/regex-for-hexadecimal-color-code-validation">
            Regex for Hexadecimal Color Code Validation
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
