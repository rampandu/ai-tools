// pages/privacy.js
import Head from "next/head";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Dev Brains AI</title>
        <meta
          name="description"
          content="Read the privacy policy for Dev Brains AI. We explain how we handle data, cookies, and advertising through Google AdSense on our free AI tools website."
        />
        <meta property="og:title" content="Privacy Policy | Dev Brains AI" />
        <meta
          property="og:description"
          content="Learn how Dev Brains AI collects, uses, and protects your information when you use our AI tools like Regex Generator and SQL Generator."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://dev-brains-ai.com/privacy" />
        <link rel="canonical" href="https://dev-brains-ai.com/privacy" />
      </Head>

      <main className="container" style={{ paddingTop: 22 }}>
        <section
          className="card"
          style={{ maxWidth: 800, margin: "0 auto", padding: 24, color: "#0f172a" }}
        >
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: 12 }}>
            Privacy Policy
          </h1>

          <p className="small" style={{ marginBottom: 16 }}>
            At <strong>Dev Brains AI</strong>, accessible from{" "}
            <a
              href="https://dev-brains-ai.com"
              style={{ color: "#0f766e", textDecoration: "underline" }}
            >
              dev-brains-ai.com
            </a>
            , your privacy is one of our main priorities. This Privacy Policy
            document outlines the types of information that are collected and
            recorded by Dev Brains AI and how we use it.
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginTop: 20, marginBottom: 8 }}>
            Data Collection
          </h2>
          <p className="small" style={{ marginBottom: 16 }}>
            We do not collect personally identifiable information unless you
            voluntarily provide it. Our tools (like Regex Generator and SQL
            Generator) run entirely in the browser and do not store input data on
            our servers.
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginTop: 20, marginBottom: 8 }}>
            Cookies and Ads
          </h2>
          <p className="small" style={{ marginBottom: 16 }}>
            We use Google AdSense to serve ads on our site. Google may use cookies
            or web beacons to personalize the ads shown to you. You can opt out of
            personalized ads by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              style={{ color: "#0f766e", textDecoration: "underline" }}
            >
              Google Ads Settings
            </a>
            .
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginTop: 20, marginBottom: 8 }}>
            Third-Party Links
          </h2>
          <p className="small" style={{ marginBottom: 16 }}>
            Our website may contain links to other sites. We are not responsible
            for the privacy practices of those sites. Please review their
            policies separately.
          </p>

          <p className="small" style={{ marginTop: 24 }}>
            If you have any questions about our Privacy Policy, you can contact us
            at <strong>support@dev-brains-ai.com</strong>.
          </p>
        </section>
      </main>
    </>
  );
}
