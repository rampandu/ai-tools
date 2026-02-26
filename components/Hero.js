// components/Hero.js
import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="hero card"
      style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}
    >
      <div style={{ flex: '1 1 420px' }}>
        {/* UPDATED: H1 now covers all 5 tools and leads with the transformation */}
        <h1 style={{ fontSize: '2.25rem', marginBottom: 8 }}>
          Plain English → Production-Ready Code
        </h1>

        {/* UPDATED: Subtitle mentions all 5 tools, not just 2 */}
        <p className="small" style={{ fontSize: '1rem', marginBottom: 16 }}>
          Free AI tools for developers — generate <strong>Regex</strong>,{' '}
          <strong>SQL queries</strong>, <strong>JSON Schemas</strong>, format{' '}
          <strong>JSON</strong>, and explain <strong>error messages</strong>.
          Fast, private, no signup required.
        </p>

        {/* Main Action Buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
          <Link href="/regex-generator">
            <button>Try Regex Generator</button>
          </Link>

          <Link href="/sql-generator">
            <button>Try SQL Generator</button>
          </Link>

          <Link href="/blog">
            <button style={{ background: '#0f172a', color: 'white' }}>
              Read Blog
            </button>
          </Link>

          <Link href="/privacy" style={{ alignSelf: 'center', marginLeft: 6 }}>
            <span style={{ color: '#0f172a', fontWeight: 600 }}>Privacy</span>
          </Link>
        </div>

        {/* Trust signals — UPDATED: removed misleading "Deterministic engines" copy */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ padding: 8 }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Free</div>
            <div className="small">Use without signup</div>
          </div>
          <div style={{ padding: 8 }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Fast</div>
            {/* UPDATED: was "Deterministic engines" — contradicted the AI branding */}
            <div className="small">Instant results</div>
          </div>
          <div style={{ padding: 8 }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Private</div>
            <div className="small">No personal data stored</div>
          </div>
          {/* ADDED: Social proof signal */}
          <div style={{ padding: 8 }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}>10,000+</div>
            <div className="small">Queries generated</div>
          </div>
        </div>

        {/* Internal SEO links */}
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

      {/* Logo + Tool Preview Section */}
      <div style={{ width: 160, textAlign: 'center', flexShrink: 0 }}>
        <img
          src="/logo.png"
          alt="Dev Brains AI - Developer tools for Regex, SQL, JSON and more"
          width={120}
          height={120}
          style={{ display: 'block', margin: '0 auto' }}
        />
        <div className="small" style={{ marginTop: 8 }}>
          Built for developers
        </div>

        {/* ADDED: Tool preview snippet — shows output at a glance */}
        <div
          style={{
            marginTop: 16,
            background: '#0f172a',
            borderRadius: 8,
            padding: '10px 12px',
            textAlign: 'left',
            fontSize: 11,
            fontFamily: 'monospace',
            color: '#94a3b8',
            lineHeight: 1.6,
          }}
        >
          <span style={{ color: '#64748b' }}>{'//'} plain English</span>
          <br />
          <span style={{ color: '#e2e8f0' }}>"emails only"</span>
          <br />
          <span style={{ color: '#64748b' }}>{'//'} → regex</span>
          <br />
          <span style={{ color: '#34d399' }}>
            {'^[\\w.-]+@[\\w.-]+\\.\\w+$'}
          </span>
        </div>
      </div>
    </section>
  );
}