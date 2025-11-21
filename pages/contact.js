// pages/contact.js
import Head from "next/head";
import Link from "next/link";

export default function Contact() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://dev-brains-ai.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: "https://dev-brains-ai.com/contact",
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Contact Us | Dev Brains AI</title>
        <meta
          name="description"
          content="Contact Dev Brains AI for feedback, feature requests, or support on our free AI developer tools."
        />
        <meta property="og:title" content="Contact Dev Brains AI" />
        <meta
          property="og:description"
          content="Get in touch with the Dev Brains AI team for help or suggestions."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/contact" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://dev-brains-ai.com/contact" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <section
          className="card"
          style={{ maxWidth: 800, margin: "0 auto", padding: 24, color: "#0f172a" }}
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="small" style={{ marginBottom: 12 }}>
            <ol
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Contact</li>
            </ol>
          </nav>

          <h1 style={{ fontSize: "2rem", fontWeight: 600, marginBottom: 12, textAlign: "center" }}>
            Contact Us
          </h1>
          <p className="small" style={{ marginBottom: 12 }}>
            Have feedback, questions, or suggestions for new tools? We’d love to hear from you.
          </p>
          <p className="small" style={{ marginBottom: 12 }}>You can reach us directly at:</p>
          <p className="small" style={{ fontWeight: 600 }}>
            📧{" "}
            <a href="mailto:rampandu.cheti@gmail.com" style={{ color: "#2563eb" }}>
              rampandu.cheti@gmail.com
            </a>
          </p>
          <p className="small" style={{ marginTop: 16 }}>
            We usually reply within 24 hours on business days. For common questions about how the
            tools work or data usage, you can also check our{" "}
            <a href="/privacy" style={{ color: "#2563eb" }}>
              Privacy
            </a>{" "}
            and{" "}
            <a href="/terms" style={{ color: "#2563eb" }}>
              Terms
            </a>{" "}
            pages.
          </p>
        </section>
      </main>
    </>
  );
}
