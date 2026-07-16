// pages/blog/convert-colors-in-javascript-examples.js
import Head from 'next/head';
import Link from 'next/link';

export default function ConvertColorsInJavascriptExamples() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev-brains-ai.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://dev-brains-ai.com/blog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Convert Colors in JavaScript — Working Examples',
        item: 'https://dev-brains-ai.com/blog/convert-colors-in-javascript-examples',
      },
    ],
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Convert Colors in JavaScript — HEX, RGB, and HSL with Working Code',
    description:
      'A cookbook of color conversions in JavaScript: hex to RGB with parseInt, RGB to hex with toString(16), full RGB↔HSL functions, getComputedStyle quirks, canvas pixel reads, and a copy-paste utility module.',
    author: { '@type': 'Organization', name: 'Dev Brains AI' },
    publisher: { '@type': 'Organization', name: 'Dev Brains AI' },
    url: 'https://dev-brains-ai.com/blog/convert-colors-in-javascript-examples',
    datePublished: '2026-07-16',
    dateModified: '2026-07-16',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I convert a hex color to RGB in JavaScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Strip the #, split the string into two-character pairs, and parse each with parseInt(pair, 16). For example, "1e" becomes 30. Expand 3-digit shorthand like #f0c by doubling each digit first.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why does getComputedStyle return rgb() instead of my hex value?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Browsers normalise computed colors to rgb() or rgba() regardless of how they were written in CSS. If you need hex for display or storage, parse the rgb() string with a regex and convert the channels using toString(16).',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I read the color of a pixel in JavaScript?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Draw the source (image or drawing) to a canvas, then call ctx.getImageData(x, y, 1, 1).data, which returns [r, g, b, a] for that pixel. Cross-origin images must be CORS-enabled or the canvas becomes tainted and getImageData throws.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Convert Colors in JavaScript — Working Examples | Dev Brains AI</title>
        <meta
          name="description"
          content="Cookbook: hex→RGB with parseInt, RGB→hex with toString(16), full RGB↔HSL functions, getComputedStyle quirks, canvas pixel reads, and a utility module."
        />
        <meta
          name="keywords"
          content="convert hex to rgb javascript, rgb to hex javascript, rgb to hsl javascript, hsl to rgb, getComputedStyle color, canvas getImageData pixel color, javascript color conversion"
        />
        <link rel="canonical" href="https://dev-brains-ai.com/blog/convert-colors-in-javascript-examples" />
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
              <li aria-current="page">Convert Colors in JavaScript</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 12 }}>
            Convert Colors in JavaScript — HEX, RGB, and HSL with Working Code
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            Sooner or later every front-end project needs to move a color between formats: hex from
            a design token to RGB for canvas work, a computed rgb() string back to hex for a color
            picker, RGB to HSL to derive a hover shade. The math is small and worth owning instead
            of importing a library. This is a cookbook — every function below is complete and
            copy-paste ready.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            HEX → RGB: Regex + parseInt(…, 16)
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            A hex color is just three base-16 numbers. Validate with a regex, expand 3-digit
            shorthand, then parse each pair:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function hexToRgb(hex) {
  let h = hex.replace(/^#/, '');
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(h)) return null;
  if (h.length === 3) {
    h = h.split('').map((c) => c + c).join(''); // f0c → ff00cc
  }
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

hexToRgb('#1e90ff'); // { r: 30, g: 144, b: 255 }
hexToRgb('#f0c');    // { r: 255, g: 0, b: 204 }`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            For stricter input validation patterns (including alpha forms), see{' '}
            <Link href="/blog/regex-for-hexadecimal-color-code-validation">regex for hex color
            validation</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            RGB → HEX: toString(16), Padded
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            The reverse uses Number.prototype.toString with radix 16. The one classic bug: values
            below 16 produce a single digit ("a" instead of "0a"), so pad to two characters:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function rgbToHex(r, g, b) {
  const toHex = (n) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, '0');
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

rgbToHex(30, 144, 255); // "#1e90ff"
rgbToHex(0, 10, 5);     // "#000a05"  ← padding matters!`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            RGB ↔ HSL: The Full Functions
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            RGB→HSL: lightness is the average of the max and min channels; saturation is how far
            apart they are; hue depends on which channel dominates:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  switch (max) {
    case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
    case g: h = (b - r) / d + 2; break;
    default: h = (r - g) / d + 4;
  }
  return {
    h: Math.round(h * 60),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

rgbToHsl(30, 144, 255); // { h: 210, s: 100, l: 56 }`}
          </pre>
          <p className="small" style={{ marginBottom: 12 }}>
            HSL→RGB works through a helper that maps each channel from the hue:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360; // normalise
  s /= 100; l /= 100;
  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v }; // achromatic gray
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return {
    r: Math.round(hue2rgb(h / 360 + 1 / 3) * 255),
    g: Math.round(hue2rgb(h / 360) * 255),
    b: Math.round(hue2rgb(h / 360 - 1 / 3) * 255),
  };
}

