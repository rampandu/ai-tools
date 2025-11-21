// pages/terms.js
import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Use | Dev Brains AI</title>
        <meta
          name="description"
          content="Read the Terms of Use for Dev Brains AI — our policies for using the site and AI tools responsibly."
        />
        <meta property="og:title" content="Terms of Use – Dev Brains AI" />
        <meta
          property="og:description"
          content="Understand how you can use Dev Brains AI tools safely and responsibly."
        />
        <meta property="og:url" content="https://dev-brains-ai.com/terms" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://dev-brains-ai.com/terms" />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <section
          className="card"
          style={{ maxWidth: 800, margin: "0 auto", padding: 24, color: "#0f172a" }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            Terms of Use
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            By using Dev Brains AI, you agree to use the tools and content on this site responsibly.
            We provide all AI-generated outputs “as is,” without any guarantee of accuracy or fitness
            for a particular purpose.
          </p>

          <p className="small" style={{ marginBottom: 16 }}>
            You may use the site’s features for personal or commercial projects provided you do not
            resell or redistribute the tools themselves. All code and content belong to their
            respective owners.
          </p>

          <p className="small">
            We reserve the right to update these terms and our privacy policy at any time. Continued
            use of the site after changes are posted will mean you accept those changes.
          </p>
        </section>
      </main>
    </>
  );
}
