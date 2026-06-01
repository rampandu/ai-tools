
import Head from "next/head";

export default function Blog() {
  return (
    <>
      <Head>
        <title>Regex for IFSC Code Validation</title>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: "Regex for IFSC Code Validation",
              author: { "@type": "Organization", name: "Dev-Brains-AI" },
              publisher: { "@type": "Organization", name: "Dev-Brains-AI" }
            })
          }}
        />
      </Head>

      <main style={{ padding: 20 }}>
        <h1>Regex for IFSC Code Validation</h1>

        <p>
          This guide is created for Indian developers using Node.js, Python, SQL,
          and AI tools.
        </p>

        <p>
          Try Dev-Brains-AI tools → https://dev-brains-ai.com/
        </p>
      </main>
    </>
  );
}