hslToRgb(210, 100, 56); // { r: 31, g: 143, b: 255 } (≈ #1e90ff)`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Note the ±1 wobble on round-trips (30 became 31) — rounding to integer HSL loses a
            little precision. Harmless for UI work; keep floats if you need exactness.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Gotcha: getComputedStyle Returns rgb()
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            However you wrote the color in CSS — hex, hsl(), a keyword — the browser hands back a
            normalised rgb()/rgba() string. Parse it before converting:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`const el = document.querySelector('.button');
getComputedStyle(el).backgroundColor;
// "rgb(30, 144, 255)" — even if CSS said #1e90ff or hsl(...)

function parseRgbString(str) {
  const m = str.match(/rgba?\\(\\s*(\\d+)[,\\s]+(\\d+)[,\\s]+(\\d+)/);
  return m ? { r: +m[1], g: +m[2], b: +m[3] } : null;
}

rgbToHex(...Object.values(parseRgbString('rgb(30, 144, 255)')));
// "#1e90ff"`}
          </pre>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Reading Pixels from a Canvas
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            To sample a color from an image (an eyedropper feature, dominant-color extraction),
            draw it to a canvas and read the pixel data:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`function getPixelColor(img, x, y) {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
  return { r, g, b, a: a / 255 };
}`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            Two caveats: cross-origin images taint the canvas and make getImageData throw (the
            image must be same-origin or served with CORS headers and loaded with
            img.crossOrigin = "anonymous"); and on high-DPI displays remember that canvas
            coordinates are in canvas pixels, not CSS pixels.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            The Copy-Paste Utility Module
          </h2>
          <p className="small" style={{ marginBottom: 12 }}>
            Everything above, assembled into one module with the convenience combos:
          </p>
          <pre style={{ background: '#0f172a', color: '#94a3b8', padding: 14, borderRadius: 8, overflowX: 'auto', fontSize: '0.85rem', marginBottom: 14 }}>
{`// color-utils.js
export { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, parseRgbString };

export function hexToHsl(hex) {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;
}

export function hslToHex(h, s, l) {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

// derive a shade: darken('#1e90ff', 10) → hex 10% darker
export function darken(hex, amount) {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex(h, s, Math.max(0, l - amount));
}

darken('#1e90ff', 10); // "#0077e6"-ish — same hue, deeper`}
          </pre>
          <p className="small" style={{ marginBottom: 14 }}>
            With hexToHsl and hslToHex in hand you can generate entire tint/shade scales from one
            brand color — exactly the technique used in{' '}
            <Link href="/blog/choosing-a-color-palette-for-your-website">choosing a color
            palette</Link>.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: 24 }}>
            Frequently Asked Questions
          </h2>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I convert a hex color to RGB in JavaScript?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Strip the #, split the string into two-character pairs, and parse each with parseInt(pair, 16). For example, "1e" becomes 30. Expand 3-digit shorthand like #f0c by doubling each digit first.
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>Why does getComputedStyle return rgb() instead of my hex value?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Browsers normalise computed colors to rgb() or rgba() regardless of how they were written in CSS. If you need hex for display or storage, parse the rgb() string with a regex and convert the channels using toString(16).
            </p>
          </div>
          <div style={{ marginBottom: 10 }}>
            <strong>How do I read the color of a pixel in JavaScript?</strong>
            <p className="small" style={{ marginTop: 6 }}>
              Draw the source (image or drawing) to a canvas, then call ctx.getImageData(x, y, 1, 1).data, which returns [r, g, b, a] for that pixel. Cross-origin images must be CORS-enabled or the canvas becomes tainted and getImageData throws.
            </p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
            <strong>Try the Free Color Converter</strong>
            <p className="small" style={{ marginTop: 8, marginBottom: 12 }}>
              Check your functions' output — convert HEX ↔ RGB ↔ HSL instantly in your browser.
              No signup, no cost.
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
              <li><Link href="/blog/regex-for-hexadecimal-color-code-validation">Regex for Hexadecimal Color Code Validation</Link></li>
              <li><Link href="/blog/choosing-a-color-palette-for-your-website">Choosing a Color Palette for Your Website</Link></li>
              <li><Link href="/blog/encode-images-base64-data-uri-html-css">Encode Images as Base64 Data URIs in HTML and CSS</Link></li>
            </ul>
          </div>

        </article>
      </main>
    </>
  );
}
