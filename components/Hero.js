// components/Hero.js
import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="hero card"
      style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}
    >
      <div style={{ flex: '1 1 420px' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: 8 }}>
          Free AI Dev Tools — Regex & SQL
        </h1>

        <p className="small" style={{ fontSize: '1rem', marginBottom: 16 }}>
          Convert plain English into production-ready <strong>Regular Expressions</strong> and
          <strong> SQL queries</strong>.  
          Fast, private, and developer-friendly — no signup required for basic usage.
        </p>

        {/* Main Action Buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          <Link href="/regex-generator">
            <button>Try Regex Generator</button>
          </Link>

          <Link href="/sql-generator">
            <button>Try SQL Generator</button>
          </Link>

          {/* ✅ NEW BLOG LINK */}
          <Link href="/blog">
            <button style={{ background: '#0f172a', color: 'white' }}>
              Read Blog
            </button>
          </Link>

          <Link href="/privacy" style={{ alignSelf: 'center', marginLeft: 6 }}>
            <span style={{ color: '#0f172a', fontWeight: 600 }}>Privacy</span>
          </Link>
        </div>

        {/* SEO + Trust signals */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ padding: 8 }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Free</div>
            <div className="small">Use without signup</div>
          </div>
          <div style={{ padding: 8 }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Fast</div>
            <div className="small">Deterministic engines</div>
          </div>
          <div style={{ padding: 8 }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Private</div>
            <div className="small">No personal data stored</div>
          </div>
        </div>

        {/* ✅ Internal SEO links to your blogs */}
        <div style={{ marginTop: 28 }}>
          <h3 style={{ marginBottom: 8 }}>Popular Guides</h3>
          <ul className="small">
            <li>
              <Link href="/blog/regex-top-patterns">
                Top Regex Patterns Every Developer Should Know
              </Link>
            </li>
            <li>
              <Link href="/blog/ai-sql-practical">
                Practical AI SQL Use Cases
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Logo Section */}
      <div style={{ width: 160, textAlign: 'center', flexShrink: 0 }}>
        <img
          src="/logo.png"
          alt="Dev Brains AI - Developer tools for Regex and SQL"
          width={120}
          height={120}
          style={{ display: 'block', margin: '0 auto' }}
        />
        <div className="small" style={{ marginTop: 8 }}>
          Built for developers
        </div>
      </div>
    </section>
  );
}
